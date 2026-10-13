import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import {
  Sparkles,
  Eye,
  Calculator,
  ArrowRight,
  Ruler,
  Boxes,
  Check,
  Maximize2,
  SlidersHorizontal,
} from 'lucide-react';

interface RoomVisualizerSectionProps {
  products: Product[];
  onOpenCalculatorWithProduct: (product: Product) => void;
  onExploreCatalogue: () => void;
}

interface RoomScene {
  id: string;
  name: string;
  description: string;
  image: string;
  defaultTileRef: string;
}

interface TileOption {
  ref: string;
  name: string;
  format: string;
  look: string;
  finish: string;
  pricePerSqm: number;
  pricePerBox: number;
  sqmPerBox: number;
  thumbnail: string;
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'living',
    name: 'Open Living Pavilion',
    description: 'Expansive open-concept living room with double-height natural sunlight and floor-to-ceiling glass doors.',
    image: '/products/tile-calacatta-gold.jpg',
    defaultTileRef: 'PRD-102948-CG',
  },
  {
    id: 'bathroom',
    name: 'Master En-Suite Spa',
    description: 'Minimalist bathroom with concealed walk-in rainfall shower, freestanding tub, and floating vanity.',
    image: '/products/tile-statuario.jpg',
    defaultTileRef: 'PRD-941824-3110',
  },
  {
    id: 'kitchen',
    name: 'Contemporary Chef Kitchen',
    description: 'Island counter dining and high-traffic culinary workspace demanding heat and grease resistance.',
    image: '/products/tile-terrazzo.jpg',
    defaultTileRef: 'PRD-304958-TZ',
  },
  {
    id: 'bedroom',
    name: 'Private Master Suite',
    description: 'Warm, tranquil bedroom requiring organic tactile floor textures with acoustic and thermal insulation.',
    image: '/products/tile-wood-rover.jpg',
    defaultTileRef: 'PRD-203948-PW',
  },
];

const TILE_OPTIONS: TileOption[] = [
  {
    ref: 'PRD-102948-CG',
    name: 'Calacatta Gold Crystal',
    format: '60×120 cm Slab',
    look: 'Marble Look',
    finish: '98% Mirror Polished',
    pricePerSqm: 3480,
    pricePerBox: 5011.2,
    sqmPerBox: 1.44,
    thumbnail: '/products/tile-calacatta-gold.jpg',
  },
  {
    ref: 'PRD-203948-PW',
    name: 'Planet Rover Parquet',
    format: '20×120 cm Planks',
    look: 'Wood Look',
    finish: 'Tactile Oak Matte',
    pricePerSqm: 2950,
    pricePerBox: 3540.0,
    sqmPerBox: 1.2,
    thumbnail: '/products/tile-wood-rover.jpg',
  },
  {
    ref: 'PRD-510294-1188',
    name: 'Nero Marquina Velvet',
    format: '120×240 cm Master Slab',
    look: 'Marble Look',
    finish: 'Velvet Satin Touch',
    pricePerSqm: 4890,
    pricePerBox: 14083.2,
    sqmPerBox: 2.88,
    thumbnail: '/products/tile-nero-marquina.jpg',
  },
  {
    ref: 'PRD-304958-TZ',
    name: 'Terrazzo Veneziano',
    format: '60×60 cm Tile',
    look: 'Pattern Look',
    finish: 'Honed Aggregate Matte',
    pricePerSqm: 2680,
    pricePerBox: 3859.2,
    sqmPerBox: 1.44,
    thumbnail: '/products/tile-terrazzo.jpg',
  },
];

