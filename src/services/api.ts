import { Product, OrderReceipt, DeliveryZone } from '../types';
import { SHOWROOM_CONTACT } from '../data/products';

/**
 * Automatically determine backend API base URL:
 * 1. Reads VITE_API_BASE_URL from environment (.env.production or .env.development)
 * 2. In development (DEV): defaults to local backend at http://localhost:3000
 * 3. Strips trailing slashes to prevent malformed URLs
 */
const envUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
export const API_BASE_URL = envUrl 
  ? envUrl.replace(/\/+$/, '') 
  : (import.meta.env.DEV ? 'http://localhost:3000' : 'https://ecommerse.lumina360.tech');

export const TENANT_ID = ((import.meta.env.VITE_TENANT_ID as string | undefined)?.trim()) || 'bikomax';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-tenant-id': TENANT_ID,
};

export interface FetchProductsFilter {
  category?: string;
  search?: string;
  look?: string;
  technology?: string;
  surfaceType?: string;
  destination?: string;
  pricingType?: string;
}

/**
 * Normalizes backend product object to frontend Product type
 */
function mapBackendProductToFrontend(raw: any): Product {
  const categoryRaw = Array.isArray(raw.categories) && raw.categories.length > 0 
    ? raw.categories[0] 
    : (raw.category || 'Tiles');

  const category = (['Tiles', 'Sanitaryware', 'Electrical'].includes(categoryRaw))
    ? (categoryRaw as 'Tiles' | 'Sanitaryware' | 'Electrical')
    : 'Tiles';

  return {
    id: raw.id || raw._id,
    ref: raw.sku || raw.itemNo || raw.id || raw._id || `PRD-${Math.random().toString(36).substring(2, 9)}`,
    name: raw.name || 'Architectural Product',
    category,
    dimension: raw.dimension || 'Standard',
    pricing_type: (raw.pricingType || (category === 'Tiles' ? 'area' : 'unit')) as 'area' | 'unit',
    price_per_sqm: raw.pricePerSqm || (category === 'Tiles' ? raw.price : undefined),
    bulk_price_per_box: raw.bulkPricePerBox || (raw.pricePerSqm && raw.sqmPerBox ? raw.pricePerSqm * raw.sqmPerBox : undefined),
    sqm_per_box: raw.sqmPerBox || 1.44,
    bulk_unit: raw.bulkUnit || 'Box',
    price_per_unit: raw.pricingType === 'unit' ? (raw.price || raw.pricePerUnit) : undefined,
    stock: raw.stockQuantity ?? raw.stock ?? 50,
    image: (Array.isArray(raw.images) && raw.images[0]) || raw.image || '/products/tile-matte-66008.jpg',
    description: raw.description || '',
    finish: raw.finish,
    material: raw.material,
    origin: raw.origin,
    specs: raw.specs || (raw.specifications ? Object.entries(raw.specifications).map(([label, value]) => ({ label, value: String(value) })) : []),
    featured: raw.featured ?? false,
    look: raw.look,
    destinations: raw.destinations,
    technology: raw.technology,
    collection: raw.collectionName || raw.collection,
    surfaceType: raw.surfaceType,
    thickness: raw.thickness,
  };
}

/**
 * Fetch products from backend strictly without mock fallback
 */
