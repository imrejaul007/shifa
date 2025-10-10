'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Award,
  Heart,
  Users,
  Clock,
  CheckCircle2,
  Shield,
  Globe,
  FileText,
  Activity,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface Props {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    breadcrumb: { home: 'Home', treatments: 'Treatments' },
    hero: {
      badge: 'Transplant Surgery',
      title: 'Organ Transplant in India',
      subtitle: 'World-Class Transplant Surgery at 80% Lower Cost',
      description:
        'Get life-saving organ transplant surgery at NOTTO-certified hospitals in India. Experienced surgeons with 500+ successful transplants, 95%+ success rates, Arabic support, and exceptional post-transplant care - all at a fraction of GCC costs.',
      ctaPrimary: 'Get Free Transplant Cost Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '80%+', desc: 'vs UAE & Saudi' },
      successRate: { label: 'Kidney Success', value: '95%+', desc: 'Success rate' },
      experience: { label: 'Experience', value: '25+ Years', desc: 'Transplant program' },
      transplants: { label: 'Annual Transplants', value: '3rd Largest', desc: 'Global ranking' },
    },
    costComparison: {
      title: 'Organ Transplant Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with organ transplant in India compared to your home country',
      india: 'India',
      uae: 'UAE',
      saudi: 'Saudi Arabia',
      tableHeaders: {
        procedure: 'Transplant Type',
        india: 'India Cost',
        uae: 'UAE Cost',
        saudi: 'Saudi Cost',
        savings: 'Your Savings',
      },
      procedures: [
        {
          name: 'Kidney Transplant',
          india: '$15,000 - $20,000',
          uae: '$100,000 - $150,000',
          saudi: '$90,000 - $140,000',
          savings: 'Save $85,000+',
        },
        {
          name: 'Liver Transplant',
          india: '$25,000 - $35,000',
          uae: '$150,000 - $220,000',
          saudi: '$130,000 - $200,000',
          savings: 'Save $125,000+',
        },
        {
          name: 'Heart Transplant',
          india: '$50,000 - $70,000',
          uae: '$300,000 - $400,000',
          saudi: '$280,000 - $380,000',
          savings: 'Save $250,000+',
        },
        {
          name: 'Lung Transplant',
          india: '$40,000 - $60,000',
          uae: '$250,000 - $350,000',
          saudi: '$220,000 - $320,000',
          savings: 'Save $200,000+',
        },
      ],
      note: '* All costs in USD. Includes surgery, hospital stay, medications, and immediate post-operative care. Travel and extended accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose India for Organ Transplant?',
      reasons: [
        {
          icon: Award,
          title: 'World-Class Transplant Centers',
          description:
            'NOTTO-certified hospitals with international accreditations (JCI, NABH). State-of-the-art facilities with advanced surgical suites and dedicated transplant ICUs.',
        },
        {
          icon: Users,
          title: 'Experienced Transplant Surgeons',
          description:
            'Highly experienced surgeons with 500+ successful transplants each. Many trained internationally at top institutions in USA, UK, and Europe.',
        },
        {
          icon: Activity,
          title: 'Highest Success Rates',
          description:
            '95%+ success rate for kidney transplant, 90%+ for liver, 85%+ for heart and lung transplants. Outcomes comparable to best centers worldwide.',
        },
        {
          icon: Globe,
          title: 'Arabic Language Support',
          description:
            'Dedicated Arabic-speaking coordinators throughout your journey. Cultural sensitivity and understanding of GCC patients needs and preferences.',
        },
        {
          icon: DollarSign,
          title: '80%+ Cost Savings',
          description:
            'Transparent, all-inclusive pricing with no hidden costs. Save 80-85% compared to UAE and Saudi Arabia without compromising on quality of care.',
        },
        {
          icon: Heart,
          title: 'Excellent Post-Transplant Care',
          description:
            'Comprehensive follow-up care with immunosuppression management, regular monitoring, 24/7 support, and telemedicine consultations after return home.',
        },
      ],
    },
    process: {
      title: 'Your Organ Transplant Journey in India',
      subtitle: 'Step-by-step guide to your transplant procedure',
      steps: [
        {
          number: '01',
          title: 'Pre-Transplant Evaluation',
          description:
            'Comprehensive medical assessment including blood tests, imaging, cardiac evaluation, and tissue typing. Review of medical history and donor evaluation if living donor.',
          duration: '3-5 Days',
        },
        {
          number: '02',
          title: 'Donor Matching & Approval',
          description:
            'HLA tissue typing and cross-matching with donor. Medical clearance for both recipient and donor. Legal documentation and transplant committee approval.',
          duration: '1-2 Weeks',
        },
        {
          number: '03',
          title: 'Transplant Surgery',
          description:
            'The transplant procedure performed by expert surgical team. Duration varies: kidney 3-4 hours, liver 6-8 hours, heart 4-6 hours, lung 6-8 hours. Performed in advanced surgical suites.',
          duration: '1 Day',
        },
        {
          number: '04',
          title: 'Intensive Care Recovery',
          description:
            'Close monitoring in transplant ICU for 3-7 days. Management of immunosuppressive medications, monitoring for rejection or complications, and gradual mobilization.',
          duration: '3-7 Days',
        },
        {
          number: '05',
          title: 'Hospital Recovery & Monitoring',
          description:
            'Transfer to transplant ward for continued recovery. Regular blood tests, medication adjustments, physical therapy, and education on post-transplant care.',
          duration: '2-3 Weeks',
        },
        {
          number: '06',
          title: 'Follow-up & Long-term Care',
          description:
            'Regular follow-up appointments with transplant team. Medication management, monitoring for rejection, infection prevention, and lifestyle counseling. Telemedicine support after return home.',
          duration: 'Ongoing',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Organ Transplant in India',
      items: [
        {
          question: 'How much does kidney transplant cost in India for UAE patients?',
          answer:
            'Kidney transplant in India costs between $15,000-$20,000 USD for UAE patients. This is 80-85% less expensive than kidney transplant in UAE ($100,000-$150,000). The cost includes all pre-operative tests, surgery, hospital stay (2-3 weeks), medications, and immediate post-operative care. Living donor evaluation and surgery are included in the package.',
        },
        {
          question: 'What is the success rate of organ transplants in India?',
          answer:
            'India has world-class organ transplant success rates at NOTTO-certified hospitals: 95%+ for kidney transplant, 90%+ for liver transplant, 85%+ for heart transplant, and 85%+ for lung transplant. These success rates are comparable to or better than rates in UAE, Saudi Arabia, USA, and European countries. Success depends on factors like patient health, donor match quality, and post-transplant care compliance.',
        },
        {
          question: 'How long do I need to stay in India for organ transplant?',
          answer:
            'Stay duration varies by transplant type: Kidney transplant requires 3-4 weeks stay (including 2-3 weeks hospital stay), liver transplant needs 4-6 weeks (3-4 weeks in hospital), heart transplant requires 6-8 weeks (4-5 weeks in hospital), and lung transplant needs 6-8 weeks (4-6 weeks in hospital). After discharge, you stay nearby for outpatient monitoring before flying home.',
        },
        {
          question: 'Are Indian transplant hospitals certified and safe?',
          answer:
            'Yes, India has NOTTO (National Organ and Tissue Transplant Organization) certified hospitals with international accreditations like JCI and NABH. These hospitals follow strict quality standards and have highly experienced transplant surgeons with 500+ successful transplants. Safety protocols, infection control, and outcomes are comparable to top Western transplant centers.',
        },
        {
          question: 'Can I bring a living donor from my country for transplant?',
          answer:
            'Yes, you can bring a living donor (immediate family member) from your country for transplant in India. The donor must be a blood relative (parent, sibling, child) as per Indian transplant laws. Both patient and donor will undergo comprehensive medical evaluation. The transplant committee must approve the procedure after verifying relationship documentation.',
        },
        {
          question: 'Do transplant hospitals in India have Arabic-speaking staff?',
          answer:
            'Yes, major transplant hospitals in India have Arabic-speaking coordinators, translators, and nursing staff to assist GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who will guide you throughout your entire transplant journey, from initial consultation to post-transplant follow-up.',
        },
        {
          question: 'What is included in the transplant surgery cost?',
          answer:
            'Transplant packages include: pre-operative evaluation and tests, donor evaluation (for living donor), surgery fees, anesthesia, hospital stay (ICU and ward), immunosuppressive medications during hospital stay, post-operative care, and initial follow-up consultations. Additional costs may apply for extended hospital stay due to complications or special medications.',
        },
        {
          question: 'What post-transplant care is provided after returning home?',
          answer:
            'After returning home, you receive: detailed medication schedule and supply for 3 months, telemedicine consultations with transplant team, 24/7 emergency support hotline, guidance on local lab tests and monitoring, dietary and lifestyle counseling, and coordination with local doctors. Follow-up visits to India recommended at 3 months, 6 months, and 1 year post-transplant.',
        },
      ],
    },
    hospitals: {
      title: 'Top Transplant Hospitals in India',
      subtitle: 'NOTTO-certified transplant centers with proven track records',
      cta: 'View All Hospitals',
    },
    finalCta: {
      title: 'Ready to Start Your Transplant Journey?',
      subtitle:
        'Get a free consultation with our transplant specialists and receive a personalized treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Transplant Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'جراحة الزرع',
      title: 'زراعة الأعضاء في الهند',
      subtitle: 'جراحة زرع عالمية المستوى بتكلفة أقل 80٪',
      description:
        'احصل على جراحة زراعة أعضاء منقذة للحياة في مستشفيات معتمدة من NOTTO في الهند. جراحون خبراء مع أكثر من 500 عملية زرع ناجحة، نسبة نجاح 95٪+، دعم باللغة العربية، ورعاية ممتازة بعد الزرع - كل ذلك بجزء بسيط من تكاليف الخليج.',
      ctaPrimary: 'احصل على تقدير مجاني لتكلفة الزرع',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '80%+', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نجاح الكلى', value: '95%+', desc: 'نسبة النجاح' },
      experience: { label: 'الخبرة', value: '25+ سنة', desc: 'برنامج الزرع' },
      transplants: {
        label: 'عمليات الزرع السنوية',
        value: 'الثالث عالمياً',
        desc: 'التصنيف العالمي',
      },
    },
    costComparison: {
      title: 'مقارنة تكلفة زراعة الأعضاء: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع زراعة الأعضاء في الهند مقارنة ببلدك',
      india: 'الهند',
      uae: 'الإمارات',
      saudi: 'السعودية',
      tableHeaders: {
        procedure: 'نوع الزرع',
        india: 'تكلفة الهند',
        uae: 'تكلفة الإمارات',
        saudi: 'تكلفة السعودية',
        savings: 'توفيرك',
      },
      procedures: [
        {
          name: 'زراعة الكلى',
          india: '$15,000 - $20,000',
          uae: '$100,000 - $150,000',
          saudi: '$90,000 - $140,000',
          savings: 'وفر $85,000+',
        },
        {
          name: 'زراعة الكبد',
          india: '$25,000 - $35,000',
          uae: '$150,000 - $220,000',
          saudi: '$130,000 - $200,000',
          savings: 'وفر $125,000+',
        },
        {
          name: 'زراعة القلب',
          india: '$50,000 - $70,000',
          uae: '$300,000 - $400,000',
          saudi: '$280,000 - $380,000',
          savings: 'وفر $250,000+',
        },
        {
          name: 'زراعة الرئة',
          india: '$40,000 - $60,000',
          uae: '$250,000 - $350,000',
          saudi: '$220,000 - $320,000',
          savings: 'وفر $200,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الجراحة، الإقامة في المستشفى، الأدوية، والرعاية الفورية بعد العملية. تكاليف السفر والإقامة الممتدة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار الهند لزراعة الأعضاء؟',
      reasons: [
        {
          icon: Award,
          title: 'مراكز زرع عالمية المستوى',
          description:
            'مستشفيات معتمدة من NOTTO مع اعتمادات دولية (JCI، NABH). مرافق حديثة مع غرف جراحة متقدمة ووحدات عناية مركزة مخصصة للزرع.',
        },
        {
          icon: Users,
          title: 'جراحو زرع ذوو خبرة',
          description:
            'جراحون ذوو خبرة عالية مع أكثر من 500 عملية زرع ناجحة لكل منهم. العديد منهم مدربون دولياً في أفضل المؤسسات في الولايات المتحدة والمملكة المتحدة وأوروبا.',
        },
        {
          icon: Activity,
          title: 'أعلى معدلات النجاح',
          description:
            'نسبة نجاح 95٪+ لزراعة الكلى، 90٪+ للكبد، 85٪+ لزراعة القلب والرئة. نتائج مماثلة لأفضل المراكز في العالم.',
        },
        {
          icon: Globe,
          title: 'دعم باللغة العربية',
          description:
            'منسقون متخصصون يتحدثون العربية طوال رحلتك. حساسية ثقافية وفهم لاحتياجات وتفضيلات مرضى الخليج.',
        },
        {
          icon: DollarSign,
          title: 'توفير 80٪+ من التكلفة',
          description:
            'أسعار شفافة وشاملة بدون تكاليف خفية. وفر 80-85٪ مقارنة بالإمارات والسعودية دون المساومة على جودة الرعاية.',
        },
        {
          icon: Heart,
          title: 'رعاية ممتازة بعد الزرع',
          description:
            'رعاية متابعة شاملة مع إدارة الأدوية المثبطة للمناعة، مراقبة منتظمة، دعم على مدار الساعة، واستشارات طبية عن بعد بعد العودة إلى الوطن.',
        },
      ],
    },
    process: {
      title: 'رحلة زراعة الأعضاء في الهند',
      subtitle: 'دليل خطوة بخطوة لإجراء الزرع الخاص بك',
      steps: [
        {
          number: '01',
          title: 'التقييم قبل الزرع',
          description:
            'تقييم طبي شامل يشمل فحوصات الدم، التصوير، تقييم القلب، وكتابة الأنسجة. مراجعة التاريخ الطبي وتقييم المتبرع إذا كان متبرعاً حياً.',
          duration: '3-5 أيام',
        },
        {
          number: '02',
          title: 'مطابقة المتبرع والموافقة',
          description:
            'كتابة أنسجة HLA والمطابقة المتقاطعة مع المتبرع. تصريح طبي لكل من المتلقي والمتبرع. توثيق قانوني وموافقة لجنة الزرع.',
          duration: '1-2 أسبوع',
        },
        {
          number: '03',
          title: 'جراحة الزرع',
          description:
            'إجراء الزرع يتم بواسطة فريق جراحي خبير. المدة تختلف: الكلى 3-4 ساعات، الكبد 6-8 ساعات، القلب 4-6 ساعات، الرئة 6-8 ساعات. يتم في غرف جراحة متقدمة.',
          duration: 'يوم واحد',
        },
        {
          number: '04',
          title: 'التعافي في العناية المركزة',
          description:
            'مراقبة دقيقة في وحدة العناية المركزة للزرع لمدة 3-7 أيام. إدارة الأدوية المثبطة للمناعة، مراقبة الرفض أو المضاعفات، والتعبئة التدريجية.',
          duration: '3-7 أيام',
        },
        {
          number: '05',
          title: 'التعافي في المستشفى والمراقبة',
          description:
            'النقل إلى جناح الزرع لاستمرار التعافي. فحوصات دم منتظمة، تعديلات الأدوية، علاج طبيعي، وتعليم حول الرعاية بعد الزرع.',
          duration: '2-3 أسابيع',
        },
        {
          number: '06',
          title: 'المتابعة والرعاية طويلة الأمد',
          description:
            'مواعيد متابعة منتظمة مع فريق الزرع. إدارة الأدوية، مراقبة الرفض، الوقاية من العدوى، والمشورة حول نمط الحياة. دعم الطب عن بعد بعد العودة إلى الوطن.',
          duration: 'مستمر',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول زراعة الأعضاء في الهند',
      items: [
        {
          question: 'كم تكلفة زراعة الكلى في الهند لمرضى الإمارات؟',
          answer:
            'تتراوح تكلفة زراعة الكلى في الهند بين 15,000-20,000 دولار أمريكي لمرضى الإمارات. هذا أقل بنسبة 80-85٪ من تكلفة زراعة الكلى في الإمارات (100,000-150,000 دولار). التكلفة تشمل جميع الفحوصات قبل العملية، الجراحة، الإقامة في المستشفى (2-3 أسابيع)، الأدوية، والرعاية الفورية بعد العملية.',
        },
        {
          question: 'ما هي نسبة نجاح زراعة الأعضاء في الهند؟',
          answer:
            'لدى الهند معدلات نجاح عالمية المستوى لزراعة الأعضاء في المستشفيات المعتمدة من NOTTO: 95٪+ لزراعة الكلى، 90٪+ لزراعة الكبد، 85٪+ لزراعة القلب، و85٪+ لزراعة الرئة. هذه النسب مماثلة أو أفضل من النسب في الإمارات والسعودية والولايات المتحدة والدول الأوروبية.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في الهند لزراعة الأعضاء؟',
          answer:
            'مدة الإقامة تختلف حسب نوع الزرع: زراعة الكلى تتطلب 3-4 أسابيع (بما في ذلك 2-3 أسابيع في المستشفى)، زراعة الكبد تحتاج 4-6 أسابيع (3-4 أسابيع في المستشفى)، زراعة القلب تتطلب 6-8 أسابيع (4-5 أسابيع في المستشفى)، وزراعة الرئة تحتاج 6-8 أسابيع (4-6 أسابيع في المستشفى).',
        },
        {
          question: 'هل مستشفيات الزرع الهندية معتمدة وآمنة؟',
          answer:
            'نعم، لدى الهند مستشفيات معتمدة من NOTTO (المنظمة الوطنية لزرع الأعضاء والأنسجة) مع اعتمادات دولية مثل JCI وNABH. هذه المستشفيات تتبع معايير جودة صارمة ولديها جراحو زرع ذوو خبرة عالية مع أكثر من 500 عملية زرع ناجحة.',
        },
        {
          question: 'هل يمكنني إحضار متبرع حي من بلدي للزرع؟',
          answer:
            'نعم، يمكنك إحضار متبرع حي (أحد أفراد الأسرة المباشرة) من بلدك للزرع في الهند. يجب أن يكون المتبرع قريب دم (والد، شقيق، طفل) وفقاً لقوانين الزرع الهندية. سيخضع كل من المريض والمتبرع لتقييم طبي شامل.',
        },
        {
          question: 'هل مستشفيات الزرع في الهند لديها موظفون يتحدثون العربية؟',
          answer:
            'نعم، مستشفيات الزرع الرئيسية في الهند لديها منسقون ومترجمون وطاقم تمريض يتحدثون العربية لمساعدة مرضى الخليج. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية سيرشدونك طوال رحلة الزرع بأكملها.',
        },
        {
          question: 'ما هو المشمول في تكلفة جراحة الزرع؟',
          answer:
            'باقات الزرع تشمل: التقييم والفحوصات قبل العملية، تقييم المتبرع (للمتبرع الحي)، رسوم الجراحة، التخدير، الإقامة في المستشفى (العناية المركزة والجناح)، الأدوية المثبطة للمناعة أثناء الإقامة في المستشفى، الرعاية بعد العملية، واستشارات المتابعة الأولية.',
        },
        {
          question: 'ما هي الرعاية بعد الزرع المقدمة بعد العودة إلى الوطن؟',
          answer:
            'بعد العودة إلى الوطن، تتلقى: جدول أدوية مفصل وإمداد لمدة 3 أشهر، استشارات طبية عن بعد مع فريق الزرع، خط دعم طوارئ على مدار الساعة، إرشادات حول الفحوصات المخبرية المحلية والمراقبة، استشارات غذائية ونمط الحياة، والتنسيق مع الأطباء المحليين.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات الزرع في الهند',
      subtitle: 'مراكز زرع معتمدة من NOTTO مع سجلات حافلة مثبتة',
      cta: 'عرض جميع المستشفيات',
    },
    finalCta: {
      title: 'هل أنت مستعد لبدء رحلة الزرع الخاصة بك؟',
      subtitle:
        'احصل على استشارة مجانية مع متخصصي الزرع لدينا واحصل على خطة علاج شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل الزرع',
    },
  },
};

export default function TransplantPillarClient({ locale }: Props) {
  const t = content[locale];

  return (
    <main
      className={`min-h-screen bg-background pt-20 sm:pt-24 ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20">
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
            <Link href={`/${locale}/treatments`} className="hover:text-accent transition-colors">
              {t.breadcrumb.treatments}
            </Link>
            <span>/</span>
            <span className="text-foreground">Organ Transplant</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Activity className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4 leading-tight">
                {t.hero.title}
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-accent mb-4 leading-snug">
                {t.hero.subtitle}
              </p>

              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonLink href={`/${locale}/consultation`} variant="gold" size="lg">
                  {t.hero.ctaPrimary}
                </ButtonLink>
                <ButtonLink href={`/${locale}/booking`} variant="outline" size="lg">
                  {t.hero.ctaSecondary}
                </ButtonLink>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {Object.entries(t.stats).map(([key, stat], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card hover={false} variant="default" className="h-full">
                    <CardBody className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-primary mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.desc}</div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.costComparison.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.costComparison.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto overflow-x-auto"
          >
            <div className="min-w-[640px]">
              <table className="w-full bg-card rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="text-left p-4 sm:p-6 text-sm sm:text-base font-semibold text-primary">
                      {t.costComparison.tableHeaders.procedure}
                    </th>
                    <th className="text-center p-4 sm:p-6 text-sm sm:text-base font-semibold text-accent">
                      {t.costComparison.tableHeaders.india}
                    </th>
                    <th className="text-center p-4 sm:p-6 text-sm sm:text-base font-semibold text-muted-foreground">
                      {t.costComparison.tableHeaders.uae}
                    </th>
                    <th className="text-center p-4 sm:p-6 text-sm sm:text-base font-semibold text-muted-foreground">
                      {t.costComparison.tableHeaders.saudi}
                    </th>
                    <th className="text-center p-4 sm:p-6 text-sm sm:text-base font-semibold text-primary">
                      {t.costComparison.tableHeaders.savings}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.costComparison.procedures.map((proc, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 sm:p-6 text-sm sm:text-base font-medium text-foreground">
                        {proc.name}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base font-bold text-accent">
                        {proc.india}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base text-muted-foreground line-through">
                        {proc.uae}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base text-muted-foreground line-through">
                        {proc.saudi}
                      </td>
                      <td className="p-4 sm:p-6 text-center text-sm sm:text-base font-bold text-green-600">
                        {proc.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center">
              {t.costComparison.note}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose India Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-8 sm:mb-12 text-center leading-tight"
          >
            {t.overview.title}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.overview.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={true} variant="default" className="h-full">
                  <CardBody>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                      <reason.icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-primary mb-3 leading-snug">
                      {reason.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.process.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t.process.subtitle}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {t.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={false} variant="default">
                  <CardBody>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl sm:text-3xl font-bold text-accent">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-display font-bold text-primary leading-snug">
                            {step.title}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-8 sm:mb-12 text-center leading-tight"
            >
              {t.faq.title}
            </motion.h2>

            <div className="space-y-4">
              {t.faq.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card hover={false} variant="default">
                    <CardBody className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-1" />
                        <h3 className="text-base sm:text-lg font-display font-bold text-primary leading-snug">
                          {item.question}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed ml-8 sm:ml-9">
                        {item.answer}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass rounded-3xl p-6 sm:p-8 lg:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.finalCta.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t.finalCta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink
                href={`/${locale}/consultation`}
                variant="gold"
                size="lg"
                leftIcon={<FileText className="w-5 h-5" />}
              >
                {t.finalCta.ctaPrimary}
              </ButtonLink>
              <ButtonLink
                href={`/${locale}/hospitals`}
                variant="outline"
                size="lg"
                leftIcon={<Shield className="w-5 h-5" />}
              >
                {t.hospitals.cta}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
