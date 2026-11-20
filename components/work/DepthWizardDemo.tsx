import Image from 'next/image';

// Held-out GAMUS test split, evaluated once (Depth Wizard README, "ISRO Benchmark Accuracy & Validation")
const BENCH = [
  { name: 'Predict 0 m everywhere', mae: 4.43, rmse: 8.62, r: '0.000' },
  { name: 'Per-tile mean (oracle)', mae: 4.08, rmse: 6.24, r: '0.000' },
  { name: 'Depth Anything V2, zero-shot', mae: 4.79, rmse: 7.29, r: '0.621' },
  { name: 'Depth Wizard v1', mae: 2.86, rmse: 3.86, r: '0.884' },
  { name: 'Depth Wizard v2', mae: 1.41, rmse: 3.1, r: '0.905', ours: true },
];

const BANDS = [
  ['Ground, 0–2 m', '0.52 m'],
  ['Low vegetation, 2–5 m', '1.84 m'],
  ['Trees and cottages, 5–10 m', '2.11 m'],
  ['Mid-rise, 10–20 m', '2.95 m'],
  ['High-rise, 20–40 m', '3.99 m'],
  ['Above 40 m', '11.06 m'],
];

const MAX = 5;

export default function DepthWizardDemo() {
  return (
    <div className="grid gap-8">
      <figure className="screen rounded-sm p-4 sm:p-6">
        <figcaption className="font-mono text-[11px] uppercase tracking-wider text-paper/60 mb-4">
          Mean absolute height error on the held-out test split (lower is better)
        </figcaption>
        <ul className="grid gap-3">
          {BENCH.map((b) => (
            <li key={b.name} className="grid grid-cols-[minmax(8rem,13rem)_1fr] gap-3 items-center text-sm">
              <span className={b.ours ? 'text-paper' : 'text-paper/70'}>{b.name}</span>
              <span className="flex items-center gap-3">
                <span
                  className="h-3 rounded-[1px]"
                  style={{ width: `${(b.mae / MAX) * 100}%`, background: b.ours ? '#e8673f' : 'rgba(243,239,230,0.35)' }}
                  aria-hidden
                />
                <span className="font-mono text-xs tabular-nums text-paper/85 whitespace-nowrap">
                  {b.mae.toFixed(2)} m · RMSE {b.rmse.toFixed(2)} · r {b.r}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[10.5px] leading-relaxed text-paper/50">
          GAMUS dataset; trained on train/, checkpoint chosen on val/, test/ touched once; ground truth is LiDAR-derived height.
        </p>
      </figure>

      <figure>
        <div className="grid grid-cols-2 gap-2">
          <Image src="/depth_wizard/run_input.jpg" alt="Satellite image of a dense city block used as input" width={760} height={955} sizes="(min-width: 1024px) 440px, 50vw" className="w-full h-auto rounded-sm" />
          <Image src="/depth_wizard/run_height.jpg" alt="Height map predicted from that single image; taller buildings in warmer colours" width={760} height={955} sizes="(min-width: 1024px) 440px, 50vw" className="w-full h-auto rounded-sm" />
        </div>
        <figcaption className="mt-2 font-mono text-[11px] text-muted leading-relaxed">
          One run of the app: a single RGB image in, predicted surface height out (blue low, red high). An example output, not a benchmark tile.
        </figcaption>
      </figure>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">How it works</h4>
          <p className="leading-relaxed text-ink/85">
            Two-person team project for Smart India Hackathon problem 26175. Depth Anything V2 fine-tuned on GAMUS with a loss weighted
            towards tall buildings, fused with a 30 m Copernicus ground model, served by FastAPI and shown as 3D terrain in three.js with a
            LiDAR comparison toggle.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3">Error by height band</h4>
          <dl className="text-sm">
            {BANDS.map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-t border-rule last:border-b">
                <dt className="text-ink/75">{k}</dt>
                <dd className="font-mono text-xs">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted">Very tall buildings remain the main weakness.</p>
        </div>
      </div>
    </div>
  );
}
