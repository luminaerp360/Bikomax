import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  X,
  Calculator,
  ShoppingBag,
  Sun,
  Moon,
  Layers,
  Ruler,
  Boxes,
  Check,
  RotateCw,
  Maximize2,
  Minimize2,
  Sliders,
  ChevronRight,
  Eye,
  MessageCircle,
  Share2,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export interface RoomSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialTileRef?: string;
  initialRoomId?: string;
  onOpenCalculatorWithProduct?: (product: Product) => void;
}

export interface SimRoomScene {
  id: string;
  name: string;
  category: 'Living' | 'Bathroom' | 'Kitchen' | 'Outdoor' | 'Commercial';
  image: string;
  description: string;
  floorPolygon: string;
  perspectiveAngle: number;
  defaultTileRef: string;
  defaultWidth: number;
  defaultLength: number;
}

const ROOM_SCENES: SimRoomScene[] = [
  {
    id: 'living',
    name: 'Open Living Pavilion',
    category: 'Living',
    image: '/products/room-living-pavilion.jpg',
    description: 'Expansive double-height living room with natural sea-view sunlight and floor-to-ceiling glass.',
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
    image: '/products/room-carol-marina.jpg',
    description: 'Minimalist master bathroom with freestanding soaking tub, floating vanity, and panoramic glass.',
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
    image: '/products/room-kitchen-chef.jpg',
    description: 'High-traffic culinary space with central island bar and dining transition requiring grease resilience.',
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
    image: '/products/room-carol-rose.jpg',
    description: 'Warm natural light en-suite with timber vanity, acoustic sound dampening, and fluted wall tiles.',
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
    image: '/products/room-outdoor-patio.jpg',
    description: 'Monolithic outdoor pool deck engineered for heavy tropical sun, barefoot wet safety, and pool water.',
    floorPolygon: 'polygon(0% 54%, 100% 52%, 100% 100%, 0% 100%)',
    perspectiveAngle: 64,
    defaultTileRef: 'PRD-492019-GP',
    defaultWidth: 8.0,
    defaultLength: 6.0,
  },
];

type LayingPattern = 'grid' | 'running' | 'herringbone' | 'diamond';
type GroutColor = 'matched' | 'white' | 'sand' | 'charcoal';

