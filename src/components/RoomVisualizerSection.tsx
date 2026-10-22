import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import { useCart } from '../context/CartContext';
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
  Sun,
  Moon,
  Layers,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';

interface RoomVisualizerSectionProps {
  products: Product[];
  onOpenCalculatorWithProduct: (product: Product) => void;
  onExploreCatalogue: () => void;
  onOpenSimulatorModal?: (tileRef?: string, roomId?: string) => void;
}

interface RoomScene {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  floorPolygon: string;
  perspectiveAngle: number;
  defaultTileRef: string;
  defaultWidth: number;
  defaultLength: number;
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'living',
    name: 'Open Living Pavilion',
    category: 'Living Room',
    description: 'Expansive open-concept living pavilion with natural sunset light and floor-to-ceiling glass doors.',
    image: '/products/room-living-pavilion.jpg',
    floorPolygon: 'polygon(0% 52%, 100% 56%, 100% 100%, 0% 100%)',
    perspectiveAngle: 62,
    defaultTileRef: 'PRD-102948-CG',
    defaultWidth: 6.0,
    defaultLength: 5.5,
  },
  {
    id: 'bathroom-spa',
    name: 'Master En-Suite Spa',
    category: 'Bathroom',
    description: 'Minimalist spa bathroom with freestanding soaking tub, floating timber vanity, and city view.',
    image: '/products/room-carol-marina.jpg',
    floorPolygon: 'polygon(0% 64%, 100% 68%, 100% 100%, 0% 100%)',
    perspectiveAngle: 58,
    defaultTileRef: 'PRD-636920-2982',
    defaultWidth: 4.2,
    defaultLength: 3.8,
  },
  {
    id: 'kitchen',
    name: 'Contemporary Chef Kitchen',
    category: 'Kitchen',
    description: 'Island counter dining and high-traffic culinary workspace demanding grease and heat resilience.',
    image: '/products/room-kitchen-chef.jpg',
    floorPolygon: 'polygon(0% 58%, 100% 59%, 100% 100%, 0% 100%)',
    perspectiveAngle: 60,
    defaultTileRef: 'PRD-304958-TZ',
    defaultWidth: 5.2,
    defaultLength: 4.5,
  },
  {
    id: 'bathroom-rose',
    name: 'Architectural Bath Suite',
    category: 'Bathroom',
    description: 'Serene master en-suite with warm acoustic insulation and matte vertical tiles.',
    image: '/products/room-carol-rose.jpg',
    floorPolygon: 'polygon(0% 66%, 100% 68%, 100% 100%, 0% 100%)',
    perspectiveAngle: 55,
    defaultTileRef: 'PRD-941824-3110',
    defaultWidth: 3.8,
    defaultLength: 3.2,
  },
  {
    id: 'outdoor',
    name: 'Villa Pool Terrace',
    category: 'Outdoor',
    description: '20mm monolithic vitrified stoneware engineered for intense sun, slip safety, and pool water.',
    image: '/products/room-outdoor-patio.jpg',
    floorPolygon: 'polygon(0% 54%, 100% 52%, 100% 100%, 0% 100%)',
    perspectiveAngle: 64,
    defaultTileRef: 'PRD-492019-GP',
    defaultWidth: 8.0,
    defaultLength: 6.0,
  },
];

