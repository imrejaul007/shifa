'use client';

// Force dynamic rendering for client component page
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@/components/ui/Card';
import {
  trackConsultationRequest,
  trackPhoneClick,
  trackEmailClick,
  trackWhatsAppClick,
} from '@/components/Analytics';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const locale = 'en'; // Will be dynamic with next-intl

const translations = {
  en: {
    title: 'Get in Touch',
    subtitle: "We're Here to Help",
    description: '24/7 support in Arabic and English for all your medical tourism needs',
    formTitle: 'Send Us a Message',
    formSubtitle: 'Fill out the form and our team will respond within 24 hours',
    name: 'Full Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    phone: 'Phone Number',
    phonePlaceholder: '+966 XXX XXX XXXX',
    country: 'Country',
    countryPlaceholder: 'Select your country',
    treatment: 'Treatment Interested In',
    treatmentPlaceholder: 'e.g., Hip Replacement, Cardiac Surgery',
    message: 'Message',
    messagePlaceholder: 'Tell us about your medical needs and any questions you have...',
    submit: 'Send Message',
    sending: 'Sending...',
    success: "Message sent successfully! We'll get back to you soon.",
    contactInfo: 'Contact Information',
    office: 'Office Address',
    officeAddress: 'Bangalore, Karnataka, India 560001',
    emailAddress: 'Email',
    emailValue: 'contact@shifa-alhind.com',
    phoneNumber: 'Phone',
    phoneValue: '+91 98765 43210',
    whatsapp: 'WhatsApp',
    whatsappValue: '+91 98765 43210',
    hours: 'Working Hours',
    hoursValue: '24/7 Support Available',
    emergency: 'Emergency Line',
    emergencyValue: '+91 98765 43210',
    officeHours: 'Office: Mon-Sat 9AM-6PM IST',
    whyContact: 'Why Contact Us?',
    reasons: [
      {
        icon: MessageCircle,
        title: 'Free Consultation',
        description: 'Get expert medical advice at no cost',
      },
      {
        icon: Users,
        title: 'Arabic Support',
        description: 'Dedicated Arabic-speaking coordinators',
      },
      {
        icon: Clock,
        title: '24/7 Availability',
        description: 'Round-the-clock emergency support',
      },
      {
        icon: Globe,
        title: 'Global Network',
        description: 'Connected with top hospitals worldwide',
      },
    ],
    countries: [
      'Saudi Arabia',
      'United Arab Emirates',
      'Kuwait',
      'Qatar',
      'Bahrain',
      'Oman',
      'Other',
    ],
  },
  ar: {
    title: 'تواصل معنا',
    subtitle: 'نحن هنا للمساعدة',
    description: 'دعم على مدار الساعة بالعربية والإنجليزية لجميع احتياجات السياحة العلاجية',
    formTitle: 'أرسل لنا رسالة',
    formSubtitle: 'املأ النموذج وسيرد فريقنا خلال 24 ساعة',
    name: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'your.email@example.com',
    phone: 'رقم الهاتف',
    phonePlaceholder: '+966 XXX XXX XXXX',
    country: 'الدولة',
    countryPlaceholder: 'اختر دولتك',
    treatment: 'العلاج المهتم به',
    treatmentPlaceholder: 'مثل: استبدال الورك، جراحة القلب',
    message: 'الرسالة',
    messagePlaceholder: 'أخبرنا عن احتياجاتك الطبية وأي أسئلة لديك...',
    submit: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال الرسالة بنجاح! سنعود إليك قريبًا.',
    contactInfo: 'معلومات الاتصال',
  },
};

const t = translations[locale];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    treatment: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    trackConsultationRequest();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        treatment: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 emerald-gradient opacity-5" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

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
              <MessageCircle className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">24/7 Support</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary mb-6">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-4">{t.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground/80">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover={true} variant="default">
                    <CardBody className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-primary mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{reason.description}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form - 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card hover={false} variant="default" className="hover:border-accent/30">
                <CardBody className="p-8 sm:p-10 lg:p-12">
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                    {t.formTitle}
                  </h2>
                  <p className="text-muted-foreground mb-8">{t.formSubtitle}</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="relative group">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        {t.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t.namePlaceholder}
                        className="w-full px-6 py-4 bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground/80 mb-2"
                        >
                          {t.email} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={t.emailPlaceholder}
                          className="w-full px-6 py-4 bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                        />
                      </div>

                      <div className="relative group">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-foreground/80 mb-2"
                        >
                          {t.phone} *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder={t.phonePlaceholder}
                          className="w-full px-6 py-4 bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Country & Treatment */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-foreground/80 mb-2"
                        >
                          {t.country} *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">{t.countryPlaceholder}</option>
                          {t.countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="relative group">
                        <label
                          htmlFor="treatment"
                          className="block text-sm font-medium text-foreground/80 mb-2"
                        >
                          {t.treatment}
                        </label>
                        <input
                          type="text"
                          id="treatment"
                          name="treatment"
                          value={formData.treatment}
                          onChange={handleChange}
                          placeholder={t.treatmentPlaceholder}
                          className="w-full px-6 py-4 bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        {t.message} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder={t.messagePlaceholder}
                        className="w-full px-6 py-4 bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant={isSubmitted ? 'primary' : 'gold'}
                      size="lg"
                      isLoading={isSubmitting}
                      disabled={isSubmitted}
                      leftIcon={
                        isSubmitted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )
                      }
                      className={`w-full ${isSubmitted ? 'bg-green-500 text-white' : ''}`}
                    >
                      {isSubmitted ? t.success : isSubmitting ? t.sending : t.submit}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </motion.div>

            {/* Contact Information - 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Contact Info Card */}
              <Card hover={false} variant="default" className="hover:border-accent/30">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-display font-bold text-primary mb-6">
                    {t.contactInfo}
                  </h3>

                  <div className="space-y-6">
                    {/* Office */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{t.office}</h4>
                        <p className="text-sm text-muted-foreground">{t.officeAddress}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{t.emailAddress}</h4>
                        <a
                          href={`mailto:${t.emailValue}`}
                          className="text-sm text-accent hover:underline"
                          onClick={() => trackEmailClick()}
                        >
                          {t.emailValue}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{t.phoneNumber}</h4>
                        <a
                          href={`tel:${t.phoneValue}`}
                          className="text-sm text-accent hover:underline"
                          onClick={() => trackPhoneClick()}
                        >
                          {t.phoneValue}
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{t.whatsapp}</h4>
                        <a
                          href={`https://wa.me/${t.whatsappValue.replace(/\s/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:underline"
                          onClick={() => trackWhatsAppClick()}
                        >
                          {t.whatsappValue}
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{t.hours}</h4>
                        <p className="text-sm text-muted-foreground">{t.hoursValue}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t.officeHours}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Emergency Card */}
              <div className="relative glass-dark rounded-3xl p-8 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-2">{t.emergency}</h4>
                  <a
                    href={`tel:${t.emergencyValue}`}
                    className="text-2xl font-bold text-accent hover:underline"
                    onClick={() => trackPhoneClick()}
                  >
                    {t.emergencyValue}
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-3xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089937578!2d77.49085282031251!3d12.953945613558213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shifa AlHind Office Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
