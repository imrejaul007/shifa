import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET all hospitals
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const published = searchParams.get('published') !== 'false';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = published
      ? { published: true, isArchived: false }
      : { isArchived: false };

    if (city) {
      where.city = city;
    }

    const [hospitals, total] = await Promise.all([
      prisma.hospital.findMany({
        where,
        include: {
          doctors: {
            where: { published: true, isArchived: false },
            take: 5,
          },
          _count: {
            select: {
              doctors: true,
              bookings: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.hospital.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: hospitals,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hospitals' },
      { status: 500 }
    );
  }
}

// POST create new hospital (admin only)
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

    const hospital = await prisma.hospital.create({
      data: {
        slug: body.slug,
        name_en: body.name_en,
        name_ar: body.name_ar,
        description_en: body.description_en,
        description_ar: body.description_ar,
        address: body.address,
        city: body.city,
        country: body.country || 'India',
        accreditations: body.accreditations || [],
        languagesSupported: body.languagesSupported || [],
        images: body.images,
        seoTitle_en: body.seoTitle_en,
        seoDesc_en: body.seoDesc_en,
        seoTitle_ar: body.seoTitle_ar,
        seoDesc_ar: body.seoDesc_ar,
        published: body.published || false,
      },
    });

    return NextResponse.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error('Error creating hospital:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create hospital' },
      { status: 500 }
    );
  }
}
