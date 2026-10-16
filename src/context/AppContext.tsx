import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Product,
  RestaurantSettings,
  Order,
  CartItem,
  ProductSize,
  ProductExtra,
  OrderStatus,
  ExportDataPayload
} from '../types.ts';
import {
  INITIAL_PRODUCTS,
  INITIAL_SETTINGS,
  INITIAL_SAMPLE_ORDERS
} from '../data/initialData.ts';
import { translations } from '../utils/translations.ts';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)['fr'];
  products: Product[];
  settings: RestaurantSettings;
  orders: Order[];
  cart: CartItem[];
  cartTotal: number;
  cartCount: number;
  adminAuthenticated: boolean;
  adminUser: string | null;
  currentRoute: string;
  navigateTo: (route: string) => void;
  selectedProductModal: Product | null;
  openProductModal: (p: Product) => void;
  closeProductModal: () => void;
  
  // Cart actions
  addToCart: (
    product: Product,
    quantity: number,
    selectedSize?: ProductSize,
    selectedExtras?: ProductExtra[],
    notes?: string
  ) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  // Product management
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Settings management
  updateSettings: (newSettings: Partial<RestaurantSettings>) => void;

  // Orders management
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Admin auth
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Backup & reset
  exportAllData: () => string;
  importAllData: (jsonStr: string) => { success: boolean; error?: string };
  resetToDemoData: () => void;

  // Helpers
  formatPrice: (amount: number) => string;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  LANGUAGE: 'taxipizza_lang',
  PRODUCTS: 'taxipizza_products_v2',
  SETTINGS: 'taxipizza_settings',
  ORDERS: 'taxipizza_orders',
  CART: 'taxipizza_cart',
  ADMIN_AUTH: 'taxipizza_admin_session'
};

const defaultImageMap: Record<string, string> = {};
INITIAL_PRODUCTS.forEach(p => {
  defaultImageMap[p.id] = p.image;
});

function resolveValidImage(id: string, img?: string): string {
  if (!img || img.startsWith('/src/assets/') || img.includes('unsplash.com')) {
    return defaultImageMap[id] || INITIAL_PRODUCTS[0].image;
  }
  return img;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return (saved === 'ar' || saved === 'fr') ? saved : 'fr';
    } catch {
      return 'fr';
    }
  });

  // Products with automatic repair for any cached invalid paths
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedV2 = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      const savedOld = localStorage.getItem('taxipizza_products');
      const saved = savedV2 || savedOld;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => ({
            ...p,
            image: resolveValidImage(p.id, p.image)
          }));
        }
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Settings
  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.error('Error loading settings from localStorage:', e);
    }
    return INITIAL_SETTINGS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading orders from localStorage:', e);
    }
    return INITIAL_SAMPLE_ORDERS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Admin auth
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      return session === 'true';
    } catch {
      return false;
    }
  });
  const [adminUser, setAdminUser] = useState<string | null>(() => {
    return adminAuthenticated ? 'admin' : null;
  });

  // Routing
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Modal
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  // Sync route with history & popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync RTL and lang attribute
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch {}
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  }, [products]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage:', e);
    }
  }, [settings]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }, [orders]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  // Cart Actions
  const addToCart = (
    product: Product,
    quantity: number,
    selectedSize?: ProductSize,
    selectedExtras: ProductExtra[] = [],
    notes?: string
  ) => {
    const extrasKey = selectedExtras
      .map(e => e.id)
      .sort()
      .join('-');
    const sizeKey = selectedSize ? selectedSize.name : 'base';
    const itemId = `${product.id}_${sizeKey}_${extrasKey}_${notes ? notes.trim() : ''}`;

    const unitBase = product.price + (selectedSize ? selectedSize.priceDelta : 0);
    const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = unitBase + extrasPrice;
    const itemTotalPrice = unitPrice * quantity;

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.id === itemId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          totalPrice: unitPrice * newQty
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            product,
            quantity,
            selectedSize,
            selectedExtras,
            notes,
            unitPrice,
            totalPrice: itemTotalPrice
          }
        ];
      }
    });
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Product management
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Orders
  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // Admin Auth
  const loginAdmin = (user: string, pass: string): boolean => {
    if (
      user.trim() === settings.adminUsername &&
      pass.trim() === settings.adminPassword
    ) {
      setAdminAuthenticated(true);
      setAdminUser(user);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminAuthenticated(false);
    setAdminUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {}
    navigateTo('/');
  };

  // Backup & Reset
  const exportAllData = (): string => {
    const payload: ExportDataPayload = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      restaurantSettings: settings,
      products,
      orders
    };
    return JSON.stringify(payload, null, 2);
  };

  const importAllData = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr) as ExportDataPayload;
      if (!parsed || !parsed.restaurantSettings || !Array.isArray(parsed.products)) {
        return { success: false, error: 'Format JSON invalide ou incomplet.' };
      }
      setSettings(parsed.restaurantSettings);
      setProducts(parsed.products);
      if (Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Erreur lors du décodage du fichier JSON' };
    }
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings(INITIAL_SETTINGS);
    setOrders(INITIAL_SAMPLE_ORDERS);
    setCart([]);
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      localStorage.removeItem(STORAGE_KEYS.CART);
    } catch {}
  };

  // Format price
  const formatPrice = (amount: number): string => {
    const formatted = amount.toFixed(3);
    if (language === 'ar') {
      return `${formatted} د.ت`;
    }
    return `${formatted} TND`;
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        products,
        settings,
        orders,
        cart,
        cartTotal,
        cartCount,
        adminAuthenticated,
        adminUser,
        currentRoute,
        navigateTo,
        selectedProductModal,
        openProductModal: setSelectedProductModal,
        closeProductModal: () => setSelectedProductModal(null),
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        loginAdmin,
        logoutAdmin,
        exportAllData,
        importAllData,
        resetToDemoData,
        formatPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
