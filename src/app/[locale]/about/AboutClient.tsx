'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  Shield,
  Users,
  Globe,
  Award,
  Target,
  Eye,
  CheckCircle2,
  Building2,
  Stethoscope,
  Plane,
  Languages,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface Props {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'About Shifa AlHind',
    subtitle: 'Your Trusted Medical Tourism Partner',
    tagline: 'Connecting GCC patients with world-class healthcare in India since 2020',

    story: {
      title: 'Our Story',
      paragraphs: [
        'Shifa AlHind was founded with a simple yet powerful mission: to make world-class medical care accessible and affordable for patients from the GCC region. We recognized the challenges faced by Arabic-speaking patients seeking treatment abroad – language barriers, cultural differences, complex logistics, and uncertainty about quality of care.',
        'What started as a small team of passionate medical tourism coordinators has grown into a comprehensive healthcare facilitation service, trusted by thousands of families across the Gulf region. We combine deep cultural understanding with extensive medical expertise to create a seamless, comfortable healthcare journey.',
        'Today, we proudly partner with India\'s top JCI-accredited hospitals and internationally trained doctors, offering treatments across 50+ specialties at costs 60-80% lower than Western countries, without compromising on quality or safety.',
      ],
    },

    mission: {
      title: 'Our Mission',
      description: 'To provide seamless, culturally sensitive medical tourism services that bridge the gap between GCC patients and world-class healthcare in India, ensuring affordable, high-quality treatment with dignity and care.',
    },

    vision: {
      title: 'Our Vision',
      description: 'To become the most trusted medical tourism partner for the GCC region, known for exceptional patient care, transparency, and successful health outcomes that transform lives.',
    },

    values: [
      {
        icon: Heart,
        title: 'Patient-First Care',
        description: 'Every decision we make prioritizes patient well-being, comfort, and successful outcomes.',
      },
      {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'We partner only with JCI-accredited hospitals and board-certified doctors.',
      },
      {
        icon: Globe,
        title: 'Cultural Sensitivity',
        description: 'Deep understanding of Arabic culture, halal food, prayer facilities, and family values.',
      },
      {
        icon: Users,
        title: 'Personalized Support',
        description: '24/7 Arabic-speaking coordinators guide you through every step of your journey.',
      },
      {
        icon: CheckCircle2,
        title: 'Transparency',
        description: 'Clear pricing, honest communication, and no hidden costs.',
      },
      {
        icon: Award,
        title: 'Excellence',
        description: 'Continuous pursuit of the highest standards in medical facilitation.',
      },
    ],

    stats: [
      { number: '5000+', label: 'Patients Served', icon: Users },
      { number: '20+', label: 'Partner Hospitals', icon: Building2 },
      { number: '50+', label: 'Medical Specialties', icon: Stethoscope },
      { number: '6', label: 'GCC Countries', icon: Plane },
      { number: '15+', label: 'Languages Supported', icon: Languages },
      { number: '98%', label: 'Success Rate', icon: TrendingUp },
    ],

    whyChoose: {
      title: 'Why Choose Shifa AlHind?',
      reasons: [
        {
          icon: Languages,
          title: 'Arabic Language Support',
          description: 'Native Arabic speakers throughout your journey – from first inquiry to post-treatment follow-up.',
        },
        {
          icon: Shield,
          title: 'JCI-Accredited Hospitals',
          description: 'All our partner hospitals meet international quality and safety standards.',
        },
        {
          icon: Heart,
          title: 'Comprehensive Care Packages',
          description: 'All-inclusive packages covering medical care, accommodation, meals, and local transport.',
        },
        {
          icon: Plane,
          title: 'End-to-End Coordination',
          description: 'From visa assistance to airport pickup, hospital admission to post-discharge care.',
        },
        {
          icon: CheckCircle2,
          title: 'Transparent Pricing',
          description: 'Clear, upfront costs with no hidden fees. 60-80% savings compared to GCC countries.',
        },
        {
          icon: Globe,
          title: 'Cultural Understanding',
          description: 'Halal meals, prayer facilities, gender-specific care, and respect for Islamic values.',
        },
      ],
    },

    cta: {
      title: 'Ready to Start Your Medical Journey?',
      description: 'Join thousands of satisfied patients who trusted us with their healthcare',
      button: 'Book Free Consultation',
    },
  },

  ar: {
    title: 'عن شفاء الهند',
    subtitle: 'شريكك الموثوق في السياحة العلاجية',
    tagline: 'نربط مرضى دول مجلس التعاون الخليجي برعاية صحية عالمية المستوى في الهند منذ 2020',

    story: {
      title: 'قصتنا',
      paragraphs: [
        'تأسست شفاء الهند بمهمة بسيطة ولكنها قوية: جعل الرعاية الطبية ذات المستوى العالمي متاحة وميسورة التكلفة للمرضى من منطقة دول مجلس التعاون الخليجي. لقد أدركنا التحديات التي يواجهها المرضى الناطقون بالعربية الذين يسعون للعلاج في الخارج - حواجز اللغة والاختلافات الثقافية والخدمات اللوجستية المعقدة وعدم اليقين بشأن جودة الرعاية.',
        'ما بدأ كفريق صغير من منسقي السياحة العلاجية المتحمسين نما ليصبح خدمة شاملة لتسهيل الرعاية الصحية، موثوق بها من قبل آلاف العائلات عبر منطقة الخليج. نحن نجمع بين الفهم الثقافي العميق والخبرة الطبية الواسعة لخلق رحلة رعاية صحية سلسة ومريحة.',
        'اليوم، نفخر بالشراكة مع أفضل المستشفيات المعتمدة من JCI في الهند والأطباء المدربين دوليًا، ونقدم علاجات في أكثر من 50 تخصصًا بتكاليف أقل بنسبة 60-80٪ من الدول الغربية، دون المساس بالجودة أو السلامة.',
      ],
    },

    mission: {
      title: 'مهمتنا',
      description: 'تقديم خدمات سياحة علاجية سلسة وحساسة ثقافيًا تربط بين مرضى دول مجلس التعاون الخليجي والرعاية الصحية عالمية المستوى في الهند، مما يضمن علاجًا عالي الجودة وبأسعار معقولة بكرامة ورعاية.',
    },

    vision: {
      title: 'رؤيتنا',
      description: 'أن نصبح الشريك الأكثر موثوقية في السياحة العلاجية لمنطقة دول مجلس التعاون الخليجي، المعروف برعاية المرضى الاستثنائية والشفافية والنتائج الصحية الناجحة التي تحول الحياة.',
    },

    values: [
      {
        icon: Heart,
        title: 'رعاية المريض أولاً',
        description: 'كل قرار نتخذه يعطي الأولوية لرفاهية المريض وراحته ونتائجه الناجحة.',
      },
      {
        icon: Shield,
        title: 'ضمان الجودة',
        description: 'نتعاون فقط مع المستشفيات المعتمدة من JCI والأطباء المعتمدين.',
      },
      {
        icon: Globe,
        title: 'الحساسية الثقافية',
        description: 'فهم عميق للثقافة العربية والطعام الحلال ومرافق الصلاة والقيم العائلية.',
      },
      {
        icon: Users,
        title: 'دعم شخصي',
        description: 'منسقون ناطقون بالعربية على مدار الساعة طوال أيام الأسبوع يرشدونك خلال كل خطوة من رحلتك.',
      },
      {
        icon: CheckCircle2,
        title: 'الشفافية',
        description: 'تسعير واضح وتواصل صادق وبدون تكاليف خفية.',
      },
      {
        icon: Award,
        title: 'التميز',
        description: 'السعي المستمر لأعلى المعايير في تسهيل الخدمات الطبية.',
      },
    ],

    stats: [
      { number: '5000+', label: 'مريض تم خدمته', icon: Users },
      { number: '20+', label: 'مستشفى شريك', icon: Building2 },
      { number: '50+', label: 'تخصص طبي', icon: Stethoscope },
      { number: '6', label: 'دول مجلس التعاون الخليجي', icon: Plane },
      { number: '15+', label: 'لغة مدعومة', icon: Languages },
      { number: '98%', label: 'معدل النجاح', icon: TrendingUp },
    ],

    whyChoose: {
      title: 'لماذا تختار شفاء الهند؟',
      reasons: [
        {
          icon: Languages,
          title: 'دعم اللغة العربية',
          description: 'متحدثون أصليون بالعربية طوال رحلتك - من الاستفسار الأول إلى المتابعة بعد العلاج.',
        },
        {
          icon: Shield,
          title: 'مستشفيات معتمدة من JCI',
          description: 'جميع مستشفياتنا الشريكة تلبي معايير الجودة والسلامة الدولية.',
        },
        {
          icon: Heart,
          title: 'باقات رعاية شاملة',
          description: 'باقات شاملة تغطي الرعاية الطبية والإقامة والوجبات والنقل المحلي.',
        },
        {
          icon: Plane,
          title: 'تنسيق شامل',
          description: 'من المساعدة في التأشيرة إلى الاستقبال في المطار، والقبول في المستشفى إلى الرعاية بعد الخروج.',
        },
        {
          icon: CheckCircle2,
          title: 'تسعير شفاف',
          description: 'تكاليف واضحة ومقدمة بدون رسوم خفية. توفير 60-80٪ مقارنة بدول مجلس التعاون الخليجي.',
        },
        {
          icon: Globe,
          title: 'فهم ثقافي',
          description: 'وجبات حلال ومرافق صلاة ورعاية خاصة بالجنس واحترام القيم الإسلامية.',
        },
      ],
    },

    cta: {
      title: 'هل أنت مستعد لبدء رحلتك الطبية؟',
      description: 'انضم إلى آلاف المرضى الراضين الذين وثقوا بنا في رعايتهم الصحية',
      button: 'احجز استشارة مجانية',
    },
  },
};

