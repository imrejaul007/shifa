'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

interface DoctorFormModalProps {
  doctor: Record<string, unknown> | null;
  onClose: () => void;
}

export default function DoctorFormModal({ doctor, onClose }: DoctorFormModalProps) {
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    slug: '',
    specialty_en: '',
    specialty_ar: '',
    qualifications_en: '',
    qualifications_ar: '',
    bio_en: '',
    bio_ar: '',
    experience: '',
    consultationFee: '',
    image: '',
    email: '',
    phone: '',
    hospitalId: '',
    languagesSpoken: '',
    availableForTelemedicine: false,
    published: false,
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    // Fetch hospitals
    fetch('/api/v1/hospitals?published=true')
      .then((res) => res.json())
      .then((data) => setHospitals(data.data || []))
      .catch(console.error);

    // Load doctor data if editing
    if (doctor) {
      setFormData({
        name_en: String(doctor.name_en || ''),
        name_ar: String(doctor.name_ar || ''),
        slug: String(doctor.slug || ''),
        specialty_en: String(doctor.specialty_en || ''),
        specialty_ar: String(doctor.specialty_ar || ''),
        qualifications_en: String(doctor.qualifications_en || ''),
        qualifications_ar: String(doctor.qualifications_ar || ''),
        bio_en: String(doctor.bio_en || ''),
        bio_ar: String(doctor.bio_ar || ''),
        experience: String(doctor.experience || ''),
        consultationFee: String(doctor.consultationFee || ''),
        image: String(doctor.image || ''),
        email: String(doctor.email || ''),
        phone: String(doctor.phone || ''),
        hospitalId: String(doctor.hospitalId || ''),
        languagesSpoken: Array.isArray(doctor.languagesSpoken)
          ? (doctor.languagesSpoken as string[]).join(', ')
          : '',
        availableForTelemedicine: Boolean(doctor.availableForTelemedicine),
        published: Boolean(doctor.published),
        featured: Boolean(doctor.featured),
      });
    }
  }, [doctor]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/dr\.?\s*/gi, '')
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

    // Auto-generate slug from English name
    if (name === 'name_en' && !doctor) {
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
        experience: formData.experience ? parseInt(formData.experience) : 0,
        consultationFee: formData.consultationFee ? parseFloat(formData.consultationFee) : null,
        languagesSpoken: formData.languagesSpoken
          ? formData.languagesSpoken.split(',').map((l) => l.trim())
          : [],
      };

      const url = doctor ? `/api/v1/doctors/${doctor.slug}` : '/api/v1/doctors';
      const method = doctor ? 'PATCH' : 'POST';

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
        alert(error.message || 'Failed to save doctor');
      }
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Failed to save doctor');
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
            {doctor ? 'Edit Doctor' : 'Add New Doctor'}
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
                Name (English) *
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleInputChange}
                required
                placeholder="Dr. John Smith"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name (Arabic) *
              </label>
              <input
                type="text"
                name="name_ar"
                value={formData.name_ar}
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
                disabled={!!doctor}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital *</label>
              <select
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={String(hospital.id)} value={String(hospital.id)}>
                    {String(hospital.name_en)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty (English) *
              </label>
              <input
                type="text"
                name="specialty_en"
                value={formData.specialty_en}
                onChange={handleInputChange}
                required
                placeholder="e.g., Cardiologist, Orthopedic Surgeon"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty (Arabic)
              </label>
              <input
                type="text"
                name="specialty_ar"
                value={formData.specialty_ar}
                onChange={handleInputChange}
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience (Years) *
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fee (USD)
              </label>
              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages Spoken (comma-separated)
              </label>
              <input
                type="text"
                name="languagesSpoken"
                value={formData.languagesSpoken}
                onChange={handleInputChange}
                placeholder="English, Arabic, Hindi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Qualifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications (English)
              </label>
              <textarea
                name="qualifications_en"
                value={formData.qualifications_en}
                onChange={handleInputChange}
                rows={3}
                placeholder="MBBS, MD, FRCS"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications (Arabic)
              </label>
              <textarea
                name="qualifications_ar"
                value={formData.qualifications_ar}
                onChange={handleInputChange}
                rows={3}
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio (English)</label>
            <RichTextEditor
              content={formData.bio_en}
              onChange={(content) => setFormData((prev) => ({ ...prev, bio_en: content }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio (Arabic)</label>
            <RichTextEditor
              content={formData.bio_ar}
              onChange={(content) => setFormData((prev) => ({ ...prev, bio_ar: content }))}
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
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
                name="availableForTelemedicine"
                checked={formData.availableForTelemedicine}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Available for Telemedicine</span>
            </label>

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
            {loading ? 'Saving...' : doctor ? 'Update Doctor' : 'Create Doctor'}
          </button>
        </div>
      </div>
    </div>
  );
}
