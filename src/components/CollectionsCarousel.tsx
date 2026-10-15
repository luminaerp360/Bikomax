import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Layers } from 'lucide-react';

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

  // Filter products that represent signature tile collections
  const tileCollections = products.filter((p) => p.category === 'Tiles');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F7] border-b border-neutral-200/80 overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header matching Cleopatra's "Featured Collections" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C2A26F] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cleopatra Spec Architectural Series</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 tracking-tight">
              <strong>Featured</strong> Collections
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
              Let Bikomax collections inspire you. Choose the effect, surface texture or destination and start envisioning your space.
            </p>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="p-3 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-800 hover:text-black transition-colors cursor-pointer shadow-xs"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="p-3 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-800 hover:text-black transition-colors cursor-pointer shadow-xs"
              aria-label="Next collection"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tileCollections.map((product) => (
            <motion.div
              key={product.ref}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-[300px] sm:w-[360px] shrink-0 bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer snap-start"
              onClick={() => onSelectProduct(product)}
            >
              {/* Image Frame with Aspect Ratio */}
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Shimmer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Overlaid Title on Image */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block font-semibold">
                    {product.collection || 'Signature Series'}
                  </span>
                  <h3 className="text-white text-base font-bold font-heading truncate drop-shadow-xs">
                    {product.name}
                  </h3>
                </div>

                {/* Dimension Badge */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 border border-white/20">
                  {product.dimension}
                </div>
              </div>

              {/* Cleopatra Collections Recap Bar */}
              <div className="p-4 border-b border-neutral-100 bg-[#FCFBF9]">
                <ul className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  <li className="text-neutral-900 font-bold">{product.technology || 'PORCELAIN'}</li>
                  <span className="text-neutral-300">·</span>
                  <li className="text-[#C2A26F] font-bold">{product.look ? `${product.look} LOOK` : 'TEXTURED'}</li>
                  <span className="text-neutral-300">·</span>
                  <li>{product.surfaceType || 'FLOOR & WALL'}</li>
                </ul>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Pricing Summary */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      Area Metric
                    </span>
                    <span className="text-sm font-bold text-neutral-950 font-heading">
                      {formatKES(product.price_per_sqm || 0)}
                      <span className="text-[10px] font-normal text-neutral-500"> / m²</span>
                    </span>
                  </div>

                  {product.bulk_price_per_box && (
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#C2A26F] block font-semibold">
                        Carton Rate
                      </span>
                      <span className="text-sm font-bold text-[#C2A26F] font-heading">
                        {formatKES(product.bulk_price_per_box)}
                        <span className="text-[10px] font-normal text-neutral-500"> / box</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* View Details CTA */}
                <button
                  type="button"
                  className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group-hover:bg-[#C2A26F] group-hover:text-neutral-950"
                >
                  <span>Inspect Surface</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={onExploreCatalogue}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-neutral-950 hover:bg-neutral-950 hover:text-white text-neutral-950 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-xs"
          >
            <span>View All Architectural Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
