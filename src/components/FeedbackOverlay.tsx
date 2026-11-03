/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, Lightbulb, Flame, Award } from 'lucide-react';
import { ActionChoice, Scenario } from '../types/game';
import { ScoreBreakdown } from '../utils/scoring';
import { soundManager } from '../utils/sound';

interface FeedbackOverlayProps {
  scenario: Scenario;
  userAction: ActionChoice;
  breakdown: ScoreBreakdown;
  streak: number;
  timeRemaining?: number;
  isPracticeMode?: boolean;
  isLastScenario?: boolean;
  onContinue: () => void;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  scenario,
  userAction,
  breakdown,
  streak,
  timeRemaining,
  isPracticeMode = false,
  isLastScenario = false,
  onContinue
}) => {
  useEffect(() => {
    if (breakdown.isCorrect) {
      soundManager.playSuccess();
    } else if (breakdown.isPartiallyCorrect) {
      soundManager.playPartial();
    } else {
      soundManager.playError();
    }
  }, [breakdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onContinue]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all">
        
        {/* Header Ribbon */}
        <div
          className={`p-5 flex items-center justify-between border-b ${
            breakdown.isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : breakdown.isPartiallyCorrect
              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}
        >
          <div className="flex items-center gap-3.5">
            {breakdown.isCorrect ? (
              <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : breakdown.isPartiallyCorrect ? (
              <AlertTriangle className="w-8 h-8 shrink-0 text-amber-600 dark:text-amber-400" />
            ) : (
              <XCircle className="w-8 h-8 shrink-0 text-rose-600 dark:text-rose-400" />
            )}

            <div>
              <h2 id="feedback-title" className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-zinc-100">
                {breakdown.isCorrect
                  ? 'Great Decision!'
                  : breakdown.isPartiallyCorrect
                  ? 'Partially Justified'
                  : 'Not Quite Right'}
              </h2>
              <div className="text-xs text-slate-700 dark:text-zinc-300 mt-0.5 font-medium">
                Your choice: <span className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-zinc-100">{userAction}</span> · Recommended: <span className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-zinc-100">{scenario.correctAction}</span>
              </div>
            </div>
          </div>

          {/* Points Award Badge */}
          <div className="text-right shrink-0">
            <div className="font-extrabold text-2xl sm:text-3xl font-mono-numbers text-slate-900 dark:text-zinc-100">
              +{breakdown.totalScore}
            </div>
            <div className="text-xs text-slate-600 dark:text-zinc-400 font-semibold">
              Points Earned
            </div>
          </div>
        </div>

        {/* Transparent Points Math Strip */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-700 flex items-center justify-between text-xs text-slate-700 dark:text-zinc-300 font-medium">
          <span>Base points: <strong className="text-slate-900 dark:text-zinc-100">+{breakdown.baseScore}</strong></span>
          <span aria-hidden="true" className="text-slate-400 dark:text-zinc-600">·</span>
          <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400 font-bold">
            <Award className="w-3.5 h-3.5" />
            Clues: +{breakdown.clueBonus}
          </span>
          <span aria-hidden="true" className="text-slate-400 dark:text-zinc-600">·</span>
          <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-bold">
            <Flame className="w-3.5 h-3.5" />
            Streak ({streak}x): +{breakdown.streakBonus}
          </span>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Analysis */}
          <div>
            <h3 className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">
              What The Evidence Shows
            </h3>
            <p className="text-sm text-slate-900 dark:text-zinc-100 leading-relaxed font-normal">
              {scenario.explanation}
            </p>
          </div>

          {/* Why It Matters */}
          <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-xl border border-slate-300 dark:border-zinc-700">
            <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
              Why This Matters
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 leading-relaxed">
              {scenario.whyItMatters}
            </p>
          </div>

          {/* Practical Takeaway */}
          <div className="bg-blue-50/70 dark:bg-blue-950/50 p-4 rounded-xl border border-blue-300 dark:border-blue-800 flex items-start gap-3">
            <Lightbulb className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                Practical Takeaway
              </div>
              <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-200 mt-0.5 leading-relaxed font-medium">
                {scenario.learningTakeaway}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-900 border-t border-slate-300 dark:border-zinc-700 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
            {!isPracticeMode && timeRemaining !== undefined ? (
              <span>Timer active: <strong className="text-blue-700 dark:text-blue-400 font-mono-numbers">{timeRemaining}s remaining</strong></span>
            ) : (
              <span>Practice session (untimed)</span>
            )}
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onContinue();
            }}
            autoFocus
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold text-white rounded-xl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 shadow-sm cursor-pointer ${
              isLastScenario
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
            }`}
          >
            <span>{isLastScenario ? 'Finish Round & See Results' : 'Continue to Next Post'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
