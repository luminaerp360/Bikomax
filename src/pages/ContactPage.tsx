import React, { useState } from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import { AnimatedReveal, StaggerContainer, StaggerItem } from '../components/AnimatedReveal';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Calendar,
  Building,
  Truck,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  FileText,
  CreditCard,
  HelpCircle,
  Sparkles,
  PhoneCall,
  Compass
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  // Mode toggle between "Book Showroom Visit" and "Request Trade BQ Quote"
  const [activeFormTab, setActiveFormTab] = useState<'appointment' | 'tradeQuote'>('appointment');

  // Appointment Form State
  const [appointment, setAppointment] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '10:00 AM',
    projectType: 'Residential Build / Private Villa',
    interests: 'Porcelain Floor & Wall Slabs',
    approxSqm: '',
    notes: '',
  });
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  // Trade BQ State
  const [tradeQuote, setTradeQuote] = useState({
    firmName: '',
    contactPerson: '',
    phone: '',
    email: '',
    projectLocation: 'Eldoret / North Rift',
    categoriesNeeded: 'Tiles & Slabs',
    approxBudgetOrSqm: '',
    tenderDeadline: '',
    notes: '',
  });
  const [tradeQuoteSent, setTradeQuoteSent] = useState(false);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment.name || !appointment.phone) return;
    setAppointmentBooked(true);
  };

  const handleSendTradeQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradeQuote.contactPerson || !tradeQuote.phone) return;
    setTradeQuoteSent(true);
  };

  const getWhatsAppAppointmentLink = () => {
    const text = `🏛️ *SHOWROOM VISIT RESERVATION - BIKOMAX ELDORET*\n*Client Name:* ${appointment.name}\n*Phone:* ${appointment.phone}\n*Date & Time:* ${appointment.date || 'To be confirmed'} at ${appointment.time}\n*Project Type:* ${appointment.projectType}\n*Material Interest:* ${appointment.interests}\n*Est. Scope:* ${appointment.approxSqm || 'Not specified'}\n*Notes:* ${appointment.notes || 'None'}\n_Please confirm materials host availability at Unit G48, Rupa's Godowns._`;
    return `https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppTradeQuoteLink = () => {
    const text = `📋 *TRADE BQ & COMMERCIAL INQUIRY - BIKOMAX ELDORET*\n*Firm/Developer:* ${tradeQuote.firmName || 'Private Developer'}\n*Contact Person:* ${tradeQuote.contactPerson}\n*Phone:* ${tradeQuote.phone}\n*Project Location:* ${tradeQuote.projectLocation}\n*Materials Needed:* ${tradeQuote.categoriesNeeded}\n*Est. Scope/SQM:* ${tradeQuote.approxBudgetOrSqm || 'TBD'}\n*Tender/Deadline:* ${tradeQuote.tenderDeadline || 'Flexible'}\n*Notes:* ${tradeQuote.notes || 'None'}\n_Please forward to our Commercial Trade Desk for quantity take-off review._`;
    return `https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-[#FAF9F6] text-neutral-950 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900 pb-24">
      
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-neutral-200/70 py-3.5">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            <a href="/" className="hover:text-neutral-900">Home</a>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-500">Corporate</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-amber-600 font-semibold">Contact & Experience Center</span>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="bg-white bg-arch-grid border-b border-neutral-200/70 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-4xl space-y-5">
            <AnimatedReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-600/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-700 font-semibold">
                  CENTRAL DEPOT & ARCHITECTURAL CONSULTATION
                </span>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-heading tracking-tight text-neutral-950 leading-[1.12]">
                Experience precision materials at{' '}
                <span className="font-semibold text-neutral-900 underline decoration-amber-500/40 decoration-wavy decoration-1 underline-offset-8">
                  Unit G48, Rupa&apos;s Godowns
                </span>
                .
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2}>
              <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl">
                Connect directly with our architectural specification team, request rapid quantity take-off quotes, or visit our central Eldoret showcase to evaluate full porcelain slabs and hydro-tested smart sanitaryware.
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.28}>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-neutral-700">
                <span className="px-3 py-1.5 bg-neutral-100/90 border border-neutral-200 rounded-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Mon – Sat Openings
                </span>
                <span className="px-3 py-1.5 bg-neutral-100/90 border border-neutral-200 rounded-xs flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-600" /> Forklift Pallet Staging
                </span>
                <span className="px-3 py-1.5 bg-neutral-100/90 border border-neutral-200 rounded-xs flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> Instant WhatsApp Response
                </span>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* 3. FOUR DIRECT COMMUNICATION CHANNELS */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Showroom Location */}
          <AnimatedReveal delay={0.1}>
            <div className="bg-white p-7 border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-neutral-950 text-amber-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block">
                  Experience Center
                </span>
                <h3 className="text-base font-bold font-heading text-neutral-950">
                  Physical Showroom
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Unit G48, Rupa&apos;s Godowns, off Uganda Road / Industrial Corridor, Eldoret, Kenya.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                <span>Free On-Site Visitor Parking</span>
              </div>
            </div>
          </AnimatedReveal>

          {/* Card 2: Trade & Phone Desk */}
          <AnimatedReveal delay={0.18}>
            <div className="bg-white p-7 border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-neutral-950 text-amber-500 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block">
                  Direct Line
                </span>
                <h3 className="text-base font-bold font-heading text-neutral-950">
                  Phone & WhatsApp
                </h3>
                <div className="text-xs text-neutral-700 space-y-1">
                  <div>Telephone: <span className="font-mono font-bold text-neutral-950">{SHOWROOM_CONTACT.phone}</span></div>
                  <div>WhatsApp: <span className="font-mono font-bold text-emerald-700">+254 720 230 859</span></div>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100">
                <a
                  href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </AnimatedReveal>

          {/* Card 3: Commercial & BQ Inquiries */}
          <AnimatedReveal delay={0.26}>
            <div className="bg-white p-7 border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-neutral-950 text-amber-500 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block">
                  Tenders & Orders
                </span>
                <h3 className="text-base font-bold font-heading text-neutral-950">
                  Written Correspondence
                </h3>
                <div className="text-xs text-neutral-700 space-y-1">
                  <div className="font-mono text-neutral-800">{SHOWROOM_CONTACT.email}</div>
                  <div className="text-[11px] text-neutral-500">24-hour response turnaround on architectural bills of quantities.</div>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                <span>PDF BQ Submissions Accepted</span>
              </div>
            </div>
          </AnimatedReveal>

          {/* Card 4: Operating Hours */}
          <AnimatedReveal delay={0.34}>
            <div className="bg-white p-7 border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-neutral-950 text-amber-500 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block">
                  Visiting Hours
                </span>
                <h3 className="text-base font-bold font-heading text-neutral-950">
                  Showroom Timings
                </h3>
                <div className="text-xs text-neutral-700 space-y-1">
                  <div className="flex justify-between"><span>Mon – Fri:</span> <span className="font-bold text-neutral-950">8:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday:</span> <span className="font-bold text-neutral-950">8:30 AM – 4:00 PM</span></div>
                  <div className="flex justify-between text-neutral-400"><span>Sunday:</span> <span>Closed</span></div>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 text-[11px] font-mono text-amber-600 font-semibold">
                <span>Open for Walk-ins & Bookings</span>
              </div>
            </div>
          </AnimatedReveal>

        </div>
      </section>

      {/* 4. MAIN INTERACTIVE SECTION: TABBED FORMS & LOCATION GUIDE */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Tabbed Form (Showroom Booking & Trade Quote) */}
          <AnimatedReveal delay={0.15} className="lg:col-span-7 bg-white p-8 sm:p-10 border border-neutral-200 shadow-sm">
            
            {/* Tab Selector */}
            <div className="flex items-center border-b border-neutral-200 mb-8">
              <button
                type="button"
                onClick={() => setActiveFormTab('appointment')}
                className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer relative ${
                  activeFormTab === 'appointment'
                    ? 'text-neutral-950 border-b-2 border-neutral-950'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                1. Book Showroom Consultation
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('tradeQuote')}
                className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer relative ${
                  activeFormTab === 'tradeQuote'
                    ? 'text-neutral-950 border-b-2 border-neutral-950'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                2. Request Trade / BQ Quotation
              </button>
            </div>

            {/* TAB 1: SHOWROOM APPOINTMENT */}
            {activeFormTab === 'appointment' && (
              <div>
                <div className="mb-6 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block">
                    Personalized Materials Guidance
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950">
                    Reserve a Private Showroom Session
                  </h2>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    Meet with a dedicated architectural material specialist at Unit G48. Review physical slabs under natural sunlight and test hydraulic plumbing fittings.
                  </p>
                </div>

                {appointmentBooked ? (
                  <div className="p-8 bg-neutral-50 border border-neutral-200 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-950">
                      Showroom Session Requested
                    </h3>
                    <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{appointment.name}</strong>. Your consultation has been logged for <strong>{appointment.date || 'your preferred date'} at {appointment.time}</strong> at Unit G48, Rupa&apos;s Godowns, Eldoret.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={getWhatsAppAppointmentLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" /> Send Confirmation via WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => setAppointmentBooked(false)}
                        className="px-5 py-3 border border-neutral-300 text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                      >
                        Modify Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Eng. Dennis Kiprop"
                          value={appointment.name}
                          onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 0722 000 000"
                          value={appointment.phone}
                          onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="architect@domain.co.ke"
                          value={appointment.email}
                          onChange={(e) => setAppointment({ ...appointment, email: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={appointment.date}
                          onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Project Classification
                        </label>
                        <select
                          value={appointment.projectType}
                          onChange={(e) => setAppointment({ ...appointment, projectType: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-950"
                        >
                          <option value="Residential Build / Private Villa">Residential Build / Private Villa</option>
                          <option value="Multi-Unit Residential / Apartments">Multi-Unit Residential / Apartments</option>
                          <option value="Commercial Plaza / Office Park">Commercial Plaza / Office Park</option>
                          <option value="Hospitality / Resort / Hotel">Hospitality / Resort / Hotel</option>
                          <option value="Institutional / Church / Healthcare">Institutional / Church / Healthcare</option>
                          <option value="Private Renovation">Private Renovation</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Primary Material Focus
                        </label>
                        <select
                          value={appointment.interests}
                          onChange={(e) => setAppointment({ ...appointment, interests: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-950"
                        >
                          <option value="Porcelain Floor & Wall Slabs">Porcelain Floor & Wall Slabs (60x60 / 60x120cm)</option>
                          <option value="Concealed Hydro-Wellness Sanitaryware">Concealed Hydro-Wellness Sanitaryware</option>
                          <option value="Architectural Switches & Power Plates">Architectural Switches & Power Plates</option>
                          <option value="Complete Finishes Specification (All Divisions)">Complete Finishes Specification (All Divisions)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Approx. Surface Area (m²) or Scope
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 450 m² floor + 3 en-suite bathrooms"
                          value={appointment.approxSqm}
                          onChange={(e) => setAppointment({ ...appointment, approxSqm: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Preferred Appointment Time
                        </label>
                        <select
                          value={appointment.time}
                          onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-950"
                        >
                          <option value="9:00 AM">9:00 AM – Morning</option>
                          <option value="10:30 AM">10:30 AM – Morning</option>
                          <option value="12:00 PM">12:00 PM – Midday</option>
                          <option value="2:30 PM">2:30 PM – Afternoon</option>
                          <option value="4:00 PM">4:00 PM – Late Afternoon</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        Specific Architectural Requirements or Drawings
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. We require honed matte marble finishes for continuous living room and veranda transitions..."
                        value={appointment.notes}
                        onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
                        className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-neutral-950 text-white font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors cursor-pointer shadow-md"
                    >
                      Confirm Showroom Appointment
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: TRADE BQ QUOTE */}
            {activeFormTab === 'tradeQuote' && (
              <div>
                <div className="mb-6 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block">
                    Commercial & Tender Desk
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950">
                    Submit Bill of Quantities (BQ) Inquiries
                  </h2>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    Structured commercial pricing, locked tender rates, and staged pallet delivery schedules for contractors, architects, and quantity surveyors.
                  </p>
                </div>

                {tradeQuoteSent ? (
                  <div className="p-8 bg-neutral-50 border border-neutral-200 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-950">
                      Trade Inquiry Logged
                    </h3>
                    <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{tradeQuote.contactPerson}</strong>. Our Commercial Quantity Estimators are reviewing your specification and will provide a structured schedule.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={getWhatsAppTradeQuoteLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" /> Forward Details to Commercial Desk
                      </a>
                      <button
                        type="button"
                        onClick={() => setTradeQuoteSent(false)}
                        className="px-5 py-3 border border-neutral-300 text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                      >
                        Submit Another BQ
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendTradeQuote} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Firm / Architectural Practice / Contractor Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Studio Apex Architects Ltd"
                          value={tradeQuote.firmName}
                          onChange={(e) => setTradeQuote({ ...tradeQuote, firmName: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Contact Person & Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Q.S. Martin Koech"
                          value={tradeQuote.contactPerson}
                          onChange={(e) => setTradeQuote({ ...tradeQuote, contactPerson: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Direct Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 0722 000 000"
                          value={tradeQuote.phone}
                          onChange={(e) => setTradeQuote({ ...tradeQuote, phone: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Official Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="tenders@studioapex.co.ke"
                          value={tradeQuote.email}
                          onChange={(e) => setTradeQuote({ ...tradeQuote, email: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Project Site Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Elgon View, Eldoret / Kitale CBD"
                          value={tradeQuote.projectLocation}
                          onChange={(e) => setTradeQuote({ ...tradeQuote, projectLocation: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Estimated Quantity (m² or Units)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 1,200 m² tiles + 24 complete bathrooms"
                          value={tradeQuote.approxBudgetOrSqm}
                          onChange={(e) => setTradeQuote({ ...tradeQuote, approxBudgetOrSqm: e.target.value })}
                          className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        Tender Specifications & BQ Line Items
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Please list tile dimensions, sanitaryware models, switch requirements, or notes regarding required delivery phases..."
                        value={tradeQuote.notes}
                        onChange={(e) => setTradeQuote({ ...tradeQuote, notes: e.target.value })}
                        className="w-full px-3 py-2.5 border border-neutral-300 focus:outline-hidden focus:border-neutral-950 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-neutral-950 text-white font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors cursor-pointer shadow-md"
                    >
                      Request Formal Trade Quotation
                    </button>
                  </form>
                )}
              </div>
            )}

          </AnimatedReveal>

          {/* Right Column: Depot Location Guide & Official Credentials */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Visual Location Card */}
            <AnimatedReveal delay={0.25} className="bg-white p-7 border border-neutral-200 shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold block">
                  How to Reach Us
                </span>
                <h3 className="text-xl font-bold font-heading text-neutral-950 mt-1">
                  Finding Unit G48 at Rupa&apos;s Godowns
                </h3>
              </div>

              <div className="relative aspect-16/10 bg-neutral-900 overflow-hidden border border-neutral-200">
                <img
                  src="/products/room-kitchen-sim.jpg"
                  alt="Bikomax Central Logistics Staging"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">
                    Central Staging Hub
                  </span>
                  <span className="font-bold text-sm">
                    Unit G48, Rupa&apos;s Godowns, Eldoret
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="p-3.5 bg-[#FAF9F7] border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-950 block">From Eldoret CBD:</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Drive towards the Uganda Road commercial and industrial corridor. Turn into the Rupa’s Godowns main gate and proceed straight to Unit G48.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF9F7] border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-950 block">Contractor Truck & Freight Access:</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Full-clearance industrial doors with dedicated forklift staging bays ready to accommodate flatbed lorries, canters, and light trucks.
                  </p>
                </div>
              </div>
            </AnimatedReveal>

            {/* Official Banking & Verification Credentials */}
            <AnimatedReveal delay={0.35} className="bg-neutral-950 bg-arch-dark-grid text-white p-7 border border-neutral-800 space-y-5">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold block">
                  Official Entity & Settlement
                </span>
                <h4 className="font-bold text-lg font-heading text-white mt-1">
                  Corporate Banking & Payment Channels
                </h4>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                  <span className="text-neutral-400">REGISTERED ENTITY:</span>
                  <span className="text-white font-semibold">{SHOWROOM_CONTACT.bankDetails.accountName}</span>
                </div>
                
                <div className="p-3 bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                  <span className="text-neutral-400">BANK / BRANCH:</span>
                  <span className="text-white font-semibold">{SHOWROOM_CONTACT.bankDetails.bankName} – {SHOWROOM_CONTACT.bankDetails.branch}</span>
                </div>

                <div className="p-3 bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                  <span className="text-neutral-400">ACCOUNT NUMBER:</span>
                  <span className="text-amber-400 font-bold">{SHOWROOM_CONTACT.bankDetails.accountNumber}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                    <span className="text-neutral-400 text-[10px] block">MPESA BUSINESS PAYBILL</span>
                    <span className="text-white font-bold text-sm">{SHOWROOM_CONTACT.paybill}</span>
                    <span className="text-[10px] text-neutral-400 block">Acc: {SHOWROOM_CONTACT.paybillAccount}</span>
                  </div>

                  <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1">
                    <span className="text-neutral-400 text-[10px] block">BUY GOODS TILL NUMBER</span>
                    <span className="text-white font-bold text-sm">{SHOWROOM_CONTACT.tillNumber}</span>
                    <span className="text-[10px] text-emerald-400 block">Instant Automated Receipt</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 leading-normal border-t border-neutral-800 pt-3">
                Official electronic ETR tax invoices issued on all trade and retail consignments.
              </p>
            </AnimatedReveal>

          </div>

        </div>
      </section>

    </div>
  );
};
