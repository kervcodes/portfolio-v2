import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Button } from "@/components/Button";
import { useSectionLink } from "@/lib/motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Section tabs, in scroll order. Root-relative so they work from /sprint and
// /posts/:slug, where the anchors do not exist on the page.
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#learning", label: "Current" },
  { href: "/#posts", label: "Notes" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  // On the homepage these hrefs are a fragment away and the browser scrolls
  // there smoothly. From /sprint or a note they used to be a full document
  // load — the strip's own marker travels between these four tabs to say they
  // are positions in one document, and then the tab threw the document away.
  const go = useSectionLink();
  const stripRef = useRef(null);
  const markerRef = useRef(null);
  // The marker must not slide in from the strip's left edge the first time it
  // is placed — it appears where it belongs, then travels from there.
  const placed = useRef(false);
  const lastLeft = useRef(0);

  // A handbook divider tells you which section you are in. The strip reports
  // position rather than only responding to a pointer.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.split("#")[1]);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // One marker travels between tabs rather than four bars blinking on and off:
  // the strip reads as a single index moving down a handbook, and the movement
  // itself says the two tabs are positions in one thing. Measured, because the
  // tabs are text-width and the font arrives after first paint.
  useLayoutEffect(() => {
    const strip = stripRef.current;
    const marker = markerRef.current;
    if (!strip || !marker) return;

    const measure = () => {
      const tab = strip.querySelector('[aria-current="true"]');

      if (!tab) {
        // Nothing is current — top of the page, or a route with no sections on
        // it. The marker retracts where it stands instead of sliding home.
        marker.style.transform = `translateX(${lastLeft.current}px) scaleX(0)`;
        return;
      }

      // Matches the tab's own 0.5rem inset, so the marker sits inside the
      // chamfered shoulder rather than running under it.
      lastLeft.current = tab.offsetLeft + 8;
      const width = Math.max(0, tab.offsetWidth - 16);
      const next = `translateX(${lastLeft.current}px) scaleX(${width})`;

      if (placed.current) {
        marker.style.transform = next;
        return;
      }
      // First placement: appear, do not travel.
      marker.style.transitionProperty = "none";
      marker.style.transform = next;
      void marker.offsetWidth; // commit the jump before transitions resume
      marker.style.transitionProperty = "";
      placed.current = true;
    };

    measure();
    // Tabs are text-width and B612 arrives after first paint, so the strip is
    // re-measured rather than trusted once.
    const ro = new ResizeObserver(measure);
    ro.observe(strip);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [current]);

  // The panel is a sheet over the page; the page beneath it must not scroll,
  // and Escape must close it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMobileMenuOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="strip on-panel fixed top-0 left-0 right-0 z-50 bg-panel text-panel-ink">
      <nav
        aria-label="Sections"
        className="max-w-5xl mx-auto px-5 md:px-6 flex items-stretch justify-between gap-4"
      >
        <a
          href="/"
          onClick={(e) => go(e, "/")}
          className="flex items-center gap-3 py-3 shrink-0"
          aria-label="Kervintz Noel — home"
        >
          <AnimatedLogo size={30} />
          <span className="hidden sm:block">
            <span className="block font-bold text-sm leading-tight tracking-tight">
              KERVINTZ NOEL
            </span>
            <span className="placard block text-panel-muted leading-tight">
              Software Engineer
            </span>
          </span>
        </a>

        {/* Desktop tabs */}
        <div ref={stripRef} className="tabstrip hidden md:flex items-stretch pt-2">
          {navLinks.map((link) => {
            const id = link.href.split("#")[1];
            const isCurrent = current === id;
            return (
              <a
                href={link.href}
                key={link.href}
                onClick={(e) => go(e, link.href)}
                aria-current={isCurrent ? "true" : undefined}
                className="tab flex items-center"
              >
                {link.label}
              </a>
            );
          })}
          {/* Painted after the tabs so it sits above the pointer indicator.
              Positioned imperatively — its transform is measured layout, not
              rendered state, and it should not cost a render to move. */}
          <span ref={markerRef} aria-hidden="true" className="tabstrip__marker" />
          <span className="w-px bg-panel-2 mx-3 my-3" aria-hidden="true" />
          <span className="flex items-center py-2.5">
            <Button
              href="/#contact"
              onClick={(e) => go(e, "/#contact")}
              variant="panel"
              size="sm"
            >
              Contact
            </Button>
          </span>
        </div>

        {/* Mobile trigger — 44px minimum, labelled */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="md:hidden placard -mr-2 px-4 min-h-11 flex items-center text-panel-ink"
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile sheet — full-width rows, not centred text.
          Kept mounted so it closes as deliberately as it opens; `inert` takes
          it out of the tab order and the accessibility tree while shut, so a
          collapsed sheet is not a keyboard trap. */}
      <div
        id="mobile-menu"
        inert={!isMobileMenuOpen}
        className={`menu-sheet md:hidden bg-panel ${
          isMobileMenuOpen ? "is-open" : ""
        }`}
      >
        {/* The clipping row. The rule lives inside it, so a closed sheet does
            not leave a stray line under the strip. */}
        <div>
          <ul className="border-t border-panel-2 max-w-5xl mx-auto px-5 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    go(e, link.href);
                  }}
                  className="chk py-3.5 border-b border-panel-2"
                >
                  <span className="chk__label text-panel-muted">{link.label}</span>
                  <span
                    className="chk__lead border-panel-2"
                    aria-hidden="true"
                  />
                  <span className="chk__value text-panel-ink text-sm">Go</span>
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Button
                href="/#contact"
                variant="panel"
                className="w-full"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  go(e, "/#contact");
                }}
              >
                Contact
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
