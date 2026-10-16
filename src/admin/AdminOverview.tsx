import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Coins,
  ArrowRight,
  PlusCircle,
  Database
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { language, t, orders, products, formatPrice, navigateTo } = useApp();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    o => o.status === 'nouvelle' || o.status === 'preparation' || o.status === 'livraison'
  ).length;
  const completedOrders = orders.filter(o => o.status === 'livree').length;
  const sampleRevenue = orders
    .filter(o => o.status !== 'annulee')
    .reduce((sum, o) => sum + o.total, 0);

  const recentOrders = orders.slice(0, 5);

  const statusLabels: Record<string, { label: string; color: string }> = {
    nouvelle: { label: t.statusNouvelle, color: 'text-blue-400 bg-blue-950/60 border-blue-800' },
    preparation: { label: t.statusPreparation, color: 'text-amber-400 bg-amber-950/60 border-amber-800' },
    livraison: { label: t.statusLivraison, color: 'text-purple-400 bg-purple-950/60 border-purple-800' },
    livree: { label: t.statusLivree, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' },
    annulee: { label: t.statusAnnulee, color: 'text-neutral-400 bg-neutral-900 border-neutral-700' }
  };

  return (
    <div className="space-y-8">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-[#17181c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">
              {t.statTotalOrders}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white tabular-nums">
            {totalOrders}
          </p>
          <p className="text-[11px] text-neutral-500">
            {language === 'ar' ? 'سجل المتصفح الحالي' : 'Enregistrées en local'}
          </p>
        </div>

        {/* Pending Orders */}
        <div className="p-5 rounded-2xl bg-[#17181c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">
              {t.statPendingOrders}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-400 tabular-nums">
            {pendingOrders}
          </p>
          <p className="text-[11px] text-neutral-500">
            {language === 'ar' ? 'تحتاج إلى متابعة' : 'En cuisine ou livraison'}
          </p>
        </div>

        {/* Completed Orders */}
        <div className="p-5 rounded-2xl bg-[#17181c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">
              {t.statCompletedOrders}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400 tabular-nums">
            {completedOrders}
          </p>
          <p className="text-[11px] text-neutral-500">
            {language === 'ar' ? 'تم استلامها بنجاح' : 'Livrées & servies'}
          </p>
        </div>

        {/* Sample Revenue */}
        <div className="p-5 rounded-2xl bg-[#17181c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">
              {t.statSampleRevenue}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white tabular-nums">
            {formatPrice(sampleRevenue)}
          </p>
          <p className="text-[11px] text-amber-400/90 font-medium">
            {language === 'ar' ? 'إجمالي تقديري محلي' : 'Statistique locale de démo'}
          </p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-5 rounded-2xl bg-[#17181c] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">
            {language === 'ar' ? 'إجراءات سريعة' : 'Actions rapides du restaurant'}
          </h3>
          <p className="text-xs text-neutral-400">
            {language === 'ar'
              ? 'تعديل أصناف القائمة أو تسجيل طلب هاتف يدوي أو تصدير نسخة احتياطية'
              : 'Gérez le menu, notez une commande téléphonique ou sauvegardez les données'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigateTo('/admin/menu')}
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t.addProduct}</span>
          </button>

          <button
            onClick={() => navigateTo('/admin/orders')}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.newOrderManual}</span>
          </button>

          <button
            onClick={() => navigateTo('/admin/backup')}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.adminTabBackup}</span>
          </button>
        </div>
      </div>

      {/* Recent Local Orders */}
      <div className="bg-[#17181c] border border-white/10 rounded-2xl overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              {language === 'ar' ? 'أحدث الطلبات المسجلة محلياً' : 'Dernières commandes enregistrées'}
            </h3>
            <p className="text-xs text-neutral-400">
              {language === 'ar'
                ? 'الطلبات المسجلة في هذا المتصفح'
                : 'Commandes passées via ce navigateur ou enregistrées manuellement'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('/admin/orders')}
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <span>{language === 'ar' ? 'عرض كافة الطلبات' : 'Voir tout'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead>
                <tr className="border-b border-white/5 text-neutral-400 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">{t.orderId}</th>
                  <th className="py-2.5 px-3">{t.customer}</th>
                  <th className="py-2.5 px-3">{t.items}</th>
                  <th className="py-2.5 px-3">{t.total}</th>
                  <th className="py-2.5 px-3">{t.status}</th>
                  <th className="py-2.5 px-3">{t.source}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {recentOrders.map(order => {
                  const statusConf = statusLabels[order.status] || {
                    label: order.status,
                    color: 'text-neutral-400'
                  };

                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-3 font-mono text-white font-bold">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-white">{order.customerName}</p>
                        <p className="text-[11px] text-neutral-500">{order.customerPhone}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="line-clamp-1">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-amber-400 tabular-nums">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${statusConf.color}`}
                        >
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="py-3 px-3 capitalize text-neutral-400">
                        {order.source}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 py-6 text-center">
            {language === 'ar' ? 'لا توجد طلبات مسجلة بعد.' : 'Aucune commande enregistrée pour l’instant.'}
          </p>
        )}
      </div>
    </div>
  );
};
