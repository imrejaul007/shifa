'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Heart,
  Users,
  Clock,
  CheckCircle2,
  Shield,
  Globe,
  TrendingUp,
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
      badge: 'Cardiac Care',
      title: 'Heart Surgery in Bangalore',
      subtitle: 'World-Class Cardiac Care at 70% Lower Cost',
      description:
        'Restore your heart health with advanced cardiac surgery in Bangalore. JCI-accredited hospitals, internationally trained cardiac surgeons, and success rates exceeding 98% - all at a fraction of the cost.',
      ctaPrimary: 'Get Free Cardiac Cost Estimate',
      ctaSecondary: 'Book Consultation',
    },
    stats: {
      costSaving: { label: 'Cost Savings', value: '60-70%', desc: 'vs UAE & Saudi' },
      successRate: { label: 'Success Rate', value: '98%+', desc: 'Routine procedures' },
      experience: { label: 'Experience', value: '15+ Years', desc: 'Top cardiac surgeons' },
      patients: { label: 'GCC Patients', value: '5000+', desc: 'Treated annually' },
    },
    costComparison: {
      title: 'Heart Surgery Cost Comparison: India vs UAE vs Saudi Arabia',
      subtitle:
        'See how much you can save with cardiac surgery in Bangalore compared to your home country',
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
          name: 'Coronary Artery Bypass (CABG)',
          india: '$6,000 - $8,500',
          uae: '$20,000 - $30,000',
          saudi: '$18,000 - $28,000',
          savings: 'Save $14,000+',
        },
        {
          name: 'Heart Valve Replacement',
          india: '$7,000 - $10,000',
          uae: '$25,000 - $35,000',
          saudi: '$22,000 - $32,000',
          savings: 'Save $18,000+',
        },
        {
          name: 'Angioplasty & Stenting',
          india: '$3,000 - $5,000',
          uae: '$12,000 - $18,000',
          saudi: '$10,000 - $16,000',
          savings: 'Save $9,000+',
        },
        {
          name: 'Pacemaker Implantation',
          india: '$5,000 - $7,000',
          uae: '$15,000 - $22,000',
          saudi: '$13,000 - $20,000',
          savings: 'Save $10,000+',
        },
      ],
      note: '* All costs in USD. Includes surgery, hospital stay, and medications. Travel and accommodation costs separate.',
    },
    overview: {
      title: 'Why Choose Bangalore for Heart Surgery?',
      reasons: [
        {
          icon: Shield,
          title: 'World-Class Cardiac Centers',
          description:
            'JCI-accredited cardiac hospitals with state-of-the-art catheterization labs and operation theaters. Advanced technology including robotic surgery systems and 3D imaging.',
        },
        {
          icon: Users,
          title: 'Experienced Cardiac Surgeons',
          description:
            'Board-certified cardiac surgeons with 15+ years of experience and international training from USA, UK, and Europe. Specialized in complex cardiac procedures.',
        },
        {
          icon: Activity,
          title: 'Advanced Technology',
          description:
            'Latest cardiac care technology including minimally invasive robotic surgery, transcatheter procedures, and hybrid operation theaters for maximum precision.',
        },
        {
          icon: TrendingUp,
          title: 'High Success Rates',
          description:
            '98%+ success rates for routine cardiac procedures like CABG and valve replacement. 90-95% success for complex surgeries, matching top international standards.',
        },
        {
          icon: Globe,
          title: 'Arabic-Speaking Support',
          description:
            'Dedicated Arabic-speaking medical coordinators and translators. Cultural sensitivity and halal-certified hospital facilities for GCC patients.',
        },
        {
          icon: DollarSign,
          title: 'Transparent Pricing',
          description:
            'All-inclusive packages with no hidden costs. Save 60-70% compared to UAE and Saudi Arabia while receiving world-class cardiac care.',
        },
      ],
    },
    process: {
      title: 'Your Cardiac Surgery Journey in Bangalore',
      subtitle: 'Step-by-step guide to your heart surgery treatment',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation & Evaluation',
          description:
            'Virtual or in-person consultation with cardiac surgeon. Review of medical history, cardiac tests (ECG, echo, angiogram), and personalized treatment plan discussion.',
          duration: 'Day 1-2',
        },
        {
          number: '02',
          title: 'Pre-Operative Assessment',
          description:
            'Comprehensive cardiac evaluation including blood tests, chest X-ray, cardiac catheterization if needed. Anesthesia consultation and surgical preparation.',
          duration: 'Day 3-4',
        },
        {
          number: '03',
          title: 'Cardiac Surgery',
          description:
            'Surgery performed in state-of-the-art operation theater by experienced cardiac team. Duration varies by procedure (3-6 hours). Family kept informed throughout.',
          duration: 'Day 5',
        },
        {
          number: '04',
          title: 'ICU Recovery',
          description:
            'Post-operative monitoring in cardiac ICU with 24/7 specialist care. Ventilator support, medication management, and continuous cardiac monitoring.',
          duration: 'Day 5-7',
        },
        {
          number: '05',
          title: 'Hospital Recovery',
          description:
            'Transfer to private room for continued recovery. Physical therapy, cardiac rehabilitation, wound care, and medication adjustment. Family can stay with patient.',
          duration: 'Day 8-14',
        },
        {
          number: '06',
          title: 'Follow-up & Return Home',
          description:
            'Final cardiac assessment, discharge planning, and detailed care instructions. Medications provided. Video follow-ups scheduled. Cleared for travel with medical escort if needed.',
          duration: 'Day 15-21',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions About Heart Surgery in Bangalore',
      items: [
        {
          question: 'How much does heart surgery cost in India for UAE patients?',
          answer:
            'Heart surgery costs in India are 60-70% lower than UAE. CABG (bypass surgery) costs $6,000-$8,500 in India compared to $20,000-$30,000 in UAE. Heart valve replacement costs $7,000-$10,000 vs $25,000-$35,000 in UAE. Angioplasty costs $3,000-$5,000 vs $12,000-$18,000 in UAE. These costs include surgery, hospital stay, ICU care, medications, and follow-up consultations.',
        },
        {
          question: 'Is heart surgery safe in India for foreign patients?',
          answer:
            'Yes, heart surgery in India is extremely safe for foreign patients. Bangalore has multiple JCI-accredited cardiac hospitals with internationally trained surgeons and advanced technology. Success rates exceed 98% for routine procedures like CABG and valve replacement, matching or exceeding rates in Western countries. Cardiac hospitals follow international protocols and have dedicated international patient departments.',
        },
        {
          question: 'What is the success rate of cardiac surgery in Bangalore?',
          answer:
            'Top cardiac hospitals in Bangalore report excellent success rates: 98-99% for CABG (bypass surgery), 97-98% for heart valve replacement, 95-97% for complex procedures, and 99%+ for angioplasty. These success rates are comparable to top cardiac centers in USA and Europe. Surgeons have performed thousands of successful cardiac procedures.',
        },
        {
          question: 'How long do I need to stay in India for heart surgery?',
          answer:
            'Most patients stay 14-21 days for heart surgery. This includes 2-3 days for pre-operative assessment, 1 day for surgery, 2-3 days in cardiac ICU, 5-7 days in hospital recovery, and 5-8 days for post-operative monitoring before travel clearance. Minimally invasive procedures may require shorter stays (10-14 days). Complex surgeries may need longer recovery (3-4 weeks).',
        },
        {
          question: 'Do cardiac hospitals in Bangalore have Arabic-speaking staff?',
          answer:
            'Yes, major cardiac hospitals in Bangalore have Arabic-speaking coordinators, translators, and nursing staff experienced with GCC patients. Shifa AlHind provides dedicated Arabic-speaking medical coordinators who assist throughout your cardiac journey - from pre-surgery consultation to post-operative care and follow-up. All medical reports are translated to Arabic if requested.',
        },
        {
          question: 'What types of heart surgery are available in Bangalore?',
          answer:
            'Bangalore cardiac hospitals offer comprehensive heart surgery options including: Coronary Artery Bypass Graft (CABG) - single, double, triple, or quadruple bypass; Heart Valve Replacement/Repair - mitral, aortic, tricuspid valves; Angioplasty and Stenting; Pacemaker/ICD Implantation; Congenital Heart Defect Correction; Minimally Invasive and Robotic Cardiac Surgery; Heart Transplantation; and Treatment for heart failure, arrhythmias, and aortic aneurysms.',
        },
        {
          question: 'How do I arrange medical visa for heart surgery in India?',
          answer:
            "Shifa AlHind provides complete medical visa assistance for cardiac patients. We prepare required medical documents including hospital invitation letter, cardiac surgeon's recommendation, and treatment cost estimate. You apply for e-Medical Visa online with these documents. Processing takes 3-5 business days. Medical visa is valid for 60 days with triple entry and can be extended if needed. We guide you through each step of the visa process.",
        },
        {
          question: 'What is the recovery time after heart surgery in India?',
          answer:
            'Recovery timeline varies by procedure type. CABG and valve surgery require 6-8 weeks for full recovery. Angioplasty patients recover in 1-2 weeks. Pacemaker implantation recovery takes 2-3 weeks. Initial hospital stay is 7-10 days. You can travel home after 14-21 days with medical clearance. Our cardiac rehabilitation team provides detailed post-operative care instructions. Follow-up consultations via video call are scheduled at 1 week, 4 weeks, and 12 weeks post-surgery.',
        },
      ],
    },
    hospitals: {
      title: 'Top Cardiac Hospitals in Bangalore',
      subtitle: 'JCI-accredited cardiac centers with proven track records',
      cta: 'View All Hospitals',
    },
    finalCta: {
      title: 'Ready to Start Your Cardiac Care Journey?',
      subtitle:
        'Get a free consultation with our cardiac specialists and receive a personalized treatment plan with transparent cost estimate.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'Download Cardiac Guide',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', treatments: 'العلاجات' },
    hero: {
      badge: 'رعاية القلب',
      title: 'جراحة القلب في بنغالور',
      subtitle: 'رعاية قلبية عالمية المستوى بتكلفة أقل 70٪',
      description:
        'استعد صحة قلبك مع جراحة القلب المتقدمة في بنغالور. مستشفيات معتمدة من JCI، جراحو قلب مدربون دولياً، ونسب نجاح تتجاوز 98٪ - كل ذلك بجزء بسيط من التكلفة.',
      ctaPrimary: 'احصل على تقدير مجاني لتكلفة جراحة القلب',
      ctaSecondary: 'احجز استشارة',
    },
    stats: {
      costSaving: { label: 'توفير التكلفة', value: '60-70%', desc: 'مقارنة بالإمارات والسعودية' },
      successRate: { label: 'نسبة النجاح', value: '98%+', desc: 'الإجراءات الروتينية' },
      experience: { label: 'الخبرة', value: '15+ سنة', desc: 'أفضل جراحي القلب' },
      patients: { label: 'مرضى الخليج', value: '5000+', desc: 'يعالجون سنوياً' },
    },
    costComparison: {
      title: 'مقارنة تكلفة جراحة القلب: الهند مقابل الإمارات مقابل السعودية',
      subtitle: 'شاهد كم يمكنك توفيره مع جراحة القلب في بنغالور مقارنة ببلدك',
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
          name: 'تحويل الشريان التاجي (CABG)',
          india: '$6,000 - $8,500',
          uae: '$20,000 - $30,000',
          saudi: '$18,000 - $28,000',
          savings: 'وفر $14,000+',
        },
        {
          name: 'استبدال صمام القلب',
          india: '$7,000 - $10,000',
          uae: '$25,000 - $35,000',
          saudi: '$22,000 - $32,000',
          savings: 'وفر $18,000+',
        },
        {
          name: 'قسطرة ودعامات القلب',
          india: '$3,000 - $5,000',
          uae: '$12,000 - $18,000',
          saudi: '$10,000 - $16,000',
          savings: 'وفر $9,000+',
        },
        {
          name: 'زرع جهاز تنظيم ضربات القلب',
          india: '$5,000 - $7,000',
          uae: '$15,000 - $22,000',
          saudi: '$13,000 - $20,000',
          savings: 'وفر $10,000+',
        },
      ],
      note: '* جميع التكاليف بالدولار الأمريكي. تشمل الجراحة والإقامة في المستشفى والأدوية. تكاليف السفر والإقامة منفصلة.',
    },
    overview: {
      title: 'لماذا تختار بنغالور لجراحة القلب؟',
      reasons: [
        {
          icon: Shield,
          title: 'مراكز قلبية عالمية المستوى',
          description:
            'مستشفيات قلبية معتمدة من JCI مع مختبرات قسطرة وغرف عمليات حديثة. تقنية متقدمة تشمل أنظمة الجراحة الروبوتية والتصوير ثلاثي الأبعاد.',
        },
        {
          icon: Users,
          title: 'جراحو قلب ذوو خبرة',
          description:
            'جراحو قلب معتمدون مع أكثر من 15 عاماً من الخبرة وتدريب دولي من الولايات المتحدة والمملكة المتحدة وأوروبا. متخصصون في إجراءات القلب المعقدة.',
        },
        {
          icon: Activity,
          title: 'تقنية متقدمة',
          description:
            'أحدث تقنيات رعاية القلب بما في ذلك الجراحة الروبوتية طفيفة التوغل، الإجراءات عبر القسطرة، وغرف عمليات هجينة لأقصى دقة.',
        },
        {
          icon: TrendingUp,
          title: 'نسب نجاح عالية',
          description:
            'نسب نجاح 98%+ للإجراءات القلبية الروتينية مثل CABG واستبدال الصمام. 90-95٪ نجاح للجراحات المعقدة، مماثلة لأفضل المعايير الدولية.',
        },
        {
          icon: Globe,
          title: 'دعم باللغة العربية',
          description:
            'منسقون طبيون ومترجمون متخصصون يتحدثون العربية. حساسية ثقافية ومرافق مستشفى معتمدة حلال لمرضى الخليج.',
        },
        {
          icon: DollarSign,
          title: 'أسعار شفافة',
          description:
            'باقات شاملة بدون تكاليف خفية. وفر 60-70٪ مقارنة بالإمارات والسعودية مع الحصول على رعاية قلبية عالمية المستوى.',
        },
      ],
    },
    process: {
      title: 'رحلة جراحة القلب في بنغالور',
      subtitle: 'دليل خطوة بخطوة لعلاج جراحة القلب الخاص بك',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الأولية والتقييم',
          description:
            'استشارة افتراضية أو شخصية مع جراح القلب. مراجعة التاريخ الطبي، فحوصات القلب (ECG، الإيكو، تصوير الأوعية)، ومناقشة خطة العلاج الشخصية.',
          duration: 'اليوم 1-2',
        },
        {
          number: '02',
          title: 'التقييم قبل الجراحة',
          description:
            'تقييم قلبي شامل يشمل فحوصات الدم، أشعة الصدر، قسطرة القلب إذا لزم الأمر. استشارة التخدير والتحضير للجراحة.',
          duration: 'اليوم 3-4',
        },
        {
          number: '03',
          title: 'جراحة القلب',
          description:
            'يتم إجراء الجراحة في غرفة عمليات حديثة من قبل فريق قلب ذي خبرة. المدة تختلف حسب الإجراء (3-6 ساعات). يتم إبقاء العائلة على اطلاع طوال الوقت.',
          duration: 'اليوم 5',
        },
        {
          number: '04',
          title: 'التعافي في العناية المركزة',
          description:
            'المراقبة بعد الجراحة في وحدة العناية المركزة للقلب مع رعاية متخصصة على مدار 24/7. دعم جهاز التنفس، إدارة الأدوية، والمراقبة القلبية المستمرة.',
          duration: 'اليوم 5-7',
        },
        {
          number: '05',
          title: 'التعافي في المستشفى',
          description:
            'النقل إلى غرفة خاصة لمواصلة التعافي. العلاج الطبيعي، إعادة تأهيل القلب، العناية بالجروح، وتعديل الأدوية. يمكن للعائلة البقاء مع المريض.',
          duration: 'اليوم 8-14',
        },
        {
          number: '06',
          title: 'المتابعة والعودة إلى الوطن',
          description:
            'تقييم قلبي نهائي، التخطيط للخروج، وتعليمات رعاية مفصلة. توفير الأدوية. جدولة متابعات عبر الفيديو. الموافقة على السفر مع مرافق طبي إذا لزم الأمر.',
          duration: 'اليوم 15-21',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة حول جراحة القلب في بنغالور',
      items: [
        {
          question: 'كم تكلفة جراحة القلب في الهند لمرضى الإمارات؟',
          answer:
            'تكاليف جراحة القلب في الهند أقل بنسبة 60-70٪ من الإمارات. جراحة CABG (تحويل مسار) تكلف 6,000-8,500 دولار في الهند مقارنة بـ 20,000-30,000 دولار في الإمارات. استبدال صمام القلب يكلف 7,000-10,000 دولار مقابل 25,000-35,000 دولار في الإمارات. القسطرة تكلف 3,000-5,000 دولار مقابل 12,000-18,000 دولار في الإمارات. هذه التكاليف تشمل الجراحة، الإقامة في المستشفى، العناية المركزة، الأدوية، والاستشارات المتابعة.',
        },
        {
          question: 'هل جراحة القلب آمنة في الهند للمرضى الأجانب؟',
          answer:
            'نعم، جراحة القلب في الهند آمنة للغاية للمرضى الأجانب. بنغالور لديها مستشفيات قلبية متعددة معتمدة من JCI مع جراحين مدربين دولياً وتقنية متقدمة. نسب النجاح تتجاوز 98٪ للإجراءات الروتينية مثل CABG واستبدال الصمام، مماثلة أو تتجاوز المعدلات في الدول الغربية. مستشفيات القلب تتبع البروتوكولات الدولية ولديها أقسام مخصصة للمرضى الدوليين.',
        },
        {
          question: 'ما هي نسبة نجاح جراحة القلب في بنغالور؟',
          answer:
            'أفضل مستشفيات القلب في بنغالور تبلغ عن نسب نجاح ممتازة: 98-99٪ لجراحة CABG (تحويل المسار)، 97-98٪ لاستبدال صمام القلب، 95-97٪ للإجراءات المعقدة، و99%+ للقسطرة. هذه نسب النجاح مماثلة لأفضل مراكز القلب في الولايات المتحدة وأوروبا. الجراحون أجروا آلاف الإجراءات القلبية الناجحة.',
        },
        {
          question: 'كم من الوقت أحتاج للبقاء في الهند لجراحة القلب؟',
          answer:
            'معظم المرضى يبقون 14-21 يوماً لجراحة القلب. يشمل ذلك 2-3 أيام للتقييم قبل الجراحة، يوم واحد للجراحة، 2-3 أيام في العناية المركزة للقلب، 5-7 أيام في التعافي بالمستشفى، و5-8 أيام للمراقبة بعد الجراحة قبل السماح بالسفر. الإجراءات طفيفة التوغل قد تتطلب إقامات أقصر (10-14 يوماً). الجراحات المعقدة قد تحتاج تعافي أطول (3-4 أسابيع).',
        },
        {
          question: 'هل مستشفيات القلب في بنغالور لديها موظفون يتحدثون العربية؟',
          answer:
            'نعم، مستشفيات القلب الرئيسية في بنغالور لديها منسقون ومترجمون وطاقم تمريض يتحدثون العربية وذوي خبرة مع مرضى الخليج. شفاء الهند توفر منسقين طبيين متخصصين يتحدثون العربية يساعدون طوال رحلة القلب الخاصة بك - من الاستشارة قبل الجراحة إلى الرعاية بعد الجراحة والمتابعة. جميع التقارير الطبية تترجم إلى العربية إذا طلب ذلك.',
        },
        {
          question: 'ما أنواع جراحة القلب المتاحة في بنغالور؟',
          answer:
            'مستشفيات القلب في بنغالور تقدم خيارات جراحة قلب شاملة بما في ذلك: تحويل مسار الشريان التاجي (CABG) - تحويل واحد أو مزدوج أو ثلاثي أو رباعي؛ استبدال/إصلاح صمام القلب - الصمامات التاجية والأبهرية والثلاثية؛ القسطرة والدعامات؛ زرع جهاز تنظيم ضربات القلب/ICD؛ تصحيح عيوب القلب الخلقية؛ جراحة القلب طفيفة التوغل والروبوتية؛ زراعة القلب؛ وعلاج فشل القلب، اضطراب نظم القلب، وتمدد الأوعية الدموية الأبهري.',
        },
        {
          question: 'كيف أرتب التأشيرة الطبية لجراحة القلب في الهند؟',
          answer:
            'شفاء الهند توفر مساعدة كاملة للتأشيرة الطبية لمرضى القلب. نحن نعد المستندات الطبية المطلوبة بما في ذلك خطاب دعوة المستشفى، توصية جراح القلب، وتقدير تكلفة العلاج. تتقدم بطلب التأشيرة الطبية الإلكترونية عبر الإنترنت مع هذه المستندات. المعالجة تستغرق 3-5 أيام عمل. التأشيرة الطبية صالحة لمدة 60 يوماً مع دخول ثلاثي ويمكن تمديدها إذا لزم الأمر. نحن نرشدك خلال كل خطوة من عملية التأشيرة.',
        },
        {
          question: 'ما هو وقت التعافي بعد جراحة القلب في الهند؟',
          answer:
            'الجدول الزمني للتعافي يختلف حسب نوع الإجراء. جراحة CABG والصمام تتطلب 6-8 أسابيع للتعافي الكامل. مرضى القسطرة يتعافون في 1-2 أسبوع. تعافي زرع جهاز تنظيم ضربات القلب يستغرق 2-3 أسابيع. الإقامة الأولية في المستشفى 7-10 أيام. يمكنك السفر إلى الوطن بعد 14-21 يوماً مع التصريح الطبي. فريق إعادة تأهيل القلب لدينا يوفر تعليمات رعاية مفصلة بعد الجراحة. استشارات المتابعة عبر مكالمات الفيديو مجدولة في الأسبوع 1، 4، و12 بعد الجراحة.',
        },
      ],
    },
    hospitals: {
      title: 'أفضل مستشفيات القلب في بنغالور',
      subtitle: 'مراكز قلبية معتمدة من JCI مع سجلات حافلة مثبتة',
      cta: 'عرض جميع المستشفيات',
    },
    finalCta: {
      title: 'هل أنت مستعد لبدء رحلة رعاية القلب الخاصة بك؟',
      subtitle:
        'احصل على استشارة مجانية مع أخصائيي القلب لدينا واحصل على خطة علاج شخصية مع تقدير تكلفة شفاف.',
      ctaPrimary: 'احصل على استشارة مجانية',
      ctaSecondary: 'تحميل دليل القلب',
    },
  },
};

export default function CardiacPillarClient({ locale }: Props) {
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
            <span className="text-foreground">Heart Surgery</span>
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
                leftIcon={<Stethoscope className="w-5 h-5" />}
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
