import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Check, ShoppingBag, X } from 'lucide-react';

export const CartToastNotification: React.FC = () => {
  const { toast, dismissToast, openCart, totalItemsCount } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-[90%] sm:w-auto"
        >
          <div className="bg-neutral-950 text-white p-4 shadow-2xl border border-neutral-800 flex items-start gap-3.5 arch-crosshair">
            <div className="w-7 h-7 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="text-xs font-bold font-heading text-white flex items-center gap-1.5">
                <span>{toast.title}</span>
                <span className="text-neutral-500 font-normal">·</span>
                <span className="text-amber-400 text-[11px] font-mono font-medium">
                  Cart: {totalItemsCount}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-0.5 line-clamp-2 leading-relaxed">
                {toast.description}
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={openCart}
                  className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>View Cart</span>
                </button>
                <button
                  type="button"
                  onClick={dismissToast}
                  className="px-2.5 py-1 text-neutral-400 hover:text-white text-[11px] transition-colors cursor-pointer"
                >
                  Keep Shopping
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={dismissToast}
              className="text-neutral-500 hover:text-white p-1 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
