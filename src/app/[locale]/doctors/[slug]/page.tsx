import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import DoctorProfileClient from './DoctorProfileClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

// Generate static params
export async function generateStaticParams() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { published: true, isArchived: false },
      select: { slug: true },
    });

    const locales = ['en', 'ar'];
    const params = [];

    for (const locale of locales) {
      for (const doctor of doctors) {
        params.push({
          locale,
          slug: doctor.slug,
        });
      }
    }

    return params;
  } catch {
    console.warn('Database not available during build, skipping static generation');
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const doctor = await prisma.doctor.findUnique({
    where: { slug },
    select: {
      name_en: true,
      name_ar: true,
      bio_en: true,
      bio_ar: true,
      seoTitle_en: true,
      seoDesc_en: true,
      seoTitle_ar: true,
      seoDesc_ar: true,
      specialties: true,
    },
  });

  if (!doctor) {
    return { title: 'Doctor Not Found' };
  }

  const title = locale === 'ar' ? doctor.seoTitle_ar || doctor.name_ar : doctor.seoTitle_en || doctor.name_en;
  const description = locale === 'ar' ? doctor.seoDesc_ar || doctor.bio_ar.substring(0, 160) : doctor.seoDesc_en || doctor.bio_en.substring(0, 160);

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/doctors/${slug}`,
    keywords: [
      doctor.name_en,
      ...doctor.specialties,
      'doctor Bangalore',
      'medical expert India',
      'Arabic speaking doctor',
    ],
  });
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { locale, slug } = await params;

  const doctor = await prisma.doctor.findUnique({
    where: { slug },
    include: {
      hospital: {
        select: {
          id: true,
          slug: true,
          name_en: true,
          name_ar: true,
          city: true,
          accreditations: true,
        },
      },
      bookings: {
        where: { isArchived: false, status: { not: 'CANCELLED' } },
        select: { id: true },
      },
    },
  });

  if (!doctor || !doctor.published) {
    notFound();
  }

  // Fetch related doctors from same hospital
  const relatedDoctors = await prisma.doctor.findMany({
    where: {
      hospitalId: doctor.hospitalId,
      id: { not: doctor.id },
      published: true,
      isArchived: false,
    },
    select: {
      slug: true,
      name_en: true,
      name_ar: true,
      specialties: true,
      profileImage: true,
    },
    take: 3,
  });

  // Generate JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name_en,
    alternateName: doctor.name_ar,
    description: doctor.bio_en,
    medicalSpecialty: doctor.specialties,
    worksFor: {
      '@type': 'Hospital',
      name: doctor.hospital.name_en,
    },
    availableLanguage: doctor.languages,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DoctorProfileClient
        doctor={doctor}
        relatedDoctors={relatedDoctors}
        locale={locale}
      />
    </>
  );
}
