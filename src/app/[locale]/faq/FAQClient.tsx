'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';

interface Props {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find Answers to Common Questions',
    tagline: 'Everything you need to know about medical tourism in India',
    search: 'Search for questions...',

    faqs: [
      {
        category: 'General',
        questions: [
          {
            q: 'Why choose India for medical treatment?',
            a: 'India offers world-class medical care at 60-80% lower costs than Western countries. Our partner hospitals are JCI-accredited with internationally trained doctors, latest technology, and high success rates. India is also culturally close to the GCC region with halal food, prayer facilities, and Arabic-speaking staff available.',
          },
          {
            q: 'Is the quality of medical care in India comparable to Western countries?',
            a: 'Absolutely. Our partner hospitals are JCI (Joint Commission International) accredited, which is the gold standard in healthcare worldwide. Many doctors are trained at prestigious institutions in the US, UK, and Europe. India performs more cardiac surgeries and joint replacements than most developed nations.',
          },
          {
            q: 'What treatments are available?',
            a: 'We facilitate over 50 medical specialties including cardiac surgery, orthopedics, oncology, neurosurgery, fertility treatments, cosmetic surgery, organ transplants, dental care, and more. Contact us for specific treatments not listed.',
          },
        ],
      },
      {
        category: 'Cost & Payment',
        questions: [
          {
            q: 'How much can I save on treatment in India?',
            a: 'Patients typically save 60-80% compared to treatment costs in the US, UK, or GCC countries. For example, a heart bypass surgery that costs $100,000 in the US costs around $6,500 in India with the same quality of care.',
          },
          {
            q: 'What is included in the treatment cost?',
            a: 'Our packages include: medical consultation, diagnostic tests, surgical procedure, hospital stay, medications, nursing care, and follow-up visits. We provide a detailed cost breakdown before you travel with no hidden fees.',
          },
          {
            q: 'What payment methods are accepted?',
            a: 'We accept bank transfers, credit cards, and cash payments. Payment can be made in installments: deposit before travel and balance after treatment. We provide receipts and documentation for insurance reimbursement.',
          },
          {
            q: 'Can I use my insurance?',
            a: 'Many international insurance companies cover medical tourism. We provide all necessary documentation for insurance claims. Check with your insurance provider about coverage for treatment in India.',
          },
        ],
      },
      {
        category: 'Visa & Travel',
        questions: [
          {
            q: 'Do I need a special visa for medical treatment?',
            a: 'Yes, you need a Medical Visa (M-Visa) or Medical Attendant Visa (MX-Visa) for companions. We provide the medical invitation letter required for visa application and guide you through the entire process.',
          },
          {
            q: 'How long does it take to get a medical visa?',
            a: 'Medical visas are usually processed within 3-5 business days. We recommend applying at least 2 weeks before travel. E-medical visas are available for some nationalities with faster processing.',
          },
          {
            q: 'Can my family members accompany me?',
            a: 'Yes, up to 2 attendants can accompany you on Medical Attendant Visa (MX-Visa). We arrange accommodation for family members and provide family-friendly facilities.',
          },
        ],
      },
      {
        category: 'Accommodation & Stay',
        questions: [
          {
            q: 'Where will I stay during treatment?',
            a: 'We arrange accommodation at hospitals, recovery homes near hospitals, or partner hotels based on your preference and budget. All options include halal food, prayer facilities, and are close to the medical facility.',
          },
          {
            q: 'Is halal food available?',
            a: 'Yes, all our accommodation options provide halal food. India has a large Muslim population, so halal restaurants and meals are widely available. We ensure your dietary requirements are met.',
          },
          {
            q: 'How long will I need to stay in India?',
            a: 'It depends on the treatment. Simple procedures may require 1-2 weeks, while complex surgeries might need 3-4 weeks including recovery. We provide a detailed timeline before your travel.',
          },
        ],
      },
      {
        category: 'Language & Support',
        questions: [
          {
            q: 'Will there be Arabic-speaking staff?',
            a: 'Yes, we provide Arabic-speaking coordinators throughout your journey. Many of our partner hospitals also have Arabic-speaking staff. All medical reports and documents can be translated to Arabic.',
          },
          {
            q: 'What support do you provide during my stay?',
            a: 'You get a dedicated case manager, 24/7 emergency hotline, airport pickup/drop-off, daily hospital transport, medical appointment coordination, translation services, and assistance with any issues.',
          },
          {
            q: 'What happens after I return home?',
            a: 'We provide post-treatment follow-up including remote consultations with your doctors, medication management, and coordination of any required follow-up care. Your case manager stays in touch.',
          },
        ],
      },
      {
        category: 'Medical Care',
        questions: [
          {
            q: 'How are doctors and hospitals selected?',
            a: 'We partner only with JCI-accredited hospitals and board-certified doctors with international training. We verify credentials, success rates, and patient reviews before partnership.',
          },
          {
            q: 'Can I choose my doctor?',
            a: 'Yes, we provide profiles of specialists for your condition and you can choose your preferred doctor. We also arrange second opinions if desired.',
          },
          {
            q: 'What if complications arise during treatment?',
            a: 'All our hospitals have 24/7 emergency services and ICU facilities. Your coordinator stays with you, and we have protocols for any complications. Emergency care is included in packages.',
          },
          {
            q: 'Are medications and implants genuine?',
            a: 'All medications and implants used are FDA/CE approved international brands. India is a global hub for pharmaceutical manufacturing with strict quality control.',
          },
        ],
      },
    ],

