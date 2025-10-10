'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Award,
  Clock,
  CheckCircle2,
  Shield,
  Globe,
  TrendingUp,
  FileText,
  Activity,
  Stethoscope,
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
      badge: 'Orthopedic Surgery',
      title: 'Joint Replacement Surgery in Bangalore',
      subtitle: 'World-Class Orthopedic Care at 65% Lower Cost',
      description:
        'Regain your mobility and quality of life with advanced joint replacement surgery in Bangalore. JCI-accredited orthopedic hospitals, internationally trained surgeons with 15+ years experience, and success rates of 95%+ for primary procedures - all at a fraction of the cost.',
      ctaPrimary: 'Get Free Cost Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '65%', desc: 'vs UAE & Saudi' },
      successRate: { label: 'Success Rate', value: '95%+', desc: 'Primary procedures' },
      experience: { label: 'Experience', value: '15+ Years', desc: 'Top surgeons' },
      patients: { label: 'GCC Patients', value: '3000+', desc: 'Treated annually' },
    },
    costComparison: {
      title: 'Joint Replacement Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with joint replacement surgery in Bangalore compared to Gulf countries',
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
          name: 'Knee Replacement',
          india: '$5,000 - $7,000',
          uae: '$18,000 - $25,000',
          saudi: '$16,000 - $23,000',
          savings: 'Save $12,000+',
        },
        {
          name: 'Hip Replacement',
          india: '$6,000 - $8,500',
          uae: '$20,000 - $28,000',
          saudi: '$18,000 - $26,000',
          savings: 'Save $13,000+',
        },
        {
          name: 'Shoulder Replacement',
          india: '$5,500 - $7,500',
          uae: '$17,000 - $24,000',
          saudi: '$15,000 - $22,000',
          savings: 'Save $11,000+',
        },
        {
          name: 'Revision Surgery',
          india: '$7,500 - $10,000',
          uae: '$25,000 - $35,000',
          saudi: '$23,000 - $32,000',
          savings: 'Save $16,000+',
        },
      ],
      note: '* All costs in USD. Includes hospital stay, surgeon fees, prosthetics, and post-operative care. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose Bangalore for Joint Replacement Surgery?',
      reasons: [
        {
          icon: Award,
          title: 'World-Class Orthopedic Centers',
          description:
            'JCI-accredited hospitals with state-of-the-art orthopedic departments. Advanced robotic-assisted surgery and computer navigation for precision implant placement.',
        },
        {
          icon: Stethoscope,
          title: 'Experienced Surgeons',
          description:
            'Board-certified orthopedic surgeons with 15+ years of experience. International training from USA, UK, and Germany. Expertise in complex revision surgeries.',
        },
        {
          icon: Activity,
          title: 'Advanced Prosthetics',
          description:
            'FDA-approved implants from global brands like Zimmer, DePuy, and Stryker. Latest ceramic and titanium prosthetics with 20+ year lifespan. Customized implants available.',
        },
        {
          icon: TrendingUp,
          title: 'High Success Rates',
          description:
            '95%+ success rates for primary joint replacements. Excellent long-term outcomes with minimal complications. Comprehensive follow-up care and rehabilitation programs.',
        },
        {
          icon: Globe,
          title: 'Arabic-Speaking Support',
          description:
            'Dedicated Arabic-speaking coordinators throughout your journey. Cultural sensitivity and halal-certified hospital facilities available. Assistance with travel and accommodation.',
        },
        {
          icon: DollarSign,
          title: '65% Cost Savings',
          description:
            'All-inclusive packages with transparent pricing. Save 65% compared to UAE and Saudi Arabia without compromising quality. Multiple payment options and insurance support.',
        },
      ],
    },
    process: {
      title: 'Your Joint Replacement Journey in Bangalore',
      subtitle: 'Step-by-step guide from consultation to recovery',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation & Assessment',
          description:
            'Virtual or in-person consultation with orthopedic surgeon. Complete medical history review, X-rays, MRI scans, and blood tests. Personalized surgical plan and prosthetic selection.',
          duration: 'Day 1-2',
        },
        {
          number: '02',
          title: 'Pre-Operative Preparation',
          description:
            'Comprehensive health evaluation and anesthesia assessment. Pre-surgical physiotherapy to strengthen muscles. Education about post-operative care and expectations.',
          duration: 'Day 3',
        },
        {
          number: '03',
          title: 'Joint Replacement Surgery',
          description:
            'Minimally invasive or robotic-assisted surgery performed under spinal or general anesthesia. Surgery takes 1.5-3 hours depending on complexity. Recovery in ICU or private room.',
          duration: 'Day 4',
        },
        {
          number: '04',
          title: 'Post-Operative Care',
          description:
            'Hospital stay of 4-5 days with 24/7 nursing care. Pain management and infection prevention. Walking with walker assistance within 24-48 hours under physiotherapist guidance.',
          duration: 'Day 4-8',
        },
        {
          number: '05',
          title: 'Physiotherapy & Rehabilitation',
          description:
            "Intensive physiotherapy sessions to restore joint function and mobility. Gait training and muscle strengthening exercises. Education on do's and don'ts for joint protection.",
          duration: 'Day 5-14',
        },
        {
          number: '06',
          title: 'Follow-up & Travel Clearance',
          description:
            'Final assessment by surgeon with X-rays to confirm implant position. Fitness certificate for air travel. Detailed discharge instructions and follow-up plan. Telemedicine support after return.',
          duration: 'Day 12-14',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Joint Replacement in Bangalore',
      items: [
        {
          question: 'How much does knee replacement surgery cost in Bangalore for UAE patients?',
          answer:
            'Knee replacement surgery in Bangalore costs between $5,000-$7,000 USD for UAE patients. This is 65-70% less expensive than knee replacement in UAE ($18,000-$25,000). The cost includes all hospital charges, surgeon fees, FDA-approved prosthetics, medications, physiotherapy, and 4-5 days hospital stay. Additional services like robotic-assisted surgery may cost extra.',
        },
        {
          question: 'What is the success rate of joint replacement surgery in Bangalore?',
          answer:
            'Top orthopedic hospitals in Bangalore report success rates of 95%+ for primary joint replacement procedures including knee, hip, and shoulder replacements. These success rates are comparable to or better than rates in UAE, Saudi Arabia, and Western countries. Revision surgery success rates are 85-90%. Most patients experience significant pain relief and return to normal activities within 3-6 months.',
        },
        {
          question: 'How long is the recovery time after knee or hip replacement?',
          answer:
            'Most patients can walk with assistance within 24-48 hours after surgery. Hospital stay is typically 4-5 days. Initial recovery takes 6-8 weeks with noticeable improvement in mobility and pain reduction. Full recovery and return to normal activities takes 3-6 months. Physical therapy is essential for optimal results and is included in most treatment packages.',
        },
        {
          question: 'Is joint replacement surgery safe in India for international patients?',
          answer:
            'Yes, joint replacement surgery in India is very safe for international patients. Bangalore has JCI-accredited orthopedic hospitals with internationally trained surgeons who have performed thousands of successful procedures. The hospitals use latest technology, FDA-approved implants, and follow international safety protocols. Infection rates are below 1%, comparable to Western hospitals.',
        },
        {
          question: 'Do orthopedic hospitals in Bangalore have Arabic-speaking staff?',
          answer:
            'Yes, major orthopedic hospitals in Bangalore have Arabic-speaking coordinators and translators. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who will assist you throughout your entire treatment journey - from initial consultation, during hospital stay, to post-operative care and follow-up after you return home.',
        },
        {
          question: 'What types of joint replacement implants are used in Bangalore?',
          answer:
            'Bangalore orthopedic hospitals use FDA-approved and CE-certified implants from world-leading brands like Zimmer Biomet, DePuy Synthes, Stryker, and Smith & Nephew. Options include ceramic-on-ceramic, metal-on-polyethylene, and highly cross-linked polyethylene implants. Your surgeon will recommend the best implant based on your age, activity level, and bone quality. All implants have 15-25 year lifespan.',
        },
        {
          question: 'How long do I need to stay in Bangalore after joint replacement surgery?',
          answer:
            'Typical stay in Bangalore is 10-14 days for knee or hip replacement surgery. This includes 1-2 days pre-operative assessment, surgery day, 4-5 days hospital stay, and 5-7 days post-discharge recovery with physiotherapy. Your surgeon will assess your fitness to travel and provide clearance when you are ready. Some patients prefer to stay longer for more intensive physiotherapy.',
        },
        {
          question: 'Can I fly back home after joint replacement surgery?',
          answer:
            'Yes, most patients are fit to fly 10-14 days after surgery once cleared by the surgeon. We recommend business class or seats with extra legroom for comfort. Blood thinner medication will be prescribed to prevent deep vein thrombosis during the flight. Compression stockings and regular leg exercises during flight are advised. Your medical team will provide detailed travel instructions.',
        },
      ],
    },
    hospitals: {
      title: 'Top Orthopedic Hospitals in Bangalore',
      subtitle: 'JCI-accredited orthopedic centers with proven track records',
      cta: 'View All Hospitals',
    },
    finalCta: {
      title: 'Ready to Regain Your Mobility?',
      subtitle:
        'Get a free consultation with our orthopedic surgeons and receive a personalized joint replacement treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Surgery Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'جراحة العظام',
      title: 'جراحة استبدال المفاصل في بنغالور',
      subtitle: 'رعاية عظام عالمية المستوى بتكلفة أقل 65٪',
      description:
        'استعد حركتك ونوعية حياتك مع جراحة استبدال المفاصل المتقدمة في بنغالور. مستشفيات عظام معتمدة من JCI، جراحون مدربون دولياً مع خبرة 15+ سنة، ونسب نجاح 95٪+ للإجراءات الأولية - كل ذلك بجزء بسيط من التكلفة.',
      ctaPrimary: 'احصل على تقدير مجاني للتكلفة',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '65%', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نسبة النجاح', value: '95%+', desc: 'الإجراءات الأولية' },
      experience: { label: 'الخبرة', value: '15+ سنة', desc: 'أفضل الجراحين' },
      patients: { label: 'مرضى الخليج', value: '3000+', desc: 'يعالجون سنوياً' },
    },
    costComparison: {
      title: 'مقارنة تكلفة استبدال المفاصل: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع جراحة استبدال المفاصل في بنغالور مقارنة بدول الخليج',
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
          name: 'استبدال الركبة',
          india: '$5,000 - $7,000',
          uae: '$18,000 - $25,000',
          saudi: '$16,000 - $23,000',
          savings: 'وفر $12,000+',
        },
        {
          name: 'استبدال الورك',
          india: '$6,000 - $8,500',
          uae: '$20,000 - $28,000',
          saudi: '$18,000 - $26,000',
          savings: 'وفر $13,000+',
        },
        {
          name: 'استبدال الكتف',
          india: '$5,500 - $7,500',
          uae: '$17,000 - $24,000',
          saudi: '$15,000 - $22,000',
          savings: 'وفر $11,000+',
        },
        {
          name: 'جراحة المراجعة',
          india: '$7,500 - $10,000',
          uae: '$25,000 - $35,000',
          saudi: '$23,000 - $32,000',
          savings: 'وفر $16,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الإقامة في المستشفى، أتعاب الجراح، الأطراف الاصطناعية، والرعاية بعد العملية. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار بنغالور لجراحة استبدال المفاصل؟',
      reasons: [
        {
          icon: Award,
          title: 'مراكز عظام عالمية المستوى',
          description:
            'مستشفيات معتمدة من JCI مع أقسام عظام حديثة. جراحة بمساعدة الروبوت والملاحة الحاسوبية المتقدمة لوضع الطرف الاصطناعي بدقة.',
        },
        {
          icon: Stethoscope,
          title: 'جراحون ذوو خبرة',
          description:
            'جراحو عظام معتمدون مع أكثر من 15 عاماً من الخبرة. تدريب دولي من الولايات المتحدة والمملكة المتحدة وألمانيا. خبرة في جراحات المراجعة المعقدة.',
        },
        {
          icon: Activity,
          title: 'أطراف اصطناعية متقدمة',
          description:
            'أطراف معتمدة من FDA من علامات عالمية مثل Zimmer و DePuy و Stryker. أحدث الأطراف الاصطناعية الخزفية والتيتانيوم مع عمر 20+ سنة. أطراف مخصصة متاحة.',
        },
        {
          icon: TrendingUp,
          title: 'نسب نجاح عالية',
          description:
            'نسب نجاح 95٪+ لاستبدال المفاصل الأولية. نتائج ممتازة على المدى الطويل مع الحد الأدنى من المضاعفات. برامج متابعة وإعادة تأهيل شاملة.',
        },
        {
          icon: Globe,
          title: 'دعم باللغة العربية',
          description:
            'منسقون متخصصون يتحدثون العربية طوال رحلتك. حساسية ثقافية ومرافق مستشفى معتمدة حلال متاحة. مساعدة في السفر والإقامة.',
        },
        {
          icon: DollarSign,
          title: 'توفير 65٪ في التكلفة',
          description:
            'باقات شاملة مع أسعار شفافة. وفر 65٪ مقارنة بالإمارات والسعودية دون المساومة على الجودة. خيارات دفع متعددة ودعم التأمين.',
        },
      ],
    },
    process: {
      title: 'رحلة استبدال المفاصل في بنغالور',
      subtitle: 'دليل خطوة بخطوة من الاستشارة إلى التعافي',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الأولية والتقييم',
          description:
            'استشارة افتراضية أو شخصية مع جراح العظام. مراجعة كاملة للتاريخ الطبي، أشعة إكس، فحوصات الرنين المغناطيسي، وفحوصات الدم. خطة جراحية شخصية واختيار الطرف الاصطناعي.',
          duration: 'اليوم 1-2',
        },
        {
          number: '02',
          title: 'التحضير قبل العملية',
          description:
            'تقييم صحي شامل وتقييم التخدير. علاج طبيعي قبل الجراحة لتقوية العضلات. تثقيف حول الرعاية بعد العملية والتوقعات.',
          duration: 'اليوم 3',
        },
        {
          number: '03',
          title: 'جراحة استبدال المفاصل',
          description:
            'جراحة طفيفة التوغل أو بمساعدة الروبوت تحت التخدير النخاعي أو العام. تستغرق الجراحة 1.5-3 ساعات حسب التعقيد. التعافي في وحدة العناية المركزة أو غرفة خاصة.',
          duration: 'اليوم 4',
        },
        {
          number: '04',
          title: 'الرعاية بعد العملية',
          description:
            'إقامة في المستشفى لمدة 4-5 أيام مع رعاية تمريضية على مدار الساعة. إدارة الألم والوقاية من العدوى. المشي بمساعدة مشاية خلال 24-48 ساعة تحت إشراف أخصائي العلاج الطبيعي.',
          duration: 'اليوم 4-8',
        },
        {
          number: '05',
          title: 'العلاج الطبيعي وإعادة التأهيل',
          description:
            'جلسات علاج طبيعي مكثفة لاستعادة وظيفة المفصل والحركة. تدريب على المشي وتمارين تقوية العضلات. تثقيف حول ما يجب وما لا يجب فعله لحماية المفصل.',
          duration: 'اليوم 5-14',
        },
        {
          number: '06',
          title: 'المتابعة وتصريح السفر',
          description:
            'تقييم نهائي من الجراح مع أشعة إكس لتأكيد وضع الطرف الاصطناعي. شهادة لياقة للسفر الجوي. تعليمات مفصلة عند الخروج وخطة متابعة. دعم الطب عن بعد بعد العودة.',
          duration: 'اليوم 12-14',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول استبدال المفاصل في بنغالور',
      items: [
        {
          question: 'كم تكلفة جراحة استبدال الركبة في بنغالور لمرضى الإمارات؟',
          answer:
            'تتراوح تكلفة جراحة استبدال الركبة في بنغالور بين 5,000-7,000 دولار أمريكي لمرضى الإمارات. هذا أقل بنسبة 65-70٪ من تكلفة استبدال الركبة في الإمارات (18,000-25,000 دولار). التكلفة تشمل جميع رسوم المستشفى، أتعاب الجراح، الأطراف الاصطناعية المعتمدة من FDA، الأدوية، العلاج الطبيعي، والإقامة في المستشفى لمدة 4-5 أيام.',
        },
        {
          question: 'ما هي نسبة نجاح جراحة استبدال المفاصل في بنغالور؟',
          answer:
            'تقرير أفضل مستشفيات العظام في بنغالور نسب نجاح 95٪+ لجراحات استبدال المفاصل الأولية بما في ذلك استبدال الركبة والورك والكتف. هذه النسب مماثلة أو أفضل من النسب في الإمارات والسعودية والدول الغربية. نسب نجاح جراحات المراجعة 85-90٪. معظم المرضى يعانون من تخفيف كبير للألم ويعودون إلى الأنشطة الطبيعية خلال 3-6 أشهر.',
        },
        {
          question: 'كم هي مدة التعافي بعد استبدال الركبة أو الورك؟',
          answer:
            'معظم المرضى يمكنهم المشي بمساعدة خلال 24-48 ساعة بعد الجراحة. الإقامة في المستشفى عادة 4-5 أيام. التعافي الأولي يستغرق 6-8 أسابيع مع تحسن ملحوظ في الحركة وتقليل الألم. التعافي الكامل والعودة إلى الأنشطة الطبيعية يستغرق 3-6 أشهر. العلاج الطبيعي ضروري للحصول على أفضل النتائج وهو مشمول في معظم باقات العلاج.',
        },
        {
          question: 'هل جراحة استبدال المفاصل آمنة في الهند للمرضى الدوليين؟',
          answer:
            'نعم، جراحة استبدال المفاصل في الهند آمنة جداً للمرضى الدوليين. بنغالور لديها مستشفيات عظام معتمدة من JCI مع جراحين مدربين دولياً أجروا آلاف الإجراءات الناجحة. المستشفيات تستخدم أحدث التقنيات، أطراف معتمدة من FDA، وتتبع بروتوكولات السلامة الدولية. معدلات العدوى أقل من 1٪، مماثلة للمستشفيات الغربية.',
        },
        {
          question: 'هل مستشفيات العظام في بنغالور لديها موظفون يتحدثون العربية؟',
          answer:
            'نعم، مستشفيات العظام الرئيسية في بنغالور لديها منسقون ومترجمون يتحدثون العربية. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية سيساعدونك طوال رحلة العلاج بأكملها - من الاستشارة الأولية، أثناء الإقامة في المستشفى، إلى الرعاية بعد العملية والمتابعة بعد عودتك إلى المنزل.',
        },
        {
          question: 'ما أنواع الأطراف الاصطناعية المستخدمة في بنغالور؟',
          answer:
            'مستشفيات العظام في بنغالور تستخدم أطراف معتمدة من FDA ومعتمدة من CE من علامات عالمية رائدة مثل Zimmer Biomet و DePuy Synthes و Stryker و Smith & Nephew. الخيارات تشمل أطراف خزفية على خزفية، معدنية على بوليثيلين، وبوليثيلين عالي الربط المتقاطع. سيوصي جراحك بأفضل طرف بناءً على عمرك ومستوى نشاطك وجودة العظام. جميع الأطراف لديها عمر 15-25 سنة.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في بنغالور بعد جراحة استبدال المفاصل؟',
          answer:
            'الإقامة النموذجية في بنغالور هي 10-14 يوماً لجراحة استبدال الركبة أو الورك. هذا يشمل 1-2 يوم تقييم قبل العملية، يوم الجراحة، 4-5 أيام إقامة في المستشفى، و5-7 أيام تعافي بعد الخروج مع العلاج الطبيعي. سيقيم جراحك لياقتك للسفر ويوفر التصريح عندما تكون مستعداً. بعض المرضى يفضلون البقاء لفترة أطول للعلاج الطبيعي المكثف.',
        },
        {
          question: 'هل يمكنني السفر بالطائرة إلى المنزل بعد جراحة استبدال المفاصل؟',
          answer:
            'نعم، معظم المرضى لائقون للطيران بعد 10-14 يوماً من الجراحة بمجرد حصولهم على تصريح من الجراح. نوصي بدرجة رجال الأعمال أو مقاعد بمساحة إضافية للساق للراحة. سيتم وصف دواء مضاد للتخثر لمنع تجلط الأوردة العميقة أثناء الرحلة. يُنصح بارتداء جوارب ضاغطة وممارسة تمارين منتظمة للساق أثناء الرحلة. سيوفر فريقك الطبي تعليمات مفصلة للسفر.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات العظام في بنغالور',
      subtitle: 'مراكز عظام معتمدة من JCI مع سجلات حافلة مثبتة',
      cta: 'عرض جميع المستشفيات',
    },
    finalCta: {
      title: 'هل أنت مستعد لاستعادة حركتك؟',
      subtitle:
        'احصل على استشارة مجانية مع جراحي العظام لدينا واحصل على خطة علاج استبدال مفاصل شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل الجراحة',
    },
  },
};

export default function OrthopedicPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Joint Replacement</span>
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
