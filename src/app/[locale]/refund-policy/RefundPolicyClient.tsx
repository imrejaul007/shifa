'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  FileText,
  CreditCard,
  Cloud,
  RefreshCw,
  Plane,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { useState } from 'react';

interface Props {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Refund & Cancellation Policy',
    subtitle: 'Clear and transparent policies for your peace of mind',
    lastUpdated: 'Last Updated: January 10, 2025',

    tableOfContents: {
      title: 'Table of Contents',
      items: [
        { id: 'overview', label: 'Overview' },
        { id: 'cancellation-policy', label: 'Cancellation Policy' },
        { id: 'service-fees', label: 'Service Fees' },
        { id: 'medical-emergencies', label: 'Medical Emergencies' },
        { id: 'hospital-fees', label: 'Hospital Fees' },
        { id: 'refund-process', label: 'Refund Process' },
        { id: 'refund-method', label: 'Refund Method' },
        { id: 'force-majeure', label: 'Force Majeure' },
        { id: 'rescheduling', label: 'Rescheduling Policy' },
        { id: 'travel-accommodation', label: 'Travel & Accommodation' },
        { id: 'how-to-cancel', label: 'How to Request Cancellation' },
        { id: 'contact', label: 'Contact Information' },
      ],
    },

    overview: {
      title: 'Overview',
      icon: FileText,
      description:
        'At Shifa AlHind, we understand that medical travel plans may need to change due to unforeseen circumstances. This policy outlines our refund and cancellation terms to ensure transparency and fairness for all parties involved.',
      highlights: [
        'Refund amounts depend on cancellation timing',
        'Service fees are non-refundable',
        'Special consideration for medical emergencies',
        'Hospital fees follow their own refund policies',
      ],
    },

    cancellationPolicy: {
      title: 'Cancellation Policy by Timeline',
      icon: Calendar,
      description:
        'Refund percentages are calculated based on the number of days before your scheduled treatment date:',
      timeline: [
        {
          period: 'More than 30 days before',
          refund: '90%',
          status: 'success',
          description: 'Full refund minus 10% administrative fee',
        },
        {
          period: '15-30 days before',
          refund: '50%',
          status: 'warning',
          description: 'Half refund due to coordination costs',
        },
        {
          period: 'Less than 15 days',
          refund: '25%',
          status: 'error',
          description: 'Limited refund due to confirmed bookings',
        },
        {
          period: 'No-show or same day',
          refund: '0%',
          status: 'error',
          description: 'No refund as services were reserved',
        },
      ],
      note: 'Refund percentages apply only to the refundable portion of your package after deducting non-refundable service fees.',
    },

    serviceFees: {
      title: 'Service Fees (Non-Refundable)',
      icon: DollarSign,
      description:
        'The following fees are non-refundable as they cover coordination work already completed:',
      fees: [
        {
          item: 'Initial consultation and case review',
          description: 'Medical records review and hospital coordination',
        },
        {
          item: 'Medical visa assistance',
          description: 'Document preparation and visa invitation letters',
        },
        {
          item: 'Hospital appointment booking',
          description: 'Coordination with medical teams and scheduling',
        },
        {
          item: 'Treatment plan preparation',
          description: 'Detailed cost estimates and itinerary planning',
        },
        {
          item: 'Platform booking fee',
          description: 'Administrative and operational costs',
        },
      ],
      note: 'These fees typically represent 10-15% of the total package cost and are deducted before calculating refund percentages.',
    },

    medicalEmergencies: {
      title: 'Medical Emergencies',
      icon: AlertCircle,
      description:
        'We understand that genuine medical emergencies may prevent travel. Special consideration will be given on a case-by-case basis.',
      requirements: [
        'Valid medical documentation from a licensed physician',
        'Documentation must clearly state why travel is not advisable',
        'Submit cancellation request within 48 hours of emergency',
        'Medical records must be in English or Arabic with translation',
      ],
      process:
        'Each case is reviewed individually by our medical advisory team. We may offer full refund, credit for future treatment, or flexible rescheduling based on circumstances.',
      note: 'Medical emergency considerations do not apply to pre-existing conditions disclosed during initial consultation.',
    },

