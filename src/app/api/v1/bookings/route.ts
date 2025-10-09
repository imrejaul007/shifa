import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

// GET all bookings (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const countryOfOrigin = searchParams.get('country');
    const treatmentId = searchParams.get('treatmentId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Prisma.BookingWhereInput = { isArchived: false };

    if (status) {
      where.status = status as Prisma.BookingWhereInput['status'];
    }

    if (countryOfOrigin) {
      where.countryOfOrigin = countryOfOrigin;
    }

    if (treatmentId) {
      where.treatmentId = treatmentId;
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          treatment: {
            select: {
              id: true,
              slug: true,
              title_en: true,
              title_ar: true,
            },
          },
          hospital: {
            select: {
              id: true,
              slug: true,
              name_en: true,
              name_ar: true,
            },
          },
          doctor: {
            select: {
              id: true,
              slug: true,
              name_en: true,
              name_ar: true,
            },
          },
          package: {
            select: {
              id: true,
              slug: true,
              name_en: true,
              name_ar: true,
            },
          },
          assignedTranslator: {
            select: {
              id: true,
              languages: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: bookings,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
