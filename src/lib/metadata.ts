// app/_components/StructuredData.tsx
'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

/** =========================
 *  Site constants
 *  ========================= */
const BASE_URL = 'https://cropsimage.com';
const SITE_NAME = 'CropsImage';
const ORG_ID = `${BASE_URL}/#org`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const APP_ID = `${BASE_URL}/#app`;
const ORG_LOGO = `${BASE_URL}/images/logo.png`; // ensure 200 OK, publicly crawlable

/** =========================
 *  Utilities
 *  ========================= */
export function safeStringify(value: unknown) {
  return JSON.stringify(value, (_k, v) => (v === undefined ? undefined : v));
}

function pretty(seg: string) {
  return seg.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/** ---- WebApplication builder ---- */
function buildWebAppNode(BASE_URL: string, ORG_ID: string) {
  return {
    '@type': ['SoftwareApplication', 'WebApplication'],
    '@id': `${BASE_URL}/#app`,
    name: 'CropsImage — Free Online Image Cropper',
    url: BASE_URL,
    applicationCategory: 'Photo & Video',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': ORG_ID },
  };
}

/** =========================
 *  Core brand nodes (included on ALL pages)
 *  ========================= */
function coreBrandNodes(includeWebApp: boolean) {
  const org = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: ORG_LOGO,
      // If you know the real logo size, set it here:
      width: 512,
      height: 512,
    },
    isAccessibleForFree: true,
    // Add real profiles if you have them:
    // sameAs: ['https://x.com/yourhandle', 'https://www.linkedin.com/company/yourcompany'],
  };

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BASE_URL,
    name: SITE_NAME,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };

  const appNode = {
    '@type': ['SoftwareApplication', 'WebApplication'],
    '@id': APP_ID,
    name: 'CropsImage — Free Online Image Cropper',
    url: BASE_URL,
    applicationCategory: 'Photo & Video',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': ORG_ID },
  };

  return includeWebApp ? [org, website, buildWebAppNode(BASE_URL, ORG_ID)] : [org, website];
}

/** ---- Decide when WebApplication is “necessary” ----
 * Include it for:
 * - Home page
 * - Resize tool
 * - Social cropper tool pages (from PLATFORM_PRESETS)
 */
function shouldIncludeWebApp(pathname: string) {
  return pathname === '/' || pathname === '/resize-image' || Object.prototype.hasOwnProperty.call(PLATFORM_PRESETS, pathname);
}

/** =========================
 *  Breadcrumbs (non-home)
 *  ========================= */
function buildBreadcrumbList(pathname: string) {
  if (pathname === '/') return null;

  const parts = pathname.split('/').filter(Boolean);
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL }];

  let acc = '';
  parts.forEach((seg, idx) => {
    acc += `/${seg}`;
    items.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: pretty(seg),
      item: `${BASE_URL}${acc}`,
    });
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${BASE_URL}${pathname}#breadcrumbs`,
    itemListElement: items,
  };
}

/** =========================
 *  Base WebPage node
 *  ========================= */
function webPage(pathname: string, name?: string) {
  const url = `${BASE_URL}${pathname}`;
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: name || SITE_NAME,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/** =========================
 *  Home-only blocks (HowTo + FAQ)
 *  ========================= */
function homeExtraBlocks() {
  const howTo = {
    '@type': 'HowTo',
    '@id': `${BASE_URL}/#howto-crop`,
    name: 'How to use the image cropper',
    inLanguage: 'en',
    tool: { '@id': APP_ID },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload your image',
        text: 'Drag & drop or browse to upload JPG, PNG, or GIF (max 40MB).',
      },
      {
        '@type': 'HowToStep',
        name: 'Crop your image',
        text: 'Drag corners to resize the crop area; move the area and preview in real time.',
      },
      {
        '@type': 'HowToStep',
        name: 'Adjust settings',
        text: 'Use zoom and rotation; choose Free, 1:1, 4:3, 16:9, or 3:2.',
      },
      {
        '@type': 'HowToStep',
        name: 'Download result',
        text: 'Export a high-quality JPEG instantly to your device.',
      },
    ],
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the image cropper free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, completely free—no registration required.',
        },
      },
      {
        '@type': 'Question',
        name: 'What image formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JPG, PNG, and GIF up to 40MB per image.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will cropping reduce quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No—the tool preserves quality during cropping.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I crop on mobile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes—fully responsive on phones, tablets, and desktops.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account or sign-up required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I download my cropped image?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click Download to save a high-quality JPEG.',
        },
      },
      {
        '@type': 'Question',
        name: 'What aspect ratios are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Free (custom), 1:1, 4:3, 16:9, and 3:2.',
        },
      },
    ],
  };

  return [howTo, faq];
}

/** =========================
 *  Platform page presets
 *  ========================= */
