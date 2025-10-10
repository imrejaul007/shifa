'use client';

import { motion } from 'framer-motion';
import {
  Plane,
  FileText,
  Stethoscope,
  Hotel,
  Car,
  Languages,
  Phone,
  Wallet,
  Shield,
  Heart,
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface Props {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Our Services',
    subtitle: 'Comprehensive Medical Tourism Support',
    tagline: 'From visa to recovery, we handle everything for your medical journey',

    services: [
      {
        icon: FileText,
        title: 'Pre-Arrival Services',
        description: 'Complete support before you travel to India',
        features: [
          'Free medical consultation and second opinion',
          'Treatment plan and cost estimate',
          'Medical visa invitation letter',
          'Visa application assistance',
          'Travel planning and flight booking guidance',
          'Pre-departure checklist and instructions',
        ],
      },
      {
        icon: Plane,
        title: 'Arrival & Airport Services',
        description: 'Seamless airport assistance and transportation',
        features: [
          'Airport meet and greet service',
          'Assistance with immigration and customs',
          'Comfortable air-conditioned transport',
          'Direct transfer to hospital or hotel',
          'Mobile SIM card and local currency exchange',
          'Welcome kit with essential information',
        ],
      },
      {
        icon: Stethoscope,
        title: 'Medical Coordination',
        description: 'Expert medical facilitation throughout treatment',
        features: [
          'Appointment scheduling with top specialists',
          'Hospital admission and discharge procedures',
          'Medical records management',
          'Treatment monitoring and updates',
          'Coordination between multiple specialists',
          'Post-treatment follow-up care',
        ],
      },
      {
        icon: Languages,
        title: 'Translation & Interpretation',
        description: 'Native Arabic speakers for clear communication',
        features: [
          '24/7 Arabic-speaking coordinators',
          'Medical interpretation during consultations',
          'Translation of medical reports and documents',
          'Assistance with hospital paperwork',
          'Cultural mediation and support',
          'WhatsApp support group',
        ],
      },
      {
        icon: Hotel,
        title: 'Accommodation Services',
        description: 'Comfortable stays near hospitals',
        features: [
          'Partner hotels at discounted rates',
          'Recovery homes with nursing care',
          'Halal food options available',
          'Prayer facilities and Qibla direction',
          'Family accommodation arrangements',
          'Extended stay options for recovery',
        ],
      },
      {
        icon: Car,
        title: 'Local Transportation',
        description: 'Reliable transport for all appointments',
        features: [
          'Daily hospital pickup and drop-off',
          'Transport for follow-up appointments',
          'Pharmacy and diagnostic center visits',
          'Local sightseeing (if desired)',
          'Wheelchair accessible vehicles available',
          'Attendant support if needed',
        ],
      },
      {
        icon: Wallet,
        title: 'Financial Services',
        description: 'Transparent pricing and payment assistance',
        features: [
          'Detailed cost breakdown before travel',
          'No hidden fees or surprise charges',
          'Multiple payment options accepted',
          'Insurance claim assistance',
          'Currency exchange guidance',
          'Receipt and documentation for reimbursement',
        ],
      },
      {
        icon: Phone,
        title: '24/7 Support',
        description: 'Round-the-clock assistance throughout your stay',
        features: [
          'Dedicated case manager assigned',
          'Emergency hotline available 24/7',
          'Family updates and communication',
          'Problem resolution and escalation',
          'Emotional support and counseling',
          'Post-return follow-up calls',
        ],
      },
      {
        icon: Heart,
        title: 'Post-Treatment Care',
        description: 'Continued support after you return home',
        features: [
          'Detailed discharge summary and reports',
          'Medication supply for initial period',
          'Remote consultation with doctors',
          'Follow-up appointment coordination',
          'Telemedicine support if needed',
          'Long-term care planning',
        ],
      },
    ],

    whyDifferent: {
      title: 'What Makes Us Different',
      points: [
        {
          icon: Users,
          title: 'Personal Case Manager',
          description: 'A dedicated coordinator manages your entire journey from start to finish',
        },
        {
          icon: Shield,
          title: 'Quality Assurance',
          description: 'Only JCI-accredited hospitals and board-certified doctors',
        },
        {
          icon: Languages,
          title: 'Native Arabic Speakers',
          description: 'Our team includes native Arabic speakers who understand your culture',
        },
        {
          icon: Wallet,
          title: 'Transparent Pricing',
          description: 'All costs detailed upfront with no hidden fees or surprises',
        },
        {
          icon: Clock,
          title: 'Quick Response',
          description: 'We respond to all inquiries within 24 hours, often much faster',
        },
        {
          icon: Heart,
          title: 'Compassionate Care',
          description: 'We treat our patients like family with empathy and respect',
        },
      ],
    },

    process: {
      title: 'How It Works',
      steps: [
        {
          number: '1',
          title: 'Initial Consultation',
          description:
            'Share your medical reports and we provide a treatment plan with cost estimate',
        },
        {
          number: '2',
          title: 'Planning & Booking',
          description: 'We arrange hospital appointments, visa invitation, and travel logistics',
        },
        {
          number: '3',
          title: 'Arrival & Admission',
          description: 'Airport pickup, hotel check-in, and hospital admission with full support',
        },
        {
          number: '4',
          title: 'Treatment & Care',
          description: 'Expert medical care with our coordinators by your side throughout',
        },
        {
          number: '5',
          title: 'Recovery & Return',
          description: 'Post-treatment care, discharge planning, and safe return home',
        },
        {
          number: '6',
          title: 'Follow-Up',
          description: 'Continued support, remote consultations, and long-term care coordination',
        },
      ],
    },

    cta: {
      title: 'Ready to Get Started?',
      description: 'Book a free consultation to discuss your medical needs',
      button: 'Book Free Consultation',
    },
  },

  ar: {
    title: 'خدماتنا',
    subtitle: 'دعم شامل للسياحة العلاجية',
    tagline: 'من التأشيرة إلى التعافي، نتعامل مع كل شيء لرحلتك الطبية',

    services: [
      {
        icon: FileText,
        title: 'خدمات ما قبل الوصول',
        description: 'دعم كامل قبل سفرك إلى الهند',
        features: [
          'استشارة طبية مجانية ورأي ثان',
          'خطة العلاج وتقدير التكلفة',
          'خطاب دعوة للحصول على تأشيرة طبية',
          'المساعدة في طلب التأشيرة',
          'تخطيط السفر وإرشادات حجز الطيران',
          'قائمة مرجعية قبل المغادرة والتعليمات',
        ],
      },
      {
        icon: Plane,
        title: 'خدمات الوصول والمطار',
        description: 'مساعدة سلسة في المطار والنقل',
        features: [
          'خدمة الاستقبال في المطار',
          'المساعدة في الهجرة والجمارك',
          'نقل مريح بسيارة مكيفة',
          'نقل مباشر إلى المستشفى أو الفندق',
          'بطاقة SIM للهاتف المحمول وصرف العملات المحلية',
          'مجموعة ترحيبية مع المعلومات الأساسية',
        ],
      },
      {
        icon: Stethoscope,
        title: 'التنسيق الطبي',
        description: 'تسهيل طبي متخصص طوال فترة العلاج',
        features: [
          'جدولة المواعيد مع كبار الأطباء',
          'إجراءات القبول والخروج من المستشفى',
          'إدارة السجلات الطبية',
          'مراقبة العلاج والتحديثات',
          'التنسيق بين عدة أخصائيين',
          'رعاية المتابعة بعد العلاج',
        ],
      },
      {
        icon: Languages,
        title: 'الترجمة والتفسير',
        description: 'متحدثون أصليون بالعربية للتواصل الواضح',
        features: [
          'منسقون ناطقون بالعربية على مدار الساعة',
          'تفسير طبي أثناء الاستشارات',
          'ترجمة التقارير الطبية والوثائق',
          'المساعدة في الأوراق الخاصة بالمستشفى',
          'الوساطة الثقافية والدعم',
          'مجموعة دعم عبر WhatsApp',
        ],
      },
      {
        icon: Hotel,
        title: 'خدمات الإقامة',
        description: 'إقامة مريحة بالقرب من المستشفيات',
        features: [
          'فنادق شريكة بأسعار مخفضة',
          'منازل للتعافي مع رعاية تمريضية',
          'خيارات طعام حلال متاحة',
          'مرافق الصلاة واتجاه القبلة',
          'ترتيبات إقامة للعائلة',
          'خيارات الإقامة الممتدة للتعافي',
        ],
      },
      {
        icon: Car,
        title: 'النقل المحلي',
        description: 'نقل موثوق لجميع المواعيد',
        features: [
          'الذهاب والعودة اليومية من المستشفى',
          'النقل لمواعيد المتابعة',
          'زيارات الصيدلية ومركز التشخيص',
          'مشاهدة المعالم المحلية (إذا رغبت)',
          'مركبات يمكن الوصول إليها بالكراسي المتحركة متاحة',
          'دعم المرافق إذا لزم الأمر',
        ],
      },
      {
        icon: Wallet,
        title: 'الخدمات المالية',
        description: 'تسعير شفاف والمساعدة في الدفع',
        features: [
          'تفصيل التكلفة التفصيلي قبل السفر',
          'لا توجد رسوم خفية أو رسوم مفاجئة',
          'خيارات دفع متعددة مقبولة',
          'المساعدة في المطالبة بالتأمين',
          'إرشادات صرف العملات',
          'الإيصالات والوثائق للسداد',
        ],
      },
      {
        icon: Phone,
        title: 'دعم على مدار الساعة',
        description: 'مساعدة على مدار الساعة طوال فترة إقامتك',
        features: [
          'مدير حالة مخصص معين',
          'خط ساخن للطوارئ متاح على مدار الساعة',
          'تحديثات العائلة والتواصل',
          'حل المشاكل والتصعيد',
          'الدعم العاطفي والاستشارة',
          'مكالمات المتابعة بعد العودة',
        ],
      },
      {
        icon: Heart,
        title: 'الرعاية بعد العلاج',
        description: 'دعم مستمر بعد عودتك إلى الوطن',
        features: [
          'ملخص الخروج التفصيلي والتقارير',
          'إمدادات الدواء للفترة الأولية',
          'استشارة عن بعد مع الأطباء',
          'تنسيق مواعيد المتابعة',
          'دعم الطب عن بعد إذا لزم الأمر',
          'تخطيط الرعاية طويلة الأجل',
        ],
      },
    ],

    whyDifferent: {
      title: 'ما الذي يجعلنا مختلفين',
      points: [
        {
          icon: Users,
          title: 'مدير حالة شخصي',
          description: 'منسق مخصص يدير رحلتك بأكملها من البداية إلى النهاية',
        },
        {
          icon: Shield,
          title: 'ضمان الجودة',
          description: 'مستشفيات معتمدة من JCI وأطباء معتمدون فقط',
        },
        {
          icon: Languages,
          title: 'متحدثون أصليون بالعربية',
          description: 'فريقنا يضم متحدثين أصليين بالعربية يفهمون ثقافتك',
        },
        {
          icon: Wallet,
          title: 'تسعير شفاف',
          description: 'جميع التكاليف مفصلة مقدمًا بدون رسوم خفية أو مفاجآت',
        },
        {
          icon: Clock,
          title: 'استجابة سريعة',
          description: 'نرد على جميع الاستفسارات في غضون 24 ساعة، وغالبًا أسرع بكثير',
        },
        {
          icon: Heart,
          title: 'رعاية متعاطفة',
          description: 'نعامل مرضانا كعائلة بتعاطف واحترام',
        },
      ],
    },

    process: {
      title: 'كيف يعمل',
      steps: [
        {
          number: '1',
          title: 'الاستشارة الأولية',
          description: 'شارك تقاريرك الطبية ونقدم خطة علاج مع تقدير التكلفة',
        },
        {
          number: '2',
          title: 'التخطيط والحجز',
          description: 'نرتب مواعيد المستشفى ودعوة التأشيرة والخدمات اللوجستية للسفر',
        },
        {
          number: '3',
          title: 'الوصول والقبول',
          description:
            'الاستقبال في المطار وتسجيل الوصول في الفندق والقبول في المستشفى مع الدعم الكامل',
        },
        {
          number: '4',
          title: 'العلاج والرعاية',
          description: 'رعاية طبية متخصصة مع منسقينا بجانبك طوال الوقت',
        },
        {
          number: '5',
          title: 'التعافي والعودة',
          description: 'رعاية ما بعد العلاج وتخطيط الخروج والعودة الآمنة إلى الوطن',
        },
        {
          number: '6',
          title: 'المتابعة',
          description: 'دعم مستمر واستشارات عن بعد وتنسيق الرعاية طويلة الأجل',
        },
      ],
    },

    cta: {
      title: 'هل أنت مستعد للبدء؟',
      description: 'احجز استشارة مجانية لمناقشة احتياجاتك الطبية',
      button: 'احجز استشارة مجانية',
    },
  },
};

export default function ServicesClient({ locale }: Props) {
  const t = content[locale];

  return (
    <main
      className={`min-h-screen bg-background ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-primary mb-6">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-accent mb-4">{t.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground">{t.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="default" className="h-full">
                    <CardBody>
                      <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-accent mb-4" />
                      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-primary mb-12 text-center"
          >
            {t.whyDifferent.title}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {t.whyDifferent.points.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="outline" className="h-full">
                    <CardBody className="text-center">
                      <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-accent mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                        {point.title}
                      </h3>
                      <p className="text-muted-foreground">{point.description}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-primary mb-12 text-center"
          >
            {t.process.title}
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            {t.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-base sm:text-lg text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8">{t.cta.description}</p>
            <ButtonLink
              href={`/${locale}/consultation`}
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
