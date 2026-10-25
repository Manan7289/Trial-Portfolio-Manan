'use client';
import { motion } from 'framer-motion';
import { Network, Database, Code, Globe2, Sparkles, BookOpen } from 'lucide-react';

export default function AboutSection() {
  const skills = [
    { name: 'Python', category: 'Programming' },
    { name: 'C++', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    { name: 'TypeScript / JS', category: 'Programming' },
    { name: 'Deep Learning', category: 'AI/ML' },
    { name: 'PyTorch', category: 'AI/ML' },
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'Scikit-Learn', category: 'AI/ML' },
    { name: 'Computer Vision', category: 'AI/ML' },
    { name: 'Pandas & NumPy', category: 'AI/ML' },
    { name: 'FastAPI & REST', category: 'Tools' },
    { name: 'Git & Linux', category: 'Tools' },
    { name: 'MLOps & AWS', category: 'Tools' },
  ];

  const learningPoints = [
    'Eager learner who is always excited to learn emerging AI architectures, autonomous systems, and scalable software design.',
    'Translates complex technical challenges and benchmark datasets into reproducible production pipelines, autonomous workflows, and high-throughput APIs.',
    'Combines competitive programming rigor with cross-functional teamwork and agile product execution.',
  ];

  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="about">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-primary mb-2">Profile, Mindset &amp; AI Craft</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">About &amp; Technical Arsenal</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-5 font-semibold flex items-center gap-2">
                  <BookOpen size={15} className="text-brand-primary" /> Academic Foundation
                </h3>
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-white mb-1.5">B.Tech in Computer Science</h4>
                  <p className="text-gray-400 text-base">Bennett University (2024 – 2028)</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-semibold border border-brand-primary/20">
                      CGPA: 7.8 / 10.0
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20">
                      SIH Internal Rank 1
                    </span>
                  </div>
                </div>

                <div className="mb-8 pt-6 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-widest text-emerald-400 mb-3 font-semibold flex items-center gap-2">
                    <Sparkles size={15} /> Engineering Philosophy
                  </h3>
                  <ul className="space-y-2.5 text-sm text-gray-300 leading-relaxed">
                    {learningPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold flex items-center gap-2">
                  <Globe2 size={15} className="text-brand-secondary" /> Spoken Languages
                </h3>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-200 border border-white/5">English (Fluent)</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-200 border border-white/5">Hindi (Native)</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-200 border border-white/5">German (Conversational)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 glass-panel p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Technical Arsenal</h3>
                <div className="flex gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><Code size={12} className="text-brand-primary" /> Core</span>
                  <span className="flex items-center gap-1"><Network size={12} className="text-brand-secondary" /> AI/ML</span>
                  <span className="flex items-center gap-1"><Database size={12} className="text-brand-accent" /> MLOps</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-gray-200 hover:bg-white/[0.06] hover:border-white/15 text-sm font-medium transition-colors flex items-center justify-between group cursor-default"
                  >
                    <span>{skill.name}</span>
                    {skill.category === 'AI/ML' ? (
                      <Network size={15} className="text-brand-secondary opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : skill.category === 'Programming' ? (
                      <Code size={15} className="text-brand-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <Database size={15} className="text-brand-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold">Core Competencies &amp; Soft Skills</h3>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-300">
                {[
                  'Eager & Fast Learner',
                  'Deep Learning & Neural Networks',
                  'Algorithmic Problem Solving',
                  'Research-to-Production Execution',
                  'Active Listening',
                  'Cross-Functional Teamwork',
                  'Perseverance',
                ].map(comp => (
                  <span key={comp} className="px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-brand-primary/40 transition-colors">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
