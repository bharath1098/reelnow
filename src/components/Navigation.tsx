import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Instagram, Facebook, YoutubeIcon } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 py-6 px-6 md:px-12",
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-sm shadow-sm py-4"
          : "bg-transparent"
      )}
    >
      <div className=" mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="font-serif text-2xl md:text-3xl text-photo-dark"
        >
          <img
            src="/assets/images/reelnow_logo.png"
            alt="logo"
            className="h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "nav-link text-lg font-medium transition-colors",
                location.pathname === link.path
                  ? isScrolled
                    ? "text-photo-accent"
                    : "text-[#b13f3f]"
                  : isScrolled
                  ? "text-photo-dark hover:text-photo-accent"
                  : "text-white hover:text-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center space-x-4 ml-4">
            <a
              href="https://instagram.com/reelnow.in"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-opacity hover:opacity-70",
                isScrolled ? "text-photo-dark" : "text-white"
              )}
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@reelnow_official"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-opacity hover:opacity-70",
                isScrolled ? "text-photo-dark" : "text-white"
              )}
            >
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden flex flex-col justify-center items-center space-y-1.5 focus:outline-none fixed top-9 right-6 z-50", // ← Fixed position
            isScrolled ? "text-photo-dark" : "text-blue-500"
          )}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block h-0.5 w-6 transition-all duration-300 bg-blue-500",
              isMobileMenuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 transition-all duration-300 bg-blue-500",
              isMobileMenuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 transition-all duration-300 bg-blue-500",
              isMobileMenuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 h-screen w-screen bg-white flex flex-col justify-center items-center transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 visible z-40"
            : "opacity-0 invisible z-0"
        )}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-photo-dark hover:text-photo-accent"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center space-x-6 mt-8">
            <a href="#" className="text-photo-dark hover:text-photo-accent">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-photo-dark hover:text-photo-accent">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
