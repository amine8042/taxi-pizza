import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { AdminLogin } from './AdminLogin.tsx';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Sliders,
  Database,
  LogOut,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'overview' | 'menu' | 'orders' | 'settings' | 'backup';
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const {
    adminAuthenticated,
    adminUser,
    logoutAdmin,
    navigateTo,
    language,
    t,
    settings
  } = useApp();

  if (!adminAuthenticated) {
    return <AdminLogin />;
  }

  const navItems = [
    { key: 'overview', label: t.adminTabOverview, route: '/admin', icon: LayoutDashboard },
    { key: 'menu', label: t.adminTabMenu, route: '/admin/menu', icon: UtensilsCrossed },
    { key: 'orders', label: t.adminTabOrders, route: '/admin/orders', icon: ShoppingBag },
    { key: 'settings', label: t.adminTabSettings, route: '/admin/settings', icon: Sliders },
    { key: 'backup', label: t.adminTabBackup, route: '/admin/backup', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-[#0f1012] text-neutral-200">
      {/* Top Admin Sub-bar */}
      <div className="bg-[#17181c] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow">
              🍕
            </div>
            <div>
              <span className="text-sm font-extrabold text-white">
                TAXI PIZZA ADMIN
              </span>
              <span className="text-xs text-neutral-400 block">
                {settings.name} Tozeur · Espace Gérant
              </span>
            </div>
          </div>

          {/* User info & Actions */}
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 font-mono text-amber-400 hidden sm:inline">
              Session: {adminUser}
            </span>

            <button
              onClick={() => navigateTo('/')}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>{language === 'ar' ? 'الموقع العام' : 'Voir le site'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800 transition-colors flex items-center gap-1.5 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.logoutBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Tabs (Zero-Pill Discipline: clean segmented controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => navigateTo(item.route)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-[#17181c] text-neutral-400 hover:text-white hover:bg-neutral-800 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Local Storage Disclaimer Banner */}
        <div className="p-3 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.statLocalNotice}</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-500 hidden md:inline">
            Stockage : LocalStorage API
          </span>
        </div>

        {/* Tab Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};
