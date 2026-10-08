import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { SHOWROOM_CONTACT } from '../data/products';
import { AnimatedReveal, ScrollRevealText, PatternDivider } from '../components/AnimatedReveal';
import {
  Ruler,
  Boxes,
  ArrowRight,
  Calculator,
  MapPin,
  MessageCircle,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

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
}) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="bg-[#FAFAFA] text-neutral-950 font-sans">
      {/* Editorial Hero with scroll/load staggered animations and interactive dual pricing preview */}
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

      {/* DUAL PRICING ARCHITECTURAL EXPLAINER (Scroll Animated with Blueprint & Fluted Textures) */}
      <section className="relative py-20 sm:py-28 border-b border-neutral-200/80 bg-white overflow-hidden">
        {/* Subtle architectural fluted striation pattern on edge */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-arch-grid opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative with Staggered Scroll Reveal */}
            <div className="lg:col-span-6 space-y-6">
              <AnimatedReveal delay={0.05}>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C2A26F] font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Procurement Standard</span>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.15}>
                <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 leading-tight">
                  Dual Pricing: <br />
                  <span className="font-semibold text-neutral-900">Square Meter</span> & <span className="font-semibold text-[#C2A26F]">Bulk Box</span>
                </h2>
              </AnimatedReveal>

              <ScrollRevealText
                text="Estimating begins with square meters from architectural blueprints, but factory palletizing demands sealed cartons to protect rectified porcelain edges. Bikomax computes both metrics in real-time with an intelligent cutting wastage allowance."
                className="text-sm text-neutral-600 leading-relaxed"
                delay={0.2}
              />

              <div className="space-y-3.5 pt-2 text-xs text-neutral-700">
                <AnimatedReveal delay={0.3}>
                  <div className="flex items-start gap-3.5 p-4 bg-[#FAF9F7] border border-neutral-200/80 arch-crosshair hover:border-neutral-950 transition-colors">
                    <Ruler className="w-4 h-4 text-[#C2A26F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 block font-semibold">Area Metric (m²):</strong>
                      <span className="text-neutral-500 leading-relaxed">
                        Matches your quantity surveyor schedules and Bill of Quantities floor plans directly.
                      </span>
                    </div>
                  </div>
                </AnimatedReveal>

                <AnimatedReveal delay={0.4}>
                  <div className="flex items-start gap-3.5 p-4 bg-[#FAF9F7] border border-neutral-200/80 arch-crosshair hover:border-neutral-950 transition-colors">
                    <Boxes className="w-4 h-4 text-[#C2A26F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 block font-semibold">Factory Box Packaging:</strong>
                      <span className="text-neutral-500 leading-relaxed">
                        Calculates exact whole cartons needed, plus recommended +10% tile cutting wastage for perimeter trims.
                      </span>
                    </div>
                  </div>
                </AnimatedReveal>
              </div>

              <AnimatedReveal delay={0.5} className="pt-2">
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-[#C2A26F] transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-[#C2A26F]" />
                  <span>Launch Multi-Room Coverage Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </AnimatedReveal>
            </div>

            {/* Specimen Visual Card (Scroll-revealed with scale) */}
            <AnimatedReveal delay={0.25} direction="left" className="lg:col-span-6">
              <div className="bg-[#121212] bg-arch-dark-grid text-white p-7 sm:p-9 border border-neutral-800 shadow-2xl space-y-6 relative">
                {/* Calibration drafting watermark */}
                <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest uppercase text-neutral-500 border border-neutral-800 px-2 py-0.5">
                  CALIBRATED ALGORITHM
                </div>

                <div className="border-b border-neutral-800 pb-3">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-[#C2A26F] block font-semibold">
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
                    <span className="text-[10px] uppercase font-mono text-[#C2A26F] block font-bold">
                      Factory Box Rate
                    </span>
                    <div className="text-2xl font-bold font-heading mt-1 text-[#C2A26F]">
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
                  className="w-full py-3.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Experience Dual Pricing on Full Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C2A26F]" />
                </button>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* Pattern Divider */}
      <PatternDivider label="Signature Architectural Specifications" />

      {/* FEATURED SELECTION (Staggered Grid Reveal) */}
      <section className="relative py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <AnimatedReveal>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C2A26F] font-semibold block">
                Curated Highlights
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 mt-1">
                Signature Architectural Pieces
              </h2>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <button
              type="button"
              onClick={onNavigateToCatalogue}
              className="text-xs font-bold uppercase tracking-widest text-neutral-950 hover:text-[#C2A26F] flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C2A26F]" />
            </button>
          </AnimatedReveal>
        </div>

        {/* Staggered cards reveal on scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.ref}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* SHOWROOM CALLOUT (Animated Dark Stage with Blueprint Grid Pattern) */}
      <section className="relative bg-[#0A0A0A] bg-arch-blueprint text-white py-20 sm:py-28 border-t border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <AnimatedReveal>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C2A26F] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#C2A26F]" />
                  <span>Physical Experience Center</span>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.12}>
                <h2 className="text-3xl sm:text-5xl font-light font-heading text-white leading-tight">
                  Visit Our Design Depot in Eldoret
                </h2>
              </AnimatedReveal>

              <ScrollRevealText
                text="Experience full porcelain slabs under natural daylight, inspect sample boards, and review live water pressure trials on concealed piano shower systems at Unit G48, Rupa's Godowns, Eldoret. Forklift loading ready for all vehicles."
                className="text-sm text-neutral-300 leading-relaxed max-w-xl"
                delay={0.2}
              />

              <AnimatedReveal delay={0.32} className="pt-3 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="px-7 py-3.5 bg-[#C2A26F] hover:bg-[#b0905e] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Showroom Details
                </button>
                <button
                  type="button"
                  onClick={onNavigateToTrade}
                  className="px-7 py-3.5 border border-neutral-700 hover:border-white text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Trade & BQ Desk
                </button>
              </AnimatedReveal>
            </div>

            <AnimatedReveal delay={0.25} direction="left" className="lg:col-span-5">
              <div className="bg-neutral-900/95 backdrop-blur-xs border border-neutral-800 p-8 space-y-4 arch-crosshair shadow-2xl">
                <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 block">
                  Direct Inquiries Hotline
                </span>
                <div className="text-3xl font-bold font-mono text-white tracking-tight">
                  {SHOWROOM_CONTACT.phone}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Direct WhatsApp and voice assistance for site delivery quotes, trade accounts, and tile batch reservations.
                </p>
                <a
                  href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 hover:underline pt-2"
                >
                  <MessageCircle className="w-4 h-4" /> Message on WhatsApp Concierge
                </a>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
