import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreCatalogue: () => void;
}

export const CollectionsCarousel: React.FC<CollectionsCarouselProps> = ({
  products,
  onSelectProduct,
  onExploreCatalogue,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef<boolean>(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Filter products that represent signature tile collections
  const tileCollections = products.filter((p) => p.category === 'Tiles');

  // Duplicate items to ensure a seamless, endless wrap
  const displayList = tileCollections.length > 0
    ? (tileCollections.length < 8
        ? [...tileCollections, ...tileCollections, ...tileCollections, ...tileCollections]
        : [...tileCollections, ...tileCollections])
    : [];

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    isPausedRef.current = true;
    setIsHovered(true);

    const halfWidth = container.scrollWidth / 2;
    const scrollAmount = 320;

    if (direction === 'left' && container.scrollLeft <= 20 && halfWidth > 0) {
      container.scrollLeft += halfWidth;
    }

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
      setIsHovered(false);
    }, 2200);
  };

  // Silky smooth continuous 60fps automatic glide
  useEffect(() => {
    let animationFrameId: number;
    const container = scrollRef.current;
    if (!container || displayList.length === 0) return;

    const glideSpeed = 0.85; // 0.85px per frame = approx 50px/sec, perfectly tranquil and readable

    const glide = () => {
      if (!isPausedRef.current && container) {
        container.scrollLeft += glideSpeed;

        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(glide);
    };

    animationFrameId = requestAnimationFrame(glide);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [displayList.length]);

  return (
    <section className="py-7 sm:py-9 bg-[#FAF9F7] border-b border-neutral-200/80 overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header: Featured Collections with animated entry */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-700 font-semibold mb-1">
              <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
              <span>Bikomax Architectural Series</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950 tracking-tight">
              <strong>Featured</strong> Collections
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Curated luxury surfaces engineered for timeless aesthetics and seamless interior styling.
            </p>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              className="p-2 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-800 hover:text-black transition-colors cursor-pointer shadow-xs rounded-xs"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              className="p-2 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-800 hover:text-black transition-colors cursor-pointer shadow-xs rounded-xs"
              aria-label="Next collection"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Endless Smooth Moving Carousel Container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => {
            isPausedRef.current = true;
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
            setIsHovered(false);
          }}
          onTouchStart={() => {
            isPausedRef.current = true;
            setIsHovered(true);
          }}
          onTouchEnd={() => {
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = window.setTimeout(() => {
              isPausedRef.current = false;
              setIsHovered(false);
            }, 1500);
          }}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 pt-1 scrollbar-none select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayList.map((product, idx) => (
            <motion.div
              key={`${product.ref}-stream-${idx}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="w-[240px] sm:w-[270px] md:w-[290px] shrink-0 bg-white border border-neutral-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer overflow-hidden rounded-xs"
              onClick={() => onSelectProduct(product)}
            >
              {/* Image Frame without any cm badge */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle vignette gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Clean Card Details: tight padding, no prices, no cm */}
              <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-700 uppercase block font-semibold mb-0.5">
                    {product.collection || (product.look ? `${product.look} Series` : 'Signature Series')}
                  </span>
                  <h3 className="text-neutral-900 text-sm font-bold font-heading group-hover:text-amber-700 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5 font-sans line-clamp-1">
                    {[product.finish, product.technology, product.surfaceType].filter(Boolean).slice(0, 2).join(' • ')}
                  </p>
                </div>

                {/* Minimalist Explore Link with animated arrow */}
                <div className="pt-2 mt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-900 group-hover:text-amber-700 transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>

              {/* Bottom animated accent bar on hover */}
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center mt-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreCatalogue}
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-neutral-950 hover:bg-neutral-950 hover:text-white text-neutral-950 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-xs rounded-xs"
          >
            <span>View All Architectural Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
