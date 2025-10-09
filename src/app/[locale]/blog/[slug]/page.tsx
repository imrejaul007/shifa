import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
  const posts = await prisma.contentPage.findMany({
    where: { type: 'blog', published: true, isArchived: false },
    select: { slug: true },
  });

  const locales = ['en', 'ar'];
  const params = [];

  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
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
      featuredImage: true,
    },
  });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = locale === 'ar' ? post.seoTitle_ar || post.title_ar : post.seoTitle_en || post.title_en;
  const description = locale === 'ar' ? post.seoDesc_ar || post.excerpt_ar : post.seoDesc_en || post.excerpt_en;

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/blog/${slug}`,
    ogImage: post.featuredImage || undefined,
    keywords: [
      'medical tourism',
      'India healthcare',
      'GCC patients',
      'Bangalore hospitals',
      'medical travel',
    ],
  });
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

  // JSON-LD for Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: locale === 'ar' ? post.title_ar : post.title_en,
    description: locale === 'ar' ? post.excerpt_ar : post.excerpt_en,
    image: post.featuredImage,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author || 'Shifa AlHind Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shifa AlHind',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shifaalhind.com/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} locale={locale} />
    </>
  );
}
