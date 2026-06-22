import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const projects = [
    {
        name: "Tidywaro",
        title: "Tidywaro — Full Stack Mobile Application",
        description: "A cross-platform wardrobe management app built with React Native (Expo), featuring AI-powered clothing analysis and a freemium subscription system. Architected end-to-end integration of RevenueCat (Apple IAP) and Stripe through a unified Supabase backend. Owned the full product lifecycle: ideation, architecture, development, and App Store submission pipeline.",
        image: "/projects/thumbnail-tidywaro.svg",
        tags: ["React Native", "Expo", "Supabase", "Stripe", "RevenueCat"],
        link: "https://tidywaro.com",
        github: "#",
    },
    {
        name: "HaitiBillboard",
        title: "HaitiBillboard — Music Analytics Platform",
        description: "An analytics platform tracking Haitian music artists across Spotify, YouTube, Apple Music, and more. Built a Node.js data ingestion pipeline feeding a PostgreSQL backend, with a Next.js dashboard surfacing streaming trends, chart rankings, and artist performance metrics for the Haitian diaspora.",
        image: "/projects/thumbnail-haitibillboard.svg",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Spotify API", "YouTube API"],
        link: "#",
        github: "#",
    },
    {
        name: "Haiti Advertising",
        title: "Haiti Advertising — Local Discovery Platform",
        description: "A geo-based advertising and event discovery platform connecting Haitian businesses with local consumers. Advertisers can post events and promotions that auto-publish to Facebook, Instagram, TikTok, and Twitter. Includes artist follow and SMS notification system powered by Twilio, so fans are alerted when a followed artist is coming to their city.",
        image: "/projects/thumbnail-haitiadvertising.svg",
        tags: ["Next.js", "Supabase", "Clerk", "Twilio", "Stripe"],
        link: "https://haiti-advertising-gwec.vercel.app",
        github: "#",
    },
    {
        name: "opsboard",
        title: "opsboard — Internal Tooling Platform",
        description: "A full-stack internal operations dashboard built with Next.js, Prisma, and Supabase Postgres. Designed to surface SRE metrics, system health, and incident history in one place. Applied clean architecture patterns across the data layer, with a managed Postgres deployment and a maintainable ORM setup built for team use.",
        image: "/projects/thumbnail-opsboard.svg",
        tags: ["Next.js", "Prisma", "PostgreSQL", "Supabase", "Vercel"],
        link: "https://kervops.com",
        github: "#",
    },
]

export const Projects = () => {
    return (
        <section id="projects" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="container mx-auto px-6 relative z-10">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Section Header */}
                <div className="text-center mx-auto max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
                        Featured Work
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                        Projects that
                        <span className="font-serif italic font-normal text-white">
                            {" "}make an impact.
                        </span>
                    </h2>
                    {/* DISCLAIMER */}
                    <blockquote className="border-l-2 border-primary pl-6 py-2 text-xl text-foreground mt-10 mb-15 font-serif italic font-normal text-white">
                        These projects are still beeing actively developed and maintained, and may not be fully functional or production-ready. They are intended to showcase my skills and experience as a software engineer, and to provide a glimpse into the types of projects I enjoy working on.
        
                    </blockquote>
                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                        A selection of full-stack applications, AI-powered tools, and technical experiments built to sharpen my engineering skills and solve practical problems.
                    </p>
                </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, idx) => (
                            <div
                                key={idx}
                                className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
                                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                            >
                                {/* Thumbnail */}
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                                    {/* Project name overlay — always visible, fades out on hover */}
                                    {/* Project name overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 group-hover:translate-y-2 group-hover:opacity-0 transition-all duration-300">
                                        <p className="text-xs font-medium tracking-widest uppercase text-primary/70 mb-1">
                                            Project
                                        </p>
                                        <h3 className="text-white font-semibold text-base leading-tight">
                                            {project.name}
                                        </h3>
                                    </div>

                                    {/* Hover links — fade in on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a
                                            href={project.link}
                                            className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                                        >
                                            <ArrowUpRight className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={project.github}
                                            className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                                        >
                                            <FaGithub className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIdx) => (
                                            <span
                                                key={tagIdx}
                                                className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All CTA */}
                    <div className="text-center mt-12 animate-fade-in animation-delay-500">
                        <AnimatedBorderButton>
                            View All Projects
                            <ArrowUpRight className="w-5 h-5" />
                        </AnimatedBorderButton>
                    </div>
                </div>
                
            </div>
            </div>
        </section>
    );
}