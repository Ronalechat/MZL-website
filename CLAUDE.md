# MZL Website — Project Conventions

## Project Overview
Personal portfolio for Michael (MZL). Demonstrates front-end React/TypeScript expertise.
Stack: Next.js 16 (App Router, SSG) · TypeScript strict · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Custom Canvas

## Design System

### Two-World Contrast Principle
The site alternates between two distinct visual worlds. **Never mix them within a section.**

- **ASCII/CRT zones**: monospace type, local scanlines/noise, phosphor cyan glow, textured, raw
  - Must always have `<CrtOverlay>` wrapping the section
  - Use `font-mono` (JetBrains Mono) exclusively
  - Components: `AsciiPortrait`, `AsciiLogo`, `BootSequence`, `Terminal`

- **Editorial zones**: oversized Bebas Neue display type, DM Sans body, generous whitespace, clean grid
  - No scanlines, no noise, no CRT effects
  - Components: `About`, `Skills`, `Contact`, `EditorialText`

- **Experience** is a hybrid: GSAP horizontal scroll track is editorial; cards contain ASCII logos

### Color Tokens (defined in globals.css)
```
--color-bg:        #050d14   (near-black, blue-tinted)
--color-surface:   #0d1f2d   (card/section surface)
--color-muted:     #0a2233   (subtle backgrounds)
--color-border:    rgba(0, 229, 255, 0.12)
--color-primary:   #00E5FF   (cyan — main accent)
--color-accent:    #00B8D4   (secondary cyan)
--color-dim:       #1a4a5a   (muted cyan for inactive/dim states)
--color-text:      #e0f7fa   (primary text)
--color-text-secondary: #7ecfdc (secondary text)
--color-text-muted: #3d7a8a  (metadata/disabled)
--color-phosphor:  #00E5FF   (ASCII glow color — same as primary)
```

### Typography
| Role | Font | Variable |
|------|------|----------|
| Display / Editorial | Bebas Neue | `--font-display` |
| Body / UI | DM Sans | `--font-body` |
| ASCII / Terminal | JetBrains Mono | `--font-mono` |

Type scale via Tailwind only — no ad-hoc `style={{ fontSize }}`. Use `EditorialText` primitive for all oversized display type.

### Spacing
Base unit: 4px. Use Tailwind spacing scale exclusively (no arbitrary px values in className except for complex CSS Modules).

## Styling Rules

- **Tailwind** for layout, spacing, responsive utilities, and light component styling
- **CSS Modules** for ASCII/CRT components with complex stateful or animated styles (`AsciiPortrait.module.css`, `CrtOverlay.module.css`, `Terminal.module.css`)
- No `styled-components`, no `emotion` — both are incompatible with RSC without forcing `"use client"`
- No raw hex values in component files — always reference CSS variables

## Component Conventions

### Server vs Client Boundary
- Default to Server Components — add `"use client"` only when required (hooks, event listeners, canvas, GSAP, Framer Motion)
- ASCII components are always Client Components (canvas, mouse events)
- Section wrappers can be Server Components; interactive children are Client Components

### GSAP
- Always use the `useGSAP` hook from `@/hooks/useGSAP` — it handles context creation and cleanup
- Import ScrollTrigger: `import ScrollTrigger from 'gsap/ScrollTrigger'` then `gsap.registerPlugin(ScrollTrigger)` inside the hook
- Never use GSAP outside of `useGSAP` callbacks

### Framer Motion
- Only in Client Components
- Use `ScrollReveal` wrapper for scroll-triggered reveals instead of writing `useInView` directly
- `AnimatePresence` for mount/unmount transitions (BootSequence exit, Terminal open/close)

### File Naming
- Components: PascalCase (`AsciiPortrait.tsx`)
- CSS Modules: `ComponentName.module.css`
- Hooks: camelCase with `use` prefix (`useAsciiWarp.ts`)
- Lib utilities: camelCase (`renderer.ts`, `warp.ts`)

## Key Files
```
app/layout.tsx          — root layout, fonts, Terminal provider, metadata
app/page.tsx            — section assembly, BootSequence gate
app/globals.css         — Tailwind import, CSS design tokens, global resets
components/ascii/       — AsciiPortrait, AsciiLogo, CrtOverlay
components/sections/    — BootSequence, Hero, About, Experience, Skills, Contact
components/ui/          — Terminal, EditorialText, ScrollReveal
components/layout/      — Navigation, Footer
hooks/                  — useAsciiWarp, useTerminal, useGSAP
lib/ascii/              — renderer.ts, warp.ts, logos.ts
lib/terminal/           — commands.ts
types/index.ts          — shared interfaces
```

## Content Placeholders
Work experience data lives in `lib/data/experience.ts`. Skills in `lib/data/skills.ts`.
Replace placeholder entries with real data before launch.
