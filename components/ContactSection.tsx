'use client';
import { motion } from 'framer-motion';
import { SectionHead } from './ui/Section';
import { AnimatedHeading } from './ui/AnimatedText';
import { Reveal } from './ui/InteractiveEffects';

import { EMAIL, GITHUB, LINKEDIN, RESUME_PDF } from '@/data/site';

const others = [
  { href: RESUME_PDF, label: 'Resume (PDF)', external: true },
  { href: GITHUB, label: 'GitHub', external: true },
  { href: LINKEDIN, label: 'LinkedIn', external: true },
];

export default function ContactSection() {
  return (
    <section className="pt-24 pb-10 w-full px-6 max-w-6xl mx-auto" id="contact">
      <SectionHead n="04" title="Contact" />

      <h2 className="font-serif font-light tracking-[-0.03em] leading-[0.95] text-[clamp(3.5rem,11vw,9rem)] mb-12">
        <AnimatedHeading text="Get in" /> <span className="italic text-accent"><AnimatedHeading text="touch." delay={0.15} /></span>
      </h2>

      <Reveal className="grid md:grid-cols-12 gap-8 items-end">
        <p className="md:col-span-5 text-lg text-ink/80 leading-relaxed">
          Looking for a 4–6 month robotics, UAV or autonomy software internship, in India or abroad. Email is the quickest way to reach me, including for access to the dronecore code.
        </p>
        <div className="md:col-span-7 md:text-right">
          <motion.a
            href={`mailto:${EMAIL}`}
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="inline-block font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight break-all rule-link pb-1"
          >
            {EMAIL}
          </motion.a>
        </div>
      </Reveal>

      <div className="mt-20 pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider text-muted">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {others.map((l) => (
            <a key={l.label} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined} className="hover:text-accent transition-colors">
              {l.label} ↗
            </a>
          ))}
        </div>
        <span>© 2026 Manan Garg</span>
      </div>
    </section>
  );
}
