# Planning & Design Document — Surgical Landing Page

## Project overview

Qoves surgical/aesthetic landing page built in **Next.js 16 (App Router) + React 19 + TypeScript**.  
Two sections are currently implemented: **Introducing** and **FAQ**.

---

## Architecture decisions

### Feature-sliced layout inside `src/`

```
src/
├── app/
│   └── sections/          # One folder per section (Introducing, FAQ)
│       └── <Section>/
│           ├── ui/        # Components + module.scss
│           ├── hooks/     # Custom hooks (animation, state)
│           ├── utils/     # Pure helpers (math, SVG builders)
│           ├── data/      # Static data (FAQ content)
│           └── index.ts   # Public barrel export
└── shared/
    ├── ui/                # Reusable atoms (SectionHeader, PlusIcon)
    ├── styles/            # Design tokens (_variables, _mixins)
    └── lib/               # Micro-utilities (cn)
```

**Why:** keeps every section self-contained; shared atoms stay in one place and never leak cross-section. Adding new sections means adding a new folder, not touching anything else.

### SCSS Modules over Tailwind / CSS-in-JS

Each component owns a `.module.scss` co-located file. Global tokens (`$accent`, `$border-default`, etc.) live in `_variables.scss` and are imported via `@use`. Mixins (`font-neue-montreal`, `section-border-y`) live in `_mixins.scss`.

**Why:** design system is colour-heavy and fluid-typography-heavy (`clamp()`); token-first SCSS is more legible than utility classes for that use case.

### `cn()` utility instead of `clsx`

```ts
export const cn = (...args: (string | false | null | undefined)[]) =>
  args.filter(Boolean).join(' ');
```

Tiny inline helper, zero dependency, covers 100 % of conditional class needs in this project.

### `'use client'` only where needed

Only interactive components (`Introducing`, `FAQ`) are client components. `SectionHeader`, `IntroducingHeader`, `IntroducingSteps` are pure RSCs — no JS on the client for static markup.

---

## Section 1 — Introducing

### Sub-components

| Component | Role |
|---|---|
| `IntroducingHeader` | RSC. Badge + H1 + subtitle via shared `SectionHeader`. |
| `BeforeAfterCard` | Client. Two photo cards + animated SVG orbit overlay. |
| `IntroducingSteps` | RSC. 4-column grid of numbered step cards. |
| `IntroducingSpacer` | Visual spacer / bottom padding. |

### Layout — wrapper system

Global utility classes create the newspaper-grid layout:
- `.wrapper-inner` — max-width `1360px`, centred.
- `.wrapper-border-y` — `1px solid $border-light` on top + bottom.
- `.wrapper-border-x` — `1px solid $border-light` on left + right.

Sections stack vertically and share borders, producing a clean grid without extra dividers.

### BeforeAfterCard — orbit animation

The centrepiece of section 1. A custom GSAP animation draws a **figure-8 (hourglass) SVG path** that wraps both photo cards and animates two luminous beams along it.

**Key decisions:**

1. **Geometry is computed at runtime, not hardcoded.**  
   `measureOrbitLayout()` reads the live `getBoundingClientRect()` of both cards and builds the SVG viewbox on the fly. A `ResizeObserver` (debounced 150 ms) reruns the layout on resize. This means the animation is fully responsive — it works at any breakpoint without breakpoint-specific SVG files.

2. **Hourglass path via `buildHourglassPath()`.**  
   The path traces both card perimeters connected at a narrow bridge (`~3 % gap`) at the horizontal midpoint. Rounded corners (`ORBIT_CORNER_RADIUS = 18`) match the card's `border-radius: 8px` visually. Bridge arcs clamp to `gap / 3` to stay elegant at narrow gaps.

3. **Trail = `stroke-dashoffset` animation on `gsap.ticker`, not a GSAP tween.**  
   Each beam is made of `TRAIL_SEGMENT_COUNT = 8` `<path>` elements. Their `stroke-dashoffset` is updated every 2nd tick via a manual ticker function — giving 30 fps equivalent movement at zero GC pressure. Colour gradient is pre-computed once via `buildTrailColors()` — leading edge is opaque teal (`rgba(134,154,161,1)`), trailing edge fades to near-transparent light blue.

4. **Beam heads use `MotionPathPlugin`.**  
   Two `<rect>` elements ride the hidden path using `gsap.to()` + `motionPath`, repeating infinitely. `alignOrigin: [0.5, 0.5]` centres the rect on the path. A CSS `feDropShadow` filter gives the glow effect.

