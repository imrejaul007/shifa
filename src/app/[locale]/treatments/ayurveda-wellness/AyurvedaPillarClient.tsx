'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Award,
  Heart,
  Clock,
  CheckCircle2,
  Leaf,
  Shield,
  Globe,
  Sparkles,
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
      badge: 'Ayurveda & Wellness',
      title: 'Ayurveda Treatment in India',
      subtitle: 'Authentic Healing with 5000+ Years of Tradition',
      description:
        'Experience authentic Ayurveda and Panchakarma therapy at certified wellness centers in India. Natural healing, holistic approach, and certified practitioners - all at 70% lower cost than UAE and Saudi Arabia.',
      ctaPrimary: 'Get Free Wellness Plan',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '70%', desc: 'vs UAE & Saudi' },
      tradition: { label: 'Tradition', value: '5000+', desc: 'Years of wisdom' },
      centers: { label: 'Certified Centers', value: '50+', desc: 'Accredited partners' },
      patients: { label: 'Wellness Seekers', value: '8000+', desc: 'International annually' },
    },
    costComparison: {
      title: 'Ayurveda Treatment Cost: India vs UAE vs Saudi Arabia',
      subtitle:
        'Compare Ayurveda and Panchakarma therapy costs across countries and see your savings',
      india: 'India',
      uae: 'UAE',
      saudi: 'Saudi Arabia',
      tableHeaders: {
        procedure: 'Treatment Program',
        india: 'India Cost',
        uae: 'UAE Cost',
        saudi: 'Saudi Cost',
        savings: 'Your Savings',
      },
      procedures: [
        {
          name: 'Panchakarma Therapy (21 days)',
          india: '$1,500 - $2,500',
          uae: '$8,000 - $12,000',
          saudi: '$7,000 - $11,000',
          savings: 'Save $6,000+',
        },
        {
          name: 'Stress Management Program',
          india: '$1,000 - $1,800',
          uae: '$5,000 - $8,000',
          saudi: '$4,500 - $7,500',
          savings: 'Save $4,000+',
        },
        {
          name: 'Chronic Pain Treatment',
          india: '$1,200 - $2,000',
          uae: '$6,000 - $9,000',
          saudi: '$5,500 - $8,500',
          savings: 'Save $4,800+',
        },
        {
          name: 'Detox & Rejuvenation',
          india: '$800 - $1,500',
          uae: '$4,000 - $6,000',
          saudi: '$3,500 - $5,500',
          savings: 'Save $3,000+',
        },
      ],
      note: '* All costs in USD. Includes accommodation, meals, consultations, and treatments. Flights separate.',
    },
    overview: {
      title: 'Why Choose India for Ayurveda Treatment?',
      reasons: [
        {
          icon: Leaf,
          title: 'Authentic Ayurveda',
          description:
            'Experience the birthplace of Ayurveda with traditional knowledge passed down through generations. Authentic formulations and time-tested healing methods.',
        },
        {
          icon: Award,
          title: 'Certified Practitioners',
          description:
            'Treatment by qualified Ayurvedic doctors with BAMS degrees and specialized training. Years of experience in treating international patients.',
        },
        {
          icon: Sparkles,
          title: 'Natural Healing',
          description:
            'All treatments use 100% natural herbs, oils, and medicines prepared according to ancient texts. No synthetic chemicals or harmful additives.',
        },
        {
          icon: Heart,
          title: 'Holistic Approach',
          description:
            'Comprehensive wellness addressing body, mind, and spirit. Personalized treatment plans based on your unique constitution (Prakriti) and condition.',
        },
        {
          icon: Globe,
          title: 'Peaceful Environment',
          description:
            'Wellness centers located in serene natural settings - beaches, mountains, or forests. Perfect for healing and rejuvenation away from urban stress.',
        },
        {
          icon: DollarSign,
          title: '70% Savings',
          description:
            'World-class Ayurveda treatment at fraction of Western or Gulf country costs. Transparent pricing with all-inclusive packages available.',
        },
      ],
    },
    process: {
      title: 'Your Wellness Journey in India',
      subtitle: 'Step-by-step guide to your Ayurveda healing experience',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation & Assessment',
          description:
            'Detailed consultation with Ayurvedic doctor including pulse diagnosis, tongue examination, and prakriti assessment. Personalized treatment plan created based on your constitution and health goals.',
          duration: 'Day 1',
        },
        {
          number: '02',
          title: 'Pre-Treatment Preparation',
          description:
            'Gentle preparatory therapies to prepare your body for deeper detoxification. Includes dietary adjustments, herbal medicines, and oil massages to loosen toxins.',
          duration: 'Day 2-5',
        },
        {
          number: '03',
          title: 'Panchakarma Detoxification',
          description:
            'Main purification therapies including Abhyanga (oil massage), Shirodhara (oil stream therapy), Swedana (herbal steam), and specialized treatments based on your needs.',
          duration: 'Day 6-18',
        },
        {
          number: '04',
          title: 'Rejuvenation Phase',
          description:
            'Nourishing therapies to rebuild and strengthen your body after detoxification. Rasayana (rejuvenation) medicines and specialized treatments for lasting vitality.',
          duration: 'Day 19-21',
        },
        {
          number: '05',
          title: 'Lifestyle & Diet Guidance',
          description:
            'Personalized recommendations for diet, exercise, and daily routines based on your constitution. Yoga and meditation sessions to support mental wellness.',
          duration: 'Throughout',
        },
        {
          number: '06',
          title: 'Post-Treatment Follow-up',
          description:
            'Continued support after you return home with diet plans, herbal medicine supply, and remote consultations to maintain your wellness gains.',
          duration: 'After treatment',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Ayurveda in India',
      items: [
        {
          question: 'How much does Panchakarma therapy cost in India?',
          answer:
            'A complete 21-day Panchakarma program in India costs between $1,500-$2,500 USD for international patients. This includes accommodation, three Ayurvedic meals daily, all consultations, therapies, medicines, and yoga/meditation sessions. This is 70-80% less than similar programs in UAE ($8,000-$12,000) or Saudi Arabia ($7,000-$11,000).',
        },
        {
          question: 'Is Ayurveda treatment in India safe and authentic?',
          answer:
            'Yes, India is the birthplace of Ayurveda and offers the most authentic treatments. Reputable wellness centers employ certified Ayurvedic doctors (BAMS degree holders) and use traditional formulations prepared under strict quality controls. Many centers are government-approved and follow safety standards for international patients.',
        },
        {
          question: 'What health conditions can Ayurveda treat?',
          answer:
            'Ayurveda effectively treats chronic pain, arthritis, joint problems, stress and anxiety, depression, digestive disorders, skin conditions like psoriasis and eczema, respiratory issues, diabetes management, obesity, hormonal imbalances, and lifestyle diseases. It also offers preventive care and rejuvenation for healthy individuals.',
        },
        {
          question: 'How long do I need to stay for Ayurveda treatment?',
          answer:
            'Traditional Panchakarma therapy requires 21-28 days for complete detoxification and maximum benefits. Shorter programs of 7-14 days are available for specific conditions or wellness retreats. For chronic conditions, longer stays of 4-6 weeks may be recommended. The doctor will advise the ideal duration based on your needs.',
        },
        {
          question: 'Do Ayurveda centers have Arabic-speaking staff?',
          answer:
            'Yes, major Ayurveda wellness centers in Kerala, Bangalore, and Goa have Arabic-speaking coordinators to assist GCC patients. Shifa AlHind provides dedicated Arabic-speaking support throughout your journey, from booking to post-treatment follow-up. Treatment plans and instructions are also available in Arabic.',
        },
        {
          question: 'What is included in Ayurveda treatment packages?',
          answer:
            'Standard packages include: private or shared accommodation at the wellness center, three vegetarian Ayurvedic meals daily, initial and follow-up consultations with Ayurvedic doctor, daily treatments and therapies, herbal medicines, yoga and meditation sessions, and basic facilities. Premium packages may include private rooms, additional therapies, and airport transfers.',
        },
        {
          question: 'Can I combine Ayurveda with modern medical treatment?',
          answer:
            'Yes, Ayurveda can complement modern treatments for many conditions. However, inform both your Ayurvedic doctor and regular physician about all medications and treatments you are receiving. Some medications may need adjustment during Panchakarma. For serious conditions, Ayurveda works best as a complementary therapy alongside conventional care.',
        },
        {
          question: 'Where are the best Ayurveda centers in India?',
          answer:
            'Kerala is renowned as the Ayurveda capital with numerous authentic centers. Other excellent locations include Karnataka (Bangalore, Coorg), Goa, Uttarakhand (Rishikesh), and Tamil Nadu. Kerala is preferred for its tropical climate, traditional practitioners, and integration of Ayurveda into daily life. Shifa AlHind partners with certified centers across these regions.',
        },
      ],
    },
    hospitals: {
      title: 'Top Ayurveda Wellness Centers in India',
      subtitle: 'Certified centers with authentic traditional healing',
      cta: 'View All Centers',
    },
    finalCta: {
      title: 'Ready to Begin Your Wellness Journey?',
      subtitle:
        'Get a free consultation with our Ayurveda specialists and receive a personalized wellness plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Ayurveda Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'الأيورفيدا والعافية',
      title: 'علاج الأيورفيدا في الهند',
      subtitle: 'الشفاء الأصيل مع 5000+ سنة من التقاليد',
      description:
        'اختبر الأيورفيدا الأصيلة وعلاج بنشكارما في مراكز العافية المعتمدة في الهند. الشفاء الطبيعي، النهج الشامل، والممارسون المعتمدون - كل ذلك بتكلفة أقل 70٪ من الإمارات والسعودية.',
      ctaPrimary: 'احصل على خطة عافية مجانية',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '70%', desc: 'مقارنة بالإمارات والسعودية' },
      tradition: { label: 'التقليد', value: '5000+', desc: 'سنة من الحكمة' },
      centers: { label: 'مراكز معتمدة', value: '50+', desc: 'شركاء معتمدون' },
      patients: { label: 'الباحثون عن العافية', value: '8000+', desc: 'دولي سنوياً' },
    },
    costComparison: {
      title: 'تكلفة علاج الأيورفيدا: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'قارن تكاليف الأيورفيدا وعلاج بنشكارما عبر البلدان وشاهد توفيرك',
      india: 'الهند',
      uae: 'الإمارات',
      saudi: 'السعودية',
      tableHeaders: {
        procedure: 'برنامج العلاج',
        india: 'تكلفة الهند',
        uae: 'تكلفة الإمارات',
        saudi: 'تكلفة السعودية',
        savings: 'توفيرك',
      },
      procedures: [
        {
          name: 'علاج بنشكارما (21 يوماً)',
          india: '$1,500 - $2,500',
          uae: '$8,000 - $12,000',
          saudi: '$7,000 - $11,000',
          savings: 'وفر $6,000+',
        },
        {
          name: 'برنامج إدارة الإجهاد',
          india: '$1,000 - $1,800',
          uae: '$5,000 - $8,000',
          saudi: '$4,500 - $7,500',
          savings: 'وفر $4,000+',
        },
        {
          name: 'علاج الألم المزمن',
          india: '$1,200 - $2,000',
          uae: '$6,000 - $9,000',
          saudi: '$5,500 - $8,500',
          savings: 'وفر $4,800+',
        },
        {
          name: 'إزالة السموم والتجديد',
          india: '$800 - $1,500',
          uae: '$4,000 - $6,000',
          saudi: '$3,500 - $5,500',
          savings: 'وفر $3,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الإقامة والوجبات والاستشارات والعلاجات. الرحلات الجوية منفصلة.',
    },
    overview: {
      title: 'لماذا تختار الهند لعلاج الأيورفيدا؟',
      reasons: [
        {
          icon: Leaf,
          title: 'الأيورفيدا الأصيلة',
          description:
            'اختبر مسقط رأس الأيورفيدا مع المعرفة التقليدية المتوارثة عبر الأجيال. تركيبات أصيلة وطرق علاج مثبتة بمرور الوقت.',
        },
        {
          icon: Award,
          title: 'ممارسون معتمدون',
          description:
            'العلاج من قبل أطباء الأيورفيدا المؤهلين مع درجات BAMS والتدريب المتخصص. سنوات من الخبرة في علاج المرضى الدوليين.',
        },
        {
          icon: Sparkles,
          title: 'الشفاء الطبيعي',
          description:
            'جميع العلاجات تستخدم 100٪ من الأعشاب والزيوت والأدوية الطبيعية المحضرة وفقاً للنصوص القديمة. لا مواد كيميائية صناعية أو إضافات ضارة.',
        },
        {
          icon: Heart,
          title: 'النهج الشامل',
          description:
            'عافية شاملة تعالج الجسم والعقل والروح. خطط علاج شخصية بناءً على دستورك الفريد (براكريتي) وحالتك.',
        },
        {
          icon: Globe,
          title: 'بيئة سلمية',
          description:
            'مراكز العافية تقع في أماكن طبيعية هادئة - الشواطئ أو الجبال أو الغابات. مثالية للشفاء والتجديد بعيداً عن ضغوط المدينة.',
        },
        {
          icon: DollarSign,
          title: 'توفير 70٪',
          description:
            'علاج الأيورفيدا العالمي بجزء بسيط من تكاليف الدول الغربية أو الخليجية. أسعار شفافة مع باقات شاملة متاحة.',
        },
      ],
    },
    process: {
      title: 'رحلة العافية في الهند',
      subtitle: 'دليل خطوة بخطوة لتجربة الشفاء بالأيورفيدا',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الأولية والتقييم',
          description:
            'استشارة مفصلة مع طبيب الأيورفيدا تشمل تشخيص النبض، فحص اللسان، وتقييم براكريتي. إنشاء خطة علاج شخصية بناءً على دستورك وأهدافك الصحية.',
          duration: 'اليوم 1',
        },
        {
          number: '02',
          title: 'التحضير قبل العلاج',
          description:
            'علاجات تحضيرية لطيفة لإعداد جسمك لإزالة السموم العميقة. تشمل التعديلات الغذائية والأدوية العشبية وتدليك الزيت لتخفيف السموم.',
          duration: 'اليوم 2-5',
        },
        {
          number: '03',
          title: 'إزالة السموم بنشكارما',
          description:
            'العلاجات التطهيرية الرئيسية تشمل أبهيانغا (تدليك الزيت)، شيرودارا (علاج تدفق الزيت)، سويدانا (البخار العشبي)، وعلاجات متخصصة حسب احتياجاتك.',
          duration: 'اليوم 6-18',
        },
        {
          number: '04',
          title: 'مرحلة التجديد',
          description:
            'علاجات مغذية لإعادة بناء وتقوية جسمك بعد إزالة السموم. أدوية راسايانا (التجديد) وعلاجات متخصصة للحيوية الدائمة.',
          duration: 'اليوم 19-21',
        },
        {
          number: '05',
          title: 'إرشادات نمط الحياة والنظام الغذائي',
          description:
            'توصيات شخصية للنظام الغذائي والتمارين والروتين اليومي بناءً على دستورك. جلسات يوغا وتأمل لدعم العافية العقلية.',
          duration: 'طوال الوقت',
        },
        {
          number: '06',
          title: 'المتابعة بعد العلاج',
          description:
            'دعم مستمر بعد عودتك إلى المنزل مع خطط النظام الغذائي وإمداد الأدوية العشبية واستشارات عن بعد للحفاظ على مكاسب العافية.',
          duration: 'بعد العلاج',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول الأيورفيدا في الهند',
      items: [
        {
          question: 'كم تكلفة علاج بنشكارما في الهند؟',
          answer:
            'يكلف برنامج بنشكارما الكامل لمدة 21 يوماً في الهند بين 1,500-2,500 دولار أمريكي للمرضى الدوليين. يشمل ذلك الإقامة، وثلاث وجبات أيورفيدية يومياً، وجميع الاستشارات، والعلاجات، والأدوية، وجلسات اليوغا/التأمل. هذا أقل بنسبة 70-80٪ من البرامج المماثلة في الإمارات (8,000-12,000 دولار) أو السعودية (7,000-11,000 دولار).',
        },
        {
          question: 'هل علاج الأيورفيدا في الهند آمن وأصيل؟',
          answer:
            'نعم، الهند هي مسقط رأس الأيورفيدا وتقدم العلاجات الأكثر أصالة. مراكز العافية ذات السمعة الطيبة توظف أطباء الأيورفيدا المعتمدين (حاملي شهادة BAMS) وتستخدم التركيبات التقليدية المحضرة تحت ضوابط جودة صارمة. العديد من المراكز معتمدة من الحكومة وتتبع معايير السلامة للمرضى الدوليين.',
        },
        {
          question: 'ما هي الحالات الصحية التي يمكن للأيورفيدا علاجها؟',
          answer:
            'الأيورفيدا تعالج بفعالية الألم المزمن، التهاب المفاصل، مشاكل المفاصل، الإجهاد والقلق، الاكتئاب، اضطرابات الجهاز الهضمي، حالات الجلد مثل الصدفية والأكزيما، مشاكل الجهاز التنفسي، إدارة السكري، السمنة، الاختلالات الهرمونية، وأمراض نمط الحياة. كما تقدم الرعاية الوقائية والتجديد للأفراد الأصحاء.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء لعلاج الأيورفيدا؟',
          answer:
            'علاج بنشكارما التقليدي يتطلب 21-28 يوماً لإزالة السموم الكاملة والفوائد القصوى. البرامج الأقصر من 7-14 يوماً متاحة لحالات معينة أو منتجعات العافية. للحالات المزمنة، قد يُوصى بإقامات أطول من 4-6 أسابيع. سينصح الطبيب بالمدة المثالية بناءً على احتياجاتك.',
        },
        {
          question: 'هل مراكز الأيورفيدا لديها موظفون يتحدثون العربية؟',
          answer:
            'نعم، مراكز العافية الرئيسية للأيورفيدا في كيرالا وبنغالور وجوا لديها منسقون يتحدثون العربية لمساعدة مرضى الخليج. شفاء الهند توفر دعماً متخصصاً باللغة العربية طوال رحلتك، من الحجز إلى المتابعة بعد العلاج. خطط العلاج والتعليمات متوفرة أيضاً بالعربية.',
        },
        {
          question: 'ما هو المشمول في باقات علاج الأيورفيدا؟',
          answer:
            'الباقات القياسية تشمل: إقامة خاصة أو مشتركة في مركز العافية، ثلاث وجبات نباتية أيورفيدية يومياً، استشارات أولية ومتابعة مع طبيب الأيورفيدا، العلاجات والعلاجات اليومية، الأدوية العشبية، جلسات اليوغا والتأمل، والمرافق الأساسية. الباقات المميزة قد تشمل غرف خاصة وعلاجات إضافية ونقل من المطار.',
        },
        {
          question: 'هل يمكنني الجمع بين الأيورفيدا والعلاج الطبي الحديث؟',
          answer:
            'نعم، الأيورفيدا يمكن أن تكمل العلاجات الحديثة للعديد من الحالات. ومع ذلك، أبلغ كل من طبيب الأيورفيدا وطبيبك العادي عن جميع الأدوية والعلاجات التي تتلقاها. قد تحتاج بعض الأدوية إلى تعديل خلال بنشكارما. للحالات الخطيرة، الأيورفيدا تعمل بشكل أفضل كعلاج تكميلي جنباً إلى جنب مع الرعاية التقليدية.',
        },
        {
          question: 'أين توجد أفضل مراكز الأيورفيدا في الهند؟',
          answer:
            'كيرالا معروفة كعاصمة الأيورفيدا مع العديد من المراكز الأصيلة. المواقع الممتازة الأخرى تشمل كارناتاكا (بنغالور، كورج)، جوا، أوتارانتشال (ريشيكيش)، وتاميل نادو. كيرالا مفضلة لمناخها الاستوائي والممارسين التقليديين ودمج الأيورفيدا في الحياة اليومية. شفاء الهند تتعاون مع مراكز معتمدة عبر هذه المناطق.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مراكز العافية الأيورفيدية في الهند',
      subtitle: 'مراكز معتمدة مع الشفاء التقليدي الأصيل',
      cta: 'عرض جميع المراكز',
    },
    finalCta: {
      title: 'هل أنت مستعد لبدء رحلة العافية الخاصة بك؟',
      subtitle:
        'احصل على استشارة مجانية مع أخصائيي الأيورفيدا لدينا واحصل على خطة عافية شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل الأيورفيدا',
    },
  },
};

export default function AyurvedaPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Ayurveda & Wellness</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Leaf className="w-4 h-4 text-accent" />
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
