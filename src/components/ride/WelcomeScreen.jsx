import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Button } from "@/components/Button";
import { getRideLink } from "@/lib/rideLinks";
import { QrCard } from "@/components/ride/QrCard";

// ─────────────────────────────────────────────────────────────────────────────
// WelcomeScreen — the kiosk's first screen. No photo exists in this repo (see
// tasks/todo.md), so the site's own mark stands in for it rather than a
// placeholder image. Everything here is legible without scrolling and without
// waiting on any animation: the whole point of a kiosk left open in a moving
// car is that the main message lands in the first few seconds.
// ─────────────────────────────────────────────────────────────────────────────
const portfolioLink = getRideLink("portfolio");

export const WelcomeScreen = () => (
  <section
    id="ride-welcome"
    className="min-h-[100dvh] flex items-center py-16 md:py-20"
  >
    <div className="max-w-5xl mx-auto px-5 md:px-6 w-full">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-8">
          <div
            className="border border-ink flex items-center justify-center"
            style={{ width: 84, height: 84 }}
            aria-hidden="true"
          >
            <AnimatedLogo size={56} />
          </div>

          <h1 className="mt-6 text-[2.5rem] leading-[0.95] sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] text-ink uppercase">
            Kervintz
            <br />
            Noel
          </h1>
          <p className="mt-3 rule-sub placard text-ink pt-3">
            AI Solutions Engineer
          </p>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink max-w-[46ch]">
            I design, implement, and stabilize AI-powered workflows and
            software systems.
          </p>
          <p className="mt-3 text-base text-ink-muted leading-relaxed max-w-[52ch]">
            While we ride, explore a few systems I&rsquo;ve built.
          </p>

          <div className="mt-8">
            <Button href="#ride-work" size="lg">
              Explore my work
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <QrCard
            link={{ ...portfolioLink, detail: "Open on your phone" }}
            size="lg"
            placement="welcome"
          />
        </div>
      </div>
    </div>
  </section>
);

export default WelcomeScreen;
