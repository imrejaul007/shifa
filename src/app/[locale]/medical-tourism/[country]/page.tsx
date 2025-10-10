import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { gccCountrySEO } from '@/lib/seo-data';
import CountryLandingClient from './CountryLandingClient';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    country: string;
  }>;
}

const countries = [
  'from-uae',
  'from-saudi-arabia',
  'from-kuwait',
  'from-oman',
  'from-qatar',
  'from-bahrain',
];

// Comment out generateStaticParams to prevent build-time pre-rendering when DB is unavailable
// Uncomment when database is available for static generation
// export async function generateStaticParams() {
//   const locales = ['en', 'ar'];
//   const params = [];

//   for (const locale of locales) {
//     for (const country of countries) {
//       params.push({ locale, country });
//     }
//   }

//   return params;
// }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country } = await params;

  // Map URL to country key
  const countryKey = country.replace('from-', '');
  const seoData = gccCountrySEO[countryKey as keyof typeof gccCountrySEO];

  if (!seoData) {
    return { title: 'Country Not Found' };
  }

  const data = seoData[locale];

  return genMeta({
    title: data.title,
    description: data.description,
    locale,
    canonical: `/${locale}/medical-tourism/${country}`,
    keywords: data.keywords,
  });
}

export default async function CountryLandingPage({ params }: PageProps) {
  const { locale, country } = await params;

  if (!countries.includes(country)) {
    notFound();
  }

  // Fetch popular treatments with error handling
  let treatments: Array<{
    slug: string;
    title_en: string;
    title_ar: string;
    summary_en: string | null;
    summary_ar: string | null;
    costMin: number | null;
    costMax: number | null;
  }> = [];
  try {
    treatments = await prisma.treatment.findMany({
      where: { published: true, isArchived: false },
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
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    console.error('Database not available during build, skipping static generation');
    console.error(error);
  }

  // Fetch hospitals with error handling
  let hospitals: Array<{
    slug: string;
    name_en: string;
    name_ar: string;
    description_en: string | null;
    description_ar: string | null;
    images: unknown;
    accreditations: string[];
  }> = [];
  try {
    hospitals = await prisma.hospital.findMany({
      where: { published: true, isArchived: false },
      select: {
        slug: true,
        name_en: true,
        name_ar: true,
        description_en: true,
        description_ar: true,
        images: true,
        accreditations: true,
      },
      take: 6,
    });
  } catch (error) {
    console.error('Database not available during build, skipping static generation');
    console.error(error);
  }

  // Fetch testimonials/bookings from this country with error handling
  const countryName = country
    .replace('from-', '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  let bookings = [];
  try {
    bookings = await prisma.booking.findMany({
      where: {
        countryOfOrigin: { contains: countryName, mode: 'insensitive' },
        status: { in: ['CONFIRMED', 'IN_TREATMENT', 'DISCHARGED'] },
        isArchived: false,
      },
      select: { id: true },
    });
  } catch (error) {
    console.error('Database not available during build, skipping static generation');
    console.error(error);
  }

  return (
    <CountryLandingClient
      country={country}
      locale={locale}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      treatments={treatments as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hospitals={hospitals as any}
      bookingCount={bookings.length}
    />
  );
}
