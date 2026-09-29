import { useEffect } from "react";
import { useSeen } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// QrCard — one Connect destination: a static, pre-generated QR SVG (see
// scripts/generate-ride-qr.js) plus a text link underneath as the
// accessibility fallback for anyone who can't or doesn't want to scan.
//
// The "viewed" analytics event fires once, the first time the card is
// actually on screen — reusing the same useSeen() observer the rest of the
// site uses for its check marks, rather than a click (nobody taps a QR code
// with a touchscreen; scanning happens on a phone this page never hears
// from).
//
// The fallback link always opens in a new tab: every one of these
// destinations — even same-origin ones like the portfolio home or the
// résumé PDF — is somewhere other than /ride, and the kiosk page must never
// be the thing that gets replaced by a rider's tap.
//
// Shared with /career: `source` tags analytics with the route it came from,
// `labelSize` enlarges the placard label for kiosks read from a distance,
// and `action` replaces the fallback link for a card whose payload isn't a
// URL (the career page's vCard, which is downloaded rather than opened).
// ─────────────────────────────────────────────────────────────────────────────
export const QrCard = ({
  link,
  size = "default",
  placement = "connect",
  tone = "light",
  source = "ride",
  labelSize = "",
  action,
}) => {
  const [ref, seen] = useSeen();

  useEffect(() => {
    if (seen) trackEvent(link.event, { source, placement });
  }, [seen, link.event, placement, source]);

  const qrBox =
    size === "xl"
      ? "w-52 h-52 md:w-60 md:h-60"
      : size === "lg"
      ? "w-40 h-40 md:w-44 md:h-44"
      : "w-28 h-28";
  const labelClass = tone === "panel" ? "text-panel-muted" : "text-ink-muted";
  const linkClass =
    tone === "panel"
      ? "text-panel-ink decoration-panel-muted hover:decoration-caution"
      : "text-ink decoration-caution hover:decoration-ink";

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-3">
      {/* Always a white card regardless of the page's own theme — a QR code
          needs high, fixed contrast to scan reliably, not the panel's own
          ground colour. */}
      <div className={`sheet p-3 ${qrBox}`}>
        <img
          src={link.qr}
          alt={link.alt ?? `QR code — scan to open ${link.label} on your phone`}
          className="w-full h-full"
          width={176}
          height={176}
          loading="lazy"
        />
      </div>
      <div>
        <p className={`placard ${labelSize} ${labelClass}`}>{link.label}</p>
        {action ?? (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-1 inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4 decoration-2 transition-colors ${linkClass}`}
          >
            {link.detail}
          </a>
        )}
      </div>
    </div>
  );
};

export default QrCard;
