# Surgical Landing Page

Landing page for a plastic/aesthetic surgery clinic. Includes sections: Introducing (before/after, procedure steps, orbit animation), FAQ (accordion with categories and questions).

## Tech Stack

- **Next.js 16** (App Router) — framework
- **React 19** — UI
- **TypeScript** — type safety
- **SCSS Modules** — component-scoped styles
- **GSAP 3 + @gsap/react** — animations
- **normalize.css** — CSS reset
- **ESLint + Prettier** — linting & formatting
- **Husky + lint-staged** — pre-commit hooks

## Structure

```
src/
├── app/
│   ├── sections/          # Landing sections (Introducing, FAQ, About, Hero)
│   ├── globals.scss
│   ├── layout.tsx
│   └── page.tsx
└── shared/
    ├── fonts/             # Local fonts (PP Neue Montreal, F37 Zagma Mono)
    ├── styles/            # Global styles, mixins, variables
    ├── ui/                # Reusable components (SectionHeader, PlusIcon)
    └── lib/               # Utilities (cn)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
