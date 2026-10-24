import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import {
  Droplets,
  VolumeX,
  Layers,
  ArrowRight,
  Eye,
  Calculator,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface SpcFlooringSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreCatalogue: (filter?: any) => void;
  onOpenCalculatorWithProduct?: (product: Product) => void;
}

export const SpcFlooringSection: React.FC<SpcFlooringSectionProps> = ({
  products,
  onSelectProduct,
  onExploreCatalogue,
  onOpenCalculatorWithProduct,
}) => {
  // Fallback curated finishes if catalog is still loading
  const fallbackPlanks: Product[] = [
    {
      id: 'spc-j5011',
      ref: 'SPC-J5011',
      name: 'SPC Rigid Core Vinyl Tile J5011',
      category: 'SPC Flooring',
      dimension: '18x122 cm',
      pricing_type: 'area',
      price_per_sqm: 3000,
      bulk_price_per_box: 6690,
      sqm_per_box: 2.23,
      bulk_unit: 'Box',
      stock: 120,
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
      description: '6.5mm Rigid Core SPC Luxury Vinyl with pre-attached IXPE acoustic pad.',
      finish: 'Natural Honey Oak',
      material: 'Limestone Composite SPC',
    },
    {
      id: 'spc-j5015',
      ref: 'SPC-J5015',
      name: 'SPC Rigid Core Vinyl Tile J5015',
      category: 'SPC Flooring',
      dimension: '18x122 cm',
      pricing_type: 'area',
      price_per_sqm: 3000,
      bulk_price_per_box: 6690,
      sqm_per_box: 2.23,
      bulk_unit: 'Box',
      stock: 95,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      description: '6.5mm Rigid Core SPC Luxury Vinyl in Scandinavian blonde oak.',
      finish: 'Nordic Blonde Oak',
      material: 'Limestone Composite SPC',
    },
    {
      id: 'spc-j5012',
      ref: 'SPC-J5012',
      name: 'SPC Rigid Core Vinyl Tile J5012',
      category: 'SPC Flooring',
      dimension: '18x122 cm',
      pricing_type: 'area',
      price_per_sqm: 3000,
      bulk_price_per_box: 6690,
      sqm_per_box: 2.23,
      bulk_unit: 'Box',
      stock: 80,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: '6.5mm Rigid Core SPC Luxury Vinyl in deep smoked walnut.',
      finish: 'Smoked Walnut',
      material: 'Limestone Composite SPC',
    },
  ];

  // Retrieve actual SPC flooring planks from catalog
  const spcItems = products.filter(
    (p) =>
      p.category === 'SPC Flooring' ||
      p.name.toUpperCase().includes('SPC') ||
      p.ref.toUpperCase().includes('SPC')
  );
  const flooringPlanks = spcItems.filter((p) => !p.name.toUpperCase().includes('SKIRTING'));
  const availablePlanks = flooringPlanks.length > 0 ? flooringPlanks : fallbackPlanks;

  const [selectedSpcIndex, setSelectedSpcIndex] = useState(0);
  const activePlank = availablePlanks[selectedSpcIndex] || availablePlanks[0];

  const getFinishLabel = (plank: Product, idx: number) => {
    const match = plank.name.match(/J\d{4}/i);
    if (match) {
      const code = match[0].toUpperCase();
      const map: Record<string, string> = {
        'J5011': 'J5011 Natural Oak',
        'J5015': 'J5015 Nordic Blonde',
        'J5012': 'J5012 Smoked Walnut',
      };
      return map[code] || code;
    }
    return plank.finish || `Finish 0${idx + 1}`;
  };

  return (
    <section id="spc-flooring" className="py-7 sm:py-9 bg-[#EBE4D8] border-y border-[#D6CDBC]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Compact, Unified Architectural Banner */}
        <div className="bg-[#FAF7F2] rounded-md border border-[#D9D0C1] p-5 sm:p-7 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Visual Room Specimen & Quick Swatches */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-16/10 rounded-xs overflow-hidden bg-[#E2DACB] border border-[#D6CDBC] shadow-xs group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePlank.image}
                    src={activePlank.image}
                    alt={activePlank.name}
                    initial={{ opacity: 0.5, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </AnimatePresence>

                {/* Floating pill badges on photo */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#1C1917]/85 backdrop-blur-xs text-[10px] font-medium text-[#F5EFE6] uppercase tracking-wider rounded-2xs">
                    6.5mm Rigid Core
                  </span>
                  <span className="px-2.5 py-1 bg-[#C27803] text-[10px] font-semibold text-white uppercase tracking-wider rounded-2xs shadow-xs">
                    {getFinishLabel(activePlank, selectedSpcIndex)}
                  </span>
                </div>
              </div>

              {/* Quick Finish Swatch Switcher */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider shrink-0">
                  Finishes:
                </span>
                <div className="flex items-center gap-2">
                  {availablePlanks.slice(0, 4).map((plank, idx) => {
                    const isSelected = selectedSpcIndex === idx;
                    const displayName = getFinishLabel(plank, idx);
                    return (
                      <button
                        key={plank.ref || idx}
                        type="button"
                        onClick={() => setSelectedSpcIndex(idx)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-2xs text-xs transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                            : 'bg-white text-[#44403C] border-[#D6CDBC] hover:border-[#A8A29E]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#C27803] shrink-0" />
                        <span className="font-medium whitespace-nowrap">{displayName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Highlights & Direct Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 lg:pl-2">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B45309] font-semibold mb-1">
                  <Sparkles className="w-3 h-3 text-[#D97706]" />
                  <span>Next-Gen Rigid Core Vinyl</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light font-heading text-[#1C1917] tracking-tight">
                  <strong>SPC Waterproof</strong> Wood Flooring
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1.5 leading-relaxed">
                  Authentic timber grain warmth fused with an impenetrable limestone composite core. 100% waterproof for kitchens, living rooms, and commercial spaces with pre-attached acoustic underlay.
                </p>
              </div>

              {/* 3 Compact Architectural Feature Pills */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="p-2 bg-white rounded-xs border border-[#E7DFD1] text-center">
                  <Droplets className="w-4 h-4 mx-auto text-[#B45309] mb-1" />
                  <span className="text-[11px] font-bold text-[#1C1917] block leading-tight">100% Waterproof</span>
                  <span className="text-[10px] text-[#78716C] block leading-tight">Zero Swelling</span>
                </div>
                <div className="p-2 bg-white rounded-xs border border-[#E7DFD1] text-center">
                  <VolumeX className="w-4 h-4 mx-auto text-[#B45309] mb-1" />
                  <span className="text-[11px] font-bold text-[#1C1917] block leading-tight">21 dB Acoustic</span>
                  <span className="text-[10px] text-[#78716C] block leading-tight">Built-in IXPE</span>
                </div>
                <div className="p-2 bg-white rounded-xs border border-[#E7DFD1] text-center">
                  <Layers className="w-4 h-4 mx-auto text-[#B45309] mb-1" />
                  <span className="text-[11px] font-bold text-[#1C1917] block leading-tight">Drop-Lock</span>
                  <span className="text-[10px] text-[#78716C] block leading-tight">Glueless Uniclic</span>
                </div>
              </div>

              {/* Dual Rate Pricing Strip */}
              <div className="flex items-center justify-between p-2.5 bg-white/70 rounded-xs border border-[#E0D7C7]">
                <div>
                  <span className="text-[10px] uppercase text-[#78716C] font-semibold block">Square Meter Rate</span>
                  <span className="text-lg font-bold text-[#1C1917]">
                    {formatKES(activePlank.price_per_sqm || activePlank.price || 3000)}
                    <span className="text-xs font-normal text-[#78716C]"> / m²</span>
                  </span>
                </div>
                {activePlank.bulk_price_per_box && (
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#B45309] font-semibold block">Carton Coverage</span>
                    <span className="text-xs font-semibold text-[#1C1917]">
                      {formatKES(activePlank.bulk_price_per_box)}
                      <span className="text-[10px] font-normal text-[#78716C]"> / Box ({activePlank.sqm_per_box || 2.23} m²)</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectProduct(activePlank)}
                  className="px-4 py-2.5 bg-[#1C1917] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Specimen</span>
                </button>

                {onOpenCalculatorWithProduct && (
                  <button
                    type="button"
                    onClick={() => onOpenCalculatorWithProduct(activePlank)}
                    className="px-4 py-2.5 bg-white hover:bg-[#F5EFE6] text-[#1C1917] border border-[#D6CDBC] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Calculate Area</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onExploreCatalogue({ category: 'SPC Flooring' })}
                  className="ml-auto text-xs font-semibold text-[#B45309] hover:text-[#92400E] flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                >
                  <span>Explore All Finishes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
