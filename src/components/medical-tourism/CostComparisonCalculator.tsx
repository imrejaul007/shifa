'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingDown, DollarSign } from 'lucide-react';
import { trackCostCalculatorView, trackCostCalculatorChange } from '@/lib/analytics';

interface TreatmentCost {
  treatmentId: string;
  nameEn: string;
  nameAr: string;
  gccCost: { min: number; max: number; currency: string };
  indiaCost: { min: number; max: number; currency: string };
  savingsPercent: number;
}

const TREATMENT_COSTS: TreatmentCost[] = [
  {
    treatmentId: 'heart-surgery',
    nameEn: 'Heart Surgery (CABG)',
    nameAr: 'جراحة القلب (مجازة الشريان التاجي)',
    gccCost: { min: 30000, max: 50000, currency: 'USD' },
    indiaCost: { min: 10000, max: 15000, currency: 'USD' },
    savingsPercent: 70,
  },
  {
    treatmentId: 'knee-replacement',
    nameEn: 'Knee Replacement',
    nameAr: 'استبدال الركبة',
    gccCost: { min: 20000, max: 35000, currency: 'USD' },
    indiaCost: { min: 6000, max: 10000, currency: 'USD' },
    savingsPercent: 70,
  },
  {
    treatmentId: 'hip-replacement',
    nameEn: 'Hip Replacement',
    nameAr: 'استبدال الورك',
    gccCost: { min: 22000, max: 38000, currency: 'USD' },
    indiaCost: { min: 7000, max: 12000, currency: 'USD' },
    savingsPercent: 68,
  },
  {
    treatmentId: 'ivf',
    nameEn: 'IVF Treatment (1 Cycle)',
    nameAr: 'علاج أطفال الأنابيب (دورة واحدة)',
    gccCost: { min: 8000, max: 15000, currency: 'USD' },
    indiaCost: { min: 2500, max: 4500, currency: 'USD' },
    savingsPercent: 70,
  },
  {
    treatmentId: 'dental-implants',
    nameEn: 'Dental Implants (Per Tooth)',
    nameAr: 'زراعة الأسنان (لكل سن)',
    gccCost: { min: 2000, max: 4000, currency: 'USD' },
    indiaCost: { min: 800, max: 1500, currency: 'USD' },
    savingsPercent: 65,
  },
  {
    treatmentId: 'hair-transplant',
    nameEn: 'Hair Transplant (3000 Grafts)',
    nameAr: 'زراعة الشعر (3000 طعم)',
    gccCost: { min: 5000, max: 10000, currency: 'USD' },
    indiaCost: { min: 1500, max: 3000, currency: 'USD' },
    savingsPercent: 70,
  },
  {
    treatmentId: 'cataract-surgery',
    nameEn: 'Cataract Surgery (Both Eyes)',
    nameAr: 'جراحة الساد (كلتا العينين)',
    gccCost: { min: 4000, max: 8000, currency: 'USD' },
    indiaCost: { min: 1200, max: 2500, currency: 'USD' },
    savingsPercent: 70,
  },
  {
    treatmentId: 'oncology-treatment',
    nameEn: 'Cancer Treatment (Chemotherapy Cycle)',
    nameAr: 'علاج السرطان (دورة العلاج الكيميائي)',
    gccCost: { min: 3000, max: 8000, currency: 'USD' },
    indiaCost: { min: 800, max: 2000, currency: 'USD' },
    savingsPercent: 75,
  },
  {
    treatmentId: 'cosmetic-surgery',
    nameEn: 'Rhinoplasty (Nose Surgery)',
    nameAr: 'تجميل الأنف',
    gccCost: { min: 6000, max: 12000, currency: 'USD' },
    indiaCost: { min: 2000, max: 4000, currency: 'USD' },
    savingsPercent: 67,
  },
  {
    treatmentId: 'bariatric-surgery',
    nameEn: 'Gastric Sleeve Surgery',
    nameAr: 'جراحة تكميم المعدة',
    gccCost: { min: 15000, max: 25000, currency: 'USD' },
    indiaCost: { min: 5000, max: 8000, currency: 'USD' },
    savingsPercent: 68,
  },
];

interface CostComparisonCalculatorProps {
  locale: 'en' | 'ar';
  preselectedTreatment?: string;
  variant?: 'compact' | 'full';
}

