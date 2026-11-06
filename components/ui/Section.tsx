'use client';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Numbered section header with a hairline that draws in on scroll. */
export function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4 mb-4 font-mono text-xs uppercase tracking-wider text-muted">
        <span className="text-accent">{n}</span>
        <span>{title}</span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-px origin-left bg-ink/60"
      />
    </div>
  );
}
