import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { POSTS } from "@/data/posts";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/Button";
import { useSectionLink } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// /blog — every published post, newest first, with category filters.
//
// Posts come from src/data/posts.js, which keeps them newest first; that
// order is used as-is (dates there are month-level, so they can't sort
// finer than the file already does).
//
// CATEGORIES are drawn from each post's own `tags`. A category only shows
// when at least one published post has its tag, so a new one appears on its
// own once a post carries it. "AI Engineering" is left out on purpose: every
// post has it, so as a filter it would just repeat All Posts.
//
// The active category lives in the URL (?category=python), so a filtered
// view can be linked to and survives Back.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "build-logs", label: "Build Logs", tag: "Building in Public" },
  { id: "llm-evaluation", label: "LLM Evaluation", tag: "LLM Evaluation" },
  { id: "python", label: "Python", tag: "Python" },
  { id: "typescript", label: "TypeScript", tag: "TypeScript" },
  { id: "career", label: "Career", tag: "Career" },
];

const published = POSTS.filter((p) => !p.comingSoon && !p.unlisted);
const upcoming = POSTS.filter((p) => p.comingSoon && !p.unlisted);
const available = CATEGORIES.map((c) => ({
  ...c,
  count: published.filter((p) => p.tags?.includes(c.tag)).length,
})).filter((c) => c.count > 0);

const Chip = ({ active, onClick, children, count }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${
      active
        ? "bg-caution border-caution text-ink"
        : "bg-sheet border-rule text-ink-muted hover:border-ink-faint hover:text-ink"
    }`}
  >
    {children}
    <span className={`text-xs ${active ? "text-ink/70" : "text-ink-faint"}`}>{count}</span>
  </button>
);

export const Blog = () => {
  const [params, setParams] = useSearchParams();
  const go = useSectionLink();
  const activeId = available.some((c) => c.id === params.get("category"))
    ? params.get("category")
    : "all";
  const active = available.find((c) => c.id === activeId);
  const shown = active ? published.filter((p) => p.tags?.includes(active.tag)) : published;

  const select = (id) => {
    trackEvent("blog_filter", { category: id });
    setParams(id === "all" ? {} : { category: id }, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      <Helmet>
        <title>Blog & Insights | Kervintz Noel</title>
        <meta
          name="description"
          content="Practical insights on software engineering, applied AI, system reliability, and building real-world applications — build logs and labs by Kervintz Noel."
        />
      </Helmet>
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section
          className="pt-32 md:pt-40 pb-10 md:pb-14"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--color-caution) 14%, transparent), transparent 70%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05] text-ink">
              Blog &amp; Insights
            </h1>
            <p className="mt-4 mx-auto text-body text-ink-muted max-w-[52ch]">
              Practical insights on software engineering, applied AI, system
              reliability, and building real-world applications.
            </p>

            <div
              role="group"
              aria-label="Filter posts by category"
              className="mt-8 flex flex-wrap justify-center gap-2"
            >
              <Chip active={activeId === "all"} onClick={() => select("all")} count={published.length}>
                All Posts
              </Chip>
              {available.map((c) => (
                <Chip key={c.id} active={activeId === c.id} onClick={() => select(c.id)} count={c.count}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </div>
        </section>

        {/* ── Latest posts ── */}
        <section aria-labelledby="latest-posts" className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="latest-posts" className="text-2xl md:text-3xl font-bold tracking-tight text-ink">
                {active ? active.label : "Latest Posts"}
              </h2>
              <p className="text-sm text-ink-faint" aria-live="polite">
                {shown.length} {shown.length === 1 ? "post" : "posts"}
              </p>
            </div>

            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>

            {/* Pipeline: titles only. These aren't finished articles and
                aren't dressed as any. */}
            {upcoming.length > 0 && !active && (
              <div className="mt-14">
                <p className="text-sm font-bold text-ink-faint">In the pipeline</p>
                <ul className="mt-3">
                  {upcoming.map((post) => (
                    <li
                      key={post.slug}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 border-t border-rule"
                    >
                      <span className="text-ink-muted">{post.title}</span>
                      <span className="text-sm text-ink-faint">{post.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-10 text-sm text-ink-muted">
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

        {/* ── Call to action ── */}
        <section className="on-panel bg-panel text-panel-ink py-16 md:py-24 border-b border-panel-2">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Let's Build Something Meaningful
            </h2>
            <p className="mt-4 mx-auto text-body text-panel-muted max-w-[52ch]">
              Interested in software engineering, applied AI, or building
              reliable systems? Let's connect.
            </p>
            <div className="mt-8">
              <Button
                href="/#contact"
                variant="panel"
                onClick={(e) => {
                  trackEvent("blog_cta_click", { cta: "get_in_touch" });
                  go(e, "/#contact");
                }}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
