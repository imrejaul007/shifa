'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search, Award, MapPin, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Card, CardBody, CardImage } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import type { Prisma } from '@prisma/client';

interface Hospital {
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  address: string;
  accreditations: string[] | null;
  languagesSupported: string[] | null;
  images: Prisma.JsonValue;
  _count: {
    doctors: number;
  };
}

interface Props {
  hospitals: Hospital[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Partner Hospitals',
    subtitle: 'JCI-accredited healthcare excellence in Bangalore, India',
    search: 'Search hospitals...',
    accreditations: 'Accreditations',
    location: 'Location',
    languages: 'Languages Supported',
    doctors: 'Doctors',
    treatments: 'Treatments',
    viewProfile: 'View Full Profile',
    noResults: 'No hospitals found',
    tryAgain: 'Try adjusting your search',
    ctaTitle: 'Need Help Choosing?',
    ctaDesc: 'Speak with our team to find the best hospital for your treatment',
    ctaButton: 'Get Expert Guidance',
  },
  ar: {
    title: 'المستشفيات الشريكة',
    subtitle: 'رعاية صحية متميزة معتمدة من JCI في بنغالور، الهند',
    search: 'بحث عن المستشفيات...',
    accreditations: 'الاعتمادات',
    location: 'الموقع',
    languages: 'اللغات المدعومة',
    doctors: 'الأطباء',
    treatments: 'العلاجات',
    viewProfile: 'عرض الملف الكامل',
    noResults: 'لم يتم العثور على مستشفيات',
    tryAgain: 'حاول تعديل بحثك',
    ctaTitle: 'هل تحتاج مساعدة في الاختيار؟',
    ctaDesc: 'تحدث مع فريقنا للعثور على أفضل مستشفى لعلاجك',
    ctaButton: 'احصل على إرشادات الخبراء',
  },
};

export default function HospitalsClient({ hospitals, locale }: Props) {
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = hospitals.filter((hospital) => {
    const name = locale === 'ar' ? hospital.name_ar : hospital.name_en;
    const description = locale === 'ar' ? hospital.description_ar : hospital.description_en;
    const address = hospital.address;
    const searchLower = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(searchLower) ||
      description?.toLowerCase().includes(searchLower) ||
      address?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <main
      className={`min-h-screen bg-background ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{t.subtitle}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${
                    locale === 'ar' ? 'right-4' : 'left-4'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className={`w-full py-4 rounded-full bg-white border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                    locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'
                  }`}
                />
              </div>
            </div>

            {/* Results Count */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                {filteredHospitals.length}{' '}
                {locale === 'ar' ? 'نتيجة' : filteredHospitals.length === 1 ? 'result' : 'results'}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHospitals.map((hospital, index) => {
                const name = locale === 'ar' ? hospital.name_ar : hospital.name_en;
                const description =
                  locale === 'ar' ? hospital.description_ar : hospital.description_en;
                const address = hospital.address;
                const firstImage =
                  hospital.images && Array.isArray(hospital.images) && hospital.images.length > 0
                    ? String(hospital.images[0])
                    : null;

                return (
                  <motion.div
                    key={hospital.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/${locale}/hospitals/${hospital.slug}`}>
                      <Card hover={true} variant="default" className="h-full flex flex-col">
                        {firstImage && <CardImage src={firstImage} alt={name} aspectRatio="16/9" />}
                        <CardBody className="flex-1 flex flex-col">
                          <h3 className="text-2xl font-display font-bold text-primary mb-2">
                            {name}
                          </h3>
                          {description && (
                            <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
                          )}

                          {/* Accreditations */}
                          {hospital.accreditations && hospital.accreditations.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Award className="w-4 h-4 text-accent" />
                                <span className="text-sm font-semibold text-foreground">
                                  {t.accreditations}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {hospital.accreditations.slice(0, 3).map((acc: string) => (
                                  <span
                                    key={acc}
                                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                                  >
                                    {acc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Stats */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Stethoscope className="w-4 h-4 text-accent" />
                              <span className="text-sm">
                                {hospital._count.doctors} {t.doctors}
                              </span>
                            </div>
                          </div>

                          {/* Address */}
                          {address && (
                            <div className="flex items-start gap-2 text-muted-foreground mb-4">
                              <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-sm line-clamp-2">{address}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                            <span className="text-sm font-medium text-primary">
                              {t.viewProfile}
                            </span>
                            <ArrowRight className="w-5 h-5 text-accent" />
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="mb-4">
                <Search className="w-16 h-16 text-muted-foreground mx-auto opacity-30" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{t.noResults}</h3>
              <p className="text-muted-foreground">{t.tryAgain}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center glass rounded-3xl p-8 sm:p-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">{t.ctaDesc}</p>
            <ButtonLink
              href={`/${locale}/consultation`}
              variant="gold"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.ctaButton}
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
