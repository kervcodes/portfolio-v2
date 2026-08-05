import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Learning } from "@/sections/Learning";
import { Row } from "@/components/Checklist";

const SprintHero = () => (
    <section className="pt-24 md:pt-28 pb-8">
        <div className="max-w-5xl mx-auto px-5 md:px-6">
            {/* No entrance animation: this is a first viewport too. */}
            <div className="sheet p-5 md:p-8">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <p className="placard text-ink-muted">Supplementary procedure</p>
                    <p className="placard text-ink-faint nums">Rev. 2026-08</p>
                </div>
                <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.03em] text-ink uppercase leading-[0.95]">
                    AI Engineer
                    <br />
                    Sprint
                </h1>
                <div className="mt-6 rule-sub pt-4 grid gap-3 sm:grid-cols-3">
                    <Row label="Courses">6</Row>
                    <Row label="Projects">1 of 4 started</Row>
                    <Row label="Started">Jun 2026</Row>
                </div>
                <p className="mt-5 text-sm text-ink-muted leading-relaxed max-w-[62ch]">
                    No deadline — I move course by course. This is what I'm building right
                    now, in public.
                </p>
            </div>
        </div>
    </section>
);

export const SprintPage = () => (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-1">
            <SprintHero />
            <Learning showHeader={false} />
        </main>
        <Footer />
    </div>
);
