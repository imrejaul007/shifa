'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Globe } from 'lucide-react';

interface NavigationProps {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      treatments: 'Treatments',
      packages: 'Packages',
      hospitals: 'Hospitals',
      doctors: 'Doctors',
      services: 'Services',
      stories: 'Success Stories',
      blog: 'Blog',
      faq: 'FAQ',
      contact: 'Contact',
    },
    cta: 'Book Consultation',
    language: 'العربية',
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      treatments: 'العلاجات',
      packages: 'الباقات',
      hospitals: 'المستشفيات',
      doctors: 'الأطباء',
      services: 'الخدمات',
      stories: 'قصص النجاح',
      blog: 'المدونة',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا',
    },
    cta: 'احجز استشارة',
    language: 'English',
  },
};

export default function Navigation({ locale }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = content[locale];
  const nextLocale = locale === 'en' ? 'ar' : 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/treatments`, label: t.nav.treatments },
    { href: `/${locale}/packages`, label: t.nav.packages },
    { href: `/${locale}/hospitals`, label: t.nav.hospitals },
    { href: `/${locale}/doctors`, label: t.nav.doctors },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/stories`, label: t.nav.stories },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/faq`, label: t.nav.faq },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-3 rtl:space-x-reverse group"
          >
            <div className="w-12 h-12 rounded-full emerald-gradient flex items-center justify-center ring-2 ring-accent/20 group-hover:ring-accent/50 transition-all">
              <span className="text-2xl font-bold text-white">ش</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-primary group-hover:text-accent transition-colors">
                Shifa AlHind
              </span>
              <span className="text-xs text-muted-foreground font-body">
                {locale === 'ar' ? 'شفاء الهند' : 'Your Healing Journey'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA & Language Toggle */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            <Link
              href={`/${nextLocale}`}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{t.language}</span>
            </Link>

            <a
              href="tel:+919876543210"
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 987 654 3210</span>
            </a>

            <Link
              href={`/${locale}/booking`}
              className="px-6 py-3 gold-gradient text-foreground font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t.cta}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 text-foreground hover:text-accent transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: locale === 'ar' ? 50 : -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-6 py-4 text-lg font-medium text-foreground hover:bg-accent/10 hover:text-accent rounded-lg transition-colors min-h-[52px] flex items-center"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-6 mt-4 border-t border-accent/20 space-y-3">
                  <Link
                    href={`/${nextLocale}`}
                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-6 py-4 text-lg font-medium text-foreground hover:bg-accent/10 hover:text-accent rounded-lg transition-colors min-h-[52px]"
                  >
                    <Globe className="w-6 h-6" />
                    <span>{t.language}</span>
                  </Link>

                  <Link
                    href={`/${locale}/booking`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-5 gold-gradient text-center text-lg font-semibold rounded-full min-h-[56px] flex items-center justify-center"
                  >
                    {t.cta}
                  </Link>

                  <Link
                    href={`/${locale}/consultation`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-5 border-2 border-accent text-accent text-center text-lg font-semibold rounded-full hover:bg-accent hover:text-primary transition-all min-h-[56px] flex items-center justify-center"
                  >
                    Free Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-accent origin-left"
        style={{
          scaleX: isScrolled ? 1 : 0,
          transformOrigin: locale === 'ar' ? 'right' : 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}
