// ─────────────────────────────────────────────────────────────────────────────
// sequence.jsx — entries arriving the way a checklist is read.
//
// The build already had motion for the three events: an item CHECKED as it is
// read, an instrument taking its READING, an action reporting it COMMITTED.
// What it had no vocabulary for was the page itself being run — a procedure
// whose entries arrive in order rather than all at once, which is what makes a
// checklist feel like it is being worked through instead of printed.
//
// That is what lives here, and the discipline is narrow enough to say in four
// lines:
//
//   · One move. 8px up and a fade — the same rise `settle` already uses. There
//     is no scale, no blur, no slide from the side, and no easing that
//     overshoots. A line of a checklist does not bounce.
//   · Read order only. Entries run top to bottom, never in from alternating
//     edges, because the order is the meaning.
//   · Never the first viewport. The hero card is legible at first paint; see
//     the Hero note in index.css for the one thing that does move up there.
//   · Never a layout property. Transform and opacity, on the compositor.
//
// Long lists (the record, the courses) arm each entry on its own, so an item
// arrives when it is genuinely read rather than the whole column firing when
// the container clips the fold. `Run`/`Step` exist for tight clusters that are
// taken in as one group — the particulars block, the direct-contact list.
//
// Reduced motion is answered here, not downstream: `initial={false}` renders
// the finished state and no observer is ever installed.
// ─────────────────────────────────────────────────────────────────────────────

import { m, useReducedMotion } from "motion/react";

// The rise is 8px because that is `settle`'s rise. A second entrance distance
// would read as a second system.
const RISE = 8;
const EASE = [0.16, 1, 0.3, 1];

// Deliberately module-private: one entrance, defined once. A section that
// wants a different distance or duration is a second motion system, not a
// variant, so there is nothing here to import and tune.
const step = {
  rest: { opacity: 0, y: RISE },
  run: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
};

// 55ms between lines: fast enough to read as one sequence, slow enough that
// the order is legible. Capped by keeping clusters small — a cluster that
// needs a cap is a list, and a list arms its entries individually.
const list = {
  rest: {},
  run: { transition: { staggerChildren: 0.055, delayChildren: 0.03 } },
};

// A little inside the lower edge, matching useSeen()'s -12%: the entry arrives
// as it is read, not as it clips the boundary.
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };

/**
 * One entry that arms itself. Use for rows of a long list, where the container
 * is taller than the viewport and a shared trigger would fire them all early.
 */
export const Entry = ({ as = "div", children, ...rest }) => {
  const still = useReducedMotion();
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      initial={still ? false : "rest"}
      whileInView={still ? undefined : "run"}
      viewport={VIEWPORT}
      variants={step}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/** A tight cluster taken in as one group. Children are `<Step>`. */
export const Run = ({ as = "div", children, ...rest }) => {
  const still = useReducedMotion();
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      initial={still ? false : "rest"}
      whileInView={still ? undefined : "run"}
      viewport={VIEWPORT}
      variants={list}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/** A line inside a `<Run>`. Timing comes from the parent, never from a delay. */
export const Step = ({ as = "div", children, ...rest }) => {
  const Tag = m[as] ?? m.div;
  return (
    <Tag variants={step} {...rest}>
      {children}
    </Tag>
  );
};
