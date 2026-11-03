/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DifficultyLevel, GameMode, GameSettings, PlayerStats, RoundResult, ScreenId } from './types/game';
import {
  loadPlayerStats,
  loadSettings,
  resetAllPreferences,
  resetPlayerStats,
  savePlayerStats,
  saveSettings
} from './utils/storage';
import { soundManager } from './utils/sound';
import { evaluateNewAchievements } from './data/achievements';
import { Header } from './components/Header';
import { HomeScreen } from './screens/HomeScreen';
import { ModeSelectScreen } from './screens/ModeSelectScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { MistakeReviewScreen } from './screens/MistakeReviewScreen';
import { StatisticsScreen } from './screens/StatisticsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { CreditsScreen } from './screens/CreditsScreen';
import { TutorialModal } from './screens/TutorialModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [settings, setSettings] = useState<GameSettings>(() => loadSettings());
  const [stats, setStats] = useState<PlayerStats>(() => loadPlayerStats());

  // Active game session config
  const [activeMode, setActiveMode] = useState<GameMode>(settings.defaultMode);
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyLevel>(settings.defaultDifficulty);
  const [lastRoundResult, setLastRoundResult] = useState<RoundResult | null>(null);

  // Tutorial Modal
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  // Sync sound manager settings on initial mount
  useEffect(() => {
    soundManager.setMuted(!settings.soundEnabled);
    soundManager.setVolume(settings.soundVolume);
  }, []);

  // Sync theme with document element
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Update settings handler
  const handleUpdateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    soundManager.setMuted(!newSettings.soundEnabled);
    soundManager.setVolume(newSettings.soundVolume);
  };

  // Toggle audio
  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    handleUpdateSettings(updated);
  };

  // Start game flow
  const handleStartGame = (mode: GameMode = 'standard') => {
    setActiveMode(mode);
    setCurrentScreen('gameplay');
  };

  // Launch from mode selection
  const handleLaunchMode = (mode: GameMode, difficulty: DifficultyLevel) => {
    setActiveMode(mode);
    setActiveDifficulty(difficulty);
    setCurrentScreen('gameplay');
  };

  // Round completion: update statistics & evaluate achievements
  const handleFinishRound = (result: RoundResult) => {
    setLastRoundResult(result);

    setStats((prevStats) => {
      const isStandard = result.mode === 'standard';
      const updatedTotalStandard = isStandard
        ? prevStats.totalStandardRounds + 1
        : prevStats.totalStandardRounds;
      const updatedTotalPractice = !isStandard
        ? prevStats.totalPracticeScenarios + result.attemptedCount
        : prevStats.totalPracticeScenarios;

      const updatedHighScore = isStandard
        ? Math.max(prevStats.highScoreStandard, result.totalScore)
        : prevStats.highScoreStandard;

      const updatedTotalScore = isStandard
        ? prevStats.totalScoreAccumulated + result.totalScore
        : prevStats.totalScoreAccumulated;

      const updatedTotalCorrect = prevStats.totalCorrect + result.correctCount;
      const updatedTotalIncorrect = prevStats.totalIncorrect + result.incorrectCount;
      const updatedClues = prevStats.totalCluesInvestigated + result.cluesInvestigatedCount;
      const updatedBestStreak = Math.max(prevStats.bestStreakEver, result.bestStreak);

      // Merge category breakdown
      const updatedCategoryStats = { ...prevStats.categoryStats };
      Object.entries(result.categoryBreakdown).forEach(([catKey, data]) => {
        const key = catKey as keyof typeof updatedCategoryStats;
        if (updatedCategoryStats[key]) {
          updatedCategoryStats[key] = {
            correct: updatedCategoryStats[key].correct + data.correct,
            total: updatedCategoryStats[key].total + data.total
          };
        }
      });

      const candidateStats: PlayerStats = {
        ...prevStats,
        totalStandardRounds: updatedTotalStandard,
        totalPracticeScenarios: updatedTotalPractice,
        highScoreStandard: updatedHighScore,
        totalScoreAccumulated: updatedTotalScore,
        totalCorrect: updatedTotalCorrect,
        totalIncorrect: updatedTotalIncorrect,
        totalCluesInvestigated: updatedClues,
        bestStreakEver: updatedBestStreak,
        categoryStats: updatedCategoryStats,
        lastPlayedAt: new Date().toISOString()
      };

      // Evaluate new achievements
      const newlyUnlocked = evaluateNewAchievements(candidateStats, result);
      candidateStats.unlockedAchievements = [
        ...prevStats.unlockedAchievements,
        ...newlyUnlocked
      ];

      savePlayerStats(candidateStats);
      return candidateStats;
    });

    setCurrentScreen('results');
  };

  // Reset career stats
  const handleResetStats = () => {
    const fresh = resetPlayerStats();
    setStats(fresh);
  };

  // Reset preferences
  const handleResetPreferences = () => {
    const fresh = resetAllPreferences();
    setSettings(fresh);
  };

  // Mark tutorial complete
  const handleCompleteTutorial = () => {
    const updated = { ...settings, hasCompletedTutorial: true };
    handleUpdateSettings(updated);
  };

  return (
    <div
      className={`min-h-screen ${
        settings.theme === 'dark' ? 'dark bg-[#18181B] text-[#FAFAFA]' : 'bg-[#F8F9FA] text-[#0F172A]'
      } font-sans human-app-bg transition-colors ${
        settings.highContrast ? 'contrast-125' : ''
      } ${settings.textSize === 'large' ? 'text-lg' : 'text-base'}`}
    >
      {/* Universal Top Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        settings={settings}
        onToggleSound={handleToggleSound}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        isGameActive={currentScreen === 'gameplay'}
      />

      {/* Screen Routing */}
      <main className="w-full">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartGame={handleStartGame}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
            stats={stats}
          />
        )}

        {currentScreen === 'mode_select' && (
          <ModeSelectScreen
            initialMode={activeMode}
            initialDifficulty={activeDifficulty}
            onLaunch={handleLaunchMode}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'gameplay' && (
          <GameScreen
            mode={activeMode}
            difficulty={activeDifficulty}
            onFinishRound={handleFinishRound}
            onExitToMenu={() => setCurrentScreen('home')}
            highScore={stats.highScoreStandard}
          />
        )}

        {currentScreen === 'results' && lastRoundResult && (
          <ResultsScreen
            result={lastRoundResult}
            onPlayAgain={() => setCurrentScreen('gameplay')}
            onReviewMistakes={() => setCurrentScreen('mistake_review')}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'mistake_review' && lastRoundResult && (
          <MistakeReviewScreen
            result={lastRoundResult}
            onBackToResults={() => setCurrentScreen('results')}
          />
        )}

        {currentScreen === 'statistics' && (
          <StatisticsScreen
            stats={stats}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetStats={handleResetStats}
            onResetPreferences={handleResetPreferences}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen onNavigate={(screen) => setCurrentScreen(screen)} />
        )}

        {currentScreen === 'credits' && (
          <CreditsScreen onNavigate={(screen) => setCurrentScreen(screen)} />
        )}
      </main>

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onComplete={handleCompleteTutorial}
      />
    </div>
  );
}
