import { Button } from "@/components/Button";
import { QrCard } from "@/components/ride/QrCard";
import { CAREER_LINKS, CONTACT_QR, buildVCard } from "@/lib/careerLinks";
import { PROFILE, SITE_URL, LINKEDIN_URL, RESUME_PATH } from "@/lib/profile";
import { TitleLine } from "@/components/career/CareerHero";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// ContinueConversation — the end of an in-person conversation. The visitor
// scans with their own phone: "Save Kervintz" encodes a vCard directly (the
// camera offers "Add to Contacts"), and three QR cards cover LinkedIn, the
// résumé, and the portfolio. The same QrCard /ride uses, one size up.
//
// Tapping "Download contact card" builds a .vcf in the browser from the same
// buildVCard() string the QR encodes, for anyone viewing this page on their
// own device rather than on the kiosk.
// ─────────────────────────────────────────────────────────────────────────────
const downloadVCard = () => {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Kervintz-Noel.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  trackEvent("career_vcard_downloaded");
};

const SAVE_CARD = {
  label: "Save Kervintz",
  qr: CONTACT_QR,
  alt: "QR code — scan to add Kervintz Noel to your phone's contacts",
  event: "career_contact_qr_viewed",
};

const stripScheme = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const DETAILS = [
  { label: "Email", href: `mailto:${PROFILE.email}`, text: PROFILE.email },
  { label: "LinkedIn", href: LINKEDIN_URL, text: stripScheme(LINKEDIN_URL), external: true },
  { label: "Portfolio", href: SITE_URL, text: stripScheme(SITE_URL), external: true },
  { label: "Résumé", href: RESUME_PATH, text: "Open PDF", external: true },
];

export const ContinueConversation = () => (
  <section
    id="career-connect"
    className="on-panel bg-panel text-panel-ink py-14 md:py-20 scroll-mt-6"
  >
    <div className="max-w-5xl mx-auto px-5 md:px-6">
      <header className="rule-head rule-head--panel">
        <div className="flex items-baseline gap-3">
          <span className="placard text-panel-muted nums" aria-hidden="true">
            04
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
            Continue the conversation
          </h2>
        </div>
        <p className="mt-3 text-panel-muted leading-relaxed">
          Scan with your phone&rsquo;s camera — nothing to type.
        </p>
      </header>

      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-3xl md:text-4xl font-bold tracking-tight">
            {PROFILE.name}
          </p>
          <p className="mt-2 font-mono uppercase tracking-[0.12em] text-sm text-panel-ink">
            <TitleLine />
          </p>
          <p className="mt-1 text-panel-muted">{PROFILE.location}</p>

          <dl className="mt-6 space-y-1">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex flex-wrap items-center gap-x-4">
                <dt className="placard text-xs text-panel-muted w-20 shrink-0">
                  {d.label}
                </dt>
                <dd className="min-w-0">
                  <a
                    href={d.href}
                    {...(d.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex min-h-11 items-center font-bold break-all underline underline-offset-4 decoration-2 decoration-panel-muted hover:decoration-caution"
                  >
                    {d.text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex justify-center md:justify-end">
          <QrCard
            link={SAVE_CARD}
            size="xl"
            source="career"
            labelSize="text-sm"
            placement="save_contact"
            tone="panel"
            action={
              <Button
                type="button"
                variant="panel"
                className="mt-2"
                onClick={downloadVCard}
              >
                Download contact card
              </Button>
            }
          />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
        {CAREER_LINKS.map((link) => (
          <QrCard
            key={link.id}
            link={link}
            size="lg"
            source="career"
            labelSize="text-sm"
            placement="connect"
            tone="panel"
          />
        ))}
      </div>
    </div>
  </section>
);

export default ContinueConversation;
