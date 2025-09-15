'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';
import AddressInputWithMap from './AddressInputWithMap';

export default function SubmitListingForm() {
  const [form, setForm] = useState({
    address: '',
    latitude: 0,
    longitude: 0,
    price: '',
    contact: '',
    roomType: '',
    description: '',
    photos: [] as string[], // 改为数组存储图片URL
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (address: string, location?: { lat: number; lng: number }) => {
    setForm({
      ...form,
      address,
      latitude: location?.lat || 0,
      longitude: location?.lng || 0
    });
  };

  const handlePhotosUpload = (urls: string[]) => {
    setForm({ ...form, photos: urls });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/submit-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ address: '', latitude: 0, longitude: 0, price: '', contact: '', roomType: '', description: '', photos: [] });
      } else {
        setError(result.error || '提交失败');
      }
    } catch {
      setError('网络错误或服务器异常');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本信息卡片 */}
        <div className="glass-card-strong rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-amber-200 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-amber-700 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold" style={{color: 'var(--foreground)'}}>基本信息</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 地址 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                🏠 房源地址 <span className="text-red-500">*</span>
              </label>
              <AddressInputWithMap
                value={form.address}
                onChange={handleAddressChange}
                placeholder="例如：3 rue Soutrane, Valbonne"
                required
              />
            </div>

            {/* 价格 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                💰 月租价格 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="500"
                  min="0"
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-amber-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-black transition-all dark-text-force"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 dark:text-slate-400 font-medium">€</span>
              </div>
            </div>

            {/* 房型 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                � 房型类型 <span className="text-red-500">*</span>
              </label>
              <select
                name="roomType"
                value={form.roomType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-amber-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:!text-black transition-all dark-text-force"
              >
                <option value="">请选择房型</option>
                <option value="单人间">单人间</option>
                <option value="双人间">双人间</option>
                <option value="合租（Shared）">合租（Shared）</option>
                <option value="学生公寓（Dorm）">学生公寓（Dorm）</option>
                <option value="整套公寓">整套公寓</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>
        </div>

        {/* 联系方式卡片 */}
        <div className="glass-card-strong rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-emerald-200 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-emerald-700 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold" style={{color: 'var(--foreground)'}}>联系方式</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              📞 联系方式 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              placeholder="邮箱或电话号码"
              className="w-full px-4 py-3 rounded-xl border border-emerald-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-black transition-all dark-text-force"
            />
          </div>
        </div>

        {/* 房源图片卡片 */}
        <div className="glass-card-strong rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-indigo-200 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-indigo-700 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold" style={{color: 'var(--foreground)'}}>房源图片</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              📸 上传房源照片
            </label>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              支持 JPG、PNG 格式，最多上传 10 张图片。每张图片大小不超过 5MB。
            </p>
            <ImageUpload onUpload={handlePhotosUpload} />
            {form.photos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  ✅ 已上传 {form.photos.length} 张图片
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 补充描述卡片 */}
        <div className="glass-card-strong rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-orange-200 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-orange-700 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold" style={{color: 'var(--foreground)'}}>补充描述</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              📝 详细描述
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="请描述房源的详细情况，如房间大小、家具配备、交通便利性、周边设施等..."
              className="w-full px-4 py-3 rounded-xl border border-orange-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:!text-black transition-all resize-none dark-text-force"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                提交中...
              </>
            ) : (
              <>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                提交房源
              </>
            )}
          </button>
        </div>

        {/* 成功/错误提示 */}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-emerald-800 dark:text-emerald-200 font-medium">提交成功！感谢你的分享。</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-800 dark:text-red-200 font-medium">{error}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
