# GEMINI.md — FEN Portfolio AI Rules & Context

Please refer to [AGENTS.md](./AGENTS.md) for full architecture, design system, component hierarchy, performance standards, and security rules.

## Core Directives for Gemini:
- **Design Aesthetic:** Dark luxury interface, near-black (`#07070A`), deep purple accents (`#8B5CF6`), high typography contrast (`Space Grotesk`), zero generic SaaS templates.
- **Images:** All images must use `.webp` format from `/public/` with explicit `width`, `height`, and `loading="lazy"` / `decoding="async"` (except hero LCP image).
- **Data Source:** Project list is maintained in `data.ts`. All external project URLs must point to real live Vercel deployments.
- **Code Standards:** Type-safe React + TypeScript, inline CSS variables / utility styling, GSAP ScrollTrigger for animations.
