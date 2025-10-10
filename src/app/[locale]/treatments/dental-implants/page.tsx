import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import DentalPillarClient from './DentalPillarClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'زراعة الأسنان في الهند - تكلفة منخفضة وجودة عالمية'
      : 'Dental Implants in India - Cost, Quality & Complete Guide 2025';

  const description =
    locale === 'ar'
      ? 'احصل على أفضل زراعة أسنان في بنغالور بتكلفة معقولة. زرعات ألمانية، أطباء خبراء، طاقم عربي. وفر 75٪ مقارنة بالإمارات والسعودية.'
      : 'Complete guide to dental implants in India for GCC patients. Compare costs (India vs UAE vs Saudi), German implants, top dental clinics in Bangalore. Save 75% with world-class dental care.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/dental-implants`,
    keywords: [
      'Dental implant cost India',
      'Dental implants cost India vs UAE',
      'Full mouth dental implants India',
      'Veneers cost Bangalore',
      'best dental clinic Bangalore',
      'dental tourism India for GCC patients',
      'smile makeover cost India',
      'German dental implants India',
      'تكلفة زراعة الأسنان في الهند',
      'زراعة أسنان بنغالور',
      'عيادات الأسنان الهند',
    ],
  });
}

export default async function DentalPillarPage({ params }: PageProps) {
  const { locale } = await params;

  // Generate comprehensive FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a dental implant cost in India for UAE patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A single dental implant in India costs between $800-$1,200 USD, which is 70-75% less expensive than dental implants in the UAE ($3,000-$4,500). This includes the implant, abutment, and crown. Full mouth dental implants cost $6,000-$9,000 in India compared to $25,000-$35,000 in UAE.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of dental implants in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dental implants in India have a 95-99% success rate at top clinics in Bangalore. Indian dental clinics use German and Swiss implants (Straumann, Nobel Biocare) and follow international protocols. Success rates are comparable to Western countries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are dental implants in India safe for foreign patients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, dental implants in India are very safe for foreign patients. Bangalore has internationally accredited dental clinics with experienced implantologists. The clinics use German/Swiss implants, follow strict sterilization protocols, and provide international warranties.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I need to stay in India for dental implant treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For single implants, you need 7-10 days in India. Full mouth dental implants require 10-14 days for the immediate loading protocol. For traditional implants with healing time, you may need two visits: initial implant placement (5-7 days) and crown placement 3-6 months later (3-4 days).',
        },
      },
      {
        '@type': 'Question',
        name: 'Do dental clinics in Bangalore have Arabic-speaking staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, major dental clinics in Bangalore have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind also provides dedicated Arabic-speaking coordinators throughout your dental treatment journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'What brands of dental implants are used in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top dental clinics in India use premium German and Swiss implant brands including Straumann (Switzerland), Nobel Biocare (Sweden/USA), Dentsply Sirona (Germany), and Osstem (Korea). All implants come with international lifetime warranties.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is dental implant treatment painful?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, dental implant placement is performed under local anesthesia and is virtually painless. Advanced techniques like computer-guided surgery and laser dentistry minimize discomfort. Sedation dentistry options are available for anxious patients. Post-operative pain is minimal and manageable with medication.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much do veneers cost in Bangalore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dental veneers in Bangalore cost $200-$350 per tooth, compared to $800-$1,200 in UAE and $700-$1,100 in Saudi Arabia. This includes consultation, preparation, and high-quality porcelain veneers. A complete smile makeover (8-10 teeth) costs $3,000-$5,000 in India vs $15,000-$22,000 in UAE.',
        },
      },
    ],
  };

  // MedicalProcedure Schema for Dental Implants
  const medicalProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Dental Implant Treatment',
    alternateName: 'زراعة الأسنان',
    description:
      'Comprehensive dental implant treatment in Bangalore, India for international patients from GCC countries',
    procedureType: 'TherapeuticProcedure',
    medicalSpecialty: 'Dentistry',
    offers: {
      '@type': 'Offer',
      priceRange: '$800-$1,200 USD',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://shifaalhind.com/en/treatments/dental-implants',
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
        name: 'Dental Implants',
        item: `https://shifaalhind.com/${locale}/treatments/dental-implants`,
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
      <DentalPillarClient locale={locale} />
    </>
  );
}
