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
  Eye,
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
      badge: 'Cosmetic Surgery',
      title: 'Cosmetic Surgery in India for GCC Patients',
      subtitle: 'Natural-Looking Results at 70% Lower Cost',
      description:
        'Transform your appearance with world-class cosmetic surgery in Bangalore. Board-certified plastic surgeons, international standards, complete privacy, and natural-looking results - all at a fraction of the cost in UAE and Saudi Arabia.',
      ctaPrimary: 'Get Free Cost Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '70%', desc: 'vs UAE & Saudi' },
      procedures: { label: 'Procedures', value: '10,000+', desc: 'Annually' },
      experience: { label: 'Experience', value: '15+ Years', desc: 'Expert surgeons' },
      satisfaction: { label: 'Satisfaction', value: '98%', desc: 'Patient rating' },
    },
    costComparison: {
      title: 'Cosmetic Surgery Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with cosmetic surgery in India compared to your home country',
      india: 'India (Bangalore)',
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
          name: 'Rhinoplasty (Nose Job)',
          india: '$2,500 - $3,500',
          uae: '$8,000 - $12,000',
          saudi: '$7,000 - $11,000',
          savings: 'Save $5,500+',
        },
        {
          name: 'Liposuction',
          india: '$2,000 - $3,000',
          uae: '$7,000 - $10,000',
          saudi: '$6,000 - $9,000',
          savings: 'Save $5,000+',
        },
        {
          name: 'Breast Augmentation',
          india: '$3,500 - $5,000',
          uae: '$12,000 - $16,000',
          saudi: '$10,000 - $14,000',
          savings: 'Save $8,500+',
        },
        {
          name: 'Facelift',
          india: '$3,000 - $4,500',
          uae: '$10,000 - $15,000',
          saudi: '$9,000 - $13,000',
          savings: 'Save $7,000+',
        },
      ],
      note: '* All costs in USD. Includes surgery, anesthesia, hospital stay, and post-operative care. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose India for Cosmetic Surgery?',
      reasons: [
        {
          icon: Award,
          title: 'Board-Certified Plastic Surgeons',
          description:
            'Internationally trained plastic surgeons with MCh/DNB qualifications. 15+ years of experience performing cosmetic procedures for international patients with proven track records.',
        },
        {
          icon: Shield,
          title: 'International Standards & Safety',
          description:
            'JCI-accredited hospitals with state-of-the-art operation theaters. Latest surgical techniques, advanced equipment, and strict infection control protocols ensuring patient safety.',
        },
        {
          icon: Sparkles,
          title: 'Natural-Looking Results',
          description:
            'Surgeons specialize in subtle enhancements that look natural. Extensive experience with Middle Eastern features and understanding of regional aesthetic preferences.',
        },
        {
          icon: Eye,
          title: 'Privacy & Discretion',
          description:
            'Complete confidentiality with private rooms and separate VIP entrances. Many GCC patients choose India for privacy away from home. Discreet care throughout your journey.',
        },
        {
          icon: Globe,
          title: 'Arabic-Speaking Staff',
          description:
            'Dedicated Arabic-speaking coordinators throughout consultation, surgery, and recovery. Cultural sensitivity and understanding of Middle Eastern patient needs.',
        },
        {
          icon: DollarSign,
          title: '70% Cost Savings',
          description:
            'Same international quality at a fraction of the cost. Transparent pricing with all-inclusive packages. Save thousands without compromising on quality or results.',
        },
      ],
    },
    process: {
      title: 'Your Cosmetic Surgery Journey in India',
      subtitle: 'Step-by-step guide from consultation to recovery',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation & Planning',
          description:
            'Virtual or in-person consultation with plastic surgeon. Discuss your goals, review medical history, examine photos, and create personalized surgical plan.',
          duration: 'Day 1',
        },
        {
          number: '02',
          title: 'Pre-Operative Assessment',
          description:
            'Comprehensive medical evaluation including blood tests, ECG, and imaging if needed. Final discussion of procedure, risks, and expected outcomes.',
          duration: 'Day 2',
        },
        {
          number: '03',
          title: 'Surgery Day',
          description:
            'Procedure performed in state-of-the-art operation theater under anesthesia. Surgery duration varies by procedure (2-4 hours). Post-operative monitoring in recovery room.',
          duration: 'Day 3',
        },
        {
          number: '04',
          title: 'Hospital Recovery',
          description:
            'Stay in private room with 24/7 nursing care. Pain management, wound care, and monitoring. Most procedures require 1-2 nights hospital stay.',
          duration: 'Day 3-4',
        },
        {
          number: '05',
          title: 'Post-Operative Care',
          description:
            'Daily dressing changes, medication, and surgeon follow-up visits. Stay near hospital for 7-14 days depending on procedure. Swelling and bruising management.',
          duration: 'Week 1-2',
        },
        {
          number: '06',
          title: 'Follow-Up & Results',
          description:
            'Final check-up before travel home. Remote follow-up via video calls. Final results visible after swelling subsides (6-12 months). Long-term support provided.',
          duration: 'Week 2+',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Cosmetic Surgery in India',
      items: [
        {
          question:
            'How much does cosmetic surgery cost in India compared to UAE and Saudi Arabia?',
          answer:
            'Cosmetic surgery in India costs 60-70% less than in UAE and Saudi Arabia. Rhinoplasty costs $2,500-$3,500 in India vs $8,000-$12,000 in UAE. Liposuction costs $2,000-$3,000 vs $7,000-$10,000. Breast augmentation costs $3,500-$5,000 vs $12,000-$16,000. Facelift costs $3,000-$4,500 vs $10,000-$15,000. The significant cost difference is due to lower operational costs while maintaining the same international quality standards.',
        },
        {
          question: 'Are cosmetic surgery results in India natural-looking?',
          answer:
            'Yes, Indian plastic surgeons specialize in creating natural-looking results that enhance your features rather than dramatically change them. They have extensive experience treating Middle Eastern patients and understand regional aesthetic preferences. Surgeons use advanced techniques and take a conservative approach to ensure results look natural and harmonious with your facial features or body proportions.',
        },
        {
          question: 'Is cosmetic surgery safe in India for international patients?',
          answer:
            'Yes, cosmetic surgery in India is very safe for foreign patients. Top hospitals in Bangalore are JCI-accredited with internationally certified plastic surgeons. They follow strict safety protocols, use advanced surgical equipment, and maintain international quality standards. Infection rates and complication rates are comparable to or better than Western countries. The hospitals have 24/7 emergency care and intensive care units.',
        },
        {
          question: 'How long do I need to stay in India for cosmetic surgery?',
          answer:
            'The stay duration depends on the procedure. Rhinoplasty requires 7-10 days, liposuction 5-7 days, breast augmentation 7-10 days, and facelift 10-14 days. This includes consultation, surgery, initial recovery, and follow-up visits. Most patients stay near the hospital for the first week, then can move to a hotel for the remaining period. You need to be cleared by your surgeon before flying home.',
        },
        {
          question: 'Do cosmetic surgery centers in India speak Arabic?',
          answer:
            'Yes, major cosmetic surgery hospitals in Bangalore have Arabic-speaking patient coordinators and translators available throughout your stay. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who will assist you from initial consultation through surgery and recovery. They ensure clear communication with your surgeon and medical team.',
        },
        {
          question: 'What is included in cosmetic surgery packages in India?',
          answer:
            'Comprehensive packages include: pre-operative consultations, surgery fees, surgeon fees, anesthesia, operation theater charges, hospital stay, medications, dressings, post-operative care, follow-up visits, and airport transfers. Some packages include accommodation for the recovery period. Travel, visa, and personal expenses are separate. We provide detailed package breakdowns with no hidden costs.',
        },
        {
          question: 'Can I maintain complete privacy during cosmetic surgery in India?',
          answer:
            'Yes, privacy and discretion are paramount. Hospitals offer private rooms, separate VIP entrances, and complete confidentiality agreements. Many GCC patients specifically choose India for cosmetic surgery because it offers privacy away from their home countries. Your information is never shared, and you can use a pseudonym if preferred. Private recovery suites are available.',
        },
        {
          question: 'What qualifications do plastic surgeons in India have?',
          answer:
            'Top plastic surgeons in India hold MCh (Master of Chirurgiae) or DNB (Diplomate of National Board) in Plastic Surgery, which are the highest qualifications. Many have trained internationally at institutions in USA, UK, Europe, or Australia. They are board-certified, members of international plastic surgery associations like ISAPS or ASPS, and have 15+ years of experience. Most surgeons regularly attend international conferences and training programs.',
        },
      ],
    },
    hospitals: {
      title: 'Top Cosmetic Surgery Hospitals in Bangalore',
      subtitle: 'JCI-accredited hospitals with expert plastic surgeons',
      cta: 'View All Hospitals',
    },
    finalCta: {
      title: 'Ready to Transform Your Appearance?',
      subtitle:
        'Get a free consultation with our expert plastic surgeons and receive a personalized treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Surgery Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'جراحات تجميل',
      title: 'جراحات تجميل في الهند لمرضى الخليج',
      subtitle: 'نتائج طبيعية بتكلفة أقل 70٪',
      description:
        'حول مظهرك مع جراحات تجميل عالمية المستوى في بنغالور. جراحون تجميل معتمدون، معايير دولية، خصوصية تامة، ونتائج طبيعية - كل ذلك بجزء بسيط من التكلفة في الإمارات والسعودية.',
      ctaPrimary: 'احصل على تقدير مجاني للتكلفة',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '70%', desc: 'مقارنة بالإمارات والسعودية' },
      procedures: { label: 'العمليات', value: '10,000+', desc: 'سنوياً' },
      experience: { label: 'الخبرة', value: '15+ سنة', desc: 'جراحون خبراء' },
      satisfaction: { label: 'الرضا', value: '98%', desc: 'تقييم المرضى' },
    },
    costComparison: {
      title: 'مقارنة تكلفة جراحات التجميل: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع جراحات التجميل في الهند مقارنة ببلدك',
      india: 'الهند (بنغالور)',
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
          name: 'عملية تجميل الأنف',
          india: '$2,500 - $3,500',
          uae: '$8,000 - $12,000',
          saudi: '$7,000 - $11,000',
          savings: 'وفر $5,500+',
        },
        {
          name: 'شفط الدهون',
          india: '$2,000 - $3,000',
          uae: '$7,000 - $10,000',
          saudi: '$6,000 - $9,000',
          savings: 'وفر $5,000+',
        },
        {
          name: 'تكبير الثدي',
          india: '$3,500 - $5,000',
          uae: '$12,000 - $16,000',
          saudi: '$10,000 - $14,000',
          savings: 'وفر $8,500+',
        },
        {
          name: 'شد الوجه',
          india: '$3,000 - $4,500',
          uae: '$10,000 - $15,000',
          saudi: '$9,000 - $13,000',
          savings: 'وفر $7,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الجراحة والتخدير والإقامة في المستشفى والرعاية بعد العملية. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار الهند لجراحات التجميل؟',
      reasons: [
        {
          icon: Award,
          title: 'جراحو تجميل معتمدون',
          description:
            'جراحو تجميل مدربون دولياً بمؤهلات MCh/DNB. أكثر من 15 عاماً من الخبرة في إجراء عمليات تجميلية للمرضى الدوليين مع سجلات حافلة مثبتة.',
        },
        {
          icon: Shield,
          title: 'معايير دولية وسلامة',
          description:
            'مستشفيات معتمدة من JCI مع غرف عمليات حديثة. أحدث التقنيات الجراحية، معدات متقدمة، وبروتوكولات صارمة للسيطرة على العدوى لضمان سلامة المرضى.',
        },
        {
          icon: Sparkles,
          title: 'نتائج طبيعية المظهر',
          description:
            'يتخصص الجراحون في تحسينات دقيقة تبدو طبيعية. خبرة واسعة مع ملامح الشرق الأوسط وفهم التفضيلات الجمالية الإقليمية.',
        },
        {
          icon: Eye,
          title: 'خصوصية وسرية',
          description:
            'سرية تامة مع غرف خاصة ومداخل منفصلة لكبار الشخصيات. العديد من مرضى الخليج يختارون الهند للخصوصية بعيداً عن الوطن. رعاية سرية طوال رحلتك.',
        },
        {
          icon: Globe,
          title: 'طاقم يتحدث العربية',
          description:
            'منسقون متخصصون يتحدثون العربية طوال الاستشارة والجراحة والتعافي. حساسية ثقافية وفهم لاحتياجات المرضى من الشرق الأوسط.',
        },
        {
          icon: DollarSign,
          title: 'توفير 70٪ من التكلفة',
          description:
            'نفس الجودة الدولية بجزء بسيط من التكلفة. أسعار شفافة مع باقات شاملة. وفر آلاف الدولارات دون المساومة على الجودة أو النتائج.',
        },
      ],
    },
    process: {
      title: 'رحلة جراحات التجميل في الهند',
      subtitle: 'دليل خطوة بخطوة من الاستشارة إلى التعافي',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الأولية والتخطيط',
          description:
            'استشارة افتراضية أو شخصية مع جراح التجميل. مناقشة أهدافك، مراجعة التاريخ الطبي، فحص الصور، وإنشاء خطة جراحية شخصية.',
          duration: 'اليوم 1',
        },
        {
          number: '02',
          title: 'التقييم قبل العملية',
          description:
            'تقييم طبي شامل يشمل فحوصات الدم، تخطيط القلب، والتصوير إذا لزم الأمر. مناقشة نهائية للإجراء والمخاطر والنتائج المتوقعة.',
          duration: 'اليوم 2',
        },
        {
          number: '03',
          title: 'يوم الجراحة',
          description:
            'يتم إجراء العملية في غرفة عمليات حديثة تحت التخدير. مدة الجراحة تختلف حسب الإجراء (2-4 ساعات). مراقبة بعد العملية في غرفة التعافي.',
          duration: 'اليوم 3',
        },
        {
          number: '04',
          title: 'التعافي في المستشفى',
          description:
            'الإقامة في غرفة خاصة مع رعاية تمريضية على مدار الساعة. إدارة الألم، العناية بالجروح، والمراقبة. معظم الإجراءات تتطلب إقامة ليلة أو ليلتين.',
          duration: 'اليوم 3-4',
        },
        {
          number: '05',
          title: 'الرعاية بعد العملية',
          description:
            'تغيير الضمادات يومياً، الأدوية، وزيارات متابعة من الجراح. البقاء بالقرب من المستشفى لمدة 7-14 يوماً حسب الإجراء. إدارة التورم والكدمات.',
          duration: 'الأسبوع 1-2',
        },
        {
          number: '06',
          title: 'المتابعة والنتائج',
          description:
            'فحص نهائي قبل السفر إلى الوطن. متابعة عن بعد عبر مكالمات الفيديو. النتائج النهائية تظهر بعد زوال التورم (6-12 شهراً). دعم طويل الأمد متاح.',
          duration: 'الأسبوع 2+',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول جراحات التجميل في الهند',
      items: [
        {
          question: 'كم تكلفة جراحات التجميل في الهند مقارنة بالإمارات والسعودية؟',
          answer:
            'تكلفة جراحات التجميل في الهند أقل بنسبة 60-70٪ من الإمارات والسعودية. عملية تجميل الأنف تكلف 2,500-3,500 دولار في الهند مقابل 8,000-12,000 دولار في الإمارات. شفط الدهون يكلف 2,000-3,000 دولار مقابل 7,000-10,000 دولار. تكبير الثدي يكلف 3,500-5,000 دولار مقابل 12,000-16,000 دولار. شد الوجه يكلف 3,000-4,500 دولار مقابل 10,000-15,000 دولار. الفرق الكبير في التكلفة يعود لانخفاض التكاليف التشغيلية مع الحفاظ على نفس معايير الجودة الدولية.',
        },
        {
          question: 'هل نتائج جراحات التجميل في الهند طبيعية المظهر؟',
          answer:
            'نعم، جراحو التجميل الهنود متخصصون في خلق نتائج طبيعية المظهر تعزز ملامحك بدلاً من تغييرها بشكل كبير. لديهم خبرة واسعة في علاج مرضى الشرق الأوسط ويفهمون التفضيلات الجمالية الإقليمية. يستخدم الجراحون تقنيات متقدمة ويتبعون نهجاً محافظاً لضمان أن تبدو النتائج طبيعية ومتناسقة مع ملامح وجهك أو نسب جسمك.',
        },
        {
          question: 'هل جراحات التجميل آمنة في الهند للمرضى الدوليين؟',
          answer:
            'نعم، جراحات التجميل في الهند آمنة جداً للمرضى الأجانب. أفضل المستشفيات في بنغالور معتمدة من JCI مع جراحي تجميل معتمدين دولياً. يتبعون بروتوكولات السلامة الصارمة، يستخدمون معدات جراحية متقدمة، ويحافظون على معايير الجودة الدولية. معدلات العدوى والمضاعفات مماثلة أو أفضل من الدول الغربية.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في الهند لجراحات التجميل؟',
          answer:
            'مدة الإقامة تعتمد على الإجراء. عملية تجميل الأنف تتطلب 7-10 أيام، شفط الدهون 5-7 أيام، تكبير الثدي 7-10 أيام، وشد الوجه 10-14 يوماً. هذا يشمل الاستشارة والجراحة والتعافي الأولي وزيارات المتابعة. معظم المرضى يبقون بالقرب من المستشفى للأسبوع الأول، ثم يمكنهم الانتقال إلى فندق للفترة المتبقية.',
        },
        {
          question: 'هل مراكز جراحات التجميل في الهند تتحدث العربية؟',
          answer:
            'نعم، مستشفيات جراحات التجميل الرئيسية في بنغالور لديها منسقون مرضى ومترجمون يتحدثون العربية طوال إقامتك. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية سيساعدونك من الاستشارة الأولية حتى الجراحة والتعافي.',
        },
        {
          question: 'ما هو المشمول في باقات جراحات التجميل في الهند؟',
          answer:
            'الباقات الشاملة تشمل: استشارات ما قبل العملية، رسوم الجراحة، رسوم الجراح، التخدير، رسوم غرفة العمليات، الإقامة في المستشفى، الأدوية، الضمادات، الرعاية بعد العملية، زيارات المتابعة، والنقل من وإلى المطار. بعض الباقات تشمل الإقامة لفترة التعافي.',
        },
        {
          question: 'هل يمكنني الحفاظ على خصوصية تامة أثناء جراحات التجميل في الهند؟',
          answer:
            'نعم، الخصوصية والسرية لها الأولوية القصوى. المستشفيات توفر غرفاً خاصة، مداخل منفصلة لكبار الشخصيات، واتفاقيات سرية تامة. العديد من مرضى الخليج يختارون الهند تحديداً لجراحات التجميل لأنها توفر الخصوصية بعيداً عن بلدانهم. معلوماتك لا تُشارك أبداً، ويمكنك استخدام اسم مستعار إذا أردت.',
        },
        {
          question: 'ما هي مؤهلات جراحي التجميل في الهند؟',
          answer:
            'أفضل جراحي التجميل في الهند يحملون MCh (ماجستير الجراحة) أو DNB (دبلوم المجلس الوطني) في جراحة التجميل، وهي أعلى المؤهلات. العديد منهم تدربوا دولياً في مؤسسات في الولايات المتحدة أو المملكة المتحدة أو أوروبا أو أستراليا. هم معتمدون من المجلس، أعضاء في جمعيات جراحة التجميل الدولية مثل ISAPS أو ASPS، ولديهم أكثر من 15 عاماً من الخبرة.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات جراحات التجميل في بنغالور',
      subtitle: 'مستشفيات معتمدة من JCI مع جراحي تجميل خبراء',
      cta: 'عرض جميع المستشفيات',
    },
    finalCta: {
      title: 'هل أنت مستعد لتحويل مظهرك؟',
      subtitle:
        'احصل على استشارة مجانية مع جراحي التجميل الخبراء لدينا واحصل على خطة علاج شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل الجراحة',
    },
  },
};

export default function CosmeticPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Cosmetic Surgery</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
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
