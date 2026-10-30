'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animmaster Lib: Character-by-character staggered reveal (text scramble + reveal)
export function AnimatedHeading({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 22,
              delay: delay + wi * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Vengeance UI: Animated count-up stat
export function AnimatedStat({
  value,
  label,
  prefix = '',
  suffix = '',
  color = 'text-brand-primary',
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <motion.span
        className={`text-3xl font-extrabold tabular-nums ${color}`}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.01 }}
        >
          {value}
        </motion.span>
        {suffix}
      </motion.span>
      <span className="text-xs text-gray-400 font-medium text-center">{label}</span>
    </div>
  );
}
