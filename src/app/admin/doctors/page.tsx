'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import DoctorFormModal from './DoctorFormModal';

// Force dynamic rendering to prevent SSR errors
export const dynamic = 'force-dynamic';

interface Doctor extends Record<string, unknown> {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  specialty_en: string;
  experience: number;
  hospital: {
    name_en: string;
  } | null;
  published: boolean;
  featured: boolean;
  updatedAt: string;
}

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/v1/doctors?includeUnpublished=true&includeHospital=true');
      const data = await response.json();
      setDoctors(data.data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (doctor: Doctor) => {
    if (!confirm(`Are you sure you want to delete "${doctor.name_en}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/doctors/${doctor.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDoctors();
      } else {
        alert('Failed to delete doctor');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Failed to delete doctor');
    }
  };

  const handleTogglePublished = async (doctor: Doctor) => {
    try {
      const response = await fetch(`/api/v1/doctors/${doctor.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !doctor.published,
        }),
      });

      if (response.ok) {
        fetchDoctors();
      }
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const handleToggleFeatured = async (doctor: Doctor) => {
    try {
      const response = await fetch(`/api/v1/doctors/${doctor.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !doctor.featured,
        }),
      });

      if (response.ok) {
        fetchDoctors();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedDoctor(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    fetchDoctors();
  };

  const columns = [
    {
      key: 'name_en',
      label: 'Name',
      render: (item: Doctor) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">Dr. {item.name_en}</div>
          <div className="text-sm text-gray-500 truncate" dir="rtl">
            د. {item.name_ar}
          </div>
        </div>
      ),
    },
    {
      key: 'specialty_en',
      label: 'Specialty',
      render: (item: Doctor) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
          {item.specialty_en}
        </span>
      ),
    },
    {
      key: 'experience',
      label: 'Experience',
      render: (item: Doctor) => (
        <span className="text-sm text-gray-700">{item.experience} years</span>
      ),
    },
    {
      key: 'hospital',
      label: 'Hospital',
      sortable: false,
      render: (item: Doctor) => (
        <span className="text-sm text-gray-700">{item.hospital?.name_en || 'N/A'}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
      render: (item: Doctor) => (
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
      render: (item: Doctor) => (
        <span className="text-sm text-gray-500">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (item: Doctor) => (
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
            <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
            <p className="text-sm text-gray-600 mt-1">Manage doctor profiles and specialties</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Doctor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Doctors</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{doctors.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Published</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {doctors.filter((d) => d.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Drafts</div>
            <div className="text-2xl font-bold text-gray-600 mt-1">
              {doctors.filter((d) => !d.published).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Featured</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {doctors.filter((d) => d.featured).length}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <DataTable
            data={doctors}
            columns={columns}
            searchPlaceholder="Search doctors..."
            onRowClick={handleEdit}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <DoctorFormModal doctor={selectedDoctor} onClose={handleModalClose} />}
    </AdminLayout>
  );
}
