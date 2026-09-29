// ─────────────────────────────────────────────────────────────────────────────
// careerLinks.js — single source of truth for the /career kiosk's QR
// destinations and its contact card. Same contract as rideLinks.js: the QR
// generator (scripts/generate-ride-qr.js) and the page both import this, so a
// scanned code and the text link beside it can never disagree.
//
// Tagged with their own campaign so career-fair traffic is separable from the
// ride kiosk's in analytics.
// ─────────────────────────────────────────────────────────────────────────────

import { SITE_URL, LINKEDIN_URL, RESUME_PATH, PROFILE } from "./profile.js";
import { buildTaggedUrl } from "./rideLinks.js";

const UTM = {
  utm_source: "career_fair",
  utm_medium: "qr",
  utm_campaign: "career_page",
};

export const CAREER_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "linkedin.com/in/kervintznoel",
    url: buildTaggedUrl(LINKEDIN_URL, UTM, "linkedin"),
    qr: "/career/qr/linkedin.svg",
    event: "career_linkedin_qr_viewed",
  },
  {
    id: "resume",
    label: "Résumé",
    detail: "Open PDF",
    url: buildTaggedUrl(`${SITE_URL}${RESUME_PATH}`, UTM, "resume"),
    qr: "/career/qr/resume.svg",
    event: "career_resume_qr_viewed",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    detail: "kervintznoel.com",
    url: buildTaggedUrl(`${SITE_URL}/`, UTM, "portfolio"),
    qr: "/career/qr/portfolio.svg",
    event: "career_portfolio_qr_viewed",
  },
];

// The "Save Kervintz" QR encodes the vCard itself rather than a URL to one:
// a phone camera offers "Add to Contacts" straight from the scan, with no
// hosting or MIME-type dependency. The tap-to-download action on the page
// builds its .vcf from this same string.
export const CONTACT_QR = "/career/qr/contact.svg";

export const buildVCard = () =>
  [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${PROFILE.lastName};${PROFILE.firstName};;;`,
    `FN:${PROFILE.name}`,
    `TITLE:${PROFILE.title}`,
    `EMAIL;TYPE=INTERNET:${PROFILE.email}`,
    `URL:${SITE_URL}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${LINKEDIN_URL}`,
    "END:VCARD",
  ].join("\r\n");

export const getCareerLink = (id) => CAREER_LINKS.find((l) => l.id === id);
