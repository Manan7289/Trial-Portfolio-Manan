'use client';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Experience & Certifications</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Experience */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-8 font-semibold">Leadership & Extracurriculars</h3>
            
            <div className="space-y-8">
              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-brand-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-brand-primary/20"></div>
                <h4 className="text-xl font-bold text-white">Enactus</h4>
                <p className="text-brand-primary text-sm font-medium mt-1 mb-3">Project Management Member (1 Year)</p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Contributed to strategic planning and execution of social entrepreneurship initiatives at Bennett University.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute w-3 h-3 bg-brand-secondary rounded-full -left-[6.5px] top-1.5 ring-4 ring-brand-secondary/20"></div>
                <h4 className="text-xl font-bold text-white">CodeChef Club</h4>
                <p className="text-brand-secondary text-sm font-medium mt-1 mb-3">Member (1.5 Years)</p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Actively participated in competitive programming contests and algorithmic discussions to refine problem-solving efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-8 font-semibold">Professional Certifications</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Software Engineering', org: 'NPTEL', status: 'Completed' },
                { name: 'Machine Learning Specialization', org: 'DeepLearning.AI, Stanford Online', status: 'In-Progress', active: true },
                { name: 'Agentic AI', org: 'DeepLearning.AI', status: 'In-Progress', active: true },
              ].map((cert, i) => (
                <div key={i} className="group p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{cert.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{cert.org}</p>
                  </div>
                  {cert.active ? (
                    <span className="shrink-0 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium border border-brand-accent/20 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                      {cert.status}
                    </span>
                  ) : (
                    <span className="shrink-0 px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-medium border border-white/10">
                      {cert.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
