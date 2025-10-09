import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import TreatmentDetailClient from './TreatmentDetailClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

// Generate static params for all published treatments
export async function generateStaticParams() {
  const treatments = await prisma.treatment.findMany({
    where: { published: true, isArchived: false },
    select: { slug: true },
  });

  const locales = ['en', 'ar'];
  const params = [];

  for (const locale of locales) {
    for (const treatment of treatments) {
      params.push({
        locale,
        slug: treatment.slug,
      });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const treatment = await prisma.treatment.findUnique({
    where: { slug },
    select: {
      title_en: true,
      title_ar: true,
      summary_en: true,
      summary_ar: true,
      seoTitle_en: true,
      seoDesc_en: true,
      seoTitle_ar: true,
      seoDesc_ar: true,
      costMin: true,
      costMax: true,
      currency: true,
    },
  });

  if (!treatment) {
    return {
      title: 'Treatment Not Found',
    };
  }

  const title = locale === 'ar' ? treatment.seoTitle_ar || treatment.title_ar : treatment.seoTitle_en || treatment.title_en;
  const description = locale === 'ar' ? treatment.seoDesc_ar || treatment.summary_ar : treatment.seoDesc_en || treatment.summary_en;

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/treatments/${slug}`,
    keywords: [
      treatment.title_en,
      treatment.title_ar,
      'medical tourism',
      'India healthcare',
      'Bangalore treatment',
      `${treatment.title_en} cost`,
      `${treatment.title_en} India`,
    ],
  });
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Fetch treatment with related data
  const treatment = await prisma.treatment.findUnique({
    where: { slug },
    include: {
      bookings: {
        where: { isArchived: false, status: { not: 'CANCELLED' } },
        select: { id: true },
      },
    },
  });

  if (!treatment || !treatment.published) {
    notFound();
  }

  // Fetch related hospitals
  const hospitals = treatment.hospitalIds.length > 0
    ? await prisma.hospital.findMany({
        where: {
          id: { in: treatment.hospitalIds },
          published: true,
          isArchived: false,
        },
        select: {
          id: true,
          slug: true,
          name_en: true,
          name_ar: true,
          accreditations: true,
          images: true,
        },
      })
    : [];

  // Fetch doctors from these hospitals
  const doctors = hospitals.length > 0
    ? await prisma.doctor.findMany({
        where: {
          hospitalId: { in: hospitals.map(h => h.id) },
          published: true,
          isArchived: false,
        },
        select: {
          id: true,
          slug: true,
          name_en: true,
          name_ar: true,
          qualifications: true,
          specialties: true,
          languages: true,
          profileImage: true,
        },
        take: 6,
      })
    : [];

  // Fetch related treatments
  const relatedTreatments = await prisma.treatment.findMany({
    where: {
      id: { not: treatment.id },
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
      currency: true,
    },
    take: 3,
  });

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.title_en,
    alternateName: treatment.title_ar,
    description: treatment.summary_en,
    offers: {
      '@type': 'Offer',
      priceRange: `${treatment.costMin}-${treatment.costMax} ${treatment.currency}`,
      priceCurrency: treatment.currency,
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Shifa AlHind',
      url: 'https://shifaalhind.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentDetailClient
        treatment={treatment}
        hospitals={hospitals}
        doctors={doctors}
        relatedTreatments={relatedTreatments}
        locale={locale}
      />
    </>
  );
}
