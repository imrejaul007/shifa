import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateFullMetadata, generateMedicalProcedureSchema } from '@/lib/seo-helpers';
import Breadcrumb from '@/components/SEO/Breadcrumb';
import Link from 'next/link';
import { getArticlesByTreatment } from '@/lib/content-service';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    country: string;
    city: string;
    treatment: string;
  }>;
}

// Treatment data configuration
const TREATMENTS_DATA = {
  'heart-surgery': {
    name_en: 'Heart Surgery',
    name_ar: 'جراحة القلب',
    icon: '❤️',
    price_min: 10000,
    price_max: 15000,
    description_en: 'Comprehensive cardiac care including CABG, valve replacement, and angioplasty',
    description_ar: 'رعاية قلبية شاملة تشمل جراحة المجازة واستبدال الصمام والقسطرة',
    procedures_en: [
      'Coronary Artery Bypass Graft (CABG)',
      'Heart Valve Replacement',
      'Angioplasty & Stenting',
      'Pacemaker Implantation',
    ],
    procedures_ar: [
      'جراحة مجازة الشريان التاجي',
      'استبدال صمام القلب',
      'القسطرة والدعامات',
      'زرع جهاز تنظيم ضربات القلب',
    ],
    hospital_stay: '7-10',
    total_stay: '10-14',
    recovery: '4-6',
  },
  'knee-replacement': {
    name_en: 'Knee Replacement',
    name_ar: 'استبدال الركبة',
    icon: '🦴',
    price_min: 6000,
    price_max: 8000,
    description_en: 'Total and partial knee replacement surgery for arthritis and joint damage',
    description_ar: 'جراحة استبدال الركبة الكامل والجزئي لالتهاب المفاصل وتلف المفاصل',
    procedures_en: [
      'Total Knee Replacement',
      'Partial Knee Replacement',
      'Bilateral Knee Replacement',
      'Revision Knee Surgery',
    ],
    procedures_ar: [
      'استبدال الركبة الكامل',
      'استبدال الركبة الجزئي',
      'استبدال الركبتين معاً',
      'جراحة المراجعة للركبة',
    ],
    hospital_stay: '4-5',
    total_stay: '7-10',
    recovery: '6-8',
  },
};

function getTreatmentData(treatment: string) {
  return TREATMENTS_DATA[treatment as keyof typeof TREATMENTS_DATA] || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, city, treatment } = await params;
  const isArabic = locale === 'ar';

  const treatmentData = getTreatmentData(treatment);
  if (!treatmentData) return {};

  const treatmentName = isArabic ? treatmentData.name_ar : treatmentData.name_en;
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const title = isArabic
    ? `${treatmentName} من ${cityName} إلى الهند — وفر 60-70٪ | شفاء الهند`
    : `${treatmentName} from ${cityName} to India — Save 60-70% | Shifa AlHind`;

  const description = isArabic
    ? `احصل على ${treatmentName} في الهند بتكلفة ${treatmentData.price_min.toLocaleString()}-${treatmentData.price_max.toLocaleString()} دولار. مستشفيات معتمدة من JCI، دعم عربي 24/7، ومساعدة كاملة في التأشيرة لمرضى ${cityName}.`
    : `Get ${treatmentName} in India for $${treatmentData.price_min.toLocaleString()}-${treatmentData.price_max.toLocaleString()}. JCI-accredited hospitals, 24/7 Arabic support, and complete visa assistance for ${cityName} patients.`;

  return generateFullMetadata({
    title,
    description,
    locale,
    canonical: `/${locale}/medical-tourism/${treatment}`,
    keywords: [
      `${treatmentName} ${cityName} to India`,
      `${treatmentName} cost ${cityName} vs India`,
      `best ${treatmentName} hospitals India`,
      `${treatmentName} visa assistance ${cityName}`,
      `Arabic support ${treatmentName} India`,
    ],
    ogType: 'article',
  });
}

