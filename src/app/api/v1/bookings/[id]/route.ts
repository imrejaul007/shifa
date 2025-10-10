import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import {
  sendBookingConfirmation,
  sendAdminBookingNotification,
  type BookingEmailData,
} from '@/lib/email';

// GET single booking by ID (admin only)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        treatment: true,
        hospital: true,
        doctor: true,
        package: true,
        assignedTranslator: {
          include: {
            user: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch booking' }, { status: 500 });
  }
}

// PATCH update booking (admin only)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Get current booking to check status change
    const currentBooking = await prisma.booking.findUnique({
      where: { id },
      select: { status: true },
    });

    const isStatusChangingToConfirmed =
      body.status === 'CONFIRMED' && currentBooking?.status !== 'CONFIRMED';

    // Update confirmedAt when status changes to CONFIRMED
    if (body.status === 'CONFIRMED' && !body.confirmedAt) {
      body.confirmedAt = new Date();
    }

    // Update completedAt when status changes to DISCHARGED
    if (body.status === 'DISCHARGED' && !body.completedAt) {
      body.completedAt = new Date();
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
      include: {
        treatment: {
          select: {
            title_en: true,
            title_ar: true,
          },
        },
        hospital: {
          select: {
            name_en: true,
            name_ar: true,
          },
        },
        doctor: {
          select: {
            name_en: true,
            name_ar: true,
          },
        },
      },
    });

    // Send confirmation emails when booking is confirmed
    if (isStatusChangingToConfirmed) {
      // Determine locale (default to English if not specified)
      const locale = (body.locale as 'en' | 'ar') || 'en';

      // Prepare treatment name
      const treatmentName =
        locale === 'ar'
          ? booking.treatment?.title_ar || 'General Treatment'
          : booking.treatment?.title_en || 'General Treatment';

      // Prepare hospital name
      const hospitalName = locale === 'ar' ? booking.hospital?.name_ar : booking.hospital?.name_en;

      // Prepare doctor name
      const doctorName = locale === 'ar' ? booking.doctor?.name_ar : booking.doctor?.name_en;

      // Prepare preferred date
      let preferredDate: string | undefined;
      if (booking.preferredDates) {
        try {
          const dateValue = new Date(booking.preferredDates as string);
          preferredDate = dateValue.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } catch (error) {
          console.error('Error parsing preferred date:', error);
        }
      }

      const emailData: BookingEmailData = {
        name: booking.patientName,
        email: booking.email,
        phone: booking.phone,
        treatment: treatmentName,
        hospitalName,
        doctorName,
        preferredDate,
        locale,
      };

      // Send emails (non-blocking - don't wait for email to complete)
      // Patient confirmation
      sendBookingConfirmation(emailData).catch((error) => {
        console.error('Failed to send booking confirmation email:', error);
      });

      // Admin notification
      sendAdminBookingNotification(emailData).catch((error) => {
        console.error('Failed to send admin booking notification email:', error);
      });
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE booking (admin only - soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const booking = await prisma.booking.update({
      where: { id },
      data: { isArchived: true },
    });

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
