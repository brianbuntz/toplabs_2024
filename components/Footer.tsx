import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#222222] text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Navigation Links */}
        <nav className="flex space-x-4 mb-4 md:mb-0">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/contact" className="hover:text-blue-400">Contact Us</Link>
          <Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
        </nav>
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://www.facebook.com/ResearchDevelopmentWorld/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaFacebook size={20} />
          </a>
          <a href="https://x.com/RandDWorld" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter size={20} />
          </a>
          <a href="https://www.linkedin.com/company/9348032/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.youtube.com/@RnD100" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaYoutube size={20} />
          </a>
        </div>
        {/* Footer Text */}
        <p className="text-sm text-center md:text-left">
          &copy; {currentYear} R&D World. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;