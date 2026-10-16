import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Utensils } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    language,
    t,
    cart,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    navigateTo,
    settings
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-10 h-10 text-neutral-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">{t.emptyCartTitle}</h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            {t.emptyCartDesc}
          </p>
        </div>
        <div>
          <button
            onClick={() => navigateTo('/menu')}
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>{t.viewMenuBtn}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Clear button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            {language === 'ar' ? 'مراجعة الطلب' : 'Récapitulatif'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {t.cartTitle}
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'إفراغ السلة' : 'Vider le panier'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (Left Column) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => {
            const title = language === 'ar' ? item.product.nameAr : item.product.nameFr;
            const sizeLabel = item.selectedSize
              ? language === 'ar' && item.selectedSize.labelAr
                ? item.selectedSize.labelAr
                : item.selectedSize.label
              : null;

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#17181c] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product thumb & details */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-neutral-900 overflow-hidden shrink-0 border border-white/5">
                    <img
                      src={item.product.image}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {title}
                    </h3>
                    <div className="text-xs text-neutral-400 space-y-0.5 mt-0.5">
                      {sizeLabel && (
                        <p className="text-amber-400 font-medium">Taille : {sizeLabel}</p>
                      )}
                      {item.selectedExtras.length > 0 && (
                        <p className="line-clamp-1">
                          Extras :{' '}
                          {item.selectedExtras
                            .map(e =>
                              language === 'ar' && e.nameAr ? e.nameAr : e.name
                            )
                            .join(', ')}
                        </p>
                      )}
                      {item.notes && (
                        <p className="italic text-neutral-500">« {item.notes} »</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price, Stepper & Remove */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex items-center border border-white/15 rounded-lg overflow-hidden bg-neutral-900">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/5"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/5"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-amber-400 tabular-nums">
                    {formatPrice(item.totalPrice)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                    aria-label="Supprimer cet article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => navigateTo('/menu')}
              className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5"
            >
              <Utensils className="w-3.5 h-3.5 text-red-500" />
              <span>{language === 'ar' ? 'إضافة أطباق أخرى من القائمة' : 'Ajouter d’autres articles du menu'}</span>
            </button>
          </div>
        </div>

        {/* Order Summary & Checkout Trigger (Right Column) */}
        <div className="lg:col-span-4 bg-[#17181c] border border-white/10 rounded-2xl p-6 space-y-6 sticky top-28">
          <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
            {language === 'ar' ? 'تفاصيل السلة' : 'Résumé du Panier'}
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-neutral-300">
              <span>{t.subtotal}</span>
              <span className="font-bold text-white tabular-nums">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>{language === 'ar' ? 'التوصيل / الاستلام' : 'Mode'}</span>
              <span>{language === 'ar' ? 'يُحدد في الخطوة التالية' : 'Sélection à l’étape suivante'}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-base font-extrabold text-white">
            <span>{t.totalOrder}</span>
            <span className="text-xl text-amber-400 tabular-nums">
              {formatPrice(cartTotal)}
            </span>
          </div>

          <button
            onClick={() => navigateTo('/checkout')}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{language === 'ar' ? 'متابعة وإتمام الطلب' : 'Valider & Passer la commande'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
            {language === 'ar'
              ? 'الطلب يتم إرساله مباشرة عبر واتساب بدون الحاجة للتسجيل أو إنشاء حساب.'
              : 'Commande transmise directement via WhatsApp sans inscription ni mot de passe.'}
          </p>
        </div>
      </div>
    </div>
  );
};
