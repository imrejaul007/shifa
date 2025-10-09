import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import PackagesClient from './PackagesClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar'
      ? 'الباقات الطبية - شفاء الهند'
      : 'Medical Packages - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'اكتشف باقاتنا الطبية الشاملة للمرضى من دول مجلس التعاون الخليجي. أسعار شفافة تشمل كل ما تحتاجه لرحلة طبية ناجحة في الهند بتكلفة أقل بنسبة 60-80٪.'
      : 'Discover our all-inclusive medical packages for GCC patients. Transparent pricing with everything you need for a successful medical journey in India at 60-80% less cost.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/packages`,
    keywords: [
      'medical packages India',
      'treatment packages Bangalore',
      'all-inclusive medical tourism',
      'GCC medical packages',
      'affordable surgery packages',
      'medical tourism deals',
      'India healthcare packages',
      'transparent medical pricing',
    ],
  });
}

export default async function PackagesPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all published packages with booking counts
  const packages = await prisma.package.findMany({
    where: {
      published: true,
      isArchived: false,
    },
    select: {
      slug: true,
      name_en: true,
      name_ar: true,
      description_en: true,
      description_ar: true,
      price: true,
      currency: true,
      features: true,
      duration_en: true,
      duration_ar: true,
      _count: {
        select: {
          bookings: {
            where: {
              isArchived: false,
            },
          },
        },
      },
    },
    orderBy: [
      { featured: 'desc' },
      { price: 'asc' },
    ],
  });

  return <PackagesClient packages={packages} locale={locale} />;
}