5. **`will-change: transform` + `contain: layout style` on the SVG overlay.**  
   Prevents the browser from including the animated SVG in layout recalculations. The SVG is `pointer-events: none` so it never interferes with clicks.

6. **Cleanup is thorough.**  
   `useGSAP` cleanup function: removes the ticker, disconnects `ResizeObserver`, calls `animCtx.revert()`. No memory leaks on unmount or hot-reload.

### IntroducingSteps — hover effect

Steps use `outline` (not `border`) for the grid lines so they collapse at intersections without double borders. On hover: background fills with `$accent`, gradient-blur pseudo-element fades in from 0 → 1 opacity (pre-scaled 15× and rotated so it covers the card softly).

---

## Section 3 — FAQ

### Data model

```ts
// faqData.ts
interface FAQItem { question: string; answer: string; }
interface FAQCategory { title: string; items: FAQItem[]; }
```

Static data, imported directly — no API call needed.

### Two-level accordion

State lives in `FAQ.tsx` as two integers: `openCategory` and `openQuestion`. Rules:
- Opening a new category resets `openQuestion` to `null` (prevents stale open question from appearing in a different category context).
- Only one category open at a time (intentional UX decision — guides the user through topics sequentially).

### Accordion animation — `grid-template-rows: 0fr → 1fr`

CSS-only height animation without JS height measurement:

```scss
.questionsOuter {
  display: grid;
  grid-template-rows: 0fr;        // collapsed
  transition: grid-template-rows 0.55s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.questionsOuterOpen {
  grid-template-rows: 1fr;        // expanded to natural height
}
.questions {
  overflow: hidden;
  min-height: 0;                  // required for 0fr to actually collapse
}
```

**Why:** `height: 0 → auto` can't be transitioned in CSS. `max-height` causes a snap at end. The `grid-template-rows` trick is a modern standard approach with no JS, no layout thrashing.

Same pattern is used for the inner question accordion with a slightly shorter duration (`0.45s`).

### Category open state — border-radius delay trick

```scss
.category {
  transition: border-radius 0s 0.55s, ...;  // delay = animation duration
}
.categoryOpen {
  border-radius: 12px;
  transition: border-radius 0s 0s, ...;     // no delay on open
}
```

On **open**: radius applies immediately (0s delay), so rounded corners appear before the content expands. On **close**: radius removal is delayed until the collapse animation finishes, so corners don't go square while content is still visible.

### PlusIcon → X morphing

The `+` icon is two SVG lines. On open, the vertical line scales to 0 via CSS transform (`scaleY(0)`), leaving only the horizontal — visually becoming `×` when combined with the 45° rotation on the wrapper. No separate icon asset needed.

### Glassmorphism on questions panel

The questions inner panel uses `backdrop-filter: blur(100px)` on a `::before` pseudo-element with `background: rgba(255,255,255,0.2)`. Separating the blur to a pseudo keeps `overflow: hidden` on the parent intact (blur on a clipped parent doesn't work in some browsers).

---

## Design tokens

| Token | Value | Used for |
|---|---|---|
| `$section-heading` | `rgba(35,49,55,1)` | All section headings |
| `$accent` | `rgba(154,174,181,1)` | Badge text, step numbers, intro orbit |
| `$text-muted` | `rgba(81,82,85,1)` | Subtitles |
| `$border-light` | `rgba(242,242,242,1)` | All structural borders |
| `$border-default` | `rgba(215,229,235,1)` | FAQ category separators, orbit rail |
| `$faq-category-open-bg` | `rgba(154,174,181,1)` | Open category background |

### Typography

Two custom fonts registered via `@font-face` in `_fonts.scss` (local `.otf` files, `font-display: swap`):

| Font | Weight/style | Used for |
|---|---|---|
| **PP Neue Montreal** | Book (400), Medium (500) | Body, headings |
| **F37 Zagma Mono** | Book (400) | Badges, labels, step numbers |

---

## Tooling

| Tool | Purpose |
|---|---|
| Husky + lint-staged | Runs Prettier + ESLint on staged `.ts/.tsx` files before every commit |
| Prettier | Opinionated formatting (no config disputes) |
| ESLint (`eslint-config-next`) | Next.js-aware rules |
| TypeScript strict | Full type safety across components and utilities |
