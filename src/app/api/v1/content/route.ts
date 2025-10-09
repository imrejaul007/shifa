import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET content pages (blog posts, static pages, FAQs)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'page';
    const published = searchParams.get('published') !== 'false';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: {
      type: string;
      published?: boolean;
      isArchived: boolean;
    } = { type, isArchived: false };

    if (published) {
      where.published = true;
    }

    const [pages, total] = await Promise.all([
      prisma.contentPage.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      prisma.contentPage.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: pages,
      meta: {
        total,
        limit,
        offset,
        type,
      },
    });
  } catch (error) {
    console.error('Error fetching content pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content pages' },
      { status: 500 }
    );
  }
}

// POST create new content page (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const page = await prisma.contentPage.create({
      data: {
        slug: body.slug,
        type: body.type || 'page',
        title_en: body.title_en,
        title_ar: body.title_ar,
        excerpt_en: body.excerpt_en,
        excerpt_ar: body.excerpt_ar,
        blocks_en: body.blocks_en,
        blocks_ar: body.blocks_ar,
        featuredImage: body.featuredImage,
        author: body.author || session.user.name,
        seoTitle_en: body.seoTitle_en,
        seoDesc_en: body.seoDesc_en,
        seoTitle_ar: body.seoTitle_ar,
        seoDesc_ar: body.seoDesc_ar,
        published: body.published || false,
        publishedAt: body.published ? new Date() : null,
        scheduledFor: body.scheduledFor,
      },
    });

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error creating content page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create content page' },
      { status: 500 }
    );
  }
}
