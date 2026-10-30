'use client';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { MagneticWrapper, SpotlightCard } from './ui/InteractiveEffects';
import { AnimatedHeading, AnimatedStat } from './ui/AnimatedText';

const contactLinks = [
  {
    href: 'mailto:Gargmanan7289@gmail.com',
    label: 'Email',
    icon: <Mail size={20} className="text-brand-primary" />,
  },
  {
    href: 'https://github.com/Manan7289',
    label: 'GitHub',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/in/manan-garg-85012b318',
    label: 'LinkedIn',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a66c2]">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: 'tel:+919897848251',
    label: 'Phone',
    icon: <Phone size={20} className="text-brand-accent" />,
  },
];

export default function ContactSection() {
  return (
    <section className="py-32 w-full px-6 max-w-4xl mx-auto text-center" id="contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        {/* Animmaster Lib: Animated glow ring + heading reveal */}
        <div className="relative inline-block mb-2">
          <motion.div
            className="absolute -inset-8 rounded-full pointer-events-none"
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.3) 0%, transparent 70%)' }}
          />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Let&apos;s Build{' '}
          <AnimatedHeading text="Together" className="text-gradient" />
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg">
          Ready to collaborate on the next big AI innovation or build robust software solutions? Establish a secure connection via the channels below.
        </p>

        {/* Vengeance UI: Animated portfolio stats */}
        <div className="flex flex-wrap justify-center gap-10 mb-14">
          <AnimatedStat value={3} label="Featured Projects" suffix="+" color="text-brand-primary" />
          <AnimatedStat value={6} label="Certifications" color="text-brand-secondary" />
          <AnimatedStat value={1} label="SIH Internal Rank" color="text-emerald-400" />
          <AnimatedStat value={2} label="Industry Roles" suffix="+" color="text-cyan-400" />
        </div>

        {/* Skiper UI: Spotlight contact card area */}
        <SpotlightCard glowColor="rgba(59,130,246,0.1)" className="glass-panel rounded-3xl p-8 mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {contactLinks.map((link) => (
              <MagneticWrapper key={link.label} strength={0.3}>
                <motion.a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative overflow-hidden flex items-center gap-3 px-6 py-4 rounded-xl glass-panel hover:bg-white/10 transition-all text-gray-300 hover:text-white border border-white/8 hover:border-white/20"
                >
                  {/* Vengeance UI: Shimmer sweep on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 ease-in-out rounded-xl"
                    aria-hidden
                    style={{
                      background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.12) 50%, transparent 80%)',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </span>
                </motion.a>
              </MagneticWrapper>
            ))}
          </div>
        </SpotlightCard>

        <div className="mt-20 pb-8 text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
          <span>&copy; 2026 Manan Garg</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full inline-block" />
          <span>Designed &amp; Engineered with precision.</span>
        </div>
      </motion.div>
    </section>
  );
}
