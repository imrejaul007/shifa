'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Star, GraduationCap, Languages, X, Video, ArrowRight, Search, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button, ButtonLink } from '@/components/ui/Button';

interface Doctor {
  slug: string;
  name_en: string;
  name_ar: string;
  specialty_en: string | null;
  specialty_ar: string | null;
  bio_en: string | null;
  bio_ar: string | null;
  qualifications: any;
  experience: number | null;
  languages: any;
  image: string | null;
  telemedicineAvailable: boolean;
  hospital: {
    name_en: string;
    name_ar: string;
  } | null;
}

interface Props {
  doctors: Doctor[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Our Doctors',
    subtitle: 'Expert physicians with Arabic language support at Bangalore hospitals',
    search: 'Search doctors...',
    experience: 'Years Experience',
    specialties: 'Specialties',
    languages: 'Languages',
    hospital: 'Hospital',
    bookConsultation: 'Book Consultation',
    viewProfile: 'View Profile',
    closeProfile: 'Close',
    qualifications: 'Qualifications',
    telemedicine: 'Telemedicine Available',
    biography: 'Biography',
    noResults: 'No doctors found',
    tryAgain: 'Try adjusting your search',
    ctaTitle: 'Need a Specialist?',
    ctaDesc: 'Book a consultation with our expert physicians',
    ctaButton: 'Book Free Consultation',
  },
  ar: {
    title: 'أطباؤنا',
    subtitle: 'أطباء خبراء مع دعم اللغة العربية في مستشفيات بنغالور',
    search: 'بحث عن الأطباء...',
    experience: 'سنوات الخبرة',
    specialties: 'التخصصات',
    languages: 'اللغات',
    hospital: 'المستشفى',
    bookConsultation: 'احجز استشارة',
    viewProfile: 'عرض الملف',
    closeProfile: 'إغلاق',
    qualifications: 'المؤهلات',
    telemedicine: 'الطب عن بعد متاح',
    biography: 'السيرة الذاتية',
    noResults: 'لم يتم العثور على أطباء',
    tryAgain: 'حاول تعديل بحثك',
    ctaTitle: 'هل تحتاج إلى أخصائي؟',
    ctaDesc: 'احجز استشارة مع أطبائنا الخبراء',
    ctaButton: 'احجز استشارة مجانية',
  },
};

export default function DoctorsClient({ doctors, locale }: Props) {
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = locale === 'ar' ? doctor.name_ar : doctor.name_en;
    const specialty = locale === 'ar' ? doctor.specialty_ar : doctor.specialty_en;
    const hospitalName = doctor.hospital
      ? locale === 'ar'
        ? doctor.hospital.name_ar
        : doctor.hospital.name_en
      : '';
    const searchLower = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(searchLower) ||
      specialty?.toLowerCase().includes(searchLower) ||
      hospitalName.toLowerCase().includes(searchLower)
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
                {filteredDoctors.length}{' '}
                {locale === 'ar' ? 'نتيجة' : filteredDoctors.length === 1 ? 'result' : 'results'}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor, index) => {
                const name = locale === 'ar' ? doctor.name_ar : doctor.name_en;
                const specialty = locale === 'ar' ? doctor.specialty_ar : doctor.specialty_en;
                const hospitalName = doctor.hospital
                  ? locale === 'ar'
                    ? doctor.hospital.name_ar
                    : doctor.hospital.name_en
                  : null;

                return (
                  <motion.div
                    key={doctor.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card hover={true} variant="default" className="h-full flex flex-col">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={
                            doctor.image ||
                            'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800'
                          }
                          alt={name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                        {doctor.telemedicineAvailable && (
                          <div className={`absolute top-4 ${locale === 'ar' ? 'left-4' : 'right-4'}`}>
                            <div className="glass px-3 py-2 rounded-full">
                              <Video className="w-5 h-5 text-accent" />
                            </div>
                          </div>
                        )}
                      </div>
                      <CardBody className="flex-1 flex flex-col">
                        <h3 className="text-2xl font-display font-bold text-primary mb-2">
                          {name}
                        </h3>
                        {specialty && (
                          <p className="text-accent font-semibold mb-4">{specialty}</p>
                        )}
                        <div className="space-y-3 mb-4 flex-1">
                          {doctor.experience && (
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <GraduationCap className="w-5 h-5 text-accent" />
                              <span className="text-sm">
                                {doctor.experience}+ {t.experience}
                              </span>
                            </div>
                          )}
                          {doctor.languages && doctor.languages.length > 0 && (
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Languages className="w-5 h-5 text-accent" />
                              <span className="text-sm">
                                {doctor.languages.slice(0, 2).join(', ')}
                              </span>
                            </div>
                          )}
                          {hospitalName && (
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Stethoscope className="w-5 h-5 text-accent" />
                              <span className="text-sm line-clamp-1">{hospitalName}</span>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => setSelectedDoctor(doctor)}
                          variant="gold"
                          size="md"
                          className="w-full"
                        >
                          {t.viewProfile}
                        </Button>
                      </CardBody>
                    </Card>
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

      {/* Doctor Profile Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoctor(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className={`absolute top-4 z-10 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors ${
                    locale === 'ar' ? 'left-4' : 'right-4'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Header with Image */}
                <div className="relative aspect-[21/9] overflow-hidden rounded-t-3xl">
                  <img
                    src={
                      selectedDoctor.image ||
                      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800'
                    }
                    alt={locale === 'ar' ? selectedDoctor.name_ar : selectedDoctor.name_en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                  <div
                    className={`absolute bottom-8 ${locale === 'ar' ? 'right-8' : 'left-8'}`}
                  >
                    <h2 className="text-4xl font-display font-bold text-white mb-2">
                      {locale === 'ar' ? selectedDoctor.name_ar : selectedDoctor.name_en}
                    </h2>
                    <p className="text-xl text-accent">
                      {locale === 'ar' ? selectedDoctor.specialty_ar : selectedDoctor.specialty_en}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Left Column */}
                    <div>
                      {selectedDoctor.qualifications && selectedDoctor.qualifications.length > 0 && (
                        <>
                          <h3 className="text-xl font-bold text-primary mb-4">
                            {t.qualifications}
                          </h3>
                          <ul className="space-y-2 mb-6">
                            {selectedDoctor.qualifications.map((qual: string, idx: number) => (
                              <li key={idx} className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-accent" />
                                <span>{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {selectedDoctor.hospital && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-primary mb-4">{t.hospital}</h3>
                          <Link
                            href={`/${locale}/hospitals/${selectedDoctor.hospital}`}
                            className="text-accent hover:underline"
                          >
                            {locale === 'ar'
                              ? selectedDoctor.hospital.name_ar
                              : selectedDoctor.hospital.name_en}
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div>
                      {selectedDoctor.languages && selectedDoctor.languages.length > 0 && (
                        <>
                          <h3 className="text-xl font-bold text-primary mb-4">{t.languages}</h3>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {selectedDoctor.languages.map((lang: string) => (
                              <span
                                key={lang}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {selectedDoctor.telemedicineAvailable && (
                        <div className="glass-dark p-4 rounded-2xl flex items-center gap-3">
                          <Video className="w-6 h-6 text-accent" />
                          <span className="text-white">{t.telemedicine}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  {(selectedDoctor.bio_en || selectedDoctor.bio_ar) && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-primary mb-4">{t.biography}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {locale === 'ar' ? selectedDoctor.bio_ar : selectedDoctor.bio_en}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <ButtonLink
                    href={`/${locale}/consultation`}
                    variant="gold"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="w-full"
                  >
                    {t.bookConsultation}
                  </ButtonLink>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
