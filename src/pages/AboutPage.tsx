import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { AMBIANCE_IMG, HERO_PIZZA } from '../data/initialData.ts';
import { Flame, Heart, Star, Sparkles, MapPin, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t, settings, navigateTo } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
          {language === 'ar' ? 'أصالة وضيافة' : 'Notre Histoire & Passion'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {t.aboutTitle}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          {t.aboutSubtitle}
        </p>
      </div>

      {/* Main Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5 text-neutral-300 text-sm leading-relaxed text-left rtl:text-right">
          <p className="text-base font-semibold text-white">
            {t.aboutP1}
          </p>
          <p>
            {t.aboutP2}
          </p>
          <p>
            {t.aboutP3}
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#17181c] border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Flame className="w-4 h-4 text-red-500" />
                <span>{language === 'ar' ? 'حرارة عالية' : 'Four Haute Chaleur'}</span>
              </div>
              <p className="text-xs text-neutral-400">
                {language === 'ar' ? 'خبز ذهبي ومقرمش في دقائق' : 'Pâte alvéolée et croustillante'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#17181c] border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{language === 'ar' ? 'ضيافة توزرية' : 'Hospitalité du Sud'}</span>
              </div>
              <p className="text-xs text-neutral-400">
                {language === 'ar' ? 'ترحيب دافئ وخدمة سريعة' : 'Accueil chaleureux 7 jours sur 7'}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={AMBIANCE_IMG}
              alt="Intérieur chaleureux de Taxi Pizza Tozeur"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/images/ambiance.jpg';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin className="w-4 h-4 text-red-500" />
                Avenue Al Maghreb Al Arabi, Tozeur
              </span>
              <span className="text-amber-400 font-bold">4.5 / 5 ★ (245 avis)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values & Quality Commitments */}
      <div className="rounded-3xl bg-[#17181c] border border-white/10 p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            {language === 'ar' ? 'التزاماتنا اليومية' : 'Nos Piliers de Qualité'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ar' ? 'لماذا يختارنا أهالي وزوار توزر ؟' : 'La recette de notre succès'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'ar' ? 'عجينة خفيفة سهلة الهضم' : 'Maturation naturelle 48 heures'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'فترة التخمير الطويلة تعطي العجينة ملمساً هشاً وخفة لا مثيل لها.'
                : 'Une pâte aérée, légère pour l’estomac et croustillante sur les bords.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'ar' ? 'صلصة طماطم وأجبان مختارة' : 'Ingrédients de Premier Choix'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'موزاريلا طبيعية 100%، بهارات توزرية أصيلة وتونة ممتازة دون أي مواد حافظة.'
                : 'Tomates mûries au soleil, mozzarella fondante et spécialités tunisiennes savoureuses.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-white">
              {language === 'ar' ? 'سرعة التوصيل والأمانة' : 'Ponctualité & Service Express'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'تجهيز فوري وسرعة في التوصيل لضمان وصول وجبتك ساخنة ومثالية.'
                : 'Vos pizzas préparées minute et livrées encore fumantes à votre porte.'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {language === 'ar' ? 'هل تشعر بالجوع الآن ؟' : 'Envie de goûter à notre savoir-faire ?'}
        </h3>
        <button
          onClick={() => navigateTo('/menu')}
          className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95"
        >
          {t.heroViewMenu}
        </button>
      </div>
    </div>
  );
};
