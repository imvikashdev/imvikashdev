'use client';

import { skillGroups } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Skills() {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            01
          </span>
          <div className="h-px w-12 bg-card-dimmest" />
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Stack
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-card-text tracking-tight">
          What I Work With
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: gi * 0.1 }}
            className="glass-card bg-background/80 p-5 rounded-xl"
          >
            <h3 className="font-mono text-[10px] text-muted uppercase tracking-widest mb-4">
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md font-mono text-xs bg-tag-bg text-tag-text border border-tag-border hover:text-foreground hover:border-border transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
