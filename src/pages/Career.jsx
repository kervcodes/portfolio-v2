import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CareerHero } from "@/components/career/CareerHero";
import { RoleSelector } from "@/components/career/RoleSelector";
import { TwinFeature } from "@/components/career/TwinFeature";
import { AnalyzerFeature } from "@/components/career/AnalyzerFeature";
import { ExperienceSnapshot } from "@/components/career/ExperienceSnapshot";
import { ContinueConversation } from "@/components/career/ContinueConversation";
import { HIRING_TRACKS } from "@/data/career";
import { useInactivityReset, scrollToWelcome } from "@/lib/ride";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// Career — the career-fair kiosk route, shown on an iPad at a booth. A
// landing page, a live demo, and a leave-behind in one scroll:
// Hero → What are you hiring for? → Featured work → Experience → Connect.
//
// Same kiosk pattern as /ride: standalone (no Navbar/Footer), a fixed
// "Start over" key, and after 90 seconds idle the page returns to the top
// and the role selector resets, so the next visitor starts clean. Nothing
// blocks normal browser navigation — links, back, and reload all behave.
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_TRACK = HIRING_TRACKS[0].id;

export const Career = () => {
  const [track, setTrack] = useState(DEFAULT_TRACK);

  const startOver = useCallback(() => {
    setTrack(DEFAULT_TRACK);
    scrollToWelcome();
  }, []);

  useInactivityReset(startOver);

  useEffect(() => {
    trackEvent("career_page_view");
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Kervintz Noel | AI Solutions Engineer — Career</title>
        <meta
          name="description"
          content="Kervintz Noel — AI Solutions Engineer, Software Engineer, Production Reliability. Try the AI Digital Twin, see what he's building, and save his contact."
        />
        <link rel="canonical" href="https://kervintznoel.com/career" />
      </Helmet>

      <main>
        <CareerHero />
        <RoleSelector value={track} onChange={setTrack} />
        <TwinFeature />
        <AnalyzerFeature />
        <ExperienceSnapshot />
        <ContinueConversation />
      </main>

      <button
        type="button"
        onClick={startOver}
        className="fixed bottom-5 right-5 z-40 min-h-12 min-w-12 px-5 py-3 bg-ink text-sheet border border-ink font-mono uppercase tracking-[0.14em] text-xs font-bold shadow-lg hover:bg-panel-2 transition-colors"
      >
        Start over
      </button>
    </div>
  );
};

export default Career;
