import React, { useState } from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import { AnimatedReveal, StaggerContainer, StaggerItem } from '../components/AnimatedReveal';
import {
  Boxes,
  Layers,
  Truck,
  FileText,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

export const TradePage: React.FC = () => {
  const [tradeForm, setTradeForm] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    siteLocation: '',
    projectScope: 'Residential Development (10+ Units)',
    estimatedSQM: '500',
    bqNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradeForm.companyName || !tradeForm.phone) return;
    setSubmitted(true);
  };

  const getWhatsAppBQLink = () => {
    const text = `📐 *ARCHITECTURAL BQ / TRADE TENDER QUOTATION*\n*Company:* ${tradeForm.companyName}\n*Contact:* ${tradeForm.contactPerson}\n*Phone:* ${tradeForm.phone}\n*Site:* ${tradeForm.siteLocation}\n*Scope:* ${tradeForm.projectScope}\n*Estimated SQM:* ${tradeForm.estimatedSQM} m²\n*BQ Specifications:* ${tradeForm.bqNotes || 'Standard specification'}\n_Please prepare wholesale trade proforma invoice._`;
    return `https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-[#FAFAFA] text-neutral-950 font-sans pb-24">
      {/* Hero Header with subtle pattern */}
      <section className="bg-white bg-arch-grid border-b border-neutral-200/60 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-3xl space-y-4">
            <AnimatedReveal>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#C2A26F] font-medium block">
                Architects, Quantity Surveyors & Builders
              </span>
            </AnimatedReveal>

            <AnimatedReveal delay={0.12}>
              <h1 className="text-4xl sm:text-6xl font-light font-heading tracking-tight text-neutral-950 leading-tight">
                Trade & BQ Procurement
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.22}>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Wholesale pricing, batch-shade protection, and palletized logistics for commercial developers, architects, and main contractors in Eldoret and Western Kenya.
              </p>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* Trade Benefits Grid with Staggered Scroll Reveal */}
      <section className="py-14 sm:py-20 border-b border-neutral-200/60 bg-[#FAF9F7]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <StaggerItem>
              <div className="p-6 bg-white border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-2.5">
                <Boxes className="w-5 h-5 text-[#C2A26F]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-heading">
                  Palletized Wholesale
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Substantial project discounts on bulk container orders and full pallet lots of porcelain tiles and sanitary fixtures.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-2.5">
                <Layers className="w-5 h-5 text-[#C2A26F]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-heading">
                  Batch Code Guarantee
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We reserve identical production calibers and shade codes in our Eldoret warehouse up to 60 days to prevent mismatched tile tones.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-2.5">
                <Truck className="w-5 h-5 text-[#C2A26F]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-heading">
                  Site Staged Delivery
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Coordinated flatbed delivery directly to your building site across Eldoret, Kitale, Kapsabet, and Kakamega.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-2.5">
                <FileText className="w-5 h-5 text-[#C2A26F]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-heading">
                  E-TIMS & KRA Invoicing
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Compliant commercial tax invoices, EFT/RTGS bank settlements, and verifiable technical datasheets.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Main Trade Form & Specifications */}
      <section className="py-16 sm:py-24 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Form with Scroll Reveal */}
          <AnimatedReveal delay={0.15} className="lg:col-span-7 bg-white p-7 sm:p-9 border border-neutral-200 shadow-sm arch-crosshair">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C2A26F] font-bold">
                Commercial Tender & BQ Request
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950 mt-1">
                Submit Your Project Schedule
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Fill in your project scope below for a prioritized trade rate quotation prepared by our Eldoret estimating desk.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-neutral-50 border border-neutral-200 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">
                  Trade BQ Submitted Successfully
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{tradeForm.contactPerson || tradeForm.companyName}</strong>. Our senior commercial estimator is preparing a comprehensive wholesale proposal for {tradeForm.siteLocation || 'your site'}.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppBQLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> Send BQ Instantly via WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 border border-neutral-300 text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                  >
                    Submit Another Project
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Company / Architectural Firm *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Construction Ltd / Studio 7"
                      value={tradeForm.companyName}
                      onChange={(e) =>
                        setTradeForm({ ...tradeForm, companyName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Contact Person & Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. QS Kiprono Langat"
                      value={tradeForm.contactPerson}
                      onChange={(e) =>
                        setTradeForm({ ...tradeForm, contactPerson: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0722 000 000"
                      value={tradeForm.phone}
                      onChange={(e) =>
                        setTradeForm({ ...tradeForm, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Email for Proforma Delivery *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.co.ke"
                      value={tradeForm.email}
                      onChange={(e) =>
                        setTradeForm({ ...tradeForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Site Location / County
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Annex, Eldoret / Kitale Road"
                      value={tradeForm.siteLocation}
                      onChange={(e) =>
                        setTradeForm({ ...tradeForm, siteLocation: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Estimated Tile Coverage (SQM)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 650"
                      value={tradeForm.estimatedSQM}
                      onChange={(e) =>
                        setTradeForm({ ...tradeForm, estimatedSQM: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Bill of Quantities (BQ) Notes & Specifications
                  </label>
                  <textarea
                    rows={4}
                    placeholder="List required items, dimensions (e.g. 60x60 matte, 60x120 polished), shower quantities, 40A switches, and delivery timeline..."
                    value={tradeForm.bqNotes}
                    onChange={(e) =>
                      setTradeForm({ ...tradeForm, bqNotes: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-950 text-white font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  Submit BQ for Trade Quotation
                </button>
              </form>
            )}
          </AnimatedReveal>

          {/* Right: Technical Assistance & Direct Line */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatedReveal delay={0.25} className="bg-white p-7 border border-neutral-200 shadow-sm space-y-4 arch-crosshair">
              <h3 className="font-bold text-base font-heading text-neutral-950">
                Contractor Direct Staging Policy
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We understand construction cashflow and site schedules. Our Eldoret warehouse facilitates staggered collections so you only pay for and load what your tilers need each week.
              </p>

              <div className="border-t border-neutral-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Forklift Staging:</span>
                  <span className="font-bold text-neutral-950">Free at Unit G48</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Minimum Trade Pallet:</span>
                  <span className="font-bold text-neutral-950">50 m² or 35 Boxes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Bank Transfer (EFT/RTGS):</span>
                  <span className="font-bold text-neutral-950">Stanbic Bank Kenya</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Sample Board Dispatch:</span>
                  <span className="font-bold text-emerald-700">Available on Request</span>
                </div>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.35} className="bg-neutral-950 bg-arch-dark-grid text-white p-7 border border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C2A26F] font-semibold block">
                Trade WhatsApp Desk
              </span>
              <h4 className="font-bold text-base font-heading">
                Direct Line with Chief Estimator
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Have an urgent tender deadline today? Send your drawings and schedules directly via WhatsApp for an expedited 2-hour response.
              </p>
              <a
                href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20have%20an%20urgent%20Architectural%20BQ%20tender%20for%20review.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Message +254 20 230 859
              </a>
            </AnimatedReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
