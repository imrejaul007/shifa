'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import HospitalFormModal from './HospitalFormModal';

interface Hospital {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  city: string;
  country: string;
  accreditations: string[];
  _count: {
    doctors: number;
    treatments: number;
  };
  published: boolean;
  featured: boolean;
  updatedAt: string;
}

export default function HospitalsAdminPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const fetchHospitals = async () => {
    try {
      const response = await fetch('/api/v1/hospitals?includeUnpublished=true&includeCounts=true');
      const data = await response.json();
      setHospitals(data.data || []);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleDelete = async (hospital: Hospital) => {
    if (!confirm(`Are you sure you want to delete "${hospital.name_en}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/hospitals/${hospital.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchHospitals();
      } else {
        alert('Failed to delete hospital');
      }
    } catch (error) {
      console.error('Error deleting hospital:', error);
      alert('Failed to delete hospital');
    }
  };

  const handleTogglePublished = async (hospital: Hospital) => {
    try {
      const response = await fetch(`/api/v1/hospitals/${hospital.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !hospital.published,
        }),
      });

      if (response.ok) {
        fetchHospitals();
      }
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const handleToggleFeatured = async (hospital: Hospital) => {
    try {
      const response = await fetch(`/api/v1/hospitals/${hospital.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !hospital.featured,
        }),
      });

      if (response.ok) {
        fetchHospitals();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleEdit = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedHospital(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedHospital(null);
    fetchHospitals();
  };

  const columns = [
    {
      key: 'name_en',
      label: 'Name',
      render: (item: Hospital) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{item.name_en}</div>
          <div className="text-sm text-gray-500 truncate" dir="rtl">
            {item.name_ar}
          </div>
        </div>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      sortable: false,
      render: (item: Hospital) => (
        <div className="text-sm text-gray-700">
          {item.city}, {item.country}
        </div>
      ),
    },
    {
      key: 'accreditations',
      label: 'Accreditations',
      sortable: false,
      render: (item: Hospital) => (
        <div className="flex flex-wrap gap-1">
          {item.accreditations && item.accreditations.length > 0 ? (
            item.accreditations.slice(0, 2).map((acc, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
              >
                {acc}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">None</span>
          )}
          {item.accreditations && item.accreditations.length > 2 && (
            <span className="text-xs text-gray-500">
              +{item.accreditations.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'stats',
      label: 'Doctors/Treatments',
      sortable: false,
      render: (item: Hospital) => (
        <div className="text-sm text-gray-700">
          {item._count?.doctors || 0} / {item._count?.treatments || 0}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
      render: (item: Hospital) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePublished(item);
            }}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.published
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {item.published ? 'Published' : 'Draft'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFeatured(item);
            }}
            className={`p-1 rounded ${
              item.featured ? 'text-yellow-500' : 'text-gray-300'
            }`}
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
      render: (item: Hospital) => (
        <span className="text-sm text-gray-500">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (item: Hospital) => (
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
            <h1 className="text-2xl font-bold text-gray-900">Hospitals</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage hospital listings and partnerships
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Hospital
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Hospitals</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {hospitals.length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {hospitals.filter((h) => h.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Drafts</div>
            <div className="text-2xl font-bold text-gray-600 mt-1">
              {hospitals.filter((h) => !h.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Featured</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {hospitals.filter((h) => h.featured).length}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <DataTable
            data={hospitals}
            columns={columns}
            searchPlaceholder="Search hospitals..."
            onRowClick={handleEdit}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <HospitalFormModal hospital={selectedHospital} onClose={handleModalClose} />
      )}
    </AdminLayout>
  );
}
