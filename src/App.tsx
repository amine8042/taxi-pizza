/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';

// Customer Pages
import { HomePage } from './pages/HomePage.tsx';
import { MenuPage } from './pages/MenuPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

// Admin Pages
import { AdminLogin } from './admin/AdminLogin.tsx';
import { AdminLayout } from './admin/AdminLayout.tsx';
import { AdminOverview } from './admin/AdminOverview.tsx';
import { AdminMenu } from './admin/AdminMenu.tsx';
import { AdminOrders } from './admin/AdminOrders.tsx';
import { AdminSettings } from './admin/AdminSettings.tsx';
import { AdminBackup } from './admin/AdminBackup.tsx';

const MainRouter: React.FC = () => {
  const { currentRoute } = useApp();

  // Route matching
  const renderContent = () => {
    // Admin routes
    if (currentRoute === '/admin/login') {
      return <AdminLogin />;
    }
    if (currentRoute === '/admin' || currentRoute === '/admin/') {
      return (
        <AdminLayout activeTab="overview">
          <AdminOverview />
        </AdminLayout>
      );
    }
    if (currentRoute.startsWith('/admin/menu')) {
      return (
        <AdminLayout activeTab="menu">
          <AdminMenu />
        </AdminLayout>
      );
    }
    if (currentRoute.startsWith('/admin/orders')) {
      return (
        <AdminLayout activeTab="orders">
          <AdminOrders />
        </AdminLayout>
      );
    }
    if (currentRoute.startsWith('/admin/settings')) {
      return (
        <AdminLayout activeTab="settings">
          <AdminSettings />
        </AdminLayout>
      );
    }
    if (currentRoute.startsWith('/admin/backup')) {
      return (
        <AdminLayout activeTab="backup">
          <AdminBackup />
        </AdminLayout>
      );
    }

    // Customer routes with standard public shell
    let pageComponent = <HomePage />;
    if (currentRoute.startsWith('/menu')) pageComponent = <MenuPage />;
    else if (currentRoute.startsWith('/cart')) pageComponent = <CartPage />;
    else if (currentRoute.startsWith('/checkout')) pageComponent = <CheckoutPage />;
    else if (currentRoute.startsWith('/about')) pageComponent = <AboutPage />;
    else if (currentRoute.startsWith('/gallery')) pageComponent = <GalleryPage />;
    else if (currentRoute.startsWith('/contact')) pageComponent = <ContactPage />;

    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#0f1012] text-neutral-100 selection:bg-red-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{pageComponent}</main>
        <Footer />
        <ProductDetailModal />
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
