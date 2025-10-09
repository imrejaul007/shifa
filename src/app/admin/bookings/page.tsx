'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { Eye, Trash2, CheckCircle, XCircle, Clock, Mail, Phone } from 'lucide-react';
import BookingDetailsModal from './BookingDetailsModal';

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  treatmentType: string;
  preferredDate: Date | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'confirmed' | 'cancelled'>('all');

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/v1/bookings');
      const data = await response.json();
      setBookings(data.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (booking: Booking) => {
    if (!confirm(`Are you sure you want to delete booking from ${booking.firstName} ${booking.lastName}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/bookings/${booking.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBookings();
      } else {
        alert('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  const handleUpdateStatus = async (booking: Booking, newStatus: string) => {
    try {
      const response = await fetch(`/api/v1/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    fetchBookings();
  };

  const filteredBookings =
    statusFilter === 'all'
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'contacted':
        return <Mail className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Patient Name',
      render: (item: Booking) => (
        <div>
          <div className="font-medium text-gray-900">
            {item.firstName} {item.lastName}
          </div>
          <div className="text-sm text-gray-500">{item.country}</div>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      sortable: false,
      render: (item: Booking) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href={`mailto:${item.email}`} className="hover:text-primary">
              {item.email}
            </a>
          </div>
          {item.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4 text-gray-400" />
              <a href={`tel:${item.phone}`} className="hover:text-primary">
                {item.phone}
              </a>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'treatmentType',
      label: 'Treatment',
      render: (item: Booking) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
          {item.treatmentType || 'General Inquiry'}
        </span>
      ),
    },
    {
      key: 'preferredDate',
      label: 'Preferred Date',
      render: (item: Booking) => (
        <span className="text-sm text-gray-700">
          {item.preferredDate
            ? new Date(item.preferredDate).toLocaleDateString()
            : 'Not specified'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Booking) => (
        <div className="relative">
          <select
            value={item.status}
            onChange={(e) => {
              e.stopPropagation();
              handleUpdateStatus(item, e.target.value);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer appearance-none pr-8 ${getStatusColor(
              item.status
            )}`}
          >
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            {getStatusIcon(item.status)}
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Received',
      render: (item: Booking) => (
        <div>
          <div className="text-sm text-gray-700">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (item: Booking) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView(item);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Inquiries</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage patient booking requests and inquiries
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'pending'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending ({bookings.filter((b) => b.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('contacted')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'contacted'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Contacted ({bookings.filter((b) => b.status === 'contacted').length})
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'confirmed'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Confirmed ({bookings.filter((b) => b.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'cancelled'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Inquiries</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {filteredBookings.length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {filteredBookings.filter((b) => b.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Confirmed</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {filteredBookings.filter((b) => b.status === 'confirmed').length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">This Week</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {
                filteredBookings.filter(
                  (b) =>
                    new Date(b.createdAt) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
              }
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <DataTable
            data={filteredBookings}
            columns={columns}
            searchPlaceholder="Search bookings..."
            onRowClick={handleView}
          />
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </AdminLayout>
  );
}
