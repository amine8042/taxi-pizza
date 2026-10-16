import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import { ProductCategory } from '../types.ts';
import { Search, UtensilsCrossed } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { language, t, products } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { key: string; label: string; icon: string }[] = [
    { key: 'all', label: t.catAll, icon: '🍕' },
    { key: 'classique', label: t.catClassique, icon: '🍅' },
    { key: 'speciale', label: t.catSpeciale, icon: '👑' },
    { key: 'quatre_fromages', label: t.catQuatreFromages, icon: '🧀' },
    { key: 'mexicaine', label: t.catMexicaine, icon: '🌶️' },
    { key: 'vegetarienne', label: t.catVegetarienne, icon: '🥗' },
    { key: 'calzone', label: t.catCalzone, icon: '🥟' },
    { key: 'boisson', label: t.catBoisson, icon: '🥤' },
    { key: 'dessert', label: t.catDessert, icon: '🍰' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchFr =
          p.nameFr.toLowerCase().includes(query) ||
          p.descriptionFr.toLowerCase().includes(query);
        const matchAr =
          p.nameAr.toLowerCase().includes(query) ||
          p.descriptionAr.toLowerCase().includes(query);
        return matchFr || matchAr;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left rtl:sm:text-right">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
          {language === 'ar' ? 'قائمة الطعام الكاملة' : 'Notre Carte Artisanale'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {language === 'ar' ? 'تشكيلة بيتزا تاكسي في توزر' : 'Pizzas, Calzones & Spécialités'}
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          {language === 'ar'
            ? 'تصفح جميع فئات البيتزا المحضرة بالحب والمكونات الطازجة. اختر حجمك المفضل وأضف إضافاتك الشهية.'
            : 'Explorez toutes nos créations cuites à point. Pâte artisanale, sauce maison et ingrédients de première fraîcheur.'}
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث بالاسم أو المكونات (مثال: جبن، تونة، مكسيكية)...'
                : 'Rechercher une pizza ou un ingrédient...'
            }
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Clean Segmented Category Filters (Zero-Pill Discipline: clean functional buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-[#17181c] text-neutral-300 border border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product count indicator */}
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/5 pb-3">
        <span>
          {filteredProducts.length}{' '}
          {language === 'ar' ? 'صنف متوفر' : 'produits disponibles'}
        </span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-amber-400 hover:underline"
          >
            {language === 'ar' ? 'عرض الكل' : 'Réinitialiser le filtre'}
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {language === 'ar' ? 'لم نجد أي صنف مطابق' : 'Aucun produit trouvé'}
          </h3>
          <p className="text-xs text-neutral-400">
            {language === 'ar'
              ? 'يرجى تجربة كلمات بحث أخرى أو تغيير الفئة المحددة.'
              : 'Essayez d’ajuster votre recherche ou sélectionnez une autre catégorie.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            {language === 'ar' ? 'عرض كافة الأصناف' : 'Afficher toute la carte'}
          </button>
        </div>
      )}
    </div>
  );
};
