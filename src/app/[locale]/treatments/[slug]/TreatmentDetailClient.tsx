'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DollarSign, Award, Shield, ArrowRight, FileText, Stethoscope, User } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import BookingForm from '@/components/public/BookingForm';
import type { Prisma } from '@prisma/client';

interface Hospital {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  accreditations: string[];
  images: Prisma.JsonValue;
}

interface Doctor {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  qualifications: string[];
  specialties: string[];
  languages: string[];
  profileImage: string | null;
}

interface Treatment {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  contentBlocks_en?: Prisma.JsonValue;
  contentBlocks_ar?: Prisma.JsonValue;
  costMin: number | null;
  costMax: number | null;
  currency: string;
  faq?: Prisma.JsonValue;
  bookings: { id: string }[];
}

interface Props {
  treatment: Treatment;
  hospitals: Hospital[];
  doctors: Doctor[];
  relatedTreatments: Treatment[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    breadcrumb: { home: 'Home', treatments: 'Treatments' },
    cost: 'Cost',
    bookings: 'Patients Treated',
    getQuote: 'Get Free Quote',
    bookConsultation: 'Book Consultation',
    overview: 'Overview',
    partnerHospitals: 'Partner Hospitals',
    ourDoctors: 'Our Doctors',
    jciAccredited: 'JCI Accredited',
    viewProfile: 'View Profile',
    faq: 'Frequently Asked Questions',
    readyToBegin: 'Ready to Begin Your Treatment?',
    freeConsultation: 'Get a free consultation with our medical experts',
    whatsapp: 'WhatsApp Us',
    relatedTreatments: 'Related Treatments',
    learnMore: 'Learn More',
    bookNow: 'Book Now',
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    cost: 'التكلفة',
    bookings: 'المرضى المعالجون',
    getQuote: 'احصل على عرض أسعار مجاني',
    bookConsultation: 'احجز استشارة',
    overview: 'نظرة عامة',
    partnerHospitals: 'المستشفيات الشريكة',
    ourDoctors: 'أطباؤنا',
    jciAccredited: 'معتمد من JCI',
    viewProfile: 'عرض الملف الشخصي',
    faq: 'الأسئلة الشائعة',
    readyToBegin: 'هل أنت مستعد لبدء علاجك؟',
    freeConsultation: 'احصل على استشارة مجانية مع خبرائنا الطبيين',
    whatsapp: 'واتساب',
    relatedTreatments: 'علاجات ذات صلة',
    learnMore: 'اعرف المزيد',
    bookNow: 'احجز الآن',
  },
};

export default function TreatmentDetailClient({
  treatment,
  hospitals,
  doctors,
  relatedTreatments,
  locale,
}: Props) {
  const t = content[locale];
  const title = locale === 'ar' ? treatment.title_ar : treatment.title_en;
  const summary = locale === 'ar' ? treatment.summary_ar : treatment.summary_en;
  const contentBlocks = locale === 'ar' ? treatment.contentBlocks_ar : treatment.contentBlocks_en;

  return (
    <main
      className={`min-h-screen bg-background pt-24 ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
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
            <Link href={`/${locale}/treatments`} className="hover:text-accent transition-colors">
              {t.breadcrumb.treatments}
            </Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Stethoscope className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Medical Treatment</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary mb-6">
                {title}
              </h1>

              <p className="text-lg text-muted-foreground mb-8">{summary}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {treatment.costMin && (
                  <Card hover={false} variant="outline" className="p-4">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-sm font-medium">{t.cost}</span>
                    </div>
                    <p className="text-foreground font-semibold">
                      ${treatment.costMin.toLocaleString()} - ${treatment.costMax?.toLocaleString()}
                    </p>
                  </Card>
                )}

                <Card hover={false} variant="outline" className="p-4">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <Award className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.bookings}</span>
                  </div>
                  <p className="text-foreground font-semibold">{treatment.bookings.length}+</p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonLink href={`/${locale}/consultation`} variant="gold" size="lg">
                  {t.getQuote}
                </ButtonLink>
                <ButtonLink href={`/${locale}/booking`} variant="outline" size="lg">
                  {t.bookConsultation}
                </ButtonLink>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookingForm treatmentId={treatment.id} locale={locale} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      {contentBlocks &&
        typeof contentBlocks === 'object' &&
        contentBlocks !== null &&
        'sections' in contentBlocks && (
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-8">
                  {t.overview}
                </h2>
                <div className="prose prose-lg max-w-none text-foreground/80">
                  {Array.isArray((contentBlocks as { sections?: unknown }).sections) &&
                    (contentBlocks as { sections: unknown[] }).sections.map(
                      (section: unknown, index: number) => {
                        const sec = section as Record<string, unknown>;
                        return (
                          <div key={index}>
                            {sec.type === 'heading' && (
                              <h3 className="text-2xl font-bold text-primary mt-8 mb-4">
                                {String(sec.content || '')}
                              </h3>
                            )}
                            {sec.type === 'paragraph' && (
                              <p className="mb-4 leading-relaxed">{String(sec.content || '')}</p>
                            )}
                            {sec.type === 'list' && Array.isArray(sec.items) && (
                              <ul className="list-disc list-inside space-y-2 mb-4">
                                {(sec.items as unknown[]).map((item: unknown, i: number) => (
                                  <li key={i}>{String(item)}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          </section>
        )}

      {/* Partner Hospitals */}
      {hospitals.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.partnerHospitals}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/hospitals/${hospital.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-5 h-5 text-accent" />
                          <span className="text-xs font-semibold text-accent">
                            {hospital.accreditations[0] || t.jciAccredited}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-primary mb-2">
                          {locale === 'ar' ? hospital.name_ar : hospital.name_en}
                        </h3>
                        <div className="flex items-center gap-2 mt-4 text-accent">
                          <span className="text-sm font-medium">{t.viewProfile}</span>
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

      {/* Doctors */}
      {doctors.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.ourDoctors}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
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

      {/* FAQ */}
      {treatment.faq && Array.isArray(treatment.faq) && treatment.faq.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
                {t.faq}
              </h2>
              <div className="space-y-4">
                {treatment.faq.map((item: unknown, index: number) => {
                  const faqItem = item as Record<string, unknown>;
                  const question =
                    locale === 'ar' && faqItem.q_ar
                      ? String(faqItem.q_ar)
                      : String(faqItem.q_en || faqItem.question || '');
                  const answer =
                    locale === 'ar' && faqItem.a_ar
                      ? String(faqItem.a_ar)
                      : String(faqItem.a_en || faqItem.answer || '');

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl"
                    >
                      <h3 className="text-lg font-display font-bold text-primary mb-2">
                        {question}
                      </h3>
                      <p className="text-muted-foreground">{answer}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Treatments */}
      {relatedTreatments.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.relatedTreatments}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTreatments.map((related, index) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/treatments/${related.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        <h3 className="text-xl font-display font-bold text-primary mb-2">
                          {locale === 'ar' ? related.title_ar : related.title_en}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {locale === 'ar' ? related.summary_ar : related.summary_en}
                        </p>
                        {related.costMin && (
                          <p className="text-accent font-semibold mb-3">
                            From ${related.costMin.toLocaleString()}
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
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-4">
              {t.readyToBegin}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{t.freeConsultation}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink
                href={`/${locale}/consultation`}
                variant="gold"
                size="lg"
                leftIcon={<FileText className="w-5 h-5" />}
              >
                {t.getQuote}
              </ButtonLink>
              <ButtonLink
                href="https://wa.me/+919876543210"
                variant="outline"
                size="lg"
                external={true}
              >
                {t.whatsapp}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
