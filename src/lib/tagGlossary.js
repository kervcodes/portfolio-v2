// ─────────────────────────────────────────────────────────────────────────────
// tagGlossary.js — one-line definitions for the tech/skill tags on the site.
//
// The tags are jargon. A recruiter or client reading the site may not know
// what "Polars" or "BigPanda" is, so every tag that has an entry here shows
// its definition when the tag is hovered or focused (see components/Tag.jsx).
//
// HOW TO ADD A TAG:
//   Add "Exact Tag Text": "One plain sentence, ~8-16 words." below.
//   Keep it factual and short — it renders in a small tooltip. A tag with no
//   entry still renders; it just has no tooltip.
//
// Keys must match the tag string exactly, the same way tagColors.js keys do.
// ─────────────────────────────────────────────────────────────────────────────

export const TAG_GLOSSARY = {
    // ── Frontend / UI ──────────────────────────────────────────────────────
    React: "JavaScript library for building user interfaces out of reusable components.",
    "React Native": "Framework for building native iOS and Android apps from React code.",
    "Next.js": "React framework with server rendering, routing, and API routes built in.",
    TypeScript: "JavaScript with static types that are checked before the code runs.",
    "Tailwind CSS": "Utility-class CSS framework for styling directly in the markup.",
    Gradio: "Python library that turns a function into a shareable web UI, used for ML demos.",
    Expo: "Toolchain and runtime that simplifies building and shipping React Native apps.",
    Electron: "Framework for building cross-platform desktop apps with a Node.js backend and a web-based UI.",
    Recharts: "Charting library for React, used for dashboard-style data visualization.",

    // ── Backend / data / language ──────────────────────────────────────────
    "Node.js": "JavaScript runtime used for servers, tooling, and build pipelines.",
    Python: "General-purpose language used here for data processing and AI services.",
    PostgreSQL: "Open-source relational database.",
    Supabase: "Hosted Postgres with authentication, file storage, and auto-generated APIs.",
    Prisma: "Type-safe database toolkit and ORM for Node.js and TypeScript.",
    Pydantic: "Python library that validates incoming data against typed models.",
    Polars: "Fast DataFrame library for Python, an alternative to pandas.",
    PyMuPDF: "Python library for reading and extracting text and layout from PDF files.",
    pytest: "The standard testing framework for Python.",
    Ruff: "Fast Python linter and code formatter.",
    uv: "Fast Python package installer and virtual-environment manager.",
    FastAPI: "Python web framework for building APIs, with automatic validation and docs.",
    SQLModel: "Python library combining SQLAlchemy and Pydantic for typed, validated database models.",
    Alembic: "Database migration tool used with SQLAlchemy/SQLModel schemas.",
    pdfplumber: "Python library for extracting text, tables, and layout from PDF files.",

    // ── AI / LLM ───────────────────────────────────────────────────────────
    "OpenAI API": "Hosted API for OpenAI's language models, including tool calling.",
    "Claude API": "Anthropic's API for the Claude family of language models.",
    "Claude Code": "Anthropic's command-line AI coding agent.",
    "Hugging Face Spaces": "Hosting platform for machine-learning apps and interactive demos.",
    Pushover: "Service for sending push notifications to a phone or desktop.",

    // ── Cloud / infrastructure / CI ────────────────────────────────────────
    AWS: "Amazon's cloud platform for compute, storage, networking, and managed services.",
    Vercel: "Hosting and CI platform for frontend and serverless applications.",
    "GitHub Actions": "GitHub's built-in automation for CI/CD and repository workflows.",

    // ── Monitoring / operations ────────────────────────────────────────────
    Datadog: "Monitoring platform for metrics, logs, traces, and alerting.",
    BigPanda: "Alert-correlation platform that groups related alerts into single incidents.",

    // ── Endpoint / directory / IT management ───────────────────────────────
    "Active Directory": "Microsoft's directory service for user accounts, groups, and access.",
    SCCM: "Microsoft tool for deploying software and managing Windows machines at scale.",
    "PDQ Deploy": "Tool for packaging and pushing software to Windows endpoints.",
    ServiceNow: "Enterprise platform for IT service management and ticketing.",
    Zendesk: "Customer-support ticketing and help-desk platform.",
    Windows: "Microsoft's desktop operating system.",
    macOS: "Apple's desktop operating system.",

    // ── Legal technology ───────────────────────────────────────────────────
    iManage: "Document and email management system used by law firms.",
    "Aderant Expert": "Practice and financial management software for law firms.",
    Intapp: "Compliance, intake, and risk software for professional-services firms.",
    CompuLaw: "Court-rules-based deadline and docketing software for legal teams.",

    // ── Third-party services / APIs ────────────────────────────────────────
    Stripe: "Payment processing API for online payments and subscriptions.",
    RevenueCat: "Service for managing in-app purchases and subscriptions across app stores.",
    Clerk: "Drop-in authentication and user management for web applications.",
    Twilio: "API for sending SMS, voice, and other messaging from an application.",
    "Spotify API": "Spotify's web API for catalog, playback, and streaming data.",
    "YouTube API": "Google's API for YouTube video, channel, and analytics data.",
};

// Returns the one-line definition for a tag, or undefined if it isn't in the
// glossary — callers render the tag either way and only add a tooltip when
// this returns something.
export const tagDescription = (label) => TAG_GLOSSARY[label];
