import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  Youtube,
  YoutubeIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-photo-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">Reelnow.in</h3>
            <p className="text-gray-300 text-sm max-w-xs">
              We Shoot Edit Deliver Instantly
            </p>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Portfolio", "Services", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Portrait Photography",
                "Wedding Photography",
                "Event Coverage",
                "Commercial Photography",
                "Fine Art Prints",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a href="mailto:info@reelnow.in" className="text-gray-600">
                <p className="flex items-center text-gray-300 text-sm">
                  <Mail size={16} className="mr-2" />
                  info@reelnow.in
                </p>
              </a>
              <div className="flex items-center space-x-4 mt-4">
                <a
                  href="https://instagram.com/reelnow.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-photo-accent transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@reelnow_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-photo-accent transition-colors"
                >
                  <YoutubeIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Reelnow.in All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
