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
