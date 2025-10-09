import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET single treatment by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const treatment = await prisma.treatment.findUnique({
      where: { slug },
      include: {
        bookings: {
          where: { isArchived: false },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!treatment) {
      return NextResponse.json(
        { success: false, error: 'Treatment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: treatment,
    });
  } catch (error) {
    console.error('Error fetching treatment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch treatment' },
      { status: 500 }
    );
  }
}

// PATCH update treatment (admin only)
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

    const treatment = await prisma.treatment.update({
      where: { slug },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: treatment,
    });
  } catch (error) {
    console.error('Error updating treatment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update treatment' },
      { status: 500 }
    );
  }
}

// DELETE treatment (admin only - soft delete)
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

    const treatment = await prisma.treatment.update({
      where: { slug },
      data: { isArchived: true },
    });

    return NextResponse.json({
      success: true,
      data: treatment,
    });
  } catch (error) {
    console.error('Error deleting treatment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete treatment' },
      { status: 500 }
    );
  }
}
