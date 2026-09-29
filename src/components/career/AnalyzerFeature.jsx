import { Link } from "react-router-dom";
import { Status, Arrow } from "@/components/Checklist";
import { Chips } from "@/components/career/Chips";
import { Entry } from "@/lib/sequence";
import { ANALYZER_FEATURE } from "@/data/career";
import { getProjectBySlug } from "@/data/projects";

// ─────────────────────────────────────────────────────────────────────────────
// AnalyzerFeature — the in-progress project, laid out as conversation
// prompts: the pipeline to point at, then four talking points (privacy, the
// AI boundary, testing, one product decision). "Works today" and "Not yet"
// are both on the card, read from the v1 roadmap in projects.js, so the page
// never claims more than the build has done.
//
// The screenshot is the real dashboard already committed for the case study.
// ─────────────────────────────────────────────────────────────────────────────
export const AnalyzerFeature = () => {
  const project = getProjectBySlug("local-bank-statement-analyzer");
  const f = ANALYZER_FEATURE;

  return (
    <section id="career-analyzer" className="pb-14 md:pb-20 scroll-mt-6">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        <Entry as="article" className="sheet">
          <div className="border-b border-rule px-5 md:px-8 pt-6 pb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl md:text-4xl font-bold text-ink tracking-tight">
              Bank Statement Analyzer
            </h3>
            <span className="*:text-xs">
              <Status kind={project.status}>Building</Status>
            </span>
          </div>

          <div className="px-5 md:px-8 py-6 md:py-8">
            <p className="text-base md:text-lg text-ink leading-relaxed max-w-[60ch]">
              {f.summary}
            </p>

            {/* The pipeline: a column on phones and portrait tablets, one row in landscape. */}
            <ol
              aria-label="Processing pipeline"
              className="mt-7 grid gap-3 lg:grid-cols-5 lg:gap-6"
            >
              {f.pipeline.map((step, i) => (
                <li
                  key={step.label}
                  className="relative border border-ink bg-sheet px-4 py-3"
                >
                  <p className="placard text-xs text-ink-muted nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-bold text-ink leading-tight">
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted leading-snug">
                    {step.detail}
                  </p>
                  {i < f.pipeline.length - 1 && (
                    <span
                      className="hidden lg:flex absolute top-1/2 -right-6 w-6 -translate-y-1/2 justify-center text-caution"
                      aria-hidden="true"
                    >
                      <Arrow />
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-8 grid lg:grid-cols-12 gap-8">
              <figure className="lg:col-span-6">
                <div className="border border-rule bg-ground overflow-hidden">
                  <img
                    src="/projects/bank-statement-analyzer-dashboard.png"
                    alt="Bank Statement Analyzer dashboard showing cash flow and spending by category"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-ink-muted">
                  The dashboard today. Every figure clicks through to its
                  source transactions.
                </figcaption>
              </figure>

              <dl className="lg:col-span-6 space-y-4">
                {f.talkingPoints.map((t) => (
                  <div key={t.label} className="rule-sub pt-2">
                    <dt className="placard text-xs text-ink-muted">{t.label}</dt>
                    <dd className="mt-1 text-ink leading-snug">{t.body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="border-l-4 border-verified pl-4">
                <p className="placard text-xs text-verified">Works today</p>
                <p className="mt-1 text-ink leading-snug">{f.working}</p>
              </div>
              <div className="border-l-4 border-caution pl-4">
                <p className="placard text-xs text-caution-ink">Not yet</p>
                <p className="mt-1 text-ink leading-snug">{f.notYet}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Chips items={f.stack} />
              <Link
                to="/projects/local-bank-statement-analyzer"
                className="inline-flex min-h-11 items-center gap-2 placard text-xs text-ink hover:text-caution-ink transition-colors"
              >
                Architecture & build log
                <Arrow />
              </Link>
            </div>
          </div>
        </Entry>
      </div>
    </section>
  );
};

export default AnalyzerFeature;
