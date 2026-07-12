// ─────────────────────────────────────────────────────────────────────────────
// Learning.jsx — 8-Week AI Engineer Sprint
//
// HOW TO UPDATE AS YOU PROGRESS:
//   1. Change `currentWeek` to whatever week you're on.
//   2. In COURSES, set `status: "completed"` when you finish a course.
//   3. In PROJECTS, update `status` ("upcoming" → "in-progress" → "completed")
//      and check off `milestones` as you hit them.
//   4. That's it. The UI reflects your real progress automatically.
// ─────────────────────────────────────────────────────────────────────────────

const currentWeek = 1; // ← UPDATE THIS each week

const COURSES = [
    {
        id: "n8n",
        name: "AI Builder: n8n Agents & Voice Agents",
        hours: 14.5,
        status: "in-progress", // "upcoming" | "in-progress" | "completed"
        pct: 41,
        tags: ["n8n", "Voice Agents", "Automation"],
    },
    {
        id: "traversy",
        name: "Coding With AI — Planning To Production",
        hours: 16.5,
        status: "in-progress",
        pct: 47,
        tags: ["AI Tools", "Cursor", "Workflow"],
    },
    {
        id: "core",
        name: "AI Engineer Core Track",
        hours: 33.5,
        status: "in-progress",
        pct: 7,
        tags: ["LLMs", "RAG", "QLoRA", "Embeddings"],
    },
    {
        id: "prod",
        name: "AI Engineer Production Track",
        hours: 18.5,
        status: "in-progress",
        pct: 30,
        tags: ["AWS Bedrock", "Lambda", "Deploy at Scale"],
    },
    {
        id: "coder",
        name: "AI Coder: Claude Code & Coding Agents",
        hours: 16.5,
        status: "upcoming",
        pct: 14,
        tags: ["Claude Code", "Coding Agents", "MCP"],
    },
    {
        id: "agentic",
        name: "AI Engineer Agentic Track",
        hours: 21,
        status: "upcoming",
        pct: 9,
        tags: ["Agents", "MCP", "LangGraph", "CrewAI"],
    },
];

const PROJECTS = [
    {
        id: "sre-runbook-ai",
        name: "SRE Runbook AI",
        description:
            "Paste an incident alert, get a structured runbook and postmortem back instantly. A Next.js SaaS app powered by the Claude API -- built from 5 years of real incident response experience at Liberty Mutual.",
        weeks: "Weeks 1–3",
        status: "in-progress",
        stack: ["Next.js", "Claude API", "Supabase", "Tailwind CSS", "Vercel"],
        milestones: [
            { label: "Define alert schema and runbook output format", done: false },
            { label: "Build Claude API integration with structured prompts", done: false },
            { label: "Create Next.js UI: paste alert, get runbook", done: false },
            { label: "Add postmortem generation mode", done: false },
            { label: "Deploy to Vercel + live demo", done: false },
        ],
        demoUrl: null,
        githubUrl: null,
    },
    // {
    //     id: "haitibillboard-ai",
    //     name: "HaitiBillboard AI Layer",
    //     description: "...",
    //     weeks: "Weeks 3–5",
    //     status: "upcoming",
    //     stack: ["FastAPI", "pgvector", "OpenAI", "YouTube API", "Last.fm API", "PostgreSQL"],
    //     milestones: [],
    //     demoUrl: null,
    //     githubUrl: null,
    // },
    // {
    //     id: "law-firm-voice",
    //     name: "Law Firm Voice Assistant",
    //     description: "...",
    //     weeks: "Weeks 5–6",
    //     status: "upcoming",
    //     stack: ["n8n", "Supabase", "OpenAI", "ElevenLabs", "RAG"],
    //     milestones: [],
    //     demoUrl: null,
    //     githubUrl: null,
    // },
    // {
    //     id: "agentic-capstone",
    //     name: "Agentic SRE Upgrade",
    //     description: "...",
    //     weeks: "Weeks 7–8",
    //     status: "upcoming",
    //     stack: ["LangGraph", "MCP", "Claude API", "Slack API", "Jira API"],
    //     milestones: [],
    //     demoUrl: null,
    //     githubUrl: null,
    // },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig = {
    completed: {
        label: "Completed",
        dot: "bg-emerald-400",
        badge: "bg-emerald-400/10 text-emerald-600 border-emerald-300",
        ring: "border-emerald-200",
    },
    "in-progress": {
        label: "In Progress",
        dot: "bg-primary animate-pulse",
        badge: "bg-primary/10 text-primary border-primary/30",
        ring: "border-primary/20",
    },
    upcoming: {
        label: "Upcoming",
        dot: "bg-muted-foreground/40",
        badge: "bg-muted text-muted-foreground border-border",
        ring: "border-border",
    },
};

const completedCourses = COURSES.filter((c) => c.status === "completed").length;
const completedProjects = PROJECTS.filter((p) => p.status === "completed").length;
const totalMilestones = PROJECTS.reduce((sum, p) => sum + p.milestones.length, 0);
const doneMilestones = PROJECTS.reduce(
    (sum, p) => sum + p.milestones.filter((m) => m.done).length,
    0
);
const overallPct = Math.round(
    ((completedCourses + doneMilestones) / (COURSES.length + totalMilestones)) * 100
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status] || statusConfig.upcoming;
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.badge}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
};

const ProgressBar = ({ pct, status }) => {
    const fill =
        status === "completed"
            ? "bg-emerald-400"
            : status === "in-progress"
            ? "bg-primary"
            : "bg-muted-foreground/30";
    return (
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-2">
            <div
                className={`h-full rounded-full transition-all duration-700 ${fill}`}
                style={{ width: `${pct}%` }}
            />
        </div>
    );
};

