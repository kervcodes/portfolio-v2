import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Learning } from "@/sections/Learning";

const SprintHero = () => (
    <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Ambient blob */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-5">
                {/* Eyebrow */}
                <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
                    Currently Focusing
                </span>

                {/* Heading */}
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] animate-fade-in animation-delay-100">
                    AI Engineer{" "}
                    <span className="italic font-normal text-primary">Sprint.</span>
                </h1>

                {/* Sub */}
                <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-in animation-delay-200">
                    6 AI engineering courses · 4 production portfolio projects · live June – August 2026.
                    This is what I'm building right now, in public.
                </p>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-primary/40 rounded-full mt-2" />
            </div>
        </div>
    </section>
);

export const SprintPage = () => {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Navbar />
            <main>
                <SprintHero />
                <Learning showHeader={false} />
            </main>
            <Footer />
        </div>
    );
};
