# Changelog

Notable changes to the portfolio, newest first. This site deploys
continuously, so entries are grouped by the date they landed on `master`
rather than by release version.

## Unreleased

### Added

- **Glossary tooltips on tech/skill tags.** Hovering — or keyboard-focusing —
  a tag chip in the About section, the Experience section, or a project case
  study now shows a one-line definition of that technology. Definitions live
  in `src/lib/tagGlossary.js`; the shared chip is `src/components/Tag.jsx`;
  the tooltip styling is `.tag-tip` in `src/index.css`.
  - The project cards in the Current section keep **plain** chips. The whole
    card is a link, so a focusable tooltip trigger inside it would nest
    interactive elements. The same tags carry tooltips on the case study
    page, where they are not inside a link.
  - A tag with no glossary entry renders exactly as before, with no tooltip.

## 2026-08

- Added the **AI Digital Twin** as a shipped project: a full case study at
  `/projects/digital-twin` (with an architecture diagram) and a "Shipped"
  list at the top of the Current section.
- Replaced SRE Runbook AI with the **Local Bank Statement Analyzer** as the
  active project in the Current section.
- Removed the public course dashboard and the `/sprint` page from the
  homepage.
- Reworked the hero positioning around AI Solutions Engineering.
