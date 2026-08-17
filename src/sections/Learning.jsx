// ─────────────────────────────────────────────────────────────────────────────
// Learning.jsx — AI Engineer Sprint
//
// HOW TO UPDATE AS YOU PROGRESS:
//   1. In COURSES, set `pct` and flip `status` when a course changes state.
//      The invariant is enforced below: completed => 100, standby => 0.
//   2. In PROJECTS, update `status` and check off `milestones`.
//   3. That's it. The UI reflects real progress automatically.
//
// NOTE: product names stay out of this file until domains and trademarks are
// secured.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { SectionHead, Status, Gauge, Check, Row, Notice, Arrow } from "@/components/Checklist";
import { useSeen, useCountUp, usePageTurn, useTurnKey, opensElsewhere } from "@/lib/motion";
import { Entry } from "@/lib/sequence";
import { tagBorderClass } from "@/lib/tagColors";
import { trackEvent } from "@/lib/analytics";

const COURSES = [
    {
        id: "n8n",
        name: "AI Builder: n8n Agents & Voice Agents",
        hours: 14.5,
        status: "completed", // "standby" | "active" | "completed"
        pct: 100,
        tags: ["n8n", "Voice Agents", "Automation"],
    },
    {
        id: "agentic",
        name: "AI Engineer Agentic Track",
        hours: 21,
        status: "active",
        pct: 50,
        tags: ["Agents", "MCP", "LangGraph", "CrewAI"],
    },
    {
        id: "traversy",
        name: "Coding With AI — Planning To Production",
        hours: 16.5,
        status: "standby",
        pct: 47,
        tags: ["AI Tools", "Cursor", "Workflow"],
    },
    {
        id: "core",
        name: "AI Engineer Core Track",
        hours: 33.5,
        status: "standby",
        pct: 0,
        tags: ["LLMs", "RAG", "QLoRA", "Embeddings"],
    },
    {
        id: "prod",
        name: "AI Engineer Production Track",
        hours: 18.5,
        status: "standby",
        pct: 0,
        tags: ["AWS Bedrock", "Lambda", "Deploy at Scale"],
    },
    {
        id: "coder",
        name: "AI Coder: Claude Code & Coding Agents",
        hours: 16.5,
        status: "standby",
        pct: 0,
        tags: ["Claude Code", "Coding Agents", "MCP"],
    },
];

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

// ─── Derived, with the state invariant enforced in one place ─────────────────
// A course that is "completed" reads 100; one on "standby" reads 0. Anything
// in between is active. Previously a badge could say Complete above a bar at
// 41%, and the two contradicted each other on screen.
const effectivePct = (c) =>
    c.status === "completed" ? 100 : c.status === "standby" ? 0 : c.pct;

const totalHours = COURSES.reduce((s, c) => s + c.hours, 0);
const hoursDone = COURSES.reduce((s, c) => s + (c.hours * effectivePct(c)) / 100, 0);
// Weighted by course length, so a long course part-finished counts for what it
// is. Counting whole courses only reported 9% for ~26 hours of real work.
const overallPct = Math.round((hoursDone / totalHours) * 100);

const completedCourses = COURSES.filter((c) => c.status === "completed").length;
const activeCourses = COURSES.filter((c) => c.status === "active").length;
const totalMilestones = PROJECTS.reduce((s, p) => s + p.milestones.length, 0);
const doneMilestones = PROJECTS.reduce(
    (s, p) => s + p.milestones.filter((m) => m.done).length,
    0
);

