/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  RotateCcw,
  BarChart3,
  Home,
  Search,
  Flame,
  Award,
  AlertCircle,
  FileSearch,
  CheckCircle2,
  Cloud,
  CloudCheck,
  Send,
  Star,
  Users,
  Loader2
} from 'lucide-react';
import { RoundResult, ScreenId } from '../types/game';
import { soundManager } from '../utils/sound';
import {
  saveSurveyResultToCloud,
  submitSurveyFeedbackToCloud
} from '../services/firebase';
import { CommunitySurveyModal } from '../components/CommunitySurveyModal';

interface ResultsScreenProps {
  result: RoundResult;
  onPlayAgain: () => void;
  onReviewMistakes: () => void;
  onNavigate: (screen: ScreenId) => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  ragebait: 'Ragebait & Outrage',
  fake_news: 'Breaking Fake News',
  gossips: 'Gossips & Drama',
};

const PERSONA_DESCRIPTIONS: Record<string, string> = {
  'CAREFUL INVESTIGATOR': 'You prioritized verification, consistently reviewing evidence clues and checking source provenance before making consequential decisions.',
  'FAST SCROLLER': 'You moved with high speed through the feed, but missed opportunities to check source registries and timestamps.',
  'CONTEXT DETECTIVE': 'You excelled at recognizing recycled imagery, out-of-date photos, and selective context used to mislead.',
  'CRITICAL THINKER': 'You demonstrated strong digital discernment across multiple types of misleading information.',
  'STILL INVESTIGATING': 'Mixed results across categories. Practice examining source links and corroborating records to sharpen your instinct.',
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  onPlayAgain,
  onReviewMistakes,
  onNavigate
}) => {
  const [displayScore, setDisplayScore] = useState<number>(0);
  
  // Firebase Survey State
  const [cloudDocId, setCloudDocId] = useState<string | null>(null);
  const [cloudStatus, setCloudStatus] = useState<'saving' | 'saved' | 'error'>('saving');
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState<boolean>(false);
  
  // Survey Feedback & Reflection
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  // Score counter animation
  useEffect(() => {
    let current = 0;
    const target = result.totalScore;
    if (target === 0) {
      setDisplayScore(0);
      return;
    }
    const step = Math.max(1, Math.ceil(target / 25));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setDisplayScore(target);
        clearInterval(timer);
      } else {
        setDisplayScore(current);
      }
    }, 24);

    return () => clearInterval(timer);
  }, [result.totalScore]);

  // Persist survey result to Firebase Firestore
  useEffect(() => {
    let isCancelled = false;

    async function syncToFirebase() {
      try {
        setCloudStatus('saving');
        const docId = await saveSurveyResultToCloud(result);
        if (!isCancelled) {
          setCloudDocId(docId);
          setCloudStatus('saved');
        }
      } catch (err) {
        console.error('Error saving survey result to Firebase:', err);
        if (!isCancelled) {
          setCloudStatus('error');
        }
      }
    }

    syncToFirebase();

    return () => {
      isCancelled = true;
    };
  }, [result]);

  const handleSendFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloudDocId) return;

    setIsFeedbackSubmitting(true);
    try {
      await submitSurveyFeedbackToCloud(cloudDocId, feedbackRating, feedbackText);
      setFeedbackSubmitted(true);
      soundManager.playSuccess();
    } catch (err) {
      console.error('Failed to submit survey feedback to Firebase:', err);
    } finally {
      setIsFeedbackSubmitting(false);
    }
  };

  const mistakeCount = result.incorrectCount;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Firebase Cloud Sync Status Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-zinc-800/90 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-2xs">
        <div className="flex items-center gap-2.5">
          {cloudStatus === 'saving' && (
            <>
              <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
              <span className="text-xs text-slate-600 dark:text-zinc-300 font-medium">
                Connecting survey results to Firebase Firestore...
              </span>
            </>
          )}

          {cloudStatus === 'saved' && (
            <>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Connected to Firebase: Survey Result Recorded
              </span>
              {cloudDocId && (
                <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                  (ID: {cloudDocId.slice(0, 8)}...)
                </span>
              )}
            </>
          )}

          {cloudStatus === 'error' && (
            <>
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                Local result saved. Cloud sync will retry on next connection.
              </span>
            </>
          )}
        </div>

        <button
          onClick={() => setIsCommunityModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>View Community Survey</span>
        </button>
      </div>

      {/* Top Banner: Outcome & Score */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 sm:p-8 text-center shadow-sm mb-6 relative overflow-hidden transition-all">
        
        {result.isNewHighScore && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-xs text-amber-800 dark:text-amber-300 font-bold mb-3 shadow-2xs">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>New Personal Best High Score!</span>
          </div>
        )}

        <div className="text-xs text-slate-500 dark:text-zinc-400 font-semibold uppercase tracking-wider mb-1">
          {result.mode === 'standard' ? '60-Second Challenge Completed' : 'Practice Session Completed'}
        </div>

        {/* Final Score Display */}
        <div className="font-extrabold text-5xl sm:text-7xl font-mono-numbers text-slate-900 dark:text-white tracking-tight">
          {displayScore.toLocaleString()}
          <span className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 ml-1.5 font-sans font-bold">pts</span>
        </div>

        {/* Performance Persona Tag */}
        <div className="mt-4 inline-block bg-blue-50/60 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 px-5 py-3 rounded-xl max-w-lg mx-auto">
          <div className="text-xs text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Instinct Persona: {result.performancePersona}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
            {PERSONA_DESCRIPTIONS[result.performancePersona]}
          </p>
        </div>

      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-4 rounded-xl text-center shadow-2xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400 mb-1 font-medium">
            Accuracy
          </div>
          <div className="font-bold text-2xl text-emerald-600 dark:text-emerald-400 font-mono-numbers">
            {result.accuracy}%
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {result.correctCount} of {result.attemptedCount} correct
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-4 rounded-xl text-center shadow-2xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400 mb-1 font-medium">
            Best Streak
          </div>
          <div className="font-bold text-2xl text-amber-600 dark:text-amber-400 font-mono-numbers flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{result.bestStreak}x</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Consecutive decisions
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-4 rounded-xl text-center shadow-2xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400 mb-1 font-medium">
            Clues Inspected
          </div>
          <div className="font-bold text-2xl text-blue-600 dark:text-blue-400 font-mono-numbers flex items-center justify-center gap-1">
            <Search className="w-4 h-4" />
            <span>{result.cluesInvestigatedCount}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Evidence checks
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-4 rounded-xl text-center shadow-2xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400 mb-1 font-medium">
            Time Elapsed
          </div>
          <div className="font-bold text-2xl text-slate-900 dark:text-white font-mono-numbers">
            {result.timeElapsed}s
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {result.mode === 'standard' ? 'Full 60s round' : 'Self-paced'}
          </div>
        </div>

      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileSearch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Performance by Category (6 Questions)
          </h3>
        </div>

        <div className="space-y-3.5">
          {Object.entries(result.categoryBreakdown).map(([catKey, data]) => {
            if (data.total === 0) return null;
            const pct = Math.round((data.correct / data.total) * 100);

            return (
              <div key={catKey}>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 mb-1 font-medium">
                  <span>{CATEGORY_NAMES[catKey] || catKey}</span>
                  <span>
                    {data.correct} of {data.total} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-zinc-700">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Survey Reflection & Cloud Feedback Box */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Survey Reflection & Feedback
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-zinc-400">
            Recorded to Firestore
          </span>
        </div>

        {feedbackSubmitted ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Thank you! Your survey reflection has been synced to the database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendFeedback} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-600 dark:text-zinc-300 font-medium mb-1.5">
                How confident do you feel recognizing fake news & ragebait now?
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFeedbackRating(star)}
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= feedbackRating
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-slate-300 dark:text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 ml-2">
                  {feedbackRating === 5
                    ? 'Very confident'
                    : feedbackRating >= 4
                    ? 'Confident'
                    : feedbackRating === 3
                    ? 'Neutral'
                    : 'Still learning'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 dark:text-zinc-300 font-medium mb-1.5">
                Share any quick thoughts on the questions (optional):
              </label>
              <input
                type="text"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="e.g. The gossips headline about the actor was very sneaky..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isFeedbackSubmitting || !cloudDocId}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                {isFeedbackSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Survey Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Action Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        
        <button
          onClick={() => {
            soundManager.playClick();
            onPlayAgain();
          }}
          className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        {mistakeCount > 0 && (
          <button
            onClick={() => {
              soundManager.playClick();
              onReviewMistakes();
            }}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-300 dark:border-amber-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Review Mistakes ({mistakeCount})</span>
          </button>
        )}

        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('statistics');
          }}
          className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-600 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Your Statistics</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('home');
          }}
          className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

      </div>

      {/* Community Survey Modal */}
      <CommunitySurveyModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
      />

    </div>
  );
};
