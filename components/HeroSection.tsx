'use client';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative w-full px-6" id="home">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl text-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-8 backdrop-blur-md">
          <Sparkles size={14} className="text-brand-primary" />
          <span>Building intelligent systems</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight text-white">
          Manan <span className="text-gray-500">Garg</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gradient">
          AI & ML Enthusiast / Software Engineer
        </h2>
        
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 text-base md:text-lg">
          A strong believer in the ability of technology and research combined with design thinking for strengthening our societies and having a positive effect on the world.
        </p>
        
        <div className="flex gap-4 justify-center">
          <a href="#projects" className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-3 rounded-full glass-panel text-white hover:bg-white/10 transition-colors font-medium">
            Contact Me
          </a>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 text-gray-500"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
