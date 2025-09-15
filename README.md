# Global Housing 留学生租房平台

> 一个专为中国留学生打造的真实、可靠、安全的租房信息共享平台。

## 项目简介

本平台致力于帮助中国留学生快速找到合适的住房，所有房源信息均由已毕业留学生亲自验证，确保信息的准确性和可靠性。平台同时建立了互助社区，大家可以分享租房经验，互相帮助。

## 主要特性

- 🏠 **真实可靠**：所有房源均由留学生亲自验证
- 🤝 **社区共享**：互助交流，经验分享
- 🔒 **安全可靠**：严格保护用户隐私，信息安全可控
- 🌗 **日夜主题切换**：艺术感渐变背景，玻璃拟态设计
- 📱 **响应式设计**：适配手机、平板和桌面
- 🚀 **快速部署**：支持 Vercel 一键部署

## 技术栈

- **前端框架**：Next.js 15 (App Router)
- **样式**：Tailwind CSS + CSS 变量
- **语言**：TypeScript
- **数据源**：Google Sheets API
- **包管理**：npm
- **部署**：Vercel

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/listings/       # API 路由 (获取房源数据)
│   ├── list/               # 房源列表页面
│   ├── submit/             # 提交房源页面
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── components/             # 可复用组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   └── SubmitListingForm.tsx
├── lib/                    # 工具函数
│   └── googleSheets.ts     # Google Sheets API 集成
```

## 快速开始

1. 克隆仓库：

   ```bash
   git clone https://github.com/lemon5227/global-housing.git
   cd global-housing
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 启动开发环境：

   ```bash
   npm run dev
   ```

4. 部署到 Vercel 或其他平台。

## 贡献指南

欢迎提交 issue 或 PR，完善平台功能和体验。

## License

MIT
