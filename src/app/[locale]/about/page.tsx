import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import AboutClient from './AboutClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'من نحن - شفاء الهند'
      : 'About Us - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'شريكك الموثوق في السياحة العلاجية. نربط مرضى دول مجلس التعاون الخليجي برعاية صحية عالمية المستوى في الهند منذ 2020. دعم اللغة العربية، أسعار شفافة، ورعاية متميزة.'
      : 'Your trusted medical tourism partner. Connecting GCC patients with world-class healthcare in India since 2020. Arabic language support, transparent pricing, and exceptional care.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/about`,
    keywords: [
      'medical tourism company',
      'GCC patients India',
      'Arabic medical tourism',
      'healthcare facilitation',
      'Shifa AlHind about',
      'trusted medical partner',
      'medical tourism services',
    ],
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  return <AboutClient locale={locale} />;
}
