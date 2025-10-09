import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import HospitalsClient from './HospitalsClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar' ? 'المستشفيات الشريكة - شفاء الهند' : 'Partner Hospitals - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'اكتشف أفضل المستشفيات المعتمدة من JCI في بنغالور، الهند. مرافق رعاية صحية عالمية المستوى مع دعم اللغة العربية للمرضى من دول مجلس التعاون الخليجي.'
      : 'Discover top JCI-accredited hospitals in Bangalore, India. World-class healthcare facilities with Arabic language support for GCC patients.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/hospitals`,
    keywords: [
      'hospitals India',
      'Bangalore hospitals',
      'JCI accredited hospitals',
      'NABH hospitals India',
      'multispecialty hospitals',
      'medical tourism hospitals',
      'GCC patients hospitals',
      'Arabic support hospitals',
    ],
  });
}

export default async function HospitalsPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all published hospitals with counts
  const hospitals = await prisma.hospital.findMany({
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
      address: true,
      accreditations: true,
      images: true,
      languagesSupported: true,
      _count: {
        select: {
          doctors: {
            where: {
              published: true,
              isArchived: false,
            },
          },
          treatments: {
            where: {
              published: true,
              isArchived: false,
            },
          },
        },
      },
    },
    orderBy: {
      name_en: 'asc',
    },
  });

  return <HospitalsClient hospitals={hospitals} locale={locale} />;
}
