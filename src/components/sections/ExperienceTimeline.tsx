'use client';

import { experiences } from '@/lib/data';
import { motion } from 'framer-motion';
import { useDebug } from '@/context/DebugContext';
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

export default function ExperienceTimeline() {
  const { addLog } = useDebug();
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      addLog('INFO', 'Experience timeline rendered');
      hasLogged.current = true;
    }
  }, [addLog]);

  return (
    <section id="experience" className="py-24 px-6 sm:px-12 lg:px-24">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            03
          </span>
          <div className="h-px w-12 bg-card-dimmest" />
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Experience
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-card-text tracking-tight">
          Where I&apos;ve Shipped
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 sm:left-4 top-0 bottom-0 w-px bg-card-dimmest" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-8 sm:pl-14"
            >
              <div className="absolute left-0 sm:left-4 top-1 w-2 h-2 -translate-x-[3.5px] rounded-full bg-card-dimmer border border-card-dim" />

              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                {exp.period}
              </span>
              <h3 className="text-xl font-semibold text-card-text mt-2">
                {exp.role}
              </h3>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="font-mono text-xs text-muted">@ {exp.company}</p>
                <span className="flex items-center gap-1 font-mono text-[10px] text-card-dimmer">
                  <MapPin size={9} />
                  {exp.location}
                </span>
              </div>

              <p className="text-sm text-muted leading-relaxed mt-4">
                {exp.description}
              </p>
              <ul className="mt-4 space-y-2">
                {exp.highlights.map((hl, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-card-secondary"
                  >
                    <span className="text-green mt-1.5 text-[8px]">▸</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