export default function CostComparisonCalculator({
  locale,
  preselectedTreatment,
  variant = 'full',
}: CostComparisonCalculatorProps) {
  const isArabic = locale === 'ar';
  const [selectedTreatment, setSelectedTreatment] = useState(
    preselectedTreatment || TREATMENT_COSTS[0].treatmentId
  );

  const treatment = TREATMENT_COSTS.find((t) => t.treatmentId === selectedTreatment);

  // Track calculator view on mount
  useEffect(() => {
    if (treatment) {
      trackCostCalculatorView(treatment.treatmentId, locale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!treatment) return null;

  const gccAvg = (treatment.gccCost.min + treatment.gccCost.max) / 2;
  const indiaAvg = (treatment.indiaCost.min + treatment.indiaCost.max) / 2;
  const savingsAmount = gccAvg - indiaAvg;

  // Track treatment selection change
  const handleTreatmentChange = (newTreatmentId: string) => {
    const newTreatment = TREATMENT_COSTS.find((t) => t.treatmentId === newTreatmentId);
    if (newTreatment) {
      const newGccAvg = (newTreatment.gccCost.min + newTreatment.gccCost.max) / 2;
      const newIndiaAvg = (newTreatment.indiaCost.min + newTreatment.indiaCost.max) / 2;
      const newSavings = newGccAvg - newIndiaAvg;

      trackCostCalculatorChange(newTreatmentId, newGccAvg, newIndiaAvg, newSavings);
      setSelectedTreatment(newTreatmentId);
    }
  };

  const content = {
    en: {
      title: 'Cost Comparison Calculator',
      subtitle: 'See how much you can save by choosing India for your medical treatment',
      selectTreatment: 'Select Treatment',
      costIn: 'Cost in',
      gcc: 'GCC Countries',
      india: 'India',
      youSave: 'You Save',
      upto: 'Up to',
      includes: 'India package typically includes',
      inclusion1: 'Hospital charges & surgeon fees',
      inclusion2: 'Airport pickup & drop',
      inclusion3: 'Accommodation for patient + 1 attendant',
      inclusion4: 'Local transportation',
      inclusion5: 'Medical translator',
      inclusion6: 'Post-treatment follow-up',
      note: 'Note',
      noteText:
        'Costs are approximate and may vary based on hospital selection, room type, and specific patient requirements. Final quote will be provided after medical evaluation.',
      getQuote: 'Get Personalized Quote',
    },
    ar: {
      title: 'حاسبة مقارنة التكاليف',
      subtitle: 'اعرف كم يمكنك توفيره باختيار الهند لعلاجك الطبي',
      selectTreatment: 'اختر العلاج',
      costIn: 'التكلفة في',
      gcc: 'دول مجلس التعاون الخليجي',
      india: 'الهند',
      youSave: 'توفر',
      upto: 'حتى',
      includes: 'تشمل باقة الهند عادةً',
      inclusion1: 'رسوم المستشفى والجراح',
      inclusion2: 'الاستقبال من المطار والتوصيل',
      inclusion3: 'إقامة للمريض + مرافق واحد',
      inclusion4: 'النقل المحلي',
      inclusion5: 'مترجم طبي',
      inclusion6: 'متابعة ما بعد العلاج',
      note: 'ملاحظة',
      noteText:
        'التكاليف تقريبية وقد تختلف بناءً على اختيار المستشفى ونوع الغرفة ومتطلبات المريض المحددة. سيتم تقديم عرض أسعار نهائي بعد التقييم الطبي.',
      getQuote: 'احصل على عرض أسعار مخصص',
    },
  };

  const t = content[locale];

  if (variant === 'compact') {
    return (
      <div
        className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 ${isArabic ? 'rtl' : 'ltr'}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
        </div>

        <select
          value={selectedTreatment}
          onChange={(e) => handleTreatmentChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {TREATMENT_COSTS.map((tr) => (
            <option key={tr.treatmentId} value={tr.treatmentId}>
              {isArabic ? tr.nameAr : tr.nameEn}
            </option>
          ))}
        </select>

        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="text-sm text-gray-600 mb-1">
            {t.costIn} {t.gcc}
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${treatment.gccCost.min.toLocaleString()} - ${treatment.gccCost.max.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="text-sm text-gray-600 mb-1">
            {t.costIn} {t.india}
          </div>
          <div className="text-2xl font-bold text-blue-600">
            ${treatment.indiaCost.min.toLocaleString()} - $
            {treatment.indiaCost.max.toLocaleString()}
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-4 text-center">
          <div className="text-sm mb-1">
            {t.youSave} {t.upto}
          </div>
          <div className="text-3xl font-bold flex items-center justify-center gap-2">
            <TrendingDown className="w-6 h-6" />
            {treatment.savingsPercent}%
          </div>
          <div className="text-lg mt-1">${savingsAmount.toLocaleString()}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Treatment Selector */}
      <div className="max-w-md mx-auto mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectTreatment}</label>
        <select
          value={selectedTreatment}
          onChange={(e) => handleTreatmentChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {TREATMENT_COSTS.map((tr) => (
            <option key={tr.treatmentId} value={tr.treatmentId}>
              {isArabic ? tr.nameAr : tr.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* Cost Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* GCC Cost */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">{t.gcc}</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">${gccAvg.toLocaleString()}</div>
          <div className="text-sm text-gray-600">
            ${treatment.gccCost.min.toLocaleString()} - ${treatment.gccCost.max.toLocaleString()}
          </div>
        </div>

        {/* India Cost */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 border-2 border-blue-600 text-white">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5" />
            <h3 className="font-bold">{t.india}</h3>
          </div>
          <div className="text-4xl font-bold mb-2">${indiaAvg.toLocaleString()}</div>
          <div className="text-sm opacity-90">
            ${treatment.indiaCost.min.toLocaleString()} - $
            {treatment.indiaCost.max.toLocaleString()}
          </div>
        </div>

        {/* Savings */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg p-6 border-2 border-green-600 text-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5" />
            <h3 className="font-bold">{t.youSave}</h3>
          </div>
          <div className="text-4xl font-bold mb-2">{treatment.savingsPercent}%</div>
          <div className="text-2xl font-semibold">${savingsAmount.toLocaleString()}</div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">{t.includes}:</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[t.inclusion1, t.inclusion2, t.inclusion3, t.inclusion4, t.inclusion5, t.inclusion6].map(
            (inclusion, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">{inclusion}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex gap-2">
          <span className="text-yellow-600 font-bold">{t.note}:</span>
          <p className="text-sm text-gray-700">{t.noteText}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={`/${locale}/contact`}
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
        >
          {t.getQuote}
        </a>
      </div>
    </div>
  );
}
