/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, ShieldCheck, CheckCircle, AlertTriangle, HelpCircle, FileText, Eye, BookOpen } from 'lucide-react';
import { EvidenceClue, Scenario } from '../types/game';
import { soundManager } from '../utils/sound';

interface EvidencePanelProps {
  scenario: Scenario;
  investigatedClues: string[];
  onInvestigateClue: (clueId: string) => void;
  compact?: boolean;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  scenario,
  investigatedClues,
  onInvestigateClue,
  compact = false
}) => {
  const uniqueCount = new Set(investigatedClues).size;
  const currentBonus = Math.min(uniqueCount * 10, 25);

  const getReliabilityBadge = (reliability: EvidenceClue['reliability']) => {
    switch (reliability) {
      case 'verified_official':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            Official Verified Source
          </span>
        );
      case 'credible':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-700 text-xs font-bold">
            <CheckCircle className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
            Independent Corroboration
          </span>
        );
      case 'suspicious':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-700 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
            Contradictory / Unsubstantiated
          </span>
        );
      case 'inconclusive':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            Inconclusive Evidence
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-2xl flex flex-col h-full shadow-sm overflow-hidden transition-all">
      
      {/* Fact-Check Header */}
      <div className="p-4 bg-slate-50 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-zinc-100">
            Fact-Check Clues & Context
          </h3>
        </div>
        <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800">
          +{currentBonus} pts clue bonus
        </div>
      </div>

      {/* Clues List */}
      <div className="p-4 space-y-3.5 overflow-y-auto flex-1">
        {scenario.evidence.map((clue, idx) => {
          const isRevealed = investigatedClues.includes(clue.id);

          return (
            <div
              key={clue.id}
              className={`rounded-xl border transition-all ${
                isRevealed
                  ? 'bg-blue-50/40 dark:bg-zinc-900 border-blue-300 dark:border-blue-900/60 p-4'
                  : 'bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 p-3.5 hover:border-slate-400 dark:hover:border-zinc-600'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="text-xs text-slate-600 dark:text-zinc-400 font-bold uppercase tracking-wider">
                    Clue {idx + 1} of {scenario.evidence.length}
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-zinc-100 mt-0.5">
                    {clue.title}
                  </div>
                </div>

                {!isRevealed ? (
                  <button
                    onClick={() => {
                      soundManager.playClue();
                      onInvestigateClue(clue.id);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 shadow-sm shadow-blue-500/20 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Clue</span>
                  </button>
                ) : (
                  getReliabilityBadge(clue.reliability)
                )}
              </div>

              {isRevealed ? (
                <div className="mt-2.5 space-y-2">
                  <div className="text-xs sm:text-sm text-slate-900 dark:text-zinc-100 leading-relaxed bg-white dark:bg-zinc-800 p-3 rounded-lg border border-slate-300 dark:border-zinc-700 shadow-2xs font-normal">
                    {clue.content}
                  </div>
                  <div className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-900 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 font-medium">
                    <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{clue.note}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-600 dark:text-zinc-400 pt-1 leading-relaxed font-medium">
                  Click "Inspect Clue" to check public records, dates, and domain history for this post.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Panel Footer Info */}
      <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border-t border-slate-300 dark:border-zinc-700 flex items-center justify-between text-xs text-slate-700 dark:text-zinc-400 font-medium">
        <span>Clues reviewed: <strong className="text-slate-900 dark:text-zinc-200">{uniqueCount} of {scenario.evidence.length}</strong></span>
        <span className="hidden sm:inline">Investigating clues rewards careful judgment</span>
      </div>

    </div>
  );
};
