// ─────────────────────────────────────────────────────────────────────────────
// motion.js — the mechanics behind the motion in this build.
//
// A checklist is something you RUN, not something you display. So an item is
// checked when it is read, an instrument takes its reading when you look at
// it, and an action reports that it committed. The first two need to know when
// an element has actually been seen; the third needs to know when the visitor
// has left one procedure for another.
//
// Two rules hold everywhere below:
//   1. The finished state is the DEFAULT. If JavaScript never runs, if the
//      browser has no IntersectionObserver or View Transitions, or if the
//      visitor asked for less motion, every element renders already-checked
//      and already-swept, and every link navigates instantly. Motion is armed,
//      never assumed.
//   2. One observer serves the whole page. Eight instruments do not need
//      eight observers.
// ─────────────────────────────────────────────────────────────────────────────

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

/**
 * A modified click is the visitor asking the browser for a second tab, not for
 * this page to turn. Every link that intercepts its own navigation checks this
 * first and otherwise leaves the anchor alone.
 */
export const opensElsewhere = (e) =>
  e.defaultPrevented ||
  e.button !== 0 ||
  e.metaKey ||
  e.ctrlKey ||
  e.shiftKey ||
  e.altKey;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const shouldAnimate = () =>
  typeof window !== "undefined" &&
  "IntersectionObserver" in window &&
  !prefersReducedMotion();

// ─── One shared observer ──────────────────────────────────────────────────────
let observer = null;
const pending = new Map();

const getObserver = () => {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const fire = pending.get(entry.target);
        observer.unobserve(entry.target);
        pending.delete(entry.target);
        fire?.();
      }
    },
    // Slightly inside the lower edge: the check is made once the row is being
    // read, not the instant it clips the boundary.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.35 }
  );
  return observer;
};

/**
 * Fires once, the first time the element is genuinely in view.
 *
 * Returns `[ref, seen]`. When motion is unavailable or unwanted, `seen` starts
 * true — so the caller renders its finished state and nothing is ever hidden
 * behind a trigger that may not come.
 *
 * @param {boolean} enabled pass false when a parent owns the trigger instead.
 */
export const useSeen = (enabled = true) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(() => !enabled || !shouldAnimate());

  useEffect(() => {
    const node = ref.current;
    if (seen || !node) return;
    const io = getObserver();
    pending.set(node, () => setSeen(true));
    io.observe(node);
    return () => {
      pending.delete(node);
      io.unobserve(node);
    };
  }, [seen]);

  return [ref, seen];
};

/**
 * A digital readout settling on its value — the one count-up in the build.
 * Holds the true number whenever motion is off, so the figure on screen is
 * never a number the page cannot back up.
 */
export const useCountUp = (target, run, duration = 720) => {
  const animated = shouldAnimate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!animated || !run) return;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // Hard deceleration: a readout settles, it does not coast to a stop.
      setValue(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animated, run, target, duration]);

  // The true figure whenever motion is off, so the number on screen is never
  // one the page cannot back up.
  return animated ? value : target;
};

// ─── The page turn ────────────────────────────────────────────────────────────
// A handbook sends you from an entry to the procedure it names, and the entry
// you picked IS the heading of the page you land on. That continuity is the
// third event — an action reporting that it committed — applied to navigation,
// which is the one place this build never applied it.
//
// The mechanism is the View Transitions API. Both halves of the pair carry the
// same `view-transition-name`, but only while a turn is actually in flight:
// two elements may never hold one name at the same time, and there can be many
// note cards on the page. So the slug being turned to lives in one tiny store
// that both the outgoing card and the incoming article read.

let turnKey = null;
const turnListeners = new Set();

const setTurnKey = (key) => {
  turnKey = key;
  turnListeners.forEach((notify) => notify());
};

const subscribeTurn = (notify) => {
  turnListeners.add(notify);
  return () => turnListeners.delete(notify);
};

/** The slug currently mid-turn, or null. Both ends of the pair read this. */
export const useTurnKey = () =>
  useSyncExternalStore(
    subscribeTurn,
    () => turnKey,
    () => null
  );

