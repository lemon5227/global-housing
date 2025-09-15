import { NextRequest, NextResponse } from 'next/server';
import { getListingsFromR2, saveListingsToR2 } from '@/lib/r2Listings';
import { Listing } from '@/types/listing';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // 校验字段
    if (!data.address || !data.price || !data.contact) {
      return NextResponse.json({ error: '地址、价格、联系方式为必填项' }, { status: 400 });
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
    return NextResponse.json({ success: true, listing: newListing });
  } catch (err) {
    return NextResponse.json({ error: '提交失败', detail: String(err) }, { status: 500 });
  }
}
