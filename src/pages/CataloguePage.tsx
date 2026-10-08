import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { Search, Calculator, Check, ShoppingBag, X, SlidersHorizontal } from 'lucide-react';

interface CataloguePageProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenCalculatorWithProduct: (product: Product) => void;
  onOpenCalculator: () => void;
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
}) => {
  const { addBatchToCart } = useCart();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeDimension, setActiveDimension] = useState<string>('All');

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
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        if (activeDimension !== 'All' && product.dimension !== activeDimension) {
          return false;
        }
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchDim = product.dimension.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchDim && !matchCat) {
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
  }, [products, searchQuery, selectedCategory, activeDimension, sortBy]);

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

  return (
    <div className="bg-[#FAFAFA] text-neutral-950 font-sans pb-28">
      {/* Editorial Catalogue Header with Architectural Grid Pattern */}
      <section className="bg-white bg-arch-grid border-b border-neutral-200/60 py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <AnimatedReveal className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#C2A26F] font-semibold block">
                The Master Collection
              </span>
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight font-heading text-neutral-950">
                Architectural Catalogue
              </h1>
              <p className="text-sm text-neutral-500 max-w-xl leading-relaxed">
                Precision porcelain tiles, concealed piano showers, and refined switches. Direct staging from Unit G48, Rupa&apos;s Godowns, Eldoret.
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.15}>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-5 py-3 border border-neutral-300 hover:border-neutral-950 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#C2A26F]" />
                <span>Room Coverage Calculator</span>
              </button>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* Filter and Content Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AnimatedReveal delay={0.1}>
          <div className="bg-white border border-neutral-200/80 p-4 sm:p-5 shadow-2xs mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs">
                {['All', 'Tiles', 'Sanitaryware', 'Electrical'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat);
                      setActiveDimension('All');
                    }}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-neutral-950 text-white font-bold shadow-2xs'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                    }`}
                  >
                    {cat === 'All' ? 'All Pieces' : cat}
                  </button>
                ))}
              </div>

              {/* Sub-filters, Sorter & Batch Select Control */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {selectedCategory === 'Tiles' && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400">Dimension:</span>
                    <select
                      value={activeDimension}
                      onChange={(e) => setActiveDimension(e.target.value)}
                      className="px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden"
                    >
                      {availableDimensions.map((dim) => (
                        <option key={dim} value={dim}>
                          {dim}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden"
                  >
                    <option value="featured">Curated Specification</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>

                {/* Quick Select All Toggle */}
                <button
                  type="button"
                  onClick={handleSelectAllVisible}
                  className="px-3 py-1.5 border border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 transition-colors cursor-pointer"
                >
                  {selectedProductRefs.size === filteredProducts.length && filteredProducts.length > 0
                    ? 'Deselect All'
                    : 'Select Multiple to Add'}
                </button>
              </div>
            </div>

            {/* Quiet notice */}
            <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between text-xs text-neutral-400">
              <div>
                Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> architectural items
              </div>
              <div className="text-[11px] font-mono">
                DUAL PRICING ACTIVE · 1.5mm RECTIFIED SPECIFICATION
              </div>
            </div>
          </div>
        </AnimatedReveal>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-12 text-center space-y-4">
            <Search className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="text-base font-bold text-neutral-950">
              No architectural products found
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Try searching with alternative keywords or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onCategoryChange('All');
                setActiveDimension('All');
              }}
              className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.ref}
                product={product}
                onSelect={onSelectProduct}
                isSelectedForBatch={selectedProductRefs.has(product.ref)}
                onToggleBatchSelect={toggleBatchSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* FLOATING MULTI-ITEM BATCH ADD BAR with smooth enter/exit animation */}
      <AnimatePresence>
        {selectedProductRefs.size > 0 && (
          <motion.aside
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Selected Items Actions"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-950 text-white px-5 py-3.5 shadow-2xl border border-neutral-800 flex items-center gap-4 max-w-lg w-[90%] sm:w-auto"
          >
            <div className="text-xs">
              <span className="font-bold text-[#C2A26F]">{selectedProductRefs.size}</span>{' '}
              <span>{selectedProductRefs.size === 1 ? 'item selected' : 'items selected'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddSelectedBatchToCart}
                className="px-4 py-2 bg-[#C2A26F] hover:bg-[#b0905e] text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {batchAddedNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" /> Add Selected to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedProductRefs(new Set())}
                className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                title="Clear selection"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
