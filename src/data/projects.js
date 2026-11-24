// ─────────────────────────────────────────────────────────────────────────────
// projects.js — Single source of truth for project case studies
//
// HOW TO ADD A NEW CASE STUDY:
//   1. Add an entry to the PROJECTS array below.
//   2. Point the project's card at `/projects/<slug>`.
//   3. That's it — ProjectCaseStudy renders it as five tabs via ProjectTabs.
//
// Each project has five tabs, read from `tabs` below. A tab left empty
// (or omitted) renders a "coming soon" placeholder automatically — leave
// it out rather than filling it with placeholder text of your own.
//
//   tabs.problem.content      — content blocks, see shape below. The
//                                project's `stack` array renders once, as
//                                tags at the bottom of the page.
//   tabs.architecture.images  — [{ src, alt?, caption? }]
//   tabs.keyDecisions.items   — [{ title, body }]
//   tabs.buildLog.entries     — [{ date, text, images? }], newest first.
//                                images is optional: [{ src, alt?, caption? }],
//                                rendered under the entry's text. Use it for
//                                screenshots of what that milestone produced.
//   tabs.result               — { liveUrl?, githubUrl?, improvements?: [] }
//
// OPTIONAL, at the top level of a project:
//   video                     — { youtubeId, title?, caption? } — a demo
//                                video, the first slide of the media slider
//                                under the header. Unlisted YouTube works.
//   gallery                   — [{ src, alt, caption? }] — screenshots that
//                                follow the video in the same slider.
//
// CONTENT BLOCK TYPES (used in `tabs.problem.content`):
//   { type: "heading", text: "..." }
//   { type: "paragraph", text: "..." }
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
    {
        slug: "property-bill-automation",
        name: "Property Bill Automation",
        status: "verified", // shipped and live
        stack: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Python",
            "FastAPI",
            "Pydantic",
            "Supabase",
            "PostgreSQL",
            "Claude API",
            "Gemini API",
            "Playwright",
            "pytest",
            "GitHub Actions",
        ],
        video: {
            youtubeId: "8g-NMv5cdNE",
            title: "Property Bill Automation — demo",
            caption: "End-to-end demo of the finished app. Plays muted; unmute in the player.",
        },
        gallery: [
            {
                src: "/projects/property-bill-automation/dashboard.png",
                alt: "Bill & Invoice dashboard showing the outstanding total, bills due this week, saved drafts, and an invoice history table with approved, rejected, and paid bills.",
                caption: "The Bill & Invoice dashboard, with demo data.",
            },
            {
                src: "/projects/property-bill-automation/new-invoice.png",
                alt: "New invoice form after a PDF upload: ten fields filled from the invoice, with warnings that no vendor account has the account number and that the property address doesn't match the text it was read from.",
                caption: "A new invoice after upload: fields filled from the PDF, with anything that needs checking flagged before the bill is saved.",
            },
            {
                src: "/projects/property-bill-automation/vendors.png",
                alt: "Vendors list with name, email, phone, default payment method, and created date for six vendors.",
                caption: "Vendor management.",
            },
            {
                src: "/projects/property-bill-automation/edit-property.png",
                alt: "Edit property form with property name, street, city, state, and ZIP code fields.",
                caption: "Property management: the address bills are matched against.",
            },
            {
                src: "/projects/property-bill-automation/team-board.png",
                alt: "The team's Kanban board with Triage, To Do, In Progress, Code Review, and Done columns of tickets.",
                caption: "The team's ticket board during the build.",
            },
            {
                src: "/projects/property-bill-automation/ci-runs.png",
                alt: "GitHub Actions page listing passing CI workflow runs on pull requests and on main, 294 runs in total.",
                caption: "The CI workflow, which ran 294 times over the project.",
            },
            {
                src: "/projects/property-bill-automation/migrations-decision.webp",
                alt: "Confluence page titled Database Migrations: Alembic vs Supabase CLI, with a comparison table, reasons for the CLI, the rollback trade-off, working rules, and sources.",
                caption: "My write-up comparing Alembic and the Supabase CLI. Click to read it full size.",
            },
        ],
        // Team project. "My part", the build log, and the key decisions are
        // drawn from Kervintz's own commits and merged PRs in the repo, and
        // from his cohort mentor's written recommendation (Nov 2026).
        tabs: {
            problem: {
                content: [
                    { type: "heading", text: "The problem" },
                    {
                        type: "paragraph",
                        text: "Property management teams handle bills across multiple properties, vendors, due dates, and approval rules. Keeping track of what has been received, approved, and paid means juggling a lot of separate steps.",
                    },
                    { type: "heading", text: "What we built" },
                    {
                        type: "paragraph",
                        text: "A full-stack app that brings those steps into one workflow. Teams manage properties, vendors, and vendor accounts; upload invoices and have an AI provider extract the bill details; review the extraction before a bill is created or updated; route bills for approval; and record payments and review payment runs, with an audit trail of important changes. A browser-based payment agent built on Playwright runs payment runs against demo vendor portals — it is not connected to real banking or payment networks.",
                    },
                    { type: "heading", text: "A team build" },
                    {
                        type: "paragraph",
                        text: "Built by DSD Mighty, a five-person team in the Dallas Software Developers 2026 Commit Your Code cohort — a six-week program where developers join a team and ship a working application together, in October and November 2026. The frontend is Next.js 16 with React 19 and TypeScript; it calls a Python FastAPI backend, which uses Supabase for data, authentication, and invoice storage. Invoice extraction runs on Anthropic or Google Gemini, and GitHub Actions runs CI.",
                    },
                    { type: "heading", text: "My part" },
                    {
                        type: "paragraph",
                        text: "I was a full-stack engineer on the team. I laid the backend foundation — the initial FastAPI service and the GitHub Actions workflow — connected Supabase, and wrote the core database migrations.",
                    },
                    {
                        type: "paragraph",
                        text: "My largest piece was secure invoice PDF upload, which ties together the frontend, backend, authentication, private storage, and the database. It verifies the user, checks that they own the draft bill, validates the PDF, prevents duplicate attachments, and removes the uploaded file if the database write fails — with tests for the access boundaries and the failure cases, not only the expected path. I also built saving and editing draft bills, vendor management, and property management with automatic address matching and mismatch warnings.",
                    },
                    {
                        type: "paragraph",
                        text: "Beyond my own features, I reviewed teammates' pull requests across authentication, invoice processing, payments, and the interface — including catching an authentication error path that could leave a page stuck loading — and wrote tickets that turned project requirements into clear tasks for the team.",
                    },
                ],
            },
            keyDecisions: {
                items: [
                    {
                        title: "Supabase CLI for schema changes, not Alembic",
                        body: "I researched how the team should manage schema changes and wrote up why we should use the Supabase CLI rather than Alembic. The write-up gave the team one clear, documented approach to changing the database.",
                    },
                    {
                        title: "Design the upload for failure, not just success",
                        body: "Invoice upload touches auth, private storage, and the database in one request, so a partial failure is the real risk. The endpoint checks identity and draft ownership before anything is stored, rejects invalid PDFs, prevents duplicate attachments, and deletes the stored file if the database write fails, so storage never holds an orphaned invoice. Tests cover the access boundaries and these failure cases, not just the happy path.",
                    },
                ],
            },
            buildLog: {
                entries: [
                    {
                        date: "Nov 2026",
                        text: "Added property management with automatic address matching and mismatch warnings, and updated the project README.",
                    },
                    {
                        date: "Nov 2026",
                        text: "Built the vendors list page.",
                    },
                    {
                        date: "Nov 2026",
                        text: "Implemented secure invoice PDF upload end to end: user and draft-ownership checks, PDF validation, duplicate-attachment prevention, and cleanup of the stored file when the database write fails, with tests for the access boundaries and failure cases. Added saving and editing draft bills on the dashboard, and addressed code-review feedback on auth-outage handling, tenant tests, and the storage bucket.",
                    },
                    {
                        date: "Oct 2026",
                        text: "Connected Supabase and wrote the core database schema migrations, including new bill fields; aligned the backend's Pydantic enums with the database schema; and documented why the team should use the Supabase CLI rather than Alembic for schema changes.",
                    },
                    {
                        date: "Oct 2026",
                        text: "Initialized the FastAPI backend and project foundation, and fixed the GitHub Actions CI workflow.",
                    },
                ],
            },
            result: {
                liveUrl: "https://cohort-team-2026-dsd-mighty.vercel.app",
                githubUrl: "https://github.com/kervcodes/cohort-team-2026-dsd-mighty",
            },
        },
    },
    {
        slug: "local-bank-statement-analyzer",
        name: "Local Bank Statement Analyzer",
        status: "active", // "standby" | "active" | "verified" (complete) — maps to <Status>
        stack: ["Electron", "React", "TypeScript", "FastAPI", "Python", "SQLModel", "Alembic", "pdfplumber", "Recharts", "Tailwind CSS", "pytest"],
        tabs: {
            problem: {
                content: [
                    { type: "heading", text: "The problem" },
                    {
                        type: "paragraph",
                        text: "People often have subscriptions, recurring expenses, fees, and spending habits spread across different bank accounts and credit cards without realizing how much they're spending or how long certain charges have existed.",
                    },
                    { type: "heading", text: "Who feels it" },
                    {
                        type: "paragraph",
                        text: "Individuals who want a private, long-term overview of their finances without uploading sensitive bank statements to an external financial service.",
                    },
                    { type: "heading", text: "What I'm building" },
                    {
                        type: "paragraph",
                        text: "A downloadable, local-first desktop app (Electron + a Python backend) that imports multiple months or years of bank and credit-card statements, extracts and normalizes transactions, and gives one consolidated view of finances across multiple accounts and institutions. Extraction and every calculation run on deterministic Python logic; AI is used only where interpretation adds value, and anything sent to an LLM is stripped of PII first through a dedicated Privacy Gateway, so raw statements and sensitive financial data never leave the machine.",
                    },
                    { type: "heading", text: "What success looks like" },
                    {
                        type: "paragraph",
                        text: "Every statement's extracted transactions reconcile exactly against its own opening balance, credits, debits, and closing balance — zero tolerance, not an approximate match — across multiple statements from multiple banks and accounts. Months or years of statements combine into one normalized dataset that surfaces recurring expenses and how long they've been active, top merchants, fees, income, spending categories, and monthly trends. Duplicate or overlapping transactions get caught without deleting anything on ambiguous evidence.",
                    },
                ],
            },
            architecture: {
                images: [
                    {
                        src: "/projects/bank-statement-analyzer-architecture.svg",
                        alt: "Seven-zone local pipeline for the Bank Statement Analyzer: user selects PDF statements; intake uploads, validates, and creates a batch with one job per file; a queue and worker pool process jobs with selective retries; extraction chooses native text or an OCR fallback, detects the bank and statement format, runs a versioned parser into a canonical transaction schema, resolves account identity, and runs financial validation; validated data is deduplicated into a unified ledger in the application data store; a deterministic analytics engine produces every figure while a Privacy Gateway sanitizes anything sent to a local LLM for categorization help and plain-English explanation; outputs are a dashboard, report, and CSV/JSON export with a coverage summary, after which raw PDFs are deleted. A batch coordinator, temporary file storage, and the application data store run across the pipeline.",
                        caption:
                            "The architecture, designed decision by decision before any code. The whole pipeline runs locally: raw statements never leave the machine, and only sanitized, task-specific payloads reach a model. Each zone was justified against three questions — what problem it solves, why it is its own responsibility, and what breaks if it is removed or merged. The seven zones still hold; the concrete stack has since locked in as an Electron desktop app with a FastAPI sidecar (see Build log), which this diagram doesn't show yet.",
                    },
                ],
            },
            keyDecisions: {
                items: [
                    {
                        title: "Upload failure and validation failure are separate states",
                        body: "\"We never received the file\" and \"we received it but refuse to process it\" are different problems with different user messages and different recovery. Collapsing them into one \"error\" state would hide which one happened and make the privacy boundary harder to reason about. Invalid files are rejected before any expensive or sensitive processing begins, and never enter the queue.",
                    },
                    {
                        title: "The queue carries a file reference, not the PDF",
                        body: "A user importing two years across five banks is over a hundred statements. Queue messages hold a job id, batch id, and a pointer to temporary storage — never the bytes. Putting whole PDFs in the queue creates size limits, memory pressure, and retry headaches; a small pointer avoids all of it and keeps the sensitive document in one place with one lifecycle.",
                    },
                    {
                        title: "Each statement is an independent job",
                        body: "One statement failing OCR must not destroy the successful results from other banks in the same batch. Every file becomes its own job with its own status; a batch coordinator tracks the whole set and only starts aggregation once every job is terminal. A batch with three failures out of a hundred and twenty still produces analysis — with the three exclusions shown.",
                    },
                    {
                        title: "OCR is a fallback, not the default path",
                        body: "OCR is slower, more expensive, and introduces more extraction errors than reading embedded text. The extractor first checks whether the PDF contains usable embedded text — not just any text, since a PDF can hold garbled characters — and only falls back to OCR when it doesn't.",
                    },
                    {
                        title: "Bank-specific parsing stops at the canonical schema",
                        body: "Chase, Bank of America, and Capital One expose transactions in different layouts, so each needs its own parser — versioned independently of the bank name, because a bank can redesign its statements. But every parser must emit the same normalized transaction shape. After that boundary, nothing downstream knows or cares which bank a transaction came from, which keeps analytics from turning into a chain of per-bank special cases.",
                    },
                    {
                        title: "Validation is the trust gate, separate from extraction confidence",
                        body: "\"Did we extract the fields correctly?\" and \"does the resulting financial data make sense?\" are different questions. A parser can be confident and still produce numbers that don't reconcile. Validation runs structural checks, per-transaction checks, and balance reconciliation, and returns VALID / WARNING / FAILED rather than a single pass/fail — so a lone low-confidence transaction is treated differently from a closing balance that is off by thousands.",
                    },
                    {
                        title: "Deterministic code owns the numbers; the LLM only explains them",
                        body: "Every figure — monthly spend, net cash flow, recurring charges, category and merchant totals — comes from application logic, not a model. The LLM sits after the analytics engine and turns structured facts into plain English. It never calculates financial truth, so a hallucinated number can't reach the report.",
                    },
                    {
                        title: "The Privacy Gateway is a mandatory gateway, not a late-stage box",
                        body: "Both paths that reach a model — low-confidence categorization and analytics explanation — go through one sanitizer that strips account numbers, names, addresses, and identifiers and builds a task-specific payload with the minimum data required. Model location isn't the privacy control; sanitization is. Swapping a local model for a hosted API later wouldn't change the boundary.",
                    },
                    {
                        title: "Conservative deduplication",
                        body: "Bank statements often lack timestamps, so dedup matches on the strongest combination of fields available. Transactions are removed automatically only when confidence is high; ambiguous matches are kept and flagged. Deleting a real $500 transaction is worse than briefly showing a possible duplicate, and every transaction stays traceable to its source statement and page.",
                    },
                    {
                        title: "Raw PDFs are temporary; provenance is permanent",
                        body: "Raw statements are processing artifacts with a defined lifecycle — deleted once the canonical data is persisted, unless the user chooses to keep them. Non-sensitive provenance metadata (source statement, page, parser version) is retained, so a user questioning a number can still trace it back after the original PDF is gone.",
                    },
                    {
                        title: "It ships as a desktop app, not a CLI or a hosted service",
                        body: "A single local user running background jobs across a hundred-plus statements needs a persistent, responsive UI while processing continues — not a terminal session or a server to operate. Electron pairs a React renderer with a Python backend spawned as a local sidecar, which keeps the deterministic pipeline in Python while giving the app a real interface, packaged as a Windows (and later macOS) installer with no hosting bill.",
                    },
                    {
                        title: "The LLM sits behind a hosted API, not a local model",
                        body: "Model location was never the privacy control — the Privacy Gateway's sanitization is. That decoupling means a hosted API can be used without weakening the privacy story. OpenAI is the primary provider with Anthropic as an automatic fallback that fires only on a provider failure, not a weak answer, behind one provider interface, bring-your-own-key, so nothing routes through infrastructure I'd have to operate or pay for.",
                    },
                    {
                        title: "PyMuPDF dropped for a licensing reason, not a capability one",
                        body: "PyMuPDF (fitz) is faster and more convenient, but it's AGPL-licensed or requires a paid commercial license from Artifex. That's a non-issue for code run on my own server; it's a real question for a binary handed to someone else to install. Extraction moved to the permissively-licensed pdfplumber, with an explicit note that the AGPL terms would've been a reasonable call to make consciously — just not by accident.",
                    },
                ],
            },
            buildLog: {
                entries: [
                    {
                        date: "Sep 11, 2026",
                        text: "Accounts and Settings finished the UI — all six screens are now real. API keys are encrypted with Electron's safeStorage and passed to the backend as environment variables at spawn, so the Python side never persists a secret and the renderer only ever sees a hasKey boolean. The raw-PDF retention toggle is actually enforced: a job's PDF is deleted once it reaches a terminal status unless retention is on. Known gap before packaging: the built-in merchant rules are thin, so a first import still leaves a large review queue.",
                        postSlug: "build-log-11-the-key-the-app-never-writes-to-disk-in-plain-text",
                        images: [
                            {
                                src: "/projects/bank-statement-analyzer-settings.png",
                                alt: "Settings screen of the Bank Statement Analyzer",
                                caption: "Settings — LLM provider, test-before-save key entry, retention toggle, category rules.",
                            },
                        ],
                    },
                    {
                        date: "Sep 11, 2026",
                        text: "Dashboard and Review went in, plus a linkable transaction drawer used as the drill-through from every clickable number. Every total on the Dashboard is shown next to a coverage summary — statements included versus excluded, and the ledger's real date span — because a spending figure computed over an unknown slice of the data isn't worth showing. Review is one inbox for possible duplicates, low-confidence categorizations, and failed statements.",
                        postSlug: "build-log-10-a-number-you-cant-click-through-isnt-trustworthy",
                        images: [
                            {
                                src: "/projects/bank-statement-analyzer-dashboard.png",
                                alt: "Dashboard of the Bank Statement Analyzer showing cash flow and spending by category",
                                caption: "Dashboard — cash flow, spending by category, recurring charges, each chart with a table fallback.",
                            },
                            {
                                src: "/projects/bank-statement-analyzer-review.png",
                                alt: "Review queue of the Bank Statement Analyzer",
                                caption: "Review — transactions the rules couldn't place confidently, batched by merchant.",
                            },
                        ],
                    },
                    {
                        date: "Sep 11, 2026",
                        text: "Fixed a bug found by running the app rather than the tests: a job left in PROCESSING when the backend died was never picked up again, so the batch sat unfinished forever. Orphaned jobs are now recovered on worker startup.",
                        postSlug: "build-log-9-the-batch-that-got-stuck-at-zero-of-six",
                    },
                    {
                        date: "Sep 8, 2026",
                        text: "First UI slice: app shell, an Import screen that surfaces the backend's per-file accept/reject reason instead of one batch-level error, and a History screen listing every batch and the validation status of each statement inside it.",
                        postSlug: "build-log-8-the-backend-had-been-invisible-for-a-month",
                        images: [
                            {
                                src: "/projects/bank-statement-analyzer-history.png",
                                alt: "History screen of the Bank Statement Analyzer listing imported batches",
                                caption: "History — batches expand to show each statement and whether it reconciled.",
                            },
                        ],
                    },
                    {
                        date: "Sep 8, 2026",
                        text: "Categorization and the Privacy Gateway. Categories resolve through a fixed hierarchy — user override, saved merchant rule, deterministic keyword map, then one LLM call only for merchants the rules can't place — and a prediction is used only above a 0.75 confidence gate; below it the transaction goes to Review rather than getting a label it can't defend. The automated guess is stored separately from the override, so deleting a rule restores it without a bulk rewrite. The gateway is an allowlist, not a scrubber: exactly four fields leave the machine, built from primitives so a raw transaction object can't be serialized by accident, and it fails closed to Review on anything it can't sanitize.",
                        postSlug: "build-log-7-the-gateway-that-only-lets-four-fields-through",
                    },
                    {
                        date: "Sep 8, 2026",
                        text: "Deduplication and the analytics engine. Identical re-uploads collapse automatically and partial overlaps — a \"last 90 days\" statement crossing monthly ones — get flagged rather than merged; nothing is ever deleted, a duplicate row just stops counting toward the ledger. Analytics computes cash flow, categories, recurring charges and trends in deterministic Python over that ledger, money in integer cents, no LLM anywhere near a number.",
                        postSlug: "build-log-6-nothing-gets-deleted-on-a-guess",
                    },
                    {
                        date: "Sep 8, 2026",
                        text: "First parser end to end: Santander checking, regression-tested against real statements. The bank, account type and layout version are detected from the statement's content rather than its filename, with a confidence score — below threshold the job is marked unsupported and produces no statement at all. Anything that does parse has to reconcile to the cent (opening + credits − debits == closing) before it's trusted.",
                        postSlug: "build-log-5-teaching-the-app-to-read-one-real-bank-statement",
                    },
                    {
                        date: "Sep 6, 2026",
                        text: "Background job queue — one job per statement, backed by SQLite with no external broker. One file failing OCR can't take down the other statements in the same import, and a coordinator only closes the batch once every job is terminal, marking it completed-with-warnings if anything was excluded.",
                        postSlug: "build-log-4-one-statement-cant-take-down-the-batch",
                    },
                    {
                        date: "Sep 5, 2026",
                        text: "Intake validation and extraction. Each uploaded file is validated independently with a specific rejection reason (not a PDF, corrupted, password-protected, too large, too many pages) and tracked from submission onward. Extraction reads native PDF text with pdfplumber and falls back to OCR only per-page, when a page has no usable embedded text.",
                        postSlug: "build-log-3-the-encrypted-pdf-that-wasnt-password-protected",
                    },
                    {
                        date: "Sep 4, 2026",
                        text: "Implementation started. Monorepo scaffolded — Electron spawns the FastAPI backend as a local sidecar — and the canonical schema built on SQLModel with migrations, money as integer cents, and constraints enforced at the database level rather than trusted to application code. Backend tests run against a 90% coverage floor that fails the suite, the pre-push hook, and CI.",
                        postSlug: "build-log-1-a-window-that-says-ok",
                    },
                    {
                        date: "Sep 2026",
                        text: "Replaced the single design-review doc with four focused ones — requirements, design-notes, techstack, build-plan — plus project-level Claude instructions, and locked two decisions the original design pass had left open: the app ships as a downloadable Electron desktop app (not a CLI), and the LLM layer calls a hosted Claude/OpenAI API behind the Privacy Gateway rather than a local model. Confirmed the first wave of institutions to build parsers for — five banks, six credit-card issuers — and sequenced the first ten build prompts, starting with the canonical schema and extraction pipeline before any UI. Still no application code; this was a second design pass, not implementation.",
                    },
                    {
                        date: "Aug 2026",
                        text: "Architecture design pass, before writing code. Walked the full path from upload to report in thirteen layers, forcing each component to justify itself against three questions: what problem it solves, why it exists as its own responsibility, and what breaks if it is removed or merged. Settled the intake boundary, the queue, background workers and selective retries, the extraction strategy, the canonical schema, account identity, financial validation, cross-statement aggregation and deduplication, categorization, the LLM privacy boundary, and the output and cleanup zones — then grouped them into seven zones and locked the invariants each one enforces.",
                    },
                    {
                        date: "Aug 2026",
                        text: "Scoped v1 to keep the design defensible rather than impressive. PDF bank statements only — images, CSV imports, OFX/QFX, and direct bank connections are explicitly out of scope. No dead-letter queues or complex backoff yet; three attempts per statement is enough because the user still holds the originals. Storage stays an abstraction — temporary file storage for raw PDFs, an application data store for normalized data — with no database chosen until there is a reason to.",
                    },
                ],
            },
            result: {
                // Sourced from the repo's own requirements.md §20 "v1 Definition of
                // Done" checklist, cross-checked against docs/activity.md for what's
                // actually been built and verified vs. only tested vs. not started.
                roadmap: [
                    {
                        label: "Drop in PDFs for a confirmed institution and reach a working Dashboard end to end, no manual steps outside the app.",
                        status: "verified",
                    },
                    {
                        label: "Coverage, warnings, and excluded statements are visible on the Dashboard without digging into logs.",
                        status: "verified",
                    },
                    {
                        label: "A batch with a corrupted or password-protected PDF still processes every other valid statement in it.",
                        status: "verified",
                    },
                    {
                        label: "Reconciliation validation flags a statement where the numbers don't add up.",
                        status: "verified",
                    },
                    {
                        label: "Deduplication auto-collapses a true duplicate and flags — without deleting — a genuinely ambiguous match.",
                        status: "verified",
                    },
                    {
                        label: "The app works fully — analytics, categorization, the dashboard — with no LLM key configured.",
                        status: "verified",
                    },
                    {
                        label: "With a provider key configured, the AI summary renders visibly separate from computed figures.",
                        status: "active",
                    },
                    {
                        label: "Every reported number is clickable through to its source transactions and statement page.",
                        status: "verified",
                    },
                    {
                        label: "Raw PDFs are actually deleted from disk after processing, unless retention is turned on.",
                        status: "active",
                    },
                    {
                        label: "The app packages into a Windows installer that runs on a machine with no Python or Node installed.",
                        status: "standby",
                    },
                ],
            },
        },
    },
    {
        slug: "digital-twin",
        name: "AI Digital Twin",
        status: "verified", // shipped and live at /twin
        stack: [
            "Python",
            "OpenAI API",
            "Gradio",
            "Hugging Face Spaces",
            "GitHub Actions",
            "uv",
            "Pushover",
        ],
        tabs: {
            problem: {
                content: [
                    { type: "heading", text: "The problem" },
                    {
                        type: "paragraph",
                        text: "A portfolio makes a recruiter or potential client do the work: read the About section, open a case study, cross-reference the resume, guess whether a specific background fits their role. Most visitors have about a minute and a narrow question they never get to ask.",
                    },
                    { type: "heading", text: "Who feels it" },
                    {
                        type: "paragraph",
                        text: "Recruiters, hiring managers, and prospective clients screening for a specific fit — cloud, reliability, AI engineering, implementation work — who want a direct answer rather than a tour of the site.",
                    },
                    { type: "heading", text: "What I built" },
                    {
                        type: "paragraph",
                        text: "An AI assistant that answers questions about my background, experience, and projects in my own framing. It is grounded in a curated professional summary and my LinkedIn export, refuses to invent anything it wasn't told, captures contact details when a visitor wants a follow-up, and flags any question it couldn't answer so I can improve the source material. It runs as its own page and embeds directly into the portfolio at /twin.",
                    },
                    { type: "heading", text: "What it demonstrates" },
                    {
                        type: "paragraph",
                        text: "A deployed LLM application end to end: system-prompt grounding, an OpenAI tool-calling loop, function tools wired to a real notification channel, standalone and embedded delivery, and a push-to-deploy pipeline to Hugging Face Spaces. Because it is a public endpoint on a personal API key, it also carries the operational layer — graceful degradation on provider errors, a capped tool loop, structured per-request logging, and a per-session rate limit. It is a course exercise taken well past the course: its own repo, its own docs, its own CI/CD.",
                    },
                ],
            },
            architecture: {
                images: [
                    {
                        src: "/projects/digital-twin-architecture.svg",
                        alt: "Request path from visitor through the portfolio SPA and an embedded iframe into a Gradio Hugging Face Space: a per-session rate-limit gate, then context building, an OpenAI tool-calling loop with graceful error fallback, notification tools, and one JSON log line per turn; plus the push-to-main deploy pipeline through GitHub Actions to the Space.",
                        caption:
                            "The portfolio embeds the Space in an iframe with ?embedded=1, which tells the Gradio app to drop its own chrome. Inside, every turn passes a per-session rate limit, runs a capped tool loop that falls back to a calm message on any provider error, and emits one structured log line. Every push to main triggers a GitHub Action that strips .github, squashes the tree onto an orphan branch, and force-pushes that snapshot to the Space.",
                    },
                ],
            },
            keyDecisions: {
                items: [
                    {
                        title: "Curated context in the system prompt, not RAG",
                        body: "The knowledge base is one person's bio: a hand-written summary plus a LinkedIn PDF. context.py builds a single system prompt from both at startup. A vector store would add infrastructure and retrieval failure modes to solve a problem this corpus doesn't have — it fits in the prompt.",
                    },
                    {
                        title: "Record the gap instead of guessing",
                        body: "When the twin doesn't know something, it calls record_unknown_question rather than filling the space with a plausible answer. A recruiter-facing assistant that invents a credential is worse than one that says it will find out, so the honest path is the one wired to a tool.",
                    },
                    {
                        title: "Tools reach a channel I actually watch",
                        body: "record_user_details and record_unknown_question send Pushover notifications, not database rows. For a single-user side project the goal is that I see a hot lead or a missing answer the same day — a push notification does that; a table I have to remember to check does not.",
                    },
                    {
                        title: "Embed by contract, not by restyling",
                        body: "Adding ?embedded=1 to the Space URL switches the Gradio app to a layout with no topbar, so the portfolio's own nav is the only one on the page. The portfolio side documents this contract in Twin.jsx so the two repos stay in sync.",
                    },
                    {
                        title: "One repo, deploy by snapshot",
                        body: "GitHub Actions checks out the repo, removes .github, commits the rest to an orphan branch, and force-pushes a squashed snapshot to the Space. The Space history stays a clean single commit, the CI token is the only secret in transit, and there is no gradio deploy step to break.",
                    },
                    {
                        title: "Harden with the standard library, not a platform",
                        body: "The reliability pass is roughly 80 lines of stdlib: a JSON-per-line logger writing to stdout (which the Space already captures) and an in-memory sliding-window rate limit. No new dependency, no datastore, nothing to operate. The in-memory state resets on restart and isn't shared across replicas — for a single-replica personal Space that's the right trade, and both limits are env-tunable without a redeploy.",
                    },
                ],
            },
            buildLog: {
                entries: [
                    {
                        date: "Aug 2026",
                        text: "Hardening pass, timeboxed. Wrapped the OpenAI and Pushover calls so any provider error — rate limit, timeout, bad response — shows a calm fallback in the chat instead of a traceback; capped the tool loop at five rounds; made the model id a required env var so a misconfig fails at startup, not per visitor. Added JSON-per-line request logging (latency, tool calls, tokens, correlated by request id) and a per-session sliding-window rate limit with unit tests. Also repaired the tool-call retry, which had been dropping its generation settings.",
                    },
                    {
                        date: "Aug 2026",
                        text: "Code-review pass on the shipped app. Logged the next hardening scope: no error handling around the OpenAI and Pushover calls, no per-session rate limit on a public endpoint, and tool-call results being dropped from the model's conversation state between turns. Scoped as a timeboxed follow-up, explicitly not a rebuild.",
                    },
                    {
                        date: "Aug 2026",
                        text: "Replaced the default Hugging Face README with real project docs and wrote up the GitHub Actions deploy workflow — checkout, strip .github, squash onto an orphan branch, force-push to the Space.",
                    },
                    {
                        date: "Aug 2026",
                        text: "Reskinned the Gradio UI to match the portfolio's design system and added embedded mode. Pinned the app shell to the exact viewport height to kill a double scrollbar inside the iframe.",
                    },
                    {
                        date: "Jul 2026",
                        text: "First working version: Gradio chat interface with an OpenAI tool-calling loop, system prompt assembled from summary.txt and linkedin.pdf, and the two capture tools wired to Pushover.",
                    },
                ],
            },
            result: {
                liveUrl: "https://www.kervintznoel.com/twin",
                githubUrl: "https://github.com/kervcodes/Digital-Twin",
                improvements: [
                    "Carry tool-call and tool-result messages into the next turn's model context — held in a gr.State separate from the displayed chat — so a visitor who gives their email and then changes the subject isn't asked for it again.",
                    "Persist unanswered questions somewhere queryable instead of only firing a push notification.",
                    "Confirm the @spaces.GPU decorator is actually needed; if the Space doesn't require ZeroGPU it's requesting an unused allocation per request.",
                ],
            },
        },
    },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
