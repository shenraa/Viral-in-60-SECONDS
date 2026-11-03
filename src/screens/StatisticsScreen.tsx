/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Trophy, Flame, Search, Award, Target, Cloud, Users } from 'lucide-react';
import { PlayerStats, ScreenId } from '../types/game';
import { ACHIEVEMENTS } from '../data/achievements';
import { soundManager } from '../utils/sound';
import { CommunitySurveyModal } from '../components/CommunitySurveyModal';

interface StatisticsScreenProps {
  stats: PlayerStats;
  onNavigate: (screen: ScreenId) => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  ragebait: 'Ragebait & Outrage',
  fake_news: 'Breaking Fake News',
  gossips: 'Gossips & Drama',
};

export const StatisticsScreen: React.FC<StatisticsScreenProps> = ({
  stats,
  onNavigate
}) => {
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState<boolean>(false);

  const averageScore = stats.totalStandardRounds > 0
    ? Math.round(stats.totalScoreAccumulated / stats.totalStandardRounds)
    : 0;

  const totalDecisions = stats.totalCorrect + stats.totalIncorrect;
  const overallAccuracy = totalDecisions > 0
    ? Math.round((stats.totalCorrect / totalDecisions) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header with back */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('home');
          }}
          className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1 -ml-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              setIsCommunityModalOpen(true);
            }}
            className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Cloud className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Community Survey (Firebase)</span>
          </button>

          <span className="text-xs text-slate-600 dark:text-zinc-400 font-semibold bg-slate-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hidden sm:inline-block">
            Personal History
          </span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Your Statistics & Badges
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1.5">
          Track your progress, category mastery, and unlocked digital literacy achievements
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
          <div className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1 font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>High Score</span>
          </div>
          <div className="font-extrabold text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 font-mono-numbers">
            {stats.highScoreStandard.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Standard 60s round
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
          <div className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1 font-semibold">
            <Target className="w-3.5 h-3.5 text-emerald-500" />
            <span>Accuracy</span>
          </div>
          <div className="font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 font-mono-numbers">
            {overallAccuracy}%
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {stats.totalCorrect} of {totalDecisions} correct
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
          <div className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1 font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Best Streak</span>
          </div>
          <div className="font-extrabold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400 font-mono-numbers">
            {stats.bestStreakEver}x
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Consecutive decisions
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
          <div className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1 font-semibold">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Clues Checked</span>
          </div>
          <div className="font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white font-mono-numbers">
            {stats.totalCluesInvestigated}
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Evidence checks
          </div>
        </div>

      </div>

      {/* Secondary Metrics Strip */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-600 dark:text-zinc-400 shadow-2xs">
        <div>
          Standard Rounds: <strong className="text-slate-900 dark:text-white font-mono-numbers font-bold">{stats.totalStandardRounds}</strong>
        </div>
        <span aria-hidden="true" className="text-slate-300 dark:text-zinc-600">·</span>
        <div>
          Practice Scenarios: <strong className="text-slate-900 dark:text-white font-mono-numbers font-bold">{stats.totalPracticeScenarios}</strong>
        </div>
        <span aria-hidden="true" className="text-slate-300 dark:text-zinc-600">·</span>
        <div>
          Average Score: <strong className="text-slate-900 dark:text-white font-mono-numbers font-bold">{averageScore} pts</strong>
        </div>
        <span aria-hidden="true" className="text-slate-300 dark:text-zinc-600">·</span>
        <div>
          Total Points: <strong className="text-slate-900 dark:text-white font-mono-numbers font-bold">{stats.totalScoreAccumulated.toLocaleString()}</strong>
        </div>
      </div>

      {/* Category Breakdown Section */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-base text-slate-900 dark:text-white mb-4">
          Accuracy by Misinformation Category
        </h2>

        <div className="space-y-4">
          {Object.entries(stats.categoryStats).map(([catKey, data]) => {
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

            return (
              <div key={catKey}>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 mb-1.5 font-medium">
                  <span className="text-slate-900 dark:text-white font-semibold">{CATEGORY_NAMES[catKey] || catKey}</span>
                  <span>
                    {data.correct} of {data.total} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-zinc-700">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.max(5, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Showcase Section */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Investigative Badges ({stats.unlockedAchievements.length} of {ACHIEVEMENTS.length} Unlocked)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = stats.unlockedAchievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-blue-50/30 dark:bg-zinc-800 border-blue-200 dark:border-blue-800 shadow-2xs'
                    : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-700 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-300'
                      : 'bg-slate-200 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-400'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {ach.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isUnlocked ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-200 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      {isUnlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                  <div className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-medium">
                    Requirement: {ach.requirementDescription}
                  </div>
                </div>
              </div>
            );
          })}
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
