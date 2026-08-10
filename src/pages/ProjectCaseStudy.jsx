import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { getProjectBySlug } from "@/data/projects";
import { Status, Arrow } from "@/components/Checklist";
import { ProjectTabs } from "@/components/ProjectTabs";
import { usePageTurn, useTurnKey, opensElsewhere } from "@/lib/motion";

// The card lives in the Learning section, so that's where Back returns to.
const BACK_TO = "/#learning";
const BACK_LABEL = "Current work";

// Same pairing mechanism as the Notes page turn: the slug travels with the
// turn so the outgoing card and the incoming header can share a name.
const BackLink = ({ className = "", turnKey }) => {
    const turn = usePageTurn();
    return (
        <Link
            to={BACK_TO}
            onClick={(e) => {
                if (opensElsewhere(e)) return;
                e.preventDefault();
                turn(BACK_TO, turnKey);
            }}
            className={`placard inline-flex items-center gap-2 text-ink-muted hover:text-ink transition-colors ${className}`}
        >
            <Arrow dir="left" />
            {BACK_LABEL}
        </Link>
    );
};

// ─── 404 ──────────────────────────────────────────────────────────────────────
const NotFoundPage = () => (
    <div className="max-w-5xl mx-auto px-5 md:px-6 py-20">
        <div className="notice notice--warning">
            <p className="notice__band">No such project</p>
            <div className="px-5 py-6">
                <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
                    This project doesn't exist.
                </h1>
                <p className="mt-3 text-ink-muted max-w-[62ch]">
                    The link may be mistyped, or the project may have been renamed since
                    it was shared.
                </p>
                <p className="mt-6">
                    <BackLink />
                </p>
            </div>
        </div>
    </div>
);

const Shell = ({ children }) => (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const ProjectCaseStudy = () => {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
    const paired = useTurnKey() === slug;

    if (!project) return <Shell><NotFoundPage /></Shell>;

    return (
        <Shell>
            <article className="max-w-5xl mx-auto px-5 md:px-6 py-12 md:py-16">
                <BackLink className="inline-block mb-8" turnKey={slug} />

                <header className="rule-head">
                    <div
                        className="flex flex-wrap items-baseline justify-between gap-3"
                        style={paired ? { viewTransitionName: "project-stamp" } : undefined}
                    >
                        <p className="placard nums text-ink-faint">Case study</p>
                        <Status kind={project.status} />
                    </div>
                    <h1
                        className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-[-0.02em]"
                        style={paired ? { viewTransitionName: "project-title" } : undefined}
                    >
                        {project.name}
                    </h1>
                    <ul className="mt-6 rule-sub pt-4 flex flex-wrap gap-x-3 gap-y-1">
                        {project.stack.map((s) => (
                            <li
                                key={s}
                                className="placard text-ink-faint after:content-['·'] after:ml-3 last:after:content-['']"
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                </header>

                <ProjectTabs project={project} />

                <footer className="mt-16 rule-head flex justify-end">
                    <BackLink turnKey={slug} />
                </footer>
            </article>
        </Shell>
    );
};

export default ProjectCaseStudy;
