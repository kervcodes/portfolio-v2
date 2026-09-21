import { SectionHead } from "@/components/Checklist";
import { Entry } from "@/lib/sequence";

// ─────────────────────────────────────────────────────────────────────────────
// ExperienceSummary — a scan-friendly summary, not the résumé. Each line is
// grounded in a real entry from src/sections/Experience.jsx (Independent
// Engineer, SRE at Liberty Mutual, Brown Rudnick) — compressed into one line
// per category rather than reproduced in full.
// ─────────────────────────────────────────────────────────────────────────────
const AREAS = [
  {
    label: "AI workflow implementation",
    detail: "Designing and shipping AI-powered systems for real operations.",
  },
  {
    label: "Full-stack software development",
    detail: "React, React Native, Next.js, and TypeScript across the stack.",
  },
  {
    label: "AWS & serverless systems",
    detail: "Cloud infrastructure behind production applications.",
  },
  {
    label: "Production reliability & incident operations",
    detail: "Root-cause analysis and monitoring at a Fortune 100 company.",
  },
  {
    label: "Enterprise technical support",
    detail: "Primary escalation point for enterprise legal technology platforms.",
  },
];

export const ExperienceSummary = () => (
  <section id="ride-experience" className="py-16 md:py-24 scroll-mt-10">
    <div className="max-w-5xl mx-auto px-5 md:px-6">
      <SectionHead
        index="02"
        title="Experience"
        lede="Twelve years from enterprise IT support to site reliability engineering to independent AI and software engineering."
      />
      <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
        {AREAS.map((area) => (
          <Entry as="li" key={area.label} className="rule-sub pt-3">
            <p className="font-bold text-ink">{area.label}</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              {area.detail}
            </p>
          </Entry>
        ))}
      </ul>
    </div>
  </section>
);

export default ExperienceSummary;
