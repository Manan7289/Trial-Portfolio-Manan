'use client';
import { motion } from 'framer-motion';
import { SectionHead } from './ui/Section';
import { AnimatedHeading } from './ui/AnimatedText';
import { Reveal } from './ui/InteractiveEffects';

const EMAIL = 'Gargmanan7289@gmail.com';

const others = [
  { href: 'https://github.com/Manan7289', label: 'GitHub', external: true },
  { href: 'https://linkedin.com/in/manan-garg-85012b318', label: 'LinkedIn', external: true },
  { href: 'tel:+919897848251', label: '+91 98978 48251' },
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
          Happy to talk about internships, projects, or anything on this page. Email is the quickest way to reach me.
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
