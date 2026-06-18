import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";


const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#testimonials", label: "Testimonials" },
]
export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return <header className="fixed top-0 left-0 right-0 bg-transparent py-5">
        <nav className="container mx-auto px-6 flex items-center justify-between">
            <a className="text-xl font-bold tracking-tight hover:text-primary" href="#home">
                KN <span className="text-primary">.</span></a>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
                <div className="glass rounded-full px-2 py-1 items-center gap-1">
                    {
                        navLinks.map((link, index) => (
                            <a href={link.href} key={index} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface">
                                {link.label}
                            </a>
                        ))
                    }
                </div>
            </div>
            {/* CTA Button */}
            <div className="hidden md:block">
                <Button size="sm">Contact Me</Button>
            </div>

            {/* Mobile menu button */}
            <button 
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
                    {isMobileMenuOpen ? <X size={24}/> : <Menu size={24} />}
            </button>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="min-h-screen md:hidden glass-strong animate-fade-in">
                <div className="container items-center mx-auto px-6 py-6 flex flex-col gap-4">
                    {
                        navLinks.map((link, index) => (
                            <a href={link.href} key={index} className=" py-2 text-lg text-muted-foreground hover:text-foreground ">
                                {link.label}
                            </a>
                        ))
                    }

                    <Button>Contact Me</Button>
                </div>
            </div>
        )}
    </header>
}