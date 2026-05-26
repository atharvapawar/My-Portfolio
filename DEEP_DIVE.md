# DEEP DIVE — My Portfolio

This document explains the repository in depth so any developer or AI can understand, run, and extend it.

**Tech stack**
- Framework: React 18 + TypeScript
- Bundler/dev server: Vite
- Styling: Tailwind CSS + PostCSS + Autoprefixer
- Routing: Wouter (lightweight client router)
- Animations: Framer Motion
- Lint/format: Prettier (format script present)

---

## Quick Start

Prerequisites: Node.js (>=16 recommended), npm.

- Install dependencies:

```bash
npm install
```

- Run development server (hot-reload):

```bash
npm run dev
# or to set a specific port:
# $env:PORT=5176; npm run dev  (PowerShell)
```

- Build for production:

```bash
npm run build
```

- Preview production build locally:

```bash
npm run serve
```

- Typecheck only (no emit):

```bash
npm run typecheck
```

- Format files with Prettier:

```bash
npm run format
```

---

## Project Layout (root-level)

- `package.json` — scripts and dependencies used by the project.
- `vite.config.ts` — Vite configuration (server, build, plugins, aliasing).
- `tsconfig.json` — TypeScript compiler options and path aliases.
- `tailwind.config.cjs` & `postcss.config.cjs` — Tailwind/PostCSS configuration.
- `index.html` — Vite entry HTML template.
- `src/` — application source code (see below).
- `public/` — static assets served as-is (robots.txt, certs, exp-letters, etc.).
- `netlify.toml`, `vercel.json` — example deployment configs for Netlify and Vercel.

---

## Key Configuration Notes

### package.json scripts
- `dev`: Starts `vite` dev server using `vite.config.ts`. Environment variable `PORT` is respected.
- `build`: Runs `vite build` and outputs to `dist/`.
- `serve`: Runs `vite preview` to serve the production build.
- `typecheck`: Runs `tsc` with `--noEmit` to validate types.
- `format`: Runs Prettier for formatting.

### vite.config.ts
- `basePath` can be supplied via `BASE_PATH` env var for hosting under a subpath.
- Server listens on `0.0.0.0` so it is accessible on the LAN.
- Aliases: `@` -> `src/` (use `import ... from '@/components/Foo'`).
- Dedupe `react` and `react-dom` to avoid duplicate instances.
- Replit-specific plugin loading is guarded by `REPL_ID` — optional runtime-only dependencies will be skipped locally.
- Build output: `dist/` (configurable via `outDir`).

### tsconfig.json
- `jsx` is set to `react-jsx` (modern JSX transform).
- Path mapping: `@/*` -> `./src/*`.
- `noEmit: true` for dev typechecking only.

---

## src/ Directory — Files and Purpose

High-level: the app is a single page React app composed of small presentational components and a few pages.

- `main.tsx` — Application entry. Mounts React on the DOM and applies global CSS.
- `App.tsx` — Root App component. Sets up routing and global boundaries.
- `index.css` — Tailwind utilities + app global styles.

### components/
- `ErrorBoundary.tsx` — React error boundary to catch rendering errors.
- `Footer.tsx` — Site footer UI.
- `Hero.tsx` — Landing hero section component.
- `PasswordGate.tsx` — Simple protection gate component that prompts for a password before accessing guarded pages.
- `PhaseCard.tsx` — UI element representing a roadmap/phase card.
- `Timeline.tsx` — Timeline UI component for roadmap or history visualization.

### pages/
- `HRView.tsx` — A route/view presumably for HR or private viewing (name suggests restricted access).
- `PrivateView.tsx` — A protected/private page that is likely guarded by `PasswordGate`.
- `not-found.tsx` — 404 page/route for unmatched URLs.

### data/
- `portfolio.ts` — Static or semi-static data used to render portfolio items. Contains structure like project titles, URLs, descriptions, tags.
- `roadmap.ts` — Roadmap/roadmap phases data used by `Timeline` / `PhaseCard`.

### types/
- `replit.d.ts` — Ambient types used when running on Replit (optional runtime types).

### utils/
- `logger.ts` — Lightweight logging helper used across the app.

---

## Routing and Access Control

