import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  generateFullMetadata,
  generateMedicalProcedureSchema,
  seoKeywords,
} from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import TreatmentDetailClient from './TreatmentDetailClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

// Generate static params for all published treatments
export async function generateStaticParams() {
  try {
    const treatments = await prisma.treatment.findMany({
      where: { published: true, isArchived: false },
      select: { slug: true },
    });

    const locales = ['en', 'ar'];
    const params = [];

    for (const locale of locales) {
      for (const treatment of treatments) {
        params.push({
          locale,
          slug: treatment.slug,
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

  const treatment = await prisma.treatment.findUnique({
    where: { slug },
    select: {
      title_en: true,
      title_ar: true,
      summary_en: true,
      summary_ar: true,
      seoTitle_en: true,
      seoDesc_en: true,
      seoTitle_ar: true,
      seoDesc_ar: true,
      costMin: true,
      costMax: true,
      currency: true,
    },
  });

  if (!treatment) {
    return {
      title: 'Treatment Not Found',
    };
  }

  const isArabic = locale === 'ar';
  const title = isArabic
    ? treatment.seoTitle_ar || `${treatment.title_ar} في الهند - التكلفة والمستشفيات`
    : treatment.seoTitle_en || `${treatment.title_en} in India - Cost, Hospitals & Success Rates`;

  const costRange =
    treatment.costMin && treatment.costMax
      ? `$${treatment.costMin.toLocaleString()}-$${treatment.costMax.toLocaleString()}`
      : 'Affordable pricing';

  const description = isArabic
    ? treatment.seoDesc_ar ||
      `${treatment.title_ar} في الهند: وفر 60-70٪ مع مستشفيات JCI عالمية المستوى. التكلفة: ${costRange}. دعم عربي كامل لمرضى الخليج.`
    : treatment.seoDesc_en ||
      `${treatment.title_en} in India: Save 60-70% with world-class JCI hospitals. Cost: ${costRange}. Complete Arabic support for GCC patients.`;

  // Get treatment-specific keywords
  const treatmentKeywords = getTreatmentKeywords(slug);

  return generateFullMetadata({
    title,
    description,
    keywords: treatmentKeywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/treatments/${slug}`,
    ogType: 'article',
  });
}

// Helper function to get treatment-specific keywords
function getTreatmentKeywords(slug: string): string[] {
  const baseKeywords = [
    'medical tourism India',
    'GCC patients India',
    'affordable treatment India',
    'JCI hospitals Bangalore',
    'Arabic support hospitals',
  ];

  // Map slugs to keyword categories
  const keywordMap: Record<string, string[]> = {
    'ivf-fertility': seoKeywords.treatments.ivf,
    'heart-surgery': seoKeywords.treatments.heart,
    'joint-replacement': seoKeywords.treatments.knee,
    'cancer-treatment': seoKeywords.treatments.cancer,
    'organ-transplant': seoKeywords.treatments.transplant,
    'cosmetic-surgery': seoKeywords.treatments.cosmetic,
    'dental-implants': seoKeywords.treatments.dental,
  };

  return [...baseKeywords, ...(keywordMap[slug] || [])];
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Fetch treatment with related data
  const treatment = await prisma.treatment.findUnique({
    where: { slug },
    include: {
      bookings: {
        where: { isArchived: false, status: { not: 'CANCELLED' } },
        select: { id: true },
      },
    },
  });

  if (!treatment || !treatment.published) {
    notFound();
  }

  // Fetch related hospitals
  const hospitals =
    treatment.hospitalIds.length > 0
      ? await prisma.hospital.findMany({
          where: {
            id: { in: treatment.hospitalIds },
            published: true,
            isArchived: false,
          },
          select: {
            id: true,
            slug: true,
            name_en: true,
            name_ar: true,
            accreditations: true,
            images: true,
          },
        })
      : [];

  // Fetch doctors from these hospitals
  const doctors =
    hospitals.length > 0
      ? await prisma.doctor.findMany({
          where: {
            hospitalId: { in: hospitals.map((h) => h.id) },
            published: true,
            isArchived: false,
          },
          select: {
            id: true,
            slug: true,
            name_en: true,
            name_ar: true,
            qualifications: true,
            specialties: true,
            languages: true,
            profileImage: true,
          },
          take: 6,
        })
      : [];

  // Fetch related treatments
  const relatedTreatments = await prisma.treatment.findMany({
    where: {
      id: { not: treatment.id },
      published: true,
      isArchived: false,
    },
    select: {
      id: true,
      slug: true,
      title_en: true,
      title_ar: true,
      summary_en: true,
      summary_ar: true,
      costMin: true,
      costMax: true,
      currency: true,
      bookings: {
        where: { isArchived: false },
        select: { id: true },
      },
    },
    take: 3,
  });

  // Generate JSON-LD structured data for MedicalProcedure using SEO helper
  const medicalProcedureSchema = generateMedicalProcedureSchema({
    name: treatment.title_en,
    description: treatment.summary_en || '',
    procedureType: 'Medical Treatment',
    cost:
      treatment.costMin && treatment.costMax
        ? {
            minPrice: treatment.costMin,
            maxPrice: treatment.costMax,
            currency: treatment.currency || 'USD',
          }
        : undefined,
  });

  // Generate FAQ schema if FAQ data exists
  let faqSchema = null;
  if (treatment.faq && Array.isArray(treatment.faq) && treatment.faq.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: treatment.faq.map((item: unknown) => {
        const faqItem = item as Record<string, unknown>;
        return {
          '@type': 'Question',
          name: String(faqItem.q_en || faqItem.question || ''),
          acceptedAnswer: {
            '@type': 'Answer',
            text: String(faqItem.a_en || faqItem.answer || ''),
          },
        };
      }),
    };
  }

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: locale === 'ar' ? 'العلاجات' : 'Treatments', url: '/treatments' },
    { name: locale === 'ar' ? treatment.title_ar : treatment.title_en, url: `/treatments/${slug}` },
  ];

  return (
    <>
      {/* Breadcrumb with JSON-LD Schema */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* MedicalProcedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <TreatmentDetailClient
        treatment={treatment}
        hospitals={hospitals}
        doctors={doctors}
        relatedTreatments={relatedTreatments}
        locale={locale}
      />
    </>
  );
}
