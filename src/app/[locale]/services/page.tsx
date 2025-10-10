import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import ServicesClient from './ServicesClient';

// Force dynamic rendering to prevent SSR errors
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'ar' ? 'خدماتنا - شفاء الهند' : 'Our Services - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'خدمات سياحة علاجية شاملة للمرضى من دول مجلس التعاون الخليجي. المساعدة في التأشيرة، الترجمة، الإقامة، النقل، التنسيق الطبي، والدعم على مدار الساعة.'
      : 'Comprehensive medical tourism services for GCC patients. Visa assistance, translation, accommodation, transport, medical coordination, and 24/7 support.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/services`,
    keywords: [
      'medical tourism services',
      'GCC patient services',
      'visa assistance India',
      'medical coordination',
      'Arabic translation services',
      'patient support services',
      'medical travel facilitation',
    ],
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;

  return <ServicesClient locale={locale} />;
}
