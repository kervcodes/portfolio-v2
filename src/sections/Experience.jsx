const experiences = [
  {
    period: "Jun 2025 — Present",
    role: "Independent Software Consultant / Founder",
    company: "Self-Employed · Boston, MA",
    description:
      "Building Tidywaro, HaitiBillboard, and opsboard as independent SaaS products. Consulting with small law firms on technology modernization. Freelance full-stack development across React Native, Next.js, and AWS.",
    technologies: ["React Native", "Next.js", "AWS", "TypeScript", "Supabase"],
    current: true,
  },
  {
    period: "Jan 2023 — Jun 2025",
    role: "Site Reliability Engineer (Technology Associate)",
    company: "Liberty Mutual Insurance · Boston, MA",
    description:
      "Investigated production issues across distributed cloud services, APIs, and event-driven systems, driving root-cause analysis with engineering teams. Analyzed internal and third-party APIs to identify technical debt and failure patterns. Built a React-based internal dashboard to visualize system health and improve operational visibility. Monitored production environments using Datadog and BigPanda, correlating alerts to reduce noise and accelerate resolution.",
    technologies: ["AWS", "React", "Datadog", "BigPanda", "Python", "GitHub Actions"],
    current: false,
  },
  {
    period: "Jun 2019 — Nov 2021",
    role: "Enterprise Applications Support Specialist",
    company: "Brown Rudnick LLP · Boston, MA",
    description:
      "Administered and supported enterprise legal technology platforms (iManage Work, Aderant Expert, Intapp, CompuLaw) across eight international offices, serving as primary escalation point for application-level incidents. Designed onboarding documentation adopted firm-wide that reduced new-hire ramp-up time by ~15%. Proactively identified recurring failure trends and drove process improvements that reduced repeat incident volume. Managed 40+ daily support requests while maintaining SLA compliance.",
    technologies: ["iManage", "Aderant Expert", "Intapp", "CompuLaw", "ServiceNow"],
    current: false,
  },
  {
    period: "Aug 2018 — Apr 2019",
    role: "Desktop Support Analyst",
    company: "Massachusetts College of Art and Design · Boston, MA",
    description:
      "Delivered end-user support for faculty, staff, and students across a public higher-education environment. Deployed, imaged, and configured 100+ Windows and macOS devices. Led software packaging and deployment to classrooms using PDQ Deploy. Collaborated on Windows 7 to Windows 10 migration and maintained accurate device configuration documentation.",
    technologies: ["Active Directory", "PDQ Deploy", "Windows", "macOS", "SCCM"],
    current: false,
  },
  {
    period: "2014 — Jul 2018",
    role: "IT Support Specialist",
    company: "Full-Time & Contract Roles · Boston, MA",
    description:
      "Provided Tier 1 and Tier 2 support across enterprise and academic environments. Supported Windows and macOS endpoints, printers, conferencing tools, and mobile devices. Handled user access, authentication, and account troubleshooting in Active Directory environments. Executed scripted and command-line tasks for deployments, logging and resolving tickets in accordance with SLA expectations.",
    technologies: ["Active Directory", "SCCM", "PDQ Deploy", "ServiceNow", "Zendesk"],
    current: false,
  },
];

export const Experience = () => {
    return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden scroll-mt-24">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"/>

      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-4xl mb-16">
            <span
                className="text-secondary-foreground text-sm
                font-medium tracking-wider uppercase animate-fade-in"
            >
                Career Journey
            </span>

            <h2
                className="text-4xl md:text-5xl font-bold
                mt-4 mb-6 animate-fade-in animation-delay-100
                text-secondary-foreground"
            >
                Where my{" "}
                <span className="font-serif italic font-normal text-white">
                engineering foundation
                </span>{" "}
                was built.
            </h2>

            <p
                className="text-muted-foreground
                animate-fade-in animation-delay-200"
            >
                A look at the roles and projects that shaped my experience across software
                development, production support, cloud systems, and product delivery.
            </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div
                    className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}
                  >
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}