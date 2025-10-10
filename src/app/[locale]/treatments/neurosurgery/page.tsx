import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import NeurosurgeryPillarClient from './NeurosurgeryPillarClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'جراحة الأعصاب في الهند - تكلفة منخفضة ونتائج متميزة'
      : 'Neurosurgery in India - Brain & Spine Surgery Cost, Success Rates 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل جراحة الأعصاب في الهند بتكلفة معقولة. جراحة الدماغ والعمود الفقري، مستشفيات معتمدة من JCI، جراحون متخصصون. وفر 70٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to neurosurgery in India for GCC patients. Compare costs of brain surgery, spine surgery (India vs UAE vs Saudi). JCI-accredited hospitals, 95%+ success rates. Save 70%.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/neurosurgery`,
    keywords: [
      'neurosurgery India',
      'brain surgery cost India',
      'spine surgery India for GCC patients',
      'neurosurgery cost India vs UAE',
      'brain tumor surgery cost',
      'spine surgery Bangalore',
      'best neurosurgeon India',
      'aneurysm treatment India',
      'epilepsy surgery cost India',
      'جراحة الأعصاب في الهند',
      'تكلفة جراحة الدماغ في الهند',
      'جراحة العمود الفقري في الهند',
    ],
  });
}

export default async function NeurosurgeryPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does brain surgery cost in India for UAE patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brain tumor surgery in India costs between $7,000-$12,000 USD for UAE patients, which is 70% less expensive than in the UAE ($30,000-$50,000). This includes pre-operative assessments, surgery, hospital stay, and post-operative care.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of neurosurgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top neurosurgery centers in India report success rates of 95%+ for most brain and spine procedures. These rates are comparable to or better than success rates in UAE, Saudi Arabia, and Western countries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is neurosurgery safe in India for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, neurosurgery in India is very safe for international patients. India has JCI-accredited hospitals with internationally trained neurosurgeons with 20+ years of experience. The hospitals use the latest technology including neuro-navigation and minimally invasive techniques.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is recovery after spine surgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hospital stay is typically 5-7 days for spine surgery. Most patients can travel home after 10-14 days. Full recovery takes 6-12 weeks depending on the procedure. Minimally invasive techniques allow faster recovery.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do neurosurgery hospitals in India speak Arabic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major neurosurgery hospitals in India have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators throughout your treatment journey.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Neurosurgery
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Neurosurgery (Brain & Spine Surgery)',
    alternateName: 'جراحة الأعصاب',
    description:
      'Comprehensive neurosurgery services including brain and spine surgery in India for international patients from GCC countries',
    procedureType: 'SurgicalProcedure',
    medicalSpecialty: 'Neurosurgery',
    offers: {
      '@type': 'Offer',
      priceRange: '$5,000-$15,000 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/neurosurgery',
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
        name: 'Neurosurgery',
        item: `https://shifaalhind.com/${locale}/treatments/neurosurgery`,
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
      <NeurosurgeryPillarClient locale={locale} />
    </>
  );
}
