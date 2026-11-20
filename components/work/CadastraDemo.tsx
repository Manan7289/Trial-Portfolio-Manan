'use client';
import Image from 'next/image';
import { useState } from 'react';

const STEPS = [
  {
    key: 'buildings',
    label: 'Buildings',
    src: '/cadastral_ai/step2_buildings.jpg',
    text: '288 roofs outlined. Solid: the roof model. Dashed: missed by the roof model but found by the land-cover model, and flagged for review.',
  },
  {
    key: 'landcover',
    label: 'Land cover',
    src: '/cadastral_ai/step3_landcover.jpg',
    text: 'Every pixel classified as building, road, tree, grass, farmland, bare land, water or paved area. Here: 62% building, 18% paved, 12% tree.',
  },
  {
    key: 'parcels',
    label: 'Parcels',
    src: '/cadastral_ai/step4_parcels.jpg',
    text: '266 numbered plots, each grown from a house up to the road and stopped at the parcel-boundary model’s lines. Editable before GIS export.',
  },
];

const RESULTS = [
  ['Roof segmentation (Mask R-CNN, fine-tuned on Indian roofs)', 'building IoU 0.52 → 0.81 on held-out Indian crops'],
  ['Land cover (SegFormer-B2, OpenEarthMap)', 'validation mIoU 0.67'],
  ['Parcel boundaries (U-Net ResNet34, Dutch cadastre → Indian plots)', 'boundary F-score 0.49 → 0.61'],
  ['Backend (Flask)', 'end-to-end API test with 46 checks'],
];

export default function CadastraDemo() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  return (
    <div className="grid gap-8">
      <div className="screen rounded-sm overflow-hidden">
        <div role="tablist" aria-label="Pipeline step" className="flex flex-wrap gap-1 p-2 border-b border-white/10">
          {STEPS.map((st, i) => (
            <button
              key={st.key}
              role="tab"
              id={`cad-tab-${st.key}`}
              aria-selected={i === step}
              aria-controls="cad-panel"
              onClick={() => setStep(i)}
              className={`press px-3 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-wider ${
                i === step ? 'bg-paper text-ink' : 'text-paper/70 hover:text-paper hover:bg-white/5'
              }`}
            >
              {i + 1} · {st.label}
            </button>
          ))}
        </div>
        <div id="cad-panel" role="tabpanel" aria-labelledby={`cad-tab-${s.key}`}>
          <Image
            src={s.src}
            alt={`CadastraAI workbench, ${s.label.toLowerCase()} step, over drone imagery of Singh Nagar, Vijayawada`}
            width={1024}
            height={785}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="block w-full h-auto"
          />
          <p className="px-4 py-3 text-sm text-paper/80 leading-relaxed border-t border-white/10">{s.text}</p>
        </div>
        <p className="px-4 pb-3 font-mono text-[10.5px] text-paper/50">
          Screenshots of the working app on 2.9 cm/px OpenAerialMap drone orthoimagery (Bhuvan), processed at 0.3 m/px; models run on Kaggle GPU.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">My part</h4>
          <p className="leading-relaxed text-ink/85">
            Team project for the Smart India Hackathon (problem 26012), Rank 1 in the college round. I built the Flask backend and
            integrated the team’s models into one pipeline: orthoimagery in; footprints, roads, land use, parcels and encroachment flags
            out; reviewed in a web-GIS workbench and exported as GeoJSON, Shapefile or GeoPackage.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">Team model results (held-out data)</h4>
          <dl className="text-sm">
            {RESULTS.map(([k, v]) => (
              <div key={k} className="py-2.5 border-t border-rule last:border-b">
                <dt className="text-ink/70">{k}</dt>
                <dd className="font-mono text-xs mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
