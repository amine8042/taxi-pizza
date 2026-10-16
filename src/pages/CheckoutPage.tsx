import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { DeliveryMethod, Order } from '../types.ts';
import { generateWhatsAppOrderMessage, buildWhatsAppLink } from '../utils/whatsapp.ts';
import {
  Bike,
  ShoppingBag,
  Utensils,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    language,
    t,
    cart,
    cartTotal,
    settings,
    clearCart,
    addOrder,
    navigateTo,
    formatPrice
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [orderSubmitted, setOrderSubmitted] = useState<Order | null>(null);

  if (cart.length === 0 && !orderSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">{t.emptyCartTitle}</h2>
        <p className="text-sm text-neutral-400">{t.emptyCartDesc}</p>
        <button
          onClick={() => navigateTo('/menu')}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow"
        >
          {t.viewMenuBtn}
        </button>
      </div>
    );
  }

  const deliveryFee = deliveryMethod === 'delivery' ? settings.deliveryFee : 0;
  const totalAmount = cartTotal + deliveryFee;

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string; address?: string } = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.name =
        language === 'ar'
          ? 'يرجى إدخال اسمك الكريم'
          : 'Veuillez saisir votre nom complet.';
    }

    const cleanPhone = customerPhone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone =
        language === 'ar'
          ? 'يرجى إدخال رقم هاتف تونسي صالح (8 أرقام على الأقل)'
          : 'Veuillez renseigner un numéro de téléphone valide (8 chiffres min).';
    }

    if (deliveryMethod === 'delivery' && (!address.trim() || address.trim().length < 5)) {
      newErrors.address =
        language === 'ar'
          ? 'يرجى تحديد عنوان التوصيل داخل توزر بدقة'
          : 'Veuillez préciser votre adresse de livraison à Tozeur.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppOrder = () => {
    if (!validate()) return;

    // 1. Generate text message
    const message = generateWhatsAppOrderMessage(
      {
        name: customerName,
        phone: customerPhone,
        method: deliveryMethod,
        address: deliveryMethod === 'delivery' ? address : undefined,
        notes: notes.trim() ? notes : undefined
      },
      cart,
      settings,
      cartTotal,
      deliveryFee,
      totalAmount
    );

    // 2. Record order locally in browser storage for admin & audit history
    const orderNumber = `TP-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryMethod,
      address: deliveryMethod === 'delivery' ? address.trim() : undefined,
      notes: notes.trim() || undefined,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.product.nameFr,
        sizeLabel: item.selectedSize?.label,
        extras: item.selectedExtras.map(e => e.name),
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      subtotal: cartTotal,
      deliveryFee,
      total: totalAmount,
      status: 'nouvelle',
      source: 'whatsapp'
    };

    addOrder(newOrder);
    setOrderSubmitted(newOrder);
    clearCart();

    // 3. Open WhatsApp link with formatted and encoded text
    const waUrl = buildWhatsAppLink(settings.whatsappNumber, message);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {orderSubmitted ? (
        /* Order Confirmed Screen */
        <div className="p-8 sm:p-12 rounded-3xl bg-[#17181c] border border-white/10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              {language === 'ar' ? 'تم تجهيز الرسالة وإرسالها' : 'Commande transmise avec succès'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === 'ar' ? 'شكراً لطلبك من بيتزا تاكسي !' : 'Merci pour votre commande !'}
            </h2>
            <p className="text-sm text-neutral-300 max-w-lg mx-auto">
              {language === 'ar'
                ? `طلبك رقم #${orderSubmitted.orderNumber} تم توجيهه إلى واتساب المطعم (+216 24 210 021). سنقوم بالرد عليك لتأكيد البدء في تجهيز البيتزا.`
                : `Votre commande #${orderSubmitted.orderNumber} a été préparée pour WhatsApp. Notre équipe va vous répondre immédiatement pour valider le lancement.`}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 max-w-md mx-auto text-xs text-neutral-300 text-left rtl:text-right space-y-1">
            <p className="font-bold text-white mb-2">
              {language === 'ar' ? 'ملخص الطلب :' : 'Récapitulatif :'}
            </p>
            <p>• {language === 'ar' ? 'الاسم :' : 'Client :'} {orderSubmitted.customerName}</p>
            <p>• {language === 'ar' ? 'الهاتف :' : 'Téléphone :'} {orderSubmitted.customerPhone}</p>
            <p>• {language === 'ar' ? 'المبلغ الإجمالي :' : 'Total à régler :'} <span className="font-bold text-amber-400">{formatPrice(orderSubmitted.total)}</span></p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setOrderSubmitted(null);
                navigateTo('/menu');
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-all shadow"
            >
              {language === 'ar' ? 'طلب المزيد من القائمة' : 'Commander à nouveau'}
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'ar' ? 'فتح المحادثة مجدداً' : 'Rouvrir WhatsApp'}</span>
            </a>
          </div>
        </div>
      ) : (
        /* Checkout Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side (8 Cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#17181c] border border-white/10 rounded-3xl p-6 sm:p-8">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                {language === 'ar' ? 'معلومات الزبون' : 'Coordonnées'}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                {language === 'ar' ? 'إتمام الطلب وتحديد التوصيل' : 'Finaliser la commande'}
              </h2>
            </div>

            {/* Delivery Method Selector (3 Options) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                {t.deliveryMethod}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Delivery */}
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    deliveryMethod === 'delivery'
                      ? 'bg-red-600/20 border-red-500 text-white shadow'
                      : 'bg-neutral-900 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Bike className="w-5 h-5 text-red-500" />
                  <span className="text-xs font-bold text-center">
                    {language === 'ar' ? 'توصيل منزلي' : 'Livraison'}
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold tabular-nums">
                    +{formatPrice(settings.deliveryFee)}
                  </span>
                </button>

                {/* Takeaway */}
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('takeaway')}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    deliveryMethod === 'takeaway'
                      ? 'bg-red-600/20 border-red-500 text-white shadow'
                      : 'bg-neutral-900 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-center">
                    {language === 'ar' ? 'استلام ذاتي' : 'À emporter'}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-semibold">
                    {language === 'ar' ? 'مجاني' : 'Gratuit'}
                  </span>
                </button>

                {/* Dine-in */}
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('dine_in')}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    deliveryMethod === 'dine_in'
                      ? 'bg-red-600/20 border-red-500 text-white shadow'
                      : 'bg-neutral-900 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Utensils className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold text-center">
                    {language === 'ar' ? 'على عين المكان' : 'Sur place'}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-semibold">
                    {language === 'ar' ? 'طاولة' : 'Table'}
                  </span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 pt-2">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 block">
                  {t.customerNameLabel} *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder={t.customerNamePlaceholder}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-white/10 focus:border-red-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 block">
                  {t.customerPhoneLabel} *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder={t.customerPhonePlaceholder}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-white/10 focus:border-red-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Delivery Address (required if delivery) */}
              {deliveryMethod === 'delivery' && (
                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-neutral-300 block">
                    {t.deliveryAddressLabel} *
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder={t.deliveryAddressPlaceholder}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                      errors.address ? 'border-red-500' : 'border-white/10 focus:border-red-500'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 block">
                  {t.orderNotesLabel}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={t.orderNotesPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Summary & WhatsApp Button (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#17181c] border border-white/10 rounded-3xl p-6 space-y-5">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                {language === 'ar' ? 'ملخص الحساب' : 'Total de la commande'}
              </h3>

              {/* Items recap */}
              <div className="space-y-2.5 text-xs text-neutral-300 max-h-48 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-2">
                    <span className="line-clamp-1">
                      {item.quantity}x {language === 'ar' ? item.product.nameAr : item.product.nameFr}
                      {item.selectedSize && ` (${item.selectedSize.label})`}
                    </span>
                    <span className="font-semibold text-white shrink-0 tabular-nums">
                      {formatPrice(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-300">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-white tabular-nums">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-300">
                  <span>{t.deliveryFee}</span>
                  <span className="font-semibold text-white tabular-nums">
                    {deliveryFee > 0 ? formatPrice(deliveryFee) : (language === 'ar' ? 'مجاناً' : 'Gratuit')}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-extrabold text-white">
                  <span>{t.totalOrder}</span>
                  <span className="text-xl text-amber-400 tabular-nums">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Primary Action Button: Commander sur WhatsApp */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-extrabold shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.orderViaWhatsAppBtn}</span>
              </button>

              {/* Mandatory Explanation / WhatsApp disclosure notice */}
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/10 space-y-1.5 text-neutral-400 text-xs">
                <p className="font-bold text-neutral-200">
                  ℹ️ {t.whatsAppNoticeTitle}
                </p>
                <p className="leading-relaxed">
                  {t.whatsAppNoticeBody}
                </p>
                <p className="text-[11px] text-amber-400 font-medium">
                  {language === 'ar'
                    ? 'رقم هاتف المطعم : 24210021 216+'
                    : 'Numéro direct du restaurant : +216 24 210 021'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
