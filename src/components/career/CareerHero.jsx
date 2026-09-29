import { Link } from "react-router-dom";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Button } from "@/components/Button";
import { Arrow } from "@/components/Checklist";
import { POSITIONING } from "@/data/career";
import { RESUME_PATH, PROFILE } from "@/lib/profile";
import { TWIN_URL } from "@/lib/twin";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// CareerHero — the whole pitch in one iPad viewport: who, what, the career
// arc, and three actions. No photo exists in the repo, so the site's mark
// stands in for one, the same call /ride made. Nothing animates in: a visitor
// glancing at the table should be able to read it before they've stopped
// walking.
//
// The AI Twin action is the filled key. When the twin isn't configured
// (TWIN_URL unset) it hides itself like every other twin entry point, and
// "See what I've built" takes over the filled style.
// ─────────────────────────────────────────────────────────────────────────────
// The three titles, each separator riding on the title before it, so a wrap
// never starts a line with a dangling "·". Shared with the Connect section.
export const TitleLine = () =>
  POSITIONING.titles.map((t, i) => (
    <span key={t} className="inline-block">
      {t}
      {i < POSITIONING.titles.length - 1 && (
        <span className="text-caution mx-2" aria-hidden="true">
          ·
        </span>
      )}
    </span>
  ));

export const CareerHero = () => {
  const twinReady = Boolean(TWIN_URL);

  return (
    <section
      id="career-top"
      className="min-h-[100dvh] flex items-center py-14 md:py-16"
    >
      <div className="max-w-5xl mx-auto px-5 md:px-6 w-full">
        <div className="flex items-center gap-4">
          <span className="text-ink">
            <AnimatedLogo size={56} />
          </span>
          <p className="placard text-xs text-ink-muted">{PROFILE.location}</p>
        </div>

        <h1 className="mt-6 text-[2.75rem] leading-[0.95] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-ink uppercase">
          Kervintz Noel
        </h1>

        <p className="mt-4 rule-sub pt-3 font-mono uppercase tracking-[0.12em] text-sm md:text-base font-bold text-ink">
          <TitleLine />
        </p>

        <p className="mt-6 text-lg md:text-2xl leading-snug text-ink max-w-[40ch]">
          {POSITIONING.statement}
        </p>

        {/* The career arc — part of the story, not something to hide. */}
        <ol
          aria-label="Career progression"
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base text-ink-muted"
        >
          {POSITIONING.progression.map((step, i) => (
            <li key={step} className="inline-flex items-center gap-3">
              {i > 0 && <Arrow className="text-caution" />}
              <span className={i === POSITIONING.progression.length - 1 ? "font-bold text-ink" : ""}>
                {step}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <Button
            href="#career-twin"
            size="lg"
            variant={twinReady ? "outline" : "primary"}
            onClick={() => trackEvent("career_cta_click", { cta: "built" })}
          >
            See what I've built
          </Button>
          {twinReady && (
            <Button
              as={Link}
              to="/twin"
              size="lg"
              onClick={() =>
                trackEvent("career_cta_click", { cta: "twin", placement: "hero" })
              }
            >
              Ask my AI Twin
              <Arrow />
            </Button>
          )}
          <Button
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="outline"
            onClick={() => trackEvent("career_cta_click", { cta: "resume" })}
          >
            View résumé
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
