// ─────────────────────────────────────────────────────────────────────────────
// rideLinks.js — single source of truth for the /ride kiosk's four QR/Connect
// destinations. Both the QR generator (scripts/generate-ride-qr.js, run
// offline at build time) and the Ride page import this, so the SVG a rider
// scans and the text fallback link beside it can never point two different
// places.
// ─────────────────────────────────────────────────────────────────────────────

import { SITE_URL, LINKEDIN_URL, RESUME_PATH } from "./profile.js";

const UTM = {
  utm_source: "uber_kiosk",
  utm_medium: "qr",
  utm_campaign: "ride_portfolio",
};

// Only ever called with constant URLs — never with rider/visitor or
// runtime-configurable input — but still built through the URL parser
// (throws on anything malformed) rather than string concatenation.
// Exported so /career (src/lib/careerLinks.js) tags its links the same way
// under its own campaign.
export function buildTaggedUrl(rawUrl, utm, contentId, hash) {
  const url = new URL(rawUrl);
  for (const [key, value] of Object.entries(utm)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("utm_content", contentId);
  if (hash) url.hash = hash;
  return url.toString();
}

const buildUrl = (rawUrl, contentId, hash) =>
  buildTaggedUrl(rawUrl, UTM, contentId, hash);

export const RIDE_LINKS = [
  {
    id: "portfolio",
    label: "Main portfolio",
    detail: "kervintznoel.com",
    url: buildUrl(`${SITE_URL}/`, "main_portfolio"),
    qr: "/ride/qr/portfolio.svg",
    event: "ride_portfolio_qr_viewed",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "linkedin.com/in/kervintznoel",
    url: buildUrl(LINKEDIN_URL, "linkedin"),
    qr: "/ride/qr/linkedin.svg",
    event: "ride_linkedin_qr_viewed",
  },
  {
    id: "resume",
    label: "Résumé",
    detail: "Download PDF",
    url: buildUrl(`${SITE_URL}${RESUME_PATH}`, "resume"),
    qr: "/ride/qr/resume.svg",
    event: "ride_resume_qr_viewed",
  },
  {
    id: "contact",
    label: "Contact",
    detail: "Email or the contact form",
    url: buildUrl(`${SITE_URL}/`, "contact", "contact"),
    qr: "/ride/qr/contact.svg",
    event: "ride_contact_qr_viewed",
  },
];

export const getRideLink = (id) => RIDE_LINKS.find((l) => l.id === id);
