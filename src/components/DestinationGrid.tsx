import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';

interface DestinationGridProps {
  onSelectDestination: (destination: string) => void;
}

interface DestinationCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  spanClass: string;
}

const DESTINATIONS: DestinationCard[] = [
  {
    id: 'Bathroom',
    title: 'Bathroom',
    subtitle: 'Spa-grade moisture-impervious porcelain & vanity wall finishes',
    image: '/products/tile-statuario.jpg',
    spanClass: 'md:col-span-6 md:row-span-2 min-h-[380px] sm:min-h-[480px]',
  },
  {
    id: 'Living',
    title: 'Living Room',
    subtitle: 'Continuous seamless slabs creating luminous expansive volume',
    image: '/products/tile-calacatta-gold.jpg',
    spanClass: 'md:col-span-6 min-h-[240px]',
  },
  {
    id: 'Kitchen',
    title: 'Kitchen',
    subtitle: 'Stain, heat and oil-impervious glazed ceramic & porcelain',
    image: '/products/tile-terrazzo.jpg',
    spanClass: 'md:col-span-6 min-h-[240px]',
  },
  {
    id: 'Bedroom',
    title: 'Bedroom',
    subtitle: 'Warm parquet wood planks with organic oak tactile relief',
    image: '/products/tile-wood-rover.jpg',
    spanClass: 'md:col-span-4 min-h-[240px]',
  },
  {
    id: 'Outdoor',
    title: 'Outdoor & Pool',
    subtitle: '20mm heavy duty pavers with R11 all-weather grip',
    image: '/products/tile-paver-grigio.jpg',
    spanClass: 'md:col-span-4 min-h-[240px]',
  },
  {
    id: 'Commercial',
    title: 'Commercial',
    subtitle: 'PEI 5 monolithic abrasion resistance for lobbies & retail',
    image: '/products/tile-nero-marquina.jpg',
    spanClass: 'md:col-span-4 min-h-[240px]',
  },
];

export const DestinationGrid: React.FC<DestinationGridProps> = ({ onSelectDestination }) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-neutral-200/80">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C2A26F] font-bold block mb-2">
            Architectural Spaces
          </span>
          <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 tracking-tight">
            Search your <strong>destination</strong>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
            Every architectural room has distinct technical demands—from anti-slip ratings in wet en-suites to compressive strength on sun-drenched outdoor terraces.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {DESTINATIONS.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelectDestination(dest.id)}
              className={`relative overflow-hidden group cursor-pointer border border-neutral-200/90 shadow-sm hover:shadow-2xl transition-all ${dest.spanClass}`}
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={`${dest.title} Tiles`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
                loading="lazy"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors" />

              {/* Text content */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#C2A26F] uppercase block font-semibold">
                  Destination of Use
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading">
                  {dest.title}
                </h3>
                <p className="text-xs text-neutral-300 font-normal line-clamp-2 max-w-md">
                  {dest.subtitle}
                </p>

                <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#C2A26F] transition-colors">
                  <span>View Collections</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
