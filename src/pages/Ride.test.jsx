import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Ride } from "@/pages/Ride";
import { RIDE_LINKS } from "@/lib/rideLinks";
import { RIDE_INACTIVITY_MS } from "@/lib/ride";
import { getProjectBySlug } from "@/data/projects";

const renderRide = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/ride"]}>
        <Ride />
      </MemoryRouter>
    </HelmetProvider>
  );

describe("/ride", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders without crashing", () => {
    renderRide();
    expect(document.body).toBeTruthy();
  });

  it("renders all four major sections", () => {
    renderRide();
    expect(document.getElementById("ride-welcome")).toBeInTheDocument();
    expect(document.getElementById("ride-work")).toBeInTheDocument();
    expect(document.getElementById("ride-experience")).toBeInTheDocument();
    expect(document.getElementById("ride-connect")).toBeInTheDocument();

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/kervintz\s*noel/i);
    expect(
      screen.getByRole("heading", { name: /selected work/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /connect/i })
    ).toBeInTheDocument();
  });

  it("shows accurate, real project status labels", () => {
    renderRide();
    const bankStatement = getProjectBySlug("local-bank-statement-analyzer");
    const twin = getProjectBySlug("digital-twin");
    expect(bankStatement.status).toBe("active");
    expect(twin.status).toBe("verified");

    const work = document.getElementById("ride-work");
    expect(within(work).getByText("In progress")).toBeInTheDocument();
    expect(within(work).getByText("Complete")).toBeInTheDocument();
  });

  it("points every QR fallback link at the correct, UTM-tagged destination", () => {
    renderRide();
    for (const link of RIDE_LINKS) {
      const anchors = screen.getAllByRole("link", { name: link.detail });
      expect(anchors.length).toBeGreaterThan(0);
      for (const anchor of anchors) {
        expect(anchor).toHaveAttribute("href", link.url);
      }
    }
  });

  it("opens every external/off-kiosk link safely, in a new tab", () => {
    renderRide();
    for (const link of RIDE_LINKS) {
      const anchors = screen.getAllByRole("link", { name: link.detail });
      for (const anchor of anchors) {
        expect(anchor).toHaveAttribute("target", "_blank");
        expect(anchor).toHaveAttribute("rel", expect.stringContaining("noopener"));
        expect(anchor).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
      }
    }
  });

  it("resets to the welcome section after the inactivity window", () => {
    vi.useFakeTimers();
    renderRide();
    vi.advanceTimersByTime(RIDE_INACTIVITY_MS);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    vi.useRealTimers();
  });

  it("respects prefers-reduced-motion when returning to welcome", () => {
    window.matchMedia = (query) => ({
      matches: query.includes("reduce"),
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    renderRide();

    fireEvent.click(screen.getByRole("button", { name: /back to start/i }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("keeps every interactive control reachable by keyboard", () => {
    renderRide();
    const controls = [
      ...screen.getAllByRole("link"),
      ...screen.getAllByRole("button"),
    ];
    expect(controls.length).toBeGreaterThan(0);
    for (const control of controls) {
      expect(control).not.toHaveAttribute("tabindex", "-1");
    }
  });
});
