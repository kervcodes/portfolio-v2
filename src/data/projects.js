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
//   tabs.problem.content      — content blocks, see shape below. The tab
//                                also auto-appends a "Stack" line from
//                                the project's `stack` array.
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
        slug: "sre-runbook-ai",
        name: "SRE Runbook AI",
        status: "active", // "standby" | "active" | "completed" — maps to <Status>
        stack: ["Next.js", "Claude API", "Supabase", "Tailwind CSS", "Vercel"],
        tabs: {
            problem: {
                content: [
                    { type: "heading", text: "The problem" },
                    {
                        type: "paragraph",
                        text: "When an alert fires at 2am, the first 10-15 minutes go to the same repetitive work every time: reading the alert, guessing likely causes, remembering which runbook applies, deciding severity, and drafting a status update, all before you've touched the actual fix. That triage tax gets paid by every on-call engineer, on every incident, regardless of how experienced they are. Teams write runbooks to solve this, but runbooks go stale, live in five different wikis, and don't adapt to the specific alert in front of you.",
                    },
                    { type: "heading", text: "Who feels it" },
                    {
                        type: "paragraph",
                        text: "On-call engineers at any team running production services with paging (Datadog, PagerDuty, CloudWatch). Teams without a dedicated incident commander feel it hardest, since there's no one to do the triage thinking for you.",
                    },
                    { type: "heading", text: "What I'm building" },
                    {
                        type: "paragraph",
                        text: "A tool that takes a raw alert (the actual payload or copied text, not a cleaned-up description) and returns a structured runbook in seconds: likely causes ranked by confidence, concrete next steps flagged by risk (safe to run vs. destructive), an escalation recommendation, and a draft status update. A second mode turns incident notes into a postmortem using the same \"structure, not prose\" approach.",
                    },
                    { type: "heading", text: "Why I could build this" },
                    {
                        type: "paragraph",
                        text: "Four years of on-call and production troubleshooting at a Fortune 100 company across four SRE teams (Pulse system health, Datadog/BigPanda monitoring, incident response) means I know what a real runbook needs to contain, and where the generic version fails: unlabeled risk on suggested commands, causes that ignore the specific service, escalation guidance that's really just \"ask someone else.\"",
                    },
                ],
            },
            architecture: {
                images: [],
            },
            keyDecisions: {
                // Held back until this tab is ready to launch — restore into
                // `items` above when the write-up is ready:
                // { title: "Tool calling over prompt-and-parse", body: "Reliable structured output matters more than flexibility here — a runbook the caller can't parse isn't a runbook." },
                // { title: "No agent framework or vector DB", body: "The alert payload is small and the domain logic lives in the prompt, not in retrieval — pulling in an agent framework or a vector store would add moving parts with nothing yet for them to do." },
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
