'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  locale: 'en' | 'ar';
}

const content = {
  en: {
    tagline: 'Your Trusted Partner for Medical Tourism in India',
    quickLinks: {
      title: 'Quick Links',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/treatments', label: 'Treatments' },
        { href: '/hospitals', label: 'Hospitals' },
        { href: '/doctors', label: 'Doctors' },
        { href: '/services', label: 'Services' },
        { href: '/stories', label: 'Success Stories' },
      ],
    },
    resources: {
      title: 'Resources',
      links: [
        { href: '/blog', label: 'Blog' },
        { href: '/faq', label: 'FAQ' },
        { href: '/booking', label: 'Book Consultation' },
        { href: '/consultation', label: 'Free Quote' },
        { href: '/contact', label: 'Contact Us' },
      ],
    },
    contact: {
      title: 'Contact Info',
      address: 'Bangalore, Karnataka, India',
      email: 'contact@shifa-alhind.com',
      phone: '+91 98765 43210',
      hours: '24/7 Support Available',
    },
    legal: {
      title: 'Legal',
      links: [
        { href: '/terms-and-conditions', label: 'Terms of Service' },
        { href: '/privacy-policy', label: 'Privacy Policy' },
      ],
    },
    social: {
      title: 'Follow Us',
    },
    copyright: '© 2024 Shifa AlHind. All rights reserved.',
    madeWith: 'Made with',
  },
  ar: {
    tagline: 'شريكك الموثوق للسياحة العلاجية في الهند',
    quickLinks: {
      title: 'روابط سريعة',
      links: [
        { href: '/about', label: 'من نحن' },
        { href: '/treatments', label: 'العلاجات' },
        { href: '/hospitals', label: 'المستشفيات' },
        { href: '/doctors', label: 'الأطباء' },
        { href: '/services', label: 'الخدمات' },
        { href: '/stories', label: 'قصص النجاح' },
      ],
    },
    resources: {
      title: 'الموارد',
      links: [
        { href: '/blog', label: 'المدونة' },
        { href: '/faq', label: 'الأسئلة الشائعة' },
        { href: '/booking', label: 'احجز استشارة' },
        { href: '/consultation', label: 'عرض مجاني' },
        { href: '/contact', label: 'اتصل بنا' },
      ],
    },
    contact: {
      title: 'معلومات الاتصال',
      address: 'بنغالور، كارناتاكا، الهند',
      email: 'contact@shifa-alhind.com',
      phone: '+91 98765 43210',
      hours: 'دعم متاح على مدار الساعة',
    },
    legal: {
      title: 'قانوني',
      links: [
        { href: '/terms-and-conditions', label: 'شروط الخدمة' },
        { href: '/privacy-policy', label: 'سياسة الخصوصية' },
      ],
    },
    social: {
      title: 'تابعنا',
    },
    copyright: '© 2024 شفاء الهند. جميع الحقوق محفوظة.',
    madeWith: 'صنع بـ',
  },
};

export default function Footer({ locale }: FooterProps) {
  const t = content[locale];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center ring-2 ring-accent/50">
                <span className="text-2xl font-bold text-primary">ش</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-white">Shifa AlHind</span>
                <span className="text-xs text-accent font-arabic">
                  {locale === 'ar' ? 'شفاء الهند' : 'شفاء الهند'}
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">{t.tagline}</p>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-accent mb-3">{t.social.title}</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold text-accent mb-4">
              {t.quickLinks.title}
            </h3>
            <ul className="space-y-2">
              {t.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-white/80 hover:text-accent transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-display font-bold text-accent mb-4">{t.resources.title}</h3>
            <ul className="space-y-2">
              {t.resources.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-white/80 hover:text-accent transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-bold text-accent mb-4">{t.contact.title}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{t.contact.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${t.contact.email}`}
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  {t.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${t.contact.phone}`}
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  {t.contact.phone}
                </a>
              </li>
              <li className="text-sm text-accent font-semibold">{t.contact.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {currentYear} Shifa AlHind. {t.copyright.replace('© 2024 ', '')}
            </p>

            <div className="flex items-center gap-6">
              {t.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="text-sm text-white/60 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="text-sm text-white/60">
              {t.madeWith} <span className="text-accent">❤️</span> for GCC Patients
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
