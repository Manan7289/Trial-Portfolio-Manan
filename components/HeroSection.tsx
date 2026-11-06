'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedText';

const EASE = [0.22, 1, 0.36, 1] as const;

const facts = [
  ['Studying', 'B.Tech in Computer Science, Bennett University (2024–2028)'],
  ['Working on', 'Computer vision, ML pipelines, full-stack software'],
  ['Recognition', 'Rank 1, Smart India Hackathon internal round'],
];

export default function HeroSection() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const nameY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -50]);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section id="home" className="relative w-full max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-24 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-wider text-muted">
        Portfolio · 2026
      </motion.p>

      <div className="py-12 md:py-14">
        <motion.h1
          style={{ y: nameY }}
          className="font-serif font-light tracking-[-0.04em] leading-[0.88] text-[clamp(4rem,13vw,10.5rem)]"
        >
          <span className="block">
            <AnimatedHeading text="Manan" delay={0.1} />
          </span>
          <span className="block italic text-accent">
            <AnimatedHeading text="Garg" delay={0.22} />
          </span>
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-end">
        <motion.p
          {...fade(0.5)}
          className="md:col-span-6 font-serif text-2xl md:text-3xl leading-snug tracking-tight"
        >
          I build machine learning systems and the software around them: models for aerial imagery, and the APIs and interfaces that make them usable.
        </motion.p>

        <motion.dl {...fade(0.65)} className="md:col-span-5 md:col-start-8 text-sm">
          {facts.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 border-t border-rule last:border-b">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted pt-0.5">{k}</dt>
              <dd className="leading-relaxed">{v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div {...fade(0.8)} className="mt-12 flex gap-8 font-mono text-xs uppercase tracking-wider">
        <a href="#projects" className="rule-link pb-1">See work ↓</a>
        <a href="#contact" className="rule-link pb-1">Get in touch</a>
      </motion.div>
    </section>
  );
}
