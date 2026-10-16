import { CartItem, DeliveryMethod, RestaurantSettings } from '../types.ts';

export interface CheckoutCustomerData {
  name: string;
  phone: string;
  method: DeliveryMethod;
  address?: string;
  notes?: string;
}

export function generateWhatsAppOrderMessage(
  customer: CheckoutCustomerData,
  cart: CartItem[],
  settings: RestaurantSettings,
  subtotal: number,
  deliveryFee: number,
  total: number
): string {
  const methodLabels: Record<DeliveryMethod, string> = {
    delivery: '🛵 Livraison à domicile (Tozeur)',
    takeaway: '🥡 À emporter (Retrait au restaurant)',
    dine_in: '🍽️ Sur place (Dégustation au restaurant)'
  };

  const lines: string[] = [];

  lines.push('🍕 *NOUVELLE COMMANDE – TAXI PIZZA TOZEUR* 🍕');
  lines.push('────────────────────────');
  lines.push(`👤 *Client :* ${customer.name.trim()}`);
  lines.push(`📞 *Téléphone :* ${customer.phone.trim()}`);
  lines.push(`📍 *Mode :* ${methodLabels[customer.method]}`);

  if (customer.method === 'delivery' && customer.address) {
    lines.push(`🏠 *Adresse de livraison :* ${customer.address.trim()}`);
  }

  if (customer.notes && customer.notes.trim()) {
    lines.push(`📝 *Remarques :* ${customer.notes.trim()}`);
  }

  lines.push('────────────────────────');
  lines.push('*DÉTAILS DES ARTICLES :*');

  cart.forEach((item, index) => {
    const sizeStr = item.selectedSize ? ` (${item.selectedSize.label})` : '';
    lines.push(`${index + 1}. *${item.quantity}x* ${item.product.nameFr}${sizeStr} – ${item.totalPrice.toFixed(3)} TND`);
    
    if (item.selectedExtras && item.selectedExtras.length > 0) {
      const extrasStr = item.selectedExtras.map(e => `+ ${e.name}`).join(', ');
      lines.push(`   └ Extras : ${extrasStr}`);
    }

    if (item.notes && item.notes.trim()) {
      lines.push(`   └ Note : ${item.notes.trim()}`);
    }
  });

  lines.push('────────────────────────');
  lines.push(`💰 *Sous-total :* ${subtotal.toFixed(3)} TND`);
  
  if (customer.method === 'delivery') {
    lines.push(`🛵 *Frais de livraison :* ${deliveryFee.toFixed(3)} TND`);
  }
  
  lines.push(`🔥 *TOTAL À RÉGLER :* *${total.toFixed(3)} TND*`);
  lines.push('────────────────────────');
  lines.push('Merci de confirmer la prise en charge et le temps estimé de préparation. 🙏');

  return lines.join('\n');
}

export function buildWhatsAppLink(whatsappNumber: string, message: string): string {
  // Clean phone number (remove +, spaces, dashes)
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
