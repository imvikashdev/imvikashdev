'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebug } from '@/context/DebugContext';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Bug, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { debugMode, toggleDebug, addLog } = useDebug();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    addLog('INFO', `Navigating to ${href}`);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-9990 bg-background transition-all duration-300 ${
        scrolled
          ? 'bg-nav-scrolled backdrop-blur-xl border-b border-nav-border'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-12 lg:px-24 h-16">
        <a
          href="#hero"
          data-magnetic
          className="font-mono text-sm text-card-text font-semibold tracking-tight"
          onClick={() => handleNav('#hero')}
        >
          VC<span className="text-muted">.</span>
        </a>

        <div className="hidden sm:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-magnetic
              onClick={() => handleNav(item.href)}
              className="font-mono text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {item.label}
            </a>
          ))}

          <div className="h-4 w-px bg-border" />

          <button
            onClick={toggleTheme}
            data-magnetic
            className="p-2 rounded-lg text-muted hover:text-foreground transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={toggleDebug}
            data-magnetic
            className={`p-2 rounded-lg transition-all duration-200 font-mono text-xs flex items-center gap-1.5 ${
              debugMode
                ? 'bg-green/10 border border-green/30 text-green'
                : 'text-muted hover:text-foreground'
            }`}
            title="Toggle Debug Mode"
          >
            <Bug size={12} />
            <span>{debugMode ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        <div className="flex sm:hidden items-center gap-3">
          <button onClick={toggleTheme} className="p-1.5 rounded text-muted">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={toggleDebug}
            className={`p-1.5 rounded transition-all font-mono text-[10px] ${
              debugMode ? 'bg-green/10 text-green' : 'text-muted'
            }`}
          >
            <Bug size={14} />
          </button>
          <button
            className="text-muted hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-nav-scrolled backdrop-blur-xl border-b border-nav-border overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNav(item.href)}
                  className="font-mono text-sm text-muted hover:text-foreground transition-colors uppercase tracking-widest"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
