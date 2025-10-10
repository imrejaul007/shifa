'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export default function PrivacyPolicyClient() {
  const t = useTranslations('privacyPolicy');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          current = section.getAttribute('id') || '';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const sections = [
    { id: 'introduction', key: 'introduction' },
    { id: 'information-collect', key: 'informationCollect' },
    { id: 'how-we-use', key: 'howWeUse' },
    { id: 'data-sharing', key: 'dataSharing' },
    { id: 'data-security', key: 'dataSecurity' },
    { id: 'your-rights', key: 'yourRights' },
    { id: 'cookies', key: 'cookies' },
    { id: 'international-transfers', key: 'internationalTransfers' },
    { id: 'data-retention', key: 'dataRetention' },
    { id: 'children', key: 'children' },
    { id: 'policy-changes', key: 'policyChanges' },
    { id: 'contact', key: 'contact' },
  ];

  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://shifalalhind.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: `https://shifalalhind.com/${locale}/privacy-policy`,
      },
    ],
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-emerald-50 text-lg mb-2">{t('subtitle')}</p>
            <p className="text-emerald-100 text-sm">
              {t('lastUpdated')}: {t('lastUpdatedDate')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">{t('tableOfContents')}</h2>
                <nav>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-${isRTL ? 'right' : 'left'} px-3 py-2 rounded-md text-sm transition-colors ${
                            activeSection === section.id
                              ? 'bg-emerald-50 text-emerald-700 font-semibold'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {t(`sections.${section.key}.title`)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                {/* Introduction */}
                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    1. {t('sections.introduction.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.introduction.content.p1')}</p>
                    <p>{t('sections.introduction.content.p2')}</p>
                    <p>{t('sections.introduction.content.p3')}</p>
                  </div>
                </section>

                {/* Information We Collect */}
                <section id="information-collect" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    2. {t('sections.informationCollect.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.informationCollect.content.intro')}</p>

                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        {t('sections.informationCollect.content.personalInfo.title')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>{t('sections.informationCollect.content.personalInfo.items.name')}</li>
                        <li>
                          {t('sections.informationCollect.content.personalInfo.items.contact')}
                        </li>
                        <li>{t('sections.informationCollect.content.personalInfo.items.dob')}</li>
                        <li>
                          {t('sections.informationCollect.content.personalInfo.items.nationality')}
                        </li>
                        <li>
                          {t('sections.informationCollect.content.personalInfo.items.passport')}
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        {t('sections.informationCollect.content.medicalInfo.title')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          {t('sections.informationCollect.content.medicalInfo.items.history')}
                        </li>
                        <li>
                          {t('sections.informationCollect.content.medicalInfo.items.reports')}
                        </li>
                        <li>
                          {t('sections.informationCollect.content.medicalInfo.items.prescriptions')}
                        </li>
                        <li>
                          {t('sections.informationCollect.content.medicalInfo.items.treatment')}
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        {t('sections.informationCollect.content.technicalInfo.title')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>{t('sections.informationCollect.content.technicalInfo.items.ip')}</li>
                        <li>
                          {t('sections.informationCollect.content.technicalInfo.items.browser')}
                        </li>
                        <li>
                          {t('sections.informationCollect.content.technicalInfo.items.cookies')}
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section id="how-we-use" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    3. {t('sections.howWeUse.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.howWeUse.content.intro')}</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t('sections.howWeUse.content.purposes.treatment')}</li>
                      <li>{t('sections.howWeUse.content.purposes.visa')}</li>
                      <li>{t('sections.howWeUse.content.purposes.appointments')}</li>
                      <li>{t('sections.howWeUse.content.purposes.travel')}</li>
                      <li>{t('sections.howWeUse.content.purposes.communication')}</li>
                      <li>{t('sections.howWeUse.content.purposes.compliance')}</li>
                      <li>{t('sections.howWeUse.content.purposes.improvement')}</li>
                    </ul>
                  </div>
                </section>

                {/* Data Sharing */}
                <section id="data-sharing" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    4. {t('sections.dataSharing.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.dataSharing.content.intro')}</p>

                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        {t('sections.dataSharing.content.partners.title')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>{t('sections.dataSharing.content.partners.items.hospitals')}</li>
                        <li>{t('sections.dataSharing.content.partners.items.visa')}</li>
                        <li>{t('sections.dataSharing.content.partners.items.travel')}</li>
                        <li>{t('sections.dataSharing.content.partners.items.accommodation')}</li>
                      </ul>
                    </div>

                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mt-4">
                      <p className="text-gray-800 font-semibold">
                        {t('sections.dataSharing.content.consent')}
                      </p>
                    </div>

                    <p>{t('sections.dataSharing.content.noSale')}</p>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    5. {t('sections.dataSecurity.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.dataSecurity.content.intro')}</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t('sections.dataSecurity.content.measures.encryption')}</li>
                      <li>{t('sections.dataSecurity.content.measures.servers')}</li>
                      <li>{t('sections.dataSecurity.content.measures.access')}</li>
                      <li>{t('sections.dataSecurity.content.measures.audits')}</li>
                      <li>{t('sections.dataSecurity.content.measures.compliance')}</li>
                    </ul>
                    <p>{t('sections.dataSecurity.content.disclaimer')}</p>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    6. {t('sections.yourRights.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.yourRights.content.intro')}</p>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('sections.yourRights.content.rights.access.title')}
                        </h4>
                        <p className="text-sm">
                          {t('sections.yourRights.content.rights.access.description')}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('sections.yourRights.content.rights.rectification.title')}
                        </h4>
                        <p className="text-sm">
                          {t('sections.yourRights.content.rights.rectification.description')}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('sections.yourRights.content.rights.erasure.title')}
                        </h4>
                        <p className="text-sm">
                          {t('sections.yourRights.content.rights.erasure.description')}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('sections.yourRights.content.rights.portability.title')}
                        </h4>
                        <p className="text-sm">
                          {t('sections.yourRights.content.rights.portability.description')}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('sections.yourRights.content.rights.restriction.title')}
                        </h4>
                        <p className="text-sm">
                          {t('sections.yourRights.content.rights.restriction.description')}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('sections.yourRights.content.rights.objection.title')}
                        </h4>
                        <p className="text-sm">
                          {t('sections.yourRights.content.rights.objection.description')}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4">{t('sections.yourRights.content.exercise')}</p>
                  </div>
                </section>

                {/* Cookies & Tracking */}
                <section id="cookies" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    7. {t('sections.cookies.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.cookies.content.intro')}</p>

                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        {t('sections.cookies.content.types.title')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>{t('sections.cookies.content.types.essential.title')}:</strong>{' '}
                          {t('sections.cookies.content.types.essential.description')}
                        </li>
                        <li>
                          <strong>{t('sections.cookies.content.types.analytics.title')}:</strong>{' '}
                          {t('sections.cookies.content.types.analytics.description')}
                        </li>
                        <li>
                          <strong>{t('sections.cookies.content.types.functional.title')}:</strong>{' '}
                          {t('sections.cookies.content.types.functional.description')}
                        </li>
                      </ul>
                    </div>

                    <p>{t('sections.cookies.content.control')}</p>
                  </div>
                </section>

                {/* International Data Transfers */}
                <section id="international-transfers" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    8. {t('sections.internationalTransfers.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.internationalTransfers.content.intro')}</p>
                    <p>{t('sections.internationalTransfers.content.safeguards')}</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t('sections.internationalTransfers.content.measures.contracts')}</li>
                      <li>{t('sections.internationalTransfers.content.measures.encryption')}</li>
                      <li>{t('sections.internationalTransfers.content.measures.compliance')}</li>
                    </ul>
                  </div>
                </section>

                {/* Data Retention */}
                <section id="data-retention" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    9. {t('sections.dataRetention.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.dataRetention.content.intro')}</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t('sections.dataRetention.content.periods.medical')}</li>
                      <li>{t('sections.dataRetention.content.periods.personal')}</li>
                      <li>{t('sections.dataRetention.content.periods.marketing')}</li>
                    </ul>
                    <p>{t('sections.dataRetention.content.deletion')}</p>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    10. {t('sections.children.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.children.content.policy')}</p>
                    <p>{t('sections.children.content.consent')}</p>
                  </div>
                </section>

                {/* Changes to Policy */}
                <section id="policy-changes" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    11. {t('sections.policyChanges.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.policyChanges.content.updates')}</p>
                    <p>{t('sections.policyChanges.content.notification')}</p>
                    <p>{t('sections.policyChanges.content.review')}</p>
                  </div>
                </section>

                {/* Contact Information */}
                <section id="contact" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-emerald-500 pb-2">
                    12. {t('sections.contact.title')}
                  </h2>
                  <div className="text-gray-700 space-y-4">
                    <p>{t('sections.contact.content.intro')}</p>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 mt-4">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">
                        {t('sections.contact.content.details.company')}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 text-emerald-600 mt-1 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">
                              {t('sections.contact.content.details.emailLabel')}
                            </p>
                            <a
                              href="mailto:privacy@shifaalhind.com"
                              className="text-emerald-600 hover:text-emerald-700 underline"
                            >
                              privacy@shifaalhind.com
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 text-emerald-600 mt-1 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">
                              {t('sections.contact.content.details.phoneLabel')}
                            </p>
                            <a
                              href="tel:+966123456789"
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              +966 12 345 6789
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 text-emerald-600 mt-1 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">
                              {t('sections.contact.content.details.addressLabel')}
                            </p>
                            <p className="text-gray-700">
                              {t('sections.contact.content.details.address')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                      <p className="text-gray-800">
                        <strong>{t('sections.contact.content.dpo.title')}:</strong>{' '}
                        {t('sections.contact.content.dpo.description')}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer Note */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">{t('footer.acknowledgment')}</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
