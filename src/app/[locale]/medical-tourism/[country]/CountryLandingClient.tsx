'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plane,


  Shield,

  CheckCircle2,

  Users,
  ArrowRight,
  FileText,
  Calendar,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import BookingForm from '@/components/public/BookingForm';

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
  slug: string;
  name_en: string;
  name_ar: string;
  accreditations: string[];
}

interface Props {
  country: string;
  locale: 'en' | 'ar';
  treatments: Treatment[];
  hospitals: Hospital[];
  bookingCount: number;
}

const countryData: Record<string, {
  en: { name: string; capital: string; flag: string };
  ar: { name: string; capital: string; flag: string };
}> = {
  'from-uae': {
    en: { name: 'UAE', capital: 'Dubai / Abu Dhabi', flag: '🇦🇪' },
    ar: { name: 'الإمارات', capital: 'دبي / أبوظبي', flag: '🇦🇪' },
  },
  'from-saudi-arabia': {
    en: { name: 'Saudi Arabia', capital: 'Riyadh / Jeddah', flag: '🇸🇦' },
    ar: { name: 'السعودية', capital: 'الرياض / جدة', flag: '🇸🇦' },
  },
  'from-kuwait': {
    en: { name: 'Kuwait', capital: 'Kuwait City', flag: '🇰🇼' },
    ar: { name: 'الكويت', capital: 'مدينة الكويت', flag: '🇰🇼' },
  },
  'from-oman': {
    en: { name: 'Oman', capital: 'Muscat', flag: '🇴🇲' },
    ar: { name: 'عمان', capital: 'مسقط', flag: '🇴🇲' },
  },
  'from-qatar': {
    en: { name: 'Qatar', capital: 'Doha', flag: '🇶🇦' },
    ar: { name: 'قطر', capital: 'الدوحة', flag: '🇶🇦' },
  },
  'from-bahrain': {
    en: { name: 'Bahrain', capital: 'Manama', flag: '🇧🇭' },
    ar: { name: 'البحرين', capital: 'المنامة', flag: '🇧🇭' },
  },
};

const content = {
  en: {
    title: 'Medical Tourism to Bangalore',
    subtitle: 'World-class healthcare at 60-80% lower cost',
    patients: 'Patients from',
    stats: {
      savings: 'Average Savings',
      duration: 'Typical Stay',
      success: 'Success Rate',
    },
    whyChoose: 'Why Choose India for Medical Treatment?',
    benefits: [
      'Save 60-80% on medical procedures compared to Gulf countries',
      'JCI-accredited hospitals with international standards',
      'Arabic-speaking doctors and translators available 24/7',
      'Shorter waiting times - surgery within 2-3 weeks',
      'Direct flights from major GCC cities (3-4 hours)',
      'Halal food and prayer facilities in all partner hospitals',
      'Comprehensive visa assistance and airport pickup',
      'Post-treatment follow-up via telemedicine',
    ],
    process: 'Your Medical Journey',
    steps: [
      {
        title: 'Free Consultation',
        description: 'Share your medical reports and get expert opinion within 24 hours',
      },
      {
        title: 'Treatment Plan',
        description: 'Receive detailed cost estimate and treatment timeline',
      },
      {
        title: 'Visa & Travel',
        description: 'We assist with medical visa and arrange airport pickup',
      },
      {
        title: 'Treatment',
        description: 'Receive world-class care with Arabic support',
      },
      {
        title: 'Recovery & Follow-up',
        description: 'Post-treatment care and teleconsultations for 1 year',
      },
    ],
    popularTreatments: 'Popular Treatments',
    hospitals: 'JCI-Accredited Hospitals',
    getStarted: 'Start Your Medical Journey Today',
    bookConsultation: 'Book Free Consultation',
    whatsapp: 'WhatsApp Us',
  },
  ar: {
    title: 'السياحة العلاجية إلى بنغالور',
    subtitle: 'رعاية صحية عالمية بتكلفة أقل 60-80٪',
    patients: 'مرضى من',
    stats: {
      savings: 'متوسط ​​التوفير',
      duration: 'الإقامة المعتادة',
      success: 'معدل النجاح',
    },
    whyChoose: 'لماذا تختار الهند للعلاج الطبي؟',
    benefits: [
      'وفر 60-80٪ على الإجراءات الطبية مقارنة بدول الخليج',
      'مستشفيات معتمدة من JCI بمعايير دولية',
      'أطباء ومترجمون يتحدثون العربية متاحون على مدار الساعة',
      'أوقات انتظار أقصر - الجراحة خلال 2-3 أسابيع',
      'رحلات مباشرة من المدن الخليجية الكبرى (3-4 ساعات)',
      'طعام حلال ومرافق صلاة في جميع المستشفيات الشريكة',
      'مساعدة شاملة في التأشيرة والاستقبال من المطار',
      'متابعة ما بعد العلاج عبر الطب عن بعد',
    ],
    process: 'رحلتك الطبية',
    steps: [
      {
        title: 'استشارة مجانية',
        description: 'شارك تقاريرك الطبية واحصل على رأي الخبراء خلال 24 ساعة',
      },
      {
        title: 'خطة العلاج',
        description: 'احصل على تقدير مفصل للتكلفة والجدول الزمني للعلاج',
      },
      {
        title: 'التأشيرة والسفر',
        description: 'نساعد في التأشيرة الطبية ونرتب الاستقبال من المطار',
      },
      {
        title: 'العلاج',
        description: 'احصل على رعاية عالمية المستوى مع دعم عربي',
      },
      {
        title: 'التعافي والمتابعة',
        description: 'رعاية ما بعد العلاج واستشارات عن بعد لمدة عام',
      },
    ],
    popularTreatments: 'العلاجات الشائعة',
    hospitals: 'مستشفيات معتمدة من JCI',
    getStarted: 'ابدأ رحلتك الطبية اليوم',
    bookConsultation: 'احجز استشارة مجانية',
    whatsapp: 'واتساب',
  },
};

