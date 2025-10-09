import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import BlogClient from './BlogClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ar' ? 'مدونة الصحة والعافية - شفاء الهند' : 'Health & Wellness Blog - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'اكتشف أحدث الأخبار الطبية، أدلة العلاج، ونصائح الصحة والعافية من خبرائنا. معلومات موثوقة للمرضى من دول مجلس التعاون الخليجي.'
      : 'Discover the latest medical news, treatment guides, and wellness tips from our experts. Trusted information for GCC patients seeking medical care in India.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/blog`,
    keywords: [
      'medical blog',
      'health articles India',
      'treatment guides',
      'medical tourism information',
      'wellness tips',
      'healthcare news',
      'GCC patients guide',
      'medical advice India',
    ],
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all published blog posts
  const posts = await prisma.contentPage.findMany({
    where: {
      type: 'blog',
      published: true,
      isArchived: false,
    },
    select: {
      slug: true,
      title_en: true,
      title_ar: true,
      excerpt_en: true,
      excerpt_ar: true,
      featuredImage: true,
      author: true,
      publishedAt: true,
      type: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  return <BlogClient posts={posts} locale={locale} />;
}
