import { Metadata } from 'next';
import { generateFullMetadata, seoKeywords } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';

// Force dynamic rendering to prevent SSR errors
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const title = isArabic
    ? 'الخدمات الطبية للمرضى من الإمارات - شفاء الهند'
    : 'Medical Services for UAE Patients - Shifa AlHind';

  const description = isArabic
    ? 'خدمات رعاية صحية متخصصة للمرضى من الإمارات العربية المتحدة في أفضل مستشفيات الهند. وفر 60-70٪ مع مستشفيات معتمدة من JCI، دعم عربي كامل، مساعدة في التأشيرة، وخدمات النقل. علاج عالمي المستوى بأسعار معقولة لمرضى دبي، أبو ظبي، والشارقة.'
    : 'Specialized healthcare services for patients from UAE in top Indian hospitals. Save 60-70% with JCI-accredited hospitals, complete Arabic support, visa assistance, and transportation services. World-class treatment at affordable prices for patients from Dubai, Abu Dhabi, and Sharjah.';

  const keywords = [
    ...seoKeywords.homepage,
    'UAE patients India',
    'Dubai to India medical tourism',
    'Abu Dhabi patients treatment India',
    'Sharjah medical tourism',
    'UAE to Bangalore healthcare',
    'Emirates patients India hospitals',
    'medical visa UAE to India',
    'healthcare for UAE residents',
  ];

  return generateFullMetadata({
    title,
    description,
    keywords,
    locale: locale as 'en' | 'ar',
    canonical: `/${locale}/for-uae-patients`,
    ogType: 'website',
  });
}

