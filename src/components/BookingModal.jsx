import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// Book a Call, as a modal. Any "Book a Call" control calls openBooking(); the
// dialog shows a charcoal invitation beside the live Calendly calendar.
//
// The facts mirror the Calendly event itself (15 Minute Meeting, Eastern
// time). If the event changes in Calendly — length, a meeting location,
// availability — update BOOKING so the modal doesn't promise something the
// calendar won't deliver.
//
// The reason a visitor picks is passed to Calendly as `a1`, which pre-fills
// the event's first booking question ("Please share anything that will help
// prepare for our meeting."). Their answer then arrives with the booking.
// ─────────────────────────────────────────────────────────────────────────────

const BOOKING = {
  pageUrl: "https://calendly.com/kervintznoel/15min",
  duration: "15 minutes",
  timezone: "Eastern",
};

const reasons = [
  { id: "recruiter", label: "Recruiter screen or role conversation" },
  { id: "experience", label: "Questions about my experience or projects" },
  { id: "collab", label: "Collaboration or a quick technical chat" },
];

const facts = [
  { label: "Duration", value: BOOKING.duration },
  { label: "My time zone", value: BOOKING.timezone },
  { label: "Booked through", value: "Calendly" },
];

// The event's booking page, with the chosen reason pre-filled.
const pageUrl = (reason) => {
  const url = new URL(BOOKING.pageUrl);
  if (reason) url.searchParams.set("a1", reason);
  return url.toString();
};

// The same page in an iframe, with Calendly's cookie banner and duplicate
// event details hidden. No third-party script is loaded.
const embedUrl = (reason) => {
  const url = new URL(pageUrl(reason));
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("embed_domain", "kervintznoel.com");
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("hide_event_type_details", "1");
  return url.toString();
};

// ─── Context ────────────────────────────────────────────────────────────────
const BookingContext = createContext({
  openBooking: () => {},
  closeBooking: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs with its provider
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children, onClose }) => {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback((source = "unknown") => {
    trackEvent("book_modal_open", { source });
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);
  const value = useMemo(
    () => ({ openBooking, closeBooking }),
    [openBooking, closeBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      {open && <BookingDialog onClose={closeBooking} />}
    </BookingContext.Provider>
  );
};

// ─── The dialog ─────────────────────────────────────────────────────────────
const BookingDialog = ({ onClose }) => {
  const [reason, setReason] = useState("");
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  // Escape closes, the page behind doesn't scroll, focus moves into the
  // dialog and goes back to whatever opened it afterwards, and Tab stays
  // inside while it's open.
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start md:items-center justify-center bg-ink/60 backdrop-blur-sm p-3 md:p-8 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="booking-dialog relative w-full max-w-6xl grid lg:grid-cols-12 rounded-2xl overflow-hidden bg-sheet shadow-[0_40px_80px_-30px_color-mix(in_srgb,var(--color-ink)_60%,transparent)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close booking"
          className="absolute right-3 top-3 z-10 min-w-11 min-h-11 flex items-center justify-center rounded-full text-ink lg:text-ink bg-sheet/90 hover:bg-ground transition-colors"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* ── Left: the invitation ── */}
        <div className="on-panel lg:col-span-5 bg-panel text-panel-ink px-7 md:px-10 py-9 md:py-12 flex flex-col">
          <AnimatedLogo size={40} />

          <h2
            id="booking-title"
            className="mt-8 md:mt-12 text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.02]"
          >
            Book some time{" "}
            <span className="text-caution" aria-hidden="true">
              —
            </span>
          </h2>
          <p className="mt-3 text-xl md:text-2xl font-bold">with Kervintz Noel</p>

          {/* What it's about — pre-fills Calendly's first booking question */}
          <fieldset className="mt-8">
            <legend className="text-body font-bold">What's it about?</legend>
            <p className="mt-1 text-sm text-panel-muted">
              Optional. Your pick is filled into the booking form.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              {reasons.map((r) => {
                const selected = reason === r.label;
                return (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      const next = selected ? "" : r.label;
                      setReason(next);
                      if (next) trackEvent("book_reason_select", { reason: r.id });
                    }}
                    className={`text-left rounded-lg border px-4 py-3 font-bold transition-colors ${
                      selected
                        ? "bg-caution border-caution text-ink"
                        : "border-panel-2 text-panel-ink hover:border-panel-muted"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <dl className="mt-8 lg:mt-auto pt-6 grid grid-cols-3 gap-4 border-t border-panel-2">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="placard text-panel-muted">{f.label}</dt>
                <dd className="mt-1 font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right: the booking ── */}
        <div className="lg:col-span-7 bg-sheet px-5 md:px-8 py-7 md:py-9">
          <div className="flex items-center gap-3 pr-12">
            <img
              src="/images/kn.jpg"
              alt=""
              width="40"
              height="40"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <p className="text-ink-muted">
              Hi, it's Kervintz. Pick a date, then a time.
            </p>
          </div>

          <p className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-ink">
            15 Minute Call
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Times show in your own time zone.
          </p>

          <div className="mt-4 -mx-2">
            <iframe
              key={reason}
              title="Book a 15-minute call with Kervintz Noel on Calendly"
              src={embedUrl(reason)}
              className="block w-full h-[640px] md:h-[600px] bg-sheet"
            />
          </div>

          <p className="mt-3 text-center text-sm text-ink-muted">
            Calendar not loading?{" "}
            <a
              href={pageUrl(reason)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("book_open_calendly", { source: "modal" })}
              className="font-bold text-ink underline underline-offset-4 decoration-2 decoration-caution hover:decoration-ink"
            >
              Open the booking page
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
