'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { X, Sliders } from 'lucide-react';
import { SectionHead } from './ui/Section';
import { StaggerContainer, staggerItem } from './ui/InteractiveEffects';

// ─────────────────────────────────────────────────────────────
// CADASTRAAI – Authentic 5-Step Survey Workbench (Singh Nagar, Vijayawada — drone ORI)
// ─────────────────────────────────────────────────────────────
interface DensePlot {
  id: number;
  block: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  ry: number;
  rw: number;
  rh: number;
  missedByRoofModel: boolean;
  hasTree: boolean;
  treeX: number;
  treeY: number;
  treeR: number;
  roofTone: string;
  plotTone: string;
}

const URBAN_BLOCKS = [
  { id: 0, x0: 4,  y0: 4,  x1: 42, y1: 54, cols: 4, rows: 5 },
  { id: 1, x0: 46, y0: 4,  x1: 73, y1: 54, cols: 3, rows: 5 },
  { id: 2, x0: 77, y0: 4,  x1: 96, y1: 54, cols: 2, rows: 5 },
  { id: 3, x0: 4,  y0: 59, x1: 42, y1: 96, cols: 4, rows: 4 },
  { id: 4, x0: 46, y0: 59, x1: 73, y1: 96, cols: 3, rows: 4 },
  { id: 5, x0: 77, y0: 59, x1: 96, y1: 96, cols: 2, rows: 4 },
];

const DENSE_PLOTS: DensePlot[] = (() => {
  const list: DensePlot[] = [];
  let plotCounter = 101;
  const roofTones = ['#8b7968', '#9c8875', '#766759', '#a6917c', '#6e5a4f', '#877d73', '#967663'];
  const plotTones = [
    'rgba(182, 160, 122, 0.42)',
    'rgba(164, 144, 108, 0.44)',
    'rgba(196, 174, 134, 0.38)',
    'rgba(148, 132, 98, 0.46)',
    'rgba(172, 152, 114, 0.40)',
  ];

  URBAN_BLOCKS.forEach((b) => {
    const cellW = (b.x1 - b.x0) / b.cols;
    const cellH = (b.y1 - b.y0) / b.rows;
    for (let r = 0; r < b.rows; r++) {
      for (let c = 0; c < b.cols; c++) {
        const seed = (b.id * 31 + r * 17 + c * 13) % 19;
        const pad = 0.35;
        const x = b.x0 + c * cellW + pad;
        const y = b.y0 + r * cellH + pad;
        const w = cellW - pad * 2;
        const h = cellH - pad * 2;

        const insetX = 0.7 + (seed % 3) * 0.28;
        const insetY = 0.7 + ((seed + 2) % 3) * 0.25;
        const rx = x + insetX;
        const ry = y + insetY;
        const rw = Math.max(2.2, w - insetX * 2 - (seed % 2) * 0.4);
        const rh = Math.max(2.2, h - insetY * 2 - ((seed + 1) % 2) * 0.4);

        list.push({
          id: plotCounter++,
          block: b.id,
          x,
          y,
          w,
          h,
          rx,
          ry,
          rw,
          rh,
          missedByRoofModel: seed % 5 === 0,
          hasTree: seed % 3 === 0,
          treeX: x + w * (0.25 + (seed % 3) * 0.22),
          treeY: y + h * (0.25 + ((seed + 1) % 3) * 0.22),
          treeR: 1.4 + (seed % 3) * 0.65,
          roofTone: roofTones[seed % roofTones.length],
          plotTone: plotTones[seed % plotTones.length],
        });
      }
    }
  });
  return list;
})();

