import React, { useState, useEffect } from 'react';
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
  Check,
  Maximize2,
  Minimize2,
  Eye,
  ExternalLink,
  Globe,
  Settings,
} from 'lucide-react';
import { getSeamlessTileTexture } from '../utils/tileTextures';

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
  defaultTileRef: string;
  defaultWidth: number;
  defaultLength: number;
  description: string;
  baseImage: string;
  floorPolygon: string;
  perspectiveAngle: number;
  originY: string;
}

const ROOM_SCENES: SimRoomScene[] = [
  {
    id: 'living',
    name: 'Open Living Pavilion',
    category: 'Living',
    defaultTileRef: 'PRD-102948-CG',
    defaultWidth: 6.0,
    defaultLength: 5.5,
    description: 'Expansive double-height living room with natural sea-view sunlight and floor-to-ceiling glass.',
    baseImage: '/products/room-living-pavilion.jpg',
    floorPolygon: 'polygon(0% 49%, 46% 49%, 54% 53%, 100% 56%, 100% 100%, 0% 100%)',
    perspectiveAngle: 58,
    originY: '50%',
  },
  {
    id: 'bathroom-spa',
    name: 'Master En-Suite Spa',
    category: 'Bathroom',
    defaultTileRef: 'PRD-636920-2982',
    defaultWidth: 4.2,
    defaultLength: 3.8,
    description: 'Minimalist master bathroom with freestanding soaking tub, floating vanity, and panoramic glass.',
    baseImage: '/products/room-carol-marina.jpg',
    floorPolygon: 'polygon(0% 62%, 100% 65%, 100% 100%, 0% 100%)',
    perspectiveAngle: 55,
    originY: '60%',
  },
  {
    id: 'kitchen',
    name: 'Contemporary Chef Kitchen',
    category: 'Kitchen',
    defaultTileRef: 'PRD-304958-TZ',
    defaultWidth: 5.2,
    defaultLength: 4.5,
    description: 'High-traffic culinary space with central island bar and dining transition requiring grease resilience.',
    baseImage: '/products/room-kitchen-chef.jpg',
    floorPolygon: 'polygon(0% 54%, 100% 56%, 100% 100%, 0% 100%)',
    perspectiveAngle: 57,
    originY: '54%',
  },
  {
    id: 'bathroom-rose',
    name: 'Architectural Bath Suite',
    category: 'Bathroom',
    defaultTileRef: 'PRD-941824-3110',
    defaultWidth: 3.8,
    defaultLength: 3.2,
    description: 'Warm natural light en-suite with timber vanity, acoustic sound dampening, and fluted wall tiles.',
    baseImage: '/products/room-carol-rose.jpg',
    floorPolygon: 'polygon(0% 63%, 100% 65%, 100% 100%, 0% 100%)',
    perspectiveAngle: 54,
    originY: '62%',
  },
  {
    id: 'outdoor',
    name: 'Villa Pool Terrace',
    category: 'Outdoor',
    defaultTileRef: 'PRD-492019-GP',
    defaultWidth: 8.0,
    defaultLength: 6.0,
    description: 'Monolithic outdoor pool deck engineered for heavy tropical sun, barefoot wet safety, and pool water.',
    baseImage: '/products/room-outdoor-patio.jpg',
    floorPolygon: 'polygon(0% 48%, 100% 48%, 100% 100%, 0% 100%)',
    perspectiveAngle: 60,
    originY: '48%',
  },
];

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

  const [activeTab, setActiveTab] = useState<'studio' | 'thirdparty'>('studio');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId || 'living');
  const [selectedTileRef, setSelectedTileRef] = useState<string>(
    initialTileRef || tileProducts[0]?.ref || 'PRD-102948-CG'
  );

  const [activeLookFilter, setActiveLookFilter] = useState<string>('All');
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');
  const [splitPosition, setSplitPosition] = useState<number>(100);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // 3rd-Party Embed State
  const [customEmbedUrl, setCustomEmbedUrl] = useState<string>(() => {
    return localStorage.getItem('bikomax_visualizer_url') || '';
  });
  const [inputUrl, setInputUrl] = useState<string>(customEmbedUrl);
  const [showEmbedSettings, setShowEmbedSettings] = useState(false);

  const activeRoom =
    ROOM_SCENES.find((r) => r.id === selectedRoomId) || ROOM_SCENES[0];
  const [roomWidth, setRoomWidth] = useState<number>(activeRoom.defaultWidth);
  const [roomLength, setRoomLength] = useState<number>(activeRoom.defaultLength);

  // Update dimensions when room scene changes
  useEffect(() => {
    setRoomWidth(activeRoom.defaultWidth);
    setRoomLength(activeRoom.defaultLength);
  }, [selectedRoomId]);

  // Keep selected tile ref in sync
  useEffect(() => {
    if (initialTileRef) setSelectedTileRef(initialTileRef);
  }, [initialTileRef]);

  // Keyboard shortcut: ESC closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTile =
    tileProducts.find((t) => t.ref === selectedTileRef) || tileProducts[0];

  const activeTexture = getSeamlessTileTexture(currentTile);

  // Real Box & Financial Calculations
  const netSqm = Number((roomWidth * roomLength).toFixed(2));
  const grossSqm = Number((netSqm * 1.1).toFixed(2));
  const sqmPerBox = currentTile?.sqm_per_box || 1.44;
  const boxesNeeded = Math.max(1, Math.ceil(grossSqm / sqmPerBox));
  const deliveredCoverage = Number((boxesNeeded * sqmPerBox).toFixed(2));
  const pricePerSqm = currentTile?.price_per_sqm || 3000;
  const boxPrice = currentTile?.bulk_price_per_box || pricePerSqm * sqmPerBox;
  const estimatedTotal = boxesNeeded * boxPrice;

  const handleSaveEmbedUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputUrl.trim();
    setCustomEmbedUrl(clean);
    localStorage.setItem('bikomax_visualizer_url', clean);
    setShowEmbedSettings(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-3 lg:p-6 animate-in fade-in duration-200">
      
      {/* Container Card */}
      <div
        className={`w-full bg-[#111111] text-white border border-neutral-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 rounded-none' : 'max-w-7xl h-full sm:h-[94vh] rounded-xs'
        }`}
      >
        
        {/* =========================================================
            HEADER: TITLE + DUAL-MODE TAB SWITCHER + CONTROLS
           ========================================================= */}
        <header className="px-4 sm:px-6 py-3 bg-[#0A0A0A] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Left Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Bikomax Studio
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Surface Simulator
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold font-heading text-white">
                Architectural Space & Surface Simulator
              </h2>
            </div>
          </div>

          {/* Center: DUAL-MODE SWITCHER */}
          <div className="flex items-center bg-neutral-900 p-1 border border-neutral-800 rounded-xs">
            <button
              type="button"
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-2xs transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Render</span>
            </button>

            {/* 3rd-Party Room Visualizer button commented out for now (kept for future deployment) */}
            {/*
            <button
              type="button"
              onClick={() => setActiveTab('thirdparty')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-2xs transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'thirdparty'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>3rd-Party 3D & AR</span>
            </button>
            */}
          </div>

          {/* Right Controls: Lighting, Fullscreen, Close */}
          <div className="flex items-center gap-2">
            {activeTab === 'studio' && (
              <button
                type="button"
                onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
                className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer rounded-xs"
                title="Toggle Day / Night Lighting"
              >
                {lightingMode === 'day' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline text-[11px]">Natural Sun</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline text-[11px]">Warm Glow</span>
                  </>
                )}
              </button>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-xs hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-xs"
              aria-label="Close Room Simulator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* =========================================================
            TAB 1: PHOTOREALISTIC STUDIO MODE
           ========================================================= */}
        {activeTab === 'studio' ? (
          <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* LEFT 7-8 COLS: Visual Stage Preview */}
            <div className="lg:col-span-7 xl:col-span-8 relative bg-neutral-950 overflow-hidden flex flex-col justify-between select-none">
              
              {/* Scene Navigation Strip (Top of Stage) */}
              <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 border border-neutral-800 rounded-xs pointer-events-auto shadow-xl">
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
                        className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer rounded-2xs ${
                          isActive
                            ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                        }`}
                      >
                        {room.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                {/* Compare Before/After Toggle */}
                <button
                  type="button"
                  onClick={() => setIsComparing(!isComparing)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-colors pointer-events-auto flex items-center gap-1.5 shadow-xl ${
                    isComparing
                      ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold'
                      : 'bg-black/80 backdrop-blur-md border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isComparing ? 'Exit Split View' : 'Compare Split'}</span>
                </button>
              </div>

              {/* The Seamless Photorealistic Room Stage */}
              <div className="relative w-full h-full flex-1 overflow-hidden">
                
                {/* 1. Base Room Image (Background) */}
                <img
                  src={activeRoom.baseImage}
                  alt={activeRoom.name}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                />

                {/* 2. Interactive Floor Surface Layer (Transformed to actual tile & shadow-multiplied) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none select-none transition-all duration-300"
                  style={{
                    clipPath: isComparing
                      ? `polygon(0% 0%, ${splitPosition}% 0%, ${splitPosition}% 100%, 0% 100%)`
                      : activeRoom.floorPolygon,
                  }}
                >
                  {/* 3D Perspective Tile Plane */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      perspective: '900px',
                      perspectiveOrigin: `50% ${activeRoom.originY}`,
                    }}
                  >
                    <div
                      key={`${selectedRoomId}-${currentTile?.ref}`}
                      className="absolute -inset-x-12 -bottom-24 transition-opacity duration-300 animate-in fade-in"
                      style={{
                        top: '25%',
                        transform: `rotateX(${activeRoom.perspectiveAngle}deg) translateZ(0)`,
                        transformOrigin: 'bottom center',
                        backgroundImage: `url(${activeTexture.textureUrl})`,
                        backgroundSize: activeTexture.tileScale,
                        backgroundRepeat: 'repeat',
                        boxShadow: `inset 0 0 0 1px ${activeTexture.groutColor}`,
                      }}
                    >
                      {/* Surface Gloss & Sheen based on Tile Finish */}
                      <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(to top, rgba(255,255,255,${activeTexture.glossOpacity}), transparent)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* 
                    NATURAL AMBIENT OCCLUSION & SHADOW RETENTION LAYER:
                    Clones the original room image over the floor with mix-blend-multiply.
                    This preserves the real shadows of the sofa, coffee table, and fireplace,
                    so the furniture sits NATURALLY ON TOP of the newly selected tile!
                  */}
                  <img
                    src={activeRoom.baseImage}
                    alt="Ambient Shadow Retention"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-multiply opacity-75"
                  />

                  {/* Ambient window glare wash */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-screen" />
                </div>

                {/* Day / Night atmospheric lighting tint */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
                    lightingMode === 'night'
                      ? 'bg-indigo-950/25 mix-blend-multiply'
                      : 'bg-transparent'
                  }`}
                />

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

                {/* Split Slider Interactive Handle (Visible when comparing) */}
                {isComparing && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={splitPosition}
                    onChange={(e) => setSplitPosition(Number(e.target.value))}
                    className="absolute inset-x-8 bottom-24 z-30 opacity-70 hover:opacity-100 transition-opacity cursor-ew-resize accent-amber-500"
                  />
                )}
              </div>

              {/* Bottom In-Scene Specimen HUD Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-end justify-between gap-3 pointer-events-none">
                
                {/* Active Tile Specimen Info Card */}
                <div className="bg-black/85 backdrop-blur-md border border-neutral-700/80 p-3 sm:p-4 rounded-xs max-w-sm pointer-events-auto shadow-2xl">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>Curated Surface Specimen</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-emerald-400">{activeTexture.finishLabel}</span>
                  </div>
                  
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug">
                    {currentTile?.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                    <span className="text-amber-400 font-bold">
                      {formatKES(currentTile?.price_per_sqm || 0)} / m²
                    </span>
                    <span className="text-neutral-500">|</span>
                    <span className="text-neutral-300 font-sans">{currentTile?.dimension}</span>
                    <span className="text-neutral-500">|</span>
                    <span className="text-neutral-400 font-sans">{currentTile?.look} Look</span>
                  </div>
                </div>

                {/* Quick Add To Cart from HUD */}
                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentTile) {
                        addTileToCart({
                          product: currentTile,
                          mode: 'box',
                          boxes: boxesNeeded,
                          coverageM2: deliveredCoverage,
                          rawCoverageNeeded: netSqm,
                          withWastage: true,
                          openDrawer: false,
                        });
                        openCart();
                      }
                    }}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-nav font-bold text-xs uppercase tracking-wider rounded-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order {boxesNeeded} Boxes ({formatKES(estimatedTotal)})</span>
                  </button>
                </div>

              </div>

            </div>

            {/* RIGHT 4-5 COLS: Surface Catalog Selector & Calculation */}
            <div className="lg:col-span-5 xl:col-span-4 bg-[#111111] border-t lg:border-t-0 lg:border-l border-neutral-800 flex flex-col h-full overflow-hidden">
              
              {/* Category Filter Tabs */}
              <div className="p-4 border-b border-neutral-800 shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                    Choose Surface Texture
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    {tileProducts.length} Available
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {['All', 'Marble', 'Wood', 'Stone', 'Pattern'].map((look) => (
                    <button
                      key={look}
                      type="button"
                      onClick={() => setActiveLookFilter(look)}
                      className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-2xs transition-all cursor-pointer ${
                        activeLookFilter === look
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {look}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tile Products Grid List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-neutral-800/40">
                {tileProducts
                  .filter((p) => activeLookFilter === 'All' || p.look?.toLowerCase() === activeLookFilter.toLowerCase())
                  .map((tile) => {
                    const isSelected = selectedTileRef === tile.ref;
                    return (
                      <div
                        key={tile.ref}
                        onClick={() => setSelectedTileRef(tile.ref)}
                        className={`pt-2.5 first:pt-0 p-3 rounded-xs border transition-all cursor-pointer flex items-center gap-3.5 group ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 shadow-md'
                            : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-600'
                        }`}
                      >
                        <img
                          src={tile.image}
                          alt={tile.name}
                          className="w-14 h-14 object-cover border border-neutral-700 rounded-2xs shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                              {tile.look || 'Ceramics'}
                            </span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              {tile.dimension}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white truncate mt-0.5 group-hover:text-amber-400 transition-colors">
                            {tile.name}
                          </h4>
                          <div className="text-xs font-mono text-amber-400 font-bold mt-1">
                            {formatKES(tile.price_per_sqm || 0)}
                            <span className="text-[10px] font-normal text-neutral-400 ml-1">/ m²</span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Bottom Room Area Estimator Module */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800 shrink-0 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider">
                    Room Area ({roomWidth}m × {roomLength}m)
                  </span>
                  <span className="font-mono font-bold text-white">{netSqm} m²</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider">
                    Required with +10% Waste
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{deliveredCoverage} m² ({boxesNeeded} Boxes)</span>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      Estimated Cost
                    </span>
                    <span className="text-base font-bold font-mono text-amber-400">
                      {formatKES(estimatedTotal)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentTile && onOpenCalculatorWithProduct) {
                        onOpenCalculatorWithProduct(currentTile);
                      }
                    }}
                    className="px-3 py-1.5 border border-neutral-700 hover:border-amber-500 text-xs font-mono text-neutral-300 hover:text-white rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-500" />
                    <span>Multi-Room Calc</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* =========================================================
              TAB 2: 3RD-PARTY 3D / AR VISUALIZER INTEGRATION (TILESVIEW & ROOMVO)
             ========================================================= */
          <div className="flex-1 flex flex-col bg-[#0A0A0A] p-4 sm:p-6 lg:p-8 overflow-y-auto">
            
            {/* Top Explanation & Connection Banner */}
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xs mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-1">
                    <Globe className="w-4 h-4" />
                    <span>Free Third-Party Tile Visualizer Integration</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Experience Full 3D Room CAD & Mobile AR Visualization
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                    Connect an industry-standard third-party visualizer like <strong>Tilesview</strong>, <strong>Roomvo</strong>, or <strong>Maticad</strong>. These specialized platforms let customers aim their phone camera at real floors or paint walls in full interactive 3D.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEmbedSettings(!showEmbedSettings)}
                  className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-mono text-white rounded-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showEmbedSettings ? 'Hide URL Config' : 'Connect Store Embed URL'}</span>
                </button>
              </div>

              {/* Embed Settings Input Form */}
              {showEmbedSettings && (
                <form onSubmit={handleSaveEmbedUrl} className="mt-4 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="e.g. https://tilesview.ai/app/YOUR_TOKEN/room-select"
                    className="flex-1 px-3 py-2 bg-black border border-neutral-700 text-xs text-white placeholder:text-neutral-500 rounded-xs focus:outline-hidden focus:border-amber-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Save & Load Iframe
                  </button>
                </form>
              )}
            </div>

            {/* If a custom embed URL is saved, render it inside an iframe */}
            {customEmbedUrl ? (
              <div className="flex-1 min-h-[500px] border border-neutral-800 rounded-xs overflow-hidden bg-black relative">
                <iframe
                  src={customEmbedUrl}
                  title="3rd Party Room Visualizer"
                  className="w-full h-full min-h-[600px] border-0"
                  allow="camera; microphone; xr-spatial-tracking; fullscreen"
                />
              </div>
            ) : (
              /* Pre-configured 3rd-Party Providers Cards */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
                
                {/* 1. Tilesview AI */}
                <div className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 p-6 rounded-xs flex flex-col justify-between transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-xs bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4 font-bold">
                      TV
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                      Free Account & Trial
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      Tilesview AI Visualizer
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      Leading AI-driven tile & floor visualizer. Offers direct room uploads, AR live phone camera floor scanning, multi-surface wall mapping, and seamless iframe integration.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <a
                      href="https://tilesview.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Launch Tilesview Studio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. Roomvo */}
                <div className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 p-6 rounded-xs flex flex-col justify-between transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-xs bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 font-bold">
                      RV
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold block mb-1">
                      Enterprise Standard
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      Roomvo Flooring Studio
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      Used by the world&apos;s largest tile & flooring distributors. Patented perspective masking automatically recognizes sofas, kitchen cabinets, and sunlight reflections.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <a
                      href="https://www.roomvo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-all border border-neutral-700"
                    >
                      <span>Explore Roomvo Platform</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 3. Maticad TilePlanner */}
                <div className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 p-6 rounded-xs flex flex-col justify-between transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-xs bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-bold">
                      TP
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                      Architectural CAD
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      Maticad TilePlanner Web
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      Italian architectural tile planning software. Allows clients and architects to draw wall partitions, drop 3D basins & tubs, and lay tiles in exact herringbone or diagonal angles.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <a
                      href="https://www.tileplanner.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-all border border-neutral-700"
                    >
                      <span>Explore TilePlanner</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
