export interface Listing {
  id: string;
  address: string;
  latitude?: number; // 新增：纬度
  longitude?: number; // 新增：经度
  price: number;
  description: string;
  contact: string;
  roomType: string; // 新增：房型
  photos: string[]; // 修改：支持多张房源照片
  createdAt: string;
  updatedAt: string;
}