export const RoomVisualizerSection: React.FC<RoomVisualizerSectionProps> = ({
  products,
  onOpenCalculatorWithProduct,
  onExploreCatalogue,
  onOpenSimulatorModal,
}) => {
  const { addTileToCart, openCart } = useCart();

  // Filter only tile products
  const tileProducts = products.filter(
    (p) => p.category === 'Tiles' || p.pricing_type === 'area'
  );

  const [selectedRoomId, setSelectedRoomId] = useState<string>('living');
  const [selectedTileRef, setSelectedTileRef] = useState<string>('PRD-102948-CG');
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');
  const [layingPattern, setLayingPattern] = useState<'grid' | 'running' | 'herringbone'>('grid');
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [splitPosition, setSplitPosition] = useState<number>(50);

  const currentRoom =
    ROOM_SCENES.find((r) => r.id === selectedRoomId) || ROOM_SCENES[0];
  const currentTile =
    tileProducts.find((t) => t.ref === selectedTileRef) || tileProducts[0];

  // Room dimension metrics
  const netSqm = Number((currentRoom.defaultWidth * currentRoom.defaultLength).toFixed(2));
  const grossSqm = Number((netSqm * 1.1).toFixed(2)); // +10% wastage
  const sqmPerBox = currentTile?.sqm_per_box || 1.44;
  const boxesNeeded = Math.ceil(grossSqm / sqmPerBox);
  const deliveredCoverage = Number((boxesNeeded * sqmPerBox).toFixed(2));
  const boxPrice =
    currentTile?.bulk_price_per_box ||
    (currentTile?.price_per_sqm || 3000) * sqmPerBox;
  const totalCost = boxesNeeded * boxPrice;

  const [addedAnimation, setAddedAnimation] = useState(false);
  const handleAddToCart = () => {
    if (!currentTile) return;
    addTileToCart({
      product: currentTile,
      mode: 'box',
      boxes: boxesNeeded,
      coverageM2: deliveredCoverage,
      rawCoverageNeeded: netSqm,
      withWastage: true,
      openDrawer: false,
    });
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      openCart();
    }, 600);
  };

  const handleLaunchCalculator = () => {
    if (currentTile) {
      onOpenCalculatorWithProduct(currentTile);
    }
  };

  return (
    <section id="hp_visualize" className="py-20 sm:py-28 bg-[#FAF9F7] border-b border-neutral-200/80 overflow-hidden scroll-mt-24">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Section Top Header matching Bikomax Interactive Studio banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-600 font-semibold mb-2">
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
        <div className="bg-white border border-neutral-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT 7-8 COLS: Visual Stage Preview */}
          <div className="lg:col-span-7 xl:col-span-8 relative min-h-[460px] sm:min-h-[560px] bg-neutral-950 overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none">
            
            {/* The Room Scene Container */}
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentRoom.id}
                  src={currentRoom.image}
                  alt={currentRoom.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Day / Night atmospheric lighting tint */}
              <div
                className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
                  lightingMode === 'night'
                    ? 'bg-gradient-to-t from-amber-950/30 via-indigo-950/30 to-black/55 mix-blend-multiply'
                    : 'bg-gradient-to-t from-transparent via-transparent to-black/20'
                }`}
              />

              {/* Realistic Perspective Tile Layer */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-500"
                style={{
                  clipPath:
                    isComparing
                      ? `polygon(0% 0%, ${splitPosition}% 0%, ${splitPosition}% 100%, 0% 100%)`
                      : currentRoom.floorPolygon,
                  opacity: 0.88,
                }}
              >
                <div
                  className="w-full h-full relative"
                  style={{
                    perspective: '600px',
                    perspectiveOrigin: '50% 20%',
                  }}
                >
                  <div
                    className="absolute -inset-x-20 -bottom-20 top-1/3 transition-all duration-500"
                    style={{
                      transform: `rotateX(${currentRoom.perspectiveAngle}deg) translateZ(0)`,
                      transformOrigin: 'bottom center',
                      backgroundImage: `url(${currentTile.image})`,
                      backgroundSize:
                        layingPattern === 'herringbone'
                          ? '160px 80px'
                          : currentTile.dimension.includes('120')
                          ? '260px 140px'
                          : '160px 160px',
                      backgroundRepeat: 'repeat',
                      transformStyle: 'preserve-3d',
                      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {/* Surface Sheen & Reflection Glare */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        currentTile.finish?.toLowerCase().includes('polished') ||
                        currentTile.finish?.toLowerCase().includes('crystal')
                          ? 'bg-gradient-to-t from-white/25 via-white/5 to-transparent'
                          : 'bg-gradient-to-t from-white/10 via-transparent to-transparent'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay" />
                  </div>
                </div>
              </div>

              {/* Before/After Split Line Indicator */}
              {isComparing && (
                <div
                  className="absolute inset-y-0 w-0.5 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] pointer-events-none z-20"
                  style={{ left: `${splitPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center text-[9px] shadow-lg border-2 border-white">
                    ↔
                  </div>
                </div>
              )}
            </div>

            {/* Top Stage Bar: Room Selector Tabs + Action Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 border border-white/20">
                {ROOM_SCENES.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => {
                      setSelectedRoomId(room.id);
                      setSelectedTileRef(room.defaultTileRef);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      selectedRoomId === room.id
                        ? 'bg-white text-neutral-950 font-bold shadow-md'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {room.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Quick Lighting & Fullscreen Action */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
                  className="px-2.5 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-neutral-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Toggle Day / Night Lighting"
                >
                  {lightingMode === 'day' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline text-[11px]">Daylight</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="hidden sm:inline text-[11px]">Night 3000K</span>
                    </>
                  )}
                </button>

                {onOpenSimulatorModal && (
                  <button
                    type="button"
                    onClick={() => onOpenSimulatorModal(selectedTileRef, selectedRoomId)}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open Fullscreen Studio</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Surface Specimen HUD & Split Tool */}
            <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 pointer-events-none mt-auto pt-24">
              <div className="bg-black/80 backdrop-blur-md border border-white/20 p-4 text-white max-w-md pointer-events-auto space-y-1 shadow-2xl">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-amber-400">
                  <span>ACTIVE APPLIED SURFACE</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-3 h-3" /> Monocaliber Rectified
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold font-heading">
                  {currentTile.name}
                </h4>

                <div className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                  <span>{currentTile.dimension}</span>
                  <span className="text-neutral-500">·</span>
                  <span>{currentTile.look} Look</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-amber-400 font-bold">{formatKES(currentTile.price_per_sqm || 0)}/m²</span>
                </div>
              </div>

              {/* Compare Split Tool */}
              <div className="bg-black/80 backdrop-blur-md border border-white/20 p-2 flex items-center gap-2 pointer-events-auto shadow-xl">
                <button
                  type="button"
                  onClick={() => setIsComparing(!isComparing)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    isComparing ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isComparing ? 'Split Active' : 'Compare Before/After'}</span>
                </button>
                {isComparing && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={splitPosition}
                    onChange={(e) => setSplitPosition(Number(e.target.value))}
                    className="w-24 accent-amber-500 cursor-pointer"
                  />
                )}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: Swatches, Pattern & Real Dual Price Calculator */}
          <div className="lg:col-span-5 xl:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white border-t lg:border-t-0 lg:border-l border-neutral-200">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-bold">
                  Select Architectural Tile
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {tileProducts.length} Premium Surfaces
                </span>
              </div>

              {/* Swatch Tiles Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {tileProducts.slice(0, 6).map((tile) => {
                  const isSelected = selectedTileRef === tile.ref;
                  return (
                    <button
                      key={tile.ref}
                      type="button"
                      onClick={() => setSelectedTileRef(tile.ref)}
                      className={`p-2.5 text-left border transition-all cursor-pointer relative group flex flex-col justify-between ${
                        isSelected
                          ? 'border-neutral-950 bg-[#FAF9F7] ring-1 ring-neutral-950'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <img
                          src={tile.image}
                          alt={tile.name}
                          className="w-9 h-9 object-cover shrink-0 border border-neutral-200"
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

                      <div className="pt-1.5 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-neutral-500">{tile.dimension.split(' ')[0]}</span>
                        <span className="font-bold text-neutral-900">
                          {formatKES(tile.price_per_sqm || 0)}
                          <span className="text-[9px] text-neutral-400 font-normal">/m²</span>
                        </span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Laying Pattern Selector */}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-bold">
                  Laying Pattern
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'grid', label: 'Straight Grid' },
                    { id: 'running', label: 'Brick 50%' },
                    { id: 'herringbone', label: 'Herringbone' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setLayingPattern(p.id as any)}
                      className={`py-1.5 px-2 text-center border text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        layingPattern === p.id
                          ? 'border-neutral-950 bg-neutral-950 text-white font-bold'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dual Pricing Box for the active tile */}
            <div className="p-5 bg-neutral-950 text-white space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  {currentRoom.name} Estimation ({netSqm} m²)
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {boxesNeeded} Boxes ({deliveredCoverage} m²)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                    Normal SQM Rate
                  </span>
                  <div className="text-xl font-bold font-heading text-white">
                    {formatKES(currentTile.price_per_sqm || 0)}
                    <span className="text-xs font-normal text-neutral-400 font-sans ml-1">/m²</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase block font-semibold">
                    Room Total ({boxesNeeded} Boxes)
                  </span>
                  <div className="text-xl font-bold font-heading text-amber-400">
                    {formatKES(totalCost)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-xs active:scale-98"
                >
                  {addedAnimation ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add Room ({boxesNeeded} Boxes) to Cart</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLaunchCalculator}
                    className="flex-1 py-2 border border-neutral-700 hover:border-amber-500 hover:text-amber-400 text-neutral-300 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-xs"
                  >
                    <Calculator className="w-3 h-3 text-amber-400" />
                    <span>Coverage Tool</span>
                  </button>

                  <button
                    type="button"
                    onClick={onExploreCatalogue}
                    className="flex-1 py-2 border border-neutral-700 hover:border-amber-500 hover:text-amber-400 text-neutral-300 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer rounded-xs"
                  >
                    <span>Catalogue</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
