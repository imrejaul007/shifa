'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@/components/ui/Card';
import {
  Heart,
  Quote,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  Play,
  TrendingUp,
} from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';

const locale = 'en'; // Will be dynamic with next-intl

const translations = {
  en: {
    title: 'Patient Success Stories',
    subtitle: 'Real Stories, Real Results',
    description: 'Read inspiring recovery journeys from our patients across the GCC region',
    featured: 'Featured Story',
    readStory: 'Read Full Story',
    watchVideo: 'Watch Video',
    stats: [
      { icon: Heart, value: '5,000+', label: 'Happy Patients' },
      { icon: TrendingUp, value: '98%', label: 'Success Rate' },
      { icon: CheckCircle2, value: '25+', label: 'Partner Hospitals' },
      { icon: Star, value: '4.9/5', label: 'Average Rating' },
    ],
    stories: [
      {
        id: 1,
        name: 'Ahmed Al-Mansouri',
        age: 58,
        location: 'Dubai, UAE',
        treatment: 'Heart Bypass Surgery',
        hospital: 'Apollo Hospitals Bangalore',
        date: 'February 2024',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        quote:
          'I came to Bangalore for an emergency heart surgery. The care I received was exceptional - from the Arabic-speaking coordinators to the world-class cardiac team. I saved 70% compared to Dubai, and the quality was even better!',
        fullStory:
          'I was diagnosed with severe coronary artery disease and needed urgent bypass surgery. The cost in Dubai was prohibitive at AED 180,000. Through Shifa AlHind, I received the same surgery at Apollo Hospitals Bangalore for just AED 55,000, including all expenses for 3 weeks. The surgeon, Dr. Pradeep, was trained at Johns Hopkins and performed over 5,000 heart surgeries. My Arabic coordinator, Fatima, made sure every detail was taken care of - from Halal food to prayer times. I\'m now fully recovered and recommend Shifa AlHind to everyone!',
        video: true,
        featured: true,
      },
      {
        id: 2,
        name: 'Fatima Al-Hashimi',
        age: 34,
        location: 'Riyadh, Saudi Arabia',
        treatment: 'IVF Treatment',
        hospital: 'Nova IVF Fertility',
        date: 'January 2024',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        quote:
          'After 6 years of trying, we finally have our miracle baby thanks to the expert team in Bangalore! The doctors were so compassionate and supportive. Having Arabic-speaking staff made our journey so much easier.',
        fullStory:
          'My husband and I struggled with infertility for 6 years. We tried IVF twice in Riyadh without success. The costs were overwhelming - SR 60,000 per cycle with no guarantee. Shifa AlHind connected us with Nova IVF in Bangalore, where we paid only SR 20,000 for advanced IVF with genetic testing. Dr. Anjali took time to understand our case and customized the protocol. The facility was ultra-modern, and we had a female Arabic interpreter throughout. On our second cycle in Bangalore, we got pregnant! Our daughter is now 2 months old. We cannot thank the team enough!',
        video: false,
        featured: true,
      },
      {
        id: 3,
        name: 'Khalid Al-Otaibi',
        age: 45,
        location: 'Kuwait City, Kuwait',
        treatment: 'Hip Replacement Surgery',
        hospital: 'Fortis Hospital Bangalore',
        date: 'December 2023',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
        quote:
          'I was in constant pain and couldn\'t walk properly. The hip replacement surgery in Bangalore changed my life! I\'m pain-free, walking normally, and saved 75% compared to Kuwait.',
        fullStory:
          'Severe arthritis made my life miserable - I couldn\'t work, play with my kids, or even sleep peacefully. Hip replacement in Kuwait would cost KD 12,000. Through Shifa AlHind, I had the surgery at Fortis Bangalore for just KD 3,000 including hospital, accommodation, and physiotherapy. The orthopedic surgeon, Dr. Rajesh, used the latest Zimmer implant and minimally invasive technique. I was walking the same day! The 3-week recovery at their facility included daily physiotherapy. The Arabic coordinator arranged everything - Halal food, prayer room, even helped my wife explore Bangalore. I returned to Kuwait pain-free and dancing at my daughter\'s wedding!',
        video: true,
        featured: false,
      },
      {
        id: 4,
        name: 'Mariam Al-Said',
        age: 29,
        location: 'Muscat, Oman',
        treatment: 'Spinal Surgery',
        hospital: 'Manipal Hospital Bangalore',
        date: 'November 2023',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
        quote:
          'I had a herniated disc and was told I needed complex spine surgery. The neurosurgeons in Bangalore were amazing - they did minimally invasive surgery and I recovered in just 2 weeks!',
        fullStory:
          'A car accident left me with a herniated disc causing severe back and leg pain. Doctors in Muscat recommended fusion surgery at OMR 8,000. I was scared and sought a second opinion. Shifa AlHind arranged a virtual consultation with Dr. Anand, a neurosurgeon in Bangalore. He suggested a newer technique - endoscopic spine surgery - less invasive with faster recovery. The cost was only OMR 2,500 total. I flew to Bangalore, had the 2-hour surgery, and was walking the next day! No big incision, no long recovery. The facility was spotless, and the staff incredibly caring. I returned to work in 3 weeks - something I was told would take 3 months with traditional surgery!',
        video: false,
        featured: false,
      },
      {
        id: 5,
        name: 'Abdullah Al-Mansoori',
        age: 62,
        location: 'Abu Dhabi, UAE',
        treatment: 'Knee Replacement Surgery',
        hospital: 'Apollo Hospitals Bangalore',
        date: 'October 2023',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
        quote:
          'Bilateral knee replacement sounded terrifying, but the team made it smooth. Both knees done in one surgery, excellent care, and huge cost savings. Best decision ever!',
        fullStory:
          'Both my knees had severe arthritis - walking was agonizing. In UAE, bilateral knee replacement costs AED 140,000 and most surgeons prefer doing one knee at a time (double the recovery time). Shifa AlHind connected me with Dr. Kumar who specializes in simultaneous bilateral replacement. Total cost: AED 45,000 including 4 weeks of stay and intensive physiotherapy. The surgery took 3 hours, both knees done with premium implants. The recovery program was excellent - physiotherapy twice daily, hydrotherapy pool, and nutritionist. My Arabic coordinator even arranged for my family to visit local attractions. I returned home walking confidently, pain-free for the first time in 5 years!',
        video: true,
        featured: false,
      },
      {
        id: 6,
        name: 'Layla Mohammed',
        age: 41,
        location: 'Doha, Qatar',
        treatment: 'Cancer Treatment (Breast Cancer)',
        hospital: 'HCG Cancer Centre Bangalore',
        date: 'September 2023',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
        quote:
          'Being diagnosed with cancer was devastating. But the oncology team in Bangalore gave me hope and fought alongside me. I\'m now cancer-free and forever grateful for their expertise and compassion.',
        fullStory:
          'My world collapsed when I was diagnosed with stage 2 breast cancer. Treatment in Qatar would cost QR 200,000 and wait times were 6 weeks. I contacted Shifa AlHind and within 10 days I was in Bangalore at HCG Cancer Centre. Dr. Smita, my oncologist, reviewed my case and started treatment immediately. I underwent lumpectomy, chemotherapy, and radiation - all with the latest technology and protocols. The cancer center was like a 5-star hotel, my room had a prayer area, and they provided fresh Halal meals. My female Arabic coordinator, Amira, was my rock - she attended every appointment, explained everything, and even held my hand during chemo. Total cost: QR 65,000. More importantly, I\'m now cancer-free, back to my life, and celebrating every moment with my family.',
        video: false,
        featured: false,
      },
    ],
  },
  ar: {
    title: 'قصص نجاح المرضى',
    subtitle: 'قصص حقيقية، نتائج حقيقية',
    description: 'اقرأ قصص تعافي ملهمة من مرضانا عبر منطقة دول مجلس التعاون الخليجي',
  },
};

