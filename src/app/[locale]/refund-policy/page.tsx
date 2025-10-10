import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import RefundPolicyClient from './RefundPolicyClient';

// Force dynamic rendering to prevent static generation errors with browser APIs
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'سياسة الاسترداد والإلغاء - شفاء الهند'
      : 'Refund & Cancellation Policy - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'تعرف على سياسة الاسترداد والإلغاء الخاصة بنا. معلومات واضحة حول جداول الاسترداد، ورسوم الخدمة، والحالات الطبية الطارئة، وعمليات الاسترداد.'
      : 'Learn about our refund and cancellation policy. Clear information on refund timelines, service fees, medical emergencies, and refund processes.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/refund-policy`,
    keywords: [
      'refund policy',
      'cancellation policy',
      'medical tourism refund',
      'cancellation timeline',
      'refund process',
      'service fees',
      'medical emergency refund',
      'Shifa AlHind refund',
    ],
  });
}

export default async function RefundPolicyPage({ params }: PageProps) {
  const { locale } = await params;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : 'Home',
        item: `https://shifaalhind.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ar' ? 'سياسة الاسترداد والإلغاء' : 'Refund & Cancellation Policy',
        item: `https://shifaalhind.com/${locale}/refund-policy`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RefundPolicyClient locale={locale} />
    </>
  );
}
