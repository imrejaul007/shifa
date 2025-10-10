import { Metadata } from 'next';
import { generateFullMetadata } from '@/lib/seo-helpers';
import Link from 'next/link';
import { Plane, Heart, DollarSign, Award } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

// Cities organized by country
const COUNTRIES_DATA = [
  {
    slug: 'saudi-arabia',
    name_en: 'Saudi Arabia',
    name_ar: 'المملكة العربية السعودية',
    cities: [
      {
        slug: 'riyadh',
        name_en: 'Riyadh',
        name_ar: 'الرياض',
        image: '/images/cities/riyadh.jpg',
        flight_time: '4-5 hours',
      },
      {
        slug: 'jeddah',
        name_en: 'Jeddah',
        name_ar: 'جدة',
        image: '/images/cities/jeddah.jpg',
        flight_time: '4-5 hours',
      },
    ],
  },
  {
    slug: 'united-arab-emirates',
    name_en: 'United Arab Emirates',
    name_ar: 'الإمارات العربية المتحدة',
    cities: [
      {
        slug: 'dubai',
        name_en: 'Dubai',
        name_ar: 'دبي',
        image: '/images/cities/dubai.jpg',
        flight_time: '3-4 hours',
      },
      {
        slug: 'abu-dhabi',
        name_en: 'Abu Dhabi',
        name_ar: 'أبو ظبي',
        image: '/images/cities/abu-dhabi.jpg',
        flight_time: '3-4 hours',
      },
    ],
  },
  {
    slug: 'qatar',
    name_en: 'Qatar',
    name_ar: 'قطر',
    cities: [
      {
        slug: 'doha',
        name_en: 'Doha',
        name_ar: 'الدوحة',
        image: '/images/cities/doha.jpg',
        flight_time: '4-5 hours',
      },
    ],
  },
  {
    slug: 'oman',
    name_en: 'Oman',
    name_ar: 'سلطنة عمان',
    cities: [
      {
        slug: 'muscat',
        name_en: 'Muscat',
        name_ar: 'مسقط',
        image: '/images/cities/muscat.jpg',
        flight_time: '3-4 hours',
      },
    ],
  },
  {
    slug: 'kuwait',
    name_en: 'Kuwait',
    name_ar: 'الكويت',
    cities: [
      {
        slug: 'kuwait-city',
        name_en: 'Kuwait City',
        name_ar: 'مدينة الكويت',
        image: '/images/cities/kuwait-city.jpg',
        flight_time: '4-5 hours',
      },
    ],
  },
  {
    slug: 'bahrain',
    name_en: 'Bahrain',
    name_ar: 'البحرين',
    cities: [
      {
        slug: 'manama',
        name_en: 'Manama',
        name_ar: 'المنامة',
        image: '/images/cities/manama.jpg',
        flight_time: '4-5 hours',
      },
    ],
  },
];

const TREATMENTS = [
  { slug: 'heart-surgery', name_en: 'Heart Surgery', name_ar: 'جراحة القلب', icon: '❤️' },
  { slug: 'knee-replacement', name_en: 'Knee Replacement', name_ar: 'استبدال الركبة', icon: '🦴' },
  { slug: 'hip-replacement', name_en: 'Hip Replacement', name_ar: 'استبدال الورك', icon: '🦴' },
  { slug: 'ivf', name_en: 'IVF Treatment', name_ar: 'علاج أطفال الأنابيب', icon: '👶' },
  { slug: 'dental-implants', name_en: 'Dental Implants', name_ar: 'زراعة الأسنان', icon: '🦷' },
  { slug: 'hair-transplant', name_en: 'Hair Transplant', name_ar: 'زراعة الشعر', icon: '💇' },
  { slug: 'cataract-surgery', name_en: 'Cataract Surgery', name_ar: 'جراحة الساد', icon: '👁️' },
  { slug: 'oncology-treatment', name_en: 'Cancer Treatment', name_ar: 'علاج الأورام', icon: '🎗️' },
  {
    slug: 'cosmetic-surgery',
    name_en: 'Cosmetic Surgery',
    name_ar: 'الجراحة التجميلية',
    icon: '✨',
  },
  { slug: 'bariatric-surgery', name_en: 'Bariatric Surgery', name_ar: 'جراحة السمنة', icon: '⚖️' },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const title = isArabic
    ? 'السياحة العلاجية من دول الخليج إلى الهند — وفر 60-70٪ | شفاء الهند'
    : 'Medical Tourism from GCC to India — Save 60-70% | Shifa AlHind';

  const description = isArabic
    ? 'سافر من السعودية، الإمارات، قطر، عمان، الكويت، البحرين إلى الهند للعلاج الطبي عالمي المستوى. مستشفيات معتمدة من JCI، دعم عربي، أسعار شفافة.'
    : 'Travel from Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain to India for world-class medical treatment. JCI-accredited hospitals, Arabic support, transparent pricing.';

  return generateFullMetadata({
    title,
    description,
    locale,
    canonical: `/${locale}/medical-tourism`,
    keywords: [
      'medical tourism GCC to India',
      'healthcare Saudi Arabia UAE India',
      'medical treatment costs India',
      'JCI hospitals India',
      'Arabic medical tourism India',
      'Bangalore medical tourism',
    ],
    ogType: 'website',
  });
}

