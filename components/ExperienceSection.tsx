'use client';
import { motion } from 'framer-motion';

interface Certification {
  name: string;
  org: string;
  status: string;
  active?: boolean;
}

const certifications: Certification[] = [
  { name: 'AWS Academy Generative AI Foundations', org: 'AWS Academy · Foundation & GenAI Architecture', status: 'Verified', active: true },
  { name: 'Machine Learning Specialization', org: 'DeepLearning.AI · Stanford Online', status: 'Verified', active: true },
  { name: 'AWS Academy Cloud Developing', org: 'AWS Academy · Serverless & Cloud SDKs', status: 'Completed' },
  { name: 'AWS Academy Cloud Security Foundations', org: 'AWS Academy · IAM & Zero-Trust Architecture', status: 'Completed' },
  { name: 'AWS Academy Cloud Foundations', org: 'AWS Academy · Core Infrastructure', status: 'Completed' },
  { name: 'Software Engineering', org: 'NPTEL · System Design & SDLC', status: 'Completed' },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary mb-2">Track Record &amp; Credentials</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Experience &amp; Certifications</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Experience */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-semibold">Leadership &amp; Industry Experience</h3>
            
            <div className="space-y-8">
              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-brand-accent rounded-full -left-[6.5px] top-1.5 ring-4 ring-brand-accent/20" />
                <h4 className="text-xl font-bold text-white">Finlatics</h4>
                <p className="text-brand-accent text-sm font-semibold mt-1 mb-1">Equity Markets Analyst</p>
                <p className="text-gray-500 text-xs font-mono font-semibold mb-3">Oct 2024 – Dec 2024</p>
                <p className="text-gray-300 leading-relaxed text-sm mb-4">
                  Conducted quantitative and fundamental equity research across Banking, Oil &amp; Gas, and Capital Goods sectors. Actively managed a simulated institutional portfolio and achieved a verified <span className="text-white font-semibold">Finscore of 55.05</span>, consistently outperforming BSE 500 benchmark baselines.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/certifications/finlatics_certificate.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/25 text-brand-accent text-xs font-semibold transition-colors">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Verification Certificate
                  </a>
                  <a href="/certifications/finlatics_lor.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-colors">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Letter of Recommendation
                  </a>
                </div>
              </div>

              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-brand-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-brand-primary/20" />
                <h4 className="text-xl font-bold text-white">Enactus · Bennett University</h4>
                <p className="text-brand-primary text-sm font-semibold mt-1 mb-1">Project Management Member</p>
                <p className="text-gray-500 text-xs font-mono font-semibold mb-3">Aug 2024 – Aug 2025 (1 Year)</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Spearheaded cross-functional project roadmaps and resource coordination for sustainable social entrepreneurship initiatives, aligning student engineering teams with measurable community outcomes.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-brand-secondary rounded-full -left-[6.5px] top-1.5 ring-4 ring-brand-secondary/20" />
                <h4 className="text-xl font-bold text-white">CodeChef Club · Bennett University</h4>
                <p className="text-brand-secondary text-sm font-semibold mt-1 mb-1">Competitive Programming Member</p>
                <p className="text-gray-500 text-xs font-mono font-semibold mb-3">Aug 2024 – Feb 2026 (1.5 Years)</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Solved complex graph, dynamic programming, and data structure problems in timed contests while collaborating in peer code reviews to sharpen algorithmic time/space complexity.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col h-full lg:max-h-[650px]">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-semibold shrink-0">Professional Certifications</h3>
            
            <div className="space-y-3.5 overflow-y-auto pr-3 custom-scrollbar flex-1">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-base font-bold text-gray-100 group-hover:text-white transition-colors">{cert.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">{cert.org}</p>
                  </div>
                  {cert.active ? (
                    <span className="shrink-0 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold border border-brand-accent/25 flex items-center gap-2 w-max">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                      {cert.status}
                    </span>
                  ) : (
                    <span className="shrink-0 px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-medium border border-white/10 w-max">
                      {cert.status}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
