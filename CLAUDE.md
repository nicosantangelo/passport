# CLAUDE.md

## Project

"Passport" — a client-side fake data generator for temporary signups and testing. Single-page app, no backend, no tracking.

## Product Vision

The UI is designed to look and feel like a real passport document. Push the passport metaphor as far as possible in design decisions (layout, typography, visual language). It's okay to break from the metaphor when it would hinder usability or clarity.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui components (`@base-ui/react`)
- `@ngneat/falso` for fake data generation
- Geist font

## Conventions

- No new dependencies without asking first.
- Use blank lines to separate logical blocks — avoid dense clumps of code.
- Keep state management simple. Use local `useState` where possible; reach for Zustand only if it gets complicated.
- Components will eventually be extracted to their own files — don't do it prematurely.
- `App-copy.tsx` is a scratch backup, ignore it.

## Architecture

- Everything lives in a single page — no routing.
- Fake data logic lives in `src/lib/passport.ts`.
- UI components in `src/components/ui/` are shadcn primitives, don't modify them.

## Deployment

GitHub Pages (static build via `npm run build`).
