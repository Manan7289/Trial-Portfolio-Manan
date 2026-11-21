import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/InteractiveEffects';
import { SectionHead } from '@/components/ui/Section';
import FlightPanel from '@/components/FlightPanel';
import { EMAIL, RESUME_PDF } from '@/data/site';

export const metadata: Metadata = {
  title: 'dronecore: onboard autonomy for multirotor drones',
  description:
    'Case study: an onboard autonomy and validation engine that decides when a drone can no longer trust its position, sensors, battery or the weather, validated on PX4 and ArduPilot in software-in-the-loop. Simulated, not yet flown.',
  alternates: { canonical: '/work/dronecore' },
};

// Every figure below is from dronecore's signed evidence matrix and docs (release 0.6.0).
const PIPELINE = [
  ['Sense', 'IMU, barometer, compass, GNSS, optical flow, lidar, camera ring, pad camera, battery'],
  ['Estimate', 'Mahony attitude filter and per-axis Kalman filters: pose, velocity and their uncertainty'],
  ['Judge', 'Navigation confidence grade, sensor and motor health, energy reserve, onboard wind estimate'],
  ['Decide', 'Supervisor and recovery evaluator; every choice written as a decision record'],
  ['Plan', '3D A* routes, 10 Hz conflict checks, local re-planning, evasion of tracked objects'],
  ['Trajectory', 'Minimum-jerk segments, scaled until speed, acceleration, jerk and tilt are feasible'],
  ['Control', 'Position → velocity → attitude → rate → motor mixer (simulation), or setpoints to the autopilot'],
];

const EVIDENCE = [
  ['Demonstrations (14 scenarios over seeds)', '42/42', '48/48', '—', '—'],
  ['Safety cases (link cut, kill, freeze, hang, mode, glitch, supervisor)', '—', '17/17', '—', '—'],
  ['Precision landing within 0.5 m', '—', '28/30', '—', '—'],
  ['Committed stop (obstacle inside braking distance)', '24/24', '11/15', '—', '—'],
];

const GALLERY = [
  { src: '/dronecore/demo-2-urban.png', alt: 'Simulated quadrotor routing over a mapped power line between round buildings', cap: 'Urban 3D: routes over a mapped power line; an unmapped crane is found by lidar and avoided (4.01 m minimum clearance).' },
  { src: '/dronecore/demo-3-mountain.png', alt: 'Mountain flight with estimated and true wind shown in the viewer', cap: 'Mountain and weather: wind estimated on board at 10.2 m/s against a true 9.2 m/s; recovery chosen by achievable ground speed.' },
  { src: '/dronecore/demo-4-wildlife.png', alt: 'Quadrotor making an evasive manoeuvre away from a tracked bird', cap: 'Wildlife: tracks a circling raptor, a flock and a head-on gull, and evades. Closest pass 3.3 m against 10 m planned: a stated limitation.' },
  { src: '/dronecore/demo-5h-landing.png', alt: 'Van parked on landing pad B while the aircraft holds above it', cap: 'Blocked landing: a van is on pad B; the aircraft holds in assessment, then diverts to pad C.' },
];

const DECISION_LOG = `t=61.8  [RECOVERY] WIND_LIMIT: estimated wind 10.5 m/s above the 10 m/s limit for 5 s
        RTL            chosen    83 m away at 4.4 m/s over the ground, needs 1754 of 4620 mAh
        DIVERT:B       feasible  341 m away at 11.3 m/s over the ground, needs 2653 of 4620 mAh
        DIVERT:C       rejected  53 m above the ground here: high ground is exposed to stronger wind
        FIELD:field-1  rejected  cannot make headway: wind 10.5 m/s, airspeed limit 13 m/s
        FIELD:field-2  feasible  an unprepared level field, 146 m away at 8.0 m/s over the ground
        LAND_HERE      rejected  mapped ground below slopes 36 deg`;

const BUGS = [
  [
    'PX4 failsafe tests silently never reached PX4',
    'PX4 instance I answers as MAVLink system I + 1. The safety harness sent commands to system 1 and dropped the autopilot’s heartbeats, so five PX4 cases read “modes after []”. Fixed by addressing the autopilot’s own system id, then re-flown: 17/17.',
  ],
  [
    'An estimator reset could make the setpoint jump',
    'When the autopilot resets its estimator or moves its origin, local coordinates shift. Plans are now kept geodetically and a frame guard turns a reset into a committed stop instead of a sudden setpoint change.',
  ],
  [
    'A flat battery crashed the planner',
    'A pack with 0 N of thrust available raised a divide-by-zero instead of planning as “over the thrust limit”. Found by the scenario generator; fixed with a regression test.',
  ],
];

