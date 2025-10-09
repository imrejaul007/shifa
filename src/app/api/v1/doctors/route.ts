import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET all doctors
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hospitalId = searchParams.get('hospitalId');
    const specialty = searchParams.get('specialty');
    const published = searchParams.get('published') !== 'false';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = published
      ? { published: true, isArchived: false }
      : { isArchived: false };

    if (hospitalId) {
      where.hospitalId = hospitalId;
    }

    if (specialty) {
      where.specialties = {
        has: specialty,
      };
    }

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        include: {
          hospital: {
            select: {
              id: true,
              slug: true,
              name_en: true,
              name_ar: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.doctor.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: doctors,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

// POST create new doctor (admin only)
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

    const doctor = await prisma.doctor.create({
      data: {
        hospitalId: body.hospitalId,
        slug: body.slug,
        name_en: body.name_en,
        name_ar: body.name_ar,
        bio_en: body.bio_en,
        bio_ar: body.bio_ar,
        qualifications: body.qualifications || [],
        specialties: body.specialties || [],
        languages: body.languages || [],
        profileImage: body.profileImage,
        consultationFee: body.consultationFee,
        currency: body.currency || 'USD',
        telemedicineAvailable: body.telemedicineAvailable ?? true,
        seoTitle_en: body.seoTitle_en,
        seoDesc_en: body.seoDesc_en,
        seoTitle_ar: body.seoTitle_ar,
        seoDesc_ar: body.seoDesc_ar,
        published: body.published || false,
      },
    });

    return NextResponse.json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create doctor' },
      { status: 500 }
    );
  }
}
