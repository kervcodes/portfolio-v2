import { Button } from "@/components/Button";
import { Arrow } from "@/components/Checklist";
import { FaAws, FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  SiClaude,
  SiDatadog,
  SiFastapi,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// Two-column hero: introduction on the left (greeting, name, stack line, short
// bio, then a card with the specialty blurb, tool icons and the three section
// links), headshot on the right. Stacks to one column below `lg`, photo first.
// ─────────────────────────────────────────────────────────────────────────────

// Drop a square-ish photo in /public and point this at it, e.g. "/headshot.jpg".
// While it is null the frame shows initials instead of a broken image.
const HEADSHOT_SRC = "/images/kn.jpg";

// Same tools the About and Experience sections already list — nothing here
// that isn't backed elsewhere on the page. Each icon wears its own brand
// colour; React's is the darker react.dev cyan so it holds up on white.
const tools = [
  { icon: SiPython, label: "Python", color: "#3776AB" },
  { icon: SiFastapi, label: "FastAPI", color: "#009688" },
  { icon: SiReact, label: "React", color: "#087EA4" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: FaAws, label: "AWS", color: "#FF9900" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  { icon: SiDatadog, label: "Datadog", color: "#632CA6" },
  { icon: SiClaude, label: "Claude", color: "#D97757" },
];

// Page-load entrance: each block rises in on a short stagger. `hero-rise`
// and `hero-photo` live in index.css, and reduced-motion turns them off.
const delay = (ms) => ({ animationDelay: `${ms}ms` });

const socials = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kervintznoel/", label: "LinkedIn", event: "linkedin_click" },
  { icon: FaGithub, href: "https://github.com/kervcodes", label: "GitHub", event: "github_click" },
];

const Headshot = () => (
  <div className="relative w-64 sm:w-80 lg:w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-rule shadow-[0_24px_48px_-20px_color-mix(in_srgb,var(--color-ink)_45%,transparent)]">
    {HEADSHOT_SRC ? (
      <img
        src={HEADSHOT_SRC}
        alt="Kervintz Noel"
        width="640"
        height="640"
        className="w-full h-full object-cover"
        fetchPriority="high"
      />
    ) : (
      <div
        className="w-full h-full flex items-center justify-center bg-panel text-panel-ink text-7xl font-bold tracking-tight"
        aria-hidden="true"
      >
        KN
      </div>
    )}
  </div>
);

export const Hero = () => (
  <section className="relative mt-30 pt-24 md:pt-32 pb-16 md:pb-24">
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* ── Photo: first on mobile, right column on desktop ── */}
        <div className="hero-photo lg:col-span-5 lg:order-2 flex justify-center lg:justify-end" style={delay(150)}>
          <Headshot />
        </div>

        {/* ── Introduction ── */}
        <div className="lg:col-span-7 lg:order-1">
          <p className="hero-rise text-lg text-ink-muted" style={delay(0)}>Hi! My name is</p>
          <h1 className="hero-rise mt-1 text-5xl sm:text-6xl font-bold tracking-[-0.03em] leading-[1.02] text-ink" style={delay(80)}>
            Kervintz Noel
          </h1>
          <p className="hero-rise mt-3 placard text-ink-faint" style={delay(160)}>
            AI Solutions Engineer · Python · React · AWS · LLM Workflows
          </p>

          <p className="hero-rise mt-6 text-base md:text-lg leading-relaxed text-ink max-w-[58ch]" style={delay(240)}>
            I'm a Boston-based engineer who designs, implements, and stabilizes
            AI-powered workflows for real business operations. Twelve years
            across enterprise IT, legal technology, and site reliability
            engineering taught me how systems actually fail. Now I build
            the ones that don't.
          </p>

          {/* ── The card ── */}
          <div className="hero-rise mt-8 sheet rounded-xl px-6 md:px-8 py-7" style={delay(340)}>
            <p className="text-sm md:text-[0.9375rem] leading-relaxed text-ink-muted">
              I specialize in turning AI prototypes into dependable systems —
              API integrations, LLM workflows, and the monitoring that keeps
              them honest in production. I'm just as comfortable debugging a
              customer's integration as I am designing the backend behind it.
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-4" aria-label="Tools I work with">
              {tools.map((t, i) => (
                <li key={t.label} title={t.label} className="hero-pop" style={delay(520 + i * 50)}>
                  <t.icon
                    className="w-8 h-8 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ color: t.color }}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{t.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/#about">Get to Know Me</Button>
              <Button href="/#experience">See My Work</Button>
              <Button href="/#contact">Let's Connect</Button>
            </div>
          </div>

          {/* ── Résumé + socials ── */}
          <div className="hero-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-2" style={delay(460)}>
            <a
              href="/resume/kervintz_noel_resume.pdf"
              download="Kervintz_Noel_Resume.pdf"
              onClick={() => trackEvent("resume_download", { file: "Kervintz_Noel_Resume.pdf" })}
              className="inline-flex items-center gap-2 text-sm font-bold text-ink underline underline-offset-4 decoration-2 decoration-caution hover:decoration-ink"
            >
              Download resume
              <Arrow />
            </a>
            <ul className="flex items-center gap-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    onClick={() => trackEvent(s.event, { source: "hero" })}
                    className="min-w-11 min-h-11 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                  >
                    <s.icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);
