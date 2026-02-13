'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

interface SystemLogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'NETWORK' | 'PERF' | 'DEBUG' | 'WARN';
  message: string;
}

interface DebugContextType {
  debugMode: boolean;
  toggleDebug: () => void;
  logs: SystemLogEntry[];
  addLog: (level: SystemLogEntry['level'], message: string) => void;
}

const DebugContext = createContext<DebugContextType | null>(null);

export function useDebug() {
  const ctx = useContext(DebugContext);
  if (!ctx) throw new Error('useDebug must be used within DebugProvider');
  return ctx;
}

export function DebugProvider({ children }: { children: ReactNode }) {
  const [debugMode, setDebugMode] = useState(false);
  const [logs, setLogs] = useState<SystemLogEntry[]>([]);
  const counterRef = useRef(0);

  const addLog = useCallback(
    (level: SystemLogEntry['level'], message: string) => {
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      setLogs((prev) => {
        const next = [
          ...prev,
          { id: counterRef.current++, timestamp, level, message },
        ];
        return next.slice(-50); // keep last 50
      });
    },
    [],
  );

  const toggleDebug = useCallback(() => {
    setDebugMode((prev) => {
      const next = !prev;
      addLog('DEBUG', next ? 'Debug mode ENABLED' : 'Debug mode DISABLED');
      return next;
    });
  }, [addLog]);

  return (
    <DebugContext.Provider value={{ debugMode, toggleDebug, logs, addLog }}>
      {children}
    </DebugContext.Provider>
  );
}
