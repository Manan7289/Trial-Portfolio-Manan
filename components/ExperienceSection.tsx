'use client';
import { motion } from 'framer-motion';
import { Reveal, StaggerContainer, staggerItem } from './ui/InteractiveEffects';
import { SectionHead } from './ui/Section';

interface Certification {
  name: string;
  org: string;
  status: string;
  active?: boolean;
}

const certifications: Certification[] = [
  { name: 'AWS Academy Generative AI Foundations', org: 'AWS Academy', status: 'Verified', active: true },
  { name: 'Machine Learning Specialization', org: 'DeepLearning.AI · Stanford Online', status: 'Verified', active: true },
  { name: 'AWS Academy Cloud Developing', org: 'AWS Academy', status: 'Completed' },
  { name: 'AWS Academy Cloud Security Foundations', org: 'AWS Academy', status: 'Completed' },
  { name: 'AWS Academy Cloud Foundations', org: 'AWS Academy', status: 'Completed' },
  { name: 'Software Engineering', org: 'NPTEL', status: 'Completed' },
];

const experiences = [
  {
    org: 'Finlatics',
    role: 'Equity Markets Analyst',
    period: 'Oct 2024 – Dec 2024',
    color: 'brand-accent',
    colorHex: '#10b981',
    desc: (
      <>
        Researched Banking, Oil &amp; Gas and Capital Goods stocks and managed a simulated portfolio. Finished with a verified{' '}
        <span className="text-ink font-semibold">Finscore of 55.05</span>, ahead of the BSE 500 benchmark.
      </>
    ),
    links: [
      { href: '/certifications/finlatics_certificate.pdf', label: 'Verification Certificate', style: 'accent' },
      { href: '/certifications/finlatics_lor.pdf', label: 'Letter of Recommendation', style: 'ghost' },
    ],
  },
  {
    org: 'Enactus · Bennett University',
    role: 'Project Management Member',
    period: 'Aug 2024 – Aug 2025',
    color: 'brand-primary',
    colorHex: '#3b82f6',
    desc: 'Planned timelines and coordinated resources for social entrepreneurship projects run by student teams.',
    links: [],
  },
  {
    org: 'CodeChef Club · Bennett University',
    role: 'Competitive Programming Member',
    period: 'Aug 2024 – Feb 2026',
    color: 'brand-secondary',
    colorHex: '#8b5cf6',
    desc: 'Practiced graph, dynamic programming and data structure problems in timed contests, and reviewed peers\' solutions for time and space complexity.',
    links: [],
  },
];

const pdfIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export default function ExperienceSection() {
  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="experience">
      <SectionHead n="03" title="Experience" />

      <div className="grid md:grid-cols-12 gap-14 md:gap-8">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight mb-10">
              Roles and <em className="text-accent">certifications</em>.
            </h2>
          </Reveal>
          <StaggerContainer staggerDelay={0.1}>
            {experiences.map((exp) => (
              <motion.article key={exp.org} variants={staggerItem} className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-7 border-t border-rule last:border-b">
                <p className="font-mono text-xs uppercase tracking-wider text-muted pt-1.5">{exp.period}</p>
                <div>
                  <h3 className="font-serif text-2xl leading-tight">{exp.org}</h3>
                  <p className="text-accent text-sm mt-1 mb-3">{exp.role}</p>
                  <p className="leading-relaxed text-ink/80">{exp.desc}</p>
                  {exp.links.length > 0 && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 font-mono text-xs uppercase tracking-wider">
                      {exp.links.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="rule-link pb-0.5 inline-flex items-center gap-1.5">
                          {pdfIcon}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </StaggerContainer>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-4 md:mt-4">Certifications</h3>
          <StaggerContainer as="ul" staggerDelay={0.06}>
            {certifications.map((cert) => (
              <motion.li key={cert.name} variants={staggerItem} className="py-4 border-t border-rule last:border-b flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-lg leading-snug">{cert.name}</p>
                  <p className="text-sm text-muted mt-0.5">{cert.org}</p>
                </div>
                <span className={`font-mono text-[11px] uppercase tracking-wider pt-1.5 shrink-0 ${cert.active ? 'text-accent' : 'text-muted'}`}>
                  {cert.status}
                </span>
              </motion.li>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