const LIMITS = [
  'Nothing has flown on a real aircraft; no hardware-in-the-loop or bench results exist yet.',
  'The camera and lidar are behavioural models: no real images or point clouds, no real drivers.',
  'Airframe parameters are estimates, not identified from flight logs.',
  'No visual-inertial odometry; GNSS-denied flight relies on optical flow in simulation only.',
  'No ROS 2 bridge yet; integration is MAVLink only.',
  'Python, not measured on a companion computer (13–29× real time on a laptop).',
];

const NEXT = [
  'Bench test on a real Pixhawk 6C with propellers off, using the staged field programme already in the code',
  'Tethered hop, then short line flights, each gated by a signed record of the previous stage',
  'System identification of the airframe from logs, then re-validating the simulation against it',
  'A real lidar driver and camera detector on the companion computer',
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mb-6">
      {children}
    </h2>
  );
}

export default function DronecorePage() {
  return (
    <article className="w-full max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-24">
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wider text-muted mb-10">
        <Link href="/#work" className="rule-link pb-0.5">
          ← Work
        </Link>
        <span className="mx-3" aria-hidden>
          /
        </span>
        <span aria-current="page">dronecore</span>
      </nav>

      <header className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">Case study · personal project · Nov 2026 – present</p>
          <h1 className="font-serif font-light tracking-[-0.03em] leading-[0.95] text-[clamp(3rem,8vw,6rem)]">dronecore</h1>
          <p className="mt-6 font-serif text-2xl leading-snug tracking-tight">An onboard autonomy and validation engine for multirotor drones.</p>
          <p className="mt-5 leading-relaxed text-ink/85 max-w-xl">
            It knows how well it knows where it is, notices when a sensor, a motor, the battery or the weather turns against it, and
            chooses, and explains, whether to continue, return, divert or land. It also refuses missions it should not start.
          </p>
          <p className="mt-6 inline-block border border-ink px-3 py-2 font-mono text-xs uppercase tracking-wider">
            Evidence: simulation and SITL · not yet flown
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
            <a href={RESUME_PDF} target="_blank" rel="noopener" className="press btn-ink">
              Resume (PDF)
            </a>
            <a href={`mailto:${EMAIL}?subject=dronecore%20code%20access`} className="press btn-line">
              Ask for code access
            </a>
          </div>
        </div>
        <div className="lg:col-span-6">
          <FlightPanel />
        </div>
      </header>

      <section className="mt-24" aria-labelledby="problem">
        <SectionHead n="01" title="The problem" />
        <div className="grid md:grid-cols-12 gap-8">
          <Reveal className="md:col-span-5">
            <H2 id="problem">A drone has to decide for itself, before anyone can help.</H2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7 space-y-4 leading-relaxed text-ink/85" delay={0.1}>
            <p>
              Delivery, inspection and survey flights beyond the pilot’s line of sight depend on the aircraft noticing that its position
              estimate, a sensor, its battery or the wind can no longer be trusted, and choosing a safe outcome on its own.
            </p>
            <p>
              PX4 and ArduPilot handle each failure with a configured action: lose the link, return home. dronecore sits above them and
              weighs the options together: energy left, the wind and the ground speed it allows, how sure it is of its position, and how
              exposed each landing site is. Then it records why it rejected the others.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="arch">
        <SectionHead n="02" title="Architecture" />
        <Reveal>
          <H2 id="arch">One navigator, three backends.</H2>
        </Reveal>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-7 gap-px bg-rule border border-rule">
          {PIPELINE.map(([name, text], i) => (
            <li key={name} className="bg-paper p-4 flex flex-col gap-2">
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')} <span aria-hidden>→</span>
              </span>
              <span className="font-serif text-xl">{name}</span>
              <span className="text-sm leading-relaxed text-ink/75">{text}</span>
            </li>
          ))}
        </ol>
        <div className="grid md:grid-cols-3 gap-6 mt-8 text-sm leading-relaxed">
          <div className="screen rounded-sm p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-paper/60 mb-2">Backend 1 · simulation twin</p>
            <p className="text-paper/85">
              A 400 Hz 6-DOF quadrotor with motor lag, LiPo voltage sag, drag, wind, terrain, GNSS degradation and sensor faults. The
              navigator never sees the simulator’s truth; a test enforces that.
            </p>
          </div>
          <div className="screen rounded-sm p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-paper/60 mb-2">Backends 2 and 3 · real firmware</p>
            <p className="text-paper/85">
              ArduCopter 4.7.2 and PX4 1.16 in software-in-the-loop. The autopilot keeps its own estimator, inner loops and failsafes;
              dronecore streams setpoints over MAVLink, unchanged from the twin. 0.40 m RMS tracking at 3 m/s.
            </p>
          </div>
          <div className="screen rounded-sm p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-paper/60 mb-2">Safety boundary</p>
            <p className="text-paper/85">
              A separate supervisor process can only ask the autopilot for HOLD, RTL or LAND; it never sends setpoints. A pilot mode change
              always takes control back, and the autopilot’s own failsafes stay armed.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="explain">
        <SectionHead n="03" title="Explained decisions" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <Reveal className="md:col-span-4 min-w-0">
            <H2 id="explain">Every decision says what it rejected, and why.</H2>
            <p className="leading-relaxed text-ink/80">
              From the mountain-and-weather demonstration: the wind rises past the airframe’s limit, and the recovery evaluator compares
              every option.
            </p>
          </Reveal>
          <Reveal className="md:col-span-8 min-w-0" delay={0.1}>
            <pre
              className="screen rounded-sm p-5 overflow-x-auto font-mono text-[12px] leading-relaxed text-paper/90"
              tabIndex={0}
              aria-label="Decision record from the mountain and weather demonstration"
            >
              {DECISION_LOG}
            </pre>
          </Reveal>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="evidence">
        <SectionHead n="04" title="Evidence" />
        <Reveal>
          <H2 id="evidence">What has been shown, and where.</H2>
        </Reveal>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Evidence by tier">
          <table className="w-full min-w-[640px] text-sm border-collapse">
            <caption className="sr-only">Passed runs out of total, by evidence tier</caption>
            <thead>
              <tr className="font-mono text-[11px] uppercase tracking-wider text-muted text-left">
                <th scope="col" className="py-3 pr-4 font-normal">Result</th>
                <th scope="col" className="py-3 px-3 font-normal">Simulation</th>
                <th scope="col" className="py-3 px-3 font-normal">SITL</th>
                <th scope="col" className="py-3 px-3 font-normal">Bench / HITL</th>
                <th scope="col" className="py-3 px-3 font-normal">Flight</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE.map(([name, ...cells]) => (
                <tr key={name} className="border-t border-rule">
                  <th scope="row" className="py-3 pr-4 text-left font-normal">
                    {name}
                  </th>
                  {cells.map((c, i) => (
                    <td key={i} className={`py-3 px-3 font-mono tabular-nums ${c === '—' ? 'text-muted' : ''}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-ink/75 leading-relaxed max-w-3xl">
          A result counts only if its record is HMAC-signed and matches its tier; each cell is reported with a 95% confidence interval in
          the project. 1,782 automated tests run in CI with ruff, mypy --strict, CodeQL and dependency audits.
        </p>
      </section>

      <section className="mt-24" aria-labelledby="demos">
        <SectionHead n="05" title="Demonstrations" />
        <Reveal>
          <H2 id="demos">Failures, injected on purpose.</H2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {GALLERY.map((g) => (
            <figure key={g.src}>
              <Image src={g.src} alt={g.alt} width={1280} height={720} sizes="(min-width: 768px) 560px, 100vw" className="w-full h-auto rounded-sm border border-rule" />
              <figcaption className="mt-2 text-sm leading-relaxed text-ink/75">{g.cap}</figcaption>
            </figure>
          ))}
        </div>
        <figure className="mt-10">
          <video controls muted playsInline preload="metadata" className="w-full rounded-sm border border-rule bg-ink">
            <source src="/dronecore/demo-1-flight.mp4" type="video/mp4" />
          </video>
          <figcaption className="mt-2 text-sm leading-relaxed text-ink/75">
            Demonstration 1 in dronecore’s 3D viewer: preflight, take-off, a curved climbing path, return, pad assessment and touchdown.
            Every pose comes from integrating motor forces. Simulated, not flown.
          </figcaption>
        </figure>
      </section>

      <section className="mt-24" aria-labelledby="bugs">
        <SectionHead n="06" title="Found in SITL" />
        <Reveal>
          <H2 id="bugs">Bugs that only real firmware exposed.</H2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {BUGS.map(([t, d]) => (
            <div key={t} className="border-t border-ink pt-4">
              <h3 className="font-serif text-xl leading-snug mb-2">{t}</h3>
              <p className="text-sm leading-relaxed text-ink/80">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 grid md:grid-cols-2 gap-12" aria-label="Limits and next steps">
        <div>
          <SectionHead n="07" title="Limits" />
          <ul className="space-y-3 leading-relaxed text-ink/85">
            {LIMITS.map((l) => (
              <li key={l} className="flex gap-3">
                <span aria-hidden className="text-accent">
                  —
                </span>
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead n="08" title="Next" />
          <ol className="space-y-3 leading-relaxed text-ink/85">
            {NEXT.map((l, i) => (
              <li key={l} className="flex gap-3">
                <span className="font-mono text-xs text-accent pt-1">{String(i + 1).padStart(2, '0')}</span>
                {l}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-24 border-t border-rule pt-8 grid md:grid-cols-12 gap-6 text-sm">
        <p className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-muted">Stack</p>
        <p className="md:col-span-8 leading-relaxed">
          Python 3.11–3.12, NumPy, shapely, pydantic, pymavlink (MAVLink v2), ArduCopter and PX4 SITL in WSL2, three.js viewer, GitHub
          Actions. The repository is private; code walkthroughs are available on request.
        </p>
      </section>
    </article>
  );
}
