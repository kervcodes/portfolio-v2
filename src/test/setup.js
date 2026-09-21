import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Not using vitest's `globals: true` (test functions are explicitly imported
// per file instead, so ESLint's browser-globals config doesn't need a vitest
// override) — which means @testing-library/react's own auto-cleanup never
// finds a global afterEach to hook into. Wire it up explicitly instead, once,
// here, so every test file starts from an empty document.
afterEach(() => cleanup());

// jsdom implements neither API. window.matchMedia backs both this app's own
// prefersReducedMotion() and framer-motion's internal reduced-motion check;
// window.scrollTo backs the kiosk's "return to welcome" behavior.
//
// Deliberately NOT polyfilling IntersectionObserver: jsdom has no
// implementation of it either, so `shouldAnimate()` (src/lib/motion.js)
// correctly reports motion as unavailable and every observer-gated
// component renders its already-finished state — exactly the fallback path
// the app is designed to fall back to without JS-driven motion, and the one
// that makes assertions on "seen" content deterministic instead of racing a
// real observer callback.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

window.scrollTo = vi.fn();
