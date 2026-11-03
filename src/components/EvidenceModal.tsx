/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, Search, CheckCircle, AlertTriangle, HelpCircle, ShieldCheck, FileText, ArrowLeft, Award } from 'lucide-react';
import { EvidenceClue, Scenario } from '../types/game';
import { soundManager } from '../utils/sound';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: Scenario;
  investigatedClues: string[];
  onInvestigateClue: (clueId: string) => void;
  timeRemaining?: number;
  isPracticeMode?: boolean;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  onClose,
  scenario,
  investigatedClues,
  onInvestigateClue,
  timeRemaining,
  isPracticeMode = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const uniqueInvestigatedCount = new Set(investigatedClues).size;
  const currentBonus = Math.min(uniqueInvestigatedCount * 10, 25);

  const getReliabilityBadge = (reliability: EvidenceClue['reliability']) => {
    switch (reliability) {
      case 'verified_official':
        return (
          <span className="flex items-center gap-1.5 text-xs text-emerald-900 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            Official Verified Source
          </span>
        );
      case 'credible':
        return (
          <span className="flex items-center gap-1.5 text-xs text-blue-900 dark:text-blue-300 font-bold bg-blue-100 dark:bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-300 dark:border-blue-800">
            <CheckCircle className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
            Credible Reference
          </span>
        );
      case 'suspicious':
        return (
          <span className="flex items-center gap-1.5 text-xs text-rose-900 dark:text-rose-300 font-bold bg-rose-100 dark:bg-rose-950/80 px-2.5 py-1 rounded-md border border-rose-300 dark:border-rose-800">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
            Contradictory / Unsubstantiated
          </span>
        );
      case 'inconclusive':
      default:
        return (
          <span className="flex items-center gap-1.5 text-xs text-amber-900 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-300 dark:border-amber-800">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            Inconclusive Evidence
          </span>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-xl overflow-hidden transition-all">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-300 dark:border-zinc-700 flex items-center justify-between gap-4 bg-slate-50 dark:bg-zinc-900">
          <div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 id="evidence-modal-title" className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-zinc-100">
                Fact-Check Clues & Context
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5 font-medium">
              Review public records and corroboration before deciding
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isPracticeMode && timeRemaining !== undefined && (
              <div className="font-mono-numbers text-xs text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-blue-300 dark:border-zinc-700 font-extrabold">
                {timeRemaining}s Left
              </div>
            )}
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Close investigation modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bonus Points Tracker Strip */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-blue-800 dark:text-blue-400 font-bold">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Clues Reviewed: {uniqueInvestigatedCount} of {scenario.evidence.length}</span>
          </div>
          <span className="text-emerald-800 dark:text-emerald-400 font-extrabold font-mono-numbers">
            +{currentBonus} pts clue bonus
          </span>
        </div>

        {/* Modal Body: Clue List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {scenario.evidence.map((clue, index) => {
            const isRevealed = investigatedClues.includes(clue.id);

            return (
              <div
                key={clue.id}
                className={`border rounded-xl p-4 transition-all ${
                  isRevealed
                    ? 'bg-blue-50/40 dark:bg-zinc-900 border-blue-300 dark:border-blue-900/60 shadow-xs'
                    : 'bg-slate-50 dark:bg-zinc-800/80 border-slate-300 dark:border-zinc-700 hover:border-slate-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                      Clue {index + 1}
                    </span>
                    <span aria-hidden="true" className="text-xs text-slate-400 dark:text-zinc-600">·</span>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
                      {clue.title}
                    </h3>
                  </div>

                  {!isRevealed ? (
                    <button
                      onClick={() => {
                        soundManager.playClue();
                        onInvestigateClue(clue.id);
                      }}
                      className="px-3 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 shadow-sm shadow-blue-500/20 cursor-pointer"
                    >
                      Inspect Clue
                    </button>
                  ) : (
                    getReliabilityBadge(clue.reliability)
                  )}
                </div>

                {isRevealed ? (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs sm:text-sm text-slate-900 dark:text-zinc-100 leading-relaxed bg-white dark:bg-zinc-800 p-3 rounded-lg border border-slate-300 dark:border-zinc-700 font-normal">
                      {clue.content}
                    </p>
                    <div className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-900 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 font-medium">
                      <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{clue.note}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                    Click "Inspect Clue" to cross-check records, verified registries, and source provenance.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
            Close this panel when you are ready to make a decision.
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold text-slate-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-600 rounded-lg transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Post</span>
          </button>
        </div>

      </div>
    </div>
  );
};
