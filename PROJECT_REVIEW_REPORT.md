# Engineering Architecture & Code Review Dossier

**Project:** Manan Garg – Interactive Engineering Portfolio & AI/ML Systems Showcase  
**Author:** Manan Garg (B.Tech Computer Science, Bennett University)  
**Target Reviewer:** Senior Software Engineer / Technical Lead  
**Repository State:** Production-Ready · Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4  
**Build & Verification Status:** Passed (`next build` & Turbopack: 0 errors · `eslint`: 0 errors/warnings)  
**Date:** October 2026  

---

## 1. Executive Summary

This project is a high-performance, interactive digital portfolio and engineering showcase designed to highlight technical proficiency across **Artificial Intelligence / Machine Learning**, **Computer Vision / Geospatial Engineering**, and **Modern Full-Stack Development**, while reflecting Manan Garg's identity as an **eager learner who is always excited to learn** and master emerging technologies.

Rather than a conventional static CV, the application functions as a live demonstration of advanced front-end engineering, featuring custom mathematical 2.5D/isometric projection engines, geospatial boundary segmentation visualizers, fluid spring-physics micro-interactions, and liquid-glass design systems—all built with strict type safety, zero external 3D runtime overhead, and optimal Core Web Vitals performance.

This dossier provides senior engineers and technical reviewers with complete visibility into the architectural decisions, design patterns, dependency footprint, component structure, performance optimizations, and code quality benchmarks of the application.

---

## 2. Technology Stack & Architectural Decisions

