import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ar';
    country: string;
    city: string;
    treatment: string;
    slug: string;
  }>;
}

// Article data configuration - 5 articles per treatment
const ARTICLES_DATA: Record<
  string,
  {
    name_en: string;
    name_ar: string;
    articles: Array<{
      slug: string;
      title_en: string;
      title_ar: string;
      excerpt_en: string;
      excerpt_ar: string;
      reading_time: string;
      published_date: string;
      author_en: string;
      author_ar: string;
    }>;
  }
> = {
  'heart-surgery': {
    name_en: 'Heart Surgery',
    name_ar: 'جراحة القلب',
    articles: [
      {
        slug: 'understanding-cabg-procedure',
        title_en: 'Understanding CABG Heart Surgery: Procedure, Costs & Recovery',
        title_ar: 'فهم جراحة القلب المفتوح: الإجراء والتكاليف والتعافي',
        excerpt_en:
          'Complete guide to Coronary Artery Bypass Grafting surgery including procedure details, recovery timeline, and cost comparison between GCC and India.',
        excerpt_ar:
          'دليل شامل لجراحة مجازة الشريان التاجي بما في ذلك تفاصيل الإجراء وجدول التعافي ومقارنة التكاليف بين دول مجلس التعاون الخليجي والهند.',
        reading_time: '8 min read',
        published_date: '2025-01-05',
        author_en: 'Dr. Sarah Ahmed',
        author_ar: 'د. سارة أحمد',
      },
      {
        slug: 'heart-valve-replacement-guide',
        title_en: 'Heart Valve Replacement: When Do You Need It?',
        title_ar: 'استبدال صمام القلب: متى تحتاجه؟',
        excerpt_en:
          'Learn about heart valve replacement surgery, including symptoms, surgical options, and why India is becoming a preferred destination for cardiac care.',
        excerpt_ar:
          'تعرف على جراحة استبدال صمام القلب، بما في ذلك الأعراض والخيارات الجراحية ولماذا تصبح الهند وجهة مفضلة لرعاية القلب.',
        reading_time: '7 min read',
        published_date: '2025-01-03',
        author_en: 'Dr. Mohammed Hassan',
        author_ar: 'د. محمد حسن',
      },
      {
        slug: 'cardiac-surgery-cost-comparison',
        title_en: 'Cardiac Surgery Costs: GCC vs India - A Detailed Comparison',
        title_ar: 'تكاليف جراحة القلب: دول الخليج مقابل الهند - مقارنة تفصيلية',
        excerpt_en:
          'Comprehensive cost analysis of heart surgeries comparing prices in UAE, Saudi Arabia, and India, including hidden costs and savings.',
        excerpt_ar:
          'تحليل شامل لتكاليف جراحات القلب مع مقارنة الأسعار في الإمارات والسعودية والهند، بما في ذلك التكاليف الخفية والتوفير.',
        reading_time: '6 min read',
        published_date: '2024-12-28',
        author_en: 'Financial Advisory Team',
        author_ar: 'فريق الاستشارات المالية',
      },
      {
        slug: 'top-cardiac-hospitals-india',
        title_en: 'Top 10 Cardiac Hospitals in India for GCC Patients',
        title_ar: 'أفضل 10 مستشفيات للقلب في الهند لمرضى دول الخليج',
        excerpt_en:
          "Discover India's leading cardiac hospitals with international accreditation, experienced surgeons, and specialized care for international patients.",
        excerpt_ar:
          'اكتشف مستشفيات القلب الرائدة في الهند مع الاعتماد الدولي والجراحين ذوي الخبرة والرعاية المتخصصة للمرضى الدوليين.',
        reading_time: '9 min read',
        published_date: '2024-12-20',
        author_en: 'Healthcare Research Team',
        author_ar: 'فريق البحث الصحي',
      },
      {
        slug: 'heart-surgery-recovery-tips',
        title_en: 'Heart Surgery Recovery: 10 Essential Tips for Success',
        title_ar: 'التعافي من جراحة القلب: 10 نصائح أساسية للنجاح',
        excerpt_en:
          'Expert advice on post-operative care, rehabilitation exercises, diet recommendations, and lifestyle changes after cardiac surgery.',
        excerpt_ar:
          'نصائح الخبراء حول الرعاية بعد العملية الجراحية وتمارين إعادة التأهيل والتوصيات الغذائية وتغييرات نمط الحياة بعد جراحة القلب.',
        reading_time: '7 min read',
        published_date: '2024-12-15',
        author_en: 'Dr. Fatima Al-Mansoori',
        author_ar: 'د. فاطمة المنصوري',
      },
    ],
  },
  'knee-replacement': {
    name_en: 'Knee Replacement',
    name_ar: 'استبدال الركبة',
    articles: [
      {
        slug: 'total-knee-replacement-guide',
        title_en: 'Total Knee Replacement Surgery: Complete Patient Guide',
        title_ar: 'جراحة استبدال الركبة الكاملة: دليل المريض الكامل',
        excerpt_en:
          'Everything you need to know about total knee replacement surgery including pre-operative preparation, surgery process, and recovery timeline.',
        excerpt_ar:
          'كل ما تحتاج لمعرفته حول جراحة استبدال الركبة الكاملة بما في ذلك التحضير قبل العملية وعملية الجراحة وجدول التعافي.',
        reading_time: '10 min read',
        published_date: '2025-01-08',
        author_en: 'Dr. Ahmed Al-Rashid',
        author_ar: 'د. أحمد الراشد',
      },
      {
        slug: 'when-do-you-need-knee-replacement',
        title_en: 'When Do You Need Knee Replacement? Signs & Symptoms',
        title_ar: 'متى تحتاج إلى استبدال الركبة؟ العلامات والأعراض',
        excerpt_en:
          "Learn the key indicators that it's time for knee replacement surgery, from chronic pain to mobility limitations.",
        excerpt_ar:
          'تعرف على المؤشرات الرئيسية التي تشير إلى أن الوقت قد حان لجراحة استبدال الركبة، من الألم المزمن إلى قيود الحركة.',
        reading_time: '6 min read',
        published_date: '2025-01-02',
        author_en: 'Dr. Layla Ibrahim',
        author_ar: 'د. ليلى إبراهيم',
      },
      {
        slug: 'knee-replacement-cost-india-vs-gcc',
        title_en: 'Knee Replacement Costs: Why India Saves You 60-70%',
        title_ar: 'تكاليف استبدال الركبة: لماذا توفر الهند 60-70٪',
        excerpt_en:
          'Detailed cost breakdown of knee replacement surgery in India compared to GCC countries, including quality comparison.',
        excerpt_ar:
          'تفصيل مفصل لتكاليف جراحة استبدال الركبة في الهند مقارنة بدول مجلس التعاون الخليجي، بما في ذلك مقارنة الجودة.',
        reading_time: '8 min read',
        published_date: '2024-12-25',
        author_en: 'Cost Analysis Team',
        author_ar: 'فريق تحليل التكاليف',
      },
      {
        slug: 'best-orthopedic-hospitals-india',
        title_en: 'Best Orthopedic Hospitals in India for Knee Replacement',
        title_ar: 'أفضل مستشفيات العظام في الهند لاستبدال الركبة',
        excerpt_en:
          'Top-rated orthopedic centers in India offering world-class knee replacement surgery with international care standards.',
        excerpt_ar:
          'مراكز العظام ذات التصنيف الأعلى في الهند التي تقدم جراحة استبدال الركبة على مستوى عالمي مع معايير الرعاية الدولية.',
        reading_time: '9 min read',
        published_date: '2024-12-18',
        author_en: 'Medical Tourism Team',
        author_ar: 'فريق السياحة العلاجية',
      },
      {
        slug: 'knee-replacement-rehabilitation',
        title_en: 'Knee Replacement Rehabilitation: Week-by-Week Recovery Plan',
        title_ar: 'إعادة تأهيل استبدال الركبة: خطة التعافي أسبوعًا بعد أسبوع',
        excerpt_en:
          'Comprehensive rehabilitation guide with exercises, milestones, and expectations for each week after surgery.',
        excerpt_ar:
          'دليل شامل لإعادة التأهيل مع التمارين والإنجازات والتوقعات لكل أسبوع بعد الجراحة.',
        reading_time: '11 min read',
        published_date: '2024-12-10',
        author_en: 'Dr. Khalid Al-Mansour',
        author_ar: 'د. خالد المنصور',
      },
    ],
  },
  'hip-replacement': {
    name_en: 'Hip Replacement',
    name_ar: 'استبدال الورك',
    articles: [
      {
        slug: 'hip-replacement-surgery-explained',
        title_en: 'Hip Replacement Surgery: Everything You Need to Know',
        title_ar: 'جراحة استبدال الورك: كل ما تحتاج لمعرفته',
        excerpt_en:
          'Comprehensive guide to hip replacement surgery covering types, procedures, risks, and expected outcomes.',
        excerpt_ar:
          'دليل شامل لجراحة استبدال الورك يغطي الأنواع والإجراءات والمخاطر والنتائج المتوقعة.',
        reading_time: '9 min read',
        published_date: '2025-01-06',
        author_en: 'Dr. Yasmin Al-Fahad',
        author_ar: 'د. ياسمين الفهد',
      },
      {
        slug: 'minimally-invasive-hip-surgery',
        title_en: 'Minimally Invasive Hip Replacement: Benefits & Risks',
        title_ar: 'استبدال الورك بالحد الأدنى من التدخل الجراحي: الفوائد والمخاطر',
        excerpt_en:
          'Explore modern minimally invasive techniques for hip replacement and how they reduce recovery time.',
        excerpt_ar:
          'استكشف التقنيات الحديثة بالحد الأدنى من التدخل الجراحي لاستبدال الورك وكيف تقلل من وقت التعافي.',
        reading_time: '7 min read',
        published_date: '2024-12-30',
        author_en: 'Dr. Omar Sharif',
        author_ar: 'د. عمر شريف',
      },
      {
        slug: 'hip-replacement-cost-savings-india',
        title_en: 'Hip Replacement in India: Save $15,000-$20,000',
        title_ar: 'استبدال الورك في الهند: وفر 15000-20000 دولار',
        excerpt_en:
          'How much can you save on hip replacement surgery in India? Complete cost breakdown and quality comparison.',
        excerpt_ar:
          'كم يمكنك توفيره في جراحة استبدال الورك في الهند؟ تفصيل كامل للتكاليف ومقارنة الجودة.',
        reading_time: '6 min read',
        published_date: '2024-12-22',
        author_en: 'Financial Guidance Team',
        author_ar: 'فريق التوجيه المالي',
      },
      {
        slug: 'top-hip-replacement-surgeons-india',
        title_en: 'Top Hip Replacement Surgeons in India: Credentials & Experience',
        title_ar: 'أفضل جراحي استبدال الورك في الهند: المؤهلات والخبرة',
        excerpt_en:
          "Meet India's leading orthopedic surgeons specializing in hip replacement with thousands of successful procedures.",
        excerpt_ar:
          'تعرف على جراحي العظام الرائدين في الهند المتخصصين في استبدال الورك مع آلاف العمليات الناجحة.',
        reading_time: '8 min read',
        published_date: '2024-12-14',
        author_en: 'Medical Credentials Team',
        author_ar: 'فريق المؤهلات الطبية',
      },
      {
        slug: 'life-after-hip-replacement',
        title_en: 'Life After Hip Replacement: Activity Guide & Restrictions',
        title_ar: 'الحياة بعد استبدال الورك: دليل النشاط والقيود',
        excerpt_en:
          'What activities can you do after hip replacement? Learn about exercise, sports, travel, and daily living adaptations.',
        excerpt_ar:
          'ما الأنشطة التي يمكنك القيام بها بعد استبدال الورك؟ تعرف على التمارين والرياضة والسفر وتكيفات الحياة اليومية.',
        reading_time: '10 min read',
        published_date: '2024-12-08',
        author_en: 'Dr. Noor Al-Saleh',
        author_ar: 'د. نور الصالح',
      },
    ],
  },
  ivf: {
    name_en: 'IVF Treatment',
    name_ar: 'علاج أطفال الأنابيب',
    articles: [
      {
        slug: 'ivf-process-step-by-step',
        title_en: 'IVF Process: Step-by-Step Guide for GCC Couples',
        title_ar: 'عملية أطفال الأنابيب: دليل خطوة بخطوة للأزواج من دول الخليج',
        excerpt_en:
          'Complete walkthrough of the IVF process from initial consultation to pregnancy test, tailored for Middle Eastern patients.',
        excerpt_ar:
          'شرح كامل لعملية أطفال الأنابيب من الاستشارة الأولية إلى اختبار الحمل، مصمم خصيصًا للمرضى من الشرق الأوسط.',
        reading_time: '12 min read',
        published_date: '2025-01-09',
        author_en: 'Dr. Maryam Al-Kuwari',
        author_ar: 'د. مريم الكواري',
      },
      {
        slug: 'ivf-success-rates-by-age',
        title_en: 'IVF Success Rates by Age: What to Expect',
        title_ar: 'معدلات نجاح أطفال الأنابيب حسب العمر: ما يمكن توقعه',
        excerpt_en:
          'Understand how age affects IVF success rates and what factors can improve your chances of conception.',
        excerpt_ar:
          'فهم كيف يؤثر العمر على معدلات نجاح أطفال الأنابيب والعوامل التي يمكن أن تحسن فرص الحمل.',
        reading_time: '8 min read',
        published_date: '2025-01-04',
        author_en: 'Dr. Hassan Al-Dosari',
        author_ar: 'د. حسن الدوسري',
      },
      {
        slug: 'ivf-cost-india-comprehensive-guide',
        title_en: 'IVF Costs in India: Comprehensive Pricing Guide 2025',
        title_ar: 'تكاليف أطفال الأنابيب في الهند: دليل التسعير الشامل 2025',
        excerpt_en:
          'Detailed breakdown of IVF costs in India including medications, procedures, and comparison with GCC pricing.',
        excerpt_ar:
          'تفصيل مفصل لتكاليف أطفال الأنابيب في الهند بما في ذلك الأدوية والإجراءات والمقارنة مع أسعار دول الخليج.',
        reading_time: '9 min read',
        published_date: '2024-12-27',
        author_en: 'Fertility Cost Analysis Team',
        author_ar: 'فريق تحليل تكاليف الخصوبة',
      },
      {
        slug: 'best-ivf-clinics-india',
        title_en: 'Best IVF Clinics in India with Highest Success Rates',
        title_ar: 'أفضل عيادات أطفال الأنابيب في الهند بأعلى معدلات النجاح',
        excerpt_en:
          'Top fertility centers in India offering advanced IVF treatments with international protocols and Arabic-speaking staff.',
        excerpt_ar:
          'أفضل مراكز الخصوبة في الهند التي تقدم علاجات متقدمة لأطفال الأنابيب مع بروتوكولات دولية وموظفين يتحدثون العربية.',
        reading_time: '10 min read',
        published_date: '2024-12-19',
        author_en: 'Fertility Tourism Team',
        author_ar: 'فريق سياحة الخصوبة',
      },
      {
        slug: 'preparing-for-ivf-treatment',
        title_en: 'Preparing for IVF: Medical & Emotional Readiness Guide',
        title_ar: 'الاستعداد لأطفال الأنابيب: دليل الجاهزية الطبية والعاطفية',
        excerpt_en:
          'Essential preparation tips for IVF treatment including lifestyle changes, nutrition, supplements, and emotional support.',
        excerpt_ar:
          'نصائح أساسية للتحضير لعلاج أطفال الأنابيب بما في ذلك تغييرات نمط الحياة والتغذية والمكملات الغذائية والدعم العاطفي.',
        reading_time: '11 min read',
        published_date: '2024-12-11',
        author_en: 'Dr. Aisha Al-Thani',
        author_ar: 'د. عائشة الثاني',
      },
    ],
  },
  'dental-implants': {
    name_en: 'Dental Implants',
    name_ar: 'زراعة الأسنان',
    articles: [
      {
        slug: 'dental-implants-complete-guide',
        title_en: 'Dental Implants: Complete Guide to Procedure & Costs',
        title_ar: 'زراعة الأسنان: دليل كامل للإجراء والتكاليف',
        excerpt_en:
          'Everything about dental implants from consultation to final crown placement, including healing timeline and care instructions.',
        excerpt_ar:
          'كل شيء عن زراعة الأسنان من الاستشارة إلى وضع التاج النهائي، بما في ذلك جدول الشفاء وتعليمات الرعاية.',
        reading_time: '9 min read',
        published_date: '2025-01-07',
        author_en: 'Dr. Rashed Al-Mutawa',
        author_ar: 'د. راشد المطاوعة',
      },
      {
        slug: 'all-on-4-dental-implants',
        title_en: 'All-on-4 Dental Implants: Full Mouth Restoration Guide',
        title_ar: 'زراعة الأسنان الكاملة: دليل استعادة الفم الكامل',
        excerpt_en:
          'Learn about All-on-4 implant technique for full mouth restoration, including benefits, procedure, and recovery.',
        excerpt_ar:
          'تعرف على تقنية زراعة All-on-4 لاستعادة الفم الكامل، بما في ذلك الفوائد والإجراء والتعافي.',
        reading_time: '8 min read',
        published_date: '2025-01-01',
        author_en: 'Dr. Huda Al-Khalifa',
        author_ar: 'د. هدى الخليفة',
      },
      {
        slug: 'dental-implant-costs-india-vs-gcc',
        title_en: 'Dental Implant Costs: India vs GCC - Save Up to 70%',
        title_ar: 'تكاليف زراعة الأسنان: الهند مقابل دول الخليج - وفر حتى 70٪',
        excerpt_en:
          'Compare dental implant costs between India and GCC countries with quality assessment and patient reviews.',
        excerpt_ar:
          'قارن تكاليف زراعة الأسنان بين الهند ودول مجلس التعاون الخليجي مع تقييم الجودة ومراجعات المرضى.',
        reading_time: '7 min read',
        published_date: '2024-12-24',
        author_en: 'Dental Cost Team',
        author_ar: 'فريق تكاليف الأسنان',
      },
      {
        slug: 'best-dental-clinics-india',
        title_en: 'Best Dental Implant Clinics in India: Accreditation & Reviews',
        title_ar: 'أفضل عيادات زراعة الأسنان في الهند: الاعتماد والمراجعات',
        excerpt_en:
          'Top-rated dental clinics in India offering implant dentistry with international standards and technology.',
        excerpt_ar:
          'عيادات الأسنان الأعلى تصنيفًا في الهند التي تقدم طب زراعة الأسنان مع المعايير والتكنولوجيا الدولية.',
        reading_time: '10 min read',
        published_date: '2024-12-16',
        author_en: 'Dental Tourism Team',
        author_ar: 'فريق سياحة الأسنان',
      },
      {
        slug: 'dental-implant-care-maintenance',
        title_en: 'Dental Implant Care: Lifetime Maintenance Guide',
        title_ar: 'رعاية زراعة الأسنان: دليل الصيانة مدى الحياة',
        excerpt_en:
          'How to care for your dental implants to ensure they last a lifetime, including oral hygiene and check-up schedule.',
        excerpt_ar:
          'كيفية العناية بزراعة الأسنان لضمان استمرارها مدى الحياة، بما في ذلك نظافة الفم وجدول الفحوصات.',
        reading_time: '6 min read',
        published_date: '2024-12-09',
        author_en: 'Dr. Salim Al-Bahri',
        author_ar: 'د. سالم البحري',
      },
    ],
  },
  'hair-transplant': {
    name_en: 'Hair Transplant',
    name_ar: 'زراعة الشعر',
    articles: [
      {
        slug: 'fue-vs-fut-hair-transplant',
        title_en: 'FUE vs FUT Hair Transplant: Which Method is Right for You?',
        title_ar: 'زراعة الشعر FUE مقابل FUT: أي طريقة مناسبة لك؟',
        excerpt_en:
          'Detailed comparison of FUE and FUT hair transplant techniques including results, scars, recovery, and costs.',
        excerpt_ar:
          'مقارنة مفصلة لتقنيات زراعة الشعر FUE و FUT بما في ذلك النتائج والندبات والتعافي والتكاليف.',
        reading_time: '10 min read',
        published_date: '2025-01-10',
        author_en: 'Dr. Tariq Al-Ansari',
        author_ar: 'د. طارق الأنصاري',
      },
      {
        slug: 'hair-transplant-procedure-explained',
        title_en: 'Hair Transplant Procedure: What Happens During Surgery?',
        title_ar: 'إجراء زراعة الشعر: ماذا يحدث أثناء الجراحة؟',
        excerpt_en:
          'Step-by-step breakdown of the hair transplant procedure from donor extraction to graft placement.',
        excerpt_ar: 'تفصيل خطوة بخطوة لإجراء زراعة الشعر من استخراج المتبرع إلى وضع الطعوم.',
        reading_time: '8 min read',
        published_date: '2025-01-05',
        author_en: 'Dr. Laila Al-Dhaheri',
        author_ar: 'د. ليلى الظاهري',
      },
      {
        slug: 'hair-transplant-cost-india',
        title_en: 'Hair Transplant Costs in India: Price Per Graft Guide 2025',
        title_ar: 'تكاليف زراعة الشعر في الهند: دليل السعر لكل طعم 2025',
        excerpt_en:
          'Comprehensive pricing guide for hair transplant in India with cost comparison to GCC countries.',
        excerpt_ar:
          'دليل تسعير شامل لزراعة الشعر في الهند مع مقارنة التكلفة بدول مجلس التعاون الخليجي.',
        reading_time: '7 min read',
        published_date: '2024-12-29',
        author_en: 'Hair Restoration Cost Team',
        author_ar: 'فريق تكاليف استعادة الشعر',
      },
      {
        slug: 'best-hair-transplant-clinics-india',
        title_en: 'Best Hair Transplant Clinics in India: Expert Rankings',
        title_ar: 'أفضل عيادات زراعة الشعر في الهند: تصنيفات الخبراء',
        excerpt_en:
          'Top hair restoration clinics in India with advanced techniques, experienced surgeons, and proven results.',
        excerpt_ar:
          'أفضل عيادات استعادة الشعر في الهند مع التقنيات المتقدمة والجراحين ذوي الخبرة والنتائج المثبتة.',
        reading_time: '9 min read',
        published_date: '2024-12-21',
        author_en: 'Hair Restoration Team',
        author_ar: 'فريق استعادة الشعر',
      },
      {
        slug: 'hair-transplant-recovery-timeline',
        title_en: 'Hair Transplant Recovery: Month-by-Month Growth Timeline',
        title_ar: 'التعافي من زراعة الشعر: جدول نمو الشعر شهرًا بعد شهر',
        excerpt_en:
          'What to expect during hair transplant recovery including growth phases, shedding, and final results timeline.',
        excerpt_ar:
          'ما يمكن توقعه أثناء التعافي من زراعة الشعر بما في ذلك مراحل النمو والتساقط والجدول الزمني للنتائج النهائية.',
        reading_time: '8 min read',
        published_date: '2024-12-13',
        author_en: 'Dr. Majid Al-Shehri',
        author_ar: 'د. ماجد الشهري',
      },
    ],
  },
  'cataract-surgery': {
    name_en: 'Cataract Surgery',
    name_ar: 'جراحة الساد',
    articles: [
      {
        slug: 'cataract-surgery-complete-guide',
        title_en: 'Cataract Surgery: Complete Guide to Procedure & Recovery',
        title_ar: 'جراحة الساد: دليل كامل للإجراء والتعافي',
        excerpt_en:
          'Everything you need to know about cataract surgery including types of lenses, procedure steps, and recovery expectations.',
        excerpt_ar:
          'كل ما تحتاج لمعرفته حول جراحة الساد بما في ذلك أنواع العدسات وخطوات الإجراء وتوقعات التعافي.',
        reading_time: '9 min read',
        published_date: '2025-01-08',
        author_en: 'Dr. Noura Al-Qassimi',
        author_ar: 'د. نورة القاسمي',
      },
      {
        slug: 'premium-vs-standard-iol',
        title_en: 'Premium vs Standard IOL: Which Lens Should You Choose?',
        title_ar: 'عدسات IOL المتميزة مقابل القياسية: أي عدسة يجب أن تختار؟',
        excerpt_en:
          'Compare different types of intraocular lenses for cataract surgery including monofocal, multifocal, and toric options.',
        excerpt_ar:
          'قارن أنواع العدسات داخل العين لجراحة الساد بما في ذلك خيارات أحادية البؤرة ومتعددة البؤرة والحيدية.',
        reading_time: '7 min read',
        published_date: '2025-01-03',
        author_en: 'Dr. Abdullah Al-Mazrouei',
        author_ar: 'د. عبدالله المزروعي',
      },
      {
        slug: 'cataract-surgery-cost-india',
        title_en: 'Cataract Surgery Costs in India: Affordable Quality Care',
        title_ar: 'تكاليف جراحة الساد في الهند: رعاية عالية الجودة بأسعار معقولة',
        excerpt_en:
          'How much does cataract surgery cost in India? Complete price breakdown including premium lens options.',
        excerpt_ar:
          'كم تكلف جراحة الساد في الهند؟ تفصيل كامل للأسعار بما في ذلك خيارات العدسات المتميزة.',
        reading_time: '6 min read',
        published_date: '2024-12-26',
        author_en: 'Eye Care Cost Team',
        author_ar: 'فريق تكاليف رعاية العيون',
      },
      {
        slug: 'best-eye-hospitals-india-cataract',
        title_en: 'Best Eye Hospitals in India for Cataract Surgery',
        title_ar: 'أفضل مستشفيات العيون في الهند لجراحة الساد',
        excerpt_en:
          'Leading ophthalmology centers in India offering advanced cataract surgery with latest technology.',
        excerpt_ar:
          'مراكز طب العيون الرائدة في الهند التي تقدم جراحة الساد المتقدمة بأحدث التقنيات.',
        reading_time: '8 min read',
        published_date: '2024-12-17',
        author_en: 'Eye Care Team',
        author_ar: 'فريق رعاية العيون',
      },
      {
        slug: 'after-cataract-surgery-care',
        title_en: 'After Cataract Surgery: Essential Care Instructions',
        title_ar: 'بعد جراحة الساد: تعليمات الرعاية الأساسية',
        excerpt_en:
          'Post-operative care guidelines for cataract surgery including eye drops schedule, activity restrictions, and follow-up.',
        excerpt_ar:
          'إرشادات الرعاية بعد العملية الجراحية لجراحة الساد بما في ذلك جدول قطرات العين وقيود النشاط والمتابعة.',
        reading_time: '7 min read',
        published_date: '2024-12-12',
        author_en: 'Dr. Mona Al-Suwaidi',
        author_ar: 'د. منى السويدي',
      },
    ],
  },
  'oncology-treatment': {
    name_en: 'Oncology Treatment',
    name_ar: 'علاج الأورام',
    articles: [
      {
        slug: 'cancer-treatment-options-india',
        title_en: 'Cancer Treatment Options in India: Comprehensive Overview',
        title_ar: 'خيارات علاج السرطان في الهند: نظرة شاملة',
        excerpt_en:
          'Explore advanced cancer treatment options available in India including surgery, chemotherapy, radiation, and immunotherapy.',
        excerpt_ar:
          'استكشف خيارات علاج السرطان المتقدمة المتاحة في الهند بما في ذلك الجراحة والعلاج الكيميائي والإشعاعي والمناعي.',
        reading_time: '12 min read',
        published_date: '2025-01-09',
        author_en: 'Dr. Zainab Al-Hashemi',
        author_ar: 'د. زينب الهاشمي',
      },
      {
        slug: 'immunotherapy-cancer-treatment',
        title_en: 'Immunotherapy for Cancer: Latest Advances in India',
        title_ar: 'العلاج المناعي للسرطان: أحدث التطورات في الهند',
        excerpt_en:
          'Learn about cutting-edge immunotherapy treatments for cancer available in India at fraction of global costs.',
        excerpt_ar:
          'تعرف على أحدث علاجات المناعة للسرطان المتاحة في الهند بجزء بسيط من التكاليف العالمية.',
        reading_time: '10 min read',
        published_date: '2025-01-04',
        author_en: 'Dr. Fahad Al-Khatib',
        author_ar: 'د. فهد الخطيب',
      },
      {
        slug: 'cancer-treatment-costs-india',
        title_en: 'Cancer Treatment Costs in India: Affordable World-Class Care',
        title_ar: 'تكاليف علاج السرطان في الهند: رعاية عالمية بأسعار معقولة',
        excerpt_en:
          'Detailed cost comparison of cancer treatments in India vs GCC with quality and success rate analysis.',
        excerpt_ar:
          'مقارنة مفصلة لتكاليف علاج السرطان في الهند مقابل دول الخليج مع تحليل الجودة ومعدلات النجاح.',
        reading_time: '11 min read',
        published_date: '2024-12-28',
        author_en: 'Oncology Cost Team',
        author_ar: 'فريق تكاليف الأورام',
      },
      {
        slug: 'best-cancer-hospitals-india',
        title_en: 'Top 10 Cancer Hospitals in India: Accreditation & Success Rates',
        title_ar: 'أفضل 10 مستشفيات للسرطان في الهند: الاعتماد ومعدلات النجاح',
        excerpt_en:
          'Leading cancer treatment centers in India with international accreditation and high success rates.',
        excerpt_ar:
          'مراكز علاج السرطان الرائدة في الهند مع الاعتماد الدولي ومعدلات النجاح العالية.',
        reading_time: '13 min read',
        published_date: '2024-12-20',
        author_en: 'Oncology Research Team',
        author_ar: 'فريق أبحاث الأورام',
      },
      {
        slug: 'cancer-patient-support-india',
        title_en: 'Cancer Patient Support in India: Resources for GCC Patients',
        title_ar: 'دعم مرضى السرطان في الهند: موارد لمرضى دول الخليج',
        excerpt_en:
          'Comprehensive support services for cancer patients from GCC including accommodation, translation, and aftercare.',
        excerpt_ar:
          'خدمات دعم شاملة لمرضى السرطان من دول الخليج بما في ذلك الإقامة والترجمة والرعاية اللاحقة.',
        reading_time: '9 min read',
        published_date: '2024-12-15',
        author_en: 'Patient Support Team',
        author_ar: 'فريق دعم المرضى',
      },
    ],
  },
  'cosmetic-surgery': {
    name_en: 'Cosmetic Surgery',
    name_ar: 'الجراحة التجميلية',
    articles: [
      {
        slug: 'cosmetic-surgery-types-costs',
        title_en: 'Popular Cosmetic Surgery Procedures: Types & Costs in India',
        title_ar: 'إجراءات الجراحة التجميلية الشائعة: الأنواع والتكاليف في الهند',
        excerpt_en:
          'Overview of popular cosmetic procedures in India including rhinoplasty, liposuction, breast surgery, and facelifts.',
        excerpt_ar:
          'نظرة عامة على إجراءات التجميل الشائعة في الهند بما في ذلك تجميل الأنف وشفط الدهون وجراحة الثدي وشد الوجه.',
        reading_time: '11 min read',
        published_date: '2025-01-07',
        author_en: 'Dr. Lina Al-Amoudi',
        author_ar: 'د. لينا العمودي',
      },
      {
        slug: 'rhinoplasty-nose-surgery-guide',
        title_en: 'Rhinoplasty (Nose Surgery): Complete Guide for Arab Patients',
        title_ar: 'تجميل الأنف: دليل كامل للمرضى العرب',
        excerpt_en:
          'Everything about rhinoplasty including ethnic considerations, techniques, recovery, and results.',
        excerpt_ar:
          'كل شيء عن تجميل الأنف بما في ذلك الاعتبارات العرقية والتقنيات والتعافي والنتائج.',
        reading_time: '10 min read',
        published_date: '2025-01-02',
        author_en: 'Dr. Saeed Al-Rumaihi',
        author_ar: 'د. سعيد الرميحي',
      },
      {
        slug: 'cosmetic-surgery-cost-comparison',
        title_en: 'Cosmetic Surgery Costs: India vs GCC - Save 50-70%',
        title_ar: 'تكاليف الجراحة التجميلية: الهند مقابل دول الخليج - وفر 50-70٪',
        excerpt_en:
          'Comprehensive cost comparison of cosmetic procedures in India versus GCC countries with quality assessment.',
        excerpt_ar:
          'مقارنة شاملة لتكاليف إجراءات التجميل في الهند مقابل دول الخليج مع تقييم الجودة.',
        reading_time: '8 min read',
        published_date: '2024-12-25',
        author_en: 'Cosmetic Cost Team',
        author_ar: 'فريق تكاليف التجميل',
      },
      {
        slug: 'best-cosmetic-surgeons-india',
        title_en: 'Best Cosmetic Surgeons in India: Board-Certified Experts',
        title_ar: 'أفضل جراحي التجميل في الهند: خبراء معتمدون',
        excerpt_en:
          'Top board-certified plastic surgeons in India with international training and thousands of successful procedures.',
        excerpt_ar:
          'أفضل جراحي التجميل المعتمدين في الهند مع التدريب الدولي وآلاف العمليات الناجحة.',
        reading_time: '9 min read',
        published_date: '2024-12-18',
        author_en: 'Cosmetic Surgery Team',
        author_ar: 'فريق الجراحة التجميلية',
      },
      {
        slug: 'cosmetic-surgery-recovery-tips',
        title_en: 'Cosmetic Surgery Recovery: Essential Tips for Best Results',
        title_ar: 'التعافي من الجراحة التجميلية: نصائح أساسية لأفضل النتائج',
        excerpt_en:
          'Expert recovery tips for cosmetic surgery including wound care, activity restrictions, and scar management.',
        excerpt_ar:
          'نصائح الخبراء للتعافي من الجراحة التجميلية بما في ذلك العناية بالجروح وقيود النشاط وإدارة الندبات.',
        reading_time: '7 min read',
        published_date: '2024-12-11',
        author_en: 'Dr. Hanan Al-Ameri',
        author_ar: 'د. حنان العامري',
      },
    ],
  },
  'bariatric-surgery': {
    name_en: 'Bariatric Surgery',
    name_ar: 'جراحة السمنة',
    articles: [
      {
        slug: 'bariatric-surgery-types-explained',
        title_en: 'Bariatric Surgery Types: Gastric Bypass vs Sleeve vs Band',
        title_ar: 'أنواع جراحة السمنة: المجازة المعدية مقابل التكميم مقابل الحزام',
        excerpt_en:
          'Compare different bariatric surgery types including procedures, weight loss expectations, and suitability.',
        excerpt_ar:
          'قارن أنواع جراحة السمنة المختلفة بما في ذلك الإجراءات وتوقعات فقدان الوزن والملاءمة.',
        reading_time: '11 min read',
        published_date: '2025-01-10',
        author_en: 'Dr. Waleed Al-Sulaiman',
        author_ar: 'د. وليد السليمان',
      },
      {
        slug: 'gastric-sleeve-surgery-guide',
        title_en: 'Gastric Sleeve Surgery: Complete Patient Guide 2025',
        title_ar: 'جراحة تكميم المعدة: دليل المريض الكامل 2025',
        excerpt_en:
          'Everything about gastric sleeve surgery from eligibility to long-term results and lifestyle changes.',
        excerpt_ar:
          'كل شيء عن جراحة تكميم المعدة من الأهلية إلى النتائج طويلة الأجل وتغييرات نمط الحياة.',
        reading_time: '12 min read',
        published_date: '2025-01-06',
        author_en: 'Dr. Reem Al-Otaibi',
        author_ar: 'د. ريم العتيبي',
      },
      {
        slug: 'bariatric-surgery-cost-india',
        title_en: 'Bariatric Surgery Costs in India: Affordable Weight Loss Solution',
        title_ar: 'تكاليف جراحة السمنة في الهند: حل ميسور لفقدان الوزن',
        excerpt_en:
          'How much does bariatric surgery cost in India? Complete pricing guide with GCC comparison.',
        excerpt_ar: 'كم تكلف جراحة السمنة في الهند؟ دليل تسعير كامل مع مقارنة دول الخليج.',
        reading_time: '8 min read',
        published_date: '2024-12-30',
        author_en: 'Bariatric Cost Team',
        author_ar: 'فريق تكاليف السمنة',
      },
      {
        slug: 'best-bariatric-surgeons-india',
        title_en: 'Best Bariatric Surgeons in India: Experience & Success Rates',
        title_ar: 'أفضل جراحي السمنة في الهند: الخبرة ومعدلات النجاح',
        excerpt_en:
          'Leading bariatric surgeons in India with thousands of successful weight loss surgeries.',
        excerpt_ar: 'جراحو السمنة الرائدون في الهند مع آلاف العمليات الناجحة لفقدان الوزن.',
        reading_time: '9 min read',
        published_date: '2024-12-23',
        author_en: 'Bariatric Surgery Team',
        author_ar: 'فريق جراحة السمنة',
      },
      {
        slug: 'life-after-bariatric-surgery',
        title_en: 'Life After Bariatric Surgery: Diet, Exercise & Maintenance',
        title_ar: 'الحياة بعد جراحة السمنة: النظام الغذائي والتمارين والصيانة',
        excerpt_en:
          'Comprehensive guide to life after bariatric surgery including nutrition, exercise, supplements, and follow-up care.',
        excerpt_ar:
          'دليل شامل للحياة بعد جراحة السمنة بما في ذلك التغذية والتمارين والمكملات والرعاية اللاحقة.',
        reading_time: '10 min read',
        published_date: '2024-12-16',
        author_en: 'Dr. Jassim Al-Mulla',
        author_ar: 'د. جاسم الملا',
      },
    ],
  },
};

