import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Instagram, Menu, X, Youtube } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "discover", "services", "features", "how-it-works", "join", "testimonials", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Our Work", href: "#discover" },
    { name: "Services", href: "#services" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Join Us", href: "#join" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-500 py-4 px-4 md:px-8",
          isScrolled
            ? "glass-strong py-3"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <span className="text-black font-bold text-lg">R</span>
            </div>
            <span className="font-display text-xl font-bold text-white">
              Reel<span className="gradient-text">Now</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={cn(
                  "nav-link text-sm font-medium uppercase tracking-wider",
                  activeSection === link.href.slice(1) && "text-white after:scale-x-100"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://instagram.com/reelnow.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@reelnow_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-500",
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={cn(
                "text-2xl font-display font-semibold transition-all duration-300",
                activeSection === link.href.slice(1) 
                  ? "text-cyan-400" 
                  : "text-white/70 hover:text-white"
              )}
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.name}
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
            }}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-full text-lg"
            style={{ 
              transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            Book Now
          </a>

          <div 
            className="flex items-center gap-6 mt-6"
            style={{ 
              transitionDelay: isMobileMenuOpen ? `${(navLinks.length + 1) * 50}ms` : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <a
              href="https://instagram.com/reelnow.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://www.youtube.com/@reelnow_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              <Youtube size={28} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
