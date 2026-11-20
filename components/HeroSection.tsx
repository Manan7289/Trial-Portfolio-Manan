'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedText';
import FlightPanel from './FlightPanel';

const EASE = [0.22, 1, 0.36, 1] as const;

const facts = [
  ['Building', 'dronecore: onboard autonomy for multirotors, validated on PX4 and ArduPilot in software-in-the-loop'],
  ['Studying', 'B.Tech Computer Science, Bennett University (2024–2028)'],
  ['Looking for', 'A 4–6 month robotics, UAV or autonomy software internship. Open to international roles.'],
];

export default function HeroSection() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section id="home" className="relative w-full max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-20">
      <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-wider text-muted">
        Robotics and autonomy software
      </motion.p>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mt-8 items-start">
        <div className="lg:col-span-6">
          <h1 className="font-serif font-light tracking-[-0.04em] leading-[0.88] text-[clamp(3.6rem,10vw,8rem)]">
            <span className="block">
              <AnimatedHeading text="Manan" delay={0.1} />
            </span>
            <span className="block italic text-accent">
              <AnimatedHeading text="Garg" delay={0.22} />
            </span>
          </h1>

          <motion.p {...fade(0.45)} className="mt-10 font-serif text-2xl md:text-[1.7rem] leading-snug tracking-tight max-w-xl">
            I write autonomy software for drones: deciding on board when the aircraft can no longer trust its position, sensors,
            battery or the weather, and testing that in simulation before anything flies.
          </motion.p>

          <motion.div {...fade(0.6)} className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
            <Link href="/work/dronecore" className="press btn-ink">
              dronecore case study →
            </Link>
            <a href="/Manan_Garg_Resume.pdf" className="press btn-line" target="_blank" rel="noopener">
              Resume (PDF)
            </a>
            <a href="#contact" className="press btn-line">
              Contact
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.35)} className="lg:col-span-6">
          <FlightPanel />
        </motion.div>
      </div>

      <motion.dl {...fade(0.75)} className="mt-14 grid md:grid-cols-3 gap-x-8 text-sm">
        {facts.map(([k, v]) => (
          <div key={k} className="py-4 border-t border-rule">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted mb-1.5">{k}</dt>
            <dd className="leading-relaxed">{v}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
