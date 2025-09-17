"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/i18n/useI18n';

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="glass-card-strong sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          {/* Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 float-animation">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {t('brand.title')}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">{t('brand.subtitle')}</p>
          </div>
        </Link>

        <div className="flex items-center space-x-8">
          <Link
            href="/list"
            className="relative font-semibold text-lg transition-all duration-300 group hover:scale-105"
            style={{ color: 'var(--foreground)' }}
          >
            <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent font-bold">
              {t('nav.list')}
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            href="/submit"
            className="relative font-semibold text-lg transition-all duration-300 group hover:scale-105"
            style={{ color: 'var(--foreground)' }}
          >
            <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
              {t('nav.publish')}
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <div className="ml-4 flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="https://github.com/lemon5227/global-housing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow hover:scale-105"
              title="GitHub"
            >
              <svg className="w-5 h-5 text-gray-800 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* 装饰性背景图案 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
      </div>
    </header>
  );
}
