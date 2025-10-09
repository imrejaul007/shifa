import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET single hospital by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const hospital = await prisma.hospital.findUnique({
      where: { slug },
      include: {
        doctors: {
          where: { published: true, isArchived: false },
        },
        bookings: {
          where: { isArchived: false },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!hospital) {
      return NextResponse.json(
        { success: false, error: 'Hospital not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error('Error fetching hospital:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hospital' },
      { status: 500 }
    );
  }
}

// PATCH update hospital (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const body = await request.json();

    const hospital = await prisma.hospital.update({
      where: { slug },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error('Error updating hospital:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update hospital' },
      { status: 500 }
    );
  }
}

// DELETE hospital (admin only - soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = await params;

    const hospital = await prisma.hospital.update({
      where: { slug },
      data: { isArchived: true },
    });

    return NextResponse.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error('Error deleting hospital:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete hospital' },
      { status: 500 }
    );
  }
}
