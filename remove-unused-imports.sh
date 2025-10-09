#!/bin/bash

echo "🔧 Removing unused imports..."

# Function to remove unused import from a line
remove_from_import() {
  local file="$1"
  local unused="$2"

  # Remove from multi-line import
  sed -i '' "s/  ${unused},$//" "$file"
  sed -i '' "s/, ${unused},/,/" "$file"
  sed -i '' "s/{ ${unused}, /{ /" "$file"
  sed -i '' "s/, ${unused} }/}/" "$file"
  sed -i '' "s/{ ${unused} }//" "$file"
}

# Fix booking page
remove_from_import "src/app/[locale]/booking/page.tsx" "Calendar"
remove_from_import "src/app/[locale]/booking/page.tsx" "Clock"
remove_from_import "src/app/[locale]/booking/page.tsx" "User"
remove_from_import "src/app/[locale]/booking/page.tsx" "Mail"
remove_from_import "src/app/[locale]/booking/page.tsx" "Phone"
remove_from_import "src/app/[locale]/booking/page.tsx" "Loader2"

# Fix consultation page
remove_from_import "src/app/[locale]/consultation/page.tsx" "Mail"
remove_from_import "src/app/[locale]/consultation/page.tsx" "Phone"
remove_from_import "src/app/[locale]/consultation/page.tsx" "MapPin"
remove_from_import "src/app/[locale]/consultation/page.tsx" "MessageSquare"
remove_from_import "src/app/[locale]/consultation/page.tsx" "Loader2"

# Fix contact page - remove CardHeader, CardFooter, CardImage, ButtonLink
sed -i '' 's/, CardHeader//g' "src/app/[locale]/contact/page.tsx"
sed -i '' 's/, CardFooter//g' "src/app/[locale]/contact/page.tsx"
sed -i '' 's/, CardImage//g' "src/app/[locale]/contact/page.tsx"
sed -i '' 's/CardHeader, //g' "src/app/[locale]/contact/page.tsx"
sed -i '' 's/, ButtonLink//g' "src/app/[locale]/contact/page.tsx"

# Fix doctors client
sed -i '' 's/import { Star, GraduationCap/import { GraduationCap/' "src/app/[locale]/doctors/DoctorsClient.tsx"

# Fix hospitals client
sed -i '' 's/, Languages//' "src/app/[locale]/hospitals/HospitalsClient.tsx"

# Fix home page
sed -i '' '/^import { Button } from/d' "src/app/[locale]/page.tsx"
sed -i '' 's/CardHeader, //g' "src/app/[locale]/page.tsx"
sed -i '' 's/, CardFooter//g' "src/app/[locale]/page.tsx"
sed -i '' 's/CardBody, //g' "src/app/[locale]/page.tsx"
remove_from_import "src/app/[locale]/page.tsx" "Stethoscope"
remove_from_import "src/app/[locale]/page.tsx" "Star"
remove_from_import "src/app/[locale]/page.tsx" "CheckCircle2"
remove_from_import "src/app/[locale]/page.tsx" "Building2"
remove_from_import "src/app/[locale]/page.tsx" "User"

# Fix services client
remove_from_import "src/app/[locale]/services/ServicesClient.tsx" "MapPin"
remove_from_import "src/app/[locale]/services/ServicesClient.tsx" "Calendar"

# Fix stories page
sed -i '' 's/CardHeader, //g' "src/app/[locale]/stories/page.tsx"
sed -i '' 's/, CardFooter//g' "src/app/[locale]/stories/page.tsx"
sed -i '' 's/, CardImage//g' "src/app/[locale]/stories/page.tsx"

# Fix treatment detail
remove_from_import "src/app/[locale]/treatments/[slug]/TreatmentDetailClient.tsx" "Clock"
remove_from_import "src/app/[locale]/treatments/[slug]/TreatmentDetailClient.tsx" "CheckCircle2"
remove_from_import "src/app/[locale]/treatments/[slug]/TreatmentDetailClient.tsx" "Star"
remove_from_import "src/app/[locale]/treatments/[slug]/TreatmentDetailClient.tsx" "Building2"

# Fix treatment admin page
remove_from_import "src/app/admin/treatments/page.tsx" "Eye"
remove_from_import "src/app/admin/treatments/page.tsx" "EyeOff"

# Fix treatment form modal - comment out unused vars
sed -i '' 's/const hospitals =/\/\/ const hospitals =/' "src/app/admin/treatments/TreatmentFormModal.tsx"
sed -i '' 's/setSelectedHospitals/\/\/ setSelectedHospitals/' "src/app/admin/treatments/TreatmentFormModal.tsx"

# Fix country landing
remove_from_import "src/app/[locale]/medical-tourism/[country]/CountryLandingClient.tsx" "DollarSign"
remove_from_import "src/app/[locale]/medical-tourism/[country]/CountryLandingClient.tsx" "Clock"
remove_from_import "src/app/[locale]/medical-tourism/[country]/CountryLandingClient.tsx" "Languages"
remove_from_import "src/app/[locale]/medical-tourism/[country]/CountryLandingClient.tsx" "Star"

# Fix image uploader
remove_from_import "src/components/admin/ImageUploader.tsx" "Upload"

# Fix rich text editor
sed -i '' 's/const { placeholder }/\/\/ const { placeholder }/' "src/components/admin/RichTextEditor.tsx"

# Fix seed file
sed -i '' 's/^  const admin =/  \/\/ const admin =/' "prisma/seed.ts"
sed -i '' 's/^  const blogPost1 =/  \/\/ const blogPost1 =/' "prisma/seed.ts"
sed -i '' 's/^  const blogPost2 =/  \/\/ const blogPost2 =/' "prisma/seed.ts"
sed -i '' 's/^  const blogPost3 =/  \/\/ const blogPost3 =/' "prisma/seed.ts"
sed -i '' 's/^  const sampleBooking =/  \/\/ const sampleBooking =/' "prisma/seed.ts"

echo "✅ Unused imports removed!"
