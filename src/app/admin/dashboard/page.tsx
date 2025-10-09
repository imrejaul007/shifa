import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shifa AlHind Admin</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome back, {session.user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 text-xs font-medium bg-sky-100 text-sky-800 rounded-full">
                {session.user.role}
              </span>
              <Link
                href="/api/auth/signout"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-sky-100 rounded-lg p-3">
                <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hospitals</p>
                <p className="text-2xl font-semibold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Treatments</p>
                <p className="text-2xl font-semibold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/admin/hospitals"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 mb-1">
                  Manage Hospitals
                </h3>
                <p className="text-sm text-gray-600">
                  Add and edit hospital listings
                </p>
              </Link>

              <Link
                href="/admin/doctors"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 mb-1">
                  Manage Doctors
                </h3>
                <p className="text-sm text-gray-600">
                  Add and edit doctor profiles
                </p>
              </Link>

              <Link
                href="/admin/treatments"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 mb-1">
                  Manage Treatments
                </h3>
                <p className="text-sm text-gray-600">
                  Add and edit treatment pages
                </p>
              </Link>

              <Link
                href="/admin/bookings"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 mb-1">
                  View Bookings
                </h3>
                <p className="text-sm text-gray-600">
                  Manage patient bookings and leads
                </p>
              </Link>

              <Link
                href="/admin/content"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 mb-1">
                  Content Pages
                </h3>
                <p className="text-sm text-gray-600">
                  Create and edit blog posts
                </p>
              </Link>

              <Link
                href="/admin/media"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 mb-1">
                  Media Library
                </h3>
                <p className="text-sm text-gray-600">
                  Upload and manage images
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 bg-sky-50 border border-sky-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-900 mb-3">🚀 Getting Started</h3>
          <div className="space-y-2 text-sm text-sky-800">
            <p>✅ Database seeded with sample data (1 hospital, 1 doctor, 1 treatment, 3 blog posts)</p>
            <p>✅ NextAuth configured with role-based access</p>
            <p>✅ i18n setup with English and Arabic support</p>
            <p>📝 Next steps: Set up database connection, configure S3 for media, add Algolia search</p>
          </div>
        </div>
      </main>
    </div>
  );
}
