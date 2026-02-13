'use client';

import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export default function LivePerformancePulse() {
  const [fcp, setFcp] = useState<number | null>(null);
  const [tti, setTti] = useState<number | null>(null);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          setFcp(Math.round(entry.startTime));
        }
      }
    });

    observer.observe({ type: 'paint', buffered: true });

    const onLoad = () => {
      const nav = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;
      if (nav) {
        setTti(Math.round(nav.loadEventEnd - nav.fetchStart));
      }
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
      <Activity size={10} className="text-green animate-glow-pulse" />
      <span>
        FCP:{' '}
        <span className="text-green">{fcp !== null ? `${fcp}ms` : '...'}</span>
      </span>
      <span className="text-card-dimmest">|</span>
      <span>
        TTI:{' '}
        <span className="text-foreground">
          {tti !== null ? `${tti}ms` : '...'}
        </span>
      </span>
      <span className="text-card-dimmest">|</span>
      <span>
        Status: <span className="text-green">OPERATIONAL</span>
      </span>
    </div>
  );
}
