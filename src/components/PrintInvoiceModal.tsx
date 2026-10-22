import React from 'react';
import { OrderReceipt } from '../types';
import { formatKES } from '../utils/formatters';
import { SHOWROOM_CONTACT } from '../data/products';
import { BikomaxLogo } from './BikomaxLogo';
import { Printer, Download, X, CheckCircle2, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

interface PrintInvoiceModalProps {
  receipt: OrderReceipt | null;
  onClose: () => void;
}

export const PrintInvoiceModal: React.FC<PrintInvoiceModalProps> = ({
  receipt,
  onClose,
}) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-3xl bg-white text-[#0A0A0A] shadow-2xl border border-neutral-300 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printed) */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Official Tax Invoice
            </span>
            <span className="font-mono text-xs font-bold text-amber-500">
              {receipt.orderId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE BODY */}
        <div className="p-8 sm:p-10 bg-white text-[#0A0A0A] font-sans selection:bg-neutral-200" id="printable-invoice">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-[#0A0A0A] pb-6">
            <div>
              <BikomaxLogo size="md" variant="dark" />
              <p className="text-xs text-neutral-600 mt-2 max-w-sm leading-relaxed">
                {SHOWROOM_CONTACT.showroomLocation}
              </p>
              <div className="text-xs text-neutral-600 space-y-0.5 mt-1 font-mono">
                <div>Tel / Inquiries: {SHOWROOM_CONTACT.phone}</div>
                <div>Email: {SHOWROOM_CONTACT.email}</div>
                <div>PIN No: P051984210Z · Tax Compliance Certified</div>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block font-heading">
                TAX INVOICE / DELIVERY ORDER
              </span>
              <div className="text-2xl font-black font-mono tracking-tight text-[#0A0A0A] mt-1">
                {receipt.orderId}
              </div>
              <div className="text-xs text-neutral-500 font-mono mt-1">
                Date: {receipt.orderDate}
              </div>
              <div className="mt-2 inline-block px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-xs font-mono font-bold text-neutral-800">
                STATUS: {receipt.paymentStatus.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Customer & Fulfillment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-neutral-200 text-xs">
            <div>
              <span className="uppercase text-[10px] tracking-wider font-bold text-neutral-400 block font-heading">
                Bill & Deliver To:
              </span>
              <div className="text-sm font-bold text-[#0A0A0A] mt-1">
                {receipt.customer.fullName}
              </div>
              <div className="text-neutral-600 font-mono mt-0.5">
                Phone: {receipt.customer.phone}
              </div>
              <div className="text-neutral-600 font-mono">
                Email: {receipt.customer.email}
              </div>
              <div className="text-neutral-700 mt-1">
                Project Category: <span className="font-semibold">{receipt.customer.projectType}</span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="uppercase text-[10px] tracking-wider font-bold text-neutral-400 block font-heading">
                Logistics & Dispatch:
              </span>
              <div className="font-bold text-[#0A0A0A] mt-1">
                {receipt.fulfillment === 'pickup'
                  ? "Showroom Pickup (Unit G48, Rupa's Godowns)"
                  : `Site Delivery: ${receipt.deliveryZone?.name}`}
              </div>
              {receipt.specificSiteAddress && (
                <div className="text-neutral-600 mt-0.5">
                  Site: {receipt.specificSiteAddress}
                </div>
              )}
              <div className="text-neutral-600 mt-1">
                Payment Channel: <span className="font-semibold">{receipt.paymentMethod === 'mpesa' ? 'Lipa na M-Pesa' : receipt.paymentMethod === 'bank_transfer' ? 'EFT Bank Transfer' : 'Cash on Showroom Pickup'}</span>
              </div>
              {receipt.mpesaReceiptNumber && (
                <div className="font-mono text-emerald-800 font-bold mt-0.5">
                  M-Pesa Ref: {receipt.mpesaReceiptNumber}
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-600 font-heading">
                  <th className="py-2.5 font-bold">Item Description & Spec</th>
                  <th className="py-2.5 text-right font-bold">Quantity / Unit</th>
                  <th className="py-2.5 text-right font-bold">Unit Rate</th>
                  <th className="py-2.5 text-right font-bold">Total (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {receipt.items.map((item, index) => (
                  <tr key={index} className="py-2">
                    <td className="py-3 pr-2">
                      <div className="font-bold text-[#0A0A0A]">{item.product.name}</div>
                      <div className="text-[11px] text-neutral-500">
                        {item.product.category} · {item.product.dimension}
                      </div>
                      {item.product.pricing_type === 'area' && (
                        <div className="text-[10px] text-neutral-400">
                          Yield: {item.coverageM2} m² (Standard {item.product.sqm_per_box} m²/box)
                        </div>
                      )}
                    </td>
                    <td className="py-3 text-right font-mono text-neutral-800 whitespace-nowrap">
                      {item.product.pricing_type === 'area'
                        ? `${item.boxes} Boxes`
                        : `${item.units} Unit(s)`}
                    </td>
                    <td className="py-3 text-right font-mono text-neutral-800 whitespace-nowrap">
                      {formatKES(item.unitPrice)}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-[#0A0A0A] whitespace-nowrap">
                      {formatKES(item.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="border-t-2 border-neutral-800 pt-4 flex flex-col sm:flex-row justify-between items-start gap-6 text-xs">
            <div className="space-y-1 text-neutral-500 max-w-sm">
              <span className="font-bold uppercase tracking-wider text-[#0A0A0A] block">
                Warehouse Dispatch & Staging Notice:
              </span>
              <p className="leading-relaxed text-[11px]">
                Goods remain property of Bikomax until receipt is confirmed. Forklift loading is provided at Unit G48 Rupa’s Godowns, Eldoret. Broken tiles must be reported within 24 hours of delivery.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 font-mono">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span>{formatKES(receipt.subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>16% VAT Included:</span>
                <span>{formatKES(receipt.vatAmount)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Logistics:</span>
                <span>{formatKES(receipt.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#0A0A0A] pt-2 border-t border-neutral-300">
                <span className="font-sans uppercase">Total Amount:</span>
                <span className="text-[#0A0A0A]">{formatKES(receipt.total)}</span>
              </div>
            </div>
          </div>

          {/* Official Stamp & Signoff */}
          <div className="mt-8 pt-6 border-t border-dashed border-neutral-300 flex justify-between items-end text-[11px] text-neutral-500">
            <div>
              <div>Issued by: Bikomax Architectural Desk, Eldoret</div>
              <div className="font-mono">Authorized System Stamp: BKX-STAMP-ELD-048</div>
            </div>
            <div className="border-b border-neutral-400 w-44 text-center pb-1 text-neutral-400">
              Customer Acceptance Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
