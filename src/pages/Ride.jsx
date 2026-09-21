import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { WelcomeScreen } from "@/components/ride/WelcomeScreen";
import { SelectedWork } from "@/components/ride/SelectedWork";
import { ExperienceSummary } from "@/components/ride/ExperienceSummary";
import { ConnectSection } from "@/components/ride/ConnectSection";
import { useInactivityReset, scrollToWelcome } from "@/lib/ride";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// Ride — the iPad kiosk route. Standalone: no Navbar/Footer, no site
// navigation, nothing that leads a rider into an admin or private page. One
// continuously scrollable page (Welcome → Selected work → Experience →
// Connect), the same structure the rest of the site already uses for its
// homepage — not a separate step-by-step view, so there's no view-state
// machine to keep in sync with the URL or the browser's back button.
//
// After 90 seconds with no touch, pointer, keyboard, or scroll activity, the
// page scrolls itself back to the top. Not added to the primary nav — see
// src/layout/Navbar.jsx, untouched by this route.
// ─────────────────────────────────────────────────────────────────────────────
export const Ride = () => {
  useInactivityReset(scrollToWelcome);

  useEffect(() => {
    trackEvent("ride_page_view");
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Kervintz Noel | Explore My Work</title>
        <meta
          name="description"
          content="Kervintz Noel — AI Solutions Engineer. Explore the systems he's built, his experience, and how to connect, right from your phone."
        />
        <link rel="canonical" href="https://kervintznoel.com/ride" />
      </Helmet>

      <main>
        <WelcomeScreen />
        <SelectedWork />
        <ExperienceSummary />
        <ConnectSection />
      </main>

      <button
        type="button"
        onClick={scrollToWelcome}
        className="fixed bottom-5 right-5 z-40 min-h-11 min-w-11 px-4 py-3 bg-ink text-sheet border border-ink font-mono uppercase tracking-[0.14em] text-xs font-bold shadow-lg hover:bg-panel-2 transition-colors"
      >
        Back to start
      </button>
    </div>
  );
};

export default Ride;
