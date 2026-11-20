'use client';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Word-by-word reveal. Each word slides up from behind a mask. */
export function AnimatedHeading({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block pb-[0.25em] -mb-[0.25em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '105%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + wi * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Number that counts up once when scrolled into view. */
export function AnimatedStat({
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  color = 'text-brand-primary',
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);
  const text = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(count, value, { duration: 1.4, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, reduce, count, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <motion.span className={`text-3xl font-bold tabular-nums ${color}`}>{text}</motion.span>
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  );
}
