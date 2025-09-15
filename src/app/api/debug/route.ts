import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    r2Config: {
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT ? '已配置' : '未配置',
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ? '已配置' : '未配置',
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ? '已配置' : '未配置',
      bucket: process.env.CLOUDFLARE_R2_BUCKET ? '已配置' : '未配置',
      publicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL ? '已配置' : '未配置'
    },
    timestamp: new Date().toISOString()
  });
}
