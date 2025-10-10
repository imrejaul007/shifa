import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import CardiacPillarClient from './CardiacPillarClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'جراحة القلب في بنغالور - تكلفة منخفضة ونسبة نجاح عالية'
      : 'Heart Surgery in Bangalore - Cost, Success Rates & Complete Guide 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل جراحة قلب في بنغالور بتكلفة معقولة. نسبة نجاح عالية، مستشفيات معتمدة من JCI، جراحون قلب متخصصون. وفر 70٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to heart surgery in Bangalore for GCC patients. Compare costs (India vs UAE vs Saudi), success rates, top cardiac hospitals. Save 70% with world-class cardiac care.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/heart-surgery`,
    keywords: [
      'heart surgery India for foreigners',
      'cost of cardiac bypass surgery India',
      'cardiac surgery Bangalore cost from UAE',
      'best cardiac hospital Bangalore for Arabs',
      'heart surgery cost India vs UAE',
      'cardiac care India for GCC patients',
      'CABG surgery cost Bangalore',
      'heart valve replacement India',
      'تكلفة جراحة القلب في الهند',
      'مستشفيات القلب بنغالور',
      'جراحة القلب للأجانب في الهند',
    ],
  });
}

export default async function CardiacPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does heart surgery cost in India for UAE patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Heart surgery costs in India are significantly lower than UAE. CABG (bypass surgery) costs $6,000-$8,500 in India vs $20,000-$30,000 in UAE. Heart valve replacement costs $7,000-$10,000 vs $25,000-$35,000 in UAE. This represents savings of 60-70% without compromising quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is heart surgery safe in India for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, heart surgery in India is very safe for foreign patients. Bangalore has JCI-accredited cardiac hospitals with internationally trained surgeons. Success rates for routine cardiac procedures exceed 98%, comparable to top Western hospitals.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of cardiac surgery in Bangalore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top cardiac hospitals in Bangalore report success rates of 98%+ for routine procedures like CABG and valve replacement. Complex procedures have success rates of 90-95%, matching or exceeding international standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay in India for heart surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most patients need to stay 14-21 days in India for heart surgery. This includes pre-operative assessment (2-3 days), surgery and hospital stay (7-10 days), and post-operative monitoring (5-8 days). The exact duration depends on the type of surgery and individual recovery.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do cardiac hospitals in Bangalore have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major cardiac hospitals in Bangalore have Arabic-speaking coordinators and translators for GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators throughout your cardiac treatment journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of heart surgery are available in Bangalore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bangalore cardiac hospitals offer all types of heart surgery including coronary artery bypass (CABG), heart valve replacement and repair, angioplasty and stenting, pacemaker implantation, congenital heart defect correction, and minimally invasive robotic cardiac surgery.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I arrange medical visa for heart surgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shifa AlHind assists with medical visa arrangements for cardiac patients. We provide required medical documents, hospital invitation letters, and guidance for the e-visa application process. Medical visas are typically processed within 3-5 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the recovery time after heart surgery in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Initial recovery in hospital takes 7-10 days. Full recovery for CABG and valve surgery takes 6-8 weeks. Minimally invasive procedures have shorter recovery times (4-6 weeks). Our cardiac team provides detailed post-operative care instructions and follow-up support.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Cardiac Surgery
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Cardiac Surgery (Heart Surgery)',
    alternateName: 'جراحة القلب',
    description:
      'Comprehensive cardiac surgery and heart care in Bangalore, India for international patients from GCC countries',
    procedureType: 'SurgicalProcedure',
    medicalSpecialty: 'Cardiology',
    offers: {
      '@type': 'Offer',
      priceRange: '$6,000-$10,000 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/heart-surgery',
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
        name: 'Heart Surgery',
        item: `https://shifaalhind.com/${locale}/treatments/heart-surgery`,
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
      <CardiacPillarClient locale={locale} />
    </>
  );
}
