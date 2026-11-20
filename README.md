# Manan Garg: portfolio

Personal portfolio for robotics and autonomy software roles. Live at <https://resume-one-woad-61.vercel.app/>.

Next.js 16 (App Router, fully static), React 19, TypeScript, Tailwind CSS 4, Framer Motion. No WebGL and no 3D
library: the hero's flight replay is plain SVG driven by one `requestAnimationFrame` loop.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (webpack)
npm run lint
```

## Layout

| Path | What it is |
|---|---|
| `app/page.tsx` | home: hero, work, about, experience, contact |
| `app/work/dronecore/page.tsx` | dronecore case study |
| `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx` | crawler and link-preview metadata |
| `components/FlightPanel.tsx` | isometric replay of a recorded SITL mission |
| `components/work/` | project dialog and the CadastraAI and Depth Wizard demos |
| `data/projects.ts` | project list and capability filter |
| `data/flight-demo1.ts` | flight data for the replay (generated, see below) |
| `data/site.ts` | site URL, email, resume and profile links |
| `public/Manan_Garg_Resume.pdf` | resume served by the site |

## Where the content comes from

Every figure on the site comes from a project's own records:

- **dronecore:** the signed evidence matrix and docs in the private dronecore repository (release 0.6.0).
- **CadastraAI:** the README of `github.com/Manan7289/CADASTRALAI`.
- **Depth Wizard:** the project README (benchmark table and height bands).

Simulated results are labelled as simulated everywhere.

`data/flight-demo1.ts` is a down-sampled copy of
`results/sitl_autonomy/demo-1-complete-flight-ardupilot-1.json` from the dronecore repository: an ArduCopter 4.7.2
software-in-the-loop run (signed record, commit `bf5401f`). To regenerate it, keep `t` and the non-null `pos` of
each `log` row (rounded to 0.1), plus `events`, `metrics` and the `record` fields shown in the file's
`FlightRecord` type.

## Accessibility and motion

- Reduced motion: `MotionConfig reducedMotion="user"` covers every Framer Motion animation. The flight replay
  shows the whole path without animating.
- The replay has a pause button, and it stops when off-screen.
- Project dialogs move focus inside, keep Tab inside, close on Escape and return focus to whatever opened them.
- There is a skip link, and the site works with the keyboard at phone width (checked at 375 px).