    hospitalFees: {
      title: 'Hospital Fees',
      icon: FileText,
      description:
        'Hospital and medical facility fees are subject to their own cancellation and refund policies, which vary by institution.',
      points: [
        'Each hospital has its own refund policy for medical services',
        'Hospital fees are separate from Shifa AlHind service fees',
        'We will coordinate with hospitals on your behalf for any eligible refunds',
        'Hospital refund timelines may differ from our standard process',
        'Any hospital refunds will be passed to you in full',
      ],
      note: 'We transparently communicate hospital policies during the booking process and clearly separate these fees in your cost estimate.',
    },

    refundProcess: {
      title: 'Refund Process',
      icon: Clock,
      description: 'Our refund process is designed to be clear and efficient:',
      steps: [
        {
          step: 1,
          title: 'Submit Cancellation Request',
          description: 'Contact us via email, phone, or WhatsApp with your booking details',
        },
        {
          step: 2,
          title: 'Request Confirmation',
          description:
            'Receive written confirmation and refund amount calculation within 24-48 hours',
        },
        {
          step: 3,
          title: 'Documentation Review',
          description: 'Our team reviews your case and processes the refund request',
        },
        {
          step: 4,
          title: 'Refund Processing',
          description: 'Refund is initiated to your original payment method',
        },
        {
          step: 5,
          title: 'Completion',
          description: 'Receive refund within 7-14 business days depending on your bank',
        },
      ],
      timeline: 'Complete refund process: 7-14 business days from approval',
    },

    refundMethod: {
      title: 'Refund Method',
      icon: CreditCard,
      description:
        'All refunds are processed through the original payment method used for booking.',
      methods: [
        {
          method: 'Credit/Debit Card',
          timeline: '7-10 business days',
          description: 'Automatic refund to your card',
        },
        {
          method: 'Bank Transfer',
          timeline: '5-7 business days',
          description: 'Direct transfer to your bank account',
        },
        {
          method: 'PayPal',
          timeline: '3-5 business days',
          description: 'Refund to your PayPal account',
        },
        {
          method: 'Cash Payment',
          timeline: '10-14 business days',
          description: 'Bank transfer to provided account details',
        },
      ],
      note: 'Processing times may vary depending on your bank or payment provider. International transfers may take additional 2-3 days.',
    },

    forceMajeure: {
      title: 'Force Majeure',
      icon: Cloud,
      description: 'In cases of unforeseen events beyond our control, special provisions apply:',
      events: [
        'Natural disasters (earthquakes, floods, hurricanes)',
        'Pandemics or epidemic disease outbreaks',
        'War, terrorism, or civil unrest',
        'Government-imposed travel restrictions or lockdowns',
        'Airport closures or extended flight cancellations',
      ],
      policy:
        'In force majeure situations, we will work with you to either reschedule your treatment at no additional cost or provide a full refund including service fees. The safety and well-being of our patients is our top priority.',
      note: 'Force majeure does not include personal circumstances, change of mind, or fear of travel.',
    },

    rescheduling: {
      title: 'Rescheduling Policy',
      icon: RefreshCw,
      description: 'If you need to change your treatment dates rather than cancel:',
      tiers: [
        {
          timing: 'More than 30 days before',
          fee: 'Free',
          conditions: 'One free rescheduling allowed',
        },
        {
          timing: '15-30 days before',
          fee: '$100 - $200',
          conditions: 'Administrative fee applies',
        },
        {
          timing: 'Less than 15 days',
          fee: '$300 - $500',
          conditions: 'Higher fee due to confirmed bookings',
        },
      ],
      note: 'Rescheduling fees are significantly lower than cancellation penalties. Subject to hospital and accommodation availability for new dates.',
    },

