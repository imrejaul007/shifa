import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { withRateLimit, RateLimits } from '@/lib/rate-limit';
import {
  sendConsultationConfirmation,
  sendAdminConsultationNotification,
  type ConsultationEmailData,
} from '@/lib/email';

// Schema for lead validation
const leadSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  countryOfOrigin: z.string().min(2, 'Country is required'),
  treatmentId: z.string().optional(),
  hospitalId: z.string().optional(),
  doctorId: z.string().optional(),
  packageId: z.string().optional(),
  preferredDates: z.any().optional(),
  notes: z.string().optional(),
  locale: z.enum(['en', 'ar']).optional().default('en'),
});

// POST create new lead (public endpoint with rate limiting)
export async function POST(request: NextRequest) {
  return withRateLimit(request, RateLimits.FORM, async () => {
    try {
      const body = await request.json();

      // Validate input
      const validatedData = leadSchema.parse(body);

      // Create booking/lead
      const booking = await prisma.booking.create({
        data: {
          patientName: validatedData.patientName,
          email: validatedData.email,
          phone: validatedData.phone,
          countryOfOrigin: validatedData.countryOfOrigin,
          treatmentId: validatedData.treatmentId,
          hospitalId: validatedData.hospitalId,
          doctorId: validatedData.doctorId,
          packageId: validatedData.packageId,
          preferredDates: validatedData.preferredDates,
          notes: validatedData.notes,
          status: 'LEAD',
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

      // Prepare email data
      const locale = validatedData.locale || 'en';
      const treatmentName =
        locale === 'ar'
          ? booking.treatment?.title_ar || 'General Inquiry'
          : booking.treatment?.title_en || 'General Inquiry';

      const emailData: ConsultationEmailData = {
        name: booking.patientName,
        email: booking.email,
        phone: booking.phone,
        treatment: treatmentName,
        message: booking.notes || undefined,
        locale,
      };

      // Send emails (non-blocking - don't wait for email to complete)
      // Patient confirmation
      sendConsultationConfirmation(emailData).catch((error) => {
        console.error('Failed to send patient confirmation email:', error);
      });

      // Admin notification
      sendAdminConsultationNotification(emailData).catch((error) => {
        console.error('Failed to send admin notification email:', error);
      });

      return NextResponse.json({
        success: true,
        message:
          locale === 'ar'
            ? 'تم إرسال استفسارك بنجاح. سنتواصل معك قريباً.'
            : 'Your inquiry has been submitted successfully. We will contact you shortly.',
        data: {
          id: booking.id,
          patientName: booking.patientName,
          email: booking.email,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation error',
            details: error.issues,
          },
          { status: 400 }
        );
      }

      console.error('Error creating lead:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to submit inquiry' },
        { status: 500 }
      );
    }
  });
}
