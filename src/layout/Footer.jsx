import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useBooking } from "@/components/BookingModal";
import { useSectionLink } from "@/lib/motion";
import { TWIN_URL } from "@/lib/twin";
import { trackEvent } from "@/lib/analytics";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/kervcodes", label: "GitHub", event: "github_click" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kervintznoel/", label: "LinkedIn", event: "linkedin_click" },
];

// Mirrors the header links, in the same order as the page scrolls.
const footerLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

// The revision block at the foot of a handbook page.
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  // The footer sits on every route, so these five were the most-repeated
  // full-document reload in the build.
  const go = useSectionLink();
  const { openBooking } = useBooking();

  return (
    <footer className="on-panel bg-panel text-panel-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <a
            href="/"
            onClick={(e) => go(e, "/")}
            aria-label="Kervintz Noel — back to home"
            className="flex items-center gap-3"
          >
            <AnimatedLogo size={40} />
            <span>
              <span className="block font-bold text-lg leading-tight tracking-tight">
                Kervintz Noel
              </span>
              <span className="block font-bold text-sm text-panel-muted leading-tight">
                Software Engineer
              </span>
            </span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="font-bold text-base text-panel-ink hover:text-caution/80 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {TWIN_URL && (
                <li>
                  <Link
                    to="/twin"
                    className="font-bold text-base text-panel-ink hover:text-caution/80 transition-colors"
                  >
                    AI Twin
                  </Link>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => openBooking("footer")}
                  className="font-bold text-base text-panel-ink hover:text-caution/80 transition-colors"
                >
                  Book a Call
                </button>
              </li>
            </ul>
          </nav>

          <ul className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(social.event, { source: "footer" })}
                  className="min-w-11 min-h-11 flex items-center justify-center text-panel-muted hover:text-panel-ink transition-colors"
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-4 border-t border-panel-2 flex flex-wrap justify-between gap-3">
          <p className="text-sm text-panel-muted">
            © {currentYear} Kervintz Noel
          </p>
          <p className="text-sm text-panel-muted">
            Boston, MA · Rev. 2026-08
          </p>
        </div>
      </div>
    </footer>
  );
};