    travelAccommodation: {
      title: 'Travel & Accommodation',
      icon: Plane,
      description: 'Travel bookings (flights, hotels) booked through Shifa AlHind or our partners:',
      policies: [
        {
          category: 'Flights',
          policy:
            'Follow airline cancellation and refund policies. We can assist with change requests but cannot guarantee refunds.',
        },
        {
          category: 'Hotels',
          policy:
            'Most partner hotels allow free cancellation up to 48 hours before check-in. Specific policies vary by property.',
        },
        {
          category: 'Ground Transport',
          policy:
            'Full refund if cancelled more than 24 hours before scheduled pickup. No refund for no-shows.',
        },
      ],
      recommendation:
        'We recommend purchasing travel insurance that covers trip cancellations for additional protection.',
    },

    howToCancel: {
      title: 'How to Request Cancellation',
      icon: Mail,
      description: 'To cancel your treatment and request a refund, please provide:',
      required: [
        'Full name and booking reference number',
        'Original booking confirmation email',
        'Reason for cancellation',
        'Preferred refund method',
        'For medical emergencies: supporting medical documentation',
      ],
      channels: [
        {
          icon: Mail,
          method: 'Email',
          value: 'cancellations@shifaalhind.com',
          description: 'Primary cancellation channel',
        },
        {
          icon: Phone,
          method: 'Phone',
          value: '+91 98765 43210',
          description: '24/7 cancellation support',
        },
        {
          icon: Phone,
          method: 'WhatsApp',
          value: '+91 98765 43210',
          description: 'Quick response cancellation',
        },
      ],
      tip: 'Email is recommended for maintaining clear documentation. You will receive written confirmation of your cancellation request within 24 hours.',
    },

    contact: {
      title: 'Contact Information',
      icon: MapPin,
      description:
        'For questions about our refund and cancellation policy, reach out to our support team:',
      details: [
        {
          icon: Mail,
          label: 'Email',
          value: 'support@shifaalhind.com',
          link: 'mailto:support@shifaalhind.com',
        },
        {
          icon: Phone,
          label: 'Phone',
          value: '+91 98765 43210',
          link: 'tel:+919876543210',
        },
        {
          icon: Phone,
          label: 'WhatsApp',
          value: '+91 98765 43210',
          link: 'https://wa.me/919876543210',
        },
        {
          icon: MapPin,
          label: 'Address',
          value: 'Mumbai, Maharashtra, India',
          link: null,
        },
      ],
      hours: 'Available 24/7 for cancellation requests and urgent inquiries',
    },

