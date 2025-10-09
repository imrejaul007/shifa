#!/bin/bash

# Fix all remaining 'any' types with proper types

# BookingDetailsModal
sed -i '' 's/booking: any/booking: Record<string, unknown>/' src/app/admin/bookings/BookingDetailsModal.tsx
sed -i '' 's/onUpdate: (data: any)/onUpdate: (data: Record<string, unknown>)/' src/app/admin/bookings/BookingDetailsModal.tsx

# ContentFormModal
sed -i '' 's/content: any/content: Record<string, unknown>/' src/app/admin/content/ContentFormModal.tsx

# DoctorFormModal
sed -i '' 's/doctor: any/doctor: Record<string, unknown>/' src/app/admin/doctors/DoctorFormModal.tsx
sed -i '' 's/hospitals: any\[\]/hospitals: Record<string, unknown>[]/' src/app/admin/doctors/DoctorFormModal.tsx

# HospitalFormModal
sed -i '' 's/hospital: any/hospital: Record<string, unknown>/' src/app/admin/hospitals/HospitalFormModal.tsx

# PackageFormModal
sed -i '' 's/pkg: any/pkg: Record<string, unknown>/' src/app/admin/packages/PackageFormModal.tsx

# DataTable
sed -i '' 's/data: any\[\]/data: Record<string, unknown>[]/' src/components/admin/DataTable.tsx

# BookingForm
sed -i '' 's/onSubmit: (data: any)/onSubmit: (data: Record<string, unknown>)/' src/components/public/BookingForm.tsx
sed -i '' 's/treatments: any\[\]/treatments: Record<string, unknown>[]/' src/components/public/BookingForm.tsx

# HospitalDetailClient
sed -i '' 's/images: any/images: string[] | null/' src/app/\[locale\]/hospitals/\[slug\]/HospitalDetailClient.tsx

# PackagesClient
sed -i '' 's/(package: any)/(package: Record<string, unknown>)/' src/app/\[locale\]/packages/PackagesClient.tsx

# PackageDetailClient
sed -i '' 's/package: any/package: Record<string, unknown>/' src/app/\[locale\]/packages/\[slug\]/PackageDetailClient.tsx
sed -i '' 's/(feature: any)/(feature: Record<string, unknown>)/' src/app/\[locale\]/packages/\[slug\]/PackageDetailClient.tsx

# TreatmentDetailClient
sed -i '' 's/(faq: any)/(faq: Record<string, unknown>)/' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx
sed -i '' 's/(hospital: any)/(hospital: Record<string, unknown>)/' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx

echo "✅ All 'any' types fixed!"
