import Link from 'next/link';
import FlightPanel from './FlightPanel';
import { RESUME_PDF } from '@/data/site';

const facts = [
  ['Building', 'dronecore: onboard autonomy for multirotors, validated on PX4 and ArduPilot in software-in-the-loop'],
  ['Studying', 'B.Tech Computer Science, Bennett University (2024–2028)'],
  ['Looking for', 'A 4–6 month robotics, UAV or autonomy software internship. Open to international roles.'],
];

/**
 * Above-the-fold content uses CSS entrance animations (`.rise`), not Framer Motion, so it paints with the
 * HTML instead of waiting for hydration. That keeps LCP low on slow phones, works without JavaScript,
 * and the global reduced-motion rule turns the animation off.
 */
const delay = (s: number) => ({ animationDelay: `${s}s` });

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-20">
      <p className="rise font-mono text-xs uppercase tracking-wider text-muted">Robotics and autonomy software</p>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mt-8 items-start">
        <div className="lg:col-span-6">
          <h1 className="font-serif font-light tracking-[-0.04em] leading-[0.88] text-[clamp(3.6rem,10vw,8rem)]">
            <span className="rise block" style={delay(0.05)}>
              Manan
            </span>
            <span className="rise block italic text-accent" style={delay(0.15)}>
              Garg
            </span>
          </h1>

          <p className="rise mt-10 font-serif text-2xl md:text-[1.7rem] leading-snug tracking-tight max-w-xl" style={delay(0.25)}>
            I write autonomy software for drones: deciding on board when the aircraft can no longer trust its position, sensors,
            battery or the weather, and testing that in simulation before anything flies.
          </p>

          <div className="rise mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider" style={delay(0.35)}>
            <Link href="/work/dronecore" className="press btn-ink">
              dronecore case study →
            </Link>
            <a href={RESUME_PDF} className="press btn-line" target="_blank" rel="noopener">
              Resume (PDF)
            </a>
            <a href="#contact" className="press btn-line">
              Contact
            </a>
          </div>
        </div>

        <div className="rise lg:col-span-6" style={delay(0.2)}>
          <FlightPanel />
        </div>
      </div>

      <dl className="rise mt-14 grid md:grid-cols-3 gap-x-8 text-sm" style={delay(0.45)}>
        {facts.map(([k, v]) => (
          <div key={k} className="py-4 border-t border-rule">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted mb-1.5">{k}</dt>
            <dd className="leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
