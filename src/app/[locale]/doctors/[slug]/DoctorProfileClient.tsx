'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  Award,
  Languages,
  Building2,
  CheckCircle2,
  Calendar,
  Video,
  ArrowRight,
  Star,
  DollarSign,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import BookingForm from '@/components/public/BookingForm';

interface Hospital {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  city: string;
  accreditations: string[];
}

interface Doctor {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  bio_en: string;
  bio_ar: string;
  qualifications: string[];
  specialties: string[];
  languages: string[];
  profileImage: string | null;
  consultationFee: number | null;
  currency: string;
  telemedicineAvailable: boolean;
  hospital: Hospital;
  bookings: { id: string }[];
}

interface RelatedDoctor {
  slug: string;
  name_en: string;
  name_ar: string;
  specialties: string[];
  profileImage: string | null;
}

interface Props {
  doctor: Doctor;
  relatedDoctors: RelatedDoctor[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    breadcrumb: { home: 'Home', doctors: 'Doctors' },
    qualifications: 'Qualifications',
    specialties: 'Specialties',
    languages: 'Languages Spoken',
    hospital: 'Hospital',
    patientsServed: 'Patients Served',
    consultationFee: 'Consultation Fee',
    telemedicine: 'Telemedicine Available',
    about: 'About Dr.',
    bookConsultation: 'Book Consultation',
    videoCall: 'Schedule Video Call',
    relatedDoctors: 'Other Doctors at',
    viewProfile: 'View Profile',
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', doctors: 'الأطباء' },
    qualifications: 'المؤهلات',
    specialties: 'التخصصات',
    languages: 'اللغات المنطوقة',
    hospital: 'المستشفى',
    patientsServed: 'المرضى المخدومون',
    consultationFee: 'رسوم الاستشارة',
    telemedicine: 'الطب عن بعد متاح',
    about: 'عن د.',
    bookConsultation: 'احجز استشارة',
    videoCall: 'جدولة مكالمة فيديو',
    relatedDoctors: 'أطباء آخرون في',
    viewProfile: 'عرض الملف الشخصي',
  },
};

export default function DoctorProfileClient({ doctor, relatedDoctors, locale }: Props) {
  const t = content[locale];
  const name = locale === 'ar' ? doctor.name_ar : doctor.name_en;
  const bio = locale === 'ar' ? doctor.bio_ar : doctor.bio_en;
  const hospitalName = locale === 'ar' ? doctor.hospital.name_ar : doctor.hospital.name_en;

  return (
    <main className={`min-h-screen bg-background pt-24 ${locale === 'ar' ? 'font-arabic' : ''}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-accent transition-colors">
              {t.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/doctors`} className="hover:text-accent transition-colors">
              {t.breadcrumb.doctors}
            </Link>
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Doctor Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                    {doctor.profileImage ? (
                      <img src={doctor.profileImage} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-20 h-20 text-primary" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary mb-2">
                    {name}
                  </h1>
                  <p className="text-lg text-accent font-semibold mb-3">
                    {doctor.specialties[0]}
                  </p>
                  <Link
                    href={`/${locale}/hospitals/${doctor.hospital.slug}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{hospitalName}</span>
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {doctor.consultationFee && (
                  <Card hover={false} variant="outline" className="p-4">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-sm font-medium">{t.consultationFee}</span>
                    </div>
                    <p className="text-foreground font-semibold">
                      ${doctor.consultationFee}
                    </p>
                  </Card>
                )}

                <Card hover={false} variant="outline" className="p-4">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.patientsServed}</span>
                  </div>
                  <p className="text-foreground font-semibold">{doctor.bookings.length}+</p>
                </Card>

                {doctor.telemedicineAvailable && (
                  <Card hover={false} variant="outline" className="p-4 col-span-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Video className="w-5 h-5" />
                      <span className="text-sm font-medium">{t.telemedicine}</span>
                      <CheckCircle2 className="w-4 h-4 ml-auto" />
                    </div>
                  </Card>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonLink
                  href={`/${locale}/consultation`}
                  variant="gold"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  {t.bookConsultation}
                </ButtonLink>
                {doctor.telemedicineAvailable && (
                  <ButtonLink
                    href={`/${locale}/consultation?doctorId=${doctor.id}&type=video`}
                    variant="outline"
                    size="lg"
                    leftIcon={<Video className="w-5 h-5" />}
                  >
                    {t.videoCall}
                  </ButtonLink>
                )}
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookingForm doctorId={doctor.id} locale={locale} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-8">
              {t.about} {name.split(' ')[name.split(' ').length - 1]}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Qualifications */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-primary">{t.qualifications}</h3>
                </div>
                <ul className="space-y-2">
                  {doctor.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specialties */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-primary">{t.specialties}</h3>
                </div>
                <ul className="space-y-2">
                  {doctor.specialties.map((specialty, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Languages className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-primary">{t.languages}</h3>
                </div>
                <ul className="space-y-2">
                  {doctor.languages.map((lang, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{lang}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-8 text-center">
              {t.hospital}
            </h2>
            <Link href={`/${locale}/hospitals/${doctor.hospital.slug}`}>
              <Card hover={true} variant="default">
                <CardBody>
                  <div className="flex items-center gap-2 mb-3">
                    {doctor.hospital.accreditations.map((acc, i) => (
                      <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {acc}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">
                    {hospitalName}
                  </h3>
                  <p className="text-muted-foreground mb-4">{doctor.hospital.city}, India</p>
                  <div className="flex items-center gap-2 text-accent">
                    <span className="font-medium">{t.viewProfile}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Doctors */}
      {relatedDoctors.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.relatedDoctors} {hospitalName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedDoctors.map((related, index) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/doctors/${related.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                          <User className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-primary text-center mb-2">
                          {locale === 'ar' ? related.name_ar : related.name_en}
                        </h3>
                        <p className="text-sm text-muted-foreground text-center">
                          {related.specialties[0]}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
