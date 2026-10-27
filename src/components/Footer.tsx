import React from 'react';
import { BikomaxLogo } from './BikomaxLogo';
import { SHOWROOM_CONTACT } from '../data/products';
import { NavPage } from './Navbar';
import { MapPin, Phone, Mail, Clock, ShieldCheck, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: NavPage) => void;
  onSelectCategory: (cat: string) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenCalculator,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: NavPage) => {
    if (onNavigate) {
      onNavigate(page);
    }
    scrollToTop();
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-neutral-800">
      {/* Upper Showroom Strip */}
      <div className="border-b border-neutral-800 py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-amber-500 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block font-heading">
                Physical Showroom & Warehouse
              </span>
              <p className="text-white font-medium mt-1 leading-relaxed">
                {SHOWROOM_CONTACT.showroomLocation}
              </p>
              <button
                type="button"
                onClick={() => handlePageClick('contact')}
                className="text-amber-400 text-[11px] hover:underline block mt-0.5"
              >
                View Directions & Booking Form →
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-amber-500 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block font-heading">
                Inquiries & WhatsApp Orders
              </span>
              <p className="text-white font-medium mt-1 font-mono">
                {SHOWROOM_CONTACT.phone}
              </p>
              <a
                href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1 mt-0.5 hover:underline"
              >
                <MessageCircle className="w-3 h-3" />
                Chat with Technical Sales Desk
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-amber-500 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block font-heading">
                Showroom Operational Hours
              </span>
              <p className="text-white font-medium mt-1 leading-relaxed">
                {SHOWROOM_CONTACT.openingHours}
              </p>
              <span className="text-neutral-500 text-[11px] block mt-0.5">
                Commercial dispatch runs Monday through Saturday
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <BikomaxLogo size="lg" variant="light" />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mt-2">
              Distributor of premium architectural building supplies. We supply architects, developers, contractors, and discerning homeowners across Eldoret, the North Rift, and Western Kenya.
            </p>
          </div>

          {/* Site Pages */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="text-xs uppercase tracking-wider font-bold text-white font-heading block">
              Pages & Navigation
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick('catalogue')}
                  className="hover:text-white transition-colors"
                >
                  Catalogue
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contacts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick('trade')}
                  className="hover:text-white transition-colors"
                >
                  Trade
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="text-xs uppercase tracking-wider font-bold text-white font-heading block">
              Architectural Collections
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('Tiles');
                    handlePageClick('catalogue');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Porcelain Floor & Wall Tiles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('Tiles');
                    handlePageClick('catalogue');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Large Format Slabs (60x120 & 120x240 cm)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('Sanitaryware');
                    handlePageClick('catalogue');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Gun Grey Piano Shower Systems
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('Sanitaryware');
                    handlePageClick('catalogue');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Freestanding Bathtubs & Smart Bidets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('Electrical');
                    handlePageClick('catalogue');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Heavy Duty 40A DP Switches & Faceplates
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Tools & Trade Desk */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="text-xs uppercase tracking-wider font-bold text-white font-heading block">
              Trade & BQ Desk
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Are you an architect or quantity surveyor with a Bill of Quantities (BQ)? Send your schedule of finishes directly to our Eldoret team.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-full py-2 px-3 border border-neutral-700 hover:border-white text-xs font-semibold text-white text-left flex items-center justify-between transition-colors"
              >
                <span>Launch Tile Coverage Quick-Tool</span>
                <span className="text-amber-400 font-mono">→</span>
              </button>
              <button
                type="button"
                onClick={() => handlePageClick('trade')}
                className="w-full py-2 px-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-xs text-neutral-300 hover:text-white text-left block transition-colors"
              >
                Submit Project BQ Schedule →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-10 mt-10 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} BIKOMAX LTD. All Rights Reserved. Rupa’s Godowns, Unit G48, Eldoret, Kenya.
          </div>

          <div className="flex items-center gap-4">
            <span>Currency: Kenyan Shillings (KES)</span>
            <span>·</span>
            <span>Tax Compliant KRA PIN Registered</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 bg-neutral-900 border border-neutral-800 hover:text-white text-neutral-400 transition-colors ml-2"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
