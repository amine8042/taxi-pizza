import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { MapPin, Phone, Clock, Star, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, settings, navigateTo } = useApp();

  return (
    <footer className="bg-[#0b0b0d] text-neutral-400 border-t border-white/10 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow">
                🍕
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  TAXI PIZZA
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {settings.nameAr} · Tozeur
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              {language === 'ar'
                ? 'بيتزا نابوليتانية أصيلة ومأكولات خفيفة في قلب توزر. نلتزم بأعلى معايير الجودة والمذاق التونسي الأصيل.'
                : 'Pizzeria artisanale réputée à Tozeur. Cuisson haute température, ingrédients frais sélectionnés et service chaleureux.'}
            </p>
            {/* Reviews badge */}
            <div className="flex items-center gap-2 text-sm text-neutral-300 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i === 4 ? 'fill-amber-400/50 text-amber-400' : 'fill-amber-400 text-amber-400'}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-white tabular-nums">{settings.rating} / 5</span>
              <span className="text-xs text-neutral-500">({settings.reviewsCount} {language === 'ar' ? 'تقييماً' : 'avis'})</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'روابط سريعة' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-white transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/menu')}
                  className="hover:text-white transition-colors"
                >
                  {t.navMenu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-white transition-colors"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/gallery')}
                  className="hover:text-white transition-colors"
                >
                  {t.navGallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-white transition-colors"
                >
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Horaires */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'الخدمات وأوقات العمل' : 'Services & Horaires'}
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-200">
                    {language === 'ar' ? 'كامل أيام الأسبوع' : 'Tous les jours (7j/7)'}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {language === 'ar' ? settings.openingHoursAr : settings.openingHours}
                  </p>
                </div>
              </div>
              <div className="pt-2 text-xs text-neutral-400 space-y-1">
                <p>• {t.serviceDineIn}</p>
                <p>• {t.serviceTakeaway}</p>
                <p>• {t.serviceDelivery}</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Accès */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'العنوان والاتصال' : 'Adresse & Contact'}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300">
                  {language === 'ar' ? settings.addressAr : settings.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-amber-400 font-semibold tabular-nums"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-700/30 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-700/50 text-xs font-semibold transition-colors"
                >
                  💬 {language === 'ar' ? 'محادثة عبر واتساب' : 'WhatsApp Direct'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & discrete admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Taxi Pizza – بيتزا تاكسي. {t.footerRights}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('/admin/login')}
              className="hover:text-neutral-300 transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
              title="Accès gérant"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t.footerAdminLink}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
