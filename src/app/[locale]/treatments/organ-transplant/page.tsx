import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import TransplantPillarClient from './TransplantPillarClient';

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
      ? 'زراعة الأعضاء في الهند - تكلفة منخفضة ونسبة نجاح عالية'
      : 'Organ Transplant in India - Cost, Success Rates & Complete Guide 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل زراعة الأعضاء في الهند بتكلفة معقولة. نسبة نجاح 95٪+ للكلى، مراكز معتمدة NOTTO، جراحون خبراء. وفر 80٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to organ transplant in India for GCC patients. Compare costs (India vs UAE vs Saudi), success rates, NOTTO-certified hospitals. Save 80%+ with world-class care.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/organ-transplant`,
    keywords: [
      'kidney transplant India',
      'liver transplant cost India',
      'organ transplant India for foreigners',
      'heart transplant India vs GCC',
      'organ transplant India for UAE patients',
      'NOTTO certified hospitals India',
      'kidney transplant cost India vs UAE',
      'liver transplant India for Saudi patients',
      'زراعة الأعضاء في الهند',
      'زراعة الكلى في الهند',
      'تكلفة زراعة الكبد في الهند',
    ],
  });
}

export default async function OrganTransplantPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does kidney transplant cost in India for UAE patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kidney transplant in India costs between $15,000-$20,000 USD for UAE patients, which is 80-85% less expensive than kidney transplant in the UAE ($100,000-$150,000). This includes pre-operative evaluation, surgery, medications, hospital stay, and immediate post-operative care.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of organ transplants in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'India has world-class organ transplant success rates: 95%+ for kidney transplant, 90%+ for liver transplant, 85%+ for heart transplant. These rates are comparable to or better than success rates in UAE, Saudi Arabia, and Western countries at NOTTO-certified hospitals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are Indian hospitals certified for organ transplant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, India has NOTTO (National Organ and Tissue Transplant Organization) certified hospitals with international accreditations like JCI. These hospitals follow strict quality standards and have highly experienced transplant surgeons with 500+ successful transplants.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay in India for organ transplant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stay duration varies by transplant type: Kidney transplant requires 3-4 weeks, liver transplant needs 4-6 weeks, heart transplant requires 6-8 weeks, and lung transplant needs 6-8 weeks. This includes pre-operative evaluation, surgery, recovery, and initial follow-up.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Indian transplant hospitals have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major transplant hospitals in India have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators throughout your transplant journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I bring a living donor from my country for transplant in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can bring a living donor (immediate family member) from your country for transplant in India. The donor must be a blood relative as per Indian transplant laws. Both patient and donor will undergo comprehensive medical evaluation before approval.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the waiting time for organ transplant in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For living donor transplants, the procedure can be scheduled within 2-3 weeks after medical evaluation and approval. For deceased donor transplants, waiting time varies based on blood type and organ availability through the NOTTO registry.',
        },
      },
      {
        '@type': 'Question',
        name: 'What post-transplant care is provided for international patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'India provides excellent post-transplant care including: intensive monitoring in the first 2-4 weeks, immunosuppressive medication management, regular follow-up consultations, remote monitoring after return home, and 24/7 support for any complications or concerns.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Organ Transplant
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Organ Transplant Surgery',
    alternateName: 'زراعة الأعضاء',
    description:
      'Comprehensive organ transplant services in India for international patients from GCC countries, including kidney, liver, heart, and lung transplants',
    procedureType: 'SurgicalProcedure',
    medicalSpecialty: 'Transplant Surgery',
    offers: {
      '@type': 'Offer',
      priceRange: '$15,000-$70,000 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/organ-transplant',
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
        name: 'Organ Transplant',
        item: `https://shifaalhind.com/${locale}/treatments/organ-transplant`,
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
      <TransplantPillarClient locale={locale} />
    </>
  );
}
