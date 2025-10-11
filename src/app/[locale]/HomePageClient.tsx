'use client';

import Navigation from '@/components/public/Navigation';
import Hero from '@/components/public/Hero';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardImage } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Users, Shield, Award, ArrowRight } from 'lucide-react';
import { trackTreatmentView } from '@/components/Analytics';

const content = {
  en: {
    sections: {
      treatments: {
        title: 'Top Treatments',
        subtitle: 'Specialized care for your healing journey',
        viewAll: 'View All Treatments',
      },
      why: {
        title: 'Why Shifa AlHind',
        subtitle: 'Excellence in Every Step',
        reasons: [
          {
            icon: Shield,
            title: 'JCI Accredited',
            description: '15+ internationally certified hospitals',
          },
          {
            icon: Heart,
            title: 'Affordable Excellence',
            description: 'Save 60-70% without compromising quality',
          },
          {
            icon: Users,
            title: 'Arabic Support',
            description: '24/7 native Arabic-speaking care team',
          },
          {
            icon: Award,
            title: '98% Success Rate',
            description: 'Trusted by 10,000+ GCC patients',
          },
        ],
      },
      hospitals: {
        title: 'Partner Hospitals',
        subtitle: 'World-class care in Bangalore',
      },
      testimonials: {
        title: 'Patient Stories',
        subtitle: 'Healing journeys that inspire',
      },
      blog: {
        title: 'Latest Insights',
        subtitle: 'Expert medical guidance',
        readMore: 'Read More',
      },
    },
    footer: {
      tagline: 'Your Healing Journey from the GCC to India',
      rights: 'All rights reserved',
    },
  },
  ar: {
    sections: {
      treatments: {
        title: 'أهم العلاجات',
        subtitle: 'رعاية متخصصة لرحلة شفائك',
        viewAll: 'عرض جميع العلاجات',
      },
      why: {
        title: 'لماذا شفاء الهند',
        subtitle: 'التميز في كل خطوة',
        reasons: [
          {
            icon: Shield,
            title: 'معتمد من JCI',
            description: '15+ مستشفى معتمد دولياً',
          },
          {
            icon: Heart,
            title: 'التميز بأسعار معقولة',
            description: 'وفر 60-70٪ دون المساس بالجودة',
          },
          {
            icon: Users,
            title: 'دعم عربي',
            description: 'فريق رعاية يتحدث العربية على مدار الساعة',
          },
          {
            icon: Award,
            title: 'معدل نجاح 98٪',
            description: 'موثوق به من قبل 10,000+ مريض من الخليج',
          },
        ],
      },
      hospitals: {
        title: 'المستشفيات الشريكة',
        subtitle: 'رعاية عالمية المستوى في بنغالور',
      },
      testimonials: {
        title: 'قصص المرضى',
        subtitle: 'رحلات شفاء ملهمة',
      },
      blog: {
        title: 'أحدث الرؤى',
        subtitle: 'إرشادات طبية خبيرة',
        readMore: 'اقرأ المزيد',
      },
    },
    footer: {
      tagline: 'رحلة شفائك من دول الخليج إلى الهند',
      rights: 'جميع الحقوق محفوظة',
    },
  },
};

// Sample data
const treatments = [
  {
    id: 1,
    title: { en: 'Cardiac Surgery', ar: 'جراحة القلب' },
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=800',
    price: { en: 'From $4,500', ar: 'من 4,500 دولار' },
  },
  {
    id: 2,
    title: { en: 'Orthopedic Care', ar: 'العناية بالعظام' },
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800',
    price: { en: 'From $3,000', ar: 'من 3,000 دولار' },
  },
  {
    id: 3,
    title: { en: 'Oncology', ar: 'علاج الأورام' },
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800',
    price: { en: 'From $5,000', ar: 'من 5,000 دولار' },
  },
];

const hospitals = [
  { name: 'Apollo Hospitals', logo: '🏥' },
  { name: 'Manipal Hospital', logo: '🏥' },
  { name: 'Fortis Healthcare', logo: '🏥' },
  { name: 'Narayana Health', logo: '🏥' },
];

