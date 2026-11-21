'use client';
import { motion } from 'framer-motion';
import { SectionHead } from './ui/Section';
import { Reveal, StaggerContainer, staggerItem } from './ui/InteractiveEffects';

const skills: { group: string; items: string[] }[] = [
  { group: 'Autonomy', items: ['MAVLink v2', 'PX4 and ArduPilot (SITL)', 'Kalman and complementary filters', 'A* planning', 'minimum-jerk trajectories', 'cascaded PID control', 'fault detection and recovery'] },
  { group: 'Vision and ML', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'instance and semantic segmentation', 'monocular depth estimation', 'geospatial data'] },
  { group: 'Languages', items: ['Python (primary)', 'C++', 'Java', 'TypeScript / JavaScript', 'SQL'] },
  { group: 'Tools', items: ['Git and GitHub Actions', 'Linux and WSL2', 'pytest and mypy', 'FastAPI and Flask', 'three.js', 'AWS (Academy)'] },
];

const practice = [
  'Say what the evidence is: simulated, software-in-the-loop, or flown. Nothing on this site has flown yet.',
  'Measure against a baseline before calling a result good.',
  'Write the failure cases down first, then make the system handle them.',
];

export default function AboutSection() {
  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="about">
      <SectionHead n="02" title="About" />

      <div className="grid md:grid-cols-12 gap-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-8">
            Computer science student, <em className="text-accent">autonomy</em> software.
          </h2>
          <p className="text-muted mb-1">B.Tech, Computer Science</p>
          <p className="font-serif text-xl mb-1">Bennett University</p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted mb-8">2024 – 2028 · CGPA 7.8 / 10</p>

          <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-4">How I work</h3>
          <StaggerContainer as="ol" className="space-y-4" staggerDelay={0.08}>
            {practice.map((pt, i) => (
              <motion.li key={pt} variants={staggerItem} className="flex gap-4 leading-relaxed">
                <span className="font-mono text-xs text-accent pt-1.5">0{i + 1}</span>
                <span>{pt}</span>
              </motion.li>
            ))}
          </StaggerContainer>
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-4">Skills</h3>
          <div>
            {skills.map((s) => (
              <div key={s.group} className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-5 border-t border-rule">
                <h4 className="font-serif text-lg">{s.group}</h4>
                <p className="leading-relaxed">{s.items.join(', ')}</p>
              </div>
            ))}
            <div className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-5 border-t border-b border-rule">
              <h4 className="font-serif text-lg">Spoken</h4>
              <p className="leading-relaxed">English (fluent), Hindi (native), German (conversational)</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
