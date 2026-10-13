import React, { useState } from 'react';
import { SHOWROOM_CONTACT } from '../data/products';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Calendar, User, Building, Truck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  // Appointment Form State
  const [appointment, setAppointment] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '10:00 AM',
    projectType: 'Residential Build',
    interests: 'Tiles & Slabs',
    notes: '',
  });
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  // General Message State
  const [generalMessage, setGeneralMessage] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment.name || !appointment.phone) return;
    setAppointmentBooked(true);
  };

  const handleSendGeneralMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generalMessage.name || !generalMessage.phone) return;
    setMessageSent(true);
  };

  const getWhatsAppAppointmentLink = () => {
    const text = `🏛️ *SHOWROOM VISIT BOOKING - BIKOMAX ELDORET*\n*Name:* ${appointment.name}\n*Phone:* ${appointment.phone}\n*Date:* ${appointment.date} at ${appointment.time}\n*Project Type:* ${appointment.projectType}\n*Focus:* ${appointment.interests}\n*Notes:* ${appointment.notes || 'N/A'}\n_Please confirm showroom host availability at Unit G48, Rupa's Godowns._`;
    return `https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-[#FAFAFA] text-neutral-950 font-sans pb-24">
      {/* Hero Header with subtle pattern */}
      <section className="bg-white bg-arch-grid border-b border-neutral-200/60 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-3xl space-y-3">
            <AnimatedReveal>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#C2A26F] font-medium block">
                Direct Contact & Depot
              </span>
            </AnimatedReveal>

            <AnimatedReveal delay={0.12}>
              <h1 className="text-4xl sm:text-6xl font-light font-heading tracking-tight text-neutral-950">
                Showroom & Staging
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.22}>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Visit our central depot at Rupa’s Godowns, Unit G48, Eldoret or connect directly with our materials team for site deliveries.
              </p>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedReveal delay={0.1}>
            <div className="bg-white p-7 border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-2.5">
              <div className="w-10 h-10 bg-neutral-950 text-[#C2A26F] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-heading pt-1">
                Physical Location
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {SHOWROOM_CONTACT.showroomLocation}
              </p>
              <span className="text-[11px] text-[#C2A26F] font-mono block font-medium">
                Uganda Road Axis, Eldoret
              </span>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.2}>
            <div className="bg-white p-7 border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-2.5">
              <div className="w-10 h-10 bg-neutral-950 text-[#C2A26F] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-heading pt-1">
                Direct Communication
              </h3>
              <div className="text-xs text-neutral-600 space-y-1">
                <div>Telephone: <span className="font-bold text-neutral-950 font-mono">{SHOWROOM_CONTACT.phone}</span></div>
                <div>Email: <span className="font-mono text-neutral-700">{SHOWROOM_CONTACT.email}</span></div>
              </div>
              <a
                href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 text-xs font-bold flex items-center gap-1 hover:underline pt-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Desk
              </a>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.3}>
            <div className="bg-white p-7 border border-neutral-200/80 arch-crosshair shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-2.5">
              <div className="w-10 h-10 bg-neutral-950 text-[#C2A26F] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-950 font-heading pt-1">
                Operational Hours
              </h3>
              <div className="text-xs text-neutral-600 space-y-1 leading-relaxed">
                <div>Mon – Fri: <strong>8:00 AM – 6:00 PM</strong></div>
                <div>Saturday: <strong>8:30 AM – 4:00 PM</strong></div>
                <div>Sunday: <strong>Closed</strong></div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      {/* Main Content Grid: Appointment Booking & Directions */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Appointment Booking */}
          <AnimatedReveal delay={0.15} className="lg:col-span-7 bg-white p-7 sm:p-9 border border-neutral-200 shadow-sm arch-crosshair">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C2A26F] font-bold">
                Personalized Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-heading text-neutral-950 mt-1">
                Book a Showroom Visit
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Reserve dedicated time with an architectural materials consultant at Unit G48 to inspect batch tiles, tile samples, and sanitaryware water trials.
              </p>
            </div>

            {appointmentBooked ? (
              <div className="p-8 bg-neutral-50 border border-neutral-200 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">
                  Appointment Request Received
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{appointment.name}</strong>. Our team has reserved your slot for <strong>{appointment.date || 'your requested date'} at {appointment.time}</strong> at Unit G48, Rupa's Godowns, Eldoret.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppAppointmentLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> Forward to WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setAppointmentBooked(false)}
                    className="px-4 py-2 border border-neutral-300 text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                  >
                    Book Another Slot
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
                      placeholder="e.g. Arch. Dennis Cheruiyot"
                      value={appointment.name}
                      onChange={(e) =>
                        setAppointment({ ...appointment, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
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
                      onChange={(e) =>
                        setAppointment({ ...appointment, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
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
                      placeholder="client@domain.co.ke"
                      value={appointment.email}
                      onChange={(e) =>
                        setAppointment({ ...appointment, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={appointment.date}
                      onChange={(e) =>
                        setAppointment({ ...appointment, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Project Type
                    </label>
                    <select
                      value={appointment.projectType}
                      onChange={(e) =>
                        setAppointment({ ...appointment, projectType: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-950"
                    >
                      <option value="Residential Build">Residential Build / Villa</option>
                      <option value="Commercial Development">Commercial / Apartment Complex</option>
                      <option value="Contractor / QS Trade">Architect / Contractor Trade Desk</option>
                      <option value="Renovation">Home Renovation</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Primary Material Interest
                    </label>
                    <select
                      value={appointment.interests}
                      onChange={(e) =>
                        setAppointment({ ...appointment, interests: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-950"
                    >
                      <option value="Tiles & Slabs">Porcelain Floor Tiles & Large Slabs</option>
                      <option value="Sanitaryware">Piano Showers, Freestanding Baths & Bidets</option>
                      <option value="Electrical">Heavy Duty Switches & Smart Dimmer Plates</option>
                      <option value="Complete Package">Complete Architectural Package (All Categories)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Special Inquiries or Approximate SQM Needed
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Looking for 350 m² of 60x120 satin finish tiles for an Elgon View residence..."
                    value={appointment.notes}
                    onChange={(e) =>
                      setAppointment({ ...appointment, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 focus:outline-hidden focus:border-neutral-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-950 text-white font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Confirm Showroom Appointment
                </button>
              </form>
            )}
          </AnimatedReveal>

          {/* Right Column: Location Directions & Map Guide */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatedReveal delay={0.25} className="bg-white p-7 border border-neutral-200 shadow-sm space-y-4 arch-crosshair">
              <h3 className="font-bold text-base font-heading text-neutral-950">
                Finding Unit G48 at Rupa’s Godowns
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Rupa&apos;s Godowns is situated along the main commercial corridor in Eldoret, easily accessible from the town center and Uganda Road.
              </p>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="p-3.5 bg-[#FAF9F7] border border-neutral-200">
                  <span className="font-bold text-neutral-950 block">From Eldoret CBD:</span>
                  <span className="text-neutral-600">
                    Drive towards the Uganda Road industrial axis. Turn into the Rupa's Godowns gate; navigate directly to Unit G48.
                  </span>
                </div>

                <div className="p-3.5 bg-[#FAF9F7] border border-neutral-200">
                  <span className="font-bold text-neutral-950 block">Contractor Truck & Lorry Access:</span>
                  <span className="text-neutral-600">
                    High-clearance doors and dedicated forklift loading zones accommodate flatbeds, canters, and standard pickups.
                  </span>
                </div>
              </div>

              {/* Visual Location Card */}
              <div className="relative aspect-16/9 bg-neutral-900 overflow-hidden border border-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80"
                  alt="Bikomax Logistics Depot"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#C2A26F]">
                    Central Depot
                  </span>
                  <span className="font-bold text-sm">
                    Unit G48, Rupa&apos;s Godowns, Eldoret
                  </span>
                </div>
              </div>
            </AnimatedReveal>

            {/* Direct WhatsApp Callout */}
            <AnimatedReveal delay={0.35} className="bg-neutral-950 bg-arch-dark-grid text-white p-7 border border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C2A26F] font-semibold block">
                Instant Response
              </span>
              <h4 className="font-bold text-base font-heading">
                Need Instant Stock Verification?
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Our sales engineers can check batch shade availability, calculate pallet weights for your vehicle, or share video walkthroughs on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20need%20stock%20verification%20for%20a%20project.`}
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
