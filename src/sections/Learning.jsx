// ─────────────────────────────────────────────────────────────────────────────
// Learning.jsx — Current projects
//
// HOW TO UPDATE AS YOU PROGRESS:
//   1. In PROJECTS, update `status` and check off `milestones`.
//   2. That's it. The UI reflects real progress automatically.
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
        id: "sre-runbook-ai",
        name: "SRE Runbook AI",
        description:
            "Paste an incident alert, get a structured runbook and postmortem back instantly. A Next.js app powered by the Claude API — built from five years of real incident response.",
        phase: "Project 01",
        status: "active",
        stack: ["Next.js", "Claude API", "Supabase", "Tailwind CSS", "Vercel"],
        milestones: [
            { label: "Define alert schema and runbook output format", done: false },
            { label: "Build Claude API integration with structured prompts", done: false },
            { label: "Create UI: paste alert, get runbook", done: false },
            { label: "Add postmortem generation mode", done: false },
            { label: "Deploy with a live demo", done: false },
        ],
        demoUrl: null,
        githubUrl: null,
    },
];

// ─── Section ──────────────────────────────────────────────────────────────────
export const Learning = () => {
    // The project card becomes the case study's header the same way a Notes
    // card becomes an article's header: paired by slug, only while the turn
    // to it is in flight.
    const turn = usePageTurn();
    const turning = useTurnKey();

    return (
    <section id="learning" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-5 md:px-6">
            <SectionHead
                index="03"
                title="Current"
                lede="Four production projects planned"
            />

            {/* The world's loudest device, used for the one thing it is for:
                this section is the only part of the site describing unfinished
                work, and saying so plainly is the point of building in public. */}
            <Notice kind="caution" label="In progress" className="mt-10">
                Nothing in this section is finished. It's a live record of work underway.
            </Notice>

            {/* ── Projects ── */}
            <div className="mt-10">
                <p className="placard text-ink-faint">
                    Projects — <span className="nums">{PROJECTS.length}</span> of{" "}
                    <span className="nums">4</span> started
                </p>
                <div className="mt-3 space-y-6">
                    {PROJECTS.map((project) => {
                        const to = `/projects/${project.id}`;
                        const paired = turning === project.id;
                        return (
                            // The run-in wraps the card, same as a Notes entry: the
                            // paired stamp and title inside carry view-transition
                            // names, and the turn should capture them from a
                            // settled box.
                            <Entry as="article" key={project.id}>
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
                                                <span
                                                    className={
                                                        m.done ? "text-ink-faint line-through" : "text-ink-muted"
                                                    }
                                                >
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
                                        View build brief
                                        <Arrow />
                                    </p>
                                </Link>
                            </Entry>
                        );
                    })}
                </div>
            </div>
        </div>
    </section>
    );
};
