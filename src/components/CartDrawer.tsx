import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { formatKES } from '../utils/formatters';
import { SHOWROOM_CONTACT } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, MessageCircle, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalBoxesCount,
    totalItemsCount,
  } = useCart();

  // 16% VAT is inclusive in Kenya
  const vatPortion = Number(((subtotal * 16) / 116).toFixed(2));

  const handleQuickWhatsApp = () => {
    if (items.length === 0) return;
    const lines = [
      `🏛️ *BIKOMAX ARCHITECTURAL CART INQUIRY*`,
      `Showroom: Unit G48, Rupa's Godowns, Eldoret`,
      ``,
      `*Items Requested:*`,
    ];

    items.forEach((item, idx) => {
      if (item.product.pricing_type === 'area') {
        lines.push(
          `${idx + 1}. ${item.product.name} (${item.product.dimension})`
        );
        lines.push(
          `   • ${item.boxes} Boxes (~${item.coverageM2} m²) = ${formatKES(item.totalPrice)}`
        );
      } else {
        lines.push(
          `${idx + 1}. ${item.product.name} (${item.product.dimension})`
        );
        lines.push(
          `   • ${item.units} Unit(s) = ${formatKES(item.totalPrice)}`
        );
      }
    });

    lines.push(``);
    lines.push(`*Estimated Order Subtotal:* ${formatKES(subtotal)}`);
    lines.push(`_Please send proforma invoice & stock availability at Eldoret warehouse._`);

    const url = `https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs cursor-pointer"
            onClick={closeCart}
          />

          {/* Slide-in Drawer Container */}
          <div className="fixed inset-y-0 right-0 w-full sm:max-w-md flex pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full bg-white shadow-2xl flex flex-col justify-between border-l border-neutral-300 pointer-events-auto h-full"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-[#FAFAFA]">
                <div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C2A26F]" />
                    <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#0A0A0A] font-heading">
                      Architectural Cart
                    </h2>
                  </div>
                  <span className="text-[11px] sm:text-xs text-neutral-500">
                    {items.length} {items.length === 1 ? 'Product line' : 'Product lines'} · {totalItemsCount} total packaging units
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-1.5 text-neutral-500 hover:text-[#0A0A0A] hover:bg-neutral-200/60 transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-500 space-y-3">
                <div className="p-4 bg-neutral-100 rounded-full text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#0A0A0A]">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                  Explore our luxury porcelain tiles, freestanding baths, piano showers, and architectural switches.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#FAFAFA] border border-neutral-200 flex gap-3 text-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover bg-white shrink-0 border border-neutral-200"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-medium">
                          {item.product.category} · {item.product.dimension}
                        </span>
                        <h4 className="font-bold text-[#0A0A0A] text-xs leading-snug truncate">
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Breakdown */}
                    {item.product.pricing_type === 'area' ? (
                      <div className="mt-1.5 space-y-0.5 text-[11px] text-neutral-600">
                        <div className="font-semibold text-neutral-800">
                          {item.boxes} Boxes (~{item.coverageM2} m²)
                        </div>
                        <div className="text-neutral-500">
                          @ {formatKES(item.unitPrice)} / box ({formatKES(item.product.price_per_sqm || 0)}/m²)
                        </div>
                        {item.withWastage && (
                          <div className="text-[10px] text-neutral-400">
                            (Includes 10% tiler cutting allowance)
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-1.5 text-[11px] text-neutral-600">
                        <div className="font-semibold text-neutral-800">
                          {item.units} Unit{item.units! > 1 ? 's' : ''}
                        </div>
                        <div className="text-neutral-500">
                          @ {formatKES(item.unitPrice)} / unit
                        </div>
                      </div>
                    )}

                    {/* Quantity Adjustment Controls & Price */}
                    <div className="mt-2.5 pt-2 border-t border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center border border-neutral-300 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              (item.boxes || item.units || 1) - 1
                            )
                          }
                          className="px-2 py-0.5 hover:bg-neutral-100 text-neutral-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#0A0A0A] border-x border-neutral-200 py-0.5">
                          {item.boxes || item.units}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              (item.boxes || item.units || 1) + 1
                            )
                          }
                          className="px-2 py-0.5 hover:bg-neutral-100 text-neutral-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-bold text-[#0A0A0A] text-sm">
                        {formatKES(item.totalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-[#FAFAFA] space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-neutral-600 gap-2">
                  <span className="shrink-0">Gross Subtotal:</span>
                  <span className="font-mono font-medium text-[#0A0A0A] text-right">
                    {formatKES(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-500 text-[11px] gap-2">
                  <span className="shrink-0">VAT Component (16% Incl.):</span>
                  <span className="font-mono text-right">{formatKES(vatPortion)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600 gap-2">
                  <span className="shrink-0">Showroom Warehouse Pickup:</span>
                  <span className="text-emerald-700 font-bold uppercase text-[10px] text-right truncate">
                    Free (Unit G48, Eldoret)
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-extrabold text-[#0A0A0A] pt-2 border-t border-neutral-200 gap-2">
                  <span className="shrink-0">Order Total:</span>
                  <span className="text-base text-[#0A0A0A] font-heading font-black text-right">
                    {formatKES(subtotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3.5 px-4 bg-[#0A0A0A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-[0.99] cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleQuickWhatsApp}
                  className="w-full py-2.5 px-4 border border-emerald-600 hover:bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Quick Proforma via WhatsApp
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="truncate">Authorized Bikomax Building Supply · Rupa's Godowns, Eldoret</span>
              </div>
            </div>
          )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
