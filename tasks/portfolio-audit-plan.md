# Portfolio audit — implementation plan

Source: Senior Engineering Manager–style audit of kervintznoel.com (pasted 2026-11-23).
Plan agreed 2026-11-23.

**Framing:** job search is priority #1. This work is timeboxed and runs *alongside*
applications — nothing here gates an application. The audit's own verdict: already
"Book" for AI Solutions / Implementation, Applied AI, FDE.

**Stop rule:** when Phase 1A + 1B ship, the portfolio is done until an interview
says otherwise. Phase 2 gets one item, running in parallel with applications.

---

## Phase 0 — Facts only Kervintz can supply (blocks 1B)

- [ ] Liberty Mutual: exact dates + title ("Site Reliability Engineer" on site vs.
      "Technology Associate, SRE" in audit). Pulse: what it was, what you built, who used it.
      CAST: what you did. Python runtime upgrade: owned or supported?
- [ ] How each metric was measured: ~15% onboarding reduction, 40+ daily requests,
      100+ devices. Undefendable in an interview → remove.
- [ ] "Four independent products owned end to end" (Experience.jsx) — name all four, or reword.
- [ ] Bank analyzer: `pytest --cov` output (real test count + coverage), number of
      supported statement formats. Do NOT publish the audit's "165 tests / 97%" unverified.
- [ ] Property Bill Automation: merged-PR links; are repo + deployment public?

## Phase 1A — Copy fixes, no new facts needed

- [x] Hero tagline → "Software Engineer · Full-Stack Development · Applied AI · Production Reliability"
- [x] Hero bio: drop "I build the ones that don't"; Build / Integrate / Operate framing
- [x] Hero card: drop "turning AI prototypes into dependable systems"
- [x] Analyzer card: reword reconciliation (per-statement is done; cross-account is not)
      and replace "PII never leaves the machine" with the testable claim
- [x] Experience lede: separate 12 years in tech from engineering years; drop "so they don't"
- [x] Independent Engineer entry: drop "advanced coursework" / "production-oriented";
      name the actual projects (product-count claim left for Phase 0)
- [x] Notes → "Engineering Case Notes"; pin the 4 audit-picked posts first
- [x] Move Projects directly under the Hero; update nav/footer order + hero button

## Phase 1B — After Phase 0 answers

- [ ] Liberty Mutual rewrite with specific contributions (reuse career.js Bamboo → GHA, 15 repos)
- [ ] Condense older IT roles
- [ ] Keep/remove each metric per Phase 0
- [ ] Repo / PR / demo links on each case study
- [ ] Resolve "four products" claim

## Phase 2 — Evidence (pick ONE this week)

- [ ] **Recommended:** Digital Twin eval report — ~30 cases (factual, unsupported,
      injection, tool calls, provider failure), publish real pass rates
- [ ] Bank analyzer metrics panel (from Phase 0 numbers)
- [ ] Trade-offs layout — content mostly exists in projects.js, needs surfacing not writing

## Deferred / rejected

| Audit item | Call | Why |
|---|---|---|
| Frontend a11y/perf evidence | Defer | Frontend not a target role; Lighthouse is 10 min if ever needed |
| Skills definitions → capability table | P2 | Worth doing, doesn't move interview outcomes |
| Full 7-section homepage restructure | No | Redesign; only the projects move was taken |
| Architecture diagrams ×3 | Defer | Analyzer already has one; others later |
| ML / Frontend Engineer roles | Ignore | Not targets |
