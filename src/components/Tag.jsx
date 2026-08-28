import { useCallback, useId, useRef } from "react";
import { tagBorderClass } from "@/lib/tagColors";
import { tagDescription } from "@/lib/tagGlossary";

// ─────────────────────────────────────────────────────────────────────────────
// Tag.jsx — a tech/skill chip.
//
// The chip looks the same everywhere it appears (About, Experience, the
// project cards, the case study). When the label is in the glossary
// (lib/tagGlossary.js), the chip carries a dotted underline as a "there's a
// definition here" cue, and hovering — or tapping / keyboard-focusing — it
// brings up a one-line definition. A label with no glossary entry renders as
// a plain chip, exactly as before.
//
// The bubble is centred on the chip by CSS, which pushes it off-screen for a
// chip near a viewport edge (common on mobile — the page has an overflow
// guard that then clips it). On open, `positionTip` measures the bubble and
// writes an explicit `left` that is clamped inside the viewport, and flips it
// below the chip when there isn't room above. Position is set instantly with
// no transition, so nothing can freeze it mid-animation.
//
// `as` controls the wrapper element — every current call site renders these
// inside a <ul>, so the default is "li".
// ─────────────────────────────────────────────────────────────────────────────

const EDGE_PAD = 12; // keep this far from the viewport edges
const GAP = 8; // between chip and bubble
const TOP_PAD = 72; // clears the sticky navbar

export const Tag = ({ label, as: As = "li" }) => {
    const description = tagDescription(label);
    const tipId = useId();
    const tipRef = useRef(null);

    const positionTip = useCallback(() => {
        const tip = tipRef.current;
        const host = tip?.parentElement;
        if (!tip || !host) return;

        const h = host.getBoundingClientRect();
        const w = tip.offsetWidth;
        const viewportW = document.documentElement.clientWidth;

        // Centre on the chip, then clamp the whole bubble into the viewport.
        let left = h.left + h.width / 2 - w / 2;
        left = Math.max(EDGE_PAD, Math.min(left, viewportW - EDGE_PAD - w));

        // `left` is relative to the host (the positioned ancestor). Kill the
        // CSS centring transform now that we have an exact value.
        tip.style.left = `${Math.round(left - h.left)}px`;
        tip.style.transform = "none";

        tip.dataset.place =
            h.top - tip.offsetHeight - GAP < TOP_PAD ? "bottom" : "top";
    }, []);

    return (
        <As
            className={description ? "tag-host relative" : undefined}
            onPointerEnter={description ? positionTip : undefined}
            onFocus={description ? positionTip : undefined}
        >
            <span
                className={`placard text-ink-faint border px-2.5 py-1 inline-block ${
                    description ? "tag-chip--defined cursor-help" : ""
                } ${tagBorderClass(label)}`}
                tabIndex={description ? 0 : undefined}
                aria-describedby={description ? tipId : undefined}
            >
                {label}
            </span>
            {description && (
                <span ref={tipRef} role="tooltip" id={tipId} className="tag-tip">
                    {description}
                </span>
            )}
        </As>
    );
};

export default Tag;
