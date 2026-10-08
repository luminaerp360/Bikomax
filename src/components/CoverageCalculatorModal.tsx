import React, { useState } from 'react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { X, Plus, Trash2, Calculator, ShoppingBag, ArrowRight } from 'lucide-react';

interface RoomEntry {
  id: string;
  name: string;
  lengthM: number;
  widthM: number;
  sqm: number;
}

interface CoverageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  selectedProduct?: Product;
}

export const CoverageCalculatorModal: React.FC<CoverageCalculatorModalProps> = ({
  isOpen,
  onClose,
  products,
  selectedProduct,
}) => {
  const { addTileToCart } = useCart();
  const tileProducts = products.filter((p) => p.pricing_type === 'area');

  const [activeTileRef, setActiveTileRef] = useState<string>(
    selectedProduct?.ref || (tileProducts[0]?.ref ?? '')
  );

  const [rooms, setRooms] = useState<RoomEntry[]>([
    { id: '1', name: 'Living & Dining Hall', lengthM: 6.5, widthM: 4.8, sqm: 31.2 },
    { id: '2', name: 'Master Bedroom', lengthM: 4.2, widthM: 3.8, sqm: 15.96 },
  ]);

  const [wastageRate, setWastageRate] = useState<number>(10); // 10% or 15%
  const [addedNotice, setAddedNotice] = useState(false);

  if (!isOpen) return null;

  const currentTile =
    tileProducts.find((p) => p.ref === activeTileRef) || tileProducts[0];
  const sqmPerBox = currentTile?.sqm_per_box || 1.44;
  const boxPrice =
    currentTile?.bulk_price_per_box ||
    (currentTile?.price_per_sqm || 0) * sqmPerBox;

  const totalNetSqm = rooms.reduce((acc, r) => acc + r.sqm, 0);
  const wastageMultiplier = 1 + wastageRate / 100;
  const totalGrossSqm = Number((totalNetSqm * wastageMultiplier).toFixed(2));
  const totalBoxesNeeded = Math.ceil(totalGrossSqm / sqmPerBox);
  const actualDeliveredCoverage = Number(
    (totalBoxesNeeded * sqmPerBox).toFixed(2)
  );
  const totalCost = Number((totalBoxesNeeded * boxPrice).toFixed(2));

  const handleUpdateRoom = (
    id: string,
    field: 'name' | 'lengthM' | 'widthM' | 'sqm',
    val: string | number
  ) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [field]: val };
        if (field === 'lengthM' || field === 'widthM') {
          const l = field === 'lengthM' ? Number(val) : r.lengthM;
          const w = field === 'widthM' ? Number(val) : r.widthM;
          updated.sqm = Number((l * w).toFixed(2));
        }
        return updated;
      })
    );
  };

  const handleAddRoom = () => {
    const newId = String(Date.now());
    setRooms((prev) => [
      ...prev,
      { id: newId, name: `Area / Room ${prev.length + 1}`, lengthM: 4, widthM: 3.5, sqm: 14 },
    ]);
  };

  const handleRemoveRoom = (id: string) => {
    if (rooms.length <= 1) return;
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddAllToCart = () => {
    if (!currentTile || totalBoxesNeeded <= 0) return;

    addTileToCart({
      product: currentTile,
      mode: 'coverage',
      boxes: totalBoxesNeeded,
      coverageM2: actualDeliveredCoverage,
      rawCoverageNeeded: totalNetSqm,
      withWastage: wastageRate > 0,
    });

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-3xl bg-white text-[#0A0A0A] shadow-2xl border border-neutral-300 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neutral-800 border border-neutral-700 text-[#C2A26F]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] tracking-widest uppercase text-neutral-400 font-semibold block">
                Architectural Quick-Tool
              </span>
              <h3 className="text-xl font-bold font-heading">
                Multi-Room Tile Coverage & Box Estimator
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Tile Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2 font-heading">
              1. Select Bikomax Porcelain Tile Model:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {tileProducts.slice(0, 6).map((tile) => (
                <button
                  key={tile.ref}
                  type="button"
                  onClick={() => setActiveTileRef(tile.ref)}
                  className={`p-2.5 text-left border flex items-center gap-2.5 transition-all ${
                    activeTileRef === tile.ref
                      ? 'border-[#0A0A0A] bg-neutral-50 ring-1 ring-[#0A0A0A]'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <img
                    src={tile.image}
                    alt={tile.name}
                    className="w-10 h-10 object-cover shrink-0 border border-neutral-200"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0A0A0A] truncate block">
                      {tile.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 block">
                      {tile.dimension} · {tile.sqm_per_box} m²/box
                    </span>
                    <span className="text-[11px] font-semibold text-[#C2A26F] block">
                      {formatKES(tile.bulk_price_per_box || 0)}/box
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rooms Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-heading">
                2. Enter Room Dimensions:
              </label>
              <button
                type="button"
                onClick={handleAddRoom}
                className="text-xs font-bold text-[#0A0A0A] hover:text-neutral-600 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another Zone
              </button>
            </div>

            <div className="space-y-2 border border-neutral-200 p-3 bg-[#FAFAFA]">
              <div className="grid grid-cols-12 gap-2 text-[11px] uppercase tracking-wider text-neutral-500 font-semibold px-2 pb-1 border-b border-neutral-200">
                <div className="col-span-5">Zone / Room Name</div>
                <div className="col-span-2 text-right">Length (m)</div>
                <div className="col-span-2 text-right">Width (m)</div>
                <div className="col-span-2 text-right">Area (m²)</div>
                <div className="col-span-1 text-center"></div>
              </div>

              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="grid grid-cols-12 gap-2 items-center bg-white p-2 border border-neutral-200/80"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={room.name}
                      onChange={(e) =>
                        handleUpdateRoom(room.id, 'name', e.target.value)
                      }
                      className="w-full text-xs font-medium px-2 py-1 border border-neutral-200 focus:outline-hidden focus:border-[#0A0A0A]"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={room.lengthM}
                      onChange={(e) =>
                        handleUpdateRoom(room.id, 'lengthM', e.target.value)
                      }
                      className="w-full text-right text-xs font-mono px-2 py-1 border border-neutral-200 focus:outline-hidden"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={room.widthM}
                      onChange={(e) =>
                        handleUpdateRoom(room.id, 'widthM', e.target.value)
                      }
                      className="w-full text-right text-xs font-mono px-2 py-1 border border-neutral-200 focus:outline-hidden"
                    />
                  </div>
                  <div className="col-span-2 text-right font-bold text-xs font-mono text-[#0A0A0A]">
                    {room.sqm} m²
                  </div>
                  <div className="col-span-1 text-center">
                    {rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRoom(room.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cutting Wastage Configuration */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2 font-heading">
              3. Cutting Wastage & Breakage Allowance:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setWastageRate(0)}
                className={`p-2.5 text-left border text-xs transition-colors ${
                  wastageRate === 0
                    ? 'border-[#0A0A0A] bg-neutral-100 font-bold'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span className="block font-bold">0% Wastage</span>
                <span className="text-[11px] text-neutral-500">Exact net floor size</span>
              </button>
              <button
                type="button"
                onClick={() => setWastageRate(10)}
                className={`p-2.5 text-left border text-xs transition-colors ${
                  wastageRate === 10
                    ? 'border-[#0A0A0A] bg-neutral-100 font-bold'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span className="block font-bold">+10% Standard (Recommended)</span>
                <span className="text-[11px] text-neutral-500">Straight parallel grid</span>
              </button>
              <button
                type="button"
                onClick={() => setWastageRate(15)}
                className={`p-2.5 text-left border text-xs transition-colors ${
                  wastageRate === 15
                    ? 'border-[#0A0A0A] bg-neutral-100 font-bold'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span className="block font-bold">+15% Complex Pattern</span>
                <span className="text-[11px] text-neutral-500">Diagonal or herringbone</span>
              </button>
            </div>
          </div>

          {/* Final Calculation Engine Results */}
          <div className="p-4 bg-neutral-900 text-white space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-neutral-800 pb-3">
              <div>
                <span className="text-neutral-400 block text-[11px]">Net Area:</span>
                <span className="text-sm font-bold font-mono">{totalNetSqm.toFixed(2)} m²</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Wastage ({wastageRate}%):</span>
                <span className="text-sm font-bold font-mono">
                  {(totalGrossSqm - totalNetSqm).toFixed(2)} m²
                </span>
              </div>
              <div>
                <span className="text-[#C2A26F] block text-[11px] font-semibold">Total Gross Area:</span>
                <span className="text-sm font-bold font-mono text-[#C2A26F]">{totalGrossSqm} m²</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Carton Spec:</span>
                <span className="text-sm font-bold font-mono">{sqmPerBox} m²/box</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <span className="text-xs text-neutral-400 block">Total Required Inventory:</span>
                <div className="text-2xl font-black font-heading text-white flex items-baseline gap-2">
                  <span>{totalBoxesNeeded} Full Boxes</span>
                  <span className="text-xs text-neutral-400 font-mono font-normal">
                    (= {actualDeliveredCoverage} m² total)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-neutral-400 block">Estimated Investment:</span>
                <div className="text-2xl font-black text-[#C2A26F] font-heading">
                  {formatKES(totalCost)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-500">
            *Orders are rounded up to whole boxes to prevent installation shortages.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-neutral-300 text-xs font-semibold hover:bg-neutral-100 transition-colors w-full sm:w-auto"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleAddAllToCart}
              className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              {addedNotice ? 'Added to Cart!' : `Add ${totalBoxesNeeded} Boxes to Cart`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
