import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import IVFPillarClient from './IVFPillarClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'علاج أطفال الأنابيب في بنغالور - تكلفة منخفضة ونسبة نجاح عالية'
      : 'IVF Treatment in Bangalore - Cost, Success Rates & Complete Guide 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل علاج أطفال الأنابيب في بنغالور بتكلفة معقولة. نسبة نجاح عالية، مستشفيات معتمدة من JCI، أطباء متخصصون. وفر 70٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to IVF treatment in Bangalore for GCC patients. Compare costs (India vs UAE vs Saudi), success rates, top fertility clinics & hospitals. Save 70% with world-class care.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/ivf-fertility`,
    keywords: [
      'IVF treatment cost Bangalore',
      'IVF cost India vs UAE',
      'fertility treatment India for UAE patients',
      'IVF success rate Bangalore',
      'best IVF hospital Bangalore',
      'IVF treatment for GCC patients',
      'egg freezing cost India',
      'ICSI treatment Bangalore',
      'تكلفة علاج أطفال الأنابيب في بنغالور',
      'علاج تأخر الإنجاب في الهند',
      'مستشفيات الخصوبة بنغالور',
    ],
  });
}

export default async function IVFPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does IVF cost in Bangalore for UAE patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IVF treatment in Bangalore costs between $3,500-$5,500 USD per cycle for UAE patients, which is 60-70% less expensive than IVF in the UAE ($10,000-$15,000). This includes consultation, medications, egg retrieval, fertilization, and embryo transfer.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of IVF in Bangalore hospitals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top fertility clinics in Bangalore report IVF success rates of 50-65% per cycle for women under 35, and 40-50% for women aged 35-40. These rates are comparable to or better than success rates in UAE and Western countries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is IVF treatment in India safe for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, IVF treatment in India is very safe for foreign patients. Bangalore has JCI-accredited hospitals with internationally trained fertility specialists. The clinics follow strict quality standards and use the latest technology for IVF procedures.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay in Bangalore for IVF treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most patients need to stay in Bangalore for 15-20 days for a complete IVF cycle. This includes initial consultations, ovarian stimulation monitoring, egg retrieval, and embryo transfer. Some patients opt for shorter stays with remote monitoring.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Bangalore fertility clinics have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major fertility hospitals in Bangalore have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind also provides dedicated Arabic-speaking medical coordinators throughout your treatment journey.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for IVF
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'IVF Treatment (In Vitro Fertilization)',
    alternateName: 'علاج أطفال الأنابيب',
    description:
      'Comprehensive IVF fertility treatment in Bangalore, India for international patients from GCC countries',
    procedureType: 'TherapeuticProcedure',
    medicalSpecialty: 'Reproductive Medicine',
    offers: {
      '@type': 'Offer',
      priceRange: '$3,500-$5,500 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/ivf-fertility',
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
        name: 'IVF & Fertility Treatment',
        item: `https://shifaalhind.com/${locale}/treatments/ivf-fertility`,
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
      <IVFPillarClient locale={locale} />
    </>
  );
}
