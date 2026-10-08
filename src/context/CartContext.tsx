import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CartItem, Product, TileOrderMode } from '../types';

export interface BatchItemParam {
  product: Product;
  mode: TileOrderMode | 'unit';
  boxes?: number;
  coverageM2?: number;
  rawCoverageNeeded?: number;
  withWastage?: boolean;
  units?: number;
}

export interface CartToast {
  id: string;
  title: string;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  toast: CartToast | null;
  dismissToast: () => void;
  addTileToCart: (params: {
    product: Product;
    mode: TileOrderMode;
    boxes: number;
    coverageM2: number;
    rawCoverageNeeded?: number;
    withWastage?: boolean;
    openDrawer?: boolean;
  }) => void;
  addUnitToCart: (product: Product, units: number, openDrawer?: boolean) => void;
  addBatchToCart: (batchItems: BatchItemParam[], openDrawer?: boolean) => void;
  updateQuantity: (itemId: string, newAmount: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalBoxesCount: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'bikomax_cart_items_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<CartToast | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (title: string, description: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({
      id: String(Date.now()),
      title,
      description,
    });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const dismissToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast(null);
  };

  const openCart = () => {
    dismissToast();
    setIsOpen(true);
  };

  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const addTileToCart = ({
    product,
    mode,
    boxes,
    coverageM2,
    rawCoverageNeeded,
    withWastage = true,
    openDrawer = false,
  }: {
    product: Product;
    mode: TileOrderMode;
    boxes: number;
    coverageM2: number;
    rawCoverageNeeded?: number;
    withWastage?: boolean;
    openDrawer?: boolean;
  }) => {
    if (boxes <= 0) return;
    const boxPrice = product.bulk_price_per_box || (product.price_per_sqm || 0) * (product.sqm_per_box || 1);

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        i => i.product.ref === product.ref && i.orderMode === mode
      );

      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newBoxes = (existing.boxes || 0) + boxes;
        const newCoverage = Number((newBoxes * (product.sqm_per_box || 1)).toFixed(2));
        const updatedItem: CartItem = {
          ...existing,
          boxes: newBoxes,
          coverageM2: newCoverage,
          totalPrice: Number((newBoxes * boxPrice).toFixed(2)),
        };
        const next = [...prevItems];
        next[existingIndex] = updatedItem;
        return next;
      }

      const newItem: CartItem = {
        id: `tile-${product.ref}-${Date.now()}-${Math.random()}`,
        product,
        orderMode: mode,
        boxes,
        coverageM2: Number((boxes * (product.sqm_per_box || 1)).toFixed(2)),
        rawCoverageNeeded,
        withWastage,
        unitPrice: boxPrice,
        totalPrice: Number((boxes * boxPrice).toFixed(2)),
      };
      return [...prevItems, newItem];
    });

    // DO NOT force open the cart drawer! Notify cleanly so user can continue shopping
    showToast(
      'Added to Cart',
      `${boxes} Box${boxes > 1 ? 'es' : ''} of ${product.name} (${coverageM2} m²)`
    );

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const addUnitToCart = (product: Product, units: number, openDrawer = false) => {
    if (units <= 0) return;
    const unitPrice = product.price_per_unit || 0;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.product.ref === product.ref);
      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newUnits = (existing.units || 0) + units;
        const updatedItem: CartItem = {
          ...existing,
          units: newUnits,
          totalPrice: Number((newUnits * unitPrice).toFixed(2)),
        };
        const next = [...prevItems];
        next[existingIndex] = updatedItem;
        return next;
      }

      const newItem: CartItem = {
        id: `unit-${product.ref}-${Date.now()}-${Math.random()}`,
        product,
        orderMode: 'unit',
        units,
        unitPrice,
        totalPrice: Number((units * unitPrice).toFixed(2)),
      };
      return [...prevItems, newItem];
    });

    // Notify quietly without interrupting browsing
    showToast(
      'Added to Cart',
      `${units} × ${product.name}`
    );

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const addBatchToCart = (batchItems: BatchItemParam[], openDrawer = false) => {
    if (!batchItems || batchItems.length === 0) return;

    setItems(prevItems => {
      let current = [...prevItems];

      batchItems.forEach(b => {
        if (b.product.pricing_type === 'area') {
          const boxes = b.boxes && b.boxes > 0 ? b.boxes : 1;
          const boxPrice = b.product.bulk_price_per_box || (b.product.price_per_sqm || 0) * (b.product.sqm_per_box || 1);
          const existingIndex = current.findIndex(
            i => i.product.ref === b.product.ref && i.orderMode === b.mode
          );

          if (existingIndex > -1) {
            const existing = current[existingIndex];
            const newBoxes = (existing.boxes || 0) + boxes;
            current[existingIndex] = {
              ...existing,
              boxes: newBoxes,
              coverageM2: Number((newBoxes * (b.product.sqm_per_box || 1)).toFixed(2)),
              totalPrice: Number((newBoxes * boxPrice).toFixed(2)),
            };
          } else {
            current.push({
              id: `tile-${b.product.ref}-${Date.now()}-${Math.random()}`,
              product: b.product,
              orderMode: (b.mode as TileOrderMode) || 'box',
              boxes,
              coverageM2: Number((boxes * (b.product.sqm_per_box || 1)).toFixed(2)),
              rawCoverageNeeded: b.rawCoverageNeeded,
              withWastage: b.withWastage ?? true,
              unitPrice: boxPrice,
              totalPrice: Number((boxes * boxPrice).toFixed(2)),
            });
          }
        } else {
          const units = b.units && b.units > 0 ? b.units : 1;
          const unitPrice = b.product.price_per_unit || 0;
          const existingIndex = current.findIndex(i => i.product.ref === b.product.ref);

          if (existingIndex > -1) {
            const existing = current[existingIndex];
            const newUnits = (existing.units || 0) + units;
            current[existingIndex] = {
              ...existing,
              units: newUnits,
              totalPrice: Number((newUnits * unitPrice).toFixed(2)),
            };
          } else {
            current.push({
              id: `unit-${b.product.ref}-${Date.now()}-${Math.random()}`,
              product: b.product,
              orderMode: 'unit',
              units,
              unitPrice,
              totalPrice: Number((units * unitPrice).toFixed(2)),
            });
          }
        }
      });

      return current;
    });

    showToast(
      'Batch Added to Cart',
      `${batchItems.length} architectural items added to your order`
    );

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const updateQuantity = (itemId: string, newAmount: number) => {
    if (newAmount <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prev =>
      prev.map(item => {
        if (item.id !== itemId) return item;

        if (item.product.pricing_type === 'area') {
          const boxes = Math.max(1, Math.round(newAmount));
          const boxPrice =
            item.product.bulk_price_per_box ||
            (item.product.price_per_sqm || 0) * (item.product.sqm_per_box || 1);
          return {
            ...item,
            boxes,
            coverageM2: Number((boxes * (item.product.sqm_per_box || 1)).toFixed(2)),
            totalPrice: Number((boxes * boxPrice).toFixed(2)),
          };
        } else {
          const units = Math.max(1, Math.round(newAmount));
          const unitPrice = item.product.price_per_unit || 0;
          return {
            ...item,
            units,
            totalPrice: Number((units * unitPrice).toFixed(2)),
          };
        }
      })
    );
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const totalBoxesCount = items.reduce(
    (sum, item) => sum + (item.boxes || 0),
    0
  );

  const totalItemsCount = items.reduce(
    (sum, item) => sum + (item.boxes || item.units || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        toast,
        dismissToast,
        addTileToCart,
        addUnitToCart,
        addBatchToCart,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        totalBoxesCount,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