- Routing uses `wouter` — a minimal, hook-based router. Check `App.tsx` for route definitions and how components map to paths.
- `PasswordGate.tsx` provides a simple client-side gate around routes such as `PrivateView`. This is not secure for sensitive data — consider server-side auth for real secrets.

---

## Environment Variables and Deployment

- `PORT` — Port for dev server and preview. Default 5173.
- `BASE_PATH` — Base path used by Vite for serving assets when deploying under a subpath.
- `REPL_ID` — Used internally to detect running on Replit and enable optional plugins.
- `NODE_ENV` — Standard Node environment variable used by plugins and build tools.

Deployment artifacts and recommended targets:
- `dist/` is produced by `npm run build`.
- `netlify.toml` and `vercel.json` include configuration hints for those platforms; adjust `base`/`redirects` as necessary.

---

## Troubleshooting

Common issues and fixes:
- "Port already in use": set `PORT` env var or close the occupying process.
- Missing modules / failing startup: run `npm install` and ensure `node_modules` is present. If problems persist, remove `node_modules` and `package-lock.json`, then `npm install` again.
- Type errors reported by `tsc`: run `npm run typecheck` to see errors. Fix or loosen types in `tsconfig.json` if necessary.
- CSS not applying: ensure `index.css` imports `@tailwind base;`, `@tailwind components;` and `@tailwind utilities;` and that Tailwind build runs.
- Replit-only plugin errors: `vite.config.ts` lazily loads those plugins only when `REPL_ID` is set — local runs should skip them.

Commands for quick recovery:

```powershell
# Windows (PowerShell)
rm -r node_modules dist
npm ci
npm run dev
```

Linux/macOS (bash):

```bash
rm -rf node_modules dist && npm ci && npm run dev
```

---

## Recommended Improvements / Roadmap

1. Add ESLint with TypeScript rules and a lint script (`npm run lint`).
2. Add `vitest` + `@testing-library/react` and some unit tests for key components.
3. Add GitHub Actions CI to run `npm ci`, `npm run typecheck`, `npm run build`, and optionally run tests.
4. Enable `strict` TypeScript compiler options gradually to catch issues early.
5. Add Storybook for component exploration and documentation.
6. Introduce a more robust routing and auth strategy (e.g., `react-router` + server-based auth) if private data is required.
7. Introduce `husky` + `lint-staged` to enforce formatting/type checks on commit.
8. Add a CONTRIBUTING.md and CODE_OF_CONDUCT.md for open-source collaboration.

---

## Upgrade Guide (Dependencies & Tooling)

- When upgrading React (major versions), ensure `react-dom` matches and test any lifecycle or hook behavior changes.
- Vite 4 -> 5: watch release notes — plugin API changes can break plugins. Test `vite build` and `dev` after upgrades.
- Tailwind: major upgrades may change class names or plugin ecosystems. Rebuild CSS and test UIs.
- Keep TypeScript updated and update `@types/*` packages to matching versions.

Pro tip: Use `npm-check-updates` (`npx ncu -u`) to bump dependency versions in `package.json`, then `npm install` and carefully run `npm run build` and tests.

---

## How to Add a New Page / Component

1. Create a component under `src/components/` or a page in `src/pages/`.
2. If adding a route, update routing in `App.tsx` to include the new path.
3. Update `data/` if the page renders dynamic content from that source.
4. Add unit tests under a `__tests__` folder using `vitest` (recommended).
5. Format code with `npm run format` and run `npm run typecheck`.

---

## Security and Secrets

- Never commit API keys, passwords, or other secrets.
- For deployment, use environment variables provided by the hosting platform.
- For client-only apps, do not embed secrets in the bundle; use a server-side proxy if secret access is required.

---

## Where to Look — Quick Links

- Vite config: `vite.config.ts`
- Entry point: `src/main.tsx`
- Root app: `src/App.tsx`
- Pages: `src/pages/`
- Components: `src/components/`
- Static data: `src/data/`
- Build output: `dist/` (after `npm run build`)

---

If you'd like, I can:
- Open any file and annotate it inline with comments explaining logic.
- Add automated tests and a minimal CI workflow.
- Harden TypeScript settings and apply `eslint --fix` and `prettier` formatting in a PR.

