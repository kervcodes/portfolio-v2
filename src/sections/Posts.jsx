// ─────────────────────────────────────────────────────────────────────────────
// Posts.jsx — Writing & Notes
//
// All post data lives in src/data/posts.js.
// To add a post: edit that file and set comingSoon: false when it's ready.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { POSTS } from "@/data/posts";

// ─── Tag color map ────────────────────────────────────────────────────────────
const TAG_COLORS = {
    "AI Engineering":     "text-primary border-primary/30 bg-primary/5",
    "RAG":                "text-primary border-primary/30 bg-primary/5",
    "Agents":             "text-primary border-primary/30 bg-primary/5",
    "MCP":                "text-primary border-primary/30 bg-primary/5",
    "Claude API":         "text-primary border-primary/30 bg-primary/5",
    "n8n":                "text-primary border-primary/30 bg-primary/5",
    "SRE":                "text-highlight border-highlight/30 bg-highlight/5",
    "Full-Stack":         "text-secondary-foreground border-secondary-foreground/30 bg-secondary-foreground/5",
    "React Native":       "text-secondary-foreground border-secondary-foreground/30 bg-secondary-foreground/5",
    "Career":             "text-muted-foreground border-border/50 bg-surface",
    "Building in Public": "text-muted-foreground border-border/50 bg-surface",
};
const tagClass = (tag) => TAG_COLORS[tag] || "text-muted-foreground border-border/50 bg-surface";

// ─── Section ──────────────────────────────────────────────────────────────────
export const Posts = () => {
    const published        = POSTS.filter((p) => !p.comingSoon);
    const featuredUpcoming = POSTS.filter((p) => p.comingSoon && p.featured);
    const bgUpcoming       = POSTS.filter((p) => p.comingSoon && !p.featured);

    // Dynamic grid cols so cards center when fewer than max are showing
    const featuredGridCols =
        featuredUpcoming.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
        featuredUpcoming.length === 2 ? "md:grid-cols-2" :
        "md:grid-cols-3";
    const bgGridCols =
        bgUpcoming.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
        bgUpcoming.length === 2 ? "md:grid-cols-2" :
        "md:grid-cols-3";

    // Shared card body for both published and featured upcoming
    const PostCardBody = ({ post }) => (
        <>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
                {post.comingSoon ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border/50 text-muted-foreground">
                        Coming soon
                    </span>
                ) : (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                )}
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors mb-3 leading-snug">
                {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs border ${tagClass(tag)}`}>
                        {tag}
                    </span>
                ))}
            </div>
        </>
    );

    return (
        <section id="posts" className="py-24 relative overflow-hidden scroll-mt-24">
            {/* Background glows */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container max-w-5xl mx-auto px-6 relative z-10">

                {/* ── Section Header ── */}
                <div className="text-center mx-auto max-w-3xl mb-16 animate-fade-in">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                        Writing
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
                        Building in
                        <span className="font-serif italic font-normal text-white">
                            {" "}public.
                        </span>
                    </h2>
                    <p className="text-muted-foreground">
                        Notes on AI engineering, production systems, and what it actually looks like
                        to build and ship real software. No fluff, just what I learned and what broke.
                    </p>
                </div>

                {/* ── Published posts (full linked cards) ── */}
                {published.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fade-in animation-delay-100">
                        {published.map((post, idx) => (
                            <Link
                                key={idx}
                                to={`/posts/${post.slug}`}
                                className="group glass rounded-2xl p-6 border border-border/30 hover:border-primary/40 transition-all duration-300 flex flex-col"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                <PostCardBody post={post} />
                            </Link>
                        ))}
                    </div>
                )}

                {/* ── Featured upcoming posts (full opacity, non-clickable) ── */}
                {featuredUpcoming.length > 0 && (
                    <div className="animate-fade-in animation-delay-100">
                        {published.length > 0 && (
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-4">
                                Coming Soon
                            </p>
                        )}
                        <div className={`grid gap-6 mb-8 ${featuredGridCols}`}>
                            {featuredUpcoming.map((post, idx) => (
                                <div
                                    key={idx}
                                    className="group glass rounded-2xl p-6 border border-border/30 flex flex-col"
                                    style={{ animationDelay: `${idx * 80}ms` }}
                                >
                                    <PostCardBody post={post} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Background upcoming posts (dimmed) ── */}
                {bgUpcoming.length > 0 && (
                    <div className="animate-fade-in animation-delay-200">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-4">
                            Also in the pipeline
                        </p>
                        <div className={`grid gap-4 ${bgGridCols}`}>
                            {bgUpcoming.map((post, idx) => (
                                <div
                                    key={idx}
                                    className="glass rounded-xl p-5 border border-border/20 opacity-50"
                                    style={{ animationDelay: `${(idx + 1) * 60}ms` }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border/50 text-muted-foreground">
                                            Coming soon
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                                        {post.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] border ${tagClass(tag)}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Hashnode CTA ── */}
                <div className="text-center mt-12 animate-fade-in animation-delay-300">
                    <p className="text-sm text-muted-foreground mb-3">
                        All posts are published on Hashnode.
                    </p>
                    <a
                        href="https://hashnode.com/@kervcodes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                    >
                        Read all posts →
                    </a>
                </div>

            </div>
        </section>
    );
};
