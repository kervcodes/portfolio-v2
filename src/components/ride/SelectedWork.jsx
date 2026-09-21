import { Link } from "react-router-dom";
import { SectionHead, Status, Arrow } from "@/components/Checklist";
import { Entry } from "@/lib/sequence";
import { tagBorderClass } from "@/lib/tagColors";
import { trackEvent } from "@/lib/analytics";
import { getProjectBySlug } from "@/data/projects";

// ─────────────────────────────────────────────────────────────────────────────
// SelectedWork — no more than three cards, per spec. Only two projects have
// real, verified case-study content in this repo (src/data/projects.js):
// the Bank Statement Analyzer (in progress) and the AI Digital Twin (shipped
// and live at /twin). BranchBeacon has no case study here and is archived
// with no prospects or revenue, so it is left out rather than represented
// with invented evidence — see tasks/todo.md.
//
// The one-sentence problem/solution lines below are condensed from the real
// copy in src/data/projects.js, not new claims — flagged for owner
// verification in the completion report since compression can drift meaning
// even when every fact is sourced.
// ─────────────────────────────────────────────────────────────────────────────
const KIOSK_PROJECTS = [
  {
    slug: "local-bank-statement-analyzer",
    problem:
      "Subscriptions, fees, and recurring charges spread across banks and cards, with no single trustworthy view of where the money goes.",
    solution:
      "A local-first desktop app that extracts, reconciles, and analyzes bank statements entirely on your own machine — raw statements never leave it.",
    image: {
      src: "/projects/bank-statement-analyzer-dashboard.png",
      alt: "Bank Statement Analyzer dashboard showing cash flow and spending by category",
    },
    cta: "View build brief",
    to: "/projects/local-bank-statement-analyzer",
  },
  {
    slug: "digital-twin",
    problem:
      "A portfolio makes a recruiter do the work of reading every section to find out if a background actually fits the role.",
    solution:
      "An AI assistant grounded in my real background that answers questions directly, in my own framing, and says when it doesn't know.",
    image: {
      src: "/projects/digital-twin-architecture.svg",
      alt: "Request path from the portfolio through an embedded AI digital twin",
    },
    cta: "View project",
    to: "/twin",
  },
];

const ProjectCard = ({ entry }) => {
  const project = getProjectBySlug(entry.slug);
  if (!project) return null;

  return (
    <Entry as="article" className="sheet overflow-hidden">
      <div className="aspect-video bg-ground border-b border-rule overflow-hidden">
        <img
          src={entry.image.src}
          alt={entry.image.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-lg md:text-xl font-bold text-ink tracking-tight">
            {project.name}
          </h3>
          <Status kind={project.status} />
        </div>

        <p className="mt-3 text-sm text-ink-muted leading-relaxed">
          {entry.problem}
        </p>
        <p className="mt-2 text-sm text-ink leading-relaxed font-medium">
          {entry.solution}
        </p>

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

        <Link
          to={entry.to}
          onClick={() =>
            trackEvent("ride_project_opened", { project: project.name })
          }
          className="mt-5 rule-sub pt-3 placard text-ink hover:text-caution-ink transition-colors inline-flex items-center gap-2 min-h-11"
        >
          {entry.cta}
          <Arrow />
        </Link>
      </div>
    </Entry>
  );
};

export const SelectedWork = () => (
  <section id="ride-work" className="py-16 md:py-24 scroll-mt-10">
    <div className="max-w-5xl mx-auto px-5 md:px-6">
      <SectionHead
        index="01"
        title="Selected work"
        lede="Two systems built end to end — the strongest completed work first."
      />
      <div className="mt-10 grid md:grid-cols-2 gap-6 md:gap-8">
        {KIOSK_PROJECTS.map((entry) => (
          <ProjectCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  </section>
);

export default SelectedWork;
