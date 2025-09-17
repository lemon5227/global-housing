"use client";
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export type Locale = 'en' | 'zh';

type Messages = Record<string, string>;

type I18nContextValue = {
  locale: Locale;
  t: (key: string, vars?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
  messages: Messages;
};

export const I18nContext = createContext<I18nContextValue>({
  locale: 'zh',
  t: (k) => k,
  setLocale: () => {},
  messages: {},
});

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(.*?)\}/g, (_, key) => String(vars[key.trim()] ?? ''));
}

export const I18nProvider: React.FC<{ children: React.ReactNode; defaultLocale?: Locale }> = ({ children, defaultLocale = 'zh' }) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Messages>({});

  const loadMessages = useCallback(async (loc: Locale) => {
    try {
      const mod = await import(`./locales/${loc}.json`);
      setMessages(mod.default || mod);
    } catch (e) {
      console.error('Failed to load locale messages', e);
      setMessages({});
    }
  }, []);

  const setLocale = useCallback((loc: Locale) => {
    setLocaleState(loc);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('app_locale', loc);
        document.cookie = `app_locale=${loc}; path=/; max-age=${60 * 60 * 24 * 365}`;
        document.documentElement.lang = loc === 'zh' ? 'zh-CN' : 'en';
      }
    } catch {}
  }, []);

  useEffect(() => {
    // initialize from storage/cookie/navigator
    try {
      if (typeof window !== 'undefined') {
        const fromLocal = localStorage.getItem('app_locale') as Locale | null;
        const fromCookie = document.cookie.split('; ').find(c => c.startsWith('app_locale='))?.split('=')[1] as Locale | undefined;
        const fromNavigator = (navigator.language || (navigator as { userLanguage?: string }).userLanguage || '').toLowerCase();
        let initial: Locale | null = null;
        if (fromLocal === 'en' || fromLocal === 'zh') initial = fromLocal;
        else if (fromCookie === 'en' || fromCookie === 'zh') initial = fromCookie;
        else if (fromNavigator.startsWith('zh')) initial = 'zh';
        else if (fromNavigator.startsWith('en')) initial = 'en';
        if (initial) {
          setLocaleState(initial);
          document.documentElement.lang = initial === 'zh' ? 'zh-CN' : 'en';
        } else {
          document.documentElement.lang = defaultLocale === 'zh' ? 'zh-CN' : 'en';
        }
      }
    } catch {}
  }, [defaultLocale]);

  useEffect(() => {
    loadMessages(locale);
  }, [locale, loadMessages]);

  const t = useCallback((key: string, vars?: Record<string, string | number>) => {
    const raw = messages[key] ?? key;
    return interpolate(raw, vars);
  }, [messages]);

  const value = useMemo(() => ({ locale, t, setLocale, messages }), [locale, t, setLocale, messages]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};
