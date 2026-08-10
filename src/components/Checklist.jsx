// ─────────────────────────────────────────────────────────────────────────────
// Checklist.jsx — the shared grammar of this world.
//
// Every claim on the site is a CHALLENGE with a RESPONSE beside it, joined by
// leader dots. That row is the atom; sections, headers and notices are built
// from it. Nothing here is decorative — colour means state.
//
// Two of these components move, and both move for the same reason: a checklist
// is run, not displayed. The check is made when the row is read; the gauge
// takes its reading when you look at it. See src/lib/motion.js.
// ─────────────────────────────────────────────────────────────────────────────

import { useSeen, shouldAnimate } from "@/lib/motion";

/* ── CHALLENGE ·········· RESPONSE ─────────────────────────────────────────── */
export const Row = ({ label, children, size = "default", className = "" }) => (
  <div className={`chk ${size === "lg" ? "chk--lg" : ""} ${className}`}>
    <span className="chk__label">{label}</span>
    <span className="chk__lead" aria-hidden="true" />
    <span className="chk__value">{children}</span>
  </div>
);

/* ── The check itself: the signature motion of the build ──────────────────── */
// It draws at the moment the row comes into view. Previously it drew at first
// paint, which meant the one authored moment in the system was spent below the
// fold on every instance the visitor had not reached yet.
export const Check = ({ className = "" }) => {
  const [ref, seen] = useSeen();
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      className={`w-4 h-4 shrink-0 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12.5 L9.5 18 L20 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        className="check-mark"
        // No attribute at all when motion is off — the check is simply drawn.
        data-draw={shouldAnimate() ? (seen ? "run" : "pending") : undefined}
      />
    </svg>
  );
};

/* ── Arrow: drawn, not a Unicode glyph standing in for an icon ────────────── */
// Direction is a class rather than an inline transform, so the 2px hover nudge
// can compose with the mirror instead of being overwritten by it.
export const Arrow = ({ dir = "right", className = "" }) => (
  <svg
    viewBox="0 0 16 16"
    className={`arrow ${dir === "left" ? "arrow--left" : ""} w-3.5 h-3.5 shrink-0 ${className}`}
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 8 H13 M9 4 L13 8 L9 12"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
    />
  </svg>
);

/* ── Section heading: the heavy rule a handbook puts above a procedure ────── */
export const SectionHead = ({ index, title, lede, id, className = "" }) => (
  <header className={`rule-head ${className}`}>
    <div className="flex items-baseline gap-3">
      {index && (
        <span className="placard text-ink-faint nums" aria-hidden="true">
          {index}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl md:text-3xl font-bold tracking-tight text-ink uppercase"
      >
        {title}
      </h2>
    </div>
    {lede && (
      <p className="mt-3 text-ink-muted leading-relaxed">{lede}</p>
    )}
  </header>
);

/* ── Notice: the band carries the colour, the body stays readable ─────────── */
export const Notice = ({ kind = "caution", label, children, className = "" }) => (
  <aside className={`notice notice--${kind} ${className}`}>
    <p className="notice__band">{label}</p>
    <div className="px-4 py-3 text-sm text-ink-muted leading-relaxed">
      {children}
    </div>
  </aside>
);

/* ── Status pill: reads as an annunciator, not a badge ────────────────────── */
const STATUS = {
  verified: { text: "text-verified", dot: "bg-verified", label: "Complete" },
  active: { text: "text-caution-ink", dot: "bg-caution", label: "In progress" },
  standby: { text: "text-ink-faint", dot: "bg-ink-faint", label: "Standby" },
};

export const Status = ({ kind = "standby", children }) => {
  const cfg = STATUS[kind] ?? STATUS.standby;
  return (
    <span className={`placard inline-flex items-center gap-2 ${cfg.text}`}>
      <span
        className={`w-1.5 h-1.5 ${cfg.dot} ${
          kind === "active" ? "animate-standby" : ""
        }`}
        aria-hidden="true"
      />
      {children ?? cfg.label}
    </span>
  );
};

/* ── Gauge: a measured bar, not a decorative sparkline ────────────────────── */
// The bar sweeps to its reading once, the first time it is looked at — an
// instrument taking a measurement, which is what this thing claims to be. The
// width is always the true value; only a scaleX transform moves, so the sweep
// costs no layout and `aria-valuenow` never lies mid-animation.
//
// `run` lets a parent own the trigger when the gauge is part of a larger
// instrument (the sprint summary reads out and sweeps as one thing).
export const Gauge = ({ pct, kind = "active", label, run }) => {
  const owned = run !== undefined;
  const [ref, seen] = useSeen(!owned);
  const swept = owned ? run : seen;

  const fill =
    kind === "verified"
      ? "bg-verified"
      : kind === "active"
      ? "bg-caution"
      : "bg-ink-faint";

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-1.5 w-full bg-rule"
    >
      <div
        className={`gauge__fill h-full ${fill}`}
        style={{ width: `${pct}%` }}
        data-sweep={shouldAnimate() && !swept ? "pending" : undefined}
      />
    </div>
  );
};
