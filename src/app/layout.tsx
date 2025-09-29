import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import AppRouterCacheProviderWrapper from '@/providers/AppRouterCacheProviderWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookiesPopup from '@/components/CookiesPopup';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Crop Image Online - Free Image Cropper & Editing Tools',
  description: 'Crop images online for free with our easy-to-use image cropper. Resize, rotate, and optimize your images with multiple free image tools.',
  keywords: ['crop image online', 'free image cropper', 'image editor', 'resize image', 'rotate image', 'photo tools', 'online image tools', 'image resizer', 'image enhancer', 'background remover'],
  authors: [{ name: 'Crop Image', url: 'https://cropsimage.com' }],
  creator: 'Crop Image',
  publisher: 'Crop Image',
  applicationName: 'CropsImage',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: 'https://cropsimage.com',
  },
  themeColor: '#ffffff',
  metadataBase: new URL('https://cropsimage.com'),
  openGraph: {
    title: 'Crop Image Online - Free Image Cropper & Editing Tools',
    description: 'Crop images online for free with our easy-to-use image cropper. Resize, rotate, and optimize your images with multiple free image tools.',
    url: 'https://cropsimage.com',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'Crop Image Online - Free Image Tools',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Image Online - Free Image Cropper & Editing Tools',
    description: 'Crop images online for free with our easy-to-use image cropper. Resize, rotate, and optimize your images with multiple free image tools.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  category: 'utilities',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="bKTCV7v8G7o-kqJ4fM9oeeHU-hn2jAT_96lnYEg1RxE" />
      </head>
      <body>
        <AppRouterCacheProviderWrapper>
          <Header />
          <StructuredData />
          {children}
          <Footer />
          <CookiesPopup />
        </AppRouterCacheProviderWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
