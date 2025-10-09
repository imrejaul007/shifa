'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

interface PackageFormModalProps {
  pkg: Record<string, unknown> | null;
  onClose: () => void;
}

export default function PackageFormModal({ pkg, onClose }: PackageFormModalProps) {
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    slug: '',
    description_en: '',
    description_ar: '',
    price: '',
    duration: '',
    maxPatients: '',
    image: '',
    published: false,
    featured: false,
  });
  const [features, setFeatures] = useState<{ en: string; ar: string }[]>([]);
  const [newFeature, setNewFeature] = useState({ en: '', ar: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pkg) {
      setFormData({
        title_en: String(pkg.title_en || ''),
        title_ar: String(pkg.title_ar || ''),
        slug: String(pkg.slug || ''),
        description_en: String(pkg.description_en || ''),
        description_ar: String(pkg.description_ar || ''),
        price: String(pkg.price || ''),
        duration: String(pkg.duration || ''),
        maxPatients: String(pkg.maxPatients || ''),
        image: String(pkg.image || ''),
        published: Boolean(pkg.published),
        featured: Boolean(pkg.featured),
      });
      setFeatures(
        Array.isArray(pkg.features) ? (pkg.features as { en: string; ar: string }[]) : []
      );
    }
  }, [pkg]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from English title
    if (name === 'title_en' && !pkg) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.en.trim() && newFeature.ar.trim()) {
      setFeatures([...features, { en: newFeature.en.trim(), ar: newFeature.ar.trim() }]);
      setNewFeature({ en: '', ar: '' });
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        maxPatients: formData.maxPatients ? parseInt(formData.maxPatients) : null,
        features,
      };

      const url = pkg ? `/api/v1/packages/${pkg.slug}` : '/api/v1/packages';
      const method = pkg ? 'PATCH' : 'POST';

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
        alert(error.message || 'Failed to save package');
      }
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Failed to save package');
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
            {pkg ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                disabled={!!pkg}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 7 days, 2 weeks"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Patients</label>
              <input
                type="number"
                name="maxPatients"
                value={formData.maxPatients}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Package Features</label>
            <div className="space-y-2 mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newFeature.en}
                  onChange={(e) => setNewFeature((prev) => ({ ...prev, en: e.target.value }))}
                  placeholder="Feature in English"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="text"
                  value={newFeature.ar}
                  onChange={(e) => setNewFeature((prev) => ({ ...prev, ar: e.target.value }))}
                  placeholder="Feature in Arabic"
                  dir="rtl"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{feature.en}</div>
                    <div className="text-sm text-gray-600" dir="rtl">
                      {feature.ar}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {features.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">No features added yet</div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
            </label>
            <RichTextEditor
              content={formData.description_en}
              onChange={(content) => setFormData((prev) => ({ ...prev, description_en: content }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Arabic)
            </label>
            <RichTextEditor
              content={formData.description_ar}
              onChange={(content) => setFormData((prev) => ({ ...prev, description_ar: content }))}
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
            <ImageUploader
              value={formData.image}
              onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
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
            {loading ? 'Saving...' : pkg ? 'Update Package' : 'Create Package'}
          </button>
        </div>
      </div>
    </div>
  );
}
