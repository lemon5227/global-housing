import { getListingsFromR2 } from '@/lib/r2Listings';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('API: 正在获取房源数据...');
    const listings = await getListingsFromR2();
    
    console.log(`API: 成功获取 ${listings.length} 条房源数据`);
    
    return NextResponse.json({
      success: true,
      listings: listings,
      timestamp: new Date().toISOString(),
      count: listings.length
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API: 获取房源数据失败:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '获取房源失败',
      listings: [],
      timestamp: new Date().toISOString()
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}