const PLATFORM_PRESETS: Record<string, { name: string; howtoSteps: string[]; about?: { name: string; sameAs: string } }> = {
  '/instagram': {
    name: 'Crop Images for Instagram – Free Instagram Crop Tool',
    howtoSteps: ['Upload', 'Choose ratio (1:1, 4:5, 1.91:1, 9:16)', 'Adjust & crop', 'Download'],
    about: { name: 'Instagram', sameAs: 'https://www.instagram.com' },
  },
  '/facebook': {
    name: 'Crop Images for Facebook – Free Facebook Crop Tool',
    howtoSteps: ['Upload', 'Pick format (Profile 1:1; Cover 820×312; Posts 1.91:1)', 'Adjust & crop', 'Download'],
    about: { name: 'Facebook', sameAs: 'https://www.facebook.com' },
  },
  '/tiktok': {
    name: 'Crop for TikTok – Free TikTok Crop Tool',
    howtoSteps: ['Upload', 'Choose 9:16 vertical', 'Adjust & crop', 'Download'],
    about: { name: 'TikTok', sameAs: 'https://www.tiktok.com' },
  },
  '/youtube': {
    name: 'Crop for YouTube Thumbnails & Shorts – Free Tool',
    howtoSteps: ['Upload', 'Pick 1280×720 (16:9) or 9:16 for Shorts', 'Adjust & crop', 'Download'],
    about: { name: 'YouTube', sameAs: 'https://www.youtube.com' },
  },
  '/linkedin': {
    name: 'Crop Images for LinkedIn – Free LinkedIn Crop Tool',
    howtoSteps: ['Upload', 'Pick format (Profile 400×400; Banner 1584×396; Post 1200×628)', 'Adjust & crop', 'Download'],
    about: { name: 'LinkedIn', sameAs: 'https://www.linkedin.com' },
  },
  '/twitter': {
    name: 'Crop Images for Twitter (X) – Free Tool',
    howtoSteps: ['Upload', 'Pick format (Profile 400×400; Header 1500×500; Shared 16:9)', 'Adjust & crop', 'Download'],
    about: { name: 'Twitter (X)', sameAs: 'https://x.com' },
  },
  '/pinterest': {
    name: 'Crop Images for Pinterest – Free Pinterest Crop Tool',
    howtoSteps: ['Upload', 'Pick format (Pins 1000×1500 / 2:3, Stories 9:16)', 'Adjust & crop', 'Download'],
    about: { name: 'Pinterest', sameAs: 'https://www.pinterest.com' },
  },
};

/** =========================
 *  Resize page blocks
 *  ========================= */
function resizeBlocks(pathname: string) {
  const url = `${BASE_URL}${pathname}`;
  const page = webPage(pathname, 'Free online image resizer');

  const howTo = {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: 'How to resize an image online',
    inLanguage: 'en',
    tool: { '@id': APP_ID },
    supply: [{ '@type': 'HowToSupply', name: 'Image file (JPG/PNG/GIF, ≤40MB)' }],
    step: [
      { '@type': 'HowToStep', name: 'Open the resizer', text: 'Open the resizer and upload your image.' },
      { '@type': 'HowToStep', name: 'Upload a photo', text: 'Supports JPG, PNG, GIF; up to 40MB.' },
      { '@type': 'HowToStep', name: 'Pick a size', text: 'Enter custom width/height or choose presets; maintain aspect ratio if desired.' },
      { '@type': 'HowToStep', name: 'Resize image', text: 'Apply and preview changes in real time.' },
      { '@type': 'HowToStep', name: 'Change canvas size (optional)', text: 'Use Canvas Crop to adjust canvas dimensions.' },
      { '@type': 'HowToStep', name: 'Save', text: 'Download your resized image.' },
    ],
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [
      { '@type': 'Question', name: 'Is the image resizer free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, free to use with no registration.' } },
      { '@type': 'Question', name: 'What formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'JPG, PNG, and GIF up to 40MB.' } },
      { '@type': 'Question', name: 'Can I keep aspect ratio?', acceptedAnswer: { '@type': 'Answer', text: 'Yes—enable Maintain aspect ratio.' } },
      { '@type': 'Question', name: 'Are there preset sizes?', acceptedAnswer: { '@type': 'Answer', text: 'Yes—common presets like 1920×1080, 1280×720, 800×600.' } },
      { '@type': 'Question', name: 'Does enlarging reduce quality?', acceptedAnswer: { '@type': 'Answer', text: 'Some loss is inevitable when enlarging; we minimize it with interpolation.' } },
      { '@type': 'Question', name: 'Mobile support?', acceptedAnswer: { '@type': 'Answer', text: 'Yes—works on mobile, tablet, and desktop.' } },
    ],
  };

  const crumbs = buildBreadcrumbList(pathname);
  return [page, howTo, faq, ...(crumbs ? [crumbs] : [])];
}

/** =========================
 *  Platform page blocks
 *  ========================= */
function platformBlocks(pathname: string) {
  const preset = PLATFORM_PRESETS[pathname];
  const url = `${BASE_URL}${pathname}`;

  const page = {
    ...webPage(pathname, preset?.name || pretty(pathname.slice(1))),
    about: preset?.about ? { '@type': 'Thing', name: preset.about.name, sameAs: preset.about.sameAs } : undefined,
  };

  const howTo = preset
    ? {
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        name: `How to crop for ${preset.about?.name || pretty(pathname.slice(1))}`,
        inLanguage: 'en',
        tool: { '@id': APP_ID },
        step: preset.howtoSteps.map(s => ({
          '@type': 'HowToStep',
          name: s.split(' (')[0],
          text: s,
        })),
      }
    : null;

  const crumbs = buildBreadcrumbList(pathname);
  return [page, ...(howTo ? [howTo] : []), ...(crumbs ? [crumbs] : [])];
}

/** =========================
 *  Build @graph per route
 *  ========================= */
export function buildGraph(pathname: string) {
  const includeApp = shouldIncludeWebApp(pathname);
  const brand = coreBrandNodes(includeApp);

  if (pathname === '/') {
    const home = webPage('/', 'CropsImage — Free Online Image Cropper');
    return [home, ...homeExtraBlocks(), ...brand];
  }

  if (pathname === '/resize-image') {
    return [...resizeBlocks(pathname), ...brand];
  }

  if (PLATFORM_PRESETS[pathname]) {
    return [...platformBlocks(pathname), ...brand];
  }

  // Default/fallback content page
  const page = webPage(pathname, `${pretty(pathname.replace('/', ''))} – ${SITE_NAME}`);
  const crumbs = buildBreadcrumbList(pathname);
  return [page, ...(crumbs ? [crumbs] : []), ...brand];
}
