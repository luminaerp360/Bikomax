import React from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import { AnimatedReveal, StaggerContainer, StaggerItem } from '../components/AnimatedReveal';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  Compass,
  Layers,
  Sparkles,
  Clock,
  Truck,
  Phone,
  MessageCircle,
  ArrowRight,
  Building2,
  Boxes,
  FileCheck,
  Eye,
  Ruler,
  Droplets,
  Zap,
  ChevronRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToCatalogue: () => void;
  onNavigateToContact: () => void;
  onNavigateToTrade?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToCatalogue,
  onNavigateToContact,
  onNavigateToTrade,
}) => {
  return (
    <div className="bg-[#FAF9F6] text-neutral-950 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900">
      
      {/* 1. ARCHITECTURAL BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-neutral-200/70 py-3.5">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            <span className="hover:text-neutral-900 cursor-pointer" onClick={onNavigateToCatalogue}>Home</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-500">Corporate</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-amber-600 font-semibold">About Us</span>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION - ELEGANT ARCHITECTURAL STATEMENT */}
      <section className="bg-white bg-arch-grid border-b border-neutral-200/70 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatedReveal>
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-amber-500/10 border border-amber-600/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-amber-700 font-semibold">
                    BIKOMAX ARCHITECTURAL SUPPLIES LTD • ELDORET, KENYA
                  </span>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.1}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-heading tracking-tight text-neutral-950 leading-[1.12]">
                  Elevating East African architecture through{' '}
                  <span className="font-semibold text-neutral-900 underline decoration-amber-500/40 decoration-wavy decoration-1 underline-offset-8">
                    material integrity
                  </span>
                  .
                </h1>
              </AnimatedReveal>

              <AnimatedReveal delay={0.2}>
                <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
                  BIKOMAX is Kenya’s premier specification house and direct supplier of international-grade porcelain surfaces, hydroelectric smart sanitaryware, and certified architectural electrical systems. We bridge world-class manufacturing standards with East Africa’s most ambitious residential, commercial, and institutional projects.
                </p>
              </AnimatedReveal>

              {/* Technical Credential Pills */}
              <AnimatedReveal delay={0.28}>
                <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-neutral-700 font-mono">
                  <span className="px-3 py-1.5 bg-neutral-100/80 border border-neutral-200 rounded-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> EN 14411 Standard
                  </span>
                  <span className="px-3 py-1.5 bg-neutral-100/80 border border-neutral-200 rounded-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Monocaliber 1.5mm Joints
                  </span>
                  <span className="px-3 py-1.5 bg-neutral-100/80 border border-neutral-200 rounded-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> PVD Borehole-Resistant
                  </span>
                  <span className="px-3 py-1.5 bg-neutral-100/80 border border-neutral-200 rounded-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> BS & KEBS Compliant
                  </span>
                </div>
              </AnimatedReveal>

              {/* Action Buttons */}
              <AnimatedReveal delay={0.35} className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onNavigateToCatalogue}
                  className="px-7 py-3.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore Material Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="px-7 py-3.5 bg-white border border-neutral-300 text-neutral-900 hover:border-neutral-950 hover:bg-neutral-50 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Visit Eldoret Experience Center</span>
                </button>
              </AnimatedReveal>
            </div>

            {/* Right Architectural Image Composition */}
            <div className="lg:col-span-5 relative">
              <AnimatedReveal delay={0.25} direction="left">
                <div className="relative">
                  {/* Decorative Architectural Frame */}
                  <div className="absolute -inset-2 border border-neutral-300/70 translate-x-2 translate-y-2 pointer-events-none" />
                  
                  <div className="relative border border-neutral-200 bg-white p-3 shadow-xl">
                    <img
                      src="/products/room-living-sim.jpg"
                      alt="BIKOMAX Architectural Living Space Specification"
                      className="w-full aspect-4/3 object-cover shadow-xs"
                    />
                    <div className="pt-3 pb-1 px-1 flex items-center justify-between text-[11px] font-mono text-neutral-500 border-t border-neutral-100 mt-3">
                      <span>PROJECT: ELGON VIEW PRIVATE RESIDENCE</span>
                      <span className="text-amber-600 font-semibold">PORCELAIN 60x120CM</span>
                    </div>
                  </div>

                  {/* Floating Highlight Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-neutral-200/90 p-4 shadow-xl max-w-[240px] hidden sm:block">
                    <div className="flex items-center gap-2 text-amber-600 font-mono text-xs font-semibold uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Direct Mill Provenance</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 mt-1 leading-tight">
                      No intermediaries. Direct container consignments with verifiable batch calibration.
                    </p>
                  </div>
                </div>
              </AnimatedReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KEY METRICS & OPERATIONAL SCALE BAR */}
      <section className="bg-white border-b border-neutral-200/70 py-10">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80">
            
            <div className="pt-4 sm:pt-0 sm:px-4 first:pl-0 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-light font-heading text-neutral-950 tracking-tight">
                150K<span className="text-amber-600 text-2xl sm:text-3xl font-normal">+</span>
              </div>
              <div className="text-xs font-mono font-semibold text-neutral-800 uppercase tracking-wider">
                Square Meters Delivered
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Supplied across private estates, commercial plazas, and hotels in Kenya.
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-light font-heading text-neutral-950 tracking-tight">
                500<span className="text-amber-600 text-2xl sm:text-3xl font-normal">+</span>
              </div>
              <div className="text-xs font-mono font-semibold text-neutral-800 uppercase tracking-wider">
                Architectural Projects
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Specified by leading architects, developers, and quantity surveyors.
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-light font-heading text-neutral-950 tracking-tight">
                100<span className="text-amber-600 text-2xl sm:text-3xl font-normal">%</span>
              </div>
              <div className="text-xs font-mono font-semibold text-neutral-800 uppercase tracking-wider">
                Batch Shade Calibrated
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Zero tone variation across consecutive runs with monocaliber sizing.
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-light font-heading text-neutral-950 tracking-tight">
                48<span className="text-amber-600 text-2xl sm:text-3xl font-normal">H</span>
              </div>
              <div className="text-xs font-mono font-semibold text-neutral-800 uppercase tracking-wider">
                Regional Site Dispatch
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Rapid forklift loading & transit from Unit G48 Rupa’s Godowns, Eldoret.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHO WE ARE: COMPANY HERITAGE & MISSION */}
      <section className="py-20 sm:py-28 border-b border-neutral-200/70 bg-[#FAF9F7]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Sticky Header */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
              <AnimatedReveal>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-semibold block">
                  Our Genesis & Vision
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-heading text-neutral-950 leading-tight mt-1">
                  Why BIKOMAX was founded.
                </h2>
              </AnimatedReveal>

              <AnimatedReveal delay={0.15}>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  For decades, East Africa’s building sector wrestled with a glaring paradox: while architectural concepts evolved toward world-class minimalism and luxury, the materials available on local shelves were plagued by warping, tonal discrepancies, rapid mineral staining, and unreliable counterfeit electrical accessories.
                </p>
              </AnimatedReveal>

              <AnimatedReveal delay={0.25}>
                <div className="p-5 bg-white border border-neutral-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-900 font-semibold">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>The BIKOMAX Resolution</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    We built BIKOMAX to eliminate compromises. By securing direct tier-one manufacturing allocations in Europe and state-of-the-art facilities abroad, we established a dependable supply pipeline that guarantees uncompromising geometric precision, documented load ratings, and aesthetic refinement for every project.
                  </p>
                </div>
              </AnimatedReveal>
            </div>

            {/* Right Narrative Articles */}
            <div className="lg:col-span-7 space-y-10">
              
              <AnimatedReveal delay={0.1}>
                <div className="bg-white border border-neutral-200/90 p-8 space-y-4 shadow-2xs">
                  <span className="font-mono text-xs text-amber-600 font-semibold tracking-wider block">
                    01 / THE CHALLENGE WE SOLVED
                  </span>
                  <h3 className="text-xl sm:text-2xl font-normal font-heading text-neutral-950">
                    Bridging the gap between the blueprint and the job site.
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Architectural drawings call for continuous 1.5mm grout lines, seamless transitions, and flawless reflections. When tiles arrive with 1mm edge tolerances or mismatched caliber codes, the aesthetic vision collapses into uneven lippage and unsightly joints. BIKOMAX enforces 100% diamond-rectified monocaliber sorting, ensuring every single pallet on your site fits the millimeter precision of your CAD schedule.
                  </p>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.2}>
                <div className="bg-white border border-neutral-200/90 p-8 space-y-4 shadow-2xs">
                  <span className="font-mono text-xs text-amber-600 font-semibold tracking-wider block">
                    02 / TECHNICAL COMPLIANCE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-normal font-heading text-neutral-950">
                    Engineered resilience against regional realities.
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    East African construction carries unique environmental demands. Borehole water rich in calcium and minerals quickly tarnishes cheap electroplated chrome faucets within months. Our sanitaryware collections employ physical vapor deposition (PVD) titanium coatings and ceramic disc cartridges tested to 500,000 cycles. Likewise, our electrical switches feature virgin flame-retardant polycarbonates and pure phosphor-bronze components compliant with British Standard BS EN 60669-1.
                  </p>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.3}>
                <div className="bg-white border border-neutral-200/90 p-8 space-y-4 shadow-2xs">
                  <span className="font-mono text-xs text-amber-600 font-semibold tracking-wider block">
                    03 / CENTRAL LOGISTICS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-normal font-heading text-neutral-950">
                    Physical staging at scale at Unit G48, Rupa&apos;s Godowns.
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    We reject the brochure-only brokerage model. BIKOMAX maintains an expansive physical inventory right here in Eldoret. With 20,000+ square meters of staged porcelain slabs, hydraulic-tested concealed showers, and smart switching gear ready for immediate site dispatch, our clients avoid costly 12-week import delays and enjoy seamless project continuity.
                  </p>
                </div>
              </AnimatedReveal>

            </div>

          </div>

        </div>
      </section>

      {/* 5. OUR THREE CORE ARCHITECTURAL DIVISIONS */}
      <section className="py-20 sm:py-28 border-b border-neutral-200/70 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <AnimatedReveal>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-semibold block">
                Comprehensive Building Envelopes
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950">
                Our Three Core Divisions
              </h2>
            </AnimatedReveal>
            <AnimatedReveal delay={0.1}>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Carefully curated disciplines engineered to work in technical and visual harmony across premium spaces.
              </p>
            </AnimatedReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Division 1: Porcelain */}
            <AnimatedReveal delay={0.1} className="h-full">
              <div className="border border-neutral-200/90 bg-[#FCFCFA] p-8 h-full flex flex-col justify-between hover:border-amber-600/40 hover:shadow-lg transition-all duration-300">
                <div className="space-y-5">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-600">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-600 uppercase tracking-widest block font-semibold">
                      Division 01
                    </span>
                    <h3 className="text-2xl font-light font-heading text-neutral-950 mt-1">
                      Architectural Surfaces & Slabs
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Full-body and glazed porcelain stoneware in 60x60cm, 60x120cm, and 120x240cm slab dimensions. Featuring marble veining, honed architectural concrete, warm timber planks, and 18mm outdoor exterior paving.
                  </p>
                  
                  <div className="space-y-2 pt-2 text-xs font-mono text-neutral-700 border-t border-neutral-200/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Monocaliber diamond-rectified edges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Low water absorption (&lt; 0.05%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Certified slip ratings from R10 to R11</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-200/70">
                  <button
                    type="button"
                    onClick={onNavigateToCatalogue}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Surfaces Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </AnimatedReveal>

            {/* Division 2: Sanitaryware */}
            <AnimatedReveal delay={0.2} className="h-full">
              <div className="border border-neutral-200/90 bg-[#FCFCFA] p-8 h-full flex flex-col justify-between hover:border-amber-600/40 hover:shadow-lg transition-all duration-300">
                <div className="space-y-5">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-600">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-600 uppercase tracking-widest block font-semibold">
                      Division 02
                    </span>
                    <h3 className="text-2xl font-light font-heading text-neutral-950 mt-1">
                      Hydro-Wellness & Sanitaryware
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Concealed thermostatic shower systems, intelligent self-powered digital LED mixers, acoustic rimless wall-hung toilets, and freestanding composite bathtubs engineered for ergonomic comfort and water conservation.
                  </p>
                  
                  <div className="space-y-2 pt-2 text-xs font-mono text-neutral-700 border-t border-neutral-200/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Hydroelectric LED display (no batteries)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>PVD anti-corrosion gunmetal & brass</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Vortex 360° hygiene acoustic flush</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-200/70">
                  <button
                    type="button"
                    onClick={onNavigateToCatalogue}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Sanitaryware</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </AnimatedReveal>

            {/* Division 3: Electrical */}
            <AnimatedReveal delay={0.3} className="h-full">
              <div className="border border-neutral-200/90 bg-[#FCFCFA] p-8 h-full flex flex-col justify-between hover:border-amber-600/40 hover:shadow-lg transition-all duration-300">
                <div className="space-y-5">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-600 uppercase tracking-widest block font-semibold">
                      Division 03
                    </span>
                    <h3 className="text-2xl font-light font-heading text-neutral-950 mt-1">
                      Architectural Electrical Controls
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Ultra-slim switchplates in matte obsidian, brushed champagne aluminum, and crystallised tempered glass. Tested for high-amperage induction loads, dedicated cooker units, and hospitality smart controls.
                  </p>
                  
                  <div className="space-y-2 pt-2 text-xs font-mono text-neutral-700 border-t border-neutral-200/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Conforms to BS EN 60669-1 standards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Flame-retardant virgin polycarbonate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Heavy-duty 40A/45A DP isolation switches</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-200/70">
                  <button
                    type="button"
                    onClick={onNavigateToCatalogue}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-amber-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Electrical Range</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </AnimatedReveal>

          </div>

        </div>
      </section>

      {/* 6. OUR FOUR PILLARS OF RIGOR */}
      <section className="py-20 sm:py-28 border-b border-neutral-200/70 bg-[#FAF9F7]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <AnimatedReveal className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-semibold block">
                The BIKOMAX Quality Charter
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 mt-1">
                Four Pillars of Operational Rigor
              </h2>
            </AnimatedReveal>
            <AnimatedReveal delay={0.2}>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
                Every consignment we import and release is governed by four non-negotiable inspection standards.
              </p>
            </AnimatedReveal>
          </div>

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            
            <StaggerItem>
              <div className="p-8 bg-white border border-neutral-200 shadow-2xs hover:shadow-md transition-shadow h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-amber-600 font-mono text-xs font-bold">01 / SHADE & CALIBER</div>
                  <h3 className="text-xl font-bold font-heading text-neutral-950">
                    Zero-Batch Drift
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Tile shipments are sourced from single kiln firing sequences. We track every box code to ensure uniform hue, surface reflectance, and dimensions across expansive floors.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-amber-600" />
                  <span>±0.05% Sizing Tolerance</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 bg-white border border-neutral-200 shadow-2xs hover:shadow-md transition-shadow h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-amber-600 font-mono text-xs font-bold">02 / PVD DEPOSITION</div>
                  <h3 className="text-xl font-bold font-heading text-neutral-950">
                    Borehole Resistance
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Our metalware undergoes high-vacuum Physical Vapor Deposition. The coating molecularly bonds with the substrate, preventing flaking or calcium salt pitting.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>5-Year Surface Warranty</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 bg-white border border-neutral-200 shadow-2xs hover:shadow-md transition-shadow h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-amber-600 font-mono text-xs font-bold">03 / HYDRO-TESTING</div>
                  <h3 className="text-xl font-bold font-heading text-neutral-950">
                    Pressure Tested Valves
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Every concealed thermostatic valve model is pressure tested at up to 10 Bar to ensure leak-free integrity inside structural drywall and masonry enclosures.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-amber-600" />
                  <span>10 Bar Hydrostatic Certified</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 bg-white border border-neutral-200 shadow-2xs hover:shadow-md transition-shadow h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-amber-600 font-mono text-xs font-bold">04 / DISPATCH AUDIT</div>
                  <h3 className="text-xl font-bold font-heading text-neutral-950">
                    Palletized Security
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Heavy consignments are shrink-wrapped, corner-braced, and strapped to timber pallets before forklift dispatch, guarding against transit chipping on regional roads.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Forklift Direct Staging</span>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>

        </div>
      </section>

      {/* 7. ARCHITECTURAL PARTNERSHIP: WHO WE SERVE */}
      <section className="py-20 sm:py-28 border-b border-neutral-200/70 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <AnimatedReveal>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-semibold block">
                Trade & Client Collaboration
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950">
                Partnering Across the Building Ecosystem
              </h2>
            </AnimatedReveal>
            <AnimatedReveal delay={0.1}>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Whether detailing a luxury 4-bedroom villa or specifying finishes for a 12-storey commercial tower, our team delivers technical support at every phase.
              </p>
            </AnimatedReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* For Architects & Designers */}
            <AnimatedReveal delay={0.1}>
              <div className="bg-[#FAF9F7] border border-neutral-200 p-8 space-y-4 h-full">
                <div className="w-10 h-10 bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-600">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-neutral-950">
                  Architects & Interior Designers
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  We supply full-scale physical sample cuts, photometric reflectance metrics, slip resistance test certificates, and high-resolution CAD surface textures for photorealistic client renders.
                </p>
                <ul className="text-xs text-neutral-700 space-y-2 pt-2 border-t border-neutral-200/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Complimentary sample board delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Detailed technical data sheets (TDS)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Specialized wet room layout advisory</span>
                  </li>
                </ul>
              </div>
            </AnimatedReveal>

            {/* For Contractors & Quantity Surveyors */}
            <AnimatedReveal delay={0.2}>
              <div className="bg-[#FAF9F7] border border-neutral-200 p-8 space-y-4 h-full">
                <div className="w-10 h-10 bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-neutral-950">
                  Contractors & Quantity Surveyors
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Fast BQ quantification, structured commercial tiered pricing, guaranteed price locks for tender duration, and phased pallet staging delivered strictly according to your site timeline.
                </p>
                <ul className="text-xs text-neutral-700 space-y-2 pt-2 border-t border-neutral-200/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>24-Hour BQ pricing turnaround</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tiered volume discounts for commercial lots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dedicated site delivery logistics</span>
                  </li>
                </ul>
              </div>
            </AnimatedReveal>

            {/* For Private Builders & Homeowners */}
            <AnimatedReveal delay={0.3}>
              <div className="bg-[#FAF9F7] border border-neutral-200 p-8 space-y-4 h-full">
                <div className="w-10 h-10 bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-neutral-950">
                  Private Builders & Homeowners
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Experience full porcelain slabs under natural sunlight at our Eldoret showroom. We guide you through waste percentages, tile sizing harmony, and thermostatic plumbing compatibility.
                </p>
                <ul className="text-xs text-neutral-700 space-y-2 pt-2 border-t border-neutral-200/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Interactive 3D room simulation tool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Precise area & box quantity calculations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Safe doorstep & site delivery across Kenya</span>
                  </li>
                </ul>
              </div>
            </AnimatedReveal>

          </div>

        </div>
      </section>

      {/* 8. ELDORET EXPERIENCE CENTER & LOGISTICS HUB SPOTLIGHT */}
      <section className="py-20 sm:py-28 border-b border-neutral-200/70 bg-[#0C0C0C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-arch-dark-grid opacity-20 pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatedReveal>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Central Operations Hub • Eldoret, Kenya</span>
                </div>
              </AnimatedReveal>

              <AnimatedReveal delay={0.1}>
                <h2 className="text-3xl sm:text-5xl font-light font-heading text-white leading-tight">
                  Unit G48, Rupa&apos;s Godowns. <br />
                  <span className="text-neutral-400">Where architectural visions take tactile form.</span>
                </h2>
              </AnimatedReveal>

              <AnimatedReveal delay={0.2}>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  Our Eldoret logistics and showcase center is designed for hands-on evaluation. Walk among full-height porcelain slabs under genuine natural daylight, examine calibrated grout joints, and observe live water pressure tests on concealed thermostatic showers before finalizing your bill of quantities.
                </p>
              </AnimatedReveal>

              {/* Facility Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
                    <Truck className="w-4 h-4" />
                    <span>Rapid Forklift Loading</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal">
                    Equipped for safe, speedy pallet loading into pickup canters, flatbeds, and site trucks.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
                    <Boxes className="w-4 h-4" />
                    <span>20,000+ m² Immediate Staging</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal">
                    Massive local buffer stock eliminating unpredictable 3-month overseas import wait times.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
                    <Eye className="w-4 h-4" />
                    <span>Natural Daylight Gallery</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal">
                    View true surface sheen and tone without deceptive artificial showroom fluorescent lighting.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
                    <Clock className="w-4 h-4" />
                    <span>Open 6 Days a Week</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal">
                    Mon–Fri: 8:00 AM – 6:00 PM | Sat: 8:30 AM – 4:00 PM | Dedicated client parking on site.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <AnimatedReveal delay={0.3} className="pt-4 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer rounded-xs"
                >
                  Book Showroom Consultation
                </button>

                <a
                  href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20would%20like%20to%20inquire%20about%20visiting%20the%20showroom%20and%20consulting%20on%20my%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Direct WhatsApp Desk</span>
                </a>
              </AnimatedReveal>

            </div>

            {/* Right Architectural Preview */}
            <div className="lg:col-span-5">
              <AnimatedReveal delay={0.25} direction="left">
                <div className="border border-neutral-800 bg-neutral-900/60 p-4 space-y-4">
                  <div className="relative overflow-hidden aspect-4/3">
                    <img
                      src="/products/room-kitchen-sim.jpg"
                      alt="Bikomax Experience Showcase"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                      <div className="text-xs font-mono text-white">
                        <span className="text-amber-400 font-semibold block">TACTILE EVALUATION</span>
                        <span className="text-neutral-300 text-[11px]">Calacatta Gold Honed Porcelain with Matte Brassware</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950 border border-neutral-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-neutral-400">LOCATION:</span>
                      <span className="text-white font-medium">Rupa’s Godowns, Unit G48</span>
                    </div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-neutral-400">TOWN:</span>
                      <span className="text-white font-medium">Eldoret, Uasin Gishu County</span>
                    </div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-neutral-400">PHONE:</span>
                      <span className="text-amber-400 font-medium">{SHOWROOM_CONTACT.phone}</span>
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 9. PRESTIGIOUS CALL TO ACTION (CTA) */}
      <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/70 text-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-4xl mx-auto space-y-6">
          <AnimatedReveal>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600 font-semibold block">
              Start Specifying Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-heading text-neutral-950 mt-1">
              Specify with absolute confidence.
            </h2>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Whether you are submitting an architectural tender, supervising a commercial site, or designing your private residence, our technical trade desk is ready to assist.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.25}>
            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onNavigateToCatalogue}
                className="px-8 py-4 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group"
              >
                <span>Browse Product Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onNavigateToContact}
                className="px-8 py-4 bg-white border border-neutral-300 text-neutral-950 hover:border-neutral-950 hover:bg-neutral-50 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Contact Trade Desk</span>
              </button>
            </div>
          </AnimatedReveal>
        </div>
      </section>

    </div>
  );
};
