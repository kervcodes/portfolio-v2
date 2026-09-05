# Changelog

Notable changes to the portfolio, newest first. This site deploys
continuously, so entries are grouped by the date they landed on `master`
rather than by release version.

## 2026-09-04

- **Build Log #1 published, and the post-body renderer's separators
  cleaned up.** New Notes entry "Build Log #1: A Window That Says OK"
  covers the Bank Statement Analyzer's Electron/FastAPI health-check
  milestone. Fixed a double-encoded em dash/arrow artifact in the post's
  copy, removed a duplicate cover-image content block, and merged a
  mis-typed `callout` ("Second: the LLM never touches the numbers.") back
  into its paragraph — it was rendering caps-mismatched against real
  headings since callouts aren't uppercased. In `PostDetail.jsx`: dropped
  the `max-w-[34ch]` clamp on callout text (was leaving it half-width
  under its own full-width rule), then removed the `.rule-head`/`.rule-sub`
  top-rule borders from in-article headings, callouts, and dividers
  entirely — they read as too heavy stacked through a full post — in favor
  of spacing alone. Scoped to post-body content only; `.rule-head` usage
  elsewhere on the site (page headers/footers, Hero, Contact, case studies)
  is untouched. (`src/pages/PostDetail.jsx`, `src/data/posts.js`)
- **Local Bank Statement Analyzer case study reflects the second design
  pass.** The upstream repo replaced its single design-review doc with
  requirements, design-notes, techstack, and build-plan docs, and locked two
  decisions the first pass left open: the app ships as an Electron desktop
  app (not a CLI), and the LLM layer calls a hosted Claude/OpenAI API behind
  the Privacy Gateway rather than a local model. Stack tags updated
  (Electron, React, TypeScript, FastAPI, SQLModel, pdfplumber, Tailwind CSS
  replace the earlier Python-only guess), three key decisions added (desktop
  app over CLI, hosted API over local model, pdfplumber over PyMuPDF for
  licensing), a Sep 2026 build-log entry added, and the architecture
  caption now flags that the diagram predates the Electron/FastAPI split.
  Still no application code, so the Result tab stays empty. Also fixed the
  diagram's top label, which was one long line running through the
  "CROSS-CUTTING" heading on the right — split into two lines and removed
  that now-redundant heading (it had no connecting element to the rail
  boxes below it). (`public/projects/bank-statement-analyzer-architecture.svg`)

## 2026-08-30

- **Local Bank Statement Analyzer case study filled from the architecture
  design pass.** The Architecture, Key decisions, and Build log tabs, until
  now placeholders, are written up from the pre-implementation design: a
  seven-zone pipeline diagram (`public/projects/bank-statement-analyzer-architecture.svg`),
  ten key decisions (upload vs. validation failure, queue carries a
  reference, independent per-statement jobs, OCR as fallback, parsing stops
  at the canonical schema, validation as the trust gate, deterministic code
  owns the numbers, the Privacy Gateway, conservative deduplication,
  temporary PDFs vs. permanent provenance), and two Aug 2026 build-log
  entries. Nothing is built yet, so the Result tab stays empty.
- **Architecture-tab images render at full height.** The case-study
  architecture image dropped `object-cover max-h-130` for `h-auto`, so a
  tall diagram shows in full instead of being cropped. (`src/components/ProjectTabs.jsx`)

## 2026-08-29

- **AI Digital Twin case study reflects the hardening pass.** The upstream
  repo added error handling, a capped tool loop, structured JSON logging, and
  a per-session rate limit. The case study's "what it demonstrates" now names
  the operational layer, a "harden with the standard library" key decision
  and an Aug 2026 build-log entry were added, the architecture diagram shows
  the rate-limit gate and the log line, and the three shipped items dropped
  off "what I'd improve next" (leaving model-context carry-over, a queryable
  store for unanswered questions, and the `@spaces.GPU` check). The Current-
  section card gains a matching sixth milestone.

## 2026-08-28

- **Tag definition tooltips no longer run off-screen on mobile.** The bubble
  is measured when it opens and given an explicit `left` clamped inside the
  viewport, and flips below the chip when there isn't room above. `max-width`
  is capped to the viewport width. (`src/components/Tag.jsx`, `.tag-tip` in
  `src/index.css`)
- **Defined tags show a dotted underline.** Chips that have a glossary
  definition carry the leader-dot underline used elsewhere on the site, so
  it's visible that they can be hovered or tapped; the underline turns amber
  while the definition is open. Chips with no definition are unchanged.
- **Experimental: tinted project cards.** Each project card in the Current
  section gets a faint background colour, picked by a hash of its id the same
  way tag chips pick their border colour. New `--color-tint-*` tokens and
  `src/lib/projectTint.js`. Only the Learning-section cards are affected.
- **Glossary tooltips on tech/skill tags.** Hovering — or tapping / keyboard-
  focusing — a tag chip in the About section, the Experience section, or a
  project case study shows a one-line definition of that technology.
  Definitions live in `src/lib/tagGlossary.js`; the shared chip is
  `src/components/Tag.jsx`; the styling is `.tag-tip` in `src/index.css`.
  - The project cards in the Current section keep **plain** chips. The whole
    card is a link, so a focusable tooltip trigger inside it would nest
    interactive elements. The same tags carry tooltips on the case study
    page, where they are not inside a link.
  - A tag with no glossary entry renders exactly as before, with no tooltip.
- Added the **AI Digital Twin** as a shipped project: a full case study at
  `/projects/digital-twin` (with an architecture diagram) and a "Shipped"
  list at the top of the Current section.

## 2026-08-25

- Replaced SRE Runbook AI with the **Local Bank Statement Analyzer** as the
  active project in the Current section.

## 2026-08-19

- Removed the public course dashboard and the `/sprint` page from the
  homepage.

## 2026-08-16

- Reworked the hero positioning around AI Solutions Engineering.
