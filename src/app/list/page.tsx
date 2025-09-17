'use client';

import { useEffect, useState, useCallback } from 'react';
import { useI18n } from '@/i18n/useI18n';
import { Listing } from '@/types/listing';
import PhotoCarousel from '@/components/PhotoCarousel';

export default function ListPage() {
  const { t, locale } = useI18n();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
  console.log(t('list.loading'));
      
      // 每次都重新请求，不使用缓存
      const response = await fetch('/api/listings', {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
  throw new Error(t('list.error') || 'Failed to fetch listings');
      }
      
      const data = await response.json();
      setListings(data.listings || []);
  console.log(`Fetched ${data.listings?.length || 0} listings`);
    } catch (err) {
  console.error('Failed to fetch listings:', err);
  setError(err instanceof Error ? err.message : (t('list.error') || 'Failed to fetch listings'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // 刷新函数，供手动刷新使用
  const handleRefresh = () => {
    fetchListings();
  };

  return (
    <div className="min-h-full bg-transparent relative overflow-hidden">
      {/* 背景装饰图案 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-400/20 to-purple-400/20 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>

        {/* 几何图案 */}
        <svg className="absolute top-16 right-16 w-32 h-32 text-purple-200/30 dark:text-purple-800/30" viewBox="0 0 100 100">
          <polygon points="50,5 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation"/>
        </svg>

        <svg className="absolute bottom-16 left-16 w-24 h-24 text-pink-200/30 dark:text-pink-800/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation" style={{animationDelay: '0.5s'}}/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-gray-200/50 dark:border-gray-700/50">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">🏠 {t('list.subtitle')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
              {t('list.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              {t('list.subtitle')}
            </p>
            
            {/* 刷新按钮 */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('list.loading')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('list.refresh')}
                </>
              )}
            </button>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-800 dark:text-red-200 font-medium">{error}</span>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xl text-gray-600 dark:text-gray-300">{t('list.loading')}</span>
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <div className="glass-card-strong rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl w-32 h-32">
                <svg className="w-16 h-16 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                {t('list.empty')}
              </h2>
              <p className="text-slate-700 dark:text-slate-200 mb-8 text-lg">{t('list.empty')}</p>
              <a
                href="/submit"
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t('nav.publish')}
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="glass-card-strong rounded-3xl shadow-xl glass-hover overflow-hidden"
                >
                  {/* 房源照片 */}
                  <PhotoCarousel
                    photos={listing.photos}
                    alt={`房源照片 - ${listing.address}`}
                  />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {listing.address}
                      </h2>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                          {t('nav.list')}
                        </span>
                        {listing.roomType && (
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                            {listing.roomType}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {t('currency.eur')}{listing.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">{t('list.perMonth')}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {listing.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {listing.contact}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('updatedAt', { date: '' }) || 'Updated at'} {listing.updatedAt ? new Date(listing.updatedAt).toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : (t('unknownTime') || 'Unknown')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
