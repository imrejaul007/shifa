import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET single content page by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const page = await prisma.contentPage.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Content page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error fetching content page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content page' },
      { status: 500 }
    );
  }
}

// PATCH update content page (admin only)
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

    // Set publishedAt when publishing for the first time
    if (body.published && !body.publishedAt) {
      const existingPage = await prisma.contentPage.findUnique({
        where: { slug },
        select: { publishedAt: true },
      });

      if (!existingPage?.publishedAt) {
        body.publishedAt = new Date();
      }
    }

    const page = await prisma.contentPage.update({
      where: { slug },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error updating content page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update content page' },
      { status: 500 }
    );
  }
}

// DELETE content page (admin only - soft delete)
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

    const page = await prisma.contentPage.update({
      where: { slug },
      data: { isArchived: true },
    });

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error deleting content page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete content page' },
      { status: 500 }
    );
  }
}
