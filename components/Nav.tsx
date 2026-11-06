'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((e) => io.observe(e));
    const onScroll = () => window.scrollY < 200 && setActive('');
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-paper/90 backdrop-blur-sm border-b border-rule" aria-label="Primary">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="font-serif text-xl tracking-tight">
          Manan Garg
        </a>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-wider">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
              className={`transition-colors ${active === l.id ? 'text-accent' : 'text-muted hover:text-ink'}`}
            >
              <span className="opacity-60">0{i + 1}</span> {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="md:hidden font-mono text-xs uppercase tracking-wider py-2"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-rule bg-paper"
          >
            <div className="px-6 py-2 flex flex-col">
              {links.map((l, i) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="py-3 font-serif text-2xl border-b border-rule last:border-0"
                >
                  <span className="font-mono text-xs text-muted mr-3">0{i + 1}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div aria-hidden className="absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-accent" style={{ scaleX: progress }} />
    </nav>
  );
}
