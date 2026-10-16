import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ShieldCheck, Lock, User, AlertTriangle, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const {
    language,
    t,
    settings,
    loginAdmin,
    navigateTo
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (success) {
      navigateTo('/admin');
    } else {
      setErrorMsg(t.invalidCredentials);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Back to website button */}
        <button
          onClick={() => navigateTo('/')}
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>{language === 'ar' ? 'العودة إلى الموقع العام' : 'Retour au site public'}</span>
        </button>

        <div className="bg-[#17181c] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {t.adminLoginTitle}
            </h1>
            <p className="text-xs text-neutral-400">
              {t.adminLoginSubtitle}
            </p>
          </div>

          {/* Security Disclaimer Notice */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/30 text-amber-300 text-xs flex items-start gap-2.5 leading-relaxed">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <p className="font-bold text-amber-200">
                {language === 'ar' ? 'تنبيه أمان مهم :' : 'Avertissement de sécurité :'}
              </p>
              <p className="text-[11px] text-amber-200/80 mt-0.5">
                {language === 'ar'
                  ? 'هذه المصادقة تتم على مستوى المتصفح فقط (Client-side) دون خادم حماية مركزي. البيانات مخزنة في متصفحك الحالي.'
                  : 'Cette authentification fonctionne entièrement côté client dans votre navigateur (localStorage). Elle ne garantit pas une sécurité de niveau bancaire sans serveur dédié.'}
              </p>
            </div>
          </div>

          {/* Demo credentials hint */}
          <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 text-xs text-neutral-300 space-y-1">
            <p className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
              {language === 'ar' ? 'بيانات الدخول التجريبية :' : 'Identifiants démo préconfigurés :'}
            </p>
            <p className="font-mono text-amber-400">
              Utilisateur : <span className="text-white">{settings.adminUsername}</span>
            </p>
            <p className="font-mono text-amber-400">
              Mot de passe : <span className="text-white">{settings.adminPassword}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                {t.username}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="admin"
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 block">
                {t.password}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all active:scale-98"
            >
              {t.loginBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
