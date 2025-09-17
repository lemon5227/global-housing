import { NextRequest, NextResponse } from 'next/server';
import { saveListingsToR2 } from '@/lib/r2Listings';

// 初始化一些示例房源数据
const sampleListings = [
  {
    id: 'sample-1',
    address: '3 rue Soutrane, Valbonne, France',
    price: 800,
    description: '温馨的学生公寓，位置便利，设施齐全。靠近学校和购物中心。',
    contact: 'example@email.com',
    roomType: '单人间',
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-2', 
    address: '15 Avenue de Cannes, Antibes, France',
    price: 1200,
    description: '现代化公寓，海景房，交通便利。适合学生和专业人士。',
    contact: 'contact@example.com',
    roomType: '整套公寓',
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export async function POST(req: NextRequest) {
  const cookieLocale = req.cookies.get('locale')?.value;
  const accept = req.headers.get('accept-language') || '';
  const pref = cookieLocale || accept.split(',')[0] || 'zh';
  const lang: 'zh' | 'en' = pref.startsWith('en') ? 'en' : 'zh';
  const msg = {
    zh: {
      initing: '正在初始化 R2 房源数据...',
      initOk: 'R2 房源数据初始化成功',
      success: '成功初始化房源数据',
      fail: '初始化失败',
      error: '初始化过程中出现错误',
      usePost: '使用 POST 请求来初始化 R2 房源数据'
    },
    en: {
      initing: 'Initializing R2 listings...',
      initOk: 'R2 listings initialized successfully',
      success: 'Initialized listings successfully',
      fail: 'Initialization failed',
      error: 'Error occurred during initialization',
      usePost: 'Use POST to initialize R2 listings'
    }
  } as const;
  const tt = msg[lang];
  try {
    console.log(tt.initing);
    
    const success = await saveListingsToR2(sampleListings);
    
    if (success) {
      console.log(tt.initOk);
      return NextResponse.json({ 
        success: true, 
        message: tt.success,
        count: sampleListings.length
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: tt.fail
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Init R2 error:', error);
    return NextResponse.json({ 
      success: false, 
      message: tt.error,
      error: error instanceof Error ? error.message : 'Unknown'
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const cookieLocale = req.cookies.get('locale')?.value;
  const accept = req.headers.get('accept-language') || '';
  const pref = cookieLocale || accept.split(',')[0] || 'zh';
  const lang: 'zh' | 'en' = pref.startsWith('en') ? 'en' : 'zh';
  const msg = {
    zh: { usePost: '使用 POST 请求来初始化 R2 房源数据' },
    en: { usePost: 'Use POST to initialize R2 listings' }
  } as const;
  const tt = msg[lang];
  return NextResponse.json({
    message: tt.usePost,
    sampleData: sampleListings
  });
}
