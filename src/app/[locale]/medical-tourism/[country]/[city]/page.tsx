import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateFullMetadata } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import Link from 'next/link';
import { CostComparisonCalculator, MedicalTourismInquiryForm } from '@/components/medical-tourism';
import { getArticlesByCity } from '@/lib/content-service';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    country: string;
    city: string;
  }>;
}

interface CityData {
  name_en: string;
  name_ar: string;
  country_en: string;
  country_ar: string;
  flight_time: string;
  currency: string;
  currency_symbol: string;
}

// City data configuration
const CITIES_DATA = {
  'saudi-arabia': {
    riyadh: {
      name_en: 'Riyadh',
      name_ar: 'الرياض',
      country_en: 'Saudi Arabia',
      country_ar: 'المملكة العربية السعودية',
      flight_time: '4-5',
      currency: 'SAR',
      currency_symbol: 'ر.س',
    },
    jeddah: {
      name_en: 'Jeddah',
      name_ar: 'جدة',
      country_en: 'Saudi Arabia',
      country_ar: 'المملكة العربية السعودية',
      flight_time: '4-5',
      currency: 'SAR',
      currency_symbol: 'ر.س',
    },
  },
  'united-arab-emirates': {
    dubai: {
      name_en: 'Dubai',
      name_ar: 'دبي',
      country_en: 'United Arab Emirates',
      country_ar: 'الإمارات العربية المتحدة',
      flight_time: '3-4',
      currency: 'AED',
      currency_symbol: 'د.إ',
    },
    'abu-dhabi': {
      name_en: 'Abu Dhabi',
      name_ar: 'أبو ظبي',
      country_en: 'United Arab Emirates',
      country_ar: 'الإمارات العربية المتحدة',
      flight_time: '3-4',
      currency: 'AED',
      currency_symbol: 'د.إ',
    },
  },
  qatar: {
    doha: {
      name_en: 'Doha',
      name_ar: 'الدوحة',
      country_en: 'Qatar',
      country_ar: 'قطر',
      flight_time: '4-5',
      currency: 'QAR',
      currency_symbol: 'ر.ق',
    },
  },
  oman: {
    muscat: {
      name_en: 'Muscat',
      name_ar: 'مسقط',
      country_en: 'Oman',
      country_ar: 'سلطنة عمان',
      flight_time: '3-4',
      currency: 'OMR',
      currency_symbol: 'ر.ع',
    },
  },
  kuwait: {
    'kuwait-city': {
      name_en: 'Kuwait City',
      name_ar: 'مدينة الكويت',
      country_en: 'Kuwait',
      country_ar: 'الكويت',
      flight_time: '4-5',
      currency: 'KWD',
      currency_symbol: 'د.ك',
    },
  },
  bahrain: {
    manama: {
      name_en: 'Manama',
      name_ar: 'المنامة',
      country_en: 'Bahrain',
      country_ar: 'البحرين',
      flight_time: '4-5',
      currency: 'BHD',
      currency_symbol: 'د.ب',
    },
  },
} as const;

