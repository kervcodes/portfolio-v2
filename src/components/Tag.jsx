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
// The definition bubble is centred on the chip, so a chip near a screen edge
// (common on mobile) would push half the bubble past the viewport, where the
// page's overflow guard clips it. `positionTip` measures the bubble when it
// opens and nudges it back on-screen, and flips it below the chip when there
// isn't room above.
//
// `as` controls the wrapper element — every current call site renders these
// inside a <ul>, so the default is "li".
// ─────────────────────────────────────────────────────────────────────────────

// Keep-on-screen margins, in px.
const EDGE_PAD = 12;
const TOP_PAD = 72; // clears the sticky navbar

export const Tag = ({ label, as: As = "li" }) => {
    const description = tagDescription(label);
    const tipId = useId();
    const tipRef = useRef(null);

    const positionTip = useCallback(() => {
        const tip = tipRef.current;
        const host = tip?.parentElement;
        if (!tip || !host) return;

        // Reset, then measure from the neutral position.
        tip.style.setProperty("--tip-shift", "0px");
        tip.dataset.place = "top";
        const tipRect = tip.getBoundingClientRect();
        const hostRect = host.getBoundingClientRect();
        const viewportW = document.documentElement.clientWidth;

        let shift = 0;
        if (tipRect.left < EDGE_PAD) {
            shift = EDGE_PAD - tipRect.left;
        } else if (tipRect.right > viewportW - EDGE_PAD) {
            shift = viewportW - EDGE_PAD - tipRect.right;
        }
        if (shift) {
            tip.style.setProperty("--tip-shift", `${Math.round(shift)}px`);
        }

        if (hostRect.top - tipRect.height - 8 < TOP_PAD) {
            tip.dataset.place = "bottom";
        }
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
