// ─────────────────────────────────────────────────────────────────────────────
// projectTint.js — a light background wash for a project card.
//
// Same idea as tagColors.js: identity, not state. The colour is picked by a
// stable hash of the project's id, so a project always keeps the same tint
// wherever its card appears. The hue set is the tag-accent palette pushed to
// ~97% lightness (see --color-tint-* in index.css), so the two systems read
// as one family.
//
// EXPERIMENTAL — currently only on the Current-section cards, on trial.
// ─────────────────────────────────────────────────────────────────────────────

const TINT_CLASSES = [
    "bg-tint-rust",
    "bg-tint-green",
    "bg-tint-blue",
    "bg-tint-violet",
    "bg-tint-teal",
];

// Same hash as tagBorderClass, so the two pickers behave identically.
export const projectTintClass = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) | 0;
    }
    return TINT_CLASSES[Math.abs(hash) % TINT_CLASSES.length];
};
