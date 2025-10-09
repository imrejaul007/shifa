#!/bin/bash

# Fix remaining any types in map callbacks

# PackagesClient.tsx - line 204
sed -i '' 's/{features\.slice(0, 4)\.map((feature: any, idx: number)/{features.slice(0, 4).map((feature: string | Record<string, unknown>, idx: number)/' src/app/\[locale\]/packages/PackagesClient.tsx

# PackageDetailClient.tsx - line 26 (features type)
sed -i '' 's/  features: any;/  features: Array<string | Record<string, unknown>>;/' src/app/\[locale\]/packages/\[slug\]/PackageDetailClient.tsx

# PackageDetailClient.tsx - line 185
sed -i '' 's/{features\.map((feature: any, index: number)/{features.map((feature: string | Record<string, unknown>, index: number)/' src/app/\[locale\]/packages/\[slug\]/PackageDetailClient.tsx

# TreatmentDetailClient.tsx - line 214
sed -i '' 's/(faq: any, index: number)/(faq: { question: string; answer: string }, index: number)/' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx

# TreatmentDetailClient.tsx - line 336
sed -i '' 's/(hospital: any, index: number)/(hospital: Record<string, unknown>, index: number)/' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx

# DoctorFormModal.tsx - line 39
sed -i '' 's/(hospital: any)/(hospital: Record<string, unknown>)/' src/app/admin/doctors/DoctorFormModal.tsx

# DataTable.tsx - line 21
sed -i '' 's/onRowClick\?: (row: any)/onRowClick?: (row: Record<string, unknown>)/' src/components/admin/DataTable.tsx

# BookingForm.tsx - line 148-149
sed -i '' 's/(treatment: any)/(treatment: Record<string, unknown>)/' src/components/public/BookingForm.tsx
sed -i '' 's/treatmentsList: any\[\]/treatmentsList: Record<string, unknown>[]/' src/components/public/BookingForm.tsx

echo "✅ All remaining 'any' types fixed!"
