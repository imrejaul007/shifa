'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Award,
  Brain,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Globe,
  TrendingUp,
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
      badge: 'Advanced Neurosurgery',
      title: 'Neurosurgery in India',
      subtitle: 'World-Class Brain & Spine Surgery at 70% Lower Cost',
      description:
        'Access advanced neurosurgical care in India with internationally trained specialists. JCI-accredited hospitals, cutting-edge technology including neuro-navigation and minimally invasive techniques - all at a fraction of Western costs.',
      ctaPrimary: 'Get Free Cost Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '70%', desc: 'vs UAE & Saudi' },
      successRate: { label: 'Success Rate', value: '95%+', desc: 'Most procedures' },
      experience: { label: 'Experience', value: '20+ Years', desc: 'Top neurosurgeons' },
      patients: { label: 'International', value: '3000+', desc: 'Patients treated' },
    },
    costComparison: {
      title: 'Neurosurgery Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with neurosurgery in India compared to your home country',
      india: 'India',
      uae: 'UAE',
      saudi: 'Saudi Arabia',
      tableHeaders: {
        procedure: 'Procedure',
        india: 'India Cost',
        uae: 'UAE Cost',
        saudi: 'Saudi Cost',
        savings: 'Your Savings',
      },
      procedures: [
        {
          name: 'Brain Tumor Surgery',
          india: '$7,000 - $12,000',
          uae: '$30,000 - $50,000',
          saudi: '$25,000 - $45,000',
          savings: 'Save $20,000+',
        },
        {
          name: 'Spine Surgery',
          india: '$5,000 - $8,000',
          uae: '$20,000 - $35,000',
          saudi: '$18,000 - $32,000',
          savings: 'Save $15,000+',
        },
        {
          name: 'Aneurysm Treatment',
          india: '$8,000 - $15,000',
          uae: '$35,000 - $60,000',
          saudi: '$30,000 - $55,000',
          savings: 'Save $25,000+',
        },
        {
          name: 'Epilepsy Surgery',
          india: '$6,000 - $10,000',
          uae: '$25,000 - $40,000',
          saudi: '$22,000 - $38,000',
          savings: 'Save $17,000+',
        },
      ],
      note: '* All costs in USD. Includes surgery, hospital stay, post-operative care. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose India for Neurosurgery?',
      reasons: [
        {
          icon: Award,
          title: 'World-Class Success Rates',
          description:
            '95%+ success rates for most neurosurgical procedures, comparable to top Western centers. Advanced technology including neuro-navigation, intraoperative MRI, and minimally invasive techniques.',
        },
        {
          icon: Shield,
          title: 'JCI-Accredited Hospitals',
          description:
            'Treatment at internationally accredited neurosurgery centers following global quality standards. State-of-the-art neurosurgical ICUs and dedicated neuro-rehabilitation facilities.',
        },
        {
          icon: Users,
          title: 'Experienced Neurosurgeons',
          description:
            'Board-certified neurosurgeons with international training and 20+ years of experience. Specialized in complex brain and spine surgeries with thousands of successful procedures.',
        },
        {
          icon: Globe,
          title: 'Arabic-Speaking Support',
          description:
            'Dedicated Arabic-speaking medical coordinators throughout your journey. Cultural sensitivity and halal-certified hospital facilities available for GCC patients.',
        },
        {
          icon: DollarSign,
          title: 'Transparent Pricing',
          description:
            'All-inclusive packages with no hidden costs. Save 70% compared to UAE and Saudi Arabia without compromising on quality of care or surgical outcomes.',
        },
        {
          icon: Brain,
          title: 'Comprehensive Care',
          description:
            'Complete neurosurgical solutions including brain tumors, spine disorders, aneurysms, epilepsy surgery, and neurotrauma. Multidisciplinary team approach with neurologists, radiologists, and rehabilitation specialists.',
        },
      ],
    },
    process: {
      title: 'Your Neurosurgery Journey in India',
      subtitle: 'Step-by-step guide to your treatment',
      steps: [
        {
          number: '01',
          title: 'Medical Evaluation & Planning',
          description:
            'Virtual consultation with neurosurgeon. Review of medical records, scans (MRI/CT), and diagnostic tests. Detailed treatment plan with cost estimate and surgical approach.',
          duration: 'Pre-arrival',
        },
        {
          number: '02',
          title: 'Arrival & Pre-operative Assessment',
          description:
            'Airport pickup and hospital admission. Complete pre-operative evaluations including advanced imaging (fMRI, DTI tractography if needed). Anesthesia consultation and final surgical planning.',
          duration: 'Day 1-2',
        },
        {
          number: '03',
          title: 'Surgery',
          description:
            'Advanced neurosurgery performed using latest techniques - neuro-navigation, microscopic surgery, or minimally invasive approaches. Intraoperative monitoring and real-time imaging for precision.',
          duration: 'Day 3',
        },
        {
          number: '04',
          title: 'Post-operative Care',
          description:
            'ICU monitoring for 24-48 hours. Neurological assessments, pain management, and early mobilization. Neurosurgical team monitors recovery progress daily.',
          duration: 'Day 4-7',
        },
        {
          number: '05',
          title: 'Recovery & Rehabilitation',
          description:
            'Transfer to regular room. Physiotherapy and rehabilitation as needed. Follow-up scans to confirm surgical success. Wound care and medication management.',
          duration: 'Day 8-14',
        },
        {
          number: '06',
          title: 'Discharge & Follow-up',
          description:
            'Discharge with detailed care instructions and medications. Virtual follow-up appointments. Access to neurosurgeon for any concerns. Long-term monitoring plan established.',
          duration: 'Week 2+',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Neurosurgery in India',
      items: [
        {
          question: 'How much does brain surgery cost in India for GCC patients?',
          answer:
            'Brain tumor surgery in India costs between $7,000-$12,000 USD for GCC patients, which is 70% less expensive than in UAE ($30,000-$50,000) or Saudi Arabia ($25,000-$45,000). The cost includes pre-operative assessments, surgery with neuro-navigation technology, ICU care, hospital stay (7-10 days), and post-operative care. Complex procedures like aneurysm treatment range from $8,000-$15,000.',
        },
        {
          question: 'What is the success rate of neurosurgery in India?',
          answer:
            'Top neurosurgery centers in India report success rates of 95%+ for most brain and spine procedures. For brain tumor surgeries, gross total resection rates are 85-95% depending on tumor type and location. Spine surgery success rates are 90-95% for decompression and fusion procedures. These outcomes are comparable to or better than leading centers in UAE, Saudi Arabia, and Western countries.',
        },
        {
          question: 'How long do I need to stay in India for neurosurgery?',
          answer:
            'Hospital stay is typically 7-10 days for brain surgery and 5-7 days for spine surgery. Total stay in India is usually 14-21 days to allow for pre-operative assessments, surgery, recovery, and post-operative follow-up before travel. Minimally invasive procedures may require shorter stays. Our medical coordinators help plan your entire journey.',
        },
        {
          question: 'Is neurosurgery in India safe for foreign patients?',
          answer:
            'Yes, neurosurgery in India is very safe for international patients. India has JCI-accredited hospitals with world-class neurosurgical facilities including neuro ICUs, intraoperative MRI, and neuro-navigation systems. Neurosurgeons are internationally trained with 20+ years of experience. Hospitals follow strict infection control protocols and international safety standards.',
        },
        {
          question: 'Do neurosurgery hospitals in India speak Arabic?',
          answer:
            'Yes, major neurosurgery hospitals in India have Arabic-speaking coordinators and translators to assist GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who will assist you throughout your entire treatment journey, from initial consultation to post-surgery follow-up. All medical reports and discharge summaries are provided in English and Arabic.',
        },
        {
          question: 'What neurosurgical procedures are available in India?',
          answer:
            'Indian neurosurgery centers offer comprehensive services including: brain tumor surgery (gliomas, meningiomas, pituitary tumors), spine surgery (disc herniation, spinal stenosis, scoliosis correction), aneurysm clipping/coiling, AVM treatment, epilepsy surgery, deep brain stimulation for Parkinsons, craniosynostosis correction, and trauma neurosurgery. Both open and minimally invasive techniques are available.',
        },
        {
          question: 'What technology is used for neurosurgery in India?',
          answer:
            'Top neurosurgery centers in India use cutting-edge technology including: neuro-navigation systems for precise tumor localization, intraoperative MRI for real-time imaging, surgical microscopes with fluorescence guidance, endoscopic techniques for minimally invasive surgery, intraoperative neuromonitoring to protect brain function, and advanced imaging like fMRI and DTI tractography for surgical planning.',
        },
        {
          question: 'Can I get a second opinion before neurosurgery?',
          answer:
            'Absolutely. We encourage second opinions for all neurosurgical cases. You can share your medical records, MRI/CT scans (DICOM files), and reports for a virtual consultation with our neurosurgeons. They will review your case, explain treatment options, discuss risks and benefits, and provide a detailed surgical plan with cost estimate - all before you travel to India.',
        },
      ],
    },
    hospitals: {
      title: 'Top Neurosurgery Hospitals in India',
      subtitle: 'JCI-accredited neurosurgery centers with proven track records',
      cta: 'View All Hospitals',
    },
    finalCta: {
      title: 'Ready to Start Your Neurosurgery Journey?',
      subtitle:
        'Get a free consultation with our neurosurgeons and receive a personalized treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Neurosurgery Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'جراحة الأعصاب المتقدمة',
      title: 'جراحة الأعصاب في الهند',
      subtitle: 'جراحة دماغ وعمود فقري عالمية المستوى بتكلفة أقل 70٪',
      description:
        'احصل على رعاية جراحة أعصاب متقدمة في الهند مع أخصائيين مدربين دولياً. مستشفيات معتمدة من JCI، تقنية متطورة تشمل الملاحة العصبية وتقنيات طفيفة التوغل - كل ذلك بجزء بسيط من التكاليف الغربية.',
      ctaPrimary: 'احصل على تقدير مجاني للتكلفة',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '70%', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نسبة النجاح', value: '95%+', desc: 'معظم الإجراءات' },
      experience: { label: 'الخبرة', value: '20+ سنة', desc: 'أفضل جراحي الأعصاب' },
      patients: { label: 'مرضى دوليون', value: '3000+', desc: 'تم علاجهم' },
    },
    costComparison: {
      title: 'مقارنة تكلفة جراحة الأعصاب: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع جراحة الأعصاب في الهند مقارنة ببلدك',
      india: 'الهند',
      uae: 'الإمارات',
      saudi: 'السعودية',
      tableHeaders: {
        procedure: 'الإجراء',
        india: 'تكلفة الهند',
        uae: 'تكلفة الإمارات',
        saudi: 'تكلفة السعودية',
        savings: 'توفيرك',
      },
      procedures: [
        {
          name: 'جراحة ورم الدماغ',
          india: '$7,000 - $12,000',
          uae: '$30,000 - $50,000',
          saudi: '$25,000 - $45,000',
          savings: 'وفر $20,000+',
        },
        {
          name: 'جراحة العمود الفقري',
          india: '$5,000 - $8,000',
          uae: '$20,000 - $35,000',
          saudi: '$18,000 - $32,000',
          savings: 'وفر $15,000+',
        },
        {
          name: 'علاج تمدد الأوعية الدموية',
          india: '$8,000 - $15,000',
          uae: '$35,000 - $60,000',
          saudi: '$30,000 - $55,000',
          savings: 'وفر $25,000+',
        },
        {
          name: 'جراحة الصرع',
          india: '$6,000 - $10,000',
          uae: '$25,000 - $40,000',
          saudi: '$22,000 - $38,000',
          savings: 'وفر $17,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الجراحة، الإقامة في المستشفى، الرعاية بعد العملية. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار الهند لجراحة الأعصاب؟',
      reasons: [
        {
          icon: Award,
          title: 'نسب نجاح عالمية المستوى',
          description:
            'نسب نجاح 95٪+ لمعظم إجراءات جراحة الأعصاب، مماثلة لأفضل المراكز الغربية. تقنية متقدمة تشمل الملاحة العصبية، التصوير بالرنين المغناطيسي أثناء العملية، وتقنيات طفيفة التوغل.',
        },
        {
          icon: Shield,
          title: 'مستشفيات معتمدة من JCI',
          description:
            'العلاج في مراكز جراحة أعصاب معتمدة دولياً تتبع معايير الجودة العالمية. وحدات عناية مركزة عصبية حديثة ومرافق إعادة تأهيل عصبي متخصصة.',
        },
        {
          icon: Users,
          title: 'جراحو أعصاب ذوو خبرة',
          description:
            'جراحو أعصاب معتمدون مع تدريب دولي وأكثر من 20 عاماً من الخبرة. متخصصون في جراحات الدماغ والعمود الفقري المعقدة مع آلاف العمليات الناجحة.',
        },
        {
          icon: Globe,
          title: 'دعم باللغة العربية',
          description:
            'منسقون طبيون متخصصون يتحدثون العربية طوال رحلتك. حساسية ثقافية ومرافق مستشفى معتمدة حلال متاحة لمرضى الخليج.',
        },
        {
          icon: DollarSign,
          title: 'أسعار شفافة',
          description:
            'باقات شاملة بدون تكاليف خفية. وفر 70٪ مقارنة بالإمارات والسعودية دون المساومة على جودة الرعاية أو نتائج الجراحة.',
        },
        {
          icon: Brain,
          title: 'رعاية شاملة',
          description:
            'حلول جراحة أعصاب كاملة تشمل أورام الدماغ، اضطرابات العمود الفقري، تمدد الأوعية الدموية، جراحة الصرع، وإصابات الأعصاب. نهج فريق متعدد التخصصات مع أطباء أعصاب وأخصائيي أشعة وإعادة تأهيل.',
        },
      ],
    },
    process: {
      title: 'رحلة جراحة الأعصاب في الهند',
      subtitle: 'دليل خطوة بخطوة لعلاجك',
      steps: [
        {
          number: '01',
          title: 'التقييم الطبي والتخطيط',
          description:
            'استشارة افتراضية مع جراح الأعصاب. مراجعة السجلات الطبية، الفحوصات (الرنين المغناطيسي / الأشعة المقطعية)، والفحوصات التشخيصية. خطة علاج مفصلة مع تقدير التكلفة ونهج الجراحة.',
          duration: 'قبل الوصول',
        },
        {
          number: '02',
          title: 'الوصول والتقييم قبل العملية',
          description:
            'الاستقبال في المطار والقبول في المستشفى. تقييمات كاملة قبل العملية تشمل التصوير المتقدم (fMRI، DTI إذا لزم الأمر). استشارة التخدير والتخطيط النهائي للجراحة.',
          duration: 'اليوم 1-2',
        },
        {
          number: '03',
          title: 'الجراحة',
          description:
            'جراحة أعصاب متقدمة باستخدام أحدث التقنيات - الملاحة العصبية، الجراحة المجهرية، أو النهج طفيف التوغل. مراقبة أثناء العملية وتصوير في الوقت الفعلي للدقة.',
          duration: 'اليوم 3',
        },
        {
          number: '04',
          title: 'الرعاية بعد العملية',
          description:
            'مراقبة العناية المركزة لمدة 24-48 ساعة. تقييمات عصبية، إدارة الألم، والتعبئة المبكرة. فريق جراحة الأعصاب يراقب تقدم التعافي يومياً.',
          duration: 'اليوم 4-7',
        },
        {
          number: '05',
          title: 'التعافي وإعادة التأهيل',
          description:
            'النقل إلى الغرفة العادية. العلاج الطبيعي وإعادة التأهيل حسب الحاجة. فحوصات متابعة لتأكيد نجاح الجراحة. رعاية الجروح وإدارة الأدوية.',
          duration: 'اليوم 8-14',
        },
        {
          number: '06',
          title: 'الخروج والمتابعة',
          description:
            'الخروج مع تعليمات رعاية مفصلة وأدوية. مواعيد متابعة افتراضية. الوصول إلى جراح الأعصاب لأي مخاوف. خطة مراقبة طويلة الأمد محددة.',
          duration: 'الأسبوع 2+',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول جراحة الأعصاب في الهند',
      items: [
        {
          question: 'كم تكلفة جراحة الدماغ في الهند لمرضى الخليج؟',
          answer:
            'تتراوح تكلفة جراحة ورم الدماغ في الهند بين 7,000-12,000 دولار أمريكي لمرضى الخليج، وهذا أقل بنسبة 70٪ من تكلفة الإمارات (30,000-50,000 دولار) أو السعودية (25,000-45,000 دولار). التكلفة تشمل التقييمات قبل العملية، الجراحة بتقنية الملاحة العصبية، رعاية العناية المركزة، الإقامة في المستشفى (7-10 أيام)، والرعاية بعد العملية.',
        },
        {
          question: 'ما هي نسبة نجاح جراحة الأعصاب في الهند؟',
          answer:
            'تقرير أفضل مراكز جراحة الأعصاب في الهند نسب نجاح 95٪+ لمعظم إجراءات الدماغ والعمود الفقري. لجراحات أورام الدماغ، معدلات الاستئصال الكامل هي 85-95٪ حسب نوع الورم وموقعه. نسب نجاح جراحة العمود الفقري هي 90-95٪ لإجراءات تخفيف الضغط والدمج.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في الهند لجراحة الأعصاب؟',
          answer:
            'الإقامة في المستشفى عادة 7-10 أيام لجراحة الدماغ و5-7 أيام لجراحة العمود الفقري. إجمالي الإقامة في الهند عادة 14-21 يوماً للسماح بالتقييمات قبل العملية، الجراحة، التعافي، والمتابعة بعد العملية قبل السفر.',
        },
        {
          question: 'هل جراحة الأعصاب في الهند آمنة للمرضى الأجانب؟',
          answer:
            'نعم، جراحة الأعصاب في الهند آمنة جداً للمرضى الدوليين. الهند لديها مستشفيات معتمدة من JCI مع مرافق جراحة أعصاب عالمية المستوى تشمل وحدات العناية المركزة العصبية، التصوير بالرنين المغناطيسي أثناء العملية، وأنظمة الملاحة العصبية.',
        },
        {
          question: 'هل مستشفيات جراحة الأعصاب في الهند تتحدث العربية؟',
          answer:
            'نعم، مستشفيات جراحة الأعصاب الرئيسية في الهند لديها منسقون ومترجمون يتحدثون العربية لمساعدة مرضى الخليج. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية سيساعدونك طوال رحلة العلاج بأكملها.',
        },
        {
          question: 'ما هي إجراءات جراحة الأعصاب المتاحة في الهند؟',
          answer:
            'مراكز جراحة الأعصاب الهندية تقدم خدمات شاملة تشمل: جراحة أورام الدماغ، جراحة العمود الفقري، علاج تمدد الأوعية الدموية، علاج التشوهات الشريانية الوريدية، جراحة الصرع، التحفيز العميق للدماغ لمرض باركنسون، تصحيح التحام الجمجمة المبكر، وجراحة إصابات الأعصاب.',
        },
        {
          question: 'ما هي التقنية المستخدمة لجراحة الأعصاب في الهند؟',
          answer:
            'أفضل مراكز جراحة الأعصاب في الهند تستخدم تقنية متطورة تشمل: أنظمة الملاحة العصبية لتحديد موقع الورم بدقة، التصوير بالرنين المغناطيسي أثناء العملية للتصوير في الوقت الفعلي، مجاهر جراحية مع إرشاد الفلورسنت، تقنيات المنظار للجراحة طفيفة التوغل، والمراقبة العصبية أثناء العملية.',
        },
        {
          question: 'هل يمكنني الحصول على رأي ثانٍ قبل جراحة الأعصاب؟',
          answer:
            'بالتأكيد. نحن نشجع الآراء الثانية لجميع حالات جراحة الأعصاب. يمكنك مشاركة سجلاتك الطبية، فحوصات الرنين المغناطيسي / الأشعة المقطعية، والتقارير لاستشارة افتراضية مع جراحي الأعصاب لدينا قبل السفر إلى الهند.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات جراحة الأعصاب في الهند',
      subtitle: 'مراكز جراحة أعصاب معتمدة من JCI مع سجلات حافلة مثبتة',
      cta: 'عرض جميع المستشفيات',
    },
    finalCta: {
      title: 'هل أنت مستعد لبدء رحلة جراحة الأعصاب الخاصة بك؟',
      subtitle:
        'احصل على استشارة مجانية مع جراحي الأعصاب لدينا واحصل على خطة علاج شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل جراحة الأعصاب',
    },
  },
};

export default function NeurosurgeryPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Neurosurgery</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Brain className="w-4 h-4 text-accent" />
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