export const RoomSimulatorModal: React.FC<RoomSimulatorModalProps> = ({
  isOpen,
  onClose,
  products,
  initialTileRef,
  initialRoomId,
  onOpenCalculatorWithProduct,
}) => {
  const { addTileToCart, openCart } = useCart();

  const tileProducts = products.filter(
    (p) => p.category === 'Tiles' || p.pricing_type === 'area'
  );

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoomId || 'living'
  );

  const [selectedTileRef, setSelectedTileRef] = useState<string>(
    initialTileRef || tileProducts[0]?.ref || 'PRD-102948-CG'
  );

  const [activeLookFilter, setActiveLookFilter] = useState<string>('All');
  const [layingPattern, setLayingPattern] = useState<LayingPattern>('grid');
  const [groutWidth, setGroutWidth] = useState<'1.5mm' | '2mm' | '3mm'>('1.5mm');
  const [groutColor, setGroutColor] = useState<GroutColor>('matched');
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');

  const [splitPosition, setSplitPosition] = useState<number>(100);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  const activeRoom =
    ROOM_SCENES.find((r) => r.id === selectedRoomId) || ROOM_SCENES[0];
  const [roomWidth, setRoomWidth] = useState<number>(activeRoom.defaultWidth);
  const [roomLength, setRoomLength] = useState<number>(activeRoom.defaultLength);
  const [wastagePercent] = useState<number>(10);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const room = ROOM_SCENES.find((r) => r.id === selectedRoomId);
    if (room) {
      setRoomWidth(room.defaultWidth);
      setRoomLength(room.defaultLength);
    }
  }, [selectedRoomId]);

  useEffect(() => {
    if (initialTileRef) {
      setSelectedTileRef(initialTileRef);
    }
  }, [initialTileRef]);

  const currentTile =
    tileProducts.find((p) => p.ref === selectedTileRef) || tileProducts[0];

  const netSqm = Number((roomWidth * roomLength).toFixed(2));
  const grossSqm = Number((netSqm * (1 + wastagePercent / 100)).toFixed(2));
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

  const availableLooks = ['All', 'Marble', 'Wood', 'Stone', 'Pattern'];
  const filteredTiles = tileProducts.filter((t) => {
    if (activeLookFilter === 'All') return true;
    return t.look?.toLowerCase() === activeLookFilter.toLowerCase();
  });

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 md:p-6'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full bg-[#111111] text-white border border-neutral-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'h-full w-full rounded-none'
            : 'max-w-7xl max-h-[94vh] h-[94vh] rounded-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================
            TOP CONTROL BAR: Title, Room Selectors, Lighting, Fullscreen, Close
           ========================================================= */}
        <header className="px-4 sm:px-6 py-3.5 bg-neutral-950 border-b border-neutral-800/80 flex items-center justify-between gap-4 shrink-0">
          {/* Brand & Studio Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 shadow-md">
              <Sparkles className="w-4 h-4 fill-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Bikomax Studio
                </span>
                <span className="text-neutral-600 text-xs">/</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live 3D Perspective
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold font-heading text-white">
                Interactive Space & Surface Simulator
              </h2>
            </div>
          </div>

          {/* Quick Scene Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-neutral-900/90 p-1 border border-neutral-800">
            {ROOM_SCENES.map((room) => {
              const isActive = selectedRoomId === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    setSelectedTileRef(room.defaultTileRef);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  {room.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Controls: Lighting Mode, Fullscreen, Close */}
          <div className="flex items-center gap-2">
            {/* Lighting Toggle */}
            <button
              type="button"
              onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
              className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Toggle Day / Night Architectural Lighting"
            >
              {lightingMode === 'day' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-[11px]">Natural Sun</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline text-[11px]">Warm 3000K</span>
                </>
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Room Simulator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* =========================================================
            MAIN SIMULATOR SPLIT BODY:
            - Left/Center: High-End 3D Visual Stage
            - Right: Configuration, Specs & Purchase Engine
           ========================================================= */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT 7 COLS: Interactive Photorealistic Render Stage */}
          <div className="lg:col-span-7 xl:col-span-8 relative bg-neutral-950 overflow-hidden flex flex-col justify-between select-none">
            
            {/* The Room Scene Container */}
            <div className="relative w-full h-full flex-1 overflow-hidden">
              
              {/* Base Background Architectural Room Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeRoom.id}
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Day / Night atmospheric lighting tint */}
              <div
                className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
                  lightingMode === 'night'
                    ? 'bg-gradient-to-t from-amber-950/30 via-indigo-950/25 to-black/50 mix-blend-multiply'
                    : 'bg-gradient-to-t from-transparent via-transparent to-black/20'
                }`}
              />

              {/* Warm Downlight pools in Night Mode */}
              {lightingMode === 'night' && (
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />
              )}

              {/* ----------------------------------------------------
                  REALISTIC PERSPECTIVE TILE LAYER (APPLIED FLOOR)
                 ---------------------------------------------------- */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-500"
                style={{
                  clipPath:
                    isComparing && splitPosition < 100
                      ? `polygon(0% 0%, ${splitPosition}% 0%, ${splitPosition}% 100%, 0% 100%)`
                      : activeRoom.floorPolygon,
                  opacity: 0.88,
                }}
              >
                {/* Simulated Tiled Floor with Pattern, Joint Lines, and Perspective Sheen */}
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
                      transform: `rotateX(${activeRoom.perspectiveAngle}deg) translateZ(0)`,
                      transformOrigin: 'bottom center',
                      backgroundImage: `url(${currentTile.image})`,
                      backgroundSize:
                        layingPattern === 'herringbone'
                          ? '160px 80px'
                          : layingPattern === 'diamond'
                          ? '180px 180px'
                          : currentTile.dimension.includes('120')
                          ? '260px 140px'
                          : '160px 160px',
                      backgroundRepeat: 'repeat',
                      transformStyle: 'preserve-3d',
                      boxShadow:
                        groutColor === 'white'
                          ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.45)'
                          : groutColor === 'charcoal'
                          ? 'inset 0 0 0 1px rgba(20, 20, 20, 0.65)'
                          : groutColor === 'sand'
                          ? 'inset 0 0 0 1px rgba(217, 180, 130, 0.5)'
                          : 'inset 0 0 0 1px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    {/* Perspective Surface Gloss & Reflection Glare */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        currentTile.finish?.toLowerCase().includes('polished') ||
                        currentTile.finish?.toLowerCase().includes('crystal')
                          ? 'bg-gradient-to-t from-white/25 via-white/5 to-transparent'
                          : currentTile.finish?.toLowerCase().includes('satin') ||
                            currentTile.finish?.toLowerCase().includes('silk')
                          ? 'bg-gradient-to-t from-white/12 via-white/2 to-transparent'
                          : 'bg-black/10'
                      }`}
                    />

                    {/* Window Reflection Wash across the tiles */}
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
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center text-[10px] shadow-lg border-2 border-white">
                    ↔
                  </div>
                </div>
              )}

              {/* Bottom In-Scene HUD Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-end justify-between gap-3 pointer-events-none">
                {/* Active Specimen Summary */}
                <div className="bg-black/80 backdrop-blur-md border border-neutral-700/80 p-3 sm:p-4 rounded-xs max-w-sm pointer-events-auto shadow-2xl">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>Active Simulation</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> {currentTile.finish || 'Rectified'}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-heading text-white mt-0.5">
                    {currentTile.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-300 font-mono mt-1">
                    <span>{currentTile.dimension}</span>
                    <span className="text-neutral-600">|</span>
                    <span>{currentTile.look} Look</span>
                    <span className="text-neutral-600">|</span>
                    <span className="text-amber-400 font-bold">
                      {formatKES(currentTile.price_per_sqm || 0)}/m²
                    </span>
                  </div>
                </div>

                {/* Floating Before/After Compare Switch */}
                <div className="bg-black/80 backdrop-blur-md border border-neutral-700/80 p-2 rounded-xs flex items-center gap-2 pointer-events-auto shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setIsComparing(!isComparing);
                      if (!isComparing) setSplitPosition(50);
                      else setSplitPosition(100);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      isComparing
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'bg-neutral-800 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isComparing ? 'Split Mode Active' : 'Compare Before/After'}</span>
                  </button>

                  {isComparing && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={splitPosition}
                      onChange={(e) => setSplitPosition(Number(e.target.value))}
                      className="w-24 sm:w-32 accent-amber-500 cursor-pointer"
                      title="Slide to compare original screed vs new porcelain surface"
                    />
                  )}
                </div>
              </div>

            </div>

            {/* Mobile Scene Selector Strip */}
            <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto p-2 bg-neutral-900 border-t border-neutral-800 scrollbar-none">
              {ROOM_SCENES.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    setSelectedTileRef(room.defaultTileRef);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors ${
                    selectedRoomId === room.id
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 bg-neutral-800'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT 5 COLS: Tile Swatch Palette, Installation Config, & Dual Rate Calculator */}
          <div className="lg:col-span-5 xl:col-span-4 bg-neutral-900 border-t lg:border-t-0 lg:border-l border-neutral-800 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-full">
            
            <div className="p-5 sm:p-6 space-y-6">
              
              {/* 1. TILE SELECTOR & LOOK FILTER */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-200 font-bold">
                      1. Choose Surface Texture
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {filteredTiles.length} Available
                  </span>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
                  {availableLooks.map((look) => (
                    <button
                      key={look}
                      type="button"
                      onClick={() => setActiveLookFilter(look)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-all cursor-pointer ${
                        activeLookFilter === look
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {look}
                    </button>
                  ))}
                </div>

                {/* Tile Swatch Grid */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {filteredTiles.map((tile) => {
                    const isSelected = selectedTileRef === tile.ref;
                    return (
                      <button
                        key={tile.ref}
                        type="button"
                        onClick={() => setSelectedTileRef(tile.ref)}
                        className={`p-2.5 text-left border rounded-xs transition-all cursor-pointer relative group flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-amber-500 bg-neutral-800/90 ring-1 ring-amber-500'
                            : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/60'
                        }`}
                      >
                        <img
                          src={tile.image}
                          alt={tile.name}
                          className="w-11 h-11 object-cover shrink-0 border border-neutral-800 rounded-2xs"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-400 block truncate">
                            {tile.look} · {tile.dimension.split(' ')[0]}
                          </span>
                          <span className="text-xs font-bold text-white block truncate leading-snug">
                            {tile.name}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-amber-400 block mt-0.5">
                            {formatKES(tile.price_per_sqm || 0)}
                            <span className="text-[9px] text-neutral-500 font-normal">/m²</span>
                          </span>
                        </div>

                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,1)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. LAYING PATTERN & GROUT CONFIGURATOR */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200 font-bold">
                      2. Laying Pattern & Joints
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {layingPattern.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'grid', label: 'Straight Grid' },
                    { id: 'running', label: 'Brick 50%' },
                    { id: 'herringbone', label: 'Herringbone' },
                    { id: 'diamond', label: 'Diamond 45°' },
                  ].map((pat) => (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() => setLayingPattern(pat.id as LayingPattern)}
                      className={`p-2 text-center border text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        layingPattern === pat.id
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:text-white bg-neutral-950/40'
                      }`}
                    >
                      {pat.label}
                    </button>
                  ))}
                </div>

                {/* Grout Controls */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Joint Spacing
                    </label>
                    <div className="flex items-center gap-1">
                      {(['1.5mm', '2mm', '3mm'] as const).map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setGroutWidth(w)}
                          className={`flex-1 py-1 text-[10px] font-mono border transition-colors cursor-pointer ${
                            groutWidth === w
                              ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                              : 'border-neutral-800 text-neutral-400 bg-neutral-950/40'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Grout Tone
                    </label>
                    <div className="flex items-center gap-1">
                      {[
                        { id: 'matched', label: 'Tone', color: '#777' },
                        { id: 'white', label: 'White', color: '#fff' },
                        { id: 'sand', label: 'Sand', color: '#d9b482' },
                        { id: 'charcoal', label: 'Dark', color: '#333' },
                      ].map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGroutColor(g.id as GroutColor)}
                          className={`flex-1 py-1 text-[10px] font-mono border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                            groutColor === g.id
                              ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                              : 'border-neutral-800 text-neutral-400 bg-neutral-950/40'
                          }`}
                        >
                          <span
                            className="w-2 h-2 rounded-full border border-black/40"
                            style={{ backgroundColor: g.color }}
                          />
                          <span>{g.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. ROOM DIMENSIONS & REAL-TIME AREA ESTIMATOR */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200 font-bold">
                      3. Room Sizing & Material Metric
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-400">
                    {netSqm} m² Net Area
                  </span>
                </div>

                {/* Dimension Sliders */}
                <div className="grid grid-cols-2 gap-3 bg-neutral-950/70 p-3 border border-neutral-800">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                      <span>Room Width</span>
                      <span className="text-white font-bold">{roomWidth.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="15.0"
                      step="0.5"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                      <span>Room Length</span>
                      <span className="text-white font-bold">{roomLength.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="15.0"
                      step="0.5"
                      value={roomLength}
                      onChange={(e) => setRoomLength(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Summary calculation box */}
                <div className="p-3.5 bg-black/60 border border-neutral-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                    <span>Wastage Allowance (+{wastagePercent}%):</span>
                    <span className="text-white font-bold">
                      {(grossSqm - netSqm).toFixed(2)} m²
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                    <span>Carton Specification:</span>
                    <span className="text-white font-bold">{sqmPerBox} m² per Factory Box</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block">
                        Delivered Order
                      </span>
                      <span className="text-base font-bold text-white font-heading">
                        {boxesNeeded} Full Boxes
                      </span>
                      <span className="text-[10px] text-neutral-500 block">
                        (= {deliveredCoverage} m² total)
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-amber-400 block font-semibold">
                        Estimated Total
                      </span>
                      <div className="text-lg font-bold font-heading text-amber-400">
                        {formatKES(totalCost)}
                      </div>
                      <span className="text-[10px] text-neutral-500 block">
                        Ex-depot Eldoret
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 space-y-2 shrink-0">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-amber-500/25 cursor-pointer rounded-xs"
              >
                {addedAnimation ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                    <span>Added {boxesNeeded} Boxes to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-neutral-950" />
                    <span>Add {boxesNeeded} Boxes to Cart ({formatKES(totalCost)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                {onOpenCalculatorWithProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentTile) {
                        onClose();
                        onOpenCalculatorWithProduct(currentTile);
                      }
                    }}
                    className="flex-1 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer rounded-xs"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-400" />
                    <span>Multi-Room Tool</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/25420230859?text=Hello%20Bikomax%20Eldoret,%20I%20am%20using%20the%20Room%20Simulator%20for%20${encodeURIComponent(activeRoom.name)}%20with%20${encodeURIComponent(currentTile.name)}%20(${roomWidth}m%20x%20${roomLength}m%20=%20${netSqm}sqm,%20${boxesNeeded}%20boxes).%20Please%20confirm%20current%20batch%20shade.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-300 hover:text-white text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer rounded-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Specs</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
