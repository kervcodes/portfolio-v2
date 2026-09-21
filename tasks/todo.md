# iPad Ride Kiosk — /ride

Branch: `feature/ipad-ride-kiosk` (from `master`)

## Decisions (confirmed by owner)
- [x] 2 featured projects (Bank Statement Analyzer, AI Digital Twin) — no third card, BranchBeacon excluded
- [x] Skip service worker / offline caching for v1
- [x] Add vitest + @testing-library/react + jsdom as new devDependencies for tests
- [x] Static pre-generated QR SVGs (build-time script, zero runtime dependency)

## Setup
- [x] Create branch `feature/ipad-ride-kiosk` off `master`
- [x] Add devDependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `qrcode` (generation-time only)
- [x] Add `npm run test` script; configure vitest in `vite.config.js` (jsdom environment)

## QR generation (build-time, static)
- [x] `scripts/generate-ride-qr.js` — generates SVGs into `public/ride/qr/` for: portfolio home, LinkedIn, résumé PDF, contact section — each with `utm_source=uber_kiosk&utm_medium=qr&utm_campaign=ride_portfolio&utm_content=<target>`
- [x] Run once, commit generated SVGs

## Route & data
- [x] Add `/ride` route in `src/App.jsx`, standalone (no Navbar/Footer)
- [x] `src/pages/Ride.jsx` — orchestrator: welcome, selected work, experience, connect, inactivity reset
- [x] `src/lib/ride.js` — inactivity-timer hook (90s → reset to welcome), reduced-motion aware
- [x] Reuse `PROJECTS` from `src/data/projects.js` (bank-statement-analyzer, digital-twin) — wrote one-sentence problem/solution kiosk copy sourced from existing verified copy (flagged for owner verification)
- [x] Add `/ride` to `scripts/prerender.js` routes list
- [x] `<Helmet>` metadata: title "Kervintz Noel | Explore My Work", description, canonical link (no OG image system exists in repo — skipped per spec's conditional)

## Kiosk behavior
- [x] 44x44px+ touch targets, large type, no autoplay/sound
- [x] Respect `prefers-reduced-motion` (reuse `prefersReducedMotion()` from `lib/motion.js`)
- [x] 90s inactivity → smooth return to welcome; reset on touch/pointer/key/scroll
- [x] Visible "Back to start" control
- [x] External links: `target="_blank" rel="noopener noreferrer"`
- [x] No forms, no camera/mic/location/notification requests

## Analytics
- [x] Reuse `trackEvent()` from `src/lib/analytics.js` (GA4, already installed)
- [x] Events: `ride_page_view`, `ride_project_opened`, `ride_portfolio_qr_viewed`, `ride_linkedin_qr_viewed`, `ride_resume_qr_viewed`, `ride_contact_qr_viewed` (added for symmetry)
- [x] "Viewed" fires once via existing `useSeen()` intersection hook, not on click

## Tests (16 passing across 3 files)
- [x] Route renders
- [x] Major sections present (welcome, selected work, experience, connect)
- [x] QR destinations correct (href/src match expected UTM-tagged URLs)
- [x] Project status labels accurate (active / verified)
- [x] Inactivity timer resets view to welcome
- [x] External links carry `rel="noopener noreferrer"`
- [x] Reduced-motion preference respected
- [x] Keyboard navigation reaches all interactive elements

## Validation
- [x] `npm run lint` — clean except one pre-existing, unrelated error in `Contact.jsx`
- [x] `npm run test` — 16/16 passing
- [x] `npm run build` — client + SSR + prerender, `/ride` prerenders correctly
- [~] Manual layout check — verified at ~1180x820 in-browser (welcome, work, experience, connect all correct, no console errors); portrait/mobile viewport could not be forced in this remote browser session (resize_window reported success but the captured viewport never actually narrowed) — responsive classes mirror Hero.jsx/Learning.jsx's already-proven breakpoints, but owner should confirm on a real device before relying on it

## Report
- [x] Completion report delivered in chat, including iPad Safari/Home-Screen/Guided-Access setup steps
