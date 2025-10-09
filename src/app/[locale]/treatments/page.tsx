import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import TreatmentsClient from './TreatmentsClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'ar' ? 'جميع العلاجات - شفاء الهند' : 'All Treatments - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'اكتشف مجموعة واسعة من العلاجات الطبية المتخصصة في أفضل المستشفيات في بنغالور، الهند. جراحة القلب، استبدال المفاصل، علاج السرطان، وأكثر من ذلك بأسعار معقولة.'
      : 'Explore a wide range of specialized medical treatments at top hospitals in Bangalore, India. Cardiac surgery, joint replacement, cancer treatment, and more at affordable prices.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments`,
    keywords: [
      'medical treatments India',
      'Bangalore hospitals',
      'affordable surgery',
      'cardiac surgery India',
      'orthopedic treatment',
      'cancer treatment Bangalore',
      'medical tourism treatments',
      'GCC patients India',
    ],
  });
}

export default async function TreatmentsPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all published treatments
  const treatments = await prisma.treatment.findMany({
    where: {
      published: true,
      isArchived: false,
    },
    select: {
      slug: true,
      title_en: true,
      title_ar: true,
      summary_en: true,
      summary_ar: true,
      costMin: true,
      costMax: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return <TreatmentsClient treatments={treatments} locale={locale} />;
}
