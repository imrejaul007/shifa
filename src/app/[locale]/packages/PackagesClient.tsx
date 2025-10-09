'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search, CheckCircle2, Package as PackageIcon, Star } from 'lucide-react';
import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface Package {
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  price: number;
  currency: string | null;
  features: any;
  duration_en: string | null;
  duration_ar: string | null;
  _count: {
    bookings: number;
  };
}

interface Props {
  packages: Package[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Medical Packages',
    subtitle: 'All-inclusive medical tourism packages for GCC patients',
    search: 'Search packages...',
    price: 'Package Price',
    duration: 'Duration',
    patients: 'Patients Chose This',
    whatsIncluded: "What's Included",
    viewDetails: 'View Details',
    noResults: 'No packages found',
    tryAgain: 'Try adjusting your search',
    ctaTitle: 'Need a Custom Package?',
    ctaDesc: 'We can create a personalized package tailored to your needs',
    ctaButton: 'Get Custom Quote',
    savingsNote: 'All packages are 60-80% less than USA, UK, or GCC countries',
  },
  ar: {
    title: 'الباقات الطبية',
    subtitle: 'باقات سياحة علاجية شاملة لمرضى دول مجلس التعاون الخليجي',
    search: 'بحث عن الباقات...',
    price: 'سعر الباقة',
    duration: 'المدة',
    patients: 'اختار المرضى هذا',
    whatsIncluded: 'ما المتضمن',
    viewDetails: 'عرض التفاصيل',
    noResults: 'لم يتم العثور على باقات',
    tryAgain: 'حاول تعديل بحثك',
    ctaTitle: 'هل تحتاج إلى باقة مخصصة؟',
    ctaDesc: 'يمكننا إنشاء باقة مخصصة مصممة خصيصًا لاحتياجاتك',
    ctaButton: 'احصل على عرض أسعار مخصص',
    savingsNote: 'جميع الباقات أقل بنسبة 60-80٪ من الولايات المتحدة أو المملكة المتحدة أو دول مجلس التعاون الخليجي',
  },
};

export default function PackagesClient({ packages, locale }: Props) {
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPackages = packages.filter((pkg) => {
    const name = locale === 'ar' ? pkg.name_ar : pkg.name_en;
    const description = locale === 'ar' ? pkg.description_ar : pkg.description_en;
    const searchLower = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(searchLower) ||
      description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <main
      className={`min-h-screen bg-background ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
              <PackageIcon className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">{t.savingsNote}</span>
            </div>

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
                {filteredPackages.length}{' '}
                {locale === 'ar' ? 'نتيجة' : filteredPackages.length === 1 ? 'result' : 'results'}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, index) => {
                const name = locale === 'ar' ? pkg.name_ar : pkg.name_en;
                const description = locale === 'ar' ? pkg.description_ar : pkg.description_en;
                const duration = locale === 'ar' ? pkg.duration_ar : pkg.duration_en;
                const features = pkg.features?.included || Object.values(pkg.features || {});

                return (
                  <motion.div
                    key={pkg.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/${locale}/packages/${pkg.slug}`}>
                      <Card
                        hover={true}
                        variant="default"
                        className="h-full flex flex-col border-2 border-accent/20 hover:border-accent/50 transition-colors"
                      >
                        <CardBody className="flex-1 flex flex-col">
                          {/* Header */}
                          <div className="mb-6">
                            <h3 className="text-2xl font-display font-bold text-primary mb-3">
                              {name}
                            </h3>
                            {description && (
                              <p className="text-muted-foreground line-clamp-2">{description}</p>
                            )}
                          </div>

                          {/* Price & Stats */}
                          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">{t.price}</p>
                              <p className="text-2xl font-bold text-accent">
                                ${pkg.price.toLocaleString()}
                              </p>
                              {pkg.currency && (
                                <p className="text-xs text-muted-foreground mt-1">{pkg.currency}</p>
                              )}
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">{t.patients}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-accent fill-accent" />
                                <p className="text-2xl font-bold text-foreground">
                                  {pkg._count.bookings}+
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Features */}
                          {features && features.length > 0 && (
                            <div className="mb-6 flex-1">
                              <p className="text-sm font-semibold text-foreground mb-3">
                                {t.whatsIncluded}
                              </p>
                              <ul className="space-y-2">
                                {features.slice(0, 4).map((feature: any, idx: number) => {
                                  const featureText =
                                    typeof feature === 'string' ? feature : feature.toString();
                                  return (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                      <span className="text-muted-foreground line-clamp-1">
                                        {featureText}
                                      </span>
                                    </li>
                                  );
                                })}
                                {features.length > 4 && (
                                  <li className="text-sm text-accent">
                                    +{features.length - 4} more...
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}

                          {/* Duration */}
                          {duration && (
                            <div className="mb-4 text-sm text-muted-foreground">
                              <span className="font-medium">{t.duration}:</span> {duration}
                            </div>
                          )}

                          {/* CTA */}
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                            <span className="text-sm font-medium text-primary">{t.viewDetails}</span>
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
      <section className="py-20 bg-accent/5">
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
