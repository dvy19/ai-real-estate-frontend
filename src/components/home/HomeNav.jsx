import React, { useState } from 'react';
import { Menu, X, Home } from 'lucide-react'; 

export default function HomeNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
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
              href="#about" 
              className="text-gray-600 font-medium hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-gray-600 font-medium hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>


          </div>

          {/* Right Side: Login & Signup Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="text-gray-700 font-medium hover:text-indigo-600 px-3 py-2 transition-colors"
            >
              Login
            </button>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 font-medium py-2 hover:text-indigo-600"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block text-gray-600 font-medium py-2 hover:text-indigo-600"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-gray-600 font-medium py-2 hover:text-indigo-600"
          >
            Contact
          </a>
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <button 
              className="w-full text-center text-gray-700 font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Login
            </button>
            <button 
              className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg shadow-sm transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}