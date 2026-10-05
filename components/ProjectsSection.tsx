'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Trophy, X, ChevronRight, Activity, Map, Cuboid, Radio } from 'lucide-react';

// --- PREMIUM ANIMATION COMPONENTS ---

const CadastralAnimation = () => (
  <div className="w-full h-80 rounded-xl bg-[#030712] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center isolate">
    {/* Background Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    
    <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/20">
      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
      Mapping Vectors
    </div>
    
    <svg viewBox="0 0 600 300" className="w-full h-full opacity-80 mt-10">
      <defs>
        <linearGradient id="cadastralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Topographic Lines */}
      {[
        "M 100 150 Q 200 50 300 150 T 500 100",
        "M 80 180 Q 250 80 350 180 T 550 130",
        "M 120 120 Q 220 20 280 120 T 450 70",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      ))}

      {/* Main Plot Area */}
      <motion.path
        d="M 150 180 L 250 100 L 400 120 L 450 220 L 300 250 Z"
        fill="url(#cadastralGrad)"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: 3, ease: "circOut" }}
      />
      
      {/* Animated Plot Nodes */}
      {[[150,180], [250,100], [400,120], [450,220], [300,250]].map((pt, i) => (
        <motion.circle 
          key={i} cx={pt[0]} cy={pt[1]} r="4" fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 0.5, delay: i * 0.4 + 1 }}
        />
      ))}
    </svg>
  </div>
);

