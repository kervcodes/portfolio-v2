// ─────────────────────────────────────────────────────────────────────────────
// Learning.jsx — Current projects
//
// HOW TO UPDATE AS YOU PROGRESS:
//   1. In PROJECTS, update `status` and check off `milestones`.
//   2. When a project ships, move its entry to SHIPPED and check every
//      milestone. Both lists render through the same ProjectCard.
//
// Each `id` must match a `slug` in src/data/projects.js — the card links to
// that case study and pairs with its header during the page turn.
//
// NOTE: product names stay out of this file until domains and trademarks are
// secured.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { SectionHead, Status, Check, Notice, Arrow } from "@/components/Checklist";
import { usePageTurn, useTurnKey, opensElsewhere } from "@/lib/motion";
import { Entry } from "@/lib/sequence";
import { tagBorderClass } from "@/lib/tagColors";
import { trackEvent } from "@/lib/analytics";

const PROJECTS = [
    {
        id: "local-bank-statement-analyzer",
        name: "Local Bank Statement Analyzer",
        description:
            "Import months or years of bank and credit-card statements and get one consolidated, local view of your finances across every account. Deterministic Python parses and reconciles the numbers; AI is used only for interpretation, and PII never leaves the machine.",
        phase: "Project 01",
        status: "active",
        stack: ["Python", "uv", "PyMuPDF", "Pydantic", "Polars", "pytest", "Ruff"],
        milestones: [
            { label: "Extract raw transactions from PDF/CSV statements", done: false },
            { label: "Define and validate a normalized transaction schema", done: false },
            { label: "Merge multi-account, multi-month statements and reconcile against balances", done: false },
            { label: "Detect recurring expenses, duplicates, and spending categories", done: false },
            { label: "Strip PII and generate a consolidated financial report", done: false },
        ],
        demoUrl: null,
        githubUrl: null,
    },
];

const SHIPPED = [
    {
        id: "digital-twin",
        name: "AI Digital Twin",
        description:
            "An AI assistant that answers questions about my background, experience, and projects in my own framing. Grounded in a curated summary and my LinkedIn export, it captures contact details from interested visitors, flags anything it couldn't answer, and embeds directly into this site at /twin.",
        phase: "Shipped · Aug 2026",
        status: "verified",
        cta: "Read the case study",
        stack: [
            "Python",
            "OpenAI API",
            "Gradio",
            "Hugging Face Spaces",
            "GitHub Actions",
            "uv",
        ],
        milestones: [
            { label: "Ground answers in a curated professional summary and LinkedIn data", done: true },
            { label: "Run an OpenAI tool-calling loop with function tools", done: true },
            { label: "Capture leads and flag unanswered questions via push notification", done: true },
            { label: "Ship a standalone UI and a portfolio-embedded mode", done: true },
            { label: "Automate push-to-deploy to Hugging Face Spaces", done: true },
        ],
    },
];

// ─── Project card ─────────────────────────────────────────────────────────────
// The card becomes the case study's header the same way a Notes card becomes
// an article's header: paired by id/slug, only while the turn to it is in
// flight. Shared by the Shipped and In-progress lists.
const ProjectCard = ({ project }) => {
    const turn = usePageTurn();
    const paired = useTurnKey() === project.id;
    const to = `/projects/${project.id}`;

    return (
        <Entry as="article">
            <Link
                to={to}
                onClick={(e) => {
                    trackEvent("project_case_study_opened", { project: project.name });
                    if (opensElsewhere(e)) return;
                    e.preventDefault();
                    turn(to, project.id);
                }}
                className="sheet block p-5 md:p-6 group hover:border-ink transition-colors"
            >
                <div
                    className="flex flex-wrap items-baseline justify-between gap-3"
                    style={paired ? { viewTransitionName: "project-stamp" } : undefined}
                >
                    <p className="placard nums text-ink-faint">{project.phase}</p>
                    <Status kind={project.status} />
                </div>
                <h3
                    className="mt-2 text-lg font-bold text-ink tracking-tight"
                    style={paired ? { viewTransitionName: "project-title" } : undefined}
                >
                    {project.name}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    {project.description}
                </p>

                <ul className="mt-4 rule-sub pt-4 space-y-2">
                    {project.milestones.map((m) => (
                        <li key={m.label} className="flex items-start gap-3 text-sm">
                            {m.done ? (
                                <Check className="text-verified mt-0.5" />
                            ) : (
                                <span
                                    className="w-4 h-4 shrink-0 mt-0.5 border border-rule"
                                    aria-hidden="true"
                                />
                            )}
                            <span className={m.done ? "text-ink-faint line-through" : "text-ink-muted"}>
                                {m.label}
                            </span>
                            <span className="sr-only">
                                {m.done ? " — done" : " — not started"}
                            </span>
                        </li>
                    ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                        <li
                            key={s}
                            className={`placard text-ink-faint border px-2.5 py-1 ${tagBorderClass(s)}`}
                        >
                            {s}
                        </li>
                    ))}
                </ul>

                <p className="mt-5 rule-sub pt-3 placard text-ink group-hover:text-caution-ink transition-colors inline-flex items-center gap-2">
                    {project.cta ?? "View build brief"}
                    <Arrow />
                </p>
            </Link>
        </Entry>
    );
};

// ─── Section ──────────────────────────────────────────────────────────────────
export const Learning = () => {
    return (
    <section id="learning" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-5 md:px-6">
            <SectionHead
                index="03"
                title="Current"
                lede="One shipped. Three more planned."
            />

            {/* The world's loudest device, used for the one thing it is for:
                most of this section is the only part of the site describing
                unfinished work, and saying so plainly is the point of building
                in public. */}
            <Notice kind="caution" label="Building in public" className="mt-10">
                The shipped project below is live. The rest are unfinished — a running
                record of work as it's built.
            </Notice>

            {/* ── Shipped ── */}
            <div className="mt-10">
                <p className="placard text-ink-faint">
                    Shipped — <span className="nums">{SHIPPED.length}</span>
                </p>
                <div className="mt-3 space-y-6">
                    {SHIPPED.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            {/* ── In progress ── */}
            <div className="mt-10">
                <p className="placard text-ink-faint">
                    In progress — <span className="nums">{PROJECTS.length}</span> of{" "}
                    <span className="nums">4</span> started
                </p>
                <div className="mt-3 space-y-6">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    </section>
    );
};