// Treatments configuration
const TREATMENTS = [
  {
    slug: 'heart-surgery',
    name_en: 'Heart Surgery',
    name_ar: 'جراحة القلب',
    icon: '❤️',
    price_min: 10000,
    price_max: 15000,
    description_en: 'CABG, valve replacement, angioplasty',
    description_ar: 'جراحة المجازة، استبدال الصمام، القسطرة',
  },
  {
    slug: 'knee-replacement',
    name_en: 'Knee Replacement',
    name_ar: 'استبدال الركبة',
    icon: '🦴',
    price_min: 6000,
    price_max: 8000,
    description_en: 'Total & partial knee arthroplasty',
    description_ar: 'استبدال الركبة الكامل والجزئي',
  },
  {
    slug: 'hip-replacement',
    name_en: 'Hip Replacement',
    name_ar: 'استبدال الورك',
    icon: '🦴',
    price_min: 6500,
    price_max: 9000,
    description_en: 'Total hip arthroplasty, revision surgery',
    description_ar: 'استبدال الورك الكامل، جراحة المراجعة',
  },
  {
    slug: 'ivf',
    name_en: 'IVF Treatment',
    name_ar: 'علاج أطفال الأنابيب',
    icon: '👶',
    price_min: 3000,
    price_max: 4000,
    description_en: 'In-vitro fertilization, fertility care',
    description_ar: 'التخصيب في المختبر، رعاية الخصوبة',
  },
  {
    slug: 'dental-implants',
    name_en: 'Dental Implants',
    name_ar: 'زراعة الأسنان',
    icon: '🦷',
    price_min: 800,
    price_max: 1500,
    description_en: 'Full mouth reconstruction, implants',
    description_ar: 'إعادة بناء الفم، الزراعة',
  },
  {
    slug: 'hair-transplant',
    name_en: 'Hair Transplant',
    name_ar: 'زراعة الشعر',
    icon: '💇',
    price_min: 1500,
    price_max: 3000,
    description_en: 'FUE, FUT hair restoration',
    description_ar: 'استعادة الشعر FUE، FUT',
  },
  {
    slug: 'cataract-surgery',
    name_en: 'Cataract Surgery',
    name_ar: 'جراحة الساد',
    icon: '👁️',
    price_min: 1200,
    price_max: 2000,
    description_en: 'Lens replacement, laser surgery',
    description_ar: 'استبدال العدسة، الجراحة بالليزر',
  },
  {
    slug: 'oncology-treatment',
    name_en: 'Cancer Treatment',
    name_ar: 'علاج السرطان',
    icon: '🎗️',
    price_min: 5000,
    price_max: 20000,
    description_en: 'Chemotherapy, radiation, surgery',
    description_ar: 'العلاج الكيميائي، الإشعاعي، الجراحة',
  },
  {
    slug: 'cosmetic-surgery',
    name_en: 'Cosmetic Surgery',
    name_ar: 'الجراحة التجميلية',
    icon: '✨',
    price_min: 2000,
    price_max: 6000,
    description_en: 'Rhinoplasty, liposuction, facelifts',
    description_ar: 'تجميل الأنف، شفط الدهون، شد الوجه',
  },
  {
    slug: 'bariatric-surgery',
    name_en: 'Bariatric Surgery',
    name_ar: 'جراحة السمنة',
    icon: '⚖️',
    price_min: 5000,
    price_max: 8000,
    description_en: 'Gastric bypass, sleeve gastrectomy',
    description_ar: 'تحويل المعدة، قص المعدة',
  },
];

function getCityData(country: string, city: string): CityData | null {
  const countryData = CITIES_DATA[country as keyof typeof CITIES_DATA];
  if (!countryData) return null;
  return (countryData[city as keyof typeof countryData] as CityData) || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country, city } = await params;
  const isArabic = locale === 'ar';

  const cityData = getCityData(country, city);
  if (!cityData) return {};

  const cityName = isArabic ? cityData.name_ar : cityData.name_en;
  const countryName = isArabic ? cityData.country_ar : cityData.country_en;

  const title = isArabic
    ? `السياحة العلاجية من ${cityName} إلى الهند — وفر 60-70٪ | شفاء الهند`
    : `Medical Tourism from ${cityName} to India — Save 60-70% | Shifa AlHind`;

  const description = isArabic
    ? `سافر من ${cityName}، ${countryName} إلى الهند للعلاج الطبي عالمي المستوى. دعم عربي، مساعدة في التأشيرة، ومستشفيات معتمدة من JCI في بنغالور. احصل على عرض أسعار مجاني.`
    : `Travel from ${cityName}, ${countryName} to India for world-class medical treatment. Arabic support, visa assistance, and JCI-accredited hospitals in Bangalore. Get a free quote.`;

  return generateFullMetadata({
    title,
    description,
    locale,
    canonical: `/${locale}/medical-tourism/${country}/${city}`,
    keywords: [
      `medical tourism ${cityName} to India`,
      `${cityName} medical travel India cost`,
      `${countryName} healthcare India visa`,
      `medical treatment ${cityName} patients Bangalore`,
      `Arabic support medical tourism India ${cityName}`,
    ],
    ogType: 'website',
  });
}

