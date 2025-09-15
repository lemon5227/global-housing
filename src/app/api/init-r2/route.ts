import { NextResponse } from 'next/server';
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

export async function POST() {
  try {
    console.log('正在初始化 R2 房源数据...');
    
    const success = await saveListingsToR2(sampleListings);
    
    if (success) {
      console.log('R2 房源数据初始化成功');
      return NextResponse.json({ 
        success: true, 
        message: '成功初始化房源数据',
        count: sampleListings.length
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: '初始化失败'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('初始化 R2 数据失败:', error);
    return NextResponse.json({ 
      success: false, 
      message: '初始化过程中出现错误',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: '使用 POST 请求来初始化 R2 房源数据',
    sampleData: sampleListings
  });
}
