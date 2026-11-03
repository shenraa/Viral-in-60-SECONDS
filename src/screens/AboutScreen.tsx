/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Shield, AlertTriangle, BookOpen, HeartHandshake } from 'lucide-react';
import { ScreenId } from '../types/game';
import { soundManager } from '../utils/sound';

interface AboutScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const PRINCIPLES = [
  'Check the original primary source before reacting.',
  'Verify the original publication date and timeline.',
  'Look for independent corroboration across multiple reputable channels.',
  'Distinguish verifiable factual evidence from commentary or speculation.',
  'Examine whether a dramatic headline accurately reflects the full text.',
  'Recognize when an authentic, unedited photograph is reused in an unrelated context.',
  'Exercise strict caution with anonymous leaks and friend-of-a-friend claims.',
  'Question extraordinary claims that provide no primary supporting documentation.',
  'Avoid forwarding unverified rumours simply because they confirm existing beliefs.',
  'Understand that high engagement counts, likes, and shares never equal truth.',
  'Recognize that synthetic and AI-generated media require provenance audits.',
  'Never assume visual appearance or aesthetic polish alone proves authenticity.',
  'Remember that absence of immediate evidence is not always proof of falsity.',
  'Be comfortable acknowledging: "I do not have enough evidence to reach a conclusion."',
  'Correct errors responsibly and update views when verified facts emerge.'
];

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
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
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2.5">
          Educational Mission & Guidelines
        </div>
        <h1 className="font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
          About VIRAL IN 60 SECONDS
        </h1>
        <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mt-1 italic">
          "Think fast. Check first. Share wisely."
        </p>
      </div>

      {/* Purpose & Mission */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 sm:p-8 mb-6 space-y-4 shadow-sm transition-all">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            Purpose & Educational Philosophy
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
          <strong>VIRAL IN 60 SECONDS</strong> is an educational digital safety simulation designed to teach critical investigation skills in an interactive, engaging format. Rather than passive lectures, the game simulates the speed, emotional pressure, and ambiguity of modern online feeds.
        </p>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
          In an era where synthetic media, recycled disaster imagery, deceptive dropshipping storefronts, and unverified group chat rumours circulate within seconds, digital literacy requires practical judgment. The objective is not reflexive cynicism or blanket distrust, but evidence-grounded discernment.
        </p>
      </div>

      {/* 15 Digital Safety Principles */}
      <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 sm:p-8 mb-6 shadow-sm transition-all">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-4">
          <Shield className="w-5 h-5" />
          <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            15 Core Digital Safety Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 flex items-start gap-3 text-xs text-slate-700 dark:text-zinc-300"
            >
              <span className="font-mono-numbers text-blue-600 dark:text-blue-400 font-bold shrink-0">
                {String(index + 1).padStart(2, '0')}.
              </span>
              <span className="leading-relaxed font-medium">{principle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Simulation Disclaimer */}
      <div className="bg-amber-50/50 dark:bg-zinc-800 border border-amber-200 dark:border-zinc-700 rounded-2xl p-6 text-xs text-slate-600 dark:text-zinc-400 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Educational Simulation Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          All accounts, institutions, brand names, product listings, group chats, and headlines presented inside VIRAL IN 60 SECONDS are fictional scenarios created specifically for instructional simulation.
        </p>
        <p className="leading-relaxed">
          The scenarios do not constitute live journalism, defamatory allegations against real persons, or real-world fact-checking determinations. For consequential real-world civic, legal, financial, or medical decisions, players should always consult accredited primary public health and regulatory agencies.
        </p>
      </div>

      {/* DYAP Programme Attribution Card */}
      <div className="mt-6 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-0.5">
            A DYAP PROJECT
          </div>
          <div className="font-extrabold text-sm text-slate-900 dark:text-white">
            Digital Youth Ambassador Programme
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Created by The DYAP Team · Game concept &amp; development by Shenraa
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('credits');
          }}
          className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shrink-0 shadow-2xs cursor-pointer"
        >
          View Full Credits
        </button>
      </div>

    </div>
  );
};
