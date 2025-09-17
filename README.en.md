# Global Housing Platform

> A truthful, reliable, and secure housing information sharing platform for international students.

## Project Overview

This platform helps international students quickly find suitable housing. All listings are verified by alumni to ensure accuracy and reliability. The platform also fosters a mutual-help community for sharing rental experiences and support.

## Key Features

- 🏠 **Trustworthy**: All listings are verified by students
- 🤝 **Community Sharing**: Mutual help and experience exchange
- 🔒 **Safe & Secure**: Strict privacy protection, information security
- 🌗 **Light/Dark Theme**: Artistic gradient backgrounds, glassmorphism design
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- 🚀 **Easy Deployment**: One-click deploy on Vercel

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + CSS variables
- **Language**: TypeScript
- **Data Source**: Google Sheets API
- **Package Manager**: npm
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/listings/       # API routes (fetch listings)
│   ├── list/               # Listings page
│   ├── submit/             # Submit listing page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   └── SubmitListingForm.tsx
├── lib/                    # Utility functions
│   └── googleSheets.ts     # Google Sheets API integration
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/lemon5227/global-housing.git
   cd global-housing
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Deploy to Vercel or other platforms.

## Contributing

Feel free to submit issues or PRs to improve the platform.

## License

MIT
