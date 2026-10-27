import React from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Truck,
  ArrowRight,
  Ruler,
  Droplets,
  ChevronRight,
  Warehouse,
  MessageCircle
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToCatalogue: () => void;
  onNavigateToContact: () => void;
  onNavigateToTrade?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToCatalogue,
  onNavigateToContact,
}) => {
  return (
    <div className="w-full bg-[#FAF9F5] text-neutral-900 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900">

      {/* 1. BREADCRUMB - FULL WIDTH */}
      <nav aria-label="Breadcrumb" className="w-full bg-[#F0EDE6] border-b border-neutral-200/90 py-2.5">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="hover:text-neutral-950 cursor-pointer transition-colors" onClick={onNavigateToCatalogue}>Home</span>
              <ChevronRight className="w-3 h-3 text-neutral-400" />
              <span className="text-amber-700 font-semibold">About BIKOMAX</span>
            </div>
            <span className="hidden sm:inline text-neutral-500">Unit G48, Rupa&apos;s Godowns, Eldoret</span>
          </div>
        </div>
      </nav>

      {/* 2. HERO: PLAIN WHITE & CLEAN */}
      <section className="w-full bg-white border-b border-neutral-200 py-10 lg:py-14">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-600/25 rounded-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold">
                  ELDORET, KENYA • RUPA&apos;S GODOWNS
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light font-heading text-neutral-950 leading-tight">
                Material integrity for{' '}
                <span className="font-semibold border-b-2 border-amber-600 pb-0.5">East African architecture</span>.
              </h1>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl">
                BIKOMAX is a direct importer and trade supplier of international-grade porcelain stoneware, PVD smart sanitaryware, and certified architectural electrical systems based in Eldoret.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="px-6 py-2.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="px-6 py-2.5 bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-50 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Visit Eldoret Showroom</span>
                </button>
              </div>
            </div>

            {/* Right Architectural Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#121212] text-white p-3 border border-neutral-800 shadow-xl rounded-xs">
                <div className="relative aspect-16/10 overflow-hidden rounded-xs border border-neutral-800">
                  <img
                    src="/products/room-living-sim.jpg"
                    alt="Bikomax Architectural Living Space"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <div className="text-xs font-mono">
                      <span className="text-amber-400 font-semibold block">LIVE SPECIFICATION</span>
                      <span className="text-neutral-300 text-[11px]">Porcelain 60x120cm · Monocaliber Rectified</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 px-1 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    Direct Mill Allocation · Batch Calibrated
                  </span>
                  <span className="text-amber-400 font-semibold">UNIT G48 ELDORET</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FULL WIDTH DARK BAR - EXACT SAME DESIGN: CUSTOMERS, PROJECTS & FAST DELIVERY */}
      <section className="w-full bg-neutral-950 text-white py-6 border-b border-neutral-800 bg-arch-dark-grid">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-800 text-center sm:text-left">
            
            {/* 1. Customers */}
            <div className="pt-2 md:pt-0 md:px-6 first:pl-0 space-y-1">
              <div className="text-2xl sm:text-3xl font-light font-heading text-white">
                500<span className="text-amber-500 font-bold">+</span>
              </div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                CUSTOMERS &amp; ARCHITECTS
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Quantity surveyors, developers &amp; private homeowners
              </p>
            </div>

            {/* 2. Projects */}
            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-2xl sm:text-3xl font-light font-heading text-white">
                150K<span className="text-amber-500 font-bold">+</span>
              </div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                PROJECTS DELIVERED
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Luxury residential villas, commercial towers &amp; hotels
              </p>
            </div>

            {/* 3. Fast Delivery */}
            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-2xl sm:text-3xl font-light font-heading text-white">
                48<span className="text-amber-500 font-bold">H</span>
              </div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                FAST DELIVERY
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Palletized dispatch from Rupa&apos;s Godowns Eldoret
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY BIKOMAX: FULL WIDTH 3 PILLARS */}
      <section className="w-full py-10 lg:py-12 border-b border-neutral-300/80 bg-[#FAF9F5]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block mb-1">
              The BIKOMAX Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950">
              Why specify with us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white border border-neutral-300/90 p-5 rounded-xs shadow-2xs">
              <div className="w-8 h-8 bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-700 mb-3">
                <Ruler className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold font-heading text-neutral-950 mb-1">
                Zero Caliber Discrepancy
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                100% diamond-rectified monocaliber sorting for precise 1.5mm joints without unsightly lippage or uneven grout lines.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-neutral-300/90 p-5 rounded-xs shadow-2xs">
              <div className="w-8 h-8 bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-700 mb-3">
                <Droplets className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold font-heading text-neutral-950 mb-1">
                Borehole Water Resistance
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Physical Vapor Deposition (PVD) titanium coatings and ceramic disc cartridges tested to withstand mineral-rich water without pitting.
              </p>
            </div>

            {/* Pillar 3: Direct Mill Provenance */}
            <div className="bg-white border border-neutral-300/90 p-5 rounded-xs shadow-2xs">
              <div className="w-8 h-8 bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-700 mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold font-heading text-neutral-950 mb-1">
                Direct Mill Provenance
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Direct tier-one factory allocations from single kiln firings, eliminating intermediaries and guaranteeing verifiable shade and batch consistency.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. THREE CORE DISCIPLINES: FULL WIDTH */}
      <section className="w-full py-10 lg:py-12 border-b border-neutral-300/80 bg-[#F2EFE8]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                Product Lines
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950">
                Our Three Core Divisions
              </h2>
            </div>
            <button
              type="button"
              onClick={onNavigateToCatalogue}
              className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-neutral-950 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View All In Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Division 1: Porcelain */}
            <div className="bg-white border border-neutral-300/90 rounded-xs overflow-hidden shadow-2xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/9 overflow-hidden">
                  <img
                    src="/products/tile-calacatta-gold.jpg"
                    alt="Porcelain Surfaces"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-amber-600 text-white font-mono text-[9px] uppercase font-bold">
                    01 · Surfaces
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold font-heading text-neutral-950">
                    Architectural Porcelain
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    60x60cm, 60x120cm, and 120x240cm slabs. Calacatta marble, honed concrete, and exterior 18mm paving.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-neutral-700 space-y-1 border-t border-neutral-200">
                    <div>✓ Water absorption &lt; 0.05%</div>
                    <div>✓ Monocaliber rectified joints</div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1">
                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="w-full py-2 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Surfaces
                </button>
              </div>
            </div>

            {/* Division 2: Sanitaryware */}
            <div className="bg-white border border-neutral-300/90 rounded-xs overflow-hidden shadow-2xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/9 overflow-hidden">
                  <img
                    src="/products/shower-piano.jpg"
                    alt="Hydro-Wellness"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-amber-600 text-white font-mono text-[9px] uppercase font-bold">
                    02 · Sanitaryware
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold font-heading text-neutral-950">
                    Hydro-Wellness & Brassware
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Concealed thermostatic piano showers, rimless wall-hung toilets, and self-powered hydroelectric LED mixers.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-neutral-700 space-y-1 border-t border-neutral-200">
                    <div>✓ PVD titanium anti-corrosion</div>
                    <div>✓ 10 Bar pressure tested</div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1">
                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="w-full py-2 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Sanitaryware
                </button>
              </div>
            </div>

            {/* Division 3: Electrical */}
            <div className="bg-white border border-neutral-300/90 rounded-xs overflow-hidden shadow-2xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/9 overflow-hidden">
                  <img
                    src="/products/switch-40a.jpg"
                    alt="Architectural Electrical"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-amber-600 text-white font-mono text-[9px] uppercase font-bold">
                    03 · Electrical
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold font-heading text-neutral-950">
                    Architectural Electrical
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Ultra-slim switchplates in matte obsidian, champagne aluminum, and tempered glass. 40A/45A high-load switches.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-neutral-700 space-y-1 border-t border-neutral-200">
                    <div>✓ BS EN 60669-1 compliant</div>
                    <div>✓ Phosphor-bronze contacts</div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1">
                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="w-full py-2 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Electrical
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. VISIT ELDORET EXPERIENCE CENTER: FULL WIDTH */}
      <section className="w-full py-10 lg:py-12 bg-neutral-950 text-white border-b border-neutral-800">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Eldoret Logistics Hub & Showroom</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-light font-heading text-white">
                Unit G48, Rupa&apos;s Godowns. <br />
                <span className="text-neutral-400">Evaluate full slabs in natural daylight.</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                Walk among full-height porcelain slabs, inspect live calibrated grout joints, and test thermostatic water systems before ordering your project quantities.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1 text-xs font-mono">
                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xs">
                  <div className="text-amber-400 font-semibold">HOURS</div>
                  <div className="text-neutral-300 text-[11px] mt-0.5">Mon–Fri: 8:00 AM – 6:00 PM</div>
                  <div className="text-neutral-400 text-[10px]">Sat: 8:30 AM – 4:00 PM</div>
                </div>
                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xs">
                  <div className="text-amber-400 font-semibold">DISPATCH</div>
                  <div className="text-neutral-300 text-[11px] mt-0.5">Forklift direct staging</div>
                  <div className="text-neutral-400 text-[10px]">Canters, flatbeds & site trucks</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-xs"
                >
                  Book Showroom Consultation
                </button>

                <a
                  href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20would%20like%20to%20consult%20on%20my%20building%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 rounded-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Trade Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-16/10 rounded-xs overflow-hidden border border-neutral-800">
                <img
                  src="/products/room-kitchen-sim.jpg"
                  alt="Eldoret Showroom Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-xs font-mono">
                    <span className="text-amber-400 font-semibold block">EXPERIENCE SHOWROOM</span>
                    <span className="text-neutral-300 text-[11px]">Rupa’s Godowns, Unit G48 · Eldoret</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FULL WIDTH ACTIONABLE CTA */}
      <section className="w-full py-10 bg-[#EDE7DD] border-b border-neutral-300/80 text-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950">
            Specify with confidence.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
            Get instant bill of quantities pricing, sample boards, or order dispatch for your site.
          </p>
          <div className="flex justify-center items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onNavigateToCatalogue}
              className="px-6 py-2.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Browse Catalogue
            </button>
            <button
              type="button"
              onClick={onNavigateToContact}
              className="px-6 py-2.5 bg-white border border-neutral-300 text-neutral-950 hover:bg-neutral-50 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
            >
              Contact Trade Desk
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
