import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";

// Section tabs, in scroll order. Root-relative so they work from /sprint and
// /posts/:slug, where the anchors do not exist on the page.
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Record" },
  { href: "/#learning", label: "Current" },
  { href: "/#posts", label: "Notes" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [current, setCurrent] = useState(null);

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
    <header className="on-panel fixed top-0 left-0 right-0 z-50 bg-panel text-panel-ink">
      <nav
        aria-label="Sections"
        className="max-w-5xl mx-auto px-5 md:px-6 flex items-stretch justify-between gap-4"
      >
        <a
          href="/"
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
        <div className="hidden md:flex items-stretch pt-2">
          {navLinks.map((link) => {
            const id = link.href.split("#")[1];
            const isCurrent = current === id;
            return (
              <a
                href={link.href}
                key={link.href}
                aria-current={isCurrent ? "true" : undefined}
                className="tab flex items-center"
              >
                {link.label}
              </a>
            );
          })}
          <span className="w-px bg-panel-2 mx-3 my-3" aria-hidden="true" />
          <span className="flex items-center py-2.5">
            <Button href="/#contact" variant="panel" size="sm">
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

      {/* Mobile sheet — full-width rows, not centred text */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-panel border-t border-panel-2">
          <ul className="max-w-5xl mx-auto px-5 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
