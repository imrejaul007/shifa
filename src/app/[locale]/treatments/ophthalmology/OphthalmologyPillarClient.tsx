'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Award,
  Eye,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Globe,
  TrendingUp,
  FileText,
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
      badge: 'Eye Care & Ophthalmology',
      title: 'Eye Treatment in India',
      subtitle: 'World-Class Eye Care at 75% Lower Cost',
      description:
        'Experience advanced eye care with LASIK, cataract surgery, retina treatment, and corneal transplant in India. JCI-accredited hospitals, internationally trained ophthalmologists, and 99% success rates - all at a fraction of the cost.',
      ctaPrimary: 'Get Free Eye Care Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '75%', desc: 'vs UAE & Saudi' },
      successRate: { label: 'LASIK Success Rate', value: '99%', desc: 'With latest technology' },
      experience: { label: 'Experience', value: '25+ Years', desc: 'Expert ophthalmologists' },
      patients: { label: 'International Patients', value: '10,000+', desc: 'Treated annually' },
    },
    costComparison: {
      title: 'Eye Surgery Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with eye treatment in India compared to your home country',
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
          name: 'LASIK Surgery',
          india: '$800 - $1,200',
          uae: '$3,500 - $5,000',
          saudi: '$3,000 - $4,500',
          savings: 'Save $2,800+',
        },
        {
          name: 'Cataract Surgery',
          india: '$1,500 - $2,500',
          uae: '$6,000 - $9,000',
          saudi: '$5,000 - $8,000',
          savings: 'Save $4,500+',
        },
        {
          name: 'Retina Surgery',
          india: '$2,000 - $3,500',
          uae: '$8,000 - $12,000',
          saudi: '$7,000 - $11,000',
          savings: 'Save $6,000+',
        },
        {
          name: 'Corneal Transplant',
          india: '$3,000 - $5,000',
          uae: '$12,000 - $18,000',
          saudi: '$10,000 - $16,000',
          savings: 'Save $9,000+',
        },
      ],
      note: '* All costs in USD. Includes consultations, procedures, medications, and follow-up care. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose India for Eye Care Treatment?',
      reasons: [
        {
          icon: Award,
          title: 'Exceptional Success Rates',
          description:
            '99% success rate for LASIK surgery with latest technologies like Contoura Vision and SMILE. Advanced equipment including Femtosecond lasers and OCT imaging.',
        },
        {
          icon: Shield,
          title: 'JCI-Accredited Eye Hospitals',
          description:
            'Treatment at internationally accredited eye care centers following global quality standards. State-of-the-art operation theaters with infection control protocols.',
        },
        {
          icon: Users,
          title: 'Expert Ophthalmologists',
          description:
            'Board-certified ophthalmologists with 25+ years of experience and international training. Specialists in LASIK, cataract, retina, cornea, and glaucoma.',
        },
        {
          icon: Globe,
          title: 'Arabic-Speaking Support',
          description:
            'Dedicated Arabic-speaking coordinators throughout your journey. Cultural sensitivity and comfortable facilities for GCC patients.',
        },
        {
          icon: DollarSign,
          title: 'Transparent Pricing',
          description:
            'All-inclusive packages with no hidden costs. Save 75% compared to UAE and Saudi Arabia without compromising on quality or technology.',
        },
        {
          icon: Eye,
          title: 'Comprehensive Services',
          description:
            'Complete eye care solutions including LASIK, cataract, retina surgery, corneal transplant, glaucoma treatment, and pediatric ophthalmology.',
        },
      ],
    },
    process: {
      title: 'Your Eye Treatment Journey in India',
      subtitle: 'Step-by-step guide to your eye care procedure',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation & Eye Examination',
          description:
            'Comprehensive eye examination with advanced diagnostics. Review of medical history, vision tests, and personalized treatment plan with ophthalmologist.',
          duration: 'Day 1',
        },
        {
          number: '02',
          title: 'Pre-Operative Assessment',
          description:
            'Detailed eye scans including corneal topography, pachymetry, and optical coherence tomography (OCT). Final consultation and procedure planning.',
          duration: 'Day 1-2',
        },
        {
          number: '03',
          title: 'Surgical Procedure',
          description:
            'LASIK surgery takes 10-15 minutes per eye under local anesthesia. Cataract surgery takes 20-30 minutes. Same-day discharge for most procedures.',
          duration: 'Day 2-3',
        },
        {
          number: '04',
          title: 'Immediate Post-Op Care',
          description:
            'Rest and recovery at your accommodation. Eye drops and medications provided. Initial check-up within 24 hours of surgery.',
          duration: 'Day 3-4',
        },
        {
          number: '05',
          title: 'Follow-Up Examinations',
          description:
            'Vision assessment and eye health monitoring. Ophthalmologist ensures proper healing and optimal results. Additional follow-ups as needed.',
          duration: 'Day 4-5',
        },
        {
          number: '06',
          title: 'Discharge & Long-Term Care',
          description:
            'Final examination and discharge with detailed care instructions. Remote follow-up support available. Local ophthalmologist referral in your home country.',
          duration: 'Day 5-7',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Eye Care in India',
      items: [
        {
          question: 'How much does LASIK surgery cost in India for UAE patients?',
          answer:
            'LASIK surgery in India costs between $800-$1,200 USD for UAE patients. This is 75% less expensive than LASIK in UAE ($3,500-$5,000). The cost includes pre-operative consultations, advanced laser procedure (bladeless LASIK or Contoura Vision), medications, and post-operative care with multiple follow-ups.',
        },
        {
          question: 'What is the success rate of LASIK surgery in India?',
          answer:
            'Top eye hospitals in India report LASIK success rates of 99% with advanced technologies. Most patients achieve 20/20 vision or better. Success rates are comparable to or better than rates in UAE, Saudi Arabia, and Western countries. India uses the same FDA-approved equipment as hospitals worldwide.',
        },
        {
          question: 'How long do I need to stay in India for LASIK surgery?',
          answer:
            'Most patients stay 3-5 days for LASIK surgery. Day 1 includes consultation and pre-operative tests, Day 2-3 is the procedure, and Days 4-5 are for follow-up examinations. For cataract surgery, plan for 5-7 days to ensure proper healing and optimal results.',
        },
        {
          question: 'Is eye surgery in India safe for foreign patients?',
          answer:
            'Yes, eye surgery in India is very safe for international patients. India has JCI-accredited eye hospitals with internationally trained ophthalmologists who follow strict safety protocols. The hospitals use the latest technology including Femtosecond lasers and have success rates comparable to top Western clinics.',
        },
        {
          question: 'Do eye hospitals in India speak Arabic?',
          answer:
            'Yes, major eye hospitals in India have Arabic-speaking coordinators and translators. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who will assist you throughout your entire treatment journey, from initial consultation to post-treatment follow-up and travel arrangements.',
        },
        {
          question: 'What is included in the LASIK surgery package cost?',
          answer:
            'Standard LASIK packages include: comprehensive eye examinations, advanced corneal topography, pachymetry tests, bladeless LASIK procedure for both eyes, post-operative medications and eye drops, protective eye shields, and multiple follow-up consultations. Premium options like Contoura Vision or SMILE may cost slightly more.',
        },
        {
          question: 'Can I treat both eyes on the same day?',
          answer:
            'Yes, most LASIK and cataract surgeries can treat both eyes on the same day, though some doctors prefer to wait 1-2 days between eyes for cataract surgery. Your ophthalmologist will recommend the best approach based on your specific condition and overall eye health.',
        },
        {
          question: 'What technologies are available for LASIK in India?',
          answer:
            'Top eye hospitals in India offer the latest LASIK technologies including Bladeless LASIK (all-laser), Contoura Vision (topography-guided for precise correction), SMILE (small incision procedure), Femto LASIK with wavefront technology, and PRK for thin corneas. All use FDA-approved equipment from leading manufacturers.',
        },
      ],
    },
    hospitals: {
      title: 'Top Eye Hospitals in India',
      subtitle: 'JCI-accredited ophthalmology centers with proven track records',
      cta: 'View All Hospitals',
    },
    finalCta: {
      title: 'Ready to Start Your Eye Care Journey?',
      subtitle:
        'Get a free consultation with our ophthalmology specialists and receive a personalized treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Eye Care Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'رعاية العيون وطب العيون',
      title: 'علاج العيون في الهند',
      subtitle: 'رعاية عيون عالمية المستوى بتكلفة أقل 75٪',
      description:
        'اختبر رعاية عيون متقدمة مع الليزك، جراحة إعتام عدسة العين، علاج الشبكية، وزراعة القرنية في الهند. مستشفيات معتمدة من JCI، أطباء عيون مدربون دولياً، ونسب نجاح 99٪ - كل ذلك بجزء بسيط من التكلفة.',
      ctaPrimary: 'احصل على تقدير مجاني لرعاية العيون',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '75%', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نسبة نجاح الليزك', value: '99%', desc: 'بأحدث التقنيات' },
      experience: { label: 'الخبرة', value: '25+ سنة', desc: 'أطباء عيون خبراء' },
      patients: { label: 'المرضى الدوليون', value: '10,000+', desc: 'يعالجون سنوياً' },
    },
    costComparison: {
      title: 'مقارنة تكلفة جراحة العيون: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع علاج العيون في الهند مقارنة ببلدك',
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
          name: 'جراحة الليزك',
          india: '$800 - $1,200',
          uae: '$3,500 - $5,000',
          saudi: '$3,000 - $4,500',
          savings: 'وفر $2,800+',
        },
        {
          name: 'جراحة إعتام عدسة العين',
          india: '$1,500 - $2,500',
          uae: '$6,000 - $9,000',
          saudi: '$5,000 - $8,000',
          savings: 'وفر $4,500+',
        },
        {
          name: 'جراحة الشبكية',
          india: '$2,000 - $3,500',
          uae: '$8,000 - $12,000',
          saudi: '$7,000 - $11,000',
          savings: 'وفر $6,000+',
        },
        {
          name: 'زراعة القرنية',
          india: '$3,000 - $5,000',
          uae: '$12,000 - $18,000',
          saudi: '$10,000 - $16,000',
          savings: 'وفر $9,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الاستشارات والإجراءات والأدوية والرعاية اللاحقة. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار الهند لعلاج العيون؟',
      reasons: [
        {
          icon: Award,
          title: 'معدلات نجاح استثنائية',
          description:
            'معدل نجاح 99٪ لجراحة الليزك بأحدث التقنيات مثل Contoura Vision وSMILE. معدات متقدمة بما في ذلك ليزر Femtosecond وتصوير OCT.',
        },
        {
          icon: Shield,
          title: 'مستشفيات عيون معتمدة من JCI',
          description:
            'العلاج في مراكز رعاية عيون معتمدة دولياً تتبع معايير الجودة العالمية. غرف عمليات حديثة مع بروتوكولات مكافحة العدوى.',
        },
        {
          icon: Users,
          title: 'أطباء عيون خبراء',
          description:
            'أطباء عيون معتمدون مع أكثر من 25 عاماً من الخبرة وتدريب دولي. متخصصون في الليزك، إعتام عدسة العين، الشبكية، القرنية، والزرق.',
        },
        {
          icon: Globe,
          title: 'دعم باللغة العربية',
          description:
            'منسقون متخصصون يتحدثون العربية طوال رحلتك. حساسية ثقافية ومرافق مريحة لمرضى الخليج.',
        },
        {
          icon: DollarSign,
          title: 'أسعار شفافة',
          description:
            'باقات شاملة بدون تكاليف خفية. وفر 75٪ مقارنة بالإمارات والسعودية دون المساومة على الجودة أو التكنولوجيا.',
        },
        {
          icon: Eye,
          title: 'خدمات شاملة',
          description:
            'حلول رعاية عيون كاملة تشمل الليزك، إعتام عدسة العين، جراحة الشبكية، زراعة القرنية، علاج الزرق، وطب عيون الأطفال.',
        },
      ],
    },
    process: {
      title: 'رحلة علاج العيون في الهند',
      subtitle: 'دليل خطوة بخطوة لإجراء رعاية العيون الخاص بك',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الأولية وفحص العين',
          description:
            'فحص عين شامل مع تشخيصات متقدمة. مراجعة التاريخ الطبي، اختبارات الرؤية، وخطة علاج شخصية مع طبيب العيون.',
          duration: 'اليوم 1',
        },
        {
          number: '02',
          title: 'التقييم قبل العملية',
          description:
            'فحوصات عين تفصيلية تشمل تضاريس القرنية، قياس سمك القرنية، والتصوير المقطعي للتماسك البصري (OCT). استشارة نهائية وتخطيط الإجراء.',
          duration: 'اليوم 1-2',
        },
        {
          number: '03',
          title: 'الإجراء الجراحي',
          description:
            'جراحة الليزك تستغرق 10-15 دقيقة لكل عين تحت التخدير الموضعي. جراحة إعتام عدسة العين تستغرق 20-30 دقيقة. خروج في نفس اليوم لمعظم الإجراءات.',
          duration: 'اليوم 2-3',
        },
        {
          number: '04',
          title: 'الرعاية الفورية بعد العملية',
          description:
            'راحة وتعافي في مكان إقامتك. توفير قطرات العين والأدوية. فحص أولي خلال 24 ساعة من الجراحة.',
          duration: 'اليوم 3-4',
        },
        {
          number: '05',
          title: 'فحوصات المتابعة',
          description:
            'تقييم الرؤية ومراقبة صحة العين. طبيب العيون يضمن الشفاء السليم والنتائج المثلى. متابعات إضافية حسب الحاجة.',
          duration: 'اليوم 4-5',
        },
        {
          number: '06',
          title: 'الخروج والرعاية طويلة الأمد',
          description:
            'فحص نهائي وخروج مع تعليمات رعاية تفصيلية. دعم متابعة عن بعد متاح. إحالة طبيب عيون محلي في بلدك.',
          duration: 'اليوم 5-7',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول رعاية العيون في الهند',
      items: [
        {
          question: 'كم تكلفة جراحة الليزك في الهند لمرضى الإمارات؟',
          answer:
            'تتراوح تكلفة جراحة الليزك في الهند بين 800-1,200 دولار أمريكي لمرضى الإمارات. هذا أقل بنسبة 75٪ من تكلفة الليزك في الإمارات (3,500-5,000 دولار). التكلفة تشمل الاستشارات قبل العملية، إجراء الليزر المتقدم (الليزك بدون شفرة أو Contoura Vision)، الأدوية، والرعاية بعد العملية مع متابعات متعددة.',
        },
        {
          question: 'ما هي نسبة نجاح جراحة الليزك في الهند؟',
          answer:
            'تقرير أفضل مستشفيات العيون في الهند معدلات نجاح 99٪ لجراحة الليزك بالتقنيات المتقدمة. معظم المرضى يحققون رؤية 20/20 أو أفضل. معدلات النجاح مماثلة أو أفضل من النسب في الإمارات والسعودية والدول الغربية. الهند تستخدم نفس المعدات المعتمدة من FDA مثل المستشفيات في جميع أنحاء العالم.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في الهند لجراحة الليزك؟',
          answer:
            'معظم المرضى يبقون 3-5 أيام لجراحة الليزك. اليوم 1 يشمل الاستشارة والفحوصات قبل العملية، اليوم 2-3 هو الإجراء، والأيام 4-5 للفحوصات المتابعة. لجراحة إعتام عدسة العين، خطط لـ 5-7 أيام لضمان الشفاء السليم والنتائج المثلى.',
        },
        {
          question: 'هل جراحة العيون في الهند آمنة للمرضى الأجانب؟',
          answer:
            'نعم، جراحة العيون في الهند آمنة جداً للمرضى الدوليين. الهند لديها مستشفيات عيون معتمدة من JCI مع أطباء عيون مدربين دولياً يتبعون بروتوكولات السلامة الصارمة. المستشفيات تستخدم أحدث التقنيات بما في ذلك ليزر Femtosecond ولديها معدلات نجاح مماثلة لأفضل العيادات الغربية.',
        },
        {
          question: 'هل مستشفيات العيون في الهند تتحدث العربية؟',
          answer:
            'نعم، مستشفيات العيون الرئيسية في الهند لديها منسقون ومترجمون يتحدثون العربية. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية سيساعدونك طوال رحلة العلاج بأكملها، من الاستشارة الأولية إلى المتابعة بعد العلاج وترتيبات السفر.',
        },
        {
          question: 'ما هو المشمول في تكلفة باقة جراحة الليزك؟',
          answer:
            'باقات الليزك القياسية تشمل: فحوصات عين شاملة، تضاريس قرنية متقدمة، اختبارات قياس سمك القرنية، إجراء الليزك بدون شفرة لكلا العينين، أدوية وقطرات عين بعد العملية، واقيات عين واقية، واستشارات متابعة متعددة. الخيارات المميزة مثل Contoura Vision أو SMILE قد تكلف أكثر قليلاً.',
        },
        {
          question: 'هل يمكنني علاج كلا العينين في نفس اليوم؟',
          answer:
            'نعم، معظم جراحات الليزك وإعتام عدسة العين يمكن أن تعالج كلا العينين في نفس اليوم، على الرغم من أن بعض الأطباء يفضلون الانتظار 1-2 أيام بين العينين لجراحة إعتام عدسة العين. سيوصي طبيب العيون بالنهج الأفضل بناءً على حالتك المحددة وصحة عينك الإجمالية.',
        },
        {
          question: 'ما هي التقنيات المتاحة للليزك في الهند؟',
          answer:
            'تقدم أفضل مستشفيات العيون في الهند أحدث تقنيات الليزك بما في ذلك الليزك بدون شفرة (ليزر كامل)، Contoura Vision (موجه بالتضاريس للتصحيح الدقيق)، SMILE (إجراء شق صغير)، Femto LASIK بتقنية الموجة الأمامية، وPRK للقرنيات الرقيقة. كلها تستخدم معدات معتمدة من FDA من الشركات المصنعة الرائدة.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات العيون في الهند',
      subtitle: 'مراكز طب عيون معتمدة من JCI مع سجلات حافلة مثبتة',
      cta: 'عرض جميع المستشفيات',
    },
    finalCta: {
      title: 'هل أنت مستعد لبدء رحلة رعاية العيون الخاصة بك؟',
      subtitle:
        'احصل على استشارة مجانية مع أخصائيي طب العيون لدينا واحصل على خطة علاج شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل رعاية العيون',
    },
  },
};

export default function OphthalmologyPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Ophthalmology</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Eye className="w-4 h-4 text-accent" />
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
