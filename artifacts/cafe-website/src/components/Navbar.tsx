import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Menu", id: "menu" },
    { name: "Services", id: "services" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1C0A00] text-[#C8963E] shadow-md" : "bg-transparent text-[#FDF6EC]"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div 
          className="font-serif text-2xl font-bold tracking-wider cursor-pointer"
          onClick={() => scrollToSection("home")}
          data-testid="navbar-logo"
        >
          Brewed Bliss
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm uppercase tracking-widest font-medium hover:text-[#D4694A] transition-colors"
              data-testid={`nav-link-${link.id}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="navbar-mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-[#1C0A00] border-t border-[#C8963E]/20 p-6 flex flex-col gap-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#C8963E] text-lg uppercase tracking-widest font-medium hover:text-[#D4694A] transition-colors text-left"
                data-testid={`nav-mobile-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
