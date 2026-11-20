# Design System

Editorial, paper-and-ink look. No glassmorphism, no gradient text, no glow effects.

* **Background (paper):** #f3efe6, with a very faint grain overlay (`.grain` on `<body>`).
* **Text (ink):** #1a1815. **Muted text:** #6b665c. **Hairlines:** rgba(26,24,21,0.16).
* **Accent:** #c8431c (vermilion). One accent only; use it for numbers, italics, the active nav item and the scroll-progress line.
* **Typography:** Fraunces (serif) for headings and large text, Inter for body, IBM Plex Mono for labels, numbers and metadata. Fonts are bundled through `@fontsource` packages, not fetched from Google at build time.
* **Layout:** Left-aligned, 12-column grid, numbered sections (01 About, 02 Work, 03 Experience, 04 Contact), hairline rules instead of cards.
* **Project demos and data:** Dark "screens" (`.screen`, #161411, paper-coloured text). Data highlights use a
  brighter vermilion, #e8673f, so it reads on the dark background.
* **Tactile controls:** `.press` buttons. `.btn-ink` has an accent offset shadow and `.btn-line` an ink offset
  shadow on hover. Both lift 1 px on hover and press down on click. Project rows use the same offset shadow.
  Movement is disabled under reduced motion.
* **Honesty rule:** visuals must come from real project output. No generated mock-ups presented as results;
  simulated results are labelled as simulated.
* **Animation:** Framer Motion. Easing `[0.22, 1, 0.36, 1]`. Word reveals on headings, hairlines that draw in, staggered list items, scroll-progress line. Everything must respect `prefers-reduced-motion`.
* **Responsiveness:** Mobile-first Tailwind flex/grid.
