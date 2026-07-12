import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

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
];

export const Projects = () => {
    return (
        <section id="projects" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mx-auto max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
                        Featured Work
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-foreground">
                        Projects that
                        <span className="italic font-normal text-primary">
                            {" "}make an impact.
                        </span>
                    </h2>
                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                        A selection of full-stack applications, AI-powered tools, and technical
                        experiments built to sharpen my engineering skills and solve practical problems.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                            style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                        >
                            {/* Thumbnail */}
                            <div className="relative overflow-hidden aspect-video bg-muted">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Dark gradient so overlaid text/icons are always readable */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                                {/* Project name — visible at rest, slides out on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 group-hover:translate-y-2 group-hover:opacity-0 transition-all duration-300">
                                    <p className="text-xs font-medium tracking-widest uppercase text-primary/80 mb-1">
                                        Project
                                    </p>
                                    <h3 className="text-white font-semibold text-base leading-tight">
                                        {project.name}
                                    </h3>
                                </div>

                                {/* Hover action icons */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {project.link && project.link !== "#" && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-primary hover:text-primary-foreground transition-all"
                                        >
                                            <ArrowUpRight className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.github && project.github !== "#" && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-primary hover:text-primary-foreground transition-all"
                                        >
                                            <FaGithub className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Card content */}
                            <div className="p-6 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {project.title}
                                    </h3>
                                    <ArrowUpRight className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5" />
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {project.tags.map((tag, tagIdx) => (
                                        <span
                                            key={tagIdx}
                                            className="px-3 py-1 rounded-full bg-secondary text-xs font-medium border border-border text-secondary-foreground hover:border-primary/30 hover:text-primary transition-all duration-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
