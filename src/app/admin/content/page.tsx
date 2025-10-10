'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { Plus, Edit2, Trash2, Eye, FileText } from 'lucide-react';
import ContentFormModal from './ContentFormModal';

// Force dynamic rendering to prevent SSR errors
export const dynamic = 'force-dynamic';

interface ContentPage extends Record<string, unknown> {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  type: string;
  author: string | null;
  publishedAt: Date | null;
  published: boolean;
  featured: boolean;
  updatedAt: string;
}

export default function ContentAdminPage() {
  const [content, setContent] = useState<ContentPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentPage | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'blog' | 'page'>('all');

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/v1/content?includeUnpublished=true');
      const data = await response.json();
      setContent(data.data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleDelete = async (item: ContentPage) => {
    if (!confirm(`Are you sure you want to delete "${item.title_en}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/content/${item.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchContent();
      } else {
        alert('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    }
  };

  const handleTogglePublished = async (item: ContentPage) => {
    try {
      const response = await fetch(`/api/v1/content/${item.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !item.published,
          publishedAt: !item.published ? new Date().toISOString() : item.publishedAt,
        }),
      });

      if (response.ok) {
        fetchContent();
      }
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const handleToggleFeatured = async (item: ContentPage) => {
    try {
      const response = await fetch(`/api/v1/content/${item.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !item.featured,
        }),
      });

      if (response.ok) {
        fetchContent();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleEdit = (item: ContentPage) => {
    setSelectedContent(item);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedContent(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
    fetchContent();
  };

  const filteredContent =
    typeFilter === 'all' ? content : content.filter((item) => item.type === typeFilter);

  const columns = [
    {
      key: 'title_en',
      label: 'Title',
      render: (item: ContentPage) => (
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <div className="font-medium text-gray-900 truncate">{item.title_en}</div>
          </div>
          <div className="text-sm text-gray-500 truncate ml-6" dir="rtl">
            {item.title_ar}
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (item: ContentPage) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.type === 'blog' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
          }`}
        >
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      ),
    },
    {
      key: 'author',
      label: 'Author',
      render: (item: ContentPage) => (
        <span className="text-sm text-gray-700">{item.author || 'N/A'}</span>
      ),
    },
    {
      key: 'publishedAt',
      label: 'Published Date',
      render: (item: ContentPage) => (
        <span className="text-sm text-gray-500">
          {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Not published'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
      render: (item: ContentPage) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePublished(item);
            }}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {item.published ? 'Published' : 'Draft'}
          </button>
          {item.type === 'blog' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFeatured(item);
              }}
              className={`p-1 rounded ${item.featured ? 'text-yellow-500' : 'text-gray-300'}`}
              title={item.featured ? 'Featured' : 'Not featured'}
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      render: (item: ContentPage) => (
        <span className="text-sm text-gray-500">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (item: ContentPage) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(item);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage blog posts and static pages</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Content
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({content.length})
          </button>
          <button
            onClick={() => setTypeFilter('blog')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'blog'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Blog Posts ({content.filter((c) => c.type === 'blog').length})
          </button>
          <button
            onClick={() => setTypeFilter('page')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'page'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Static Pages ({content.filter((c) => c.type === 'page').length})
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Content</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{filteredContent.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {filteredContent.filter((c) => c.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Drafts</div>
            <div className="text-2xl font-bold text-gray-600 mt-1">
              {filteredContent.filter((c) => !c.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Featured</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {filteredContent.filter((c) => c.featured).length}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <DataTable
            data={filteredContent}
            columns={columns}
            searchPlaceholder="Search content..."
            onRowClick={handleEdit}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ContentFormModal content={selectedContent} onClose={handleModalClose} />}
    </AdminLayout>
  );
}
