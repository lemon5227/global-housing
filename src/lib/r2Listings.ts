import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function getListingsFromR2(): Promise<Array<Record<string, unknown>>> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: 'listings.json',
    });
    const response = await s3Client.send(command);
    if (!response.Body) return [];
    const text = await response.Body.transformToString();
    const listings: Array<Record<string, unknown>> = JSON.parse(text);

    return listings.map((listing: Record<string, unknown>) => ({
      id: listing.id || `listing-${Date.now()}`,
      address: listing.address || '',
      price: listing.price || 0,
      description: listing.description || '',
      contact: listing.contact || '',
      roomType: listing.roomType || '',
      photos: Array.isArray(listing.photos) ? listing.photos : [],
      createdAt: listing.createdAt || new Date().toISOString(),
      updatedAt: listing.updatedAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('从 R2 获取房源数据失败:', error);
    return [];
  }
}

export async function saveListingsToR2(listings: Array<Record<string, unknown>>): Promise<boolean> {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: 'listings.json',
      Body: JSON.stringify(listings, null, 2),
      ContentType: 'application/json',
    });
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('保存房源数据到 R2 失败:', error);
    return false;
  }
}
