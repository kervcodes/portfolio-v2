import { describe, it, expect } from "vitest";
import { CAREER_LINKS, buildVCard, getCareerLink } from "@/lib/careerLinks";
import { PROFILE, SITE_URL, LINKEDIN_URL } from "@/lib/profile";

describe("careerLinks", () => {
  it("defines the three QR destinations the brief asks for", () => {
    expect(CAREER_LINKS.map((l) => l.id)).toEqual([
      "linkedin",
      "resume",
      "portfolio",
    ]);
  });

  it("tags every URL with the career-fair campaign, separate from /ride", () => {
    for (const link of CAREER_LINKS) {
      const url = new URL(link.url);
      expect(url.searchParams.get("utm_source")).toBe("career_fair");
      expect(url.searchParams.get("utm_medium")).toBe("qr");
      expect(url.searchParams.get("utm_campaign")).toBe("career_page");
      expect(url.searchParams.get("utm_content")).toBe(link.id);
    }
  });

  it("points each destination at the correct host and path", () => {
    expect(new URL(getCareerLink("linkedin").url).hostname).toBe("www.linkedin.com");
    expect(new URL(getCareerLink("portfolio").url).hostname).toBe("kervintznoel.com");
    expect(new URL(getCareerLink("resume").url).pathname).toBe(
      "/resume/kervintz_noel_resume.pdf"
    );
  });

  it("builds a valid vCard from the shared profile values", () => {
    const card = buildVCard();
    const lines = card.split("\r\n");
    expect(lines[0]).toBe("BEGIN:VCARD");
    expect(lines.at(-1)).toBe("END:VCARD");
    expect(lines).toContain(`FN:${PROFILE.name}`);
    expect(lines).toContain(`TITLE:${PROFILE.title}`);
    expect(lines).toContain(`EMAIL;TYPE=INTERNET:${PROFILE.email}`);
    expect(lines).toContain(`URL:${SITE_URL}`);
    expect(card).toContain(LINKEDIN_URL);
  });

  it("keeps anything sensitive out of QR-bound payloads", () => {
    for (const link of CAREER_LINKS) {
      expect(link.url).not.toMatch(/email=|token=|key=|password=/i);
    }
    // Phone and street address are deliberately not in the contact card.
    expect(buildVCard()).not.toMatch(/^TEL|^ADR/m);
  });
});