export default async function CityMedicalTourismPage({ params }: PageProps) {
  const { locale, country, city } = await params;
  const isArabic = locale === 'ar';

  const cityData = getCityData(country, city);
  if (!cityData) {
    notFound();
  }

  const cityName = isArabic ? cityData.name_ar : cityData.name_en;
  const countryName = isArabic ? cityData.country_ar : cityData.country_en;

  // Get blog articles for this city (top 9 articles)
  const cityBlogArticles = getArticlesByCity(city, locale).slice(0, 9);

  const breadcrumbItems = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: '/' },
    { name: isArabic ? 'السياحة العلاجية' : 'Medical Tourism', url: '/medical-tourism' },
    { name: countryName, url: `/medical-tourism/${country}` },
    { name: cityName, url: `/medical-tourism/${country}/${city}` },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {isArabic
              ? `السياحة العلاجية من ${cityName} إلى الهند`
              : `Medical Tourism from ${cityName} to India`}
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl">
            {isArabic
              ? 'وفر 60-70٪ على الرعاية الصحية عالمية المستوى | دعم عربي | مستشفيات معتمدة من JCI'
              : 'Save 60-70% on World-Class Healthcare | Arabic Support | JCI-Accredited Hospitals'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/consultation`}
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {isArabic ? 'احجز استشارة مجانية' : 'Get Free Consultation'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              {isArabic ? 'اتصل بنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isArabic ? 'حقائق سريعة' : 'Quick Facts'}
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">✈️</div>
                <h3 className="font-semibold mb-1">{isArabic ? 'وقت الرحلة' : 'Flight Time'}</h3>
                <p className="text-gray-600">
                  {cityData.flight_time} {isArabic ? 'ساعات' : 'hours'}
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold mb-1">{isArabic ? 'وفر' : 'Save'}</h3>
                <p className="text-gray-600">60-70%</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🗣️</div>
                <h3 className="font-semibold mb-1">{isArabic ? 'الدعم' : 'Support'}</h3>
                <p className="text-gray-600">{isArabic ? 'عربي 24/7' : 'Arabic 24/7'}</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold mb-1">{isArabic ? 'التأشيرة' : 'Visa'}</h3>
                <p className="text-gray-600">{isArabic ? '3-5 أيام' : '3-5 days'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Treatments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic
              ? `العلاجات الأكثر شعبية لمرضى ${cityName}`
              : `Popular Treatments for ${cityName} Patients`}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TREATMENTS.map((treatment) => (
              <Link
                key={treatment.slug}
                href={`/${locale}/medical-tourism/${country}/${city}/${treatment.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group"
              >
                <div className="text-4xl mb-4">{treatment.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                  {isArabic ? treatment.name_ar : treatment.name_en}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isArabic ? treatment.description_ar : treatment.description_en}
                </p>
                <p className="text-primary font-bold">
                  ${treatment.price_min.toLocaleString()} - ${treatment.price_max.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {isArabic ? 'اعرف المزيد →' : 'Learn More →'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose India */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic
              ? `لماذا يختار مرضى ${cityName} الهند للعلاج؟`
              : `Why ${cityName} Patients Choose India for Treatment`}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? '💰 توفير هائل في التكاليف' : '💰 Massive Cost Savings'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? `وفر 60-70٪ على جميع الإجراءات الطبية مقارنة بأسعار ${cityName}. جودة عالمية بتكلفة معقولة.`
                  : `Save 60-70% on all medical procedures compared to ${cityName} prices. World-class quality at affordable costs.`}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? '🏥 مستشفيات معتمدة من JCI' : '🏥 JCI-Accredited Hospitals'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'نعمل فقط مع مستشفيات حاصلة على اعتماد JCI و NABH الدولي. نفس معايير الجودة مثل أفضل المستشفيات العالمية.'
                  : 'We work only with JCI and NABH internationally accredited hospitals. Same quality standards as top global hospitals.'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? '🗣️ دعم عربي كامل' : '🗣️ Complete Arabic Support'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'مترجمون عرب متاحون 24/7، أطباء يتحدثون العربية، تقارير طبية بالعربية، وطعام حلال.'
                  : 'Arabic translators available 24/7, Arabic-speaking doctors, medical reports in Arabic, and halal food.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <CostComparisonCalculator locale={locale} variant="full" />
        </div>
      </section>

      {/* Featured Blog Articles for City */}
      {cityBlogArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isArabic
                ? `مقالات مميزة لمرضى ${cityName}`
                : `Featured Articles for ${cityName} Patients`}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {isArabic
                ? 'اقرأ أحدث الأفكار والنصائح الطبية المصممة خصيصاً لمرضى ${cityName}'
                : `Read the latest medical insights and expert advice tailored for ${cityName} patients`}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityBlogArticles.map((article) => {
                const urlParts = article.url.split('/');
                const articleCountry = urlParts[5];
                const articleCity = urlParts[6];
                const articleTreatment = urlParts[7];
                const articleSlug = urlParts[8];

                return (
                  <Link
                    key={article.url}
                    href={`/${locale}/blog/${articleCountry}/${articleCity}/${articleTreatment}/${articleSlug}`}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 line-clamp-2 group-hover:text-primary">
                      {article.h1}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.meta_desc}</p>
                    <span className="text-primary text-sm font-medium inline-flex items-center">
                      {isArabic ? 'اقرأ المزيد' : 'Read More'}
                      <svg
                        className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/blog`}
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                {isArabic ? 'عرض جميع المقالات' : 'View All Articles'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <MedicalTourismInquiryForm locale={locale} city={city} country={country} />
          </div>
        </div>
      </section>

      {/* Related GCC Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {isArabic ? 'مدن أخرى من دول الخليج' : 'Other Popular GCC Cities'}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {isArabic
              ? 'اكتشف خدماتنا الطبية من مدن أخرى في الخليج'
              : 'Explore our medical services from other GCC cities'}
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Dubai',
                nameAr: 'دبي',
                country: 'united-arab-emirates',
                slug: 'dubai',
                icon: '🏙️',
              },
              {
                name: 'Riyadh',
                nameAr: 'الرياض',
                country: 'saudi-arabia',
                slug: 'riyadh',
                icon: '🏛️',
              },
              { name: 'Doha', nameAr: 'الدوحة', country: 'qatar', slug: 'doha', icon: '🌆' },
              { name: 'Muscat', nameAr: 'مسقط', country: 'oman', slug: 'muscat', icon: '🕌' },
            ]
              .filter((c) => c.slug !== city)
              .slice(0, 4)
              .map((relatedCity) => (
                <Link
                  key={relatedCity.slug}
                  href={`/${locale}/medical-tourism/${relatedCity.country}/${relatedCity.slug}`}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition group"
                >
                  <div className="text-4xl mb-3">{relatedCity.icon}</div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition">
                    {isArabic ? relatedCity.nameAr : relatedCity.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {isArabic ? 'استكشف العلاجات →' : 'Explore Treatments →'}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'جاهز للبدء في رحلتك العلاجية؟' : 'Ready to Start Your Medical Journey?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isArabic
              ? 'احصل على استشارة مجانية واكتشف كيف يمكننا مساعدتك'
              : 'Get a free consultation and discover how we can help you'}
          </p>
          <Link
            href={`/${locale}/consultation`}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            {isArabic ? 'احجز استشارة مجانية الآن' : 'Book Free Consultation Now'}
          </Link>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600 text-center">
            <strong>{isArabic ? 'إخلاء المسؤولية الطبية:' : 'Medical Disclaimer:'}</strong>{' '}
            {isArabic
              ? 'تقديرات التكلفة تقريبية وقد تختلف بناءً على الظروف الطبية الفردية واختيار المستشفى وتعقيد العلاج. جميع المعلومات المقدمة هي للإرشاد العام فقط ولا ينبغي اعتبارها نصيحة طبية. استشر المهنيين الطبيين المؤهلين قبل اتخاذ قرارات العلاج.'
              : 'Cost estimates are approximate and may vary based on individual medical conditions, hospital selection, and treatment complexity. All information provided is for general guidance only and should not be considered medical advice. Consult with qualified medical professionals before making treatment decisions.'}
          </p>
        </div>
      </section>
    </>
  );
}
