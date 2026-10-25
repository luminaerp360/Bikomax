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
import { Ruler, Boxes, ArrowRight, Calculator, Compass, ShieldCheck, Check, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';

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

      {/* 4. ARCHITECTURAL DUAL SPECIFICATION EXPLAINER (Square Meter & Bulk Box Packaging) */}
      <section className="relative py-10 sm:py-14 border-b border-neutral-200/80 bg-[#FAF9F6] overflow-hidden">
        {/* Subtle architectural grid backdrop */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-arch-grid opacity-30 pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-4">
              <AnimatedReveal delay={0.05}>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/25 text-[10px] font-mono uppercase tracking-widest text-amber-700 font-semibold rounded-full">
                  <Compass className="w-3 h-3 text-amber-600" />
                  <span>Procurement & Packaging Standard</span>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.1}>
                <h2 className="text-2xl sm:text-3xl font-heading text-neutral-950 leading-tight tracking-tight">
                  Dual Specification: <br className="hidden sm:inline" />
                  <span className="font-semibold text-neutral-900">Square Meter</span> &amp;{' '}
                  <span className="font-semibold text-amber-600">Bulk Box Packaging</span>
                </h2>
              </AnimatedReveal>

              <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">
                Architectural estimation starts with net square meters from site blueprints, while factory palletizing requires sealed cartons to safeguard rectified porcelain edges. Bikomax computes both dimensions in real-time with an intelligent +10% cutting wastage allowance.
              </p>

              {/* Compact side-by-side metric cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <strong className="text-xs font-semibold text-neutral-950">Area Metric (m²)</strong>
                    </div>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-200/70">Blueprint</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    Matches your Quantity Surveyor schedules and Bill of Quantities (BQ) floor plans.
                  </p>
                </div>

                <div className="p-3 bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <Boxes className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <strong className="text-xs font-semibold text-neutral-950">Bulk Packaging</strong>
                    </div>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/70">Edge Safe</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    Sealed whole cartons with integrated +10% cutting margin for perimeter trims.
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-950 hover:bg-amber-600 text-white text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer group/btn"
                >
                  <Calculator className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-white transition-colors" />
                  <span>Launch Coverage Calculator</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Specimen Console (Compact, No Prices) */}
            <AnimatedReveal delay={0.2} direction="left" className="lg:col-span-6">
              <div className="bg-[#0D0F12] bg-arch-dark-grid text-white p-5 sm:p-6 border border-neutral-800 shadow-xl space-y-4 relative arch-crosshair">
                
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b border-neutral-800/80 pb-3 flex-wrap">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 block font-semibold">
                      Quantification Specimen
                    </span>
                    <span className="text-xs font-medium text-neutral-200 mt-0.5 block">
                      Model 66008 Matte Porcelain (60×60 cm)
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Calibrated Yield</span>
                  </div>
                </div>

                {/* Dual Metric Comparison (Area vs Packaging) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Metric 1: Blueprint Area */}
                  <div className="p-3 bg-neutral-900/90 border border-neutral-800">
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase text-neutral-400">
                      <span>Blueprint Net Area</span>
                      <Ruler className="w-3 h-3 text-neutral-500" />
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-heading text-white">25.0</span>
                      <span className="text-[11px] font-mono text-neutral-400">m² Net</span>
                    </div>
                    <div className="mt-1 text-[10px] text-neutral-400 font-mono">
                      +10% Wastage = 27.5 m²
                    </div>
                  </div>

                  {/* Metric 2: Delivered Factory Packaging */}
                  <div className="p-3 bg-gradient-to-br from-neutral-900/90 to-amber-950/20 border border-amber-500/30">
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase text-amber-400 font-semibold">
                      <span>Factory Packaging</span>
                      <Boxes className="w-3 h-3 text-amber-400" />
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-heading text-amber-400">20</span>
                      <span className="text-[11px] font-mono text-amber-300/80">Boxes</span>
                    </div>
                    <div className="mt-1 text-[10px] text-amber-200/90 font-mono">
                      Yield: 28.80 m² Delivered
                    </div>
                  </div>
                </div>

                {/* Single Compact Summary & Formula Strip */}
                <div className="p-2.5 bg-neutral-950 border border-neutral-800/80 text-[10px] font-mono space-y-1">
                  <div className="flex items-center justify-between text-neutral-400 flex-wrap gap-1">
                    <span>› Net 25.0 m² + 10% Wastage (2.5 m²) = 27.5 m² req.</span>
                    <span className="text-neutral-500">1.44 m²/box • 4 pcs/box</span>
                  </div>
                  <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-3 h-3 shrink-0" />
                    <span>Calibrated: 20 Full Boxes (28.8 m² delivered) • Zero loose broken tiles</span>
                  </div>
                </div>

                {/* Catalogue Link */}
                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="w-full py-2.5 bg-white hover:bg-amber-50 text-neutral-950 font-bold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs group/cat"
                >
                  <span>Explore Catalogue with Box Calibration</span>
                  <ArrowRight className="w-3 h-3 text-amber-600 transition-transform group-hover/cat:translate-x-1" />
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
