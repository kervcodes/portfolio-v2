import { useState } from "react";
import { Highlight } from "prism-react-renderer";

// ─── Syntax theme ─────────────────────────────────────────────────────────────
// Light, to sit inside a paper page rather than invert it. A charcoal panel
// repeated nineteen times in one post is hard on the eyes.
//
// Two constraints shaped the palette:
//
//   1. "Colour carries state and nothing else" — amber is in progress, green is
//      verified, red is a warning. A stock highlighter theme puts green and red
//      inside code samples and quietly breaks that. So: monochrome plus one
//      slate-blue accent, borrowed from no state role.
//   2. "Nothing lighter than this may hold words" — every value below was
//      measured against the block background, not eyeballed. Ratios in comments.
//
// Background is one step under --color-ground (the page), because matching the
// page would make the block disappear. ink-faint is NOT used here: it computes
// to 4.41:1 on this gray and fails, so comments get a dedicated darker tone.
const SURFACE = "oklch(92.5% 0.004 250)"; // #e4e6e9 — code block ground
const PLAIN = "oklch(21% 0.012 255)"; // --color-ink        14.20:1
const MUTED = "oklch(43% 0.012 255)"; // --color-ink-muted   6.49:1
const DIM = "oklch(49% 0.010 255)"; // comment tone          5.02:1

// The hues come from --color-tag-* (rust / green / blue / violet / teal), the
// family index.css already describes as "identity, not state" and deliberately
// keeps clear of the caution/verified/warning hues. Reusing it here means syntax
// colour can never be mistaken for a status pill.
//
// Only the lightness changed: the tag tokens sit at 52-62%, which fails on this
// background (green 52% = 4.08:1). Everything below is pinned at 44%, measured.
const RUST = "oklch(44% 0.13 45)"; //    #8a3400   6.58:1
const GREEN = "oklch(44% 0.14 155)"; //  #00672d   5.63:1
const BLUE = "oklch(44% 0.14 235)"; //   #005b93   5.79:1
const VIOLET = "oklch(44% 0.14 300)"; // #603b93   6.64:1
const TEAL = "oklch(44% 0.12 200)"; //   #00646c   5.51:1

const theme = {
    plain: { color: PLAIN, backgroundColor: "transparent" },
    styles: [
        { types: ["comment", "prolog", "doctype", "cdata"], style: { color: DIM, fontStyle: "italic" } },
        { types: ["punctuation", "operator"], style: { color: MUTED } },
        // def / class / import / return / if — the structure words
        { types: ["keyword", "boolean", "important"], style: { color: VIOLET, fontWeight: "700" } },
        // the warm one: string literals, which dominate this post's prompts
        { types: ["string", "char", "attr-value", "inserted", "triple-quoted-string"], style: { color: RUST } },
        { types: ["number", "constant", "symbol"], style: { color: TEAL } },
        { types: ["function", "class-name", "selector"], style: { color: BLUE, fontWeight: "700" } },
        { types: ["builtin"], style: { color: TEAL } },
        { types: ["decorator", "annotation"], style: { color: GREEN, fontWeight: "700" } },
        { types: ["attr-name", "property"], style: { color: BLUE } },
        { types: ["variable", "tag", "deleted"], style: { color: PLAIN } },
    ],
};

// Prism language ids differ from the friendly names used when authoring posts.
const LANGUAGE_ALIASES = {
    sh: "bash",
    shell: "bash",
    console: "bash",
    py: "python",
    text: "plain",
    txt: "plain",
    env: "bash",
};

const LABELS = {
    bash: "shell",
    python: "python",
    json: "json",
    jsx: "jsx",
    js: "javascript",
    plain: "text",
};

/**
 * Renders a `code` content block.
 *
 * Block shape:
 *   { type: "code", language: "python", code: "...", caption?: "...", filename?: "..." }
 *
 * `language` defaults to python — this site's code posts are overwhelmingly
 * Python labs — and falls back to unhighlighted text for anything Prism
 * doesn't know, rather than throwing.
 */
// Fallback for insecure contexts (plain http on a LAN, older browsers) where
// navigator.clipboard is undefined or rejects. Copying is how a reader gets the
// code out of a follow-along post, so it must not fail silently.
const legacyCopy = (text) => {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "-9999px";
    document.body.appendChild(field);
    field.select();
    try {
        return document.execCommand("copy");
    } catch {
        return false;
    } finally {
        document.body.removeChild(field);
    }
};

export const CodeBlock = ({ block }) => {
    // null = idle, true = copied, false = failed
    const [copied, setCopied] = useState(null);

    const raw = (block.code ?? "").replace(/\n+$/, "");
    const requested = (block.language || "python").toLowerCase();
    const language = LANGUAGE_ALIASES[requested] || requested;
    const label = block.filename || LABELS[language] || language;

    const copy = async () => {
        let ok = false;
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(raw);
                ok = true;
            } else {
                ok = legacyCopy(raw);
            }
        } catch {
            ok = legacyCopy(raw);
        }
        // On failure say so, so the reader knows to select the block by hand
        // instead of pasting whatever was on the clipboard before.
        setCopied(ok);
        setTimeout(() => setCopied(null), ok ? 1600 : 3000);
    };

    const buttonText = copied === true ? "Copied" : copied === false ? "Press Ctrl+C" : "Copy";

    return (
        <figure className="my-8">
            <div className="border border-rule" style={{ backgroundColor: SURFACE }}>
                {/* Header strip: language on the left, copy on the right. */}
                <div className="flex items-center justify-between border-b border-rule px-4 py-2">
                    <span className="placard text-ink-muted">{label}</span>
                    <button
                        type="button"
                        onClick={copy}
                        className="placard text-ink-muted transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none"
                        aria-label={`Copy ${label} code to clipboard`}
                    >
                        <span aria-hidden="true">{buttonText}</span>
                        {/* Announced to screen readers only on state change, so the
                            result of the click is not silent for non-sighted readers. */}
                        <span className="sr-only" role="status" aria-live="polite">
                            {copied === true
                                ? "Copied to clipboard"
                                : copied === false
                                  ? "Copy failed. Select the code and press Control or Command C."
                                  : ""}
                        </span>
                    </button>
                </div>

                <Highlight theme={theme} code={raw} language={language}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                            className={`${className} overflow-x-auto px-4 py-4 text-sm leading-relaxed`}
                            style={{ ...style, backgroundColor: "transparent" }}
                            tabIndex={0}
                        >
                            <code className="font-mono">
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </div>
                                ))}
                            </code>
                        </pre>
                    )}
                </Highlight>
            </div>

            {block.caption && (
                <figcaption className="mt-2 placard text-ink-faint">{block.caption}</figcaption>
            )}
        </figure>
    );
};
