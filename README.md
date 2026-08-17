[![Netlify Status](https://api.netlify.com/api/v1/badges/5a27cdc6-4cd4-4b27-bda1-916aa1fcfa4a/deploy-status)](https://app.netlify.com/projects/jovial-ptolemy-191d4d/deploys) [![Deploy to Hugging Face Space](https://github.com/kervcodes/Digital-Twin/actions/workflows/update_space.yml/badge.svg)](https://github.com/kervcodes/Digital-Twin/actions/workflows/update_space.yml)

# Kervintz Noel — Portfolio

Personal portfolio site for Kervintz Noel, software engineer. Built as a single-page app with a checklist/handbook visual theme, plus routed pages for blog posts and project case studies.

Live: [kervintznoel.com](https://kervintznoel.com)

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for routing
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Motion](https://motion.dev/) for animation
- [EmailJS](https://www.emailjs.com/) for the contact form
- [Lucide](https://lucide.dev/) / [react-icons](https://react-icons.github.io/react-icons/) for icons
- [react-helmet-async](https://github.com/staylor/react-helmet-async) for per-route `<title>`/meta tags
- ESLint 10 with React Hooks + React Refresh plugins

## Routes

| Path | Renders |
| --- | --- |
| `/` | Home page — Hero, About, Experience, Learning, Posts, Contact |
| `/posts/:slug` | Full blog post |
| `/projects/:slug` | Project case study (five tabs: Problem, Architecture, Key Decisions, Build Log, Result) |
| `/sprint` | Standalone sprint page |
| `/twin` | AI digital twin page |
| `*` | 404 |

Content for posts and project case studies lives in `src/data/posts.js` and `src/data/projects.js` — each file is documented inline with the shape new entries should follow. Every route above is prerendered at build time (see [Prerendering](#prerendering)), so a new post or project slug needs a rebuild before it ships as static HTML.

## Project structure

```
scripts/
  prerender.js      Post-build step — renders every route to static HTML in dist/
src/
  components/   Reusable UI (buttons, tag chips, checklist rows, error boundary)
  data/         Posts and project case studies (single source of truth)
  layout/       Navbar, Footer
  lib/          Motion helpers, scroll/navigation continuity, tag color mapping
  pages/        Routed pages (post detail, case study, sprint, 404)
  sections/     Homepage sections (Hero, About, Experience, Learning, Posts, Contact)
  entry-server.jsx  SSR entry used only by the prerender step (not shipped to the browser)
```

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Client build → SSR build → prerender every route to static HTML in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Prerendering

`npm run build` runs three steps:

1. `vite build` — the normal client bundle to `dist/`.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — a Node-only SSR bundle used solely to render HTML strings (not served to browsers).
3. `node scripts/prerender.js` — renders every route in the table above via `react-dom/server` + React Router's `StaticRouter`, and writes the result to `dist/<route>/index.html` (plus `dist/404.html`), then deletes `dist-ssr/`.

This exists because Vite's default output is a single `index.html` with an empty `<div id="root">` — anything that fetches raw HTML without running JS (crawlers, link previews, `curl`) sees only that empty shell. Prerendering ships real, per-route markup and `<title>`/meta tags instead, while the client bundle still hydrates over it for full interactivity.

`react-router-dom` v7 has no first-party static-site-generation package with matching peer dependencies, so this is a small hand-rolled pipeline rather than a library — see `scripts/prerender.js` and `src/entry-server.jsx`.

## Deployment

Configured for both Netlify (`netlify.toml`) and Vercel (`vercel.json`). Both serve the prerendered file for a route when one exists at that path (e.g. `/sprint` → `dist/sprint/index.html`) and fall back to rewriting unmatched paths to `index.html`, so client-side routing still covers anything not prerendered. Vercel needs `"cleanUrls": true` in `vercel.json` for this directory-index resolution to work without a trailing slash; Netlify does it by default.

## Design

The visual design — the "Pre-Flight Checklist" theme (checklist rows, leader dots, placard charcoal, state-only colour) — is developed and kept consistent with Impeccable, which maintains the design system definition in `.impeccable/design.json` and critiques changes against it.
