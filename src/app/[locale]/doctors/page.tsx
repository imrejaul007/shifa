import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { generateMetadata as genMeta } from '@/lib/metadata';
import DoctorsClient from './DoctorsClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'ar' ? 'الأطباء الخبراء - شفاء الهند' : 'Expert Doctors - Shifa AlHind';

  const description =
    locale === 'ar'
      ? 'تعرف على أطبائنا الخبراء مع دعم اللغة العربية في أفضل مستشفيات بنغالور، الهند. جراحون، استشاريون، وأطباء متخصصون في جميع المجالات الطبية.'
      : 'Meet our expert doctors with Arabic language support at top Bangalore hospitals, India. Surgeons, consultants, and specialists across all medical fields.';

  return genMeta({
    title,
    description,
    locale,
    canonical: `/${locale}/doctors`,
    keywords: [
      'doctors India',
      'Bangalore doctors',
      'Arabic speaking doctors',
      'medical specialists India',
      'cardiologists Bangalore',
      'surgeons India',
      'consultants medical tourism',
      'GCC doctors India',
    ],
  });
}

export default async function DoctorsPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all published doctors with hospital info
  const doctors = await prisma.doctor.findMany({
    where: {
      published: true,
      isArchived: false,
    },
    select: {
      slug: true,
      name_en: true,
      name_ar: true,
      specialties: true,
      bio_en: true,
      bio_ar: true,
      qualifications: true,
      languages: true,
      profileImage: true,
      telemedicineAvailable: true,
      hospital: {
        select: {
          name_en: true,
          name_ar: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <DoctorsClient doctors={doctors} locale={locale} />;
}
