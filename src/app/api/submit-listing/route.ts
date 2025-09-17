import { NextRequest, NextResponse } from 'next/server';
import { getListingsFromR2, saveListingsToR2 } from '@/lib/r2Listings';
import { Listing } from '@/types/listing';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const cookieLocale = req.cookies.get('locale')?.value;
  const accept = req.headers.get('accept-language') || '';
  const pref = cookieLocale || accept.split(',')[0] || 'zh';
  const lang: 'zh' | 'en' = pref.startsWith('en') ? 'en' : 'zh';
  const msg = {
    zh: {
      missingFields: '地址、价格、联系方式为必填项',
      submitOk: '提交成功',
      submitFail: '提交失败'
    },
    en: {
      missingFields: 'Address, price, and contact are required',
      submitOk: 'Submitted successfully',
      submitFail: 'Submission failed'
    }
  } as const;
  const tt = msg[lang];
  try {
    const data = await req.json();
    // 校验字段
    if (!data.address || !data.price || !data.contact) {
      return NextResponse.json({ error: tt.missingFields }, { status: 400 });
    }
    // 构造新房源对象
    const newListing: Listing = {
      id: `listing-${Date.now()}`,
      address: data.address,
      latitude: data.latitude || undefined,
      longitude: data.longitude || undefined,
      price: Number(data.price),
      description: data.description || '',
      contact: data.contact,
      roomType: data.roomType || '',
      photos: data.photos || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // 读取现有房源
    const listings = await getListingsFromR2();
    listings.push(newListing as unknown as Record<string, unknown>);
    await saveListingsToR2(listings);
    
    // 重新验证列表页面缓存
    revalidatePath('/list');
    revalidatePath('/');
    
    console.log('Listing submitted, cache revalidated');
    return NextResponse.json({ success: true, message: tt.submitOk, listing: newListing });
  } catch (err) {
    return NextResponse.json({ error: tt.submitFail, detail: String(err) }, { status: 500 });
  }
}
