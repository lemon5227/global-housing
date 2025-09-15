export function getDriveImageUrl(url: string): string {
  // 兼容 Google Drive 分享链接格式
  // 例如：https://drive.google.com/open?id=xxxx 或 https://drive.google.com/file/d/xxxx/view?usp=sharing
  if (!url) return '';
  const idMatch = url.match(/(?:id=|\/d\/)([\w-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  }
  return url;
}
