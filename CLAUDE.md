# CLAUDE.md

## Project

"Passport" — a fake data generator for temporary signups and testing. Available as a web app and a CLI. No backend, no tracking.

## Product Vision

The UI is designed to look and feel like a real passport document. Push the passport metaphor as far as possible in design decisions (layout, typography, visual language). It's okay to break from the metaphor when it would hinder usability or clarity.

## Stack

- React 19 + TypeScript + Vite (web app)
- Tailwind CSS v4
- shadcn/ui components (`@base-ui/react`)
- `@faker-js/faker` for fake data generation (21 locales)
- `lucide-react` for icons
- Geist font
- `picocolors` + `tsx` (CLI)
- `vitest` (tests)

## Conventions

- No new dependencies without asking first.
- Use blank lines to separate logical blocks — avoid dense clumps of code.
- Keep state management simple. Use local `useState` where possible; reach for Zustand only if it gets complicated.

## Architecture

- Fake data logic lives in `src/lib/passport.ts` — exports `generatePassport()`, provider lists, and the `Passport` type. Shared by web and CLI.
- **Web app** — single page, no routing:
  - UI components in `src/components/ui/` are shadcn primitives, don't modify them.
  - Main components (each in their own file under `src/`):
    - `App.tsx` — root state (`passport`), layout, regenerate button.
    - `Passport.tsx` — left column: identity fields with copy-to-clipboard, MRZ strip.
    - `DigitalPassport.tsx` — right column: username, password, temp email/SMS provider links.
    - `PassportMrz.tsx` — machine-readable zone formatting (ICAO-style).
    - `Identicon.tsx` — deterministic SVG avatar from name + DOB seed.
- **CLI** — `cli/index.ts`, run via `./passport` or `npm run cli`. Imports from `src/lib/passport.ts`. Supports `--json` for piping.
- **Tests** — `cli/cli.test.ts`, run via `npm test`.

## Deployment

GitHub Pages. `npm run deploy` builds, then copies `dist/` contents to the repo root for static hosting.
