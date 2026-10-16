import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import {
  Clock,
  MapPin,
  Phone,
  Star,
  ArrowRight,
  Flame,
  Utensils,
  ShoppingBag,
  Bike,
  CheckCircle2
} from 'lucide-react';
import { HERO_PIZZA, AMBIANCE_IMG } from '../data/initialData.ts';

export const HomePage: React.FC = () => {
  const { language, t, products, settings, navigateTo } = useApp();

  const featuredProducts = products.filter(p => p.isFeatured && p.available).slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6 text-left rtl:text-right">
              {/* Unboxed editorial kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
                <Flame className="w-4 h-4 text-red-500" />
                <span>{t.heroBadge}</span>
                <span aria-hidden="true">·</span>
                <span>Tozeur, Tunisie</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                {language === 'ar' ? (
                  <>
                    فن البيتزا الأصيل في <span className="text-red-500">توزر</span>
                  </>
                ) : (
                  <>
                    L’art authentique de la pizza au{' '}
                    <span className="text-red-500">cœur du Sud</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
                {t.heroSubtitle}
              </p>

              {/* Service tags as quiet inline text */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.serviceDineIn}</span>
                </div>
                <span className="text-neutral-600" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.serviceTakeaway}</span>
                </div>
                <span className="text-neutral-600" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.serviceDelivery}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => navigateTo('/menu')}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>{t.heroViewMenu}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    language === 'ar'
                      ? 'مرحباً بيتزا تاكسي، أود الاطلاع على قائمة اليوم وتقديم طلب.'
                      : 'Bonjour Taxi Pizza Tozeur, je souhaite passer une commande.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2 active:scale-95"
                >
                  <span className="text-emerald-400 font-bold">WhatsApp</span>
                  <span>{t.heroOrderNow}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={HERO_PIZZA}
                  alt="Taxi Pizza Tozeur - Pizza artisanale au four"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{settings.rating} / 5</span>
                    <span aria-hidden="true">·</span>
                    <span>{settings.reviewsCount} {language === 'ar' ? 'تقييماً' : 'avis clients'}</span>
                  </div>
                  <h3 className="text-lg font-bold">Pizza Margherita Di Bufala</h3>
                  <p className="text-xs text-neutral-300">
                    {language === 'ar' ? 'عجينة نابوليتانية وموزاريلا طازجة' : 'Pâte maturée 48h & mozzarella fondante'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Item Quick Information Strip */}
      <section className="border-y border-white/10 bg-[#141518]/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">{t.infoHoursTitle}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{language === 'ar' ? settings.openingHoursAr : settings.openingHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">{t.infoLocationTitle}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{language === 'ar' ? settings.addressAr : settings.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">{t.infoPhoneTitle}</p>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="text-xs text-neutral-400 hover:text-white font-semibold tabular-nums mt-0.5 block"
                >
                  {settings.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
              <div>
                <p className="text-sm font-bold text-white">{t.infoRatingTitle}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{settings.rating} / 5 ({settings.reviewsCount} {language === 'ar' ? 'تقييماً' : 'avis'})</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section: Dine-in, Takeaway, Delivery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest">
            {language === 'ar' ? 'خدماتنا في توزر' : 'Nos 3 Services'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ar' ? 'كيف تفضل الاستمتاع ببيتزا تاكسي ؟' : 'Dégustez vos pizzas comme vous aimez'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t.serviceDineIn}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'استمتع بأجواء مريحة وعائلية في صالتنا المكيفة في قلب توزر مع خدمة ودية وسريعة.'
                : 'Installez-vous dans notre salle climatisée et conviviale au centre de Tozeur. Pizzas croustillantes servies minute.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t.serviceTakeaway}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'اتصل أو اطلب عبر الموقع لتجد طلبك ساخناً وجاهزاً في الوقت المحدد دون أي انتظار.'
                : 'Commandez d’avance et récupérez vos pizzas fumantes en quelques minutes sans attendre.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              <Bike className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t.serviceDelivery}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? `توصيل سريع إلى باب منزلك في كافة أحياء توزر بمعلوم رمزي (${settings.deliveryFee.toFixed(3)} د.ت).`
                : `Livraison directe et soignée dans tous les quartiers de Tozeur avec nos livreurs dédiés (${settings.deliveryFee.toFixed(3)} TND).`}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              {language === 'ar' ? 'تشكيلة الشيف' : 'Les Incontournables'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {language === 'ar' ? 'الأكثر طلباً ومحبة في توزر' : 'Nos Pizzas Vedettes'}
            </h2>
          </div>
          <button
            onClick={() => navigateTo('/menu')}
            className="text-sm font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
          >
            <span>{t.navMenu}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Story & Craftsmanship Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#17181c] border border-white/10 p-8 sm:p-12 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4 text-left rtl:text-right">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              {language === 'ar' ? 'أسرار صنعتنا' : 'Notre Savoir-Faire'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {language === 'ar'
                ? 'عجينة مخمرة بطيئاً ومكونات طازجة يومياً'
                : 'Pâte à lente fermentation & cuisson dorée'}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {language === 'ar'
                ? 'في بيتزا تاكسي، لا نساوم أبداً على الجودة. نختار طحين القمح الفاخر، وزيت الزيتون البكر، والتوابل التونسية الأصلية لإعداد بيتزا تجمع بين الأصالة الإيطالية وطيب المذاق المحلي.'
                : 'Chez Taxi Pizza, chaque pizza est confectionnée avec passion. De la pâte levée 48 heures au coulis de tomates mijoté doucement, chaque bouchée offre le croustillant et le fondant d’une véritable pizza cuite à cœur.'}
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-neutral-300">
              <div>
                <p className="text-lg font-black text-amber-400">48h</p>
                <p className="text-neutral-400">{language === 'ar' ? 'تخمير طبيعي' : 'Fermentation lente'}</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-lg font-black text-amber-400">100%</p>
                <p className="text-neutral-400">{language === 'ar' ? 'مكونات طازجة' : 'Ingrédients frais'}</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-lg font-black text-amber-400">245+</p>
                <p className="text-neutral-400">{language === 'ar' ? 'زبون راضٍ' : 'Avis vérifiés'}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src={AMBIANCE_IMG}
                alt="Ambiance conviviale chez Taxi Pizza Tozeur"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 font-medium">
                📍 Avenue Al Maghreb Al Arabi, Tozeur
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials & Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ar' ? 'آراء زبائننا في توزر' : 'Ce que disent nos clients'}
          </h2>
          <p className="text-xs text-neutral-400">
            {language === 'ar'
              ? 'تقييم 4.5 / 5 بناءً على 245 تقييماً حقيقياً من زوار وسكان توزر'
              : 'Note globale 4.5 / 5 basée sur 245 retours clients à Tozeur'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed italic">
              « De passage à Tozeur pour visiter les oasis, nous avons mangé la Pizza Taxi Royale. Une pâte croustillante et généreuse en garniture. Service rapide et accueillant ! »
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="text-xs font-bold text-white">Karim B.</p>
              <p className="text-[11px] text-neutral-500">Client fidèle · Visite sur place</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed italic">
              « أحسن بيتزا في توزر بلا منازع. التوصيل سريع والبيتزا توصل ساخنة والجبنة ذائبة. ننصحكم بتجربة الكالزوني التونسي والـ 4 أجبان ! »
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="text-xs font-bold text-white">أنيس العبيدي</p>
              <p className="text-[11px] text-neutral-500">توزر المدينة · خدمة التوصيل</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#17181c] border border-white/10 space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed italic">
              « Commande passée par WhatsApp en 2 minutes, livrée chez nous à l’hôtel à Tozeur en 25 minutes. Très bon rapport qualité/prix et personnel sympathique. »
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="text-xs font-bold text-white">Élodie & Thomas</p>
              <p className="text-[11px] text-neutral-500">Touristes · Commande WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Order WhatsApp Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/70 via-red-900/50 to-neutral-900 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left rtl:md:text-right">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === 'ar' ? 'جاهز لطلب وجبتك اللذيذة ؟' : 'Envie d’une pizza chaude tout de suite ?'}
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl">
              {language === 'ar'
                ? 'استمتع بالطلب المباشر والسريع عبر واتساب. فريقنا في انتظارك لتحضير وجبتك بأعلى جودة.'
                : 'Passez votre commande via notre panier en ligne ou directement sur WhatsApp au +216 24 210 021.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('/menu')}
              className="px-6 py-3 bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl text-sm font-bold shadow transition-all active:scale-95"
            >
              {t.navMenu}
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Bonjour Taxi Pizza Tozeur, je souhaite passer une commande !'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow transition-all active:scale-95 flex items-center gap-2"
            >
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
