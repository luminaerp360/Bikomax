import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  CustomerDetails,
  FulfillmentMethod,
  DeliveryZone,
  PaymentMethodType,
  OrderReceipt,
} from '../types';
import { KENYA_DELIVERY_ZONES, SHOWROOM_CONTACT } from '../data/products';
import { formatKES, generateWhatsAppOrderMessage, generateEmailOrderContent } from '../utils/formatters';
import { PrintInvoiceModal } from './PrintInvoiceModal';
import { submitOrderToBackend } from '../services/api';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Truck,
  Store,
  Phone,
  ShieldCheck,
  Printer,
  MessageCircle,
  Mail,
  Smartphone,
  Building,
  CreditCard,
  Banknote,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { items, subtotal, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Customer Details
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Residential (Private)',
    siteAddress: '',
    notes: '',
  });
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // Step 2: Fulfillment
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>('pickup');
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(
    KENYA_DELIVERY_ZONES[0]
  );
  const [specificSiteAddress, setSpecificSiteAddress] = useState<string>('');

  // Step 3: Order Routing & Communication Channel (Option 1)
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>('whatsapp');
  const [mpesaPhone, setMpesaPhone] = useState<string>('');
  const [isStkPushing, setIsStkPushing] = useState<boolean>(false);
  const [stkStatus, setStkStatus] = useState<
    'idle' | 'prompt_sent' | 'pin_entered' | 'confirmed'
  >('idle');
  const [generatedMpesaReceipt, setGeneratedMpesaReceipt] =
    useState<string>('');

  // Step 4: Final receipt
  const [confirmedReceipt, setConfirmedReceipt] =
    useState<OrderReceipt | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const deliveryFee =
    fulfillment === 'pickup' ? 0 : selectedZone ? selectedZone.fee : 0;
  const grandTotal = subtotal + deliveryFee;
  const vatAmount = Number(((grandTotal * 16) / 116).toFixed(2));

  // Step 1 Validation
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!customer.phone.trim()) {
      errors.phone = 'Valid phone number is required for dispatch';
    } else if (customer.phone.length < 9) {
      errors.phone = 'Please enter a valid Kenyan phone number (e.g. 0712345678)';
    }
    if (!customer.email.trim() || !customer.email.includes('@')) {
      errors.email = 'Valid email is required for tax invoice receipt';
    }

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextFromStep1 = () => {
    if (validateStep1()) {
      if (!mpesaPhone) setMpesaPhone(customer.phone);
      setCurrentStep(2);
    }
  };

  const handleNextFromStep2 = () => {
    setCurrentStep(3);
  };

  // Simulated Lipa Na M-Pesa STK Push
  const handleTriggerMpesaSTK = () => {
    setIsStkPushing(true);
    setStkStatus('prompt_sent');

    setTimeout(() => {
      setStkStatus('pin_entered');
      setTimeout(() => {
        const randomReceipt =
          'TD' +
          Math.floor(100000 + Math.random() * 900000) +
          ['K9', 'M4', 'B8', 'X2'][Math.floor(Math.random() * 4)];
        setGeneratedMpesaReceipt(randomReceipt);
        setStkStatus('confirmed');
        setIsStkPushing(false);
      }, 1500);
    }, 1800);
  };

  // Final Order Placement
  const handleFinalizeOrder = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BKX-2026-${randomSuffix}`;
    const now = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let paymentStatus = 'Order Placed - Pending Confirmation';
    if (paymentMethod === 'whatsapp') {
      paymentStatus = 'Order Placed via WhatsApp';
    } else if (paymentMethod === 'email') {
      paymentStatus = 'Quotation Requested via Email';
    } else if (paymentMethod === 'call') {
      paymentStatus = 'Showroom Phone Inquiry';
    } else if (paymentMethod === 'bank_transfer') {
      paymentStatus = 'Pending EFT Bank Transfer';
    } else if (paymentMethod === 'showroom_cash') {
      paymentStatus = 'Pay upon Showroom Collection';
    } else if (paymentMethod === 'mpesa') {
      paymentStatus = 'Paid via M-Pesa';
    }

    const receipt: OrderReceipt = {
      orderId,
      orderDate: now,
      customer,
      fulfillment,
      deliveryZone: fulfillment === 'delivery' ? selectedZone : undefined,
      specificSiteAddress:
        fulfillment === 'delivery'
          ? specificSiteAddress || customer.siteAddress
          : undefined,
      deliveryFee,
      items: [...items],
      subtotal,
      vatAmount,
      total: grandTotal,
      paymentMethod,
      paymentStatus,
      mpesaReceiptNumber:
        paymentMethod === 'mpesa'
          ? generatedMpesaReceipt || 'TD928410M2'
          : undefined,
    };

    setConfirmedReceipt(receipt);
    setCurrentStep(4);
    clearCart();

    // Async sync with stockify backend
    submitOrderToBackend(receipt).then((res) => {
      if (res.success && res.orderId) {
        setConfirmedReceipt((prev) => (prev ? { ...prev, orderId: res.orderId } : receipt));
      }
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
        <div
          className="relative w-full max-w-3xl bg-white text-[#0A0A0A] shadow-2xl border border-neutral-300 my-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-neutral-900 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#C2A26F] font-semibold block font-heading">
                Kenyan Architectural Procurement
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                {currentStep === 4 ? 'Order Confirmed' : 'Checkout & Staging Order'}
              </h2>
            </div>
            {currentStep !== 4 && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Stepper Progress Bar */}
          {currentStep !== 4 && (
            <div className="bg-neutral-100 px-6 py-3 border-b border-neutral-200">
              <div className="flex items-center justify-between text-xs">
                {[
                  { step: 1, label: '1. Client Details' },
                  { step: 2, label: '2. Fulfillment' },
                  { step: 3, label: '3. Order Routing' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`flex items-center gap-1.5 font-semibold ${
                      currentStep === s.step
                        ? 'text-[#0A0A0A]'
                        : currentStep > s.step
                        ? 'text-neutral-500'
                        : 'text-neutral-400'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        currentStep === s.step
                          ? 'bg-[#0A0A0A] text-white'
                          : currentStep > s.step
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {currentStep > s.step ? '✓' : s.step}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BODY */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {/* STEP 1: CUSTOMER DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="bg-[#FAFAFA] p-3.5 border border-neutral-200 text-xs text-neutral-600">
                  Provide your project & contact details for warehouse staging and official KRA tax invoice generation.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Full Name / Entity Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Eng. Paul Kiprotich / Horizon Estates"
                      value={customer.fullName}
                      onChange={(e) =>
                        setCustomer({ ...customer, fullName: e.target.value })
                      }
                      className={`w-full px-3 py-2 bg-white border text-xs focus:outline-hidden ${
                        step1Errors.fullName
                          ? 'border-red-500'
                          : 'border-neutral-300 focus:border-[#0A0A0A]'
                      }`}
                    />
                    {step1Errors.fullName && (
                      <span className="text-[11px] text-red-500 mt-0.5 block">
                        {step1Errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Phone Number (M-Pesa Enabled) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 0722 000 000 or +254 7..."
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer({ ...customer, phone: e.target.value })
                      }
                      className={`w-full px-3 py-2 bg-white border text-xs focus:outline-hidden ${
                        step1Errors.phone
                          ? 'border-red-500'
                          : 'border-neutral-300 focus:border-[#0A0A0A]'
                      }`}
                    />
                    {step1Errors.phone && (
                      <span className="text-[11px] text-red-500 mt-0.5 block">
                        {step1Errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="orders@yourdomain.co.ke"
                      value={customer.email}
                      onChange={(e) =>
                        setCustomer({ ...customer, email: e.target.value })
                      }
                      className={`w-full px-3 py-2 bg-white border text-xs focus:outline-hidden ${
                        step1Errors.email
                          ? 'border-red-500'
                          : 'border-neutral-300 focus:border-[#0A0A0A]'
                      }`}
                    />
                    {step1Errors.email && (
                      <span className="text-[11px] text-red-500 mt-0.5 block">
                        {step1Errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Project / Site Type
                    </label>
                    <select
                      value={customer.projectType}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          projectType: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs focus:outline-hidden focus:border-[#0A0A0A]"
                    >
                      <option value="Residential (Private)">
                        Residential (Private Build / Renovation)
                      </option>
                      <option value="Commercial Building">
                        Commercial (Office / Hotel / Retail)
                      </option>
                      <option value="Architect / Contractor">
                        Architect / Contractor Trade Project
                      </option>
                      <option value="Showroom Walk-in">
                        Showroom Direct Collection
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Site Location / Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Elgon View Plot 14B, near Boma Inn, Eldoret"
                    value={customer.siteAddress}
                    onChange={(e) =>
                      setCustomer({ ...customer, siteAddress: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs focus:outline-hidden focus:border-[#0A0A0A]"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: FULFILLMENT METHOD */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block font-heading">
                  Choose Fulfillment & Logistics Option:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: Pickup */}
                  <div
                    onClick={() => setFulfillment('pickup')}
                    className={`p-4 border cursor-pointer transition-all ${
                      fulfillment === 'pickup'
                        ? 'border-[#0A0A0A] bg-neutral-50 ring-1 ring-[#0A0A0A]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-[#C2A26F]" />
                        <span className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A]">
                          Showroom Pickup
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 uppercase">
                        Free
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      Collect directly at Unit G48, Rupa's Godowns, Eldoret. Forklift loading into pickup or lorry provided.
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-neutral-500">
                      Staging Time: Within 2 Hours
                    </div>
                  </div>

                  {/* Option B: Site Delivery */}
                  <div
                    onClick={() => setFulfillment('delivery')}
                    className={`p-4 border cursor-pointer transition-all ${
                      fulfillment === 'delivery'
                        ? 'border-[#0A0A0A] bg-neutral-50 ring-1 ring-[#0A0A0A]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#C2A26F]" />
                        <span className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A]">
                          Site Delivery
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#0A0A0A]">
                        From KES 1,500
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      Direct transport to site in Eldoret CBD, suburbs, or greater North Rift with careful pallet strapping.
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-neutral-500">
                      Flatbed or canter dispatch
                    </div>
                  </div>
                </div>

                {/* Sub-selection for Site Delivery */}
                {fulfillment === 'delivery' && (
                  <div className="p-4 bg-[#FAFAFA] border border-neutral-200 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block font-heading">
                      Select Delivery Zone & Regional Rate:
                    </label>

                    <div className="space-y-2">
                      {KENYA_DELIVERY_ZONES.filter((z) => z.fee > 0).map((zone) => (
                        <label
                          key={zone.id}
                          className={`flex items-start justify-between p-3 border cursor-pointer text-xs bg-white ${
                            selectedZone.id === zone.id
                              ? 'border-[#0A0A0A] ring-1 ring-[#0A0A0A]'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="radio"
                              name="deliveryZone"
                              checked={selectedZone.id === zone.id}
                              onChange={() => setSelectedZone(zone)}
                              className="accent-[#0A0A0A] mt-0.5"
                            />
                            <div>
                              <span className="font-bold text-[#0A0A0A] block">
                                {zone.name}
                              </span>
                              <span className="text-[11px] text-neutral-500 block leading-tight">
                                {zone.description}
                              </span>
                              <span className="text-[10px] text-neutral-400 block font-mono mt-0.5">
                                ETA: {zone.estimatedDays}
                              </span>
                            </div>
                          </div>

                          <div className="font-mono font-bold text-[#0A0A0A] text-xs">
                            {formatKES(zone.fee)}
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">
                        Specific Site / Gate Address:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Gate 4, Annex near Moi University Campus, Eldoret"
                        value={specificSiteAddress}
                        onChange={(e) => setSpecificSiteAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs focus:outline-hidden focus:border-[#0A0A0A]"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: ORDER ROUTING & DIRECT DISPATCH (OPTION 1) */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between p-3.5 bg-neutral-100 border border-neutral-200 text-xs">
                  <div>
                    <span className="font-medium text-neutral-600 block">
                      Total Order Value (16% VAT Included):
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {items.length} item(s) · {fulfillment === 'pickup' ? 'Showroom Pickup' : 'Site Delivery'}
                    </span>
                  </div>
                  <span className="font-black text-[#0A0A0A] text-lg font-mono">
                    {formatKES(grandTotal)}
                  </span>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 p-3 text-xs text-emerald-900 leading-relaxed">
                  <strong className="font-bold">Direct Showroom Procurement:</strong> No online card payment is required today. Select your preferred channel below to transmit your BQ order specification directly to our Eldoret depot team for stock reservation:
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block font-heading">
                    Select Order Transmission Channel:
                  </label>

                  {/* Channel 1: WhatsApp (Recommended) */}
                  <div
                    className={`border p-4 transition-all cursor-pointer ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-700 bg-emerald-50/30 ring-1 ring-emerald-700'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                    onClick={() => setPaymentMethod('whatsapp')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'whatsapp'}
                        onChange={() => setPaymentMethod('whatsapp')}
                        className="accent-emerald-700 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5 font-heading">
                            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            WhatsApp Order Concierge (+254 20 230 859)
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5">
                            Fastest • Instant Stock Check
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          Sends your complete itemized BQ specification (m², box counts, site location, and pricing) directly into WhatsApp. Our warehouse staff confirms batch consistency and delivery ETA within minutes.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Channel 2: Email */}
                  <div
                    className={`border p-4 transition-all cursor-pointer ${
                      paymentMethod === 'email'
                        ? 'border-[#0A0A0A] bg-neutral-50 ring-1 ring-[#0A0A0A]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                    onClick={() => setPaymentMethod('email')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'email'}
                        onChange={() => setPaymentMethod('email')}
                        className="accent-[#0A0A0A] mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5 font-heading">
                            <Mail className="w-4 h-4 text-neutral-700 shrink-0" />
                            Email Official Proforma & BQ Specification
                          </span>
                          <span className="text-[10px] font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5">
                            Formal Quotation
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          Dispatches your order schedule to <strong>{SHOWROOM_CONTACT.email}</strong> and your inbox. Ideal for contractor procurement files, quantity surveyor verifications, and corporate purchase orders.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Channel 3: Phone Call */}
                  <div
                    className={`border p-4 transition-all cursor-pointer ${
                      paymentMethod === 'call'
                        ? 'border-[#0A0A0A] bg-neutral-50 ring-1 ring-[#0A0A0A]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                    onClick={() => setPaymentMethod('call')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'call'}
                        onChange={() => setPaymentMethod('call')}
                        className="accent-[#0A0A0A] mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5 font-heading">
                            <Phone className="w-4 h-4 text-[#C2A26F] shrink-0" />
                            Direct Showroom Phone Order ({SHOWROOM_CONTACT.phone})
                          </span>
                          <span className="text-[10px] font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5">
                            Voice Assist
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          Place your order directly over the phone with our sales engineer at Rupa&apos;s Godowns Unit G48 to immediately coordinate pallet loading and flatbed transport.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Channel 4: Bank Transfer / Showroom Collection */}
                  <div
                    className={`border p-4 transition-all cursor-pointer ${
                      paymentMethod === 'bank_transfer' || paymentMethod === 'showroom_cash'
                        ? 'border-[#0A0A0A] bg-neutral-50 ring-1 ring-[#0A0A0A]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                    onClick={() => setPaymentMethod('bank_transfer')}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'bank_transfer' || paymentMethod === 'showroom_cash'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="accent-[#0A0A0A] mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5 font-heading">
                            <Building className="w-4 h-4 text-neutral-700 shrink-0" />
                            Bank Transfer (EFT / RTGS) or Showroom Collection
                          </span>
                          <span className="text-[10px] font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5">
                            Trade Proforma
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          Generate formal proforma invoice with Stanbic Bank Kenya corporate settlement details, or pay upon physical inspection of pallets at Unit G48.
                        </p>

                        {(paymentMethod === 'bank_transfer' || paymentMethod === 'showroom_cash') && (
                          <div className="mt-3 p-3 bg-white border border-neutral-300 text-xs font-mono space-y-1 text-neutral-700">
                            <div>Bank: <strong>{SHOWROOM_CONTACT.bankDetails.bankName}</strong></div>
                            <div>Branch: <strong>{SHOWROOM_CONTACT.bankDetails.branch}</strong></div>
                            <div>Account: <strong>{SHOWROOM_CONTACT.bankDetails.accountName}</strong></div>
                            <div>Account No: <strong>{SHOWROOM_CONTACT.bankDetails.accountNumber}</strong></div>
                            <div>SWIFT: <strong>{SHOWROOM_CONTACT.bankDetails.swiftCode}</strong></div>
                            <div className="pt-1 text-[11px] text-neutral-500 font-sans">
                              Paybill: <strong>{SHOWROOM_CONTACT.paybill}</strong> · Account: <strong>{SHOWROOM_CONTACT.paybillAccount}</strong>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER CONFIRMATION & INVOICE */}
            {currentStep === 4 && confirmedReceipt && (
              <div className="space-y-6 text-center py-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block font-heading">
                    Official Order Placement Confirmed
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#0A0A0A] mt-1">
                    Order Ref: {confirmedReceipt.orderId}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, {confirmedReceipt.customer.fullName}. Your staging order has been routed to our Eldoret warehouse logistics team at Unit G48, Rupa's Godowns.
                  </p>
                </div>

                {/* Formatted Order Summary Box */}
                <div className="bg-[#FAFAFA] border border-neutral-200 p-5 text-left text-xs space-y-3">
                  <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                    <span className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                      Order Summary
                    </span>
                    <span className="font-mono text-neutral-500">
                      {confirmedReceipt.orderDate}
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto divide-y divide-neutral-100">
                    {confirmedReceipt.items.map((item, idx) => (
                      <div key={idx} className="pt-1.5 flex justify-between text-neutral-700">
                        <div>
                          <span className="font-bold text-[#0A0A0A]">{item.product.name}</span>
                          <span className="text-[11px] text-neutral-500 block">
                            {item.product.pricing_type === 'area'
                              ? `${item.boxes} Boxes (~${item.coverageM2} m²)`
                              : `${item.units} Unit(s)`}
                          </span>
                        </div>
                        <div className="font-mono font-bold text-[#0A0A0A]">
                          {formatKES(item.totalPrice)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-neutral-200 space-y-1 text-neutral-600 font-mono">
                    <div className="flex justify-between">
                      <span>Logistics ({confirmedReceipt.fulfillment === 'pickup' ? 'Showroom Pickup' : 'Site Delivery'}):</span>
                      <span>{formatKES(confirmedReceipt.deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#0A0A0A] pt-1 border-t border-neutral-200">
                      <span>Grand Total:</span>
                      <span>{formatKES(confirmedReceipt.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Direct Communication Actions (Option 1) */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                    Transmit Your Order Specification Now:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* 1. WhatsApp */}
                    <a
                      href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${generateWhatsAppOrderMessage(
                        confirmedReceipt
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>Send via WhatsApp</span>
                    </a>

                    {/* 2. Email */}
                    <a
                      href={generateEmailOrderContent(confirmedReceipt).mailtoUrl}
                      className="py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <Mail className="w-4 h-4 text-[#C2A26F] shrink-0" />
                      <span>Send via Email</span>
                    </a>

                    {/* 3. Call Store */}
                    <a
                      href={`tel:${SHOWROOM_CONTACT.phoneRaw}`}
                      className="py-3 px-4 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#C2A26F] shrink-0" />
                      <span>Call Showroom ({SHOWROOM_CONTACT.phone})</span>
                    </a>

                    {/* 4. Print / PDF */}
                    <button
                      type="button"
                      onClick={() => setShowPrintModal(true)}
                      className="py-3 px-4 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 shrink-0" />
                      <span>Print Proforma PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
            {currentStep === 4 ? (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-neutral-200 hover:bg-neutral-300 text-[#0A0A0A] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Back to Showroom Catalogue
              </button>
            ) : (
              <>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => (s - 1) as any)}
                    className="px-4 py-2 text-xs font-bold text-neutral-700 hover:text-[#0A0A0A] flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={handleNextFromStep1}
                    className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    Continue to Fulfillment <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={handleNextFromStep2}
                    className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {currentStep === 3 && (
                  <button
                    type="button"
                    onClick={handleFinalizeOrder}
                    className="px-8 py-3 bg-[#0A0A0A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                  >
                    Confirm & Generate Invoice <Check className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      {showPrintModal && (
        <PrintInvoiceModal
          receipt={confirmedReceipt}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </>
  );
};
