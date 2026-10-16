import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ShoppingBag, Menu, X, Phone, Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    cartCount,
    currentRoute,
    navigateTo,
    settings
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.navHome, route: '/' },
    { label: t.navMenu, route: '/menu' },
    { label: t.navAbout, route: '/about' },
    { label: t.navGallery, route: '/gallery' },
    { label: t.navContact, route: '/contact' }
  ];

  const handleNavClick = (route: string) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f1012]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      {/* Top micro promo bar */}
      <div className="bg-[#b91c1c] text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="truncate">
            🍕 {language === 'ar' ? settings.homepagePromoAr : settings.homepagePromoFr}
          </p>
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-white/80 shrink-0 font-semibold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="tabular-nums">{settings.phone}</span>
          </a>
        </div>
      </div>

      {/* Main 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 text-left rtl:text-right shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
          aria-label="Taxi Pizza Accueil"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            🍕
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white whitespace-nowrap">
              TAXI PIZZA
            </span>
            <span className="text-xs text-amber-400 font-medium tracking-wide">
              بيتزا تاكسي · Tozeur
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-neutral-300">
          {navLinks.map(link => {
            const isActive =
              currentRoute === link.route ||
              (link.route !== '/' && currentRoute.startsWith(link.route));
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`transition-colors whitespace-nowrap hover:text-white relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded ${
                  isActive ? 'text-white font-bold' : 'text-neutral-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Language + Cart + Mobile Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/20 text-xs font-semibold text-neutral-200 transition-colors"
            title={language === 'fr' ? 'Changer en Arabe' : 'Changer en Français'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
          </button>

          {/* Cart Action Button */}
          <button
            onClick={() => handleNavClick('/cart')}
            className="relative flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label={`${t.cartButton} (${cartCount})`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline whitespace-nowrap">{t.cartButton}</span>
            {cartCount > 0 && (
              <span className="bg-white text-red-700 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white focus-visible:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141518] border-b border-white/10 px-4 py-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => {
              const isActive =
                currentRoute === link.route ||
                (link.route !== '/' && currentRoute.startsWith(link.route));
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-left rtl:text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-neutral-200 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span>{settings.phone}</span>
            <span>Tozeur, Tunisie</span>
          </div>
        </div>
      )}
    </header>
  );
};
