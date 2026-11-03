/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Achievement, PlayerStats, RoundResult } from '../types/game';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-check',
    title: 'FIRST CHECK',
    description: 'Investigate your very first piece of evidence in any scenario.',
    iconName: 'Search',
    requirementDescription: 'Open any evidence clue'
  },
  {
    id: 'source-seeker',
    title: 'SOURCE SEEKER',
    description: 'Investigate at least 10 evidence clues across your rounds.',
    iconName: 'Compass',
    requirementDescription: '10 total clues inspected'
  },
  {
    id: 'context-matters',
    title: 'RAGEBAIT TAMER',
    description: 'Correctly identify 3 viral ragebait scenarios.',
    iconName: 'Layers',
    requirementDescription: '3 correct in Ragebait'
  },
  {
    id: 'steady-hand',
    title: 'STEADY HAND',
    description: 'Complete a Standard Mode round with 100% accuracy (minimum 3 scenarios attempted).',
    iconName: 'ShieldCheck',
    requirementDescription: 'Flawless round completed'
  },
  {
    id: 'rumour-control',
    title: 'GOSSIP DISPROVER',
    description: 'Correctly verify or flag 3 celebrity gossip scenarios.',
    iconName: 'MessageSquareWarning',
    requirementDescription: '3 correct in Gossips & Drama'
  },
  {
    id: 'repeat-player',
    title: 'REPEAT PLAYER',
    description: 'Complete 5 full Standard Mode 60-second rounds.',
    iconName: 'RotateCcw',
    requirementDescription: '5 Standard rounds played'
  },
  {
    id: 'speed-verifier',
    title: 'ACCURACY STREAK',
    description: 'Reach a streak of 5 consecutive correct decisions in a single round.',
    iconName: 'Flame',
    requirementDescription: '5x decision streak'
  },
  {
    id: 'master-investigator',
    title: 'HIGH SCORER',
    description: 'Score 500 or more points in a single Standard Mode round.',
    iconName: 'Trophy',
    requirementDescription: '500+ points in one round'
  }
];

export function evaluateNewAchievements(
  currentStats: PlayerStats,
  roundResult?: RoundResult
): string[] {
  const newUnlocked: string[] = [];
  const alreadyUnlocked = new Set(currentStats.unlockedAchievements);

  const check = (id: string, condition: boolean) => {
    if (!alreadyUnlocked.has(id) && condition) {
      newUnlocked.push(id);
    }
  };

  // 1. FIRST CHECK
  check('first-check', currentStats.totalCluesInvestigated >= 1);

  // 2. SOURCE SEEKER
  check('source-seeker', currentStats.totalCluesInvestigated >= 10);

  // 3. RAGEBAIT TAMER
  const rbStats = currentStats.categoryStats.ragebait;
  check('context-matters', (rbStats?.correct ?? 0) >= 3);

  // 4. GOSSIP DISPROVER
  const gossipStats = currentStats.categoryStats.gossips;
  check('rumour-control', (gossipStats?.correct ?? 0) >= 3);

  // 5. REPEAT PLAYER
  check('repeat-player', currentStats.totalStandardRounds >= 5);

  // Round-specific achievements
  if (roundResult) {
    // 6. STEADY HAND
    if (
      roundResult.mode === 'standard' &&
      roundResult.attemptedCount >= 3 &&
      roundResult.incorrectCount === 0
    ) {
      check('steady-hand', true);
    }

    // 7. SPEED VERIFIER
    if (roundResult.bestStreak >= 5) {
      check('speed-verifier', true);
    }

    // 8. MASTER INVESTIGATOR
    if (roundResult.totalScore >= 500) {
      check('master-investigator', true);
    }
  }

  return newUnlocked;
}
