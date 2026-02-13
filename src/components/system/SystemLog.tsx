'use client';

import { useDebug } from '@/context/DebugContext';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function SystemLog() {
  const { logs, debugMode } = useDebug();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const levelColor = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'text-card-secondary';
      case 'NETWORK':
        return 'text-amber';
      case 'PERF':
        return 'text-green';
      case 'DEBUG':
        return 'text-green';
      case 'WARN':
        return 'text-red';
      default:
        return 'text-card-dim';
    }
  };

  return (
    <AnimatePresence>
      {debugMode && (
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-20 right-4 z-9997 w-80 max-h-72 glass-card rounded-lg overflow-hidden hidden sm:block"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Terminal size={12} className="text-green" />
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
              System Log
            </span>
          </div>
          <div
            ref={scrollRef}
            className="p-3 overflow-y-auto max-h-56 space-y-0.5"
          >
            {logs.length === 0 && (
              <p className="font-mono text-[10px] text-card-dimmer">
                Waiting for events...
              </p>
            )}
            {logs.map((log) => (
              <div
                key={log.id}
                className="font-mono text-[10px] leading-relaxed"
              >
                <span className="text-card-dimmer">[{log.timestamp}]</span>{' '}
                <span className={levelColor(log.level)}>[{log.level}]</span>{' '}
                <span className="text-card-dim">{log.message}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
