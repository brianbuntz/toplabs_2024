// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  // Use UTC to get the current year
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Navigation Links */}
        <nav className="flex space-x-4 mb-4 md:mb-0">
          <Link
            href="/"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link
            href="/privacy"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://www.facebook.com/ResearchDevelopmentWorld/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://x.com/RandDWorld"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/9348032/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://www.youtube.com/@RnD100"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
            aria-label="YouTube"
          >
            <FaYoutube size={20} />
          </a>
        </div>

        {/* Footer Text with Prose */}
        <p className="prose text-sm text-center md:text-left">
          &copy; {currentYear} R&D World. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
