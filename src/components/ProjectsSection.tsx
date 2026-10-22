import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Home } from 'lucide-react';

interface ProjectsSectionProps {
  onExploreProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onExploreProjects }) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-neutral-200/80 overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-600 font-bold block mb-1">
              Portfolio & Track Record
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 tracking-tight">
              <strong>Architectural</strong> Projects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl leading-relaxed">
              Bikomax collections satisfy the technical and visual demands of premier architectural developments, custom villas, boutique hospitality, and commercial towers across Kenya.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreProjects}
            className="text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 transition-colors flex items-center gap-1.5 cursor-pointer group shrink-0"
          >
            <span>View All Landmark Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2 Big Project Spreads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Project 1: Residential Villas */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={onExploreProjects}
            className="group relative aspect-16/10 overflow-hidden bg-neutral-900 border border-neutral-200 cursor-pointer shadow-md"
          >
            <img
              src="/products/tile-calacatta-gold.jpg"
              alt="Luxury Residential Villas Tiled with Bikomax"
              className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-300">
                <Home className="w-3.5 h-3.5" />
                <span>Private Residences · Elgon View & Nairobi</span>
              </div>
              <h3 className="text-2xl font-bold font-heading">
                Luxury Residential Villas
              </h3>
              <p className="text-xs text-neutral-300 font-normal line-clamp-2">
                Seamless Calacatta Gold and French oak parquet porcelain floors supplied with custom-cut step treads and matched skirting.
              </p>
              <div className="pt-2 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Project 2: Commercial & Hospitality */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={onExploreProjects}
            className="group relative aspect-16/10 overflow-hidden bg-neutral-900 border border-neutral-200 cursor-pointer shadow-md"
          >
            <img
              src="/products/tile-nero-marquina.jpg"
              alt="Commercial Plazas & Hospitality Projects"
              className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-300">
                <Building2 className="w-3.5 h-3.5" />
                <span>Hospitality & Retail · Western Kenya</span>
              </div>
              <h3 className="text-2xl font-bold font-heading">
                Commercial & Hospitality Suites
              </h3>
              <p className="text-xs text-neutral-300 font-normal line-clamp-2">
                Monolithic 120×240 cm sintered slabs and PEI 5 heavy-traffic porcelain specified for corporate lobbies and boutique guest rooms.
              </p>
              <div className="pt-2 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
