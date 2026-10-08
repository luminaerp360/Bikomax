import { CartItem, OrderReceipt, FulfillmentMethod } from '../types';
import { SHOWROOM_CONTACT } from '../data/products';

export function formatKES(amount: number, decimals: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'KES 0';
  const formatted = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: decimals ? 2 : (amount % 1 !== 0 ? 2 : 0),
    maximumFractionDigits: 2,
  }).format(amount);
  return `KES ${formatted}`;
}

export function formatNumber(amount: number, maxDecimals: number = 2): string {
  return new Intl.NumberFormat('en-KE', {
    maximumFractionDigits: maxDecimals,
  }).format(amount);
}

/**
 * Calculates boxes needed given coverage in m², sqm per box, and optional wastage.
 */
export function calculateTileBoxes(
  sqmNeeded: number,
  sqmPerBox: number,
  withWastage: boolean = true
): {
  grossSqm: number;
  boxesNeeded: number;
  actualCoverage: number;
} {
  if (!sqmNeeded || sqmNeeded <= 0 || !sqmPerBox || sqmPerBox <= 0) {
    return { grossSqm: 0, boxesNeeded: 0, actualCoverage: 0 };
  }

  const multiplier = withWastage ? 1.10 : 1.0;
  const grossSqm = Number((sqmNeeded * multiplier).toFixed(2));
  const boxesNeeded = Math.ceil(grossSqm / sqmPerBox);
  const actualCoverage = Number((boxesNeeded * sqmPerBox).toFixed(2));

  return { grossSqm, boxesNeeded, actualCoverage };
}

/**
 * Builds formatted message for Bikomax WhatsApp order pipeline.
 */
export function generateWhatsAppOrderMessage(receipt: OrderReceipt): string {
  const lines: string[] = [];
  lines.push(`🏛️ *BIKOMAX ARCHITECTURAL SUPPLY ORDER*`);
  lines.push(`*Order Ref:* ${receipt.orderId}`);
  lines.push(`*Date:* ${receipt.orderDate}`);
  lines.push(``);
  lines.push(`👤 *Client:* ${receipt.customer.fullName}`);
  lines.push(`📞 *Phone:* ${receipt.customer.phone}`);
  lines.push(`🏢 *Project Type:* ${receipt.customer.projectType}`);
  if (receipt.specificSiteAddress) {
    lines.push(`📍 *Site Location:* ${receipt.specificSiteAddress}`);
  }
  lines.push(``);
  lines.push(`📦 *ORDERED ITEMS:*`);

  receipt.items.forEach((item, idx) => {
    if (item.product.pricing_type === 'area') {
      lines.push(
        `${idx + 1}. *${item.product.name}* (${item.product.dimension})`
      );
      lines.push(
        `   • Quantity: ${item.boxes} Boxes (~${item.coverageM2} m² @ ${item.product.sqm_per_box} m²/box)`
      );
      lines.push(
        `   • Rate: ${formatKES(item.product.bulk_price_per_box || 0)}/box (${formatKES(item.product.price_per_sqm || 0)}/m²)`
      );
      lines.push(`   • Line Total: *${formatKES(item.totalPrice)}*`);
    } else {
      lines.push(
        `${idx + 1}. *${item.product.name}* (${item.product.dimension})`
      );
      lines.push(
        `   • Quantity: ${item.units} Unit(s) @ ${formatKES(item.product.price_per_unit || 0)}/unit`
      );
      lines.push(`   • Line Total: *${formatKES(item.totalPrice)}*`);
    }
  });

  lines.push(``);
  lines.push(`🚚 *Fulfillment:* ${receipt.fulfillment === 'pickup' ? "Showroom Pickup (Unit G48, Rupa's Godowns, Eldoret - Free)" : `Site Delivery (${receipt.deliveryZone?.name} - ${formatKES(receipt.deliveryFee)})`}`);
  lines.push(`💳 *Payment Method:* ${receipt.paymentMethod === 'mpesa' ? `Lipa na M-Pesa (${receipt.mpesaReceiptNumber ? `Receipt: ${receipt.mpesaReceiptNumber}` : 'Pending STK'})` : receipt.paymentMethod === 'bank_transfer' ? 'EFT / RTGS Bank Transfer' : 'Showroom Collection / Cash on Delivery'}`);
  lines.push(`💰 *Grand Total:* *${formatKES(receipt.total)}* (Incl. 16% VAT)`);
  lines.push(``);
  lines.push(`_Sent via BIKOMAX Digital Portal. Please confirm dispatch & warehouse staging._`);

  return encodeURIComponent(lines.join('\n'));
}

export function generateWhatsAppInquiryMessage(productName: string, ref?: string, details?: string): string {
  const text = `Hello BIKOMAX Eldoret,\nI am inquiring about *${productName}*.\n${details ? details : 'Please advise on availability at Unit G48 Rupa’s Godowns and trade bulk pricing.'}\nThank you!`;
  return encodeURIComponent(text);
}
