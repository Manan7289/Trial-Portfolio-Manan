'use client';
import { motion } from 'framer-motion';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Parent that staggers children using `staggerItem` variants when scrolled into view. */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.07,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: 'div' | 'ul' | 'ol';
}) {
  const Tag = motion[as];
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: staggerDelay } } }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Fade-and-rise on scroll. */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
