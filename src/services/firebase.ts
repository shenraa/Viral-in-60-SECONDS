/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  limit,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { RoundResult } from '../types/game';
import { sanitizeInput, redactSensitiveData } from '../utils/security';
import { encryptSync, decryptSync } from '../utils/crypto';

// Standard Firebase error handling format
export enum OperationType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const err = error as { code?: string; message?: string };
  const message = `Firestore ${operationType} failed at ${path || 'unknown'}: [${err.code || 'UNKNOWN'}] ${err.message || String(error)}`;
  console.error(message);
  throw new Error(message);
}

// 1. Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Initialize Auth
export const auth = getAuth(app);

// 3. Initialize Firestore with specified Database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Validate initial connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline status check.');
    }
  }
}
testConnection();

// Initialize anonymous authentication
export let currentUser: FirebaseUser | null = null;
onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

const CLIENT_ID_STORAGE_KEY = 'vis_survey_client_id';

// Attempt anonymous sign-in to assign a valid Firebase Auth UID
export async function ensureAuthenticated(): Promise<string> {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  }
  try {
    const cred = await signInAnonymously(auth);
    currentUser = cred.user;
    return cred.user.uid;
  } catch (err) {
    console.warn('Anonymous auth sign-in warning:', err);
    // Encrypted persistent client id fallback
    let storedId = '';
    try {
      const raw = localStorage.getItem(CLIENT_ID_STORAGE_KEY);
      storedId = decryptSync<string>(raw, '');
      if (!storedId) {
        storedId = 'user_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem(CLIENT_ID_STORAGE_KEY, encryptSync(storedId));
      }
    } catch {
      storedId = 'user_ephemeral_' + Math.random().toString(36).substring(2, 8);
    }
    return storedId;
  }
}

export interface CloudSurveyRecord {
  id?: string;
  userId: string;
  playerName: string;
  score: number;
  accuracy: number;
  correctCount: number;
  totalQuestions: number;
  gameMode: string;
  difficulty: string;
  timeTakenSeconds: number;
  persona: string;
  categoryBreakdown: {
    ragebait: { correct: number; total: number };
    fake_news: { correct: number; total: number };
    gossips: { correct: number; total: number };
  };
  decisions: Array<{
    scenarioId: string;
    chosenAction: string;
    isCorrect: boolean;
    scoreEarned: number;
    timeSpentSeconds: number;
  }>;
  feedback?: string;
  rating?: number;
  feedbackSubmittedAt?: string;
  createdAt: string;
}

export interface SurveyAnalyticsSummary {
  totalSurveys: number;
  averageAccuracy: number;
  averageScore: number;
  categoryAccuracies: {
    ragebait: number;
    fake_news: number;
    gossips: number;
  };
  personaDistribution: Record<string, number>;
  recentResults: CloudSurveyRecord[];
}

/**
 * Save a completed round / survey session to Firestore with sanitization and bounds enforcement
 */
export async function saveSurveyResultToCloud(
  result: RoundResult,
  playerName: string = 'Digital Explorer'
): Promise<string> {
  const collectionPath = 'survey_results';
  try {
    const userId = await ensureAuthenticated();
    const cleanPlayerName = sanitizeInput(playerName, 50) || 'Digital Explorer';

    const cleanScore = Math.max(0, Math.min(1000000, Math.round(result.totalScore)));
    const cleanAccuracy = Math.max(0, Math.min(100, Math.round(result.accuracy)));
    const cleanCorrect = Math.max(0, Math.min(50, Math.round(result.correctCount)));
    const cleanTotal = Math.max(0, Math.min(50, Math.round(result.attemptedCount)));
    const cleanTime = Math.max(0, Math.min(7200, Math.round(result.timeElapsed)));

    const payload: Omit<CloudSurveyRecord, 'id'> = {
      userId,
      playerName: cleanPlayerName,
      score: cleanScore,
      accuracy: cleanAccuracy,
      correctCount: cleanCorrect,
      totalQuestions: cleanTotal,
      gameMode: result.mode === 'standard' ? 'standard' : 'practice',
      difficulty: result.difficulty,
      timeTakenSeconds: cleanTime,
      persona: sanitizeInput(result.performancePersona, 64) || 'CAREFUL INVESTIGATOR',
      categoryBreakdown: {
        ragebait: {
          correct: Math.max(0, result.categoryBreakdown.ragebait?.correct || 0),
          total: Math.max(0, result.categoryBreakdown.ragebait?.total || 0),
        },
        fake_news: {
          correct: Math.max(0, result.categoryBreakdown.fake_news?.correct || 0),
          total: Math.max(0, result.categoryBreakdown.fake_news?.total || 0),
        },
        gossips: {
          correct: Math.max(0, result.categoryBreakdown.gossips?.correct || 0),
          total: Math.max(0, result.categoryBreakdown.gossips?.total || 0),
        },
      },
      decisions: result.decisions.slice(0, 50).map((d) => ({
        scenarioId: sanitizeInput(d.scenarioId, 64),
        chosenAction: sanitizeInput(d.chosenAction, 32),
        isCorrect: Boolean(d.isCorrect || d.isPartiallyCorrect),
        scoreEarned: Math.max(-1000, Math.min(5000, d.scoreEarned)),
        timeSpentSeconds: Math.max(0, Math.min(300, d.timeSpentSeconds)),
      })),
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, collectionPath), payload);
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, collectionPath);
  }
}

