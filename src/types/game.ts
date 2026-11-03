/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId =
  | 'home'
  | 'mode_select'
  | 'gameplay'
  | 'results'
  | 'mistake_review'
  | 'statistics'
  | 'settings'
  | 'about'
  | 'credits';

export type GameMode = 'standard' | 'practice';

export type DifficultyLevel = 'easy' | 'normal' | 'hard';

export type ActionChoice = 'verify' | 'share' | 'flag' | 'VERIFY' | 'SHARE' | 'FLAG';

export type ScenarioCategory =
  | 'ragebait'
  | 'fake_news'
  | 'gossips';

export type ClueType =
  | 'source'
  | 'date'
  | 'image_context'
  | 'corroboration'
  | 'seller_info'
  | 'provenance'
  | 'uncertainty';

export type ReliabilityIndicator =
  | 'credible'
  | 'suspicious'
  | 'inconclusive'
  | 'verified_official';

export interface EvidenceClue {
  id: string;
  type: ClueType;
  title: string;
  content: string;
  reliability: ReliabilityIndicator;
  note: string;
}

export type GraphicType =
  | 'news_card'
  | 'photo_preview'
  | 'product_ad'
  | 'chat_bubble'
  | 'quote_card';

export interface GraphicDetails {
  headlineSnippet?: string;
  caption?: string;
  badge?: string;
  sourceUrlSnippet?: string;
  price?: string;
  rating?: number;
  quoteSpeaker?: string;
  accentColor?: string;
}

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  difficulty: DifficultyLevel;
  authorName: string;
  handle: string;
  avatarColor: string;
  avatarInitials: string;
  verified: boolean;
  timestamp: string;
  headline: string;
  bodyText: string;
  graphicType: GraphicType;
  graphicDetails: GraphicDetails;
  stats: {
    likes: number;
    shares: number;
    comments: number;
  };
  question: string;
  correctAction: ActionChoice;
  acceptableActions: ActionChoice[];
  verdict:
    | 'fabricated'
    | 'misleading_context'
    | 'unverified_rumour'
    | 'scam'
    | 'ai_manipulated'
    | 'authentic_and_verified'
    | 'inconclusive';
  evidence: EvidenceClue[];
  explanation: string;
  whyItMatters: string;
  learningTakeaway: string;
  tags: string[];
}

export interface UserDecision {
  scenarioId: string;
  chosenAction: ActionChoice;
  isCorrect: boolean;
  isPartiallyCorrect: boolean;
  scoreEarned: number;
  cluesInvestigated: string[];
  timeSpentSeconds: number;
}

export type PerformancePersona =
  | 'CAREFUL INVESTIGATOR'
  | 'FAST SCROLLER'
  | 'CONTEXT DETECTIVE'
  | 'CRITICAL THINKER'
  | 'STILL INVESTIGATING';

export interface RoundResult {
  mode: GameMode;
  difficulty: DifficultyLevel;
  totalScore: number;
  correctCount: number;
  incorrectCount: number;
  attemptedCount: number;
  cluesInvestigatedCount: number;
  bestStreak: number;
  timeElapsed: number;
  accuracy: number;
  decisions: UserDecision[];
  performancePersona: PerformancePersona;
  categoryBreakdown: Record<ScenarioCategory, { correct: number; total: number }>;
  isNewHighScore: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  soundVolume: number;
  reducedMotion: boolean;
  highContrast: boolean;
  textSize: 'normal' | 'large';
  nonColorIndicators: boolean;
  defaultDifficulty: DifficultyLevel;
  defaultMode: GameMode;
  confirmExit: boolean;
  hasCompletedTutorial: boolean;
  theme: 'light' | 'dark';
}

export interface PlayerStats {
  version: number;
  totalStandardRounds: number;
  totalPracticeScenarios: number;
  highScoreStandard: number;
  totalScoreAccumulated: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalCluesInvestigated: number;
  bestStreakEver: number;
  categoryStats: Record<ScenarioCategory, { correct: number; total: number }>;
  unlockedAchievements: string[];
  lastPlayedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requirementDescription: string;
}