// All 27 GCC Cities - Complete Coverage
const gccCities = [
  // United Arab Emirates (7 cities)
  {
    nameEn: 'Dubai',
    nameAr: 'دبي',
    country: 'united-arab-emirates',
    slug: 'dubai',
    flag: '🇦🇪',
    flights: '3-4h',
    population: '3.6M',
  },
  {
    nameEn: 'Abu Dhabi',
    nameAr: 'أبو ظبي',
    country: 'united-arab-emirates',
    slug: 'abu-dhabi',
    flag: '🇦🇪',
    flights: '3-4h',
    population: '1.5M',
  },
  {
    nameEn: 'Sharjah',
    nameAr: 'الشارقة',
    country: 'united-arab-emirates',
    slug: 'sharjah',
    flag: '🇦🇪',
    flights: '3-4h',
    population: '1.7M',
  },
  {
    nameEn: 'Ajman',
    nameAr: 'عجمان',
    country: 'united-arab-emirates',
    slug: 'ajman',
    flag: '🇦🇪',
    flights: '3-4h',
    population: '540K',
  },
  {
    nameEn: 'Ras Al Khaimah',
    nameAr: 'رأس الخيمة',
    country: 'united-arab-emirates',
    slug: 'ras-al-khaimah',
    flag: '🇦🇪',
    flights: '3-4h',
    population: '400K',
  },
  {
    nameEn: 'Fujairah',
    nameAr: 'الفجيرة',
    country: 'united-arab-emirates',
    slug: 'fujairah',
    flag: '🇦🇪',
    flights: '3-4h',
    population: '260K',
  },
  {
    nameEn: 'Al Ain',
    nameAr: 'العين',
    country: 'united-arab-emirates',
    slug: 'al-ain',
    flag: '🇦🇪',
    flights: '3-4h',
    population: '850K',
  },

  // Saudi Arabia (8 cities)
  {
    nameEn: 'Riyadh',
    nameAr: 'الرياض',
    country: 'saudi-arabia',
    slug: 'riyadh',
    flag: '🇸🇦',
    flights: '4-5h',
    population: '7.6M',
  },
  {
    nameEn: 'Jeddah',
    nameAr: 'جدة',
    country: 'saudi-arabia',
    slug: 'jeddah',
    flag: '🇸🇦',
    flights: '4-5h',
    population: '4.7M',
  },
  {
    nameEn: 'Dammam',
    nameAr: 'الدمام',
    country: 'saudi-arabia',
    slug: 'dammam',
    flag: '🇸🇦',
    flights: '4-5h',
    population: '1.5M',
  },
  {
    nameEn: 'Khobar',
    nameAr: 'الخبر',
    country: 'saudi-arabia',
    slug: 'khobar',
    flag: '🇸🇦',
    flights: '4-5h',
    population: '730K',
  },
  {
    nameEn: 'Mecca',
    nameAr: 'مكة',
    country: 'saudi-arabia',
    slug: 'mecca',
    flag: '🇸🇦',
    flights: '4-5h',
    population: '2.0M',
  },
  {
    nameEn: 'Medina',
    nameAr: 'المدينة',
    country: 'saudi-arabia',
    slug: 'medina',
    flag: '🇸🇦',
    flights: '4-5h',
    population: '1.5M',
  },
  {
    nameEn: 'Taif',
    nameAr: 'الطائف',
    country: 'saudi-arabia',
    slug: 'taif',
    flag: '🇸🇦',
    flights: '4-5h',
    population: '690K',
  },
  {
    nameEn: 'Tabuk',
    nameAr: 'تبوك',
    country: 'saudi-arabia',
    slug: 'tabuk',
    flag: '🇸🇦',
    flights: '5-6h',
    population: '570K',
  },

  // Qatar (3 cities)
  {
    nameEn: 'Doha',
    nameAr: 'الدوحة',
    country: 'qatar',
    slug: 'doha',
    flag: '🇶🇦',
    flights: '4-5h',
    population: '2.4M',
  },
  {
    nameEn: 'Al Wakrah',
    nameAr: 'الوكرة',
    country: 'qatar',
    slug: 'al-wakrah',
    flag: '🇶🇦',
    flights: '4-5h',
    population: '300K',
  },
  {
    nameEn: 'Al Khor',
    nameAr: 'الخور',
    country: 'qatar',
    slug: 'al-khor',
    flag: '🇶🇦',
    flights: '4-5h',
    population: '200K',
  },

  // Oman (4 cities)
  {
    nameEn: 'Muscat',
    nameAr: 'مسقط',
    country: 'oman',
    slug: 'muscat',
    flag: '🇴🇲',
    flights: '3-4h',
    population: '1.7M',
  },
  {
    nameEn: 'Sohar',
    nameAr: 'صحار',
    country: 'oman',
    slug: 'sohar',
    flag: '🇴🇲',
    flights: '3-4h',
    population: '230K',
  },
  {
    nameEn: 'Salalah',
    nameAr: 'صلالة',
    country: 'oman',
    slug: 'salalah',
    flag: '🇴🇲',
    flights: '4-5h',
    population: '330K',
  },
  {
    nameEn: 'Nizwa',
    nameAr: 'نزوى',
    country: 'oman',
    slug: 'nizwa',
    flag: '🇴🇲',
    flights: '3-4h',
    population: '100K',
  },

  // Kuwait (4 cities)
  {
    nameEn: 'Kuwait City',
    nameAr: 'مدينة الكويت',
    country: 'kuwait',
    slug: 'kuwait-city',
    flag: '🇰🇼',
    flights: '4-5h',
    population: '4.3M',
  },
  {
    nameEn: 'Hawalli',
    nameAr: 'حولي',
    country: 'kuwait',
    slug: 'hawalli',
    flag: '🇰🇼',
    flights: '4-5h',
    population: '165K',
  },
  {
    nameEn: 'Salmiya',
    nameAr: 'السالمية',
    country: 'kuwait',
    slug: 'salmiya',
    flag: '🇰🇼',
    flights: '4-5h',
    population: '150K',
  },
  {
    nameEn: 'Farwaniya',
    nameAr: 'الفروانية',
    country: 'kuwait',
    slug: 'farwaniya',
    flag: '🇰🇼',
    flights: '4-5h',
    population: '900K',
  },

  // Bahrain (3 cities)
  {
    nameEn: 'Manama',
    nameAr: 'المنامة',
    country: 'bahrain',
    slug: 'manama',
    flag: '🇧🇭',
    flights: '4-5h',
    population: '640K',
  },
  {
    nameEn: 'Muharraq',
    nameAr: 'المحرق',
    country: 'bahrain',
    slug: 'muharraq',
    flag: '🇧🇭',
    flights: '4-5h',
    population: '230K',
  },
  {
    nameEn: 'Riffa',
    nameAr: 'الرفاع',
    country: 'bahrain',
    slug: 'riffa',
    flag: '🇧🇭',
    flights: '4-5h',
    population: '120K',
  },
];

