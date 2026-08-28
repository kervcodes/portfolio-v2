# Changelog

Notable changes to the portfolio, newest first. This site deploys
continuously, so entries are grouped by the date they landed on `master`
rather than by release version.

## Unreleased

### Fixed

- **Tag definition tooltips no longer run off-screen on mobile.** The bubble
  is measured when it opens and slid back inside the viewport when the chip
  sits near an edge, and it flips below the chip when there isn't room above.
  `max-width` is also capped to the viewport width. (`src/components/Tag.jsx`,
  `.tag-tip` in `src/index.css`)

### Changed

- **Defined tags now show a dotted underline.** Chips that have a glossary
  definition carry the leader-dot underline used elsewhere on the site, so
  it's visible that they can be hovered or tapped; the underline turns amber
  while the definition is open. Chips with no definition are unchanged.

## 2026-08

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
- Replaced SRE Runbook AI with the **Local Bank Statement Analyzer** as the
  active project in the Current section.
- Removed the public course dashboard and the `/sprint` page from the
  homepage.
- Reworked the hero positioning around AI Solutions Engineering.