export default async function TreatmentPage({ params }: PageProps) {
  const { locale, country, city, treatment } = await params;
  const isArabic = locale === 'ar';

  const treatmentData = getTreatmentData(treatment);
  if (!treatmentData) {
    notFound();
  }

  const treatmentName = isArabic ? treatmentData.name_ar : treatmentData.name_en;
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const countryName = country.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  // Get related blog articles (5 articles per treatment)
  const relatedArticles = getArticlesByTreatment(treatment, locale).slice(0, 5);

  // Generate Medical Procedure schema
  const procedureSchema = generateMedicalProcedureSchema({
    name: treatmentName,
    description: isArabic ? treatmentData.description_ar : treatmentData.description_en,
    procedureType: treatmentName,
    bodyLocation: 'As required',
    preparation:
      'Consultation with our medical team required. Pre-procedure tests and evaluations.',
    followup:
      'Post-procedure care instructions provided. Video consultations available for 3 months.',
    howPerformed:
      'Performed by internationally trained surgeons in JCI-accredited hospitals in Bangalore, India.',
    cost: {
      minPrice: treatmentData.price_min,
      maxPrice: treatmentData.price_max,
      currency: 'USD',
    },
  });

  const breadcrumbItems = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: '/' },
    { name: isArabic ? 'السياحة العلاجية' : 'Medical Tourism', url: '/medical-tourism' },
    { name: countryName, url: `/medical-tourism/${country}` },
    { name: cityName, url: `/medical-tourism/${country}/${city}` },
    { name: treatmentName, url: `/medical-tourism/${country}/${city}/${treatment}` },
  ];

  return (
    <>
      {/* Medical Procedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} locale={locale} />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{treatmentData.icon}</span>
            <h1 className="text-3xl md:text-5xl font-bold">
              {isArabic
                ? `${treatmentName} من ${cityName} إلى الهند`
                : `${treatmentName} from ${cityName} to India`}
            </h1>
          </div>
          <p className="text-lg md:text-xl mb-6 max-w-3xl">
            {isArabic ? treatmentData.description_ar : treatmentData.description_en}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/consultation`}
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {isArabic ? 'احصل على عرض سعر مجاني' : 'Get Free Cost Estimate'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              {isArabic ? 'تحدث مع منسق' : 'Speak with Coordinator'}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">
                {isArabic ? 'التكلفة المتوقعة' : 'Estimated Cost'}
              </h3>
              <p className="text-primary font-bold text-xl">
                ${treatmentData.price_min.toLocaleString()} - $
                {treatmentData.price_max.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="font-semibold mb-2">
                {isArabic ? 'الإقامة في المستشفى' : 'Hospital Stay'}
              </h3>
              <p className="text-gray-700 font-bold">
                {treatmentData.hospital_stay} {isArabic ? 'أيام' : 'days'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="font-semibold mb-2">
                {isArabic ? 'الإقامة الكلية في الهند' : 'Total Stay in India'}
              </h3>
              <p className="text-gray-700 font-bold">
                {treatmentData.total_stay} {isArabic ? 'أيام' : 'days'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-3">⏱️</div>
              <h3 className="font-semibold mb-2">{isArabic ? 'وقت التعافي' : 'Recovery Time'}</h3>
              <p className="text-gray-700 font-bold">
                {treatmentData.recovery} {isArabic ? 'أسابيع' : 'weeks'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Procedures Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isArabic ? 'الإجراءات المشمولة' : 'Procedures Included'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(isArabic ? treatmentData.procedures_ar : treatmentData.procedures_en).map(
              (procedure, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <span className="text-2xl">✓</span>
                  <span className="text-lg">{procedure}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isArabic ? 'مقارنة التكاليف' : 'Cost Comparison'}
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-4 text-left">{isArabic ? 'الموقع' : 'Location'}</th>
                  <th className="p-4 text-right">{isArabic ? 'التكلفة' : 'Cost'}</th>
                  <th className="p-4 text-right">{isArabic ? 'التوفير' : 'Savings'}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">{cityName}</td>
                  <td className="p-4 text-right">
                    ${(treatmentData.price_max * 3.5).toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-gray-500">-</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="p-4 font-bold">{isArabic ? 'الهند' : 'India'}</td>
                  <td className="p-4 text-right font-bold text-primary">
                    ${treatmentData.price_min.toLocaleString()} - $
                    {treatmentData.price_max.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-bold text-green-600">
                    {isArabic ? 'وفر' : 'Save'} 60-70%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            {isArabic
              ? '* التكاليف تقريبية وقد تختلف بناءً على الظروف الفردية'
              : '* Costs are approximate and may vary based on individual conditions'}
          </p>
        </div>
      </section>

      {/* Why Choose India */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isArabic
              ? `لماذا تختار الهند لـ${treatmentName}؟`
              : `Why Choose India for ${treatmentName}?`}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'جودة عالمية' : 'World-Class Quality'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'مستشفيات معتمدة من JCI مع أحدث التقنيات وجراحين ذوي خبرة عالمية'
                  : 'JCI-accredited hospitals with latest technology and internationally experienced surgeons'}
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💵</div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'تكلفة معقولة' : 'Affordable Cost'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'وفر 60-70٪ دون التضحية بالجودة. نفس المعايير بتكلفة أقل بكثير'
                  : 'Save 60-70% without compromising quality. Same standards at fraction of the cost'}
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">
                {isArabic ? 'دعم شامل' : 'Comprehensive Support'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'مساعدة في التأشيرة، دعم عربي، ترتيبات السفر، ورعاية ما بعد العلاج'
                  : 'Visa assistance, Arabic support, travel arrangements, and post-treatment care'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white rounded-lg shadow-md p-6">
              <summary className="font-semibold cursor-pointer">
                {isArabic
                  ? `هل ${treatmentName} في الهند آمنة؟`
                  : `Is ${treatmentName} safe in India?`}
              </summary>
              <p className="mt-4 text-gray-600">
                {isArabic
                  ? 'نعم، جميع مستشفياتنا الشريكة معتمدة من JCI و NABH دولياً وتحافظ على نفس معايير الجودة مثل المستشفيات الرائدة في جميع أنحاء العالم.'
                  : 'Yes, all our partner hospitals are JCI and NABH internationally accredited and maintain the same quality standards as leading hospitals worldwide.'}
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6">
              <summary className="font-semibold cursor-pointer">
                {isArabic
                  ? `كم من الوقت أحتاج للبقاء في الهند لـ${treatmentName}؟`
                  : `How long do I need to stay in India for ${treatmentName}?`}
              </summary>
              <p className="mt-4 text-gray-600">
                {isArabic
                  ? `عادة ما يتطلب ${treatmentName} ${treatmentData.total_stay} أيام إقامة كاملة في الهند، بما في ذلك ${treatmentData.hospital_stay} أيام في المستشفى والباقي للتعافي والمتابعة.`
                  : `Typically, ${treatmentName} requires ${treatmentData.total_stay} days total stay in India, including ${treatmentData.hospital_stay} days in hospital and the rest for recovery and follow-ups.`}
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6">
              <summary className="font-semibold cursor-pointer">
                {isArabic
                  ? 'هل تتوفر خدمات الدعم باللغة العربية؟'
                  : 'Is Arabic language support available?'}
              </summary>
              <p className="mt-4 text-gray-600">
                {isArabic
                  ? 'نعم، نوفر مترجمين عرب محترفين على مدار الساعة طوال أيام الأسبوع، وتقارير طبية بالعربية، وأطباء يتحدثون العربية.'
                  : 'Yes, we provide 24/7 professional Arabic translators, Arabic medical reports, and Arabic-speaking doctors.'}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic
              ? `جاهز للحصول على ${treatmentName} في الهند؟`
              : `Ready to Get ${treatmentName} in India?`}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isArabic
              ? 'احصل على تقدير مجاني للتكلفة واستشارة من متخصصينا'
              : 'Get a free cost estimate and consultation from our specialists'}
          </p>
          <Link
            href={`/${locale}/consultation`}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            {isArabic ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
          </Link>
        </div>
      </section>

      {/* Related Blog Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {isArabic ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {isArabic
                ? 'اقرأ المزيد عن هذا العلاج ونصائح الخبراء'
                : 'Read more about this treatment and expert advice'}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedArticles.map((article) => {
                const articleSlug = article.url.split('/').pop();
                return (
                  <Link
                    key={article.url}
                    href={`/${locale}/blog/${country}/${city}/${treatment}/${articleSlug}`}
                    className="block p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
                      {article.h1}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">{article.meta_desc}</p>
                    <span className="text-primary text-sm font-medium">
                      {isArabic ? 'اقرأ المزيد →' : 'Read More →'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">
            {isArabic ? 'موارد ذات صلة' : 'Related Resources'}
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/medical-tourism/${country}/${city}`}
              className="text-primary hover:underline"
            >
              ← {isArabic ? `جميع العلاجات في ${cityName}` : `All Treatments in ${cityName}`}
            </Link>
            <Link href={`/${locale}/visa-assistance`} className="text-primary hover:underline">
              {isArabic ? 'مساعدة في التأشيرة' : 'Visa Assistance'}
            </Link>
            <Link href={`/${locale}/hospitals`} className="text-primary hover:underline">
              {isArabic ? 'المستشفيات الشريكة' : 'Partner Hospitals'}
            </Link>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600 text-center">
            <strong>{isArabic ? 'إخلاء المسؤولية الطبية:' : 'Medical Disclaimer:'}</strong>{' '}
            {isArabic
              ? 'تقديرات التكلفة ومدة الإقامة ووقت التعافي تقريبية وقد تختلف بناءً على الظروف الطبية الفردية. استشر دائماً المهنيين الطبيين المؤهلين قبل اتخاذ قرارات العلاج.'
              : 'Cost estimates, stay duration, and recovery time are approximate and may vary based on individual medical conditions. Always consult with qualified medical professionals before making treatment decisions.'}
          </p>
        </div>
      </section>
    </>
  );
}
