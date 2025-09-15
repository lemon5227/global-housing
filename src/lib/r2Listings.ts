import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

// 验证环境变量
function validateEnvironmentVariables() {
  const requiredVars = [
    'CLOUDFLARE_R2_ENDPOINT',
    'CLOUDFLARE_R2_ACCESS_KEY_ID', 
    'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
    'CLOUDFLARE_R2_BUCKET'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`缺少必需的环境变量: ${missingVars.join(', ')}`);
  }
}

// 验证环境变量
validateEnvironmentVariables();

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
    console.log('正在从 R2 获取房源数据...', {
      bucket: process.env.CLOUDFLARE_R2_BUCKET,
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT ? '已配置' : '未配置'
    });
    
    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: 'listings.json',
    });
    const response = await s3Client.send(command);
    if (!response.Body) {
      console.log('R2 中没有找到 listings.json 文件');
      return [];
    }
    const text = await response.Body.transformToString();
    const listings: Array<Record<string, unknown>> = JSON.parse(text);

    console.log(`成功从 R2 获取到 ${listings.length} 条房源数据`);
    
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
  } catch (error: any) {
    console.error('从 R2 获取房源数据失败:', error);
    
    // 如果是因为文件不存在，自动创建一个空的 listings.json
    if (error.Code === 'NoSuchKey') {
      console.log('检测到 listings.json 文件不存在，正在创建空文件...');
      try {
        await saveListingsToR2([]);
        console.log('成功创建空的 listings.json 文件');
        return [];
      } catch (createError) {
        console.error('创建空 listings.json 文件失败:', createError);
      }
    }
    
    console.error('环境变量状态:', {
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT ? '已设置' : '未设置',
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ? '已设置' : '未设置',
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ? '已设置' : '未设置',
      bucket: process.env.CLOUDFLARE_R2_BUCKET ? '已设置' : '未设置'
    });
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
