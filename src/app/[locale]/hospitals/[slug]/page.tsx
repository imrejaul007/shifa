import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateFullMetadata, generateHospitalSchema } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import HospitalDetailClient from './HospitalDetailClient';

// Force dynamic rendering to prevent SSR errors
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

// DISABLED: Commenting out to prevent runtime database errors
// export async function generateStaticParams() {
//   try {
//     const hospitals = await prisma.hospital.findMany({
//       take: 10,
//       where: { published: true, isArchived: false },
//       select: { slug: true },
//     });
//     const locales = ['en', 'ar'];
//     const params = [];
//     for (const locale of locales) {
//       for (const hospital of hospitals) {
//         params.push({ locale, slug: hospital.slug });
//       }
//     }
//     return params;
//   } catch {
//     console.warn('Database not available during build, skipping static generation');
//     return [];
//   }
// }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const hospital = await prisma.hospital.findUnique({
    where: { slug },
    select: {
      name_en: true,
      name_ar: true,
      description_en: true,
      description_ar: true,
      seoTitle_en: true,
      seoDesc_en: true,
      seoTitle_ar: true,
      seoDesc_ar: true,
      accreditations: true,
    },
  });

  if (!hospital) {
    return { title: 'Hospital Not Found' };
  }

  const isArabic = locale === 'ar';
  const hasJCI = hospital.accreditations.some((acc) => acc.includes('JCI'));
  const accreditationText = hasJCI ? 'JCI-Accredited' : 'Internationally Accredited';

  const title = isArabic
    ? hospital.seoTitle_ar || `${hospital.name_ar} - مستشفى معتمد في بنغالور`
    : hospital.seoTitle_en || `${hospital.name_en} - ${accreditationText} Hospital in Bangalore`;

  const description = isArabic
    ? hospital.seoDesc_ar ||
      `${hospital.name_ar}: مستشفى عالمي المستوى في بنغالور، الهند. ${hospital.accreditations.join('، ')}. دعم عربي كامل لمرضى الخليج.`
    : hospital.seoDesc_en ||
      `${hospital.name_en}: World-class hospital in Bangalore, India. ${hospital.accreditations.join(', ')}. Complete Arabic support for GCC patients.`;

  const keywords = [
    hospital.name_en,
    ...hospital.accreditations,
    'JCI accredited hospitals Bangalore',
    'best hospitals India',
    'multispecialty hospital Bangalore',
    'medical tourism hospitals',
    'Arabic support hospitals India',
    'GCC patients hospitals',
    'international patient care India',
  ];

  return generateFullMetadata({
    title,
    description,
    keywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/hospitals/${slug}`,
    ogType: 'website',
  });
}

export default async function HospitalDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const hospital = await prisma.hospital.findUnique({
    where: { slug },
    include: {
      doctors: {
        where: { published: true, isArchived: false },
        select: {
          id: true,
          slug: true,
          name_en: true,
          name_ar: true,
          specialties: true,
          languages: true,
          profileImage: true,
        },
      },
      bookings: {
        where: { isArchived: false, status: { not: 'CANCELLED' } },
        select: { id: true },
      },
      _count: {
        select: {
          doctors: true,
          bookings: true,
        },
      },
    },
  });

  if (!hospital || !hospital.published) {
    notFound();
  }

  // Fetch treatments available at this hospital
  const treatments = await prisma.treatment.findMany({
    where: {
      hospitalIds: { has: hospital.id },
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
    take: 6,
  });

  // Generate Hospital Schema using SEO helper
  const hospitalSchemaData = generateHospitalSchema({
    name: hospital.name_en,
    description: hospital.description_en,
    address: hospital.address || 'Bangalore, Karnataka, India',
    reviewCount: hospital._count.bookings > 0 ? hospital._count.bookings : undefined,
    rating: 4.8, // You can calculate this from actual reviews if available
  });

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: locale === 'ar' ? 'المستشفيات' : 'Hospitals', url: '/hospitals' },
    { name: locale === 'ar' ? hospital.name_ar : hospital.name_en, url: `/hospitals/${slug}` },
  ];

  return (
    <>
      {/* Breadcrumb with JSON-LD Schema */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* Hospital Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchemaData) }}
      />

      <HospitalDetailClient hospital={hospital} treatments={treatments} locale={locale} />
    </>
  );
}