export default function HomePageClient({ locale }: { locale: 'en' | 'ar' }) {
  const t = content[locale];

  return (
    <div className="min-h-screen">
      <Navigation locale={locale} />
      <Hero locale={locale} />

      {/* Treatments Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-4 leading-tight ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {t.sections.treatments.title}
            </h2>
            <p
              className={`text-lg sm:text-xl text-muted-foreground ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {t.sections.treatments.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${locale}/treatments/${treatment.id}`}
                  onClick={() => trackTreatmentView(treatment.title[locale])}
                >
                  <Card hover={true} variant="default" className="relative">
                    <CardImage
                      src={treatment.image}
                      alt={treatment.title[locale]}
                      aspectRatio="4/3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-6 text-white">
                      <h3
                        className={`text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}
                      >
                        {treatment.title[locale]}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-semibold text-lg sm:text-lg">
                          {treatment.price[locale]}
                        </span>
                        <ArrowRight className="w-6 h-6 sm:w-6 sm:h-6 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <ButtonLink
              href={`/${locale}/treatments`}
              variant="gold"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.sections.treatments.viewAll}
            </ButtonLink>
          </motion.div>
        </div>
      </section>

      {/* Why Shifa AlHind */}
      <section className="py-24 emerald-gradient text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {t.sections.why.title}
            </h2>
            <p
              className={`text-lg sm:text-xl text-white/80 ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {t.sections.why.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.sections.why.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark p-8 sm:p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <reason.icon className="w-14 h-14 sm:w-12 sm:h-12 text-accent mb-5 sm:mb-4 mx-auto" />
                <h3
                  className={`text-xl sm:text-xl font-bold mb-3 leading-snug ${locale === 'ar' ? 'font-arabic' : ''}`}
                >
                  {reason.title}
                </h3>
                <p
                  className={`text-base sm:text-base text-white/80 leading-relaxed ${locale === 'ar' ? 'font-arabic' : ''}`}
                >
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GCC Cities Section - Complete 27-City Coverage */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {locale === 'ar' ? '27 مدينة من دول الخليج ✓' : '27 GCC Cities Coverage ✓'}
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-4 leading-tight ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {locale === 'ar' ? 'تغطية كاملة لدول الخليج' : 'Complete GCC Coverage'}
            </h2>
            <p
              className={`text-lg sm:text-xl text-muted-foreground ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {locale === 'ar'
                ? 'اكتشف أفضل المستشفيات في بنغالور من 27 مدينة رئيسية'
                : 'Discover world-class healthcare from 27 major GCC cities'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {gccCities.map((city, index) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
              >
                <Link
                  href={`/${locale}/medical-tourism/${city.country}/${city.slug}`}
                  className="block bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{city.flag}</div>
                    <h3
                      className={`text-base font-bold text-primary group-hover:text-accent transition-colors mb-1 ${locale === 'ar' ? 'font-arabic' : ''}`}
                    >
                      {locale === 'ar' ? city.nameAr : city.nameEn}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">👥 {city.population}</p>
                    <p className="text-xs text-gray-600">✈️ {city.flights}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-sm text-muted-foreground mb-4">
              {locale === 'ar'
                ? '🇦🇪 الإمارات (7) • 🇸🇦 السعودية (8) • 🇶🇦 قطر (3) • 🇴🇲 عمان (4) • 🇰🇼 الكويت (4) • 🇧🇭 البحرين (3)'
                : '🇦🇪 UAE (7) • 🇸🇦 Saudi (8) • 🇶🇦 Qatar (3) • 🇴🇲 Oman (4) • 🇰🇼 Kuwait (4) • 🇧🇭 Bahrain (3)'}
            </p>
            <Link
              href={`/${locale}/medical-tourism`}
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              {locale === 'ar' ? 'استكشف جميع المدن والعلاجات' : 'Explore All Cities & Treatments'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partner Hospitals */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-4 leading-tight ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {t.sections.hospitals.title}
            </h2>
            <p
              className={`text-lg sm:text-xl text-muted-foreground ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              {t.sections.hospitals.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {hospitals.map((hospital, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <div className="text-6xl mb-4">{hospital.logo}</div>
                <p className="font-semibold text-foreground">{hospital.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-primary">ش</span>
            </div>
            <h3
              className={`text-3xl font-display font-bold mb-4 ${locale === 'ar' ? 'font-arabic' : ''}`}
            >
              Shifa AlHind
            </h3>
            <p className={`text-xl text-white/80 mb-8 ${locale === 'ar' ? 'font-arabic' : ''}`}>
              {t.footer.tagline}
            </p>
            <div className="w-24 h-1 gold-gradient mx-auto mb-8"></div>
            <p className={`text-sm text-white/60 ${locale === 'ar' ? 'font-arabic' : ''}`}>
              © 2025 Shifa AlHind. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton locale={locale} />
    </div>
  );
}
