import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Script from 'next/script';
import { Playfair_Display, Inter, Tajawal } from 'next/font/google';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import { GoogleAnalytics } from '@/components/Analytics';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorSuppressor } from '@/components/ErrorSuppressor';
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

// Dynamic rendering is handled by individual pages
// Layout remains flexible for both static and dynamic pages
export const dynamicParams = true;

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
    // PWA metadata temporarily removed due to missing icon files
    // Will re-add when PWA is properly configured
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
        <Script
          id="error-suppressor"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  const originalError = console.error;
                  console.error = function() {
                    const args = Array.prototype.slice.call(arguments);
                    const errorString = String(args[0] || '');
                    if (errorString.includes('Server Components render') ||
                        errorString.includes('digest') ||
                        errorString.includes('error occurred in the Server')) {
                      return;
                    }
                    originalError.apply(console, args);
                  };
                }
              })();
            `,
          }}
        />
        <ErrorSuppressor />
        <GoogleAnalytics />
        <ErrorBoundary>
          <Navigation locale={locale as 'en' | 'ar'} />
          <Suspense fallback={null}>{children}</Suspense>
          <WhatsAppButton locale={locale as 'en' | 'ar'} />
          <Footer locale={locale as 'en' | 'ar'} />
        </ErrorBoundary>
      </body>
    </html>
  );
}
