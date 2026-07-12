import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { getPostBySlug } from "@/data/posts";

// ─── Tag color map (mirrors Posts.jsx) ───────────────────────────────────────
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
    "Career":             "text-muted-foreground border-border/50 bg-muted",
    "Building in Public": "text-muted-foreground border-border/50 bg-muted",
};
const tagClass = (tag) => TAG_COLORS[tag] || "text-muted-foreground border-border/50 bg-muted";

// ─── Content block renderer ───────────────────────────────────────────────────
const ContentBlock = ({ block }) => {
    switch (block.type) {
        case "paragraph":
            return (
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                    {block.text}
                </p>
            );
        case "heading":
            return (
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6 leading-snug">
                    {block.text}
                </h2>
            );
        case "subheading":
            return (
                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                    {block.text}
                </h3>
            );
        case "image":
            return (
                <figure className="my-10">
                    <img
                        src={block.src}
                        alt={block.caption || ""}
                        className="w-full rounded-2xl object-cover max-h-[500px]"
                    />
                    {block.caption && (
                        <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );
        case "list":
            return (
                <ol className="list-decimal list-inside space-y-2 mb-6 ml-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="text-foreground/80 text-lg leading-relaxed">
                            {item}
                        </li>
                    ))}
                </ol>
            );
        case "divider":
            return <hr className="border-border my-10" />;
        case "callout":
            return (
                <blockquote className="border-l-4 border-primary pl-6 my-8">
                    <p className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
                        {block.text}
                    </p>
                </blockquote>
            );
        default:
            return null;
    }
};

// ─── Coming Soon page ─────────────────────────────────────────────────────────
const ComingSoonPage = ({ post }) => (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-4">
            Coming Soon
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground max-w-2xl mb-6 leading-snug">
            {post.title}
        </h1>
        <p className="text-muted-foreground max-w-lg mb-8">{post.excerpt}</p>
        <Link
            to="/#posts"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
        </Link>
    </div>
);

// ─── 404 page ─────────────────────────────────────────────────────────────────
const NotFoundPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-6xl font-bold text-primary mb-4">404</p>
        <p className="text-foreground text-xl mb-6">Post not found.</p>
        <Link
            to="/#posts"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
        </Link>
    </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export const PostDetail = () => {
    const { slug } = useParams();
    const post = getPostBySlug(slug);

    if (!post) return (
        <div className="min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="pt-20"><NotFoundPage /></main>
            <Footer />
        </div>
    );

    if (post.comingSoon) return (
        <div className="min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="pt-20"><ComingSoonPage post={post} /></main>
            <Footer />
        </div>
    );

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-20">
                {/* ── Cover image ── */}
                {post.coverImage && (
                    <div className="w-full max-h-[520px] overflow-hidden">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* ── Article ── */}
                <article className="container max-w-3xl mx-auto px-6 py-16">

                    {/* Back link */}
                    <Link
                        to="/#posts"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        All posts
                    </Link>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`px-2.5 py-0.5 rounded-full text-xs border ${tagClass(tag)}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-12 pb-8 border-b border-border">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                        </span>
                        <span>By Kervintz Noel</span>
                        {post.hashnodeUrl && (
                            <a
                                href={post.hashnodeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline ml-auto"
                            >
                                Read on Hashnode
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        {post.content.map((block, i) => (
                            <ContentBlock key={i} block={block} />
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-16 pt-10 border-t border-border text-center">
                        <p className="text-muted-foreground mb-4 text-sm">
                            Follow along at{" "}
                            <a href="https://kervintznoel.com" className="text-primary hover:underline">
                                kervintznoel.com
                            </a>
                            {" "}and on{" "}
                            <a
                                href="https://hashnode.com/@kervcodes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                Hashnode
                            </a>
                            .
                        </p>
                        <Link
                            to="/#posts"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to all posts
                        </Link>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default PostDetail;