export default async function UAEPatientsPage({ params }: PageProps) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const breadcrumbItems = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: '/' },
    { name: isArabic ? 'لمرضى الإمارات' : 'For UAE Patients', url: '/for-uae-patients' },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isArabic
              ? 'مرحباً بمرضى الإمارات العربية المتحدة'
              : 'Welcome UAE Patients to World-Class Healthcare in India'}
          </h1>
          <p className="text-xl mb-8">
            {isArabic
              ? 'احصل على رعاية صحية عالمية المستوى في الهند بتكلفة 60-70٪ أقل من الإمارات'
              : 'Get world-class healthcare in India at 60-70% lower cost than UAE'}
          </p>
          <div className="flex gap-4">
            <a
              href={`/${locale}/consultation`}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {isArabic ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
            </a>
            <a
              href={`/${locale}/contact`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              {isArabic ? 'اتصل بنا' : 'Contact Us'}
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose India Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic
              ? 'لماذا يختار مرضى الإمارات الهند للعلاج؟'
              : 'Why UAE Patients Choose India for Treatment'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? '💰 توفير هائل في التكاليف' : '💰 Massive Cost Savings'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'وفر 60-70٪ على جميع الإجراءات الطبية مقارنة بأسعار الإمارات. جراحة القلب: 10,000 - 15,000 دولار (مقابل 50,000+ دولار في الإمارات)'
                  : 'Save 60-70% on all medical procedures compared to UAE prices. Heart surgery: $10,000-15,000 (vs $50,000+ in UAE)'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? '✈️ رحلة قصيرة ومريحة' : '✈️ Short & Convenient Flight'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'فقط 3-4 ساعات طيران من دبي إلى بنغالور. رحلات مباشرة يومياً على الإمارات، الاتحاد، وإنديجو. لا حاجة لرحلات طويلة مرهقة.'
                  : 'Only 3-4 hours flight from Dubai to Bangalore. Daily direct flights on Emirates, Etihad, and IndiGo. No long exhausting journeys required.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? '🗣️ دعم عربي كامل' : '🗣️ Complete Arabic Support'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'مترجمون عرب متاحون 24/7، أطباء يتحدثون العربية، تقارير طبية بالعربية، وطعام حلال. تشعر وكأنك في بيتك.'
                  : 'Arabic translators available 24/7, Arabic-speaking doctors, medical reports in Arabic, and halal food. Feel at home.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? '🏥 مستشفيات معتمدة من JCI' : '🏥 JCI-Accredited Hospitals'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'نعمل فقط مع مستشفيات حاصلة على اعتماد JCI و NABH الدولي. نفس معايير الجودة مثل أفضل مستشفيات دبي.'
                  : 'We work only with JCI and NABH internationally accredited hospitals. Same quality standards as top Dubai hospitals.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? '⚡ علاج سريع بدون انتظار' : '⚡ Fast Treatment, No Waiting'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'لا قوائم انتظار طويلة. احصل على موعدك في غضون 1-2 أسابيع. علاج سريع وفعال دون تأخير.'
                  : 'No long waiting lists. Get your appointment within 1-2 weeks. Fast and efficient treatment without delays.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {isArabic ? '📋 مساعدة كاملة في التأشيرة' : '📋 Complete Visa Assistance'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'نساعدك في الحصول على تأشيرة طبية إلكترونية في 3-5 أيام. عملية سهلة وبسيطة بدون متاعب.'
                  : 'We help you get e-Medical Visa in 3-5 days. Easy and hassle-free process without any complications.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular UAE Cities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {isArabic ? 'علاج طبي من مدن الإمارات' : 'Medical Treatment from UAE Cities'}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {isArabic
              ? 'نخدم المرضى من جميع أنحاء الإمارات. اختر مدينتك لمعرفة الخيارات المتاحة'
              : 'We serve patients from all across UAE. Select your city to explore treatment options'}
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                nameEn: 'Dubai',
                nameAr: 'دبي',
                country: 'united-arab-emirates',
                slug: 'dubai',
                icon: '🏙️',
                description: '3-4 hours to Bangalore',
              },
              {
                nameEn: 'Abu Dhabi',
                nameAr: 'أبو ظبي',
                country: 'united-arab-emirates',
                slug: 'abu-dhabi',
                icon: '🏛️',
                description: '3-4 hours to Bangalore',
              },
              {
                nameEn: 'Sharjah',
                nameAr: 'الشارقة',
                country: 'united-arab-emirates',
                slug: 'sharjah',
                icon: '🕌',
                description: '3-4 hours to Bangalore',
              },
            ].map((city) => (
              <a
                key={city.slug}
                href={`/${locale}/medical-tourism/${city.country}/${city.slug}`}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl shadow-md hover:shadow-xl transition group"
              >
                <div className="text-5xl mb-4 text-center">{city.icon}</div>
                <h3 className="text-xl font-bold text-center mb-2 group-hover:text-primary transition">
                  {isArabic ? city.nameAr : city.nameEn}
                </h3>
                <p className="text-sm text-gray-600 text-center">{city.description}</p>
                <p className="text-primary text-center mt-4 font-semibold">
                  {isArabic ? 'استكشف العلاجات →' : 'Explore Treatments →'}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Treatments Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic
              ? 'العلاجات الأكثر شعبية لمرضى الإمارات'
              : 'Most Popular Treatments for UAE Patients'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                nameEn: 'Heart Surgery',
                nameAr: 'جراحة القلب',
                priceMin: 8000,
                priceMax: 15000,
                slug: 'heart-surgery',
              },
              {
                nameEn: 'IVF & Fertility',
                nameAr: 'علاج الخصوبة',
                priceMin: 3000,
                priceMax: 5000,
                slug: 'ivf-fertility',
              },
              {
                nameEn: 'Joint Replacement',
                nameAr: 'استبدال المفاصل',
                priceMin: 6000,
                priceMax: 10000,
                slug: 'joint-replacement',
              },
              {
                nameEn: 'Cancer Treatment',
                nameAr: 'علاج السرطان',
                priceMin: 5000,
                priceMax: 20000,
                slug: 'cancer-treatment',
              },
            ].map((treatment) => (
              <a
                key={treatment.slug}
                href={`/${locale}/treatments/${treatment.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {isArabic ? treatment.nameAr : treatment.nameEn}
                </h3>
                <p className="text-primary font-bold">
                  ${treatment.priceMin.toLocaleString()} - ${treatment.priceMax.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {isArabic ? 'اعرف المزيد →' : 'Learn More →'}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isArabic ? 'خدماتنا لمرضى الإمارات' : 'Our Services for UAE Patients'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">✈️</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? 'خدمات المطار' : 'Airport Services'}
                </h3>
                <p className="text-gray-600">
                  {isArabic
                    ? 'استقبال من المطار، نقل مريح إلى المستشفى، مساعدة في الأمتعة'
                    : 'Airport pickup, comfortable transfer to hospital, luggage assistance'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🏨</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? 'ترتيبات الإقامة' : 'Accommodation Arrangements'}
                </h3>
                <p className="text-gray-600">
                  {isArabic
                    ? 'فنادق قريبة من المستشفى، شقق مفروشة، خيارات حسب ميزانيتك'
                    : 'Hotels near hospital, serviced apartments, options for your budget'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🗣️</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? 'مترجم شخصي' : 'Personal Translator'}
                </h3>
                <p className="text-gray-600">
                  {isArabic
                    ? 'مترجم عربي معك في جميع الاستشارات والإجراءات الطبية'
                    : 'Arabic translator with you for all medical consultations and procedures'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">📞</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? 'دعم 24/7' : '24/7 Support'}
                </h3>
                <p className="text-gray-600">
                  {isArabic
                    ? 'فريقنا متاح على مدار الساعة للرد على استفساراتك وحل مشاكلك'
                    : 'Our team available round-the-clock to answer queries and solve problems'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'جاهز للبدء في رحلتك العلاجية؟' : 'Ready to Start Your Medical Journey?'}
          </h2>
          <p className="text-xl mb-8">
            {isArabic
              ? 'احصل على استشارة مجانية واكتشف كيف يمكننا مساعدتك'
              : 'Get a free consultation and discover how we can help you'}
          </p>
          <a
            href={`/${locale}/consultation`}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            {isArabic ? 'احجز استشارة مجانية الآن' : 'Book Free Consultation Now'}
          </a>
        </div>
      </section>
    </>
  );
}
