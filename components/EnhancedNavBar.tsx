// components/EnhancedNavBar.tsx

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Menu, X, Microscope } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface EnhancedNavBarProps {
  items: BreadcrumbItem[];
  imageSrc?: string;
}

const EnhancedNavBar: React.FC<EnhancedNavBarProps> = ({ items, imageSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const backToCategoriesHref = "/category";

  return (
    <header className="mb-6">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 shadow-lg">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between relative">
          {/* Left Section: Image/Icon and Navigation */}
          <div className="flex items-center">
            {/* Category Image or Default Icon */}
            <div className="relative w-14 h-14 mr-4 flex items-center justify-center bg-gray-600 rounded-full">
              {imageSrc && !hasError ? (
                <Image
                  src={imageSrc}
                  alt="Category Image"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-gray-600"
                  onError={() => setHasError(true)}
                />
              ) : (
                <Microscope
                  className="text-gray-300 w-8 h-8"
                  aria-label="Science Icon"
                />
              )}
            </div>

            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex flex-col md:flex-row md:items-center">
              <Link
                href={backToCategoriesHref}
                className="flex items-center text-sm text-gray-300 hover:text-gray-200 mb-2 md:mb-0 md:mr-6 transition-colors duration-200"
                aria-label="Back to Categories"
              >
                <ChevronLeft size={16} />
                <span className="ml-1">Back to Categories</span>
              </Link>
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-3">
                  {items.map((item, index) => (
                    <React.Fragment key={item.href}>
                      {index > 0 && <span className="text-gray-400">/</span>}
                      <li>
                        {index === items.length - 1 ? (
                          <span
                            className="text-white font-semibold"
                            aria-current="page"
                          >
                            {item.name}
                          </span>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-gray-300 hover:text-gray-200 transition-colors duration-200"
                            aria-label={`Navigate to ${item.name}`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    </React.Fragment>
                  ))}
                </ol>
              </nav>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-gray-200 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <nav className="absolute top-full left-0 w-full bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 py-4 md:hidden">
              <div className="container mx-auto px-6">
                <Link
                  href={backToCategoriesHref}
                  className="flex items-center text-sm text-gray-300 hover:text-gray-200 mb-4 transition-colors duration-200"
                  aria-label="Back to Categories"
                >
                  <ChevronLeft size={16} />
                  <span className="ml-1">Back to Categories</span>
                </Link>
                <nav aria-label="Breadcrumb">
                  <ol className="flex flex-col items-start space-y-2">
                    {items.map((item, index) => (
                      <React.Fragment key={item.href}>
                        <li>
                          {index === items.length - 1 ? (
                            <span
                              className="text-white font-semibold"
                              aria-current="page"
                            >
                              {item.name}
                            </span>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-gray-300 hover:text-gray-200 transition-colors duration-200"
                              aria-label={`Navigate to ${item.name}`}
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                        {index < items.length - 1 && (
                          <span className="text-gray-400">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </ol>
                </nav>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default EnhancedNavBar;