    cta: {
      title: 'Have Questions About Our Policy?',
      description: 'Our team is here to help clarify any concerns you may have',
      button: 'Contact Support',
    },
  },

  ar: {
    title: 'سياسة الاسترداد والإلغاء',
    subtitle: 'سياسات واضحة وشفافة لراحة بالك',
    lastUpdated: 'آخر تحديث: 10 يناير 2025',

    tableOfContents: {
      title: 'جدول المحتويات',
      items: [
        { id: 'overview', label: 'نظرة عامة' },
        { id: 'cancellation-policy', label: 'سياسة الإلغاء' },
        { id: 'service-fees', label: 'رسوم الخدمة' },
        { id: 'medical-emergencies', label: 'الحالات الطبية الطارئة' },
        { id: 'hospital-fees', label: 'رسوم المستشفى' },
        { id: 'refund-process', label: 'عملية الاسترداد' },
        { id: 'refund-method', label: 'طريقة الاسترداد' },
        { id: 'force-majeure', label: 'القوة القاهرة' },
        { id: 'rescheduling', label: 'سياسة إعادة الجدولة' },
        { id: 'travel-accommodation', label: 'السفر والإقامة' },
        { id: 'how-to-cancel', label: 'كيفية طلب الإلغاء' },
        { id: 'contact', label: 'معلومات الاتصال' },
      ],
    },

    overview: {
      title: 'نظرة عامة',
      icon: FileText,
      description:
        'في شفاء الهند، ندرك أن خطط السفر الطبي قد تحتاج إلى التغيير بسبب ظروف غير متوقعة. توضح هذه السياسة شروط الاسترداد والإلغاء الخاصة بنا لضمان الشفافية والإنصاف لجميع الأطراف المعنية.',
      highlights: [
        'تعتمد مبالغ الاسترداد على توقيت الإلغاء',
        'رسوم الخدمة غير قابلة للاسترداد',
        'اعتبار خاص للحالات الطبية الطارئة',
        'رسوم المستشفى تتبع سياسات الاسترداد الخاصة بها',
      ],
    },

    cancellationPolicy: {
      title: 'سياسة الإلغاء حسب الجدول الزمني',
      icon: Calendar,
      description: 'يتم حساب نسب الاسترداد بناءً على عدد الأيام قبل موعد العلاج المقرر:',
      timeline: [
        {
          period: 'أكثر من 30 يومًا قبل',
          refund: '90%',
          status: 'success',
          description: 'استرداد كامل بخصم رسوم إدارية 10٪',
        },
        {
          period: '15-30 يومًا قبل',
          refund: '50%',
          status: 'warning',
          description: 'نصف الاسترداد بسبب تكاليف التنسيق',
        },
        {
          period: 'أقل من 15 يومًا',
          refund: '25%',
          status: 'error',
          description: 'استرداد محدود بسبب الحجوزات المؤكدة',
        },
        {
          period: 'عدم الحضور أو في نفس اليوم',
          refund: '0%',
          status: 'error',
          description: 'لا يوجد استرداد حيث تم حجز الخدمات',
        },
      ],
      note: 'تنطبق نسب الاسترداد فقط على الجزء القابل للاسترداد من باقتك بعد خصم رسوم الخدمة غير القابلة للاسترداد.',
    },

    serviceFees: {
      title: 'رسوم الخدمة (غير قابلة للاسترداد)',
      icon: DollarSign,
      description:
        'الرسوم التالية غير قابلة للاسترداد لأنها تغطي أعمال التنسيق التي تم إنجازها بالفعل:',
      fees: [
        {
          item: 'الاستشارة الأولية ومراجعة الحالة',
          description: 'مراجعة السجلات الطبية والتنسيق مع المستشفى',
        },
        {
          item: 'المساعدة في الحصول على التأشيرة الطبية',
          description: 'إعداد الوثائق وخطابات دعوة التأشيرة',
        },
        {
          item: 'حجز موعد المستشفى',
          description: 'التنسيق مع الفرق الطبية والجدولة',
        },
        {
          item: 'إعداد خطة العلاج',
          description: 'تقديرات تكلفة تفصيلية وتخطيط جدول الرحلة',
        },
        {
          item: 'رسوم حجز المنصة',
          description: 'التكاليف الإدارية والتشغيلية',
        },
      ],
      note: 'عادة ما تمثل هذه الرسوم 10-15٪ من إجمالي تكلفة الباقة ويتم خصمها قبل حساب نسب الاسترداد.',
    },

    medicalEmergencies: {
      title: 'الحالات الطبية الطارئة',
      icon: AlertCircle,
      description:
        'نحن ندرك أن حالات الطوارئ الطبية الحقيقية قد تمنع السفر. سيتم إعطاء اعتبار خاص على أساس كل حالة على حدة.',
      requirements: [
        'توثيق طبي صالح من طبيب مرخص',
        'يجب أن توضح الوثائق بوضوح سبب عدم إمكانية السفر',
        'تقديم طلب الإلغاء في غضون 48 ساعة من الطوارئ',
        'يجب أن تكون السجلات الطبية بالإنجليزية أو العربية مع الترجمة',
      ],
      process:
        'يتم مراجعة كل حالة بشكل فردي من قبل فريقنا الاستشاري الطبي. قد نقدم استردادًا كاملاً أو رصيدًا للعلاج المستقبلي أو إعادة جدولة مرنة بناءً على الظروف.',
      note: 'لا تنطبق اعتبارات الطوارئ الطبية على الحالات الموجودة مسبقًا والتي تم الإفصاح عنها أثناء الاستشارة الأولية.',
    },

    hospitalFees: {
      title: 'رسوم المستشفى',
      icon: FileText,
      description:
        'تخضع رسوم المستشفى والمرافق الطبية لسياسات الإلغاء والاسترداد الخاصة بها، والتي تختلف حسب المؤسسة.',
      points: [
        'كل مستشفى لديه سياسة استرداد خاصة به للخدمات الطبية',
        'رسوم المستشفى منفصلة عن رسوم خدمة شفاء الهند',
        'سنقوم بالتنسيق مع المستشفيات نيابة عنك للحصول على أي استردادات مؤهلة',
        'قد تختلف الجداول الزمنية لاسترداد المستشفى عن عمليتنا القياسية',
        'سيتم تمرير أي استردادات من المستشفى إليك بالكامل',
      ],
      note: 'نحن نتواصل بشفافية سياسات المستشفى أثناء عملية الحجز ونفصل هذه الرسوم بوضوح في تقدير التكلفة الخاص بك.',
    },

    refundProcess: {
      title: 'عملية الاسترداد',
      icon: Clock,
      description: 'تم تصميم عملية الاسترداد الخاصة بنا لتكون واضحة وفعالة:',
      steps: [
        {
          step: 1,
          title: 'تقديم طلب الإلغاء',
          description: 'اتصل بنا عبر البريد الإلكتروني أو الهاتف أو WhatsApp مع تفاصيل حجزك',
        },
        {
          step: 2,
          title: 'تأكيد الطلب',
          description: 'تلقي تأكيد كتابي وحساب مبلغ الاسترداد في غضون 24-48 ساعة',
        },
        {
          step: 3,
          title: 'مراجعة الوثائق',
          description: 'يقوم فريقنا بمراجعة حالتك ومعالجة طلب الاسترداد',
        },
        {
          step: 4,
          title: 'معالجة الاسترداد',
          description: 'يتم بدء الاسترداد إلى طريقة الدفع الأصلية الخاصة بك',
        },
        {
          step: 5,
          title: 'الإنجاز',
          description: 'تلقي الاسترداد في غضون 7-14 يوم عمل حسب البنك الخاص بك',
        },
      ],
      timeline: 'عملية الاسترداد الكاملة: 7-14 يوم عمل من الموافقة',
    },

    refundMethod: {
      title: 'طريقة الاسترداد',
      icon: CreditCard,
      description: 'تتم معالجة جميع المبالغ المستردة من خلال طريقة الدفع الأصلية المستخدمة للحجز.',
      methods: [
        {
          method: 'بطاقة الائتمان/الخصم',
          timeline: '7-10 أيام عمل',
          description: 'استرداد تلقائي إلى بطاقتك',
        },
        {
          method: 'تحويل بنكي',
          timeline: '5-7 أيام عمل',
          description: 'تحويل مباشر إلى حسابك البنكي',
        },
        {
          method: 'PayPal',
          timeline: '3-5 أيام عمل',
          description: 'استرداد إلى حساب PayPal الخاص بك',
        },
        {
          method: 'الدفع النقدي',
          timeline: '10-14 يوم عمل',
          description: 'تحويل بنكي إلى تفاصيل الحساب المقدمة',
        },
      ],
      note: 'قد تختلف أوقات المعالجة حسب البنك أو مزود الدفع الخاص بك. قد تستغرق التحويلات الدولية 2-3 أيام إضافية.',
    },

    forceMajeure: {
      title: 'القوة القاهرة',
      icon: Cloud,
      description: 'في حالة الأحداث غير المتوقعة خارج نطاق سيطرتنا، تنطبق أحكام خاصة:',
      events: [
        'الكوارث الطبيعية (الزلازل، الفيضانات، الأعاصير)',
        'الأوبئة أو تفشي الأمراض الوبائية',
        'الحرب أو الإرهاب أو الاضطرابات المدنية',
        'قيود السفر المفروضة من الحكومة أو الإغلاق',
        'إغلاق المطارات أو إلغاء الرحلات الممتدة',
      ],
      policy:
        'في حالات القوة القاهرة، سنعمل معك إما لإعادة جدولة علاجك دون أي تكلفة إضافية أو تقديم استرداد كامل بما في ذلك رسوم الخدمة. سلامة ورفاهية مرضانا هي أولويتنا القصوى.',
      note: 'لا تشمل القوة القاهرة الظروف الشخصية أو تغيير الرأي أو الخوف من السفر.',
    },

    rescheduling: {
      title: 'سياسة إعادة الجدولة',
      icon: RefreshCw,
      description: 'إذا كنت بحاجة إلى تغيير مواعيد العلاج الخاصة بك بدلاً من الإلغاء:',
      tiers: [
        {
          timing: 'أكثر من 30 يومًا قبل',
          fee: 'مجاني',
          conditions: 'يُسمح بإعادة جدولة مجانية واحدة',
        },
        {
          timing: '15-30 يومًا قبل',
          fee: '$100 - $200',
          conditions: 'تطبق رسوم إدارية',
        },
        {
          timing: 'أقل من 15 يومًا',
          fee: '$300 - $500',
          conditions: 'رسوم أعلى بسبب الحجوزات المؤكدة',
        },
      ],
      note: 'رسوم إعادة الجدولة أقل بكثير من عقوبات الإلغاء. تخضع لتوافر المستشفى والإقامة للتواريخ الجديدة.',
    },

    travelAccommodation: {
      title: 'السفر والإقامة',
      icon: Plane,
      description: 'حجوزات السفر (رحلات الطيران، الفنادق) المحجوزة من خلال شفاء الهند أو شركائنا:',
      policies: [
        {
          category: 'رحلات الطيران',
          policy:
            'اتبع سياسات الإلغاء والاسترداد الخاصة بشركة الطيران. يمكننا المساعدة في طلبات التغيير ولكن لا يمكننا ضمان الاسترداد.',
        },
        {
          category: 'الفنادق',
          policy:
            'تسمح معظم الفنادق الشريكة بالإلغاء المجاني حتى 48 ساعة قبل تسجيل الوصول. تختلف السياسات المحددة حسب الممتلكات.',
        },
        {
          category: 'النقل البري',
          policy:
            'استرداد كامل إذا تم الإلغاء قبل أكثر من 24 ساعة من الاستلام المقرر. لا يوجد استرداد لعدم الحضور.',
        },
      ],
      recommendation: 'نوصي بشراء تأمين السفر الذي يغطي إلغاء الرحلة لحماية إضافية.',
    },

    howToCancel: {
      title: 'كيفية طلب الإلغاء',
      icon: Mail,
      description: 'لإلغاء علاجك وطلب استرداد، يرجى تقديم:',
      required: [
        'الاسم الكامل ورقم مرجع الحجز',
        'البريد الإلكتروني لتأكيد الحجز الأصلي',
        'سبب الإلغاء',
        'طريقة الاسترداد المفضلة',
        'للحالات الطبية الطارئة: الوثائق الطبية الداعمة',
      ],
      channels: [
        {
          icon: Mail,
          method: 'البريد الإلكتروني',
          value: 'cancellations@shifaalhind.com',
          description: 'قناة الإلغاء الرئيسية',
        },
        {
          icon: Phone,
          method: 'الهاتف',
          value: '+91 98765 43210',
          description: 'دعم الإلغاء على مدار الساعة',
        },
        {
          icon: Phone,
          method: 'WhatsApp',
          value: '+91 98765 43210',
          description: 'استجابة سريعة للإلغاء',
        },
      ],
      tip: 'يوصى بالبريد الإلكتروني للحفاظ على توثيق واضح. ستتلقى تأكيدًا كتابيًا لطلب الإلغاء الخاص بك في غضون 24 ساعة.',
    },

    contact: {
      title: 'معلومات الاتصال',
      icon: MapPin,
      description: 'للأسئلة حول سياسة الاسترداد والإلغاء الخاصة بنا، تواصل مع فريق الدعم لدينا:',
      details: [
        {
          icon: Mail,
          label: 'البريد الإلكتروني',
          value: 'support@shifaalhind.com',
          link: 'mailto:support@shifaalhind.com',
        },
        {
          icon: Phone,
          label: 'الهاتف',
          value: '+91 98765 43210',
          link: 'tel:+919876543210',
        },
        {
          icon: Phone,
          label: 'WhatsApp',
          value: '+91 98765 43210',
          link: 'https://wa.me/919876543210',
        },
        {
          icon: MapPin,
          label: 'العنوان',
          value: 'مومباي، ماهاراشترا، الهند',
          link: null,
        },
      ],
      hours: 'متاح على مدار الساعة لطلبات الإلغاء والاستفسارات العاجلة',
    },

    cta: {
      title: 'هل لديك أسئلة حول سياستنا؟',
      description: 'فريقنا هنا لمساعدتك في توضيح أي مخاوف قد تكون لديك',
      button: 'اتصل بالدعم',
    },
  },
};

