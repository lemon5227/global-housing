import SubmitListingForm from '@/components/SubmitListingForm';

export default function SubmitPage() {
  return (
    <div className="min-h-full bg-transparent relative overflow-hidden">
      {/* 背景装饰图案 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-indigo-400/20 to-emerald-400/20 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>

        {/* 几何图案 */}
        <svg className="absolute top-16 right-16 w-24 h-24 text-emerald-200/30 dark:text-emerald-800/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation"/>
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation" style={{animationDelay: '0.5s'}}/>
        </svg>

        <svg className="absolute bottom-16 left-16 w-32 h-32 text-blue-200/30 dark:text-blue-800/30" viewBox="0 0 100 100">
          <polygon points="50,5 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" className="float-animation" style={{animationDelay: '1.5s'}}/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <div className="glass-card rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">📝 分享你的房源信息</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 dark:from-emerald-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
              提交房源信息
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              帮助其他留学生找到合适的住房，一起构建互助社区
            </p>
          </div>

          <SubmitListingForm />

          {/* 提交指南 */}
          <div className="mt-12 glass-card rounded-3xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">提交指南</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">详细地址信息</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">提供完整的街道、城市、邮编等地址信息</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">完整价格信息</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">包含月租、押金、其他费用等详细价格</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">房屋详细描述</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">描述房间数量、家具配备、交通便利性等</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">高清房屋照片</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">上传清晰的房屋内部和外部照片</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">联系方式（可选）</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">方便其他同学咨询详细信息</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white font-bold text-sm">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">信息准确性</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">确保所有信息准确，避免误导他人</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
