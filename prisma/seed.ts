import { PrismaClient, UserRole, BookingStatus, TranslatorAvailability } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (in development only)
  await prisma.booking.deleteMany();
  await prisma.translator.deleteMany();
  await prisma.contentPage.deleteMany();
  await prisma.media.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.package.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const editorPassword = await bcrypt.hash('editor123', 10);
  const translatorPassword = await bcrypt.hash('translator123', 10);

  const _admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@shifaalhind.com',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      locale: 'en',
    },
  });

  const editor = await prisma.user.create({
    data: {
      name: 'Content Editor',
      email: 'editor@shifaalhind.com',
      passwordHash: editorPassword,
      role: UserRole.EDITOR,
      locale: 'en',
    },
  });

  const translatorUser = await prisma.user.create({
    data: {
      name: 'Arabic Translator',
      email: 'translator@shifaalhind.com',
      passwordHash: translatorPassword,
      role: UserRole.TRANSLATOR,
      locale: 'ar',
      phone: '+966501234567',
    },
  });

  console.log('✅ Created users');

  // Create Translator profile
  const translator = await prisma.translator.create({
    data: {
      userId: translatorUser.id,
      languages: ['English', 'Arabic', 'Hindi'],
      availability: TranslatorAvailability.AVAILABLE,
      bio: 'Experienced medical translator with 10+ years in healthcare',
    },
  });

  console.log('✅ Created translator profile');

  // Create Hospital - Apollo Bangalore
  const apolloHospital = await prisma.hospital.create({
    data: {
      slug: 'apollo-bangalore',
      name_en: 'Apollo Hospitals Bangalore',
      name_ar: 'مستشفى أبولو بنغالور',
      description_en: `Apollo Hospitals Bangalore is a leading multispecialty hospital offering world-class cardiac care, orthopedics, oncology, and neurology services for international patients. With over 40 years of excellence, Apollo has treated more than 200 million patients worldwide.

The hospital features state-of-the-art facilities including advanced cardiac catheterization labs, robotic surgery systems, PET-CT scanners, and comprehensive cancer care centers. Our international patient services include dedicated case managers, airport pickup, accommodation assistance, and 24/7 Arabic language support.`,
      description_ar: `مستشفى أبولو بنغالور هو مستشفى رائد متعدد التخصصات يقدم رعاية قلبية من الطراز العالمي وجراحة العظام والأورام وخدمات الأعصاب للمرضى الدوليين. مع أكثر من 40 عامًا من التميز، عالج أبولو أكثر من 200 مليون مريض في جميع أنحاء العالم.

يتميز المستشفى بمرافق حديثة بما في ذلك مختبرات قسطرة القلب المتقدمة وأنظمة الجراحة الروبوتية وماسحات PET-CT ومراكز شاملة لرعاية السرطان. تشمل خدمات المرضى الدوليين لدينا مديري حالات مخصصين والاستقبال من المطار والمساعدة في الإقامة ودعم اللغة العربية على مدار الساعة طوال أيام الأسبوع.`,
      address: 'Bannerghatta Road, Bangalore',
      city: 'Bangalore',
      country: 'India',
      accreditations: ['JCI', 'NABH', 'ISO 9001:2015'],
      languagesSupported: ['English', 'Arabic', 'Hindi', 'Kannada', 'Tamil'],
      images: {
        main: '/images/hospitals/apollo-main.jpg',
        gallery: [
          '/images/hospitals/apollo-lobby.jpg',
          '/images/hospitals/apollo-cardiac-lab.jpg',
          '/images/hospitals/apollo-room.jpg',
        ],
      },
      seoTitle_en: 'Apollo Hospitals Bangalore - Top Hospital for GCC Patients | Shifa AlHind',
      seoDesc_en:
        'Apollo Hospitals Bangalore offers world-class medical care for GCC patients. JCI-accredited with Arabic support, visa assistance, and comprehensive care packages.',
      seoTitle_ar: 'مستشفى أبولو بنغالور - أفضل مستشفى لمرضى دول الخليج | شفاء الهند',
      seoDesc_ar:
        'يوفر مستشفى أبولو بنغالور رعاية طبية عالمية المستوى لمرضى دول الخليج. معتمد من JCI مع دعم اللغة العربية والمساعدة في التأشيرة وباقات رعاية شاملة.',
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log('✅ Created Apollo Hospital');

  // Create Doctor - Dr. Ahmed Khan
  const doctorKhan = await prisma.doctor.create({
    data: {
      hospitalId: apolloHospital.id,
      slug: 'dr-ahmed-khan-cardiologist',
      name_en: 'Dr. Ahmed Khan',
      name_ar: 'د. أحمد خان',
      bio_en: `Dr. Ahmed Khan is a renowned interventional cardiologist with over 20 years of experience in complex cardiac procedures. He specializes in coronary angioplasty, TAVR (Transcatheter Aortic Valve Replacement), and heart failure management.

Qualifications:
- MBBS, MD (Internal Medicine), DM (Cardiology)
- Fellowship in Interventional Cardiology, Cleveland Clinic, USA
- European Board Certification in Cardiology

Dr. Khan has performed over 10,000 successful cardiac interventions and is fluent in English, Arabic, Hindi, and Urdu, making him an ideal choice for GCC patients.`,
      bio_ar: `الدكتور أحمد خان هو طبيب قلب تداخلي مشهور يتمتع بخبرة تزيد عن 20 عامًا في الإجراءات القلبية المعقدة. وهو متخصص في رأب الأوعية التاجية واستبدال الصمام الأبهري عبر القسطرة وإدارة قصور القلب.

المؤهلات:
- بكالوريوس الطب والجراحة، ماجستير (الطب الباطني)، دكتوراه في الطب (أمراض القلب)
- زمالة في أمراض القلب التداخلية، عيادة كليفلاند، الولايات المتحدة الأمريكية
- شهادة المجلس الأوروبي في أمراض القلب

أجرى الدكتور خان أكثر من 10,000 تدخل قلبي ناجح ويتحدث بطلاقة الإنجليزية والعربية والهندية والأوردية، مما يجعله الخيار الأمثل لمرضى دول الخليج.`,
      qualifications: [
        'MBBS',
        'MD (Internal Medicine)',
        'DM (Cardiology)',
        'Fellowship - Cleveland Clinic',
      ],
      specialties: ['Interventional Cardiology', 'Heart Failure', 'Coronary Angioplasty', 'TAVR'],
      languages: ['English', 'Arabic', 'Hindi', 'Urdu'],
      profileImage: '/images/doctors/dr-ahmed-khan.jpg',
      consultationFee: 150,
      currency: 'USD',
      telemedicineAvailable: true,
      seoTitle_en: 'Dr. Ahmed Khan - Top Cardiologist in Bangalore | Arabic Speaking',
      seoDesc_en:
        'Consult Dr. Ahmed Khan, leading interventional cardiologist at Apollo Bangalore. Arabic-speaking doctor with 20+ years experience. Book teleconsultation.',
      seoTitle_ar: 'د. أحمد خان - أفضل طبيب قلب في بنغالور | يتحدث العربية',
      seoDesc_ar:
        'استشر الدكتور أحمد خان، طبيب القلب التداخلي الرائد في أبولو بنغالور. طبيب يتحدث العربية مع خبرة تزيد عن 20 عامًا. احجز استشارة عن بعد.',
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log('✅ Created Doctor');

  // Create Treatment - Hip Replacement
  const hipReplacement = await prisma.treatment.create({
    data: {
      slug: 'hip-replacement-surgery-bangalore',
      title_en: 'Hip Replacement Surgery',
      title_ar: 'جراحة استبدال مفصل الورك',
      summary_en:
        'Minimally invasive hip replacement surgery in Bangalore with rapid recovery, physiotherapy packages, and comprehensive care for GCC patients at 60% lower cost than UAE.',
      summary_ar:
        'جراحة استبدال مفصل الورك بتقنيات طفيفة التوغل في بنغالور مع تعافي سريع وبرامج علاج طبيعي ورعاية شاملة لمرضى دول الخليج بتكلفة أقل بنسبة 60٪ من الإمارات.',
      contentBlocks_en: {
        sections: [
          {
            type: 'heading',
            content: 'Why Choose Bangalore for Hip Replacement?',
          },
          {
            type: 'paragraph',
            content:
              'Bangalore has emerged as the top destination for orthopedic surgery in Asia, with world-class hospitals using the latest minimally invasive techniques for hip replacement. Our partner hospitals have performed over 15,000 successful hip replacements for international patients.',
          },
          {
            type: 'heading',
            content: 'Procedure Overview',
          },
          {
            type: 'list',
            items: [
              'Pre-operative assessment and planning (1-2 days)',
              'Minimally invasive surgery (2-3 hours)',
              'Hospital stay (4-5 days)',
              'Physiotherapy program (3-4 weeks)',
              'Follow-up consultations (ongoing)',
            ],
          },
          {
            type: 'heading',
            content: 'Cost Comparison',
          },
          {
            type: 'table',
            headers: ['Location', 'Cost (USD)', 'Savings'],
            rows: [
              ['UAE', '$15,000 - $25,000', '-'],
              ['Saudi Arabia', '$12,000 - $20,000', '-'],
              ['Bangalore', '$4,500 - $8,500', '60-70%'],
            ],
          },
        ],
      },
      contentBlocks_ar: {
        sections: [
          {
            type: 'heading',
            content: 'لماذا تختار بنغالور لاستبدال مفصل الورك؟',
          },
          {
            type: 'paragraph',
            content:
              'برزت بنغالور كوجهة رئيسية لجراحة العظام في آسيا، مع مستشفيات عالمية المستوى تستخدم أحدث التقنيات طفيفة التوغل لاستبدال مفصل الورك. أجرت مستشفياتنا الشريكة أكثر من 15,000 عملية استبدال ورك ناجحة للمرضى الدوليين.',
          },
          {
            type: 'heading',
            content: 'نظرة عامة على الإجراء',
          },
          {
            type: 'list',
            items: [
              'التقييم والتخطيط قبل الجراحة (1-2 يوم)',
              'الجراحة طفيفة التوغل (2-3 ساعات)',
              'الإقامة في المستشفى (4-5 أيام)',
              'برنامج العلاج الطبيعي (3-4 أسابيع)',
              'استشارات المتابعة (مستمرة)',
            ],
          },
          {
            type: 'heading',
            content: 'مقارنة التكلفة',
          },
          {
            type: 'table',
            headers: ['الموقع', 'التكلفة (دولار أمريكي)', 'التوفير'],
            rows: [
              ['الإمارات', '$15,000 - $25,000', '-'],
              ['السعودية', '$12,000 - $20,000', '-'],
              ['بنغالور', '$4,500 - $8,500', '60-70%'],
            ],
          },
        ],
      },
      costMin: 4500,
      costMax: 8500,
      currency: 'USD',
      faq: [
        {
          q_en: 'How long is the recovery period?',
          a_en: 'Most patients can walk with support within 24 hours and return to normal activities in 6-8 weeks with proper physiotherapy.',
          q_ar: 'كم مدة التعافي؟',
          a_ar: 'يمكن لمعظم المرضى المشي بدعم في غضون 24 ساعة والعودة إلى الأنشطة الطبيعية في 6-8 أسابيع مع العلاج الطبيعي المناسب.',
        },
        {
          q_en: 'Is an Arabic-speaking doctor available?',
          a_en: 'Yes, we have Arabic-speaking orthopedic surgeons and translators available 24/7 throughout your treatment.',
          q_ar: 'هل يتوفر طبيب يتحدث العربية؟',
          a_ar: 'نعم، لدينا جراحو عظام يتحدثون العربية ومترجمون متاحون على مدار الساعة طوال فترة علاجك.',
        },
        {
          q_en: 'What is included in the package?',
          a_en: 'The package includes surgery, hospital stay, medications, physiotherapy, airport pickup, accommodation assistance, and post-discharge follow-up for 3 months.',
          q_ar: 'ما الذي يشمله الباقة؟',
          a_ar: 'تشمل الباقة الجراحة والإقامة في المستشفى والأدوية والعلاج الطبيعي والاستقبال من المطار والمساعدة في الإقامة ومتابعة ما بعد الخروج لمدة 3 أشهر.',
        },
      ],
      hospitalIds: [apolloHospital.id],
      seoTitle_en: 'Hip Replacement Surgery in Bangalore - Save 60% | Shifa AlHind',
      seoDesc_en:
        'Get world-class hip replacement surgery in Bangalore at $4,500-$8,500. JCI-accredited hospitals, Arabic support, visa help. Free consultation for GCC patients.',
      seoTitle_ar: 'جراحة استبدال مفصل الورك في بنغالور - وفر 60٪ | شفاء الهند',
      seoDesc_ar:
        'احصل على جراحة استبدال مفصل ورك عالمية المستوى في بنغالور مقابل 4,500-8,500 دولار. مستشفيات معتمدة من JCI، دعم عربي، مساعدة في التأشيرة. استشارة مجانية لمرضى الخليج.',
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log('✅ Created Treatment');

  // Create Package
  const comprehensiveCarePackage = await prisma.package.create({
    data: {
      slug: 'comprehensive-care-package',
      name_en: 'Comprehensive Care Package',
      name_ar: 'باقة الرعاية الشاملة',
      description_en:
        'All-inclusive medical tourism package covering surgery, accommodation, translation, visa support, and aftercare for GCC patients.',
      description_ar:
        'باقة سياحة طبية شاملة تغطي الجراحة والإقامة والترجمة ودعم التأشيرة والرعاية اللاحقة لمرضى دول الخليج.',
      price: 7500,
      currency: 'USD',
      features: {
        included: [
          'Pre-operative consultations and tests',
          'Surgery with experienced surgeon',
          'Private hospital room (5 days)',
          'All medications and medical supplies',
          '3 weeks physiotherapy program',
          'Airport pickup and drop-off',
          'Hotel accommodation for companion (7 days)',
          '24/7 Arabic translator',
          'Visa invitation letter',
          'Post-discharge follow-up (3 months)',
          'Medical reports in English & Arabic',
        ],
      },
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log('✅ Created Package');

  // Create Blog Posts
  const _blogPost1 = await prisma.contentPage.create({
    data: {
      slug: 'medical-tourism-gcc-to-bangalore',
      type: 'blog',
      title_en: 'Medical Tourism from GCC to Bangalore: A Complete Guide',
      title_ar: 'السياحة العلاجية من دول الخليج إلى بنغالور: دليل شامل',
      excerpt_en:
        'Discover why thousands of GCC patients choose Bangalore for medical treatment. Learn about cost savings, quality care, and the complete medical tourism journey.',
      excerpt_ar:
        'اكتشف لماذا يختار الآلاف من مرضى دول الخليج بنغالور للعلاج الطبي. تعرف على التوفير في التكاليف والرعاية الجيدة والرحلة الكاملة للسياحة العلاجية.',
      blocks_en: {
        content: 'Full blog content here...',
      },
      blocks_ar: {
        content: 'المحتوى الكامل للمدونة هنا...',
      },
      author: 'Dr. Sarah Ahmed',
      seoTitle_en: 'Medical Tourism Guide: GCC to Bangalore 2025 | Shifa AlHind',
      seoDesc_en:
        'Complete guide to medical tourism from GCC countries to Bangalore. Save 60-70% on medical procedures with world-class care. Visa, travel, and accommodation tips.',
      seoTitle_ar: 'دليل السياحة العلاجية: من الخليج إلى بنغالور 2025 | شفاء الهند',
      seoDesc_ar:
        'دليل كامل للسياحة العلاجية من دول الخليج إلى بنغالور. وفر 60-70٪ على الإجراءات الطبية مع رعاية عالمية المستوى. نصائح للتأشيرة والسفر والإقامة.',
      published: true,
      publishedAt: new Date(),
    },
  });

  const _blogPost2 = await prisma.contentPage.create({
    data: {
      slug: 'top-hospitals-bangalore-gcc-patients',
      type: 'blog',
      title_en: 'Top 5 Hospitals in Bangalore for GCC Patients',
      title_ar: 'أفضل 5 مستشفيات في بنغالور لمرضى دول الخليج',
      excerpt_en:
        'Explore the best JCI-accredited hospitals in Bangalore offering Arabic support, international patient services, and world-class medical care.',
      excerpt_ar:
        'استكشف أفضل المستشفيات المعتمدة من JCI في بنغالور التي تقدم الدعم العربي وخدمات المرضى الدوليين والرعاية الطبية العالمية.',
      blocks_en: {
        content: 'Full blog content here...',
      },
      blocks_ar: {
        content: 'المحتوى الكامل للمدونة هنا...',
      },
      author: 'Shifa AlHind Team',
      seoTitle_en: 'Top 5 Hospitals in Bangalore for GCC Patients 2025',
      seoDesc_en:
        'Discover the best hospitals in Bangalore for GCC patients. JCI-accredited, Arabic-speaking staff, and specialized international patient departments.',
      published: true,
      publishedAt: new Date(),
    },
  });

  const _blogPost3 = await prisma.contentPage.create({
    data: {
      slug: 'cost-comparison-medical-treatment-gcc-vs-india',
      type: 'blog',
      title_en: 'Cost Comparison: Medical Treatment in GCC vs India',
      title_ar: 'مقارنة التكلفة: العلاج الطبي في دول الخليج مقابل الهند',
      excerpt_en:
        'Detailed cost analysis of popular medical procedures in GCC countries compared to India. Understand the savings without compromising quality.',
      excerpt_ar:
        'تحليل مفصل لتكلفة الإجراءات الطبية الشائعة في دول الخليج مقارنة بالهند. افهم التوفير دون المساس بالجودة.',
      blocks_en: {
        content: 'Full blog content here...',
      },
      blocks_ar: {
        content: 'المحتوى الكامل للمدونة هنا...',
      },
      author: 'Finance Team',
      seoTitle_en: 'Medical Treatment Cost: GCC vs India - Save Up to 70%',
      seoDesc_en:
        'Compare medical treatment costs between GCC and India. Cardiac surgery, orthopedics, oncology prices. Save 60-70% with same quality care.',
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log('✅ Created blog posts');

  // Create sample booking
  const _sampleBooking = await prisma.booking.create({
    data: {
      patientName: 'Mohammed Al-Faisal',
      email: 'mohammed.alfaisal@example.com',
      phone: '+966501234567',
      countryOfOrigin: 'Saudi Arabia',
      treatmentId: hipReplacement.id,
      hospitalId: apolloHospital.id,
      doctorId: doctorKhan.id,
      packageId: comprehensiveCarePackage.id,
      status: BookingStatus.LEAD,
      assignedTranslatorId: translator.id,
      notes: 'Patient requesting Arabic-speaking surgeon. Preferred dates: March 2025.',
      preferredDates: {
        start: '2025-03-15',
        end: '2025-03-30',
      },
      createdById: editor.id,
    },
  });

  console.log('✅ Created sample booking');

  console.log('\n🎉 Seed completed successfully!\n');
  console.log('📧 Login credentials:');
  console.log('   Admin: admin@shifaalhind.com / admin123');
  console.log('   Editor: editor@shifaalhind.com / editor123');
  console.log('   Translator: translator@shifaalhind.com / translator123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
