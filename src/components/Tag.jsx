import { useId } from "react";
import { tagBorderClass } from "@/lib/tagColors";
import { tagDescription } from "@/lib/tagGlossary";

// ─────────────────────────────────────────────────────────────────────────────
// Tag.jsx — a tech/skill chip.
//
// The chip looks the same everywhere it appears (About, Experience, the
// project cards, the case study). When the label is in the glossary
// (lib/tagGlossary.js), hovering or keyboard-focusing the chip brings up a
// one-line definition; a label with no glossary entry renders as a plain
// chip, exactly as before.
//
// `as` controls the wrapper element — every current call site renders these
// inside a <ul>, so the default is "li".
// ─────────────────────────────────────────────────────────────────────────────
export const Tag = ({ label, as: As = "li" }) => {
    const description = tagDescription(label);
    const tipId = useId();

    return (
        <As className={description ? "tag-host relative" : undefined}>
            <span
                className={`placard text-ink-faint border px-2.5 py-1 inline-block ${
                    description ? "cursor-help" : ""
                } ${tagBorderClass(label)}`}
                tabIndex={description ? 0 : undefined}
                aria-describedby={description ? tipId : undefined}
            >
                {label}
            </span>
            {description && (
                <span role="tooltip" id={tipId} className="tag-tip">
                    {description}
                </span>
            )}
        </As>
    );
};

export default Tag;
