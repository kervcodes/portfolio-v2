import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Career } from "@/pages/Career";
import { CAREER_LINKS } from "@/lib/careerLinks";
import { RIDE_INACTIVITY_MS } from "@/lib/ride";
import { HIRING_TRACKS } from "@/data/career";

// The twin's URL comes from an env var that isn't set under test; give it a
// value so the twin entry points render (they hide themselves when unset).
vi.mock("@/lib/twin", () => ({ TWIN_URL: "https://twin.example" }));

const renderCareer = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/career"]}>
        <Career />
      </MemoryRouter>
    </HelmetProvider>
  );

describe("/career", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders the hero with name, positioning, and progression", () => {
    renderCareer();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/kervintz noel/i);
    const hero = document.getElementById("career-top");
    expect(within(hero).getByText("AI Solutions Engineer")).toBeInTheDocument();
    const progression = within(hero).getByRole("list", { name: /career progression/i });
    expect(within(progression).getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders every section", () => {
    renderCareer();
    for (const id of [
      "career-top",
      "career-hiring",
      "career-twin",
      "career-analyzer",
      "career-experience",
      "career-connect",
    ]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it("gives the hero its three actions, with the twin pointing at /twin", () => {
    renderCareer();
    const hero = document.getElementById("career-top");
    expect(within(hero).getByRole("link", { name: /see what i.ve built/i })).toHaveAttribute(
      "href",
      "#career-twin"
    );
    expect(within(hero).getByRole("link", { name: /ask my ai twin/i })).toHaveAttribute(
      "href",
      "/twin"
    );
    expect(within(hero).getByRole("link", { name: /view résumé/i })).toHaveAttribute(
      "href",
      "/resume/kervintz_noel_resume.pdf"
    );
  });

  it("switches the strengths block when a role is selected", () => {
    renderCareer();
    const [first, second] = HIRING_TRACKS;
    const hiring = within(document.getElementById("career-hiring"));
    const firstKey = screen.getByRole("button", { name: first.label });
    const secondKey = screen.getByRole("button", { name: second.label });

    expect(firstKey).toHaveAttribute("aria-pressed", "true");
    expect(hiring.getByText(first.strengths[0].label)).toBeInTheDocument();

    fireEvent.click(secondKey);
    expect(secondKey).toHaveAttribute("aria-pressed", "true");
    expect(firstKey).toHaveAttribute("aria-pressed", "false");
    expect(hiring.getByText(second.strengths[0].label)).toBeInTheDocument();
    expect(hiring.queryByText(first.strengths[0].label)).not.toBeInTheDocument();
  });

  it("labels project status honestly: Twin shipped, Analyzer building", () => {
    renderCareer();
    expect(
      within(document.getElementById("career-twin")).getByText("Shipped")
    ).toBeInTheDocument();
    expect(
      within(document.getElementById("career-analyzer")).getByText("Building")
    ).toBeInTheDocument();
  });

  it("sends every suggested question to the real twin route", () => {
    renderCareer();
    const twin = document.getElementById("career-twin");
    const toTwin = within(twin)
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/twin");
    // Five questions plus the section's own "Ask my AI Twin" key.
    expect(toTwin).toHaveLength(6);
  });

  it("points every QR fallback link at its UTM-tagged destination, in a new tab", () => {
    renderCareer();
    const connect = document.getElementById("career-connect");
    for (const link of CAREER_LINKS) {
      const anchor = within(connect)
        .getAllByRole("link", { name: link.detail })
        .find((a) => a.getAttribute("href") === link.url);
      expect(anchor).toBeTruthy();
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("offers a contact-card download alongside the Save QR", () => {
    renderCareer();
    expect(
      screen.getByAltText(/add kervintz noel to your phone's contacts/i)
    ).toHaveAttribute("src", "/career/qr/contact.svg");
    expect(
      screen.getByRole("button", { name: /download contact card/i })
    ).toBeInTheDocument();
  });

  it("resets the role selector and scrolls to top when idle", () => {
    vi.useFakeTimers();
    renderCareer();
    fireEvent.click(screen.getByRole("button", { name: HIRING_TRACKS[2].label }));
    act(() => vi.advanceTimersByTime(RIDE_INACTIVITY_MS));
    vi.useRealTimers();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    expect(
      screen.getByRole("button", { name: HIRING_TRACKS[0].label })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("resets the role selector from the Start over key", () => {
    renderCareer();
    const third = screen.getByRole("button", { name: HIRING_TRACKS[2].label });
    fireEvent.click(third);
    expect(third).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /start over/i }));
    expect(
      screen.getByRole("button", { name: HIRING_TRACKS[0].label })
    ).toHaveAttribute("aria-pressed", "true");
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
