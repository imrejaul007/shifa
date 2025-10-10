'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { trackConsultationRequest } from '@/components/Analytics';

import {
  FileText,
  Upload,
  CheckCircle2,
  User,
  Calendar,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';

const locale = 'en'; // Will be dynamic with next-intl

const translations = {
  en: {
    title: 'Free Medical Consultation',
    subtitle: 'Get Expert Opinion in 24 Hours',
    description:
      'Upload your medical reports and receive a detailed treatment plan with cost estimate',
    steps: [
      { icon: User, title: 'Personal Details', description: 'Basic information' },
      { icon: Stethoscope, title: 'Medical Info', description: 'Condition & reports' },
      { icon: Calendar, title: 'Preferences', description: 'Timeline & requirements' },
      { icon: CheckCircle2, title: 'Confirmation', description: 'Review & submit' },
    ],
    // Form labels
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    country: 'Country',
    age: 'Age',
    gender: 'Gender',
    treatment: 'Treatment Interested In',
    medicalCondition: 'Medical Condition',
    uploadReports: 'Upload Medical Reports',
    uploadHint: 'Drag & drop files or click to browse (PDF, JPG, PNG - Max 10MB)',
    preferredDate: 'Preferred Travel Date',
    additionalInfo: 'Additional Information',
    languages: 'Preferred Language',
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit Request',
    submitting: 'Submitting...',
    successTitle: 'Consultation Request Submitted!',
    successMessage:
      'Our team will review your case and contact you within 24 hours with a detailed treatment plan.',
    countries: ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Other'],
    genders: ['Male', 'Female'],
    languageOptions: ['Arabic', 'English', 'Both'],
    treatments: [
      'Cardiac Surgery',
      'Orthopedic Surgery',
      'Cancer Treatment',
      'IVF / Fertility Treatment',
      'Cosmetic Surgery',
      'Dental Treatment',
      'Neurosurgery',
      'Kidney Transplant',
      'Liver Transplant',
      'Other',
    ],
  },
  ar: {
    title: 'استشارة طبية مجانية',
    subtitle: 'احصل على رأي الخبراء في 24 ساعة',
    description: 'قم بتحميل تقاريرك الطبية واحصل على خطة علاج مفصلة مع تقدير التكلفة',
  },
};

const t = translations[locale];

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    email: '',
    phone: '',
    country: '',
    age: '',
    gender: '',

    // Step 2: Medical
    treatment: '',
    medicalCondition: '',

    // Step 3: Preferences
    preferredDate: '',
    languages: '',
    additionalInfo: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < t.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track consultation request
    trackConsultationRequest();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
          <p className="text-lg text-muted-foreground mb-8">{t.successMessage}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/en" variant="gold" size="lg">
              Back to Home
            </ButtonLink>
            <ButtonLink href="/en/treatments" variant="outline" size="lg">
              Browse Treatments
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
              <FileText className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Free Consultation</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary leading-tight mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">{t.subtitle}</p>
            <p className="text-base text-muted-foreground/80">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {t.steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div key={index} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`
                          w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all mb-2
                          ${isActive ? 'bg-accent text-primary scale-110' : isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                        ) : (
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        )}
                      </div>
                      <p
                        className={`text-xs sm:text-sm font-semibold hidden sm:block ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground hidden lg:block">
                        {step.description}
                      </p>
                    </div>

                    {index < t.steps.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-muted'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border-2 border-transparent hover:border-accent/30 transition-all"
            >
              {/* Step 1: Personal Details */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                    Personal Details
                  </h2>

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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
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
                        <option value="">Select</option>
                        {t.countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {t.age} *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="1"
                        max="120"
                        className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {t.gender} *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        {t.genders.map((gender, index) => (
                          <option key={index} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Medical Info */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                    Medical Information
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.treatment} *
                    </label>
                    <select
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all appearance-none"
                    >
                      <option value="">Select Treatment</option>
                      {t.treatments.map((treatment, index) => (
                        <option key={index} value={treatment}>
                          {treatment}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.medicalCondition} *
                    </label>
                    <textarea
                      name="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Please describe your medical condition, symptoms, and any previous treatments..."
                      className="w-full px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.uploadReports}
                    </label>
                    <div className="border-2 border-dashed border-muted hover:border-accent transition-all rounded-2xl p-8 text-center">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="fileUpload"
                      />
                      <label htmlFor="fileUpload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">{t.uploadHint}</p>
                      </label>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-secondary p-3 rounded-xl"
                          >
                            <span className="text-sm text-foreground truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                    Travel Preferences
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {t.preferredDate}
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {t.languages} *
                      </label>
                      <select
                        name="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        required
                        className="w-full min-h-[52px] px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        {t.languageOptions.map((lang, index) => (
                          <option key={index} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      {t.additionalInfo}
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Any specific requirements, questions, or concerns..."
                      className="w-full px-6 py-4 text-base bg-secondary border-2 border-transparent rounded-2xl focus:border-accent focus:outline-none transition-all resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight mb-6">
                    Review Your Information
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-secondary p-4 rounded-2xl">
                      <h3 className="font-semibold text-primary mb-2">Personal Details</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.fullName}, {formData.age} years, {formData.gender}
                        <br />
                        {formData.email} | {formData.phone}
                        <br />
                        {formData.country}
                      </p>
                    </div>

                    <div className="bg-secondary p-4 rounded-2xl">
                      <h3 className="font-semibold text-primary mb-2">Medical Information</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>Treatment:</strong> {formData.treatment}
                        <br />
                        <strong>Condition:</strong> {formData.medicalCondition}
                        <br />
                        <strong>Reports Uploaded:</strong> {uploadedFiles.length} file(s)
                      </p>
                    </div>

                    <div className="bg-secondary p-4 rounded-2xl">
                      <h3 className="font-semibold text-primary mb-2">Preferences</h3>
                      <p className="text-sm text-muted-foreground">
                        <strong>Preferred Date:</strong> {formData.preferredDate || 'Flexible'}
                        <br />
                        <strong>Language:</strong> {formData.languages}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-muted">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="secondary"
                    size="md"
                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                  >
                    {t.previous}
                  </Button>
                )}

                <div className="flex-1" />

                {currentStep < t.steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    variant="gold"
                    size="md"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    {t.next}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    isLoading={isSubmitting}
                    leftIcon={!isSubmitting ? <CheckCircle2 className="w-5 h-5" /> : undefined}
                  >
                    {isSubmitting ? t.submitting : t.submit}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
