'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  Shield,
  Users,
  Star,
  CheckCircle2,
  MapPin,
  Languages,
  ArrowRight,
  Calendar,
  User,
  Award,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import BookingForm from '@/components/public/BookingForm';
import type { Prisma } from '@prisma/client';

interface Doctor {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  specialties: string[];
  languages: string[];
  profileImage: string | null;
}

interface Treatment {
  slug: string;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  costMin: number | null;
  costMax: number | null;
}

interface Hospital {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  address: string;
  city: string;
  country: string;
  accreditations: string[];
  languagesSupported: string[];
  images: Prisma.JsonValue;
  doctors: Doctor[];
  bookings: { id: string }[];
  _count: {
    doctors: number;
    bookings: number;
  };
}

interface Props {
  hospital: Hospital;
  treatments: Treatment[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    breadcrumb: { home: 'Home', hospitals: 'Hospitals' },
    accreditations: 'Accreditations',
    languages: 'Languages Supported',
    patientsServed: 'Patients Served',
    doctors: 'Expert Doctors',
    about: 'About',
    ourDoctors: 'Our Doctors',
    viewProfile: 'View Profile',
    availableTreatments: 'Available Treatments',
    learnMore: 'Learn More',
    bookConsultation: 'Book Consultation',
    getInTouch: 'Get In Touch',
    readyToVisit: 'Ready to Visit?',
    scheduleVisit: 'Schedule a visit with our team',
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', hospitals: 'المستشفيات' },
    accreditations: 'الاعتمادات',
    languages: 'اللغات المدعومة',
    patientsServed: 'المرضى المخدومون',
    doctors: 'أطباء خبراء',
    about: 'عن',
    ourDoctors: 'أطباؤنا',
    viewProfile: 'عرض الملف الشخصي',
    availableTreatments: 'العلاجات المتاحة',
    learnMore: 'اعرف المزيد',
    bookConsultation: 'احجز استشارة',
    getInTouch: 'تواصل معنا',
    readyToVisit: 'هل أنت مستعد للزيارة؟',
    scheduleVisit: 'حدد موعد زيارة مع فريقنا',
  },
};

export default function HospitalDetailClient({ hospital, treatments, locale }: Props) {
  const t = content[locale];
  const name = locale === 'ar' ? hospital.name_ar : hospital.name_en;
  const description = locale === 'ar' ? hospital.description_ar : hospital.description_en;

  return (
    <main
      className={`min-h-screen bg-background pt-24 ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero */}
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
            <Link href={`/${locale}/hospitals`} className="hover:text-accent transition-colors">
              {t.breadcrumb.hospitals}
            </Link>
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary mb-2">
                    {name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {hospital.city}, {hospital.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Accreditations */}
              <div className="flex flex-wrap gap-2 mb-6">
                {hospital.accreditations.map((acc) => (
                  <span
                    key={acc}
                    className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <Shield className="w-4 h-4" />
                    {acc}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card hover={false} variant="outline" className="p-4">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.doctors}</span>
                  </div>
                  <p className="text-foreground font-semibold">{hospital._count.doctors}+</p>
                </Card>

                <Card hover={false} variant="outline" className="p-4">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.patientsServed}</span>
                  </div>
                  <p className="text-foreground font-semibold">{hospital.bookings.length}+</p>
                </Card>
              </div>

              <ButtonLink
                href={`/${locale}/consultation`}
                variant="gold"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
              >
                {t.bookConsultation}
              </ButtonLink>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookingForm hospitalId={hospital.id} locale={locale} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-8">
              {t.about} {name}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Accreditations */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-primary">{t.accreditations}</h3>
                </div>
                <ul className="space-y-2">
                  {hospital.accreditations.map((acc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{acc}</span>
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
                  {hospital.languagesSupported.map((lang, index) => (
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

      {/* Doctors */}
      {hospital.doctors.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.ourDoctors}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hospital.doctors.slice(0, 6).map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/doctors/${doctor.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                          <User className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-primary text-center mb-2">
                          {locale === 'ar' ? doctor.name_ar : doctor.name_en}
                        </h3>
                        <p className="text-sm text-muted-foreground text-center mb-3">
                          {doctor.specialties[0]}
                        </p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {doctor.languages.slice(0, 3).map((lang) => (
                            <span
                              key={lang}
                              className="text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Treatments */}
      {treatments.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.availableTreatments}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {treatments.map((treatment, index) => (
                <motion.div
                  key={treatment.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/treatments/${treatment.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        <h3 className="text-xl font-display font-bold text-primary mb-2">
                          {locale === 'ar' ? treatment.title_ar : treatment.title_en}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {locale === 'ar' ? treatment.summary_ar : treatment.summary_en}
                        </p>
                        {treatment.costMin && (
                          <p className="text-accent font-semibold mb-3">
                            From ${treatment.costMin.toLocaleString()}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-primary">
                          <span className="text-sm font-medium">{t.learnMore}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-4">
              {t.readyToVisit}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{t.scheduleVisit}</p>
            <ButtonLink
              href={`/${locale}/consultation`}
              variant="gold"
              size="lg"
              leftIcon={<Calendar className="w-5 h-5" />}
            >
              {t.getInTouch}
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
