'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

// Skiper UI: Magnetic 3D tilt card with spotlight hover effect
export function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(59,130,246,0.15)',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%', opacity: 0 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 28 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const px = (cx / rect.width - 0.5) * 2;
    const py = (cy / rect.height - 0.5) * 2;
    rotateX.set(-py * 7);
    rotateY.set(px * 7);
    setSpotlight({ x: `${(cx / rect.width) * 100}%`, y: `${(cy / rect.height) * 100}%`, opacity: 1 });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 160px at ${spotlight.x} ${spotlight.y}, ${glowColor}, transparent 70%)`,
          opacity: spotlight.opacity,
        }}
      />
      {children}
    </motion.div>
  );
}

// Vengeance UI: Shine / shimmer button
export function ShineButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'glass';
  className?: string;
}) {
  const base =
    variant === 'primary'
      ? 'bg-white text-gray-950 font-semibold shadow-[0_0_30px_rgba(255,255,255,0.2)]'
      : 'glass-panel text-white font-medium border border-white/15';

  const inner = (
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
  );

  const shared = `group relative overflow-hidden px-8 py-3.5 rounded-full transition-transform active:scale-95 inline-flex items-center justify-center ${base} ${className}`;

  const shimmer = (
    <span
      className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 ease-in-out"
      aria-hidden
      style={{
        background:
          'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%)',
      }}
    />
  );

  if (href) {
    return (
      <motion.a href={href} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className={shared}>
        {shimmer}
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className={shared}>
      {shimmer}
      {inner}
    </motion.button>
  );
}

// Skiper UI: Animated border / gradient border card
export function GlowBorderCard({
  children,
  className = '',
  accentColor = '#3b82f6',
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl p-[1px] transition-all duration-300 ${className}`}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${accentColor}60, ${accentColor}15, transparent)`
          : 'rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="rounded-[15px] bg-[rgba(17,24,39,0.85)] backdrop-blur-md h-full w-full">
        {children}
      </div>
    </div>
  );
}

// Animmaster Lib: Magnetic button effect
export function MagneticWrapper({
  children,
  className = '',
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Skiper UI: Stagger container — children animate in sequence
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 20 },
  },
};
