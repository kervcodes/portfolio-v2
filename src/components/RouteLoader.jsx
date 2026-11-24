import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// The signature loader on page changes. The first load is handled by the
// static #boot-loader in index.html (it has to be on screen before JS runs);
// this replays the same pen-written mark, quicker, whenever the pathname
// changes. Hash jumps within a page (/#about) don't count as a page change.
// Styles and the pen itself (window.__sigWrite) live in index.html next to
// the boot loader so both share one definition.
// ─────────────────────────────────────────────────────────────────────────────

const WRITE_MS = 1400;
const HOLD_MS = 0;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const RouteLoader = () => {
  const { pathname, state } = useLocation();
  const first = useRef(true);
  const [run, setRun] = useState(0);
  const sheetRef = useRef(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion() || state?.silent) {
      document.documentElement.style.setProperty("--boot-delay", "0ms");
      return;
    }
    document.documentElement.style.setProperty(
      "--boot-delay",
      `${WRITE_MS + HOLD_MS - 400}ms`
    );
  
    setRun((n) => n + 1);
  }, [pathname]);
  useLayoutEffect(() => {
    const sheet = sheetRef.current;
    if (!run || !sheet) return;
    let timer;
    if (window.__sigWrite) {
      window.__sigWrite(sheet, WRITE_MS).then(() => {
        timer = setTimeout(() => sheet.classList.add("is-done"), HOLD_MS);
      });
    } else {
      sheet.classList.add("is-writing", "is-done");
    }
    return () => clearTimeout(timer);
  }, [run]);

  if (!run) return null;

  return (
    <div
      key={run}
      ref={sheetRef}
      className="sig-sheet sig-sheet--route"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === "sig-out" || e.animationName === "sig-fade") setRun(0);
      }}
    >
      <svg className="sig-mark" viewBox="0 0 640 260" role="presentation">
        <mask
          id={`sig-mask-route-${run}`}
          maskUnits="userSpaceOnUse"
          x="-100"
          y="-150"
          width="840"
          height="560"
        >
          <path className="sig-pen" pathLength="1" />
        </mask>
        <text className="sig-text" x="320" y="170" textAnchor="middle">
          Kervintz
        </text>
      </svg>
    </div>
  );
};

export default RouteLoader;