const WORKBENCH_STEPS = [
  {
    step: 1 as const,
    label: 'Image',
    bannerTitle: '1 · Drone ORI.',
    bannerText: 'Raw 2.9 cm/px OpenAerialMap orthomosaic over Singh Nagar, Vijayawada (Bhuvan), resampled to 0.3 m/px for Kaggle GPU inference.',
  },
  {
    step: 2 as const,
    label: 'Buildings',
    bannerTitle: '2 · Buildings.',
    bannerText: '288 roofs outlined by the AI. — Solid: roof model. - - - Dashed: missed by the roof model, found by the land-cover model — check these.',
  },
  {
    step: 3 as const,
    label: 'Land cover',
    bannerTitle: '3 · Land cover.',
    bannerText: 'Every pixel classified as building, road, tree, grass, farmland, bare land, water or paved area — here mostly building 62%, paved open area 18%, tree 12%.',
  },
  {
    step: 4 as const,
    label: 'Parcels',
    bannerTitle: '4 · Parcels.',
    bannerText: '266 numbered plots. Each plot is the land around one house: up to the road in front, and midway to the neighbouring houses at the sides and back, where the shared wall or the side setbacks are. Roads and lanes separate plots; open ground (parks, grounds) stays one parcel. Colour: main land use.',
  },
  {
    step: 5 as const,
    label: 'Review',
    bannerTitle: '5 · Review & GIS Export.',
    bannerText: '266 topological land parcels & 288 building footprints reconciled with 0.94 IoU. Ready for GeoJSON / Shapefile export to digital land registries.',
  },
];

const WORKBENCH_SCREENSHOTS: Record<number, string> = {
  2: '/cadastral_ai/step2_buildings.jpg',
  3: '/cadastral_ai/step3_landcover.jpg',
  4: '/cadastral_ai/step4_parcels.jpg',
};

