import React from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import { BikomaxLogo } from '../components/BikomaxLogo';
import { AnimatedReveal, StaggerContainer, StaggerItem } from '../components/AnimatedReveal';
import { ShieldCheck, Award, CheckCircle2, MapPin, Compass } from 'lucide-react';

interface AboutPageProps {
  onNavigateToCatalogue: () => void;
  onNavigateToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToCatalogue,
  onNavigateToContact,
}) => {
  return (
    <div className="bg-[#FAFAFA] text-neutral-950 font-sans">
      {/* Hero Header with Architectural Grid */}
      <section className="bg-white bg-arch-grid border-b border-neutral-200/60 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <AnimatedReveal>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-600 font-medium block">
                Architectural Standard
              </span>
            </AnimatedReveal>

            <AnimatedReveal delay={0.12}>
              <h1 className="text-4xl sm:text-6xl font-light font-heading tracking-tight text-neutral-950 leading-tight">
                Flawless surfaces. <br />
                Functional precision. <br />
                Refined spaces.
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.24}>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-2">
                BIKOMAX was founded in Eldoret, Kenya to supply materials that fulfill rigorous architectural drawings. We provide European-specification porcelain tiles, hydroelectric concealed showers, and flame-retardant switches engineered for enduring elegance.
              </p>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* Brand Pillars with Scroll Animations */}
      <section className="py-20 sm:py-28 border-b border-neutral-200/60 bg-[#FAF9F7] relative">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <AnimatedReveal className="max-w-2xl mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-medium block">
              The Three Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 mt-1">
              Foundational Pillars
            </h2>
          </AnimatedReveal>

          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <StaggerItem>
              <div className="p-8 bg-white border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-4">
                <span className="font-mono text-xs text-amber-600 font-semibold block">01 / SURFACES</span>
                <h3 className="text-2xl font-bold font-heading text-neutral-950">
                  FLAWLESS
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Zero tolerance for curvature or edge deviation. All porcelain collections feature diamond-rectified monocaliber edges to permit clean 1.5mm joints across continuous floor layouts.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 bg-white border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-4">
                <span className="font-mono text-xs text-amber-600 font-semibold block">02 / ENGINEERING</span>
                <h3 className="text-2xl font-bold font-heading text-neutral-950">
                  FUNCTIONAL
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Engineered for real-world resilience. Piano-key thermostatic shower valves with self-generating hydroelectric LED displays, and 40A DP cooker switches tested to British standards.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 bg-white border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-4">
                <span className="font-mono text-xs text-amber-600 font-semibold block">03 / AESTHETICS</span>
                <h3 className="text-2xl font-bold font-heading text-neutral-950">
                  REFINED
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Restrained, serene luxury. PVD gun grey coatings, brushed warm champagne brass mixers, and satin-touch obsidian sintered slabs designed to complement natural Kenyan light.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Logistics & Central Depot */}
      <section className="py-20 sm:py-28 border-b border-neutral-200/60 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-5">
              <AnimatedReveal>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-medium block">
                  Central Logistics Facility
                </span>
              </AnimatedReveal>

              <AnimatedReveal delay={0.12}>
                <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 leading-tight">
                  Unit G48, Rupa&apos;s Godowns, Eldoret
                </h2>
              </AnimatedReveal>

              <AnimatedReveal delay={0.22}>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Our central Eldoret logistics hub maintains physically staged inventory for architects, commercial contractors, and private homeowners across the North Rift and Western Kenya.
                </p>
              </AnimatedReveal>

              <div className="space-y-3 pt-2 text-xs text-neutral-700">
                <AnimatedReveal delay={0.3}>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Forklift Loading:</strong> Rapid, safe palletized loading into site canters and flatbeds.</span>
                  </div>
                </AnimatedReveal>

                <AnimatedReveal delay={0.38}>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Batch Integrity:</strong> Strict shade and caliber tracking to ensure complete color matching across large orders.</span>
                  </div>
                </AnimatedReveal>

                <AnimatedReveal delay={0.46}>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Regional Transit:</strong> Prompt dispatch to Eldoret CBD, Annex, Kapsoya, Elgon View, Pioneer, Kitale, Kapsabet, and Iten.</span>
                  </div>
                </AnimatedReveal>
              </div>

              <AnimatedReveal delay={0.54} className="pt-3 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="px-6 py-3.5 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Visit Showroom
                </button>
                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="px-6 py-3.5 border border-neutral-300 text-neutral-950 text-xs font-bold uppercase tracking-wider hover:border-neutral-950 transition-colors cursor-pointer"
                >
                  Browse Catalogue
                </button>
              </AnimatedReveal>
            </div>

            <AnimatedReveal delay={0.3} direction="left" className="lg:col-span-6">
              <div className="border border-neutral-200/80 bg-white p-3 arch-crosshair shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                  alt="Bikomax Architectural Installation"
                  className="w-full aspect-4/3 object-cover"
                />
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
