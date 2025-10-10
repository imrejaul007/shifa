/**
 * RSS Feed for Shifa AlHind Blog
 * Provides syndication for blog posts in both English and Arabic
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shifaalhind.com';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  let blogPosts: Array<{
    slug: string;
    title_en: string;
    title_ar: string;
    seoDesc_en: string | null;
    seoDesc_ar: string | null;
    excerpt_en: string | null;
    excerpt_ar: string | null;
    createdAt: Date;
    updatedAt: Date;
  }> = [];

  try {
    blogPosts = await prisma.contentPage.findMany({
      where: {
        type: 'blog',
        published: true,
        isArchived: false,
      },
      select: {
        slug: true,
        title_en: true,
        title_ar: true,
        seoDesc_en: true,
        seoDesc_ar: true,
        excerpt_en: true,
        excerpt_ar: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 most recent posts
    });
  } catch (error) {
    console.error('Error fetching blog posts for RSS:', error);
    // Return empty RSS feed if database unavailable
    blogPosts = [];
  }

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Shifa AlHind Medical Tourism Blog</title>
    <link>${baseUrl}/en/blog</link>
    <description>Expert insights on medical tourism from GCC to India. Comprehensive guides on treatments, costs, hospitals, and patient success stories.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Shifa AlHind Medical Tourism</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Shifa AlHind Medical Tourism</copyright>
    <managingEditor>contact@shifaalhind.com (Shifa AlHind Editorial Team)</managingEditor>
    <webMaster>contact@shifaalhind.com (Shifa AlHind Web Team)</webMaster>
    <category>Medical Tourism</category>
    <category>Healthcare</category>
    <category>Medical Treatment</category>
    <ttl>1440</ttl>
${blogPosts
  .map((post) => {
    const title = escapeXml(post.title_en);
    const description = escapeXml(
      post.seoDesc_en || post.excerpt_en || 'Medical tourism blog post from Shifa AlHind'
    );
    const contentPreview = escapeXml(
      post.excerpt_en || post.seoDesc_en || 'Read our latest insights on medical tourism'
    );
    const link = `${baseUrl}/en/blog/${post.slug}`;
    const pubDate = new Date(post.createdAt).toUTCString();
    const guid = `${baseUrl}/en/blog/${post.slug}`;

    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <description>${description}</description>
      <content:encoded><![CDATA[${contentPreview}... <a href="${link}">Read more</a>]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>Shifa AlHind Editorial Team</dc:creator>
      <category>Medical Tourism</category>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
