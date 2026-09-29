// ─────────────────────────────────────────────────────────────────────────────
// career.js — content for the /career kiosk (career fairs, on an iPad).
//
// Nothing here is new. Every line is compressed from something the repo
// already states — src/data/projects.js, src/sections/Experience.jsx,
// About.jsx, Hero.jsx, or public/resume/kervintz_noel_resume.pdf — and the
// comment on each block says which. Technologies that appear in neither the
// site nor the résumé (SNS/SQS, OAuth, Entra ID) are deliberately absent.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {{ label: string, detail: string }} Strength
 * @typedef {{
 *   id: string,
 *   label: string,
 *   lede: string,
 *   strengths: Strength[],
 *   proof: { label: string, href: string },
 * }} HiringTrack
 */

export const POSITIONING = {
  titles: ["AI Solutions Engineer", "Software Engineer", "Production Reliability"],
  statement:
    "I build AI-powered software that works beyond the demo — combining software engineering, APIs, cloud infrastructure, and production reliability.",
  progression: [
    "Enterprise Support",
    "Production Reliability / SRE",
    "Software & AI Engineering",
  ],
};

/** @type {HiringTrack[]} */
export const HIRING_TRACKS = [
  {
    // Twin: tool-calling loop, record_unknown_question, provider fallback.
    // Analyzer: Privacy Gateway, deterministic numbers. Hero: customer-facing
    // troubleshooting. Résumé: REST APIs, enterprise integrations.
    id: "ai",
    label: "AI / Solutions",
    lede: "Turning an LLM into something a business can depend on.",
    strengths: [
      { label: "LLM APIs & tool calling", detail: "OpenAI tool-calling loop in a shipped assistant" },
      { label: "Grounded answers", detail: "Records what it can't answer instead of guessing" },
      { label: "AI boundaries", detail: "Code owns the numbers; the model explains them" },
      { label: "Privacy by design", detail: "Only sanitized fields ever reach a model" },
      { label: "API integrations", detail: "REST, JSON, event-driven enterprise systems" },
      { label: "Customer problems", detail: "Years as the first call when something broke" },
    ],
    proof: { label: "See the AI Digital Twin", href: "#career-twin" },
  },
  {
    // Experience.jsx + About.jsx tool lists; Analyzer stack and build log
    // (FastAPI, SQLite, pytest, 90% coverage floor in CI); résumé REST work.
    id: "software",
    label: "Software Engineering",
    lede: "Full-stack builds, owned from architecture to release.",
    strengths: [
      { label: "React / Next.js", detail: "TypeScript front ends, web and desktop" },
      { label: "Python / FastAPI", detail: "Backend sidecar for a local-first app" },
      { label: "Node.js", detail: "JavaScript across the stack" },
      { label: "API design", detail: "REST endpoints built for production diagnosis" },
      { label: "PostgreSQL / SQLite", detail: "Constraints enforced in the database" },
      { label: "Testing & CI/CD", detail: "pytest with a coverage floor that fails CI" },
    ],
    proof: { label: "See the Bank Statement Analyzer", href: "#career-analyzer" },
  },
  {
    // Résumé: API Gateway, Lambda, DynamoDB, CloudWatch, Datadog synthetics
    // and tiered alerting, BigPanda correlation, Bamboo → GitHub Actions
    // across 15 repos, restoration runbook. Experience.jsx: SRE at Liberty Mutual.
    id: "cloud",
    label: "Cloud / Platform",
    lede: "Site reliability engineering at a Fortune 100 insurer.",
    strengths: [
      { label: "AWS serverless", detail: "Lambda, API Gateway, DynamoDB, CloudWatch" },
      { label: "Datadog", detail: "Synthetic checks and tiered alerting" },
      { label: "BigPanda", detail: "Alert-correlation rules to cut noise" },
      { label: "GitHub Actions", detail: "Migrated CI/CD for 15 repositories off Bamboo" },
      { label: "Incident response", detail: "Root-cause analysis in 24x7 production" },
      { label: "Runbooks", detail: "Infrastructure restoration for high-priority incidents" },
    ],
    proof: { label: "See the experience snapshot", href: "#career-experience" },
  },
  {
    // Résumé + Experience.jsx: Brown Rudnick, Hamilton Brook Smith Reynolds,
    // MassArt; Datadog → ServiceNow alert routing at Liberty Mutual.
    id: "enterprise",
    label: "Enterprise Applications",
    lede: "Tier 2 and 3 escalation for business-critical platforms.",
    strengths: [
      { label: "Enterprise app support", detail: "iManage, Aderant, Intapp, CompuLaw" },
      { label: "ServiceNow", detail: "In the alerting and incident workflow" },
      { label: "System integrations", detail: "Nightly cross-system data synchronization" },
      { label: "Identity & access", detail: "Active Directory, permissions, Citrix" },
      { label: "Endpoint troubleshooting", detail: "Deployment with SCCM and PDQ" },
      { label: "Confidential environments", detail: "Law firms and a Fortune 100 insurer" },
    ],
    proof: { label: "See the experience snapshot", href: "#career-experience" },
  },
];

