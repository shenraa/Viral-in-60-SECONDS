/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Trophy, Settings, Info, Shield, Flame, Sparkles, CheckCircle2, Cloud, Award } from 'lucide-react';
import { PlayerStats, ScreenId } from '../types/game';
import { soundManager } from '../utils/sound';
import { CommunitySurveyModal } from '../components/CommunitySurveyModal';

interface HomeScreenProps {
  onStartGame: (mode: 'standard' | 'practice') => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenTutorial: () => void;
  stats: PlayerStats;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onNavigate,
  onOpenTutorial,
  stats
}) => {
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState<boolean>(false);
  const hasPlayedBefore = stats.totalStandardRounds > 0 || stats.totalPracticeScenarios > 0;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      
      {/* Top Banner: Warm Welcome Greeting */}
      <div className="pt-2 sm:pt-4 text-center">
        {hasPlayedBefore ? (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs text-slate-700 dark:text-zinc-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-900 dark:text-zinc-100">Welcome back!</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-zinc-500">·</span>
            <span className="text-blue-700 dark:text-blue-400 font-bold font-mono-numbers">
              Personal Best: {stats.highScoreStandard} pts
            </span>
            <span aria-hidden="true" className="text-slate-400 dark:text-zinc-500">·</span>
            <span className="text-slate-600 dark:text-zinc-400">{stats.totalStandardRounds} rounds played</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-xs text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Digital Media Literacy & Fact-Checking Challenge</span>
          </div>
        )}
      </div>

      {/* Hero Section: Game Identity & Play Actions */}
      <div className="py-8 sm:py-12 text-center max-w-2xl mx-auto">
        <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tight text-slate-900 dark:text-white mb-4">
          Viral in <span className="text-blue-600 dark:text-blue-400">60 Seconds</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-xl mx-auto mb-8 font-normal">
          Can you tell real journalism from fabricated ragebait, fake news, and gossips? Put your instinct to the test in rapid 6-question rounds.
        </p>

        {/* Primary Action Button: "Play" opens mode selection */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('mode_select');
            }}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Play Game</span>
          </button>
        </div>

        {/* Quick Utilities / Secondary Links */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTutorial();
            }}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 transition-colors border border-slate-300 dark:border-zinc-700 shadow-2xs cursor-pointer"
          >
            How to Play Guide
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setIsCommunityModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 transition-colors border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 shadow-2xs cursor-pointer font-medium"
          >
            <Cloud className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Community Survey Results (Firebase)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('statistics');
            }}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 transition-colors border border-slate-300 dark:border-zinc-700 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Your Statistics & Badges
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('credits');
            }}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 transition-colors border border-slate-300 dark:border-zinc-700 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Credits
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('settings');
            }}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 transition-colors border border-slate-300 dark:border-zinc-700 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('about');
            }}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 transition-colors border border-slate-300 dark:border-zinc-700 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            About the Game
          </button>
        </div>
      </div>

      {/* Footer Area with Attribution & Value Pillars */}
      <div className="space-y-4">
        {/* Footer Strip: Human benefits */}
        <div className="border-t border-slate-300 dark:border-zinc-700 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium">Real-World Fact-Checking Clues</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-medium">Streak Bonuses for Careful Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-medium">Connected to Firebase Firestore Cloud API</span>
          </div>
        </div>

        {/* Small, unobtrusive official DYAP attribution line on main menu */}
        <div className="text-center pt-1 pb-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('credits');
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-blue-500 rounded px-2.5 py-1 cursor-pointer font-medium hover:underline"
            title="View official credits screen"
          >
            <span>Made by the DYAP Team · Game concept & development by Shenraa</span>
          </button>
        </div>
      </div>

      {/* Community Survey Modal */}
      <CommunitySurveyModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
      />

    </div>
  );
};
