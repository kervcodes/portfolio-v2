// One-time generator for the /ride kiosk's QR codes. Run manually with
// `npm run generate:ride-qr` whenever a URL in src/lib/rideLinks.js changes;
// the output SVGs are committed to public/ride/qr/ and served as plain static
// assets — no QR library ships to the browser.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import { RIDE_LINKS } from "../src/lib/rideLinks.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "ride", "qr");

fs.mkdirSync(outDir, { recursive: true });

for (const link of RIDE_LINKS) {
  const outPath = path.join(root, "public", link.qr);
  const svg = await QRCode.toString(link.url, {
    type: "svg",
    margin: 1,
    color: { dark: "#1a1d21", light: "#ffffff" },
  });
  fs.writeFileSync(outPath, svg);
  console.log(`generated ${link.qr} -> ${link.url}`);
}
