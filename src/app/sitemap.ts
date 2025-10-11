/**
 * Enhanced Sitemap for Shifa AlHind
 * Includes hreflang alternates, comprehensive page coverage, and optimized SEO metadata
 */

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

// Revalidate sitemap every 24 hours to reduce database load
export const revalidate = 86400; // 24 hours
export const dynamic = 'force-static';

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
    const treatments = await Promise.race([
      prisma.treatment.findMany({
        where: { published: true, isArchived: false },
        select: { slug: true, updatedAt: true },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 5000)
      ),
    ]);

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
    // Continue without dynamic treatment pages
  }

  // Dynamic doctor pages
  try {
    const doctors = await Promise.race([
      prisma.doctor.findMany({
        where: { published: true, isArchived: false },
        select: { slug: true, updatedAt: true },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 5000)
      ),
    ]);

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
    // Continue without dynamic doctor pages
  }

  // Dynamic hospital pages
  try {
    const hospitals = await Promise.race([
      prisma.hospital.findMany({
        where: { published: true, isArchived: false },
        select: { slug: true, updatedAt: true },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 5000)
      ),
    ]);

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
    // Continue without dynamic hospital pages
  }

  // Dynamic package pages
  try {
    const packages = await Promise.race([
      prisma.package.findMany({
        where: { published: true, isArchived: false },
        select: { slug: true, updatedAt: true },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 5000)
      ),
    ]);

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
    // Continue without dynamic package pages
  }

  // Dynamic blog posts
  try {
    const blogPosts = await Promise.race([
      prisma.contentPage.findMany({
        where: { type: 'blog', published: true, isArchived: false },
        select: { slug: true, updatedAt: true },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 5000)
      ),
    ]);

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
    // Continue without dynamic blog pages
  }

  // Medical Tourism landing page
  for (const locale of locales) {
    sitemap.push({
      url: `${baseUrl}/${locale}/medical-tourism`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/medical-tourism`,
          ar: `${baseUrl}/ar/medical-tourism`,
        },
      },
    });
  }

  // GCC country-specific pages with cities and treatments
  const gccCities = [
    { country: 'saudi-arabia', cities: ['riyadh', 'jeddah'] },
    { country: 'united-arab-emirates', cities: ['dubai', 'abu-dhabi'] },
    { country: 'qatar', cities: ['doha'] },
    { country: 'oman', cities: ['muscat'] },
    { country: 'kuwait', cities: ['kuwait-city'] },
    { country: 'bahrain', cities: ['manama'] },
  ];

  const treatments = [
    'heart-surgery',
    'knee-replacement',
    'hip-replacement',
    'ivf',
    'dental-implants',
    'hair-transplant',
    'cataract-surgery',
    'oncology-treatment',
    'cosmetic-surgery',
    'bariatric-surgery',
  ];

  const articleSlugs = [
    'understanding-cabg-procedure',
    'heart-valve-replacement-guide',
    'cardiac-surgery-cost-comparison',
    'top-cardiac-hospitals-india',
    'heart-surgery-recovery-tips',
    'total-knee-replacement-guide',
    'when-do-you-need-knee-replacement',
    'knee-replacement-cost-india-vs-gcc',
    'best-orthopedic-hospitals-india',
    'knee-replacement-rehabilitation',
    'hip-replacement-surgery-explained',
    'minimally-invasive-hip-surgery',
    'hip-replacement-cost-savings-india',
    'top-hip-replacement-surgeons-india',
    'life-after-hip-replacement',
    'ivf-process-step-by-step',
    'ivf-success-rates-by-age',
    'ivf-cost-india-comprehensive-guide',
    'best-ivf-clinics-india',
    'preparing-for-ivf-treatment',
    'dental-implants-complete-guide',
    'all-on-4-dental-implants',
    'dental-implant-costs-india-vs-gcc',
    'best-dental-clinics-india',
    'dental-implant-care-maintenance',
    'fue-vs-fut-hair-transplant',
    'hair-transplant-procedure-explained',
    'hair-transplant-cost-india',
    'best-hair-transplant-clinics-india',
    'hair-transplant-recovery-timeline',
    'cataract-surgery-complete-guide',
    'premium-vs-standard-iol',
    'cataract-surgery-cost-india',
    'best-eye-hospitals-india-cataract',
    'after-cataract-surgery-care',
    'cancer-treatment-options-india',
    'immunotherapy-cancer-treatment',
    'cancer-treatment-costs-india',
    'best-cancer-hospitals-india',
    'cancer-patient-support-india',
    'cosmetic-surgery-types-costs',
    'rhinoplasty-nose-surgery-guide',
    'cosmetic-surgery-cost-comparison',
    'best-cosmetic-surgeons-india',
    'cosmetic-surgery-recovery-tips',
    'bariatric-surgery-types-explained',
    'gastric-sleeve-surgery-guide',
    'bariatric-surgery-cost-india',
    'best-bariatric-surgeons-india',
    'life-after-bariatric-surgery',
  ];

  // City pages
  for (const { country, cities } of gccCities) {
    for (const city of cities) {
      for (const locale of locales) {
        sitemap.push({
          url: `${baseUrl}/${locale}/medical-tourism/${country}/${city}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
          alternates: {
            languages: {
              en: `${baseUrl}/en/medical-tourism/${country}/${city}`,
              ar: `${baseUrl}/ar/medical-tourism/${country}/${city}`,
            },
          },
        });
      }

      // Treatment pages for each city
      for (const treatment of treatments) {
        for (const locale of locales) {
          sitemap.push({
            url: `${baseUrl}/${locale}/medical-tourism/${country}/${city}/${treatment}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
              languages: {
                en: `${baseUrl}/en/medical-tourism/${country}/${city}/${treatment}`,
                ar: `${baseUrl}/ar/medical-tourism/${country}/${city}/${treatment}`,
              },
            },
          });
        }
      }
    }
  }

  // Blog article pages (5 articles per treatment)
  const treatmentArticles: Record<string, string[]> = {
    'heart-surgery': articleSlugs.slice(0, 5),
    'knee-replacement': articleSlugs.slice(5, 10),
    'hip-replacement': articleSlugs.slice(10, 15),
    ivf: articleSlugs.slice(15, 20),
    'dental-implants': articleSlugs.slice(20, 25),
    'hair-transplant': articleSlugs.slice(25, 30),
    'cataract-surgery': articleSlugs.slice(30, 35),
    'oncology-treatment': articleSlugs.slice(35, 40),
    'cosmetic-surgery': articleSlugs.slice(40, 45),
    'bariatric-surgery': articleSlugs.slice(45, 50),
  };

  for (const { country, cities } of gccCities) {
    for (const city of cities) {
      for (const treatment of treatments) {
        const articles = treatmentArticles[treatment] || [];
        for (const article of articles) {
          for (const locale of locales) {
            sitemap.push({
              url: `${baseUrl}/${locale}/blog/${country}/${city}/${treatment}/${article}`,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: 0.7,
              alternates: {
                languages: {
                  en: `${baseUrl}/en/blog/${country}/${city}/${treatment}/${article}`,
                  ar: `${baseUrl}/ar/blog/${country}/${city}/${treatment}/${article}`,
                },
              },
            });
          }
        }
      }
    }
  }

  return sitemap;
}
