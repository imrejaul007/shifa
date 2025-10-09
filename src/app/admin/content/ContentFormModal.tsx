'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

interface ContentFormModalProps {
  content: any | null;
  onClose: () => void;
}

export default function ContentFormModal({
  content,
  onClose,
}: ContentFormModalProps) {
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    slug: '',
    excerpt_en: '',
    excerpt_ar: '',
    content_en: '',
    content_ar: '',
    type: 'blog',
    author: '',
    featuredImage: '',
    metaTitle_en: '',
    metaTitle_ar: '',
    metaDescription_en: '',
    metaDescription_ar: '',
    published: false,
    featured: false,
    publishedAt: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (content) {
      setFormData({
        title_en: content.title_en || '',
        title_ar: content.title_ar || '',
        slug: content.slug || '',
        excerpt_en: content.excerpt_en || '',
        excerpt_ar: content.excerpt_ar || '',
        content_en: content.content_en || '',
        content_ar: content.content_ar || '',
        type: content.type || 'blog',
        author: content.author || '',
        featuredImage: content.featuredImage || '',
        metaTitle_en: content.metaTitle_en || '',
        metaTitle_ar: content.metaTitle_ar || '',
        metaDescription_en: content.metaDescription_en || '',
        metaDescription_ar: content.metaDescription_ar || '',
        published: content.published || false,
        featured: content.featured || false,
        publishedAt: content.publishedAt
          ? new Date(content.publishedAt).toISOString().slice(0, 16)
          : '',
      });
    }
  }, [content]);

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
    if (name === 'title_en' && !content) {
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
        publishedAt: formData.publishedAt
          ? new Date(formData.publishedAt).toISOString()
          : formData.published
          ? new Date().toISOString()
          : null,
      };

      const url = content ? `/api/v1/content/${content.slug}` : '/api/v1/content';
      const method = content ? 'PATCH' : 'POST';

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
        alert(error.message || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
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
            {content ? 'Edit Content' : 'Add New Content'}
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
                disabled={!!content}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="blog">Blog Post</option>
                <option value="page">Static Page</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="datetime-local"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (English)
              </label>
              <textarea
                name="excerpt_en"
                value={formData.excerpt_en}
                onChange={handleInputChange}
                rows={3}
                placeholder="Short summary of the content..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Arabic)
              </label>
              <textarea
                name="excerpt_ar"
                value={formData.excerpt_ar}
                onChange={handleInputChange}
                rows={3}
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (English) *
            </label>
            <RichTextEditor
              content={formData.content_en}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, content_en: content }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (Arabic) *
            </label>
            <RichTextEditor
              content={formData.content_ar}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, content_ar: content }))
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

          {/* SEO Meta */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title (English)
                </label>
                <input
                  type="text"
                  name="metaTitle_en"
                  value={formData.metaTitle_en}
                  onChange={handleInputChange}
                  placeholder="Defaults to title if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title (Arabic)
                </label>
                <input
                  type="text"
                  name="metaTitle_ar"
                  value={formData.metaTitle_ar}
                  onChange={handleInputChange}
                  dir="rtl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description (English)
                </label>
                <textarea
                  name="metaDescription_en"
                  value={formData.metaDescription_en}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Defaults to excerpt if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description (Arabic)
                </label>
                <textarea
                  name="metaDescription_ar"
                  value={formData.metaDescription_ar}
                  onChange={handleInputChange}
                  rows={2}
                  dir="rtl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
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
            {loading ? 'Saving...' : content ? 'Update Content' : 'Create Content'}
          </button>
        </div>
      </div>
    </div>
  );
}
