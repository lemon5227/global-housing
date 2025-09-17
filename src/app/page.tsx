"use client";
import Link from 'next/link';
import { useI18n } from '@/i18n/useI18n';

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="min-h-full bg-transparent relative overflow-hidden">
      {/* 背景装饰图案 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 dark:from-rose-800/20 dark:to-pink-800/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-300/30 to-indigo-300/30 dark:from-blue-800/20 dark:to-indigo-800/20 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-300/30 to-teal-300/30 dark:from-emerald-800/20 dark:to-teal-800/20 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>

        {/* 几何图案 */}
        <svg className="absolute top-16 right-16 w-32 h-32 text-rose-200/50 dark:text-rose-700/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation"/>
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation" style={{animationDelay: '0.5s'}}/>
        </svg>

        <svg className="absolute bottom-16 left-16 w-24 h-24 text-blue-200/50 dark:text-blue-700/30" viewBox="0 0 100 100">
          <polygon points="50,5 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation" style={{animationDelay: '1.5s'}}/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 slide-in">
            <div className="glass-card rounded-full px-6 py-2 mb-6 shadow-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">🏠 {t('home.badge')}</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 dark:from-slate-200 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-8 leading-tight">
              {t('home.heroTitle')}
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('home.heroDesc1')}
              <br className="hidden md:block" />
              {t('home.heroDesc2')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/list"
                className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {t('home.cta.browse')}
              </Link>
              <Link
                href="/submit"
                className="group inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t('home.cta.share')}
              </Link>
            </div>

            {/* 统计信息 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card-strong rounded-2xl p-6 shadow-xl glass-hover">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                <div className="text-slate-700 dark:text-slate-200">{t('home.stats.listings')}</div>
              </div>
              <div className="glass-card-strong rounded-2xl p-6 shadow-xl glass-hover">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">1000+</div>
                <div className="text-slate-700 dark:text-slate-200">{t('home.stats.users')}</div>
              </div>
              <div className="glass-card-strong rounded-2xl p-6 shadow-xl glass-hover">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">50+</div>
                <div className="text-slate-700 dark:text-slate-200">{t('home.stats.cities')}</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card-strong rounded-3xl p-8 shadow-xl glass-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('home.features.trust.title')}</h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{t('home.features.trust.desc')}</p>
            </div>

            <div className="glass-card-strong rounded-3xl p-8 shadow-xl glass-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('home.features.community.title')}</h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{t('home.features.community.desc')}</p>
            </div>

            <div className="glass-card-strong rounded-3xl p-8 shadow-xl glass-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('home.features.safety.title')}</h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{t('home.features.safety.desc')}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-400 p-8 rounded-3xl shadow-lg backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-3">⚠️ {t('home.disclaimer.title')}</h3>
                <div className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  <p className="text-base mb-3">{t('home.disclaimer.p1')}</p>
                  <p className="text-base">{t('home.disclaimer.p2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
