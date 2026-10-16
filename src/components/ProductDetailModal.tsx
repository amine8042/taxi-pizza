import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ProductSize, ProductExtra } from '../types.ts';
import { X, Plus, Minus, Check, ShoppingBag } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductModal,
    closeProductModal,
    addToCart,
    language,
    t,
    formatPrice
  } = useApp();

  const product = selectedProductModal;

  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(undefined);
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Initialize defaults when modal opens
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize(undefined);
      }
      setSelectedExtras([]);
      setQuantity(1);
      setNotes('');
      setIsAdded(false);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProductModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeProductModal]);

  if (!product) return null;

  const title = language === 'ar' ? product.nameAr : product.nameFr;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionFr;

  // Compute live price
  const basePrice = product.price + (selectedSize ? selectedSize.priceDelta : 0);
  const extrasSum = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const unitPrice = basePrice + extrasSum;
  const totalPrice = unitPrice * quantity;

  const handleToggleExtra = (extra: ProductExtra) => {
    if (selectedExtras.some(e => e.id === extra.id)) {
      setSelectedExtras(prev => prev.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras(prev => [...prev, extra]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedExtras, notes);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeProductModal();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#17181c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Fermer la fenêtre"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Image */}
        <div className="relative h-60 w-full shrink-0 bg-neutral-900">
          <img
            src={product.image}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17181c] via-[#17181c]/30 to-transparent" />
          <div className="absolute bottom-4 left-6 rtl:left-auto rtl:right-6 right-6">
            <h2 className="text-2xl font-extrabold text-white">{title}</h2>
            <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Sizes Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.chooseSize}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {product.sizes.map(size => {
                  const isSelected = selectedSize?.name === size.name;
                  const sizeLabel =
                    language === 'ar' && size.labelAr ? size.labelAr : size.label;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-red-600/15 border-red-500 text-white shadow-sm'
                          : 'bg-neutral-900/60 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-sm">{sizeLabel}</span>
                        {isSelected && <Check className="w-4 h-4 text-red-500" />}
                      </div>
                      <span className="text-xs text-neutral-400 mt-1 tabular-nums font-semibold">
                        {size.priceDelta === 0
                          ? formatPrice(product.price)
                          : `+${formatPrice(size.priceDelta)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras Selection */}
          {product.availableExtras && product.availableExtras.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.chooseExtras}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.availableExtras.map(extra => {
                  const isChecked = selectedExtras.some(e => e.id === extra.id);
                  const extraLabel =
                    language === 'ar' && extra.nameAr ? extra.nameAr : extra.name;
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => handleToggleExtra(extra)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-neutral-900/50 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'border-neutral-500'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold">{extraLabel}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400 tabular-nums">
                        +{formatPrice(extra.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes for pizzaiolo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              {t.specialNotes}
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 bg-[#131417] border-t border-white/10 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-white/15 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2.5 text-neutral-300 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-bold text-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 text-neutral-300 hover:text-white hover:bg-white/5"
              aria-label="Augmenter la quantité"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total & Submit Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.available || isAdded}
            className={`flex-1 flex items-center justify-between px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white active:scale-98'
            }`}
          >
            <div className="flex items-center gap-2">
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Ajouté au panier !</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.addToCart}</span>
                </>
              )}
            </div>
            <span className="tabular-nums font-black text-amber-200">
              {formatPrice(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