export async function getProducts(filters?: FetchProductsFilter): Promise<Product[]> {
  if (!API_BASE_URL) {
    throw new Error('Backend URL is not configured. Please define VITE_API_BASE_URL.');
  }

  const params = new URLSearchParams();
  if (filters?.category && filters.category !== 'All') {
    params.append('categories', filters.category);
  }
  if (filters?.search) {
    params.append('search', filters.search);
  }
  if (filters?.look) {
    params.append('look', filters.look);
  }
  if (filters?.technology) {
    params.append('technology', filters.technology);
  }
  if (filters?.surfaceType) {
    params.append('surfaceType', filters.surfaceType);
  }
  if (filters?.destination) {
    params.append('destination', filters.destination);
  }
  if (filters?.pricingType) {
    params.append('pricingType', filters.pricingType);
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const requestUrl = `${API_BASE_URL}/products${queryString}`;

  try {
    const res = await fetch(requestUrl, {
      method: 'GET',
      headers: defaultHeaders,
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      throw new Error(`Backend error (${res.status} ${res.statusText}): ${errBody || 'Failed to fetch products'}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid backend data format: expected an array of products');
    }

    return data.map(mapBackendProductToFrontend);
  } catch (err: any) {
    if (err.name === 'TimeoutError' || err.message?.includes('timeout')) {
      throw new Error(`Connection timed out while contacting backend at ${API_BASE_URL}. The server may be waking up or unreachable.`);
    }
    if (err.message?.includes('Failed to fetch') || err.name === 'TypeError') {
      throw new Error(`Cannot reach backend at ${API_BASE_URL}. Please ensure the backend is deployed, running, and CORS is enabled.`);
    }
    throw err;
  }
}

/**
 * Fetch categories strictly from backend
 */
export async function getCategories(): Promise<string[]> {
  if (!API_BASE_URL) {
    throw new Error('Backend URL is not configured.');
  }
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: 'GET',
    headers: defaultHeaders,
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) {
    throw new Error(`Failed to load categories: HTTP ${res.status}`);
  }
  const data = await res.json();
  if (Array.isArray(data)) {
    return data.map((c: any) => c.name || c);
  }
  return [];
}

/**
 * Fetch settings / showroom contact strictly from backend
 */
export async function getStoreSettings(): Promise<typeof SHOWROOM_CONTACT> {
  if (!API_BASE_URL) {
    return SHOWROOM_CONTACT;
  }
  const res = await fetch(`${API_BASE_URL}/settings`, {
    method: 'GET',
    headers: defaultHeaders,
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) {
    throw new Error(`Failed to load settings: HTTP ${res.status}`);
  }
  const data = await res.json();
  if (data?.general) {
    return {
      ...SHOWROOM_CONTACT,
      brandName: data.general.storeName || SHOWROOM_CONTACT.brandName,
      tagline: data.general.storeTagline || SHOWROOM_CONTACT.tagline,
      showroomLocation: data.general.storeAddress || SHOWROOM_CONTACT.showroomLocation,
      phone: data.general.supportPhone || SHOWROOM_CONTACT.phone,
      phoneRaw: (data.general.supportPhone || SHOWROOM_CONTACT.phoneRaw).replace(/[^0-9+]/g, ''),
      whatsappPhone: data.social?.whatsapp || SHOWROOM_CONTACT.whatsappPhone,
      email: data.general.supportEmail || SHOWROOM_CONTACT.email,
      openingHours: data.general.openingHours || SHOWROOM_CONTACT.openingHours,
    };
  }
  return SHOWROOM_CONTACT;
}

/**
 * Create Order in backend
 */
export async function submitOrderToBackend(receipt: OrderReceipt): Promise<{ success: boolean; orderId: string; rawResponse?: any; error?: string }> {
  if (!API_BASE_URL) {
    return { success: false, orderId: receipt.orderId, error: 'Backend API URL is not configured.' };
  }
  try {
    const payload = {
      items: receipt.items.map((item) => ({
        productId: item.product.id || item.product.ref,
        quantity: item.boxes || item.units || 1,
        price: item.totalPrice,
        unitPrice: item.unitPrice,
        orderMode: item.orderMode,
        rawCoverageNeeded: item.rawCoverageNeeded,
        coverageM2: item.coverageM2,
        boxes: item.boxes,
        withWastage: item.withWastage,
        productSnapshot: {
          ref: item.product.ref,
          name: item.product.name,
          category: item.product.category,
          dimension: item.product.dimension,
          image: item.product.image,
        },
      })),
      customer: receipt.customer,
      fulfillment: receipt.fulfillment,
      deliveryZone: receipt.deliveryZone,
      specificSiteAddress: receipt.specificSiteAddress,
      deliveryFee: receipt.deliveryFee,
      subtotal: receipt.subtotal,
      vatAmount: receipt.vatAmount,
      totalAmount: receipt.total,
      paymentMethod: receipt.paymentMethod,
      mpesaReceiptNumber: receipt.mpesaReceiptNumber,
    };

    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.text();
      return { success: false, orderId: receipt.orderId, error: `Order failed: ${res.status} ${errBody}` };
    }

    const created = await res.json();
    return {
      success: true,
      orderId: created.id || created._id || receipt.orderId,
      rawResponse: created,
    };
  } catch (error: any) {
    return { success: false, orderId: receipt.orderId, error: error.message || 'Network error while connecting to backend.' };
  }
}
