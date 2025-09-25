import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Images for Twitter (X) – Free Twitter Crop Tool',
  description: 'Easily crop photos for Twitter/X posts, headers, and profile pictures. Get perfect aspect ratios in seconds.',
  keywords: ['Twitter crop tool', 'X crop tool', 'crop images for Twitter', 'Twitter image cropper', 'Twitter header', 'Twitter profile picture', 'Twitter card image'],
  alternates: {
    canonical: 'https://cropsimage.com/twitter',
  },
  openGraph: {
    title: 'Crop Images for Twitter (X) – Free Twitter Crop Tool',
    description: 'Easily crop photos for Twitter/X posts, headers, and profile pictures. Get perfect aspect ratios in seconds.',
    url: 'https://cropsimage.com/twitter',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'Twitter Crop Tool - Free Online Image Cropper',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Images for Twitter (X) – Free Twitter Crop Tool',
    description: 'Easily crop photos for Twitter/X posts, headers, and profile pictures. Get perfect aspect ratios in seconds.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function TwitterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
