import { Button } from "@/components/Button";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { href: "#about", label: "About" },
    // { href: "/sprint", label: "AI Sprint" },
    // { href: "#posts", label: "Posts" },
    // { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    // { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="z-100 fixed top-0 left-0 right-0">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between border-b border-border backdrop-blur-md bg-background/85">
                <a href="/" className="flex items-center gap-3">
                    <AnimatedLogo size={40} />
                    <span className="font-serif text-lg font-semibold text-foreground">
                        Kervintz Noel
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link, index) => (
                        <a
                            href={link.href}
                            key={index}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-all duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="min-h-screen md:hidden glass-strong animate-fade-in">
                    <div className="container items-center mx-auto px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((link, index) => (
                            <a
                                href={link.href}
                                key={index}
                                className="py-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                            Contact Me
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};
