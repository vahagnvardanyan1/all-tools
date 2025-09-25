import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Images & Videos for TikTok – Free TikTok Crop Tool',
  description: 'Free TikTok crop tool to resize images and videos for TikTok posts, profile, and ads. Get the perfect 9:16 ratio in seconds.',
  keywords: ['TikTok crop tool', 'crop images for TikTok', 'TikTok image cropper', 'TikTok video cropper', 'TikTok 9:16 ratio', 'TikTok shorts', 'vertical video crop'],
  alternates: {
    canonical: 'https://cropsimage.com/tiktok',
  },
  openGraph: {
    title: 'Crop Images & Videos for TikTok – Free TikTok Crop Tool',
    description: 'Free TikTok crop tool to resize images and videos for TikTok posts, profile, and ads. Get the perfect 9:16 ratio in seconds.',
    url: 'https://cropsimage.com/tiktok',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'TikTok Crop Tool - Free Online Image Cropper',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Images & Videos for TikTok – Free TikTok Crop Tool',
    description: 'Free TikTok crop tool to resize images and videos for TikTok posts, profile, and ads. Get the perfect 9:16 ratio in seconds.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function TikTokLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
