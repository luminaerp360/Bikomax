import React, { useState } from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Send,
  Navigation,
  Warehouse,
  Truck,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Tiles & Slabs Specification',
    message: '',
  });

  const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/rDJ99dP1fq2GMFPf6";

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = `Hello Bikomax Eldoret,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nInquiry: ${formData.inquiryType}\nMessage: ${formData.message || 'I would like to inquire about your products.'}`;
    return `https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-neutral-900 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900 min-h-screen">
      
      {/* 1. HERO SECTION: ARCHITECTURAL, BALANCED & PREMIUM */}
      <section className="w-full bg-white border-b border-neutral-200 py-10 lg:py-14">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-600/30 rounded-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold">
                  ELDORET, KENYA • RUPA&apos;S GODOWNS
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light font-heading text-neutral-950 leading-[1.15]">
                  Get in touch with{' '}
                  <span className="font-semibold text-neutral-950 border-b-2 border-amber-600 pb-0.5">Bikomax</span>.
                </h1>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
                  Visit our physical showroom at Unit G48 Rupa&apos;s Godowns to review live porcelain slabs, speak directly with our specification team, or send a quick trade inquiry.
                </p>
              </div>

              {/* Architectural Key Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-xl">
                <div className="p-3 bg-[#FAF9F6] border border-neutral-200 rounded-xs space-y-0.5">
                  <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-mono uppercase tracking-wider">
                    <Warehouse className="w-3.5 h-3.5 text-amber-600" />
                    <span>Central Depot</span>
                  </div>
                  <div className="text-xs font-bold font-heading text-neutral-950">
                    Unit G48, Rupa&apos;s
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Eldoret, Kenya
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F6] border border-neutral-200 rounded-xs space-y-0.5">
                  <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-mono uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Buffer Inventory</span>
                  </div>
                  <div className="text-xs font-bold font-heading text-neutral-950">
                    20,000+ m² In-Stock
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Porcelain &amp; Sanitaryware
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F6] border border-neutral-200 rounded-xs space-y-0.5">
                  <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-mono uppercase tracking-wider">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="text-xs font-bold font-heading text-emerald-700">
                    48-Hour Staging
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Direct on-site offload
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20would%20like%20to%20consult%20on%20my%20building%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 rounded-xs shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${SHOWROOM_CONTACT.phoneRaw}`}
                  className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 rounded-xs shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{SHOWROOM_CONTACT.phone}</span>
                </a>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 rounded-xs shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>View Map Location</span>
                </a>
              </div>

            </div>

            {/* Right: Architectural Showcase Bezel */}
            <div className="lg:col-span-5">
              <div className="bg-[#121212] text-white p-3 border border-neutral-800 shadow-xl rounded-xs">
                <div className="relative aspect-16/10 overflow-hidden rounded-xs border border-neutral-800">
                  <img
                    src="/products/room-living-pavilion.jpg"
                    alt="Bikomax Experience Center at Rupa's Godowns Eldoret"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                    <div className="text-xs font-mono">
                      <span className="text-amber-400 font-semibold block uppercase tracking-wider">
                        EXPERIENCE SHOWROOM &amp; LOGISTICS
                      </span>
                      <span className="text-neutral-300 text-[11px]">
                        Unit G48, Rupa&apos;s Godowns · Eldoret, Kenya
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 px-1 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open for Consultations &amp; Dispatch
                  </span>
                  <span className="text-amber-400 font-semibold uppercase">MON – SAT 8AM–6PM</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DIRECT CONTACT CHANNELS (4 CARDS) */}
      <section className="w-full py-8 md:py-10 border-b border-neutral-200 bg-[#FAF8F5]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Showroom Location */}
            <div className="bg-white border border-neutral-300/90 p-5 rounded-xs shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xs bg-amber-500/10 border border-amber-600/20 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                  01 / CENTRAL DEPOT
                </span>
                <h3 className="text-sm font-bold font-heading text-neutral-950 uppercase tracking-wider">
                  Showroom &amp; Depot
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Unit G48, Rupa&apos;s Godowns, off Uganda Road, Eldoret, Kenya.
                </p>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-amber-700 hover:text-neutral-950 inline-flex items-center gap-1.5 transition-colors pt-2 border-t border-neutral-100"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Card 2: Phone & WhatsApp */}
            <div className="bg-white border border-neutral-300/90 p-5 rounded-xs shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xs bg-emerald-500/10 border border-emerald-600/20 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                  02 / VOICE DESK
                </span>
                <h3 className="text-sm font-bold font-heading text-neutral-950 uppercase tracking-wider">
                  Call &amp; WhatsApp
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[10px] font-mono uppercase">Direct Phone</span>
                    <a href={`tel:${SHOWROOM_CONTACT.phoneRaw}`} className="font-mono font-bold text-neutral-950 hover:text-amber-700">
                      {SHOWROOM_CONTACT.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] font-mono uppercase">WhatsApp Chat</span>
                    <a
                      href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-emerald-700 hover:underline"
                    >
                      +254 720 230 859
                    </a>
                  </div>
                </div>
              </div>
              <a
                href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 transition-colors pt-2 border-t border-neutral-100"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp →</span>
              </a>
            </div>

            {/* Card 3: Email Desk */}
            <div className="bg-white border border-neutral-300/90 p-5 rounded-xs shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xs bg-amber-500/10 border border-amber-600/20 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                  03 / EMAIL DESK
                </span>
                <h3 className="text-sm font-bold font-heading text-neutral-950 uppercase tracking-wider">
                  Official Inquiries
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <a href="mailto:Info@bikomax.co.ke" className="text-neutral-950 hover:text-amber-700 font-semibold truncate">
                      Info@bikomax.co.ke
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('Info@bikomax.co.ke')}
                      title="Copy email"
                      className="text-neutral-400 hover:text-amber-700 cursor-pointer p-0.5"
                    >
                      {copiedEmail === 'Info@bikomax.co.ke' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <a href="mailto:Bikomaxltd@gmail.com" className="text-neutral-950 hover:text-amber-700 font-semibold truncate">
                      Bikomaxltd@gmail.com
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('Bikomaxltd@gmail.com')}
                      title="Copy email"
                      className="text-neutral-400 hover:text-amber-700 cursor-pointer p-0.5"
                    >
                      {copiedEmail === 'Bikomaxltd@gmail.com' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-100 flex items-center justify-between">
                <span>Response time</span>
                <span className="text-amber-700 font-semibold">Within 24 hours</span>
              </div>
            </div>

            {/* Card 4: Operating Hours */}
            <div className="bg-white border border-neutral-300/90 p-5 rounded-xs shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xs bg-amber-500/10 border border-amber-600/20 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                  04 / DEPOT HOURS
                </span>
                <h3 className="text-sm font-bold font-heading text-neutral-950 uppercase tracking-wider">
                  Operating Hours
                </h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Mon – Fri:</span>
                    <span className="font-bold text-neutral-950">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Saturday:</span>
                    <span className="font-bold text-neutral-950">8:30 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1.5 pt-2 border-t border-neutral-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Open for Walk-ins &amp; Pickups</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & LIVE MAP LOCATION */}
      <section className="w-full py-10 md:py-14">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-neutral-300/90 rounded-xs shadow-xs">
              <div className="mb-6 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                  FAST-TRACK INQUIRY
                </span>
                <h2 className="text-xl sm:text-2xl font-light font-heading text-neutral-950">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-neutral-600">
                  Fill in your details below and our specification desk will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3 rounded-xs">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-950">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. We have received your inquiry regarding <strong>{formData.inquiryType}</strong> and will contact you shortly.
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xs cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xs bg-white text-neutral-900 focus:outline-hidden focus:border-amber-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0722 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xs bg-white text-neutral-900 focus:outline-hidden focus:border-amber-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xs bg-white text-neutral-900 focus:outline-hidden focus:border-amber-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xs bg-white text-neutral-900 focus:outline-hidden focus:border-amber-600 transition-colors"
                      >
                        <option value="Tiles & Slabs Specification">Tiles &amp; Slabs Specification</option>
                        <option value="Sanitaryware & Fittings">Sanitaryware &amp; Fittings</option>
                        <option value="Architectural Switches">Architectural Switches</option>
                        <option value="Trade Bill of Quantities (BQ)">Trade Bill of Quantities (BQ)</option>
                        <option value="Showroom Visit Booking">Showroom Visit Booking</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 uppercase tracking-wider text-[11px] mb-1.5">
                      Message / Project Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project, required sizes, quantity, or specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xs bg-white text-neutral-900 focus:outline-hidden focus:border-amber-600 transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-bold uppercase tracking-wider text-xs rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Message</span>
                    </button>

                    <a
                      href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20have%20an%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold uppercase tracking-wider text-xs rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Or Chat via WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Embedded Google Map Location */}
            <div className="lg:col-span-5 bg-white border border-neutral-300/90 rounded-xs overflow-hidden shadow-xs flex flex-col justify-between">
              
              {/* Map Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold">
                      LOCATION &amp; DIRECTIONS
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-heading text-neutral-950 mt-0.5">
                    Unit G48, Rupa&apos;s Godowns
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Off Uganda Road, Eldoret, Kenya
                  </p>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-amber-400" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="w-full h-72 sm:h-80 bg-neutral-100 relative">
                <iframe
                  title="Bikomax Company Limited - Rupa's Godowns Eldoret Location"
                  src="https://maps.google.com/maps?q=0.5158928,35.286191&z=16&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map Footer Information */}
              <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono text-[11px]">Free On-Site Visitor Parking</span>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-neutral-950 font-bold inline-flex items-center gap-1 transition-colors text-xs"
                  >
                    <span>Open in Google Maps App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed border-t border-neutral-100 pt-2">
                  Direct drive-in access for saloon cars, pickups, and contractor freight canters with dedicated forklift loading bays at Unit G48.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
