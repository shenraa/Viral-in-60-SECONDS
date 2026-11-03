/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Volume2, Eye, Sliders, Trash2, RotateCcw, AlertTriangle, Check, Sun, Moon, ShieldCheck, Lock } from 'lucide-react';
import { DifficultyLevel, GameMode, GameSettings, ScreenId } from '../types/game';
import { soundManager } from '../utils/sound';

interface SettingsScreenProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onResetStats: () => void;
  onResetPreferences: () => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenTutorial: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onResetStats,
  onResetPreferences,
  onNavigate,
  onOpenTutorial
}) => {
  const [confirmModal, setConfirmModal] = useState<'stats' | 'preferences' | null>(null);

  const toggle = (key: keyof GameSettings) => {
    soundManager.playClick();
    onUpdateSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const setDifficulty = (diff: DifficultyLevel) => {
    soundManager.playClick();
    onUpdateSettings({
      ...settings,
      defaultDifficulty: diff
    });
  };

  const setMode = (mode: GameMode) => {
    soundManager.playClick();
    onUpdateSettings({
      ...settings,
      defaultMode: mode
    });
  };

  const setTheme = (theme: 'light' | 'dark') => {
    soundManager.playClick();
    onUpdateSettings({
      ...settings,
      theme
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    soundManager.setVolume(val);
    onUpdateSettings({
      ...settings,
      soundVolume: val
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('home');
          }}
          className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1 -ml-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Game Settings & Accessibility
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1.5">
          Customize sound effects, accessibility options, and manage your local data
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Section 0: Appearance / Theme */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <Sun className="w-5 h-5" />
            <h2 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white">
              Visual Theme & Appearance
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                settings.theme !== 'dark'
                  ? 'bg-blue-50/50 dark:bg-zinc-700 border-blue-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Warm Editorial Light
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    Friendly, human-designed paper aesthetic
                  </div>
                </div>
              </div>
              {settings.theme !== 'dark' && <Check className="w-4 h-4 text-blue-600" />}
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                settings.theme === 'dark'
                  ? 'bg-blue-50/50 dark:bg-zinc-700 border-blue-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Cozy Charcoal Dark
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    Soft, calm dark mode for low light
                  </div>
                </div>
              </div>
              {settings.theme === 'dark' && <Check className="w-4 h-4 text-blue-400" />}
            </button>
          </div>
        </div>

        {/* Section 1: Audio Controls */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <Volume2 className="w-5 h-5" />
            <h2 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white">
              Audio & Sound Effects
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Sound Effects
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  Play chimes for clues, ticks for time warnings, and scoring fanfares
                </div>
              </div>
              <button
                onClick={() => {
                  toggle('soundEnabled');
                  soundManager.setMuted(settings.soundEnabled);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  settings.soundEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-600'
                }`}
                aria-label="Toggle Sound Effects"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.soundEnabled && (
              <div className="pt-2 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-4 text-xs">
                <div className="text-slate-600 dark:text-zinc-400">
                  Sound Volume ({Math.round(settings.soundVolume * 100)}%)
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.soundVolume}
                  onChange={handleVolumeChange}
                  className="w-36 sm:w-48 accent-blue-600 cursor-pointer"
                  aria-label="Sound Volume"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Accessibility */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <Eye className="w-5 h-5" />
            <h2 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white">
              Visual Accessibility & Readability
            </h2>
          </div>

          <div className="space-y-4">
            {/* Reduced Motion */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Reduced Motion
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  Turns off countdown pulses, timer flashing, and motion effects
                </div>
              </div>
              <button
                onClick={() => toggle('reducedMotion')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  settings.reducedMotion ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-600'
                }`}
                aria-label="Toggle Reduced Motion"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* High Contrast Mode */}
            <div className="pt-3 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  High Contrast Outlines
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  Increases border clarity and text contrast across all cards
                </div>
              </div>
              <button
                onClick={() => toggle('highContrast')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  settings.highContrast ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-600'
                }`}
                aria-label="Toggle High Contrast"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Non-color indicators */}
            <div className="pt-3 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Non-Color Status Indicators
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  Always pairs status colors with explicit text and icons for color-blind accessibility
                </div>
              </div>
              <button
                onClick={() => toggle('nonColorIndicators')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  settings.nonColorIndicators ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-600'
                }`}
                aria-label="Toggle Non-Color Indicators"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.nonColorIndicators ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Text Scale */}
            <div className="pt-3 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Text Sizing
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  Adjust post body copy and fact-check clue font sizes
                </div>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl border border-slate-200 dark:border-zinc-700">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onUpdateSettings({ ...settings, textSize: 'normal' });
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                    settings.textSize === 'normal'
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onUpdateSettings({ ...settings, textSize: 'large' });
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                    settings.textSize === 'large'
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  Large (120%)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Gameplay Defaults */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <Sliders className="w-5 h-5" />
            <h2 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white">
              Gameplay Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Default Difficulty
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'normal', 'hard'] as DifficultyLevel[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      settings.defaultDifficulty === d
                        ? 'bg-blue-50/50 dark:bg-zinc-700 border-blue-500 text-blue-700 dark:text-blue-400 shadow-2xs'
                        : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-zinc-700">
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Default Game Mode
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['standard', 'practice'] as GameMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      settings.defaultMode === m
                        ? 'bg-blue-50/50 dark:bg-zinc-700 border-blue-500 text-blue-700 dark:text-blue-400 shadow-2xs'
                        : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
                    }`}
                  >
                    {m === 'standard' ? '60-Second Challenge' : 'Untimed Practice'}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Confirm Before Leaving a Round
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  Shows a prompt before exiting an active 60-second game
                </div>
              </div>
              <button
                onClick={() => toggle('confirmExit')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                  settings.confirmExit ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-600'
                }`}
                aria-label="Toggle Confirm Exit"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.confirmExit ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Tutorial & Rules Guide
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  Re-read the 4-step onboarding explanation
                </div>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenTutorial();
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-zinc-700 hover:bg-blue-100 border border-blue-200 dark:border-zinc-700 rounded-xl transition-colors cursor-pointer"
              >
                Open Guide
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Security Laws & Storage Encryption */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white">
                Security Laws & Data Encryption
              </h2>
            </div>
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-800">
              Fortress Active
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
            All user data, career statistics, and cloud survey submissions are protected by hardened Firestore security laws, strict input boundary checks, and client-side cryptographic encryption.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>AES-256 Storage Encryption</span>
              </div>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                Local preferences, high scores, and tokens are stored encrypted at rest with device-bound PBKDF2 salting.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Firestore Fortress Laws</span>
              </div>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                Rules enforce default-deny, strict schema types, score boundary limits, and terminal immutability against tampering.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Data Management & Reset */}
        <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-rose-600 dark:text-rose-400">
            <Trash2 className="w-5 h-5" />
            <h2 className="font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white">
              Data Management & Local Records
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                setConfirmModal('stats');
              }}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:text-white bg-rose-50 dark:bg-zinc-800 hover:bg-rose-600 dark:hover:bg-rose-600 border border-rose-300 dark:border-rose-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Career Statistics</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setConfirmModal('preferences');
              }}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-600 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              Reset All Preferences to Defaults
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Safeguard Modal */}
      {confirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
        >
          <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 w-full max-w-md rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {confirmModal === 'stats'
                ? 'Reset All Statistics & Badges?'
                : 'Reset All Preferences?'}
            </h3>

            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              {confirmModal === 'stats'
                ? 'This will permanently remove your high score, round history, and unlocked badges from your browser storage. This cannot be undone.'
                : 'This will reset sound volumes, visual themes, accessibility options, and gameplay modes back to default values.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  if (confirmModal === 'stats') {
                    onResetStats();
                  } else {
                    onResetPreferences();
                  }
                  setConfirmModal(null);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
