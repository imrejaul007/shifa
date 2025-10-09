import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET all treatments (public or admin)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'en';
    const published = searchParams.get('published') !== 'false';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where = published
      ? { published: true, isArchived: false }
      : { isArchived: false };

    const [treatments, total] = await Promise.all([
      prisma.treatment.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.treatment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: treatments,
      meta: {
        total,
        limit,
        offset,
        locale,
      },
    });
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch treatments' },
      { status: 500 }
    );
  }
}

// POST create new treatment (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const treatment = await prisma.treatment.create({
      data: {
        slug: body.slug,
        title_en: body.title_en,
        title_ar: body.title_ar,
        summary_en: body.summary_en,
        summary_ar: body.summary_ar,
        contentBlocks_en: body.contentBlocks_en,
        contentBlocks_ar: body.contentBlocks_ar,
        costMin: body.costMin,
        costMax: body.costMax,
        currency: body.currency || 'USD',
        faq: body.faq,
        hospitalIds: body.hospitalIds || [],
        seoTitle_en: body.seoTitle_en,
        seoDesc_en: body.seoDesc_en,
        seoTitle_ar: body.seoTitle_ar,
        seoDesc_ar: body.seoDesc_ar,
        published: body.published || false,
      },
    });

    return NextResponse.json({
      success: true,
      data: treatment,
    });
  } catch (error) {
    console.error('Error creating treatment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create treatment' },
      { status: 500 }
    );
  }
}
