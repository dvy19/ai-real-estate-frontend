import React, { useState } from 'react';
import { Home, ChevronDown, User, Menu, X } from 'lucide-react';

export default function CustomerNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Re<span className="text-indigo-600">State</span>
            </span>
          </div>

          {/* Middle Elements: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-gray-900 font-medium hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a 
              href="#plots" 
              className="text-gray-600 font-medium hover:text-indigo-600 transition-colors"
            >
              Plots
            </a>
            <a 
              href="#houses" 
              className="text-gray-600 font-medium hover:text-indigo-600 transition-colors"
            >
              Houses
            </a>

            {/* "More" Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)}
                className="flex items-center gap-1 text-gray-600 font-medium hover:text-indigo-600 transition-colors focus:outline-none py-2"
              >
                <span>More</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Options */}
              {isMoreOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                  <a
                    href="#flats"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    Flats
                  </a>
                  <a
                    href="#rental"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    Rental
                  </a>
                  <a
                    href="#pg"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    PG
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Profile Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button 
              className="flex items-center gap-2 border border-gray-200 hover:border-indigo-600 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-sm"
            >
              <User className="w-4 h-4 text-indigo-600" />
              <span>Profile</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-900 font-medium py-2 hover:text-indigo-600"
          >
            Home
          </a>
          <a
            href="#plots"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-600 font-medium py-2 hover:text-indigo-600"
          >
            Plots
          </a>
          <a
            href="#houses"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-600 font-medium py-2 hover:text-indigo-600"
          >
            Houses
          </a>

          {/* Mobile Nested Section for "More" */}
          <div className="pt-2 border-t border-gray-100">
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              More Categories
            </span>
            <a
              href="#flats"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-600 font-medium py-1.5 pl-2 hover:text-indigo-600"
            >
              Flats
            </a>
            <a
              href="#rental"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-600 font-medium py-1.5 pl-2 hover:text-indigo-600"
            >
              Rental
            </a>
            <a
              href="#pg"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-600 font-medium py-1.5 pl-2 hover:text-indigo-600"
            >
              PG
            </a>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}