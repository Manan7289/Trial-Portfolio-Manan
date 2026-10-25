'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, Compass, Cpu, Layers } from 'lucide-react';

function InteractiveConstellationCanvas({ scrollRatio }: { scrollRatio: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    scrollRef.current = scrollRatio;
  }, [scrollRatio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Pause animation when hero is off-screen to eliminate background lag
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Highly optimized node count: 32-38 nodes provides full starry density without lag
    const count = Math.min(38, Math.max(22, Math.floor((width * height) / 32000)));
    const nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.4 + (i % 3) * 0.6,
      hue: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a78bfa' : '#34d399',
      depth: 0.4 + (i % 5) * 0.18,
    }));

    const render = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const sp = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;

      // Mouse glow
      if (mActive && mx >= 0 && my >= 0) {
        const grad = ctx.createRadialGradient(mx, my, 8, mx, my, 220);
        grad.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
        grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * (1 + sp * 1.2);
        n.y += n.vy - sp * 0.25 * n.depth;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        if (mActive) {
          const dx = mx - n.x;
          const dy = my - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 1) {
            const force = ((160 - dist) / 160) * 0.7;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hue;
        ctx.globalAlpha = 0.65;
        ctx.fill();
      }

      // Batch all network lines in one single stroke for maximum GPU/CPU efficiency
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
            }
          }
        }
      }
      ctx.stroke();

      // Mouse connection lines
      if (mActive) {
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 0.85;
        ctx.globalAlpha = 0.45;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = mx - n.x;
          const dy = my - n.y;
          if (Math.abs(dx) < 170 && Math.abs(dy) < 170) {
            const dist = Math.hypot(dx, dy);
            if (dist < 170) {
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(mx, my);
            }
          }
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 will-change-transform" />;
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 650], [0, -70]);
  const heroScale = useTransform(scrollY, [0, 650], [1, 0.93]);
  const heroOpacity = useTransform(scrollY, [0, 550], [1, 0.15]);
  const ringRotate = useTransform(scrollY, [0, 800], [0, 55]);

  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrollRatio(Math.min(1, Math.max(0, latest / 650)));
    });
  }, [scrollY]);

  const pillars = [
    {
      icon: <Compass size={16} className="text-emerald-400" />,
      title: 'Eager & Adaptable Learner',
      desc: 'An eager learner who is always excited to learn emerging tech stacks, explore new paradigms, and quickly turn theory into clean, production-ready code.',
    },
    {
      icon: <Sparkles size={16} className="text-cyan-400" />,
      title: 'Applied AI & Computer Vision',
      desc: 'Designing deep convolutional and transformer models for visual perception, feature extraction, and real-time inference.',
    },
    {
      icon: <Cpu size={16} className="text-blue-400" />,
      title: 'Intelligent Automation & MLOps',
      desc: 'Engineering autonomous execution workflows, distributed model pipelines, and automated end-to-end data processing systems.',
    },
    {
      icon: <Layers size={16} className="text-violet-400" />,
      title: 'Full-Stack Engineering',
      desc: 'Architecting high-performance backends with Python & FastAPI, paired with modern, responsive React/Next.js interfaces.',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative w-full px-6 py-20 overflow-hidden" id="home">
      {/* Cursor & Scroll Reactive Neural Constellation Canvas */}
      <InteractiveConstellationCanvas scrollRatio={scrollRatio} />

      {/* Scroll-Reactive Orbital Rings */}
      <motion.div
        style={{ rotate: ringRotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-dashed border-brand-primary/15 pointer-events-none -z-10"
      />

      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="max-w-5xl text-center z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.05] text-xs font-medium text-gray-200 mb-8 backdrop-blur-md shadow-[0_0_24px_rgba(59,130,246,0.18)]"
        >
          <Sparkles size={14} className="text-brand-accent animate-pulse" />
          <span>AI/ML Systems · Intelligent Automation · Full-Stack Engineering</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20, delay: 0.08 }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-5 tracking-tight text-white"
        >
          Manan <span className="text-gray-500">Garg</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20, delay: 0.16 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-gradient"
        >
          AI/ML Engineer · Intelligent Automation &amp; Full-Stack Builder
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20, delay: 0.24 }}
          className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 text-base md:text-lg"
        >
          Computer Science undergraduate at Bennett University passionate about building scalable software, autonomous systems, and applied machine learning. As an <span className="text-white font-semibold">eager learner who is always excited to learn</span> new technologies, I focus on translating complex algorithmic concepts into robust production applications—from end-to-end MLOps pipelines and intelligent automation to distributed full-stack architectures and computer vision systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20, delay: 0.32 }}
          className="flex flex-wrap gap-4 justify-center mb-14"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full bg-white text-gray-950 font-semibold hover:bg-gray-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            Explore Featured Engineering
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full glass-panel text-white hover:bg-white/10 transition-colors font-medium"
          >
            Connect With Me
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/25 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {pillar.icon}
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">{pillar.title}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="mt-12 text-gray-400 hover:text-white transition-colors z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Scroll or Move Cursor</span>
        <ChevronDown size={26} />
      </motion.a>
    </section>
  );
}
