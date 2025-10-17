import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateFullMetadata, generateBlogPostSchema, seoKeywords } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import BlogPostClient from './BlogPostClient';

// Force dynamic rendering to prevent SSR errors
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

// DISABLED: Commenting out to prevent runtime database errors
// export async function generateStaticParams() {
//   try {
//     const posts = await prisma.contentPage.findMany({
//       take: 10,
//       where: { type: 'blog', published: true, isArchived: false },
//       select: { slug: true },
//     });
//     const locales = ['en', 'ar'];
//     const params = [];
//     for (const locale of locales) {
//       for (const post of posts) {
//         params.push({ locale, slug: post.slug });
//       }
//     }
//     return params;
//   } catch {
//     console.warn('Database not available during build, skipping static generation');
//     return [];
//   }
// }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const post = await prisma.contentPage.findUnique({
    where: { slug },
    select: {
      title_en: true,
      title_ar: true,
      excerpt_en: true,
      excerpt_ar: true,
      seoTitle_en: true,
      seoDesc_en: true,
      seoTitle_ar: true,
      seoDesc_ar: true,
      publishedAt: true,
      updatedAt: true,
      featuredImage: true,
    },
  });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const isArabic = locale === 'ar';
  const title = isArabic ? post.seoTitle_ar || post.title_ar : post.seoTitle_en || post.title_en;
  const description =
    (isArabic ? post.seoDesc_ar || post.excerpt_ar : post.seoDesc_en || post.excerpt_en) || '';

  // Extract keywords based on slug patterns
  const blogKeywords = getBlogKeywords(slug);

  return generateFullMetadata({
    title,
    description,
    keywords: blogKeywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/blog/${slug}`,
    ogImage: post.featuredImage || undefined,
    ogType: 'article',
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    author: 'Shifa AlHind Editorial Team',
  });
}

// Helper function to extract relevant keywords from blog slug
function getBlogKeywords(slug: string): string[] {
  const baseKeywords = [
    'medical tourism blog',
    'India healthcare guide',
    'GCC patients India',
    'medical treatment information',
  ];

  // Map common blog topics to relevant keywords
  if (slug.includes('cost') || slug.includes('price')) {
    return [
      ...baseKeywords,
      'medical treatment cost India',
      'affordable healthcare India',
      'surgery cost comparison',
    ];
  }
  if (slug.includes('ivf') || slug.includes('fertility')) {
    return [...baseKeywords, ...seoKeywords.treatments.ivf];
  }
  if (slug.includes('heart') || slug.includes('cardiac')) {
    return [...baseKeywords, ...seoKeywords.treatments.heart];
  }
  if (slug.includes('knee') || slug.includes('joint')) {
    return [...baseKeywords, ...seoKeywords.treatments.knee];
  }
  if (slug.includes('cancer') || slug.includes('oncology')) {
    return [...baseKeywords, ...seoKeywords.treatments.cancer];
  }
  if (slug.includes('transplant')) {
    return [...baseKeywords, ...seoKeywords.treatments.transplant];
  }
  if (slug.includes('dental')) {
    return [...baseKeywords, ...seoKeywords.treatments.dental];
  }
  if (slug.includes('cosmetic') || slug.includes('plastic')) {
    return [...baseKeywords, ...seoKeywords.treatments.cosmetic];
  }
  if (slug.includes('visa') || slug.includes('travel')) {
    return [...baseKeywords, ...seoKeywords.travel];
  }

  return baseKeywords;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const post = await prisma.contentPage.findUnique({
    where: { slug },
  });

  if (!post || !post.published || post.type !== 'blog') {
    notFound();
  }

  // Fetch related posts
  const relatedPosts = await prisma.contentPage.findMany({
    where: {
      type: 'blog',
      published: true,
      isArchived: false,
      id: { not: post.id },
    },
    select: {
      slug: true,
      title_en: true,
      title_ar: true,
      excerpt_en: true,
      excerpt_ar: true,
      featuredImage: true,
      publishedAt: true,
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  // Generate BlogPosting Schema using SEO helper
  const blogSchema = generateBlogPostSchema({
    headline: locale === 'ar' ? post.title_ar : post.title_en,
    description: (locale === 'ar' ? post.excerpt_ar : post.excerpt_en) || '',
    author: post.author || 'Shifa AlHind Editorial Team',
    publishedDate: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    modifiedDate: post.updatedAt.toISOString(),
    image: post.featuredImage || 'https://shifaalhind.com/og-image.jpg',
    url: `https://shifaalhind.com/${locale}/blog/${slug}`,
  });

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: '/' },
    { name: locale === 'ar' ? 'المدونة' : 'Blog', url: '/blog' },
    { name: locale === 'ar' ? post.title_ar : post.title_en, url: `/blog/${slug}` },
  ];

  return (
    <>
      {/* Breadcrumb with JSON-LD Schema */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <BlogPostClient post={post} relatedPosts={relatedPosts} locale={locale} />
    </>
  );
}
