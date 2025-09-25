import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Images for YouTube Thumbnails & Shorts – Free YouTube Crop Tool',
  description: 'Resize and crop images for YouTube thumbnails (16:9) and YouTube Shorts (9:16). Perfect visuals for creators, free and online.',
  keywords: ['YouTube crop tool', 'YouTube thumbnail cropper', 'YouTube Shorts cropper', 'crop images for YouTube', 'YouTube thumbnail maker', '16:9 crop tool', 'YouTube creator tools'],
  alternates: {
    canonical: 'https://cropsimage.com/youtube',
  },
  openGraph: {
    title: 'Crop Images for YouTube Thumbnails & Shorts – Free YouTube Crop Tool',
    description: 'Resize and crop images for YouTube thumbnails (16:9) and YouTube Shorts (9:16). Perfect visuals for creators, free and online.',
    url: 'https://cropsimage.com/youtube',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'YouTube Crop Tool - Free Online Image Cropper',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Images for YouTube Thumbnails & Shorts – Free YouTube Crop Tool',
    description: 'Resize and crop images for YouTube thumbnails (16:9) and YouTube Shorts (9:16). Perfect visuals for creators, free and online.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function YouTubeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
