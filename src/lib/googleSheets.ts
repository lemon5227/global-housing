import { google } from 'googleapis';
import { Listing } from '@/types/listing';
import path from 'path';
import fs from 'fs';

const sheets = google.sheets('v4');

// Load service account key from config folder
const keyFilePath = path.join(process.cwd(), 'config', 'service-account-key.json');
const auth = fs.existsSync(keyFilePath)
  ? new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
  : new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

export async function getListings(): Promise<Listing[]> {
  try {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) throw new Error('SPREADSHEET_ID not set');

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'A:G', // Get first 7 columns from the first sheet
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    console.log('📊 Google Sheets 数据结构:');
    console.log('总行数:', rows.length);
    console.log('前几行数据:');
    rows.slice(0, 3).forEach((row, index) => {
      console.log(`行 ${index + 1}:`, row);
    });

    // Google Forms data structure: [timestamp, address, price, contact, roomType, photo]
    return rows.slice(1).map((row: string[], index: number) => {
      const timestamp = row[0] || '';
      const address = row[1] || '';
      const price = row[2] || '';
      const contact = row[3] || '';
      const roomType = row[4] || '';
      const photo = row[5] || '';

      console.log(`🏠 处理房源 ${index + 1}:`);
      console.log(`  地址: ${address}`);
      console.log(`  价格: ${price}`);
      console.log(`  联系方式: ${contact}`);
      console.log(`  房型: ${roomType}`);
      console.log(`  原始图片数据: "${photo}"`);

      // Parse photos - support comma or semicolon separated URLs
      const photos = photo
        .split(/[;,]/)
        .map(url => url.trim())
        .filter(url => url.length > 0 && url !== '');

      console.log(`  解析后的图片数组:`, photos);
      console.log(`  图片数量: ${photos.length}`);

      return {
        id: `listing-${index + 1}`,
        address: address,
        price: parseFloat(price.replace('€', '').trim()) || 0,
        description: `位于 ${address} 的租房信息`, // Generate description from address
        contact: contact,
        roomType: roomType,
        photos: photos,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}
