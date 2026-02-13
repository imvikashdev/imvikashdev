'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebug } from '@/context/DebugContext';
import { Github, ExternalLink, GitCommit } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
}

interface CommitItem {
  message: string;
  repo: string;
  date: string;
  url: string;
  additions: number;
  deletions: number;
}

interface GitHubData {
  contributions: ContributionDay[];
  totalContributions: number;
  latestCommits: CommitItem[];
  username: string;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

const levelColors = [
  'bg-tag-bg',
  'bg-green/20',
  'bg-green/40',
  'bg-green/60',
  'bg-green/80',
];

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addLog } = useDebug();

  const fetchData = useCallback(async () => {
    addLog('NETWORK', 'Fetching GitHub contribution data...');
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      setData(json);
      addLog('NETWORK', `Loaded ${json.totalContributions} contributions`);
    } catch {
      addLog('WARN', 'GitHub API unavailable, using fallback');
      const contributions: ContributionDay[] = [];
      const now = new Date();
      for (let i = 365; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        contributions.push({
          date: d.toISOString().split('T')[0],
          count: Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0,
        });
      }
      setData({
        contributions,
        totalContributions: contributions.reduce((s, c) => s + c.count, 0),
        latestCommits: [],
        username: 'imvikashdev',
      });
    } finally {
      setLoading(false);
    }
  }, [addLog]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!data?.latestCommits?.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.latestCommits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data?.latestCommits]);

  const { weeks, monthLabels } = useMemo(() => {
    if (!data) return { weeks: [], monthLabels: [] };
    const weeksResult: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    const startDayOfWeek = new Date(data.contributions[0]?.date).getDay();
    for (let i = 0; i < startDayOfWeek; i++)
      currentWeek.push({ date: '', count: -1 });
    data.contributions.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksResult.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) weeksResult.push(currentWeek);
    const labels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeksResult.forEach((week, wi) => {
      const firstValidDay = week.find((d) => d.date && d.count >= 0);
      if (firstValidDay) {
        const month = new Date(firstValidDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ label: MONTHS[month], weekIndex: wi });
          lastMonth = month;
        }
      }
    });
    return { weeks: weeksResult, monthLabels: labels };
  }, [data]);

  const latestCommits = data?.latestCommits ?? [];

  return (
    <section id="github" className="py-24 px-6 sm:px-12 lg:px-24">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            06
          </span>
          <div className="h-px w-12 bg-card-dimmest" />
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Open Source
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl sm:text-4xl font-bold text-card-text tracking-tight">
            GitHub Activity
          </h2>
          {data && (
            <a
              href={`https://github.com/${data.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-muted hover:text-foreground transition-colors"
            >
              <Github size={14} />
              <span className="hidden sm:inline">@{data.username}</span>
            </a>
          )}
        </div>
      </div>

      {loading ? (
        <div className="glass-card rounded-xl p-6 h-32 flex items-center justify-center font-mono text-xs text-muted animate-pulse">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Contribution Graph Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-6 overflow-hidden lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-xs text-muted">
                <span className="text-card-text font-medium">
                  {data?.totalContributions.toLocaleString()}
                </span>{' '}
                contributions in the last year
              </p>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="min-w-[680px]">
                <div className="flex mb-1 pl-8 relative h-4">
                  {monthLabels.map((ml, i) => (
                    <span
                      key={i}
                      className="font-mono text-[9px] text-card-dimmer absolute"
                      style={{ left: `${32 + ml.weekIndex * 13}px` }}
                    >
                      {ml.label}
                    </span>
                  ))}
                </div>
                <div className="flex gap-[3px]">
                  <div className="flex flex-col gap-[3px] pr-2">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                      <div
                        key={i}
                        className="h-[11px] flex items-center font-mono text-[9px] text-card-dimmer"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((day, di) => (
                        <div
                          key={di}
                          className={`w-[11px] h-[11px] rounded-[2px] transition-all duration-300 ${day.count < 0 ? 'bg-transparent' : levelColors[getLevel(day.count)]}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fixed Commit Stack with All 5 Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-6 overflow-hidden flex flex-col min-h-[320px]"
          >
            <div className="flex items-center gap-2 mb-8">
              <GitCommit size={14} className="text-muted" />
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest">
                Latest Activity
              </h3>
            </div>

            <div className="flex-1 relative">
              <AnimatePresence mode="popLayout" initial={false}>
                {latestCommits.map((commit, i) => {
                  const relativeIndex =
                    (i - activeIndex + latestCommits.length) %
                    latestCommits.length;

                  // Display all available cards in the stack
                  return (
                    <motion.div
                      key={commit.url}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{
                        opacity: 1 - relativeIndex * 0.2, // Fade out background cards
                        scale: 1 - relativeIndex * 0.04, // Scale down background cards
                        y: relativeIndex * 18, // Vertical stack offset
                        zIndex: latestCommits.length - relativeIndex,
                        filter: `blur(${relativeIndex * 0.2}px)`, // Subtle blur for depth
                        backdropFilter:
                          relativeIndex === 0 ? `blur(2px)` : 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        x: -60,
                        scale: 0.9,
                        transition: { duration: 0.3 },
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 25,
                      }}
                      className="absolute inset-x-0 "
                    >
                      <a
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-4 rounded-xl transition-all ${
                          relativeIndex === 0
                            ? 'glass-card shadow-2xl backdrop-blur-[120px] bg-white/25'
                            : 'glass-card opacity-20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <GitCommit
                            size={14}
                            className={`mt-1 shrink-0 ${relativeIndex === 0 ? 'text-primary' : 'text-muted'}`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-mono line-clamp-2 mb-2 text-card-text">
                              {commit.message}
                            </p>
                            <div className="flex items-center gap-2 font-mono text-[9px] text-card-dim">
                              <span className="truncate max-w-[80px]">
                                {commit.repo}
                              </span>
                              <span>•</span>
                              <span>{commit.date}</span>

                              {/* Additions / Deletions Code */}
                              {(commit.additions > 0 ||
                                commit.deletions > 0) && (
                                <div className="flex items-center gap-1.5 ml-1">
                                  {commit.additions > 0 && (
                                    <span className="text-green-400">
                                      +{commit.additions}
                                    </span>
                                  )}
                                  {commit.deletions > 0 && (
                                    <span className="text-red-400">
                                      -{commit.deletions}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <ExternalLink
                            size={10}
                            className="text-card-dimmest shrink-0 mt-1"
                          />
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination Footer */}
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
              <span className="font-mono text-[9px] text-card-dimmer">
                Recent Commits
              </span>
              <div className="flex gap-1.5">
                {latestCommits.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-5 bg-primary' : 'w-1 bg-card-dimmest'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
