/**
 * Arabic RSS Feed for Shifa AlHind Blog
 * Provides syndication for Arabic blog posts
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
    console.error('Error fetching blog posts for Arabic RSS:', error);
    blogPosts = [];
  }

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>مدونة شفاء الهند للسياحة العلاجية</title>
    <link>${baseUrl}/ar/blog</link>
    <description>رؤى خبراء حول السياحة العلاجية من دول الخليج إلى الهند. أدلة شاملة حول العلاجات والتكاليف والمستشفيات وقصص نجاح المرضى.</description>
    <language>ar</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss-ar.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>شفاء الهند للسياحة العلاجية</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>حقوق النشر ${new Date().getFullYear()} شفاء الهند للسياحة العلاجية</copyright>
    <managingEditor>contact@shifaalhind.com (فريق التحرير - شفاء الهند)</managingEditor>
    <webMaster>contact@shifaalhind.com (فريق الويب - شفاء الهند)</webMaster>
    <category>السياحة العلاجية</category>
    <category>الرعاية الصحية</category>
    <category>العلاج الطبي</category>
    <ttl>1440</ttl>
${blogPosts
  .map((post) => {
    const title = escapeXml(post.title_ar || post.title_en);
    const description = escapeXml(
      post.seoDesc_ar ||
        post.excerpt_ar ||
        post.seoDesc_en ||
        post.excerpt_en ||
        'مقالة سياحة علاجية من شفاء الهند'
    );
    const contentPreview = escapeXml(
      post.excerpt_ar || post.seoDesc_ar || post.excerpt_en || 'اقرأ أحدث رؤى السياحة العلاجية'
    );
    const link = `${baseUrl}/ar/blog/${post.slug}`;
    const pubDate = new Date(post.createdAt).toUTCString();
    const guid = `${baseUrl}/ar/blog/${post.slug}`;

    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <description>${description}</description>
      <content:encoded><![CDATA[${contentPreview}... <a href="${link}">اقرأ المزيد</a>]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>فريق التحرير - شفاء الهند</dc:creator>
      <category>السياحة العلاجية</category>
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
