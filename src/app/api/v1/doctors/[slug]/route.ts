import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET single doctor by slug
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const doctor = await prisma.doctor.findUnique({
      where: { slug },
      include: {
        hospital: true,
        bookings: {
          where: { isArchived: false },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!doctor) {
      return NextResponse.json({ success: false, error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch doctor' }, { status: 500 });
  }
}

// PATCH update doctor (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();

    if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    const doctor = await prisma.doctor.update({
      where: { slug },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json({ success: false, error: 'Failed to update doctor' }, { status: 500 });
  }
}

// DELETE doctor (admin only - soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;

    const doctor = await prisma.doctor.update({
      where: { slug },
      data: { isArchived: true },
    });

    return NextResponse.json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete doctor' }, { status: 500 });
  }
}
