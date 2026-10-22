import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';

interface LooksBrowserProps {
  onSelectLook: (look: string) => void;
}

interface LookCategory {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  count: string;
}

const LOOK_CATEGORIES: LookCategory[] = [
  {
    id: 'Marble',
    name: 'Marble',
    subtitle: 'Classic Italian Carrara & Calacatta veinings',
    image: '/products/tile-calacatta-gold.jpg',
    count: '6 Collections',
  },
  {
    id: 'Wood',
    name: 'Wood',
    subtitle: 'Tactile parquet & Scandinavian oak grain',
    image: '/products/tile-wood-rover.jpg',
    count: '4 Collections',
  },
  {
    id: 'Stone',
    name: 'Stone',
    subtitle: 'Honed basalt, limestone & granite textures',
    image: '/products/tile-matte-66008.jpg',
    count: '5 Collections',
  },
  {
    id: 'Pattern',
    name: 'Pattern & Terrazzo',
    subtitle: 'Artisanal speckled terrazzo & decorative reliefs',
    image: '/products/tile-terrazzo.jpg',
    count: '3 Collections',
  },
  {
    id: 'Concrete',
    name: 'Concrete',
    subtitle: 'Minimal loft industrial cement tones',
    image: '/products/tile-paver-grigio.jpg',
    count: '3 Collections',
  },
  {
    id: 'Sugar Effect',
    name: 'Crystal & Sugar Effect',
    subtitle: 'Micro-reflective diamond luster finishes',
    image: '/products/tile-statuario.jpg',
    count: '4 Collections',
  },
];

export const LooksBrowser: React.FC<LooksBrowserProps> = ({ onSelectLook }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#101010] text-white overflow-hidden relative border-b border-neutral-800">
      {/* Background Architectural Blueprint Line Grid */}
      <div className="absolute inset-0 bg-arch-dark-grid opacity-30 pointer-events-none" />

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Material Aesthetics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-heading text-white tracking-tight">
            Search by <strong>look</strong>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
            From the organic warmth of French oak parquet to luminous Carrara marble veins and flamed exterior stones. Select your architectural essence.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {LOOK_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelectLook(cat.id)}
              className="group relative aspect-4/5 sm:aspect-3/4 rounded-none overflow-hidden cursor-pointer border border-neutral-800 hover:border-amber-500 transition-all duration-300 shadow-xl"
            >
              {/* Background Image with Zoom */}
              <img
                src={cat.image}
                alt={`${cat.name} Look Tiles`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

              {/* Top pill counter */}
              <div className="absolute top-3 left-3 text-[9px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-amber-300">
                {cat.count}
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-3 right-3 text-left">
                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase block font-semibold">
                  Aesthetic
                </span>
                <h3 className="text-white text-base sm:text-lg font-bold font-heading group-hover:text-amber-100 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5 hidden sm:block">
                  {cat.subtitle}
                </p>

                <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
