import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Playfair_Display, Inter, Tajawal } from 'next/font/google';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import { GoogleAnalytics } from '@/components/Analytics';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: locale === 'ar' ? 'شفاء الهند - الرعاية الطبية الموثوقة' : 'Shifa AlHind - Trusted Medical Care',
      template: locale === 'ar' ? '%s | شفاء الهند' : '%s | Shifa AlHind',
    },
    description:
      locale === 'ar'
        ? 'الرعاية الطبية الموثوقة لمرضى الخليج في بنغالور. مستشفيات معتمدة من JCI، دعم عربي، مساعدة في التأشيرة.'
        : 'Trusted Medical Care in Bangalore for GCC Patients. JCI-accredited hospitals, Arabic support, visa assistance.',
    keywords:
      locale === 'ar'
        ? ['السياحة العلاجية', 'الهند', 'بنغالور', 'مستشفيات', 'دول الخليج', 'علاج طبي']
        : ['medical tourism', 'India', 'Bangalore', 'hospitals', 'GCC', 'medical treatment'],
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
      <body className={`${playfair.variable} ${inter.variable} ${tajawal.variable} ${locale === 'ar' ? 'font-arabic' : ''}`}>
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
