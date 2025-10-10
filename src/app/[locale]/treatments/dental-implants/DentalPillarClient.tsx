'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Award,
  Smile,
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
      badge: 'Dental Care',
      title: 'Dental Implants in India',
      subtitle: 'World-Class Dental Care at 75% Lower Cost',
      description:
        'Transform your smile with premium dental implants in Bangalore. German implants, internationally trained dentists, and state-of-the-art clinics - all at a fraction of the cost in UAE and Saudi Arabia.',
      ctaPrimary: 'Get Free Dental Cost Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '75%', desc: 'vs UAE & Saudi' },
      successRate: { label: 'Success Rate', value: '99%', desc: 'German implants' },
      experience: { label: 'Experience', value: '20+ Years', desc: 'Expert dentists' },
      patients: { label: 'GCC Patients', value: '8000+', desc: 'Treated annually' },
    },
    costComparison: {
      title: 'Dental Implants Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with dental treatment in Bangalore compared to your home country',
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
          name: 'Single Dental Implant',
          india: '$800 - $1,200',
          uae: '$3,000 - $4,500',
          saudi: '$2,500 - $4,000',
          savings: 'Save $2,300+',
        },
        {
          name: 'Full Mouth Implants',
          india: '$6,000 - $9,000',
          uae: '$25,000 - $35,000',
          saudi: '$22,000 - $32,000',
          savings: 'Save $18,000+',
        },
        {
          name: 'Veneers (Per Tooth)',
          india: '$200 - $350',
          uae: '$800 - $1,200',
          saudi: '$700 - $1,100',
          savings: 'Save $550+',
        },
        {
          name: 'Complete Smile Makeover',
          india: '$3,000 - $5,000',
          uae: '$15,000 - $22,000',
          saudi: '$13,000 - $20,000',
          savings: 'Save $11,000+',
        },
      ],
      note: '* All costs in USD. Includes consultation, procedure, and materials. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose India for Dental Implants?',
      reasons: [
        {
          icon: Award,
          title: 'International-Standard Clinics',
          description:
            'State-of-the-art dental clinics with ISO certification and international accreditation. Advanced technology including 3D imaging, CAD/CAM systems, and laser dentistry.',
        },
        {
          icon: Users,
          title: 'Experienced Implantologists',
          description:
            'Board-certified dental surgeons with 20+ years of experience. Trained at leading international institutions with expertise in complex cases.',
        },
        {
          icon: Shield,
          title: 'German & Swiss Implants',
          description:
            'Premium implant brands: Straumann, Nobel Biocare, Dentsply Sirona. All implants come with lifetime international warranties for your peace of mind.',
        },
        {
          icon: Smile,
          title: 'Painless Procedures',
          description:
            'Computer-guided surgery and laser techniques ensure minimal discomfort. Sedation dentistry available. Advanced pain management protocols for comfortable treatment.',
        },
        {
          icon: Globe,
          title: 'Arabic-Speaking Staff',
          description:
            'Dedicated Arabic-speaking coordinators and translators throughout your journey. Cultural sensitivity and halal-certified facilities available.',
        },
        {
          icon: DollarSign,
          title: '75% Cost Savings',
          description:
            'Save significantly without compromising quality. Transparent pricing with all-inclusive packages. No hidden costs - know exactly what you pay upfront.',
        },
      ],
    },
    process: {
      title: 'Your Dental Implant Journey in Bangalore',
      subtitle: 'Step-by-step guide to your dental transformation',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation & Diagnosis',
          description:
            'Comprehensive dental examination with 3D CT scan and digital X-rays. Your dentist will assess bone density, create a personalized treatment plan, and discuss implant options.',
          duration: 'Day 1',
        },
        {
          number: '02',
          title: 'Pre-Treatment Preparation',
          description:
            'If needed, any dental issues like gum disease or tooth decay are treated. Bone grafting performed if required. Complete treatment planning with digital smile design.',
          duration: 'Day 2-3',
        },
        {
          number: '03',
          title: 'Implant Placement Surgery',
          description:
            'Titanium implant posts surgically placed into jawbone using computer-guided technology. Procedure performed under local anesthesia. Takes 1-2 hours per implant.',
          duration: 'Day 4-5',
        },
        {
          number: '04',
          title: 'Healing & Osseointegration',
          description:
            'Implant fuses with jawbone over 3-6 months. Temporary crowns provided for aesthetics. For immediate loading protocol, permanent crowns fitted within days.',
          duration: '3-6 Months',
        },
        {
          number: '05',
          title: 'Abutment Placement',
          description:
            'Small connector piece (abutment) attached to implant after healing. Gums shaped around abutment for 2 weeks. Impressions taken for custom crown fabrication.',
          duration: 'Day 6-7',
        },
        {
          number: '06',
          title: 'Crown Placement & Follow-up',
          description:
            'Custom ceramic crown permanently attached to abutment. Final adjustments for perfect bite and aesthetics. Regular follow-up appointments and care instructions provided.',
          duration: 'Day 8-10',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Dental Implants in India',
      items: [
        {
          question: 'How much does a dental implant cost in India for UAE patients?',
          answer:
            'A single dental implant in India costs between $800-$1,200 USD, which is 70-75% less than UAE prices ($3,000-$4,500). This includes the titanium implant, abutment, and porcelain crown. Full mouth dental implants cost $6,000-$9,000 in India compared to $25,000-$35,000 in the UAE. All costs include consultation, 3D scans, surgery, materials, and follow-up care.',
        },
        {
          question: 'What is the success rate of dental implants in India?',
          answer:
            'Dental implants in India have a 95-99% success rate at top clinics in Bangalore. Indian dental clinics use premium German and Swiss brands (Straumann, Nobel Biocare, Dentsply) and follow international protocols. Success rates are comparable to Western countries and backed by long-term clinical studies.',
        },
        {
          question: 'How long do I need to stay in India for dental implants?',
          answer:
            'For single implants with immediate loading, you need 7-10 days in India. Full mouth dental implants with immediate loading require 10-14 days. For traditional implants with healing period, you need two visits: initial placement (5-7 days) and crown placement 3-6 months later (3-4 days). Many GCC patients prefer immediate loading to minimize travel.',
        },
        {
          question: 'Are dental implants in India safe for foreign patients?',
          answer:
            'Yes, dental implants in India are very safe for international patients. Bangalore has ISO-certified dental clinics with internationally trained implantologists. Clinics use German/Swiss implants, maintain strict sterilization protocols, and provide international warranties. Success rates match or exceed Western standards.',
        },
        {
          question: 'Do dental clinics in Bangalore have Arabic-speaking staff?',
          answer:
            'Yes, major dental clinics in Bangalore have Arabic-speaking coordinators and translators for GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who assist you from initial consultation through post-treatment follow-up.',
        },
        {
          question: 'What brands of dental implants are used in India?',
          answer:
            'Top dental clinics in India use premium international implant brands including Straumann (Switzerland), Nobel Biocare (Sweden/USA), Dentsply Sirona (Germany), Osstem (Korea), and Zimmer Biomet. All implants come with lifetime international warranties and are FDA/CE approved.',
        },
        {
          question: 'Is dental implant treatment painful?',
          answer:
            'No, dental implant placement is performed under local anesthesia and is virtually painless. Advanced computer-guided surgery and laser techniques minimize tissue trauma. Sedation dentistry options (IV sedation or general anesthesia) are available for anxious patients. Post-operative discomfort is minimal and easily managed with pain medication. Most patients report less pain than tooth extraction.',
        },
        {
          question: 'How much do veneers cost in Bangalore?',
          answer:
            'Dental veneers in Bangalore cost $200-$350 per tooth, compared to $800-$1,200 in UAE and $700-$1,100 in Saudi Arabia. This includes consultation, tooth preparation, custom porcelain veneer fabrication, and bonding. A complete smile makeover (8-10 teeth) costs $3,000-$5,000 in India versus $15,000-$22,000 in UAE, saving you over $12,000.',
        },
      ],
    },
    hospitals: {
      title: 'Top Dental Clinics in Bangalore',
      subtitle: 'ISO-certified dental centers with proven excellence',
      cta: 'View All Clinics',
    },
    finalCta: {
      title: 'Ready to Transform Your Smile?',
      subtitle:
        'Get a free consultation with our expert dental implantologists and receive a personalized treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Dental Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'رعاية الأسنان',
      title: 'زراعة الأسنان في الهند',
      subtitle: 'رعاية أسنان عالمية المستوى بتكلفة أقل 75٪',
      description:
        'حوّل ابتسامتك مع زراعة الأسنان المتميزة في بنغالور. زرعات ألمانية، أطباء أسنان مدربون دولياً، وعيادات حديثة - كل ذلك بجزء بسيط من التكلفة في الإمارات والسعودية.',
      ctaPrimary: 'احصل على تقدير مجاني لتكلفة الأسنان',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '75%', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نسبة النجاح', value: '99%', desc: 'زرعات ألمانية' },
      experience: { label: 'الخبرة', value: '20+ سنة', desc: 'أطباء خبراء' },
      patients: { label: 'مرضى الخليج', value: '8000+', desc: 'يعالجون سنوياً' },
    },
    costComparison: {
      title: 'مقارنة تكلفة زراعة الأسنان: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع علاج الأسنان في بنغالور مقارنة ببلدك',
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
          name: 'زرعة سن واحدة',
          india: '$800 - $1,200',
          uae: '$3,000 - $4,500',
          saudi: '$2,500 - $4,000',
          savings: 'وفر $2,300+',
        },
        {
          name: 'زرعات الفم الكامل',
          india: '$6,000 - $9,000',
          uae: '$25,000 - $35,000',
          saudi: '$22,000 - $32,000',
          savings: 'وفر $18,000+',
        },
        {
          name: 'القشور الخزفية (للسن الواحد)',
          india: '$200 - $350',
          uae: '$800 - $1,200',
          saudi: '$700 - $1,100',
          savings: 'وفر $550+',
        },
        {
          name: 'تجميل الابتسامة الكامل',
          india: '$3,000 - $5,000',
          uae: '$15,000 - $22,000',
          saudi: '$13,000 - $20,000',
          savings: 'وفر $11,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الاستشارة والإجراء والمواد. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار الهند لزراعة الأسنان؟',
      reasons: [
        {
          icon: Award,
          title: 'عيادات ذات معايير دولية',
          description:
            'عيادات أسنان حديثة مع شهادة ISO واعتماد دولي. تقنية متقدمة تشمل التصوير ثلاثي الأبعاد، أنظمة CAD/CAM، وطب أسنان بالليزر.',
        },
        {
          icon: Users,
          title: 'أخصائيو زراعة ذوو خبرة',
          description:
            'جراحو أسنان معتمدون مع أكثر من 20 عاماً من الخبرة. مدربون في مؤسسات دولية رائدة مع خبرة في الحالات المعقدة.',
        },
        {
          icon: Shield,
          title: 'زرعات ألمانية وسويسرية',
          description:
            'ماركات زرعات متميزة: Straumann، Nobel Biocare، Dentsply Sirona. جميع الزرعات تأتي مع ضمانات دولية مدى الحياة.',
        },
        {
          icon: Smile,
          title: 'إجراءات غير مؤلمة',
          description:
            'جراحة موجهة بالكمبيوتر وتقنيات الليزر تضمن الحد الأدنى من الانزعاج. طب أسنان بالتخدير متاح. بروتوكولات متقدمة لإدارة الألم.',
        },
        {
          icon: Globe,
          title: 'طاقم يتحدث العربية',
          description:
            'منسقون ومترجمون متخصصون يتحدثون العربية طوال رحلتك. حساسية ثقافية ومرافق معتمدة حلال متاحة.',
        },
        {
          icon: DollarSign,
          title: 'توفير 75٪ في التكلفة',
          description:
            'وفر بشكل كبير دون المساومة على الجودة. أسعار شفافة مع باقات شاملة. لا تكاليف خفية - اعرف بالضبط ما تدفعه مقدماً.',
        },
      ],
    },
    process: {
      title: 'رحلة زراعة الأسنان في بنغالور',
      subtitle: 'دليل خطوة بخطوة لتحول أسنانك',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الأولية والتشخيص',
          description:
            'فحص أسنان شامل مع مسح ثلاثي الأبعاد وأشعة سينية رقمية. سيقيم طبيبك كثافة العظام، وينشئ خطة علاج شخصية، ويناقش خيارات الزرع.',
          duration: 'اليوم 1',
        },
        {
          number: '02',
          title: 'التحضير قبل العلاج',
          description:
            'إذا لزم الأمر، يتم علاج أي مشاكل في الأسنان مثل أمراض اللثة أو تسوس الأسنان. إجراء ترقيع العظام إذا لزم الأمر. تخطيط علاج كامل مع تصميم ابتسامة رقمي.',
          duration: 'اليوم 2-3',
        },
        {
          number: '03',
          title: 'جراحة وضع الزرعة',
          description:
            'وضع أعمدة الزرع التيتانيوم جراحياً في عظم الفك باستخدام تقنية موجهة بالكمبيوتر. يتم الإجراء تحت التخدير الموضعي. يستغرق 1-2 ساعة لكل زرعة.',
          duration: 'اليوم 4-5',
        },
        {
          number: '04',
          title: 'الشفاء والاندماج العظمي',
          description:
            'تندمج الزرعة مع عظم الفك على مدى 3-6 أشهر. توفير تيجان مؤقتة للجماليات. بالنسبة لبروتوكول التحميل الفوري، يتم تركيب التيجان الدائمة في غضون أيام.',
          duration: '3-6 أشهر',
        },
        {
          number: '05',
          title: 'وضع الدعامة',
          description:
            'يتم إرفاق قطعة موصل صغيرة (دعامة) بالزرعة بعد الشفاء. تشكيل اللثة حول الدعامة لمدة أسبوعين. أخذ طبعات لتصنيع التاج المخصص.',
          duration: 'اليوم 6-7',
        },
        {
          number: '06',
          title: 'وضع التاج والمتابعة',
          description:
            'إرفاق التاج الخزفي المخصص بشكل دائم بالدعامة. تعديلات نهائية للعضة والجماليات المثالية. توفير مواعيد متابعة منتظمة وتعليمات العناية.',
          duration: 'اليوم 8-10',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول زراعة الأسنان في الهند',
      items: [
        {
          question: 'كم تكلفة زراعة الأسنان في الهند لمرضى الإمارات؟',
          answer:
            'تتراوح تكلفة زراعة سن واحدة في الهند بين 800-1,200 دولار أمريكي، وهو أقل بنسبة 70-75٪ من أسعار الإمارات (3,000-4,500 دولار). يشمل ذلك زرعة التيتانيوم، الدعامة، والتاج الخزفي. تكلفة زرعات الفم الكامل 6,000-9,000 دولار في الهند مقارنة بـ 25,000-35,000 دولار في الإمارات.',
        },
        {
          question: 'ما هي نسبة نجاح زراعة الأسنان في الهند؟',
          answer:
            'زراعة الأسنان في الهند لديها نسبة نجاح 95-99٪ في أفضل العيادات في بنغالور. العيادات الهندية تستخدم ماركات ألمانية وسويسرية متميزة (Straumann، Nobel Biocare، Dentsply) وتتبع بروتوكولات دولية. نسب النجاح مماثلة للدول الغربية.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في الهند لزراعة الأسنان؟',
          answer:
            'للزرعات الفردية مع التحميل الفوري، تحتاج 7-10 أيام في الهند. زرعات الفم الكامل مع التحميل الفوري تتطلب 10-14 يوماً. للزرعات التقليدية مع فترة الشفاء، تحتاج زيارتين: الوضع الأولي (5-7 أيام) ووضع التاج بعد 3-6 أشهر (3-4 أيام).',
        },
        {
          question: 'هل زراعة الأسنان في الهند آمنة للمرضى الأجانب؟',
          answer:
            'نعم، زراعة الأسنان في الهند آمنة جداً للمرضى الدوليين. بنغالور لديها عيادات أسنان معتمدة ISO مع أخصائيي زرع مدربين دولياً. العيادات تستخدم زرعات ألمانية/سويسرية، وتحافظ على بروتوكولات تعقيم صارمة.',
        },
        {
          question: 'هل عيادات الأسنان في بنغالور لديها طاقم يتحدث العربية؟',
          answer:
            'نعم، عيادات الأسنان الرئيسية في بنغالور لديها منسقون ومترجمون يتحدثون العربية لمرضى الخليج. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية يساعدونك من الاستشارة الأولية حتى المتابعة.',
        },
        {
          question: 'ما هي ماركات زرعات الأسنان المستخدمة في الهند؟',
          answer:
            'أفضل عيادات الأسنان في الهند تستخدم ماركات زرعات دولية متميزة بما في ذلك Straumann (سويسرا)، Nobel Biocare (السويد/أمريكا)، Dentsply Sirona (ألمانيا)، Osstem (كوريا). جميع الزرعات تأتي مع ضمانات دولية مدى الحياة.',
        },
        {
          question: 'هل علاج زراعة الأسنان مؤلم؟',
          answer:
            'لا، يتم وضع زراعة الأسنان تحت التخدير الموضعي وهو غير مؤلم تقريباً. الجراحة الموجهة بالكمبيوتر المتقدمة وتقنيات الليزر تقلل من صدمة الأنسجة. خيارات طب الأسنان بالتخدير (التخدير الوريدي أو التخدير العام) متاحة للمرضى القلقين.',
        },
        {
          question: 'كم تكلفة القشور الخزفية في بنغالور؟',
          answer:
            'القشور الخزفية للأسنان في بنغالور تكلف 200-350 دولاراً للسن الواحد، مقارنة بـ 800-1,200 دولار في الإمارات و700-1,100 دولار في السعودية. تجميل الابتسامة الكامل (8-10 أسنان) يكلف 3,000-5,000 دولار في الهند مقابل 15,000-22,000 دولار في الإمارات.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل عيادات الأسنان في بنغالور',
      subtitle: 'مراكز أسنان معتمدة ISO مع تميز مثبت',
      cta: 'عرض جميع العيادات',
    },
    finalCta: {
      title: 'هل أنت مستعد لتحويل ابتسامتك؟',
      subtitle:
        'احصل على استشارة مجانية مع أخصائيي زراعة الأسنان الخبراء لدينا واحصل على خطة علاج شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل الأسنان',
    },
  },
};

export default function DentalPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Dental Implants</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Smile className="w-4 h-4 text-accent" />
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
