import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Images for LinkedIn – Free LinkedIn Crop Tool',
  description: 'Free tool to crop and resize images for LinkedIn posts, profile pictures, and banners. Optimize your LinkedIn visuals instantly.',
  keywords: ['LinkedIn crop tool', 'crop images for LinkedIn', 'LinkedIn image cropper', 'LinkedIn profile picture', 'LinkedIn banner', 'LinkedIn post image', 'professional image tool'],
  alternates: {
    canonical: 'https://cropsimage.com/linkedin',
  },
  openGraph: {
    title: 'Crop Images for LinkedIn – Free LinkedIn Crop Tool',
    description: 'Free tool to crop and resize images for LinkedIn posts, profile pictures, and banners. Optimize your LinkedIn visuals instantly.',
    url: 'https://cropsimage.com/linkedin',
    siteName: 'CropsImage',
    images: [
      {
        url: 'https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Crop Tool - Free Online Image Cropper',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cropsimage',
    creator: '@cropsimage',
    title: 'Crop Images for LinkedIn – Free LinkedIn Crop Tool',
    description: 'Free tool to crop and resize images for LinkedIn posts, profile pictures, and banners. Optimize your LinkedIn visuals instantly.',
    images: ['https://i.ibb.co/Q3PrgT0V/Portrait-Cropping-Demonstration.webp'],
  },
};

export default function LinkedInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
