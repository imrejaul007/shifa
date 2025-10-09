import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import PackageDetailClient from './PackageDetailClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const packages = await prisma.package.findMany({
    where: { published: true, isArchived: false },
    select: { slug: true },
  });

  const locales = ['en', 'ar'];
  const params = [];

  for (const locale of locales) {
    for (const pkg of packages) {
      params.push({ locale, slug: pkg.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const pkg = await prisma.package.findUnique({
    where: { slug },
    select: {
      name_en: true,
      name_ar: true,
      description_en: true,
      description_ar: true,
      price: true,
      currency: true,
    },
  });

  if (!pkg) {
    return { title: 'Package Not Found' };
  }

  const title = locale === 'ar' ? `${pkg.name_ar} - شفاء الهند` : `${pkg.name_en} - Shifa AlHind`;
  const description = locale === 'ar' ? pkg.description_ar : pkg.description_en;

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/packages/${slug}`,
    keywords: [
      'medical tourism package',
      'India healthcare package',
      'all-inclusive medical care',
      'GCC patients India',
    ],
  });
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const pkg = await prisma.package.findUnique({
    where: { slug },
    include: {
      bookings: {
        where: { isArchived: false },
        select: { id: true },
      },
    },
  });

  if (!pkg || !pkg.published) {
    notFound();
  }

  // Fetch all packages for comparison
  const allPackages = await prisma.package.findMany({
    where: {
      published: true,
      isArchived: false,
      id: { not: pkg.id },
    },
    select: {
      slug: true,
      name_en: true,
      name_ar: true,
      description_en: true,
      description_ar: true,
      price: true,
      currency: true,
    },
    take: 2,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name_en,
    description: pkg.description_en,
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: pkg.currency,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PackageDetailClient pkg={pkg} otherPackages={allPackages} locale={locale} />
    </>
  );
}
