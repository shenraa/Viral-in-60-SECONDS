/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionChoice, PerformancePersona, RoundResult, Scenario, UserDecision } from '../types/game';

export interface ScoreBreakdown {
  isCorrect: boolean;
  isPartiallyCorrect: boolean;
  baseScore: number;
  clueBonus: number;
  streakBonus: number;
  totalScore: number;
}

export function calculateScenarioScore(params: {
  action: ActionChoice;
  scenario: Scenario;
  investigatedClues: string[];
  currentStreak: number;
}): ScoreBreakdown {
  const { action, scenario, investigatedClues, currentStreak } = params;

  const isExactCorrect = action.toLowerCase() === scenario.correctAction.toLowerCase();
  const isAcceptable = scenario.acceptableActions.some(
    (a) => a.toLowerCase() === action.toLowerCase()
  );

  let baseScore = 0;
  let isPartiallyCorrect = false;

  if (isExactCorrect) {
    baseScore = 100;
  } else if (isAcceptable) {
    baseScore = 50;
    isPartiallyCorrect = true;
  }

  // Clue bonus: +10 per investigated clue, capped strictly at +25 per scenario
  const uniqueClues = new Set(investigatedClues).size;
  const clueBonus = Math.min(uniqueClues * 10, 25);

  // Streak bonus: only if decision was correct/acceptable. Multiplier: 15 * streak, capped at 75
  let streakBonus = 0;
  if (isExactCorrect || isPartiallyCorrect) {
    streakBonus = Math.min(currentStreak * 15, 75);
  }

  const totalScore = (isExactCorrect || isPartiallyCorrect)
    ? baseScore + clueBonus + streakBonus
    : 0;

  return {
    isCorrect: isExactCorrect,
    isPartiallyCorrect,
    baseScore,
    clueBonus: (isExactCorrect || isPartiallyCorrect) ? clueBonus : 0,
    streakBonus,
    totalScore
  };
}

export function determinePerformancePersona(
  decisions: UserDecision[],
  categoryBreakdown: RoundResult['categoryBreakdown']
): PerformancePersona {
  if (decisions.length === 0) return 'STILL INVESTIGATING';

  const totalClues = decisions.reduce((acc, d) => acc + d.cluesInvestigated.length, 0);
  const avgClues = totalClues / decisions.length;
  const correctCount = decisions.filter((d) => d.isCorrect || d.isPartiallyCorrect).length;
  const accuracy = (correctCount / decisions.length) * 100;

  // Context Detective check: aced ragebait
  const rbStats = categoryBreakdown.ragebait;
  if (rbStats && rbStats.total >= 2 && rbStats.correct === rbStats.total) {
    return 'CONTEXT DETECTIVE';
  }

  // Careful Investigator
  if (avgClues >= 1.2 && accuracy >= 70) {
    return 'CAREFUL INVESTIGATOR';
  }

  // Fast Scroller
  if (avgClues < 0.8 && decisions.length >= 4) {
    return 'FAST SCROLLER';
  }

  // Critical Thinker
  if (accuracy >= 80) {
    return 'CRITICAL THINKER';
  }

  return 'STILL INVESTIGATING';
}
