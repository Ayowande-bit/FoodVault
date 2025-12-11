import React, { useState } from 'react';
import {  Home, Info, PhoneIcon, User, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import final from '../assets/final.png';

const navLinks = [
  { name: 'Home', page: 'Home', icon: Home },
  { name: 'How It Works', page: 'HowItWorks', icon: Info },
  { name: 'About Us', page: 'AboutUs', icon: UserCircle},
  { name: "Sign In", page: 'SignIn', icon: User},
  { name: 'Register', page: 'Register', icon: User},
  


];

function createPageUrl(pageName) {
  const routes = {
    Home: '/',
    HowItWorks: '/hero', // ✅ Link How It Works to Hero page
    AboutUs: '/about',
    SignIn: '/sign',
    Register: '/log',
 
    
  };
  return routes[pageName] || '/';
}

export default function Header({ children, currentPageName}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky z-50 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-26">

            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <img src={final} alt="FoodVault Logo" className="h-28 w-30" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    currentPageName === link.page
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-emerald-400'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Push Content Down */}
      <main className="mt-4 px-4 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
