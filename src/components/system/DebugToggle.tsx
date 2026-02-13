'use client';

import { useDebug } from '@/context/DebugContext';
import { Bug } from 'lucide-react';

export default function DebugToggle() {
  const { debugMode, toggleDebug } = useDebug();

  return (
    <button
      onClick={toggleDebug}
      data-magnetic
      className={`fixed top-6 right-6 z-9998 p-2.5 rounded-lg transition-all duration-200 font-mono text-xs group ${
        debugMode
          ? 'bg-green/10 border border-green/30 text-green'
          : 'glass-card text-muted hover:text-foreground'
      }`}
      title="Toggle Debug Mode"
    >
      <span className="flex items-center gap-2">
        <Bug size={14} />
        <span className="hidden sm:inline">
          {debugMode ? 'DEBUG: ON' : 'DEBUG'}
        </span>
      </span>
    </button>
  );
}
