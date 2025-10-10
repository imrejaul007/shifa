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
      badge: 'Fertility Treatment',
      title: 'IVF Treatment in Bangalore',
      subtitle: 'World-Class Fertility Care at 70% Lower Cost',
      description:
        'Achieve your dream of parenthood with advanced IVF treatment in Bangalore. JCI-accredited hospitals, internationally trained specialists, and success rates comparable to Western countries - all at a fraction of the cost.',
      ctaPrimary: 'Get Free IVF Cost Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '60-70%', desc: 'vs UAE & Saudi' },
      successRate: { label: 'Success Rate', value: '50-65%', desc: 'Under 35 years' },
      experience: { label: 'Experience', value: '15+ Years', desc: 'Top specialists' },
      patients: { label: 'GCC Patients', value: '2000+', desc: 'Treated annually' },
    },
    costComparison: {
      title: 'IVF Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with IVF treatment in Bangalore compared to your home country',
      india: 'India (Bangalore)',
      uae: 'UAE (Dubai)',
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
          name: 'IVF Single Cycle',
          india: '$3,500 - $5,500',
          uae: '$10,000 - $15,000',
          saudi: '$9,000 - $13,000',
          savings: 'Save $5,500+',
        },
        {
          name: 'ICSI Treatment',
          india: '$4,000 - $6,000',
          uae: '$11,000 - $16,000',
          saudi: '$10,000 - $14,000',
          savings: 'Save $6,000+',
        },
        {
          name: 'Egg Freezing',
          india: '$2,000 - $3,000',
          uae: '$6,000 - $8,000',
          saudi: '$5,500 - $7,500',
          savings: 'Save $3,500+',
        },
        {
          name: 'Donor IVF',
          india: '$5,500 - $7,500',
          uae: '$15,000 - $20,000',
          saudi: '$14,000 - $18,000',
          savings: 'Save $8,500+',
        },
      ],
      note: '* All costs in USD. Includes medications, procedures, and consultations. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose Bangalore for IVF Treatment?',
      reasons: [
        {
          icon: Award,
          title: 'World-Class Success Rates',
          description:
            '50-65% success rates for women under 35, comparable to top Western clinics. Advanced lab facilities with time-lapse embryo monitoring.',
        },
        {
          icon: Shield,
          title: 'JCI-Accredited Hospitals',
          description:
            'Treatment at internationally accredited fertility centers following global quality standards. Latest technology including PGS/PGD testing.',
        },
        {
          icon: Users,
          title: 'Experienced Specialists',
          description:
            'Board-certified fertility specialists with international training. 15+ years of experience treating international patients.',
        },
        {
          icon: Globe,
          title: 'Arabic-Speaking Support',
          description:
            'Dedicated Arabic-speaking coordinators throughout your journey. Cultural sensitivity and halal-certified hospital facilities available.',
        },
        {
          icon: DollarSign,
          title: 'Transparent Pricing',
          description:
            'All-inclusive packages with no hidden costs. Save 60-70% compared to UAE and Saudi Arabia without compromising quality.',
        },
        {
          icon: Heart,
          title: 'Comprehensive Care',
          description:
            'Complete fertility solutions including IVF, ICSI, egg freezing, embryo adoption, and surrogacy. Personalized treatment plans.',
        },
      ],
    },
    process: {
      title: 'Your IVF Treatment Journey in Bangalore',
      subtitle: 'Step-by-step guide to your fertility treatment',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation & Assessment',
          description:
            'Virtual or in-person consultation with fertility specialist. Review of medical history, diagnostic tests, and personalized treatment plan.',
          duration: 'Day 1-2',
        },
        {
          number: '02',
          title: 'Ovarian Stimulation',
          description:
            'Hormone injections to stimulate egg production. Regular monitoring with ultrasound and blood tests to track follicle development.',
          duration: 'Day 3-12',
        },
        {
          number: '03',
          title: 'Egg Retrieval',
          description:
            'Minor surgical procedure to collect eggs. Performed under sedation in state-of-the-art operation theater. Takes 20-30 minutes.',
          duration: 'Day 13-14',
        },
        {
          number: '04',
          title: 'Fertilization & Embryo Development',
          description:
            'Eggs fertilized with sperm in laboratory. Embryos monitored for 3-5 days with advanced time-lapse imaging technology.',
          duration: 'Day 14-19',
        },
        {
          number: '05',
          title: 'Embryo Transfer',
          description:
            'Selected healthy embryos transferred to uterus. Quick, painless procedure. Remaining embryos can be frozen for future use.',
          duration: 'Day 17-19',
        },
        {
          number: '06',
          title: 'Pregnancy Test & Follow-up',
          description:
            'Blood test 10-14 days after transfer. Ultrasound confirmation at 6-8 weeks. Ongoing support and monitoring throughout pregnancy.',
          duration: 'Day 28-30',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About IVF in Bangalore',
      items: [
        {
          question: 'How much does IVF cost in Bangalore for UAE patients?',
          answer:
            'IVF treatment in Bangalore costs between $3,500-$5,500 USD per cycle for UAE patients. This is 60-70% less expensive than IVF in UAE ($10,000-$15,000). The cost includes all consultations, medications, egg retrieval, fertilization, embryo culture, and transfer. Additional services like PGS/PGD testing or egg freezing are available at extra cost.',
        },
        {
          question: 'What is the success rate of IVF in Bangalore?',
          answer:
            'Top fertility clinics in Bangalore report success rates of 50-65% per cycle for women under 35, and 40-50% for women aged 35-40. These success rates are comparable to or better than rates in UAE, Saudi Arabia, and Western countries. Success depends on factors like age, egg quality, and underlying fertility issues.',
        },
        {
          question: 'How long do I need to stay in Bangalore for IVF?',
          answer:
            'Most patients stay 15-20 days for a complete IVF cycle. Initial consultations take 1-2 days, ovarian stimulation monitoring requires 10-12 days, and you need to stay 3-5 days after embryo transfer. Some patients do initial consultations remotely and only come for the egg retrieval and transfer phases.',
        },
        {
          question: 'Is IVF treatment safe in India for foreign patients?',
          answer:
            'Yes, IVF in India is very safe for international patients. Bangalore has JCI-accredited fertility hospitals with internationally trained specialists. The clinics use the latest technology and follow strict quality control standards. Success rates and safety profiles are comparable to top Western clinics.',
        },
        {
          question: 'Do fertility clinics in Bangalore speak Arabic?',
          answer:
            'Yes, major fertility hospitals in Bangalore have Arabic-speaking coordinators and translators. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who will assist you throughout your entire treatment journey, from initial consultation to post-treatment follow-up.',
        },
        {
          question: 'What is included in the IVF package cost?',
          answer:
            'Standard IVF packages include: fertility specialist consultations, ultrasound scans, blood tests, ovarian stimulation medications, egg retrieval procedure, sperm preparation, fertilization, embryo culture (3-5 days), embryo transfer, and immediate post-transfer care. Additional costs may apply for ICSI, PGS testing, or embryo freezing.',
        },
        {
          question: 'Can I bring my spouse for IVF treatment?',
          answer:
            'Yes, your spouse should accompany you for IVF treatment as sperm sample collection is required on the day of egg retrieval. We also provide couple-friendly accommodation near the hospital. Medical visa can be arranged for both partners.',
        },
        {
          question: 'What if my first IVF cycle is not successful?',
          answer:
            'If the first cycle is unsuccessful, your doctor will review the cycle and recommend modifications for better success. Many patients achieve pregnancy in the second or third cycle. If you have frozen embryos from the first cycle, subsequent frozen embryo transfers are significantly less expensive ($1,500-$2,500).',
        },
      ],
    },
    hospitals: {
      title: 'Top Fertility Hospitals in Bangalore',
      subtitle: 'JCI-accredited fertility centers with proven track records',
      cta: 'View All Hospitals',
    },
    finalCta: {
      title: 'Ready to Start Your Fertility Journey?',
      subtitle:
        'Get a free consultation with our fertility specialists and receive a personalized IVF treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download IVF Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'علاج الخصوبة',
      title: 'علاج أطفال الأنابيب في بنغالور',
      subtitle: 'رعاية خصوبة عالمية المستوى بتكلفة أقل 70٪',
      description:
        'حقق حلمك في الأبوة مع علاج أطفال الأنابيب المتقدم في بنغالور. مستشفيات معتمدة من JCI، أخصائيون مدربون دولياً، ونسب نجاح مماثلة للدول الغربية - كل ذلك بجزء بسيط من التكلفة.',
      ctaPrimary: 'احصل على تقدير مجاني لتكلفة أطفال الأنابيب',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '60-70%', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نسبة النجاح', value: '50-65%', desc: 'أقل من 35 سنة' },
      experience: { label: 'الخبرة', value: '15+ سنة', desc: 'أفضل المتخصصين' },
      patients: { label: 'مرضى الخليج', value: '2000+', desc: 'يعالجون سنوياً' },
    },
    costComparison: {
      title: 'مقارنة تكلفة أطفال الأنابيب: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع علاج أطفال الأنابيب في بنغالور مقارنة ببلدك',
      india: 'الهند (بنغالور)',
      uae: 'الإمارات (دبي)',
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
          name: 'دورة واحدة من أطفال الأنابيب',
          india: '$3,500 - $5,500',
          uae: '$10,000 - $15,000',
          saudi: '$9,000 - $13,000',
          savings: 'وفر $5,500+',
        },
        {
          name: 'علاج الحقن المجهري',
          india: '$4,000 - $6,000',
          uae: '$11,000 - $16,000',
          saudi: '$10,000 - $14,000',
          savings: 'وفر $6,000+',
        },
        {
          name: 'تجميد البويضات',
          india: '$2,000 - $3,000',
          uae: '$6,000 - $8,000',
          saudi: '$5,500 - $7,500',
          savings: 'وفر $3,500+',
        },
        {
          name: 'أطفال أنابيب مع متبرع',
          india: '$5,500 - $7,500',
          uae: '$15,000 - $20,000',
          saudi: '$14,000 - $18,000',
          savings: 'وفر $8,500+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الأدوية والإجراءات والاستشارات. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار بنغالور لعلاج أطفال الأنابيب؟',
      reasons: [
        {
          icon: Award,
          title: 'نسب نجاح عالمية المستوى',
          description:
            'نسب نجاح 50-65٪ للنساء دون 35 سنة، مماثلة لأفضل العيادات الغربية. مرافق مختبرية متقدمة مع مراقبة الأجنة بتقنية الفاصل الزمني.',
        },
        {
          icon: Shield,
          title: 'مستشفيات معتمدة من JCI',
          description:
            'العلاج في مراكز خصوبة معتمدة دولياً تتبع معايير الجودة العالمية. أحدث التقنيات بما في ذلك اختبار PGS/PGD.',
        },
        {
          icon: Users,
          title: 'أخصائيون ذوو خبرة',
          description:
            'أخصائيو خصوبة معتمدون مع تدريب دولي. أكثر من 15 عاماً من الخبرة في علاج المرضى الدوليين.',
        },
        {
          icon: Globe,
          title: 'دعم باللغة العربية',
          description:
            'منسقون متخصصون يتحدثون العربية طوال رحلتك. حساسية ثقافية ومرافق مستشفى معتمدة حلال متاحة.',
        },
        {
          icon: DollarSign,
          title: 'أسعار شفافة',
          description:
            'باقات شاملة بدون تكاليف خفية. وفر 60-70٪ مقارنة بالإمارات والسعودية دون المساومة على الجودة.',
        },
        {
          icon: Heart,
          title: 'رعاية شاملة',
          description:
            'حلول خصوبة كاملة تشمل أطفال الأنابيب، الحقن المجهري، تجميد البويضات، تبني الأجنة، والحمل البديل. خطط علاج شخصية.',
        },
      ],
    },
    process: {
      title: 'رحلة علاج أطفال الأنابيب في بنغالور',
      subtitle: 'دليل خطوة بخطوة لعلاج الخصوبة الخاص بك',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الأولية والتقييم',
          description:
            'استشارة افتراضية أو شخصية مع أخصائي الخصوبة. مراجعة التاريخ الطبي، الفحوصات التشخيصية، وخطة علاج شخصية.',
          duration: 'اليوم 1-2',
        },
        {
          number: '02',
          title: 'تحفيز المبيض',
          description:
            'حقن هرمونية لتحفيز إنتاج البويضات. مراقبة منتظمة بالموجات فوق الصوتية وفحوصات الدم لتتبع تطور الجريبات.',
          duration: 'اليوم 3-12',
        },
        {
          number: '03',
          title: 'سحب البويضات',
          description:
            'إجراء جراحي بسيط لجمع البويضات. يتم إجراؤه تحت التخدير في غرفة عمليات حديثة. يستغرق 20-30 دقيقة.',
          duration: 'اليوم 13-14',
        },
        {
          number: '04',
          title: 'الإخصاب وتطور الجنين',
          description:
            'إخصاب البويضات بالحيوانات المنوية في المختبر. مراقبة الأجنة لمدة 3-5 أيام بتقنية التصوير المتقدمة.',
          duration: 'اليوم 14-19',
        },
        {
          number: '05',
          title: 'نقل الجنين',
          description:
            'نقل الأجنة الصحية المختارة إلى الرحم. إجراء سريع وغير مؤلم. يمكن تجميد الأجنة المتبقية للاستخدام المستقبلي.',
          duration: 'اليوم 17-19',
        },
        {
          number: '06',
          title: 'اختبار الحمل والمتابعة',
          description:
            'فحص دم بعد 10-14 يوماً من النقل. تأكيد بالموجات فوق الصوتية في الأسبوع 6-8. دعم ومراقبة مستمرة طوال الحمل.',
          duration: 'اليوم 28-30',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول أطفال الأنابيب في بنغالور',
      items: [
        {
          question: 'كم تكلفة علاج أطفال الأنابيب في بنغالور لمرضى الإمارات؟',
          answer:
            'تتراوح تكلفة علاج أطفال الأنابيب في بنغالور بين 3,500-5,500 دولار أمريكي لكل دورة لمرضى الإمارات. هذا أقل بنسبة 60-70٪ من تكلفة أطفال الأنابيب في الإمارات (10,000-15,000 دولار). التكلفة تشمل جميع الاستشارات، الأدوية، سحب البويضات، الإخصاب، زراعة الأجنة، والنقل.',
        },
        {
          question: 'ما هي نسبة نجاح أطفال الأنابيب في بنغالور؟',
          answer:
            'تقرير أفضل عيادات الخصوبة في بنغالور نسب نجاح 50-65٪ لكل دورة للنساء دون 35 سنة، و40-50٪ للنساء من 35-40 سنة. هذه النسب مماثلة أو أفضل من النسب في الإمارات والسعودية والدول الغربية.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في بنغالور لعلاج أطفال الأنابيب؟',
          answer:
            'معظم المرضى يبقون 15-20 يوماً لدورة كاملة من أطفال الأنابيب. الاستشارات الأولية تستغرق 1-2 يوم، مراقبة تحفيز المبيض تتطلب 10-12 يوماً، وتحتاج للبقاء 3-5 أيام بعد نقل الجنين.',
        },
        {
          question: 'هل علاج أطفال الأنابيب آمن في الهند للمرضى الأجانب؟',
          answer:
            'نعم، علاج أطفال الأنابيب في الهند آمن جداً للمرضى الدوليين. بنغالور لديها مستشفيات خصوبة معتمدة من JCI مع أخصائيين مدربين دولياً. العيادات تستخدم أحدث التقنيات وتتبع معايير مراقبة الجودة الصارمة.',
        },
        {
          question: 'هل عيادات الخصوبة في بنغالور تتحدث العربية؟',
          answer:
            'نعم، مستشفيات الخصوبة الرئيسية في بنغالور لديها منسقون ومترجمون يتحدثون العربية. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية سيساعدونك طوال رحلة العلاج بأكملها.',
        },
        {
          question: 'ما هو المشمول في تكلفة باقة أطفال الأنابيب؟',
          answer:
            'باقات أطفال الأنابيب القياسية تشمل: استشارات أخصائي الخصوبة، فحوصات الموجات فوق الصوتية، فحوصات الدم، أدوية تحفيز المبيض، إجراء سحب البويضات، تحضير الحيوانات المنوية، الإخصاب، زراعة الأجنة (3-5 أيام)، نقل الجنين، والرعاية الفورية بعد النقل.',
        },
        {
          question: 'هل يمكنني إحضار زوجي لعلاج أطفال الأنابيب؟',
          answer:
            'نعم، يجب أن يرافقك زوجك لعلاج أطفال الأنابيب حيث أن جمع عينة الحيوانات المنوية مطلوب في يوم سحب البويضات. نحن نوفر أيضاً إقامة مناسبة للأزواج بالقرب من المستشفى.',
        },
        {
          question: 'ماذا لو لم تكن دورة أطفال الأنابيب الأولى ناجحة؟',
          answer:
            'إذا لم تكن الدورة الأولى ناجحة، سيراجع طبيبك الدورة ويوصي بتعديلات لنجاح أفضل. العديد من المرضى يحققون الحمل في الدورة الثانية أو الثالثة. إذا كان لديك أجنة مجمدة من الدورة الأولى، فإن نقل الأجنة المجمدة اللاحقة أقل تكلفة بكثير (1,500-2,500 دولار).',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات الخصوبة في بنغالور',
      subtitle: 'مراكز خصوبة معتمدة من JCI مع سجلات حافلة مثبتة',
      cta: 'عرض جميع المستشفيات',
    },
    finalCta: {
      title: 'هل أنت مستعد لبدء رحلة الخصوبة الخاصة بك؟',
      subtitle:
        'احصل على استشارة مجانية مع أخصائيي الخصوبة لدينا واحصل على خطة علاج أطفال أنابيب شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل أطفال الأنابيب',
    },
  },
};

export default function IVFPillarClient({ locale }: Props) {
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
            <span className="text-foreground">IVF & Fertility</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Heart className="w-4 h-4 text-accent" />
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

      {/* Why Choose Bangalore Section */}
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
