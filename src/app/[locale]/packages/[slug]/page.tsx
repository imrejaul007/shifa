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
  try {
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
  } catch {
    console.warn('Database not available during build, skipping static generation');
    return [];
  }
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

  // Product/MedicalPackage Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name_en,
    alternateName: pkg.name_ar,
    description: pkg.description_en,
    category: 'Medical Tourism Package',
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: pkg.currency,
      availability: 'https://schema.org/InStock',
      url: `https://shifaalhind.com/${locale}/packages/${slug}`,
      priceValidUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 months
    },
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Shifa AlHind',
      url: 'https://shifaalhind.com',
    },
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
        name: 'Packages',
        item: `https://shifaalhind.com/${locale}/packages`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pkg.name_en,
        item: `https://shifaalhind.com/${locale}/packages/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PackageDetailClient pkg={pkg} otherPackages={allPackages} locale={locale} />
    </>
  );
}