const DepthWizardAnimation = () => (
  <div className="w-full h-80 rounded-xl bg-[#030712] border border-white/10 relative overflow-hidden flex items-center justify-center [perspective:1200px] isolate">
    <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-secondary bg-brand-secondary/10 px-3 py-1 rounded-full border border-brand-secondary/20">
      <Cuboid size={14} /> Depth Render
    </div>

    <motion.div
      className="relative w-64 h-64"
      initial={{ rotateX: 60, rotateZ: -45, y: 50 }}
      animate={{ rotateX: 60, rotateZ: 315, y: 50 }}
      transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Base Grid */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 border border-brand-secondary/40 p-1 bg-brand-secondary/5" style={{ transform: "translateZ(0px)" }}>
        {[...Array(25)].map((_, i) => (
          <div key={i} className="bg-brand-secondary/10 border border-brand-secondary/20" />
        ))}
      </div>
      
      {/* Extruded 3D wireframes */}
      <motion.div 
        className="absolute top-12 left-12 w-12 h-12 border-2 border-white/80 bg-white/10 backdrop-blur-sm flex items-center justify-center"
        style={{ transformOrigin: "center center" }}
        initial={{ transform: "translateZ(0px)" }}
        animate={{ transform: ["translateZ(0px)", "translateZ(80px)", "translateZ(0px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full border border-white/30" style={{ transform: "translateZ(-80px)" }} />
        {/* Connecting lines for wireframe feel */}
        <div className="absolute top-0 left-0 w-px h-[80px] bg-white/50 origin-top" style={{ transform: "rotateX(-90deg)" }} />
        <div className="absolute top-0 right-0 w-px h-[80px] bg-white/50 origin-top" style={{ transform: "rotateX(-90deg)" }} />
        <div className="absolute bottom-0 left-0 w-px h-[80px] bg-white/50 origin-top" style={{ transform: "rotateX(-90deg)" }} />
        <div className="absolute bottom-0 right-0 w-px h-[80px] bg-white/50 origin-top" style={{ transform: "rotateX(-90deg)" }} />
      </motion.div>

      <motion.div 
        className="absolute bottom-12 right-12 w-16 h-16 border-2 border-brand-primary/80 bg-brand-primary/20 backdrop-blur-sm"
        style={{ transformOrigin: "center center" }}
        initial={{ transform: "translateZ(0px)" }}
        animate={{ transform: ["translateZ(0px)", "translateZ(120px)", "translateZ(0px)"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </motion.div>
  </div>
);

const DroneAnimation = () => (
  <div className="w-full h-80 rounded-xl bg-[#030712] border border-white/10 relative overflow-hidden flex items-center justify-center isolate">
    <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">
      <Radio size={14} className="animate-pulse" /> Telemetry Live
    </div>

    {/* Radar Sweep Background */}
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <div className="w-[400px] h-[400px] rounded-full border border-brand-primary/30 relative">
        <div className="absolute inset-0 rounded-full border border-brand-primary/20 scale-75"></div>
        <div className="absolute inset-0 rounded-full border border-brand-primary/10 scale-50"></div>
        <motion.div 
          className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent to-brand-primary origin-left"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>

    {/* Drone HUD & Reticle */}
    <div className="relative z-10 w-48 h-48 border border-white/20 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="absolute inset-0 border-[3px] border-transparent border-t-brand-primary border-b-brand-primary rounded-full animate-spin-slow"></div>
      
      {/* Sleek Drone SVG */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-white"
      >
        <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          {/* Drone Core */}
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="#3b82f6" />
          {/* Arms */}
          <line x1="20" y1="20" x2="39" y2="39" stroke="currentColor" strokeWidth="2" />
          <line x1="80" y1="20" x2="61" y2="39" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="80" x2="39" y2="61" stroke="currentColor" strokeWidth="2" />
          <line x1="80" y1="80" x2="61" y2="61" stroke="currentColor" strokeWidth="2" />
          {/* Rotors */}
          {[
            {cx: 20, cy: 20}, {cx: 80, cy: 20}, {cx: 20, cy: 80}, {cx: 80, cy: 80}
          ].map((pos, i) => (
            <g key={i}>
              <circle cx={pos.cx} cy={pos.cy} r="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <motion.circle cx={pos.cx} cy={pos.cy} r="10" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="15 15"
                animate={{ rotate: 360 }}
                style={{ originX: `${pos.cx}px`, originY: `${pos.cy}px` }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  </div>
);

const MLOpsAnimation = () => (
  <div className="w-full h-80 rounded-xl bg-[#030712] border border-white/10 relative overflow-hidden flex items-center justify-center isolate">
    <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
      <Activity size={14} /> Pipeline Active
    </div>
    <svg viewBox="0 0 600 300" className="w-full h-full opacity-90 mt-8">
      {/* Curved Paths */}
      <path id="path1" d="M 50 150 C 150 150, 200 50, 300 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />
      <path id="path2" d="M 300 150 C 400 250, 450 150, 550 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />
      <path id="path3" d="M 50 150 C 150 150, 200 250, 300 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round" />

      {/* Glowing Data Packets moving along path via strokeDasharray trick */}
      {[
        {d: "M 50 150 C 150 150, 200 50, 300 150", color: "#3b82f6", delay: 0},
        {d: "M 300 150 C 400 250, 450 150, 550 150", color: "#8b5cf6", delay: 1.5},
        {d: "M 50 150 C 150 150, 200 250, 300 150", color: "#10b981", delay: 0.5}
      ].map((p, i) => (
        <motion.path
          key={`packet-${i}`}
          d={p.d}
          fill="none"
          stroke={p.color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: [1000, 0] }}
          transition={{ duration: 2.5, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{ filter: `drop-shadow(0 0 8px ${p.color})` }}
        />
      ))}

      {/* Node Circles */}
      <circle cx="50" cy="150" r="8" fill="#1f2937" stroke="#3b82f6" strokeWidth="3" />
      <circle cx="300" cy="150" r="12" fill="#1f2937" stroke="#8b5cf6" strokeWidth="3" />
      <circle cx="550" cy="150" r="16" fill="#1f2937" stroke="#10b981" strokeWidth="4" className="animate-pulse" />
      
      {/* Node Labels */}
      <text x="50" y="180" fill="gray" fontSize="12" textAnchor="middle" className="font-mono">Ingest</text>
      <text x="300" y="185" fill="gray" fontSize="12" textAnchor="middle" className="font-mono">Train & Eval</text>
      <text x="550" y="190" fill="white" fontSize="12" textAnchor="middle" className="font-mono font-bold">Deploy</text>
    </svg>
  </div>
);

// --- MAIN COMPONENT ---

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const projects = [
    {
      id: 'cadastral',
      title: 'CADASTRALAI',
      tech: 'Python, AI/ML',
      desc: 'Secured Rank 1 at the college level for the Smart India Hackathon by engineering a robust AI-based solution to process complex cadastral boundaries.',
      icon: <Map className="text-brand-accent" />,
      color: 'hover:border-brand-accent',
      highlight: true,
      animation: <CadastralAnimation />
    },
    {
      id: 'depth',
      title: 'Depth Wizard',
      tech: 'Python, Computer Vision',
      desc: 'Developed Depth Wizard for advanced depth estimation and 3D modeling tasks. Transforms 2D maps into 3D structural models.',
      icon: <Cuboid className="text-brand-secondary" />,
      color: 'hover:border-brand-secondary',
      highlight: false,
      animation: <DepthWizardAnimation />
    },
    {
      id: 'drone',
      title: 'Defence Drone',
      tech: 'AI, Automation',
      desc: 'Currently working on an autonomous defence drone integrating AI and automation for surveillance and targeting.',
      status: 'In Progress',
      icon: <Radio className="text-white" />,
      color: 'hover:border-white',
      highlight: false,
      animation: <DroneAnimation />
    },
    {
      id: 'mlops',
      title: 'MLOps Pipelines',
      tech: 'Machine Learning',
      desc: 'Built Machine Learning pipelines including data preprocessing, model training, and evaluation for lab work.',
      icon: <Activity className="text-brand-primary" />,
      color: 'hover:border-brand-primary',
      highlight: false,
      animation: <MLOpsAnimation />
    }
  ];

  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="projects">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Featured Engineering</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            whileHover={{ y: -4 }}
            className={`glass-panel p-8 rounded-2xl cursor-pointer border relative overflow-hidden group transition-all duration-300 ${
              project.highlight ? 'border-brand-accent/40 bg-white/[0.03]' : 'border-white/5 bg-white/[0.02]'
            } ${project.color}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  {project.icon}
                </div>
                <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-white">
                  {project.title}
                </motion.h3>
              </div>
              
              <div className="flex items-center gap-2">
                {project.highlight && (
                  <Trophy className="text-brand-accent animate-pulse" size={20} />
                )}
                {project.status && (
                  <span className="text-[10px] font-bold text-gray-300 bg-white/10 px-2 py-1 rounded-full uppercase tracking-widest border border-white/10">
                    {project.status}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-xs font-semibold text-gray-500 mb-5 tracking-widest uppercase">
              {project.tech}
            </div>
            
            <p className="text-gray-400 leading-relaxed text-sm line-clamp-2">
              {project.desc}
            </p>
            
            <div className="mt-8 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
              <span>Initialize Visualizer</span>
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Elegant Modal Overlay */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#030712]/90 backdrop-blur-xl"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full max-w-5xl glass-panel bg-[#0a0f1c]/90 border border-white/10 rounded-3xl relative z-10 flex flex-col overflow-y-auto max-h-[90vh] shadow-2xl"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white z-50 bg-white/5 hover:bg-white/10 transition-colors p-2 rounded-full border border-white/10"
              >
                <X size={20} />
              </button>

              {projects.find(p => p.id === selectedId) && (
                <div className="p-8 md:p-12 flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                      {projects.find(p => p.id === selectedId)?.icon}
                    </div>
                    <div>
                      <motion.h3 
                        layoutId={`title-${selectedId}`} 
                        className="text-3xl md:text-5xl font-bold text-white tracking-tight"
                      >
                        {projects.find(p => p.id === selectedId)?.title}
                      </motion.h3>
                      <div className="text-sm font-semibold text-brand-primary tracking-widest uppercase mt-2">
                        {projects.find(p => p.id === selectedId)?.tech}
                      </div>
                    </div>
                  </div>
                  
                  {/* The Premium Visualizer */}
                  <div className="w-full relative shadow-2xl rounded-xl">
                    {projects.find(p => p.id === selectedId)?.animation}
                  </div>

                  <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
                    {projects.find(p => p.id === selectedId)?.desc}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
