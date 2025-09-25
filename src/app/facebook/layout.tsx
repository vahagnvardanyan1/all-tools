import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Images for Facebook – Free Facebook Crop Tool',
  description: 'Crop and resize images for Facebook posts, cover photos, and profile pictures. Get the perfect dimensions for Facebook in one click.',
  keywords: ['Facebook crop tool', 'crop images for Facebook', 'Facebook image cropper', 'Facebook cover photo', 'Facebook profile picture', 'Facebook post image', 'social media image tool'],
  alternates: {
    canonical: 'https://cropsimage.com/facebook',
  },
  openGraph: {
    title: 'Crop Images for Facebook – Free Facebook Crop Tool',
    description: 'Crop and resize images for Facebook posts, cover photos, and profile pictures. Get the perfect dimensions for Facebook in one click.',
    url: 'https://cropsimage.com/facebook',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'Facebook Crop Tool - Free Online Image Cropper',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Images for Facebook – Free Facebook Crop Tool',
    description: 'Crop and resize images for Facebook posts, cover photos, and profile pictures. Get the perfect dimensions for Facebook in one click.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function FacebookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
