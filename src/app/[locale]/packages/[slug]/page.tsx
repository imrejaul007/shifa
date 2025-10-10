import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateFullMetadata } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
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

  const isArabic = locale === 'ar';
  const priceText = pkg.price
    ? `${pkg.currency} ${pkg.price.toLocaleString()}`
    : 'Competitive pricing';

  const title = isArabic
    ? `${pkg.name_ar} - باقة شاملة للعلاج في الهند`
    : `${pkg.name_en} - Complete Medical Tourism Package India`;

  const description = isArabic
    ? `${pkg.name_ar}: باقة شاملة للعلاج في الهند. السعر: ${priceText}. تشمل الاستشارة والعلاج والإقامة ودعم عربي كامل.`
    : `${pkg.name_en}: All-inclusive medical tourism package in India. Price: ${priceText}. Includes consultation, treatment, accommodation, and complete Arabic support for GCC patients.`;

  const keywords = [
    pkg.name_en,
    'medical tourism package India',
    'all-inclusive healthcare package',
    'medical travel package GCC',
    'India treatment package',
    'comprehensive medical care India',
    'hospital package Bangalore',
    'medical tourism GCC to India',
    'Arabic support medical package',
    'affordable medical package India',
  ];

  return generateFullMetadata({
    title,
    description,
    keywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/packages/${slug}`,
    ogType: 'website',
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

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: locale === 'ar' ? 'الباقات' : 'Packages', url: '/packages' },
    { name: locale === 'ar' ? pkg.name_ar : pkg.name_en, url: `/packages/${slug}` },
  ];

  return (
    <>
      {/* Breadcrumb with JSON-LD Schema */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PackageDetailClient pkg={pkg} otherPackages={allPackages} locale={locale} />
    </>
  );
}
