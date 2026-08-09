import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useSectionLink } from "@/lib/motion";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/kervcodes", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kervintznoel/", label: "LinkedIn" },
];

// Mirrors the tab strip, in the same order as the page scrolls.
const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Record" },
  { href: "/#learning", label: "Current" },
  { href: "/#posts", label: "Notes" },
  { href: "/#contact", label: "Contact" },
];

// The revision block at the foot of a handbook page.
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  // The footer sits on every route, so these five were the most-repeated
  // full-document reload in the build.
  const go = useSectionLink();

  return (
    <footer className="on-panel bg-panel text-panel-ink">
      <div className="max-w-5xl mx-auto px-5 md:px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <a
            href="/"
            onClick={(e) => go(e, "/")}
            aria-label="Kervintz Noel — back to home"
            className="flex items-center gap-3"
          >
            <AnimatedLogo size={30} />
            <span>
              <span className="block font-bold text-sm leading-tight tracking-tight">
                KERVINTZ NOEL
              </span>
              <span className="placard block text-panel-muted leading-tight">
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
                    className="placard text-panel-muted hover:text-panel-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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
                  className="min-w-11 min-h-11 flex items-center justify-center text-panel-muted hover:text-panel-ink transition-colors"
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-4 border-t border-panel-2 flex flex-wrap justify-between gap-3">
          <p className="placard text-panel-muted nums">
            © {currentYear} Kervintz Noel
          </p>
          <p className="placard text-panel-muted nums">
            Boston, MA · Rev. 2026-08
          </p>
        </div>
      </div>
    </footer>
  );
};
