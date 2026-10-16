import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Save, Check, Phone, MapPin, Clock, DollarSign, Megaphone, Lock } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { language, t, settings, updateSettings } = useApp();

  const [phone, setPhone] = useState(settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [address, setAddress] = useState(settings.address);
  const [addressAr, setAddressAr] = useState(settings.addressAr);
  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [openingHoursAr, setOpeningHoursAr] = useState(settings.openingHoursAr);
  const [deliveryFee, setDeliveryFee] = useState<number>(settings.deliveryFee);
  const [homepagePromoFr, setHomepagePromoFr] = useState(settings.homepagePromoFr);
  const [homepagePromoAr, setHomepagePromoAr] = useState(settings.homepagePromoAr);
  const [adminUsername, setAdminUsername] = useState(settings.adminUsername);
  const [adminPassword, setAdminPassword] = useState(settings.adminPassword);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      phone: phone.trim(),
      whatsappNumber: whatsappNumber.replace(/\D/g, ''),
      address: address.trim(),
      addressAr: addressAr.trim(),
      openingHours: openingHours.trim(),
      openingHoursAr: openingHoursAr.trim(),
      deliveryFee: Number(deliveryFee) || 0,
      homepagePromoFr: homepagePromoFr.trim(),
      homepagePromoAr: homepagePromoAr.trim(),
      adminUsername: adminUsername.trim(),
      adminPassword: adminPassword.trim()
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white">{t.adminTabSettings}</h2>
        <p className="text-xs text-neutral-400">
          {language === 'ar'
            ? 'تعديل بيانات الاتصال والعنوان ورسوم التوصيل ونصوص الترويج وكلمة مرور المشرف.'
            : 'Modifiez les coordonnées, horaires, frais de livraison et identifiants du restaurant.'}
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>
            {language === 'ar'
              ? 'تم حفظ كافة التعديلات في التخزين المحلي بنجاح !'
              : 'Paramètres mis à jour et sauvegardés avec succès !'}
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact & Phone */}
        <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/5 pb-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Coordonnées Téléphoniques & WhatsApp</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Numéro affiché (Appels clients)
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+216 24 210 021"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Numéro WhatsApp (sans symbole +, ex: 21624210021)
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="21624210021"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Address & Hours */}
        <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/5 pb-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Adresse & Horaires d’ouverture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Adresse (Français)
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Adresse (Arabe)
              </label>
              <input
                type="text"
                required
                value={addressAr}
                onChange={e => setAddressAr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Horaires (Français)
              </label>
              <input
                type="text"
                required
                value={openingHours}
                onChange={e => setOpeningHours(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Horaires (Arabe)
              </label>
              <input
                type="text"
                required
                value={openingHoursAr}
                onChange={e => setOpeningHoursAr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Delivery Fee & Promo Bar */}
        <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/5 pb-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Tarifs de Livraison & Bannière d'Accueil</span>
          </div>

          <div className="space-y-4">
            <div className="max-w-xs space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Frais de livraison à domicile (TND)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                required
                value={deliveryFee}
                onChange={e => setDeliveryFee(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-bold text-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300 block">
                  Message promotionnel d'en-tête (Français)
                </label>
                <textarea
                  rows={2}
                  value={homepagePromoFr}
                  onChange={e => setHomepagePromoFr(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300 block">
                  Message promotionnel d'en-tête (Arabe)
                </label>
                <textarea
                  rows={2}
                  value={homepagePromoAr}
                  onChange={e => setHomepagePromoAr(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Demo Admin Authentication Credentials */}
        <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/5 pb-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Identifiants d’accès Gérant (Stockés dans ce navigateur)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={e => setAdminUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                Mot de passe
              </label>
              <input
                type="text"
                required
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{t.saveChanges}</span>
        </button>
      </form>
    </div>
  );
};
