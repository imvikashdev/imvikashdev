'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  const subscribe = (callback: () => void) => {
    const mql = window.matchMedia('(pointer: fine)');
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  };

  const getSnapshot = () => window.matchMedia('(pointer: fine)').matches;
  const getServerSnapshot = () => false;

  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!visible) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-magnetic]')) {
        setHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-magnetic]')) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-10000 mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 20 : 4),
          y: pos.y - (hovering ? 20 : 4),
          width: hovering ? 40 : 8,
          height: hovering ? 40 : 8,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div
          className={`w-full h-full rounded-full ${hovering ? 'border border-white/60 bg-transparent' : 'bg-white'}`}
        />
      </motion.div>

      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-10000"
            animate={{
              x: pos.x + 16,
              y: pos.y + 16,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="font-mono text-[10px] text-white/30 select-none whitespace-nowrap">
              ({pos.x}, {pos.y})
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
