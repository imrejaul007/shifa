'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Plane,
  MapPin,
  Hotel,
  Car,
  CreditCard,
  Shield,
  Clock,
  Users,
  Languages,
  FileText,
  CheckSquare,
  Globe,
  CheckCircle2,
  Phone,
  Cloud,
  Building2,
  Wallet,
  AlertCircle,
  Download,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface Props {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    breadcrumb: { home: 'Home', travel: 'Travel & Stay' },
    hero: {
      badge: 'Travel Guide',
      title: 'Travel & Stay Guide for Medical Tourism in Bangalore',
      subtitle: 'Complete support from airport to recovery',
      description:
        'Planning your medical trip to Bangalore? We handle everything - visa assistance, airport pickup, accommodation, and 24/7 Arabic support. Focus on your treatment while we take care of your travel needs.',
      ctaPrimary: 'Request Travel Assistance',
      ctaSecondary: 'Download Travel Guide',
    },
    stats: {
      flights: { label: 'Direct Flights', value: '15-20 daily', desc: 'from GCC countries' },
      flightTime: { label: 'Flight Time', value: '3.5-4 hours', desc: 'from Dubai' },
      visa: { label: 'Visa Processing', value: '3-5 days', desc: 'full assistance' },
      support: { label: 'Languages', value: 'Arabic 24/7', desc: 'dedicated support' },
    },
    reachBangalore: {
      title: 'How to Reach Bangalore',
      subtitle: 'Direct flight connections from all GCC countries',
      countries: [
        {
          name: 'From UAE',
          airlines: 'Emirates, Air India Express, IndiGo, Air Arabia',
          duration: '3.5 hours',
          frequency: '15+ daily flights',
          details: 'Direct flights from Dubai, Abu Dhabi, Sharjah',
        },
        {
          name: 'From Saudi Arabia',
          airlines: 'Saudia, Air India, Flynas',
          duration: '4-5 hours',
          frequency: '10+ daily flights',
          details: 'Direct flights from Riyadh, Jeddah, Dammam',
        },
        {
          name: 'From Kuwait',
          airlines: 'Kuwait Airways, IndiGo, Air India Express',
          duration: '4 hours',
          frequency: '5+ daily flights',
          details: 'Direct flights from Kuwait City',
        },
        {
          name: 'From Oman',
          airlines: 'Oman Air, Air India, SalamAir',
          duration: '3 hours',
          frequency: '5+ daily flights',
          details: 'Direct flights from Muscat',
        },
        {
          name: 'From Qatar',
          airlines: 'Qatar Airways, IndiGo, Air India',
          duration: '4 hours',
          frequency: '7+ daily flights',
          details: 'Direct flights from Doha',
        },
        {
          name: 'From Bahrain',
          airlines: 'Gulf Air, IndiGo, Air India Express',
          duration: '4 hours',
          frequency: '5+ daily flights',
          details: 'Direct flights from Manama',
        },
      ],
    },
    visa: {
      title: 'Medical Visa Requirements',
      subtitle: 'Complete guide to Indian medical visa for GCC patients',
      requirements: {
        title: 'Documents Needed',
        items: [
          'Valid passport (minimum 6 months validity)',
          'Medical letter from recognized hospital in Bangalore',
          'Recent passport-size photograph (white background)',
          'Filled visa application form',
          'Proof of payment (visa fee receipt)',
          'Flight tickets (confirmed or provisional)',
        ],
      },
      process: {
        title: 'Visa Details',
        fee: '$80 USD',
        processing: '3-5 business days',
        validity: '60 days from issue date',
        entries: 'Triple entry allowed',
      },
      assistance: {
        title: 'How Shifa AlHind Helps',
        items: [
          'Hospital medical letter arrangement',
          'Complete visa application assistance',
          'Document verification and review',
          'Appointment booking at VFS centers',
          'Follow-up until visa approval',
          'Visa extension support if needed',
        ],
      },
      countryNotes: [
        {
          country: 'UAE Residents',
          note: 'Apply through VFS Global centers in Dubai, Abu Dhabi, or Sharjah. Processing typically takes 3-4 working days.',
        },
        {
          country: 'Saudi Residents',
          note: 'Apply through VFS Global centers in Riyadh, Jeddah, or Dammam. Require Arabic-translated documents with attestation.',
        },
        {
          country: 'Kuwait Residents',
          note: 'Apply through VFS Global center in Kuwait City. Medical visa usually processed within 3-5 days.',
        },
      ],
    },
    airport: {
      title: 'Airport & Pickup Services',
      subtitle: 'Seamless arrival experience with dedicated support',
      airportInfo: {
        name: 'Kempegowda International Airport (BLR)',
        distance: '40-50 km from major hospitals',
        travelTime: '1-1.5 hours by car',
        facilities: 'Modern airport with excellent facilities',
      },
      services: {
        title: 'Shifa AlHind Airport Services',
        items: [
          {
            icon: Users,
            title: 'Free Airport Pickup & Drop-off',
            description: 'Complimentary transfers in private AC vehicle for all patients',
          },
          {
            icon: Languages,
            title: 'Arabic-Speaking Coordinator',
            description: 'Our team member will greet you at arrival gate with name board',
          },
          {
            icon: Car,
            title: 'Private AC Vehicle',
            description: 'Comfortable, clean cars with experienced drivers',
          },
          {
            icon: Phone,
            title: 'SIM Card Assistance',
            description: 'Help with local SIM card purchase for connectivity',
          },
          {
            icon: CreditCard,
            title: 'Currency Exchange Guidance',
            description: 'Advice on best exchange rates and ATM locations',
          },
        ],
      },
    },
    accommodation: {
      title: 'Accommodation Options',
      subtitle: 'Comfortable stays near top hospitals with halal food and prayer facilities',
      tiers: [
        {
          tier: 'Budget-Friendly',
          price: '$25-40/night',
          hotels: 'Ginger Hotels, Ibis Budget, Treebo Hotels',
          features: [
            'Clean and safe accommodation',
            'Within 2-3 km from hospitals',
            'Basic amenities included',
            'Halal restaurants nearby',
            'Prayer space available',
            'Free WiFi',
          ],
          ideal: 'Ideal for cost-conscious patients and long stays',
        },
        {
          tier: 'Mid-Range Comfort',
          price: '$50-80/night',
          hotels: 'Lemon Tree, Citrus Hotels, Royal Orchid',
          features: [
            'Comfortable rooms with all amenities',
            'Walking distance to hospitals',
            'In-house restaurant (halal options)',
            'Daily housekeeping',
            'Prayer mat provided',
            'Airport transfer assistance',
          ],
          ideal: 'Perfect balance of comfort and affordability',
        },
        {
          tier: 'Luxury Experience',
          price: '$100-200/night',
          hotels: 'Marriott, Taj, ITC, Oberoi',
          features: [
            '5-star international standards',
            'Premium comfort and service',
            'Multiple dining options (halal certified)',
            'Spa and wellness facilities',
            'Concierge services',
            'Close to major hospitals',
          ],
          ideal: 'Premium experience with world-class hospitality',
        },
      ],
    },
    transportation: {
      title: 'Local Transportation',
      subtitle: 'Easy and affordable travel options in Bangalore',
      options: [
        {
          icon: Car,
          title: 'Hospital Transfers',
          description: 'Provided by Shifa AlHind - Free pickup and drop for all appointments',
          cost: 'Complimentary',
        },
        {
          icon: Phone,
          title: 'Taxi Apps (Uber, Ola)',
          description: 'Very affordable and safe. English-supported apps with GPS tracking',
          cost: '$2-5 per ride',
        },
        {
          icon: Car,
          title: 'Auto-Rickshaws',
          description: 'Three-wheeled taxis for short distances. Ensure meter is used',
          cost: '$1-2 for short trips',
        },
        {
          icon: MapPin,
          title: 'Metro',
          description: 'Modern, clean metro system connecting major areas and hospitals',
          cost: '$0.30-0.70 per trip',
        },
      ],
    },
    weather: {
      title: 'Weather & Best Time to Visit',
      subtitle: 'Bangalore has pleasant weather year-round',
      seasons: [
        {
          period: 'October - February',
          temp: '15°C - 28°C',
          weather: 'Cool & Dry',
          description: 'Best time to visit. Pleasant days and cool nights. Perfect for recovery.',
          recommendation: 'Highly Recommended',
        },
        {
          period: 'March - May',
          temp: '20°C - 35°C',
          weather: 'Warm Summer',
          description: 'Warm but manageable with AC. Hospitals fully air-conditioned.',
          recommendation: 'Good',
        },
        {
          period: 'June - September',
          temp: '18°C - 28°C',
          weather: 'Monsoon',
          description: 'Rainy season but hospitals unaffected. Indoor recovery comfortable.',
          recommendation: 'Suitable',
        },
      ],
      packing: {
        title: 'What to Pack',
        items: [
          'Light, breathable cotton clothes',
          'Sweater or light jacket for AC environments',
          'Comfortable walking shoes',
          'Modest attire for hospital visits',
          'Prayer mat and modest clothing',
          'Personal toiletries',
        ],
      },
    },
    currency: {
      title: 'Currency & Payment',
      subtitle: 'Financial information for international patients',
      info: [
        {
          icon: CreditCard,
          title: 'Currency',
          description: 'Indian Rupee (INR) - Exchange rate: ~22-23 INR = 1 AED',
        },
        {
          icon: MapPin,
          title: 'Where to Exchange',
          description: 'Airport, authorized dealers, hotels. Airport rates are competitive.',
        },
        {
          icon: CreditCard,
          title: 'Cards Accepted',
          description: 'Visa, Mastercard widely accepted at hotels, restaurants, hospitals.',
        },
        {
          icon: Wallet,
          title: 'ATMs',
          description: 'Available everywhere. International cards accepted. Small withdrawal fees.',
        },
        {
          icon: Building2,
          title: 'Hospital Payments',
          description: 'USD, AED, SAR accepted. Bank transfers, credit cards, cash all available.',
        },
      ],
    },
    safety: {
      title: 'Safety & Cultural Information',
      subtitle: 'Important information for international patients',
      points: [
        {
          icon: Shield,
          title: 'Safety',
          description:
            "Bangalore is India's safest city for foreigners with low crime rate and excellent healthcare infrastructure.",
        },
        {
          icon: Languages,
          title: 'Language',
          description:
            'English widely spoken in hospitals, hotels, and urban areas. Arabic support through Shifa AlHind.',
        },
        {
          icon: Globe,
          title: 'Muslim-Friendly',
          description:
            'Many mosques, halal restaurants, and Muslim-friendly facilities. Islamic culture respected.',
        },
        {
          icon: Users,
          title: 'Dress Code',
          description:
            'Casual attire acceptable. Modest clothing preferred in hospitals and religious places.',
        },
        {
          icon: Shield,
          title: 'Women Travelers',
          description:
            'Very safe with our 24/7 support. Female coordinators available. Well-lit, secure areas.',
        },
        {
          icon: Phone,
          title: 'Emergency Numbers',
          description: 'Police: 100 | Ambulance: 108 | Shifa AlHind 24/7 Helpline: +91-XXXXXXXXXX',
        },
      ],
    },
    checklist: {
      title: 'Travel Checklist',
      subtitle: 'Everything you need for a smooth medical trip',
      categories: [
        {
          category: 'Documents',
          items: [
            'Valid passport (6+ months validity)',
            'Indian medical visa',
            'Hospital appointment letter',
            'Medical records and test reports',
            'Travel insurance documents',
            'Flight tickets (print and digital)',
          ],
        },
        {
          category: 'Medications & Health',
          items: [
            'Current medications (clearly labeled)',
            'Prescription copies (in English)',
            'Medical history summary',
            'Allergy information card',
            'Doctor contact information',
            'Blood group card',
          ],
        },
        {
          category: 'Comfort & Personal',
          items: [
            'Comfortable clothes (for hospital)',
            'Prayer mat and modest clothing',
            'Personal toiletries',
            'Favorite snacks (allowed items)',
            'Reading material or entertainment',
            'Neck pillow for flight',
          ],
        },
        {
          category: 'Electronics & Communication',
          items: [
            'Phone charger (India uses 220V)',
            'Universal power adapter',
            'WhatsApp setup with roaming',
            'Emergency contacts saved',
            'Portable power bank',
            'Headphones',
          ],
        },
        {
          category: 'Financial',
          items: [
            'Cash (USD/AED for exchange)',
            'Credit/debit cards (notify bank)',
            'Travel insurance details',
            'Hospital payment arrangement',
            'Emergency fund access',
            'Receipt folder',
          ],
        },
        {
          category: 'Shifa AlHind Contacts',
          items: [
            'Coordinator phone number saved',
            'Hospital address in phone GPS',
            'Accommodation address saved',
            'Emergency contact card',
            'WhatsApp group joined',
            'Pickup time confirmed',
          ],
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'How do I get a medical visa from UAE?',
          answer:
            'Apply through VFS Global centers in Dubai, Abu Dhabi, or Sharjah with required documents including hospital medical letter, passport, photos, and application form. Shifa AlHind provides complete assistance including hospital letter arrangement. Processing takes 3-4 working days. Visa fee is $80 USD with 60 days validity and triple entry.',
        },
        {
          question: 'How long is the flight from Dubai to Bangalore?',
          answer:
            'Direct flights from Dubai to Bangalore take approximately 3.5 hours. Emirates, Air India Express, IndiGo, and Air Arabia operate 15+ daily flights. From Riyadh, flights take 4-5 hours. From other GCC countries, flight time ranges from 3-4 hours.',
        },
        {
          question: 'Which is the best area to stay in Bangalore?',
          answer:
            'We recommend staying near major hospital clusters: Jayanagar (near Fortis, Apollo), Bannerghatta Road (near Manipal, Sakra), or Whitefield (near Columbia Asia). These areas have hotels at all price points ($25-200/night), halal restaurants, mosques, and are 15-30 minutes from the airport.',
        },
        {
          question: 'Do you provide airport pickup services?',
          answer:
            'Yes, Shifa AlHind provides complimentary airport pickup and drop-off services for all patients. Our Arabic-speaking coordinator will greet you at the arrival gate with a name board. We use private AC vehicles with experienced drivers. SIM card and currency exchange assistance also provided.',
        },
        {
          question: 'Is it safe for women to travel alone to Bangalore?',
          answer:
            "Yes, very safe. Bangalore is India's safest city with excellent infrastructure. Shifa AlHind provides 24/7 support with female coordinators available. We arrange secure accommodation, provide all transfers, and stay in constant communication. Thousands of GCC women patients travel safely every year.",
        },
        {
          question: 'Can I bring a companion or family member?',
          answer:
            'Absolutely! We encourage bringing a companion for support. Medical visa can be arranged for one attendant. We provide couple/family-friendly accommodation near hospitals. Companion can stay in the same room at most hotels. Additional visa and travel assistance provided.',
        },
        {
          question: 'What food options are available?',
          answer:
            'Bangalore has hundreds of halal-certified restaurants serving Arabic, Indian, and international cuisine. Major hotels have halal food options. Hospital cafeterias offer vegetarian and halal meals. Shawarma, mandi, biryani, and traditional Arabic dishes widely available. Shifa AlHind can recommend restaurants near your accommodation.',
        },
        {
          question: 'What if I need emergency help during my stay?',
          answer:
            'Shifa AlHind provides 24/7 emergency support via phone and WhatsApp in Arabic and English. Our coordinators can arrange immediate medical attention, hospital transfers, or any assistance needed. We also provide emergency contact cards with all important numbers including local police (100) and ambulance (108).',
        },
      ],
    },
    finalCta: {
      title: 'Need Help Planning Your Medical Trip?',
      subtitle: 'Our travel coordinators will arrange everything from visa to accommodation',
      ctaPrimary: 'Request Travel Assistance',
      ctaSecondary: 'WhatsApp Us Now',
    },
  },
  ar: {
    breadcrumb: { home: 'الرئيسية', travel: 'السفر والإقامة' },
    hero: {
      badge: 'دليل السفر',
      title: 'دليل السفر والإقامة للسياحة العلاجية في بنغالور',
      subtitle: 'دعم كامل من المطار إلى التعافي',
      description:
        'تخطط لرحلتك العلاجية إلى بنغالور؟ نحن نتعامل مع كل شيء - مساعدة التأشيرة، استقبال المطار، الإقامة، والدعم بالعربية على مدار الساعة. ركز على علاجك بينما نعتني باحتياجات سفرك.',
      ctaPrimary: 'اطلب مساعدة السفر',
      ctaSecondary: 'تحميل دليل السفر',
    },
    stats: {
      flights: { label: 'رحلات مباشرة', value: '15-20 يومياً', desc: 'من دول الخليج' },
      flightTime: { label: 'وقت الرحلة', value: '3.5-4 ساعات', desc: 'من دبي' },
      visa: { label: 'معالجة التأشيرة', value: '3-5 أيام', desc: 'مساعدة كاملة' },
      support: { label: 'اللغات', value: 'عربي 24/7', desc: 'دعم مخصص' },
    },
    reachBangalore: {
      title: 'كيفية الوصول إلى بنغالور',
      subtitle: 'اتصالات رحلات مباشرة من جميع دول الخليج',
      countries: [
        {
          name: 'من الإمارات',
          airlines: 'طيران الإمارات، إير إنديا إكسبريس، إنديجو، العربية للطيران',
          duration: '3.5 ساعة',
          frequency: '15+ رحلة يومية',
          details: 'رحلات مباشرة من دبي، أبوظبي، الشارقة',
        },
        {
          name: 'من السعودية',
          airlines: 'الخطوط السعودية، إير إنديا، طيران ناس',
          duration: '4-5 ساعات',
          frequency: '10+ رحلة يومية',
          details: 'رحلات مباشرة من الرياض، جدة، الدمام',
        },
        {
          name: 'من الكويت',
          airlines: 'الخطوط الكويتية، إنديجو، إير إنديا إكسبريس',
          duration: '4 ساعات',
          frequency: '5+ رحلات يومية',
          details: 'رحلات مباشرة من مدينة الكويت',
        },
        {
          name: 'من عمان',
          airlines: 'الطيران العماني، إير إنديا، سلام إير',
          duration: '3 ساعات',
          frequency: '5+ رحلات يومية',
          details: 'رحلات مباشرة من مسقط',
        },
        {
          name: 'من قطر',
          airlines: 'الخطوط القطرية، إنديجو، إير إنديا',
          duration: '4 ساعات',
          frequency: '7+ رحلات يومية',
          details: 'رحلات مباشرة من الدوحة',
        },
        {
          name: 'من البحرين',
          airlines: 'طيران الخليج، إنديجو، إير إنديا إكسبريس',
          duration: '4 ساعات',
          frequency: '5+ رحلات يومية',
          details: 'رحلات مباشرة من المنامة',
        },
      ],
    },
    visa: {
      title: 'متطلبات التأشيرة الطبية',
      subtitle: 'دليل كامل للتأشيرة الطبية الهندية لمرضى الخليج',
      requirements: {
        title: 'المستندات المطلوبة',
        items: [
          'جواز سفر ساري المفعول (صلاحية 6 أشهر على الأقل)',
          'خطاب طبي من مستشفى معترف به في بنغالور',
          'صورة حديثة بحجم جواز السفر (خلفية بيضاء)',
          'نموذج طلب التأشيرة المكتمل',
          'إثبات الدفع (إيصال رسوم التأشيرة)',
          'تذاكر الطيران (مؤكدة أو مؤقتة)',
        ],
      },
      process: {
        title: 'تفاصيل التأشيرة',
        fee: '80 دولار أمريكي',
        processing: '3-5 أيام عمل',
        validity: '60 يوماً من تاريخ الإصدار',
        entries: 'دخول ثلاثي مسموح',
      },
      assistance: {
        title: 'كيف تساعد شفاء الهند',
        items: [
          'ترتيب خطاب المستشفى الطبي',
          'مساعدة كاملة في طلب التأشيرة',
          'التحقق من المستندات ومراجعتها',
          'حجز موعد في مراكز VFS',
          'المتابعة حتى الموافقة على التأشيرة',
          'دعم تمديد التأشيرة إذا لزم الأمر',
        ],
      },
      countryNotes: [
        {
          country: 'مقيمو الإمارات',
          note: 'قدم الطلب عبر مراكز VFS Global في دبي أو أبوظبي أو الشارقة. تستغرق المعالجة عادةً 3-4 أيام عمل.',
        },
        {
          country: 'مقيمو السعودية',
          note: 'قدم الطلب عبر مراكز VFS Global في الرياض أو جدة أو الدمام. تتطلب مستندات مترجمة للعربية مع التصديق.',
        },
        {
          country: 'مقيمو الكويت',
          note: 'قدم الطلب عبر مركز VFS Global في مدينة الكويت. عادة ما تتم معالجة التأشيرة الطبية في غضون 3-5 أيام.',
        },
      ],
    },
    airport: {
      title: 'المطار وخدمات الاستقبال',
      subtitle: 'تجربة وصول سلسة مع دعم مخصص',
      airportInfo: {
        name: 'مطار كيمبيجودا الدولي (BLR)',
        distance: '40-50 كم من المستشفيات الرئيسية',
        travelTime: '1-1.5 ساعة بالسيارة',
        facilities: 'مطار حديث مع مرافق ممتازة',
      },
      services: {
        title: 'خدمات المطار من شفاء الهند',
        items: [
          {
            icon: Users,
            title: 'استقبال مجاني من وإلى المطار',
            description: 'نقل مجاني في سيارة خاصة مكيفة لجميع المرضى',
          },
          {
            icon: Languages,
            title: 'منسق يتحدث العربية',
            description: 'سيرحب بك فريقنا في بوابة الوصول مع لوحة الاسم',
          },
          {
            icon: Car,
            title: 'سيارة خاصة مكيفة',
            description: 'سيارات مريحة ونظيفة مع سائقين ذوي خبرة',
          },
          {
            icon: Phone,
            title: 'مساعدة في شريحة الهاتف',
            description: 'مساعدة في شراء شريحة SIM محلية للاتصال',
          },
          {
            icon: CreditCard,
            title: 'إرشادات صرف العملات',
            description: 'نصائح حول أفضل أسعار الصرف ومواقع أجهزة الصراف الآلي',
          },
        ],
      },
    },
    accommodation: {
      title: 'خيارات الإقامة',
      subtitle: 'إقامة مريحة بالقرب من أفضل المستشفيات مع طعام حلال ومرافق الصلاة',
      tiers: [
        {
          tier: 'اقتصادية',
          price: '25-40 دولار/ليلة',
          hotels: 'جينجر، إيبيس بدجت، تريبو',
          features: [
            'إقامة نظيفة وآمنة',
            'على بعد 2-3 كم من المستشفيات',
            'وسائل الراحة الأساسية متضمنة',
            'مطاعم حلال قريبة',
            'مساحة للصلاة متاحة',
            'واي فاي مجاني',
          ],
          ideal: 'مثالي للمرضى المهتمين بالتكلفة والإقامات الطويلة',
        },
        {
          tier: 'متوسطة الراحة',
          price: '50-80 دولار/ليلة',
          hotels: 'ليمون تري، سيتروس، رويال أوركيد',
          features: [
            'غرف مريحة مع جميع وسائل الراحة',
            'على مسافة قريبة من المستشفيات',
            'مطعم داخلي (خيارات حلال)',
            'تنظيف يومي',
            'سجادة صلاة متوفرة',
            'مساعدة في نقل المطار',
          ],
          ideal: 'توازن مثالي بين الراحة والقدرة على تحمل التكاليف',
        },
        {
          tier: 'فاخرة',
          price: '100-200 دولار/ليلة',
          hotels: 'ماريوت، تاج، ITC، أوبيروي',
          features: [
            'معايير دولية 5 نجوم',
            'راحة وخدمة فائقة',
            'خيارات طعام متعددة (معتمد حلال)',
            'مرافق السبا والعافية',
            'خدمات الكونسيرج',
            'قريب من المستشفيات الرئيسية',
          ],
          ideal: 'تجربة فاخرة مع ضيافة عالمية المستوى',
        },
      ],
    },
    transportation: {
      title: 'المواصلات المحلية',
      subtitle: 'خيارات سفر سهلة وبأسعار معقولة في بنغالور',
      options: [
        {
          icon: Car,
          title: 'نقل المستشفى',
          description: 'يوفرها شفاء الهند - استقبال وتوصيل مجاني لجميع المواعيد',
          cost: 'مجاني',
        },
        {
          icon: Phone,
          title: 'تطبيقات التاكسي (أوبر، أولا)',
          description: 'بأسعار معقولة جداً وآمنة. تطبيقات بدعم اللغة الإنجليزية مع تتبع GPS',
          cost: '2-5 دولار للرحلة',
        },
        {
          icon: Car,
          title: 'الريكشا الآلية',
          description: 'سيارات أجرة ذات ثلاث عجلات للمسافات القصيرة. تأكد من استخدام العداد',
          cost: '1-2 دولار للرحلات القصيرة',
        },
        {
          icon: MapPin,
          title: 'المترو',
          description: 'نظام مترو حديث ونظيف يربط المناطق الرئيسية والمستشفيات',
          cost: '0.30-0.70 دولار للرحلة',
        },
      ],
    },
    weather: {
      title: 'الطقس وأفضل وقت للزيارة',
      subtitle: 'بنغالور لديها طقس لطيف على مدار العام',
      seasons: [
        {
          period: 'أكتوبر - فبراير',
          temp: '15°م - 28°م',
          weather: 'بارد وجاف',
          description: 'أفضل وقت للزيارة. أيام لطيفة وليالي باردة. مثالي للتعافي.',
          recommendation: 'موصى به بشدة',
        },
        {
          period: 'مارس - مايو',
          temp: '20°م - 35°م',
          weather: 'صيف دافئ',
          description: 'دافئ ولكن يمكن التحكم فيه مع التكييف. المستشفيات مكيفة بالكامل.',
          recommendation: 'جيد',
        },
        {
          period: 'يونيو - سبتمبر',
          temp: '18°م - 28°م',
          weather: 'موسم الأمطار',
          description: 'موسم الأمطار ولكن المستشفيات غير متأثرة. التعافي الداخلي مريح.',
          recommendation: 'مناسب',
        },
      ],
      packing: {
        title: 'ما يجب إحضاره',
        items: [
          'ملابس قطنية خفيفة ومسامية',
          'سترة أو جاكيت خفيف لبيئات التكييف',
          'أحذية مشي مريحة',
          'ملابس محتشمة لزيارات المستشفى',
          'سجادة صلاة وملابس محتشمة',
          'أدوات النظافة الشخصية',
        ],
      },
    },
    currency: {
      title: 'العملة والدفع',
      subtitle: 'معلومات مالية للمرضى الدوليين',
      info: [
        {
          icon: CreditCard,
          title: 'العملة',
          description: 'الروبية الهندية (INR) - سعر الصرف: ~22-23 روبية = 1 درهم',
        },
        {
          icon: MapPin,
          title: 'أين تصرف',
          description: 'المطار، الوكلاء المعتمدون، الفنادق. أسعار المطار تنافسية.',
        },
        {
          icon: CreditCard,
          title: 'البطاقات المقبولة',
          description: 'فيزا، ماستركارد مقبولة على نطاق واسع في الفنادق والمطاعم والمستشفيات.',
        },
        {
          icon: Wallet,
          title: 'أجهزة الصراف الآلي',
          description: 'متوفرة في كل مكان. تقبل البطاقات الدولية. رسوم سحب صغيرة.',
        },
        {
          icon: Building2,
          title: 'مدفوعات المستشفى',
          description:
            'تقبل الدولار، الدرهم، الريال. التحويلات البنكية، بطاقات الائتمان، النقد كلها متاحة.',
        },
      ],
    },
    safety: {
      title: 'معلومات السلامة والثقافة',
      subtitle: 'معلومات مهمة للمرضى الدوليين',
      points: [
        {
          icon: Shield,
          title: 'السلامة',
          description:
            'بنغالور هي أكثر مدن الهند أماناً للأجانب مع معدل جريمة منخفض وبنية تحتية ممتازة للرعاية الصحية.',
        },
        {
          icon: Languages,
          title: 'اللغة',
          description:
            'الإنجليزية تستخدم على نطاق واسع في المستشفيات والفنادق والمناطق الحضرية. الدعم بالعربية من خلال شفاء الهند.',
        },
        {
          icon: Globe,
          title: 'صديقة للمسلمين',
          description:
            'العديد من المساجد والمطاعم الحلال والمرافق الصديقة للمسلمين. الثقافة الإسلامية محترمة.',
        },
        {
          icon: Users,
          title: 'قواعد اللباس',
          description:
            'الملابس غير الرسمية مقبولة. الملابس المحتشمة مفضلة في المستشفيات والأماكن الدينية.',
        },
        {
          icon: Shield,
          title: 'المسافرات',
          description: 'آمن جداً مع دعمنا على مدار الساعة. منسقات متاحات. مناطق آمنة ومضاءة جيداً.',
        },
        {
          icon: Phone,
          title: 'أرقام الطوارئ',
          description: 'الشرطة: 100 | الإسعاف: 108 | خط مساعدة شفاء الهند 24/7: +91-XXXXXXXXXX',
        },
      ],
    },
    checklist: {
      title: 'قائمة التحقق للسفر',
      subtitle: 'كل ما تحتاجه لرحلة طبية سلسة',
      categories: [
        {
          category: 'المستندات',
          items: [
            'جواز سفر ساري (صلاحية 6+ أشهر)',
            'تأشيرة طبية هندية',
            'خطاب موعد المستشفى',
            'السجلات الطبية وتقارير الفحوصات',
            'مستندات التأمين على السفر',
            'تذاكر الطيران (مطبوعة ورقمية)',
          ],
        },
        {
          category: 'الأدوية والصحة',
          items: [
            'الأدوية الحالية (موسومة بوضوح)',
            'نسخ الوصفات الطبية (بالإنجليزية)',
            'ملخص التاريخ الطبي',
            'بطاقة معلومات الحساسية',
            'معلومات الاتصال بالطبيب',
            'بطاقة فصيلة الدم',
          ],
        },
        {
          category: 'الراحة والشخصية',
          items: [
            'ملابس مريحة (للمستشفى)',
            'سجادة صلاة وملابس محتشمة',
            'أدوات النظافة الشخصية',
            'وجبات خفيفة مفضلة (عناصر مسموح بها)',
            'مواد قراءة أو ترفيه',
            'وسادة رقبة للطائرة',
          ],
        },
        {
          category: 'الإلكترونيات والاتصالات',
          items: [
            'شاحن الهاتف (الهند تستخدم 220 فولت)',
            'محول طاقة عالمي',
            'إعداد واتساب مع التجوال',
            'جهات الاتصال في حالات الطوارئ محفوظة',
            'بنك طاقة محمول',
            'سماعات الرأس',
          ],
        },
        {
          category: 'المالية',
          items: [
            'نقد (دولار/درهم للصرف)',
            'بطاقات الائتمان/الخصم (إخطار البنك)',
            'تفاصيل التأمين على السفر',
            'ترتيب دفع المستشفى',
            'الوصول إلى صندوق الطوارئ',
            'مجلد الإيصالات',
          ],
        },
        {
          category: 'جهات اتصال شفاء الهند',
          items: [
            'رقم هاتف المنسق محفوظ',
            'عنوان المستشفى في GPS الهاتف',
            'عنوان الإقامة محفوظ',
            'بطاقة اتصال الطوارئ',
            'مجموعة واتساب منضم إليها',
            'وقت الاستقبال مؤكد',
          ],
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة',
      items: [
        {
          question: 'كيف أحصل على تأشيرة طبية من الإمارات؟',
          answer:
            'قدم الطلب عبر مراكز VFS Global في دبي أو أبوظبي أو الشارقة مع المستندات المطلوبة بما في ذلك خطاب المستشفى الطبي وجواز السفر والصور ونموذج الطلب. توفر شفاء الهند مساعدة كاملة بما في ذلك ترتيب خطاب المستشفى. تستغرق المعالجة 3-4 أيام عمل. رسوم التأشيرة 80 دولار أمريكي مع صلاحية 60 يوماً ودخول ثلاثي.',
        },
        {
          question: 'كم تستغرق الرحلة من دبي إلى بنغالور؟',
          answer:
            'تستغرق الرحلات المباشرة من دبي إلى بنغالور حوالي 3.5 ساعة. تشغل طيران الإمارات وإير إنديا إكسبريس وإنديجو والعربية للطيران أكثر من 15 رحلة يومياً. من الرياض، تستغرق الرحلات 4-5 ساعات. من دول الخليج الأخرى، يتراوح وقت الرحلة من 3-4 ساعات.',
        },
        {
          question: 'ما هي أفضل منطقة للإقامة في بنغالور؟',
          answer:
            'نوصي بالإقامة بالقرب من مجموعات المستشفيات الرئيسية: جايناجار (بالقرب من فورتيس، أبولو)، طريق بانيرغاتا (بالقرب من مانيبال، ساكرا)، أو وايتفيلد (بالقرب من كولومبيا آسيا). تحتوي هذه المناطق على فنادق بجميع الأسعار (25-200 دولار/ليلة)، مطاعم حلال، مساجد، وتبعد 15-30 دقيقة من المطار.',
        },
        {
          question: 'هل تقدمون خدمات الاستقبال من المطار؟',
          answer:
            'نعم، توفر شفاء الهند خدمات استقبال وتوصيل مجانية من المطار لجميع المرضى. سيرحب بك منسقنا الناطق بالعربية في بوابة الوصول مع لوحة الاسم. نستخدم سيارات خاصة مكيفة مع سائقين ذوي خبرة. كما يتم توفير مساعدة في شريحة SIM وصرف العملات.',
        },
        {
          question: 'هل من الآمن للنساء السفر بمفردهن إلى بنغالور؟',
          answer:
            'نعم، آمن جداً. بنغالور هي أكثر مدن الهند أماناً مع بنية تحتية ممتازة. توفر شفاء الهند دعماً على مدار الساعة مع منسقات متاحات. نرتب إقامة آمنة، ونوفر جميع وسائل النقل، ونبقى على اتصال دائم. الآلاف من المريضات من الخليج يسافرن بأمان كل عام.',
        },
        {
          question: 'هل يمكنني إحضار مرافق أو فرد من العائلة؟',
          answer:
            'بالتأكيد! نشجع على إحضار مرافق للدعم. يمكن ترتيب تأشيرة طبية لمرافق واحد. نوفر إقامة مناسبة للأزواج/العائلات بالقرب من المستشفيات. يمكن للمرافق الإقامة في نفس الغرفة في معظم الفنادق. يتم توفير مساعدة إضافية في التأشيرة والسفر.',
        },
        {
          question: 'ما هي خيارات الطعام المتاحة؟',
          answer:
            'تحتوي بنغالور على مئات المطاعم المعتمدة حلال التي تقدم المأكولات العربية والهندية والعالمية. الفنادق الكبرى لديها خيارات طعام حلال. كافتيريا المستشفيات تقدم وجبات نباتية وحلال. الشاورما والمندي والبرياني والأطباق العربية التقليدية متوفرة على نطاق واسع. يمكن لشفاء الهند التوصية بمطاعم بالقرب من إقامتك.',
        },
        {
          question: 'ماذا لو احتجت مساعدة طارئة خلال إقامتي؟',
          answer:
            'توفر شفاء الهند دعماً طارئاً على مدار الساعة عبر الهاتف وواتساب بالعربية والإنجليزية. يمكن لمنسقينا ترتيب رعاية طبية فورية، نقل المستشفى، أو أي مساعدة مطلوبة. نوفر أيضاً بطاقات اتصال الطوارئ مع جميع الأرقام المهمة بما في ذلك الشرطة المحلية (100) والإسعاف (108).',
        },
      ],
    },
    finalCta: {
      title: 'تحتاج مساعدة في التخطيط لرحلتك الطبية؟',
      subtitle: 'سيرتب منسقو السفر لدينا كل شيء من التأشيرة إلى الإقامة',
      ctaPrimary: 'اطلب مساعدة السفر',
      ctaSecondary: 'تواصل عبر واتساب',
    },
  },
};

export default function TravelClient({ locale }: Props) {
  const t = content[locale];
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheckItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <span className="text-foreground">{t.breadcrumb.travel}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Plane className="w-4 h-4 text-accent" />
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
                <ButtonLink
                  href={`/${locale}/resources`}
                  variant="outline"
                  size="lg"
                  leftIcon={<Download className="w-5 h-5" />}
                >
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

      {/* How to Reach Bangalore */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.reachBangalore.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t.reachBangalore.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.reachBangalore.countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={true} variant="default" className="h-full">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Plane className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-primary">
                        {country.name}
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <p>
                        <strong className="text-primary">
                          {locale === 'en' ? 'Airlines:' : 'الخطوط الجوية:'}
                        </strong>{' '}
                        {country.airlines}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <strong className="text-primary">
                          {locale === 'en' ? 'Duration:' : 'المدة:'}
                        </strong>{' '}
                        {country.duration}
                      </p>
                      <p>
                        <strong className="text-primary">
                          {locale === 'en' ? 'Frequency:' : 'التكرار:'}
                        </strong>{' '}
                        {country.frequency}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground/80 mt-2">
                        {country.details}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Visa Requirements */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.visa.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.visa.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Documents Needed */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card hover={false} variant="default" className="h-full">
                <CardBody>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">
                      {t.visa.requirements.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {t.visa.requirements.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </motion.div>

            {/* Visa Details */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card hover={false} variant="default" className="h-full">
                <CardBody>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">
                      {t.visa.process.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-xl bg-accent/5">
                      <span className="text-sm sm:text-base font-medium text-primary">
                        {locale === 'en' ? 'Visa Fee:' : 'رسوم التأشيرة:'}
                      </span>
                      <span className="text-lg font-bold text-accent">{t.visa.process.fee}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-accent/5">
                      <span className="text-sm sm:text-base font-medium text-primary">
                        {locale === 'en' ? 'Processing Time:' : 'وقت المعالجة:'}
                      </span>
                      <span className="text-lg font-bold text-accent">
                        {t.visa.process.processing}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-accent/5">
                      <span className="text-sm sm:text-base font-medium text-primary">
                        {locale === 'en' ? 'Validity:' : 'الصلاحية:'}
                      </span>
                      <span className="text-lg font-bold text-accent">
                        {t.visa.process.validity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-accent/5">
                      <span className="text-sm sm:text-base font-medium text-primary">
                        {locale === 'en' ? 'Entries:' : 'الدخول:'}
                      </span>
                      <span className="text-lg font-bold text-accent">
                        {t.visa.process.entries}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* How Shifa AlHind Helps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card hover={false} variant="default">
              <CardBody>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">
                    {t.visa.assistance.title}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.visa.assistance.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Country-Specific Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.visa.countryNotes.map((note, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover={false} variant="default" className="h-full">
                  <CardBody>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      <h4 className="text-base sm:text-lg font-bold text-primary">
                        {note.country}
                      </h4>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">{note.note}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport & Pickup Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.airport.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t.airport.subtitle}</p>
          </motion.div>

          {/* Airport Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card hover={false} variant="default">
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  <div>
                    <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="text-base sm:text-lg font-bold text-primary mb-2">
                      {t.airport.airportInfo.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Airport Code' : 'رمز المطار'}
                    </p>
                  </div>
                  <div>
                    <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="text-base sm:text-lg font-bold text-primary mb-2">
                      {t.airport.airportInfo.distance}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Distance' : 'المسافة'}
                    </p>
                  </div>
                  <div>
                    <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="text-base sm:text-lg font-bold text-primary mb-2">
                      {t.airport.airportInfo.travelTime}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Travel Time' : 'وقت السفر'}
                    </p>
                  </div>
                  <div>
                    <Building2 className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="text-base sm:text-lg font-bold text-primary mb-2">
                      {t.airport.airportInfo.facilities}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Facilities' : 'المرافق'}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.airport.services.items.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover={true} variant="default" className="h-full">
                  <CardBody>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-primary mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Options */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.accommodation.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.accommodation.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.accommodation.tiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card
                  hover={true}
                  variant="default"
                  className={`h-full ${idx === 1 ? 'border-2 border-accent' : ''}`}
                >
                  <CardBody>
                    <div className="text-center mb-6">
                      <Hotel className="w-12 h-12 text-accent mx-auto mb-4" />
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-primary mb-2">
                        {tier.tier}
                      </h3>
                      <div className="text-3xl font-bold text-accent mb-2">{tier.price}</div>
                      <p className="text-sm text-muted-foreground">{tier.hotels}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-center text-muted-foreground italic">
                        {tier.ideal}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Transportation */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.transportation.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t.transportation.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.transportation.options.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover={true} variant="default" className="h-full">
                  <CardBody>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <option.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-primary mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1.5 rounded-full">
                      <CreditCard className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold text-accent">{option.cost}</span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather & Best Time */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.weather.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t.weather.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {t.weather.seasons.map((season, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover={false} variant="default" className="h-full">
                  <CardBody>
                    <div className="text-center mb-4">
                      <Cloud className="w-12 h-12 text-accent mx-auto mb-3" />
                      <h3 className="text-lg sm:text-xl font-display font-bold text-primary mb-2">
                        {season.period}
                      </h3>
                      <div className="text-2xl font-bold text-accent mb-1">{season.temp}</div>
                      <div className="text-sm text-muted-foreground mb-3">{season.weather}</div>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground text-center mb-4">
                      {season.description}
                    </p>
                    <div className="text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                          idx === 0
                            ? 'bg-green-100 text-green-700'
                            : idx === 1
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {season.recommendation}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* What to Pack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card hover={false} variant="default">
              <CardBody>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">
                    {t.weather.packing.title}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.weather.packing.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Currency & Payment */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.currency.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t.currency.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.currency.info.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover={true} variant="default" className="h-full">
                  <CardBody>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Cultural Information */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.safety.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t.safety.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.safety.points.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover={true} variant="default" className="h-full">
                  <CardBody>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <point.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-primary mb-3">
                      {point.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Checklist */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
              {t.checklist.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t.checklist.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.checklist.categories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <Card hover={false} variant="default" className="h-full">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <CheckSquare className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-primary">
                        {category.category}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIdx) => {
                        const checkKey = `${category.category}-${itemIdx}`;
                        return (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <button
                              onClick={() => toggleCheckItem(category.category, itemIdx)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                checkedItems[checkKey]
                                  ? 'bg-accent border-accent'
                                  : 'border-muted-foreground/30 hover:border-accent'
                              }`}
                            >
                              {checkedItems[checkKey] && (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              )}
                            </button>
                            <span
                              className={`text-sm sm:text-base transition-all ${
                                checkedItems[checkKey]
                                  ? 'text-muted-foreground/50 line-through'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
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

      {/* Final CTA Section */}
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
                leftIcon={<Plane className="w-5 h-5" />}
              >
                {t.finalCta.ctaPrimary}
              </ButtonLink>
              <ButtonLink
                href="https://wa.me/919999999999"
                variant="outline"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                {t.finalCta.ctaSecondary}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
