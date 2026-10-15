import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Ruler,
  MapPin,
  Calculator,
  Sparkles,
  Layers,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Eye,
  SlidersHorizontal,
  Compass,
  Boxes,
} from 'lucide-react';
import { formatKES } from '../utils/formatters';
import { Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onOpenCalculator: () => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
  products?: Product[];
}

export interface HeroCarouselSlide {
  id: string;
  ref: string;
  category: 'Tiles' | 'Sanitaryware' | 'Electrical';
  slideNumber: string;
  eyebrow: string;
  title: string;
  specSummary: string;
  image: string;
  dynamicLead: string;
  pricingLabel: string;
  unitPrice: number;
  bulkPrice?: number;
  sqmPerBox?: number;
  unitLabel: string;
  specs: {
    format: string;
    engineering: string;
    compliance: string;
  };
}

const CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'tiles-large-format',
    ref: 'PRD-636920-2982',
    category: 'Tiles',
    slideNumber: '01',
    eyebrow: '01 / SURFACE ARCHITECTURE · EMIL SPEC',
    title: 'Model 61238 Large Format Porcelain Tile',
    specSummary: '60×120 cm · Satin Silk Finish · Emil Ceramica Spec',
    image: '/products/tile-slab-61238.jpg',
    dynamicLead:
      'Expansive 60×120 cm rectified porcelain slabs with continuous flowing veining. Diamond-calibrated for minimal 1.5mm grout lines across luxury living areas, executive offices, and master en-suites.',
    pricingLabel: 'Dual Pricing: KES 3,220 / m² or KES 4,636.80 / Box (1.44 m²)',
    unitPrice: 3220,
    bulkPrice: 4636.8,
    sqmPerBox: 1.44,
    unitLabel: 'm²',
    specs: {
      format: '600 × 1200 mm · 10mm Slab',
      engineering: 'Diamond Rectified Monocaliber',
      compliance: 'MOHS 7 Scratch Proof · R10 Slip',
    },
  },
  {
    id: 'sanitary-piano-shower',
    ref: 'PRD-805006-RH',
    category: 'Sanitaryware',
    slideNumber: '02',
    eyebrow: '02 / HYDROELECTRIC WATER SUITES · SOLID BRASS',
    title: 'Gun Grey Piano Shower System',
    specSummary: 'Multi-function · Hydroelectric LED · Solid HPb59-1 Brass',
    image: '/products/shower-piano.jpg',
    dynamicLead:
      'Multi-valve thermostatic piano keys directing rainfall monsoon, waterfall cascade, and booster bidet wand. Powered purely by hydroelectric water pressure with self-illuminating digital LED readouts.',
    pricingLabel: 'Standard Unit Pricing: KES 35,600 · VAT Inclusive',
    unitPrice: 35600,
    unitLabel: 'Piece',
    specs: {
      format: 'Concealed 4-Valve Push Piano System',
      engineering: 'Hydroelectric LED (No Batteries Required)',
      compliance: 'German Ceramic Cartridge · 38°C Lock',
    },
  },
  {
    id: 'tiles-statuario',
    ref: 'PRD-941824-3110',
    category: 'Tiles',
    slideNumber: '03',
    eyebrow: '03 / VITRIFIED MARBLE SLABS · CARRARA SIGNATURE',
    title: 'Statuario Venato Bookmatched Slab Tile',
    specSummary: '80×80 cm · Mirror Polished · Laser Rectified Monocaliber',
    image: '/products/tile-statuario.jpg',
    dynamicLead:
      'Crisp Carrara white canvas shot through with branching quartz veins. Vitrified with 98% reflective gloss, delivering luminous optical depth and zero-joint elegance to luxury architectural floors.',
    pricingLabel: 'Dual Pricing: KES 3,650 / m² or KES 4,672.00 / Box (1.28 m²)',
    unitPrice: 3650,
    bulkPrice: 4672.0,
    sqmPerBox: 1.28,
    unitLabel: 'm²',
    specs: {
      format: '800 × 800 mm · 10.5mm Thickness',
      engineering: '98% Glossometer Mirror Finish',
      compliance: 'Water Absorption < 0.05% Impervious',
    },
  },
  {
    id: 'sanitary-freestanding-tub',
    ref: 'PRD-220194-FL',
    category: 'Sanitaryware',
    slideNumber: '04',
    eyebrow: '04 / SCULPTURAL MASTER BATHS · CAST MINERAL RESIN',
    title: 'Freestanding Matte Black Egg Bathtub 1700mm',
    specSummary: '1700×800×580 mm · Mineral Composite Resin · 290L Capacity',
    image: '/products/bathtub-black.jpg',
    dynamicLead:
      'Sculptural centerpiece soaking tub cast from composite resin stone. Retains thermal bath warmth up to 300% longer than standard acrylic tubs, with a hand-finished velvety matte tactile touch.',
    pricingLabel: 'Luxury Centerpiece: KES 118,000 / Piece',
    unitPrice: 118000,
    unitLabel: 'Piece',
    specs: {
      format: '1700 L × 800 W × 580 H mm',
      engineering: 'Cast Mineral Composite Resin (115 kg)',
      compliance: 'Integrated Concealed Slotted Overflow',
    },
  },
  {
    id: 'electrical-dp-switch',
    ref: 'PRD-158493-6323',
    category: 'Electrical',
    slideNumber: '05',
    eyebrow: '05 / ARCHITECTURAL POWER · BRITISH STANDARD CERTIFIED',
    title: 'Heavy Duty DP Switch (40A)',
    specSummary: 'Standard Plate 86×86 mm · Micro-Neon Pilot · BS Certified',
    image: '/products/switch-40a.jpg',
    dynamicLead:
      '40 Amp Double Pole heavy-duty cooker and water heater switch in brushed gunmetal. Built with flame-retardant Bayer polycarbonate housing and solid silver-alloy contacts for zero-failure reliability.',
    pricingLabel: 'Contractor Grade: KES 1,300 / Piece',
    unitPrice: 1300,
    unitLabel: 'Piece',
    specs: {
      format: '86 × 86 mm Flush Modular Faceplate',
      engineering: 'Bayer Flame-Retardant PC + Silver Contacts',
      compliance: 'British Standard BS EN 60669-1 / KEBS',
    },
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenCalculator,
  onSelectCategory,
  onSelectProduct,
  products = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showDualPricingDemo, setShowDualPricingDemo] = useState(false);

  // Interactive dual-pricing state for tile slides
  const [heroPricingMode, setHeroPricingMode] = useState<'coverage' | 'box'>('coverage');
  const [heroCoverage, setHeroCoverage] = useState<number>(25); // 25 m²
  const [heroBoxes, setHeroBoxes] = useState<number>(18);

  const currentSlide = CAROUSEL_SLIDES[activeIndex];

  // Dual pricing math based on active slide (or fallback)
  const currentSqmPerBox = currentSlide.sqmPerBox || 1.44;
  const currentBoxPrice = currentSlide.bulkPrice || currentSlide.unitPrice * currentSqmPerBox;
  const currentPricePerSqm = currentSlide.unitPrice;

  const demoBoxesFromCoverage = Math.ceil((heroCoverage * 1.1) / currentSqmPerBox); // +10% wastage
  const demoTotalFromCoverage = demoBoxesFromCoverage * currentBoxPrice;
  const demoCoverageFromBoxes = Number((heroBoxes * currentSqmPerBox).toFixed(2));
  const demoTotalFromBoxes = heroBoxes * currentBoxPrice;

  // Auto-play timer
  const AUTO_INTERVAL = 5500;
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, AUTO_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  // Locate matched product in full catalog if available
  const matchedProduct = products.find((p) => p.ref === currentSlide.ref);

  const handleInspectActive = () => {
    if (matchedProduct && onSelectProduct) {
      onSelectProduct(matchedProduct);
    } else {
      onSelectCategory(currentSlide.category);
      onExploreClick();
    }
  };

  return (
    <section className="relative bg-[#FAFAFA] bg-arch-grid border-b border-neutral-200/80 overflow-hidden">
      {/* Delicate gradient wash over architectural grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA]/95 via-[#FAFAFA]/70 to-[#FAFAFA] pointer-events-none" />

      {/* Blueprint calibration markers */}
      <div className="absolute top-4 left-6 text-neutral-400 font-mono text-[9px] uppercase tracking-widest hidden lg:flex items-center gap-2 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 bg-[#C2A26F] rotate-45 inline-block"></span>
        <span>BIKOMAX SPECIFICATION DEPOT · UNIT G48, RUPA&apos;S GODOWNS</span>
      </div>
      <div className="absolute top-4 right-6 text-neutral-400 font-mono text-[9px] uppercase tracking-widest hidden lg:flex items-center gap-2 pointer-events-none select-none text-right">
        <span>ELDORET, KENYA · DUAL PRICING ARCHITECTURE</span>
        <span className="w-1.5 h-1.5 bg-neutral-900 rotate-45 inline-block"></span>
      </div>

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-10 sm:pt-14 pb-14 lg:pb-20">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Steady Brand Trinity + Synchronized Changing Texts */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-5">
            {/* Showroom location tag + Dynamic Carousel Stage Eyebrow */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200/90 text-[10px] font-mono tracking-widest uppercase text-neutral-700 shadow-2xs">
                <MapPin className="w-3 h-3 text-[#C2A26F]" />
                <span>Eldoret Showroom · Rupa&apos;s Godowns G48</span>
              </div>

              {/* DYNAMIC CHANGING EYEBROW: Synchronized with the active carousel product */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 text-white text-[10px] font-mono tracking-wider uppercase"
                >
                  <span className="w-1 h-1 bg-[#C2A26F] rounded-full animate-pulse"></span>
                  <span className="text-[#C2A26F] font-bold">{currentSlide.slideNumber}</span>
                  <span className="text-neutral-400">/</span>
                  <span className="text-neutral-200 font-medium">{currentSlide.category}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Steady Iconic Brand Trinity (Flawless · Functional · Refined) */}
            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-neutral-950 font-heading leading-[1.02]"
              >
                FLAWLESS.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] font-heading leading-[1.02]"
              >
                FUNCTIONAL.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-light font-editorial-serif italic text-[#C2A26F] leading-[1.02]"
              >
                Refined.
              </motion.div>
            </div>

            {/* DYNAMIC CHANGING FOCAL TEXT: Relevant description updating per active slide */}
            <div className="min-h-[76px] sm:min-h-[82px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2"
                >
                  <p className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed max-w-xl">
                    {currentSlide.dynamicLead}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DYNAMIC CHANGING SPECIFICATION CAPSULES (Synchronized with Active Product) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1"
              >
                <div className="bg-white border border-neutral-200/90 p-2.5 shadow-2xs">
                  <div className="text-[9px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                    <Ruler className="w-2.5 h-2.5 text-[#C2A26F]" />
                    <span>Specification</span>
                  </div>
                  <div className="text-[11px] font-bold text-neutral-900 truncate mt-0.5 font-heading">
                    {currentSlide.specs.format}
                  </div>
                </div>

                <div className="bg-white border border-neutral-200/90 p-2.5 shadow-2xs">
                  <div className="text-[9px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5 text-[#C2A26F]" />
                    <span>Engineering</span>
                  </div>
                  <div className="text-[11px] font-bold text-neutral-900 truncate mt-0.5 font-heading">
                    {currentSlide.specs.engineering}
                  </div>
                </div>

                <div className="bg-white border border-neutral-200/90 p-2.5 shadow-2xs">
                  <div className="text-[9px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#C2A26F]" />
                    <span>Quality / Standard</span>
                  </div>
                  <div className="text-[11px] font-bold text-neutral-900 truncate mt-0.5 font-heading">
                    {currentSlide.specs.compliance}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="group px-6 py-3.5 bg-[#0A0A0A] text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-2.5 shadow-sm cursor-pointer"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 text-[#C2A26F]" />
              </button>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-5 py-3.5 border border-neutral-300 hover:border-neutral-950 text-neutral-950 text-xs font-bold uppercase tracking-widest transition-all duration-200 bg-white/95 backdrop-blur-xs flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <Calculator className="w-3.5 h-3.5 text-[#C2A26F]" />
                <span>Room Coverage Calculator</span>
              </button>

              {currentSlide.bulkPrice && (
                <button
                  type="button"
                  onClick={() => setShowDualPricingDemo(!showDualPricingDemo)}
                  className={`px-3 py-3.5 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    showDualPricingDemo
                      ? 'border-[#C2A26F] bg-[#FAF6EE] text-[#8C6D3B]'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                  }`}
                  title="Interactive Dual Pricing Engine Demo"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C2A26F]" />
                  <span>Dual Pricing Demo</span>
                </button>
              )}
            </div>

            {/* Quick Specs Bar with Hairline Dividers */}
            <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C2A26F] rounded-full"></span>
                <span className="text-neutral-900 font-semibold">Dual Pricing:</span>
                <span>Per m² & Sealed Factory Box</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
                <span className="text-neutral-900 font-semibold">Logistics:</span>
                <span>Direct Dispatch at Rupa&apos;s G48</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Expansive Architectural Product Carousel   */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-3">
            {/* Carousel Stage Card */}
            <div
              className="relative bg-neutral-950 border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] arch-crosshair overflow-hidden group select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated Progress Bar (Timer indicator for auto-play) */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
                <motion.div
                  key={`${activeIndex}-${isPlaying}-${isHovered}`}
                  initial={{ width: '0%' }}
                  animate={{ width: isPlaying && !isHovered ? '100%' : '0%' }}
                  transition={{
                    duration: isPlaying && !isHovered ? AUTO_INTERVAL / 1000 : 0,
                    ease: 'linear',
                  }}
                  className="h-full bg-gradient-to-r from-[#C2A26F] via-[#E2C799] to-[#C2A26F]"
                />
              </div>

              {/* Main Photographic Carousel Frame */}
              <div className="relative aspect-4/3 sm:aspect-16/11 bg-neutral-900 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-102"
                      loading="eager"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Multi-gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/25 pointer-events-none" />

                {/* Top Control Bar Overlaid on Image */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20">
                  {/* Category Pill */}
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                    {currentSlide.category} · Showcase
                  </span>

                  {/* Play/Pause & Slide Navigation Count */}
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/20 text-white text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-0.5 hover:text-[#C2A26F] transition-colors cursor-pointer mr-1"
                      title={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
                      aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                    <span className="text-[#C2A26F] font-bold">{currentSlide.slideNumber}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/80">0{CAROUSEL_SLIDES.length}</span>
                  </div>
                </div>

                {/* Carousel Navigation Arrows */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Overlaid Live Product Details Badge (Bottom of Image) */}
                <div className="absolute bottom-3.5 left-4 right-4 z-20 text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="bg-black/60 backdrop-blur-md border border-white/15 p-3.5 sm:p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#C2A26F] font-semibold block">
                            {currentSlide.eyebrow}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-white font-heading">
                            {currentSlide.title}
                          </h3>
                          <p className="text-[11px] text-neutral-300">
                            {currentSlide.specSummary}
                          </p>
                        </div>

                        {/* Live Pricing Callout & Action */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0 gap-1.5 shrink-0">
                          <div className="text-right">
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-mono">
                              {currentSlide.bulkPrice ? 'Dual Rate' : 'Direct Unit'}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-white font-mono">
                              {formatKES(currentSlide.unitPrice)}
                              <span className="text-[11px] text-[#C2A26F] font-normal ml-0.5">
                                /{currentSlide.unitLabel}
                              </span>
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleInspectActive}
                            className="px-3 py-1.5 bg-white text-neutral-950 hover:bg-[#C2A26F] hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect Specimen</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Interactive Thumbnail Ribbon (Direct Click to Switch Slides) */}
              <div className="p-3 bg-white border-t border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#C2A26F] rounded-full"></span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold">
                      Curated Flagship Lineup
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    Select to Jump
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {CAROUSEL_SLIDES.map((slide, idx) => {
                    const isSelected = activeIndex === idx;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-4/3 overflow-hidden border transition-all text-left group/thumb cursor-pointer ${
                          isSelected
                            ? 'border-neutral-950 ring-2 ring-neutral-950 ring-offset-1'
                            : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                        }`}
                        title={slide.title}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={`absolute inset-0 transition-opacity ${
                            isSelected ? 'bg-transparent' : 'bg-black/35 group-hover/thumb:bg-black/15'
                          }`}
                        />
                        <span className="absolute bottom-0.5 left-1 text-[9px] font-mono font-bold text-white drop-shadow-sm">
                          {slide.slideNumber}
                        </span>
                        {isSelected && (
                          <span className="absolute top-0.5 right-1 w-1.5 h-1.5 bg-[#C2A26F] rounded-full"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collapsible / Expandable Dual Pricing Engine (Optional interactive explorer) */}
              {showDualPricingDemo && currentSlide.bulkPrice && (
                <div className="p-4 bg-[#FAF9F7] border-t border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C2A26F]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-950 font-heading">
                        Dual Pricing Simulation · {currentSlide.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDualPricingDemo(false)}
                      className="text-[10px] font-mono text-neutral-500 hover:text-neutral-900 uppercase cursor-pointer"
                    >
                      Close ✕
                    </button>
                  </div>

                  {/* Mode Toggles */}
                  <div className="flex items-center p-0.5 bg-[#EAE8E2] text-xs">
                    <button
                      type="button"
                      onClick={() => setHeroPricingMode('coverage')}
                      className={`flex-1 py-1 px-2.5 text-center text-[11px] font-semibold transition-all cursor-pointer ${
                        heroPricingMode === 'coverage'
                          ? 'bg-white text-neutral-950 shadow-2xs font-bold'
                          : 'text-neutral-600 hover:text-neutral-950'
                      }`}
                    >
                      Order by Coverage (m²)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroPricingMode('box')}
                      className={`flex-1 py-1 px-2.5 text-center text-[11px] font-semibold transition-all cursor-pointer ${
                        heroPricingMode === 'box'
                          ? 'bg-white text-neutral-950 shadow-2xs font-bold'
                          : 'text-neutral-600 hover:text-neutral-950'
                      }`}
                    >
                      Order by Factory Box
                    </button>
                  </div>

                  {heroPricingMode === 'coverage' ? (
                    <div className="space-y-2 bg-white p-3 border border-neutral-200 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600 text-[11px]">Required Floor Area:</span>
                        <div className="flex items-center gap-1 font-bold text-neutral-950 font-mono">
                          <span>{heroCoverage}</span>
                          <span className="text-neutral-500 font-normal">m² (+10% cut)</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        value={heroCoverage}
                        onChange={(e) => setHeroCoverage(Number(e.target.value))}
                        className="w-full accent-[#0A0A0A] h-1.5 bg-neutral-200 cursor-pointer"
                      />
                      <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-xs">
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            Cartons Required:
                          </span>
                          <span className="font-bold text-neutral-950">
                            {demoBoxesFromCoverage} Boxes{' '}
                            <span className="text-neutral-500 font-normal text-[11px]">
                              ({(demoBoxesFromCoverage * currentSqmPerBox).toFixed(2)} m²)
                            </span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            Calculated Total:
                          </span>
                          <span className="font-bold text-neutral-950 text-sm">
                            {formatKES(demoTotalFromCoverage)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 bg-white p-3 border border-neutral-200 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600 text-[11px]">Direct Box Quantity:</span>
                        <div className="flex items-center gap-1 font-bold text-neutral-950 font-mono">
                          <span>{heroBoxes}</span>
                          <span className="text-neutral-500 font-normal">Boxes</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        step="1"
                        value={heroBoxes}
                        onChange={(e) => setHeroBoxes(Number(e.target.value))}
                        className="w-full accent-[#0A0A0A] h-1.5 bg-neutral-200 cursor-pointer"
                      />
                      <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-xs">
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            Delivered Area:
                          </span>
                          <span className="font-bold text-neutral-950">
                            {demoCoverageFromBoxes} m²
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            Calculated Total:
                          </span>
                          <span className="font-bold text-neutral-950 text-sm">
                            {formatKES(demoTotalFromBoxes)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM: 3 Foundation Category Cards (Surface, Water, Power) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-10 border-t border-neutral-200/80">
          <button
            type="button"
            onClick={() => {
              onSelectCategory('Tiles');
              onExploreClick();
            }}
            className={`p-5 bg-white border text-left transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-sm ${
              currentSlide.category === 'Tiles'
                ? 'border-neutral-950 ring-1 ring-neutral-950/10'
                : 'border-neutral-200/80 hover:border-neutral-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[#C2A26F] text-[11px] font-mono uppercase tracking-wider font-semibold">
                01 · Surface Slabs
              </span>
              {currentSlide.category === 'Tiles' && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-white uppercase">
                  Active in Carousel
                </span>
              )}
            </div>
            <div className="text-base font-bold text-neutral-950 mt-1 font-heading group-hover:text-neutral-700 transition-colors">
              Porcelain Tiles
            </div>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              60×60, 60×120 & 120×240 cm rectified European-grade slabs with dual SQM and box pricing.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectCategory('Sanitaryware');
              onExploreClick();
            }}
            className={`p-5 bg-white border text-left transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-sm ${
              currentSlide.category === 'Sanitaryware'
                ? 'border-neutral-950 ring-1 ring-neutral-950/10'
                : 'border-neutral-200/80 hover:border-neutral-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[#C2A26F] text-[11px] font-mono uppercase tracking-wider font-semibold">
                02 · Water & Wellness
              </span>
              {currentSlide.category === 'Sanitaryware' && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-white uppercase">
                  Active in Carousel
                </span>
              )}
            </div>
            <div className="text-base font-bold text-neutral-950 mt-1 font-heading group-hover:text-neutral-700 transition-colors">
              Sanitaryware
            </div>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              PVD gun grey piano showers, composite resin tubs, and rimless wall-hung smart bidet toilets.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectCategory('Electrical');
              onExploreClick();
            }}
            className={`p-5 bg-white border text-left transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-sm ${
              currentSlide.category === 'Electrical'
                ? 'border-neutral-950 ring-1 ring-neutral-950/10'
                : 'border-neutral-200/80 hover:border-neutral-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[#C2A26F] text-[11px] font-mono uppercase tracking-wider font-semibold">
                03 · Architectural Power
              </span>
              {currentSlide.category === 'Electrical' && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-white uppercase">
                  Active in Carousel
                </span>
              )}
            </div>
            <div className="text-base font-bold text-neutral-950 mt-1 font-heading group-hover:text-neutral-700 transition-colors">
              Fittings & Switches
            </div>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              British-standard 40A DP cooker switches, brushed champagne dimmers, and 45W Type-C sockets.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
