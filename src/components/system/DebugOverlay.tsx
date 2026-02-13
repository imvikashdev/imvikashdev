'use client';

import { useDebug } from '@/context/DebugContext';

export default function DebugOverlay() {
  const { debugMode } = useDebug();

  if (!debugMode) return null;

  return <div className="debug-grid" aria-hidden="true" />;
}
