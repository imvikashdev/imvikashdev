'use client';

import { useDebug } from '@/context/DebugContext';
import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

const idleMessages = [
  'All systems nominal',
  'Listening for events...',
  'Ready',
  'Idle',
  'Standing by',
];

export default function StatusBar() {
  const { debugMode, logs } = useDebug();
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (debugMode) return null;

  const lastLog = logs[logs.length - 1];
  const statusMessage = lastLog
    ? `[${lastLog.level}] ${lastLog.message}`
    : idleMessages[Math.floor(uptime / 5) % idleMessages.length];

  const formatUptime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-9990 hidden sm:flex items-center gap-3 px-3 py-2 glass-card rounded-lg">
      <Terminal size={10} className="text-muted shrink-0" />
      <span className="font-mono text-[10px] text-card-dim truncate max-w-56">
        {statusMessage}
      </span>
      <span className="text-card-dimmest">|</span>
      <span className="font-mono text-[10px] text-card-dimmer">
        {formatUptime(uptime)}
      </span>
    </div>
  );
}
