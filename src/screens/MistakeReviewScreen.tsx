/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, ShieldCheck, ChevronLeft, ChevronRight, FileSearch } from 'lucide-react';
import { RoundResult } from '../types/game';
import { SCENARIOS } from '../data/scenarios';
import { soundManager } from '../utils/sound';

interface MistakeReviewScreenProps {
  result: RoundResult;
  onBackToResults: () => void;
}

export const MistakeReviewScreen: React.FC<MistakeReviewScreenProps> = ({
  result,
  onBackToResults
}) => {
  const incorrectDecisions = result.decisions.filter((d) => !d.isCorrect && !d.isPartiallyCorrect);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (incorrectDecisions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
        <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-2">
          No Mistakes to Review!
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mb-6">
          Flawless judgment! You evaluated every post in this round accurately.
        </p>
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToResults();
          }}
          className="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-500/20 cursor-pointer"
        >
          Return to Results
        </button>
      </div>
    );
  }

  const currentDecision = incorrectDecisions[currentIndex];
  const scenario = SCENARIOS.find((s) => s.id === currentDecision.scenarioId);

  if (!scenario) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToResults();
          }}
          className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1 -ml-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Results</span>
        </button>

        <div className="text-xs text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Mistake {currentIndex + 1} of {incorrectDecisions.length}
        </div>
      </div>

      {/* Main Review Card */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm mb-6 space-y-5 transition-all">
        
        {/* Post Summary */}
        <div className="border-b border-slate-200 dark:border-zinc-700 pb-4">
          <div className="text-xs text-slate-500 dark:text-zinc-400 mb-1 font-medium">
            Post from {scenario.authorName} ({scenario.handle})
          </div>
          <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
            {scenario.headline}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1.5 leading-relaxed italic">
            "{scenario.bodyText}"
          </p>
        </div>

        {/* Decision Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-400 font-semibold mb-1">
              <XCircle className="w-4 h-4" />
              <span>You Chose</span>
            </div>
            <div className="font-bold text-base uppercase text-rose-900 dark:text-rose-200">
              {currentDecision.chosenAction}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Recommended Action</span>
            </div>
            <div className="font-bold text-base uppercase text-emerald-900 dark:text-emerald-200">
              {scenario.correctAction}
            </div>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <FileSearch className="w-3.5 h-3.5" />
            <span>Why This Post Was Misleading</span>
          </div>
          <p className="text-sm text-slate-800 dark:text-zinc-200 leading-relaxed font-normal">
            {scenario.explanation}
          </p>
        </div>

        {/* Primary Evidence Clues */}
        <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3">
          <div className="text-xs font-bold text-slate-600 dark:text-zinc-300 uppercase tracking-wider">
            Crucial Clues to Watch Out For
          </div>
          {scenario.evidence.map((clue) => (
            <div key={clue.id} className="text-xs border-l-2 border-blue-500 pl-3 py-1">
              <div className="font-bold text-slate-900 dark:text-white">{clue.title}</div>
              <div className="text-slate-600 dark:text-zinc-400 mt-0.5 leading-relaxed">{clue.content}</div>
            </div>
          ))}
        </div>

        {/* Practical Takeaway */}
        <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-800 flex items-start gap-3">
          <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
              Educational Takeaway
            </div>
            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-200 mt-0.5 leading-relaxed">
              {scenario.learningTakeaway}
            </p>
          </div>
        </div>

      </div>

      {/* Stepper Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            soundManager.playClick();
            setCurrentIndex((prev) => Math.max(0, prev - 1));
          }}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-700 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-600 rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1.5">
          {incorrectDecisions.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-blue-600 dark:bg-blue-400 w-6' : 'bg-slate-200 dark:bg-zinc-700 w-2'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setCurrentIndex((prev) => Math.min(incorrectDecisions.length - 1, prev + 1));
          }}
          disabled={currentIndex === incorrectDecisions.length - 1}
          className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-700 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-600 rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-2xs"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
