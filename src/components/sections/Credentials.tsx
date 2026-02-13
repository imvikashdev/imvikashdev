'use client';

import { credentials } from '@/lib/data';
import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';

export default function Credentials() {
  return (
    <section id="credentials" className="py-24 px-6 sm:px-12 lg:px-24">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            04
          </span>
          <div className="h-px w-12 bg-card-dimmest" />
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Credentials
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-card-text tracking-tight">
          Verified Skills
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {credentials.map((cred, i) => {
          const Icon = cred.type === 'Achievement' ? Trophy : Award;

          return (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card bg-background/80 rounded-lg p-5 flex items-start gap-4"
            >
              <div className="p-2 rounded-md bg-tag-bg text-muted shrink-0">
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-card-text">
                  {cred.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[10px] text-muted">
                    {cred.issuer}
                  </span>
                </div>
                {cred.detail && (
                  <p className="text-[11px] text-card-dim mt-2 leading-relaxed">
                    {cred.detail}
                  </p>
                )}
              </div>
              <span
                className={`font-mono text-[9px] px-2 py-0.5 rounded-full shrink-0 ${
                  cred.type === 'Achievement'
                    ? 'bg-amber/10 text-amber border border-amber/20'
                    : 'bg-tag-bg text-muted border border-tag-border'
                }`}
              >
                {cred.type}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
