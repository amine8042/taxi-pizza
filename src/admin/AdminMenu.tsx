import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Product, ProductCategory, ProductSize, ProductExtra } from '../types.ts';
import { DEFAULT_SIZES, PIZZA_EXTRAS } from '../data/initialData.ts';
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Check,
  AlertTriangle,
  Upload,
  Link,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

export const AdminMenu: React.FC = () => {
  const {
    language,
    t,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    formatPrice
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [nameFr, setNameFr] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [descFr, setDescFr] = useState('');
  const [descAr, setDescAr] = useState('');
  const [category, setCategory] = useState<ProductCategory>('classique');
  const [price, setPrice] = useState<number>(15.0);
  const [image, setImage] = useState('');
  const [available, setAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [hasSizes, setHasSizes] = useState(true);

  const categories: { key: ProductCategory; labelFr: string; labelAr: string }[] = [
    { key: 'classique', labelFr: 'Classiques', labelAr: 'الكلاسيكية' },
    { key: 'speciale', labelFr: 'Spéciales Taxi', labelAr: 'خاصة تاكسي' },
    { key: 'quatre_fromages', labelFr: '4 Fromages', labelAr: '4 أجبان' },
    { key: 'mexicaine', labelFr: 'Mexicaines', labelAr: 'مكسيكية' },
    { key: 'vegetarienne', labelFr: 'Végétariennes', labelAr: 'نباتية' },
    { key: 'calzone', labelFr: 'Calzones', labelAr: 'كالزوني' },
    { key: 'boisson', labelFr: 'Boissons', labelAr: 'مشروبات' },
    { key: 'dessert', labelFr: 'Desserts', labelAr: 'تحليات' }
  ];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setNameFr('');
    setNameAr('');
    setDescFr('');
    setDescAr('');
    setCategory('classique');
    setPrice(15.0);
    setImage('/src/assets/images/hero_pizza_woodfired_1792116880280.jpg');
    setAvailable(true);
    setIsFeatured(false);
    setHasSizes(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setNameFr(p.nameFr);
    setNameAr(p.nameAr);
    setDescFr(p.descriptionFr);
    setDescAr(p.descriptionAr);
    setCategory(p.category);
    setPrice(p.price);
    setImage(p.image);
    setAvailable(p.available);
    setIsFeatured(!!p.isFeatured);
    setHasSizes(!!(p.sizes && p.sizes.length > 0));
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameFr.trim()) return;

    const payload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      nameFr: nameFr.trim(),
      nameAr: nameAr.trim() || nameFr.trim(),
      descriptionFr: descFr.trim(),
      descriptionAr: descAr.trim() || descFr.trim(),
      category,
      price: Number(price) || 0,
      image: image.trim() || '/src/assets/images/hero_pizza_woodfired_1792116880280.jpg',
      available,
      isFeatured,
      sizes: hasSizes ? DEFAULT_SIZES : undefined,
      availableExtras: hasSizes ? PIZZA_EXTRAS : undefined
    };

    if (editingProduct) {
      updateProduct(payload);
    } else {
      addProduct(payload);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteProduct(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{t.adminTabMenu}</h2>
          <p className="text-xs text-neutral-400">
            {language === 'ar'
              ? 'إضافة وتعديل وحذف أصناف القائمة والأسعار والصور المحفوظة في التخزين المحلي.'
              : 'Gérez vos pizzas, boissons et desserts. Les modifications sont enregistrées dans votre navigateur.'}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addProduct}</span>
        </button>
      </div>

      {/* Product List Table */}
      <div className="bg-[#17181c] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 font-semibold uppercase tracking-wider bg-neutral-900/40">
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Nom (FR / AR)</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Prix</th>
                <th className="py-3 px-4">Disponibilité</th>
                <th className="py-3 px-4">En vedette</th>
                <th className="py-3 px-4 text-right rtl:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  {/* Photo thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-lg bg-neutral-900 overflow-hidden border border-white/10">
                      <img
                        src={p.image}
                        alt={p.nameFr}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Name FR & AR */}
                  <td className="py-3 px-4">
                    <p className="font-bold text-white text-sm">{p.nameFr}</p>
                    <p className="text-neutral-400 text-[11px] font-sans">{p.nameAr}</p>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 capitalize text-neutral-300">
                    {p.category.replace('_', ' ')}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-bold text-amber-400 tabular-nums">
                    {formatPrice(p.price)}
                  </td>

                  {/* Availability */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => updateProduct({ ...p, available: !p.available })}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors border ${
                        p.available
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-red-950/40 border-red-800 text-red-300'
                      }`}
                    >
                      {p.available ? (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>{t.available}</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>{t.unavailable}</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Featured */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => updateProduct({ ...p, isFeatured: !p.isFeatured })}
                      className={`p-1.5 rounded-md transition-colors ${
                        p.isFeatured
                          ? 'text-amber-400 bg-amber-400/10'
                          : 'text-neutral-600 hover:text-neutral-400'
                      }`}
                      title="Mettre en avant sur la page d’accueil"
                    >
                      <Star
                        className={`w-4 h-4 ${p.isFeatured ? 'fill-amber-400' : ''}`}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right rtl:text-left">
                    <div className="flex items-center justify-end rtl:justify-start gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                        title={t.editProduct}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white border border-red-900/50 transition-colors"
                        title={t.deleteProduct}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#17181c] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">
              {editingProduct ? t.editProduct : t.addProduct}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-300 block">
                    {t.productNameFr} *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameFr}
                    onChange={e => setNameFr(e.target.value)}
                    placeholder="Ex: Pizza Fruits de Mer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-300 block">
                    {t.productNameAr}
                  </label>
                  <input
                    type="text"
                    value={nameAr}
                    onChange={e => setNameAr(e.target.value)}
                    placeholder="مثال: بيتزا فواكه البحر"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-300 block">
                    {t.productCategory} *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  >
                    {categories.map(c => (
                      <option key={c.key} value={c.key}>
                        {language === 'ar' ? c.labelAr : c.labelFr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-300 block">
                    {t.productPrice} *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    required
                    value={price}
                    onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Image Configuration (URL or local preview) */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-neutral-900 border border-white/5">
                <label className="text-xs font-bold text-neutral-300 block">
                  {t.productImage}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    placeholder="https://... ou chemin d'image"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                  <label className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choisir fichier</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {language === 'ar'
                    ? 'تنبيه : تحميل الصور من الجهاز يحفظها في ذاكرة المتصفح الحالية فقط ولا يرفعها إلى خادم استضافة دائم.'
                    : 'Remarque : Les images locales sont stockées en prévisualisation dans ce navigateur et ne sont pas hébergées sur un serveur distant.'}
                </p>

                {image && (
                  <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-black">
                    <img
                      src={image}
                      alt="Prévisualisation"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Descriptions */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300 block">
                  {t.productDescFr}
                </label>
                <textarea
                  rows={2}
                  value={descFr}
                  onChange={e => setDescFr(e.target.value)}
                  placeholder="Sauce tomate, mozzarella..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300 block">
                  {t.productDescAr}
                </label>
                <textarea
                  rows={2}
                  value={descAr}
                  onChange={e => setDescAr(e.target.value)}
                  placeholder="صلصة طماطم، موزاريلا..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Checkboxes: Available, Featured, Sizes */}
              <div className="pt-2 flex flex-wrap gap-5 text-xs text-neutral-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={e => setAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-0"
                  />
                  <span>{t.productAvailable}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={e => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-0"
                  />
                  <span>{t.productFeatured}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSizes}
                    onChange={e => setHasSizes(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-0"
                  />
                  <span>Activer les 3 tailles (M, L, XL) et extras</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow"
                >
                  {t.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#17181c] border border-red-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Confirmation de suppression</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {t.confirmDelete}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                {t.deleteProduct}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
