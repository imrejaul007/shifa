'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Heart } from 'lucide-react';

interface HeroProps {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    badge: 'Trusted by 10,000+ GCC Patients',
    title: 'Healing Beyond Borders',
    subtitle: 'Experience world-class medical care in Bangalore with complete Arabic assistance',
    cta1: 'Get Free Consultation',
    cta2: 'Explore Treatments',
    stats: [
      { icon: Star, label: 'JCI Accredited', value: '15+ Hospitals' },
      { icon: Shield, label: 'Success Rate', value: '98%' },
      { icon: Heart, label: 'Patients Served', value: '10,000+' },
    ],
  },
  ar: {
    badge: 'موثوق به من قبل أكثر من 10,000 مريض من دول الخليج',
    title: 'الشفاء بلا حدود',
    subtitle: 'تجربة رعاية طبية عالمية في بنغالور مع دعم كامل باللغة العربية',
    cta1: 'احصل على استشارة مجانية',
    cta2: 'استكشف العلاجات',
    stats: [
      { icon: Star, label: 'معتمد من JCI', value: '15+ مستشفى' },
      { icon: Shield, label: 'معدل النجاح', value: '98%' },
      { icon: Heart, label: 'المرضى المعالجون', value: '10,000+' },
    ],
  },
};

export default function Hero({ locale }: HeroProps) {
  const t = content[locale];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-background z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053)',
          }}
        ></div>
        {/* Animated gold particles */}
        <div className="absolute inset-0 z-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 glass-dark rounded-full mb-8"
          >
            <Star className="w-4 h-4 text-accent" fill="currentColor" />
            <span className="text-sm font-medium text-white">{t.badge}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-6 ${
              locale === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {t.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto ${
              locale === 'ar' ? 'font-arabic' : 'font-body'
            }`}
          >
            {t.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href={`/${locale}/contact`}
              className="group px-8 py-4 gold-gradient text-foreground font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span>{t.cta1}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/${locale}/treatments`}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-accent transition-all duration-300"
            >
              {t.cta2}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="glass-dark p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <stat.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className={`text-sm text-white/80 ${locale === 'ar' ? 'font-arabic' : ''}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
