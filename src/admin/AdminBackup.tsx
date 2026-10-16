import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  FileJson,
  ShieldCheck
} from 'lucide-react';

export const AdminBackup: React.FC = () => {
  const {
    language,
    t,
    exportAllData,
    importAllData,
    resetToDemoData,
    products,
    orders
  } = useApp();

  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    try {
      const jsonStr = exportAllData();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `taxipizza_backup_${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: 'success',
        text: language === 'ar' ? 'تم تحميل ملف النسخة الاحتياطية بنجاح !' : 'Fichier JSON téléchargé avec succès !'
      });
    } catch (e: any) {
      setStatusMessage({
        type: 'error',
        text: e.message || 'Erreur lors de l’exportation.'
      });
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importAllData(content);
        if (res.success) {
          setStatusMessage({
            type: 'success',
            text: language === 'ar' ? 'تمت استعادة البيانات بنجاح من الملف المحدد !' : 'Données restaurées avec succès !'
          });
        } else {
          setStatusMessage({
            type: 'error',
            text: res.error || 'Erreur d’importation'
          });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = () => {
    resetToDemoData();
    setResetConfirmOpen(false);
    setStatusMessage({
      type: 'success',
      text: language === 'ar' ? 'تمت إعادة تعيين البيانات إلى الحالة الأصلية بنجاح.' : 'Données réinitialisées aux valeurs démo d’origine.'
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white">{t.backupTitle}</h2>
        <p className="text-xs text-neutral-400 mt-1">
          {t.backupDesc}
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-300'
              : 'bg-red-950/60 border border-red-700 text-red-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Educational Notice on Local Storage Limitations */}
      <div className="p-5 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Architecture & Persistance des Données</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          {language === 'ar'
            ? 'هذا التطبيق يعمل بشكل مستقل تماماً على المتصفح (Client-Only) وبدون قاعدة بيانات خارجية مدفوعة أو سيرفر تخزين. التعديلات تحفظ في الذاكرة المحلية (localStorage) لهذا الجهاز فقط. لا توجد مزامنة تلقائية عبر الأجهزة؛ لذلك يرجى استخدام ميزة تصدير JSON لنقل البيانات.'
            : 'Cette application fonctionne sans base de données tierce ni abonnement serveur payant. Toutes vos modifications (menu, prix, commandes enregistrées, réglages) sont stockées dans le localStorage de votre navigateur actuel. Elles ne sont pas automatiquement synchronisées avec d’autres appareils sans un export / import de sauvegarde JSON.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export JSON Card */}
        <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'ar' ? 'تصدير نسخة احتياطية' : 'Exporter la sauvegarde'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? `تحميل ملف بصيغة JSON يحتوي على ${products.length} صنفاً من القائمة و${orders.length} طلبات مسجلة وإعدادات المطعم كاملة.`
                : `Génère un fichier JSON complet avec vos ${products.length} produits, ${orders.length} commandes et vos réglages.`}
            </p>
          </div>

          <button
            onClick={handleExport}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
          >
            <FileJson className="w-4 h-4" />
            <span>{t.exportJsonBtn}</span>
          </button>
        </div>

        {/* Import JSON Card */}
        <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'ar' ? 'استعادة من ملف احتياطي' : 'Restaurer depuis un JSON'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'استرجاع قائمة المنتجات والطلبات والإعدادات المحفوظة مسبقاً من ملف JSON صالح.'
                : 'Chargez un fichier de sauvegarde préalablement exporté pour restaurer votre configuration.'}
            </p>
          </div>

          <label className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{t.importJsonBtn}</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Reset to Demo Section */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-4">
        <div>
          <h3 className="text-base font-bold text-red-400">
            {language === 'ar' ? 'منطقة إعادة الضبط' : 'Réinitialisation d’usine'}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {language === 'ar'
              ? 'إعادة القائمة والأسعار والصور والإعدادات إلى القيم التجريبية الافتراضية الأصلية الخاصة بتاكسي بيتزا توزر.'
              : 'Efface toutes vos modifications locales et recharge les données d’origine du restaurant.'}
          </p>
        </div>

        <button
          onClick={() => setResetConfirmOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-600/40 text-xs font-bold transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{t.resetDemoBtn}</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#17181c] border border-red-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-red-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold text-white">Confirmation</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {t.resetConfirm}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Confirmer la réinitialisation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
