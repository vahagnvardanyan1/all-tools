import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resize Image – Free Online Image Resizer',
  description: 'Resize images online in seconds. Enter custom width/height, keep aspect ratio (including 9:16), adjust canvas size, and download instantly — free and mobile-friendly.',
  keywords: ['image resizer', 'resize image online', 'change image size', 'maintain aspect ratio', '9:16 vertical', 'canvas size', 'photo resizer', 'free image tool'],
  alternates: {
    canonical: 'https://cropsimage.com/resize-image',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CropsImage',
    url: 'https://cropsimage.com/resize-image',
    title: 'Resize Image – Free Online Image Resizer',
    description: 'Resize images online in seconds. Custom dimensions, aspect ratio lock (incl. 9:16), canvas size, and instant download — all free.',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'CropsImage – Resize Image Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resize Image – Free Online Image Resizer',
    description: 'Fast, free image resizer. Set custom dimensions, keep aspect ratio (9:16 and more), adjust canvas, and download instantly.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function ResizeImageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
