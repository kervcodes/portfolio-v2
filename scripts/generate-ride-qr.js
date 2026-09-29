// One-time generator for the kiosk routes' QR codes — /ride and /career. Run
// manually with `npm run generate:ride-qr` whenever a URL in
// src/lib/rideLinks.js or src/lib/careerLinks.js (or the contact details in
// src/lib/profile.js) changes; the output SVGs are committed under
// public/ride/qr/ and public/career/qr/ and served as plain static assets —
// no QR library ships to the browser.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import { RIDE_LINKS } from "../src/lib/rideLinks.js";
import { CAREER_LINKS, CONTACT_QR, buildVCard } from "../src/lib/careerLinks.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OPTIONS = {
  type: "svg",
  margin: 1,
  color: { dark: "#1a1d21", light: "#ffffff" },
};

// [public path, encoded payload] — the contact card encodes the vCard text
// itself, not a URL (see careerLinks.js).
const targets = [
  ...RIDE_LINKS.map((l) => [l.qr, l.url]),
  ...CAREER_LINKS.map((l) => [l.qr, l.url]),
  [CONTACT_QR, buildVCard()],
];

for (const [qrPath, payload] of targets) {
  const outPath = path.join(root, "public", qrPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const svg = await QRCode.toString(payload, OPTIONS);
  fs.writeFileSync(outPath, svg);
  console.log(`generated ${qrPath} -> ${payload.replaceAll("\r\n", " | ")}`);
}
