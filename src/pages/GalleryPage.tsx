import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  HERO_PIZZA,
  SPECIAL_PIZZA,
  CHEESE_PIZZA,
  CALZONE_PIZZA,
  AMBIANCE_IMG,
  DRINKS_IMG,
  DESSERT_IMG
} from '../data/initialData.ts';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  titleFr: string;
  titleAr: string;
  descFr: string;
  descAr: string;
}

export const GalleryPage: React.FC = () => {
  const { language, t } = useApp();
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      image: HERO_PIZZA,
      titleFr: 'Pizza Margherita au Four Traditionnel',
      titleAr: 'مارغريتا خارجة من الفرن التقليدي',
      descFr: 'Sauce tomate San Marzano maison, mozzarella fondante et basilic frais.',
      descAr: 'صلصة طماطم منزلية، موزاريلا ذائبة وريحان طازج.'
    },
    {
      id: 'g2',
      image: SPECIAL_PIZZA,
      titleFr: 'Pizza Royale Spéciale Taxi',
      titleAr: 'بيتزا تاكسي الملكية الخاصة',
      descFr: 'Garniture généreuse de viande hachée, merguez et légumes rôtis.',
      descAr: 'حشوة غنية باللحم المفروم والمرقاز والخضار المشوية.'
    },
    {
      id: 'g3',
      image: CHEESE_PIZZA,
      titleFr: 'Quattro Formaggi Gourmande',
      titleAr: 'بيتزا الأربعة أجبان الذهبية',
      descFr: 'Alliance fondante de mozzarella, gorgonzola crémeux et parmesan.',
      descAr: 'مزيج فاخر من الموزاريلا والغورغونزولا والبارميزان.'
    },
    {
      id: 'g4',
      image: CALZONE_PIZZA,
      titleFr: 'Calzone Rustico Cuit Minute',
      titleAr: 'كالزوني روستيكو طازج محشو بالجبن',
      descFr: 'Chausson doré garni de fromage filant, ricotta et jambon de dinde.',
      descAr: 'فطيرة ذهبية محشوة بجبن ذائب وريكوتا وكاشير.'
    },
    {
      id: 'g5',
      image: AMBIANCE_IMG,
      titleFr: 'La Salle et le Four de Taxi Pizza',
      titleAr: 'صالة الاستقبال والفرن في بيتزا تاكسي',
      descFr: 'Une ambiance chaleureuse et conviviale sur l’Avenue Maghreb Arabe à Tozeur.',
      descAr: 'أجواء دافئة وعائلية في شارع المغرب العربي بتوزر.'
    },
    {
      id: 'g6',
      image: DESSERT_IMG,
      titleFr: 'Tiramisu Artisanal & Douceurs',
      titleAr: 'تيراميسو وتحليات منزلية طازجة',
      descFr: 'Crème mascarpone fondante, café serré et cacao pur préparés chaque jour.',
      descAr: 'كريمة ماسكاربوني، قهوة فاخرة وكاكاو طبيعي محضر طازجاً كل يوم.'
    },
    {
      id: 'g7',
      image: DRINKS_IMG,
      titleFr: 'Boissons Rafraîchissantes & Cidre Boga',
      titleAr: 'مشروبات منعشة وبوغة تونسية',
      descFr: 'Servies bien fraîches avec glaçons et tranche de citron.',
      descAr: 'تقدم باردة جداً مع مكعبات الثلج وشرائح الليمون.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
          {language === 'ar' ? 'ألبوم الذكريات والنكهات' : 'Taxi Pizza en Images'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {t.galleryTitle}
        </h1>
        <p className="text-sm text-neutral-400">
          {t.gallerySubtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map(item => {
          const title = language === 'ar' ? item.titleAr : item.titleFr;
          const desc = language === 'ar' ? item.descAr : item.descFr;

          return (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer hover:border-amber-400/50 transition-all shadow-md"
            >
              <img
                src={item.image}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 p-2 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="text-xs text-neutral-300 line-clamp-1">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#17181c] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={activePhoto.image}
                alt={language === 'ar' ? activePhoto.titleAr : activePhoto.titleFr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#17181c] border-t border-white/10 space-y-1 text-left rtl:text-right">
              <h3 className="text-lg font-bold text-white">
                {language === 'ar' ? activePhoto.titleAr : activePhoto.titleFr}
              </h3>
              <p className="text-xs text-neutral-400">
                {language === 'ar' ? activePhoto.descAr : activePhoto.descFr}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
