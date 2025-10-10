/**
 * Enhanced Sitemap for Shifa AlHind
 * Includes hreflang alternates, comprehensive page coverage, and optimized SEO metadata
 */

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shifaalhind.com';
  const locales = ['en', 'ar'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Static pages with priority levels
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/treatments', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/doctors', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/hospitals', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/packages', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFreq: 'daily' as const },
    { path: '/stories', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/faq', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/consultation', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/booking', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/terms-and-conditions', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/refund-policy', priority: 0.3, changeFreq: 'yearly' as const },
  ];

  // Add static pages for both locales with hreflang alternates
  for (const page of staticPages) {
    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page.path}`,
            ar: `${baseUrl}/ar${page.path}`,
          },
        },
      });
    }
  }

  // Service-specific pages
  const servicePages = [
    'visa-assistance',
    'airport-pickup',
    'accommodation',
    'medical-translation',
    'post-treatment-care',
  ];

  for (const service of servicePages) {
    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/services/${service}`,
            ar: `${baseUrl}/ar/services/${service}`,
          },
        },
      });
    }
  }

  // Dynamic treatment pages
  try {
    const treatments = await prisma.treatment.findMany({
      where: { published: true, isArchived: false },
      select: { slug: true, updatedAt: true },
    });

    for (const treatment of treatments) {
      for (const locale of locales) {
        sitemap.push({
          url: `${baseUrl}/${locale}/treatments/${treatment.slug}`,
          lastModified: treatment.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.9,
          alternates: {
            languages: {
              en: `${baseUrl}/en/treatments/${treatment.slug}`,
              ar: `${baseUrl}/ar/treatments/${treatment.slug}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error('Error fetching treatments for sitemap:', error);
  }

  // Dynamic doctor pages
  try {
    const doctors = await prisma.doctor.findMany({
      where: { published: true, isArchived: false },
      select: { slug: true, updatedAt: true },
    });

    for (const doctor of doctors) {
      for (const locale of locales) {
        sitemap.push({
          url: `${baseUrl}/${locale}/doctors/${doctor.slug}`,
          lastModified: doctor.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              en: `${baseUrl}/en/doctors/${doctor.slug}`,
              ar: `${baseUrl}/ar/doctors/${doctor.slug}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error('Error fetching doctors for sitemap:', error);
  }

  // Dynamic hospital pages
  try {
    const hospitals = await prisma.hospital.findMany({
      where: { published: true, isArchived: false },
      select: { slug: true, updatedAt: true },
    });

    for (const hospital of hospitals) {
      for (const locale of locales) {
        sitemap.push({
          url: `${baseUrl}/${locale}/hospitals/${hospital.slug}`,
          lastModified: hospital.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: {
              en: `${baseUrl}/en/hospitals/${hospital.slug}`,
              ar: `${baseUrl}/ar/hospitals/${hospital.slug}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error('Error fetching hospitals for sitemap:', error);
  }

  // Dynamic package pages
  try {
    const packages = await prisma.package.findMany({
      where: { published: true, isArchived: false },
      select: { slug: true, updatedAt: true },
    });

    for (const pkg of packages) {
      for (const locale of locales) {
        sitemap.push({
          url: `${baseUrl}/${locale}/packages/${pkg.slug}`,
          lastModified: pkg.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              en: `${baseUrl}/en/packages/${pkg.slug}`,
              ar: `${baseUrl}/ar/packages/${pkg.slug}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error('Error fetching packages for sitemap:', error);
  }

  // Dynamic blog posts
  try {
    const blogPosts = await prisma.contentPage.findMany({
      where: { type: 'blog', published: true, isArchived: false },
      select: { slug: true, updatedAt: true },
    });

    for (const post of blogPosts) {
      for (const locale of locales) {
        sitemap.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              en: `${baseUrl}/en/blog/${post.slug}`,
              ar: `${baseUrl}/ar/blog/${post.slug}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // GCC country-specific pages
  const gccCountries = ['uae', 'saudi-arabia', 'kuwait', 'oman', 'qatar', 'bahrain'];
  for (const country of gccCountries) {
    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}/medical-tourism/${country}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/medical-tourism/${country}`,
            ar: `${baseUrl}/ar/medical-tourism/${country}`,
          },
        },
      });
    }
  }

  return sitemap;
}
