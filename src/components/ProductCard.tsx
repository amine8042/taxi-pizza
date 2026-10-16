import React, { useState } from 'react';
import { Product } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { Plus, Check, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t, formatPrice, openProductModal, addToCart } = useApp();
  const [imgError, setImgError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const title = language === 'ar' ? product.nameAr : product.nameFr;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionFr;

  const categoryLabels: Record<string, string> = {
    classique: t.catClassique,
    speciale: t.catSpeciale,
    quatre_fromages: t.catQuatreFromages,
    mexicaine: t.catMexicaine,
    vegetarienne: t.catVegetarienne,
    calzone: t.catCalzone,
    boisson: t.catBoisson,
    dessert: t.catDessert
  };

  const handleCardClick = () => {
    // If has sizes or extras, open modal. Otherwise can add directly or open modal
    openProductModal(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes && product.sizes.length > 0) {
      openProductModal(product);
      return;
    }
    addToCart(product, 1, undefined, []);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#17181c] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('hero_pizza.jpg')) {
                target.src = '/images/hero_pizza.jpg';
              } else {
                setImgError(true);
              }
            }}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 text-neutral-400 p-4 text-center">
            <span className="text-3xl mb-1">🍕</span>
            <span className="text-xs font-medium text-neutral-300">{title}</span>
          </div>
        )}

        {/* Featured Tag (subtle text overlay, not a bulky pill) */}
        {product.isFeatured && (
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-black/75 backdrop-blur-md text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 border border-amber-400/20 shadow">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{t.featured}</span>
          </div>
        )}

        {!product.available && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
            <span className="text-xs font-bold text-red-300 bg-red-950/80 px-3 py-1 rounded border border-red-800">
              {t.unavailable}
            </span>
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata unboxed text with separator */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5 uppercase tracking-wider font-medium">
            <span>{categoryLabels[product.category] || product.category}</span>
            {product.sizes && product.sizes.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span>3 tailles</span>
              </>
            )}
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
            {title}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price & Action row */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-neutral-400 block font-normal">
              {product.sizes && product.sizes.length > 0 ? t.fromPrice : ''}
            </span>
            <span className="text-base font-bold text-amber-400 tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.available}
            aria-label={`Ajouter ${title}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow ${
              !product.available
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Ajouté</span>
              </>
            ) : product.sizes && product.sizes.length > 0 ? (
              <>
                <span>Choisir</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
