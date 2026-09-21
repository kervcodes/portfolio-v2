import { describe, it, expect } from "vitest";
import { RIDE_LINKS, getRideLink } from "@/lib/rideLinks";

describe("rideLinks", () => {
  it("defines exactly the four Connect destinations", () => {
    expect(RIDE_LINKS.map((l) => l.id)).toEqual([
      "portfolio",
      "linkedin",
      "resume",
      "contact",
    ]);
  });

  it("tags every URL with the required UTM parameters", () => {
    for (const link of RIDE_LINKS) {
      const url = new URL(link.url);
      expect(url.searchParams.get("utm_source")).toBe("uber_kiosk");
      expect(url.searchParams.get("utm_medium")).toBe("qr");
      expect(url.searchParams.get("utm_campaign")).toBe("ride_portfolio");
      expect(url.searchParams.get("utm_content")).toBe(link.id === "portfolio" ? "main_portfolio" : link.id);
    }
  });

  it("points each destination at the correct, verified host", () => {
    expect(new URL(getRideLink("portfolio").url).hostname).toBe("kervintznoel.com");
    expect(new URL(getRideLink("linkedin").url).hostname).toBe("www.linkedin.com");
    expect(new URL(getRideLink("resume").url).pathname).toBe(
      "/resume/kervintz_noel_resume.pdf"
    );
    const contact = new URL(getRideLink("contact").url);
    expect(contact.hostname).toBe("kervintznoel.com");
    expect(contact.hash).toBe("#contact");
  });

  it("never puts sensitive information in a QR-bound URL", () => {
    for (const link of RIDE_LINKS) {
      expect(link.url).not.toMatch(/email=|token=|key=|password=/i);
    }
  });
});
