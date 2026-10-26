import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BikomaxLogo } from './BikomaxLogo';
import { SHOWROOM_CONTACT, INITIAL_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import {
  Home,
  Search,
  ShoppingBag,
  Calculator,
  Phone,
  MapPin,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Grid,
  Layers,
  Bath,
  Droplets,
  Zap,
} from 'lucide-react';

export type NavPage = 'home' | 'catalogue' | 'about' | 'contact' | 'trade';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCalculator: () => void;
  onOpenSimulator?: (tileRef?: string, roomId?: string) => void;
  products?: Product[];
  onFilterNavigate?: (filters: {
    category?: string;
    technology?: string;
    look?: string;
    destination?: string;
  }) => void;
  onSelectProduct?: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenCalculator,
  onOpenSimulator,
  onFilterNavigate,
  onSelectProduct,
}) => {
  const { totalItemsCount, subtotal, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const collectionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close live search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup hover timer
  useEffect(() => {
    return () => {
      if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
    };
  }, []);

  const handleCollectionsMouseEnter = () => {
    if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
    setIsCollectionsHovered(true);
  };

  const handleCollectionsMouseLeave = () => {
    collectionsTimeoutRef.current = setTimeout(() => {
      setIsCollectionsHovered(false);
    }, 150);
  };

  // Live autocomplete results
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    return INITIAL_PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.dimension.toLowerCase().includes(query) ||
        (p.look && p.look.toLowerCase().includes(query)) ||
        (p.technology && p.technology.toLowerCase().includes(query)) ||
        (p.collection && p.collection.toLowerCase().includes(query))
      );
    }).slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (currentPage !== 'catalogue') {
      onNavigate('catalogue');
    }
  };

  const handleFilterClick = (filters: {
    category?: string;
    technology?: string;
    look?: string;
    destination?: string;
  }) => {
    setIsCollectionsHovered(false);
    setMobileMenuOpen(false);
    if (onFilterNavigate) {
      onFilterNavigate(filters);
    } else {
      onNavigate('catalogue');
    }
  };

  const handleSimulatorClick = () => {
    setIsCollectionsHovered(false);
    setMobileMenuOpen(false);
    if (onOpenSimulator) {
      onOpenSimulator();
    } else {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById('hp_visualize')?.scrollIntoView({ behavior: 'smooth' });
        }, 250);
      } else {
        document.getElementById('hp_visualize')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/90 shadow-xs">
      
      {/* ========================================================
          TIER 1: TOP AUTHORITY BAR
         ======================================================== */}
      <section className="bg-[#0A0A0A] text-neutral-300 py-2 px-4 sm:px-6 lg:px-8 text-xs font-sans tracking-normal border-b border-neutral-800/80">
        <div className="w-full flex justify-between items-center text-[12px] sm:text-[13px]">
          
          {/* Left: Physical Depot Location & Hours */}
          <div className="flex items-center gap-3.5 text-neutral-300">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate font-medium text-neutral-200">
                Unit G48, Rupa&apos;s Godowns, Eldoret
              </span>
            </div>
            <span className="hidden md:inline text-neutral-700">|</span>
            <span className="hidden md:inline text-neutral-400 font-normal">
              Mon–Sat 8:00 AM – 6:00 PM
            </span>
          </div>

          {/* Right: Phone, WhatsApp Concierge, and Trade Portal */}
          <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
            <a
              href={`tel:${SHOWROOM_CONTACT.phoneRaw}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-[11px] sm:text-xs text-neutral-200">{SHOWROOM_CONTACT.phone}</span>
            </a>

            <span className="hidden sm:inline text-neutral-700">·</span>

            <a
              href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-[11px] sm:text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <span className="hidden md:inline text-neutral-700">·</span>

            {/* BQ & Trade Portal */}
            <button
              type="button"
              onClick={() => onNavigate('trade')}
              className="hidden md:inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-[11px] font-nav font-semibold uppercase tracking-wider rounded-xs active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              Trade & BQ Portal
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          TIER 2: STREAMLINED LUXURY MAIN NAVIGATION
         ======================================================== */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 relative bg-white">
        <div className="flex items-center justify-between gap-4 xl:gap-8">
          
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left cursor-pointer focus:outline-hidden group"
              aria-label="BIKOMAX Home"
            >
              <BikomaxLogo size="md" variant="dark" />
            </button>
          </div>

          {/* Core Navigation Links: Home, Collections, Room Simulator, About Us, Contacts */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-nav text-[13.5px] font-medium tracking-[0.02em] text-neutral-700">
            
            {/* 1. Home */}
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative py-2 px-3 cursor-pointer flex items-center gap-1.5 transition-colors duration-200 ${
                currentPage === 'home' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
              }`}
            >
              <span>Home</span>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 transition-all duration-300 ${
                  currentPage === 'home' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
              />
            </button>

            {/* 2. Collections (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={handleCollectionsMouseEnter}
              onMouseLeave={handleCollectionsMouseLeave}
            >
              <button
                type="button"
                onClick={() => onNavigate('catalogue')}
                className={`relative py-2 px-3 cursor-pointer flex items-center gap-1 transition-colors duration-200 ${
                  currentPage === 'catalogue' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCollectionsHovered ? 'rotate-180 text-amber-600' : 'text-neutral-400'
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 transition-all duration-300 ${
                    currentPage === 'catalogue' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                />
              </button>

              {/* Collections Mega Menu Dropdown */}
              {isCollectionsHovered && (
                <div
                  onMouseEnter={handleCollectionsMouseEnter}
                  onMouseLeave={handleCollectionsMouseLeave}
                  className="absolute top-full left-0 mt-1 w-[680px] xl:w-[740px] bg-white border border-neutral-200 shadow-2xl p-6 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="grid grid-cols-3 gap-6 pb-5 border-b border-neutral-100">
                    
                    {/* Column 1: Tiles & Slabs */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-nav uppercase tracking-widest text-amber-600 font-bold mb-3">
                        <Grid className="w-3.5 h-3.5" />
                        <span>Tiles & Slabs</span>
                      </div>
                      <ul className="space-y-2 text-xs text-neutral-700">
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ technology: 'Porcelain' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Porcelain Tiles
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ technology: 'XXL' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Large Format XXL Slabs
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ technology: 'Ceramic' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Ceramic Floor & Wall
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ technology: '18mm', destination: 'Outdoor' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            18mm Outdoor Pavers
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2: SPC Flooring & Bathrooms */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-nav uppercase tracking-widest text-amber-600 font-bold mb-3">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Flooring & Bath</span>
                      </div>
                      <ul className="space-y-2 text-xs text-neutral-700">
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ category: 'SPC Flooring' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block font-medium"
                          >
                            SPC Flooring & Parquet
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Smart & Wall-Hung Toilets
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Designer Basins & Vanities
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Thermostatic Piano Showers
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3: Electrical & Looks */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-nav uppercase tracking-widest text-amber-600 font-bold mb-3">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Electrical & Looks</span>
                      </div>
                      <ul className="space-y-2 text-xs text-neutral-700">
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ category: 'Electrical' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block font-medium"
                          >
                            Luxury Switches & Sockets
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ look: 'Marble' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Marble & Calacatta Look
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ look: 'Wood' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            French Oak Wood Look
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleFilterClick({ look: 'Stone' })}
                            className="hover:text-amber-600 hover:translate-x-1 transition-all text-left block"
                          >
                            Alpine Stone & Concrete Look
                          </button>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {/* Dropdown Bottom Quick Link */}
                  <div className="pt-3 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-sans">
                      Over 350+ premium Italian & Spanish imported finishes
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCollectionsHovered(false);
                        onNavigate('catalogue');
                      }}
                      className="font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group/all"
                    >
                      <span>Explore Full Catalogue</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/all:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. About Us */}
            <button
              type="button"
              onClick={() => {
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative py-2 px-3 cursor-pointer transition-colors duration-200 ${
                currentPage === 'about' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
              }`}
            >
              <span>About Us</span>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 transition-all duration-300 ${
                  currentPage === 'about' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
              />
            </button>

            {/* 4. Contacts */}
            <button
              type="button"
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative py-2 px-3 cursor-pointer transition-colors duration-200 ${
                currentPage === 'contact' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
              }`}
            >
              <span>Contacts</span>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 transition-all duration-300 ${
                  currentPage === 'contact' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
              />
            </button>

            {/* 5. Room Simulator */}
            <button
              type="button"
              onClick={handleSimulatorClick}
              className="relative py-2 px-3 cursor-pointer flex items-center gap-1.5 text-neutral-700 hover:text-amber-600 transition-colors duration-200 group/sim"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover/sim:rotate-12 transition-transform duration-300" />
              <span>Room Simulator</span>
            </button>

          </nav>

          {/* Right Action Cluster: Sleek Search Bar, Room Estimator & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Sleek Search Input with Live Autocomplete Dropdown */}
            <div ref={searchContainerRef} className="hidden md:block relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center border border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-900 bg-neutral-50/60 rounded-xs transition-all duration-200"
              >
                <Search className="w-4 h-4 text-neutral-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  placeholder="Search products..."
                  className="w-36 lg:w-48 xl:w-56 px-2.5 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden bg-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="p-1 mr-1.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Autocomplete Dropdown Overlay */}
              {isSearchFocused && liveSearchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-1.5 w-80 xl:w-96 bg-white border border-neutral-200 shadow-2xl z-50 overflow-hidden divide-y divide-neutral-100">
                  <div className="p-2.5 bg-[#FAF9F7] text-[10px] font-nav uppercase tracking-wider text-neutral-500 font-bold flex justify-between items-center">
                    <span>Matching Architectural Items</span>
                    <span className="text-amber-600 font-bold">{liveSearchResults.length} found</span>
                  </div>

                  {liveSearchResults.map((prod) => (
                    <div
                      key={prod.ref}
                      onClick={() => {
                        setIsSearchFocused(false);
                        if (onSelectProduct) {
                          onSelectProduct(prod);
                        } else {
                          onNavigate('catalogue');
                        }
                      }}
                      className="p-2.5 hover:bg-neutral-50 transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 object-cover border border-neutral-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-nav uppercase tracking-wider text-amber-600 font-bold">
                            {prod.category}
                          </span>
                          <span className="text-neutral-300">·</span>
                          <span className="text-[10px] font-sans text-neutral-400">
                            {prod.dimension}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-neutral-950 truncate group-hover:text-amber-600 transition-colors">
                          {prod.name}
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-neutral-950">
                          {formatKES(prod.pricing_type === 'area' ? (prod.price_per_sqm || 0) : (prod.price_per_unit || 0))}
                          <span className="text-[10px] font-normal text-neutral-500 ml-0.5">
                            {prod.pricing_type === 'area' ? '/ m²' : '/ Pc'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchFocused(false);
                      onNavigate('catalogue');
                    }}
                    className="w-full p-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors text-center"
                  >
                    View all results for &ldquo;{searchQuery}&rdquo; →
                  </button>
                </div>
              )}
            </div>

            {/* Room Estimator CTA Button */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 hover:border-amber-500 text-neutral-800 hover:text-amber-600 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer bg-neutral-50 hover:bg-amber-50/40 rounded-xs group/calc"
              title="Launch Room Coverage Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-500 group-hover/calc:scale-110 transition-transform duration-200" />
              <span className="hidden xl:inline text-[11px]">Estimator</span>
            </button>

            {/* E-Commerce Shopping Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs rounded-xs group/cart"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover/cart:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline text-[11px]">Cart</span>
              
              {/* Item Count Badge */}
              <span className="w-4.5 h-4.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold flex items-center justify-center font-nav shadow-xs">
                {totalItemsCount}
              </span>

              {/* Subtotal preview on wide screens */}
              {subtotal > 0 && (
                <span className="hidden 2xl:inline pl-1 text-[11px] font-sans font-medium text-amber-300 border-l border-neutral-800">
                  {formatKES(subtotal)}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer rounded-xs"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================
          MOBILE EXPANDABLE DRAWER
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 p-5 space-y-5 max-h-[85vh] overflow-y-auto animate-in fade-in duration-150">
          
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-neutral-300 bg-neutral-50 p-2 rounded-xs">
            <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tiles, sanitaryware, SPC..."
              className="w-full text-xs bg-transparent focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded-xs"
            >
              Go
            </button>
          </form>

          {/* Core Mobile Navigation Links */}
          <div className="flex flex-col space-y-1 text-sm font-nav font-medium">
            
            {/* Home */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-left py-2.5 px-2 rounded-xs transition-colors flex items-center gap-2.5 ${
                currentPage === 'home' ? 'bg-amber-50 text-amber-600 font-bold' : 'text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              <Home className="w-4 h-4 text-amber-500" />
              <span>Home</span>
            </button>

            {/* Collections Accordion */}
            <div className="border-y border-neutral-100 py-1">
              <button
                type="button"
                onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                className={`w-full text-left py-2.5 px-2 rounded-xs transition-colors flex items-center justify-between ${
                  currentPage === 'catalogue' ? 'text-amber-600 font-bold' : 'text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Grid className="w-4 h-4 text-amber-500" />
                  <span>Collections</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileCollectionsOpen ? 'rotate-180 text-amber-600' : 'text-neutral-400'
                  }`}
                />
              </button>

              {mobileCollectionsOpen && (
                <div className="pl-6 pr-2 py-2 space-y-1.5 text-xs text-neutral-600 bg-neutral-50/50 rounded-xs mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('catalogue');
                    }}
                    className="w-full text-left py-1.5 font-bold text-amber-600 hover:underline"
                  >
                    View All Collections →
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterClick({ category: 'Tiles' })}
                    className="w-full text-left py-1 hover:text-neutral-950"
                  >
                    Tiles & Slabs
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterClick({ category: 'SPC Flooring' })}
                    className="w-full text-left py-1 hover:text-neutral-950"
                  >
                    SPC Rigid Core Flooring
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                    className="w-full text-left py-1 hover:text-neutral-950"
                  >
                    Bathrooms & Sanitaryware
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterClick({ category: 'Electrical' })}
                    className="w-full text-left py-1 hover:text-neutral-950"
                  >
                    Designer Electrical
                  </button>
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-left py-2.5 px-2 rounded-xs transition-colors flex items-center gap-2.5 ${
                currentPage === 'about' ? 'bg-amber-50 text-amber-600 font-bold' : 'text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              <span>About Us</span>
            </button>

            {/* Contacts */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-left py-2.5 px-2 rounded-xs transition-colors flex items-center gap-2.5 ${
                currentPage === 'contact' ? 'bg-amber-50 text-amber-600 font-bold' : 'text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              <span>Contacts</span>
            </button>

            {/* Room Simulator */}
            <button
              type="button"
              onClick={handleSimulatorClick}
              className="text-left py-2.5 px-2 rounded-xs transition-colors flex items-center gap-2.5 text-neutral-800 hover:bg-neutral-50"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Room Simulator</span>
            </button>

          </div>

          {/* Quick Utility Tools in Mobile Drawer */}
          <div className="pt-3 border-t border-neutral-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full py-2 px-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-800 rounded-xs flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>Room Coverage Calculator</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('trade');
              }}
              className="w-full py-2 px-3 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2"
            >
              <span>Trade & BQ Portal</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
