import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import CosmeticPillarClient from './CosmeticPillarClient';

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
      ? 'جراحات تجميل في الهند - أفضل الأسعار والنتائج الطبيعية'
      : 'Cosmetic Surgery India for Kuwait - Best Packages & Prices 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل جراحات تجميل في الهند بتكلفة معقولة. جراحون معتمدون، نتائج طبيعية، خصوصية تامة. وفر 70٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to cosmetic surgery in India for GCC patients. Compare costs (India vs UAE vs Saudi) for rhinoplasty, liposuction, breast augmentation. Save 70% with world-class plastic surgeons.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/cosmetic-surgery`,
    keywords: [
      'Cosmetic surgery India for Kuwait',
      'Cosmetic surgery packages India',
      'Rhinoplasty cost Bangalore',
      'Liposuction India for GCC patients',
      'Breast augmentation India',
      'Facelift cost Bangalore',
      'Plastic surgery India vs UAE',
      'Cosmetic surgery for UAE patients',
      'جراحات تجميل في الهند',
      'تكلفة عملية تجميل الأنف بنغالور',
      'عمليات تجميل للمرضى الخليجيين',
    ],
  });
}

export default async function CosmeticSurgeryPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does cosmetic surgery cost in India for GCC patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cosmetic surgery in India costs 60-70% less than in UAE and Saudi Arabia. Rhinoplasty costs $2,500-$3,500 in India vs $8,000-$12,000 in UAE. Liposuction costs $2,000-$3,000 vs $7,000-$10,000. Breast augmentation costs $3,500-$5,000 vs $12,000-$16,000.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are cosmetic surgery results in India natural-looking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Indian plastic surgeons specialize in natural-looking results tailored to your facial features and body proportions. They use advanced techniques and have extensive experience with Middle Eastern patients, understanding specific aesthetic preferences.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is cosmetic surgery safe in India for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, cosmetic surgery in India is very safe for foreign patients. Top hospitals in Bangalore are JCI-accredited with board-certified plastic surgeons trained internationally. They follow strict safety protocols and international quality standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is the recovery time for cosmetic surgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recovery time varies by procedure. Rhinoplasty requires 7-10 days, liposuction 5-7 days, breast augmentation 7-10 days, and facelift 10-14 days. Most patients can return home after this period with follow-up care arranged remotely.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do plastic surgeons in India speak Arabic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Major cosmetic surgery centers in Bangalore have Arabic-speaking coordinators and translators. Shifa AlHind provides dedicated Arabic-speaking support throughout your consultation, surgery, and recovery period.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in cosmetic surgery packages in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Packages typically include pre-operative consultations, surgery, anesthesia, hospital stay, medications, post-operative care, follow-up visits, and airport transfers. Some packages also include accommodation for recovery period.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I maintain privacy during cosmetic surgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, privacy and discretion are paramount. Hospitals offer private rooms, separate entrances for VIP patients, and complete confidentiality. Many GCC patients choose India specifically for the privacy it offers away from their home countries.',
        },
      },
      {
        '@type': 'Question',
        name: 'What qualifications do plastic surgeons in India have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top plastic surgeons in India are board-certified with MCh or DNB in Plastic Surgery. Many have trained internationally in USA, UK, or Europe, and have 15+ years of experience. They are members of international plastic surgery associations.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Cosmetic Surgery
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Cosmetic Surgery Procedures',
    alternateName: 'جراحات تجميل',
    description:
      'Comprehensive cosmetic and plastic surgery procedures in Bangalore, India for international patients from GCC countries',
    procedureType: 'SurgicalProcedure',
    medicalSpecialty: 'Plastic Surgery',
    offers: {
      '@type': 'Offer',
      priceRange: '$2,000-$5,000 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/cosmetic-surgery',
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
        name: 'Cosmetic Surgery',
        item: `https://shifaalhind.com/${locale}/treatments/cosmetic-surgery`,
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
      <CosmeticPillarClient locale={locale} />
    </>
  );
}
