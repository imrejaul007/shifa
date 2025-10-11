import { Metadata } from 'next';
import { generateFullMetadata } from '@/lib/seo-helpers';
import HomePageClient from './HomePageClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const title = isArabic
    ? 'شفاء الهند - السياحة العلاجية من الخليج إلى الهند'
    : 'Shifa AlHind - Medical Tourism from GCC to India | Save 60-70%';

  const description = isArabic
    ? 'شفاء الهند هي الوجهة الأولى للسياحة العلاجية من دول الخليج إلى الهند. مستشفيات معتمدة من JCI، أطباء خبراء، دعم عربي 24/7، وفر 60-70٪ على العلاجات الطبية.'
    : 'Shifa AlHind connects GCC patients with world-class medical care in India. JCI-accredited hospitals, expert doctors, 24/7 Arabic support. Save 60-70% on medical treatments.';

  return generateFullMetadata({
    title,
    description,
    locale,
    canonical: `/${locale}`,
    keywords: [
      'medical tourism India',
      'GCC medical tourism',
      'medical treatment India',
      'affordable healthcare India',
      'JCI hospitals India',
      'medical tourism UAE to India',
      'medical tourism Saudi Arabia to India',
      'Arabic support medical tourism',
      'Bangalore hospitals',
      'medical tourism Qatar',
      'medical tourism Oman',
      'medical tourism Kuwait',
      'medical tourism Bahrain',
      'cardiac surgery India',
      'orthopedic care India',
      'oncology treatment India',
    ],
    ogType: 'website',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return <HomePageClient locale={locale} />;
}
