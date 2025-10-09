'use client';

import { X, User, Mail, Phone, MapPin, Calendar, FileText, CheckCircle } from 'lucide-react';

interface BookingDetailsModalProps {
  booking: any;
  onClose: () => void;
  onUpdateStatus: (booking: any, status: string) => void;
}

export default function BookingDetailsModal({
  booking,
  onClose,
  onUpdateStatus,
}: BookingDetailsModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-600 mt-1">
              Inquiry ID: {booking.id.slice(0, 8)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center gap-3">
              <select
                value={booking.status}
                onChange={(e) => onUpdateStatus(booking, e.target.value)}
                className={`px-4 py-2 rounded-lg border font-medium ${getStatusColor(
                  booking.status
                )}`}
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <span className="text-sm text-gray-500">
                Received on {new Date(booking.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Full Name</div>
                <div className="font-medium text-gray-900">
                  {booking.firstName} {booking.lastName}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Country</div>
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {booking.country}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <a
                  href={`mailto:${booking.email}`}
                  className="font-medium text-primary hover:underline flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {booking.email}
                </a>
              </div>
              {booking.phone && (
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <a
                    href={`tel:${booking.phone}`}
                    className="font-medium text-primary hover:underline flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {booking.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Treatment Information */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Treatment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Treatment Type</div>
                <div className="font-medium text-gray-900">
                  {booking.treatmentType || 'General Inquiry'}
                </div>
              </div>
              {booking.preferredDate && (
                <div>
                  <div className="text-sm text-gray-600">Preferred Date</div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(booking.preferredDate).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Notes */}
          {booking.notes && (
            <div className="bg-yellow-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-600" />
                Additional Notes
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">{booking.notes}</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${booking.email}?subject=Re: Medical Tourism Inquiry&body=Dear ${booking.firstName} ${booking.lastName},%0D%0A%0D%0AThank you for your inquiry about ${booking.treatmentType}.%0D%0A%0D%0A`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
              {booking.phone && (
                <a
                  href={`tel:${booking.phone}`}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Patient
                </a>
              )}
              {booking.phone && (
                <a
                  href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
