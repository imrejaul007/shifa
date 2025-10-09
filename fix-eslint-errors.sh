#!/bin/bash

echo "🔧 Fixing ESLint errors automatically..."

# Fix unused imports (remove Star from DoctorsClient)
sed -i '' 's/import { Star, GraduationCap/import { GraduationCap/' src/app/\[locale\]/doctors/DoctorsClient.tsx

# Fix unused imports in booking page
sed -i '' 's/  Calendar,//' src/app/\[locale\]/booking/page.tsx
sed -i '' 's/  Clock,//' src/app/\[locale\]/booking/page.tsx
sed -i '' 's/  User,//' src/app/\[locale\]/booking/page.tsx
sed -i '' 's/  Mail,//' src/app/\[locale\]/booking/page.tsx
sed -i '' 's/  Phone,//' src/app/\[locale\]/booking/page.tsx
sed -i '' 's/  Loader2,//' src/app/\[locale\]/booking/page.tsx

# Fix unused imports in consultation page
sed -i '' 's/  Mail,//' src/app/\[locale\]/consultation/page.tsx
sed -i '' 's/  Phone,//' src/app/\[locale\]/consultation/page.tsx
sed -i '' 's/  MapPin,//' src/app/\[locale\]/consultation/page.tsx
sed -i '' 's/  MessageSquare,//' src/app/\[locale\]/consultation/page.tsx
sed -i '' 's/  Loader2,//' src/app/\[locale\]/consultation/page.tsx

# Fix unused imports in contact page
sed -i '' 's/CardHeader, CardTitle, CardDescription, CardBody, CardFooter, CardImage/CardTitle, CardDescription, CardBody/' src/app/\[locale\]/contact/page.tsx
sed -i '' 's/, ButtonLink//' src/app/\[locale\]/contact/page.tsx

# Fix unused imports in home page
sed -i '' 's/import { Button }//' src/app/\[locale\]/page.tsx
sed -i '' 's/CardHeader, CardBody, CardFooter,//' src/app/\[locale\]/page.tsx
sed -i '' 's/  Stethoscope,//' src/app/\[locale\]/page.tsx
sed -i '' 's/  Star,//' src/app/\[locale\]/page.tsx
sed -i '' 's/  CheckCircle2,//' src/app/\[locale\]/page.tsx
sed -i '' 's/  Building2,//' src/app/\[locale\]/page.tsx
sed -i '' 's/  User,//' src/app/\[locale\]/page.tsx

# Fix unused imports in services page
sed -i '' 's/  MapPin,//' src/app/\[locale\]/services/ServicesClient.tsx
sed -i '' 's/  Calendar,//' src/app/\[locale\]/services/ServicesClient.tsx

# Fix unused imports in stories page
sed -i '' 's/CardHeader, CardTitle, CardDescription, CardBody, CardFooter, CardImage/CardTitle, CardDescription, CardBody/' src/app/\[locale\]/stories/page.tsx

# Fix unused imports in treatment detail
sed -i '' 's/  Clock,//' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx
sed -i '' 's/  CheckCircle2,//' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx
sed -i '' 's/  Star,//' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx
sed -i '' 's/  Building2,//' src/app/\[locale\]/treatments/\[slug\]/TreatmentDetailClient.tsx

# Fix unused imports in treatment form
sed -i '' 's/  Eye,//' src/app/admin/treatments/page.tsx
sed -i '' 's/  EyeOff,//' src/app/admin/treatments/page.tsx

# Fix unused imports in country landing
sed -i '' 's/  DollarSign,//' src/app/\[locale\]/medical-tourism/\[country\]/CountryLandingClient.tsx
sed -i '' 's/  Clock,//' src/app/\[locale\]/medical-tourism/\[country\]/CountryLandingClient.tsx
sed -i '' 's/  Languages,//' src/app/\[locale\]/medical-tourism/\[country\]/CountryLandingClient.tsx
sed -i '' 's/  Star,//' src/app/\[locale\]/medical-tourism/\[country\]/CountryLandingClient.tsx

# Fix unused imports in hospitals client
sed -i '' 's/, Languages//' src/app/\[locale\]/hospitals/HospitalsClient.tsx

# Fix unused imports in image uploader
sed -i '' 's/  Upload,//' src/components/admin/ImageUploader.tsx

# Fix unused imports in not-found
sed -i '' 's/import { Home, Search, ArrowLeft, MapPin }/import { Home, Search, MapPin }/' src/app/\[locale\]/not-found.tsx

echo "✅ Basic fixes applied!"
echo "🔄 Now fixing more complex type issues..."

# Fix seed file unused variables
sed -i '' 's/const admin =/\/\/ const admin =/' prisma/seed.ts
sed -i '' 's/const blogPost1 =/\/\/ const blogPost1 =/' prisma/seed.ts
sed -i '' 's/const blogPost2 =/\/\/ const blogPost2 =/' prisma/seed.ts
sed -i '' 's/const blogPost3 =/\/\/ const blogPost3 =/' prisma/seed.ts
sed -i '' 's/const sampleBooking =/\/\/ const sampleBooking =/' prisma/seed.ts

echo "✅ All automatic fixes complete!"
echo "📝 Remaining manual fixes needed for 'any' types in:"
echo "   - Admin form modals"
echo "   - Treatment/Package detail pages"
echo "   - Schema.ts"
echo ""
echo "Run: npm run lint to see remaining issues"
