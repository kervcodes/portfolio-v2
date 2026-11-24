// ─────────────────────────────────────────────────────────────────────────────
// Posts.jsx — the homepage preview of the blog
//
// All post data lives in src/data/posts.js. The full list, with category
// filters and the in-the-pipeline titles, is the /blog page (pages/Blog.jsx);
// this section shows the first few as the same cards and links there.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { POSTS } from "@/data/posts";
import { SectionHead, Arrow } from "@/components/Checklist";
import { PostCard } from "@/components/PostCard";
import { useSectionLink } from "@/lib/motion";

const PREVIEW_COUNT = 3;

// The notes that best show engineering judgment lead the preview, in this
// order; everything else follows in its data-file order. A slug that is
// missing or unpublished is simply skipped.
const PINNED = [
    "it-parsed-it-was-wrong-anyway",
    "build-log-7-the-gateway-that-only-lets-four-fields-through",
    "build-log-6-nothing-gets-deleted-on-a-guess",
    "build-log-9-the-batch-that-got-stuck-at-zero-of-six",
];
const pinRank = (slug) => {
    const i = PINNED.indexOf(slug);
    return i === -1 ? PINNED.length : i;
};

export const Posts = () => {
    const go = useSectionLink();
    // Array.prototype.sort is stable, so unpinned posts keep their order.
    const published = POSTS.filter((p) => !p.comingSoon && !p.unlisted).sort(
        (a, b) => pinRank(a.slug) - pinRank(b.slug)
    );
    const preview = published.slice(0, PREVIEW_COUNT);

    return (
        <section id="blogs" className="py-16 md:py-24 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <SectionHead
                    title="Engineering Case Notes"
                    lede="What I learned and what broke. Written as I go, not after the fact."
                />

                <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {preview.map((post) => (
                        <li key={post.slug}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>

                <p className="mt-8">
                    <Link
                        to="/blog"
                        onClick={(e) => go(e, "/blog")}
                        className="inline-flex items-center gap-2 font-bold text-ink underline underline-offset-4 decoration-2 decoration-caution hover:decoration-ink"
                    >
                        View all {published.length} posts
                        <Arrow />
                    </Link>
                </p>
            </div>
        </section>
    );
};
