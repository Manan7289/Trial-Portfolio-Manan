# Engineering report: portfolio rework (November 2026)

What changed, why, what was tested and what is still open. Written on 2026-11-21 against Next.js 16.3.8,
React 19.2.8, Tailwind CSS 4 and framer-motion 14.0.0. This replaces an earlier version of this file that described
the previous dark theme and figures that have since been corrected.

## 1. Changes

| Area | Change | Reason |
|---|---|---|
| Positioning | Title, hero, About and metadata now target robotics and autonomy software | the strongest work, dronecore, was missing from the site |
| Hero | `components/FlightPanel.tsx`: isometric SVG replay of a recorded dronecore mission on ArduCopter 4.7.2 SITL (121 samples, 20 events, about 4 KB) | a visual tied to real evidence; no WebGL or 3D library |
| Case study | `app/work/dronecore/page.tsx`: problem, architecture, explained decision record, evidence by tier, demonstrations, bugs found in SITL, limits, next steps | recruiters need the engineering story, not a project card |
| Work section | capability filter that highlights matching projects; CadastraAI and Depth Wizard dialogs rebuilt from real screenshots, model outputs and benchmark tables | the previous dialogs showed generated mock-ups labelled as survey data |
| Corrected figures | removed "0.94 IoU" (no source) and "ISRO LiDAR" (the benchmark is the GAMUS test split); per-tile baseline corrected from 4.88 m to 4.08 m; MLOps project removed | every figure now traces to a project README or signed evidence record |
| Resume | `public/Manan_Garg_Resume.pdf`, linked from the nav, hero, case study and contact section | the site had no resume |
| Privacy | phone number removed from the site | not needed for first contact |
| Metadata | title template, description, Open Graph, `opengraph-image`, JSON-LD Person, `robots.txt`, `sitemap.xml`, canonical URL | robots, sitemap and the link-preview image previously returned 404 |
| Accessibility | `MotionConfig reducedMotion="user"`; dialog focus trap and restore; skip link; `aria-controls` on the mobile menu; hidden h2 for the Work section; accent deepened from #c8431c to #b63b16; 10 px labels raised to 11 px; animated headings expose text through a screen-reader-only span instead of `aria-label` | see section 3 |
| Loading | hero entrance moved to a CSS animation (`.rise`) so it paints with the HTML; `<noscript>` style shows scroll-revealed content when JavaScript is off | see section 3 |

## 2. Dependencies

None added and none removed. `lucide-react` is now unused and can be dropped from `package.json` later.

During verification, the shared `node_modules` in the main checkout was missing the three `@fontsource` packages
that `package.json` already declares, so neither this branch nor the previous `main` could build locally. They
were installed with `npm install --no-save`; `package.json` and the lockfile are unchanged.

## 3. Testing performed

All on a production build (`next build --webpack`, then `next start`), on Windows 11 with Chrome.

| Check | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | 0 errors |
| ESLint (`app`, `components`, `data`) | 0 errors, 0 warnings |
| Production build | passes; every route pre-rendered as static: `/`, `/work/dronecore`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image` |
| Routes and assets | 200 for every page, the PDF, the video and the images; every file referenced in `public/` exists |
| External links | GitHub profile, CADASTRALAI repository and LinkedIn return 200 |
| Internal anchors | `#work`, `#about`, `#experience`, `#contact`, `#main` all exist |
| Console | no errors on either page |
| Responsive (375, 768, about 1000 px) | no horizontal scrolling on either page. One overflow at 375 px on the case study (the decision-record block widened its grid column) was found and fixed with `min-w-0` |
| Dialogs | focus moves to Close on open; Shift+Tab wraps inside; Escape closes; focus returns to the opening button; page scroll is locked while open |
| Capability filter | toggles; matching projects get a rule, a tint and a "Matches" label; the others keep full contrast |
| Reduced motion (headless Chrome `--force-prefers-reduced-motion`) | the replay shows the whole path with no animation and no Play/Pause control; without the flag it animates and shows the control. Scroll reveals fade without moving |
| Structural accessibility (scripted DOM checks) | `lang` set; one h1 per page; no heading-level skips after the fix; every image has alt text; every button and link has a name; no duplicate ids; every `aria-labelledby` target exists; scrollable regions are focusable |
| Colour contrast (WCAG 2.x formula) | body and muted text 4.97–15.4:1; dark-panel text 4.78–8.2:1; accent was 4.28:1 for small text (fail), now 5.05:1 on paper and 4.53:1 on the hover tint |
| Resume PDF | identical (SHA-1) to the v5 robotics resume; one A4 page, so it prints as is |
| Loading (home, local production server) | 11 KB HTML, 8 KB CSS, about 202 KB JavaScript, 142 KB fonts, 16 requests |
| Lighthouse 13 via Chrome DevTools (home, desktop and mobile) | Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100. The first run scored Accessibility 92 (`aria-label` on plain spans in the animated headings; nav numbers at 2.35:1); both were fixed |
| Lighthouse (case study, mobile) | Accessibility 100, Best Practices 100, SEO 100 |
| Performance trace (cold cache, 412 px mobile, 4× CPU, Slow 4G) | case study: LCP 2.39 s, CLS 0.00. Home: LCP 6.65 s, then **3.80 s** after the hero's entrance moved from Framer Motion (which waited for hydration) to a CSS animation; CLS 0.00 |
| Without JavaScript (scripts blocked in a sandboxed frame) | all 34 initially hidden elements display, including the hero name, after adding a `<noscript>` style |

## 4. Known limitations

- **Home-page LCP is 3.8 s on a throttled phone**, in Google's "needs improvement" band. The LCP element is the hero
  paragraph, and most of the remaining delay is the Fraunces web font arriving and swapping in. Preloading or
  subsetting that font is the next fix.
- **One Lighthouse mobile run of the case study reported CLS 0.18.** Two DevTools traces under the same throttling
  (one warm, one cold cache) measured 0.00, and the report did not name the shifting elements. Check it on the
  deployed site with PageSpeed Insights.
- **The dronecore repository is private**, so the case study offers code access by email rather than a link.
- **Public media from a private project:** the dronecore screenshots and the 2 MB demo video are public once this
  is deployed.
- **About 202 KB of compressed JavaScript** is mostly React, Next.js and framer-motion. The replay itself adds only
  a few KB.

## 5. Remaining improvements

1. Run PageSpeed Insights on the deployed preview (real network, field data once traffic exists); preload or subset the Fraunces font.
2. Decide dronecore's repository visibility; link the code if it becomes public.
3. Remove `lucide-react`; update `system-instructions.md` (it still asks for a dark glass theme); replace or delete
   `MANAN_GARG_Resume_Updated.tex` and `resume_print.html`, which hold the old resume claims.
5. Replace the dronecore media as the project gains bench or flight evidence.
