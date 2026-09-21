// ─────────────────────────────────────────────────────────────────────────────
// ride.js — kiosk-only behavior for /ride: an idle timer that returns the
// page to the welcome section, and the scroll it performs to get there.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export const RIDE_INACTIVITY_MS = 90_000;

// Touch, pointer (covers mouse too), keyboard, and scroll — exactly the
// interaction set the kiosk spec calls out for resetting the idle clock.
const RESET_EVENTS = ["pointerdown", "touchstart", "keydown", "scroll"];

export const scrollToWelcome = () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
};

/**
 * After `ms` of no touch/pointer/keyboard/scroll activity, calls `onIdle`.
 * Any listed interaction re-arms the timer. Returns nothing — callers that
 * need a manual reset (a "Back to start" button) can just call `onIdle`
 * themselves, which the effect below will also pick up as activity on the
 * next render.
 */
export const useInactivityReset = (onIdle, ms = RIDE_INACTIVITY_MS) => {
  const timer = useRef(null);
  const onIdleRef = useRef(onIdle);

  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  const arm = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onIdleRef.current(), ms);
  }, [ms]);

  useEffect(() => {
    arm();
    RESET_EVENTS.forEach((evt) =>
      window.addEventListener(evt, arm, { passive: true })
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
      RESET_EVENTS.forEach((evt) => window.removeEventListener(evt, arm));
    };
  }, [arm]);
};