const t = translations[locale];

export default function StoriesPage() {
  const featuredStories = t.stories.filter((story) => story.featured);
  const otherStories = t.stories.filter((story) => !story.featured);

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 emerald-gradient opacity-5" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6"
            >
              <Heart className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Inspiring Journeys</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary mb-6">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-4">{t.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground/80">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center"
          >
            {t.featured}
          </motion.h2>

          <div className="space-y-12">
            {featuredStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card rounded-3xl overflow-hidden border-2 border-transparent hover:border-accent transition-all shadow-xl ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className="relative h-80 lg:h-full overflow-hidden">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  {story.video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-primary ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
                      {t.featured}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                    />
                    <div>
                      <h3 className="text-xl font-display font-bold text-primary">
                        {story.name}, {story.age}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {story.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <p className="text-primary font-semibold">{story.treatment}</p>
                    <p className="text-muted-foreground">{story.hospital}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {story.date}
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-accent/20" />
                    <p className="text-lg text-foreground/80 italic pl-6">&ldquo;{story.quote}&rdquo;</p>
                  </div>

                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    {story.fullStory.substring(0, 300)}...
                  </p>

                  <Button
                    variant="gold"
                    size="md"
                  >
                    {story.video ? t.watchVideo : t.readStory}
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Other Stories Grid */}
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-bold text-primary mb-12 text-center"
          >
            More Success Stories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card hover={true} variant="default">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {story.video && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardBody>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                    <h3 className="text-xl font-display font-bold text-primary mb-2">
                      {story.name}, {story.age}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      {story.location}
                    </div>
                    <p className="text-sm font-semibold text-primary mb-2">{story.treatment}</p>
                    <div className="relative mb-4">
                      <p className="text-sm text-muted-foreground italic line-clamp-3">&ldquo;{story.quote}&rdquo;</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="md"
                      className="w-full bg-accent/10 text-accent hover:bg-accent hover:text-primary"
                    >
                      {story.video ? t.watchVideo : t.readStory}
                    </Button>
                  </CardBody>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 overflow-hidden text-center"
          >
            <div className="absolute inset-0 emerald-gradient opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-4">
                Ready to Start Your Success Story?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied patients who transformed their lives with world-class medical care in
                India
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonLink
                  href="/en/consultation"
                  variant="gold"
                  size="lg"
                >
                  Get Free Consultation
                </ButtonLink>
                <ButtonLink
                  href="/en/treatments"
                  variant="outline"
                  size="lg"
                >
                  Browse Treatments
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
