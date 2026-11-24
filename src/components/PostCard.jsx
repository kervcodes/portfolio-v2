import { Link } from "react-router-dom";
import { usePageTurn, useTurnKey, opensElsewhere } from "@/lib/motion";
import { useState } from "react";
import { isExternalPost } from "@/data/posts";

// ─────────────────────────────────────────────────────────────────────────────
// PostCard — one article in the blog grid (the /blog page and the homepage
// preview share it).
//
// Editorial order, top to bottom: a 3:2 cover, the date and reading time on
// one line, the title, an excerpt clamped to three lines, then the author.
// The whole card is one link. Cards in a row stretch to the same height and
// the author line sits at the bottom, so rows stay aligned.
//
// Every post on this site is written by one author, so the byline is fixed
// rather than read from post data (posts.js has no author field).
//
// While a card is the one being turned to, its date line and title carry the
// same view-transition names as the article header, so they travel into it.
// ─────────────────────────────────────────────────────────────────────────────

const AUTHOR = { name: "Kervintz Noel", avatar: "/images/kn.jpg" };

// Tags that say what a post is about rather than what it's built with. The
// first one a post has becomes its cover's subject when it isn't part of a
// series. "AI Engineering" is on every post, so it would say nothing.
const SUBJECT_TAGS = ["LLM Evaluation", "Structured Outputs", "Career"];
const TECH_TAGS = ["Python", "TypeScript", "Pydantic", "Claude Code"];

// ─── Cover ───────────────────────────────────────────────────────────────────
// A post's own image when it has one; otherwise a typographic cover built
// from the post's metadata in the site palette — the series and entry number
// for a build log, the subject for anything else, and the languages used.
// Pure CSS: nothing to download, and nothing unrelated to the article.
export const PostCover = ({ post, className = "" }) => {
  // If the image file is missing, fall back to the typographic cover rather
  // than showing a broken-image icon.
  const [imageFailed, setImageFailed] = useState(false);

  if (post.coverImage && !imageFailed) {
    // A cover that isn't 3:2 (a square social image, say) can set
    // coverFit: "contain" plus coverBg, its own edge color, to show whole on
    // a matching background instead of being cropped to fill the frame.
    const contain = post.coverFit === "contain";
    return (
      <img
        src={post.coverImage}
        alt=""
        loading="lazy"
        onError={() => setImageFailed(true)}
        style={contain && post.coverBg ? { backgroundColor: post.coverBg } : undefined}
        className={`w-full h-full ${contain ? "object-contain" : "object-cover"} ${className}`}
      />
    );
  }

  const isBuildLog = Boolean(post.series && post.seriesIndex);
  const subject = SUBJECT_TAGS.find((t) => post.tags?.includes(t));
  const tech = TECH_TAGS.filter((t) => post.tags?.includes(t)).slice(0, 3);

  const eyebrow = isBuildLog
    ? post.seriesLabel?.replace(/ build log$/i, "") ?? "Build log"
    : "Lab notes";
  const headline = isBuildLog ? `#${post.seriesIndex}` : subject ?? "Notes";
  const caption = isBuildLog ? "Build log" : null;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-full bg-panel text-panel-ink overflow-hidden ${className}`}
      style={{
        backgroundImage: [
          // A soft glow, amber for build logs and blue for everything else.
          `radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, ${
            isBuildLog ? "var(--color-caution)" : "var(--color-tag-blue)"
          } 30%, transparent), transparent 60%)`,
          // Faint graph-paper lines.
          "linear-gradient(color-mix(in srgb, var(--color-panel-ink) 6%, transparent) 1px, transparent 1px)",
          "linear-gradient(90deg, color-mix(in srgb, var(--color-panel-ink) 6%, transparent) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "100% 100%, 24px 24px, 24px 24px",
      }}
    >
      <div className="absolute inset-0 p-5 flex flex-col">
        <p className="text-xs font-bold text-panel-muted">{eyebrow}</p>
        <div className="mt-auto">
          {caption && <p className="text-sm font-bold text-caution">{caption}</p>}
          <p
            className={`font-bold leading-none tracking-tight ${
              isBuildLog ? "text-6xl text-panel-ink" : "text-3xl text-panel-ink"
            }`}
          >
            {headline}
          </p>
          {tech.length > 0 && (
            <p className="mt-3 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-panel-2 px-2 py-0.5 text-[11px] font-bold text-panel-muted"
                >
                  {t}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Card ────────────────────────────────────────────────────────────────────
export const PostCard = ({ post, headingLevel = "h3" }) => {
  const turn = usePageTurn();
  const paired = useTurnKey() === post.slug;
  const to = `/posts/${post.slug}`;
  const Heading = headingLevel;
  // A post with no on-site body lives only on Hashnode: link out to it.
  const external = isExternalPost(post);
  const CardLink = external ? "a" : Link;
  const linkProps = external
    ? { href: post.hashnodeUrl, target: "_blank", rel: "noopener noreferrer" }
    : {
        to,
        onClick: (e) => {
          if (opensElsewhere(e)) return;
          e.preventDefault();
          turn(to, post.slug);
        },
      };

  return (
    <article className="h-full">
      <CardLink
        {...linkProps}
        className="group flex flex-col h-full rounded-xl border border-rule bg-sheet p-3 transition-colors duration-200 hover:border-ink-faint focus-visible:outline-offset-4"
      >
        <div className="aspect-[3/2] overflow-hidden rounded-lg">
          <PostCover
            post={post}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>

        <div className="flex flex-col flex-1 px-2 pt-4 pb-2">
          <p
            className="text-sm text-ink-faint"
            style={paired ? { viewTransitionName: "note-stamp" } : undefined}
          >
            {post.date}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {post.readTime}
          </p>
          <Heading
            className="mt-2 text-lg md:text-xl font-bold leading-snug tracking-tight text-ink group-hover:text-caution-ink transition-colors"
            style={paired ? { viewTransitionName: "note-entry" } : undefined}
          >
            {post.title}
          </Heading>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted line-clamp-3">
            {post.excerpt}
          </p>

          <p className="mt-auto pt-4 flex items-center gap-2.5 text-sm">
            <img
              src={AUTHOR.avatar}
              alt=""
              width="28"
              height="28"
              loading="lazy"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="font-bold text-ink">{AUTHOR.name}</span>
          </p>
        </div>
      </CardLink>
    </article>
  );
};

export default PostCard;
