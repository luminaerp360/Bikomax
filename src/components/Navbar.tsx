import React, { useState, useRef, useEffect } from 'react';
import { BikomaxLogo } from './BikomaxLogo';
import { SHOWROOM_CONTACT } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import {
  Search,
  ShoppingBag,
  Calculator,
  Phone,
  MapPin,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight,
  Maximize2,
  Compass,
  Bath,
  Droplets,
  Zap,
  Grid,
  Check,
  Eye,
} from 'lucide-react';

export type NavPage = 'home' | 'catalogue' | 'about' | 'contact' | 'trade';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCalculator: () => void;
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
  products = [],
  onFilterNavigate,
  onSelectProduct,
}) => {
  const { totalItemsCount, subtotal, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<
    'tiles' | 'sanitaryware' | 'electrical' | null
  >(null);
  
  // Search state
  const [searchCategory, setSearchCategory] = useState<string>('All');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  // Live matching products for CTM-style autocomplete
  const liveSearchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      if (searchCategory !== 'All' && p.category !== searchCategory) {
        return false;
      }
      return (
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.dimension.toLowerCase().includes(query) ||
        (p.look && p.look.toLowerCase().includes(query)) ||
        (p.technology && p.technology.toLowerCase().includes(query)) ||
        (p.collection && p.collection.toLowerCase().includes(query))
      );
    }).slice(0, 5);
  }, [searchQuery, searchCategory, products]);

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
    setActiveDepartment(null);
    setMobileMenuOpen(false);
    if (onFilterNavigate) {
      onFilterNavigate(filters);
    } else {
      onNavigate('catalogue');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/90 shadow-xs">
      
      {/* ========================================================
          TIER 1: CTM KENYA AUTHORITY BAR (Top Notice Strip)
         ======================================================== */}
      <section className="bg-[#0A0A0A] text-white py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] font-mono tracking-wide border-b border-neutral-800">
        <div className="w-full flex justify-between items-center">
          
          {/* Left: Eldoret Physical Depot Location */}
          <div className="flex items-center gap-4 text-neutral-300">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3 h-3 text-[#C2A26F] shrink-0" />
              <span className="truncate">Unit G48, Rupa&apos;s Godowns, Eldoret</span>
            </div>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-400">
              Hours: Mon–Sat 8:00 AM – 6:00 PM
            </span>
          </div>

          {/* Right: Direct Hotline, WhatsApp Concierge, and Trade Portal */}
          <div className="flex items-center gap-4 shrink-0 text-neutral-300">
            <a
              href={`tel:${SHOWROOM_CONTACT.phoneRaw}`}
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C2A26F]" />
              <span className="hidden sm:inline">{SHOWROOM_CONTACT.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>

            <span className="hidden sm:inline text-neutral-600">·</span>

            <a
              href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-emerald-400 font-medium transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp Concierge</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <span className="hidden md:inline text-neutral-600">·</span>

            {/* BQ & Trade Portal */}
            <button
              type="button"
              onClick={() => onNavigate('trade')}
              className="hidden md:inline-block px-2.5 py-0.5 bg-[#C2A26F] text-neutral-950 text-[10px] font-bold uppercase tracking-widest hover:bg-[#b0905e] transition-colors cursor-pointer"
            >
              Trade & BQ Portal
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================
          TIER 2: MAIN E-COMMERCE HEADER (Logo, Search, Cart & Estimator)
         ======================================================== */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 relative border-b border-neutral-100">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          
          {/* Brand Logo with Cleopatra Refined Tag */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left cursor-pointer focus:outline-hidden group"
              aria-label="BIKOMAX Architectural Ceramics"
            >
              <BikomaxLogo size="md" variant="dark" />
            </button>
          </div>

          {/* CTM-Style Global Live Search Bar with Department Filter */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-3xl mx-4 sm:mx-6 lg:mx-8 relative">
            <form
              onSubmit={handleSearchSubmit}
              className="w-full flex items-center border-2 border-neutral-200 focus-within:border-neutral-950 bg-white transition-all shadow-2xs"
            >
              {/* Category Selector Pill */}
              <div className="relative border-r border-neutral-200 bg-neutral-50 shrink-0">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="pl-3 pr-6 py-2 text-xs font-semibold text-neutral-700 bg-transparent focus:outline-hidden cursor-pointer appearance-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Tiles">Tiles</option>
                  <option value="Sanitaryware">Sanitaryware</option>
                  <option value="Electrical">Electrical</option>
                </select>
                <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Input field */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-4 h-4 text-neutral-400 ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  placeholder="Search 60x120 tiles, piano showers, marble, oak parquet, taps..."
                  className="w-full px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="p-1.5 mr-2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search submit button */}
              <button
                type="submit"
                className="px-5 py-2.5 bg-neutral-950 hover:bg-[#C2A26F] text-white hover:text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Suggestions Overlay */}
            {isSearchFocused && liveSearchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neutral-200 shadow-2xl z-50 overflow-hidden divide-y divide-neutral-100">
                <div className="p-2.5 bg-[#FAF9F7] text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold flex justify-between items-center">
                  <span>Matching Architectural Items</span>
                  <span className="text-[#C2A26F]">{liveSearchResults.length} found</span>
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
                    className="p-3 hover:bg-neutral-50 transition-colors flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C2A26F] font-bold">
                          {prod.category}
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {prod.dimension}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-neutral-950 truncate group-hover:text-[#C2A26F] transition-colors">
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
                      {prod.pricing_type === 'area' && prod.bulk_price_per_box && (
                        <div className="text-[10px] font-mono text-neutral-400">
                          {formatKES(prod.bulk_price_per_box)} / Box
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setIsSearchFocused(false);
                    onNavigate('catalogue');
                  }}
                  className="w-full p-2.5 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors text-center"
                >
                  View all results for &ldquo;{searchQuery}&rdquo; →
                </button>
              </div>
            )}
          </div>

          {/* Right Action Cluster: Estimator & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Room Coverage Calculator CTA */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-200 hover:border-neutral-950 text-neutral-800 hover:text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-neutral-50 hover:bg-white"
              title="Launch Multi-Room Calculator"
            >
              <Calculator className="w-4 h-4 text-[#C2A26F]" />
              <span className="hidden xl:inline">Room Estimator</span>
            </button>

            {/* CTM-Style E-Commerce Cart Button with Count Badge & Subtotal */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2.5 px-4 py-2 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#C2A26F]" />
              <span className="hidden sm:inline">Cart</span>
              
              {/* Item Count Badge */}
              <span className="w-5 h-5 rounded-full bg-[#C2A26F] text-neutral-950 text-[10px] font-bold flex items-center justify-center font-mono">
                {totalItemsCount}
              </span>

              {/* Subtotal preview on larger screens */}
              {subtotal > 0 && (
                <span className="hidden 2xl:inline pl-1 text-[11px] font-mono text-neutral-300 border-l border-neutral-700">
                  {formatKES(subtotal)}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>


      {/* ========================================================
          TIER 3: HYBRID DEPARTMENT RIBBON (CTM Departments + Cleopatra Mega Menus)
         ======================================================== */}
      <nav className="hidden lg:block bg-white border-b border-neutral-200/80 text-[11px] font-bold uppercase tracking-wider">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Main Department Links - Evenly Distributed */}
          <div className="w-full flex items-center justify-between">
            
            {/* All Catalogue */}
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className={`py-3 px-2 xl:px-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'catalogue' ? 'text-neutral-950 font-bold border-b-2 border-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-[#C2A26F]" />
              <span>All Collections</span>
            </button>

            {/* DEPARTMENT 1: TILES & SLABS (Mega Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDepartment('tiles')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Tiles' })}
                className="py-3 px-3 xl:px-4 transition-colors cursor-pointer flex items-center gap-1 text-neutral-700 hover:text-neutral-950"
              >
                <span>Tiles</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Mega Menu Dropdown */}
              {activeDepartment === 'tiles' && (
                <div className="absolute top-full left-0 w-[780px] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-4 gap-6 z-50 text-left">
                  {/* Column 1: Substrates */}
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Substrates & Body
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ technology: 'Porcelain' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Porcelain Stoneware
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ technology: 'Ceramic' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Glazed Ceramic Wall
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ technology: 'XXL' })}
                          className="hover:text-black hover:font-bold transition-all text-left flex items-center gap-1"
                        >
                          <span>XXL Grand Formats</span>
                          <span className="text-[9px] bg-neutral-900 text-white px-1 font-mono">120×240</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ technology: '2cm' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          2 CM Outdoor Pavers
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Formats */}
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Tile Formats
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-mono font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Tiles' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          60 × 60 cm Floor
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Tiles' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          60 × 120 cm Large Format
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ technology: 'XXL' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          120 × 240 cm Master Slab
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ look: 'Wood' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          20 × 120 cm Parquet Plank
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ technology: 'Ceramic' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          10 × 30 cm Glazed Subway
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Aesthetic Looks */}
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Aesthetic Looks
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ look: 'Marble' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          Marble & Statuario
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ look: 'Wood' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          Wood & French Parquet
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ look: 'Stone' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          Natural Flamed Stone
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ look: 'Color' })}
                          className="hover:text-black hover:font-bold transition-all text-[#C2A26F]"
                        >
                          Mediterranean Color
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ look: 'Pattern' })}
                          className="hover:text-black hover:font-bold transition-all"
                        >
                          Terrazzo & Patterns
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Visual Card with Photo */}
                  <div className="bg-[#FAF9F7] p-3 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#C2A26F] font-bold block mb-1">
                        Featured Tile
                      </span>
                      <img
                        src="/products/tile-calacatta-gold.jpg"
                        alt="Calacatta Gold Crystal"
                        className="w-full aspect-4/3 object-cover border border-neutral-300 mb-2"
                      />
                      <h5 className="text-[11px] font-bold text-neutral-950 truncate">
                        Calacatta Gold Crystal
                      </h5>
                      <span className="text-[10px] font-mono text-neutral-500 block">
                        60×120 cm · KES 3,480 / m²
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFilterClick({ look: 'Marble' })}
                      className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 underline hover:text-[#C2A26F] text-left"
                    >
                      Explore Marble Range →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* DEPARTMENT 2: SANITARYWARE */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDepartment('sanitaryware')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                className="py-3 px-3 xl:px-4 transition-colors cursor-pointer flex items-center gap-1 text-neutral-700 hover:text-neutral-950"
              >
                <span>Sanitaryware</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Mega Dropdown */}
              {activeDepartment === 'sanitaryware' && (
                <div className="absolute top-full left-0 w-[840px] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-4 gap-6 z-50 text-left">
                  {/* Column 1: Toilets & Bidets */}
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Toilets & Bidets
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Wall-Hung Smart Toilets
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Concealed Cistern Actuators
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Rimless Bidet Systems
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Baths & Basins */}
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Baths & Basins
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Freestanding Bathtubs
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Countertop Vessel Sinks
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Vanity Console Basins
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Showers & Taps */}
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Showers & Taps
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Piano Shower Systems
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          High-Rise Basin Mixers
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Thermostatic Rain Showers
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Visual Card */}
                  <div className="bg-[#FAF9F7] p-3 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#C2A26F] font-bold block mb-1">
                        Featured Sanitaryware
                      </span>
                      <img
                        src="/products/shower-piano.jpg"
                        alt="Gun Grey Piano Shower System"
                        className="w-full aspect-4/3 object-cover border border-neutral-300 mb-2"
                      />
                      <h5 className="text-[11px] font-bold text-neutral-950 truncate">
                        Piano Shower System
                      </h5>
                      <span className="text-[10px] font-mono text-neutral-500 block">
                        PVD Gun Grey · Digital Display
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                      className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 underline hover:text-[#C2A26F] text-left"
                    >
                      View All Sanitaryware →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* DEPARTMENT 3: ELECTRICAL */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDepartment('electrical')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Electrical' })}
                className="py-3 px-3 xl:px-4 transition-colors cursor-pointer flex items-center gap-1 text-neutral-700 hover:text-neutral-950"
              >
                <span>Electrical</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Mega Dropdown */}
              {activeDepartment === 'electrical' && (
                <div className="absolute top-full left-0 w-[580px] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 text-left">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Switches & Dimmers
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Electrical' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          40A DP High-Load Switches
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Electrical' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Smart Rotary Dimmers
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold mb-3 border-b border-neutral-100 pb-1">
                      Sockets & Power
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Electrical' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          13A Twin USB-C PD Sockets
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Electrical' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          British Standard Plates
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Visual Card with Switch Photo */}
                  <div className="bg-[#FAF9F7] p-3 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#C2A26F] font-bold block mb-1">
                        Featured Electrical
                      </span>
                      <img
                        src="/products/switch-40a.jpg"
                        alt="40A DP Cooker Switch"
                        className="w-full aspect-4/3 object-cover border border-neutral-300 mb-2"
                      />
                      <h5 className="text-[11px] font-bold text-neutral-950 truncate">
                        40A DP Switch
                      </h5>
                      <span className="text-[10px] font-mono text-neutral-500 block">
                        Gunmetal Gray · Neon Indicator
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFilterClick({ category: 'Electrical' })}
                      className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 underline hover:text-[#C2A26F] text-left"
                    >
                      View All Electrical →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Room Visualizer */}
            <a
              href="#hp_visualize"
              className="py-1 px-3 bg-[#FAF9F7] border border-neutral-300 hover:border-neutral-950 text-neutral-900 text-[10px] xl:text-[11px] font-bold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A26F]" />
              <span>Room Simulator</span>
            </a>

            {/* Showroom & Brand */}
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className={`py-3 px-3 transition-colors cursor-pointer text-[11px] shrink-0 ${
                currentPage === 'contact' ? 'text-neutral-950 font-bold border-b-2 border-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Showroom
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`py-3 px-3 transition-colors cursor-pointer text-[11px] shrink-0 ${
                currentPage === 'about' ? 'text-neutral-950 font-bold border-b-2 border-neutral-950' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Brand
            </button>

          </div>

        </div>
      </nav>


      {/* ========================================================
          MOBILE EXPANDABLE SLIDE-OUT DRAWER
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 p-6 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-neutral-300 bg-neutral-50 p-2">
            <Search className="w-4 h-4 text-neutral-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tiles, sanitaryware..."
              className="w-full text-xs bg-transparent focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider"
            >
              Go
            </button>
          </form>

          {/* Department Quick List */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold">
              E-Commerce Departments
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Tiles' })}
                className="p-3 bg-neutral-50 border border-neutral-200 text-center hover:border-neutral-950"
              >
                Tiles
              </button>
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                className="p-3 bg-neutral-50 border border-neutral-200 text-center hover:border-neutral-950"
              >
                Sanitaryware
              </button>
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Electrical' })}
                className="p-3 bg-neutral-50 border border-neutral-200 text-center hover:border-neutral-950"
              >
                Electrical
              </button>
            </div>
          </div>

          {/* Cleopatra Looks Mobile List */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold">
              Search by Look
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['Marble', 'Wood', 'Stone', 'Concrete', 'Color', 'Pattern'].map((look) => (
                <button
                  key={look}
                  type="button"
                  onClick={() => handleFilterClick({ look })}
                  className="px-3 py-1.5 border border-neutral-200 text-neutral-800 bg-white"
                >
                  {look}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Pages */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col space-y-2 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="text-left py-2 hover:text-[#C2A26F]"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('catalogue');
              }}
              className="text-left py-2 hover:text-[#C2A26F]"
            >
              Full Catalogue
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="text-left py-2 text-[#C2A26F] flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Room Coverage Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('trade');
              }}
              className="text-left py-2 hover:text-[#C2A26F]"
            >
              Trade & BQ Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="text-left py-2 hover:text-[#C2A26F]"
            >
              Eldoret Showroom Depot
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
