'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface Treatment {
  slug: string;
  title_en: string;
  title_ar: string;
  summary_en: string | null;
  summary_ar: string | null;
  costMin: number | null;
  costMax: number | null;
}

interface Props {
  treatments: Treatment[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Our Treatments',
    subtitle: 'Specialized medical procedures with world-class care in Bangalore, India',
    search: 'Search treatments...',
    viewDetails: 'View Details',
    from: 'From',
    starting: 'Starting from',
    noResults: 'No treatments found',
    tryAgain: 'Try adjusting your search',
    ctaTitle: 'Have Questions?',
    ctaDesc: 'Speak with our medical experts for personalized consultation',
    ctaButton: 'Book Free Consultation',
  },
  ar: {
    title: 'علاجاتنا',
    subtitle: 'إجراءات طبية متخصصة مع رعاية عالمية المستوى في بنغالور، الهند',
    search: 'بحث عن العلاجات...',
    viewDetails: 'عرض التفاصيل',
    from: 'من',
    starting: 'يبدأ من',
    noResults: 'لم يتم العثور على علاجات',
    tryAgain: 'حاول تعديل بحثك',
    ctaTitle: 'هل لديك استفسار؟',
    ctaDesc: 'تحدث مع خبرائنا الطبيين للحصول على استشارة شخصية',
    ctaButton: 'احجز استشارة مجانية',
  },
};

export default function TreatmentsClient({ treatments, locale }: Props) {
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTreatments = treatments.filter((treatment) => {
    const title = locale === 'ar' ? treatment.title_ar : treatment.title_en;
    const summary = locale === 'ar' ? treatment.summary_ar : treatment.summary_en;
    const searchLower = searchQuery.toLowerCase();

    return (
      title.toLowerCase().includes(searchLower) || summary?.toLowerCase().includes(searchLower)
    );
  });

  const formatPrice = (min: number | null, max: number | null) => {
    if (!min && !max) return null;
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `${t.from} $${min.toLocaleString()}`;
    return null;
  };

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">{t.subtitle}</p>

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
                  className={`w-full py-4 text-base rounded-full bg-white border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-[52px] ${
                    locale === 'ar' ? 'pr-14 pl-5' : 'pl-14 pr-5'
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
                {filteredTreatments.length}{' '}
                {locale === 'ar' ? 'نتيجة' : filteredTreatments.length === 1 ? 'result' : 'results'}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTreatments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTreatments.map((treatment, index) => {
                const title = locale === 'ar' ? treatment.title_ar : treatment.title_en;
                const summary = locale === 'ar' ? treatment.summary_ar : treatment.summary_en;
                const price = formatPrice(treatment.costMin, treatment.costMax);

                return (
                  <motion.div
                    key={treatment.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/${locale}/treatments/${treatment.slug}`}>
                      <Card hover={true} variant="default" className="h-full flex flex-col">
                        <CardBody className="flex-1 flex flex-col">
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-primary mb-3 leading-snug">
                            {title}
                          </h3>
                          {summary && (
                            <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                              {summary}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-auto">
                            {price && (
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {treatment.costMin && treatment.costMax ? t.starting : t.from}
                                </p>
                                <p className="text-xl font-bold text-accent">{price}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-primary">
                              <span className="text-sm font-medium">{t.viewDetails}</span>
                              <ArrowRight className="w-5 h-5" />
                            </div>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-6 leading-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">{t.ctaDesc}</p>
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
