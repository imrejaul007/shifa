import { Metadata } from 'next';
import { gccKeywords } from './seo-data';

const siteConfig = {
  name: 'Shifa AlHind',
  nameAr: 'شفاء الهند',
  description: 'Trusted Medical Tourism Partner connecting GCC patients with world-class healthcare in India. JCI-accredited hospitals, Arabic support, 60-80% cost savings.',
  descriptionAr: 'شريك السياحة العلاجية الموثوق الذي يربط مرضى دول مجلس التعاون الخليجي بالرعاية الصحية العالمية في الهند. مستشفيات معتمدة من JCI، دعم عربي، توفير 60-80٪ في التكاليف.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://shifaalhind.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/shifaalhind',
    facebook: 'https://facebook.com/shifaalhind',
    instagram: 'https://instagram.com/shifaalhind',
    linkedin: 'https://linkedin.com/company/shifaalhind',
  },
};

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  locale?: 'en' | 'ar';
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  locale = 'en',
}: PageMetadata): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;
  const image = ogImage || siteConfig.ogImage;

  // Get GCC-specific keywords based on locale
  const baseKeywords = locale === 'ar' ? gccKeywords.ar.slice(0, 10) : gccKeywords.en.slice(0, 10);

  return {
    title: fullTitle,
    description,
    keywords: [
      ...baseKeywords,
      ...keywords,
    ],
    authors: [{ name: 'Shifa AlHind' }],
    creator: 'Shifa AlHind',
    publisher: 'Shifa AlHind',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en`,
        ar: `${siteConfig.url}/ar`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@shifaalhind',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  };
}

export { siteConfig };
