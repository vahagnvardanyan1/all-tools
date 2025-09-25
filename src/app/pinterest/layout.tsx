import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Images for Pinterest – Free Pinterest Crop Tool',
  description: 'Resize and crop images for Pinterest pins (2:3) and story pins (9:16). Free, fast, and perfect for creators.',
  keywords: ['Pinterest crop tool', 'crop images for Pinterest', 'Pinterest pin cropper', 'Pinterest story pin', 'Pinterest image tool', '2:3 aspect ratio', 'vertical image crop'],
  alternates: {
    canonical: 'https://cropsimage.com/pinterest',
  },
  openGraph: {
    title: 'Crop Images for Pinterest – Free Pinterest Crop Tool',
    description: 'Resize and crop images for Pinterest pins (2:3) and story pins (9:16). Free, fast, and perfect for creators.',
    url: 'https://cropsimage.com/pinterest',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'Pinterest Crop Tool - Free Online Image Cropper',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Images for Pinterest – Free Pinterest Crop Tool',
    description: 'Resize and crop images for Pinterest pins (2:3) and story pins (9:16). Free, fast, and perfect for creators.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function PinterestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
