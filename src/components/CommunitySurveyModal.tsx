/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Cloud,
  RefreshCw,
  Users,
  CheckCircle2,
  TrendingUp,
  Flame,
  Newspaper,
  MessageCircle,
  Star,
  Clock
} from 'lucide-react';
import {
  getSurveyCommunityAnalytics,
  SurveyAnalyticsSummary,
  CloudSurveyRecord
} from '../services/firebase';

interface CommunitySurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunitySurveyModal: React.FC<CommunitySurveyModalProps> = ({
  isOpen,
  onClose
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<SurveyAnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const summary = await getSurveyCommunityAnalytics();
      setData(summary);
    } catch (err) {
      console.error('Failed to load community survey data:', err);
      setError('Could not connect to Firebase survey database. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>Firebase Survey Analytics</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full">
                  Live Cloud API
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Aggregated community responses and misinformation discernment benchmarks
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={fetchAnalytics}
              disabled={loading}
              title="Refresh Firestore data"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-sm text-slate-500 dark:text-zinc-400">
                Querying survey collection from Firestore...
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-center">
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>
              <button
                onClick={fetchAnalytics}
                className="mt-2 text-xs font-bold text-rose-700 dark:text-rose-300 underline cursor-pointer"
              >
                Retry Query
              </button>
            </div>
          )}

          {!loading && data && (
            <>
              {/* Stat overview tiles */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-center">
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mb-0.5">Total Survey Rounds</div>
                  <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono-numbers">
                    {data.totalSurveys}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-center">
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mb-0.5">Avg Accuracy</div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono-numbers">
                    {data.averageAccuracy}%
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-center">
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mb-0.5">Avg Score</div>
                  <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono-numbers">
                    {data.averageScore}
                  </div>
                </div>
              </div>

              {/* Category Benchmarks */}
              <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Category Accuracy Across All Respondents</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-rose-500" />
                        Ragebait & Outrage
                      </span>
                      <span className="font-bold">{data.categoryAccuracies.ragebait}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full transition-all"
                        style={{ width: `${data.categoryAccuracies.ragebait}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Newspaper className="w-3.5 h-3.5 text-blue-500" />
                        Breaking Fake News
                      </span>
                      <span className="font-bold">{data.categoryAccuracies.fake_news}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all"
                        style={{ width: `${data.categoryAccuracies.fake_news}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-purple-500" />
                        Gossips & Rumours
                      </span>
                      <span className="font-bold">{data.categoryAccuracies.gossips}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-500 h-full rounded-full transition-all"
                        style={{ width: `${data.categoryAccuracies.gossips}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Survey Responses */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Recent Survey Submissions</span>
                </h3>

                {data.recentResults.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-zinc-400 text-center py-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl">
                    No survey responses recorded yet. Complete your first quiz round to submit!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {data.recentResults.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-3 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                            <span>{rec.playerName || 'Anonymous Player'}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 font-normal">
                              {rec.persona || 'Quiz Taker'}
                            </span>
                          </div>
                          {rec.feedback && (
                            <p className="text-[11px] text-slate-600 dark:text-zinc-300 italic">
                              "{rec.feedback}"
                            </p>
                          )}
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(rec.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {rec.rating && (
                              <span className="flex items-center gap-0.5 text-amber-500 ml-2">
                                <Star className="w-2.5 h-2.5 fill-amber-500" />
                                {rec.rating}/5
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono-numbers text-sm">
                            {rec.accuracy}%
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono-numbers">
                            {rec.score} pts
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/80 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
