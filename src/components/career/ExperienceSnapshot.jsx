import { SectionHead, Arrow } from "@/components/Checklist";
import { Chips } from "@/components/career/Chips";
import { Entry } from "@/lib/sequence";
import { EXPERIENCE_STAGES } from "@/data/career";

// ─────────────────────────────────────────────────────────────────────────────
// ExperienceSnapshot — the career arc as three stages, not the résumé. Each
// stage names the areas it covers and a handful of recognizable tools, which
// is all a recruiter needs before the conversation (or the PDF) fills in the
// rest. The support years are shown as the foundation they are.
// ─────────────────────────────────────────────────────────────────────────────
export const ExperienceSnapshot = () => (
  <section
    id="career-experience"
    className="py-14 md:py-20 scroll-mt-6 border-t border-rule"
  >
    <div className="max-w-5xl mx-auto px-5 md:px-6">
      <SectionHead
        index="03"
        title="Experience snapshot"
        lede="Twelve years, each stage built on the one before it."
      />

      <ol className="mt-8 grid md:grid-cols-3 gap-4 md:gap-8">
        {EXPERIENCE_STAGES.map((s, i) => (
          <Entry as="li" key={s.stage} className="relative rule-head pt-3">
            {i > 0 && (
              <span
                className="hidden md:flex absolute top-3 -left-7 w-6 justify-center text-caution"
                aria-hidden="true"
              >
                <Arrow />
              </span>
            )}
            <p className="placard text-xs text-ink-muted nums">{s.when}</p>
            <h3 className="mt-1 text-lg md:text-xl font-bold text-ink tracking-tight leading-snug">
              {s.stage}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{s.where}</p>
            <ul className="mt-3 space-y-1">
              {s.areas.map((a) => (
                <li key={a} className="text-ink font-medium leading-snug">
                  {a}
                </li>
              ))}
            </ul>
            <Chips items={s.tools} className="mt-3" />
          </Entry>
        ))}
      </ol>
    </div>
  </section>
);

export default ExperienceSnapshot;
