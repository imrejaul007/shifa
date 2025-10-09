'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Package,
  DollarSign,
  CheckCircle2,
  Star,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import BookingForm from '@/components/public/BookingForm';

interface PackageType {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  currency: string;
  features: any;
  bookings: { id: string }[];
}

interface OtherPackage {
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  currency: string;
}

interface Props {
  pkg: PackageType;
  otherPackages: OtherPackage[];
  locale: 'en' | 'ar';
}

const content = {
  en: {
    breadcrumb: { home: 'Home', packages: 'Packages' },
    price: 'Package Price',
    patients: 'Patients Chose This',
    whatsIncluded: "What's Included",
    bookPackage: 'Book This Package',
    getQuote: 'Get Custom Quote',
    otherPackages: 'Other Packages',
    viewDetails: 'View Details',
    perfectChoice: 'The Perfect Choice for Your Journey',
    customizeMsg: 'All packages can be customized to your needs',
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', packages: 'الباقات' },
    price: 'سعر الباقة',
    patients: 'اختار المرضى هذا',
    whatsIncluded: 'ما المتضمن',
    bookPackage: 'احجز هذه الباقة',
    getQuote: 'احصل على عرض أسعار مخصص',
    otherPackages: 'باقات أخرى',
    viewDetails: 'عرض التفاصيل',
    perfectChoice: 'الاختيار الأمثل لرحلتك',
    customizeMsg: 'يمكن تخصيص جميع الباقات وفقًا لاحتياجاتك',
  },
};

export default function PackageDetailClient({ pkg, otherPackages, locale }: Props) {
  const t = content[locale];
  const name = locale === 'ar' ? pkg.name_ar : pkg.name_en;
  const description = locale === 'ar' ? pkg.description_ar : pkg.description_en;

  // Extract features from JSON
  const features = pkg.features?.included || Object.values(pkg.features || {});

  return (
    <main className={`min-h-screen bg-background pt-24 ${locale === 'ar' ? 'font-arabic' : ''}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
            <Link href={`/${locale}/packages`} className="hover:text-accent transition-colors">
              {t.breadcrumb.packages}
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
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Package className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">{t.perfectChoice}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary mb-6">
                {name}
              </h1>

              <p className="text-lg text-muted-foreground mb-8">{description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card hover={false} variant="outline" className="p-4">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.price}</span>
                  </div>
                  <p className="text-foreground font-semibold text-2xl">
                    ${pkg.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{pkg.currency}</p>
                </Card>

                <Card hover={false} variant="outline" className="p-4">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.patients}</span>
                  </div>
                  <p className="text-foreground font-semibold text-2xl">
                    {pkg.bookings.length}+
                  </p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonLink
                  href={`/${locale}/consultation`}
                  variant="gold"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  {t.bookPackage}
                </ButtonLink>
                <ButtonLink href={`/${locale}/contact`} variant="outline" size="lg">
                  {t.getQuote}
                </ButtonLink>
              </div>

              <p className="text-sm text-muted-foreground mt-4 italic">
                {t.customizeMsg}
              </p>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookingForm packageId={pkg.id} locale={locale} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.whatsIncluded}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature: any, index: number) => {
                const featureText = typeof feature === 'string' ? feature : feature.toString();
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card hover={false} variant="default" className="flex items-start gap-3 p-4">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{featureText}</span>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Other Packages */}
      {otherPackages.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center">
              {t.otherPackages}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {otherPackages.map((other, index) => (
                <motion.div
                  key={other.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${locale}/packages/${other.slug}`}>
                    <Card hover={true} variant="default">
                      <CardBody>
                        <h3 className="text-2xl font-display font-bold text-primary mb-2">
                          {locale === 'ar' ? other.name_ar : other.name_en}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {locale === 'ar' ? other.description_ar : other.description_en}
                        </p>
                        <p className="text-accent font-semibold text-xl mb-4">
                          ${other.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 text-primary">
                          <span className="text-sm font-medium">{t.viewDetails}</span>
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
    </main>
  );
}
