import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { getPostBySlug } from "@/data/posts";
import { Status, Row, Arrow } from "@/components/Checklist";
import { usePageTurn, useTurnKey } from "@/lib/motion";

// Posts are back on the homepage, so the return path is the Notes section.
const BACK_TO = "/#posts";
const BACK_LABEL = "All notes";

// ─── Content block renderer ───────────────────────────────────────────────────
const ContentBlock = ({ block }) => {
    switch (block.type) {
        case "paragraph":
            return (
                <p className="text-ink-muted leading-relaxed text-base mb-6">
                    {block.text}
                </p>
            );
        case "heading":
            return (
                <h2 className="rule-head mt-12 mb-5 text-xl md:text-2xl font-bold text-ink uppercase tracking-tight">
                    {block.text}
                </h2>
            );
        case "subheading":
            return (
                <h3 className="mt-8 mb-3 text-lg font-bold text-ink">{block.text}</h3>
            );
        case "image":
            return (
                <figure className="my-10">
                    <img
                        src={block.src}
                        alt={block.caption || ""}
                        className="w-full border border-rule object-cover max-h-130"
                    />
                    {block.caption && (
                        <figcaption className="mt-2 placard text-ink-faint">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );
        case "list":
            return (
                <ol className="mb-6 space-y-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-ink-muted leading-relaxed">
                            <span className="placard nums text-ink-faint shrink-0 pt-1">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
            );
        case "divider":
            return <hr className="border-0 border-t border-rule my-10" />;
        case "callout":
            return (
                <blockquote className="my-10 rule-head">
                    <p className="text-xl md:text-2xl font-bold text-ink leading-snug max-w-[34ch]">
                        {block.text}
                    </p>
                </blockquote>
            );
        default:
            return null;
    }
};

// Going back is the same event in reverse, so it is the same turn: pass the
// slug and the heading travels down into its entry in the Notes list.
const BackLink = ({ className = "", turnKey }) => {
    const turn = usePageTurn();
    return (
        <Link
            to={BACK_TO}
            onClick={(e) => {
                if (
                    e.defaultPrevented ||
                    e.button !== 0 ||
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey
                )
                    return;
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

// ─── Not written yet ──────────────────────────────────────────────────────────
const ComingSoonPage = ({ post }) => (
    <div className="max-w-5xl mx-auto px-5 md:px-6 py-20">
        <div className="sheet p-6 md:p-10">
            <Status kind="standby">Not written yet</Status>
            <h1 className="mt-4 text-2xl md:text-4xl font-bold text-ink leading-tight tracking-tight max-w-[28ch]">
                {post.title}
            </h1>
            <p className="mt-4 text-ink-muted leading-relaxed max-w-[62ch]">
                {post.excerpt}
            </p>
            <p className="mt-6 rule-sub pt-4 text-sm text-ink-muted">
                This one is still in drafts. It'll appear here when it's done.
            </p>
            <p className="mt-6">
                <BackLink />
            </p>
        </div>
    </div>
);

// ─── 404 ──────────────────────────────────────────────────────────────────────
const NotFoundPage = () => (
    <div className="max-w-5xl mx-auto px-5 md:px-6 py-20">
        <div className="notice notice--warning">
            <p className="notice__band">No such entry</p>
            <div className="px-5 py-6">
                <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
                    This note doesn't exist.
                </h1>
                <p className="mt-3 text-ink-muted max-w-[62ch]">
                    The link may be mistyped, or the note may have been renamed since it
                    was shared.
                </p>
                <p className="mt-6">
                    <BackLink />
                </p>
            </div>
        </div>
    </div>
);

// Hoisted: defining this inside PostDetail would create a new component type
// on every render and remount the whole article subtree.
const Shell = ({ children }) => (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const PostDetail = () => {
    const { slug } = useParams();
    const post = getPostBySlug(slug);
    // The other end of the pair. Only ever set while a turn is in flight, so
    // two elements never hold one name at once.
    const paired = useTurnKey() === slug;

    if (!post) return <Shell><NotFoundPage /></Shell>;
    if (post.comingSoon) return <Shell><ComingSoonPage post={post} /></Shell>;

    return (
        <Shell>
            <article className="max-w-5xl mx-auto px-5 md:px-6 py-12 md:py-16">
                <BackLink className="inline-block mb-8" turnKey={slug} />

                <header className="rule-head">
                    <div
                        className="flex flex-wrap items-baseline justify-between gap-3"
                        style={paired ? { viewTransitionName: "note-stamp" } : undefined}
                    >
                        <p className="placard nums text-ink-faint">
                            {post.date} · {post.readTime}
                        </p>
                        <Status kind="verified">Published</Status>
                    </div>
                    <h1
                        className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-[-0.02em]"
                        style={paired ? { viewTransitionName: "note-entry" } : undefined}
                    >
                        {post.title}
                    </h1>
                    <div className="mt-6 rule-sub pt-4 space-y-2">
                        <Row label="Author">Kervintz Noel</Row>
                        <Row label="Filed under">{post.tags.join(" · ")}</Row>
                    </div>
                </header>

                {post.coverImage && (
                    /* Decorative: the headline above carries the meaning. */
                    <img
                        src={post.coverImage}
                        alt=""
                        aria-hidden="true"
                        className="mt-10 w-full border border-rule object-cover max-h-120"
                    />
                )}

                {/* A post may hold its body back while it is being revised.
                    `visibleBlocks` renders the first N blocks and stops; the
                    rest is still in posts.js, just not served. Absent, the
                    whole body renders. */}
                <div className="mt-10">
                    {(typeof post.visibleBlocks === "number"
                        ? post.content.slice(0, post.visibleBlocks)
                        : post.content
                    ).map((block, i) => (
                        <ContentBlock key={i} block={block} />
                    ))}
                </div>

                <footer className="mt-16 rule-head flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-ink-muted max-w-[46ch]">
                        I write these as I go. You can follow along here or on{" "}
                        <a
                            href="https://hashnode.com/@kervcodes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink font-bold underline underline-offset-4 decoration-rule hover:decoration-ink"
                        >
                            Hashnode
                        </a>
                        , where I'll start cross-posting.
                    </p>
                    <BackLink turnKey={slug} />
                </footer>
            </article>
        </Shell>
    );
};

export default PostDetail;
