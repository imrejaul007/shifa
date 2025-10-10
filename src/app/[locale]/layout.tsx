import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Playfair_Display, Inter, Tajawal } from 'next/font/google';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import { GoogleAnalytics } from '@/components/Analytics';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { generateFullMetadata, seoKeywords } from '@/lib/seo-helpers';
import { OrganizationSchema, WebSiteSchema } from '@/components/SEO/SchemaMarkup';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
});

const locales = ['en', 'ar'];

// Force dynamic rendering for all pages to prevent SSR errors on client components
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Removed generateStaticParams to prevent static generation attempts
// All pages will be rendered on-demand

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  // Homepage SEO metadata
  const title = isArabic
    ? 'أفضل السياحة العلاجية في الهند لمرضى دول الخليج'
    : 'Best Medical Tourism in India for GCC Patients';

  const description = isArabic
    ? 'شفاء الهند - شريكك الموثوق للسياحة العلاجية من الخليج إلى الهند. مستشفيات معتمدة من JCI، علاجات بأسعار معقولة 60-70٪ أقل، دعم عربي كامل، ومساعدة في التأشيرة. رعاية صحية عالمية المستوى في بنغالور للمرضى من الإمارات، السعودية، الكويت، عُمان، قطر، البحرين.'
    : 'Shifa AlHind - Your trusted medical tourism partner from GCC to India. JCI-accredited hospitals, affordable treatments 60-70% less, complete Arabic support, and visa assistance. World-class healthcare in Bangalore for patients from UAE, Saudi Arabia, Kuwait, Oman, Qatar, Bahrain.';

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shifaalhind.com';

  return {
    metadataBase: new URL(baseUrl),
    ...generateFullMetadata({
      title,
      description,
      keywords: seoKeywords.homepage,
      locale: locale as 'en' | 'ar',
      canonical: `/${locale}`,
      ogImage: '/og-homepage.jpg',
      ogType: 'website',
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebSiteSchema locale={locale as 'en' | 'ar'} />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${tajawal.variable} ${locale === 'ar' ? 'font-arabic' : ''}`}
      >
        <GoogleAnalytics />
        <ErrorBoundary>
          <Navigation locale={locale as 'en' | 'ar'} />
          {children}
          <WhatsAppButton locale={locale as 'en' | 'ar'} />
          <Footer locale={locale as 'en' | 'ar'} />
        </ErrorBoundary>
      </body>
    </html>
  );
}
