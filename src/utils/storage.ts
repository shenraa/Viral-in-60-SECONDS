/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameSettings, PlayerStats, ScenarioCategory } from '../types/game';
import { encryptSync, decryptSync } from './crypto';

const SETTINGS_KEY = 'viral60_settings_v1';
const STATS_KEY = 'viral60_stats_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  soundVolume: 0.7,
  reducedMotion: false,
  highContrast: false,
  textSize: 'normal',
  nonColorIndicators: true,
  defaultDifficulty: 'normal',
  defaultMode: 'standard',
  confirmExit: true,
  hasCompletedTutorial: false,
  theme: 'light',
};

const INITIAL_CATEGORY_STATS: Record<ScenarioCategory, { correct: number; total: number }> = {
  ragebait: { correct: 0, total: 0 },
  fake_news: { correct: 0, total: 0 },
  gossips: { correct: 0, total: 0 },
};

export const DEFAULT_STATS: PlayerStats = {
  version: 1,
  totalStandardRounds: 0,
  totalPracticeScenarios: 0,
  highScoreStandard: 0,
  totalScoreAccumulated: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  totalCluesInvestigated: 0,
  bestStreakEver: 0,
  categoryStats: INITIAL_CATEGORY_STATS,
  unlockedAchievements: [],
  lastPlayedAt: undefined,
};

// Safe localStorage wrapper
function isStorageAvailable(): boolean {
  try {
    const test = '__viral_storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

let inMemorySettings: GameSettings = { ...DEFAULT_SETTINGS };
let inMemoryStats: PlayerStats = { ...DEFAULT_STATS };

export function loadSettings(): GameSettings {
  if (!isStorageAvailable()) return inMemorySettings;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    
    // Decrypt authenticated payload (auto-migrating legacy plaintext if present)
    const parsed = decryptSync<Partial<GameSettings>>(raw, DEFAULT_SETTINGS);

    // If item was stored in unencrypted legacy JSON, seamlessly upgrade to encrypted format
    if (!raw.startsWith('enc_v2:')) {
      try {
        const encrypted = encryptSync(parsed);
        window.localStorage.setItem(SETTINGS_KEY, encrypted);
      } catch {}
    }

    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (err) {
    console.warn('Failed to parse encrypted settings, falling back to defaults:', err);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  inMemorySettings = settings;
  if (!isStorageAvailable()) return;
  try {
    const encrypted = encryptSync(settings);
    window.localStorage.setItem(SETTINGS_KEY, encrypted);
  } catch (err) {
    console.warn('Failed to persist encrypted settings:', err);
  }
}

export function loadPlayerStats(): PlayerStats {
  if (!isStorageAvailable()) return inMemoryStats;
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;

    // Decrypt authenticated payload (auto-migrating legacy plaintext if present)
    const parsed = decryptSync<Partial<PlayerStats>>(raw, DEFAULT_STATS);

    // Upgrade unencrypted legacy data to encrypted storage
    if (!raw.startsWith('enc_v2:')) {
      try {
        const encrypted = encryptSync(parsed);
        window.localStorage.setItem(STATS_KEY, encrypted);
      } catch {}
    }

    return {
      ...DEFAULT_STATS,
      ...parsed,
      categoryStats: {
        ...INITIAL_CATEGORY_STATS,
        ...(parsed.categoryStats || {})
      }
    };
  } catch (err) {
    console.warn('Failed to parse encrypted stats, falling back to defaults:', err);
    return DEFAULT_STATS;
  }
}

export function savePlayerStats(stats: PlayerStats): void {
  inMemoryStats = stats;
  if (!isStorageAvailable()) return;
  try {
    const encrypted = encryptSync(stats);
    window.localStorage.setItem(STATS_KEY, encrypted);
  } catch (err) {
    console.warn('Failed to persist encrypted stats:', err);
  }
}

export function resetPlayerStats(): PlayerStats {
  inMemoryStats = { ...DEFAULT_STATS };
  if (isStorageAvailable()) {
    try {
      window.localStorage.removeItem(STATS_KEY);
    } catch (err) {
      console.warn('Failed to clear stats from localStorage:', err);
    }
  }
  return inMemoryStats;
}

export function resetAllPreferences(): GameSettings {
  inMemorySettings = { ...DEFAULT_SETTINGS };
  if (isStorageAvailable()) {
    try {
      window.localStorage.removeItem(SETTINGS_KEY);
    } catch (err) {
      console.warn('Failed to clear settings from localStorage:', err);
    }
  }
  return inMemorySettings;
}