    cta: {
      title: 'Still Have Questions?',
      description: 'Contact us for personalized answers to your medical queries',
      button: 'Get in Touch',
    },
  },

  ar: {
    title: 'الأسئلة الشائعة',
    subtitle: 'أجوبة على الأسئلة الشائعة',
    tagline: 'كل ما تحتاج معرفته عن السياحة العلاجية في الهند',
    search: 'بحث عن الأسئلة...',

    faqs: [
      {
        category: 'عام',
        questions: [
          {
            q: 'لماذا اختيار الهند للعلاج الطبي؟',
            a: 'تقدم الهند رعاية طبية عالمية المستوى بتكاليف أقل بنسبة 60-80٪ من الدول الغربية. مستشفياتنا الشريكة معتمدة من JCI مع أطباء مدربين دوليًا وأحدث التقنيات ومعدلات نجاح عالية. الهند أيضًا قريبة ثقافيًا من منطقة دول مجلس التعاون الخليجي مع الطعام الحلال ومرافق الصلاة والموظفين الناطقين بالعربية.',
          },
          {
            q: 'هل جودة الرعاية الطبية في الهند قابلة للمقارنة مع الدول الغربية؟',
            a: 'بالتأكيد. مستشفياتنا الشريكة معتمدة من JCI (اللجنة الدولية المشتركة)، وهو المعيار الذهبي في الرعاية الصحية في جميع أنحاء العالم. العديد من الأطباء مدربون في مؤسسات مرموقة في الولايات المتحدة والمملكة المتحدة وأوروبا. تجري الهند عمليات جراحية للقلب واستبدال المفاصل أكثر من معظم الدول المتقدمة.',
          },
          {
            q: 'ما هي العلاجات المتاحة؟',
            a: 'نسهل أكثر من 50 تخصصًا طبيًا بما في ذلك جراحة القلب وجراحة العظام وعلاج الأورام وجراحة الأعصاب وعلاجات الخصوبة والجراحة التجميلية وزراعة الأعضاء ورعاية الأسنان والمزيد. اتصل بنا للحصول على علاجات محددة غير مدرجة.',
          },
        ],
      },
      {
        category: 'التكلفة والدفع',
        questions: [
          {
            q: 'كم يمكنني توفير على العلاج في الهند؟',
            a: 'يوفر المرضى عادةً 60-80٪ مقارنة بتكاليف العلاج في الولايات المتحدة أو المملكة المتحدة أو دول مجلس التعاون الخليجي. على سبيل المثال، جراحة تحويل مسار القلب التي تكلف 100000 دولار في الولايات المتحدة تكلف حوالي 6500 دولار في الهند بنفس جودة الرعاية.',
          },
          {
            q: 'ما الذي يتضمنه تكلفة العلاج؟',
            a: 'تشمل باقاتنا: الاستشارة الطبية، الفحوصات التشخيصية، الإجراء الجراحي، الإقامة في المستشفى، الأدوية، الرعاية التمريضية، وزيارات المتابعة. نقدم تفصيلاً تفصيليًا للتكلفة قبل سفرك بدون رسوم خفية.',
          },
          {
            q: 'ما هي طرق الدفع المقبولة؟',
            a: 'نقبل التحويلات المصرفية وبطاقات الائتمان والمدفوعات النقدية. يمكن سداد الدفع على أقساط: وديعة قبل السفر والرصيد بعد العلاج. نقدم إيصالات ووثائق للمطالبة بالتأمين.',
          },
          {
            q: 'هل يمكنني استخدام التأمين الخاص بي؟',
            a: 'العديد من شركات التأمين الدولية تغطي السياحة العلاجية. نقدم جميع الوثائق اللازمة للمطالبة بالتأمين. تحقق مع مزود التأمين الخاص بك حول التغطية للعلاج في الهند.',
          },
        ],
      },
      {
        category: 'التأشيرة والسفر',
        questions: [
          {
            q: 'هل أحتاج إلى تأشيرة خاصة للعلاج الطبي؟',
            a: 'نعم، تحتاج إلى تأشيرة طبية (M-Visa) أو تأشيرة مرافق طبي (MX-Visa) للمرافقين. نقدم خطاب الدعوة الطبية المطلوب لطلب التأشيرة ونرشدك خلال العملية بأكملها.',
          },
          {
            q: 'كم من الوقت يستغرق الحصول على تأشيرة طبية؟',
            a: 'عادة ما تتم معالجة التأشيرات الطبية في غضون 3-5 أيام عمل. نوصي بالتقديم قبل السفر بأسبوعين على الأقل. التأشيرات الطبية الإلكترونية متاحة لبعض الجنسيات مع معالجة أسرع.',
          },
          {
            q: 'هل يمكن لأفراد عائلتي مرافقتي؟',
            a: 'نعم، يمكن لما يصل إلى 2 مرافقين مرافقتك بتأشيرة مرافق طبي (MX-Visa). نرتب الإقامة لأفراد الأسرة ونوفر مرافق صديقة للعائلة.',
          },
        ],
      },
      {
        category: 'الإقامة والبقاء',
        questions: [
          {
            q: 'أين سأقيم أثناء العلاج؟',
            a: 'نرتب الإقامة في المستشفيات أو منازل التعافي بالقرب من المستشفيات أو الفنادق الشريكة بناءً على تفضيلاتك وميزانيتك. جميع الخيارات تشمل الطعام الحلال ومرافق الصلاة وقريبة من المنشأة الطبية.',
          },
          {
            q: 'هل الطعام الحلال متاح؟',
            a: 'نعم، جميع خيارات الإقامة لدينا توفر الطعام الحلال. الهند لديها عدد كبير من السكان المسلمين، لذا فإن المطاعم والوجبات الحلال متاحة على نطاق واسع. نضمن تلبية متطلباتك الغذائية.',
          },
          {
            q: 'كم من الوقت سأحتاج للبقاء في الهند؟',
            a: 'يعتمد على العلاج. قد تتطلب الإجراءات البسيطة 1-2 أسبوع، بينما قد تحتاج العمليات الجراحية المعقدة إلى 3-4 أسابيع بما في ذلك التعافي. نقدم جدولًا زمنيًا تفصيليًا قبل سفرك.',
          },
        ],
      },
      {
        category: 'اللغة والدعم',
        questions: [
          {
            q: 'هل سيكون هناك موظفون ناطقون بالعربية؟',
            a: 'نعم، نوفر منسقين ناطقين بالعربية طوال رحلتك. العديد من مستشفياتنا الشريكة لديها أيضًا موظفون ناطقون بالعربية. يمكن ترجمة جميع التقارير الطبية والوثائق إلى العربية.',
          },
          {
            q: 'ما الدعم الذي تقدمونه أثناء إقامتي؟',
            a: 'تحصل على مدير حالة مخصص، خط ساخن للطوارئ على مدار الساعة، الاستقبال/التوصيل من المطار، النقل اليومي إلى المستشفى، تنسيق المواعيد الطبية، خدمات الترجمة، والمساعدة في أي مشاكل.',
          },
          {
            q: 'ماذا يحدث بعد عودتي إلى الوطن؟',
            a: 'نقدم متابعة ما بعد العلاج بما في ذلك الاستشارات عن بعد مع أطبائك، إدارة الأدوية، وتنسيق أي رعاية متابعة مطلوبة. يبقى مدير حالتك على اتصال.',
          },
        ],
      },
      {
        category: 'الرعاية الطبية',
        questions: [
          {
            q: 'كيف يتم اختيار الأطباء والمستشفيات؟',
            a: 'نتعاون فقط مع المستشفيات المعتمدة من JCI والأطباء المعتمدين مع التدريب الدولي. نتحقق من الاعتمادات ومعدلات النجاح ومراجعات المرضى قبل الشراكة.',
          },
          {
            q: 'هل يمكنني اختيار طبيبي؟',
            a: 'نعم، نقدم ملفات تعريف للمتخصصين لحالتك ويمكنك اختيار طبيبك المفضل. نرتب أيضًا آراء ثانية إذا رغبت.',
          },
          {
            q: 'ماذا لو نشأت مضاعفات أثناء العلاج؟',
            a: 'جميع مستشفياتنا لديها خدمات طوارئ على مدار الساعة ومرافق ICU. منسقك يبقى معك، ولدينا بروتوكولات لأي مضاعفات. الرعاية الطارئة مشمولة في الباقات.',
          },
          {
            q: 'هل الأدوية والغرسات أصلية؟',
            a: 'جميع الأدوية والغرسات المستخدمة معتمدة من FDA/CE من العلامات التجارية الدولية. الهند مركز عالمي لتصنيع الأدوية مع مراقبة صارمة للجودة.',
          },
        ],
      },
    ],

    cta: {
      title: 'هل لا تزال لديك أسئلة؟',
      description: 'اتصل بنا للحصول على إجابات شخصية على استفساراتك الطبية',
      button: 'تواصل معنا',
    },
  },
};

export default function FAQClient({ locale }: Props) {
  const t = content[locale];
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // Filter FAQs based on search
  const filteredFAQs = t.faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

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
            <p className="text-lg text-muted-foreground mb-8">{t.tagline}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${
                    locale === 'ar' ? 'right-4' : 'left-4'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className={`w-full py-4 rounded-full bg-white border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                    locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {filteredFAQs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 last:mb-0"
            >
              <h2 className="text-3xl font-bold text-primary mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === key;

                  return (
                    <Card key={questionIndex} variant="outline">
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full text-left"
                      >
                        <CardBody className="flex items-center justify-between gap-4">
                          <h3 className="text-lg font-semibold text-foreground flex-1">
                            {faq.q}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </CardBody>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6">
                              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search className="w-16 h-16 text-muted-foreground mx-auto opacity-30 mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {locale === 'ar' ? 'لم يتم العثور على أسئلة' : 'No questions found'}
              </h3>
              <p className="text-muted-foreground">
                {locale === 'ar' ? 'حاول بحثًا مختلفًا' : 'Try a different search'}
              </p>
            </motion.div>
          )}
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
