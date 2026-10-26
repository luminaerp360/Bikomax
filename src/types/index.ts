export interface Product {
  id?: string;
  ref: string;
  name: string;
  category: 'Tiles' | 'Sanitaryware' | 'Electrical' | 'SPC Flooring';
  dimension: string;
  pricing_type: 'area' | 'unit';
  price?: number;
  price_per_sqm?: number;
  bulk_price_per_box?: number;
  sqm_per_box?: number;
  bulk_unit?: string;
  price_per_unit?: number;
  stock: number;
  image: string;
  description: string;
  finish?: string;
  material?: string;
  origin?: string;
  specs?: { label: string; value: string }[];
  featured?: boolean;
  look?: 'Marble' | 'Wood' | 'Stone' | 'Concrete' | 'Sugar Effect' | 'Pattern' | 'Color';
  destinations?: ('Living' | 'Bathroom' | 'Kitchen' | 'Bedroom' | 'Outdoor' | 'Commercial')[];
  technology?: 'Porcelain' | 'Ceramic' | 'XXL' | '2cm' | '18mm' | 'Sanitaryware' | 'Electrical';
  collection?: string;
  surfaceType?: 'Floor' | 'Wall' | 'Floor & Wall';
  thickness?: string;
}

export type TileOrderMode = 'coverage' | 'box';

export interface CartItem {
  id: string; // unique item id in cart (handles variants or specific orders)
  product: Product;
  orderMode: TileOrderMode | 'unit';
  boxes?: number; // for tiles
  coverageM2?: number; // calculated coverage in m²
  rawCoverageNeeded?: number; // what the user typed in m²
  withWastage?: boolean; // tile cutting wastage +10%
  units?: number; // for sanitaryware & electrical
  unitPrice: number; // per box or per unit
  totalPrice: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  projectType: 'Residential (Private)' | 'Commercial Building' | 'Architect / Contractor' | 'Showroom Walk-in';
  siteAddress?: string;
  notes?: string;
}

export type FulfillmentMethod = 'pickup' | 'delivery';

export interface DeliveryZone {
  id: string;
  name: string;
  description: string;
  fee: number;
  estimatedDays: string;
}

export type PaymentMethodType = 'whatsapp' | 'email' | 'call' | 'mpesa' | 'bank_transfer' | 'showroom_cash';

export interface OrderReceipt {
  orderId: string;
  orderDate: string;
  customer: CustomerDetails;
  fulfillment: FulfillmentMethod;
  deliveryZone?: DeliveryZone;
  specificSiteAddress?: string;
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: string;
  mpesaReceiptNumber?: string;
}