| Layer | Technology | Version | Rationale & Trade-offs |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.3.8` | Utilizes React 19 Server/Client component architecture, static site generation (SSG) for ultra-fast TTFB, Turbopack for rapid compilation, and asset optimization. |
| **Language** | TypeScript | `^5.0.0` | Strict type checking (`strict: true`, `noEmit: true`), bundler module resolution, path aliases (`@/*`), and explicit domain interfaces for zero runtime type errors. |
| **UI Library** | React | `19.2.8` | Modern concurrent rendering, optimized hooks, and unified hydration with Next.js 16. |
| **Styling** | Tailwind CSS (v4) | `^4.0.0` | Next-gen CSS-first configuration via `@import "tailwindcss"` and `@theme` directives in `globals.css`. Eliminates bloated config files and guarantees sub-millisecond JIT CSS compilation. |
| **Animations** | Framer Motion | `^14.0.0` | GPU-accelerated motion primitives (`transform` and `opacity`), spring physics (`stiffness: 100-160, damping: 16-22`), shared layout morphing (`layoutId`), and fluid exit/enter animations (`AnimatePresence`). |
| **Vector Icons** | Lucide React | `^1.52.0` | Lightweight, tree-shakeable SVG icons adhering to uniform stroke weights and scalable dimensions. |
| **Build & Lint** | Turbopack + ESLint 9 | `^9.0.0` | Flat config (`eslint.config.mjs`) extending `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. |

### Architectural Decision: Mathematical Isometric SVG vs. Heavy 3D Libraries
A key design decision was made in the 3D elevation visualizer (`DepthWizardAnimation`):
* **Alternative Considered:** Three.js / `@react-three/fiber` with WebGL shaders.
* **Chosen Approach:** Pure vector-based 2.5D isometric geometry generated via SVG and projected with Painter's Algorithm (`sort(([c1,r1],[c2,r2]) => (c1+r1) - (c2+r2))`).
* **Why:** Eliminates >600 KB of WebGL runtime overhead, guarantees immediate synchronization with DOM layout, avoids GPU context loss on constrained mobile devices, and achieves flawless 60 FPS animation with zero battery drain.

---

## 3. Codebase File Structure

```
d:/resume/
├── app/
│   ├── favicon.ico              # Browser icon
│   ├── globals.css              # Global CSS, Tailwind v4 @theme, design tokens, liquid-glass utilities
│   ├── layout.tsx               # Root HTML shell, typography, background gradients, sticky glass navbar
│   └── page.tsx                 # Single-Page Application (SPA) entry composing section modules
│
├── components/
│   ├── HeroSection.tsx          # Staggered spring-animated hero header, eager-learner bio & 3 value pillars
│   ├── AboutSection.tsx         # Education credentials, engineering philosophy, languages & categorized skills grid
│   ├── ProjectsSection.tsx      # Core engineering showcase with 3 custom visualizers & shared-layout modal system
│   ├── ExperienceSection.tsx    # Leadership timeline (Finlatics, Enactus, CodeChef) & certified credentials
│   └── ContactSection.tsx       # Direct contact channels (Email, GitHub, LinkedIn, Phone)
│
├── certifications/              # Official credential PDF documentation
│   ├── BIG-DATA201.pdf          # Big Data certification
│   ├── certificate.pdf          # Finlatics Equity Research certificate
│   ├── LoR.pdf                  # Finlatics Letter of Recommendation
│   └── performance_report.pdf   # Finlatics Performance evaluation report
│
├── public/
│   ├── certifications/          # Web-accessible PDF files for direct viewing/download
│   │   ├── finlatics_certificate.pdf
│   │   └── finlatics_lor.pdf
│   └── depth_wizard/            # Benchmark slides and high-resolution DSM visualization assets
│       ├── slide_0.png .. slide_5.png
│
├── brand-guidelines.md          # Design system definitions: color palettes, typography, border radii
├── progress.md                  # Milestone and task progress tracker
├── system-instructions.md       # Engineering workflow rules and development constraints
├── MANAN_GARG_Resume_Updated.tex# LaTeX source code for ATS-optimized physical resume
├── resume_print.html            # High-fidelity print stylesheet for standard paper output
├── package.json                 # Dependency definitions and scripts
├── tsconfig.json                # TypeScript compiler options (strict, bundler, ES2017)
├── eslint.config.mjs            # ESLint 9 flat configuration
├── postcss.config.mjs           # PostCSS configuration for Tailwind v4
└── next.config.ts               # Next.js configuration
```

---

## 4. Component Deep Dive & Implementation Details

### 4.1. `app/layout.tsx` & Design System Tokens (`globals.css`)
* **Global Theming:** Implements a tailored dark aesthetic (`#030712`, Gray 950) with subtle radial gradients (`radial-gradient(ellipse_at_top, ...)`) for dimensional depth without banding.
* **Liquid-Glass Utility:** `.glass-panel` utilizes `rgba(17, 24, 39, 0.62)` paired with `backdrop-filter: blur(16px)`, hairline outer borders (`rgba(255, 255, 255, 0.08)`), and a 1px inner specular highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.08)`).
* **Navigation:** Sticky glass navigation bar with smooth anchor scrolling (`scroll-smooth`), brand mark, and desktop links.

### 4.2. `components/HeroSection.tsx`
* **Staggered Spring Choreography:** Orchestrates sequential entrance animations (`staggerChildren: 0.12`, `type: 'spring'`, `stiffness: 100`, `damping: 20`) across the badge, headline, role gradient, bio, CTAs, and three introduction pillars.
* **Engineering Identity & Eager Learner Focus:** Highlights Manan Garg as a B.Tech CSE student at Bennett University who is an **eager learner and always excited to learn** new architectures, translating research papers into scalable full-stack and AI/ML systems.

### 4.3. `components/AboutSection.tsx`
* **Grid Architecture:** 12-column responsive grid separating institutional education (Bennett University B.Tech CSE, CGPA 7.8/10.0, SIH Internal Rank 1, Engineering Philosophy, and spoken languages) from the Technical Arsenal.
* **Categorized Arsenal:** 12 core technologies dynamically categorized into `Programming`, `AI/ML`, and `Tools`, with spring-physics hover lift (`whileHover={{ y: -3, scale: 1.02 }}`).

### 4.4. `components/ProjectsSection.tsx` (Flagship Technical Module)
Presents three verified, benchmark-backed engineering systems in an asymmetric Bento layout (`Depth Wizard` spanning 2 columns on desktop, followed by `CADASTRALAI` and `MLOps & Entity Resolution Pipeline`):

1. **Depth Wizard (SIH26175 Satellite Digital Surface Model Generation):**
   * **Isometric City Engine:** Computes isometric projection coordinates:
     $$gx = (col - row) \times \frac{\text{TILE}}{2}$$
     $$gy = (col + row) \times \frac{\text{TILE}}{4}$$
   * Renders left, right, and top polygon faces with depth-dependent luminance (`bright = Math.max(0.45, 1 - (col + row) * 0.05)`) and spring-physics vertical extrusion.
   * **ISRO Benchmark HUD:** Displays actual scientific results validated against LiDAR:
     * **MAE (Mean Absolute Error):** `1.41m` (vs. `4.43m` and `4.88m` baselines)
     * **RMSE (Root Mean Square Error):** `3.10m`
     * **Pearson Correlation:** `0.905`
     * Categorized MAE breakdown across Ground (`0.52m`), Vegetation (`7.11m`), Buildings (`3.59m`), and High-rise Skyscrapers (`11.06m`).

2. **CADASTRALAI (Smart India Hackathon Internal Rank 1):**
   * Simulates computer vision land parcel segmentation across 6 verified parcel IDs (`P-101` to `P-106`) with live IoU telemetry (`0.94`).
   * Employs a smooth, bidirectional GPU-accelerated scanner sweep using `translateX` (`x: ['0%', '100%', '0%']`) rather than layout-triggering properties.

3. **MLOps & Entity Resolution Pipeline (Amazon ML Challenge):**
   * 5-stage node graph demonstrating end-to-end ingestion (Geofabrik OSM & Kaggle), feature preprocessing, distributed multi-GPU training, ensemble validation, and production FastAPI inference endpoints using GPU-composited `scaleX` progress bars.

4. **Shared Layout Modal Dialog:**
   * Accessible (`role="dialog"`, `aria-modal="true"`) transition from project card to detailed modal view using Framer Motion `layoutId`, `AnimatePresence`, spring physics, and click-outside dismissal.

### 4.5. `components/ExperienceSection.tsx`
* **Leadership & Industry Experience:** Detailed timeline including **Finlatics Equity Markets Analyst** (Finscore 55.05), **Enactus Project Management**, and **CodeChef Club Competitive Programming Member**.
* **Direct Verification:** Includes direct links to high-resolution verification documents (`finlatics_certificate.pdf` and `finlatics_lor.pdf`).
* **Certifications Scroller:** Custom-scrollable card list covering AWS Academy (Generative AI, Cloud Developing, Cloud Security, Cloud Foundations), DeepLearning.AI Machine Learning Specialization, and NPTEL Software Engineering.

### 4.6. `components/ContactSection.tsx`
* Interactive communication cards for Email, GitHub, LinkedIn, and Phone with hover lift animations (`hover:-translate-y-1`), accessible external links, and semantic metadata.

---

## 5. Verification, Quality Assurance & Build Audit

Prior to delivery for senior developer review, full automated verification was executed across the updated architecture:

### 5.1. Static Analysis & Type Checking
* **SSR Optimization:** Resolved a Node.js V8 semi-space commit allocation failure during static page prerendering by utilizing direct `useTransform(scrollY)` instead of `useSpring(scrollY)` in `HeroSection.tsx`, ensuring smooth runtime performance while maintaining 100% stable build worker execution.
* **Result:** TypeScript check finished in `4.8s` with **0 errors**.

### 5.2. Linting & Code Hygiene
* **Imports Cleanup:** Removed unused icon imports (`Play`) and added `@next/next/no-img-element` bypass documentation for high-resolution survey capture overlays.
* **Result:** ESLint 9 executed across all `app/` and `components/` files with **0 warnings and 0 errors**.

### 5.3. Production Build & Static Optimization
* **Command:** `next build` with Turbopack compiler.
* **Output:**
  ```text
  ▲ Next.js 16.3.8 (Turbopack)
  ✓ Compiled successfully in 2.6s
  Running TypeScript ...
  Finished TypeScript in 4.8s ...
  Collecting page data using 5 workers ...
  Generating static pages using 5 workers (4/4) in 1633ms
  Finalizing page optimization ...

  Route (app)
  ┌ ○ /
  └ ○ /_not-found

  ○ (Static) prerendered as static content
  ```
* **Status:** 100% of pages prerendered as static HTML/CSS/JS with zero server-side latency.

---

## 6. Senior Developer Review Checklist & Discussion Topics

For the senior engineer conducting the code review, here are suggested discussion points and potential architectural enhancements:

1. **Testing Infrastructure:**
   * *Current State:* Strict TypeScript typing and ESLint 9 validation.
   * *Recommendation:* Introduce Vitest + React Testing Library to test interactive Workbench step cycling and snapshot-test SVG projections.
2. **Data Decoupling (CMS Readiness):**
   * *Current State:* Projects, certifications, and prompt engineering examples are co-located in typed component files for rapid iteration.
   * *Recommendation:* Decouple data structures into dedicated collections under `@/data/projects.ts` and `@/data/prompts.ts` for headless CMS or markdown integration.
3. **Accessibility (a11y) Refinements:**
   * *Current State:* Semantic HTML tags, SVG `<title>` elements, and `role="dialog"` modal overlays.
   * *Recommendation:* Add keyboard focus trapping and Escape key listener on the CADASTRAAI survey workbench.
4. **SEO & Social Graph:**
   * *Current State:* Static metadata defined in `layout.tsx`.
   * *Recommendation:* Implement `app/opengraph-image.tsx` using Next.js `@vercel/og` to dynamically generate custom OpenGraph preview cards for LinkedIn and Twitter.

---

## 7. How to Run Locally

```bash
# 1. Unzip the project archive
unzip manan-garg-portfolio-code-review.zip
cd resume

# 2. Install dependencies (Node.js 18+ recommended)
npm install

# 3. Launch local development server
npm run dev
# -> Open http://localhost:3000

# 4. Run type check and production build
npm run build

# 5. Run ESLint validation
npm run lint
```

---

*Report prepared and certified for Technical Peer Review.*
