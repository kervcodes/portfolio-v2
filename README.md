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

Content for posts and project case studies lives in `src/data/posts.js` and `src/data/projects.js` — each file is documented inline with the shape new entries should follow.

## Project structure

```
src/
  components/   Reusable UI (buttons, tag chips, checklist rows, error boundary)
  data/         Posts and project case studies (single source of truth)
  layout/       Navbar, Footer
  lib/          Motion helpers, scroll/navigation continuity, tag color mapping
  pages/        Routed pages (post detail, case study, sprint, 404)
  sections/     Homepage sections (Hero, About, Experience, Learning, Posts, Contact)
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
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

Configured for both Netlify (`netlify.toml`) and Vercel (`vercel.json`), each set up as a single-page app with all routes rewritten to `index.html`.

## Design

The visual design — the "Pre-Flight Checklist" theme (checklist rows, leader dots, placard charcoal, state-only colour) — is developed and kept consistent with Impeccable, which maintains the design system definition in `.impeccable/design.json` and critiques changes against it.