export const RoomVisualizerSection: React.FC<RoomVisualizerSectionProps> = ({
  products,
  onOpenCalculatorWithProduct,
  onExploreCatalogue,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('living');
  const [selectedTileRef, setSelectedTileRef] = useState<string>('PRD-102948-CG');

  const currentRoom = ROOM_SCENES.find((r) => r.id === selectedRoomId) || ROOM_SCENES[0];
  const currentTile = TILE_OPTIONS.find((t) => t.ref === selectedTileRef) || TILE_OPTIONS[0];

  const matchedProduct = products.find((p) => p.ref === currentTile.ref);

  const handleLaunchCalculator = () => {
    if (matchedProduct) {
      onOpenCalculatorWithProduct(matchedProduct);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F7] border-b border-neutral-200/80 overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Section Top Header matching Cleopatra Roomvo banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C2A26F] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Space Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 tracking-tight leading-tight">
            <strong>Visualize our products</strong>
            <br />
            directly in your room!
          </h2>
          <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
            Choose in a single tap the surface you desire to design floors and walls. Preview continuous slab joints, surface gloss, and calculate real box requirements instantly.
          </p>
        </div>

        {/* Visualizer Interactive Shell */}
        <div className="bg-white border border-neutral-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT 7 COLS: Visual Stage Preview */}
          <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[520px] bg-neutral-950 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            {/* Background Realistic Surface Texture */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`${selectedRoomId}-${selectedTileRef}`}
                src={currentTile.thumbnail}
                alt={`${currentTile.name} in ${currentRoom.name}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Architectural room atmosphere overlay with realistic floor reflection */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />

            {/* Top Stage Bar: Room Selector Pills */}
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              {ROOM_SCENES.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    setSelectedTileRef(room.defaultTileRef);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md ${
                    selectedRoomId === room.id
                      ? 'bg-white text-neutral-950 font-bold border border-white shadow-md'
                      : 'bg-black/40 text-neutral-200 border border-white/20 hover:bg-black/60'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* Bottom Surface Specimen HUD */}
            <div className="relative z-10 bg-black/75 backdrop-blur-md border border-white/20 p-4 sm:p-6 text-white max-w-lg space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#C2A26F]">
                <span>APPLIED SURFACE SIMULATION</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3 h-3" /> Monocaliber Rectified
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold font-heading">
                {currentTile.name}
              </h4>

              <p className="text-xs text-neutral-300 font-normal">
                {currentRoom.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-white/10 font-mono">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Specification</span>
                  <span className="font-bold text-white">{currentTile.format}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Finish Profile</span>
                  <span className="font-bold text-[#C2A26F]">{currentTile.finish}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Tile Swatch Selector & Dual Price Calculator */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white border-t lg:border-t-0 lg:border-l border-neutral-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C2A26F] font-bold">
                  Select Architectural Tile
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  4 Finishes Available
                </span>
              </div>

              {/* Swatch Tiles Grid */}
              <div className="grid grid-cols-2 gap-3">
                {TILE_OPTIONS.map((tile) => {
                  const isSelected = selectedTileRef === tile.ref;
                  return (
                    <button
                      key={tile.ref}
                      type="button"
                      onClick={() => setSelectedTileRef(tile.ref)}
                      className={`p-3 text-left border transition-all cursor-pointer relative group flex flex-col justify-between ${
                        isSelected
                          ? 'border-neutral-950 bg-[#FAF9F7] ring-1 ring-neutral-950'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 mb-2">
                        <img
                          src={tile.thumbnail}
                          alt={tile.name}
                          className="w-10 h-10 object-cover shrink-0 border border-neutral-200"
                        />
                        <div className="min-w-0">
                          <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-400 block truncate">
                            {tile.look}
                          </span>
                          <span className="text-xs font-bold font-heading text-neutral-950 block truncate">
                            {tile.name}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-neutral-500">{tile.format.split(' ')[0]}</span>
                        <span className="font-bold text-neutral-900">
                          {formatKES(tile.pricePerSqm)}
                          <span className="text-[9px] text-neutral-400 font-normal">/m²</span>
                        </span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-[#C2A26F] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dual Pricing Box for the active tile */}
            <div className="p-5 bg-neutral-950 text-white space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-[10px] font-mono uppercase text-[#C2A26F] font-bold">
                  Active Surface Dual Rate
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  Box Size: {currentTile.sqmPerBox} m²
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                    Per Square Meter (m²)
                  </span>
                  <div className="text-2xl font-bold font-heading text-white">
                    {formatKES(currentTile.pricePerSqm)}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#C2A26F] uppercase block font-semibold">
                    Per Factory Box
                  </span>
                  <div className="text-2xl font-bold font-heading text-[#C2A26F]">
                    {formatKES(currentTile.pricePerBox)}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 font-mono leading-relaxed pt-1">
                Precision rectified edge profile. Allows tight 1.5mm architectural grout joints.
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleLaunchCalculator}
                  className="w-full py-3 bg-[#C2A26F] hover:bg-[#b0905e] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculate Room Coverage</span>
                </button>

                <button
                  type="button"
                  onClick={onExploreCatalogue}
                  className="w-full py-2.5 border border-neutral-700 hover:border-white text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Full Tile Series</span>
                  <ArrowRight className="w-3 h-3 text-[#C2A26F]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
