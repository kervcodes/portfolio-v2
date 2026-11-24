import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// The signature loader on page changes. The first load is handled by the
// static #boot-loader in index.html (it has to be on screen before JS runs);
// this replays the same mark, shorter, whenever the pathname changes. Hash
// jumps within a page (/#about) don't count as a page change. Styles live in
// index.html next to the boot loader so both share one definition.
// ─────────────────────────────────────────────────────────────────────────────

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const RouteLoader = () => {
  const { pathname, state } = useLocation();
  const first = useRef(true);
  // A counter rather than a boolean, so a second navigation mid-animation
  // remounts the sheet and replays it from the start.
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion() || state?.silent) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- replaying an animation in response to navigation is the effect's whole job
    setRun((n) => n + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- replay on page changes only, not on state changes
  }, [pathname]);

  if (!run) return null;

  return (
    <div
      key={run}
      className="sig-sheet sig-sheet--route"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === "sig-out") setRun(0);
      }}
    >
      <div className="sig-word">
        {[..."Kervintz"].map((ch, i) => (
          <span key={i} className="sig-letter" style={{ "--i": i }}>
            {ch}
            <span className="sig-letter__ink">{ch}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default RouteLoader;
