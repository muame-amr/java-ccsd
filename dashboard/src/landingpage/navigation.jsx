import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
    { label: "Login", href: "/sign-in" },
  ];

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#page-top"
            className="text-2xl font-bold tracking-wide text-indigo-500 hover:text-indigo-400 transition-colors duration-300"
          >
            NextGen IT
          </a>

          {/* Desktop Navigation */}
          <div className="lg:block">
            <ul className="flex space-x-8">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="relative px-3 py-2 text-white hover:text-indigo-400 transition-colors duration-300 group"
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden ${
            isOpen ? 'block' : 'hidden'
          } transition-all duration-300 ease-in-out`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-indigo-400 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;