/**
 * Submit user reflection or feedback with PII scrubbing and boundary protection
 */
export async function submitSurveyFeedbackToCloud(
  resultDocId: string,
  rating: number,
  feedbackText: string
): Promise<void> {
  const docPath = `survey_results/${resultDocId}`;
  try {
    const docRef = doc(db, 'survey_results', resultDocId);
    const sanitizedFeedback = sanitizeInput(redactSensitiveData(feedbackText), 500);
    const clampedRating = Math.max(1, Math.min(5, Math.round(rating)));

    await updateDoc(docRef, {
      rating: clampedRating,
      feedback: sanitizedFeedback,
      feedbackSubmittedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}

/**
 * Fetch recent survey results from Firestore
 */
export async function getRecentSurveyResultsFromCloud(
  maxCount: number = 20
): Promise<CloudSurveyRecord[]> {
  const collectionPath = 'survey_results';
  try {
    const safeLimit = Math.min(50, Math.max(1, maxCount));
    const q = query(
      collection(db, collectionPath),
      orderBy('createdAt', 'desc'),
      limit(safeLimit)
    );
    const snapshot = await getDocs(q);

    const records: CloudSurveyRecord[] = [];
    snapshot.forEach((snap) => {
      const data = snap.data() as Omit<CloudSurveyRecord, 'id'>;
      records.push({
        id: snap.id,
        ...data,
      });
    });

    return records;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, collectionPath);
  }
}

/**
 * Calculate aggregated community statistics across survey results
 */
export async function getSurveyCommunityAnalytics(): Promise<SurveyAnalyticsSummary> {
  const collectionPath = 'survey_results';
  try {
    const records = await getRecentSurveyResultsFromCloud(50);

    if (records.length === 0) {
      return {
        totalSurveys: 0,
        averageAccuracy: 0,
        averageScore: 0,
        categoryAccuracies: {
          ragebait: 0,
          fake_news: 0,
          gossips: 0,
        },
        personaDistribution: {},
        recentResults: [],
      };
    }

    let sumAccuracy = 0;
    let sumScore = 0;
    const catStats = {
      ragebait: { correct: 0, total: 0 },
      fake_news: { correct: 0, total: 0 },
      gossips: { correct: 0, total: 0 },
    };
    const personas: Record<string, number> = {};

    records.forEach((r) => {
      sumAccuracy += r.accuracy || 0;
      sumScore += r.score || 0;

      if (r.categoryBreakdown) {
        if (r.categoryBreakdown.ragebait) {
          catStats.ragebait.correct += r.categoryBreakdown.ragebait.correct || 0;
          catStats.ragebait.total += r.categoryBreakdown.ragebait.total || 0;
        }
        if (r.categoryBreakdown.fake_news) {
          catStats.fake_news.correct += r.categoryBreakdown.fake_news.correct || 0;
          catStats.fake_news.total += r.categoryBreakdown.fake_news.total || 0;
        }
        if (r.categoryBreakdown.gossips) {
          catStats.gossips.correct += r.categoryBreakdown.gossips.correct || 0;
          catStats.gossips.total += r.categoryBreakdown.gossips.total || 0;
        }
      }

      if (r.persona) {
        personas[r.persona] = (personas[r.persona] || 0) + 1;
      }
    });

    const total = records.length;
    const rbAcc =
      catStats.ragebait.total > 0
        ? Math.round((catStats.ragebait.correct / catStats.ragebait.total) * 100)
        : 0;
    const fnAcc =
      catStats.fake_news.total > 0
        ? Math.round((catStats.fake_news.correct / catStats.fake_news.total) * 100)
        : 0;
    const gsAcc =
      catStats.gossips.total > 0
        ? Math.round((catStats.gossips.correct / catStats.gossips.total) * 100)
        : 0;

    return {
      totalSurveys: total,
      averageAccuracy: Math.round(sumAccuracy / total),
      averageScore: Math.round(sumScore / total),
      categoryAccuracies: {
        ragebait: rbAcc,
        fake_news: fnAcc,
        gossips: gsAcc,
      },
      personaDistribution: personas,
      recentResults: records,
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.READ, collectionPath);
  }
}
