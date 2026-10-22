import React from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

interface ShowroomsSpotlightProps {
  onNavigateToContact: () => void;
  onNavigateToTrade: () => void;
}

export const ShowroomsSpotlight: React.FC<ShowroomsSpotlightProps> = ({
  onNavigateToContact,
  onNavigateToTrade,
}) => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0D0D0D] text-white border-b border-neutral-800 overflow-hidden">
      {/* Background Architectural Blueprint texture */}
      <div className="absolute inset-0 bg-arch-dark-grid opacity-25 pointer-events-none" />

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Architectural Experience Center</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-light font-heading text-white leading-tight">
              <strong>Showroom & Depot.</strong>
              <br />
              Experience full slabs under natural light.
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed font-normal max-w-xl">
              Large, refined and welcoming spaces to introduce you to the Bikomax experience. Inspect full porcelain slabs under natural daylight, review calibrated sample boards, and witness live water pressure tests on concealed smart showers at Unit G48, Rupa&apos;s Godowns, Eldoret.
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/80 border border-neutral-800">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Forklift pallet loading for all vehicle types</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/80 border border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bill of Quantities (BQ) dual-pricing trade desk</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onNavigateToContact}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-amber-500/30 rounded-xs active:scale-98"
              >
                Showroom Directions & Hours
              </button>

              <button
                type="button"
                onClick={onNavigateToTrade}
                className="px-7 py-3.5 border border-neutral-700 hover:border-amber-500 hover:text-amber-400 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-xs"
              >
                Trade & Architect Desk
              </button>
            </div>
          </div>

          {/* Right Specimen Card */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 p-8 space-y-6 shadow-2xl relative">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block font-semibold">
                Direct Contact & Inquiries
              </span>
              <h3 className="text-xl font-bold font-heading text-white mt-1">
                Eldoret Flagship Depot
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {SHOWROOM_CONTACT.showroomLocation}
              </p>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 font-mono">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SHOWROOM_CONTACT.openingHours}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${SHOWROOM_CONTACT.phoneRaw}`} className="hover:text-white font-bold">
                  {SHOWROOM_CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20would%20like%20to%20inquire%20about%20visiting%20the%20showroom.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp Concierge</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
