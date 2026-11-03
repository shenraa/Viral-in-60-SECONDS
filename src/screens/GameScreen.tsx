/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Clock, Flame, Pause, CheckCircle2, Share2, Flag, ArrowRight, ShieldCheck, Eye, Search } from 'lucide-react';
import { ActionChoice, DifficultyLevel, GameMode, RoundResult, Scenario, UserDecision } from '../types/game';
import { SCENARIOS } from '../data/scenarios';
import { calculateScenarioScore, determinePerformancePersona, ScoreBreakdown } from '../utils/scoring';
import { soundManager } from '../utils/sound';
import { useGameTimer } from '../hooks/useGameTimer';
import { PostCard } from '../components/PostCard';
import { EvidencePanel } from '../components/EvidencePanel';
import { EvidenceModal } from '../components/EvidenceModal';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import { PauseModal } from '../components/PauseModal';

interface GameScreenProps {
  mode: GameMode;
  difficulty: DifficultyLevel;
  onFinishRound: (result: RoundResult) => void;
  onExitToMenu: () => void;
  highScore: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  mode,
  difficulty,
  onFinishRound,
  onExitToMenu,
  highScore
}) => {
  const TOTAL_QUESTIONS_PER_ROUND = 6;

  const scenarioDeck = useMemo(() => {
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

    const ragebaitPool = SCENARIOS.filter((s) => s.category === 'ragebait');
    const fakeNewsPool = SCENARIOS.filter((s) => s.category === 'fake_news');
    const gossipsPool = SCENARIOS.filter((s) => s.category === 'gossips');

    // Random partition of 6 across [ragebait, fake_news, gossips] where each has at least 1
    const partitions: [number, number, number][] = [
      [2, 2, 2],
      [3, 2, 1],
      [3, 1, 2],
      [2, 3, 1],
      [1, 3, 2],
      [2, 1, 3],
      [1, 2, 3],
      [4, 1, 1],
      [1, 4, 1],
      [1, 1, 4]
    ];

    const randomPartition = partitions[Math.floor(Math.random() * partitions.length)];
    const [rbCount, fnCount, gsCount] = randomPartition;

    const chosen = [
      ...shuffle(ragebaitPool).slice(0, rbCount),
      ...shuffle(fakeNewsPool).slice(0, fnCount),
      ...shuffle(gossipsPool).slice(0, gsCount),
    ];

    // Shuffle the selected scenarios so the order is randomized in the feed
    return shuffle(chosen);
  }, []);

  // Round State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [investigatedClues, setInvestigatedClues] = useState<string[]>([]);
  const [decisions, setDecisions] = useState<UserDecision[]>([]);
  
  // Mobile active tab view: 'post' | 'dossier'
  const [mobileTab, setMobileTab] = useState<'post' | 'dossier'>('post');

  // Modals & Overlay state
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState<boolean>(false);
  const [isPauseOpen, setIsPauseOpen] = useState<boolean>(false);
  const [activeFeedback, setActiveFeedback] = useState<{
    userAction: ActionChoice;
    breakdown: ScoreBreakdown;
    scenario: Scenario;
  } | null>(null);

  // Submission lock
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentScenarioStartTimeRef = useRef<number>(Date.now());
  const roundStartTimeRef = useRef<number>(Date.now());
  const hasFinishedRef = useRef<boolean>(false);

  const currentScenario = scenarioDeck[currentIndex] || scenarioDeck[0];

  // Finalize Round
  const finalizeRound = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    soundManager.playRoundComplete();

    const timeElapsed = mode === 'standard'
      ? 60
      : Math.max(1, Math.round((Date.now() - roundStartTimeRef.current) / 1000));

    const categoryBreakdown: RoundResult['categoryBreakdown'] = {
      ragebait: { correct: 0, total: 0 },
      fake_news: { correct: 0, total: 0 },
      gossips: { correct: 0, total: 0 }
    };

    decisions.forEach((d) => {
      const scen = SCENARIOS.find((s) => s.id === d.scenarioId);
      if (scen && categoryBreakdown[scen.category]) {
        categoryBreakdown[scen.category].total += 1;
        if (d.isCorrect || d.isPartiallyCorrect) {
          categoryBreakdown[scen.category].correct += 1;
        }
      }
    });

    const correctCount = decisions.filter((d) => d.isCorrect || d.isPartiallyCorrect).length;
    const incorrectCount = decisions.length - correctCount;
    const attemptedCount = decisions.length;
    const totalClues = decisions.reduce((acc, d) => acc + d.cluesInvestigated.length, 0);
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const isNewHighScore = mode === 'standard' && currentScore > highScore;
    const performancePersona = determinePerformancePersona(decisions, categoryBreakdown);

    onFinishRound({
      mode,
      difficulty,
      totalScore: currentScore,
      correctCount,
      incorrectCount,
      attemptedCount,
      cluesInvestigatedCount: totalClues,
      bestStreak,
      timeElapsed,
      accuracy,
      decisions,
      performancePersona,
      categoryBreakdown,
      isNewHighScore
    });
  }, [
    mode,
    difficulty,
    currentScore,
    highScore,
    decisions,
    bestStreak,
    onFinishRound
  ]);

  // Authoritative Timer Hook
  const timer = useGameTimer({
    initialSeconds: 60,
    onTimeExpired: () => {
      if (!activeFeedback) {
        finalizeRound();
      }
    },
    onSecondTick: (remaining) => {
      if (mode === 'standard' && remaining <= 10 && remaining > 0) {
        soundManager.playTick(remaining <= 5);
      }
    }
  });

  // Start timer on mount
  useEffect(() => {
    roundStartTimeRef.current = Date.now();
    currentScenarioStartTimeRef.current = Date.now();
    if (mode === 'standard') {
      timer.start();
    }
    return () => {
      timer.reset();
    };
  }, []);

  // Answer Action Submission
  const handleActionSubmit = useCallback((action: ActionChoice) => {
    if (isSubmitting || isPauseOpen || activeFeedback) return;
    setIsSubmitting(true);

    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - currentScenarioStartTimeRef.current) / 1000));
    
    const breakdown = calculateScenarioScore({
      action,
      scenario: currentScenario,
      investigatedClues,
      currentStreak
    });

    let newStreak = currentStreak;
    if (breakdown.isCorrect || breakdown.isPartiallyCorrect) {
      newStreak = currentStreak + 1;
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
    } else {
      newStreak = 0;
    }
    setCurrentStreak(newStreak);
    setCurrentScore((prev) => prev + breakdown.totalScore);

    const userDecision: UserDecision = {
      scenarioId: currentScenario.id,
      chosenAction: action,
      isCorrect: breakdown.isCorrect,
      isPartiallyCorrect: breakdown.isPartiallyCorrect,
      scoreEarned: breakdown.totalScore,
      cluesInvestigated: [...investigatedClues],
      timeSpentSeconds
    };
    setDecisions((prev) => [...prev, userDecision]);

    setIsEvidenceModalOpen(false);

    setActiveFeedback({
      userAction: action,
      breakdown,
      scenario: currentScenario
    });
  }, [isSubmitting, isPauseOpen, activeFeedback, currentScenario, investigatedClues, currentStreak, bestStreak]);

  // Keyboard Shortcuts (1 = Verify, 2 = Share, 3 = Flag, P/Esc = Pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeFeedback || isPauseOpen) return;

      if (e.key === '1' || e.key.toLowerCase() === 'v') {
        e.preventDefault();
        soundManager.playClick();
        handleActionSubmit('verify');
      } else if (e.key === '2' || e.key.toLowerCase() === 's') {
        e.preventDefault();
        soundManager.playClick();
        handleActionSubmit('share');
      } else if (e.key === '3' || e.key.toLowerCase() === 'f') {
        e.preventDefault();
        soundManager.playClick();
        handleActionSubmit('flag');
      } else if (e.key.toLowerCase() === 'p' && !isEvidenceModalOpen) {
        e.preventDefault();
        handlePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleActionSubmit, activeFeedback, isPauseOpen, isEvidenceModalOpen]);

  // Continue to next scenario or finish round
  const handleContinueAfterFeedback = () => {
    setActiveFeedback(null);
    setIsSubmitting(false);

    // If all questions in the 6-question round are completed or time expired:
    if (currentIndex + 1 >= scenarioDeck.length || (mode === 'standard' && timer.timeRemaining <= 0)) {
      finalizeRound();
      return;
    }

    setInvestigatedClues([]);
    setMobileTab('post');
    currentScenarioStartTimeRef.current = Date.now();
    setCurrentIndex((prev) => prev + 1);
  };

  // Pause Handlers
  const handlePause = () => {
    soundManager.playClick();
    if (mode === 'standard') {
      timer.pause();
    }
    setIsPauseOpen(true);
  };

  const handleResume = () => {
    setIsPauseOpen(false);
    if (mode === 'standard') {
      timer.resume();
    }
  };

  const handleRestart = () => {
    setIsPauseOpen(false);
    setActiveFeedback(null);
    setIsSubmitting(false);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setInvestigatedClues([]);
    setDecisions([]);
    setMobileTab('post');
    hasFinishedRef.current = false;
    currentScenarioStartTimeRef.current = Date.now();
    roundStartTimeRef.current = Date.now();

    if (mode === 'standard') {
      timer.reset();
      timer.start();
    }
  };

  const handleInvestigateClue = (clueId: string) => {
    setInvestigatedClues((prev) => {
      if (prev.includes(clueId)) return prev;
      return [...prev, clueId];
    });
  };

  const isUrgent = mode === 'standard' && timer.timeRemaining <= 10;
  const isCritical = mode === 'standard' && timer.timeRemaining <= 5;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
      
      {/* =========================================================================
          HUMAN-CENTERED GAME HUD
          ========================================================================= */}
      <div className="mb-5 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-sm">
        
        {/* Left: Round Progress & Streak */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-slate-600 dark:text-zinc-400 font-bold uppercase tracking-wider">
              Question
            </span>
            <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              <span>Post {currentIndex + 1} <span className="text-slate-500 dark:text-zinc-400 font-normal">of {scenarioDeck.length}</span></span>
            </div>
            {/* 6 Step Progress Dots */}
            <div className="flex items-center gap-1.5 mt-1.5" aria-label={`Question ${currentIndex + 1} of ${scenarioDeck.length}`}>
              {Array.from({ length: scenarioDeck.length }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx < currentIndex
                      ? 'w-4 bg-emerald-500 dark:bg-emerald-400'
                      : idx === currentIndex
                      ? 'w-7 bg-blue-600 dark:bg-blue-400 shadow-xs'
                      : 'w-2.5 bg-slate-200 dark:bg-zinc-700'
                  }`}
                  title={`Post ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col border-l border-slate-300 dark:border-zinc-700 pl-4 sm:pl-6">
            <span className="text-xs text-slate-600 dark:text-zinc-400 font-bold uppercase tracking-wider">
              Streak
            </span>
            <div className="flex items-center gap-1.5 font-extrabold text-sm sm:text-base text-amber-700 dark:text-amber-400">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{currentStreak} in a row</span>
            </div>
          </div>
        </div>

        {/* Center: Friendly Countdown Timer */}
        {mode === 'standard' ? (
          <div className="flex items-center gap-2">
            <div
              className={`px-4 sm:px-5 py-2 rounded-xl border-2 font-extrabold text-xl sm:text-2xl tracking-tight transition-all flex items-center gap-2 shadow-xs ${
                isCritical
                  ? 'bg-rose-50 dark:bg-rose-950/70 border-rose-400 dark:border-rose-700 text-rose-800 dark:text-rose-300 animate-pulse'
                  : isUrgent
                  ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-400 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                  : 'bg-blue-50 dark:bg-zinc-800 border-blue-300 dark:border-zinc-600 text-blue-800 dark:text-blue-300'
              }`}
              aria-label={`Time remaining: ${timer.timeRemaining} seconds`}
            >
              <Clock className="w-5 h-5 text-current" />
              <span className="font-mono-numbers">{String(timer.timeRemaining).padStart(2, '0')}s</span>
            </div>
          </div>
        ) : (
          <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Practice Mode (Untimed)</span>
          </div>
        )}

        {/* Right: Score Counter & Pause */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex flex-col text-right">
            <span className="text-xs text-slate-600 dark:text-zinc-400 font-bold uppercase tracking-wider">
              Score
            </span>
            <div className="font-extrabold text-base sm:text-xl text-slate-900 dark:text-zinc-100 font-mono-numbers">
              {currentScore.toLocaleString()} pts
            </div>
          </div>

          <button
            onClick={handlePause}
            className="p-2 sm:px-3 sm:py-2 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 border border-slate-300 dark:border-zinc-600 rounded-xl transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer shadow-xs"
            aria-label="Pause round"
          >
            <Pause className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">Pause</span>
          </button>
        </div>

      </div>

      {/* Mobile Tab Switcher (Visible only below lg screens) */}
      <div className="lg:hidden mb-4 grid grid-cols-2 gap-2 bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-xl border border-slate-200 dark:border-zinc-700">
        <button
          onClick={() => {
            soundManager.playClick();
            setMobileTab('post');
          }}
          className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            mobileTab === 'post'
              ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-500 dark:text-zinc-400'
          }`}
        >
          Post to Review
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            setMobileTab('dossier');
          }}
          className={`py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === 'dossier'
              ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-500 dark:text-zinc-400'
          }`}
        >
          <span>Fact-Check Clues</span>
          <span className="text-[11px] px-1.5 py-0.5 bg-blue-100 dark:bg-zinc-800 rounded text-blue-700 dark:text-blue-400 font-mono-numbers font-medium">
            {new Set(investigatedClues).size}/{currentScenario.evidence.length}
          </span>
        </button>
      </div>

      {/* =========================================================================
          INVESTIGATION WORKSPACE (Desktop Dual-Pane / Mobile Tabbed)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-5">
        
        {/* Left Pane: The Social Post (7 cols on desktop) */}
        <div className={`lg:col-span-7 flex flex-col ${mobileTab === 'dossier' ? 'hidden lg:flex' : 'flex'}`}>
          <PostCard
            scenario={currentScenario}
            onOpenEvidence={() => {
              soundManager.playClick();
              setIsEvidenceModalOpen(true);
            }}
            investigatedCluesCount={new Set(investigatedClues).size}
          />
        </div>

        {/* Right Pane: Fact-Check Clues Panel (5 cols on desktop) */}
        <div className={`lg:col-span-5 flex flex-col ${mobileTab === 'post' ? 'hidden lg:flex' : 'flex'}`}>
          <EvidencePanel
            scenario={currentScenario}
            investigatedClues={investigatedClues}
            onInvestigateClue={handleInvestigateClue}
          />
        </div>

      </div>

      {/* =========================================================================
          HUMAN ACTION CONTROLS (VERIFY, SHARE, FLAG)
          ========================================================================= */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-3.5">
          <span className="font-bold text-slate-800 dark:text-zinc-200 text-sm">
            What is the right action for this post?
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 dark:text-zinc-500">
            Keys: 1 for Verify · 2 for Share · 3 for Flag
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          
          {/* Action 1: VERIFY */}
          <button
            onClick={() => {
              soundManager.playClick();
              handleActionSubmit('verify');
            }}
            disabled={isSubmitting}
            className="group py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white transition-all flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40 shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <CheckCircle2 className="w-5 h-5 fill-white/20" />
              <span>VERIFY CLAIM</span>
            </div>
            <span className="text-xs text-blue-100 font-normal text-center">
              Needs checking · Unconfirmed
            </span>
          </button>

          {/* Action 2: SHARE */}
          <button
            onClick={() => {
              soundManager.playClick();
              handleActionSubmit('share');
            }}
            disabled={isSubmitting}
            className="group py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white transition-all flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-40 shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <Share2 className="w-5 h-5" />
              <span>SAFE TO SHARE</span>
            </div>
            <span className="text-xs text-emerald-100 font-normal text-center">
              Real & verified · Official source
            </span>
          </button>

          {/* Action 3: FLAG */}
          <button
            onClick={() => {
              soundManager.playClick();
              handleActionSubmit('flag');
            }}
            disabled={isSubmitting}
            className="group py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white transition-all flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-40 shadow-sm shadow-rose-500/20 cursor-pointer"
          >
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <Flag className="w-5 h-5 fill-white/20" />
              <span>FLAG MISINFORMATION</span>
            </div>
            <span className="text-xs text-rose-100 font-normal text-center">
              Fake or scam · Proven false
            </span>
          </button>

        </div>
      </div>

      {/* Standalone Modal for Mobile or Detailed Inspection */}
      <EvidenceModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        scenario={currentScenario}
        investigatedClues={investigatedClues}
        onInvestigateClue={handleInvestigateClue}
        timeRemaining={mode === 'standard' ? timer.timeRemaining : undefined}
        isPracticeMode={mode === 'practice'}
      />

      {/* Answer Feedback Debriefing Overlay */}
      {activeFeedback && (
        <FeedbackOverlay
          scenario={activeFeedback.scenario}
          userAction={activeFeedback.userAction}
          breakdown={activeFeedback.breakdown}
          streak={currentStreak}
          timeRemaining={mode === 'standard' ? timer.timeRemaining : undefined}
          isPracticeMode={mode === 'practice'}
          isLastScenario={currentIndex + 1 >= scenarioDeck.length}
          onContinue={handleContinueAfterFeedback}
        />
      )}

      {/* Pause Dialog Overlay */}
      <PauseModal
        isOpen={isPauseOpen}
        onResume={handleResume}
        onRestart={handleRestart}
        onExit={onExitToMenu}
        timeRemaining={timer.timeRemaining}
        currentScore={currentScore}
      />

    </div>
  );
};
