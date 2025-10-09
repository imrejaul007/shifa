import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET all packages
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published') !== 'false';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where = published ? { published: true, isArchived: false } : { isArchived: false };

    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.package.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: packages,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

// POST create new package (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const pkg = await prisma.package.create({
      data: {
        slug: body.slug,
        name_en: body.name_en,
        name_ar: body.name_ar,
        description_en: body.description_en,
        description_ar: body.description_ar,
        price: body.price,
        currency: body.currency || 'USD',
        features: body.features,
        published: body.published || false,
      },
    });

    return NextResponse.json({
      success: true,
      data: pkg,
    });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create package' },
      { status: 500 }
    );
  }
}
