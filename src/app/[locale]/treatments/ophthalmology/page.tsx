import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import OphthalmologyPillarClient from './OphthalmologyPillarClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'جراحة العيون في الهند - LASIK وإعتام عدسة العين بتكلفة منخفضة'
      : 'Eye Care & Ophthalmology in India - LASIK, Cataract Surgery Cost 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل علاج للعيون في الهند بتكلفة معقولة. جراحة الليزك، إعتام عدسة العين، جراحة الشبكية، زراعة القرنية. وفر 75٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to eye care and ophthalmology in India for GCC patients. LASIK surgery, cataract treatment, retina surgery. Compare costs (India vs UAE vs Saudi). Save 75% with world-class care.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/ophthalmology`,
    keywords: [
      'LASIK surgery India',
      'LASIK cost India vs UAE',
      'Cataract surgery cost India',
      'Eye treatment India for GCC',
      'best eye hospital India',
      'ophthalmology treatment India',
      'retina surgery India',
      'corneal transplant India',
      'جراحة العيون في الهند',
      'جراحة الليزك في الهند',
      'تكلفة عملية المياه البيضاء في الهند',
    ],
  });
}

export default async function OphthalmologyPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does LASIK surgery cost in India for UAE patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LASIK surgery in India costs between $800-$1,200 USD for UAE patients, which is 75% less expensive than LASIK in the UAE ($3,500-$5,000). This includes pre-operative consultations, the laser procedure, and post-operative care.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of LASIK surgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top eye hospitals in India report LASIK success rates of 99% with advanced technologies like Contoura Vision and SMILE. These rates are comparable to or better than success rates in UAE and Western countries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is eye surgery in India safe for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, eye surgery in India is very safe for foreign patients. India has JCI-accredited eye hospitals with internationally trained ophthalmologists. The hospitals follow strict quality standards and use the latest technology for all procedures.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay in India for LASIK surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most patients need to stay in India for 3-5 days for LASIK surgery. This includes pre-operative consultation, the procedure day, and 1-2 follow-up visits. For cataract surgery, plan for 5-7 days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Indian eye hospitals have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major eye hospitals in India have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind also provides dedicated Arabic-speaking medical coordinators throughout your treatment journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cost of cataract surgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cataract surgery in India costs between $1,500-$2,500 USD including premium IOL lenses. This is significantly less than UAE ($6,000-$9,000) and Saudi Arabia ($5,000-$8,000), offering savings of 70-75%.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which technologies are available for LASIK in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top eye hospitals in India offer advanced LASIK technologies including Bladeless LASIK, Contoura Vision (topography-guided), SMILE (Small Incision Lenticule Extraction), and Femto LASIK with wavefront technology.',
        },
      },
      {
        '@type': 'Question',
        name: 'How experienced are ophthalmologists in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Indian ophthalmologists have 25+ years of experience on average and many are internationally trained. Top eye hospitals have performed over 10,000 international procedures with consistently high success rates.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Eye Care
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Ophthalmology & Eye Care Treatment',
    alternateName: 'جراحة العيون',
    description:
      'Comprehensive eye care and ophthalmology treatment in India for international patients from GCC countries',
    procedureType: 'TherapeuticProcedure',
    medicalSpecialty: 'Ophthalmology',
    offers: {
      '@type': 'Offer',
      priceRange: '$800-$5,000 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/ophthalmology',
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
        name: 'Ophthalmology & Eye Care',
        item: `https://shifaalhind.com/${locale}/treatments/ophthalmology`,
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
      <OphthalmologyPillarClient locale={locale} />
    </>
  );
}
