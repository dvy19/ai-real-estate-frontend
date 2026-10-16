import React from 'react';
import { Home, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function CustomerFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Re<span className="text-indigo-500">State</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted real estate marketplace. Find, buy, or rent plots, houses, flats, and luxury farmhouses with verified brokers and direct listings.
            </p>
            <div className="pt-2 text-xs text-gray-400">
              <span className="inline-block px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
                Verified Listings Only
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-indigo-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#brokers" className="hover:text-indigo-400 transition-colors">
                  Brokers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">
              Property Types
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              <li>
                <a href="#houses" className="hover:text-indigo-400 transition-colors">
                  Houses
                </a>
              </li>
              <li>
                <a href="#plots" className="hover:text-indigo-400 transition-colors">
                  Plots
                </a>
              </li>
              <li>
                <a href="#rentals" className="hover:text-indigo-400 transition-colors">
                  Rentals
                </a>
              </li>
              <li>
                <a href="#apartments" className="hover:text-indigo-400 transition-colors">
                  Apartments
                </a>
              </li>
              <li>
                <a href="#flats" className="hover:text-indigo-400 transition-colors">
                  Flats
                </a>
              </li>
              <li>
                <a href="#farmhouse" className="hover:text-indigo-400 transition-colors">
                  Farmhouse
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+9118001234567" className="hover:text-white transition-colors">
                  +91 1800 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:support@restate.com" className="hover:text-white transition-colors">
                  support@restate.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  ReState HQ, Sector 62, Gurgaon, HR - 122001
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} ReState Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-gray-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}