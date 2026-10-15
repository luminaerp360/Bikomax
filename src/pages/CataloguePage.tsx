import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { formatKES } from '../utils/formatters';
import {
  Search,
  Calculator,
  Check,
  ShoppingBag,
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Maximize2,
  ArrowRight,
  Layers,
  Filter,
} from 'lucide-react';

interface CataloguePageProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenCalculatorWithProduct: (product: Product) => void;
  onOpenCalculator: () => void;
  selectedLook?: string;
  onLookChange?: (look: string) => void;
  selectedTechnology?: string;
  onTechnologyChange?: (tech: string) => void;
  selectedDestination?: string;
  onDestinationChange?: (dest: string) => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  products,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onSelectProduct,
  onOpenCalculatorWithProduct,
  onOpenCalculator,
  selectedLook = 'All',
  onLookChange,
  selectedTechnology = 'All',
  onTechnologyChange,
  selectedDestination = 'All',
  onDestinationChange,
}) => {
  const { addBatchToCart, addTileToCart } = useCart();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeDimension, setActiveDimension] = useState<string>('All');
  const [activeSurfaceType, setActiveSurfaceType] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cleopatra-editorial' | 'spec-grid'>('cleopatra-editorial');

  // Mobile filter drawer state (CRITICAL FOR MOBILE RESPONSIVENESS)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Accordion section collapse state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    type: true,
    looks: true,
    destination: true,
    technology: true,
    formats: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Local filter states fallback
  const [localLook, setLocalLook] = useState<string>(selectedLook);
  const [localTech, setLocalTech] = useState<string>(selectedTechnology);
  const [localDest, setLocalDest] = useState<string>(selectedDestination);

  const activeLook = onLookChange ? selectedLook : localLook;
  const activeTech = onTechnologyChange ? selectedTechnology : localTech;
  const activeDest = onDestinationChange ? selectedDestination : localDest;

  const handleSetLook = (l: string) => {
    if (onLookChange) onLookChange(l);
    else setLocalLook(l);
  };

  const handleSetTech = (t: string) => {
    if (onTechnologyChange) onTechnologyChange(t);
    else setLocalTech(t);
  };

  const handleSetDest = (d: string) => {
    if (onDestinationChange) onDestinationChange(d);
    else setLocalDest(d);
  };

  // Multi-item selection state for batch adding
  const [selectedProductRefs, setSelectedProductRefs] = useState<Set<string>>(new Set());
  const [batchAddedNotice, setBatchAddedNotice] = useState(false);

  const availableDimensions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.dimension) set.add(p.dimension);
    });
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Surface Type (Floor, Wall, Floor & Wall)
        if (activeSurfaceType !== 'All') {
          if (activeSurfaceType === 'Floor' && product.surfaceType !== 'Floor' && product.surfaceType !== 'Floor & Wall') {
            return false;
          }
          if (activeSurfaceType === 'Wall' && product.surfaceType !== 'Wall' && product.surfaceType !== 'Floor & Wall') {
            return false;
          }
          if (activeSurfaceType === 'Floor & Wall' && product.surfaceType !== 'Floor & Wall') {
            return false;
          }
        }
        // Technology (e.g. Porcelain, Ceramic, XXL, 2cm)
        if (activeTech !== 'All' && product.technology !== activeTech) {
          return false;
        }
        // Look (e.g. Marble, Wood, Stone, Concrete, Pattern, Color)
        if (activeLook !== 'All' && product.look !== activeLook) {
          return false;
        }
        // Destination (e.g. Living, Bathroom, Kitchen)
        if (activeDest !== 'All' && !product.destinations?.includes(activeDest as any)) {
          return false;
        }
        // Dimension
        if (activeDimension !== 'All' && product.dimension !== activeDimension) {
          return false;
        }
        // Search text
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchDim = product.dimension.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          const matchLook = product.look?.toLowerCase().includes(query) || false;
          const matchTech = product.technology?.toLowerCase().includes(query) || false;
          const matchColl = product.collection?.toLowerCase().includes(query) || false;
          if (!matchName && !matchDesc && !matchDim && !matchCat && !matchLook && !matchTech && !matchColl) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          const priceA = a.pricing_type === 'area' ? (a.price_per_sqm || 0) : (a.price_per_unit || 0);
          const priceB = b.pricing_type === 'area' ? (b.price_per_sqm || 0) : (b.price_per_unit || 0);
          return priceA - priceB;
        }
        if (sortBy === 'price-desc') {
          const priceA = a.pricing_type === 'area' ? (a.price_per_sqm || 0) : (a.price_per_unit || 0);
          const priceB = b.pricing_type === 'area' ? (b.price_per_sqm || 0) : (b.price_per_unit || 0);
          return priceB - priceA;
        }
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, activeSurfaceType, activeTech, activeLook, activeDest, activeDimension, sortBy]);

  const toggleBatchSelect = (product: Product) => {
    setSelectedProductRefs((prev) => {
      const next = new Set(prev);
      if (next.has(product.ref)) {
        next.delete(product.ref);
      } else {
        next.add(product.ref);
      }
      return next;
    });
  };

  const handleSelectAllVisible = () => {
    if (selectedProductRefs.size === filteredProducts.length) {
      setSelectedProductRefs(new Set());
    } else {
      setSelectedProductRefs(new Set(filteredProducts.map((p) => p.ref)));
    }
  };

  const handleAddSelectedBatchToCart = () => {
    const selectedItems = products.filter((p) => selectedProductRefs.has(p.ref));
    if (selectedItems.length === 0) return;

    const batchParams = selectedItems.map((p) => ({
      product: p,
      mode: (p.pricing_type === 'area' ? 'box' : 'unit') as any,
      boxes: p.pricing_type === 'area' ? 5 : undefined,
      units: p.pricing_type === 'unit' ? 1 : undefined,
      withWastage: false,
    }));

    addBatchToCart(batchParams);
    setBatchAddedNotice(true);
    setTimeout(() => {
      setBatchAddedNotice(false);
      setSelectedProductRefs(new Set());
    }, 1200);
  };

  // Count active criteria
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeSurfaceType !== 'All') count++;
    if (activeTech !== 'All') count++;
    if (activeLook !== 'All') count++;
    if (activeDest !== 'All') count++;
    if (activeDimension !== 'All') count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [activeSurfaceType, activeTech, activeLook, activeDest, activeDimension, searchQuery]);

  const hasActiveSubFilters = activeFilterCount > 0;

  const resetAllFilters = () => {
    onCategoryChange('All');
    setActiveSurfaceType('All');
    handleSetTech('All');
    handleSetLook('All');
    handleSetDest('All');
    setActiveDimension('All');
    onSearchChange('');
  };

  // Reusable Filter Content (Used in Desktop Sidebar & Mobile Drawer)
  const renderFilterAccordions = () => (
    <div className="divide-y divide-neutral-100 text-xs">
      
      {/* SECTION A: TYPE / SURFACE */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('type')}
          className="w-full flex items-center justify-between font-bold text-neutral-900 uppercase tracking-wider text-[11px] cursor-pointer"
        >
          <span>Type</span>
          {openSections.type ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.type && (
          <div className="mt-3 space-y-2.5 pl-1">
            {[
              { id: 'All', label: 'All Types' },
              { id: 'Floor', label: 'Floor' },
              { id: 'Wall', label: 'Wall' },
              { id: 'Floor & Wall', label: 'Floor & Wall' },
            ].map((type) => {
              const isSelected = activeSurfaceType === type.id;
              return (
                <label
                  key={type.id}
                  onClick={() => setActiveSurfaceType(type.id)}
                  className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-950 cursor-pointer select-none transition-colors"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950'
                        : 'border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className={isSelected ? 'font-bold text-neutral-950' : 'font-normal'}>
                    {type.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION B: LOOKS */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('looks')}
          className="w-full flex items-center justify-between font-bold text-neutral-900 uppercase tracking-wider text-[11px] cursor-pointer"
        >
          <span>Looks</span>
          {openSections.looks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.looks && (
          <div className="mt-3 space-y-2.5 pl-1">
            {[
              { id: 'All', label: 'All Looks' },
              { id: 'Color', label: 'Color & Gloss' },
              { id: 'Marble', label: 'Marble' },
              { id: 'Wood', label: 'Wood & Parquet' },
              { id: 'Stone', label: 'Stone' },
              { id: 'Concrete', label: 'Concrete & Minimal' },
              { id: 'Pattern', label: 'Pattern & Terrazzo' },
              { id: 'Sugar Effect', label: 'Sugar Crystal / 5G' },
            ].map((item) => {
              const isSelected = activeLook === item.id;
              return (
                <label
                  key={item.id}
                  onClick={() => handleSetLook(item.id)}
                  className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-950 cursor-pointer select-none transition-colors"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-[#C2A26F] bg-[#C2A26F]'
                        : 'border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className={isSelected ? 'font-bold text-[#C2A26F]' : 'font-normal'}>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION C: DESTINATION OF USE */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('destination')}
          className="w-full flex items-center justify-between font-bold text-neutral-900 uppercase tracking-wider text-[11px] cursor-pointer"
        >
          <span>Destination of Use</span>
          {openSections.destination ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.destination && (
          <div className="mt-3 space-y-2.5 pl-1">
            {[
              { id: 'All', label: 'All Destinations' },
              { id: 'Bathroom', label: 'Bathroom' },
              { id: 'Living', label: 'Living Room' },
              { id: 'Kitchen', label: 'Kitchen' },
              { id: 'Bedroom', label: 'Bedroom' },
              { id: 'Outdoor', label: 'Outdoor' },
              { id: 'Commercial', label: 'Commercial' },
            ].map((item) => {
              const isSelected = activeDest === item.id;
              return (
                <label
                  key={item.id}
                  onClick={() => handleSetDest(item.id)}
                  className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-950 cursor-pointer select-none transition-colors"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950'
                        : 'border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className={isSelected ? 'font-bold text-neutral-950' : 'font-normal'}>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION D: TECHNOLOGY / SUBSTRATE */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('technology')}
          className="w-full flex items-center justify-between font-bold text-neutral-900 uppercase tracking-wider text-[11px] cursor-pointer"
        >
          <span>Technology</span>
          {openSections.technology ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.technology && (
          <div className="mt-3 space-y-2.5 pl-1">
            {[
              { id: 'All', label: 'All Technologies' },
              { id: 'Porcelain', label: 'Porcelain Stoneware' },
              { id: 'Ceramic', label: 'Glazed Ceramic' },
              { id: 'XXL', label: 'XXL Slabs' },
              { id: '2cm', label: '2 CM Outdoor' },
            ].map((item) => {
              const isSelected = activeTech === item.id;
              return (
                <label
                  key={item.id}
                  onClick={() => handleSetTech(item.id)}
                  className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-950 cursor-pointer select-none transition-colors"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950'
                        : 'border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className={isSelected ? 'font-bold text-neutral-950' : 'font-normal'}>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION E: FORMATS */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('formats')}
          className="w-full flex items-center justify-between font-bold text-neutral-900 uppercase tracking-wider text-[11px] cursor-pointer"
        >
          <span>Formats</span>
          {openSections.formats ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.formats && (
          <div className="mt-3 space-y-2.5 pl-1">
            {availableDimensions.map((dim) => {
              const isSelected = activeDimension === dim;
              return (
                <label
                  key={dim}
                  onClick={() => setActiveDimension(dim)}
                  className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-950 cursor-pointer select-none transition-colors"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950'
                        : 'border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className={isSelected ? 'font-bold text-neutral-950' : 'font-normal'}>
                    {dim === 'All' ? 'All Formats' : dim}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );

  return (
    <div className="bg-[#FAFAFA] text-neutral-950 font-sans min-h-screen pb-28">
      {/* 1. TOP CLEOPATRA DARK BANNER & SUB-NAV */}
      <section className="bg-[#111111] text-white pt-6 sm:pt-8 pb-10 sm:pb-14 border-b border-neutral-800">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          {/* Sub-brand Centered Category Navigation (Cleopatra Style) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pb-6 border-b border-white/10 text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-300">
            <button
              type="button"
              onClick={() => {
                onCategoryChange('All');
                handleSetTech('All');
              }}
              className={`hover:text-[#C2A26F] transition-colors cursor-pointer ${
                selectedCategory === 'All' && activeTech === 'All' ? 'text-[#C2A26F] font-bold' : ''
              }`}
            >
              The Master Collections
            </button>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('Tiles');
                handleSetTech('Ceramic');
              }}
              className={`hover:text-[#C2A26F] transition-colors cursor-pointer ${
                activeTech === 'Ceramic' ? 'text-[#C2A26F] font-bold' : ''
              }`}
            >
              Ceramic Tiles
            </button>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('Tiles');
                handleSetTech('Porcelain');
              }}
              className={`hover:text-[#C2A26F] transition-colors cursor-pointer ${
                activeTech === 'Porcelain' ? 'text-[#C2A26F] font-bold' : ''
              }`}
            >
              Porcelain Tiles
            </button>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('Tiles');
                handleSetTech('XXL');
              }}
              className={`hover:text-[#C2A26F] transition-colors cursor-pointer ${
                activeTech === 'XXL' ? 'text-[#C2A26F] font-bold' : ''
              }`}
            >
              XXL Tiles
            </button>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('Tiles');
                handleSetTech('2cm');
              }}
              className={`hover:text-[#C2A26F] transition-colors cursor-pointer ${
                activeTech === '2cm' ? 'text-[#C2A26F] font-bold' : ''
              }`}
            >
              2 CM Outdoor
            </button>
          </div>

          {/* Large Cleopatra Centered Editorial Banner */}
          <div className="pt-6 sm:pt-10 text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#C2A26F] font-semibold block">
              Architectural Surfaces & Living Spaces
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight font-heading text-white">
              Experiencing the energy of colors & surfaces
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl mx-auto pt-1">
              From mirror-polished Calacatta marbles to handcrafted Mediterranean glazed ceramics and 20mm outdoor pavers.
            </p>
          </div>

        </div>
      </section>

      {/* 2. MAIN 2-COLUMN LAYOUT (DESKTOP SIDEBAR + RESPONSIVE PRODUCT-FIRST MOBILE) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* ========================================================
              LEFT SIDEBAR: DESKTOP ONLY (HIDDEN ON MOBILE TO PREVENT LONG SCROLL)
             ======================================================== */}
          <aside className="hidden lg:block w-72 shrink-0 bg-white border border-neutral-200/90 p-6 shadow-2xs lg:sticky lg:top-24">
            
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-900" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest font-heading text-neutral-950">
                  Ceramic Filters
                </h2>
              </div>

              {hasActiveSubFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-[11px] font-mono text-red-600 hover:underline cursor-pointer"
                  title="Clear all active criteria"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Desktop Filter Accordions */}
            {renderFilterAccordions()}

            {/* Coverage Tool Quick Trigger in Sidebar */}
            <div className="pt-6 mt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-full py-2.5 px-3 bg-neutral-950 hover:bg-[#C2A26F] text-white hover:text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Room Estimator</span>
              </button>
            </div>

          </aside>


          {/* ========================================================
              RIGHT MAIN AREA: IMMEDIATE PRODUCT ACCESS ON MOBILE & DESKTOP
             ======================================================== */}
          <main className="flex-1 w-full min-w-0">
            
            {/* ========================================================
                MOBILE QUICK-FILTER TOOLBAR (Products show IMMEDIATELY!)
               ======================================================== */}
            <div className="bg-white border border-neutral-200/90 p-3 sm:p-5 shadow-2xs mb-6 sm:mb-8 space-y-3">
              
              {/* Row 1: Mobile Filter Button, Search, Sort & View Mode */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                
                {/* Mobile Slide-Over Trigger Button (With Count Badge) */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-2 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs active:scale-95 transition-transform"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C2A26F]" />
                  <span>Filter & Refine</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#C2A26F] text-neutral-950 text-[10px] font-bold flex items-center justify-center font-mono">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Search by name input */}
                <div className="relative flex-1 min-w-[160px] sm:min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-8 pr-3 py-2 sm:py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Sorter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-2 sm:py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Curated Spec</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-neutral-300 bg-neutral-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('cleopatra-editorial')}
                    className={`px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'cleopatra-editorial'
                        ? 'bg-white text-neutral-950 shadow-2xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-950'
                    }`}
                    title="Gallery View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Gallery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('spec-grid')}
                    className={`px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'spec-grid'
                        ? 'bg-white text-neutral-950 shadow-2xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-950'
                    }`}
                    title="Spec & Calculator Mode"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Spec</span>
                  </button>
                </div>

                {/* Batch select visible (Desktop / Tablet) */}
                <button
                  type="button"
                  onClick={handleSelectAllVisible}
                  className="hidden sm:inline-block px-2.5 py-1.5 border border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 text-xs transition-colors cursor-pointer"
                >
                  {selectedProductRefs.size === filteredProducts.length && filteredProducts.length > 0
                    ? 'Deselect All'
                    : 'Select All'}
                </button>
              </div>

              {/* Row 2: One-Touch Horizontal Swipeable Chips (Instant filtering with ZERO vertical scrolling!) */}
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono">
                  <span className="text-[10px] uppercase text-neutral-400 font-bold shrink-0 mr-1 hidden sm:inline">
                    Quick Refine:
                  </span>
                  
                  {[
                    { label: 'All', active: activeTech === 'All' && activeLook === 'All' && activeDest === 'All', action: () => { handleSetTech('All'); handleSetLook('All'); handleSetDest('All'); } },
                    { label: 'Porcelain', active: activeTech === 'Porcelain', action: () => handleSetTech(activeTech === 'Porcelain' ? 'All' : 'Porcelain') },
                    { label: 'Ceramic Wall', active: activeTech === 'Ceramic', action: () => handleSetTech(activeTech === 'Ceramic' ? 'All' : 'Ceramic') },
                    { label: 'XXL Slabs', active: activeTech === 'XXL', action: () => handleSetTech(activeTech === 'XXL' ? 'All' : 'XXL') },
                    { label: '2cm Outdoor', active: activeTech === '2cm', action: () => handleSetTech(activeTech === '2cm' ? 'All' : '2cm') },
                    { label: 'Marble Look', active: activeLook === 'Marble', action: () => handleSetLook(activeLook === 'Marble' ? 'All' : 'Marble') },
                    { label: 'Wood Parquet', active: activeLook === 'Wood', action: () => handleSetLook(activeLook === 'Wood' ? 'All' : 'Wood') },
                    { label: 'Color Glaze', active: activeLook === 'Color', action: () => handleSetLook(activeLook === 'Color' ? 'All' : 'Color') },
                    { label: 'Bathroom', active: activeDest === 'Bathroom', action: () => handleSetDest(activeDest === 'Bathroom' ? 'All' : 'Bathroom') },
                    { label: 'Living Room', active: activeDest === 'Living', action: () => handleSetDest(activeDest === 'Living' ? 'All' : 'Living') },
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={chip.action}
                      className={`px-2.5 py-1 uppercase tracking-wider shrink-0 border transition-all cursor-pointer select-none ${
                        chip.active
                          ? 'bg-neutral-950 text-white font-bold border-neutral-950 shadow-2xs'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Product Count & Active Dismissable Filter Tags */}
              <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <p className="font-mono uppercase tracking-wider text-neutral-500 text-[11px]">
                  Showing <strong className="text-neutral-950 font-bold">{filteredProducts.length}</strong> collections
                </p>

                {hasActiveSubFilters && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                    {activeLook !== 'All' && (
                      <button
                        type="button"
                        onClick={() => handleSetLook('All')}
                        className="px-2 py-0.5 bg-[#C2A26F]/15 text-[#8f7447] font-semibold border border-[#C2A26F]/30 flex items-center gap-1 hover:bg-red-50"
                      >
                        <span>Look: {activeLook}</span>
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                    {activeTech !== 'All' && (
                      <button
                        type="button"
                        onClick={() => handleSetTech('All')}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-semibold border border-neutral-300 flex items-center gap-1 hover:bg-red-50"
                      >
                        <span>Tech: {activeTech}</span>
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                    {activeSurfaceType !== 'All' && (
                      <button
                        type="button"
                        onClick={() => setActiveSurfaceType('All')}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-semibold border border-neutral-300 flex items-center gap-1 hover:bg-red-50"
                      >
                        <span>Type: {activeSurfaceType}</span>
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                    {activeDest !== 'All' && (
                      <button
                        type="button"
                        onClick={() => handleSetDest('All')}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-semibold border border-neutral-300 flex items-center gap-1 hover:bg-red-50"
                      >
                        <span>Space: {activeDest}</span>
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="text-red-600 underline font-bold px-1"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Batch Action Bar if items selected */}
            {selectedProductRefs.size > 0 && (
              <div className="mb-6 p-3 bg-neutral-900 text-white flex items-center justify-between text-xs shadow-md">
                <span>
                  <strong>{selectedProductRefs.size}</strong> collections selected
                </span>
                <button
                  type="button"
                  onClick={handleAddSelectedBatchToCart}
                  className="px-4 py-1.5 bg-[#C2A26F] hover:bg-[#b0905e] text-neutral-950 font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Stage to Cart</span>
                </button>
              </div>
            )}

            {/* Batch Toast */}
            <AnimatePresence>
              {batchAddedNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-emerald-600 text-white text-xs font-semibold flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Selected collections have been staged into your architectural cart!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ========================================================
                GRID RENDER: IMMEDIATE TILES & COLLECTIONS
               ======================================================== */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-neutral-200 p-12 sm:p-16 text-center space-y-4">
                <Layers className="w-10 h-10 text-neutral-300 mx-auto" />
                <h3 className="text-lg font-bold font-heading text-neutral-900">
                  No matching architectural surfaces found
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Try clearing active Look, Technology, or Destination criteria.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'cleopatra-editorial' ? (
              
              /* ========================================================
                  CLEOPATRA EDITORIAL 3-COLUMN GALLERY
                 ======================================================== */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProductRefs.has(product.ref);
                  const isTile = product.pricing_type === 'area';
                  const sqmPerBox = product.sqm_per_box || 1.44;
                  const boxPrice = product.bulk_price_per_box || ((product.price_per_sqm || 0) * sqmPerBox);

                  return (
                    <article
                      key={product.ref}
                      onClick={() => onSelectProduct(product)}
                      className="group bg-white border border-neutral-200/90 hover:border-neutral-950 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-2xs hover:shadow-md"
                    >
                      {/* Lifestyle Room Render / Product Image */}
                      <div className="relative aspect-4/3 w-full bg-[#EFEFEF] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />

                        {/* Top-left: Specification badges */}
                        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                          {product.technology && (
                            <span className="px-2 py-0.5 bg-neutral-950/85 backdrop-blur-xs text-white text-[9px] font-mono uppercase tracking-widest font-bold">
                              {product.technology}
                            </span>
                          )}
                          {product.surfaceType && (
                            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-xs text-neutral-900 text-[9px] font-mono uppercase tracking-widest font-semibold border border-neutral-300">
                              {product.surfaceType}
                            </span>
                          )}
                        </div>

                        {/* Top-right: Batch select check */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBatchSelect(product);
                          }}
                          className={`absolute top-3 right-3 z-20 w-6 h-6 border flex items-center justify-center transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#C2A26F] border-[#C2A26F] text-neutral-950 font-bold'
                              : 'bg-white/90 border-neutral-300 text-transparent hover:border-neutral-950'
                          }`}
                          title="Select for batch action"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>

                        {/* Hover Quick View overlay */}
                        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="px-3 py-1.5 bg-white/95 text-neutral-950 text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                            <Maximize2 className="w-3 h-3 text-[#C2A26F]" />
                            <span>Quick Spec</span>
                          </span>
                        </div>
                      </div>

                      {/* Cleopatra Bottom Label Strip */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        
                        <div>
                          {/* Top row: Collection name & VIEW DETAILS underlined */}
                          <div className="flex items-start justify-between gap-3 border-b border-neutral-100 pb-2.5">
                            <h3 className="text-sm sm:text-base font-bold text-neutral-950 uppercase tracking-wide font-heading group-hover:text-[#C2A26F] transition-colors leading-snug">
                              {product.name}
                            </h3>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-950 underline underline-offset-4 group-hover:text-[#C2A26F] transition-colors shrink-0">
                              View Details
                            </span>
                          </div>

                          {/* Dimensions & Surface Specs */}
                          <div className="mt-2.5 flex items-center justify-between text-xs text-neutral-500 font-mono">
                            <span>{product.dimension} · {product.finish || 'Polished'}</span>
                            {product.origin && (
                              <span className="text-[10px] text-neutral-400 uppercase">{product.origin}</span>
                            )}
                          </div>
                        </div>

                        {/* Dual Pricing Bar & Quick Add */}
                        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-end justify-between">
                          {isTile ? (
                            <div>
                              <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                                m² Rate / Carton
                              </span>
                              <div className="text-sm sm:text-base font-bold text-neutral-950">
                                {formatKES(product.price_per_sqm || 0)}
                                <span className="text-[11px] font-normal text-neutral-500 ml-1">/ m²</span>
                              </div>
                              <span className="text-[10px] font-mono text-neutral-500 block">
                                {formatKES(boxPrice)} / Box ({sqmPerBox} m²)
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                                Unit Rate
                              </span>
                              <div className="text-sm sm:text-base font-bold text-neutral-950">
                                {formatKES(product.price_per_unit || 0)}
                                <span className="text-[11px] font-normal text-neutral-500 ml-1">/ Pc</span>
                              </div>
                            </div>
                          )}

                          {/* Quick Add Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isTile) {
                                addTileToCart({
                                  product,
                                  mode: 'box',
                                  boxes: 5,
                                  coverageM2: Number((5 * sqmPerBox).toFixed(2)),
                                  withWastage: false,
                                  openDrawer: false,
                                });
                              }
                            }}
                            className="px-3 py-1.5 border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white text-neutral-900 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="Add starter carton allocation to cart"
                          >
                            <ShoppingBag className="w-3 h-3 text-[#C2A26F]" />
                            <span>Quick Add</span>
                          </button>
                        </div>

                      </div>
                    </article>
                  );
                })}
              </div>

            ) : (

              /* ========================================================
                  DETAILED SPEC & CALCULATOR VIEW MODE
                 ======================================================== */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProductRefs.has(product.ref);
                  return (
                    <div key={product.ref} className="relative group/card">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBatchSelect(product);
                        }}
                        className={`absolute top-3 left-3 z-20 w-6 h-6 border flex items-center justify-center transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#C2A26F] border-[#C2A26F] text-neutral-950 font-bold'
                            : 'bg-white/90 border-neutral-300 text-transparent hover:border-neutral-950'
                        }`}
                        title="Select for batch action"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <ProductCard
                        product={product}
                        onSelect={onSelectProduct}
                      />
                    </div>
                  );
                })}
              </div>

            )}

          </main>

        </div>
      </div>


      {/* ========================================================
          MOBILE FILTER DRAWER (SLIDE-OVER BOTTOM SHEET)
          Allows granular specification filtering on mobile without
          cluttering the product page!
         ======================================================== */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-2xs"
            />

            {/* Slide-in Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-neutral-950" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-950 font-heading">
                    Filter & Refine
                  </h3>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#C2A26F] text-neutral-950 text-[10px] font-bold flex items-center justify-center font-mono">
                      {activeFilterCount}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-black cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Filter Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-2">
                {renderFilterAccordions()}
              </div>

              {/* Drawer Footer Actions (Sticky Bottom) */}
              <div className="p-4 border-t border-neutral-200 bg-white grid grid-cols-2 gap-3 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    resetAllFilters();
                  }}
                  className="py-3 border border-neutral-300 text-neutral-700 text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="py-3 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C2A26F] hover:text-neutral-950 transition-colors shadow-xs"
                >
                  Show {filteredProducts.length} Items
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
