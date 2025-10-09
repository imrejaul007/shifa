import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { gccCountrySEO } from '@/lib/seo-data';
import CountryLandingClient from './CountryLandingClient';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    country: string;
  }>;
}

const countries = ['from-uae', 'from-saudi-arabia', 'from-kuwait', 'from-oman', 'from-qatar', 'from-bahrain'];

export async function generateStaticParams() {
  const locales = ['en', 'ar'];
  const params = [];

  for (const locale of locales) {
    for (const country of countries) {
      params.push({ locale, country });
    }
  }

  return params;
}

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

  // Fetch popular treatments
  const treatments = await prisma.treatment.findMany({
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

  // Fetch hospitals
  const hospitals = await prisma.hospital.findMany({
    where: { published: true, isArchived: false },
    select: {
      slug: true,
      name_en: true,
      name_ar: true,
      accreditations: true,
    },
    take: 6,
  });

  // Fetch testimonials/bookings from this country
  const countryName = country
    .replace('from-', '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const bookings = await prisma.booking.findMany({
    where: {
      countryOfOrigin: { contains: countryName, mode: 'insensitive' },
      status: { in: ['CONFIRMED', 'IN_TREATMENT', 'DISCHARGED'] },
      isArchived: false,
    },
    select: { id: true },
  });

  return (
    <CountryLandingClient
      country={country}
      locale={locale}
      treatments={treatments}
      hospitals={hospitals}
      bookingCount={bookings.length}
    />
  );
}
