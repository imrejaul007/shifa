'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const bookingSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  countryOfOrigin: z.string().min(2, 'Please select your country'),
  treatmentId: z.string().optional(),
  hospitalId: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  treatmentId?: string;
  hospitalId?: string;
  locale: 'en' | 'ar';
}

const content = {
  en: {
    title: 'Book Free Consultation',
    subtitle: 'Fill out the form below and we will contact you within 24 hours',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number (with country code)',
    country: 'Country',
    treatment: 'Treatment Interested In (Optional)',
    notes: 'Additional Notes',
    submit: 'Submit Inquiry',
    submitting: 'Submitting...',
    success: 'Thank you! We will contact you soon.',
    error: 'Failed to submit. Please try again.',
    countries: [
      { value: 'United Arab Emirates', label: 'United Arab Emirates (UAE)' },
      { value: 'Saudi Arabia', label: 'Saudi Arabia' },
      { value: 'Kuwait', label: 'Kuwait' },
      { value: 'Oman', label: 'Oman' },
      { value: 'Qatar', label: 'Qatar' },
      { value: 'Bahrain', label: 'Bahrain' },
      { value: 'Other', label: 'Other' },
    ],
  },
  ar: {
    title: 'احجز استشارة مجانية',
    subtitle: 'املأ النموذج أدناه وسنتصل بك خلال 24 ساعة',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف (مع رمز البلد)',
    country: 'البلد',
    treatment: 'العلاج المهتم به (اختياري)',
    notes: 'ملاحظات إضافية',
    submit: 'إرسال الاستفسار',
    submitting: 'جاري الإرسال...',
    success: 'شكراً! سنتصل بك قريباً.',
    error: 'فشل الإرسال. يرجى المحاولة مرة أخرى.',
    countries: [
      { value: 'United Arab Emirates', label: 'الإمارات العربية المتحدة' },
      { value: 'Saudi Arabia', label: 'المملكة العربية السعودية' },
      { value: 'Kuwait', label: 'الكويت' },
      { value: 'Oman', label: 'عمان' },
      { value: 'Qatar', label: 'قطر' },
      { value: 'Bahrain', label: 'البحرين' },
      { value: 'Other', label: 'أخرى' },
    ],
  },
};

export default function BookingForm({
  treatmentId,
  hospitalId,
  locale,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: '',
    email: '',
    phone: '',
    countryOfOrigin: '',
    treatmentId: treatmentId || '',
    hospitalId: hospitalId || '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const t = content[locale];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setErrorMessage('');
    setSuccess(false);

    try {
      // Validate form data
      const validatedData = bookingSchema.parse(formData);

      // Submit to API
      const response = await fetch('/api/v1/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          patientName: '',
          email: '',
          phone: '',
          countryOfOrigin: '',
          treatmentId: treatmentId || '',
          hospitalId: hospitalId || '',
          notes: '',
        });

        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID',
            event_category: 'Lead',
            event_label: 'Booking Form Submission',
          });
        }
      } else {
        setErrorMessage(data.error || t.error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrorMessage(t.error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}>
          {t.success}
        </h3>
        <p className={`text-gray-600 ${locale === 'ar' ? 'font-arabic' : ''}`}>
          {locale === 'en'
            ? 'One of our Arabic-speaking coordinators will reach out to you shortly.'
            : 'سيتواصل معك أحد منسقينا الناطقين بالعربية قريبًا.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className={`text-3xl font-bold text-gray-900 mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}>
        {t.title}
      </h3>
      <p className={`text-gray-600 mb-8 ${locale === 'ar' ? 'font-arabic' : ''}`}>
        {t.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="patientName"
            className={`block text-sm font-medium text-gray-700 mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}
          >
            {t.name} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.patientName ? 'border-red-500' : 'border-gray-300'
            }`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          />
          {errors.patientName && (
            <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className={`block text-sm font-medium text-gray-700 mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}
          >
            {t.email} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            dir="ltr"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className={`block text-sm font-medium text-gray-700 mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}
          >
            {t.phone} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+971501234567"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            dir="ltr"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor="countryOfOrigin"
            className={`block text-sm font-medium text-gray-700 mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}
          >
            {t.country} <span className="text-red-500">*</span>
          </label>
          <select
            id="countryOfOrigin"
            name="countryOfOrigin"
            value={formData.countryOfOrigin}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.countryOfOrigin ? 'border-red-500' : 'border-gray-300'
            } ${locale === 'ar' ? 'font-arabic' : ''}`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <option value="">
              {locale === 'en' ? 'Select your country' : 'اختر بلدك'}
            </option>
            {t.countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.countryOfOrigin && (
            <p className="mt-1 text-sm text-red-600">{errors.countryOfOrigin}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className={`block text-sm font-medium text-gray-700 mb-2 ${locale === 'ar' ? 'font-arabic' : ''}`}
          >
            {t.notes}
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${locale === 'ar' ? 'font-arabic' : ''}`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className={`text-sm text-red-600 ${locale === 'ar' ? 'font-arabic' : ''}`}>
              {errorMessage}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span className={locale === 'ar' ? 'font-arabic' : ''}>
                {t.submitting}
              </span>
            </>
          ) : (
            <span className={locale === 'ar' ? 'font-arabic' : ''}>
              {t.submit}
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
