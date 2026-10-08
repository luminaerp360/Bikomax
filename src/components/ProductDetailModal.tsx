import React, { useState } from 'react';
import { Product, TileOrderMode } from '../types';
import { formatKES, generateWhatsAppInquiryMessage } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { SHOWROOM_CONTACT } from '../data/products';
import { X, Check, ShoppingBag, Truck, MapPin, MessageCircle, Ruler, Box, Plus, Minus } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCoverageTool?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCoverageTool,
}) => {
  const { addTileToCart, addUnitToCart } = useCart();

  // Dual Pricing state for tiles
  const [orderMode, setOrderMode] = useState<TileOrderMode>('coverage');
  const [coverageInput, setCoverageInput] = useState<number>(35);
  const [withWastage, setWithWastage] = useState<boolean>(true);
  const [boxQuantity, setBoxQuantity] = useState<number>(10);

  // Unit quantity for sanitary/electrical
  const [unitQuantity, setUnitQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const sqmPerBox = product.sqm_per_box || 1.44;
  const boxPrice =
    product.bulk_price_per_box ||
    (product.price_per_sqm || 0) * sqmPerBox;

  // Mode A:
  const effectiveCoverageNeeded = withWastage
    ? coverageInput * 1.10
    : coverageInput;
  const calculatedBoxesFromCoverage = Math.max(
    1,
    Math.ceil(effectiveCoverageNeeded / sqmPerBox)
  );
  const actualDeliveredCoverage = Number(
    (calculatedBoxesFromCoverage * sqmPerBox).toFixed(2)
  );
  const calculatedCostFromCoverage = Number(
    (calculatedBoxesFromCoverage * boxPrice).toFixed(2)
  );

  // Mode B:
  const deliveredCoverageFromBoxes = Number(
    (boxQuantity * sqmPerBox).toFixed(2)
  );
  const calculatedCostFromBoxes = Number((boxQuantity * boxPrice).toFixed(2));

  // Unit cost
  const calculatedCostFromUnits = Number(
    (unitQuantity * (product.price_per_unit || 0)).toFixed(2)
  );

  const handleAddToCart = () => {
    if (product.pricing_type === 'area') {
      if (orderMode === 'coverage') {
        addTileToCart({
          product,
          mode: 'coverage',
          boxes: calculatedBoxesFromCoverage,
          coverageM2: actualDeliveredCoverage,
          rawCoverageNeeded: coverageInput,
          withWastage,
        });
      } else {
        addTileToCart({
          product,
          mode: 'box',
          boxes: boxQuantity,
          coverageM2: deliveredCoverageFromBoxes,
          withWastage: false,
        });
      }
    } else {
      addUnitToCart(product, unitQuantity);
    }

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const whatsappInquiryUrl = `https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=${generateWhatsAppInquiryMessage(
    product.name,
    '',
    `I am planning an installation in Kenya and need ${
      product.pricing_type === 'area'
        ? `${orderMode === 'coverage' ? coverageInput : deliveredCoverageFromBoxes} m² (${
            orderMode === 'coverage' ? calculatedBoxesFromCoverage : boxQuantity
          } Boxes)`
        : `${unitQuantity} unit(s)`
    }. Please confirm warehouse staging availability.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl bg-white text-neutral-950 shadow-2xl overflow-hidden my-auto border border-neutral-300/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/95 hover:bg-neutral-950 hover:text-white transition-colors duration-200 border border-neutral-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Image & Specifications */}
          <div className="bg-[#F8F7F5] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200/80">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                  {product.category}
                </span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-xs text-neutral-500">
                  {product.dimension}
                </span>
              </div>

              <div className="relative aspect-4/3 w-full bg-white border border-neutral-200 overflow-hidden shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Showroom Availability */}
              <div className="bg-white p-3.5 border border-neutral-200 text-xs space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C2A26F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-950 block">
                      Physical Staging:
                    </span>
                    <span className="text-neutral-600 leading-relaxed block">
                      Unit G48, Rupa’s Godowns, Eldoret. Available for vehicle loading or direct site dispatch.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-neutral-600">
                  <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Site Delivery available across Eldoret and Western Kenya.</span>
                </div>
              </div>
            </div>

            {/* Architectural Specs List */}
            {product.specs && (
              <div className="mt-6 pt-4 border-t border-neutral-200/80">
                <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-800 mb-2.5 font-heading">
                  Architectural Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="bg-white p-2 border border-neutral-200/60">
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="font-semibold text-neutral-800 mt-0.5 block truncate">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Purchase Configurator */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs text-neutral-500 font-medium">
                {product.dimension} {product.finish ? `· ${product.finish}` : ''}
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950 font-heading mt-1">
                {product.name}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* DUAL PRICING BREAKDOWN */}
              {product.pricing_type === 'area' ? (
                <div className="mt-5 p-4 bg-[#FAFAFA] border border-neutral-200/80 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-neutral-200 pr-3">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                        Normal SQM Rate
                      </span>
                      <div className="text-xl sm:text-2xl font-bold text-neutral-950 mt-0.5">
                        {formatKES(product.price_per_sqm || 0)}
                      </div>
                      <span className="text-xs text-neutral-500">per Square Meter (m²)</span>
                    </div>

                    <div className="pl-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#C2A26F] font-bold block">
                        Bulk Box Rate
                      </span>
                      <div className="text-xl sm:text-2xl font-bold text-neutral-950 mt-0.5">
                        {formatKES(boxPrice)}
                      </div>
                      <span className="text-xs text-neutral-600 font-medium">
                        per Box ({product.sqm_per_box} m²/box)
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 p-4 bg-[#FAFAFA] border border-neutral-200/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Standard Unit Rate
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
                      {formatKES(product.price_per_unit || 0)}
                    </div>
                    <span className="text-xs text-neutral-500">per Individual Unit</span>
                  </div>
                  <span className="text-xs text-neutral-400">VAT Included</span>
                </div>
              )}

              {/* CONFIGURATOR */}
              {product.pricing_type === 'area' ? (
                <div className="mt-5 space-y-3.5">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setOrderMode('coverage')}
                      className={`p-2.5 text-left border transition-all ${
                        orderMode === 'coverage'
                          ? 'border-neutral-950 bg-neutral-950 text-white font-semibold'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <Ruler className="w-3.5 h-3.5" /> Order by Area (m²)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderMode('box')}
                      className={`p-2.5 text-left border transition-all ${
                        orderMode === 'box'
                          ? 'border-neutral-950 bg-neutral-950 text-white font-semibold'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <Box className="w-3.5 h-3.5" /> Order by Box
                      </div>
                    </button>
                  </div>

                  {orderMode === 'coverage' ? (
                    <div className="p-3.5 bg-white border border-neutral-300 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <label className="text-neutral-700 font-medium">
                          Area Needed:
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="1"
                            step="0.5"
                            value={coverageInput}
                            onChange={(e) =>
                              setCoverageInput(Math.max(1, Number(e.target.value) || 0))
                            }
                            className="w-24 text-right px-2.5 py-1 bg-white border border-neutral-300 font-bold text-xs text-neutral-950 focus:outline-hidden"
                          />
                          <span className="text-xs font-mono text-neutral-500">m²</span>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
                        <input
                          type="checkbox"
                          checked={withWastage}
                          onChange={(e) => setWithWastage(e.target.checked)}
                          className="accent-neutral-950 w-3.5 h-3.5 rounded-none"
                        />
                        <span>
                          Include +10% cutting wastage ({(coverageInput * 1.10).toFixed(1)} m²)
                        </span>
                      </label>

                      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                        <div>
                          <span className="text-neutral-400 block text-[10px]">Order:</span>
                          <span className="font-bold text-neutral-950">
                            {calculatedBoxesFromCoverage} Boxes ({actualDeliveredCoverage} m²)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-neutral-400 block text-[10px]">Total:</span>
                          <span className="font-bold text-neutral-950 text-sm">
                            {formatKES(calculatedCostFromCoverage)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-white border border-neutral-300 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <label className="text-neutral-700 font-medium">
                          Quantity of Boxes:
                        </label>
                        <div className="flex items-center border border-neutral-300">
                          <button
                            type="button"
                            onClick={() => setBoxQuantity((b) => Math.max(1, b - 1))}
                            className="px-2.5 py-1 hover:bg-neutral-100 text-neutral-800"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={boxQuantity}
                            onChange={(e) =>
                              setBoxQuantity(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            className="w-14 text-center text-xs font-bold text-neutral-950 border-x border-neutral-200 py-1 focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setBoxQuantity((b) => b + 1)}
                            className="px-2.5 py-1 hover:bg-neutral-100 text-neutral-800"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                        <div>
                          <span className="text-neutral-400 block text-[10px]">Total Coverage:</span>
                          <span className="font-bold text-neutral-950">
                            {boxQuantity} Boxes = {deliveredCoverageFromBoxes} m²
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-neutral-400 block text-[10px]">Total:</span>
                          <span className="font-bold text-neutral-950 text-sm">
                            {formatKES(calculatedCostFromBoxes)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Sanitaryware/Electrical Quantity Stepper */
                <div className="mt-5 p-3.5 bg-white border border-neutral-300 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-neutral-700 font-medium">
                      Select Quantity:
                    </label>
                    <div className="flex items-center border border-neutral-300">
                      <button
                        type="button"
                        onClick={() => setUnitQuantity((u) => Math.max(1, u - 1))}
                        className="px-2.5 py-1 hover:bg-neutral-100 text-neutral-800"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 text-center text-xs font-bold text-neutral-950 py-1 border-x border-neutral-200">
                        {unitQuantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setUnitQuantity((u) => u + 1)}
                        className="px-2.5 py-1 hover:bg-neutral-100 text-neutral-800"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-neutral-500 text-[10px]">Total Investment:</span>
                    <span className="font-bold text-neutral-950 text-base">
                      {formatKES(calculatedCostFromUnits)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3 px-6 uppercase tracking-widest font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-800 text-white'
                    : 'bg-neutral-950 text-white hover:bg-neutral-800'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    {product.pricing_type === 'area'
                      ? `Add ${orderMode === 'coverage' ? calculatedBoxesFromCoverage : boxQuantity} Box${(orderMode === 'coverage' ? calculatedBoxesFromCoverage : boxQuantity) > 1 ? 'es' : ''} to Cart`
                      : `Add ${unitQuantity} Unit${unitQuantity > 1 ? 's' : ''} to Cart`}
                  </>
                )}
              </button>

              <div className="flex gap-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 border border-neutral-300 hover:border-emerald-700 text-neutral-800 hover:text-emerald-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Inquire on WhatsApp
                </a>

                {product.pricing_type === 'area' && onOpenCoverageTool && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCoverageTool();
                    }}
                    className="py-2.5 px-3 border border-neutral-300 hover:border-neutral-950 text-neutral-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Room Calculator
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
