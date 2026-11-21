'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { flight } from '@/data/flight-demo1';

/**
 * Replays a real dronecore run on ArduCopter SITL as an isometric SVG.
 * Plain SVG + one requestAnimationFrame loop that writes attributes directly (no React re-render per frame,
 * no WebGL). It runs only while visible and stops for reduced-motion users or when paused.
 */

const SPEED = 6; // replay speed relative to the recorded run
const COS30 = Math.cos(Math.PI / 6);

type P3 = [number, number, number];

function iso([x, y, z]: P3): [number, number] {
  return [(x - y) * COS30, (x + y) * 0.5 - z];
}

export default function FlightPanel() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [eventIdx, setEventIdx] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGCircleElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const altRef = useRef<HTMLSpanElement>(null);
  const tRef = useRef(0);
  const eventRef = useRef(0);

  const geo = useMemo(() => {
    const pts = flight.path;
    const proj = pts.map(([, x, y, z]) => iso([x, y, z]));
    const shadow = pts.map(([, x, y]) => iso([x, y, 0]));
    // cumulative projected length, so the drawn line advances with the marker
    const cum = [0];
    for (let i = 1; i < proj.length; i++) {
      cum.push(cum[i - 1] + Math.hypot(proj[i][0] - proj[i - 1][0], proj[i][1] - proj[i - 1][1]));
    }
    const total = cum[cum.length - 1] || 1;
    const toD = (ps: [number, number][]) => ps.map(([u, v], i) => `${i ? 'L' : 'M'}${u.toFixed(2)} ${v.toFixed(2)}`).join(' ');

    const grid: string[] = [];
    for (let g = -10; g <= 70; g += 10) {
      const a = iso([g, -10, 0]);
      const b = iso([g, 60, 0]);
      grid.push(`M${a[0].toFixed(2)} ${a[1].toFixed(2)} L${b[0].toFixed(2)} ${b[1].toFixed(2)}`);
    }
    for (let g = -10; g <= 60; g += 10) {
      const a = iso([-10, g, 0]);
      const b = iso([70, g, 0]);
      grid.push(`M${a[0].toFixed(2)} ${a[1].toFixed(2)} L${b[0].toFixed(2)} ${b[1].toFixed(2)}`);
    }
    const corners = [iso([-10, -10, 0]), iso([70, -10, 0]), iso([70, 60, 0]), iso([-10, 60, 0]), ...proj];
    const us = corners.map((c) => c[0]);
    const vs = corners.map((c) => c[1]);
    const pad = 6;
    const minU = Math.min(...us) - pad;
    const minV = Math.min(...vs) - pad;
    const viewBox = `${minU.toFixed(2)} ${minV.toFixed(2)} ${(Math.max(...us) + pad - minU).toFixed(2)} ${(Math.max(...vs) + pad - minV).toFixed(2)}`;
    const drops = pts
      .map(([, x, y, z], i) => ({ i, a: iso([x, y, z]), b: iso([x, y, 0]), z }))
      .filter((d, i) => i % 5 === 0 && d.z > 1);
    const padA = [iso([-1.5, -1.5, 0]), iso([1.5, -1.5, 0]), iso([1.5, 1.5, 0]), iso([-1.5, 1.5, 0])];
    return { cum, total, path: toD(proj), shadow: toD(shadow), grid: grid.join(' '), viewBox, drops, padA };
  }, []);

  const duration = flight.path[flight.path.length - 1][0];
  const animate = playing && !reduce;

  // Draw the state at time t, interpolating between telemetry samples
  function frame(t: number) {
    const pts = flight.path;
    let i = 0;
    while (i < pts.length - 2 && pts[i + 1][0] < t) i++;
    const [t0, x0, y0, z0] = pts[i];
    const [t1, x1, y1, z1] = pts[i + 1];
    const k = Math.min(1, Math.max(0, (t - t0) / (t1 - t0 || 1)));
    const x = x0 + (x1 - x0) * k;
    const y = y0 + (y1 - y0) * k;
    const z = z0 + (z1 - z0) * k;
    const [u, v] = iso([x, y, z]);
    const [su, sv] = iso([x, y, 0]);
    const len = geo.cum[i] + (geo.cum[i + 1] - geo.cum[i]) * k;
    progressRef.current?.setAttribute('stroke-dashoffset', String(1 - len / geo.total));
    markerRef.current?.setAttribute('transform', `translate(${u.toFixed(2)} ${v.toFixed(2)})`);
    shadowRef.current?.setAttribute('cx', su.toFixed(2));
    shadowRef.current?.setAttribute('cy', sv.toFixed(2));
    if (timeRef.current) timeRef.current.textContent = `T+${t.toFixed(0).padStart(3, '0')} s`;
    if (altRef.current) altRef.current.textContent = `${z.toFixed(1)} m`;
    let e = 0;
    while (e < flight.events.length - 1 && flight.events[e + 1][0] <= t) e++;
    if (e !== eventRef.current) {
      eventRef.current = e;
      setEventIdx(e);
    }
  }

  // Static state when not animating: the whole flight for reduced motion, the current frame when paused
  useEffect(() => {
    if (!animate) frame(reduce ? duration : Math.min(tRef.current, duration));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, reduce]);

  useEffect(() => {
    if (!animate) return;
    const el = rootRef.current;
    let raf = 0;
    let last = 0;
    let visible = true;
    function tick(now: number) {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      tRef.current += dt * SPEED;
      // hold the touchdown for a moment, then loop
      if (tRef.current > duration + 12) tRef.current = 0;
      frame(Math.min(tRef.current, duration));
      raf = requestAnimationFrame(tick);
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    });
    if (el) io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  const event = flight.events[eventIdx]?.[1] ?? '';
  const s = flight.source;

  return (
    <figure ref={rootRef} className="screen rounded-sm overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-paper/60">
        <span>
          Mission replay · {s.autopilot} {s.firmware} SITL
        </span>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            className="press px-2.5 py-1 rounded-sm border border-white/20 text-paper/80 hover:text-paper hover:border-white/40"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
        )}
      </div>

      <div className="relative">
        <svg
          viewBox={geo.viewBox}
          className="block w-full h-auto"
          role="img"
          aria-label={`Isometric replay of a ${Math.round(duration)}-second autonomous mission flown by dronecore on ${s.autopilot} ${s.firmware} in software-in-the-loop simulation: take-off, a climbing 3D path, return and landing ${flight.metrics.landing_error_m} metres from the pad.`}
        >
          <path d={geo.grid} stroke="rgba(243,239,230,0.08)" strokeWidth="0.25" fill="none" />
          <polygon
            points={geo.padA.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ')}
            fill="rgba(243,239,230,0.12)"
            stroke="rgba(243,239,230,0.5)"
            strokeWidth="0.3"
          />
          <text x={(geo.padA[0][0] - 10).toFixed(2)} y={(geo.padA[0][1] + 5).toFixed(2)} fontSize="2.6" fill="rgba(243,239,230,0.55)" fontFamily="monospace">
            PAD A
          </text>
          <path d={geo.shadow} stroke="rgba(243,239,230,0.18)" strokeWidth="0.35" strokeDasharray="1 1" fill="none" />
          {geo.drops.map((d) => (
            <line
              key={d.i}
              x1={d.a[0].toFixed(2)}
              y1={d.a[1].toFixed(2)}
              x2={d.b[0].toFixed(2)}
              y2={d.b[1].toFixed(2)}
              stroke="rgba(243,239,230,0.1)"
              strokeWidth="0.25"
            />
          ))}
          <path d={geo.path} stroke="rgba(243,239,230,0.22)" strokeWidth="0.45" fill="none" strokeLinejoin="round" />
          <path
            ref={progressRef}
            d={geo.path}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1}
            stroke="#e8673f"
            strokeWidth="0.75"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle ref={shadowRef} r="0.9" cx="0" cy="0" fill="rgba(0,0,0,0.55)" />
          <g ref={markerRef}>
            <circle r="3.2" fill="rgba(232,103,63,0.16)" />
            <path d="M-1.6 -1.6 L1.6 1.6 M1.6 -1.6 L-1.6 1.6" stroke="#f3efe6" strokeWidth="0.45" />
            {[
              [-1.6, -1.6],
              [1.6, -1.6],
              [1.6, 1.6],
              [-1.6, 1.6],
            ].map(([cx, cy]) => (
              <circle key={`${cx}:${cy}`} cx={cx} cy={cy} r="0.75" fill="none" stroke="#f3efe6" strokeWidth="0.3" />
            ))}
          </g>
        </svg>

        <div aria-hidden className="absolute top-3 left-4 font-mono text-[11px] leading-relaxed text-paper/80 tabular-nums">
          <div>
            <span ref={timeRef}>T+000 s</span>
          </div>
          <div>
            ALT <span ref={altRef}>0.0 m</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/10 font-mono text-[11px] leading-relaxed">
        <p aria-hidden className="text-paper/85 min-h-[2.6em] line-clamp-2">
          <span className="text-[#e8673f]">›</span> {event}
        </p>
      </div>
      <figcaption className="px-4 pb-3 font-mono text-[10.5px] leading-relaxed text-paper/55">
        Recorded telemetry from {s.autopilot} {s.firmware} firmware in software-in-the-loop, commanded by dronecore over MAVLink (signed
        run, commit {s.commit}). Replayed at {SPEED}×. Landed {flight.metrics.landing_error_m} m from the pad. Simulated, not flown.
      </figcaption>
    </figure>
  );
}