// Twin: projects.js "digital-twin" — stack, problem copy, hardening build log.
export const TWIN_FEATURE = {
  problem:
    "Recruiters and hiring managers don't always have time to dig through a full résumé or portfolio.",
  built:
    "An AI assistant grounded in my professional background, so you can ask about my experience conversationally — and it says so when it doesn't know.",
  engineering: [
    "Python",
    "OpenAI API",
    "Tool calling",
    "Gradio",
    "Hugging Face Spaces",
    "GitHub Actions",
    "Rate limiting",
    "Provider-error fallback",
  ],
  questions: [
    "What AWS experience does Kervintz have?",
    "What has he built with AI?",
    "Tell me about his production reliability experience.",
    "What kind of software projects has he shipped?",
    "Why would he fit an AI Solutions Engineer role?",
  ],
};

// Analyzer: projects.js "local-bank-statement-analyzer" — keyDecisions,
// build log, and the v1 roadmap statuses. PyMuPDF is NOT listed: the repo
// records it being dropped for pdfplumber on licensing grounds.
export const ANALYZER_FEATURE = {
  summary:
    "A local-first desktop app that turns months of PDF bank statements from different banks into one trustworthy view of where the money goes.",
  pipeline: [
    { label: "PDF Statements", detail: "Each file validated on its own" },
    { label: "Parsing", detail: "pdfplumber, one parser per bank layout" },
    { label: "Normalization", detail: "One canonical schema, money in cents" },
    { label: "Categorization", detail: "Rules first, an LLM only as a last resort" },
    { label: "Financial Analysis", detail: "Deterministic Python, reconciled to the cent" },
  ],
  talkingPoints: [
    {
      label: "Privacy",
      body: "Statements never leave the machine. Anything bound for a model passes a gateway that lets exactly four sanitized fields through.",
    },
    {
      label: "AI boundary",
      body: "The LLM helps categorize and explain. It never produces a financial number.",
    },
    {
      label: "Testing",
      body: "pytest against a 90% coverage floor that fails the suite, the pre-push hook, and CI. The first bank parser is regression-tested against real statements.",
    },
    {
      label: "Product call",
      body: "Dropped PyMuPDF for pdfplumber — AGPL is fine on a server, a real question for an app someone else installs.",
    },
  ],
  stack: ["Electron", "React", "TypeScript", "FastAPI", "Python", "SQLite", "pdfplumber", "pytest"],
  // Straight from the v1 roadmap in projects.js — "verified" vs. not yet.
  working: "Drop in statements from a supported bank and reach a working dashboard, end to end.",
  notYet: "Windows installer, and the AI summary panel.",
};

// Experience.jsx periods + résumé roles. The support stage is described by
// where, not when, because the site (2014) and résumé (2012) disagree on
// its start year.
export const EXPERIENCE_STAGES = [
  {
    stage: "Enterprise IT & support",
    when: "Through 2021",
    where: "Law firms, a public college, enterprise help desks",
    areas: ["Enterprise IT"],
    tools: ["ServiceNow", "Active Directory", "iManage", "SCCM"],
  },
  {
    stage: "Production reliability / SRE",
    when: "2023 — 2025",
    where: "Liberty Mutual Insurance",
    areas: ["Production support & reliability", "Cloud infrastructure"],
    tools: ["AWS", "Datadog", "BigPanda", "GitHub Actions", "APIs"],
  },
  {
    stage: "Software & AI engineering",
    when: "2025 — now",
    where: "Independent, building in public",
    areas: ["Software engineering", "AI engineering"],
    tools: ["Python", "React / Next.js", "FastAPI", "PostgreSQL", "OpenAI API"],
  },
];
