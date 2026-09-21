import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInactivityReset, scrollToWelcome, RIDE_INACTIVITY_MS } from "@/lib/ride";

describe("scrollToWelcome", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
  });

  it("scrolls to the top smoothly by default", () => {
    scrollToWelcome();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("respects prefers-reduced-motion and scrolls without animation", () => {
    window.matchMedia = (query) => ({
      matches: query.includes("reduce"),
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    scrollToWelcome();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });
});

describe("useInactivityReset", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("calls onIdle after the inactivity window elapses", () => {
    const onIdle = vi.fn();
    renderHook(() => useInactivityReset(onIdle));

    act(() => vi.advanceTimersByTime(RIDE_INACTIVITY_MS - 1));
    expect(onIdle).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(onIdle).toHaveBeenCalledTimes(1);
  });

  it("re-arms the timer on interaction instead of firing early", () => {
    const onIdle = vi.fn();
    renderHook(() => useInactivityReset(onIdle));

    act(() => vi.advanceTimersByTime(RIDE_INACTIVITY_MS - 1000));
    window.dispatchEvent(new Event("pointerdown"));
    act(() => vi.advanceTimersByTime(1000));
    expect(onIdle).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(RIDE_INACTIVITY_MS - 1000));
    expect(onIdle).toHaveBeenCalledTimes(1);
  });
});
