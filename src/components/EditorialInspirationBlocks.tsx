import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Maximize2 } from 'lucide-react';

interface EditorialInspirationBlocksProps {
  onNavigateToCategory: (techFilter: string) => void;
}

export const EditorialInspirationBlocks: React.FC<EditorialInspirationBlocksProps> = ({
  onNavigateToCategory,
}) => {
  return (
    <section className="bg-white border-b border-neutral-200/80">
      {/* Header Eyebrow */}
      <div className="py-12 border-b border-neutral-100 text-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
          Architectural Guide
        </span>
        <h2 className="text-2xl sm:text-4xl font-light font-heading text-neutral-950 uppercase tracking-widest">
          Find Your Inspiration
        </h2>
      </div>

      {/* Block 1: Porcelain Tiles (Image Left, Text Right) */}
      <div className="border-b border-neutral-200/80">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Image */}
          <div className="lg:col-span-7 relative overflow-hidden bg-neutral-950 min-h-[340px] lg:min-h-full group">
            <img
              src="/products/tile-calacatta-gold.jpg"
              alt="Porcelain Tiles Outstanding Surface Effects"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 px-2.5 py-1 backdrop-blur-xs border border-white/20">
                Calacatta Gold Crystalline
              </span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 p-8 sm:p-14 lg:p-16 flex flex-col justify-center bg-white border-l border-neutral-200/80 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-amber-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technology 01 · Monocaliber</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-light font-heading text-neutral-950 leading-tight">
              <strong>Porcelain tiles.</strong>
              <br />
              Outstanding surface effects.
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              A refined living room, a brilliant character for your private residence or commercial lobby. Engineered with ultra-dense vitrified bodies and water absorption below 0.05% for lifelong brilliance.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateToCategory('Porcelain')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 transition-colors border-b-2 border-neutral-950 hover:border-amber-600 pb-1 cursor-pointer group"
              >
                <span>Find your inspiration</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Block 2: Ceramic Tiles (Text Left, Image Right - Reversed) */}
      <div className="border-b border-neutral-200/80 bg-[#FAF9F7]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Editorial Content */}
          <div className="lg:col-span-5 p-8 sm:p-14 lg:p-16 flex flex-col justify-center border-r border-neutral-200/80 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-amber-600 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Technology 02 · Wall & Floor</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-light font-heading text-neutral-950 leading-tight">
              <strong>Ceramic tiles.</strong>
              <br />
              Best solution for floors and walls.
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              Ceramic tiles are the timeless solution to maintain bathrooms, kitchens, and vertical elevations brilliant, hygienic, and forever looking brand new. Lightweight, easy to cut, and completely impervious to kitchen grease.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateToCategory('Ceramic')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 transition-colors border-b-2 border-neutral-950 hover:border-amber-600 pb-1 cursor-pointer group"
              >
                <span>Explore Ceramic Wall & Floor</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 relative overflow-hidden bg-neutral-950 min-h-[340px] lg:min-h-full order-1 lg:order-2 group">
            <img
              src="/products/tile-terrazzo.jpg"
              alt="Ceramic Tiles For Floors And Walls"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 px-2.5 py-1 backdrop-blur-xs border border-white/20">
                Terrazzo Veneziano Glazed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Block 3: XXL Porcelain Tile (Image Left, Text Right) */}
      <div className="border-b border-neutral-200/80">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Image */}
          <div className="lg:col-span-7 relative overflow-hidden bg-neutral-950 min-h-[340px] lg:min-h-full group">
            <img
              src="/products/tile-nero-marquina.jpg"
              alt="XXL Large Format Porcelain Slabs"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 px-2.5 py-1 backdrop-blur-xs border border-white/20">
                120×240 cm Master Sintered Slab
              </span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 p-8 sm:p-14 lg:p-16 flex flex-col justify-center bg-white border-l border-neutral-200/80 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-amber-600 font-semibold">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Technology 03 · Grand Formats</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-light font-heading text-neutral-950 leading-tight">
              <strong>XXL Porcelain Tile.</strong>
              <br />
              The big size for extreme enlarging effect.
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              XXL Slabs (60×120, 120×120, and 120×240 cm) create an effect of boundless continuity that visually expands room boundaries in high-end residential and commercial architecture. Your rooms look wider, cleaner, and dramatically grander.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateToCategory('XXL')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 transition-colors border-b-2 border-neutral-950 hover:border-amber-600 pb-1 cursor-pointer group"
              >
                <span>Discover XXL Sizes</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Block 4: 2 CM Outdoor Collections (Text Left, Image Right - Reversed) */}
      <div className="border-b border-neutral-200/80 bg-[#FAF9F7]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Editorial Content */}
          <div className="lg:col-span-5 p-8 sm:p-14 lg:p-16 flex flex-col justify-center border-r border-neutral-200/80 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-amber-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Technology 04 · Exterior Hardscaping</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-light font-heading text-neutral-950 leading-tight">
              <strong>2 CM Outdoor Pavers.</strong>
              <br />
              Enduring strength for terraces & pools.
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              20mm monolithic vitrified stoneware engineered to withstand vehicular loads, intense tropical sunlight, and pool chemicals. R11 anti-slip surface for safe barefoot walking even when wet.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateToCategory('2cm')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 transition-colors border-b-2 border-neutral-950 hover:border-amber-600 pb-1 cursor-pointer group"
              >
                <span>Discover 2 CM Outdoor Pavers</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 relative overflow-hidden bg-neutral-950 min-h-[340px] lg:min-h-full order-1 lg:order-2 group">
            <img
              src="/products/tile-paver-grigio.jpg"
              alt="2 CM Outdoor Stoneware Collections"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 px-2.5 py-1 backdrop-blur-xs border border-white/20">
                Grigio Milano 20mm Anti-Slip R11
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
