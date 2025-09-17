import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { I18nProvider } from "@/i18n/I18nProvider";
import Footer from "@/components/Footer";
import { cookies, headers } from 'next/headers';
import type { Locale } from '@/i18n/I18nProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let defaultLocale: Locale = 'zh';
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('app_locale')?.value as Locale | undefined;
    if (cookieLocale === 'en' || cookieLocale === 'zh') {
      defaultLocale = cookieLocale;
    } else {
      const h = await headers();
      const al = (h.get('accept-language') || '').toLowerCase();
      if (al.startsWith('en')) defaultLocale = 'en';
      else if (al.startsWith('zh')) defaultLocale = 'zh';
    }
  } catch {}

  let messages: Record<string, string> = {};
  try {
    const mod = await import(`@/i18n/locales/${defaultLocale}.json`) as { default: Record<string, string> };
    messages = mod.default;
  } catch {}

  return {
    title: messages['brand.metaTitle'] || '留学生租房平台',
    description: messages['brand.metaDesc'] || '为留学生提供真实房源信息共享平台',
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Derive default locale from cookie -> Accept-Language -> zh
  let defaultLocale: Locale = 'zh';
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('app_locale')?.value as Locale | undefined;
    if (cookieLocale === 'en' || cookieLocale === 'zh') {
      defaultLocale = cookieLocale;
    } else {
      const h = await headers();
      const al = (h.get('accept-language') || '').toLowerCase();
      if (al.startsWith('en')) defaultLocale = 'en';
      else if (al.startsWith('zh')) defaultLocale = 'zh';
    }
  } catch {}

  return (
    <html lang={defaultLocale === 'zh' ? 'zh-CN' : 'en'}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-transparent`}>
        <I18nProvider defaultLocale={defaultLocale}>
          <Header />
          <main className="flex-1 bg-transparent">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
