import { Button } from "@/components/Button";
import { SectionHead, Row } from "@/components/Checklist";
import { Run, Step } from "@/lib/sequence";
import { tagBorderClass } from "@/lib/tagColors";

const tools = [
  "React", "Next.js", "Node.js", "TypeScript",
  "PostgreSQL", "Supabase", "AWS", "Python",
  "Datadog", "Tailwind CSS",
];

export const About = () => (
  <section id="about" className="py-16 md:py-24 scroll-mt-20">
    <div className="max-w-5xl mx-auto px-5 md:px-6">
      <SectionHead
        index="01"
        title="About"
        lede="Where the reliability instinct came from, and why it shows up in the code."
      />

      <div className="mt-10 grid lg:grid-cols-12 gap-10">
        {/* Prose holds a real measure — 62ch, not the full grid width. */}
        <div className="lg:col-span-7 space-y-5 text-ink-muted leading-relaxed max-w-[62ch]">
          <p>
            I live in Boston, where I build web applications and the
            infrastructure underneath them. I started programming in high school
            in Haiti and moved to the United States to build a career in tech —
            teaching myself to code while working in IT, until I committed fully
            to software development in 2019.
          </p>

          <blockquote className="my-8 rule-sub pt-4 text-lg md:text-xl leading-snug text-ink font-bold max-w-[46ch]">
            I build for longevity — systems that stay reliable long after the
            launch excitement fades.
          </blockquote>

          <p>
            I built my technical foundation through years of hands-on IT and
            systems work at Hamilton Brook Smith Reynolds, MassArt, and Brown
            Rudnick — Active Directory, desktop infrastructure, ticketing
            systems, Windows Server, VMware, and the full lifecycle of
            onboarding and offboarding users. That grounding is why I think
            about reliability first.
          </p>
          <p className="text-ink">
            The engineering came at Liberty Mutual, where I moved from support
            into platform and site reliability engineering — investigating
            production failures across distributed cloud services and building
            the internal tooling to see them coming.
          </p>
          <p>
            Outside of code, you'll find me doing lawn care, knee-deep in a
            handyman project around the house, or firing up the grill with my
            wife and my two boys.
          </p>

          <div className="pt-2">
            <Button
              href="/resume/kervintz_noel_resume.pdf"
              download="Kervintz_Noel_Resume.pdf"
              variant="outline"
            >
              Download CV — PDF
            </Button>
          </div>
        </div>

        {/* The facts, as responses. */}
        <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-rule">
          <p className="placard text-ink-faint">Particulars</p>
          {/* Five short rows read as one block, so they run as one block —
              this is the cluster case, not the long-list case. */}
          <Run className="mt-4 space-y-3">
            <Step>
              <Row label="Based">Boston, MA</Row>
            </Step>
            <Step>
              <Row label="Degree">B.S. Computer Science</Row>
            </Step>
            <Step>
              <Row label="School">Boston University</Row>
            </Step>
            <Step>
              <Row label="Fellowship">
                Hack.Diversity <span className="nums">2022</span>
              </Row>
            </Step>
            <Step>
              <Row label="From">Haiti</Row>
            </Step>
          </Run>

          <p className="placard text-ink-faint mt-8">Working set</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li
                key={tool}
                className={`placard text-ink-faint border px-2.5 py-1 ${tagBorderClass(tool)}`}
              >
                {tool}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  </section>
);
