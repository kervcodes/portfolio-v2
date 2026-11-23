import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Arrow } from "@/components/Checklist";
import { Button } from "@/components/Button";
import { useSectionLink } from "@/lib/motion";
import { TWIN_URL } from "@/lib/twin";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Plain text links on the charcoal bar: bold, light ink, and the section you
// are reading in amber. Amber still means "you are here" — hover only lifts
// the link toward full brightness, it never borrows the current-section colour.
const linkBase =
  "font-sans font-bold text-base transition-colors duration-200";
const linkClass = (isCurrent) =>
  `${linkBase} ${isCurrent ? "text-caution" : "text-panel-ink hover:text-caution/80"}`;

// Section links, in scroll order. Root-relative so they work from /sprint and
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
  const headerRef = useRef(null);
  const navRowRef = useRef(null);

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

  // The open mobile sheet fills the rest of the screen below this row, not
  // just the height of its own rows — the row is measured rather than
  // assumed, since its height shifts with font metrics and breakpoint.
  useLayoutEffect(() => {
    const header = headerRef.current;
    const row = navRowRef.current;
    if (!header || !row) return;

    const measure = () => {
      header.style.setProperty("--nav-h", `${row.offsetHeight}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

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
    <header
      ref={headerRef}
      className="strip on-panel fixed top-0 left-0 right-0 z-50 bg-panel text-panel-ink"
    >
      <nav
        ref={navRowRef}
        aria-label="Sections"
        className="max-w-7xl mx-auto px-6 md:px-12 min-h-16 md:min-h-20 flex items-center justify-between gap-4"
      >
        <a
          href="/"
          onClick={(e) => go(e, "/")}
          className="flex items-center gap-3 py-3 shrink-0"
          aria-label="Kervintz Noel — home"
        >
          <AnimatedLogo size={40} />
          <span className="hidden sm:block">
            <span className="block font-bold text-lg leading-tight tracking-tight">
              Kervintz Noel
            </span>
            <span className="block font-bold text-sm text-panel-muted leading-tight">
              Software Engineer
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.split("#")[1];
            const isCurrent = current === id;
            return (
              <a
                href={link.href}
                key={link.href}
                onClick={(e) => go(e, link.href)}
                aria-current={isCurrent ? "true" : undefined}
                className={linkClass(isCurrent)}
              >
                {link.label}
              </a>
            );
          })}
          {TWIN_URL && (
            <Link to="/twin" className={linkClass(false)}>
              AI Twin
            </Link>
          )}
          <Button
            href="/#contact"
            onClick={(e) => go(e, "/#contact")}
            variant="panel"
            size="sm"
            className="font-bold text-base"
          >
            Contact
          </Button>
        </div>

        {/* Mobile trigger — 44px minimum, labelled */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="md:hidden -mr-2 px-2 min-w-11 min-h-11 flex items-center justify-center text-panel-ink hover:text-caution transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7" strokeWidth={2.25} aria-hidden="true" />
          ) : (
            <Menu className="w-7 h-7" strokeWidth={2.25} aria-hidden="true" />
          )}
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
            not leave a stray line under the strip. Content fills the sheet
            rather than sitting top-aligned above empty charcoal: the rows
            centre in the space above the fold, the key sits at its foot. */}
        {/* Bottom padding only while open: a collapsed grid row still keeps its
            child's padding, which left a 24px band under the bar. */}
        <div
          className={`flex flex-col max-w-7xl mx-auto w-full px-6 md:px-12 ${
            isMobileMenuOpen ? "pb-6" : ""
          }`}
        >
          <ul className="flex-1 flex flex-col justify-center border-t border-panel-2">
            {navLinks.map((link) => {
              const isCurrent = current === link.href.split("#")[1];
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      go(e, link.href);
                    }}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`flex items-center justify-between py-4 border-b border-panel-2 text-lg ${linkClass(isCurrent)}`}
                  >
                    {link.label}
                    <Arrow />
                  </a>
                </li>
              );
            })}
            {TWIN_URL && (
              <li>
                <Link
                  to="/twin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-4 border-b border-panel-2 text-lg ${linkClass(false)}`}
                >
                  AI Twin
                  <Arrow />
                </Link>
              </li>
            )}
          </ul>
          <Button
            href="/#contact"
            variant="panel"
            className="w-full shrink-0 mt-4 font-bold"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              go(e, "/#contact");
            }}
          >
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
};
