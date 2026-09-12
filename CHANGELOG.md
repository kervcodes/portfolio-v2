# Changelog

Notable changes to the portfolio, newest first. This site deploys
continuously, so entries are grouped by the date they landed on `master`
rather than by release version.

## 2026-09-12

- **Nine missing Build Log posts published, closing the gap between the
  public blog and the case study.** An audit found the "Notes" series stuck
  at Build Log #2 (the schema, Sep 4) while the repo had since shipped
  intake/extraction, the job queue, the Santander parser, dedup, analytics,
  categorization, the Privacy Gateway, an off-plan orphaned-job fix, and all
  six UI screens (build-plan #9 closed, `a1d9b72`). Added Build Log #3
  through #11 — one milestone each, kept short on purpose rather than one
  long retrospective — sourced from `docs/activity.md` in the analyzer
  repo, not estimated. (`src/data/posts.js`)
- **Build Log posts now form a navigable series.** Posts #1–#11 carry
  `series` / `seriesIndex` / `projectSlug`; `PostDetail` renders a "Part N
  of 11 · View the full case study" line under the header and a real
  Previous/Next nav between entries (`src/pages/PostDetail.jsx`). The case
  study's Build Log tab links each dated entry straight to its matching
  post via a new `postSlug` field, rendered as a "Full write-up →" link
  (`src/components/ProjectTabs.jsx`, `src/data/projects.js`). All 11 posts
  remain fully listed on the homepage Notes feed (not `unlisted`) — worth
  revisiting if 13 published posts reads as too much scroll.
- **A "Toward v1" roadmap replaces the empty Result tab.** Ten items
  pulled directly from the analyzer repo's `requirements.md` §20
  Definition of Done, each marked verified / in-progress / not-started
  against what `docs/activity.md` actually confirms — not a guess. Reuses
  the existing `Status` pill component (`src/components/ProjectTabs.jsx`,
  `src/data/projects.js`).
- **Three inaccuracies in the case study fixed.** The "95% extraction
  accuracy" claim wasn't traceable to anything in the analyzer repo —
  replaced with the actual enforced mechanism (zero-tolerance
  reconciliation). The key-decisions entry overstated LLM provider
  symmetry ("Claude and OpenAI both supported") when the repo's locked
  decision is OpenAI primary, Anthropic as a failure-only fallback — wording
  corrected. `stack` was missing Alembic and Recharts, both real
  dependencies referenced elsewhere in the case study's own text.
  (`src/data/projects.js`)
- **Tag glossary gaps closed.** `Electron`, `FastAPI`, `SQLModel`, and
  `pdfplumber` had no hover-definition despite being this project's core
  stack; added alongside new entries for `Alembic` and `Recharts`.
  (`src/lib/tagGlossary.js`)

- **Local Bank Statement Analyzer build log caught up to the actual
  implementation.** The case study's newest entry still ended with "still
  no application code; this was a second design pass, not implementation"
  while the upstream repo had finished build-plan #2 through #9 — schema,
  intake, extraction, job queue, the first bank parser, deduplication,
  analytics, categorization, the Privacy Gateway, and all six UI screens.
  Added ten short entries covering those milestones, dated from the repo's
  `docs/activity.md` rather than estimated, and deliberately kept brief
  instead of one long block. Includes the off-plan orphaned-job fix and
  states the known gap (thin built-in merchant rules leave a large first
  review queue) rather than omitting it. `status` stays `active`; no
  completion language added. (`src/data/projects.js`)
- **Build-log entries can carry screenshots.** `buildLog.entries[]` now
  takes an optional `images` array (`{ src, alt?, caption? }`), rendered
  under the entry text with the same figure/caption markup the
  architecture tab already used. Four labeled screenshots are wired in at
  `public/projects/bank-statement-analyzer-{dashboard,history,review,settings}.png`
  — the live UI's real balances, merchant names, and Zelle counterparty
  details are redacted. (`src/components/ProjectTabs.jsx`,
  `src/data/projects.js`, `public/projects/`)

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
