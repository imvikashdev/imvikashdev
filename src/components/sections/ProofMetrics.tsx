'use client';

import { proofMetrics } from '@/lib/data';
import { useDebug } from '@/context/DebugContext';
import { useEffect, useRef } from 'react';

function MetricSet() {
  return (
    <>
      {proofMetrics.map((metric, i) => (
        <div key={i} className="flex items-center gap-3 shrink-0">
          <span className="mono-data text-lg sm:text-xl font-bold text-card-text">
            {metric.value}
          </span>
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            {metric.label}
          </span>
          <span className="text-card-dimmest mx-4">◆</span>
        </div>
      ))}
    </>
  );
}

export default function ProofMetrics() {
  const { addLog } = useDebug();
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      addLog('INFO', 'ProofMetrics ticker initialized');
      hasLogged.current = true;
    }
  }, [addLog]);

  return (
    <section className="relative py-6 border-y border-border overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent z-10" />

      <div className="ticker-track flex items-center whitespace-nowrap">
        <div className="ticker-content flex items-center gap-12 shrink-0">
          <MetricSet />
        </div>
        <div
          className="ticker-content flex items-center gap-12 shrink-0"
          aria-hidden
        >
          <MetricSet />
        </div>
      </div>
    </section>
  );
}
