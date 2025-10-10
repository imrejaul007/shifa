import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import HospitalDetailClient from './HospitalDetailClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const hospitals = await prisma.hospital.findMany({
      where: { published: true, isArchived: false },
      select: { slug: true },
    });

    const locales = ['en', 'ar'];
    const params = [];

    for (const locale of locales) {
      for (const hospital of hospitals) {
        params.push({ locale, slug: hospital.slug });
      }
    }

    return params;
  } catch {
    console.warn('Database not available during build, skipping static generation');
    return [];
  }
}

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

  const title =
    locale === 'ar'
      ? hospital.seoTitle_ar || hospital.name_ar
      : hospital.seoTitle_en || hospital.name_en;
  const description =
    locale === 'ar'
      ? hospital.seoDesc_ar || hospital.description_ar.substring(0, 160)
      : hospital.seoDesc_en || hospital.description_en.substring(0, 160);

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/hospitals/${slug}`,
    keywords: [
      hospital.name_en,
      ...hospital.accreditations,
      'hospital Bangalore',
      'medical tourism India',
      'JCI hospital',
    ],
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

  // Hospital/LocalBusiness Schema with enhanced details
  const hospitalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: hospital.name_en,
    alternateName: hospital.name_ar,
    description: hospital.description_en,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hospital.address,
      addressLocality: hospital.city,
      addressCountry: hospital.country,
    },
    availableLanguage: hospital.languagesSupported,
    url: `https://shifaalhind.com/${locale}/hospitals/${slug}`,
    ...(hospital.accreditations.length > 0 && {
      accreditationId: hospital.accreditations,
    }),
    ...(hospital._count.doctors > 0 && {
      employees: {
        '@type': 'QuantitativeValue',
        value: hospital._count.doctors,
        unitText: 'medical professionals',
      },
    }),
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
        name: 'Hospitals',
        item: `https://shifaalhind.com/${locale}/hospitals`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: hospital.name_en,
        item: `https://shifaalhind.com/${locale}/hospitals/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Hospital Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HospitalDetailClient hospital={hospital} treatments={treatments} locale={locale} />
    </>
  );
}
