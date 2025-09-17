"use client";
import { useI18n } from '@/i18n/useI18n';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="glass-card-strong mt-0 relative overflow-hidden">
      {/* 背景装饰图案 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-tl from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>

        {/* 几何装饰 */}
        <svg className="absolute top-8 right-8 w-16 h-16 text-gray-300/30 dark:text-gray-600/30" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
        <svg className="absolute bottom-8 left-8 w-12 h-12 text-gray-300/30 dark:text-gray-600/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* 平台信息 */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {t('brand.title')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('brand.subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-md">
              {t('home.heroDesc1')}
              {t('home.heroDesc2')}
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <svg className="w-5 h-5 text-blue-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <svg className="w-5 h-5 text-gray-800 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <svg className="w-5 h-5 text-blue-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: 'var(--foreground)' }}>{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/list" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent font-semibold">
                    {t('home.cta.browse')}
                  </span>
                </a>
              </li>
              <li>
                <a href="/submit" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-semibold">
                    {t('home.cta.share')}
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* 帮助支持 */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: 'var(--foreground)' }}>{t('footer.support')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  {t('footer.guide')}
                </a>
              </li>
              <li>
                <a href="#" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a href="#" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="font-medium transition-all duration-300 hover:scale-105 inline-block"
                   style={{ color: 'var(--foreground)' }}>
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0 font-medium" style={{ color: 'var(--foreground)' }}>
              &copy; 2025 {t('brand.title')} | {t('footer.disclaimer')}
            </p>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <span className="flex items-center transition-all duration-300 hover:scale-105">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-bold text-xl" style={{ color: 'var(--foreground)' }}>{t('home.features.safety.title')}</span>
              </span>
              <span className="flex items-center transition-all duration-300 hover:scale-105">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-xl theme-card-title">{t('home.features.trust.title')}</span>
              </span>
              <span className="flex items-center transition-all duration-300 hover:scale-105">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-bold text-xl theme-card-title">{t('home.features.community.title')}</span>
          {/* 联系方式邮箱 */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            {t('footer.contactEmail')}: <a href="mailto:yanw@eurecom.fr" className="underline text-blue-600 dark:text-blue-400">yanw@eurecom.fr</a>
          </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