export default function AboutClient({ locale }: Props) {
  const t = content[locale];

  return (
    <main
      className={`min-h-screen bg-background ${locale === 'ar' ? 'font-arabic' : ''}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-6">
              {t.title}
            </h1>
            <p className="text-2xl text-accent mb-4">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground">{t.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {t.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-accent" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 text-center">
                {t.story.title}
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                {t.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="default" className="h-full">
                <CardBody className="text-center">
                  <Target className="w-16 h-16 text-accent mx-auto mb-6" />
                  <h3 className="text-3xl font-display font-bold text-primary mb-4">
                    {t.mission.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.mission.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="default" className="h-full">
                <CardBody className="text-center">
                  <Eye className="w-16 h-16 text-accent mx-auto mb-6" />
                  <h3 className="text-3xl font-display font-bold text-primary mb-4">
                    {t.vision.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.vision.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-12 text-center"
          >
            {locale === 'ar' ? 'قيمنا' : 'Our Values'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.values.map((value, index) => {
              const Icon = value.icon;
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
                      <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-12 text-center"
          >
            {t.whyChoose.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.whyChoose.reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="default" className="h-full">
                    <CardBody>
                      <Icon className="w-10 h-10 text-accent mb-4" />
                      <h3 className="text-xl font-bold text-primary mb-3">{reason.title}</h3>
                      <p className="text-muted-foreground">{reason.description}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">{t.cta.description}</p>
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
