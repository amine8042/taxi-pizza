export type Language = 'fr' | 'ar';

export type ProductCategory =
  | 'classique'
  | 'speciale'
  | 'quatre_fromages'
  | 'mexicaine'
  | 'vegetarienne'
  | 'calzone'
  | 'boisson'
  | 'dessert';

export interface ProductSize {
  name: string; // 'm' | 'l' | 'xl'
  label: string; // 'Moyenne (30cm)'
  labelAr?: string;
  priceDelta: number; // e.g. +4.000 TND
}

export interface ProductExtra {
  id: string;
  name: string;
  nameAr?: string;
  price: number; // e.g. 1.500 TND
}

export interface Product {
  id: string;
  nameFr: string;
  nameAr: string;
  descriptionFr: string;
  descriptionAr: string;
  category: ProductCategory;
  price: number; // Base price in TND
  image: string;
  available: boolean;
  isFeatured?: boolean;
  sizes?: ProductSize[];
  availableExtras?: ProductExtra[];
}

export interface CartItem {
  id: string; // Unique hash or id
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: ProductSize;
  selectedExtras: ProductExtra[];
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export type DeliveryMethod = 'delivery' | 'takeaway' | 'dine_in';

export type OrderStatus = 'nouvelle' | 'preparation' | 'livraison' | 'livree' | 'annulee';

export interface OrderItemSummary {
  productId: string;
  name: string;
  sizeLabel?: string;
  extras: string[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  notes?: string;
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  source: 'whatsapp' | 'manuel';
}

export interface RestaurantSettings {
  name: string;
  nameAr: string;
  phone: string;
  whatsappNumber: string; // e.g. '21624210021'
  address: string;
  addressAr: string;
  rating: number;
  reviewsCount: number;
  deliveryFee: number; // e.g. 3.000 TND
  openingHours: string;
  openingHoursAr: string;
  homepagePromoFr: string;
  homepagePromoAr: string;
  adminUsername: string;
  adminPassword: string;
}

export interface ExportDataPayload {
  version: string;
  exportDate: string;
  restaurantSettings: RestaurantSettings;
  products: Product[];
  orders: Order[];
}
