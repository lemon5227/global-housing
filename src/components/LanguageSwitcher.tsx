"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n/useI18n';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const choose = (loc: 'zh' | 'en') => {
    setLocale(loc);
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-3 rounded-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 hover:bg-white dark:hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label={t('lang.switch')}
        title={t('lang.switch')}
      >
        <svg className="w-5 h-5 text-slate-600 dark:text-slate-200 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.5 2 4 5.5 4 9s-1.5 7-4 9c-2.5-2-4-5.5-4-9s1.5-7 4-9z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200/60 dark:border-slate-600/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl overflow-hidden z-50">
          <button
            className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition ${locale === 'zh' ? 'font-semibold' : ''}`}
            onClick={() => choose('zh')}
          >
            🇨🇳 {t('lang.zh')}
          </button>
          <button
            className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition ${locale === 'en' ? 'font-semibold' : ''}`}
            onClick={() => choose('en')}
          >
            🇬🇧 {t('lang.en')}
          </button>
        </div>
      )}
    </div>
  );
}
