import { RIDE_LINKS } from "@/lib/rideLinks";
import { QrCard } from "@/components/ride/QrCard";

export const ConnectSection = () => (
  <section
    id="ride-connect"
    className="on-panel bg-panel text-panel-ink py-16 md:py-24 scroll-mt-10"
  >
    <div className="max-w-5xl mx-auto px-5 md:px-6">
      <header className="rule-head rule-head--panel">
        <div className="flex items-baseline gap-3">
          <span className="placard text-panel-muted nums" aria-hidden="true">
            03
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
            Connect
          </h2>
        </div>
        <p className="mt-3 text-panel-muted leading-relaxed">
          Scan any code to keep exploring on your own phone.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {RIDE_LINKS.map((link) => (
          <QrCard key={link.id} link={link} placement="connect" tone="panel" />
        ))}
      </div>
    </div>
  </section>
);

export default ConnectSection;
