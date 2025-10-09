import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import FAQClient from './FAQClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'الأسئلة الشائعة - شفاء الهند'
      : 'Frequently Asked Questions - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'أجوبة على الأسئلة الشائعة حول السياحة العلاجية في الهند. التكاليف، التأشيرة، الإقامة، الرعاية الطبية، والمزيد من المعلومات للمرضى من دول مجلس التعاون الخليجي.'
      : 'Answers to frequently asked questions about medical tourism in India. Costs, visa, accommodation, medical care, and more information for GCC patients.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/faq`,
    keywords: [
      'medical tourism FAQ',
      'India medical tourism questions',
      'GCC patients FAQ',
      'medical visa India',
      'treatment costs India',
      'hospital accreditation',
      'patient questions',
    ],
  });
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;

  return <FAQClient locale={locale} />;
}
