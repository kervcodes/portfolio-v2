---
name: recruiter-facing-portfolio
description: Audit, edit, or implement a software/AI engineer's recruiter-facing portfolio for stronger hiring positioning, truthful evidence, project credibility, case-study integrity, and hiring-manager scanability. Use for portfolio homepages, work/project sections, case studies/build briefs, About/experience content, portfolio metrics, project-status language, recruiter CTAs, and portfolio-wide credibility reviews. Do not use for generic visual redesign, unrelated frontend bugs, resumes alone, job applications alone, or CI-only work.
---

# Recruiter-Facing Portfolio

Own recruiter-facing portfolio decisions.

When this skill is active, it is the primary authority for:
- public career positioning
- truthfulness and defensibility of claims
- project evidence and ordering
- completed vs in-progress status
- recruiter-facing information architecture
- metric verification
- case-study/build-brief integrity
- homepage proof hierarchy

Other skills may support distinct implementation work such as framework syntax, accessibility, testing, or browser QA. They must not override this skill's truth, evidence, status, or hiring-positioning rules.

## Objective

Make the portfolio help a hiring manager quickly conclude that the candidate can already solve relevant technical problems.

Optimize for:
1. credible evidence
2. clear positioning
3. completed and defensible work
4. fast recruiter scanability
5. minimal, coherent implementation changes

Do not optimize for decorative novelty, course activity, or the appearance of being busy.

## Non-negotiable truth standard

Never invent or silently strengthen:
- projects
- project status
- deployment status
- technologies
- architecture
- responsibilities
- dates
- customers or users
- metrics
- business impact
- production usage
- outcomes

Treat repository content as evidence, not automatic truth. Cross-check claims against the strongest available sources in this order when present:

1. canonical career/resume/project evidence files
2. actual implementation and configuration in the repository
3. deployment configuration or documented deployment evidence
4. project documentation
5. existing public portfolio copy

If evidence conflicts, do not choose the stronger claim. Flag the conflict.

Use these claim states internally:
- `supported`
- `needs-owner-verification`
- `unsupported`

Never publish `unsupported` as fact.

## Portfolio evidence rules

### Evidence beats learning activity

Do not use course percentages, sprint percentages, milestone counters, study hours, "not started" checklists, or learning dashboards as primary homepage proof.

Continuing education may remain understated elsewhere when relevant.

### Completed work beats planned work

Feature the strongest completed/deployed and defensible work before unfinished work.

Do not invent projects to fill a desired card count.

A good default ordering is:
1. strongest completed/deployed implementation
2. next strongest completed/deployed implementation
3. strongest relevant work in progress

Change this ordering only when repository evidence clearly justifies it.

### Unfinished work must look unfinished

Use explicit language such as:
- `Currently building`
- `Build brief`
- `What I'm building`
- `Planned architecture`
- `Proposed solution`
- `Next milestone`

Do not use completion language such as:
- `Case study`
- `What I built`
- `Result`
- `Deployed`

unless the underlying evidence supports it.

Remove or hide empty public tabs, dead controls, and placeholder sections that advertise missing work.

### Professional relevance before biography

For About/experience content, prefer this sequence:
1. what the candidate does now
2. why prior experience makes that work stronger
3. broader career journey
4. personal biography

Do not erase useful personal story. Reorder it so relevance appears first.

### Proof-oriented CTA

When the hero needs a portfolio CTA hierarchy, prefer:
1. view selected work
2. resume
3. contact

Preserve the existing design system unless the task explicitly requires redesign.

## Minimal-change rule

Before editing, distinguish recruiter-facing problems from aesthetic preferences.

Do not:
- replace the design system without need
- introduce a new visual direction
- add decorative sections
- add unnecessary libraries
- broadly refactor unrelated code
- rewrite strong copy merely to make it different
- redesign after the hiring problem is already solved

Make the smallest coherent set of changes that improves hiring evidence.

## Workflow

### 1. Read repository instructions first