const WeekDot = ({ week }) => {
    const state =
        week < currentWeek ? "done" : week === currentWeek ? "active" : "todo";
    return (
        <div className="flex flex-col items-center gap-1">
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
          ${
              state === "done"
                  ? "bg-emerald-400 text-emerald-950"
                  : state === "active"
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
          }`}
            >
                {week}
            </div>
            <span className="text-[10px] text-muted-foreground">
                {state === "done" ? "✓" : state === "active" ? "now" : ""}
            </span>
        </div>
    );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export const Learning = ({ showHeader = true }) => {
    return (
        <section
            id="learning"
            className="py-24 relative overflow-hidden scroll-mt-24"
        >
            {/* Background glows */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container max-w-5xl mx-auto px-6 relative z-10">

                {/* ── Section Header (hidden on SprintPage which has its own hero) ── */}
                {showHeader && (
                <div className="text-center mx-auto max-w-3xl mb-16 animate-fade-in">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                        Currently focusing
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
                        AI Engineer
                        <span className="italic font-normal text-primary">
                            {" "}Sprint.
                        </span>
                    </h2>
                    <p className="text-muted-foreground">
                        6 AI engineering courses · 4 production portfolio projects · live June – August 2026.
                        This is what I'm building right now, in public.
                    </p>
                </div>
                )}

                {/* ── Week Progress Card ── */}
                <div className="bg-card rounded-2xl p-6 mb-8 shadow-sm border border-border animate-fade-in animation-delay-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Sprint Progress</p>
                            <p className="text-2xl font-bold text-foreground">
                                Week {currentWeek}{" "}
                                <span className="text-muted-foreground text-base font-normal">of 8</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-primary">{overallPct}%</p>
                            <p className="text-xs text-muted-foreground">overall complete</p>
                        </div>
                    </div>

                    {/* Week dots */}
                    <div className="flex justify-between items-start mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
                            <WeekDot key={w} week={w} />
                        ))}
                    </div>

                    {/* Overall bar */}
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-primary to-emerald-400 transition-all duration-700"
                            style={{ width: `${overallPct}%` }}
                        />
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                        <div className="text-center">
                            <p className="text-xl font-bold text-foreground">
                                {completedCourses}
                                <span className="text-muted-foreground text-sm font-normal">/6</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Courses Done</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-foreground">
                                {completedProjects}
                                <span className="text-muted-foreground text-sm font-normal">/4</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Projects Live</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-foreground">
                                {doneMilestones}
                                <span className="text-muted-foreground text-sm font-normal">/{totalMilestones}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Milestones Hit</p>
                        </div>
                    </div>
                </div>

                {/* ── Courses Grid ── */}
                <div className="mb-8 animate-fade-in animation-delay-200">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        Courses
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {COURSES.map((course, idx) => {
                            const cfg = statusConfig[course.status] || statusConfig.upcoming;
                            return (
                                <div
                                    key={course.id}
                                    className={`bg-card rounded-xl p-5 border shadow-sm hover:shadow-md transition-all duration-300 ${cfg.ring}`}
                                    style={{ animationDelay: `${idx * 60}ms` }}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <p className="text-sm font-medium text-foreground leading-snug">
                                            {course.name}
                                        </p>
                                        <StatusBadge status={course.status} />
                                    </div>
                                    <ProgressBar pct={course.pct} status={course.status} />
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {course.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground border border-border"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0 ml-2">
                                            {course.hours}h
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Portfolio Projects ── */}
                <div className="animate-fade-in animation-delay-300">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        Portfolio Projects Being Built
                    </h3>
                    <div className="space-y-4">
                        {PROJECTS.map((project, idx) => {
                            const cfg = statusConfig[project.status] || statusConfig.upcoming;
                            const donePct =
                                project.milestones.length > 0
                                    ? Math.round(
                                          (project.milestones.filter((m) => m.done).length /
                                              project.milestones.length) *
                                              100
                                      )
                                    : 0;
                            return (
                                <div
                                    key={project.id}
                                    className={`bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 ${cfg.ring}`}
                                    style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs text-secondary-foreground font-medium tracking-wider uppercase">
                                                    {project.weeks}
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-semibold text-foreground">
                                                {project.name}
                                            </h4>
                                        </div>
                                        <StatusBadge status={project.status} />
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Milestones */}
                                    <div className="space-y-2 mb-4">
                                        {project.milestones.map((m, mIdx) => (
                                            <div key={mIdx} className="flex items-center gap-2.5">
                                                <div
                                                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                                                        m.done
                                                            ? "bg-emerald-400 border-emerald-400"
                                                            : "border-border"
                                                    }`}
                                                >
                                                    {m.done && (
                                                        <svg className="w-2.5 h-2.5 text-emerald-950" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M2 5l2.5 2.5L8 3"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span
                                                    className={`text-sm ${
                                                        m.done
                                                            ? "line-through text-muted-foreground/50"
                                                            : "text-muted-foreground"
                                                    }`}
                                                >
                                                    {m.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Progress bar */}
                                    {donePct > 0 && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                                <span>Progress</span>
                                                <span>{donePct}%</span>
                                            </div>
                                            <ProgressBar pct={donePct} status={project.status} />
                                        </div>
                                    )}

                                    {/* Stack + Links */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.stack.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full bg-secondary text-xs font-medium border border-border text-secondary-foreground hover:border-primary/30 hover:text-primary transition-all duration-200"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            {project.demoUrl && (
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-primary hover:underline font-medium"
                                                >
                                                    Live Demo →
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    GitHub →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};
