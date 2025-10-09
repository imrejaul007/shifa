'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

interface TreatmentFormModalProps {
  treatment: Record<string, unknown> | null;
  onClose: () => void;
}

export default function TreatmentFormModal({
  treatment,
  onClose,
}: TreatmentFormModalProps) {
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    slug: '',
    summary_en: '',
    summary_ar: '',
    description_en: '',
    description_ar: '',
    category_en: '',
    category_ar: '',
    costMin: '',
    costMax: '',
    duration: '',
    successRate: '',
    recoveryTime: '',
    featuredImage: '',
    published: false,
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  // const [hospitals, setHospitals] = useState<Record<string, unknown>[]>([]);
  // const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);

  useEffect(() => {
    // Fetch hospitals for selection
    // fetch('/api/v1/hospitals?published=true')
    //   .then((res) => res.json())
    //   .then((data) => setHospitals(data.data || []))
    //   .catch(console.error);

    // Load treatment data if editing
    if (treatment) {
      setFormData({
        title_en: treatment.title_en || '',
        title_ar: treatment.title_ar || '',
        slug: treatment.slug || '',
        summary_en: treatment.summary_en || '',
        summary_ar: treatment.summary_ar || '',
        description_en: treatment.description_en || '',
        description_ar: treatment.description_ar || '',
        category_en: treatment.category_en || '',
        category_ar: treatment.category_ar || '',
        costMin: treatment.costMin?.toString() || '',
        costMax: treatment.costMax?.toString() || '',
        duration: treatment.duration || '',
        successRate: treatment.successRate?.toString() || '',
        recoveryTime: treatment.recoveryTime || '',
        featuredImage: treatment.featuredImage || '',
        published: treatment.published || false,
        featured: treatment.featured || false,
      });
    }
  }, [treatment]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from English title
    if (name === 'title_en' && !treatment) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        costMin: formData.costMin ? parseFloat(formData.costMin) : null,
        costMax: formData.costMax ? parseFloat(formData.costMax) : null,
        successRate: formData.successRate ? parseFloat(formData.successRate) : null,
        hospitalIds: selectedHospitals,
      };

      const url = treatment
        ? `/api/v1/treatments/${treatment.slug}`
        : '/api/v1/treatments';
      const method = treatment ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onClose();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save treatment');
      }
    } catch (error) {
      console.error('Error saving treatment:', error);
      alert('Failed to save treatment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {treatment ? 'Edit Treatment' : 'Add New Treatment'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (English) *
              </label>
              <input
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (Arabic) *
              </label>
              <input
                type="text"
                name="title_ar"
                value={formData.title_ar}
                onChange={handleInputChange}
                required
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                disabled={!!treatment}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (English) *
              </label>
              <input
                type="text"
                name="category_en"
                value={formData.category_en}
                onChange={handleInputChange}
                required
                placeholder="e.g., Cardiology, Orthopedics"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (Arabic)
              </label>
              <input
                type="text"
                name="category_ar"
                value={formData.category_ar}
                onChange={handleInputChange}
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 2-3 hours"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Min (USD)
              </label>
              <input
                type="number"
                name="costMin"
                value={formData.costMin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Max (USD)
              </label>
              <input
                type="number"
                name="costMax"
                value={formData.costMax}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Success Rate (%)
              </label>
              <input
                type="number"
                name="successRate"
                value={formData.successRate}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recovery Time
              </label>
              <input
                type="text"
                name="recoveryTime"
                value={formData.recoveryTime}
                onChange={handleInputChange}
                placeholder="e.g., 2-4 weeks"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary (English)
              </label>
              <textarea
                name="summary_en"
                value={formData.summary_en}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary (Arabic)
              </label>
              <textarea
                name="summary_ar"
                value={formData.summary_ar}
                onChange={handleInputChange}
                rows={3}
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
            </label>
            <RichTextEditor
              content={formData.description_en}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description_en: content }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Arabic)
            </label>
            <RichTextEditor
              content={formData.description_ar}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description_ar: content }))
              }
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <ImageUploader
              value={formData.featuredImage}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, featuredImage: url }))
              }
            />
          </div>

          {/* Options */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Published</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : treatment ? 'Update Treatment' : 'Create Treatment'}
          </button>
        </div>
      </div>
    </div>
  );
}
