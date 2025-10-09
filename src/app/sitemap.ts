import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shifaalhind.com';
  const locales = ['en', 'ar'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/treatments',
    '/doctors',
    '/hospitals',
    '/packages',
    '/services',
    '/blog',
    '/stories',
    '/faq',
    '/contact',
    '/consultation',
    '/booking',
  ];

  // Add static pages for both locales
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' || page === '/blog' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
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
          priority: 0.7,
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
          priority: 0.6,
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
        url: `${baseUrl}/${locale}/medical-tourism/from-${country}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return sitemap;
}
