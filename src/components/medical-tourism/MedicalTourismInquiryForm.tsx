'use client';

import { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import {
  trackFormStart,
  trackFormFieldComplete,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
  FunnelStage,
  trackFunnelStage,
} from '@/lib/analytics';

interface MedicalTourismInquiryFormProps {
  locale: 'en' | 'ar';
  city?: string;
  country?: string;
  treatment?: string;
  variant?: 'inline' | 'modal';
}

const TREATMENTS = [
  { value: 'heart-surgery', labelEn: 'Heart Surgery', labelAr: 'جراحة القلب' },
  { value: 'knee-replacement', labelEn: 'Knee Replacement', labelAr: 'استبدال الركبة' },
  { value: 'hip-replacement', labelEn: 'Hip Replacement', labelAr: 'استبدال الورك' },
  { value: 'ivf', labelEn: 'IVF Treatment', labelAr: 'علاج أطفال الأنابيب' },
  { value: 'dental-implants', labelEn: 'Dental Implants', labelAr: 'زراعة الأسنان' },
  { value: 'hair-transplant', labelEn: 'Hair Transplant', labelAr: 'زراعة الشعر' },
  { value: 'cataract-surgery', labelEn: 'Cataract Surgery', labelAr: 'جراحة الساد' },
  { value: 'oncology-treatment', labelEn: 'Cancer Treatment', labelAr: 'علاج الأورام' },
  { value: 'cosmetic-surgery', labelEn: 'Cosmetic Surgery', labelAr: 'الجراحة التجميلية' },
  { value: 'bariatric-surgery', labelEn: 'Bariatric Surgery', labelAr: 'جراحة السمنة' },
];

const CITIES = [
  { value: 'riyadh', labelEn: 'Riyadh', labelAr: 'الرياض', country: 'saudi-arabia' },
  { value: 'jeddah', labelEn: 'Jeddah', labelAr: 'جدة', country: 'saudi-arabia' },
  { value: 'dubai', labelEn: 'Dubai', labelAr: 'دبي', country: 'united-arab-emirates' },
  { value: 'abu-dhabi', labelEn: 'Abu Dhabi', labelAr: 'أبو ظبي', country: 'united-arab-emirates' },
  { value: 'doha', labelEn: 'Doha', labelAr: 'الدوحة', country: 'qatar' },
  { value: 'muscat', labelEn: 'Muscat', labelAr: 'مسقط', country: 'oman' },
  { value: 'kuwait-city', labelEn: 'Kuwait City', labelAr: 'مدينة الكويت', country: 'kuwait' },
  { value: 'manama', labelEn: 'Manama', labelAr: 'المنامة', country: 'bahrain' },
];

export default function MedicalTourismInquiryForm({
  locale,
  city,
  country,
  treatment,
  variant: _variant = 'inline',
}: MedicalTourismInquiryFormProps) {
  const isArabic = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formStarted, setFormStarted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    city: city || '',
    country: country || '',
    treatment: treatment || '',
    medicalCondition: '',
    travelDate: '',
    message: '',
    preferredLanguage: locale,
  });

  const content = {
    en: {
      title: 'Get a Free Medical Quote',
      subtitle: 'Fill out the form below and our team will contact you within 24 hours',
      name: 'Full Name',
      namePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '+966 XX XXX XXXX',
      whatsapp: 'WhatsApp Number',
      whatsappPlaceholder: '+966 XX XXX XXXX (if different)',
      city: 'Your City',
      selectCity: 'Select your city',
      treatment: 'Treatment Required',
      selectTreatment: 'Select treatment type',
      medicalCondition: 'Medical Condition',
      medicalConditionPlaceholder: 'Brief description of your medical condition',
      travelDate: 'Preferred Travel Date',
      message: 'Additional Information',
      messagePlaceholder: 'Any additional information you would like to share...',
      submit: 'Get Free Quote',
      submitting: 'Submitting...',
      successTitle: 'Thank you for your inquiry!',
      successMessage:
        'Our medical tourism team will review your request and contact you within 24 hours with a detailed treatment plan and cost estimate.',
      errorMessage: 'Something went wrong. Please try again or contact us directly.',
      required: 'Required',
    },
    ar: {
      title: 'احصل على عرض أسعار طبي مجاني',
      subtitle: 'املأ النموذج أدناه وسيتصل بك فريقنا خلال 24 ساعة',
      name: 'الاسم الكامل',
      namePlaceholder: 'أدخل اسمك الكامل',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'your.email@example.com',
      phone: 'رقم الهاتف',
      phonePlaceholder: '+966 XX XXX XXXX',
      whatsapp: 'رقم الواتساب',
      whatsappPlaceholder: '+966 XX XXX XXXX (إذا كان مختلفًا)',
      city: 'مدينتك',
      selectCity: 'اختر مدينتك',
      treatment: 'العلاج المطلوب',
      selectTreatment: 'اختر نوع العلاج',
      medicalCondition: 'الحالة الطبية',
      medicalConditionPlaceholder: 'وصف موجز لحالتك الطبية',
      travelDate: 'تاريخ السفر المفضل',
      message: 'معلومات إضافية',
      messagePlaceholder: 'أي معلومات إضافية تود مشاركتها...',
      submit: 'احصل على عرض أسعار مجاني',
      submitting: 'جارٍ الإرسال...',
      successTitle: 'شكرًا لاستفسارك!',
      successMessage:
        'سيقوم فريق السياحة العلاجية لدينا بمراجعة طلبك والاتصال بك خلال 24 ساعة مع خطة علاج مفصلة وتقدير التكلفة.',
      errorMessage: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
      required: 'مطلوب',
    },
  };

  const t = content[locale];

  // Track form view and funnel stage
  useEffect(() => {
    trackFunnelStage(FunnelStage.INTENT, treatment, city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Track form submission
    trackFormSubmit('medical_tourism_inquiry', {
      city: formData.city,
      country: formData.country,
      treatment: formData.treatment,
      locale,
    });

    try {
      const response = await fetch('/api/v1/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'medical-tourism',
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();

      // Track successful submission
      trackFormSuccess('medical_tourism_inquiry', result.leadId, {
        city: formData.city,
        country: formData.country,
        treatment: formData.treatment,
      });

      // Track conversion funnel stage
      trackFunnelStage(FunnelStage.CONVERSION, formData.treatment, formData.city);

      setIsSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        city: city || '',
        country: country || '',
        treatment: treatment || '',
        medicalCondition: '',
        travelDate: '',
        message: '',
        preferredLanguage: locale,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t.errorMessage;
      setError(t.errorMessage);

      // Track form error
      trackFormError('medical_tourism_inquiry', errorMessage);

      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Track form start on first interaction
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('medical_tourism_inquiry', {
        city: city || '',
        country: country || '',
        treatment: treatment || '',
      });
    }

    // Track field completion for important fields
    if (value && ['name', 'email', 'phone', 'treatment', 'city'].includes(name)) {
      trackFormFieldComplete('medical_tourism_inquiry', name);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // If city is selected, set country automatically
    if (name === 'city') {
      const selectedCity = CITIES.find((c) => c.value === value);
      if (selectedCity) {
        setFormData((prev) => ({ ...prev, country: selectedCity.country }));
      }
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`bg-green-50 border border-green-200 rounded-lg p-8 text-center ${isArabic ? 'rtl' : 'ltr'}`}
      >
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">{t.successTitle}</h3>
        <p className="text-green-700">{t.successMessage}</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-green-600 hover:text-green-700 font-medium"
        >
          {isArabic ? 'إرسال استفسار آخر' : 'Submit Another Inquiry'}
        </button>
      </div>
    );
  }

  return (
    <div className={`${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.name} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t.namePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.email} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.phone} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder={t.phonePlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.whatsapp}</label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder={t.whatsappPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City & Treatment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.city} <span className="text-red-500">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t.selectCity}</option>
              {CITIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {isArabic ? c.labelAr : c.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.treatment} <span className="text-red-500">*</span>
            </label>
            <select
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t.selectTreatment}</option>
              {TREATMENTS.map((tr) => (
                <option key={tr.value} value={tr.value}>
                  {isArabic ? tr.labelAr : tr.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Medical Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.medicalCondition} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={handleChange}
            required
            rows={3}
            placeholder={t.medicalConditionPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Travel Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.travelDate}</label>
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Additional Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder={t.messagePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t.submitting}</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>{t.submit}</span>
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center">
          {isArabic
            ? 'من خلال إرسال هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا. معلوماتك آمنة ولن تتم مشاركتها مع أطراف ثالثة.'
            : 'By submitting this form, you agree to our privacy policy. Your information is secure and will not be shared with third parties.'}
        </p>
      </form>
    </div>
  );
}
