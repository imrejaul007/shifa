import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import OrthopedicPillarClient from './OrthopedicPillarClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'جراحة استبدال المفاصل في بنغالور - تكلفة منخفضة ونسبة نجاح عالية'
      : 'Joint Replacement Surgery in Bangalore - Cost, Success Rates & Complete Guide 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل جراحة استبدال المفاصل في بنغالور بتكلفة معقولة. استبدال الركبة والورك والكتف. نسبة نجاح 95٪+، مستشفيات معتمدة من JCI، جراحون متخصصون. وفر 65٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to joint replacement surgery in Bangalore for GCC patients. Knee, hip & shoulder replacement cost comparison (India vs UAE vs Saudi). Save 65% with world-class orthopedic care & experienced surgeons.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/joint-replacement`,
    keywords: [
      'knee replacement cost India',
      'hip replacement India vs Gulf countries',
      'joint replacement surgery Bangalore',
      'orthopedic surgery Bangalore international patients',
      'knee replacement Bangalore for UAE patients',
      'hip replacement cost India',
      'shoulder replacement surgery Bangalore',
      'revision joint surgery India',
      'تكلفة استبدال الركبة الهند',
      'جراحة العظام في بنغالور',
      'استبدال مفصل الورك الهند',
    ],
  });
}

export default async function JointReplacementPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does knee replacement surgery cost in Bangalore for UAE patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Knee replacement surgery in Bangalore costs between $5,000-$7,000 USD for UAE patients, which is 65-70% less expensive than knee replacement in the UAE ($18,000-$25,000). This includes hospital stay, surgeon fees, prosthetics, and post-operative care.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of joint replacement surgery in Bangalore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top orthopedic hospitals in Bangalore report success rates of 95%+ for primary joint replacement procedures. These rates are comparable to or better than success rates in UAE, Saudi Arabia, and Western countries. Most patients experience significant pain relief and improved mobility.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is joint replacement surgery safe in India for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, joint replacement surgery in India is very safe for foreign patients. Bangalore has JCI-accredited orthopedic hospitals with internationally trained surgeons who have 15+ years of experience. The hospitals use latest technology and FDA-approved prosthetics.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is the recovery time after knee replacement surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most patients can walk with assistance within 24-48 hours after knee replacement surgery. Hospital stay is typically 4-5 days. Initial recovery takes 6-8 weeks, with full recovery in 3-6 months. Physical therapy is essential for optimal results.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do orthopedic hospitals in Bangalore have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major orthopedic hospitals in Bangalore have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind also provides dedicated Arabic-speaking medical coordinators throughout your treatment journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of joint replacement surgeries are available in Bangalore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bangalore orthopedic hospitals offer complete joint replacement services including knee replacement (total and partial), hip replacement, shoulder replacement, ankle replacement, and revision surgeries. Both primary and complex revision procedures are performed with excellent outcomes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay in Bangalore after joint replacement surgery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typical stay in Bangalore is 10-14 days for knee or hip replacement. This includes pre-operative assessment (1-2 days), surgery, hospital stay (4-5 days), and initial recovery with physiotherapy. Your surgeon will assess your fitness to travel before clearance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the lifespan of joint replacement implants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Modern joint replacement implants typically last 15-25 years or more. High-quality FDA-approved implants used in Bangalore hospitals have excellent long-term durability. Factors affecting lifespan include patient age, activity level, weight, and implant quality.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Joint Replacement
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Joint Replacement Surgery',
    alternateName: 'جراحة استبدال المفاصل',
    description:
      'Comprehensive joint replacement surgery including knee, hip, and shoulder replacement in Bangalore, India for international patients from GCC countries',
    procedureType: 'SurgicalProcedure',
    medicalSpecialty: 'Orthopedic Surgery',
    offers: {
      '@type': 'Offer',
      priceRange: '$5,000-$10,000 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/joint-replacement',
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
        name: 'Joint Replacement Surgery',
        item: `https://shifaalhind.com/${locale}/treatments/joint-replacement`,
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
      <OrthopedicPillarClient locale={locale} />
    </>
  );
}
