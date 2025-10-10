import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { JsonValue } from '@prisma/client/runtime/library';
import { generateFullMetadata } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import HospitalsClient from './HospitalsClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const title = isArabic
    ? 'أفضل المستشفيات المعتمدة من JCI في بنغالور، الهند'
    : 'Top JCI-Accredited Hospitals in Bangalore, India';

  const description = isArabic
    ? 'اكتشف أفضل المستشفيات المعتمدة من JCI وNABH في بنغالور، الهند. مرافق رعاية صحية عالمية المستوى مع أطباء خبراء ودعم اللغة العربية الكامل للمرضى من دول مجلس التعاون الخليجي. مستشفيات متعددة التخصصات مع معدات طبية حديثة.'
    : 'Discover top JCI and NABH-accredited hospitals in Bangalore, India. World-class healthcare facilities with expert doctors and complete Arabic language support for GCC patients. Multispecialty hospitals with state-of-the-art medical equipment.';

  const keywords = [
    'JCI accredited hospitals Bangalore',
    'best hospitals India',
    'NABH hospitals Bangalore',
    'multispecialty hospitals India',
    'medical tourism hospitals Bangalore',
    'GCC patients hospitals India',
    'Arabic support hospitals',
    'international patient care India',
    'top hospitals Bangalore Karnataka',
    'hospital facilities India',
  ];

  return generateFullMetadata({
    title,
    description,
    keywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/hospitals`,
    ogType: 'website',
  });
}

export default async function HospitalsPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all published hospitals with counts and error handling
  type HospitalData = {
    slug: string;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    address: string;
    accreditations: string[];
    images: JsonValue;
    languagesSupported: string[];
    _count: {
      doctors: number;
    };
  };
  let hospitals: HospitalData[] = [];
  try {
    hospitals = await prisma.hospital.findMany({
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
          },
        },
      },
      orderBy: {
        name_en: 'asc',
      },
    });
  } catch (error) {
    console.error('Database not available during build, skipping static generation');
    console.error(error);
  }

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: locale === 'ar' ? 'المستشفيات' : 'Hospitals', url: '/hospitals' },
  ];

  return (
    <>
      {/* Breadcrumb with JSON-LD Schema */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      <HospitalsClient hospitals={hospitals} locale={locale} />
    </>
  );
}
