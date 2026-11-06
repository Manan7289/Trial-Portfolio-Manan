'use client';
import { motion } from 'framer-motion';
import { SectionHead } from './ui/Section';
import { Reveal, StaggerContainer, staggerItem } from './ui/InteractiveEffects';

const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'C++', 'Java', 'TypeScript / JavaScript'] },
  { group: 'Machine learning', items: ['Deep learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Computer vision', 'Pandas & NumPy'] },
  { group: 'Tools', items: ['FastAPI & REST', 'Git & Linux', 'MLOps & AWS'] },
];

const practice = [
  'Start from a real dataset or benchmark and build the whole path to a working API.',
  'Practice algorithms in CodeChef contests and peer code reviews.',
  'Pick up new frameworks quickly when a project needs them.',
];

export default function AboutSection() {
  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="about">
      <SectionHead n="01" title="About" />

      <div className="grid md:grid-cols-12 gap-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-8">
            Computer science student, <em className="text-accent">applied</em> ML.
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