export const canPageTurn = () =>
  typeof document !== "undefined" &&
  typeof document.startViewTransition === "function" &&
  !prefersReducedMotion();

/**
 * Returns `turn(to, key)` — navigate as a page turn where the browser can do
 * it, and as a plain navigation everywhere else. Nothing is ever hidden behind
 * the transition: the route change happens either way.
 */
export const usePageTurn = () => {
  const navigate = useNavigate();

  return useCallback(
    (to, key) => {
      if (!canPageTurn()) {
        navigate(to);
        return;
      }
      // The shared names have to be in the DOM before the outgoing state is
      // captured, which is the moment startViewTransition is called.
      flushSync(() => setTurnKey(key ?? null));

      const turn = document.startViewTransition(() => {
        flushSync(() => navigate(to));
      });

      // A skipped transition rejects; either way the name comes back off.
      turn.finished.catch(() => {}).finally(() => setTurnKey(null));
    },
    [navigate]
  );
};

/**
 * The strip's four tabs, the plate mark, and the Contact key all point at
 * `/#section`. On the homepage that is a same-document fragment navigation and
 * the browser's own smooth scroll is exactly right — the visitor is moving
 * inside one page, which is the case `scroll-behavior: smooth` is for.
 *
 * From `/sprint` or a note, the same href was a CROSS-document navigation: the
 * whole app tore down, went white, and re-downloaded to reach a section it was
 * already holding. That is the one navigation in the build with no continuity
 * at all — and it sits under a marker that travels between those four tabs
 * precisely to claim they are positions in one document.
 *
 * So: same document, leave it to the browser. Different one, turn the page.
 *
 * Returns `go(event, href)` for an anchor's `onClick`. It only ever calls
 * `preventDefault` on the branch it actually handles, so the anchor keeps
 * working with JavaScript broken, middle-clicked, or opened in a new tab.
 */
export const useSectionLink = () => {
  const turn = usePageTurn();
  const { pathname } = useLocation();

  return useCallback(
    (e, href) => {
      if (opensElsewhere(e)) return;
      const [path] = href.split("#");
      // Same document: the browser scrolls it, smoothly, for free.
      if ((path || "/") === pathname) return;
      e.preventDefault();
      turn(href);
    },
    [pathname, turn]
  );
};

/**
 * Where a route lands. Mounted once, at the top of the app.
 *
 * Without this a client-side route change keeps the previous scroll offset —
 * clicking a note from halfway down the homepage dropped the visitor halfway
 * down the article — and a deep link like `/#contact` resolved before React
 * had rendered the section, so it never arrived at all. A turn cannot report
 * continuity between two places if the second one is the wrong place.
 *
 * Every scroll here is `instant`: `scroll-behavior: smooth` is for a visitor
 * moving inside one page, not for the jump between two.
 */
export const useNavigationContinuity = () => {
  const { hash, key } = useLocation();
  const navigationType = useNavigationType();
  const offsets = useRef(null);
  const lastKey = useRef(null);

  useLayoutEffect(() => {
    offsets.current ??= new Map();
    const seen = offsets.current;
    const previous = seen.get(key);
    // Null on the very first run, and unchanged when StrictMode re-runs this
    // in development — neither is a navigation, and neither should move.
    const navigated = lastKey.current !== null && lastKey.current !== key;
    lastKey.current = key;

    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (target) {
      // scroll-margin on the section keeps the heading clear of the tab strip.
      // This is the case the browser cannot serve on a cold load: it looks for
      // the anchor before React has rendered it, finds nothing, and gives up.
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else if (navigated && navigationType === "POP" && previous !== undefined) {
      window.scrollTo({ top: previous, behavior: "instant" });
    } else if (navigated) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    // A cold load or a reload with no hash is left alone: the browser's own
    // scroll restoration is better at that than we are, and reloading halfway
    // down an article should not throw the reader back to the top. We take
    // over only for the entries we can actually account for.

    // Runs before the next entry positions itself, so this is the offset the
    // visitor is leaving — the one Back should give them back.
    return () => seen.set(key, window.scrollY);
  }, [key, hash, navigationType]);
};
