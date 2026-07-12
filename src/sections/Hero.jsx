import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Button } from "@/components/Button";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Soft background */}
            <div className="absolute inset-0 pointer-events-none">
                <img
                    src="/bg-hero.jpg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />
            </div>

            {/* Ambient sage blobs */}
            <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-highlight/6 rounded-full blur-3xl pointer-events-none" />

            {/* Content — centered */}
            <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
                <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">

                    {/* Available badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Available for new opportunities
                    </div>

                    {/* Heading */}
                    <div className="space-y-2 animate-fade-in animation-delay-100">
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]">
                            Software Engineer
                        </h1>
                        <p className="font-serif text-2xl md:text-3xl italic text-primary font-normal">
                            Boston, Massachusetts
                        </p>
                    </div>

                    {/* Body */}
                    <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-in animation-delay-200">
                        Hi, I'm Kervintz — a full-stack engineer and SRE who builds
                        production-grade SaaS, from frontend to cloud infrastructure.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in animation-delay-300">
                        <Button size="lg" href="#contact">
                            Contact Me <ArrowRight className="w-5 h-5" />
                        </Button>
                        <AnimatedBorderButton
                            href="/resume/kervintz_noel_resume.pdf"
                            download="Kervintz_Noel_Resume.pdf"
                        >
                            <Download className="w-5 h-5" />
                            Download CV
                        </AnimatedBorderButton>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-3 animate-fade-in animation-delay-400">
                        {[
                            { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kervintznoel/", label: "LinkedIn" },
                            { icon: FaGithub, href: "https://github.com/kervcodes", label: "GitHub" },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
