// ─────────────────────────────────────────────────────────────────────────────
// Posts.jsx — Notes
//
// All post data lives in src/data/posts.js.
// To add a post: edit that file and set comingSoon: false when it's ready.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { POSTS } from "@/data/posts";
import { SectionHead, Status, Arrow } from "@/components/Checklist";
import { usePageTurn, useTurnKey } from "@/lib/motion";

// A modified click is the visitor asking the browser for a second tab, not for
// this page to turn. Leave those to the anchor.
const opensElsewhere = (e) =>
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey;

export const Posts = () => {
    const published = POSTS.filter((p) => !p.comingSoon);
    const upcoming = POSTS.filter((p) => p.comingSoon);
    // The entry becomes the procedure: while this card is the one being turned
    // to, its stamp and title carry the same names as the article's header.
    const turn = usePageTurn();
    const turning = useTurnKey();

    return (
        <section id="posts" className="py-16 md:py-24 scroll-mt-20">
            <div className="max-w-5xl mx-auto px-5 md:px-6">
                <SectionHead
                    index="04"
                    title="Notes"
                    lede="What I learned and what broke. Written as I go, not after the fact."
                />

                {/* Published — the finished work carries the weight */}
                {published.length > 0 && (
                    <div className="mt-10 space-y-4">
                        {published.map((post) => {
                            const to = `/posts/${post.slug}`;
                            const paired = turning === post.slug;
                            return (
                                <Link
                                    key={post.slug}
                                    to={to}
                                    onClick={(e) => {
                                        if (opensElsewhere(e)) return;
                                        e.preventDefault();
                                        turn(to, post.slug);
                                    }}
                                    className="sheet block p-5 md:p-7 group hover:border-ink transition-colors"
                                >
                                    {/* Paired with the article's header while
                                        this is the entry being turned to. */}
                                    <div
                                        className="flex flex-wrap items-baseline justify-between gap-3"
                                        style={paired ? { viewTransitionName: "note-stamp" } : undefined}
                                    >
                                        <p className="placard nums text-ink-faint">
                                            {post.date} · {post.readTime}
                                        </p>
                                        <Status kind="verified">Published</Status>
                                    </div>
                                    <h3
                                        className="mt-3 text-xl md:text-2xl font-bold text-ink leading-snug tracking-tight max-w-[34ch]"
                                        style={paired ? { viewTransitionName: "note-entry" } : undefined}
                                    >
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-[62ch]">
                                        {post.excerpt}
                                    </p>
                                    <p className="mt-5 rule-sub pt-3 placard text-ink group-hover:text-caution-ink transition-colors inline-flex items-center gap-2">
                                        Read it
                                        <Arrow />
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Pipeline — titles only. These are not finished articles and
                    should not be dressed as any. */}
                {upcoming.length > 0 && (
                    <div className="mt-10">
                        <p className="placard text-ink-faint">In the pipeline</p>
                        <ul className="mt-3">
                            {upcoming.map((post) => (
                                <li
                                    key={post.slug}
                                    className="chk py-3 border-t border-rule"
                                >
                                    <span className="chk__label text-ink-muted normal-case tracking-normal font-sans text-sm leading-snug">
                                        {post.title}
                                    </span>
                                    <span className="chk__lead" aria-hidden="true" />
                                    <span className="chk__value placard text-ink-faint nums font-normal">
                                        {post.date}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <p className="mt-8 text-sm text-ink-muted">
                    Posts live here first. I'll start cross-posting them on{" "}
                    <a
                        href="https://hashnode.com/@kervcodes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink font-bold underline underline-offset-4 decoration-rule hover:decoration-ink"
                    >
                        Hashnode
                    </a>
                    .
                </p>
            </div>
        </section>
    );
};
