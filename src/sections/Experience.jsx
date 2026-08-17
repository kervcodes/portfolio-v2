import { SectionHead, Status } from "@/components/Checklist";
import { Entry } from "@/lib/sequence";
import { tagBorderClass } from "@/lib/tagColors";

// NOTE: product names stay out of this file until domains and trademarks are
// secured. Describe the work, not the brands.
const experiences = [
  {
    period: "Jun 2025 — Present",
    role: "Independent Engineer",
    company: "Self-Directed",
    place: "Boston, MA",
    description:
      "Building across mobile, web, and infrastructure, with four independent products owned end to end — from architecture and implementation through testing and release. Currently expanding that work into AI engineering through a focused program of advanced coursework and production-oriented projects built in public",
    technologies: ["React", "React Native", "Next.js", "AWS", "TypeScript", "Supabase"],
    current: true,
  },
  {
    period: "Jan 2023 — Jun 2025",
    role: "Site Reliability Engineer",
    company: "Liberty Mutual Insurance",
    place: "Boston, MA",
    description:
      "Investigated production issues across distributed cloud services, APIs, and event-driven systems, driving root-cause analysis with engineering teams. Analyzed internal and third-party APIs to identify technical debt and failure patterns. Built a React-based internal dashboard to visualize system health and improve operational visibility. Monitored production environments using Datadog and BigPanda, correlating alerts to reduce noise and accelerate resolution.",
    technologies: ["AWS", "React", "Datadog", "BigPanda", "Python", "GitHub Actions"],
  },
  {
    period: "Jun 2019 — Nov 2021",
    role: "Enterprise Applications Support Specialist",
    company: "Brown Rudnick LLP",
    place: "Boston, MA",
    description:
      "Administered and supported enterprise legal technology platforms (iManage Work, Aderant Expert, Intapp, CompuLaw) across eight international offices, serving as primary escalation point for application-level incidents. Designed onboarding documentation adopted firm-wide that reduced new-hire ramp-up time by ~15%. Proactively identified recurring failure trends and drove process improvements that reduced repeat incident volume. Managed 40+ daily support requests while maintaining SLA compliance.",
    technologies: ["iManage", "Aderant Expert", "Intapp", "CompuLaw", "ServiceNow"],
  },
  {
    period: "Aug 2018 — Apr 2019",
    role: "Desktop Support Analyst",
    company: "Massachusetts College of Art and Design",
    place: "Boston, MA",
    description:
      "Delivered end-user support for faculty, staff, and students across a public higher-education environment. Deployed, imaged, and configured 100+ Windows and macOS devices. Led software packaging and deployment to classrooms using PDQ Deploy. Collaborated on Windows 7 to Windows 10 migration and maintained accurate device configuration documentation.",
    technologies: ["Active Directory", "PDQ Deploy", "Windows", "macOS", "SCCM"],
  },
  {
    period: "2014 — Jul 2018",
    role: "IT Support Specialist",
    company: "Full-Time & Contract Roles",
    place: "Boston, MA",
    description:
      "Provided Tier 1 and Tier 2 support across enterprise and academic environments. Supported Windows and macOS endpoints, printers, conferencing tools, and mobile devices. Handled user access, authentication, and account troubleshooting in Active Directory environments. Executed scripted and command-line tasks for deployments, logging and resolving tickets in accordance with SLA expectations.",
    technologies: ["Active Directory", "SCCM", "PDQ Deploy", "ServiceNow", "Zendesk"],
  },
];

export const Experience = () => (
  <section id="experience" className="py-16 md:py-24 scroll-mt-20">
    <div className="max-w-5xl mx-auto px-5 md:px-6">
      <SectionHead
        index="02"
        title="Record"
        lede="Twelve years from help desk to site reliability engineering to independent AI and software engineering — the roles where I learned how production systems actually break, and how to build them so they don't."
      />

      {/* Each role is an entry in the record: the period is the response, the
          role is the challenge, and every line below it is checkable.

          The column is taller than the viewport, so each entry arms itself
          rather than sharing one trigger — an entry arrives when it is
          actually reached, which on a twelve-year record is the whole point. */}
      <ol className="mt-10">
        {experiences.map((exp, idx) => (
          <Entry
            as="li"
            key={idx}
            className="grid md:grid-cols-12 gap-x-8 gap-y-3 py-7 border-t border-rule first:border-t-0 md:first:pt-0"
          >
            {/* Left column: the fixed facts */}
            <div className="md:col-span-4">
              <p className="placard nums text-ink-muted">{exp.period}</p>
              {exp.current && (
                <p className="mt-2">
                  <Status kind="active">Current</Status>
                </p>
              )}
            </div>

            {/* Right column: the entry */}
            <div className="md:col-span-8">
              <h3 className="text-lg md:text-xl font-bold text-ink leading-snug tracking-tight">
                {exp.role}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                {exp.company}
                <span className="mx-2 text-ink-faint" aria-hidden="true">·</span>
                {exp.place}
              </p>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-[62ch]">
                {exp.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <li
                    key={tech}
                    className={`placard text-ink-faint border px-2.5 py-1 ${tagBorderClass(tech)}`}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Entry>
        ))}
      </ol>
    </div>
  </section>
);