// City data (same as treatment page)
const CITIES_DATA: Record<
  string,
  Record<
    string,
    {
      name_en: string;
      name_ar: string;
      country_en: string;
      country_ar: string;
    }
  >
> = {
  'saudi-arabia': {
    riyadh: {
      name_en: 'Riyadh',
      name_ar: 'الرياض',
      country_en: 'Saudi Arabia',
      country_ar: 'المملكة العربية السعودية',
    },
    jeddah: {
      name_en: 'Jeddah',
      name_ar: 'جدة',
      country_en: 'Saudi Arabia',
      country_ar: 'المملكة العربية السعودية',
    },
  },
  uae: {
    dubai: {
      name_en: 'Dubai',
      name_ar: 'دبي',
      country_en: 'UAE',
      country_ar: 'الإمارات العربية المتحدة',
    },
    'abu-dhabi': {
      name_en: 'Abu Dhabi',
      name_ar: 'أبو ظبي',
      country_en: 'UAE',
      country_ar: 'الإمارات العربية المتحدة',
    },
  },
  qatar: {
    doha: { name_en: 'Doha', name_ar: 'الدوحة', country_en: 'Qatar', country_ar: 'قطر' },
  },
  oman: {
    muscat: { name_en: 'Muscat', name_ar: 'مسقط', country_en: 'Oman', country_ar: 'عمان' },
  },
  kuwait: {
    'kuwait-city': {
      name_en: 'Kuwait City',
      name_ar: 'مدينة الكويت',
      country_en: 'Kuwait',
      country_ar: 'الكويت',
    },
  },
  bahrain: {
    manama: { name_en: 'Manama', name_ar: 'المنامة', country_en: 'Bahrain', country_ar: 'البحرين' },
  },
};

