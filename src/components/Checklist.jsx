// ─────────────────────────────────────────────────────────────────────────────
// Checklist.jsx — the shared grammar of this world.
//
// Every claim on the site is a CHALLENGE with a RESPONSE beside it, joined by
// leader dots. That row is the atom; sections, headers and notices are built
// from it. Nothing here is decorative — colour means state.
// ─────────────────────────────────────────────────────────────────────────────

/* ── CHALLENGE ·········· RESPONSE ─────────────────────────────────────────── */
export const Row = ({ label, children, size = "default", className = "" }) => (
  <div className={`chk ${size === "lg" ? "chk--lg" : ""} ${className}`}>
    <span className="chk__label">{label}</span>
    <span className="chk__lead" aria-hidden="true" />
    <span className="chk__value">{children}</span>
  </div>
);

/* ── The check itself: the one authored motion in the build ───────────────── */
export const Check = ({ className = "" }) => (
  <svg
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
    />
  </svg>
);

/* ── Arrow: drawn, not a Unicode glyph standing in for an icon ────────────── */
export const Arrow = ({ dir = "right", className = "" }) => (
  <svg
    viewBox="0 0 16 16"
    className={`w-3.5 h-3.5 shrink-0 ${className}`}
    fill="none"
    aria-hidden="true"
    style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}
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
      <p className="mt-3 max-w-[62ch] text-ink-muted leading-relaxed">{lede}</p>
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
export const Gauge = ({ pct, kind = "active", label }) => {
  const fill =
    kind === "verified"
      ? "bg-verified"
      : kind === "active"
      ? "bg-caution"
      : "bg-ink-faint";
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-1.5 w-full bg-rule"
    >
      <div className={`h-full ${fill}`} style={{ width: `${pct}%` }} />
    </div>
  );
};
