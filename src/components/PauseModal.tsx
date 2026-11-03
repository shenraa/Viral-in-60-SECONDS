/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, RotateCcw, Home, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
  timeRemaining: number;
  currentScore: number;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onRestart,
  onExit,
  timeRemaining,
  currentScore
}) => {
  const [confirmingAction, setConfirmingAction] = useState<'restart' | 'exit' | null>(null);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 w-full max-w-md rounded-2xl p-6 shadow-2xl text-center transition-all">
        
        {/* Title */}
        <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 text-xs font-semibold mb-3">
          Game Paused · Clock Frozen
        </div>
        <h2 id="pause-modal-title" className="font-extrabold text-2xl text-slate-900 dark:text-white mb-1">
          Take a Breath
        </h2>
        <div className="flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-zinc-400 font-medium mb-6">
          <span>Time Remaining: <strong className="text-blue-600 dark:text-blue-400 font-mono-numbers">{timeRemaining}s</strong></span>
          <span aria-hidden="true" className="text-slate-300 dark:text-zinc-600">·</span>
          <span>Score: <strong className="text-slate-800 dark:text-zinc-200 font-mono-numbers">{currentScore.toLocaleString()} pts</strong></span>
        </div>

        {confirmingAction === null ? (
          <div className="space-y-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onResume();
              }}
              autoFocus
              className="w-full py-3.5 px-4 font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm shadow-blue-500/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Game</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setConfirmingAction('restart');
              }}
              className="w-full py-3 px-4 font-semibold text-sm text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-600 rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
              <span>Restart Round</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setConfirmingAction('exit');
              }}
              className="w-full py-3 px-4 font-semibold text-sm text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Exit to Home Menu</span>
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>
                {confirmingAction === 'restart'
                  ? 'Restart this round?'
                  : 'Exit to home menu?'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              {confirmingAction === 'restart'
                ? 'Your current score and time will be reset to 60 seconds.'
                : 'Current round progress will not be saved.'}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setConfirmingAction(null);
                }}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  if (confirmingAction === 'restart') {
                    onRestart();
                  } else {
                    onExit();
                  }
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
