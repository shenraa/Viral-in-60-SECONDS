/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Clock, ShieldAlert, Search, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const STEPS = [
    {
      title: 'THE 60-SECOND CLOCK',
      icon: Clock,
      color: '#2563EB',
      headline: 'Think fast. Every second counts.',
      body: 'In Standard Mode, you have 60 continuous seconds to evaluate as many viral posts as possible. The timer runs continuously during gameplay, so make prompt, reasoned decisions.',
      tip: 'Do not panic: a steady streak of accurate decisions with evidence bonuses scores far higher than blind, frantic clicking.'
    },
    {
      title: 'THE THREE ACTIONS',
      icon: ShieldAlert,
      color: '#D97706',
      headline: 'VERIFY, SHARE, or FLAG?',
      body: 'Not everything online is fake, and not every claim is malicious. Choose VERIFY [1] to inspect or withhold trust until corroborated; choose SHARE [2] when claims are authentic and safe; choose FLAG [3] for deceptive scams, recycled media, and fabricated hoaxes.',
      tip: 'Avoid automatically flagging everything. Recognizing authentic, verified announcements is just as important as catching scams.'
    },
    {
      title: 'INSPECT EVIDENCE',
      icon: Search,
      color: '#059669',
      headline: 'Uncover primary sources for bonus points.',
      body: 'Every post includes real-world fact-check clues: domain registration dates, court filings, reverse photo provenance, official registries, and expert statements. Opening clues awards up to +25 bonus points per post.',
      tip: 'On desktop, the fact-check clues sit right beside the post so you can compare information side-by-side in real time.'
    },
    {
      title: 'THE VIRAL TAKEAWAY',
      icon: CheckCircle,
      color: '#2563EB',
      headline: 'Real images can still mislead in false context.',
      body: 'Misinformation is often subtle: an unedited photo from years ago is frequently relabeled as today’s breaking event. AI generators create convincing portraits. When in doubt, check timestamps, provenance, and independent reporting.',
      tip: 'Build your consecutive streak to multiply your score and unlock digital literacy achievements.'
    }
  ];

  const stepData = STEPS[currentStep];
  const StepIcon = stepData.icon;

  const handleNext = () => {
    soundManager.playClick();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-zinc-700 flex items-center justify-between bg-slate-50 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              How to Play Guide · Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Skip guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-zinc-700"
              style={{ backgroundColor: `${stepData.color}15`, color: stepData.color }}
            >
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                {stepData.title}
              </div>
              <h2 id="tutorial-modal-title" className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                {stepData.headline}
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
            {stepData.body}
          </p>

          <div className="bg-blue-50/60 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 p-4 rounded-xl text-xs text-slate-700 dark:text-zinc-300 flex items-start gap-2.5">
            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase shrink-0">
              Helpful Tip:
            </span>
            <span className="leading-relaxed">{stepData.tip}</span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep ? 'bg-blue-600 dark:bg-blue-400 w-6' : 'bg-slate-200 dark:bg-zinc-700 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <span>{currentStep === STEPS.length - 1 ? "Got It, Let's Play!" : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
