import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import {
  ShieldCheck,
  Droplets,
  VolumeX,
  Layers,
  ArrowRight,
  Eye,
  Calculator,
  Sparkles,
  Check,
  Ruler,
  Boxes,
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
  // Find SPC products from catalog (or fallback defaults)
  const spcTiles = products.filter(
    (p) =>
      p.name.toUpperCase().includes('SPC') ||
      p.ref.toUpperCase().includes('SPC') ||
      (p.material && p.material.toUpperCase().includes('SPC'))
  );

  // Group into SPC Tiles and SPC Skirtings
  const flooringPlanks = spcTiles.filter((p) => !p.name.toUpperCase().includes('SKIRTING'));
  const skirtingProfiles = spcTiles.filter((p) => p.name.toUpperCase().includes('SKIRTING'));

  // Active specimen tab
  const [selectedSpcIndex, setSelectedSpcIndex] = useState(0);
  const activePlank = flooringPlanks[selectedSpcIndex] || flooringPlanks[0];

  const spcBenefits = [
    {
      icon: Droplets,
      title: '100% Waterproof',
      desc: 'Zero swelling or water damage. Ideal for kitchens, luxury master bathrooms, and basement suites.',
    },
    {
      icon: VolumeX,
      title: 'Built-in IXPE Acoustic Pad',
      desc: 'Pre-attached 1.5mm high-density sound dampening underlay eliminates hollow noise (21 dB impact reduction).',
    },
    {
      icon: Layers,
      title: '6.5mm Limestone Rigid Core',
      desc: 'Ultra-dense stone polymer composite core guarantees dimensional stability under intense solar heat and heavy foot traffic.',
    },
    {
      icon: ShieldCheck,
      title: 'Diamond Wear Shield (0.55mm)',
      desc: 'Commercial-grade micro-ceramic UV wear layer that resists stiletto heels, heavy furniture, and pet claws.',
    },
  ];

  return (
    <section id="spc-flooring" className="py-20 sm:py-28 bg-[#111215] text-white relative overflow-hidden border-b border-neutral-800">
      {/* Background Architectural Ambient Textures */}
      <div className="absolute inset-0 bg-radial-at-t from-neutral-800/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-[11px] font-mono uppercase tracking-widest text-[#C2A26F] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Surface Architecture</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light font-heading text-white tracking-tight leading-tight">
              SPC Rigid Core <br />
              <strong className="font-semibold text-[#C2A26F]">Luxury Vinyl Flooring</strong>
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
              Experience the natural, organic warmth of authentic timber aesthetics paired with the unbreakable durability and 100% water immunity of Stone Polymer Composite. Engineered with precision Uniclic glueless joints for flawless, rapid installation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onExploreCatalogue({ category: 'SPC Flooring' })}
              className="px-6 py-3.5 bg-white text-neutral-950 hover:bg-[#C2A26F] hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Explore All SPC Finishes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {spcBenefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xs bg-[#C2A26F]/15 border border-[#C2A26F]/30 flex items-center justify-center text-[#C2A26F] mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-heading mb-1.5">
                  {b.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Flooring Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] border border-white/10 p-6 sm:p-10">
          
          {/* Left: Interactive Specimen Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-16/10 overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
              <img
                src={
                  activePlank?.image ||
                  'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80'
                }
                alt={activePlank?.name || 'SPC Flooring Specimen'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#C2A26F] uppercase tracking-wider border border-white/15">
                  6.5 mm Premium Class
                </span>
                <span className="px-2.5 py-1 bg-emerald-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 uppercase tracking-wider border border-emerald-500/30">
                  In Stock · Eldoret Depot
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] block">
                    {activePlank?.ref || 'SPC ARCHITECTURAL TILE'}
                  </span>
                  <h4 className="text-base sm:text-xl font-bold font-heading">
                    {activePlank?.name || 'SPC Rigid Core Tile'}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Dual Rate (m² / Box)
                  </span>
                  <div className="text-lg sm:text-2xl font-bold font-mono text-white">
                    {formatKES(activePlank?.price_per_sqm || activePlank?.price || 3000)}
                    <span className="text-xs text-[#C2A26F] font-normal ml-1">/ m²</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300 block">
                    {formatKES(activePlank?.bulk_price_per_box || 6690)} / Box (2.23 m²)
                  </span>
                </div>
              </div>
            </div>

            {/* Specimen Switcher Thumbnails */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                Select Finish Variant:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {flooringPlanks.slice(0, 4).map((plank, idx) => {
                  const isSelected = selectedSpcIndex === idx;
                  return (
                    <button
                      key={plank.ref}
                      type="button"
                      onClick={() => setSelectedSpcIndex(idx)}
                      className={`p-2.5 bg-white/[0.04] border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C2A26F] ring-1 ring-[#C2A26F] bg-white/[0.08]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="aspect-16/9 overflow-hidden bg-neutral-800 mb-1.5">
                        <img
                          src={plank.image}
                          alt={plank.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-white block truncate">
                        {plank.name.replace('SPC Rigid Core Luxury Vinyl Tile', '').trim()}
                      </span>
                      <span className="text-[10px] font-mono text-[#C2A26F] block">
                        {formatKES(plank.price_per_sqm || plank.price || 3000)}/m²
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Architectural Technical Spec & Skirting Match */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A26F] font-semibold block mb-1">
                Engineered Performance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Technical Specifications
              </h3>
            </div>

            {/* Spec List */}
            <div className="divide-y divide-white/10 text-xs font-mono">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Total Planks Thickness:</span>
                <span className="text-white font-bold">6.5 mm (5.0mm Core + 1.5mm IXPE)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Wear Layer:</span>
                <span className="text-white font-bold">0.55 mm Heavy Commercial Grade</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Box Packaging:</span>
                <span className="text-white font-bold">2.23 m² per Box (Sealed Carton)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Joint Profile:</span>
                <span className="text-white font-bold">Uniclic Drop-Lock (Glueless)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Acoustic Rating:</span>
                <span className="text-emerald-400 font-bold">ΔLw 21 dB Impact Sound Reduction</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Warranty:</span>
                <span className="text-[#C2A26F] font-bold">10 Years Commercial / Lifetime Residential</span>
              </div>
            </div>

            {/* Skirting Match Callout */}
            <div className="p-4 bg-white/[0.04] border border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#C2A26F]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                  Color-Matched SPC Skirting Available
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Complete your installation with seamless 2.4-meter waterproof SPC baseboards (KES 1,250/pc) designed to hide expansion perimeter gaps with integrated wire conduits.
              </p>
              {skirtingProfiles.length > 0 && (
                <div className="text-[10px] font-mono text-[#C2A26F]">
                  Profiles: {skirtingProfiles.slice(0, 5).map(s => s.name.replace('SPC Architectural Waterproof Skirting Profile', '').trim()).join(' · ')}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {activePlank && (
                <button
                  type="button"
                  onClick={() => onSelectProduct(activePlank)}
                  className="flex-1 py-3 bg-[#C2A26F] hover:bg-[#d6b582] text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Specimen Details</span>
                </button>
              )}

              {activePlank && onOpenCalculatorWithProduct && (
                <button
                  type="button"
                  onClick={() => onOpenCalculatorWithProduct(activePlank)}
                  className="py-3 px-4 border border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white/5"
                >
                  <Calculator className="w-4 h-4 text-[#C2A26F]" />
                  <span>Calculate Boxes</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
