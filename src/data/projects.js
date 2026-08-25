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
//   tabs.buildLog.entries     — [{ date, text }], newest first
//   tabs.result               — { liveUrl?, githubUrl?, improvements?: [] }
//
// CONTENT BLOCK TYPES (used in `tabs.problem.content`):
//   { type: "heading", text: "..." }
//   { type: "paragraph", text: "..." }
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
    {
        slug: "local-bank-statement-analyzer",
        name: "Local Bank Statement Analyzer",
        status: "active", // "standby" | "active" | "completed" — maps to <Status>
        stack: ["Python", "uv", "PyMuPDF", "Pydantic", "Polars", "pytest", "Ruff"],
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
                        text: "A local personal bank statement analysis tool that imports multiple months or years of bank and credit-card statements, extracts and normalizes transactions, and gives one consolidated view of finances across multiple accounts and institutions. Extraction and every calculation run on deterministic Python logic; AI is used only where interpretation adds value, and anything sent to an LLM is stripped or tokenized of PII first, so raw statements and sensitive financial data never leave the machine.",
                    },
                    { type: "heading", text: "What success looks like" },
                    {
                        type: "paragraph",
                        text: "Extracting at least 95% of transactions accurately, with amounts as close to 100% accurate as possible, across multiple statements from multiple banks and accounts. Months or years of statements combine into one normalized dataset that surfaces recurring expenses and how long they've been active, top merchants, fees, income, spending categories, and monthly trends. Duplicate or overlapping transactions get caught, and extracted totals reconcile against the statement balances.",
                    },
                ],
            },
            architecture: {
                images: [],
            },
            keyDecisions: {
                items: [],
            },
            buildLog: {
                entries: [],
            },
            result: {},
        },
    },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
