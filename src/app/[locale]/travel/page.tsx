import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import TravelClient from './TravelClient';

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
      ? 'السفر والإقامة في بنغالور للعلاج الطبي - معلومات التأشيرة والفنادق'
      : 'Travel & Stay in Bangalore for Medical Treatment - Visa, Hotels & Guide';

  const description =
    locale === 'ar'
      ? 'دليل شامل للسفر إلى بنغالور للعلاج الطبي. معلومات عن التأشيرة الطبية، استقبال المطار، الفنادق، النقل، والمساعدة بالعربية. خدمات كاملة لمرضى الخليج.'
      : 'Complete guide for GCC patients traveling to Bangalore for medical treatment. Medical visa info, airport pickup, hotels, transportation, and Arabic-speaking assistance. End-to-end support.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/travel`,
    keywords: [
      'medical visa India from UAE',
      'medical visa India from Saudi Arabia',
      'how to get medical visa India from GCC',
      'Bangalore airport to hospital',
      'hotels near hospitals Bangalore',
      'medical tourism travel guide India',
      'accommodation for medical patients Bangalore',
      'airport pickup Bangalore medical tourism',
      'visa requirements medical treatment India',
      'travel checklist medical tourism India',
      'فيزا طبية إلى الهند من الإمارات',
      'فيزا طبية الهند من السعودية',
      'فنادق بالقرب من المستشفيات بنغالور',
      'خدمات النقل الطبي بنغالور',
    ],
  });
}

export default async function TravelPage({ params }: PageProps) {
  const { locale } = await params;

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
        name: 'Travel & Stay',
        item: `https://shifaalhind.com/${locale}/travel`,
      },
    ],
  };

  // FAQPage Schema for Travel FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I get a medical visa for India from UAE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UAE citizens can apply for an Indian medical visa online through the Indian e-Visa portal. You need a medical letter from an Indian hospital, passport copies, photo, and visa fee ($80). Processing takes 3-5 business days. Shifa AlHind provides full assistance with the application process.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to fly from Dubai to Bangalore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Direct flights from Dubai to Bangalore take approximately 3.5-4 hours. Airlines operating this route include Emirates, Air India Express, IndiGo, and Air Arabia. There are 15-20 flights daily.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best area to stay in Bangalore for medical treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best areas are Whitefield, Indiranagar, and Koramangala - close to major hospitals like Manipal, Apollo, and Sakra. These areas have international-standard hotels, restaurants with halal food, and good connectivity. We arrange accommodation within 5-10 minutes of your hospital.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide airport pickup services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Shifa AlHind provides complimentary airport pickup and drop-off for all patients. Our Arabic-speaking coordinator will meet you at the airport arrival gate with a name board and assist with luggage, immigration, and transportation to your hotel or hospital.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe for GCC women to travel alone to Bangalore for treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Bangalore is very safe for international patients. We provide 24/7 Arabic-speaking female coordinators for women patients, door-to-door transportation, and stay arrangements in safe, reputable hotels. Many GCC women travel to Bangalore independently for medical treatment.',
        },
      },
    ],
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TravelClient locale={locale} />
    </>
  );
}
