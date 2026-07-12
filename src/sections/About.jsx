import { Button } from "@/components/Button";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { ArrowRight, Download } from "lucide-react";

const tools = [
    "React", "Next.js", "Node.js", "TypeScript",
    "PostgreSQL", "Supabase", "AWS", "Tailwind CSS",
];

export const About = () => {
    return (
        <section id="about" className="relative py-24 md:py-32 overflow-hidden scroll-mt-24">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Eyebrow + Heading */}
                    <div className="space-y-4 animate-fade-in animation-delay-100">
                        <p className="text-sm tracking-widest uppercase text-secondary-foreground font-medium">
                            About
                        </p>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-foreground">
                            I'm Kervintz Noel.
                        </h2>
                    </div>

                    {/* Story */}
                    <div className="space-y-6 text-base text-muted-foreground leading-relaxed animate-fade-in animation-delay-300">
                        <p>
                            I live in Boston, MA, where I build reliable web
                            applications and enterprise systems that people actually
                            depend on.
                        </p>
                        <p>
                            I started programming in high school in Haiti and moved to the United States to pursue my career in tech — teaching myself to code while working in IT, until I committed fully to software development in 2019.
                        </p>

                        {/* Pull quote */}
                        <blockquote className="border-l-2 border-primary pl-6 py-2 text-xl text-foreground font-serif italic">
                            "I build for longevity — systems that stay reliable long after the launch excitement fades."
                        </blockquote>

                        <p>
                            I built my technical foundation through years of hands-on IT and systems work at Hamilton Brook Smith Reynolds, MassArt, and Brown Rudnick, managing Active Directory, desktop infrastructure, ticketing systems, Windows Server, VMware workstations, and the full lifecycle of user onboarding and offboarding. That operational grounding shaped how I think about reliability and systems. The engineering work came at Liberty Mutual, where I moved from support into platform and site reliability engineering, building and maintaining production systems at scale.
                        </p>
                        <p>
                            I'm a proud 2022 Hack.Diversity Fellow and a graduate of
                            Boston University with a B.S. in Computer Science.
                        </p>
                        <p>
                            Beyond my day-to-day work, I'm building Tidywaro,
                            HaitiBillboard, and opsboard, three independent products that
                            span mobile, web, and infrastructure, and I help small law
                            firms modernize the systems they run on.
                        </p>
                        <p className="text-foreground">
                            Outside of code, you'll find me doing lawn care, knee-deep
                            in a handyman project around the house, or firing up the
                            grill with my wife and my two boys.
                        </p>
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-2 pt-2 animate-fade-in animation-delay-500">
                        {tools.map((tool) => (
                            <span
                                key={tool}
                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 animate-fade-in animation-delay-500">
                        <Button href="#contact" size="lg">
                            Contact Me <ArrowRight className="w-5 h-5" />
                        </Button>
                        <AnimatedBorderButton href="/resume/kervintz_noel_resume.pdf" download="Kervintz_Noel_Resume.pdf">
                            <Download className="w-5 h-5" />
                            Download CV
                        </AnimatedBorderButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
