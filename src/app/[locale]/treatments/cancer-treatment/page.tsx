import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import OncologyPillarClient from './OncologyPillarClient';

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
      ? 'علاج السرطان في الهند - مستشفيات الأورام في بنغالور بتكلفة منخفضة'
      : 'Cancer Treatment in India - Oncology Hospitals Bangalore | Cost & Success Rates 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل علاج للسرطان في بنغالور بتكلفة معقولة. مستشفيات أورام متقدمة، أطباء متخصصون (15+ سنة)، دعم باللغة العربية. وفر 70-80٪ مقارنة بالإمارات والسعودية.'
      : 'Comprehensive guide to cancer treatment in Bangalore for GCC patients. Compare costs (India vs UAE vs Saudi), success rates, top oncology hospitals. Save 70-80% with world-class cancer care.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/cancer-treatment`,
    keywords: [
      'Cancer treatment India',
      'Oncology hospitals Bangalore',
      'Cancer treatment cost India for GCC patients',
      'Best cancer hospital India for Arabs',
      'Chemotherapy cost India vs UAE',
      'Radiation therapy Bangalore',
      'Bone marrow transplant India',
      'Cancer surgery India',
      'علاج السرطان في الهند',
      'مستشفيات الأورام بنغالور',
      'تكلفة علاج السرطان الهند',
    ],
  });
}

export default async function OncologyPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does cancer treatment cost in India for GCC patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cancer treatment in India costs 70-80% less than UAE and Saudi Arabia. Chemotherapy costs $3,000-5,000 in India vs $15,000-25,000 in UAE. Radiation therapy costs $4,000-7,000 in India vs $20,000-30,000 in UAE. Major surgeries and bone marrow transplants show similar savings.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of cancer treatment in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top oncology hospitals in Bangalore report 75%+ success rates for early-stage cancers. Advanced-stage cancer success rates vary by type but are comparable to Western countries. India uses the latest technologies including immunotherapy and targeted therapy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is cancer treatment in India safe for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, cancer treatment in India is very safe for foreign patients. Bangalore has JCI-accredited cancer hospitals with internationally trained oncologists. The hospitals follow strict quality standards and use the latest technology for cancer diagnosis and treatment.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay in India for cancer treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Duration varies by treatment type. Chemotherapy cycles may require 1-2 weeks per session. Radiation therapy typically needs 4-6 weeks of daily sessions. Major surgeries require 2-4 weeks including recovery. Bone marrow transplants need 4-6 weeks minimum.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do oncology hospitals in Bangalore have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major cancer hospitals in Bangalore have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators throughout your entire cancer treatment journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of cancer are treated in Bangalore hospitals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bangalore oncology hospitals treat all types of cancer including breast cancer, lung cancer, colorectal cancer, prostate cancer, blood cancers (leukemia, lymphoma), brain tumors, liver cancer, stomach cancer, and rare cancers. Specialized centers exist for each cancer type.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does India offer advanced cancer treatments like immunotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, top cancer hospitals in India offer cutting-edge treatments including immunotherapy, targeted therapy, CAR-T cell therapy, proton beam therapy, robotic surgery, and precision oncology. These advanced treatments are available at a fraction of Western costs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a second opinion from Indian oncologists remotely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, most top oncology hospitals in Bangalore offer online second opinion services. You can share your medical records, scans, and biopsy reports for expert review by experienced oncologists before traveling to India for treatment.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Cancer Treatment
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Cancer Treatment (Oncology)',
    alternateName: 'علاج السرطان',
    description:
      'Comprehensive cancer treatment and oncology care in Bangalore, India for international patients from GCC countries',
    procedureType: 'TherapeuticProcedure',
    medicalSpecialty: 'Oncology',
    offers: {
      '@type': 'Offer',
      priceRange: '$3,000-35,000 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/cancer-treatment',
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
        name: 'Cancer Treatment',
        item: `https://shifaalhind.com/${locale}/treatments/cancer-treatment`,
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
      <OncologyPillarClient locale={locale} />
    </>
  );
}
