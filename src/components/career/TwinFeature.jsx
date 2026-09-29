import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { SectionHead, Status, Arrow } from "@/components/Checklist";
import { Chips } from "@/components/career/Chips";
import { Entry } from "@/lib/sequence";
import { TWIN_FEATURE } from "@/data/career";
import { getProjectBySlug } from "@/data/projects";
import { TWIN_URL } from "@/lib/twin";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// TwinFeature — the lead project, because it's the one a visitor can use
// right here. Nothing is embedded or simulated on this page: every "ask"
// goes to the real twin at /twin.
//
// The suggested questions are links to /twin, not prefilled prompts — the
// twin (a Gradio Space) has no way to receive a question through its URL, so
// the page says "try asking" rather than pretending to hand it over.
// ─────────────────────────────────────────────────────────────────────────────
const Block = ({ label, children, rule = true }) => (
  <div className={rule ? "rule-sub pt-3" : undefined}>
    <p className="placard text-xs text-ink-muted">{label}</p>
    <div className="mt-2">{children}</div>
  </div>
);

export const TwinFeature = () => {
  const project = getProjectBySlug("digital-twin");
  const twinReady = Boolean(TWIN_URL);
  const ask = (placement) => () =>
    trackEvent("career_cta_click", { cta: "twin", placement });

  return (
    <section id="career-twin" className="py-14 md:py-20 scroll-mt-6">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <SectionHead
          index="02"
          title="Featured work"
          lede="Something you can try right now, then something still being built."
        />

        <Entry as="article" className="mt-8 sheet">
          <div className="border-b border-rule px-5 md:px-8 pt-6 pb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl md:text-4xl font-bold text-ink tracking-tight">
              {project.name}
            </h3>
            <span className="*:text-xs">
              <Status kind="verified">Shipped</Status>
            </span>
          </div>

          <div className="px-5 md:px-8 py-6 md:py-8 grid lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7 space-y-6">
              <Block label="Problem" rule={false}>
                <p className="text-base md:text-lg text-ink leading-relaxed">
                  {TWIN_FEATURE.problem}
                </p>
              </Block>
              <Block label="What I built">
                <p className="text-base md:text-lg text-ink leading-relaxed">
                  {TWIN_FEATURE.built}
                </p>
              </Block>
              <Block label="Engineering">
                <Chips items={TWIN_FEATURE.engineering} />
              </Block>
              {twinReady && (
                <Button
                  as={Link}
                  to="/twin"
                  size="lg"
                  className="w-full sm:w-auto text-base py-5"
                  onClick={ask("twin_feature")}
                >
                  Ask my AI Twin
                  <Arrow />
                </Button>
              )}
            </div>

            <div className="lg:col-span-5">
              <p className="placard text-xs text-ink-muted">
                Try asking
              </p>
              <ul className="mt-2 divide-y divide-rule border-y border-rule">
                {TWIN_FEATURE.questions.map((q) => (
                  <li key={q}>
                    {twinReady ? (
                      <Link
                        to="/twin"
                        onClick={ask("suggested_question")}
                        className="flex min-h-12 items-center justify-between gap-3 py-2.5 text-ink hover:text-caution-ink transition-colors"
                      >
                        <span className="leading-snug">&ldquo;{q}&rdquo;</span>
                        <Arrow className="text-ink-muted" />
                      </Link>
                    ) : (
                      <p className="py-2.5 text-ink leading-snug">&ldquo;{q}&rdquo;</p>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                to="/projects/digital-twin"
                className="mt-4 inline-flex min-h-11 items-center gap-2 placard text-xs text-ink hover:text-caution-ink transition-colors"
              >
                How it's built
                <Arrow />
              </Link>
            </div>
          </div>
        </Entry>
      </div>
    </section>
  );
};

export default TwinFeature;
