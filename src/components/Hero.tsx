import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
  category: 'Tiles' | 'Sanitaryware' | 'Electrical';
  slideNumber: string;
  titleLine1: string;
  titleLine2: string;
  buttonText: string;
  image: string;
}

const CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'sanitary-suite',
    category: 'Sanitaryware',
    slideNumber: '01',
    titleLine1: 'TAKE A LOOK',
    titleLine2: 'AT OUR SANITARY WARE',
    buttonText: 'View Sanitary Ware',
    image: '/products/bathtub-black.jpg',
  },
  {
    id: 'tiles-statuario',
    category: 'Tiles',
    slideNumber: '02',
    titleLine1: 'EXPLORE OUR',
    titleLine2: 'PORCELAIN TILES',
    buttonText: 'View Porcelain Tiles',
    image: '/products/tile-statuario.jpg',
  },
  {
    id: 'tiles-large-format',
    category: 'Tiles',
    slideNumber: '03',
    titleLine1: 'DISCOVER OUR',
    titleLine2: 'LARGE FORMAT SLABS',
    buttonText: 'View Tile Slabs',
    image: '/products/tile-slab-61238.jpg',
  },
  {
    id: 'sanitary-shower',
    category: 'Sanitaryware',
    slideNumber: '04',
    titleLine1: 'EXPERIENCE OUR',
    titleLine2: 'DESIGNER SHOWERS',
    buttonText: 'View Shower Suites',
    image: '/products/shower-piano.jpg',
  },
  {
    id: 'electrical-fittings',
    category: 'Electrical',
    slideNumber: '05',
    titleLine1: 'ARCHITECTURAL',
    titleLine2: 'ELECTRICAL FITTINGS',
    buttonText: 'View Electrical Range',
    image: '/products/switch-40a.jpg',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSelectCategory,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload all slide images into memory immediately on mount so transitions are instant
  useEffect(() => {
    CAROUSEL_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Automatic slideshow timer (3.5 seconds per slide for a fast, dynamic presentation)
  const SLIDE_INTERVAL = 3500;
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const currentSlide = CAROUSEL_SLIDES[activeIndex];

  const handleButtonClick = (category: string) => {
    onSelectCategory(category);
    onExploreClick();
  };

  return (
    <div className="relative w-full bg-neutral-950">
      
      {/* ========================================================
          FULL-SCREEN BLEED HERO SECTION (Bikomax Architectural Style)
          - Crystal clear, vibrant photographic images
          - Minimalist headline + single clean action button
          - Seamless image cross-fade with ZERO black flash
         ======================================================== */}
      <section
        className="relative w-full h-[76vh] sm:h-[82vh] min-h-[520px] max-h-[820px] overflow-hidden select-none group"
      >
        {/* Subtle Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-30 overflow-hidden">
          <div
            key={activeIndex}
            style={{ animation: `heroProgress ${SLIDE_INTERVAL}ms linear forwards` }}
            className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          />
        </div>

        {/* Preloaded, Stacked Cross-Fade Background Images */}
        <div className="absolute inset-0 bg-neutral-900">
          {CAROUSEL_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.titleLine2}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Subtle soft vignette only at bottom & left edge so text is crisp while image remains bright and crystal clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Minimalist Slide Counter (Top Right) */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20 text-white/80 font-heading text-xs tracking-widest bg-black/30 backdrop-blur-xs px-3 py-1 rounded-xs border border-white/10">
          <span className="text-white font-bold">{currentSlide.slideNumber}</span>
          <span className="mx-1 text-white/40">/</span>
          <span>0{CAROUSEL_SLIDES.length}</span>
        </div>

        {/* Bikomax Minimalist Typography & Button (Bottom-Left) */}
        <div className="absolute bottom-12 sm:bottom-16 lg:bottom-20 left-6 sm:left-12 lg:left-16 z-20 max-w-xl space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wider font-heading leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            <span className="font-light block">{currentSlide.titleLine1}</span>
            <span className="font-bold block">{currentSlide.titleLine2}</span>
          </h1>

          <div>
            <button
              type="button"
              onClick={() => handleButtonClick(currentSlide.category)}
              className="px-7 py-3 sm:px-9 sm:py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 active:scale-98 text-white text-xs sm:text-sm font-nav font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-amber-500/30 rounded-xs flex items-center gap-2 group/btn"
            >
              <span>{currentSlide.buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows (Subtle on desktop, visible on hover) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-black/60 text-white border border-white/20 backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/25 hover:bg-black/60 text-white border border-white/20 backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Minimal Slide Progress Dots (Bottom Center) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex
                  ? 'w-7 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

    </div>
  );
};
