import { useState } from "react";
import { Button } from "@/components/Button";
import { Row, Check, Arrow } from "@/components/Checklist";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// The first viewport is the checklist card itself: identity block, then four
// challenge/response rows already answered. The CV is not a button floating
// under a headline — it is the response on the last line of the card.
//
// The card is RUN rather than revealed: `.run__body` cascades the leader dots
// row by row with an amber tracer down the margin, and the Status check lands
// with its own row. No word is ever hidden — see The Run in src/index.css.
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kervintznoel/", label: "LinkedIn", event: "linkedin_click" },
  { icon: FaGithub, href: "https://github.com/kervcodes", label: "GitHub", event: "github_click" },
];

// ─── The one row on the card the visitor can run ─────────────────────────────
// Every other row is already answered. This one is a step to perform, so when
// it is performed it gets checked — the third event, on the action this whole
// page is built to produce. The check is the same drawn stroke as the Status
// row above it, which is the point: the card is a checklist, and you just did
// one of the items. No copy claims the file arrived; the check reports the
// step, and the live region says the same thing to a screen reader.
const ResumeRow = () => {
  const [requested, setRequested] = useState(false);

  return (
    <Row label="Resume" size="lg">
      <span className="inline-flex items-center gap-2">
        <a
          href="/resume/kervintz_noel_resume.pdf"
          download="Kervintz_Noel_Resume.pdf"
          onClick={() => {
            setRequested(true);
            trackEvent("resume_download", { file: "Kervintz_Noel_Resume.pdf" });
          }}
          className="inline-flex items-center gap-2 text-ink underline underline-offset-4 decoration-2 decoration-caution hover:decoration-ink"
        >
          Download PDF
          <Arrow />
        </a>
        {requested && <Check className="text-verified" />}
      </span>
      <span className="sr-only" role="status">
        {requested ? "Resume download started." : ""}
      </span>
    </Row>
  );
};

export const Hero = () => (
  <section className="run relative pt-24 md:pt-28 pb-16 md:pb-20">
    <div className="max-w-5xl mx-auto px-5 md:px-6 relative z-10">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* ── The card. Nothing here fades in: every word is legible at first
             paint, and what moves is the checklist apparatus around it. ── */}
        <div className="lg:col-span-8 sheet">
          {/* Card header: the title block of a checklist */}
          <div className="run__head border-b border-rule px-5 md:px-8 pt-6 md:pt-8 pb-5">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <p className="placard text-ink-muted">Proc. 00 — Identity</p>
              <p className="placard text-ink-faint nums">Rev. 2026-08</p>
            </div>
            <h1 className="mt-4 text-[2.25rem] leading-[0.95] sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] text-ink uppercase">
              Kervintz
              <br />
              Noel
            </h1>
            <p className="mt-4 rule-sub placard text-ink">
              Software Engineer — Pre-Flight Checklist
            </p>
          </div>

          {/* Card body: the responses. The CV is the response on the last
              row — not a button parked underneath the card.
              Row order is load-bearing: the leader dots and the check are
              staggered by :nth-child, so inserting a row shifts the cascade. */}
          <div className="run__body px-5 md:px-8 py-6 md:py-7 space-y-4">
            <Row label="Location" size="lg">
              Boston, Massachusetts
            </Row>
            <Row label="Discipline" size="lg">
              Full-stack &amp; Site Reliability
            </Row>
            <Row label="Experience" size="lg">
              <span className="nums">12</span> years
            </Row>
            <Row label="Status" size="lg">
              <span className="inline-flex items-center gap-2 text-verified">
                <Check className="text-verified" />
                Open to full-time
              </span>
            </Row>
            <ResumeRow />

            <div className="rule-sub pt-5">
              <Button href="/#contact" size="lg">
                Get in touch
              </Button>
            </div>
          </div>
        </div>

        {/* ── The note beside the card ── */}
        <div className="lg:col-span-4">
          <p className="rule-head text-base md:text-lg leading-relaxed text-ink">
            I ran production systems before I built them.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Years of enterprise IT and infrastructure work, then site
            reliability engineering at Liberty Mutual — investigating
            production failures across distributed cloud services. Now I build
            full-stack products end to end.
          </p>

          <ul className="mt-6 rule-sub pt-4 flex items-center gap-4">
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
  </section>
);
