import { Button } from "@/components/Button";
import { SectionHead, Arrow } from "@/components/Checklist";
import { HIRING_TRACKS } from "@/data/career";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// RoleSelector — "What are you hiring for?" Four keys, one short block of
// strengths underneath. Local state only; the page owns it so the idle reset
// can put the selector back to its default for the next visitor.
//
// The keys are the site's own Button in its two states — filled for the
// selected track, outline for the rest — with aria-pressed carrying the same
// fact for assistive tech. The block swaps instantly: a recruiter tapping
// through all four should never wait on a transition.
// ─────────────────────────────────────────────────────────────────────────────
export const RoleSelector = ({ value, onChange }) => {
  const track = HIRING_TRACKS.find((t) => t.id === value) ?? HIRING_TRACKS[0];

  return (
    <section id="career-hiring" className="py-14 md:py-20 scroll-mt-6">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <SectionHead
          index="01"
          title="What are you hiring for?"
          lede="Tap a role to see the strengths that matter most for it."
        />

        <div
          role="group"
          aria-label="Role you're hiring for"
          className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {HIRING_TRACKS.map((t) => (
            <Button
              key={t.id}
              type="button"
              variant={t.id === track.id ? "primary" : "outline"}
              aria-pressed={t.id === track.id}
              className="w-full h-full min-h-14 text-center leading-snug"
              onClick={() => {
                onChange(t.id);
                trackEvent("career_role_selected", { role: t.id });
              }}
            >
              {t.label}
            </Button>
          ))}
        </div>

        <div className="mt-6 sheet p-5 md:p-7" aria-live="polite">
          <p className="text-lg md:text-xl font-bold text-ink tracking-tight">
            {track.lede}
          </p>
          <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {track.strengths.map((s) => (
              <li key={s.label} className="rule-sub pt-2">
                <p className="font-bold text-ink">{s.label}</p>
                <p className="mt-0.5 text-sm text-ink-muted leading-snug">
                  {s.detail}
                </p>
              </li>
            ))}
          </ul>
          <a
            href={track.proof.href}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono uppercase tracking-[0.14em] text-xs font-bold text-ink underline underline-offset-4 decoration-2 decoration-caution hover:decoration-ink"
          >
            {track.proof.label}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoleSelector;
