import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function getListingsFromR2(): Promise<any[]> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: 'listings.json',
    });
    const response = await s3Client.send(command);
    if (!response.Body) return [];
    const text = await response.Body.transformToString();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching listings from R2:', error);
    return [];
  }
}

export async function saveListingsToR2(listings: any[]): Promise<void> {
  const json = JSON.stringify(listings, null, 2);
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
    Key: 'listings.json',
    Body: json,
    ContentType: 'application/json',
  });
  await s3Client.send(command);
}
