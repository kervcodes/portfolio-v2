// ─────────────────────────────────────────────────────────────────────────────
// Blogs.jsx — Writing & Notes
//
// HOW TO ADD A NEW POST:
//   1. Publish on Hashnode (hashnode.com) — or wherever you write.
//   2. Copy the post URL, title, date, excerpt, and tags.
//   3. Add a new object to the POSTS array below (newest first).
//   4. That's it — the card appears automatically.
//
// TAGS to keep consistent (helps recruiters scan your focus areas):
//   "AI Engineering", "RAG", "Agents", "SRE", "Full-Stack",
//   "Career", "Building in Public", "React Native"
// ─────────────────────────────────────────────────────────────────────────────

import { ArrowUpRight } from "lucide-react";

// ─── Posts (newest / most important first) ───────────────────────────────────
// featured: true  → full-size card, full opacity, "Coming soon" badge
// featured: false → smaller dimmed card in the background row
const POSTS = [
    {
        title: "One Year After Getting Laid Off, I'm Finally Going All In on AI",
        excerpt:
            "June 23rd was exactly one year since Liberty Mutual let me go. I spent 12 months doing contract work and Uber to keep the lights on. Now I'm going all in. Here's the plan.",
        date: "Jun 2026",
        tags: ["AI Engineering", "Career", "Building in Public"],
        url: null, // ← replace with Hashnode URL when published
        readTime: "6 min read",
        comingSoon: true,
        featured: true,
    },
    {
        title: "SRE Runbook AI: Building the Tool I Wish I Had at Liberty Mutual",
        excerpt:
            "Paste an incident alert, get a structured runbook and postmortem back in seconds. How I turned 5 years of on-call experience into a Claude-powered SaaS app.",
        date: "Jul 2026",
        tags: ["AI Engineering", "SRE", "Claude API"],
        url: null,
        readTime: "7 min read",
        comingSoon: true,
        featured: true,
    },
    // {
    //     title: "Tidywaro: What I Learned Shipping My First AI-Powered Mobile App",
    //     excerpt:
    //         "From idea to App Store submission: RevenueCat, Supabase, and AI clothing analysis in a React Native app. What worked, what didn't, and what I'd do differently.",
    //     date: "Jul 2026",
    //     tags: ["React Native", "AI Engineering", "Full-Stack"],
    //     url: null,
    //     readTime: "6 min read",
    //     comingSoon: true,
    //     featured: true,
    // },
    // {
    //     title: "Building a Voice Assistant for a Real Law Firm Client with n8n and RAG",
    //     excerpt:
    //         "How I built a RAG-powered voice intake system for an actual client -- documents ingested, consultations scheduled, questions answered, all without a developer in the loop.",
    //     date: "Aug 2026",
    //     tags: ["Agents", "RAG", "n8n"],
    //     url: null,
    //     readTime: "8 min read",
    //     comingSoon: true,
    //     featured: false,
    // },
    // {
    //     title: "HaitiBillboard AI: Adding Natural Language Querying to a Music Analytics Platform",
    //     excerpt:
    //         "How I layered a RAG query interface over a PostgreSQL music database so anyone can ask which Haitian artists are trending and get a real answer.",
    //     date: "Aug 2026",
    //     tags: ["RAG", "AI Engineering", "Full-Stack"],
    //     url: null,
    //     readTime: "8 min read",
    //     comingSoon: true,
    //     featured: false,
    // },
    // {
    //     title: "From Single-Shot to Agentic: Upgrading SRE Runbook AI with Multi-Agent Workflows",
    //     excerpt:
    //         "Taking my runbook generator from one prompt to a full autonomous agent that triages alerts, files Jira tickets, and posts Slack summaries -- a look at building with LangGraph and MCP.",
    //     date: "Aug 2026",
    //     tags: ["Agents", "MCP", "AI Engineering"],
    //     url: null,
    //     readTime: "7 min read",
    //     comingSoon: true,
    //     featured: false,
    // },
];

// ─── Tag color map ────────────────────────────────────────────────────────────
const TAG_COLORS = {
    "AI Engineering":    "text-primary border-primary/30 bg-primary/5",
    "RAG":               "text-primary border-primary/30 bg-primary/5",
    "Agents":            "text-primary border-primary/30 bg-primary/5",
    "MCP":               "text-primary border-primary/30 bg-primary/5",
    "Claude API":        "text-primary border-primary/30 bg-primary/5",
    "n8n":               "text-primary border-primary/30 bg-primary/5",
    "SRE":               "text-highlight border-highlight/30 bg-highlight/5",
    "Full-Stack":        "text-secondary-foreground border-secondary-foreground/30 bg-secondary-foreground/5",
    "React Native":      "text-secondary-foreground border-secondary-foreground/30 bg-secondary-foreground/5",
    "Career":            "text-muted-foreground border-border/50 bg-surface",
    "Building in Public":"text-muted-foreground border-border/50 bg-surface",
};

const tagClass = (tag) =>
    TAG_COLORS[tag] || "text-muted-foreground border-border/50 bg-surface";

// ─── Section ──────────────────────────────────────────────────────────────────
export const Blogs = () => {
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

    // Shared card body used for both published and featured upcoming
    const PostCardBody = ({ post }) => (
        <>
            {/* Meta */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
                {post.url ? (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border/50 text-muted-foreground">
                        Coming soon
                    </span>
                )}
            </div>
            {/* Title */}
            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors mb-3 leading-snug">
                {post.title}
            </h3>
            {/* Excerpt */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                {post.excerpt}
            </p>
            {/* Tags */}
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
        <section id="blogs" className="py-24 relative overflow-hidden scroll-mt-24">
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

                {/* ── Published posts ── */}
                {published.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fade-in animation-delay-100">
                        {published.map((post, idx) => (
                            <a
                                key={idx}
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group glass rounded-2xl p-6 border border-border/30 hover:border-primary/40 transition-all duration-300 flex flex-col"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                <PostCardBody post={post} />
                            </a>
                        ))}
                    </div>
                )}

                {/* ── Featured upcoming posts (full opacity, no link) ── */}
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
