import React, { useState, useRef, useEffect } from 'react';
import { BikomaxLogo } from './BikomaxLogo';
import { SHOWROOM_CONTACT, INITIAL_PRODUCTS } from '../data/products';
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
  onOpenSimulator?: (tileRef?: string, roomId?: string) => void;
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
  const [activeDepartment, setActiveDepartment] = useState<
    'tiles' | 'bathrooms' | 'taps' | 'electrical' | 'looks' | 'destinations' | null
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
    return INITIAL_PRODUCTS.filter((p) => {
      if (searchCategory !== 'All') {
        if (searchCategory === 'Tiles' && p.category !== 'Tiles') return false;
        if (searchCategory === 'Bathrooms' && p.category !== 'Sanitaryware') return false;
        if (searchCategory === 'Electrical' && p.category !== 'Electrical') return false;
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
  }, [searchQuery, searchCategory]);

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
      <section className="bg-[#0A0A0A] text-neutral-300 py-2 px-4 sm:px-6 lg:px-8 text-xs font-sans tracking-normal border-b border-neutral-800/80">
        <div className="w-full flex justify-between items-center text-[12px] sm:text-[13px]">
          
          {/* Left: Eldoret Physical Depot Location */}
          <div className="flex items-center gap-3.5 text-neutral-300">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate font-medium text-neutral-200">Unit G48, Rupa&apos;s Godowns, Eldoret</span>
            </div>
            <span className="hidden md:inline text-neutral-700">|</span>
            <span className="hidden md:inline text-neutral-400 font-normal">
              Hours: Mon–Sat 8:00 AM – 6:00 PM
            </span>
          </div>

          {/* Right: Direct Hotline, WhatsApp Concierge, and Trade Portal */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${SHOWROOM_CONTACT.phoneRaw}`}
              className="hover:text-white flex items-center gap-1.5 text-neutral-200 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">{SHOWROOM_CONTACT.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>

            <span className="hidden sm:inline text-neutral-700">·</span>

            <a
              href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-emerald-400 font-medium transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Concierge</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <span className="hidden md:inline text-neutral-700">·</span>

            {/* BQ & Trade Portal */}
            <button
              type="button"
              onClick={() => onNavigate('trade')}
              className="hidden md:inline-flex items-center px-3.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-[11px] font-nav font-semibold uppercase tracking-wider rounded-xs active:scale-98 transition-all cursor-pointer shadow-xs hover:shadow-md hover:shadow-amber-500/20"
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
          
          {/* Brand Logo with Bikomax Refined Tag */}
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
                  <option value="All">All Items</option>
                  <option value="Tiles">Tiles & Slabs</option>
                  <option value="Bathrooms">Bathrooms</option>
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
                className="px-5 py-2.5 bg-neutral-950 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Suggestions Overlay */}
            {isSearchFocused && liveSearchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neutral-200 shadow-2xl z-50 overflow-hidden divide-y divide-neutral-100">
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
                    className="p-3 hover:bg-neutral-50 transition-colors flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-nav uppercase tracking-wider text-amber-600 font-bold">
                          {prod.category}
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-[11px] font-sans text-neutral-400">
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
                      {prod.pricing_type === 'area' && prod.bulk_price_per_box && (
                        <div className="text-[11px] font-sans text-neutral-400">
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
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-200 hover:border-amber-500 text-neutral-800 hover:text-amber-600 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer bg-neutral-50 hover:bg-amber-50/40 group/calc shadow-2xs"
              title="Launch Multi-Room Calculator"
            >
              <Calculator className="w-4 h-4 text-amber-500 group-hover/calc:scale-110 transition-transform duration-200" />
              <span className="hidden xl:inline">Room Estimator</span>
            </button>

            {/* CTM-Style E-Commerce Cart Button with Count Badge & Subtotal */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2.5 px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs group/cart"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover/cart:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Cart</span>
              
              {/* Item Count Badge */}
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold flex items-center justify-center font-nav shadow-xs">
                {totalItemsCount}
              </span>

              {/* Subtotal preview on larger screens */}
              {subtotal > 0 && (
                <span className="hidden 2xl:inline pl-1 text-[11px] font-sans font-medium text-amber-300 border-l border-neutral-800">
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
          TIER 3: HYBRID DEPARTMENT RIBBON (Departments + Architectural Mega Menus)
         ======================================================== */}
      <nav className="hidden lg:block bg-white border-b border-neutral-200/80 font-nav text-[13px] xl:text-[13.5px] font-medium tracking-[0.03em]">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Main Department Links - Evenly Distributed */}
          <div className="w-full flex items-center justify-between">
            
            {/* All Catalogue */}
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className={`relative py-3.5 px-2 xl:px-3 cursor-pointer flex items-center gap-2 group transition-all duration-200 ${
                currentPage === 'catalogue' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5">All Collections</span>
              
              {/* Animated Bottom Line */}
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                currentPage === 'catalogue' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />
            </button>

            {/* DEPARTMENT 1: TILES & SLABS (Mega Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('tiles')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Tiles' })}
                className={`py-3.5 px-2.5 xl:px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  activeDepartment === 'tiles' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">Tiles & Slabs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                  activeDepartment === 'tiles' ? 'rotate-180 text-amber-600' : 'text-neutral-400 group-hover:text-amber-600 group-hover:rotate-180'
                }`} />
              </button>

              {/* Animated Bottom Line */}
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                activeDepartment === 'tiles' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />

              {/* Mega Menu Dropdown */}
              {activeDepartment === 'tiles' && (
                <div className="absolute top-full left-0 w-[780px] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-4 gap-6 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
                  {/* Column 1: Substrates */}
                  <div>
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
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
                          <span className="text-[9px] bg-neutral-900 text-white px-1.5 py-0.5 rounded-xs font-sans font-medium">120×240</span>
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
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
                      Tile Formats
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-sans font-normal">
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
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
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
                          className="hover:text-black hover:font-bold transition-all text-amber-600 font-semibold"
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
                      <span className="text-[10px] font-nav uppercase text-amber-600 font-semibold tracking-wider block mb-1">
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
                      <span className="text-[11px] font-sans text-neutral-500 block">
                        60×120 cm · KES 3,480 / m²
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFilterClick({ look: 'Marble' })}
                      className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 underline hover:text-amber-600 text-left transition-colors"
                    >
                      Explore Marble Range →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* DEPARTMENT 2: BATHROOMS & SANITARY */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('bathrooms')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                className={`py-3.5 px-2.5 xl:px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  activeDepartment === 'bathrooms' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">Bathrooms & Sanitary</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                  activeDepartment === 'bathrooms' ? 'rotate-180 text-amber-600' : 'text-neutral-400 group-hover:text-amber-600 group-hover:rotate-180'
                }`} />
              </button>

              {/* Animated Bottom Line */}
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                activeDepartment === 'bathrooms' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />

              {/* Mega Dropdown */}
              {activeDepartment === 'bathrooms' && (
                <div className="absolute top-full left-0 w-[640px] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
                  <div>
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
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
                          Matte Black Sanitary Sets
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
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

                  {/* Visual Card with Bathtub Photo */}
                  <div className="bg-[#FAF9F7] p-3 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-nav uppercase text-amber-600 font-semibold tracking-wider block mb-1">
                        Featured Bath
                      </span>
                      <img
                        src="/products/bathtub-black.jpg"
                        alt="Freestanding Soaking Bathtub"
                        className="w-full aspect-4/3 object-cover border border-neutral-300 mb-2"
                      />
                      <h5 className="text-[11px] font-bold text-neutral-950 truncate">
                        Freestanding Soaking Tub
                      </h5>
                      <span className="text-[11px] font-sans text-neutral-500 block">
                        Double-Ended · KES 78,500
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                      className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 underline hover:text-amber-600 text-left transition-colors"
                    >
                      View Sanitaryware →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* DEPARTMENT 3: TAPS & SHOWERS */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('taps')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                className={`py-3.5 px-2.5 xl:px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  activeDepartment === 'taps' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">Taps & Showers</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                  activeDepartment === 'taps' ? 'rotate-180 text-amber-600' : 'text-neutral-400 group-hover:text-amber-600 group-hover:rotate-180'
                }`} />
              </button>

              {/* Animated Bottom Line */}
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                activeDepartment === 'taps' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />

              {/* Mega Dropdown */}
              {activeDepartment === 'taps' && (
                <div className="absolute top-full left-0 w-[640px] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
                  <div>
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
                      Shower Systems
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Concealed Piano Valve Sets
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Hydroelectric LED Displays
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

                  <div>
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
                      Mixers & Taps
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Brushed Champagne Brass
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Tall Countertop Mixers
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Kitchen Sink Faucets
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Visual Card with Piano Shower Photo */}
                  <div className="bg-[#FAF9F7] p-3 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-nav uppercase text-amber-600 font-semibold tracking-wider block mb-1">
                        Featured Shower
                      </span>
                      <img
                        src="/products/shower-piano.jpg"
                        alt="Gun Grey Piano Shower System"
                        className="w-full aspect-4/3 object-cover border border-neutral-300 mb-2"
                      />
                      <h5 className="text-[11px] font-bold text-neutral-950 truncate">
                        Piano Shower System
                      </h5>
                      <span className="text-[11px] font-sans text-neutral-500 block">
                        Gun Grey PVD · KES 24,500
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                      className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 underline hover:text-amber-600 text-left transition-colors"
                    >
                      View Showers →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* DEPARTMENT 4: ELECTRICAL & LIGHTING */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('electrical')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Electrical' })}
                className={`py-3.5 px-2.5 xl:px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  activeDepartment === 'electrical' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">Electrical & Fittings</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                  activeDepartment === 'electrical' ? 'rotate-180 text-amber-600' : 'text-neutral-400 group-hover:text-amber-600 group-hover:rotate-180'
                }`} />
              </button>

              {/* Animated Bottom Line */}
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                activeDepartment === 'electrical' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />

              {/* Mega Dropdown */}
              {activeDepartment === 'electrical' && (
                <div className="absolute top-full left-0 w-[540px] bg-white border border-neutral-200 shadow-2xl p-6 grid grid-cols-2 gap-6 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
                  <div>
                    <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
                      Switches & Dimmers
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-700 font-normal">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Electrical' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          40A DP High-Load Cooker Switch
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Electrical' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          Smart Champagne Rotary Dimmers
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterClick({ category: 'Electrical' })}
                          className="hover:text-black hover:font-bold transition-all text-left"
                        >
                          13A Twin Switched Sockets (Onyx)
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Visual Card with Switch Photo */}
                  <div className="bg-[#FAF9F7] p-3 border border-neutral-200/90 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-nav uppercase text-amber-600 font-semibold tracking-wider block mb-1">
                        Featured Switch
                      </span>
                      <img
                        src="/products/switch-40a.jpg"
                        alt="40A DP Cooker Switch"
                        className="w-full aspect-4/3 object-cover border border-neutral-300 mb-2"
                      />
                      <h5 className="text-[11px] font-bold text-neutral-950 truncate">
                        40A DP Cooker Switch
                      </h5>
                      <span className="text-[11px] font-sans text-neutral-500 block">
                        Gunmetal Gray · KES 2,150
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFilterClick({ category: 'Electrical' })}
                      className="mt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 underline hover:text-amber-600 text-left transition-colors"
                    >
                      View Electrical →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* DEPARTMENT 5: SEARCH BY LOOK */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('looks')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                className={`py-3.5 px-2.5 xl:px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  activeDepartment === 'looks' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">Search by Look</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                  activeDepartment === 'looks' ? 'rotate-180 text-amber-600' : 'text-neutral-400 group-hover:text-amber-600 group-hover:rotate-180'
                }`} />
              </button>

              {/* Animated Bottom Line */}
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                activeDepartment === 'looks' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />

              {activeDepartment === 'looks' && (
                <div className="absolute top-full left-0 w-[500px] bg-white border border-neutral-200 shadow-2xl p-6 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
                  <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
                    Architectural Aesthetic Looks
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-neutral-700 font-normal">
                    {[
                      { look: 'Marble', desc: 'Calacatta & Statuario' },
                      { look: 'Wood', desc: 'French Oak Parquet' },
                      { look: 'Stone', desc: 'Alpine Slate & Paving' },
                      { look: 'Concrete', desc: 'Industrial Minimalist' },
                      { look: 'Color', desc: 'Mediterranean Ripple Glaze' },
                      { look: 'Pattern', desc: 'Venetian Terrazzo' },
                    ].map((item) => (
                      <button
                        key={item.look}
                        type="button"
                        onClick={() => handleFilterClick({ look: item.look })}
                        className="p-2 border border-neutral-200 hover:border-amber-500 hover:bg-amber-50/30 text-left transition-all duration-150 group/look"
                      >
                        <strong className="block text-neutral-950 group-hover/look:text-amber-600 transition-colors">{item.look} Look</strong>
                        <span className="text-[10px] text-neutral-500">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DEPARTMENT 6: DESTINATIONS */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('destinations')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <button
                type="button"
                className={`py-3.5 px-2.5 xl:px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  activeDepartment === 'destinations' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">Destinations</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${
                  activeDepartment === 'destinations' ? 'rotate-180 text-amber-600' : 'text-neutral-400 group-hover:text-amber-600 group-hover:rotate-180'
                }`} />
              </button>

              {/* Animated Bottom Line */}
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                activeDepartment === 'destinations' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />

              {activeDepartment === 'destinations' && (
                <div className="absolute top-full left-0 w-[420px] bg-white border border-neutral-200 shadow-2xl p-5 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-200">
                  <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold mb-3 border-b border-neutral-100 pb-1">
                    Select Your Room Space
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['Bathroom', 'Living', 'Kitchen', 'Bedroom', 'Outdoor', 'Commercial'].map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => handleFilterClick({ destination: dest })}
                        className="py-2 px-3 border border-neutral-200 hover:border-amber-500 hover:bg-amber-50/40 hover:text-amber-700 font-medium transition-all duration-150 text-left"
                      >
                        {dest === 'Living' ? 'Living Room' : dest}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bikomax 3D Room Visualizer Jump / Modal */}
            <button
              type="button"
              onClick={() => {
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
              }}
              className="relative group/sim py-1.5 px-3.5 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 hover:from-amber-500 hover:via-amber-600 hover:to-amber-500 text-neutral-900 hover:text-white border border-amber-500/40 hover:border-amber-500 rounded-xs shadow-2xs hover:shadow-md hover:shadow-amber-500/25 text-[12px] font-nav font-semibold tracking-wide flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden shrink-0 cursor-pointer"
            >
              {/* Shimmer light reflection effect */}
              <span className="absolute inset-0 -translate-x-full group-hover/sim:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              
              <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover/sim:text-white transition-all duration-300 group-hover/sim:rotate-12 group-hover/sim:scale-110" />
              <span className="relative z-10">Room Simulator</span>
            </button>

            {/* Showroom & Brand links */}
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className={`relative group py-3.5 px-2.5 xl:px-3 cursor-pointer text-[13px] xl:text-[13.5px] font-nav transition-all duration-200 shrink-0 ${
                currentPage === 'contact' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
              }`}
            >
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5 block">Showroom</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                currentPage === 'contact' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`relative group py-3.5 px-2.5 xl:px-3 cursor-pointer text-[13px] xl:text-[13.5px] font-nav transition-all duration-200 shrink-0 ${
                currentPage === 'about' ? 'text-amber-600 font-semibold' : 'text-neutral-700 hover:text-amber-600'
              }`}
            >
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5 block">Brand</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-out rounded-full ${
                currentPage === 'about' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} />
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
            <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold">
              E-Commerce Departments
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Tiles' })}
                className="p-3 bg-neutral-50 border border-neutral-200 text-left hover:border-amber-500 hover:text-amber-600 transition-colors"
              >
                Tiles & Slabs
              </button>
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                className="p-3 bg-neutral-50 border border-neutral-200 text-left hover:border-amber-500 hover:text-amber-600 transition-colors"
              >
                Bathrooms
              </button>
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Sanitaryware' })}
                className="p-3 bg-neutral-50 border border-neutral-200 text-left hover:border-amber-500 hover:text-amber-600 transition-colors"
              >
                Taps & Showers
              </button>
              <button
                type="button"
                onClick={() => handleFilterClick({ category: 'Electrical' })}
                className="p-3 bg-neutral-50 border border-neutral-200 text-left hover:border-amber-500 hover:text-amber-600 transition-colors"
              >
                Electrical
              </button>
            </div>
          </div>

          {/* Bikomax Looks Mobile List */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-nav uppercase tracking-widest text-amber-600 font-semibold">
              Search by Look
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['Marble', 'Wood', 'Stone', 'Concrete', 'Color', 'Pattern'].map((look) => (
                <button
                  key={look}
                  type="button"
                  onClick={() => handleFilterClick({ look })}
                  className="px-3 py-1.5 border border-neutral-200 text-neutral-800 bg-white hover:border-amber-500 hover:text-amber-600 transition-colors"
                >
                  {look}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Pages */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col space-y-2 text-xs font-bold uppercase tracking-wider font-nav">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('catalogue');
              }}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Full Catalogue
            </button>
            <button
              type="button"
              onClick={() => {
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
              }}
              className="text-left py-2 text-amber-600 font-bold flex items-center gap-1.5 hover:text-amber-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>3D Room Simulator Studio</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="text-left py-2 text-neutral-700 font-semibold flex items-center gap-1.5 hover:text-amber-600 transition-colors"
            >
              <Calculator className="w-4 h-4 text-neutral-500" />
              <span>Room Coverage Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('trade');
              }}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Trade & BQ Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="text-left py-2 hover:text-amber-600 transition-colors"
            >
              Eldoret Showroom Depot
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
