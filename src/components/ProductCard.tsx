import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product, TileOrderMode } from '../types';
import { formatKES } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { Check, Plus, Minus, Maximize2, ShoppingBag, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isSelectedForBatch?: boolean;
  onToggleBatchSelect?: (product: Product) => void;
  onSimulate?: (tileRef: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isSelectedForBatch = false,
  onToggleBatchSelect,
  onSimulate,
}) => {
  const { addTileToCart, addUnitToCart } = useCart();

  // For tiles: dual pricing mode state
  const [orderMode, setOrderMode] = useState<TileOrderMode>('coverage');
  const [coverageInput, setCoverageInput] = useState<number>(20);
  const [withWastage, setWithWastage] = useState<boolean>(true);
  const [boxQuantity, setBoxQuantity] = useState<number>(5);

  // For sanitaryware & electrical: unit quantity (can be multiple at once)
  const [unitQuantity, setUnitQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const sqmPerBox = product.sqm_per_box || 1.44;
  const boxPrice =
    product.bulk_price_per_box ||
    (product.price_per_sqm || 0) * sqmPerBox;

  // Mode A: Coverage calculations
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

  // Mode B: Box quantity calculations
  const deliveredCoverageFromBoxes = Number(
    (boxQuantity * sqmPerBox).toFixed(2)
  );
  const calculatedCostFromBoxes = Number((boxQuantity * boxPrice).toFixed(2));

  // Sanitary/Electrical cost
  const calculatedCostFromUnits = Number(
    (unitQuantity * (product.price_per_unit || 0)).toFixed(2)
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (product.pricing_type === 'area') {
      if (orderMode === 'coverage') {
        addTileToCart({
          product,
          mode: 'coverage',
          boxes: calculatedBoxesFromCoverage,
          coverageM2: actualDeliveredCoverage,
          rawCoverageNeeded: coverageInput,
          withWastage,
          openDrawer: false, // Do NOT force open the drawer! Allow user to keep adding products
        });
      } else {
        addTileToCart({
          product,
          mode: 'box',
          boxes: boxQuantity,
          coverageM2: deliveredCoverageFromBoxes,
          withWastage: false,
          openDrawer: false,
        });
      }
    } else {
      addUnitToCart(product, unitQuantity, false);
    }

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(product)}
      className="group bg-white border border-neutral-200/80 hover:border-neutral-950 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.07)]"
    >
      {/* Product Image */}
      <div className="relative aspect-4/3 w-full bg-[#F4F4F2] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Batch selection checkbox for multi-item additions */}
        {onToggleBatchSelect && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onToggleBatchSelect(product);
            }}
            className="absolute top-3 left-3 z-10"
          >
            <label className="flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-neutral-200 text-[11px] font-semibold text-neutral-800 cursor-pointer shadow-xs select-none hover:bg-neutral-50 transition-colors">
              <input
                type="checkbox"
                checked={isSelectedForBatch}
                onChange={() => {}}
                className="accent-neutral-950 w-3.5 h-3.5"
              />
              <span>Select</span>
            </label>
          </div>
        )}

        {/* 3D Room Simulator Quick Button for Tiles */}
        {product.pricing_type === 'area' && onSimulate && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSimulate(product.ref);
            }}
            className="absolute bottom-3 left-3 px-2 py-1 bg-neutral-950/90 hover:bg-amber-500 text-amber-400 hover:text-neutral-950 text-[10px] font-mono uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
            title="Simulate in 3D Room"
          >
            <Sparkles className="w-3 h-3" />
            <span>Simulate</span>
          </button>
        )}

        {/* Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="absolute bottom-3 right-3 p-2 bg-white/95 text-neutral-900 hover:bg-neutral-950 hover:text-white transition-colors duration-200 shadow-xs"
          title="Quick Architectural View"
          aria-label={`View ${product.name}`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Refined metadata without codes or stock counts */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>{product.dimension}</span>
            {product.finish && (
              <>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="truncate max-w-[130px]">{product.finish}</span>
              </>
            )}
          </div>

          <h3 className="text-base font-bold text-neutral-950 leading-snug tracking-tight font-heading group-hover:text-neutral-700 transition-colors">
            {product.name}
          </h3>

          {/* DUAL PRICING DISPLAY */}
          {product.pricing_type === 'area' ? (
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  Per Square Meter
                </span>
                <div className="text-base sm:text-lg font-bold text-neutral-950">
                  {formatKES(product.price_per_sqm || 0)}
                  <span className="text-xs font-normal text-neutral-500 ml-1">/ m²</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-amber-600 font-semibold block">
                  Bulk Box Rate
                </span>
                <div className="text-base font-bold text-neutral-950">
                  {formatKES(boxPrice)}
                  <span className="text-xs font-normal text-neutral-500 ml-1">/ Box</span>
                </div>
                <span className="text-[10px] text-neutral-400 block font-mono">
                  ({product.sqm_per_box} m²/box)
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  Standard Unit Price
                </span>
                <div className="text-base sm:text-lg font-bold text-neutral-950">
                  {formatKES(product.price_per_unit || 0)}
                  <span className="text-xs font-normal text-neutral-500 ml-1">/ Piece</span>
                </div>
              </div>
              <span className="text-xs text-neutral-400">VAT Included</span>
            </div>
          )}
        </div>

        {/* INTERACTIVE PURCHASE TOGGLE BOX (Allows adding multiple items at once) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 pt-3 border-t border-neutral-100 bg-[#FAFAFA] p-3 text-xs"
        >
          {product.pricing_type === 'area' ? (
            <div>
              {/* Clean Mode Switcher with smooth transition */}
              <div className="flex items-center gap-1 p-0.5 bg-neutral-200/70 mb-2.5">
                <button
                  type="button"
                  onClick={() => setOrderMode('coverage')}
                  className={`flex-1 py-1 px-2 text-center text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    orderMode === 'coverage'
                      ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  By Coverage (m²)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderMode('box')}
                  className={`flex-1 py-1 px-2 text-center text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    orderMode === 'box'
                      ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  By Box
                </button>
              </div>

              {/* Mode A: Coverage Input */}
              {orderMode === 'coverage' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] text-neutral-600 font-medium">
                      Coverage Needed:
                    </label>
                    <div className="flex items-center gap-1 w-24">
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={coverageInput}
                        onChange={(e) =>
                          setCoverageInput(Math.max(0.5, Number(e.target.value) || 0))
                        }
                        className="w-full text-right px-2 py-1 bg-white border border-neutral-300 text-xs font-bold text-neutral-950 focus:outline-hidden focus:border-neutral-950"
                      />
                      <span className="text-xs text-neutral-500 font-mono">m²</span>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-neutral-700">
                    <input
                      type="checkbox"
                      checked={withWastage}
                      onChange={(e) => setWithWastage(e.target.checked)}
                      className="accent-neutral-950 w-3 h-3 rounded-none"
                    />
                    <span>
                      Include +10% cutting wastage
                      <span className="text-neutral-400 font-mono text-[10px] ml-1">
                        ({(coverageInput * 1.10).toFixed(1)} m²)
                      </span>
                    </span>
                  </label>

                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Order:</span>
                      <span className="font-bold text-neutral-950">
                        {calculatedBoxesFromCoverage} Boxes{' '}
                        <span className="font-normal text-neutral-500 text-[11px]">
                          ({actualDeliveredCoverage} m²)
                        </span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 block text-[10px]">Total:</span>
                      <span className="font-bold text-neutral-950 text-sm">
                        {formatKES(calculatedCostFromCoverage)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mode B: Direct Box Quantity Stepper / Direct Input */
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] text-neutral-600 font-medium">
                      Boxes to Order:
                    </label>
                    <div className="flex items-center border border-neutral-300 bg-white">
                      <button
                        type="button"
                        onClick={() => setBoxQuantity((b) => Math.max(1, b - 1))}
                        className="px-2 py-1 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                        aria-label="Decrease boxes"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={boxQuantity}
                        onChange={(e) =>
                          setBoxQuantity(Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-14 text-center text-xs font-bold text-neutral-950 border-x border-neutral-200 focus:outline-hidden py-1"
                      />
                      <button
                        type="button"
                        onClick={() => setBoxQuantity((b) => b + 1)}
                        className="px-2 py-1 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                        aria-label="Increase boxes"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Yield:</span>
                      <span className="font-semibold text-neutral-800">
                        {deliveredCoverageFromBoxes} m²
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 block text-[10px]">Total:</span>
                      <span className="font-bold text-neutral-950 text-sm">
                        {formatKES(calculatedCostFromBoxes)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Sanitaryware / Electrical Unit Mode with multi-item quantity counter */
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] text-neutral-600 font-medium">
                  Quantity (Units):
                </label>
                <div className="flex items-center border border-neutral-300 bg-white">
                  <button
                    type="button"
                    onClick={() => setUnitQuantity((u) => Math.max(1, u - 1))}
                    className="px-2.5 py-1 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                    aria-label="Decrease units"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={unitQuantity}
                    onChange={(e) => setUnitQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-xs font-bold text-neutral-950 py-1 border-x border-neutral-200 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setUnitQuantity((u) => u + 1)}
                    className="px-2.5 py-1 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                    aria-label="Increase units"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1.5 border-t border-neutral-200/60">
                <span className="text-neutral-500 text-[10px]">Total Amount:</span>
                <span className="font-bold text-neutral-950 text-sm">
                  {formatKES(calculatedCostFromUnits)}
                </span>
              </div>
            </div>
          )}

          {/* Add to Cart Button (Adds all selected items/boxes at once without opening drawer) */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full mt-2.5 py-2.5 px-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-neutral-950 text-white hover:bg-neutral-800'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                {product.pricing_type === 'area'
                  ? `Add ${orderMode === 'coverage' ? calculatedBoxesFromCoverage : boxQuantity} Box${(orderMode === 'coverage' ? calculatedBoxesFromCoverage : boxQuantity) > 1 ? 'es' : ''} to Cart`
                  : `Add ${unitQuantity} Unit${unitQuantity > 1 ? 's' : ''} to Cart`}
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
};
