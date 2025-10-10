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
  ArrowRight,
  Shield,
  Globe,
  TrendingUp,
  FileText,
  Activity,
  Microscope,
  Zap,
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
      badge: 'Cancer Treatment',
      title: 'Cancer Treatment in India',
      subtitle: 'World-Class Oncology Care at 70-80% Lower Cost',
      description:
        "Receive advanced cancer treatment from India's top oncology hospitals in Bangalore. JCI-accredited centers, experienced oncologists (15+ years), latest technology including immunotherapy and targeted therapy - all at a fraction of GCC costs.",
      ctaPrimary: 'Get Free Cancer Treatment Cost Estimate',
      ctaSecondary: 'Book Oncologist Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '70-80%', desc: 'vs UAE & Saudi' },
      successRate: { label: 'Success Rate', value: '75%+', desc: 'Early-stage cancer' },
      experience: { label: 'Experience', value: '20+ Years', desc: 'Top oncologists' },
      patients: { label: 'GCC Patients', value: '5000+', desc: 'Treated annually' },
    },
    costComparison: {
      title: 'Cancer Treatment Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with cancer treatment in India compared to your home country',
      india: 'India (Bangalore)',
      uae: 'UAE (Dubai)',
      saudi: 'Saudi Arabia',
      tableHeaders: {
        procedure: 'Treatment Type',
        india: 'India Cost',
        uae: 'UAE Cost',
        saudi: 'Saudi Cost',
        savings: 'Your Savings',
      },
      procedures: [
        {
          name: 'Chemotherapy (per cycle)',
          india: '$3,000 - $5,000',
          uae: '$15,000 - $25,000',
          saudi: '$13,000 - $22,000',
          savings: 'Save $10,000+',
        },
        {
          name: 'Radiation Therapy',
          india: '$4,000 - $7,000',
          uae: '$20,000 - $30,000',
          saudi: '$18,000 - $28,000',
          savings: 'Save $14,000+',
        },
        {
          name: 'Cancer Surgery (Tumor Removal)',
          india: '$5,000 - $10,000',
          uae: '$25,000 - $40,000',
          saudi: '$22,000 - $35,000',
          savings: 'Save $17,000+',
        },
        {
          name: 'Bone Marrow Transplant',
          india: '$25,000 - $35,000',
          uae: '$150,000 - $200,000',
          saudi: '$130,000 - $180,000',
          savings: 'Save $115,000+',
        },
      ],
      note: '* All costs in USD. Includes consultations, procedures, and immediate care. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose India for Cancer Treatment?',
      reasons: [
        {
          icon: Microscope,
          title: 'Advanced Oncology Centers',
          description:
            'State-of-the-art cancer hospitals with latest diagnostic equipment including PET-CT, MRI, and molecular testing. Comprehensive cancer care under one roof.',
        },
        {
          icon: Users,
          title: 'Specialized Oncologists (15+ Years)',
          description:
            'Board-certified oncologists with international training from USA, UK, and Europe. Expertise in medical oncology, surgical oncology, and radiation oncology.',
        },
        {
          icon: Zap,
          title: 'Latest Technology',
          description:
            'Access to cutting-edge treatments: immunotherapy, targeted therapy, CAR-T cell therapy, proton beam therapy, robotic surgery, and precision oncology.',
        },
        {
          icon: TrendingUp,
          title: 'High Success Rates',
          description:
            '75%+ success rates for early-stage cancers. Outcomes comparable to top Western cancer centers. Multi-disciplinary tumor boards for treatment planning.',
        },
        {
          icon: Globe,
          title: 'Arabic Support',
          description:
            'Dedicated Arabic-speaking coordinators and translators. Cultural sensitivity with halal-certified hospital facilities. Support for GCC patients and families.',
        },
        {
          icon: DollarSign,
          title: '70-80% Cost Savings',
          description:
            'Transparent all-inclusive packages. Save significantly on chemotherapy, radiation, surgery, and advanced treatments without compromising quality or safety.',
        },
      ],
    },
    process: {
      title: 'Your Cancer Treatment Journey in India',
      subtitle: 'Step-by-step comprehensive cancer care timeline',
      steps: [
        {
          number: '01',
          title: 'Medical Records Review & Second Opinion',
          description:
            'Share your diagnosis, scans, and biopsy reports. Expert oncologist review and video consultation to discuss treatment options and personalized plan.',
          duration: 'Day 1-3',
        },
        {
          number: '02',
          title: 'Travel Planning & Arrival',
          description:
            'Medical visa assistance, flight booking support, airport pickup, and comfortable accommodation near hospital. Pre-arrival preparation and documentation.',
          duration: 'Day 4-7',
        },
        {
          number: '03',
          title: 'Comprehensive Cancer Assessment',
          description:
            'Complete diagnostic workup including blood tests, imaging (PET-CT, MRI), tumor markers, and genetic testing. Multi-disciplinary tumor board review.',
          duration: 'Day 8-10',
        },
        {
          number: '04',
          title: 'Treatment Initiation',
          description:
            'Begin personalized treatment plan: chemotherapy, radiation therapy, surgery, or combination therapy. Latest protocols and supportive care throughout.',
          duration: 'Day 11-14',
        },
        {
          number: '05',
          title: 'Active Treatment Phase',
          description:
            'Ongoing treatment cycles with regular monitoring. Side effect management, nutritional support, and psychological counseling. Family involvement encouraged.',
          duration: 'Weeks 2-8',
        },
        {
          number: '06',
          title: 'Follow-up & Ongoing Care',
          description:
            'Post-treatment scans and assessment. Long-term follow-up plan with remote monitoring. Continued support from your medical team back home.',
          duration: 'Ongoing',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Cancer Treatment in India',
      items: [
        {
          question: 'How much does cancer treatment cost in India for GCC patients?',
          answer:
            'Cancer treatment in India costs 70-80% less than UAE and Saudi Arabia. Chemotherapy costs $3,000-5,000 per cycle in India vs $15,000-25,000 in UAE. Radiation therapy costs $4,000-7,000 in India vs $20,000-30,000 in UAE. Cancer surgery ranges from $5,000-10,000 in India vs $25,000-40,000 in UAE. Bone marrow transplants cost $25,000-35,000 in India vs $150,000-200,000 in UAE. These savings make advanced cancer care accessible while maintaining world-class quality.',
        },
        {
          question: 'What is the success rate of cancer treatment in India?',
          answer:
            "Top oncology hospitals in Bangalore report 75%+ success rates for early-stage cancers including breast, prostate, and colorectal cancers. Advanced-stage cancer outcomes are comparable to Western countries. Success rates vary by cancer type, stage, and individual factors. India's cancer centers use the same protocols and technologies as leading international hospitals, with experienced oncologists trained globally.",
        },
        {
          question: 'Is cancer treatment in India safe for foreign patients?',
          answer:
            'Yes, cancer treatment in India is very safe for international patients. Bangalore has multiple JCI-accredited cancer hospitals that follow stringent international quality standards. Oncologists are trained at top institutions in USA, UK, and Europe. Hospitals use FDA-approved medications and latest treatment technologies. Infection control, radiation safety, and surgical protocols meet global benchmarks.',
        },
        {
          question: 'How long do I need to stay in India for cancer treatment?',
          answer:
            'Duration depends on treatment type. Chemotherapy cycles typically require 1-2 weeks per session with 3-6 cycles over several months. Radiation therapy needs 4-6 weeks of daily sessions. Major cancer surgeries require 2-4 weeks including pre-op assessment and recovery. Bone marrow transplants need minimum 4-6 weeks for the procedure and initial recovery. Your oncologist will provide a detailed timeline based on your specific treatment plan.',
        },
        {
          question: 'Do oncology hospitals in Bangalore speak Arabic?',
          answer:
            'Yes, major cancer hospitals in Bangalore have Arabic-speaking coordinators, translators, and patient care staff to assist GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who accompany you throughout your entire cancer treatment journey - from initial consultation to follow-up care. All medical reports and treatment plans can be explained in Arabic.',
        },
        {
          question: 'What types of cancer are treated in Indian hospitals?',
          answer:
            "India's oncology hospitals treat all types of cancer: breast cancer, lung cancer, colorectal cancer, prostate cancer, blood cancers (leukemia, lymphoma, myeloma), brain tumors, liver cancer, stomach cancer, pancreatic cancer, ovarian cancer, cervical cancer, kidney cancer, and rare cancers. Specialized centers exist for each cancer type with dedicated oncologists, surgeons, and support teams.",
        },
        {
          question: 'Does India offer advanced cancer treatments like immunotherapy?',
          answer:
            'Yes, top cancer hospitals in India offer all advanced treatments including immunotherapy (checkpoint inhibitors), targeted therapy, CAR-T cell therapy, proton beam therapy, CyberKnife radiosurgery, robotic surgery (da Vinci), HIPEC for peritoneal cancers, and precision oncology with genetic profiling. These cutting-edge treatments are available at 60-70% lower cost than Western countries.',
        },
        {
          question: 'Can I get a second opinion from Indian oncologists before traveling?',
          answer:
            'Yes, absolutely. Most top oncology hospitals in Bangalore offer online second opinion services. You can share your medical records, pathology reports, imaging scans (CT, MRI, PET-CT), and treatment history. Expert oncologists will review your case and provide detailed opinions via video consultation. This helps you make informed decisions before committing to travel to India for treatment.',
        },
      ],
    },
    hospitals: {
      title: 'Top Cancer Hospitals in Bangalore',
      subtitle: 'JCI-accredited oncology centers with proven track records',
      cta: 'View All Cancer Hospitals',
    },
    finalCta: {
      title: 'Ready to Start Your Cancer Treatment Journey?',
      subtitle:
        'Get a free consultation with our experienced oncologists and receive a personalized cancer treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Oncology Consultation',
      ctaSecondary: 'Download Cancer Treatment Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'علاج السرطان',
      title: 'علاج السرطان في الهند',
      subtitle: 'رعاية أورام عالمية المستوى بتكلفة أقل 70-80٪',
      description:
        'احصل على علاج السرطان المتقدم من أفضل مستشفيات الأورام في بنغالور. مراكز معتمدة من JCI، أطباء أورام ذوي خبرة (15+ سنة)، أحدث التقنيات بما في ذلك العلاج المناعي والعلاج الموجه - كل ذلك بجزء بسيط من تكاليف الخليج.',
      ctaPrimary: 'احصل على تقدير مجاني لتكلفة علاج السرطان',
      ctaSecondary: 'احجز استشارة مع طبيب أورام',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '70-80%', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نسبة النجاح', value: '75%+', desc: 'السرطان في المراحل المبكرة' },
      experience: { label: 'الخبرة', value: '20+ سنة', desc: 'أفضل أطباء الأورام' },
      patients: { label: 'مرضى الخليج', value: '5000+', desc: 'يعالجون سنوياً' },
    },
    costComparison: {
      title: 'مقارنة تكلفة علاج السرطان: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع علاج السرطان في الهند مقارنة ببلدك',
      india: 'الهند (بنغالور)',
      uae: 'الإمارات (دبي)',
      saudi: 'السعودية',
      tableHeaders: {
        procedure: 'نوع العلاج',
        india: 'تكلفة الهند',
        uae: 'تكلفة الإمارات',
        saudi: 'تكلفة السعودية',
        savings: 'توفيرك',
      },
      procedures: [
        {
          name: 'العلاج الكيميائي (لكل دورة)',
          india: '$3,000 - $5,000',
          uae: '$15,000 - $25,000',
          saudi: '$13,000 - $22,000',
          savings: 'وفر $10,000+',
        },
        {
          name: 'العلاج الإشعاعي',
          india: '$4,000 - $7,000',
          uae: '$20,000 - $30,000',
          saudi: '$18,000 - $28,000',
          savings: 'وفر $14,000+',
        },
        {
          name: 'جراحة السرطان (إزالة الورم)',
          india: '$5,000 - $10,000',
          uae: '$25,000 - $40,000',
          saudi: '$22,000 - $35,000',
          savings: 'وفر $17,000+',
        },
        {
          name: 'زرع نخاع العظم',
          india: '$25,000 - $35,000',
          uae: '$150,000 - $200,000',
          saudi: '$130,000 - $180,000',
          savings: 'وفر $115,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الاستشارات والإجراءات والرعاية الفورية. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار الهند لعلاج السرطان؟',
      reasons: [
        {
          icon: Microscope,
          title: 'مراكز أورام متقدمة',
          description:
            'مستشفيات سرطان حديثة مع أحدث أجهزة التشخيص بما في ذلك PET-CT، MRI، والفحوصات الجزيئية. رعاية شاملة للسرطان تحت سقف واحد.',
        },
        {
          icon: Users,
          title: 'أطباء أورام متخصصون (15+ سنة)',
          description:
            'أطباء أورام معتمدون مع تدريب دولي من الولايات المتحدة والمملكة المتحدة وأوروبا. خبرة في الأورام الطبية والجراحية والإشعاعية.',
        },
        {
          icon: Zap,
          title: 'أحدث التقنيات',
          description:
            'الوصول إلى العلاجات المتطورة: العلاج المناعي، العلاج الموجه، علاج CAR-T، العلاج بالبروتون، الجراحة الروبوتية، وعلم الأورام الدقيق.',
        },
        {
          icon: TrendingUp,
          title: 'نسب نجاح عالية',
          description:
            'نسب نجاح 75٪+ للسرطانات في المراحل المبكرة. نتائج مماثلة لأفضل مراكز السرطان الغربية. مجالس أورام متعددة التخصصات لتخطيط العلاج.',
        },
        {
          icon: Globe,
          title: 'دعم باللغة العربية',
          description:
            'منسقون متخصصون ومترجمون يتحدثون العربية. حساسية ثقافية مع مرافق مستشفى معتمدة حلال. دعم لمرضى وعائلات الخليج.',
        },
        {
          icon: DollarSign,
          title: 'توفير 70-80٪ في التكلفة',
          description:
            'باقات شاملة شفافة. وفر بشكل كبير على العلاج الكيميائي والإشعاعي والجراحة والعلاجات المتقدمة دون المساومة على الجودة أو السلامة.',
        },
      ],
    },
    process: {
      title: 'رحلة علاج السرطان في الهند',
      subtitle: 'جدول زمني شامل خطوة بخطوة لرعاية السرطان',
      steps: [
        {
          number: '01',
          title: 'مراجعة السجلات الطبية والرأي الثاني',
          description:
            'شارك تشخيصك، الفحوصات، وتقارير الخزعة. مراجعة خبير أورام واستشارة فيديو لمناقشة خيارات العلاج والخطة الشخصية.',
          duration: 'اليوم 1-3',
        },
        {
          number: '02',
          title: 'التخطيط للسفر والوصول',
          description:
            'المساعدة في الحصول على تأشيرة طبية، دعم حجز الرحلات، الاستقبال في المطار، وإقامة مريحة بالقرب من المستشفى. التحضير والتوثيق قبل الوصول.',
          duration: 'اليوم 4-7',
        },
        {
          number: '03',
          title: 'تقييم شامل للسرطان',
          description:
            'فحص تشخيصي كامل بما في ذلك فحوصات الدم، التصوير (PET-CT، MRI)، علامات الأورام، والاختبارات الجينية. مراجعة مجلس الأورام متعدد التخصصات.',
          duration: 'اليوم 8-10',
        },
        {
          number: '04',
          title: 'بدء العلاج',
          description:
            'ابدأ خطة العلاج الشخصية: العلاج الكيميائي، العلاج الإشعاعي، الجراحة، أو العلاج المركب. أحدث البروتوكولات والرعاية الداعمة طوال الوقت.',
          duration: 'اليوم 11-14',
        },
        {
          number: '05',
          title: 'مرحلة العلاج النشط',
          description:
            'دورات علاجية مستمرة مع مراقبة منتظمة. إدارة الآثار الجانبية، الدعم الغذائي، والاستشارة النفسية. تشجيع مشاركة الأسرة.',
          duration: 'الأسبوع 2-8',
        },
        {
          number: '06',
          title: 'المتابعة والرعاية المستمرة',
          description:
            'فحوصات وتقييم ما بعد العلاج. خطة متابعة طويلة الأجل مع مراقبة عن بعد. دعم مستمر من فريقك الطبي في بلدك.',
          duration: 'مستمر',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول علاج السرطان في الهند',
      items: [
        {
          question: 'كم تكلفة علاج السرطان في الهند لمرضى الخليج؟',
          answer:
            'تكلفة علاج السرطان في الهند أقل بنسبة 70-80٪ من الإمارات والسعودية. تكلفة العلاج الكيميائي 3,000-5,000 دولار لكل دورة في الهند مقابل 15,000-25,000 دولار في الإمارات. تكلفة العلاج الإشعاعي 4,000-7,000 دولار في الهند مقابل 20,000-30,000 دولار في الإمارات. جراحة السرطان تتراوح من 5,000-10,000 دولار في الهند مقابل 25,000-40,000 دولار في الإمارات. زرع نخاع العظم يكلف 25,000-35,000 دولار في الهند مقابل 150,000-200,000 دولار في الإمارات. هذه التوفيرات تجعل رعاية السرطان المتقدمة متاحة مع الحفاظ على جودة عالمية.',
        },
        {
          question: 'ما هي نسبة نجاح علاج السرطان في الهند؟',
          answer:
            'تقرير أفضل مستشفيات الأورام في بنغالور نسب نجاح 75٪+ للسرطانات في المراحل المبكرة بما في ذلك سرطان الثدي والبروستاتا والقولون والمستقيم. نتائج السرطان في المراحل المتقدمة مماثلة للدول الغربية. نسب النجاح تختلف حسب نوع السرطان، المرحلة، والعوامل الفردية. مراكز السرطان في الهند تستخدم نفس البروتوكولات والتقنيات مثل المستشفيات الدولية الرائدة.',
        },
        {
          question: 'هل علاج السرطان في الهند آمن للمرضى الأجانب؟',
          answer:
            'نعم، علاج السرطان في الهند آمن جداً للمرضى الدوليين. بنغالور لديها مستشفيات سرطان متعددة معتمدة من JCI تتبع معايير الجودة الدولية الصارمة. أطباء الأورام مدربون في أفضل المؤسسات في الولايات المتحدة والمملكة المتحدة وأوروبا. المستشفيات تستخدم أدوية معتمدة من FDA وأحدث تقنيات العلاج.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في الهند لعلاج السرطان؟',
          answer:
            'المدة تعتمد على نوع العلاج. دورات العلاج الكيميائي عادة تتطلب 1-2 أسبوع لكل جلسة مع 3-6 دورات على مدى عدة أشهر. العلاج الإشعاعي يحتاج 4-6 أسابيع من الجلسات اليومية. جراحات السرطان الكبرى تتطلب 2-4 أسابيع بما في ذلك التقييم قبل العملية والتعافي. زرع نخاع العظم يحتاج على الأقل 4-6 أسابيع للإجراء والتعافي الأولي.',
        },
        {
          question: 'هل مستشفيات الأورام في بنغالور تتحدث العربية؟',
          answer:
            'نعم، مستشفيات السرطان الرئيسية في بنغالور لديها منسقون ومترجمون وموظفو رعاية مرضى يتحدثون العربية لمساعدة مرضى الخليج. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية يرافقونك طوال رحلة علاج السرطان بأكملها - من الاستشارة الأولية إلى رعاية المتابعة.',
        },
        {
          question: 'ما هي أنواع السرطان التي يتم علاجها في المستشفيات الهندية؟',
          answer:
            'مستشفيات الأورام في الهند تعالج جميع أنواع السرطان: سرطان الثدي، سرطان الرئة، سرطان القولون والمستقيم، سرطان البروستاتا، سرطانات الدم (اللوكيميا، الليمفوما، المايلوما)، أورام الدماغ، سرطان الكبد، سرطان المعدة، سرطان البنكرياس، سرطان المبيض، سرطان عنق الرحم، سرطان الكلى، والسرطانات النادرة.',
        },
        {
          question: 'هل تقدم الهند علاجات سرطان متقدمة مثل العلاج المناعي؟',
          answer:
            'نعم، أفضل مستشفيات السرطان في الهند تقدم جميع العلاجات المتقدمة بما في ذلك العلاج المناعي (مثبطات نقاط التفتيش)، العلاج الموجه، علاج CAR-T، العلاج بالبروتون، الجراحة الإشعاعية CyberKnife، الجراحة الروبوتية (da Vinci)، HIPEC لسرطانات الصفاق، وعلم الأورام الدقيق مع التوصيف الجيني.',
        },
        {
          question: 'هل يمكنني الحصول على رأي ثانٍ من أطباء أورام هنود قبل السفر؟',
          answer:
            'نعم، بالتأكيد. معظم مستشفيات الأورام الرائدة في بنغالور تقدم خدمات الرأي الثاني عبر الإنترنت. يمكنك مشاركة سجلاتك الطبية، تقارير علم الأمراض، فحوصات التصوير (CT، MRI، PET-CT)، وتاريخ العلاج. أطباء الأورام الخبراء سيراجعون حالتك ويقدمون آراء مفصلة عبر استشارة الفيديو.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات السرطان في بنغالور',
      subtitle: 'مراكز أورام معتمدة من JCI مع سجلات حافلة مثبتة',
      cta: 'عرض جميع مستشفيات السرطان',
    },
    finalCta: {
      title: 'هل أنت مستعد لبدء رحلة علاج السرطان الخاصة بك؟',
      subtitle:
        'احصل على استشارة مجانية مع أطباء الأورام ذوي الخبرة لدينا واحصل على خطة علاج سرطان شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة أورام مجانية',
      ctaSecondary: 'تحميل دليل علاج السرطان',
    },
  },
};

export default function OncologyPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Cancer Treatment</span>
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