function CadastralAnimation() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [autoCycle, setAutoCycle] = useState<boolean>(true);
  const [scanPaused, setScanPaused] = useState<boolean>(false);
  const [selectedPlotId, setSelectedPlotId] = useState<number>(124);
  const [activeParcelTool, setActiveParcelTool] = useState<string>('Select');
  const [viewMode, setViewMode] = useState<'vector' | 'screenshot'>('vector');
  const [zoom, setZoom] = useState<number>(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(rootRef, { amount: 0.2 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!autoCycle || !onScreen || reduce) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === 5 ? 1 : ((prev + 1) as 1 | 2 | 3 | 4 | 5)));
    }, 4200);
    return () => clearInterval(timer);
  }, [autoCycle, onScreen, reduce]);

  const currentStepMeta = WORKBENCH_STEPS.find((s) => s.step === activeStep) || WORKBENCH_STEPS[3];
  const selectedPlot = DENSE_PLOTS.find((p) => p.id === selectedPlotId) || DENSE_PLOTS[12];
  const activeScreenshot = WORKBENCH_SCREENSHOTS[activeStep] || WORKBENCH_SCREENSHOTS[4];

  return (
    <div
      ref={rootRef}
      className="w-full h-[460px] md:h-[540px] rounded-2xl bg-[#070b0a] border border-emerald-500/30 relative overflow-hidden flex flex-col font-sans select-none shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top CADASTRAAI Survey Workbench Header Bar */}
      <div className="px-4 py-2.5 bg-[#0a100e] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="font-extrabold tracking-tight text-sm sm:text-base text-white flex items-center">
            <span>CADASTRA</span>
            <span className="text-[#2dd4bf]">AI</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[9px] tracking-widest uppercase text-gray-400">
            SURVEY WORKBENCH · SINGH NAGAR, VIJAYAWADA — DRONE ORI
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-gray-400">
            <span className="font-mono uppercase text-[9px] text-gray-500">SURVEY</span>
            <span className="px-2.5 py-1 rounded bg-[#111916] border border-white/10 text-gray-200 font-medium text-[11px]">
              Singh Nagar, Vijayawada — drone ORI
            </span>
          </div>

          <button
            type="button"
            onClick={() => setViewMode((v) => (v === 'vector' ? 'screenshot' : 'vector'))}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold border transition-all cursor-pointer ${
              viewMode === 'screenshot'
                ? 'bg-[#2dd4bf]/20 text-[#2dd4bf] border-[#2dd4bf]/50'
                : 'bg-white/5 text-gray-300 hover:text-white border-white/10'
            }`}
          >
            {viewMode === 'vector' ? 'Show drone captures' : 'Show vector view'}
          </button>

          <button
            type="button"
            onClick={() => setAutoCycle((p) => !p)}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold border transition-all cursor-pointer ${
              autoCycle
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                : 'bg-white/5 text-gray-400 hover:text-white border-white/10'
            }`}
          >
            {autoCycle ? 'Auto-play: on' : 'Auto-play: off'}
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas Area */}
      <div className="flex-1 relative overflow-hidden bg-[#050807] flex items-center justify-center">
        {/* Top-left Zoom Controls (+ / -) */}
        <div className="absolute top-3 left-3 z-30 flex flex-col rounded-lg overflow-hidden border border-white/15 bg-white/95 text-gray-900 shadow-lg">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(1.35, +(z + 0.12).toFixed(2)))}
            className="w-7 h-7 flex items-center justify-center font-bold text-sm hover:bg-gray-200 border-b border-gray-300 cursor-pointer"
          >
            +
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(0.88, +(z - 0.12).toFixed(2)))}
            className="w-7 h-7 flex items-center justify-center font-bold text-sm hover:bg-gray-200 cursor-pointer"
          >
            −
          </button>
        </div>

        {/* 5-Stage Pipeline Stepper Pill Bar */}
        <div className="absolute top-3 left-12 right-3 z-30 flex flex-col items-start gap-2 pointer-events-none">
          <div className="pointer-events-auto inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#0c1412]/95 border border-white/10 backdrop-blur-md shadow-xl">
            {WORKBENCH_STEPS.map((st) => {
              const isCurr = st.step === activeStep;
              return (
                <button
                  type="button"
                  key={st.step}
                  onClick={() => {
                    setActiveStep(st.step);
                    setAutoCycle(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    isCurr
                      ? 'bg-[#2dd4bf] text-gray-950 shadow-[0_0_16px_rgba(45,212,191,0.45)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                      isCurr ? 'bg-gray-950 text-[#2dd4bf]' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {st.step}
                  </span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Contextual Callout Banner */}
          <div className="pointer-events-auto max-w-xl px-3.5 py-2 rounded-xl bg-[#0c1412]/95 border-l-2 border-l-[#2dd4bf] border border-white/10 text-[11px] text-gray-300 leading-relaxed backdrop-blur-md shadow-xl">
            <strong className="text-white">{currentStepMeta.bannerTitle}</strong>{' '}
            {activeStep === 2 ? (
              <span>
                288 roofs outlined by the AI.{' '}
                <span className="text-rose-400 font-semibold">─── Solid:</span> roof model.{' '}
                <span className="text-orange-400 font-semibold">- - - Dashed:</span> missed by the roof model, found by the land-cover model — check these.
              </span>
            ) : (
              <span>{currentStepMeta.bannerText}</span>
            )}
          </div>
        </div>

        {viewMode === 'screenshot' ? (
          <div className="w-full h-full flex items-center justify-center p-2 pt-24 pb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeScreenshot}
              alt={`CADASTRAAI Survey Workbench Step ${activeStep}`}
              className="max-h-full max-w-full object-contain rounded-lg border border-white/15 shadow-2xl transition-all duration-500"
            />
          </div>
        ) : (
          <div
            className="relative w-[300px] sm:w-[370px] md:w-[410px] aspect-square rounded-lg overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.85)] mt-14 mb-6 transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full block bg-[#3d3830]">
              <title>Singh Nagar Vijayawada Drone ORI Cadastral Segmentation</title>
              <rect x="0" y="0" width="100" height="100" fill="#464037" />
              <path
                d="M 42 0 L 45.8 0 L 44.5 100 L 40.8 100 Z"
                fill={activeStep === 3 ? '#9ca3af' : '#57534e'}
              />
              <path
                d="M 73 0 L 76.8 0 L 74.5 100 L 70.8 100 Z"
                fill={activeStep === 3 ? '#9ca3af' : '#57534e'}
              />
              <path
                d="M 0 54.2 L 100 56.4 L 100 59.8 L 0 57.6 Z"
                fill={activeStep === 3 ? '#9ca3af' : '#57534e'}
              />

              {DENSE_PLOTS.map((p) => {
                const isSelected = p.id === selectedPlotId;
                return (
                  <g
                    key={p.id}
                    onClick={() => setSelectedPlotId(p.id)}
                    className="cursor-pointer"
                  >
                    <rect
                      className="transition-[fill,stroke,stroke-width] duration-500"
                      x={p.x}
                      y={p.y}
                      width={p.w}
                      height={p.h}
                      fill={activeStep === 4 ? p.plotTone : 'rgba(92, 82, 68, 0.55)'}
                      stroke={
                        activeStep === 4 || activeStep === 5
                          ? isSelected
                            ? '#2dd4bf'
                            : 'rgba(255, 252, 240, 0.85)'
                          : 'rgba(0,0,0,0.2)'
                      }
                      strokeWidth={
                        activeStep === 4 || activeStep === 5
                          ? isSelected
                            ? 0.75
                            : 0.38
                          : 0.15
                      }
                    />
                    <rect
                      className="transition-[fill,stroke,stroke-width] duration-500"
                      x={p.rx}
                      y={p.ry}
                      width={p.rw}
                      height={p.rh}
                      fill={
                        activeStep === 3
                          ? 'rgba(224, 92, 64, 0.82)'
                          : p.roofTone
                      }
                      stroke={
                        activeStep === 2
                          ? p.missedByRoofModel
                            ? '#fb923c'
                            : '#f43f5e'
                          : activeStep === 5
                          ? 'rgba(45, 212, 191, 0.75)'
                          : 'rgba(255,255,255,0.12)'
                      }
                      strokeWidth={activeStep === 2 ? 0.58 : 0.25}
                      strokeDasharray={
                        activeStep === 2 && p.missedByRoofModel ? '1.1,0.7' : undefined
                      }
                    />
                    {p.hasTree && (
                      <circle
                        className="transition-[fill] duration-500"
                        cx={p.treeX}
                        cy={p.treeY}
                        r={p.treeR}
                        fill={
                          activeStep === 3
                            ? 'rgba(34, 154, 76, 0.9)'
                            : 'rgba(46, 92, 54, 0.75)'
                        }
                      />
                    )}
                    {(activeStep === 4 || activeStep === 5) && p.w > 6.5 && (
                      <text
                        x={p.x + p.w / 2}
                        y={p.y + p.h / 2 + 0.8}
                        textAnchor="middle"
                        fontSize="2.1"
                        fontFamily="monospace"
                        fill={isSelected ? '#2dd4bf' : 'rgba(255,255,255,0.85)'}
                        fontWeight="bold"
                      >
                        {p.id}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {!scanPaused && !reduce && (
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-full pointer-events-none z-20"
                initial={{ x: '0%' }}
                animate={{ x: ['0%', '98%', '0%'] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-0.5 h-full bg-[#2dd4bf] shadow-[0_0_20px_4px_rgba(45,212,191,0.85)]" />
                <div
                  className="w-20 h-full -ml-20"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(45,212,191,0.18))',
                  }}
                />
              </motion.div>
            )}
          </div>
        )}

        <div className="absolute bottom-2.5 left-3 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScanPaused((p) => !p)}
            className="px-3 py-1.5 rounded-lg bg-[#0c1412]/95 border border-white/15 text-[10px] font-mono font-bold tracking-wider uppercase text-gray-200 hover:text-white flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>LAYERS · PLOT #{selectedPlot.id}</span>
            <span className="text-[#2dd4bf]">{scanPaused ? '▶ SWEEP' : '⏸ SWEEP'}</span>
          </button>
        </div>

        {(activeStep === 4 || activeStep === 5) && (
          <div className="absolute bottom-2.5 right-3 z-30 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#0c1412]/95 border border-white/15 backdrop-blur-md shadow-xl text-[10px]">
            <span className="font-mono uppercase text-[9px] text-gray-500 mr-1.5">EDIT PARCELS</span>
            {['Select', 'Edit boundary', 'Draw', 'Split', 'Merge', 'Delete'].map((tool) => (
              <button
                type="button"
                key={tool}
                onClick={() => setActiveParcelTool(tool)}
                className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  activeParcelTool === tool
                    ? 'bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Attribution Footer Bar */}
      <div className="px-3 py-1 bg-[#0a100e] border-t border-white/10 flex flex-wrap items-center justify-between text-[9px] font-mono text-gray-400 shrink-0">
        <span>
          <strong className="text-[#2dd4bf]">Leaflet</strong> | OpenAerialMap VJWD_FLOODS drone ORI (Bhuvan, 2.9 cm) · processed at 0.3 m · models run on Kaggle
        </span>
        <span className="text-emerald-400">288 ROOFS · 266 PARCELS · SIH RANK 1</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DEPTH WIZARD – Isometric 3D City & ISRO Benchmark HUD
// ─────────────────────────────────────────────────────────────
const CITY_BUILDINGS = [
  [0,0,40],[1,0,70],[2,0,30],[3,0,55],[4,0,20],
  [0,1,60],[1,1,110],[2,1,45],[3,1,90],[4,1,35],
  [0,2,25],[1,2,80],[2,2,130],[3,2,75],[4,2,50],
  [0,3,50],[1,3,65],[2,3,55],[3,3,100],[4,3,40],
  [0,4,30],[1,4,45],[2,4,35],[3,4,50],[4,4,25],
];

const TILE = 36;

function Building({
  col,
  row,
  h,
  mode,
}: {
  col: number;
  row: number;
  h: number;
  mode: 'dsm' | 'lidar' | 'rgb' | 'ramp';
}) {
  const half = TILE / 2;
  const qtr  = TILE / 4;

  const gx = (col - row) * half;
  const gy = (col + row) * qtr;

  const hNorm = Math.min(1, Math.max(0, (h - 20) / 110));
  const bright = Math.max(0.48, 1 - (col + row) * 0.045);

  let topCol: string;
  let leftCol: string;
  let rightCol: string;

  if (mode === 'lidar') {
    // False-color LiDAR elevation heatmap
    if (hNorm > 0.75) {
      topCol = `rgba(244, 63, 94, 0.95)`;
      leftCol = `rgba(159, 18, 57, 0.92)`;
      rightCol = `rgba(190, 18, 60, 0.95)`;
    } else if (hNorm > 0.45) {
      topCol = `rgba(251, 191, 36, 0.95)`;
      leftCol = `rgba(180, 83, 9, 0.92)`;
      rightCol = `rgba(217, 119, 6, 0.95)`;
    } else {
      topCol = `rgba(45, 212, 191, 0.95)`;
      leftCol = `rgba(13, 148, 136, 0.92)`;
      rightCol = `rgba(15, 118, 110, 0.95)`;
    }
  } else if (mode === 'rgb') {
    // Realistic satellite orthomosaic roof tones
    const tone = (col * 3 + row * 7) % 3;
    if (tone === 0) {
      topCol = `rgba(180, 110, 90, ${bright})`;
      leftCol = `rgba(110, 60, 48, ${bright})`;
      rightCol = `rgba(140, 80, 65, ${bright})`;
    } else if (tone === 1) {
      topCol = `rgba(160, 165, 175, ${bright})`;
      leftCol = `rgba(90, 95, 105, ${bright})`;
      rightCol = `rgba(120, 125, 135, ${bright})`;
    } else {
      topCol = `rgba(130, 145, 150, ${bright})`;
      leftCol = `rgba(70, 80, 85, ${bright})`;
      rightCol = `rgba(95, 105, 110, ${bright})`;
    }
  } else if (mode === 'ramp') {
    // Spectral elevation ramp
    const r = Math.round(50 + hNorm * 200);
    const g = Math.round(220 - hNorm * 140);
    const b = Math.round(250 - hNorm * 180);
    topCol = `rgba(${r}, ${g}, ${b}, 0.95)`;
    leftCol = `rgba(${Math.round(r*0.6)}, ${Math.round(g*0.6)}, ${Math.round(b*0.6)}, 0.92)`;
    rightCol = `rgba(${Math.round(r*0.8)}, ${Math.round(g*0.8)}, ${Math.round(b*0.8)}, 0.95)`;
  } else {
    // Default: Predicted DSM architectural blue-cyan with specular reflection
    topCol   = `rgba(${Math.round(180*bright)}, ${Math.round(210*bright)}, ${Math.round(245*bright)}, 0.98)`;
    leftCol  = `rgba(${Math.round(35*bright)},  ${Math.round(58*bright)},  ${Math.round(92*bright)},  0.92)`;
    rightCol = `rgba(${Math.round(65*bright)},  ${Math.round(95*bright)},  ${Math.round(140*bright)}, 0.95)`;
  }

  const leftFace  = `${gx-half},${gy+qtr}  ${gx},${gy+half}  ${gx},${gy+half-h}  ${gx-half},${gy+qtr-h}`;
  const rightFace = `${gx+half},${gy+qtr}  ${gx},${gy+half}  ${gx},${gy+half-h}  ${gx+half},${gy+qtr-h}`;
  const topFace   = `${gx},${gy-h}  ${gx-half},${gy+qtr-h}  ${gx},${gy+half-h}  ${gx+half},${gy+qtr-h}`;

  return (
    <g key={`b-${col}-${row}`}>
      <polygon points={leftFace}  fill={leftCol}  stroke="rgba(255,255,255,0.06)" strokeWidth="0.45" />
      <polygon points={rightFace} fill={rightCol} stroke="rgba(255,255,255,0.06)" strokeWidth="0.45" />
      <polygon points={topFace}   fill={topCol}   stroke="rgba(255,255,255,0.18)" strokeWidth="0.55" />
      {/* High-rise window facets */}
      {h > 55 && (
        <line
          x1={gx}
          y1={gy + half - h + 8}
          x2={gx}
          y2={gy + half - 4}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.75"
          strokeDasharray="2,3"
        />
      )}
    </g>
  );
}

const DepthWizardAnimation = () => {
  const [mode, setMode] = useState<'dsm' | 'lidar' | 'rgb' | 'ramp'>('dsm');

  const sortedBuildings = useMemo(
    () => [...CITY_BUILDINGS].sort(([c1, r1], [c2, r2]) => (c1 + r1) - (c2 + r2)),
    []
  );

  return (
    <div className="w-full h-[360px] md:h-[480px] rounded-xl bg-[#0b0f19] border border-white/10 relative overflow-hidden flex font-sans text-[10px] sm:text-xs shadow-2xl">
      {/* Left DSM Controls Bar */}
      <div className="hidden md:flex w-52 h-full border-r border-white/10 bg-[#0d1424]/95 p-4 flex-col gap-4 z-20 shrink-0">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest text-[11px] border-b border-white/10 pb-2.5">
          <Sliders size={13} /> DSM CONTROLS
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <button
            type="button"
            onClick={() => setMode('dsm')}
            className={`py-2 px-2 rounded-lg font-semibold border transition-all cursor-pointer text-center ${
              mode === 'dsm'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Predicted DSM
          </button>
          <button
            type="button"
            onClick={() => setMode('lidar')}
            className={`py-2 px-2 rounded-lg font-semibold border transition-all cursor-pointer text-center ${
              mode === 'lidar'
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            LiDAR Ref
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <button
            type="button"
            onClick={() => setMode('rgb')}
            className={`py-2 px-2 rounded-lg font-semibold border transition-all cursor-pointer text-center ${
              mode === 'rgb'
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            RGB Satellite
          </button>
          <button
            type="button"
            onClick={() => setMode('ramp')}
            className={`py-2 px-2 rounded-lg font-semibold border transition-all cursor-pointer text-center ${
              mode === 'ramp'
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Elevation Ramp
          </button>
        </div>

        <div className="mt-auto p-3 rounded-lg bg-black/40 border border-white/5 text-[9px] text-gray-400 space-y-1 font-mono">
          <div className="text-gray-200 font-bold uppercase tracking-wider">Elevation Scale</div>
          <div className="flex justify-between">
            <span>Ground:</span>
            <span className="text-emerald-400">0.0m</span>
          </div>
          <div className="flex justify-between">
            <span>Peak Tower:</span>
            <span className="text-cyan-400">130.0m</span>
          </div>
          <div className="flex justify-between">
            <span>Sensor MAE:</span>
            <span className="text-amber-400">1.41m</span>
          </div>
        </div>
      </div>

      {/* Main 3D Isometric Viewport */}
      <div className="flex-1 h-full relative overflow-hidden bg-[#05080f] flex flex-col items-center justify-center p-2 sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* Dynamic Responsive Isometric Cityscape SVG */}
        <motion.svg
          viewBox="-105 -118 210 220"
          className="w-full h-full max-h-[420px] max-w-[500px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <title>Depth Wizard Isometric 3D Digital Surface Model Projection</title>

          {/* Ground Grid Plinth */}
          {CITY_BUILDINGS.map(([col, row]) => {
            const x = (col - row) * (TILE / 2);
            const y = (col + row) * (TILE / 4);
            return (
              <polygon
                key={`ground-${col}-${row}`}
                points={`${x},${y}  ${x - TILE/2},${y + TILE/4}  ${x},${y + TILE/2}  ${x + TILE/2},${y + TILE/4}`}
                fill="rgba(15,23,42,0.92)"
                stroke="rgba(6,182,212,0.15)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Isometric Extruded Buildings */}
          {sortedBuildings.map(([col, row, h]) => (
            <Building key={`b-${col}-${row}`} col={col} row={row} h={h} mode={mode} />
          ))}
        </motion.svg>

        {/* Elevation Legend Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 sm:left-6 sm:right-6 z-20 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0a101d]/90 border border-white/10 backdrop-blur-md text-[9px] font-mono text-gray-300 pointer-events-none">
          <span className="text-gray-400">0m (Ground)</span>
          <div className="flex-1 mx-3 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 via-amber-400 to-rose-500 opacity-80" />
          <span className="text-cyan-400 font-bold">130m Max Peak (Direct Metric)</span>
        </div>
      </div>

      {/* Right Benchmark HUD */}
      <div className="w-52 sm:w-56 h-full border-l border-white/10 bg-[#0d1424]/95 p-3.5 sm:p-4 flex flex-col gap-3.5 z-20 shrink-0 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-wider text-[10px] uppercase border-b border-white/10 pb-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse" />
          ISRO Benchmark HUD
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'MAE',  value: '1.41m', color: 'text-emerald-400' },
            { label: 'RMSE', value: '3.10m', color: 'text-cyan-400' },
            { label: 'CORR', value: '0.905', color: 'text-yellow-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex flex-col items-center">
              <span className="text-gray-500 text-[8px] uppercase tracking-wider mb-0.5">{s.label}</span>
              <span className={`${s.color} font-bold text-[10px]`}>{s.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 text-[9px] font-mono text-gray-300">
          <div className="text-gray-400 font-bold uppercase tracking-wider text-[8px]">Baselines vs Ours</div>
          <div className="p-2 rounded bg-white/[0.02] border border-white/5 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Zero Elevation:</span>
              <span className="text-red-400">4.43m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Per-Tile Mean:</span>
              <span className="text-red-400">4.88m</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-400 border-t border-white/5 pt-1">
              <span>DepthWizard:</span>
              <span>1.41m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MLOPS PIPELINE – Animated Node Graph
// ─────────────────────────────────────────────────────────────
const PIPELINE = [
  { id: '01', label: 'Raw data ingestion',          sub: 'Geofabrik OSM · Kaggle catalogs',     accent: '#3b82f6' },
  { id: '02', label: 'Feature engineering & routing', sub: 'Normalisation · tokenisation',       accent: '#8b5cf6' },
  { id: '03', label: 'Distributed training',        sub: 'Multi-GPU · mixed precision',         accent: '#06b6d4' },
  { id: '04', label: 'Ensemble validation',         sub: 'MAE · RMSE · entity F1',              accent: '#10b981' },
  { id: '05', label: 'Production inference',        sub: 'FastAPI · async REST endpoint',       accent: '#f59e0b' },
];

const MLOpsAnimation = () => {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(rootRef, { amount: 0.3 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!onScreen || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PIPELINE.length), 1300);
    return () => clearInterval(t);
  }, [onScreen, reduce]);

  return (
    <div
      ref={rootRef}
      className="w-full min-h-80 rounded-xl bg-[#030712] border border-violet-500/20 relative overflow-hidden flex flex-col justify-center px-6 sm:px-8 py-6 isolate gap-2.5"
    >
      {/* Data packet travelling down the pipeline */}
      <div aria-hidden className="absolute left-[2.6rem] sm:left-[3.1rem] top-8 bottom-8 w-px bg-white/10 z-0" />
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute left-[2.6rem] sm:left-[3.1rem] -ml-[3px] w-[7px] h-[7px] rounded-full bg-white z-0 shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]"
          initial={{ top: '2rem', opacity: 0 }}
          animate={{ top: ['2rem', 'calc(100% - 2rem)'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {PIPELINE.map((stage, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={stage.id}
            className="relative z-10 flex items-center gap-4 rounded-xl px-4 py-2.5 border transition-colors duration-500"
            style={{
              background: isActive ? `${stage.accent}12` : 'rgba(255,255,255,0.02)',
              borderColor: isActive ? `${stage.accent}66` : 'rgba(255,255,255,0.05)',
            }}
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
          >
            <div
              className="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 font-mono text-[9px] font-bold bg-[#030712] transition-colors duration-500"
              style={{
                borderColor: stage.accent,
                color: isActive ? '#030712' : stage.accent,
                background: isActive ? stage.accent : '#030712',
              }}
            >
              {stage.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{stage.label}</p>
              <p className="text-gray-400 text-[10px] truncate">{stage.sub}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const PROJECTS = [
  {
    id: 'cadastral',
    n: '01',
    title: 'CADASTRAAI Survey Workbench',
    tag: 'Smart India Hackathon · internal Rank 1',
    tech: 'Python · Computer vision · Leaflet · Kaggle GPU',
    desc: 'A five-step survey workbench built for the Smart India Hackathon. It runs on 2.9 cm/px OpenAerialMap drone imagery of Singh Nagar, Vijayawada. A roof segmentation model and a land-cover model (62% building, 18% paved, 12% tree) produce 288 outlined roofs and 266 land parcels that can be edited in the browser.',
    metrics: ['Internal Rank 1', '288 roofs', '266 parcels'],
    Demo: CadastralAnimation,
  },
  {
    id: 'depth',
    n: '02',
    title: 'Depth Wizard',
    tag: 'SIH26175 · validated against ISRO LiDAR',
    tech: 'Python · PyTorch · FastAPI · isometric SVG',
    desc: 'Predicts per-pixel elevation from a single RGB satellite image and builds a 3D digital surface model from it. A convolutional-transformer network reaches 1.41 m MAE and 0.905 Pearson correlation against ISRO LiDAR ground truth.',
    metrics: ['1.41 m MAE', '3.10 m RMSE', '0.905 correlation'],
    Demo: DepthWizardAnimation,
  },
  {
    id: 'mlops',
    n: '03',
    title: 'MLOps & Entity Resolution Pipeline',
    tag: 'Amazon ML Challenge',
    tech: 'Python · Scikit-Learn · FastAPI · distributed training',
    desc: 'A machine learning and entity-resolution workflow for cleaning up large, noisy product catalogs, built for the Amazon ML Challenge.',
    metrics: ['5-stage pipeline', 'Multi-GPU training', 'FastAPI serving'],
    Demo: MLOpsAnimation,
  },
];

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = PROJECTS.find((p) => p.id === selectedId);

  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedId(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selectedId]);

  return (
    <section className="py-24 w-full px-6 max-w-6xl mx-auto" id="projects">
      <SectionHead n="02" title="Selected work" />

      <StaggerContainer as="ul" staggerDelay={0.12}>
        {PROJECTS.map((p) => (
          <motion.li key={p.id} variants={staggerItem} className="border-t border-rule last:border-b">
            <button
              type="button"
              onClick={() => setSelectedId(p.id)}
              className="group w-full text-left grid md:grid-cols-12 gap-x-8 gap-y-3 py-9 md:py-11 px-2 -mx-2 hover:bg-paper-deep/70 transition-colors cursor-pointer"
            >
              <span className="md:col-span-1 font-mono text-xs text-accent pt-2">{p.n}</span>
              <div className="md:col-span-5">
                <h3 className="font-serif text-3xl md:text-4xl leading-[1.05] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {p.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-muted mt-3">{p.tag}</p>
              </div>
              <div className="md:col-span-5">
                <p className="leading-relaxed text-ink/80">{p.desc}</p>
                <p className="font-mono text-xs text-muted mt-4">{p.tech}</p>
                <p className="font-mono text-xs mt-2">{p.metrics.join('  ·  ')}</p>
              </div>
              <span
                aria-hidden
                className="md:col-span-1 md:text-right font-mono text-xs uppercase tracking-wider pt-2 text-muted group-hover:text-accent transition-colors"
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Open →</span>
              </span>
            </button>
          </motion.li>
        ))}
      </StaggerContainer>

      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
              onClick={() => setSelectedId(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl bg-paper text-ink rounded-sm relative z-10 flex flex-col overflow-y-auto max-h-[90vh] shadow-2xl p-6 sm:p-8 md:p-10 gap-6"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute top-5 right-5 z-50 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                Close <X size={14} />
              </button>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">{selected.n} · {selected.tag}</p>
                <h3 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight pr-20">{selected.title}</h3>
              </div>
              <div className="w-full rounded-sm overflow-hidden">
                <selected.Demo />
              </div>
              <p className="leading-relaxed text-ink/80 max-w-3xl">{selected.desc}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
