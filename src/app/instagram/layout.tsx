import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Images for Instagram – Free Online Instagram Crop Tool',
  description: 'Easily crop photos for Instagram posts, stories, reels, and profile pictures. Choose from 1:1, 4:5, 9:16, and more aspect ratios. Perfectly optimized images for Instagram in seconds.',
  keywords: [
    'Instagram crop tool',
    'crop images for Instagram',
    'Instagram image cropper',
    'Instagram aspect ratios',
    'Instagram story cropper',
    'Instagram reel cropper',
    'square crop tool',
    'social media image tool',
  ],
  alternates: {
    canonical: 'https://cropsimage.com/instagram',
  },
  openGraph: {
    title: 'Crop Images for Instagram – Free Online Instagram Crop Tool',
    description:
      'Easily crop photos for Instagram posts, stories, reels, and profile pictures. Choose from 1:1, 4:5, 9:16, and more aspect ratios. Perfectly optimized images for Instagram in seconds.',
    url: 'https://cropsimage.com/instagram',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'Instagram Crop Tool - Free Online Image Cropper',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Images for Instagram – Free Online Instagram Crop Tool',
    description:
      'Easily crop photos for Instagram posts, stories, reels, and profile pictures. Choose from 1:1, 4:5, 9:16, and more aspect ratios. Perfectly optimized images for Instagram in seconds.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function InstagramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
