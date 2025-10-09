import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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
});

// POST create new lead (public endpoint)
export async function POST(request: NextRequest) {
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

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to patient
    // TODO: Send WhatsApp notification if configured

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will contact you shortly.',
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
}
