/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Sparkles, Shield, Award, Users, Terminal, Heart } from 'lucide-react';
import { ScreenId } from '../types/game';
import { soundManager } from '../utils/sound';

interface CreditsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CreditsScreen: React.FC<CreditsScreenProps> = ({ onNavigate }) => {
  const handleBack = () => {
    soundManager.playClick();
    onNavigate('home');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in slide-in-from-bottom-3 duration-300">
      
      {/* Top Navigation Control */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1 -ml-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Menu</span>
        </button>

        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Official Credits
        </span>
      </div>

      {/* Main Credits Card */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6 sm:p-10 text-center relative overflow-hidden transition-all">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Primary Project Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-extrabold uppercase tracking-widest text-blue-700 dark:text-blue-300 mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>A DYAP PROJECT</span>
        </div>

        {/* Game Title */}
        <h1 className="font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900 dark:text-white mb-2">
          VIRAL IN 60 SECONDS
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-md mx-auto mb-10">
          Interactive digital media literacy and misinformation verification challenge
        </p>

        {/* Official Attribution Sections */}
        <div className="space-y-6 max-w-lg mx-auto">
          
          {/* Created by */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1 flex items-center justify-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Created by</span>
            </div>
            <div className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-wide">
              THE DYAP TEAM
            </div>
          </div>

          {/* Game concept & development */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1 flex items-center justify-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Game concept & development</span>
            </div>
            <div className="font-extrabold text-xl sm:text-2xl text-blue-600 dark:text-blue-400 tracking-wide font-mono">
              SHENRAA
            </div>
          </div>

          {/* Programme */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1 flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Programme</span>
            </div>
            <div className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-wide">
              DIGITAL YOUTH AMBASSADOR PROGRAMME
            </div>
          </div>

        </div>

        {/* Mission note */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-zinc-700/80 max-w-lg mx-auto text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
          Empowering youth with practical discernment skills to navigate online algorithms, detect synthetic and out-of-context content, and foster a healthier digital commons.
        </div>

      </div>

      {/* Action Footer */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleBack}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Menu</span>
        </button>
      </div>

    </div>
  );
};
