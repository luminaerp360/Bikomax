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

/**
 * Builds formatted email subject and body for Option 1 Email order routing.
 */
export function generateEmailOrderContent(receipt: OrderReceipt): { subject: string; body: string; mailtoUrl: string } {
  const subject = `[Order Ref: ${receipt.orderId}] Architectural Order - ${receipt.customer.fullName}`;
  
  const lines: string[] = [];
  lines.push(`Dear Bikomax Sales & Procurement Desk,`);
  lines.push(``);
  lines.push(`I would like to place/confirm the following architectural specification order:`);
  lines.push(``);
  lines.push(`ORDER REFERENCE: ${receipt.orderId}`);
  lines.push(`DATE: ${receipt.orderDate}`);
  lines.push(``);
  lines.push(`CLIENT INFORMATION:`);
  lines.push(`- Full Name: ${receipt.customer.fullName}`);
  lines.push(`- Phone Number: ${receipt.customer.phone}`);
  lines.push(`- Email: ${receipt.customer.email}`);
  lines.push(`- Project Type: ${receipt.customer.projectType}`);
  if (receipt.specificSiteAddress) {
    lines.push(`- Delivery Site: ${receipt.specificSiteAddress}`);
  }
  if (receipt.customer.notes) {
    lines.push(`- Project Notes: ${receipt.customer.notes}`);
  }
  lines.push(``);
  lines.push(`SPECIFIED ITEMS:`);
  receipt.items.forEach((item, idx) => {
    if (item.product.pricing_type === 'area') {
      lines.push(`${idx + 1}. ${item.product.name} (${item.product.dimension})`);
      lines.push(`   Quantity: ${item.boxes} Boxes (~${item.coverageM2} m²) | Rate: ${formatKES(item.product.bulk_price_per_box || 0)}/box (${formatKES(item.product.price_per_sqm || 0)}/m²)`);
      lines.push(`   Line Total: ${formatKES(item.totalPrice)}`);
    } else {
      lines.push(`${idx + 1}. ${item.product.name} (${item.product.dimension})`);
      lines.push(`   Quantity: ${item.units} Unit(s) @ ${formatKES(item.product.price_per_unit || 0)}/unit`);
      lines.push(`   Line Total: ${formatKES(item.totalPrice)}`);
    }
  });
  lines.push(``);
  lines.push(`FULFILLMENT & FINANCIALS:`);
  lines.push(`- Fulfillment: ${receipt.fulfillment === 'pickup' ? "Showroom Pickup (Unit G48, Rupa's Godowns, Eldoret - Free)" : `Site Delivery (${receipt.deliveryZone?.name || 'Local'} - ${formatKES(receipt.deliveryFee)})`}`);
  lines.push(`- Net Subtotal: ${formatKES(receipt.subtotal)}`);
  lines.push(`- VAT Portion (16% Included): ${formatKES(receipt.vatAmount)}`);
  lines.push(`- GRAND TOTAL: ${formatKES(receipt.total)}`);
  lines.push(``);
  lines.push(`Please confirm stock availability, pallet staging schedule, and delivery lead time.`);
  lines.push(``);
  lines.push(`Best regards,`);
  lines.push(`${receipt.customer.fullName}`);
  lines.push(`${receipt.customer.phone}`);

  const body = lines.join('\n');
  const mailtoUrl = `mailto:${SHOWROOM_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
}

/**
 * Builds quick WhatsApp inquiry message directly from cart items.
 */
export function generateCartWhatsAppMessage(items: CartItem[], subtotal: number): string {
  const lines: string[] = [];
  lines.push(`🏛️ *BIKOMAX ARCHITECTURAL INQUIRY & PROFORMA*`);
  lines.push(`Hello Bikomax Eldoret, I have selected the following specification from your portal:`);
  lines.push(``);

  items.forEach((item, idx) => {
    if (item.product.pricing_type === 'area') {
      lines.push(`${idx + 1}. *${item.product.name}* (${item.product.dimension})`);
      lines.push(`   • ${item.boxes} Boxes (~${item.coverageM2} m²) = *${formatKES(item.totalPrice)}*`);
    } else {
      lines.push(`${idx + 1}. *${item.product.name}* (${item.product.dimension})`);
      lines.push(`   • ${item.units} Unit(s) = *${formatKES(item.totalPrice)}*`);
    }
  });

  lines.push(``);
  lines.push(`💰 *Estimated Total:* *${formatKES(subtotal)}* (Incl. 16% VAT)`);
  lines.push(`📍 *Pickup/Delivery:* Eldoret Depot (Unit G48, Rupa's Godowns)`);
  lines.push(``);
  lines.push(`Please confirm current depot stock and advise on trade staging.`);

  return encodeURIComponent(lines.join('\n'));
}

/**
 * Builds quick email proforma message directly from cart items.
 */
export function generateCartEmailContent(items: CartItem[], subtotal: number): { subject: string; body: string; mailtoUrl: string } {
  const subject = `Bikomax Proforma Quotation Request - ${items.length} item(s)`;
  const lines: string[] = [];
  lines.push(`Dear Bikomax Sales Desk,`);
  lines.push(``);
  lines.push(`I would like to request an official proforma quotation for the following items:`);
  lines.push(``);

  items.forEach((item, idx) => {
    if (item.product.pricing_type === 'area') {
      lines.push(`${idx + 1}. ${item.product.name} (${item.product.dimension}) - ${item.boxes} Boxes (~${item.coverageM2} m²) - ${formatKES(item.totalPrice)}`);
    } else {
      lines.push(`${idx + 1}. ${item.product.name} (${item.product.dimension}) - ${item.units} Unit(s) - ${formatKES(item.totalPrice)}`);
    }
  });

  lines.push(``);
  lines.push(`Estimated Total: ${formatKES(subtotal)} (16% VAT Incl.)`);
  lines.push(``);
  lines.push(`Please advise on availability and dispatch times from Rupa's Godowns, Eldoret.`);

  const body = lines.join('\n');
  const mailtoUrl = `mailto:${SHOWROOM_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
}

