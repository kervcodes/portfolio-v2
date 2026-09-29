// ─────────────────────────────────────────────────────────────────────────────
// profile.js — the identity values the kiosk routes (/ride, /career) and their
// QR generator share. Plain relative-importable module (no `@/` alias) because
// scripts/generate-ride-qr.js imports it from Node, outside Vite.
//
// Email is the one the site's own Contact section publishes; the résumé PDF
// currently lists a different address — see the /career completion notes.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://kervintznoel.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kervintznoel/";
export const RESUME_PATH = "/resume/kervintz_noel_resume.pdf";

export const PROFILE = {
  firstName: "Kervintz",
  lastName: "Noel",
  name: "Kervintz Noel",
  title: "AI Solutions Engineer",
  email: "kervcodes@gmail.com",
  location: "Greater Boston, MA",
};
