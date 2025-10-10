import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { generateFullMetadata, seoKeywords } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import TreatmentsClient from './TreatmentsClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const title = isArabic
    ? 'جميع العلاجات الطبية في الهند - أسعار معقولة 60-70% أقل'
    : 'All Medical Treatments in India - Save 60-70% on Healthcare';

  const description = isArabic
    ? 'اكتشف مجموعة واسعة من العلاجات الطبية المتخصصة في أفضل مستشفيات JCI في بنغالور، الهند. جراحة القلب، استبدال المفاصل، علاج السرطان، IVF، زراعة الأعضاء، وأكثر من ذلك بأسعار معقولة 60-70٪ أقل مع دعم عربي كامل للمرضى من دول الخليج.'
    : 'Explore a comprehensive range of specialized medical treatments at top JCI hospitals in Bangalore, India. Cardiac surgery, joint replacement, cancer treatment, IVF, organ transplants, and more at 60-70% lower costs with complete Arabic support for GCC patients.';

  const keywords = [
    ...seoKeywords.homepage,
    'medical treatments India',
    'Bangalore hospitals treatments',
    'affordable surgery India',
    'specialized medical care India',
    'all treatments India hospitals',
    'comprehensive healthcare India',
  ];

  return generateFullMetadata({
    title,
    description,
    keywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/treatments`,
    ogType: 'website',
  });
}

export default async function TreatmentsPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all published treatments with error handling
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
      where: {
        published: true,
        isArchived: false,
      },
      select: {
        slug: true,
        title_en: true,
        title_ar: true,
        summary_en: true,
        summary_ar: true,
        costMin: true,
        costMax: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Database not available during build, skipping static generation');
    console.error(error);
  }

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: locale === 'ar' ? 'العلاجات' : 'Treatments', url: '/treatments' },
  ];

  return (
    <>
      {/* Breadcrumb with JSON-LD Schema */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      <TreatmentsClient treatments={treatments} locale={locale} />
    </>
  );
}
