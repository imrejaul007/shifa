/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export default function TermsClient() {
  const t = useTranslations('terms');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Add BreadcrumbList schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isArabic ? 'الرئيسية' : 'Home',
          item: `${window.location.origin}/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isArabic ? 'الشروط والأحكام' : 'Terms & Conditions',
          item: window.location.href,
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [locale, isArabic]);

  useEffect(() => {
    // Handle scroll spy for active section
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id') || '';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const sections = [
    {
      id: 'introduction',
      title: isArabic ? 'المقدمة وقبول الشروط' : 'Introduction & Acceptance of Terms',
    },
    { id: 'services', title: isArabic ? 'الخدمات المقدمة' : 'Services Provided' },
    {
      id: 'user-responsibilities',
      title: isArabic ? 'مسؤوليات المستخدم' : 'User Responsibilities',
    },
    { id: 'medical-disclaimer', title: isArabic ? 'إخلاء المسؤولية الطبية' : 'Medical Disclaimer' },
    { id: 'booking-payments', title: isArabic ? 'الحجز والدفع' : 'Booking & Payments' },
    { id: 'intellectual-property', title: isArabic ? 'الملكية الفكرية' : 'Intellectual Property' },
    { id: 'limitation-liability', title: isArabic ? 'حدود المسؤولية' : 'Limitation of Liability' },
    { id: 'indemnification', title: isArabic ? 'التعويض' : 'Indemnification' },
    { id: 'governing-law', title: isArabic ? 'القانون الحاكم' : 'Governing Law' },
    { id: 'dispute-resolution', title: isArabic ? 'حل النزاعات' : 'Dispute Resolution' },
    { id: 'changes-terms', title: isArabic ? 'التغييرات على الشروط' : 'Changes to Terms' },
    { id: 'contact', title: isArabic ? 'معلومات الاتصال' : 'Contact Information' },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-white ${isArabic ? 'rtl' : 'ltr'}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          <p className="text-center text-blue-100 text-lg">
            {isArabic ? 'آخر تحديث: 10 يناير 2025' : 'Last Updated: January 10, 2025'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                {isArabic ? 'جدول المحتويات' : 'Table of Contents'}
              </h2>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className={`${isArabic ? 'ml-2' : 'mr-2'}`}>{index + 1}.</span>
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-gray-200">
              {/* Introduction */}
              <section id="introduction" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '1. المقدمة وقبول الشروط' : '1. Introduction & Acceptance of Terms'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p>
                        مرحباً بكم في شفاء الهند. من خلال الوصول إلى أو استخدام موقعنا الإلكتروني
                        وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءة هذه
                        الشروط بعناية قبل استخدام خدماتنا.
                      </p>
                      <p>
                        إذا لم توافق على هذه الشروط، يرجى عدم استخدام موقعنا الإلكتروني أو خدماتنا.
                        استخدامك المستمر لخدماتنا يعني قبولك لهذه الشروط وأي تحديثات مستقبلية.
                      </p>
                      <p className="font-semibold">
                        من خلال إنشاء حساب أو استخدام خدماتنا، فإنك تؤكد أن:
                      </p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>عمرك 18 عاماً على الأقل أو لديك موافقة الوالدين/الوصي</li>
                        <li>لديك القدرة القانونية على الدخول في اتفاقية ملزمة</li>
                        <li>ستستخدم خدماتنا بما يتوافق مع جميع القوانين واللوائح المعمول بها</li>
                        <li>جميع المعلومات المقدمة دقيقة وصحيحة وحديثة</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>
                        Welcome to Shifa Al Hind. By accessing or using our website and services,
                        you agree to be bound by these Terms and Conditions. Please read these terms
                        carefully before using our services.
                      </p>
                      <p>
                        If you do not agree to these terms, please do not use our website or
                        services. Your continued use of our services constitutes acceptance of these
                        terms and any future updates.
                      </p>
                      <p className="font-semibold">
                        By creating an account or using our services, you confirm that:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>You are at least 18 years old or have parental/guardian consent</li>
                        <li>You have the legal capacity to enter into a binding agreement</li>
                        <li>
                          You will use our services in compliance with all applicable laws and
                          regulations
                        </li>
                        <li>All information provided is accurate, truthful, and current</li>
                      </ul>
                    </>
                  )}
                </div>
              </section>

              {/* Services Provided */}
              <section id="services" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '2. الخدمات المقدمة' : '2. Services Provided'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p className="font-semibold">
                        شفاء الهند هي منصة لتنسيق الرعاية الطبية توفر الخدمات التالية:
                      </p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>تنسيق المواعيد مع المستشفيات والأطباء في الهند</li>
                        <li>المساعدة في اختيار المستشفى والطبيب بناءً على الاحتياجات الطبية</li>
                        <li>دعم السفر والخدمات اللوجستية (النقل من وإلى المطار، الإقامة)</li>
                        <li>خدمات الترجمة الفورية أثناء الاستشارات الطبية</li>
                        <li>المساعدة في معالجة التأشيرات والوثائق</li>
                        <li>تسهيل الاتصال بين المرضى ومقدمي الرعاية الصحية</li>
                        <li>الدعم بعد العلاج والرعاية المتابعة</li>
                      </ul>
                      <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 my-6">
                        <p className="font-semibold text-yellow-900">إخطار هام:</p>
                        <p className="text-yellow-800 mt-2">
                          نحن لا نقدم المشورة الطبية أو التشخيص أو العلاج. دورنا هو تنسيق وتسهيل
                          وصولك إلى مقدمي الرعاية الصحية المؤهلين. جميع القرارات الطبية يتم اتخاذها
                          من قبل المتخصصين الطبيين المرخصين والمريض.
                        </p>
                      </div>
                      <p>
                        نعمل كوسيط بينك وبين مرافق الرعاية الصحية. المستشفيات والأطباء المعنيون هم
                        المسؤولون عن جميع الخدمات الطبية والنتائج.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">
                        Shifa Al Hind is a medical coordination platform that provides the following
                        services:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Coordination of appointments with hospitals and doctors in India</li>
                        <li>Assistance in hospital and doctor selection based on medical needs</li>
                        <li>
                          Travel support and logistical services (airport transfers, accommodation)
                        </li>
                        <li>Interpretation services during medical consultations</li>
                        <li>Assistance with visa processing and documentation</li>
                        <li>
                          Facilitation of communication between patients and healthcare providers
                        </li>
                        <li>Post-treatment support and follow-up care coordination</li>
                      </ul>
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                        <p className="font-semibold text-yellow-900">Important Notice:</p>
                        <p className="text-yellow-800 mt-2">
                          We do NOT provide medical advice, diagnosis, or treatment. Our role is to
                          coordinate and facilitate your access to qualified healthcare providers.
                          All medical decisions are made by licensed medical professionals and the
                          patient.
                        </p>
                      </div>
                      <p>
                        We act as an intermediary between you and healthcare facilities. The
                        hospitals and doctors involved are responsible for all medical services and
                        outcomes.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* User Responsibilities */}
              <section id="user-responsibilities" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '3. مسؤوليات المستخدم' : '3. User Responsibilities'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p className="font-semibold">كمستخدم لخدماتنا، فإنك توافق على:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>تقديم معلومات طبية دقيقة وكاملة وصحيحة</li>
                        <li>الكشف عن جميع الحالات الطبية ذات الصلة والحساسية والأدوية الحالية</li>
                        <li>تحديث معلوماتك الشخصية والطبية فوراً عند حدوث تغييرات</li>
                        <li>الحفاظ على سرية بيانات اعتماد حسابك</li>
                        <li>اتخاذ قرارات طبية مستنيرة بالتشاور مع مقدمي الرعاية الصحية المؤهلين</li>
                        <li>الامتثال لجميع تعليمات المستشفى والطبيب</li>
                        <li>الالتزام بجميع المواعيد المجدولة أو إلغائها في الوقت المناسب</li>
                        <li>إجراء الدفعات في الوقت المناسب مقابل الخدمات المقدمة</li>
                        <li>احترام موظفينا ومقدمي الرعاية الصحية والمرضى الآخرين</li>
                        <li>الامتثال لجميع القوانين واللوائح المحلية في الهند</li>
                      </ul>
                      <p className="font-semibold mt-6">الأنشطة المحظورة:</p>
                      <p>يُحظر عليك:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>تقديم معلومات خاطئة أو مضللة</li>
                        <li>انتحال شخصية شخص آخر أو كيان</li>
                        <li>استخدام خدماتنا لأغراض غير قانونية</li>
                        <li>التدخل في عمليات النظام الأمنية</li>
                        <li>محاولة الوصول غير المصرح به إلى أنظمتنا</li>
                        <li>نسخ أو استنساخ أو بيع أي جزء من خدماتنا دون إذن</li>
                        <li>التحرش أو إساءة معاملة موظفينا أو مقدمي الخدمات</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">As a user of our services, you agree to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide accurate, complete, and truthful medical information</li>
                        <li>
                          Disclose all relevant medical conditions, allergies, and current
                          medications
                        </li>
                        <li>
                          Update your personal and medical information promptly when changes occur
                        </li>
                        <li>Maintain the confidentiality of your account credentials</li>
                        <li>
                          Make informed medical decisions in consultation with qualified healthcare
                          providers
                        </li>
                        <li>Comply with all hospital and doctor instructions</li>
                        <li>Honor all scheduled appointments or cancel them in a timely manner</li>
                        <li>Make timely payments for services rendered</li>
                        <li>
                          Treat our staff, healthcare providers, and other patients with respect
                        </li>
                        <li>Comply with all local laws and regulations in India</li>
                      </ul>
                      <p className="font-semibold mt-6">Prohibited Activities:</p>
                      <p>You are prohibited from:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Providing false or misleading information</li>
                        <li>Impersonating another person or entity</li>
                        <li>Using our services for unlawful purposes</li>
                        <li>Interfering with system security features</li>
                        <li>Attempting unauthorized access to our systems</li>
                        <li>
                          Copying, duplicating, or selling any part of our services without
                          permission
                        </li>
                        <li>Harassing or abusing our staff or service providers</li>
                      </ul>
                    </>
                  )}
                </div>
              </section>

              {/* Medical Disclaimer */}
              <section id="medical-disclaimer" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '4. إخلاء المسؤولية الطبية' : '4. Medical Disclaimer'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  <div className="bg-red-50 border-r-4 border-red-500 p-6 my-4">
                    {isArabic ? (
                      <>
                        <p className="font-bold text-red-900 text-lg">إخلاء مسؤولية طبي مهم</p>
                        <p className="text-red-800 mt-3">
                          شفاء الهند ليست مقدم رعاية صحية. نحن لا نقدم نصائح طبية أو تشخيصات أو
                          علاجات أو آراء طبية. خدماتنا مقتصرة على التنسيق والدعم اللوجستي فقط.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-red-900 text-lg">
                          Critical Medical Disclaimer
                        </p>
                        <p className="text-red-800 mt-3">
                          Shifa Al Hind is NOT a healthcare provider. We do not provide medical
                          advice, diagnoses, treatments, or medical opinions. Our services are
                          limited to coordination and logistical support only.
                        </p>
                      </>
                    )}
                  </div>
                  {isArabic ? (
                    <>
                      <p className="font-semibold">يرجى فهم ما يلي:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>المحتوى على موقعنا الإلكتروني هو لأغراض إعلامية فقط</li>
                        <li>المعلومات المقدمة ليست بديلاً عن المشورة الطبية المهنية</li>
                        <li>دائماً استشر طبيباً مؤهلاً بخصوص أي حالة طبية</li>
                        <li>لا نصادق على أي علاج أو إجراء أو مستشفى أو طبيب معين</li>
                        <li>المستشفيات والأطباء مسؤولون بشكل مستقل عن رعايتهم الطبية</li>
                        <li>النتائج الطبية غير مضمونة ويمكن أن تختلف بناءً على الظروف الفردية</li>
                        <li>
                          لسنا مسؤولين عن أي أخطاء طبية أو سوء ممارسة أو إهمال من قبل مقدمي الرعاية
                          الصحية
                        </li>
                      </ul>
                      <p className="font-semibold mt-6">حالات الطوارئ:</p>
                      <p>
                        في حالة الطوارئ الطبية، اتصل بخدمات الطوارئ المحلية فوراً (108 في الهند). لا
                        تعتمد على خدماتنا لحالات الطوارئ الطبية.
                      </p>
                      <p className="font-semibold mt-6">تقييم ما قبل العلاج:</p>
                      <p>
                        من مسؤوليتك الحصول على رأي طبي ثانٍ والتحقق من أوراق اعتماد مقدمي الرعاية
                        الصحية قبل الخضوع لأي إجراء طبي.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Please understand that:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Content on our website is for informational purposes only</li>
                        <li>
                          Information provided is not a substitute for professional medical advice
                        </li>
                        <li>
                          Always consult a qualified physician regarding any medical condition
                        </li>
                        <li>
                          We do not endorse any specific treatment, procedure, hospital, or doctor
                        </li>
                        <li>
                          Hospitals and doctors are independently responsible for their medical care
                        </li>
                        <li>
                          Medical outcomes are not guaranteed and may vary based on individual
                          circumstances
                        </li>
                        <li>
                          We are not liable for any medical errors, malpractice, or negligence by
                          healthcare providers
                        </li>
                      </ul>
                      <p className="font-semibold mt-6">Emergency Situations:</p>
                      <p>
                        In case of a medical emergency, contact local emergency services immediately
                        (108 in India). Do not rely on our services for medical emergencies.
                      </p>
                      <p className="font-semibold mt-6">Pre-Treatment Assessment:</p>
                      <p>
                        It is your responsibility to obtain a second medical opinion and verify the
                        credentials of healthcare providers before undergoing any medical procedure.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Booking & Payments */}
              <section id="booking-payments" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '5. الحجز والدفع' : '5. Booking & Payments'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p className="font-semibold">عملية الحجز:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>جميع الحجوزات تخضع للتوافر والتأكيد من المستشفى</li>
                        <li>قد يُطلب منك دفع وديعة لتأمين موعدك</li>
                        <li>يعتبر الحجز مؤكداً فقط عند استلام تأكيد كتابي</li>
                        <li>نحتفظ بالحق في رفض أو إلغاء الحجوزات وفقاً لتقديرنا</li>
                      </ul>
                      <p className="font-semibold mt-6">شروط الدفع:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>رسوم التنسيق مستحقة الدفع عند الحجز</li>
                        <li>التكاليف الطبية يتم دفعها مباشرة إلى المستشفى</li>
                        <li>
                          تُقبل المدفوعات عبر التحويل البنكي أو بطاقة الائتمان/الخصم أو وسائل الدفع
                          الأخرى المعتمدة
                        </li>
                        <li>جميع الرسوم بالروبية الهندية (INR) ما لم يُذكر خلاف ذلك</li>
                        <li>أنت مسؤول عن جميع رسوم صرف العملات ورسوم المعاملات</li>
                      </ul>
                      <p className="font-semibold mt-6">الودائع:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>قد تتطلب بعض الخدمات وديعة بنسبة 20-50٪</li>
                        <li>الودائع غير قابلة للاسترداد ما لم يُذكر خلاف ذلك</li>
                        <li>يتم خصم الودائع من التكلفة الإجمالية</li>
                      </ul>
                      <p className="font-semibold mt-6">سياسة الإلغاء:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>
                          الإلغاء قبل 30 يوماً من الموعد: استرداد كامل ناقص رسوم المعالجة بنسبة 10٪
                        </li>
                        <li>الإلغاء قبل 15-29 يوماً: استرداد 50٪</li>
                        <li>الإلغاء قبل 7-14 يوماً: استرداد 25٪</li>
                        <li>الإلغاء قبل أقل من 7 أيام: لا يوجد استرداد</li>
                        <li>عدم الحضور: لا يوجد استرداد</li>
                      </ul>
                      <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-6">
                        <p className="text-blue-900">
                          <span className="font-semibold">ملاحظة:</span> قد تكون لدى المستشفيات
                          سياسات إلغاء منفصلة للخدمات الطبية. يرجى التحقق مع المنشأة الطبية مباشرة.
                        </p>
                      </div>
                      <p className="font-semibold mt-6">سياسة الاسترداد:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>تتم معالجة المبالغ المستردة خلال 14 يوم عمل</li>
                        <li>تُعاد المبالغ بنفس طريقة الدفع الأصلية</li>
                        <li>رسوم تحويل الأموال الدولية هي من مسؤولية العميل</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Booking Process:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>All bookings are subject to availability and hospital confirmation</li>
                        <li>You may be required to pay a deposit to secure your appointment</li>
                        <li>Booking is confirmed only upon receipt of written confirmation</li>
                        <li>We reserve the right to refuse or cancel bookings at our discretion</li>
                      </ul>
                      <p className="font-semibold mt-6">Payment Terms:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Coordination fees are due at the time of booking</li>
                        <li>Medical costs are paid directly to the hospital</li>
                        <li>
                          Payments accepted via bank transfer, credit/debit card, or other approved
                          methods
                        </li>
                        <li>All fees are in Indian Rupees (INR) unless otherwise stated</li>
                        <li>
                          You are responsible for all currency conversion fees and transaction
                          charges
                        </li>
                      </ul>
                      <p className="font-semibold mt-6">Deposits:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Some services may require a 20-50% deposit</li>
                        <li>Deposits are non-refundable unless otherwise specified</li>
                        <li>Deposits are deducted from the total cost</li>
                      </ul>
                      <p className="font-semibold mt-6">Cancellation Policy:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Cancellation 30+ days before appointment: Full refund minus 10% processing
                          fee
                        </li>
                        <li>Cancellation 15-29 days before: 50% refund</li>
                        <li>Cancellation 7-14 days before: 25% refund</li>
                        <li>Cancellation less than 7 days before: No refund</li>
                        <li>No-shows: No refund</li>
                      </ul>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                        <p className="text-blue-900">
                          <span className="font-semibold">Note:</span> Hospitals may have separate
                          cancellation policies for medical services. Please verify directly with
                          the medical facility.
                        </p>
                      </div>
                      <p className="font-semibold mt-6">Refund Policy:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Refunds are processed within 14 business days</li>
                        <li>Refunds are issued to the original payment method</li>
                        <li>International money transfer fees are the customer's responsibility</li>
                      </ul>
                    </>
                  )}
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual-property" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '6. الملكية الفكرية' : '6. Intellectual Property'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p className="font-semibold">ملكية المحتوى:</p>
                      <p>
                        جميع المحتوى على موقعنا الإلكتروني، بما في ذلك النصوص والرسومات والشعارات
                        والصور والبرامج، هي ملكية شفاء الهند أو مرخصيها ومحمية بموجب قوانين حقوق
                        النشر الهندية والدولية.
                      </p>
                      <p className="font-semibold mt-6">العلامات التجارية:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>اسم وشعار "شفاء الهند" هي علامات تجارية مسجلة</li>
                        <li>لا يجوز استخدام علاماتنا التجارية دون إذن كتابي صريح</li>
                        <li>العلامات التجارية للطرف الثالث المعروضة هي ملك لأصحابها</li>
                      </ul>
                      <p className="font-semibold mt-6">الاستخدام المسموح به:</p>
                      <p>يجوز لك:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>عرض وطباعة صفحات من الموقع للاستخدام الشخصي غير التجاري</li>
                        <li>
                          مشاركة روابط المحتوى الخاص بنا على وسائل التواصل الاجتماعي مع الإسناد
                          المناسب
                        </li>
                      </ul>
                      <p className="font-semibold mt-6">الاستخدام المحظور:</p>
                      <p>يُحظر عليك:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>نسخ أو إعادة إنتاج أو تعديل أو توزيع محتوانا دون إذن</li>
                        <li>استخدام محتوانا لأغراض تجارية دون ترخيص</li>
                        <li>إنشاء أعمال مشتقة من محتوانا</li>
                        <li>إزالة إشعارات حقوق النشر أو الملكية</li>
                        <li>الهندسة العكسية أو التفكيك أو التفكيك لبرمجياتنا</li>
                      </ul>
                      <p className="font-semibold mt-6">المحتوى الذي أنشأه المستخدم:</p>
                      <p>
                        بإرسال محتوى إلى موقعنا (المراجعات، التعليقات، الصور)، فإنك تمنحنا ترخيصاً
                        عالمياً وغير حصري وخالٍ من حقوق الملكية لاستخدام وإعادة إنتاج وتعديل وتوزيع
                        هذا المحتوى.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Content Ownership:</p>
                      <p>
                        All content on our website, including text, graphics, logos, images, and
                        software, is the property of Shifa Al Hind or its licensors and is protected
                        by Indian and international copyright laws.
                      </p>
                      <p className="font-semibold mt-6">Trademarks:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>The "Shifa Al Hind" name and logo are registered trademarks</li>
                        <li>Our trademarks may not be used without express written permission</li>
                        <li>
                          Third-party trademarks displayed are the property of their respective
                          owners
                        </li>
                      </ul>
                      <p className="font-semibold mt-6">Permitted Use:</p>
                      <p>You may:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>View and print pages from the site for personal, non-commercial use</li>
                        <li>Share links to our content on social media with proper attribution</li>
                      </ul>
                      <p className="font-semibold mt-6">Prohibited Use:</p>
                      <p>You may NOT:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Copy, reproduce, modify, or distribute our content without permission
                        </li>
                        <li>Use our content for commercial purposes without licensing</li>
                        <li>Create derivative works from our content</li>
                        <li>Remove copyright or proprietary notices</li>
                        <li>Reverse engineer, decompile, or disassemble our software</li>
                      </ul>
                      <p className="font-semibold mt-6">User-Generated Content:</p>
                      <p>
                        By submitting content to our site (reviews, comments, photos), you grant us
                        a worldwide, non-exclusive, royalty-free license to use, reproduce, modify,
                        and distribute that content.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="limitation-liability" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '7. حدود المسؤولية' : '7. Limitation of Liability'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  <div className="bg-gray-100 border-r-4 border-gray-500 p-6 my-4">
                    {isArabic ? (
                      <p className="font-semibold text-gray-900">
                        إلى أقصى حد يسمح به القانون، لن تكون شفاء الهند مسؤولة عن أي أضرار مباشرة أو
                        غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناتجة عن استخدامك لخدماتنا.
                      </p>
                    ) : (
                      <p className="font-semibold text-gray-900">
                        To the maximum extent permitted by law, Shifa Al Hind shall not be liable
                        for any direct, indirect, incidental, special, consequential, or punitive
                        damages arising from your use of our services.
                      </p>
                    )}
                  </div>
                  {isArabic ? (
                    <>
                      <p className="font-semibold">على وجه التحديد، نحن لسنا مسؤولين عن:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>النتائج الطبية، سواء كانت ناجحة أو غير ناجحة</li>
                        <li>
                          الأخطاء الطبية أو سوء الممارسة أو الإهمال من قبل مقدمي الرعاية الصحية
                        </li>
                        <li>المضاعفات أو الآثار الجانبية أو الأحداث السلبية من العلاجات</li>
                        <li>التأخير أو الإلغاء من قبل المستشفيات أو الأطباء</li>
                        <li>فقدان الأمتعة أو الممتلكات الشخصية أو الضرر</li>
                        <li>مشاكل السفر، بما في ذلك التأشيرات والرحلات والإقامة</li>
                        <li>انتهاكات الخصوصية أو البيانات من قبل أطراف ثالثة</li>
                        <li>أخطاء الترجمة أو سوء التفاهم</li>
                        <li>الخسائر المالية من تقلبات العملة</li>
                        <li>أخطاء أو حذف في معلوماتنا</li>
                        <li>أي محتوى أو خدمات من أطراف ثالثة</li>
                        <li>القوة القاهرة (الكوارث الطبيعية، الحروب، الأوبئة، إلخ)</li>
                      </ul>
                      <p className="font-semibold mt-6">حد المسؤولية:</p>
                      <p>
                        مسؤوليتنا الإجمالية تجاهك محدودة بالمبلغ الذي دفعته لنا مقابل رسوم التنسيق.
                        لا يشمل هذا التكاليف الطبية المدفوعة مباشرة للمستشفيات.
                      </p>
                      <p className="font-semibold mt-6">إخلاء مسؤولية الضمان:</p>
                      <p>
                        يتم تقديم خدماتنا "كما هي" و "كما هي متاحة" دون ضمانات من أي نوع، سواء كانت
                        صريحة أو ضمنية، بما في ذلك على سبيل المثال لا الحصر ضمانات القابلية للتسويق
                        والملاءمة لغرض معين وعدم الانتهاك.
                      </p>
                      <p>
                        نحن لا نضمن أن خدماتنا ستكون دون انقطاع أو آمنة أو خالية من الأخطاء. نحن لا
                        نضمن دقة أو موثوقية أو اكتمال أي معلومات مقدمة من خلال خدماتنا.
                      </p>
                      <p className="font-semibold mt-6">مسؤولية الطرف الثالث:</p>
                      <p>
                        المستشفيات والأطباء ومقدمو الخدمات الآخرون هم مقاولون مستقلون. نحن لسنا
                        مسؤولين عن أفعالهم أو إغفالاتهم أو إهمالهم.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Specifically, we are NOT liable for:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Medical outcomes, whether successful or unsuccessful</li>
                        <li>Medical errors, malpractice, or negligence by healthcare providers</li>
                        <li>Complications, side effects, or adverse events from treatments</li>
                        <li>Delays or cancellations by hospitals or doctors</li>
                        <li>Lost, stolen, or damaged personal belongings</li>
                        <li>Travel issues, including visas, flights, and accommodation</li>
                        <li>Privacy or data breaches by third parties</li>
                        <li>Translation errors or miscommunications</li>
                        <li>Financial losses from currency fluctuations</li>
                        <li>Errors or omissions in our information</li>
                        <li>Any third-party content or services</li>
                        <li>Force majeure events (natural disasters, wars, pandemics, etc.)</li>
                      </ul>
                      <p className="font-semibold mt-6">Cap on Liability:</p>
                      <p>
                        Our total liability to you is limited to the amount you paid us for
                        coordination fees. This does not include medical costs paid directly to
                        hospitals.
                      </p>
                      <p className="font-semibold mt-6">Warranty Disclaimer:</p>
                      <p>
                        Our services are provided "AS IS" and "AS AVAILABLE" without warranties of
                        any kind, either express or implied, including but not limited to warranties
                        of merchantability, fitness for a particular purpose, and non-infringement.
                      </p>
                      <p>
                        We do not warrant that our services will be uninterrupted, secure, or
                        error-free. We do not guarantee the accuracy, reliability, or completeness
                        of any information provided through our services.
                      </p>
                      <p className="font-semibold mt-6">Third-Party Liability:</p>
                      <p>
                        Hospitals, doctors, and other service providers are independent contractors.
                        We are not responsible for their actions, omissions, or negligence.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Indemnification */}
              <section id="indemnification" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '8. التعويض' : '8. Indemnification'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p>
                        أنت توافق على تعويض ودفاع وإبراء ذمة شفاء الهند ومديريها وموظفيها ووكلائها
                        وشركائها من وضد أي وجميع المطالبات والأضرار والالتزامات والخسائر والنفقات
                        والتكاليف (بما في ذلك أتعاب المحاماة المعقولة) الناشئة عن أو المتعلقة بـ:
                      </p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>استخدامك أو سوء استخدامك لخدماتنا</li>
                        <li>انتهاكك لهذه الشروط والأحكام</li>
                        <li>انتهاكك لأي قوانين أو حقوق طرف ثالث</li>
                        <li>المحتوى الذي قدمته إلى موقعنا</li>
                        <li>تعاملاتك مع مقدمي الرعاية الصحية</li>
                        <li>أي معلومات خاطئة أو مضللة قدمتها</li>
                        <li>القرارات الطبية التي اتخذتها بناءً على المعلومات من موقعنا</li>
                        <li>تفاعلاتك مع المستخدمين أو الأطراف الثالثة الأخرى</li>
                      </ul>
                      <p className="mt-6">
                        يظل هذا التعويض ساري المفعول بعد إنهاء استخدامك لخدماتنا. نحتفظ بالحق في
                        تولي الدفاع الحصري والسيطرة على أي مسألة تخضع للتعويض من قبلك.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        You agree to indemnify, defend, and hold harmless Shifa Al Hind and its
                        directors, officers, employees, agents, and partners from and against any
                        and all claims, damages, obligations, losses, liabilities, costs, and
                        expenses (including reasonable attorneys' fees) arising from or related to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Your use or misuse of our services</li>
                        <li>Your violation of these Terms and Conditions</li>
                        <li>Your violation of any laws or third-party rights</li>
                        <li>Content you submitted to our site</li>
                        <li>Your interactions with healthcare providers</li>
                        <li>Any false or misleading information you provided</li>
                        <li>Medical decisions you made based on information from our site</li>
                        <li>Your interactions with other users or third parties</li>
                      </ul>
                      <p className="mt-6">
                        This indemnification remains in effect after termination of your use of our
                        services. We reserve the right to assume exclusive defense and control of
                        any matter subject to indemnification by you.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '9. القانون الحاكم' : '9. Governing Law'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p className="font-semibold">القانون المعمول به:</p>
                      <p>
                        تخضع هذه الشروط والأحكام وتُفسر وفقاً لقوانين جمهورية الهند، دون اعتبار
                        لمبادئ تعارض القوانين.
                      </p>
                      <p className="font-semibold mt-6">الولاية القضائية:</p>
                      <p>
                        أنت توافق بشكل لا رجعة فيه على الخضوع للولاية القضائية الحصرية للمحاكم
                        الموجودة في [المدينة، الولاية، الهند] فيما يتعلق بأي نزاعات تنشأ عن أو تتعلق
                        بهذه الشروط أو استخدامك لخدماتنا.
                      </p>
                      <p className="font-semibold mt-6">الامتثال للقوانين المحلية:</p>
                      <p>
                        أنت مسؤول عن الامتثال لجميع القوانين المحلية في ولايتك القضائية. قد لا تكون
                        بعض خدماتنا متاحة أو مناسبة لجميع المواقع.
                      </p>
                      <p className="font-semibold mt-6">القوانين المعمول بها:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>قانون تكنولوجيا المعلومات لعام 2000</li>
                        <li>قانون حماية المستهلك لعام 2019</li>
                        <li>قانون المجلس الطبي الهندي</li>
                        <li>قانون تنظيم الأجهزة السريرية والطبية لعام 2020</li>
                        <li>قوانين حماية البيانات والخصوصية المعمول بها</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Applicable Law:</p>
                      <p>
                        These Terms and Conditions shall be governed by and construed in accordance
                        with the laws of the Republic of India, without regard to its conflict of
                        law principles.
                      </p>
                      <p className="font-semibold mt-6">Jurisdiction:</p>
                      <p>
                        You irrevocably agree to submit to the exclusive jurisdiction of the courts
                        located in [City, State, India] for any disputes arising out of or relating
                        to these Terms or your use of our services.
                      </p>
                      <p className="font-semibold mt-6">Compliance with Local Laws:</p>
                      <p>
                        You are responsible for compliance with all local laws in your jurisdiction.
                        Some of our services may not be available or appropriate for all locations.
                      </p>
                      <p className="font-semibold mt-6">Applicable Regulations:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Information Technology Act, 2000</li>
                        <li>Consumer Protection Act, 2019</li>
                        <li>Indian Medical Council Act</li>
                        <li>Clinical Establishments (Registration and Regulation) Act, 2010</li>
                        <li>Applicable data protection and privacy laws</li>
                      </ul>
                    </>
                  )}
                </div>
              </section>

              {/* Dispute Resolution */}
              <section id="dispute-resolution" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '10. حل النزاعات' : '10. Dispute Resolution'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p className="font-semibold">المفاوضات الودية:</p>
                      <p>
                        في حالة وجود أي نزاع أو خلاف أو مطالبة تنشأ عن أو تتعلق بهذه الشروط، يوافق
                        الطرفان على محاولة حل المسألة بحسن نية من خلال المفاوضات الودية لمدة 30
                        يوماً قبل متابعة التحكيم أو الإجراءات القانونية.
                      </p>
                      <p className="font-semibold mt-6">الوساطة:</p>
                      <p>
                        إذا لم تنجح المفاوضات الودية، يوافق الطرفان على محاولة حل النزاع من خلال
                        الوساطة قبل الشروع في التحكيم. سيتم تعيين وسيط بالاتفاق المتبادل أو من قبل
                        محكمة مختصة.
                      </p>
                      <p className="font-semibold mt-6">التحكيم:</p>
                      <p>
                        إذا فشلت الوساطة في حل النزاع في غضون 60 يوماً، فإن أي نزاع ينشأ عن أو يتعلق
                        بهذه الشروط يجب حله نهائياً عن طريق التحكيم وفقاً لقانون التحكيم والمصالحة
                        لعام 1996.
                      </p>
                      <p className="font-semibold">شروط التحكيم:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>
                          عدد المحكمين: محكم واحد (أو ثلاثة للمطالبات التي تتجاوز 10 لكح روبية)
                        </li>
                        <li>مكان التحكيم: [المدينة، الولاية، الهند]</li>
                        <li>اللغة: الإنجليزية</li>
                        <li>القانون المعمول به: القانون الهندي</li>
                        <li>قرار المحكم نهائي وملزم للطرفين</li>
                        <li>تتحمل كل طرف تكاليفها القانونية الخاصة ما لم يقرر المحكم خلاف ذلك</li>
                      </ul>
                      <p className="font-semibold mt-6">الاستثناءات من التحكيم:</p>
                      <p>
                        على الرغم من ما سبق، يجوز لأي طرف أن يسعى إلى الإنصاف الزجري في المحكمة من
                        أجل:
                      </p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>انتهاكات حقوق الملكية الفكرية</li>
                        <li>انتهاكات اتفاقيات السرية</li>
                        <li>مطالبات تتطلب إجراءات عاجلة</li>
                      </ul>
                      <p className="font-semibold mt-6">التنازل عن الدعوى الجماعية:</p>
                      <p>
                        أنت توافق على أن أي إجراءات تحكيم أو قانونية يجب أن تُرفع بصفتك الفردية فقط
                        وليس كمدعٍ أو عضو في فئة في أي دعوى جماعية أو دعوى تمثيلية مزعومة.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Amicable Negotiations:</p>
                      <p>
                        In the event of any dispute, controversy, or claim arising out of or
                        relating to these Terms, the parties agree to attempt to resolve the matter
                        in good faith through amicable negotiations for 30 days before pursuing
                        arbitration or legal proceedings.
                      </p>
                      <p className="font-semibold mt-6">Mediation:</p>
                      <p>
                        If amicable negotiations fail, the parties agree to attempt to resolve the
                        dispute through mediation before proceeding to arbitration. A mediator shall
                        be appointed by mutual agreement or by a competent court.
                      </p>
                      <p className="font-semibold mt-6">Arbitration:</p>
                      <p>
                        If mediation fails to resolve the dispute within 60 days, any dispute
                        arising out of or in connection with these Terms shall be finally resolved
                        by arbitration in accordance with the Arbitration and Conciliation Act,
                        1996.
                      </p>
                      <p className="font-semibold">Arbitration Terms:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Number of arbitrators: One (or three for claims exceeding INR 10 lakhs)
                        </li>
                        <li>Seat of arbitration: [City, State, India]</li>
                        <li>Language: English</li>
                        <li>Governing law: Indian law</li>
                        <li>The arbitrator's decision is final and binding on both parties</li>
                        <li>
                          Each party bears its own legal costs unless the arbitrator decides
                          otherwise
                        </li>
                      </ul>
                      <p className="font-semibold mt-6">Exceptions to Arbitration:</p>
                      <p>
                        Notwithstanding the above, either party may seek injunctive relief in court
                        for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Intellectual property rights violations</li>
                        <li>Breaches of confidentiality agreements</li>
                        <li>Claims requiring urgent action</li>
                      </ul>
                      <p className="font-semibold mt-6">Class Action Waiver:</p>
                      <p>
                        You agree that any arbitration or legal proceedings shall be conducted in
                        your individual capacity only and not as a plaintiff or class member in any
                        purported class action or representative proceeding.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Changes to Terms */}
              <section id="changes-terms" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '11. التغييرات على الشروط' : '11. Changes to Terms'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p className="font-semibold">الحق في التعديل:</p>
                      <p>
                        نحتفظ بالحق في تعديل أو تحديث أو تغيير هذه الشروط والأحكام في أي وقت وفقاً
                        لتقديرنا الخاص. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ "آخر تحديث"
                        محدّث.
                      </p>
                      <p className="font-semibold mt-6">الإخطار بالتغييرات:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>
                          بالنسبة للتغييرات الجوهرية، سنقدم إشعاراً لمدة 30 يوماً عبر البريد
                          الإلكتروني أو إشعار بارز على الموقع
                        </li>
                        <li>
                          بالنسبة للتغييرات الطفيفة، سيُعتبر الإخطار عن طريق تحديث هذه الصفحة كافياً
                        </li>
                        <li>يُنصح بمراجعة هذه الشروط بشكل دوري</li>
                      </ul>
                      <p className="font-semibold mt-6">قبول التغييرات:</p>
                      <p>
                        استخدامك المستمر لخدماتنا بعد دخول الشروط المعدلة حيز التنفيذ يشكل قبولك
                        للشروط الجديدة. إذا لم توافق على الشروط الجديدة، يجب عليك التوقف عن استخدام
                        خدماتنا.
                      </p>
                      <p className="font-semibold mt-6">السجل التاريخي:</p>
                      <p>
                        نحتفظ بإصدارات سابقة من شروطنا وأحكامنا للرجوع إليها. يمكنك طلب الوصول إلى
                        الإصدارات السابقة عن طريق الاتصال بنا.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Right to Modify:</p>
                      <p>
                        We reserve the right to modify, update, or change these Terms and Conditions
                        at any time at our sole discretion. Any changes will be posted on this page
                        with an updated "Last Updated" date.
                      </p>
                      <p className="font-semibold mt-6">Notification of Changes:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          For material changes, we will provide 30 days' notice via email or
                          prominent notice on the website
                        </li>
                        <li>For minor changes, notification by updating this page is sufficient</li>
                        <li>You are advised to review these Terms periodically</li>
                      </ul>
                      <p className="font-semibold mt-6">Acceptance of Changes:</p>
                      <p>
                        Your continued use of our services after the modified Terms take effect
                        constitutes your acceptance of the new Terms. If you do not agree to the new
                        Terms, you must stop using our services.
                      </p>
                      <p className="font-semibold mt-6">Historical Record:</p>
                      <p>
                        We maintain previous versions of our Terms and Conditions for reference. You
                        may request access to previous versions by contacting us.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                  {isArabic ? '12. معلومات الاتصال' : '12. Contact Information'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  {isArabic ? (
                    <>
                      <p>
                        إذا كان لديك أي أسئلة أو مخاوف أو شكاوى بخصوص هذه الشروط والأحكام أو
                        خدماتنا، يرجى الاتصال بنا:
                      </p>
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-6">
                        <p className="font-bold text-lg text-blue-900 mb-4">شفاء الهند</p>
                        <div className="space-y-2 text-blue-900">
                          <p>
                            <span className="font-semibold">العنوان:</span> [عنوان الشارع الخاص بك]،
                            [المدينة، الولاية، الرمز البريدي]، الهند
                          </p>
                          <p>
                            <span className="font-semibold">البريد الإلكتروني:</span>{' '}
                            <a
                              href="mailto:legal@shifaalhind.com"
                              className="text-blue-600 hover:underline"
                            >
                              legal@shifaalhind.com
                            </a>
                          </p>
                          <p>
                            <span className="font-semibold">الهاتف:</span> +91 [رقم هاتفك]
                          </p>
                          <p>
                            <span className="font-semibold">دعم العملاء:</span>{' '}
                            <a
                              href="mailto:support@shifaalhind.com"
                              className="text-blue-600 hover:underline"
                            >
                              support@shifaalhind.com
                            </a>
                          </p>
                          <p>
                            <span className="font-semibold">ساعات العمل:</span> الاثنين - السبت،
                            9:00 صباحاً - 6:00 مساءً IST
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold mt-6">عملية الشكوى:</p>
                      <p>نحن ملتزمون بحل أي شكاوى بسرعة وإنصاف:</p>
                      <ul className="list-disc pr-6 space-y-2">
                        <li>قدم شكواك كتابياً عبر البريد الإلكتروني أو البريد</li>
                        <li>قدم جميع التفاصيل ذات الصلة والوثائق الداعمة</li>
                        <li>سنقر باستلام شكواك في غضون 48 ساعة</li>
                        <li>نهدف إلى حل الشكاوى في غضون 14 يوم عمل</li>
                        <li>إذا كنت غير راضٍ عن الحل، يمكنك تصعيد الأمر إلى إدارتنا العليا</li>
                      </ul>
                      <p className="mt-6">
                        <span className="font-semibold">آخر تحديث:</span> 10 يناير 2025
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg mt-6">
                        <p className="text-sm text-gray-700">
                          من خلال استخدام خدمات شفاء الهند، فإنك تقر بأنك قد قرأت وفهمت ووافقت على
                          الالتزام بهذه الشروط والأحكام بالكامل.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        If you have any questions, concerns, or complaints regarding these Terms and
                        Conditions or our services, please contact us:
                      </p>
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-6">
                        <p className="font-bold text-lg text-blue-900 mb-4">Shifa Al Hind</p>
                        <div className="space-y-2 text-blue-900">
                          <p>
                            <span className="font-semibold">Address:</span> [Your Street Address],
                            [City, State, PIN Code], India
                          </p>
                          <p>
                            <span className="font-semibold">Email:</span>{' '}
                            <a
                              href="mailto:legal@shifaalhind.com"
                              className="text-blue-600 hover:underline"
                            >
                              legal@shifaalhind.com
                            </a>
                          </p>
                          <p>
                            <span className="font-semibold">Phone:</span> +91 [Your Phone Number]
                          </p>
                          <p>
                            <span className="font-semibold">Customer Support:</span>{' '}
                            <a
                              href="mailto:support@shifaalhind.com"
                              className="text-blue-600 hover:underline"
                            >
                              support@shifaalhind.com
                            </a>
                          </p>
                          <p>
                            <span className="font-semibold">Business Hours:</span> Monday -
                            Saturday, 9:00 AM - 6:00 PM IST
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold mt-6">Complaint Process:</p>
                      <p>We are committed to resolving any complaints promptly and fairly:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Submit your complaint in writing via email or mail</li>
                        <li>Provide all relevant details and supporting documentation</li>
                        <li>We will acknowledge receipt of your complaint within 48 hours</li>
                        <li>We aim to resolve complaints within 14 business days</li>
                        <li>
                          If unsatisfied with the resolution, you may escalate to our senior
                          management
                        </li>
                      </ul>
                      <p className="mt-6">
                        <span className="font-semibold">Last Updated:</span> January 10, 2025
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg mt-6">
                        <p className="text-sm text-gray-700">
                          By using Shifa Al Hind's services, you acknowledge that you have read,
                          understood, and agree to be bound by these Terms and Conditions in their
                          entirety.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>

            {/* Back to Top Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
              >
                {isArabic ? 'العودة إلى الأعلى' : 'Back to Top'}
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-100 border-t border-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700 text-sm">
            {isArabic
              ? 'هذه الشروط والأحكام تشكل اتفاقية قانونية ملزمة بينك وبين شفاء الهند. يرجى قراءتها بعناية.'
              : 'These Terms and Conditions constitute a legally binding agreement between you and Shifa Al Hind. Please read them carefully.'}
          </p>
        </div>
      </div>
    </div>
  );
}
