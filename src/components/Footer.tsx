import React from "react";
import { Instagram, Youtube, Mail, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    navigation: [
      { name: "Home", href: "#home" },
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Testimonials", href: "#testimonials" },
    ],
    company: [
      { name: "Join as Creator", href: "#join" },
      { name: "Contact Us", href: "#contact" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                <span className="text-black font-bold text-lg">R</span>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Reel<span className="gradient-text">Now</span>
              </span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Instant reels, shot on iPhone. We deliver professional video content in 10 minutes or less.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/reelnow.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@reelnow_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/50 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-white/50 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@reelnow.in"
                  className="flex items-center gap-3 text-white/50 hover:text-cyan-400 transition-colors text-sm"
                >
                  <Mail size={16} />
                  info@reelnow.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin size={16} />
                Hyderabad, India
              </li>
            </ul>

            {/* Newsletter placeholder */}
            <div className="mt-6">
              <p className="text-white/50 text-sm mb-3">Stay updated with our latest news</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Reel Now. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
