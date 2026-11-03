/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, BookOpen, ArrowLeft, Play, ShieldAlert, Check } from 'lucide-react';
import { DifficultyLevel, GameMode } from '../types/game';
import { soundManager } from '../utils/sound';

interface ModeSelectScreenProps {
  initialMode?: GameMode;
  initialDifficulty?: DifficultyLevel;
  onLaunch: (mode: GameMode, difficulty: DifficultyLevel) => void;
  onBack: () => void;
}

export const ModeSelectScreen: React.FC<ModeSelectScreenProps> = ({
  initialMode = 'standard',
  initialDifficulty = 'normal',
  onLaunch,
  onBack
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>(initialMode);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(initialDifficulty);

  const handleLaunch = () => {
    soundManager.playClick();
    onLaunch(selectedMode, selectedDifficulty);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1 -ml-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-zinc-100">
          Choose How You Want to Play
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 mt-1.5 font-medium">
          Select between timed or untimed mode, then pick your challenge level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        
        {/* Mode Option 1: Timed 60-Second Challenge */}
        <div
          onClick={() => {
            soundManager.playClick();
            setSelectedMode('standard');
          }}
          className={`cursor-pointer rounded-2xl p-6 border transition-all ${
            selectedMode === 'standard'
              ? 'bg-blue-50/50 dark:bg-zinc-800 border-2 border-blue-600 dark:border-blue-400 shadow-md shadow-blue-500/10'
              : 'bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            {selectedMode === 'standard' && (
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </div>

          <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
            Timed Mode
          </div>
          <h2 className="font-bold text-xl text-slate-900 dark:text-zinc-100 mb-1">
            60-Second Challenge
          </h2>
          <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed mb-4">
            Test your speed across 6 posts in 60 seconds! Quick decisions, rapid evidence checks, and consecutive streak bonuses. Scores count toward your personal best records.
          </p>

          <div className="text-xs text-blue-800 dark:text-blue-300 font-bold pt-2 border-t border-slate-200 dark:border-zinc-700">
            ⏱️ 60-second timer · 6 posts per round · Streak bonuses
          </div>
        </div>

        {/* Mode Option 2: Practice Mode */}
        <div
          onClick={() => {
            soundManager.playClick();
            setSelectedMode('practice');
          }}
          className={`cursor-pointer rounded-2xl p-6 border transition-all ${
            selectedMode === 'practice'
              ? 'bg-emerald-50/50 dark:bg-zinc-800 border-2 border-emerald-600 dark:border-emerald-400 shadow-md shadow-emerald-500/10'
              : 'bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 hover:border-slate-400'
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            {selectedMode === 'practice' && (
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </div>

          <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
            Untimed Mode
          </div>
          <h2 className="font-bold text-xl text-slate-900 dark:text-zinc-100 mb-1">
            Practice & Learn
          </h2>
          <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed mb-4">
            Untimed 6-post round. Take all the time you need to examine evidence, cross-reference clues, and study the practical lessons at your own comfortable pace.
          </p>

          <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold pt-2 border-t border-slate-200 dark:border-zinc-700">
            📖 No clock pressure · 6 posts per round · Detailed takeaways
          </div>
        </div>

      </div>

      {/* Difficulty Selection */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="font-bold text-sm text-slate-900 dark:text-zinc-100 uppercase tracking-wide">
            Select Difficulty Level
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Easy */}
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedDifficulty('easy');
            }}
            className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
              selectedDifficulty === 'easy'
                ? 'bg-emerald-50 dark:bg-zinc-800 border-emerald-600 dark:border-emerald-500 shadow-sm'
                : 'bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-base text-emerald-800 dark:text-emerald-400">
                Easy
              </span>
              {selectedDifficulty === 'easy' && <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />}
            </div>
            <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
              Clearer clues and more obvious source contradictions.
            </p>
          </button>

          {/* Normal */}
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedDifficulty('normal');
            }}
            className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
              selectedDifficulty === 'normal'
                ? 'bg-blue-50 dark:bg-zinc-800 border-blue-600 dark:border-blue-500 shadow-sm'
                : 'bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-base text-blue-800 dark:text-blue-400">
                Normal
              </span>
              {selectedDifficulty === 'normal' && <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 stroke-[2.5]" />}
            </div>
            <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
              Balanced difficulty. Requires comparing multiple clues.
            </p>
          </button>

          {/* Hard */}
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedDifficulty('hard');
            }}
            className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
              selectedDifficulty === 'hard'
                ? 'bg-rose-50 dark:bg-zinc-800 border-rose-600 dark:border-rose-500 shadow-sm'
                : 'bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-base text-rose-800 dark:text-rose-400">
                Hard
              </span>
              {selectedDifficulty === 'hard' && <Check className="w-5 h-5 text-rose-600 dark:text-rose-400 stroke-[2.5]" />}
            </div>
            <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
              Subtle source flaws, selective framing, and genuine ambiguity.
            </p>
          </button>

        </div>
      </div>

      {/* Launch Action */}
      <div className="text-center">
        <button
          onClick={handleLaunch}
          className="w-full sm:w-auto px-10 py-4 font-bold text-base text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all flex items-center justify-center gap-2.5 mx-auto shadow-md shadow-blue-500/25 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Start Playing ({selectedMode === 'standard' ? 'Timed 60s' : 'Untimed Practice'})</span>
        </button>
      </div>

    </div>
  );
};
