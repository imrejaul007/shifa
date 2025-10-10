import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import AyurvedaPillarClient from './AyurvedaPillarClient';

// Force dynamic rendering to prevent SSR errors
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
      ? 'علاج الأيورفيدا في الهند - بنشكارما والعافية الشاملة'
      : 'Ayurveda Treatment in India - Panchakarma & Wellness Retreat 2025';

  const description =
    locale === 'ar'
      ? 'اكتشف علاج الأيورفيدا الأصيل في الهند. علاج بنشكارما، برامج إزالة السموم، وإدارة الإجهاد. وفر 70٪ مقارنة بالإمارات والسعودية. مراكز معتمدة مع 5000+ سنة من التقاليد.'
      : 'Authentic Ayurveda treatment in India for GCC patients. Panchakarma therapy, detox programs, stress management & chronic pain relief. Save 70% vs UAE & Saudi. 5000+ years tradition.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/ayurveda-wellness`,
    keywords: [
      'Ayurveda treatment India',
      'Panchakarma therapy India',
      'wellness retreat India for GCC',
      'Ayurveda cost India vs UAE',
      'authentic Ayurveda treatment',
      'stress management Ayurveda',
      'chronic pain Ayurveda India',
      'detox treatment India',
      'علاج الأيورفيدا في الهند',
      'علاج بنشكارما',
      'منتجع صحي في الهند',
    ],
  });
}

export default async function AyurvedaPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does Panchakarma therapy cost in India for GCC patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Panchakarma therapy (21-day program) in India costs between $1,500-$2,500 USD for GCC patients, which is 70-80% less expensive than in UAE ($8,000-$12,000) or Saudi Arabia ($7,000-$11,000). This includes accommodation, meals, consultations, and all treatments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Ayurveda treatment in India authentic and safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, India offers the most authentic Ayurveda treatment with certified practitioners trained in traditional methods. Centers follow government regulations and use natural, herbal medicines prepared according to ancient formulations. Many centers are accredited and have been serving international patients for decades.',
        },
      },
      {
        '@type': 'Question',
        name: 'What conditions can be treated with Ayurveda?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ayurveda effectively treats chronic pain, arthritis, stress and anxiety, digestive disorders, skin conditions, respiratory issues, diabetes management, weight management, and hormonal imbalances. It focuses on root cause treatment rather than just symptom management.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long should I stay for Ayurveda treatment in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional Panchakarma therapy requires 21-28 days for complete detoxification and rejuvenation. Shorter programs of 7-14 days are available for stress management and wellness. The duration depends on your condition and treatment goals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Ayurveda centers in India have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major Ayurveda wellness centers in India have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind provides dedicated Arabic support throughout your wellness journey.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Ayurveda
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Ayurveda & Panchakarma Treatment',
    alternateName: 'علاج الأيورفيدا وبنشكارما',
    description:
      'Comprehensive Ayurveda and Panchakarma wellness treatment in India for international patients from GCC countries',
    procedureType: 'TherapeuticProcedure',
    medicalSpecialty: 'Alternative Medicine',
    offers: {
      '@type': 'Offer',
      priceRange: '$1,500-$2,500 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/ayurveda-wellness',
    },
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Shifa AlHind',
      url: 'https://shifaalhind.com',
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://shifaalhind.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Treatments',
        item: `https://shifaalhind.com/${locale}/treatments`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ayurveda & Wellness',
        item: `https://shifaalhind.com/${locale}/treatments/ayurveda-wellness`,
      },
    ],
  };

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* MedicalProcedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AyurvedaPillarClient locale={locale} />
    </>
  );
}
