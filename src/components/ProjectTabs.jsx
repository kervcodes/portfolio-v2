import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// ─── Content block renderer — shared by any tab that holds free-form prose ──
export const ContentBlock = ({ block }) => {
    switch (block.type) {
        case "paragraph":
            return (
                <p className="text-ink-muted leading-relaxed text-base mb-6">
                    {block.text}
                </p>
            );
        case "heading":
            return (
                <h3 className="mt-8 mb-3 text-lg font-bold text-ink uppercase tracking-tight first:mt-0">
                    {block.text}
                </h3>
            );
        default:
            return null;
    }
};

const Placeholder = ({ children }) => (
    <p className="placard text-ink-faint">{children}</p>
);

const TABS = [
    { key: "problem", label: "Problem statement" },
    { key: "architecture", label: "Architecture" },
    { key: "keyDecisions", label: "Key decisions" },
    { key: "buildLog", label: "Build log" },
    { key: "result", label: "Result" },
];

// ─── Panels ─────────────────────────────────────────────────────────────────
const ProblemPanel = ({ project }) => {
    const content = project.tabs?.problem?.content ?? [];
    if (content.length === 0) {
        return <Placeholder>Problem statement coming soon.</Placeholder>;
    }
    return (
        <>
            {content.map((block, i) => (
                <ContentBlock key={i} block={block} />
            ))}
            {project.stack?.length > 0 && (
                <p className="text-sm text-ink-faint">
                    <span className="placard text-ink-faint mr-2">Stack</span>
                    {project.stack.join(", ")}
                </p>
            )}
        </>
    );
};

const ArchitecturePanel = ({ project }) => {
    const images = project.tabs?.architecture?.images ?? [];
    if (images.length === 0) {
        return <Placeholder>Architecture diagram in progress.</Placeholder>;
    }
    return (
        <div className="space-y-8">
            {images.map((img, i) => (
                <figure key={i}>
                    <img
                        src={img.src}
                        alt={img.alt ?? `${project.name} architecture diagram`}
                        className="w-full border border-rule object-cover max-h-130"
                    />
                    {img.caption && (
                        <figcaption className="mt-2 text-sm text-ink-faint">
                            {img.caption}
                        </figcaption>
                    )}
                </figure>
            ))}
        </div>
    );
};

const KeyDecisionsPanel = ({ project }) => {
    const items = project.tabs?.keyDecisions?.items ?? [];
    if (items.length === 0) {
        return <Placeholder>Key decisions coming soon.</Placeholder>;
    }
    return (
        <ul className="space-y-6">
            {items.map((d) => (
                <li key={d.title}>
                    <p className="font-bold text-ink">{d.title}</p>
                    <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                        {d.body}
                    </p>
                </li>
            ))}
        </ul>
    );
};

const BuildLogPanel = ({ project }) => {
    const entries = project.tabs?.buildLog?.entries ?? [];
    if (entries.length === 0) {
        return <Placeholder>Build log coming soon.</Placeholder>;
    }
    return (
        <ul className="space-y-5">
            {entries.map((e, i) => (
                <li key={i} className="rule-sub pt-3">
                    <p className="placard text-ink-faint">{e.date}</p>
                    <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                        {e.text}
                    </p>
                </li>
            ))}
        </ul>
    );
};

const ResultPanel = ({ project }) => {
    const result = project.tabs?.result ?? {};
    const improvements = result.improvements ?? [];
    const hasResult =
        result.liveUrl || result.githubUrl || improvements.length > 0 || result.status;

    if (!hasResult) {
        return <Placeholder>Result write-up in progress.</Placeholder>;
    }

    return (
        <div className="space-y-8">
            {(result.githubUrl || result.liveUrl) && (
                <div className="flex flex-wrap gap-5">
                    {result.githubUrl && (
                        <a
                            href={result.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="placard inline-flex items-center gap-2 text-ink hover:text-caution-ink transition-colors"
                        >
                            <FaGithub className="w-3.5 h-3.5" />
                            Repository
                        </a>
                    )}
                    {result.liveUrl && (
                        <a
                            href={result.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="placard inline-flex items-center gap-2 text-ink hover:text-caution-ink transition-colors"
                        >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            Live
                        </a>
                    )}
                </div>
            )}
            {improvements.length > 0 && (
                <div>
                    <p className="placard text-ink-faint mb-2">What I'd improve next</p>
                    <ul className="space-y-2 list-disc list-inside">
                        {improvements.map((text, i) => (
                            <li key={i} className="text-sm text-ink-muted leading-relaxed">
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const PANELS = {
    problem: ProblemPanel,
    architecture: ArchitecturePanel,
    keyDecisions: KeyDecisionsPanel,
    buildLog: BuildLogPanel,
    result: ResultPanel,
};

// ─── Tabs shell ───────────────────────────────────────────────────────────────
// Follows the WAI-ARIA tabs pattern: roving tabindex, arrow/Home/End move and
// select in one step, and each panel is reachable by id from its tab.
export const ProjectTabs = ({ project }) => {
    const [active, setActive] = useState(TABS[0].key);
    const tabRefs = useRef([]);

    const focusAndSelect = (index) => {
        setActive(TABS[index].key);
        tabRefs.current[index]?.focus();
    };

    const onKeyDown = (e, i) => {
        switch (e.key) {
            case "ArrowRight":
                e.preventDefault();
                focusAndSelect((i + 1) % TABS.length);
                break;
            case "ArrowLeft":
                e.preventDefault();
                focusAndSelect((i - 1 + TABS.length) % TABS.length);
                break;
            case "Home":
                e.preventDefault();
                focusAndSelect(0);
                break;
            case "End":
                e.preventDefault();
                focusAndSelect(TABS.length - 1);
                break;
            default:
                break;
        }
    };

    return (
        <div className="mt-12">
            <div
                role="tablist"
                aria-label={`${project.name} case study sections`}
                className="rule-head flex flex-wrap gap-x-6 gap-y-2"
            >
                {TABS.map((t, i) => {
                    const selected = active === t.key;
                    return (
                        <button
                            key={t.key}
                            ref={(el) => (tabRefs.current[i] = el)}
                            type="button"
                            role="tab"
                            id={`tab-${t.key}`}
                            aria-controls={`panel-${t.key}`}
                            aria-selected={selected}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(t.key)}
                            onKeyDown={(e) => onKeyDown(e, i)}
                            className={`case-tab placard pb-3 transition-colors ${
                                selected ? "text-ink" : "text-ink-faint hover:text-ink"
                            }`}
                        >
                            {t.label}
                            <span className="case-tab__bar" aria-hidden="true" />
                        </button>
                    );
                })}
            </div>

            {TABS.map((t) => {
                const Panel = PANELS[t.key];
                return (
                    <div
                        key={t.key}
                        role="tabpanel"
                        id={`panel-${t.key}`}
                        aria-labelledby={`tab-${t.key}`}
                        hidden={active !== t.key}
                        tabIndex={0}
                        className="mt-6"
                    >
                        {active === t.key && <Panel project={project} />}
                    </div>
                );
            })}
        </div>
    );
};

export default ProjectTabs;