Inspect applicable `AGENTS.md` files before editing.

Follow user and repository instructions even when they differ from this skill. Never use this skill to bypass higher-priority instructions.

### 2. Inspect before editing

Identify:
- homepage entry point
- hero
- navigation
- selected/current/work section
- project data source
- individual project/case-study pages
- About/experience content
- contact UI
- SEO metadata
- shared content/configuration
- resume/career/project evidence files
- tests, lint, typecheck, and build commands

Report the controlling files and intended changes briefly before a large implementation when the working environment supports progress updates.

### 3. Establish the candidate's current positioning

Determine the intended target role and supporting narrative from canonical project/repo sources.

Do not infer a new target title merely because a technology appears in the codebase.

Check the portfolio for contradictions where:
- the hero says "experienced" but the body reads like a student dashboard
- the target role differs across navigation, SEO, About, contact examples, or projects
- completed and unfinished work use the same status language
- old generic-role copy undermines the new positioning

### 4. Build an evidence inventory

For each public project, record:
- name
- status
- deployed/completed evidence
- technologies supported by code/docs
- strongest technical proof
- customer/user workflow proof if any
- production/reliability proof if any
- metrics and their support level
- whether the project is defensible in an interview

Use the inventory to choose featured work.

Never select a project because it sounds impressive if the repo cannot support it.

### 5. Audit hiring signal

Review at least:
- first-screen role clarity
- evidence visible without deep navigation
- project ordering
- learning-vs-execution balance
- empty or placeholder states
- status labels
- About ordering
- CTA hierarchy
- contact example consistency
- SEO consistency
- quantitative claims

Treat visual polish as secondary unless it materially affects scanability, accessibility, or credibility.

### 6. Audit metrics

Search public content for quantitative claims.

For every metric, classify:
- `supported`
- `needs-owner-verification`
- `unsupported`

Keep supported numbers.

For unsupported numbers, either:
- replace with accurate non-numeric language when the meaning remains useful, or
- remove/flag the claim

Never manufacture a replacement number.

### 7. Propose the minimal patch

Before broad edits, define:
- what stays
- what changes
- what is removed/hidden
- what cannot be completed truthfully
- what requires owner verification

Do not let an implementation request turn into an unrelated redesign.

### 8. Implement

Preserve:
- working routes when practical
- anchors
- accessibility
- semantic heading structure
- responsive behavior
- keyboard navigation
- existing strong visual patterns

If renaming UI labels, avoid breaking underlying URLs unless a route change is actually needed.

### 9. Validate

Run the repository's existing checks where available:
- lint
- typecheck
- tests
- production build

Also verify:
- desktop layout when tooling allows
- mobile layout when tooling allows
- anchor navigation
- removed tabs do not leave dead controls
- selected-work cards remain responsive
- no new placeholders were introduced

Fix errors introduced by the patch.

Do not bury or suppress legitimate failures.

Do not fix unrelated failures unless they block the requested work; report them instead.

### 10. Stop at the hiring objective

When the requested recruiter-facing problems are fixed, stop.

Do not perform a second decorative pass simply because more changes are possible.

## Final report

Return a concise report with these sections when implementation occurred:

### Changed
Actual recruiter-facing changes made.

### Project selection
Which projects were featured/reordered and why the available evidence justified them.

### Truth / verification issues
Claims intentionally not published or strengthened due to insufficient evidence.

### Metrics requiring verification
Every public quantitative claim the owner should personally confirm.

### Files changed
Files modified.

### Validation
Results of lint, typecheck, tests, and build. Distinguish missing scripts from failed checks.

### Deferred
Anything left untouched because it would require:
- invented information
- factual owner verification
- a larger redesign
- project implementation that does not exist yet

## Definition of done

The portfolio should communicate:

> This person already has relevant technical experience and can implement, explain, and defend the work shown here.

It should not primarily communicate:

> This person is taking courses and preparing to become capable later.

The homepage should lead with evidence. Ongoing work should remain clearly ongoing.