// ─── The one instrument on the page ───────────────────────────────────────────
// The readout and the bar report the same measurement, so they take it as one
// event: both settle when the card is first looked at, not on a timer and not
// on load. This is the only count-up in the build — the sprint percentage is
// the site's live claim, and a figure that arrives rather than sitting there
// says it was measured. Tabular numerals mean the digits never reflow, and the
// value is the true one the instant motion is unavailable or unwanted.
const SprintSummary = () => {
    const [ref, seen] = useSeen();
    const readout = useCountUp(overallPct, seen);

    return (
        <div ref={ref} className="sheet p-5 md:p-6 mt-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="placard text-ink-faint">Sprint progress</p>
                    <p className="mt-1 text-3xl md:text-4xl font-bold text-ink nums">
                        {readout}%
                    </p>
                </div>
                <p className="text-sm text-ink-muted">
                    <span className="nums">{hoursDone.toFixed(1)}</span> of{" "}
                    <span className="nums">{totalHours}</span> course hours
                </p>
            </div>

            <div className="mt-4">
                <Gauge
                    pct={overallPct}
                    kind="active"
                    label="Overall sprint progress"
                    run={seen}
                />
            </div>

            <div className="mt-5 rule-sub pt-4 grid gap-2 sm:grid-cols-3">
                <Row label="Complete">
                    <span className="nums">{completedCourses}</span>/
                    <span className="nums">{COURSES.length}</span>
                </Row>
                <Row label="Active">
                    <span className="nums">{activeCourses}</span>/
                    <span className="nums">{COURSES.length}</span>
                </Row>
                <Row label="Milestones">
                    <span className="nums">{doneMilestones}</span>/
                    <span className="nums">{totalMilestones}</span>
                </Row>
            </div>
        </div>
    );
};

// ─── Section ──────────────────────────────────────────────────────────────────
export const Learning = ({ showHeader = true }) => {
    // The project card becomes the case study's header the same way a Notes
    // card becomes an article's header: paired by slug, only while the turn
    // to it is in flight.
    const turn = usePageTurn();
    const turning = useTurnKey();

    return (
    <section id="learning" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-5 md:px-6">
            {showHeader && (
                <SectionHead
                    index="03"
                    title="Current"
                    lede="Six AI engineering courses, and four production projects planned — the first is underway. Started June 2026 and still running; no deadline, I move course by course."
                />
            )}

            {/* The world's loudest device, used for the one thing it is for:
                this section is the only part of the site describing unfinished
                work, and saying so plainly is the point of building in public. */}
            <Notice
                kind="caution"
                label="In progress"
                className={showHeader ? "mt-10" : ""}
            >
                Nothing in this section is finished. It's a live record of work
                underway — the numbers below move as I go, and they're derived
                from the same data I'm tracking, not written by hand.
            </Notice>

            {/* ── Summary: one number, honestly derived ── */}
            <SprintSummary />

            {/* ── Courses: a numbered procedure, one column ── */}
            <div className="mt-10">
                <p className="placard text-ink-faint">Courses</p>
                <ol className="mt-3">
                    {COURSES.map((course, idx) => {
                        const pct = effectivePct(course);
                        return (
                            <Entry
                                as="li"
                                key={course.id}
                                className="grid md:grid-cols-12 gap-x-6 gap-y-2 py-4 border-t border-rule items-baseline"
                            >
                                <div className="md:col-span-7 flex gap-3 min-w-0">
                                    <span className="placard nums text-ink-faint shrink-0 pt-0.5">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-ink leading-snug">
                                            {course.name}
                                        </p>
                                        <ul className="mt-1.5 flex flex-wrap gap-1.5">
                                            {course.tags.map((tag) => (
                                                <li
                                                    key={tag}
                                                    className={`placard text-ink-faint border px-2 py-0.5 ${tagBorderClass(tag)}`}
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="md:col-span-3">
                                    <Gauge
                                        pct={pct}
                                        kind={course.status === "completed" ? "verified" : course.status}
                                        label={`${course.name} progress`}
                                    />
                                    <p className="mt-1.5 placard text-ink-faint nums">
                                        {pct}% · {course.hours}h
                                    </p>
                                </div>

                                <div className="md:col-span-2 md:text-right">
                                    <Status
                                        kind={course.status === "completed" ? "verified" : course.status}
                                    />
                                </div>
                            </Entry>
                        );
                    })}
                </ol>
            </div>

            {/* ── Projects ── */}
            <div className="mt-12">
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
