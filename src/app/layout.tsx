import './globals.css';
import type { Metadata } from 'next';
// import { Inter, Open_Sans as OpenSans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

import AppRouterCacheProviderWrapper from '@/providers/AppRouterCacheProviderWrapper';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   weight: ['400', '700'],
//   display: 'swap',
// });

// const openSans = OpenSans({
//   subsets: ['latin'],
//   variable: '--font-open-sans',
//   weight: ['400', '700'],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'Crop Image Online - Free Image Cropper & Editing Tools',
  description: 'Crop images online for free with our easy-to-use image cropper. Resize, rotate, and optimize your images with multiple free image tools.',
  keywords: ['crop image online', 'free image cropper', 'image editor', 'resize image', 'rotate image', 'photo tools', 'online image tools'],
  authors: [{ name: 'Crop Image', url: 'https://cropsimage.com' }],
  creator: 'Crop Image',
  themeColor: '#ffffff',
  metadataBase: new URL('https://cropsimage.com'),
  openGraph: {
    title: 'Crop Image Online - Free Image Cropper & Editing Tools',
    description: 'Crop images online for free with our easy-to-use image cropper. Resize, rotate, and optimize your images with multiple free image tools.',
    url: 'https://cropsimage.com',
    siteName: 'ImageToolsPro',
    images: [
      {
        url: 'https://i.ibb.co/6jB6RSJ/2025-09-23-21-16-31.jpg',
        width: 1200,
        height: 630,
        alt: 'Crop Image Online - Free Image Tools',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crop Image Online - Free Image Cropper & Editing Tools',
    description: 'Crop images online for free with our easy-to-use image cropper. Resize, rotate, and optimize your images with multiple free image tools.',
    images: ['https://i.ibb.co/6jB6RSJ/2025-09-23-21-16-31.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body>
        <AppRouterCacheProviderWrapper>
          <Header />
          {children}
        </AppRouterCacheProviderWrapper>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
