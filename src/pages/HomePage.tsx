import React from 'react';
import { Product } from '../types';
import { Hero } from '../components/Hero';
import { CollectionsCarousel } from '../components/CollectionsCarousel';
import { SpcFlooringSection } from '../components/SpcFlooringSection';
import { EditorialInspirationBlocks } from '../components/EditorialInspirationBlocks';
import { LooksBrowser } from '../components/LooksBrowser';
import { RoomVisualizerSection } from '../components/RoomVisualizerSection';
import { DestinationGrid } from '../components/DestinationGrid';
import { AdvancedTileFinder } from '../components/AdvancedTileFinder';
import { ShowroomsSpotlight } from '../components/ShowroomsSpotlight';
import { ProjectsSection } from '../components/ProjectsSection';
import { AnimatedReveal, ScrollRevealText, PatternDivider } from '../components/AnimatedReveal';
import { Ruler, Boxes, ArrowRight, Calculator, Compass } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  onNavigateToCatalogue: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToTrade: () => void;
  onOpenCalculator: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCalculatorWithProduct: (product: Product) => void;
  onSelectCategory: (category: string) => void;
  onOpenSimulatorModal?: (tileRef?: string, roomId?: string) => void;
  onFilterCatalogue?: (filters: {
    category?: string;
    technology?: string;
    look?: string;
    destination?: string;
    size?: string;
  }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigateToCatalogue,
  onNavigateToAbout,
  onNavigateToContact,
  onNavigateToTrade,
  onOpenCalculator,
  onSelectProduct,
  onOpenCalculatorWithProduct,
  onSelectCategory,
  onOpenSimulatorModal,
  onFilterCatalogue,
}) => {
  const handleApplyFilter = (filters: {
    category?: string;
    technology?: string;
    look?: string;
    destination?: string;
    size?: string;
  }) => {
    if (onFilterCatalogue) {
      onFilterCatalogue(filters);
    } else {
      if (filters.category) onSelectCategory(filters.category);
      onNavigateToCatalogue();
    }
  };

  return (
    <div className="bg-[#FAFAFA] text-neutral-950 font-sans">
      
      {/* 1. EDITORIAL HERO STAGE: Full ambient architectural slider & dual pricing */}
      <Hero
        products={products}
        onSelectProduct={onSelectProduct}
        onExploreClick={onNavigateToCatalogue}
        onOpenCalculator={onOpenCalculator}
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          onNavigateToCatalogue();
        }}
      />

      {/* 2. BIKOMAX "CHOOSE YOUR SPACE" DESTINATION MOSAIC */}
      <DestinationGrid
        onSelectDestination={(dest) => handleApplyFilter({ destination: dest })}
      />

      {/* 3. BIKOMAX "FEATURED COLLECTIONS" HORIZONTAL CAROUSEL */}
      <CollectionsCarousel
        products={products}
        onSelectProduct={onSelectProduct}
        onExploreCatalogue={onNavigateToCatalogue}
      />

      {/* 4. DEDICATED SPC RIGID CORE LUXURY VINYL FLOORING SECTION */}
      <SpcFlooringSection
        products={products}
        onSelectProduct={onSelectProduct}
        onExploreCatalogue={(filter) => {
          if (onFilterCatalogue) {
            onFilterCatalogue({ category: filter?.category || 'SPC Flooring' });
          } else {
            onSelectCategory('SPC Flooring');
            onNavigateToCatalogue();
          }
        }}
        onOpenCalculatorWithProduct={onOpenCalculatorWithProduct}
      />

      {/* 4. DUAL PRICING ARCHITECTURAL EXPLAINER (Square Meter & Bulk Box) */}
      <section className="relative py-20 sm:py-28 border-b border-neutral-200/80 bg-white overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-arch-grid opacity-35 pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <AnimatedReveal delay={0.05}>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-600 font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Procurement Standard</span>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.12}>
                <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 leading-tight">
                  Dual Pricing: <br />
                  <span className="font-semibold text-neutral-900">Square Meter</span> & <span className="font-semibold text-amber-600">Bulk Box</span>
                </h2>
              </AnimatedReveal>

              <ScrollRevealText
                text="Architectural estimation begins with square meters from site blueprints, but factory palletizing demands sealed whole cartons to protect rectified porcelain edges. Bikomax computes both metrics in real-time with an intelligent +10% cutting wastage allowance."
                className="text-sm text-neutral-600 leading-relaxed"
                delay={0.2}
              />

              <div className="space-y-3.5 pt-2 text-xs text-neutral-700">
                <AnimatedReveal delay={0.25}>
                  <div className="flex items-start gap-3.5 p-4 bg-[#FAF9F7] border border-neutral-200/80 hover:border-neutral-950 transition-colors">
                    <Ruler className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 block font-semibold">Area Metric (m²):</strong>
                      <span className="text-neutral-500 leading-relaxed">
                        Matches your quantity surveyor schedules and Bill of Quantities (BQ) floor plans directly.
                      </span>
                    </div>
                  </div>
                </AnimatedReveal>

                <AnimatedReveal delay={0.35}>
                  <div className="flex items-start gap-3.5 p-4 bg-[#FAF9F7] border border-neutral-200/80 hover:border-neutral-950 transition-colors">
                    <Boxes className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 block font-semibold">Factory Box Packaging:</strong>
                      <span className="text-neutral-500 leading-relaxed">
                        Calculates exact whole cartons needed, plus recommended +10% tile cutting allowance for perimeter trims.
                      </span>
                    </div>
                  </div>
                </AnimatedReveal>
              </div>

              <AnimatedReveal delay={0.45} className="pt-2">
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-amber-500" />
                  <span>Launch Multi-Room Coverage Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </AnimatedReveal>
            </div>

            {/* Specimen Card */}
            <AnimatedReveal delay={0.25} direction="left" className="lg:col-span-6">
              <div className="bg-[#121212] bg-arch-dark-grid text-white p-7 sm:p-9 border border-neutral-800 shadow-2xl space-y-6 relative">
                <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest uppercase text-neutral-500 border border-neutral-800 px-2 py-0.5">
                  CALIBRATED ALGORITHM
                </div>

                <div className="border-b border-neutral-800 pb-3">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-amber-400 block font-semibold">
                    Interactive Calculation Sample
                  </span>
                  <span className="text-sm font-medium text-neutral-200 mt-0.5 block">
                    Model 66008 Matte Porcelain (60×60 cm)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-900/90 border border-neutral-800">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                      Normal Area Rate
                    </span>
                    <div className="text-2xl font-bold font-heading mt-1">
                      KES 2,870
                    </div>
                    <span className="text-xs text-neutral-400">per Square Meter (m²)</span>
                  </div>

                  <div className="p-4 bg-neutral-900/90 border border-neutral-800">
                    <span className="text-[10px] uppercase font-mono text-amber-400 block font-bold">
                      Factory Box Rate
                    </span>
                    <div className="text-2xl font-bold font-heading mt-1 text-amber-400">
                      KES 4,132.80
                    </div>
                    <span className="text-xs text-neutral-400">per Box (1.44 m²/box)</span>
                  </div>
                </div>

                <div className="p-3.5 bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 space-y-1 font-mono">
                  <div className="text-neutral-400">
                    Formula: Net 25.0 m² + 10% Wastage = 27.5 m² required.
                  </div>
                  <div className="text-emerald-400 font-bold">
                    = 20 Full Boxes (28.8 m² delivered) @ KES 4,132.80 = KES 82,656 total.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="w-full py-3.5 bg-white hover:bg-amber-50 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs group/cat"
                >
                  <span>Experience Dual Pricing on Full Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 transition-transform group-hover/cat:translate-x-1" />
                </button>
              </div>
            </AnimatedReveal>

          </div>
        </div>
      </section>

      {/* 4. BIKOMAX "FIND YOUR INSPIRATION" EDITORIAL SPLIT-BLOCKS */}
      <EditorialInspirationBlocks
        onNavigateToCategory={(techFilter) => handleApplyFilter({ technology: techFilter })}
      />

      {/* 5. BIKOMAX "SEARCH BY LOOK" (Marble, Wood, Stone, Concrete, Sugar Effect, Terrazzo) */}
      <LooksBrowser
        onSelectLook={(look) => handleApplyFilter({ look })}
      />

      {/* 6. BIKOMAX ROOM CONFIGURATOR / VISUALIZER */}
      <RoomVisualizerSection
        products={products}
        onOpenCalculatorWithProduct={onOpenCalculatorWithProduct}
        onExploreCatalogue={onNavigateToCatalogue}
        onOpenSimulatorModal={onOpenSimulatorModal}
      />

      {/* 7. BIKOMAX ADVANCED ARCHITECTURAL TILE FINDER (4-step dropdown search) */}
      <AdvancedTileFinder
        products={products}
        onApplyAdvancedFilter={(filters) => handleApplyFilter(filters)}
      />

      {/* 9. BIKOMAX SHOWROOM & DESIGN CENTER SPOTLIGHT */}
      <ShowroomsSpotlight
        onNavigateToContact={onNavigateToContact}
        onNavigateToTrade={onNavigateToTrade}
      />

      {/* 10. BIKOMAX PROJECTS SECTION (Landmark Villas & Commercial Plazas) */}
      <ProjectsSection
        onExploreProjects={onNavigateToTrade}
      />

    </div>
  );
};
