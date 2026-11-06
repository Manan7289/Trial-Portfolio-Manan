# Design System

Editorial, paper-and-ink look. No glassmorphism, no gradient text, no glow effects.

* **Background (paper):** #f3efe6, with a very faint grain overlay (`.grain` on `<body>`).
* **Text (ink):** #1a1815. **Muted text:** #6b665c. **Hairlines:** rgba(26,24,21,0.16).
* **Accent:** #c8431c (vermilion). One accent only; use it for numbers, italics, the active nav item and the scroll-progress line.
* **Typography:** Fraunces (serif) for headings and large text, Inter for body, IBM Plex Mono for labels, numbers and metadata. Fonts are bundled through `@fontsource` packages, not fetched from Google at build time.
* **Layout:** Left-aligned, 12-column grid, numbered sections (01 About, 02 Work, 03 Experience, 04 Contact), hairline rules instead of cards.
* **Project demos:** Dark "screens" shown inside the paper-coloured modal; they keep their own palettes.
* **Animation:** Framer Motion. Easing `[0.22, 1, 0.36, 1]`. Word reveals on headings, hairlines that draw in, staggered list items, scroll-progress line. Everything must respect `prefers-reduced-motion`.
* **Responsiveness:** Mobile-first Tailwind flex/grid.
