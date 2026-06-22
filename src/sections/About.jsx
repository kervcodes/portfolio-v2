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
                        <p className="text-sm tracking-widest uppercase text-muted-foreground">
                            About
                        </p>
                        <h2 className="color-highlight text-4xl md:text-5xl font-bold leading-tight">
                            I'm Kervintz Noel.
                        </h2>
                    </div>

                    {/* Story */}
                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-in animation-delay-300">
                        <p>
                            I live in Boston, MA, where I build reliable web
                            applications and enterprise systems that people actually
                            depend on.
                        </p>
                        <p>
                            My path into tech was nontraditional. I started programming
                            in high school in Haiti, then had to immigrate to the United
                            States before I could finish my degree. I worked Desktop
                            Support by day and taught myself to code by night, until I
                            committed fully to software development in 2019.
                        </p>

                        {/* Pull quote */}
                        <blockquote className="border-l-2 border-primary pl-6 py-2 text-xl text-foreground italic">
                            "I'd rather build something that works quietly in production
                            for years than something that only looks good in a demo."
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
                            firms modernize the systems they run on. I write software
                            that solves real problems, not software that just demos
                            well.
                        </p>
                        <p className="text-foreground">
                            Fun fact: when I'm not writing code, you'll find me out in
                            the yard doing lawn care, knee-deep in a handyman project
                            around the house, or firing up the grill with my wife and
                            two boys.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2 animate-fade-in animation-delay-500">
                        {tools.map((tool) => (
                            <span
                                key={tool}
                                className="glass px-4 py-1.5 rounded-full text-sm text-foreground"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 animate-fade-in animation-delay-500">
                        <Button>
                            Contact Me <ArrowRight className="w-5 h-5" />
                        </Button>
                        <AnimatedBorderButton>
                            <Download className="w-5 h-5" />
                            Download CV
                        </AnimatedBorderButton>
                    </div>
                </div>
            </div>
        </section>
    );
};