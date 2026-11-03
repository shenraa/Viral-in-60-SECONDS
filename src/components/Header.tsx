/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Trophy, Settings, HelpCircle, Info, Sparkles, Award } from 'lucide-react';
import { ScreenId, GameSettings } from '../types/game';
import { soundManager } from '../utils/sound';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  settings: GameSettings;
  onToggleSound: () => void;
  onOpenTutorial: () => void;
  isGameActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  settings,
  onToggleSound,
  onOpenTutorial,
  isGameActive = false
}) => {
  const handleNavClick = (screen: ScreenId) => {
    soundManager.playClick();
    onNavigate(screen);
  };

  return (
    <header className="border-b border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Friendly brand mark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 -ml-1 transition-colors"
          aria-label="Go to home screen"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm group-hover:bg-blue-700 transition-colors">
            60s
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              VIRAL IN 60 SECONDS
            </span>
          </div>
        </button>

        {/* Zone 2: Human navigation links */}
        {!isGameActive ? (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-zinc-400">
            <button
              onClick={() => handleNavClick('mode_select')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentScreen === 'mode_select' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              Play
            </button>
            <button
              onClick={() => handleNavClick('statistics')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentScreen === 'statistics' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              Statistics
            </button>
            <button
              onClick={() => handleNavClick('settings')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentScreen === 'settings' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentScreen === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              <Info className="w-4 h-4" />
              About
            </button>
            <button
              onClick={() => handleNavClick('credits')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentScreen === 'credits' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Credits
            </button>
          </nav>
        ) : (
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Round in progress</span>
          </div>
        )}

        {/* Zone 3: Quick controls & Primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTutorial();
            }}
            className="p-2 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="How to Play"
            aria-label="How to Play guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleSound}
            className="p-2 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title={settings.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label={settings.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
            )}
          </button>

          {!isGameActive && currentScreen !== 'mode_select' && (
            <button
              onClick={() => handleNavClick('mode_select')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-blue-500/20"
            >
              Play Now
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
