import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Order, OrderStatus, DeliveryMethod } from '../types.ts';
import {
  Plus,
  Trash2,
  AlertCircle,
  Phone,
  Clock,
  Bike,
  ShoppingBag,
  Utensils,
  X,
  Filter
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const {
    language,
    t,
    orders,
    products,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    formatPrice,
    settings
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual Order Form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('takeaway');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [manualQty, setManualQty] = useState<number>(1);

  const statusOptions: { key: OrderStatus; label: string; color: string }[] = [
    { key: 'nouvelle', label: t.statusNouvelle, color: 'text-blue-400 bg-blue-950/60 border-blue-800' },
    { key: 'preparation', label: t.statusPreparation, color: 'text-amber-400 bg-amber-950/60 border-amber-800' },
    { key: 'livraison', label: t.statusLivraison, color: 'text-purple-400 bg-purple-950/60 border-purple-800' },
    { key: 'livree', label: t.statusLivree, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' },
    { key: 'annulee', label: t.statusAnnulee, color: 'text-neutral-400 bg-neutral-900 border-neutral-700' }
  ];

  const filteredOrders = orders.filter(
    o => statusFilter === 'all' || o.status === statusFilter
  );

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const prod = products.find(p => p.id === selectedProductId) || products[0];
    const unitPrice = prod ? prod.price : 15.0;
    const subtotal = unitPrice * manualQty;
    const deliveryFee = deliveryMethod === 'delivery' ? settings.deliveryFee : 0;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `ord-man-${Date.now()}`,
      orderNumber: `TP-MAN-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryMethod,
      address: deliveryMethod === 'delivery' ? address.trim() : undefined,
      notes: notes.trim() || undefined,
      items: [
        {
          productId: prod.id,
          name: prod.nameFr,
          extras: [],
          quantity: manualQty,
          unitPrice,
          totalPrice: subtotal
        }
      ],
      subtotal,
      deliveryFee,
      total,
      status: 'nouvelle',
      source: 'manuel'
    };

    addOrder(newOrder);
    setIsManualModalOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Notice about local storage */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 text-xs text-neutral-300 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">
            {language === 'ar' ? 'ملاحظة تشغيلية مهمة :' : 'Fonctionnement des commandes locales :'}
          </p>
          <p className="leading-relaxed text-neutral-400">
            {language === 'ar'
              ? 'نظراً لعدم وجود خادم وسيط أو قاعدة بيانات خارجية، فإن الطلبات المرسلة عبر واتساب لا يمكن اعتراضها وتظهر هنا فقط الطلبات المسجلة من خلال هذا المتصفح أو المدخلة يدوياً.'
              : 'En l’absence de serveur central, les messages envoyés sur WhatsApp arrivent directement sur le téléphone du restaurant. Ce tableau liste les commandes enregistrées dans ce navigateur et vous permet d’en ajouter manuellement.'}
          </p>
        </div>
      </div>

      {/* Header and Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{t.adminTabOrders}</h2>
          <p className="text-xs text-neutral-400">
            {filteredOrders.length} {language === 'ar' ? 'طلب مسجل' : 'commandes répertoriées'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status filter dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-300">
            <Filter className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-neutral-900">
                {language === 'ar' ? 'كافة الحالات' : 'Tous les statuts'}
              </option>
              {statusOptions.map(opt => (
                <option key={opt.key} value={opt.key} className="bg-neutral-900">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Add Manual Order Button */}
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{t.newOrderManual}</span>
          </button>
        </div>
      </div>

      {/* Orders List / Cards */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const currentStatus =
              statusOptions.find(s => s.key === order.status) || statusOptions[0];

            return (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-[#17181c] border border-white/10 space-y-4 hover:border-white/20 transition-colors"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-extrabold text-white">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 font-mono">
                      Source : {order.source}
                    </span>
                  </div>

                  {/* Status Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 hidden sm:inline">
                      {t.status} :
                    </span>
                    <select
                      value={order.status}
                      onChange={e =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${currentStatus.color}`}
                    >
                      {statusOptions.map(opt => (
                        <option
                          key={opt.key}
                          value={opt.key}
                          className="bg-neutral-900 text-white"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Supprimer la commande"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body: Client & Items */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  {/* Customer info */}
                  <div className="md:col-span-4 space-y-1 text-neutral-300">
                    <p className="font-bold text-white text-sm">
                      {order.customerName}
                    </p>
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="text-amber-400 font-semibold tabular-nums hover:underline block"
                    >
                      {order.customerPhone}
                    </a>
                    <p className="text-neutral-400">
                      Mode :{' '}
                      <span className="text-white font-medium">
                        {order.deliveryMethod === 'delivery'
                          ? '🛵 Livraison'
                          : order.deliveryMethod === 'takeaway'
                          ? '🥡 À emporter'
                          : '🍽️ Sur place'}
                      </span>
                    </p>
                    {order.address && (
                      <p className="text-neutral-400">
                        Adresse : <span className="text-white">{order.address}</span>
                      </p>
                    )}
                    {order.notes && (
                      <p className="text-amber-300 italic">
                        Note : « {order.notes} »
                      </p>
                    )}
                  </div>

                  {/* Items list */}
                  <div className="md:col-span-5 space-y-1.5 text-neutral-300">
                    <p className="font-bold text-neutral-400 uppercase tracking-wider text-[11px]">
                      Articles ({order.items.length})
                    </p>
                    <div className="space-y-1">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {it.quantity}x {it.name}
                            {it.sizeLabel && ` (${it.sizeLabel})`}
                          </span>
                          <span className="font-semibold text-white tabular-nums">
                            {formatPrice(it.totalPrice)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="md:col-span-3 space-y-1 text-right rtl:text-left md:border-l md:rtl:border-r md:rtl:border-l-0 border-white/5 md:pl-4 md:rtl:pr-4">
                    <p className="text-neutral-400">
                      Sous-total : {formatPrice(order.subtotal)}
                    </p>
                    {order.deliveryFee > 0 && (
                      <p className="text-neutral-400">
                        Livraison : +{formatPrice(order.deliveryFee)}
                      </p>
                    )}
                    <p className="text-base font-extrabold text-amber-400 tabular-nums pt-1 border-t border-white/5">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#17181c] border border-white/10 text-neutral-500 text-xs">
          {language === 'ar'
            ? 'لا توجد طلبات مسجلة بهذه الحالة.'
            : 'Aucune commande ne correspond à ce filtre.'}
        </div>
      )}

      {/* Manual Order Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#17181c] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <button
              onClick={() => setIsManualModalOpen(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">{t.newOrderManual}</h3>

            <form onSubmit={handleCreateManualOrder} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-neutral-300 block">
                  {t.customerNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Ex: Tarek Ben Amor"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-300 block">
                  {t.customerPhoneLabel} *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="Ex: 98 111 222"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-300 block">
                    Article du menu
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={e => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-red-500"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nameFr} ({p.price.toFixed(3)} TND)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-300 block">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={manualQty}
                    onChange={e => setManualQty(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-300 block">
                  Mode de retrait
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('takeaway')}
                    className={`py-2 rounded-lg border text-center font-semibold ${
                      deliveryMethod === 'takeaway'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-neutral-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    À emporter
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`py-2 rounded-lg border text-center font-semibold ${
                      deliveryMethod === 'delivery'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-neutral-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    Livraison
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('dine_in')}
                    className={`py-2 rounded-lg border text-center font-semibold ${
                      deliveryMethod === 'dine_in'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-neutral-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    Sur place
                  </button>
                </div>
              </div>

              {deliveryMethod === 'delivery' && (
                <div className="space-y-1">
                  <label className="font-bold text-neutral-300 block">
                    Adresse à Tozeur
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Quartier, rue..."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-neutral-300 block">
                  Remarques
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Ex: Piment doux, bien dorée..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  Enregistrer la commande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
