import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, SlidersHorizontal, Check, ArrowRight } from 'lucide-react';

interface AdvancedTileFinderProps {
  products: Product[];
  onApplyAdvancedFilter: (filters: {
    technology?: string;
    destination?: string;
    look?: string;
    size?: string;
  }) => void;
}

export const AdvancedTileFinder: React.FC<AdvancedTileFinderProps> = ({
  products,
  onApplyAdvancedFilter,
}) => {
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [selectedDest, setSelectedDest] = useState<string>('All');
  const [selectedLook, setSelectedLook] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');

  const tileProducts = useMemo(() => {
    return products.filter((p) => p.category === 'Tiles');
  }, [products]);

  // Count matching tiles in real-time
  const matchedCount = useMemo(() => {
    return tileProducts.filter((p) => {
      if (selectedTech !== 'All' && p.technology !== selectedTech) return false;
      if (selectedDest !== 'All' && !p.destinations?.includes(selectedDest as any)) return false;
      if (selectedLook !== 'All' && p.look !== selectedLook) return false;
      if (selectedSize !== 'All' && p.dimension !== selectedSize) return false;
      return true;
    }).length;
  }, [tileProducts, selectedTech, selectedDest, selectedLook, selectedSize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyAdvancedFilter({
      technology: selectedTech !== 'All' ? selectedTech : undefined,
      destination: selectedDest !== 'All' ? selectedDest : undefined,
      look: selectedLook !== 'All' ? selectedLook : undefined,
      size: selectedSize !== 'All' ? selectedSize : undefined,
    });
  };

  return (
    <section className="py-16 sm:py-20 bg-[#121212] text-white border-b border-neutral-800 relative">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        <div className="mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
            Precision Specification Tool
          </span>
          <h2 className="text-2xl sm:text-4xl font-light font-heading text-white">
            <strong>Advanced</strong> Architectural Search
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Filter our entire architectural tile catalog by engineered substrate, room destination, aesthetic look, or slab dimension.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* 1. Technology */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                1. Technology
              </label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white text-xs px-3.5 py-3 focus:outline-hidden focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Substrates</option>
                <option value="Porcelain">Porcelain Stoneware</option>
                <option value="Ceramic">Glazed Ceramic</option>
                <option value="XXL">XXL Grand Slabs</option>
                <option value="2cm">2 CM Outdoor Pavers</option>
              </select>
            </div>

            {/* 2. Destination */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                2. Destination of Use
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white text-xs px-3.5 py-3 focus:outline-hidden focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Destinations</option>
                <option value="Living">Living Room</option>
                <option value="Bathroom">Bathroom & En-Suite</option>
                <option value="Kitchen">Kitchen & Dining</option>
                <option value="Bedroom">Bedroom & Lounge</option>
                <option value="Outdoor">Outdoor & Pool</option>
                <option value="Commercial">Commercial & Lobbies</option>
              </select>
            </div>

            {/* 3. Look */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                3. Look / Texture
              </label>
              <select
                value={selectedLook}
                onChange={(e) => setSelectedLook(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white text-xs px-3.5 py-3 focus:outline-hidden focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Surface Looks</option>
                <option value="Marble">Marble Look</option>
                <option value="Wood">Wood / Parquet Look</option>
                <option value="Stone">Natural Stone Look</option>
                <option value="Concrete">Concrete / Cement Look</option>
                <option value="Pattern">Pattern & Terrazzo Look</option>
                <option value="Sugar Effect">Crystal / Sugar Effect</option>
              </select>
            </div>

            {/* 4. Size */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                4. Dimension (cm)
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white text-xs px-3.5 py-3 focus:outline-hidden focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Formats</option>
                <option value="60x60 cm">60×60 cm Standard</option>
                <option value="60x120 cm">60×120 cm Large Format</option>
                <option value="80x80 cm">80×80 cm Square Slab</option>
                <option value="120x240 cm">120×240 cm Master Slab</option>
                <option value="20x120 cm">20×120 cm Parquet Plank</option>
                <option value="60x60x2 cm">60×60×2 cm 20mm Paver</option>
              </select>
            </div>

          </div>

          {/* Bottom Bar: Matched Count + Submit */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>{matchedCount} Architectural Products Match Active Criteria</span>
            </div>

            <div className="flex items-center gap-3">
              {(selectedTech !== 'All' || selectedDest !== 'All' || selectedLook !== 'All' || selectedSize !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTech('All');
                    setSelectedDest('All');
                    setSelectedLook('All');
                    setSelectedSize('All');
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Reset Filters
                </button>
              )}

              <button
                type="submit"
                className="px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-amber-500/20"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>

      </div>
    </section>
  );
};
