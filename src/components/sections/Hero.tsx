'use client';

import { motion } from 'framer-motion';
import { useDebug } from '@/context/DebugContext';
import { useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const { addLog } = useDebug();

  useEffect(() => {
    addLog('INFO', 'Hero section mounted');
    addLog('PERF', 'Initial render complete');
  }, [addLog]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green animate-glow-pulse" />
          <span>Available for work</span>
          <span className="text-card-dimmest">—</span>
          <span className="text-card-dim">Remote / Surat, India</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-card-text">
          Full-Stack &<br />
          <span className="text-muted">Web3 Developer</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
        className="max-w-xl"
      >
        <p className="text-base sm:text-lg text-muted leading-relaxed mb-2">
          3+ years shipping things that{' '}
          <span className="text-card-text font-medium">
            actually work at scale
          </span>
          . 50k+ users, $2K+/mo revenue, 10+ projects. Zero to one, owned the
          entire stack.
        </p>
        <p className="font-mono text-xs text-card-dimmer">
          {`// Vikash Choudhary — the fixer who ships fast and doesn't break things`}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
        className="mt-10 flex items-center gap-4"
      >
        <a
          href="#projects"
          data-magnetic
          className="glass-card-hover px-6 py-3 rounded-lg font-mono text-sm text-card-text inline-flex items-center gap-2"
        >
          View Work
          <ArrowDown size={14} />
        </a>
        <a
          href="#experience"
          data-magnetic
          className="font-mono text-sm text-muted hover:text-foreground transition-colors"
        >
          Read Timeline →
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 sm:left-12 lg:left-24"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <ArrowDown size={12} />
        </motion.div>
      </motion.div>
    </section>
  );
}