export default async function MedicalTourismPage({ params }: PageProps) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <div className={`min-h-screen ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">
            {isArabic
              ? 'السياحة العلاجية من دول الخليج إلى الهند'
              : 'Medical Tourism from GCC to India'}
          </h1>
          <p className="text-xl mb-8 max-w-3xl">
            {isArabic
              ? 'احصل على علاج طبي عالمي المستوى في الهند مع توفير 60-70٪ من التكاليف. مستشفيات معتمدة دوليًا، دعم عربي، وتنسيق كامل للرحلة.'
              : 'Get world-class medical treatment in India with 60-70% cost savings. Internationally accredited hospitals, Arabic support, and complete travel coordination.'}
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic
              ? 'لماذا تختار الهند للعلاج الطبي؟'
              : 'Why Choose India for Medical Treatment?'}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'توفير 60-70٪' : 'Save 60-70%'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'أسعار معقولة مقارنة بدول الخليج مع نفس الجودة'
                  : 'Affordable pricing compared to GCC with same quality'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'مستشفيات معتمدة' : 'JCI Accredited'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'مستشفيات حاصلة على اعتماد JCI و NABH الدولي'
                  : 'Hospitals with JCI and NABH international accreditation'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'رعاية شخصية' : 'Personalized Care'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'منسق شخصي يتحدث العربية لكل مريض'
                  : 'Personal Arabic-speaking coordinator for each patient'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'سهولة السفر' : 'Easy Travel'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'رحلات مباشرة 3-5 ساعات، مساعدة في التأشيرة'
                  : 'Direct flights 3-5 hours, visa assistance included'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cities by Country */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            {isArabic ? 'اختر مدينتك' : 'Choose Your City'}
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            {isArabic
              ? 'نخدم المرضى من جميع دول مجلس التعاون الخليجي'
              : 'We serve patients from all GCC countries'}
          </p>

          {COUNTRIES_DATA.map((country) => (
            <div key={country.slug} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                {isArabic ? country.name_ar : country.name_en}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {country.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${locale}/medical-tourism/${country.slug}/${city.slug}`}
                    className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Plane className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm opacity-90">{city.flight_time}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                        {isArabic ? city.name_ar : city.name_en}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {isArabic
                          ? 'عرض الأسعار والعلاجات المتاحة'
                          : 'View pricing and available treatments'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Treatments */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            {isArabic ? 'العلاجات الشائعة' : 'Popular Treatments'}
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            {isArabic
              ? 'نقدم مجموعة واسعة من العلاجات الطبية المتخصصة'
              : 'We offer a wide range of specialized medical treatments'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {TREATMENTS.map((treatment) => (
              <div
                key={treatment.slug}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center"
              >
                <div className="text-4xl mb-3">{treatment.icon}</div>
                <h3 className="font-semibold mb-2">
                  {isArabic ? treatment.name_ar : treatment.name_en}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-700 mb-4">
              {isArabic
                ? 'اختر مدينتك أعلاه لعرض الأسعار والمستشفيات المحددة لكل علاج'
                : 'Select your city above to view specific pricing and hospitals for each treatment'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {isArabic ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl mb-8">
            {isArabic
              ? 'احصل على استشارة مجانية وعرض أسعار مخصص من أفضل المستشفيات في الهند'
              : 'Get a free consultation and personalized quote from top hospitals in India'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              {isArabic ? 'احصل على عرض أسعار مجاني' : 'Get Free Quote'}
            </Link>
            <Link
              href={`/${locale}/consultation`}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition border-2 border-white"
            >
              {isArabic ? 'احجز استشارة' : 'Book Consultation'}
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            {isArabic ? 'كيف تعمل العملية؟' : 'How It Works'}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'أرسل تقاريرك الطبية' : 'Submit Medical Reports'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'شارك تقاريرك الطبية معنا للحصول على رأي طبي مبدئي'
                  : 'Share your medical reports for initial medical opinion'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'احصل على عروض الأسعار' : 'Receive Quotes'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'احصل على عروض أسعار مفصلة من مستشفيات معتمدة'
                  : 'Get detailed quotes from accredited hospitals'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'نساعدك في السفر' : 'We Arrange Travel'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'نساعدك في التأشيرة، الحجوزات، والنقل من المطار'
                  : 'We help with visa, bookings, and airport pickup'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'احصل على العلاج' : 'Receive Treatment'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'احصل على علاج عالي الجودة مع دعم عربي مستمر'
                  : 'Receive quality treatment with continuous Arabic support'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            name: 'Shifa AlHind',
            description: isArabic
              ? 'خدمات السياحة العلاجية من دول الخليج إلى الهند'
              : 'Medical tourism services from GCC to India',
            url: `https://shifaalhind.com/${locale}/medical-tourism`,
            areaServed: [
              'Saudi Arabia',
              'United Arab Emirates',
              'Qatar',
              'Oman',
              'Kuwait',
              'Bahrain',
            ],
            medicalSpecialty: [
              'Cardiology',
              'Orthopedics',
              'Fertility',
              'Dentistry',
              'Oncology',
              'Cosmetic Surgery',
            ],
            availableLanguage: ['English', 'Arabic'],
          }),
        }}
      />
    </div>
  );
}
