'use client';

import { projects } from '@/lib/data';
import { motion, type Variants } from 'framer-motion';
import { useDebug } from '@/context/DebugContext';
import { useEffect, useRef } from 'react';
import { ExternalLink, Archive, Rocket, Wrench } from 'lucide-react';

const statusConfig = {
  Live: {
    icon: Rocket,
    color: 'text-green',
    bg: 'bg-green/10',
    border: 'border-green/20',
  },
  Sunset: {
    icon: Archive,
    color: 'text-amber',
    bg: 'bg-amber/10',
    border: 'border-amber/20',
  },
  'In Development': {
    icon: Wrench,
    color: 'text-muted',
    bg: 'bg-tag-bg',
    border: 'border-card-dimmest',
  },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function ProjectGallery() {
  const { addLog } = useDebug();
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      addLog('NETWORK', 'Fetching project data from CMS...');
      const t = setTimeout(() => {
        addLog('NETWORK', `Loaded ${projects.length} projects`);
      }, 600);
      hasLogged.current = true;
      return () => clearTimeout(t);
    }
  }, [addLog]);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 lg:px-24">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            02
          </span>
          <div className="h-px w-12 bg-card-dimmest" />
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Projects
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-card-text tracking-tight">
          What I&apos;ve Built
        </h2>
        <p className="text-sm text-muted mt-2 font-mono">
          {projects.length} projects shipped
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {projects.map((project) => {
          const cfg = statusConfig[project.status];
          const StatusIcon = cfg.icon;

          return (
            <motion.article
              key={project.id}
              variants={item}
              className="glass-card-hover bg-background/80 rounded-xl p-5 group relative flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-card-text group-hover:text-foreground transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[10px] text-card-dim mt-0.5 truncate">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono ${cfg.bg} ${cfg.border} ${cfg.color} border`}
                  >
                    <StatusIcon size={9} />
                    {project.status}
                  </span>
                </div>
              </div>

              {project.metrics && (
                <div className="mb-3">
                  <span className="mono-data text-[11px] text-green">
                    {project.metrics}
                  </span>
                </div>
              )}

              <p className="text-xs text-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                {project.summary}
              </p>
              <div className="flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded font-mono text-[9px] bg-tag-bg text-tag-text border border-tag-border"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded font-mono text-[9px] text-card-dimmer">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="text-muted hover:text-foreground transition-colors shrink-0"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