function getCityData(country: string, city: string) {
  return CITIES_DATA[country]?.[city];
}

function getTreatmentData(treatment: string) {
  return ARTICLES_DATA[treatment];
}

function getArticleData(treatment: string, slug: string) {
  const treatmentData = ARTICLES_DATA[treatment];
  return treatmentData?.articles.find((article) => article.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country, city, treatment, slug } = await params;

  const cityData = getCityData(country, city);
  const treatmentData = getTreatmentData(treatment);
  const articleData = getArticleData(treatment, slug);

  if (!cityData || !treatmentData || !articleData) {
    return {
      title: 'Article Not Found',
    };
  }

  const isArabic = locale === 'ar';
  const cityName = isArabic ? cityData.name_ar : cityData.name_en;
  const treatmentName = isArabic ? treatmentData.name_ar : treatmentData.name_en;
  const title = isArabic ? articleData.title_ar : articleData.title_en;
  const excerpt = isArabic ? articleData.excerpt_ar : articleData.excerpt_en;

  return {
    title: `${title} | Shifa AlHind`,
    description: excerpt,
    keywords: `${treatmentName}, ${cityName}, India, medical tourism, healthcare, ${slug}`,
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      publishedTime: articleData.published_date,
      authors: [isArabic ? articleData.author_ar : articleData.author_en],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, country, city, treatment, slug } = await params;

  const cityData = getCityData(country, city);
  const treatmentData = getTreatmentData(treatment);
  const articleData = getArticleData(treatment, slug);

  if (!cityData || !treatmentData || !articleData) {
    notFound();
  }

  const isArabic = locale === 'ar';
  const cityName = isArabic ? cityData.name_ar : cityData.name_en;
  const countryName = isArabic ? cityData.country_ar : cityData.country_en;
  const treatmentName = isArabic ? treatmentData.name_ar : treatmentData.name_en;
  const title = isArabic ? articleData.title_ar : articleData.title_en;
  const excerpt = isArabic ? articleData.excerpt_ar : articleData.excerpt_ar;
  const author = isArabic ? articleData.author_ar : articleData.author_en;

  // Get related articles (other articles from same treatment)
  const relatedArticles = treatmentData.articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className={`min-h-screen ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm">
            <Link href={`/${locale}`} className="text-blue-600 hover:underline">
              {isArabic ? 'الرئيسية' : 'Home'}
            </Link>
            {' > '}
            <Link href={`/${locale}/blog`} className="text-blue-600 hover:underline">
              {isArabic ? 'المدونة' : 'Blog'}
            </Link>
            {' > '}
            <Link
              href={`/${locale}/medical-tourism/${country}/${city}`}
              className="text-blue-600 hover:underline"
            >
              {cityName}
            </Link>
            {' > '}
            <Link
              href={`/${locale}/medical-tourism/${country}/${city}/${treatment}`}
              className="text-blue-600 hover:underline"
            >
              {treatmentName}
            </Link>
            {' > '}
            <span className="text-gray-600">{title}</span>
          </nav>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: excerpt,
            author: {
              '@type': 'Person',
              name: author,
            },
            datePublished: articleData.published_date,
            publisher: {
              '@type': 'Organization',
              name: 'Shifa AlHind',
              logo: {
                '@type': 'ImageObject',
                url: 'https://shifaalhind.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://shifaalhind.com/${locale}/blog/${country}/${city}/${treatment}/${slug}`,
            },
            inLanguage: isArabic ? 'ar' : 'en',
            about: {
              '@type': 'MedicalProcedure',
              name: treatmentName,
            },
            keywords: `${treatmentName}, ${cityName}, India, medical tourism`,
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: isArabic ? 'الرئيسية' : 'Home',
                item: `https://shifaalhind.com/${locale}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: isArabic ? 'المدونة' : 'Blog',
                item: `https://shifaalhind.com/${locale}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: cityName,
                item: `https://shifaalhind.com/${locale}/medical-tourism/${country}/${city}`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: treatmentName,
                item: `https://shifaalhind.com/${locale}/medical-tourism/${country}/${city}/${treatment}`,
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: title,
                item: `https://shifaalhind.com/${locale}/blog/${country}/${city}/${treatment}/${slug}`,
              },
            ],
          }),
        }}
      />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <span>{isArabic ? 'بواسطة' : 'By'}</span>
              <span className="font-medium">{author}</span>
            </div>
            <span>•</span>
            <time dateTime={articleData.published_date}>
              {new Date(articleData.published_date).toLocaleDateString(isArabic ? 'ar' : 'en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{articleData.reading_time}</span>
          </div>

          <p className="text-xl text-gray-700 leading-relaxed">{excerpt}</p>
        </header>

        {/* Article Content Placeholder */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-sm text-gray-700">
              {isArabic
                ? 'ملاحظة: هذا نموذج لصفحة المقالة. يجب استبدال المحتوى الكامل (1200+ كلمة) بمحتوى مكتوب بعناية ومراجع طبيًا لكل مقالة.'
                : 'Note: This is a template article page. Full content (1,200+ words) should be replaced with carefully written, medically-reviewed content for each article.'}
            </p>
          </div>

          {/* Content sections would go here */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {isArabic
              ? `يوفر هذا الدليل الشامل معلومات مفصلة حول ${treatmentName} في الهند، مع التركيز بشكل خاص على احتياجات المرضى القادمين من ${cityName}، ${countryName}. سنغطي كل جانب من جوانب الإجراء، من التشاور الأولي إلى الرعاية بعد العملية الجراحية.`
              : `This comprehensive guide provides detailed information about ${treatmentName} in India, with specific focus on the needs of patients coming from ${cityName}, ${countryName}. We'll cover every aspect of the procedure, from initial consultation to post-operative care.`}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {isArabic ? 'نظرة عامة' : 'Overview'}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {isArabic
              ? 'أصبحت الهند وجهة رائدة للسياحة العلاجية، حيث تقدم علاجات طبية عالمية المستوى بجزء بسيط من التكلفة مقارنة بالعديد من البلدان الأخرى. يستفيد المرضى من دول مجلس التعاون الخليجي من مزيج من الرعاية عالية الجودة والمرافق الحديثة والأسعار المعقولة.'
              : 'India has become a leading destination for medical tourism, offering world-class medical treatments at a fraction of the cost compared to many other countries. Patients from GCC countries benefit from the combination of high-quality care, modern facilities, and affordable pricing.'}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {isArabic ? 'لماذا تختار الهند؟' : 'Why Choose India?'}
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
            <li>
              {isArabic
                ? 'توفير 60-70٪ مقارنة بأسعار دول الخليج'
                : 'Save 60-70% compared to GCC pricing'}
            </li>
            <li>
              {isArabic
                ? 'مستشفيات معتمدة دوليًا (JCI، NABH)'
                : 'Internationally accredited hospitals (JCI, NABH)'}
            </li>
            <li>{isArabic ? 'أطباء ذوو خبرة عالمية' : 'World-renowned doctors'}</li>
            <li>{isArabic ? 'أحدث التقنيات الطبية' : 'Latest medical technology'}</li>
            <li>{isArabic ? 'فترات انتظار قصيرة' : 'Short waiting times'}</li>
            <li>
              {isArabic
                ? 'خدمات مخصصة للمرضى الدوليين'
                : 'Dedicated international patient services'}
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">
            {isArabic ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
          </h3>
          <p className="text-lg mb-6">
            {isArabic
              ? 'احصل على استشارة مجانية وخطة علاج مخصصة من أفضل المستشفيات في الهند'
              : 'Get a free consultation and personalized treatment plan from top hospitals in India'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {isArabic ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {isArabic ? 'مقالات ذات صلة' : 'Related Articles'}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/blog/${country}/${city}/${treatment}/${article.slug}`}
                  className="block p-6 border rounded-lg hover:shadow-lg transition"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isArabic ? article.title_ar : article.title_en}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {isArabic ? article.excerpt_ar : article.excerpt_en}
                  </p>
                  <div className="text-xs text-gray-500">{article.reading_time}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            {isArabic
              ? '⚕️ إخلاء المسؤولية الطبية: المعلومات المقدمة في هذه المقالة لأغراض تعليمية فقط ولا ينبغي اعتبارها نصيحة طبية. استشر دائمًا أخصائي رعاية صحية مؤهل قبل اتخاذ أي قرارات تتعلق بعلاجك الطبي.'
              : '⚕️ Medical Disclaimer: The information provided in this article is for educational purposes only and should not be considered medical advice. Always consult with a qualified healthcare professional before making any decisions about your medical treatment.'}
          </p>
        </div>
      </article>
    </div>
  );
}
