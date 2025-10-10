'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import PackageFormModal from './PackageFormModal';

// Force dynamic rendering to prevent SSR errors
export const dynamic = 'force-dynamic';

interface Package extends Record<string, unknown> {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  price: number | null;
  duration: string;
  published: boolean;
  featured: boolean;
  updatedAt: string;
}

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/v1/packages?includeUnpublished=true');
      const data = await response.json();
      setPackages(data.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (pkg: Package) => {
    if (!confirm(`Are you sure you want to delete "${pkg.title_en}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/packages/${pkg.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPackages();
      } else {
        alert('Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package');
    }
  };

  const handleTogglePublished = async (pkg: Package) => {
    try {
      const response = await fetch(`/api/v1/packages/${pkg.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !pkg.published,
        }),
      });

      if (response.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const handleToggleFeatured = async (pkg: Package) => {
    try {
      const response = await fetch(`/api/v1/packages/${pkg.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !pkg.featured,
        }),
      });

      if (response.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPackage(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    fetchPackages();
  };

  const columns = [
    {
      key: 'title_en',
      label: 'Title',
      render: (item: Package) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{item.title_en}</div>
          <div className="text-sm text-gray-500 truncate" dir="rtl">
            {item.title_ar}
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (item: Package) => (
        <span className="text-sm text-gray-700">
          {item.price ? `$${item.price.toLocaleString()}` : 'N/A'}
        </span>
      ),
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (item: Package) => (
        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
          {item.duration || 'N/A'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
      render: (item: Package) => (
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFeatured(item);
            }}
            className={`p-1 rounded ${item.featured ? 'text-yellow-500' : 'text-gray-300'}`}
            title={item.featured ? 'Featured' : 'Not featured'}
          >
            <Star className="w-4 h-4" fill={item.featured ? 'currentColor' : 'none'} />
          </button>
        </div>
      ),
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      render: (item: Package) => (
        <span className="text-sm text-gray-500">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (item: Package) => (
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
            <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
            <p className="text-sm text-gray-600 mt-1">Manage medical tourism packages</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Package
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Packages</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{packages.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {packages.filter((p) => p.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Drafts</div>
            <div className="text-2xl font-bold text-gray-600 mt-1">
              {packages.filter((p) => !p.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Featured</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {packages.filter((p) => p.featured).length}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <DataTable
            data={packages}
            columns={columns}
            searchPlaceholder="Search packages..."
            onRowClick={handleEdit}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <PackageFormModal pkg={selectedPackage} onClose={handleModalClose} />}
    </AdminLayout>
  );
}