export default function CountryLandingClient({
  country,
  locale,
  treatments,
  hospitals,
  bookingCount,
}: Props) {
  const t = content[locale];
  const countryInfo = countryData[country][locale];

  return (
    <main className={`min-h-screen bg-background pt-24 ${locale === 'ar' ? 'font-arabic' : ''}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 bg-accent/10 px-4 py-2 rounded-full mb-6">
                <span className="text-4xl">{countryInfo.flag}</span>
                <Plane className="w-5 h-5 text-accent" />
                <span className="text-4xl">🇮🇳</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary mb-4">
                {t.title}
              </h1>
              <p className="text-2xl text-accent font-semibold mb-4">
                {t.patients} {countryInfo.name}
              </p>
              <p className="text-xl text-muted-foreground mb-8">
                {t.subtitle}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card hover={false} variant="outline" className="p-4 text-center">
                  <p className="text-2xl font-bold text-accent mb-1">60-80%</p>
                  <p className="text-xs text-muted-foreground">{t.stats.savings}</p>
                </Card>
                <Card hover={false} variant="outline" className="p-4 text-center">
                  <p className="text-2xl font-bold text-accent mb-1">3-4 {locale === 'en' ? 'weeks' : 'أسابيع'}</p>
                  <p className="text-xs text-muted-foreground">{t.stats.duration}</p>
                </Card>
                <Card hover={false} variant="outline" className="p-4 text-center">
                  <p className="text-2xl font-bold text-accent mb-1">98%</p>
                  <p className="text-xs text-muted-foreground">{t.stats.success}</p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonLink
                  href={`/${locale}/consultation`}
                  variant="gold"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  {t.bookConsultation}
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

              {bookingCount > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  <Users className="w-4 h-4 inline mr-2" />
                  {bookingCount}+ {locale === 'en' ? 'patients from' : 'مريض من'} {countryInfo.name} {locale === 'en' ? 'treated successfully' : 'تم علاجهم بنجاح'}
                </p>
              )}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookingForm locale={locale} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
            {t.whyChoose}
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover={false} variant="default" className="flex items-start gap-3 p-4">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
            {t.process}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {t.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 bg-card p-6 rounded-3xl border-2 border-transparent hover:border-accent transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary font-display font-bold text-xl">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      {treatments.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.popularTreatments}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {treatments.slice(0, 6).map((treatment, index) => (
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
                            {locale === 'en' ? 'From' : 'من'} ${treatment.costMin.toLocaleString()}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-primary">
                          <span className="text-sm font-medium">
                            {locale === 'en' ? 'Learn More' : 'اعرف المزيد'}
                          </span>
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

      {/* Hospitals */}
      {hospitals.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.hospitals}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/hospitals/${hospital.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-5 h-5 text-accent" />
                          <span className="text-xs font-semibold text-accent">
                            {hospital.accreditations[0] || 'JCI'}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-primary mb-4">
                          {locale === 'ar' ? hospital.name_ar : hospital.name_en}
                        </h3>
                        <div className="flex items-center gap-2 text-primary">
                          <span className="text-sm font-medium">
                            {locale === 'en' ? 'View Profile' : 'عرض الملف الشخصي'}
                          </span>
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

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-4">
              {t.getStarted}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {locale === 'en'
                ? `Join ${bookingCount}+ patients from ${countryInfo.name} who chose India for quality healthcare`
                : `انضم إلى ${bookingCount}+ مريض من ${countryInfo.name} الذين اختاروا الهند للرعاية الصحية الجيدة`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink
                href={`/${locale}/consultation`}
                variant="gold"
                size="lg"
                leftIcon={<FileText className="w-5 h-5" />}
              >
                {t.bookConsultation}
              </ButtonLink>
              <ButtonLink
                href={`/${locale}/treatments`}
                variant="outline"
                size="lg"
              >
                {locale === 'en' ? 'View Treatments' : 'عرض العلاجات'}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
