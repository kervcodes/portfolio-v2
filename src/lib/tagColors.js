// ─────────────────────────────────────────────────────────────────────────────
// tagColors.js — border colour for a tech/skill tag, identity not status.
//
// Kept out of the caution/verified/warning palette on purpose — those mean
// something happened; a tag colour just tells tools apart. Known tools get a
// colour that nods at their real brand; anything else falls back to a stable
// hash of the label, so the same tag always lands on the same colour
// wherever it appears in the app.
// ─────────────────────────────────────────────────────────────────────────────

const TAG_COLOR_CLASSES = [
    "border-tag-rust",
    "border-tag-green",
    "border-tag-blue",
    "border-tag-violet",
    "border-tag-teal",
];

const KNOWN_TAG_COLORS = {
    "Claude API": "border-tag-rust",
    "Claude Code": "border-tag-rust",
    Supabase: "border-tag-green",
    PostgreSQL: "border-tag-green",
    "Tailwind CSS": "border-tag-blue",
    TypeScript: "border-tag-blue",
    "Next.js": "border-tag-violet",
    React: "border-tag-violet",
    "React Native": "border-tag-violet",
    Vercel: "border-tag-teal",
    "Node.js": "border-tag-teal",
};

export const tagBorderClass = (label) => {
    if (KNOWN_TAG_COLORS[label]) return KNOWN_TAG_COLORS[label];
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = (hash * 31 + label.charCodeAt(i)) | 0;
    }
    return TAG_COLOR_CLASSES[Math.abs(hash) % TAG_COLOR_CLASSES.length];
};
