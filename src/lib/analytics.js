import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initGA() {
  if (!MEASUREMENT_ID) {
    console.warn("GA Measurement ID missing — analytics disabled.");
    return;
  }
  ReactGA.initialize(MEASUREMENT_ID);
}

export function trackPageView(path) {
  if (!MEASUREMENT_ID) return;
  ReactGA.send({ hitType: "pageview", page: path });
}

export function trackEvent(name, params = {}) {
  if (!MEASUREMENT_ID) return;
  ReactGA.event(name, params);
}