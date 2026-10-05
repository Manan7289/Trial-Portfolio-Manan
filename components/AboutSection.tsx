'use client';
import { motion } from 'framer-motion';
import { Network, Database, Code, Globe2 } from 'lucide-react';

export default function AboutSection() {
  const skills = [
    { name: 'Python', category: 'Programming' },
    { name: 'C++', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    { name: 'JavaScript', category: 'Programming' },
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'PyTorch', category: 'AI/ML' },
    { name: 'Scikit-Learn', category: 'AI/ML' },
    { name: 'Pandas', category: 'AI/ML' },
    { name: 'NumPy', category: 'AI/ML' },
    { name: 'Git', category: 'Tools' },
    { name: 'Linux', category: 'Tools' },
    { name: 'MLOps', category: 'Tools' },
  ];

  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="about">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">About & Expertise</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Education & Basics - takes up 5 cols */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-semibold">Education</h3>
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-white mb-2">B.Tech in Computer Science</h4>
                  <p className="text-gray-400 text-lg">Bennett University (2024 - 2028)</p>
                  <p className="inline-block mt-4 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium border border-brand-primary/20">
                    CGPA: 7.8/10.0
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4 font-semibold flex items-center gap-2">
                  <Globe2 size={16} /> Languages
                </h3>
                <div className="flex gap-4">
                  <span className="text-gray-300">English</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-300">Hindi</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-300">German</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Grid - takes up 7 cols */}
          <div className="md:col-span-7 glass-panel p-8 rounded-2xl">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-semibold">Technical Arsenal</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="px-4 py-3 rounded-lg border border-white/5 bg-white/[0.02] text-sm text-gray-300 hover:bg-white/[0.05] hover:border-white/10 transition-all flex items-center justify-between group"
                >
                  <span>{skill.name}</span>
                  {skill.category === 'AI/ML' && <Network size={14} className="text-brand-secondary opacity-50 group-hover:opacity-100" />}
                  {skill.category === 'Programming' && <Code size={14} className="text-brand-primary opacity-50 group-hover:opacity-100" />}
                  {skill.category === 'Tools' && <Database size={14} className="text-brand-accent opacity-50 group-hover:opacity-100" />}
                </div>
              ))}
            </div>
            
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4 font-semibold">Core Competencies</h3>
            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              {['Problem Solving', 'Active Listening', 'Teamwork', 'Perseverance', 'Public Speaking'].map(comp => (
                <span key={comp} className="px-3 py-1 rounded-full bg-black/40 border border-white/5">
                  {comp}
                </span>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
