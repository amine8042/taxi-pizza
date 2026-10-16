import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ExternalLink,
  Star,
  Send,
  CheckCircle2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t, settings } = useApp();

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;

    // Send formatted message via WhatsApp
    const msg = [
      '💬 *MESSAGE DE CONTACT VIA LE SITE WEB*',
      `👤 Nom : ${contactName.trim()}`,
      `📞 Téléphone : ${contactPhone.trim() || 'Non renseigné'}`,
      `📌 Objet : ${contactSubject.trim() || 'Question générale'}`,
      `✉️ Message : ${contactMessage.trim()}`
    ].join('\n');

    const cleanNum = settings.whatsappNumber.replace(/\D/g, '');
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setContactName('');
    setContactPhone('');
    setContactSubject('');
    setContactMessage('');
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Taxi Pizza, Avenue Al Maghreb Al Arabi, Tozeur, Tunisia'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
          {language === 'ar' ? 'نحن في خدمتكم' : 'Rendez-nous visite'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {t.contactTitle}
        </h1>
        <p className="text-sm text-neutral-400">
          {t.contactSubtitle}
        </p>
      </div>

      {/* Main Grid: Details + Map + Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info & Map Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card Address */}
            <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.contactAddress}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {language === 'ar' ? settings.addressAr : settings.address}
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-red-400 hover:text-red-300 inline-flex items-center gap-1 pt-1"
              >
                <span>{t.contactDirectionsBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card Phone & WhatsApp */}
            <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.contactPhone}
              </h3>
              <div className="space-y-1">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="text-base font-bold text-white hover:text-amber-400 block tabular-nums"
                >
                  {settings.phone}
                </a>
                <p className="text-xs text-neutral-400">
                  {language === 'ar' ? 'اتصال مباشر وواتساب' : 'Appels & commandes WhatsApp'}
                </p>
              </div>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 pt-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ouvrir WhatsApp</span>
              </a>
            </div>

            {/* Card Hours */}
            <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.contactHours}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-semibold">
                {language === 'ar' ? settings.openingHoursAr : settings.openingHours}
              </p>
              <p className="text-[11px] text-neutral-500">
                {language === 'ar' ? 'خدمة متواصلة للغداء والعشاء والسهر' : 'Service continu midi & soir sans interruption'}
              </p>
            </div>

            {/* Card Rating */}
            <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'التقييم العام' : 'Avis & Confiance'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-amber-400 tabular-nums">
                  {settings.rating} / 5
                </span>
                <span className="text-xs text-neutral-400">
                  ({settings.reviewsCount} {language === 'ar' ? 'تقييماً' : 'avis'})
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                {language === 'ar' ? 'استناداً إلى المعلومات المتوفرة' : 'Basé sur les retours clients certifiés'}
              </p>
            </div>
          </div>

          {/* Map Preview Card */}
          <div className="p-5 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">
                {language === 'ar' ? 'خريطة الموقع في توزر' : 'Plan d’accès Google Maps'}
              </h4>
              <span className="text-xs text-neutral-400 font-mono">
                Code Plus : W4C9+4W3 Tozeur
              </span>
            </div>
            
            {/* Embed / Visual Map Representation */}
            <div className="relative aspect-[16/8] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 flex items-center justify-center group">
              <iframe
                title="Taxi Pizza Tozeur Map"
                src="https://maps.google.com/maps?q=Tozeur,%20Avenue%20Al%20Maghreb%20Al%20Arabi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/10"
                >
                  <span>{language === 'ar' ? 'فتح في خرائط جوجل' : 'Ouvrir dans Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Form Column (5 Cols) */}
        <div className="lg:col-span-5 bg-[#17181c] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              {language === 'ar' ? 'رسالة سريعة' : 'Écrivez-nous'}
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {language === 'ar' ? 'هل لديك استفسار أو حجز ؟' : 'Une question ou réservation ?'}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {language === 'ar'
                ? 'أرسل استفسارك مباشرة إلى واتساب المطعم وسنجيبك في أسرع وقت.'
                : 'Envoyez-nous un message qui s’ouvrira instantanément sur WhatsApp.'}
            </p>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                {language === 'ar'
                  ? 'تم تجهيز رسالتك لفتحها في واتساب المطعم بنجاح.'
                  : 'Votre message a été transféré vers WhatsApp !'}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                {t.customerNameLabel} *
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="Ex: Anis Cherif"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                {t.customerPhoneLabel}
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                placeholder="Ex: 24 210 021"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                {language === 'ar' ? 'موضوع الرسالة' : 'Objet'}
              </label>
              <input
                type="text"
                value={contactSubject}
                onChange={e => setContactSubject(e.target.value)}
                placeholder={language === 'ar' ? 'حجز طاولة، استفسار عن التوصيل...' : 'Réservation de table, événement...'}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                {language === 'ar' ? 'نص الرسالة' : 'Message'} *
              </label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={e => setContactMessage(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'اكتب رسالتك أو استفسارك هنا...'
                    : 'Précisez votre demande...'
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'ar' ? 'إرسال الرسالة عبر واتساب' : 'Envoyer via WhatsApp'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
