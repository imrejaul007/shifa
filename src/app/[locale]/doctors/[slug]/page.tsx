import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateFullMetadata } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
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

  const isArabic = locale === 'ar';
  const primarySpecialty = doctor.specialties[0] || 'Medical Specialist';

  const title = isArabic
    ? doctor.seoTitle_ar || `${doctor.name_ar} - ${primarySpecialty} في بنغالور`
    : doctor.seoTitle_en || `${doctor.name_en} - ${primarySpecialty} in Bangalore, India`;

  const description = isArabic
    ? doctor.seoDesc_ar ||
      `${doctor.name_ar}: ${primarySpecialty} في بنغالور. ${doctor.bio_ar.substring(0, 120)} دعم عربي كامل.`
    : doctor.seoDesc_en ||
      `${doctor.name_en}: Experienced ${primarySpecialty} in Bangalore. ${doctor.bio_en.substring(0, 100)} Arabic support available.`;

  const keywords = [
    doctor.name_en,
    ...doctor.specialties,
    'doctor Bangalore India',
    'medical specialist Bangalore',
    'Arabic speaking doctor India',
    'GCC patients doctor',
    'international patient care',
    `${primarySpecialty} Bangalore`,
    'JCI hospital doctors',
  ];

  return generateFullMetadata({
    title,
    description,
    keywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/doctors/${slug}`,
    ogType: 'website',
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

  // Generate Physician/MedicalDoctor Schema
  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name_en,
    alternateName: doctor.name_ar,
    description: doctor.bio_en,
    medicalSpecialty: doctor.specialties,
    worksFor: {
      '@type': 'Hospital',
      name: doctor.hospital.name_en,
      alternateName: doctor.hospital.name_ar,
      url: `https://shifaalhind.com/${locale}/hospitals/${doctor.hospital.slug}`,
    },
    availableLanguage: doctor.languages,
    knowsLanguage: doctor.languages,
    ...(doctor.qualifications.length > 0 && {
      hasCredential: doctor.qualifications.map((qual) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: qual,
      })),
    }),
  };

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: locale === 'ar' ? 'الأطباء' : 'Doctors', url: '/doctors' },
    { name: locale === 'ar' ? doctor.name_ar : doctor.name_en, url: `/doctors/${slug}` },
  ];

  return (
    <>
      {/* Breadcrumb with JSON-LD Schema */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* Physician Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />

      <DoctorProfileClient doctor={doctor} relatedDoctors={relatedDoctors} locale={locale} />
    </>
  );
}
