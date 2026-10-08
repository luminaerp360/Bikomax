import React, { useState } from 'react';
import { BikomaxLogo } from './BikomaxLogo';
import { SHOWROOM_CONTACT } from '../data/products';
import { useCart } from '../context/CartContext';
import {
  Search,
  ShoppingBag,
  Calculator,
  Phone,
  MapPin,
  Menu,
  X,
  MessageCircle,
} from 'lucide-react';

export type NavPage = 'home' | 'catalogue' | 'about' | 'contact' | 'trade';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenCalculator,
}) => {
  const { totalItemsCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Short, classy nav titles as requested
  const navLinks: { id: NavPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Showroom' },
    { id: 'trade', label: 'Trade' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage !== 'catalogue') {
      onNavigate('catalogue');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/60">
      {/* Refined Minimalist Notice Strip */}
      <div className="bg-[#0A0A0A] text-white py-1.5 px-4 text-[11px] font-normal tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-neutral-300 truncate">
            <MapPin className="w-3 h-3 text-[#C2A26F] shrink-0" />
            <span className="truncate">Unit G48, Rupa&apos;s Godowns, Eldoret</span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-neutral-300">
            <a
              href={`tel:${SHOWROOM_CONTACT.phoneRaw}`}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C2A26F]" />
              <span>{SHOWROOM_CONTACT.phone}</span>
            </a>

            <span className="hidden sm:inline text-neutral-600">·</span>

            <a
              href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-emerald-400 font-medium transition-colors hidden sm:inline"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left cursor-pointer focus:outline-hidden"
              aria-label="BIKOMAX Home"
            >
              <BikomaxLogo size="md" variant="dark" />
            </button>
          </div>

          {/* Clean Short Nav Titles (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onNavigate(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-xs uppercase tracking-wider font-semibold transition-colors relative py-1 cursor-pointer ${
                  currentPage === link.id
                    ? 'text-neutral-950 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-neutral-950'
                    : 'text-neutral-500 hover:text-neutral-950'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative w-48">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'catalogue' && e.target.value.trim().length > 0) {
                    onNavigate('catalogue');
                  }
                }}
                className="w-full pl-8 pr-3 py-1.5 bg-[#F6F6F5] border border-neutral-200 text-xs text-neutral-950 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-950"
              />
            </form>

            {/* Room Calculator Quick Action */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 hover:border-neutral-950 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C2A26F]" />
              <span>Calculator</span>
            </button>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative py-1.5 px-3 bg-neutral-950 text-white hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
              aria-label="View cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C2A26F]" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
                Cart
              </span>
              {totalItemsCount > 0 && (
                <span className="min-w-4.5 h-4.5 px-1 bg-[#C2A26F] text-neutral-950 text-[10px] font-black flex items-center justify-center font-mono">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-700 hover:text-neutral-950 border border-neutral-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 border-t border-neutral-200 mt-3 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tiles, showers, switches..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'catalogue') {
                    onNavigate('catalogue');
                  }
                }}
                className="w-full pl-9 pr-4 py-2 bg-[#F6F6F5] border border-neutral-200 text-xs text-neutral-950 placeholder-neutral-400 focus:outline-hidden"
              />
            </form>

            <nav className="flex flex-col divide-y divide-neutral-100">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`py-2 text-left text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-between ${
                    currentPage === link.id
                      ? 'text-neutral-950 font-bold bg-neutral-50 px-2'
                      : 'text-neutral-600 hover:text-neutral-950 px-2'
                  }`}
                >
                  <span>{link.label}</span>
                  {currentPage === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>
                  )}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 border border-neutral-300 bg-neutral-50 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C2A26F]" />
              Tile Coverage Calculator
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
