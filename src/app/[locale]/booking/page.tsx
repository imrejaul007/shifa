'use client';

// Client components in dynamic routes need this directive
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { trackBookingRequest } from '@/components/Analytics';
import { Video, MapPin, CheckCircle2, MessageSquare, CalendarDays } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';

const locale = 'en'; // Will be dynamic with next-intl

const translations = {
  en: {
    title: 'Book Consultation',
    subtitle: 'Schedule Your Appointment',
    description: 'Book a video or in-person consultation with our medical experts',
    consultationType: 'Consultation Type',
    videoConsultation: 'Video Consultation',
    videoDesc: 'Online video call (WhatsApp/Zoom)',
    inPerson: 'In-Person Consultation',
    inPersonDesc: 'Visit our Bangalore office',
    selectDoctor: 'Select Doctor',
    selectDate: 'Select Date',
    selectTime: 'Select Time Slot',
    personalInfo: 'Your Information',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number (WhatsApp)',
    country: 'Country',
    reasonForVisit: 'Reason for Consultation',
    additionalNotes: 'Additional Notes',
    submit: 'Confirm Booking',
    submitting: 'Booking...',
    successTitle: 'Booking Confirmed!',
    successMessage: 'We have sent confirmation details to your email and WhatsApp.',
    backHome: 'Back to Home',
    viewTreatments: 'View Treatments',
    countries: ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Other'],
    doctors: [
      {
        id: 1,
        name: 'Dr. Ahmed Khan',
        specialty: 'Cardiologist',
        languages: ['Arabic', 'English', 'Urdu'],
        rating: 4.9,
        consultationFee: 'Free',
      },
      {
        id: 2,
        name: 'Dr. Priya Sharma',
        specialty: 'Oncologist',
        languages: ['English', 'Hindi'],
        rating: 4.8,
        consultationFee: 'Free',
      },
      {
        id: 3,
        name: 'Dr. Mohammed Al-Rashid',
        specialty: 'Orthopedic Surgeon',
        languages: ['Arabic', 'English'],
        rating: 4.9,
        consultationFee: 'Free',
      },
      {
        id: 4,
        name: 'Dr. Rajesh Kumar',
        specialty: 'Orthopedic Surgeon',
        languages: ['English', 'Hindi'],
        rating: 4.8,
        consultationFee: 'Free',
      },
    ],
    timeSlots: [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM',
    ],
  },
  ar: {
    title: 'حجز استشارة',
    subtitle: 'حدد موعدك',
    description: 'احجز استشارة عبر الفيديو أو شخصية مع خبرائنا الطبيين',
  },
};

const t = translations[locale];

export default function BookingPage() {
  const [consultationType, setConsultationType] = useState<'video' | 'in-person'>('video');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    timeSlot: '',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    reason: '',
    notes: '',
  });

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

    // Track booking request
    trackBookingRequest();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Get tomorrow as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background pt-20 sm:pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-4">
            {t.successTitle}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{t.successMessage}</p>

          <div className="bg-card p-6 rounded-2xl mb-8 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-primary mb-4">Booking Details:</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Doctor:</strong>{' '}
                {t.doctors.find((d) => d.id.toString() === formData.doctor)?.name}
              </p>
              <p>
                <strong>Type:</strong>{' '}
                {consultationType === 'video' ? t.videoConsultation : t.inPerson}
              </p>
              <p>
                <strong>Date:</strong> {formData.date}
              </p>
              <p>
                <strong>Time:</strong> {formData.timeSlot}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/en" variant="gold" size="lg">
              {t.backHome}
            </ButtonLink>
            <ButtonLink href="/en/treatments" variant="outline" size="lg">
              {t.viewTreatments}
            </ButtonLink>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 emerald-gradient opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
              <CalendarDays className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Book Appointment</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">{t.subtitle}</p>
            <p className="text-base text-muted-foreground/80">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Consultation Type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-3xl p-6 sm:p-8 shadow-xl"
              >
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                  {t.consultationType}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => setConsultationType('video')}
                    className={`
                      p-6 rounded-2xl border-2 transition-all text-left
                      ${consultationType === 'video' ? 'border-accent bg-accent/5' : 'border-muted hover:border-accent/50'}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${consultationType === 'video' ? 'bg-accent text-primary' : 'bg-accent/10 text-accent'}`}
                      >
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{t.videoConsultation}</h3>
                        <p className="text-sm text-muted-foreground">{t.videoDesc}</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType('in-person')}
                    className={`
                      p-6 rounded-2xl border-2 transition-all text-left
                      ${consultationType === 'in-person' ? 'border-accent bg-accent/5' : 'border-muted hover:border-accent/50'}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${consultationType === 'in-person' ? 'bg-accent text-primary' : 'bg-accent/10 text-accent'}`}
                      >
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{t.inPerson}</h3>
                        <p className="text-sm text-muted-foreground">{t.inPersonDesc}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Doctor Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-3xl p-6 sm:p-8 shadow-xl"
              >
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                  {t.selectDoctor}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {t.doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, doctor: doctor.id.toString() })}
                      className={`
                        p-4 rounded-2xl border-2 transition-all text-left
                        ${formData.doctor === doctor.id.toString() ? 'border-accent bg-accent/5' : 'border-muted hover:border-accent/50'}
                      `}
                    >
                      <h3 className="font-semibold text-primary mb-1">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        {doctor.languages.join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Date & Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-3xl p-6 sm:p-8 shadow-xl"
              >
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                  Date & Time
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.selectDate} *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      required
                      className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-4">
                    {t.selectTime} *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {t.timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                        className={`
                          px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium
                          ${formData.timeSlot === slot ? 'border-accent bg-accent text-primary' : 'border-muted hover:border-accent/50 text-foreground'}
                        `}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-3xl p-6 sm:p-8 shadow-xl"
              >
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                  {t.personalInfo}
                </h2>

                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.country} *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all appearance-none"
                    >
                      <option value="">Select Country</option>
                      {t.countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.reasonForVisit} *
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Brief description of your medical concern..."
                      className="w-full px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.additionalNotes}
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any special requests or questions..."
                      className="w-full px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={!isSubmitting ? <CheckCircle2 className="w-6 h-6" /> : undefined}
                  className="px-12 py-5 text-lg"
                >
                  {isSubmitting ? t.submitting : t.submit}
                </Button>

                <p className="text-sm text-muted-foreground mt-4">
                  * Consultation fee is completely free. No hidden charges.
                </p>
              </motion.div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