export default function RefundPolicyClient({ locale }: Props) {
  const t = content[locale];
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <main
      className={`min-h-screen bg-background ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-primary mb-4">
              {t.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4">{t.subtitle}</p>
            <p className="text-sm text-muted-foreground/70 italic">{t.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <Card variant="outline">
                  <CardBody>
                    <h3 className="text-lg font-bold text-primary mb-4">
                      {t.tableOfContents.title}
                    </h3>
                    <nav className="space-y-2">
                      {t.tableOfContents.items.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === item.id
                              ? 'bg-primary text-white'
                              : 'text-muted-foreground hover:bg-primary/10'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </CardBody>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Overview */}
              <motion.section
                id="overview"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.overview.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.overview.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {t.overview.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {t.overview.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Cancellation Policy */}
              <motion.section
                id="cancellation-policy"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.cancellationPolicy.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.cancellationPolicy.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.cancellationPolicy.description}</p>

                    {/* Timeline Table */}
                    <div className="space-y-4 mb-6">
                      {t.cancellationPolicy.timeline.map((item, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(item.status)}
                              <span className="font-bold text-primary">{item.period}</span>
                            </div>
                            <span className="text-2xl font-bold text-accent">{item.refund}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-900">
                        <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                        {t.cancellationPolicy.note}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Service Fees */}
              <motion.section
                id="service-fees"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.serviceFees.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.serviceFees.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.serviceFees.description}</p>

                    <div className="space-y-4 mb-6">
                      {t.serviceFees.fees.map((fee, index) => (
                        <div key={index} className="border-l-4 border-accent pl-4">
                          <h4 className="font-bold text-primary mb-1">{fee.item}</h4>
                          <p className="text-sm text-muted-foreground">{fee.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                        {t.serviceFees.note}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Medical Emergencies */}
              <motion.section
                id="medical-emergencies"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.medicalEmergencies.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.medicalEmergencies.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.medicalEmergencies.description}</p>

                    <h4 className="font-bold text-primary mb-3">
                      {locale === 'ar' ? 'المتطلبات:' : 'Requirements:'}
                    </h4>
                    <div className="space-y-2 mb-6">
                      {t.medicalEmergencies.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-purple-900 mb-2">
                        <strong>{locale === 'ar' ? 'العملية:' : 'Process:'}</strong>
                      </p>
                      <p className="text-sm text-purple-900">{t.medicalEmergencies.process}</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-900">
                        <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                        {t.medicalEmergencies.note}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Hospital Fees */}
              <motion.section
                id="hospital-fees"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.hospitalFees.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.hospitalFees.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.hospitalFees.description}</p>

                    <div className="space-y-2 mb-6">
                      {t.hospitalFees.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                        {t.hospitalFees.note}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Refund Process */}
              <motion.section
                id="refund-process"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.refundProcess.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.refundProcess.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.refundProcess.description}</p>

                    <div className="space-y-4 mb-6">
                      {t.refundProcess.steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                              {step.step}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-primary mb-1">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-900">
                        <Clock className="inline w-4 h-4 mr-2" />
                        <strong>{locale === 'ar' ? 'الجدول الزمني:' : 'Timeline:'}</strong>{' '}
                        {t.refundProcess.timeline}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Refund Method */}
              <motion.section
                id="refund-method"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.refundMethod.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.refundMethod.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.refundMethod.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {t.refundMethod.methods.map((method, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:border-accent transition-colors"
                        >
                          <h4 className="font-bold text-primary mb-2">{method.method}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-accent" />
                            <span className="text-sm text-accent font-semibold">
                              {method.timeline}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                        {t.refundMethod.note}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Force Majeure */}
              <motion.section
                id="force-majeure"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.forceMajeure.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.forceMajeure.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.forceMajeure.description}</p>

                    <h4 className="font-bold text-primary mb-3">
                      {locale === 'ar' ? 'الأحداث المشمولة:' : 'Covered Events:'}
                    </h4>
                    <div className="space-y-2 mb-6">
                      {t.forceMajeure.events.map((event, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{event}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-purple-900 mb-2">
                        <strong>{locale === 'ar' ? 'السياسة:' : 'Policy:'}</strong>
                      </p>
                      <p className="text-sm text-purple-900">{t.forceMajeure.policy}</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-900">
                        <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                        {t.forceMajeure.note}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Rescheduling Policy */}
              <motion.section
                id="rescheduling"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.rescheduling.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.rescheduling.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.rescheduling.description}</p>

                    <div className="space-y-4 mb-6">
                      {t.rescheduling.tiers.map((tier, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:border-accent transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-primary">{tier.timing}</span>
                            <span className="text-xl font-bold text-accent">{tier.fee}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{tier.conditions}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-900">
                        <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                        {t.rescheduling.note}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Travel & Accommodation */}
              <motion.section
                id="travel-accommodation"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.travelAccommodation.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.travelAccommodation.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {t.travelAccommodation.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      {t.travelAccommodation.policies.map((item, index) => (
                        <div key={index} className="border-l-4 border-accent pl-4">
                          <h4 className="font-bold text-primary mb-1">{item.category}</h4>
                          <p className="text-sm text-muted-foreground">{item.policy}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>{locale === 'ar' ? 'توصية:' : 'Recommendation:'}</strong>{' '}
                        {t.travelAccommodation.recommendation}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* How to Cancel */}
              <motion.section
                id="how-to-cancel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.howToCancel.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.howToCancel.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.howToCancel.description}</p>

                    <h4 className="font-bold text-primary mb-3">
                      {locale === 'ar' ? 'المعلومات المطلوبة:' : 'Required Information:'}
                    </h4>
                    <div className="space-y-2 mb-6">
                      {t.howToCancel.required.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-bold text-primary mb-3">
                      {locale === 'ar' ? 'قنوات الاتصال:' : 'Contact Channels:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {t.howToCancel.channels.map((channel, index) => {
                        const Icon = channel.icon;
                        return (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 text-center hover:border-accent transition-colors"
                          >
                            <Icon className="w-8 h-8 text-accent mx-auto mb-2" />
                            <h5 className="font-bold text-primary mb-1">{channel.method}</h5>
                            <p className="text-sm text-accent font-semibold mb-2">
                              {channel.value}
                            </p>
                            <p className="text-xs text-muted-foreground">{channel.description}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-900">
                        <strong>{locale === 'ar' ? 'نصيحة:' : 'Tip:'}</strong> {t.howToCancel.tip}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>

              {/* Contact Information */}
              <motion.section
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="default">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <t.contact.icon className="w-8 h-8 text-accent" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {t.contact.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t.contact.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {t.contact.details.map((detail, index) => {
                        const Icon = detail.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg"
                          >
                            <Icon className="w-6 h-6 text-accent shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-primary">{detail.label}</p>
                              {detail.link ? (
                                <a
                                  href={detail.link}
                                  className="text-sm text-accent hover:underline"
                                >
                                  {detail.value}
                                </a>
                              ) : (
                                <p className="text-sm text-muted-foreground">{detail.value}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <Clock className="inline w-4 h-4 mr-2" />
                        <strong>{locale === 'ar' ? 'ساعات العمل:' : 'Hours:'}</strong>{' '}
                        {t.contact.hours}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.section>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8">{t.cta.description}</p>
            <ButtonLink
              href={`/${locale}/contact`}
              variant="gold"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.cta.button}
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
