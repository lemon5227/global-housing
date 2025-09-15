import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});
const BUCKET = process.env.CLOUDFLARE_R2_BUCKET!;
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL!;

export async function POST(req: NextRequest) {
  try {
    // 检查环境变量
    if (!BUCKET || !PUBLIC_URL) {
      console.error('Missing environment variables:', { BUCKET: !!BUCKET, PUBLIC_URL: !!PUBLIC_URL });
      return NextResponse.json({ error: '服务器配置错误' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '未收到文件' }, { status: 400 });
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '只支持图片文件' }, { status: 400 });
    }

    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: '图片大小不能超过 5MB' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const ext = file.name.split('.').pop() || 'jpg';
    const key = `images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    console.log('Uploading to R2:', { bucket: BUCKET, key, size: file.size, type: file.type });

    await r2.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    }));

    const url = `${PUBLIC_URL}/${key}`;
    console.log('Upload successful:', url);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      error: '上传失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}
