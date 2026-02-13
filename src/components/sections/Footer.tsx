'use client';

import LivePerformancePulse from '@/components/system/LivePerformancePulse';
import { socials } from '@/lib/data';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 sm:px-12 lg:px-24 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <LivePerformancePulse />

        <div className="flex items-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="text-muted hover:text-foreground transition-colors"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="text-muted hover:text-foreground transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={socials.x}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="text-muted hover:text-foreground transition-colors"
            title="X (Twitter)"
          >
            <Twitter size={16} />
          </a>
          <a
            href={`mailto:${socials.email}`}
            data-magnetic
            className="text-muted hover:text-foreground transition-colors"
            title="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        <span className="font-mono text-[10px] text-card-dimmer">
          © {new Date().getFullYear()} Vikash Choudhary
        </span>
      </div>
    </footer>
  );
}
