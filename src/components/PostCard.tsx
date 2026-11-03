/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, MessageSquare, Repeat, Heart, Search, ExternalLink, Quote, ShoppingBag, Bookmark } from 'lucide-react';
import { Scenario } from '../types/game';

interface PostCardProps {
  scenario: Scenario;
  onOpenEvidence: () => void;
  investigatedCluesCount: number;
}

const CATEGORY_FRIENDLY_NAMES: Record<string, string> = {
  ragebait: 'Ragebait & Outrage',
  fake_news: 'Breaking Fake News',
  gossips: 'Gossips & Drama',
};

// Computes high-contrast text color (dark charcoal vs white) based on background luminance
function getContrastTextColor(hexColor: string): string {
  try {
    const cleanHex = hexColor.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    // Standard YIQ perceived brightness formula
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 145 ? '#0F172A' : '#FFFFFF';
  } catch {
    return '#0F172A';
  }
}

export const PostCard: React.FC<PostCardProps> = ({
  scenario,
  onOpenEvidence,
  investigatedCluesCount
}) => {
  const avatarTextColor = getContrastTextColor(scenario.avatarColor);

  return (
    <article className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-sm transition-all">
      
      {/* Post Author & Channel Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar with guaranteed readable initial */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs border border-black/10"
            style={{
              backgroundColor: scenario.avatarColor,
              color: avatarTextColor
            }}
          >
            {scenario.avatarInitials}
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-base leading-snug">
                {scenario.authorName}
              </span>
              {scenario.verified && (
                <CheckCircle2
                  className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 fill-blue-600/20"
                  aria-label="Verified Account"
                />
              )}
              <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                {scenario.handle}
              </span>
            </div>

            {/* Clean unboxed metadata with bullet separators */}
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
              <span className="text-blue-700 dark:text-blue-400 font-semibold">
                {CATEGORY_FRIENDLY_NAMES[scenario.category] || scenario.category}
              </span>
              <span aria-hidden="true" className="text-slate-400 dark:text-zinc-600">·</span>
              <span className="font-medium">{scenario.timestamp}</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-zinc-600">·</span>
              <span className="capitalize font-medium">{scenario.difficulty} difficulty</span>
            </div>
          </div>
        </div>

        <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium hidden sm:inline">
          Public Post
        </span>
      </div>

      {/* Main Post Headline & Text */}
      <div className="mb-4 space-y-2">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-zinc-100 leading-snug">
          {scenario.headline}
        </h2>
        <p className="text-sm sm:text-[15px] text-slate-800 dark:text-zinc-200 leading-relaxed font-normal">
          {scenario.bodyText}
        </p>
      </div>

      {/* Attached Media / Fictional Link Preview */}
      <div className="mb-5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 overflow-hidden">
        
        {/* News Article Link Card */}
        {scenario.graphicType === 'news_card' && (
          <div className="p-4 bg-slate-50 dark:bg-zinc-900">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                {scenario.graphicDetails.badge || 'News Bulletin'}
              </span>
              <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">Simulated News Article</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 py-1">
              {scenario.graphicDetails.headlineSnippet || scenario.headline}
            </div>
            {scenario.graphicDetails.sourceUrlSnippet && (
              <div className="text-xs text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1 mt-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{scenario.graphicDetails.sourceUrlSnippet}</span>
              </div>
            )}
          </div>
        )}

        {/* Photo Attachment Card */}
        {scenario.graphicType === 'photo_preview' && (
          <div className="p-5 bg-slate-50 dark:bg-zinc-900 flex flex-col justify-between min-h-[130px] text-center">
            <div className="text-xs text-slate-700 dark:text-zinc-300 font-semibold flex items-center justify-between mb-2">
              <span>Attached Media</span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">{scenario.graphicDetails.badge || 'Photo'}</span>
            </div>

            <div className="my-auto py-2">
              <div className="inline-block p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 mb-2">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-900 dark:text-zinc-100 font-semibold max-w-md mx-auto italic">
                "{scenario.graphicDetails.caption || 'Photo shared with post caption.'}"
              </p>
            </div>

            <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
              Inspect the Fact-Check Clues to verify this image's true origin and timeline.
            </div>
          </div>
        )}

        {/* Product Listing Card */}
        {scenario.graphicType === 'product_ad' && (
          <div className="p-4 bg-amber-50/70 dark:bg-zinc-900 border-l-4 border-amber-500">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                {scenario.graphicDetails.badge || 'Online Listing'}
              </span>
              <span className="text-emerald-800 dark:text-emerald-400 font-bold">
                {scenario.graphicDetails.rating ? `★ ${scenario.graphicDetails.rating} / 5.0` : 'Online Deal'}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-2 border-y border-amber-300 dark:border-zinc-700 my-2">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-zinc-100">
                {scenario.graphicDetails.headlineSnippet || scenario.authorName}
              </span>
              <span className="font-extrabold text-base text-blue-800 dark:text-blue-400 font-mono-numbers">
                {scenario.graphicDetails.price || 'Special Deal'}
              </span>
            </div>
            <div className="text-xs text-slate-700 dark:text-zinc-400 font-medium">
              Store URL: {scenario.graphicDetails.sourceUrlSnippet || 'online-store-deal.shop'}
            </div>
          </div>
        )}

        {/* Group Chat Bubble Card */}
        {scenario.graphicType === 'chat_bubble' && (
          <div className="p-4 bg-emerald-50/50 dark:bg-zinc-900 flex flex-col gap-2 border-l-4 border-emerald-500">
            <div className="text-xs text-amber-800 dark:text-amber-400 flex items-center gap-1.5 font-bold">
              <Repeat className="w-3.5 h-3.5" />
              <span>Forwarded message circulating in group chats</span>
            </div>
            <div className="bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 shadow-xs max-w-lg font-medium leading-relaxed">
              {scenario.graphicDetails.caption || scenario.bodyText}
            </div>
            <div className="text-xs text-slate-600 dark:text-zinc-400 text-right font-medium">
              Direct message · Forwarded many times
            </div>
          </div>
        )}

        {/* Quote Card */}
        {scenario.graphicType === 'quote_card' && (
          <div className="p-5 bg-slate-50 dark:bg-zinc-900 relative overflow-hidden border-l-4 border-blue-500">
            <Quote className="absolute -bottom-2 right-2 w-16 h-16 text-slate-300 dark:text-zinc-800 pointer-events-none" />
            <div className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">
              {scenario.graphicDetails.badge || 'Notable Quote'}
            </div>
            <p className="text-sm sm:text-base text-slate-900 dark:text-zinc-100 italic mb-3 font-semibold">
              "{scenario.bodyText}"
            </p>
            <div className="text-xs font-bold text-slate-700 dark:text-zinc-300">
              — {scenario.graphicDetails.quoteSpeaker || scenario.authorName}
            </div>
          </div>
        )}
      </div>

      {/* Engagement Stats Strip */}
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 border-t border-slate-300 dark:border-zinc-700 pt-3">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors">
            <Repeat className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span className="font-mono-numbers font-bold text-slate-800 dark:text-zinc-200">{scenario.stats.shares.toLocaleString()}</span> Reposts
          </span>
          <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors">
            <Heart className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span className="font-mono-numbers font-bold text-slate-800 dark:text-zinc-200">{scenario.stats.likes.toLocaleString()}</span> Likes
          </span>
          <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors">
            <MessageSquare className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            <span className="font-mono-numbers font-bold text-slate-800 dark:text-zinc-200">{scenario.stats.comments.toLocaleString()}</span> Replies
          </span>
        </div>

        <button
          onClick={onOpenEvidence}
          className="lg:hidden text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Inspect Clues ({investigatedCluesCount}/{scenario.evidence.length})</span>
        </button>
      </div>

    </article>
  );
};
