import './globals.css';
import type { Metadata } from 'next';
import { Inter, Open_Sans as OpenSans } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppRouterCacheProviderWrapper from '@/providers/AppRouterCacheProviderWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'],
  display: 'swap',
});

const openSans = OpenSans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Using Montserrat + Open Sans',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body>
        <AppRouterCacheProviderWrapper>
          <Header />
          {children}
        </AppRouterCacheProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}
