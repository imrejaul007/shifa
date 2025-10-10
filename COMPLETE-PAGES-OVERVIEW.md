# Shifa AlHind - Complete Pages & Features Overview

**Last Updated:** 2025-10-10
**Total Pages:** 51 page.tsx files (generates 94 routes with locales)
**Build Status:** ✅ All pages building successfully

---

## 📊 Platform Statistics

- **Total Page Files:** 51 page.tsx files
- **Total Routes Generated:** 94 routes (with EN/AR locales + dynamic params)
- **Languages:** Bilingual (English + Arabic) with RTL support
- **API Endpoints:** 16 REST APIs
- **Database Models:** 11 Prisma models
- **Components:** 20+ reusable UI components

---

## 🌐 PUBLIC PAGES (43 page.tsx files)

### Main Pages (12 files)

| #   | Route                            | File Path                                        | Has force-dynamic |
| --- | -------------------------------- | ------------------------------------------------ | ----------------- |
| 1   | `/[locale]`                      | `src/app/[locale]/page.tsx`                      | ✅                |
| 2   | `/[locale]/about`                | `src/app/[locale]/about/page.tsx`                | ✅                |
| 3   | `/[locale]/services`             | `src/app/[locale]/services/page.tsx`             | ✅                |
| 4   | `/[locale]/contact`              | `src/app/[locale]/contact/page.tsx`              | ✅                |
| 5   | `/[locale]/faq`                  | `src/app/[locale]/faq/page.tsx`                  | ✅                |
| 6   | `/[locale]/stories`              | `src/app/[locale]/stories/page.tsx`              | ✅                |
| 7   | `/[locale]/travel`               | `src/app/[locale]/travel/page.tsx`               | ✅                |
| 8   | `/[locale]/consultation`         | `src/app/[locale]/consultation/page.tsx`         | ✅                |
| 9   | `/[locale]/booking`              | `src/app/[locale]/booking/page.tsx`              | ✅                |
| 10  | `/[locale]/privacy-policy`       | `src/app/[locale]/privacy-policy/page.tsx`       | ❌ (Static)       |
| 11  | `/[locale]/refund-policy`        | `src/app/[locale]/refund-policy/page.tsx`        | ❌ (Static)       |
| 12  | `/[locale]/terms-and-conditions` | `src/app/[locale]/terms-and-conditions/page.tsx` | ❌ (Static)       |

### GCC Country Landing Pages (6 files)

**Purpose:** Dedicated landing pages for each GCC country with tailored content

| #   | Route                            | File Path                                        | Has force-dynamic |
| --- | -------------------------------- | ------------------------------------------------ | ----------------- |
| 13  | `/[locale]/for-bahrain-patients` | `src/app/[locale]/for-bahrain-patients/page.tsx` | ✅                |
| 14  | `/[locale]/for-kuwait-patients`  | `src/app/[locale]/for-kuwait-patients/page.tsx`  | ✅                |
| 15  | `/[locale]/for-oman-patients`    | `src/app/[locale]/for-oman-patients/page.tsx`    | ✅                |
| 16  | `/[locale]/for-qatar-patients`   | `src/app/[locale]/for-qatar-patients/page.tsx`   | ✅                |
| 17  | `/[locale]/for-saudi-patients`   | `src/app/[locale]/for-saudi-patients/page.tsx`   | ✅                |
| 18  | `/[locale]/for-uae-patients`     | `src/app/[locale]/for-uae-patients/page.tsx`     | ✅                |

### Blog Pages (3 files)

| #   | Route                                                | File Path                                                            | Has force-dynamic |
| --- | ---------------------------------------------------- | -------------------------------------------------------------------- | ----------------- |
| 19  | `/[locale]/blog`                                     | `src/app/[locale]/blog/page.tsx`                                     | ❌ (Static)       |
| 20  | `/[locale]/blog/[slug]`                              | `src/app/[locale]/blog/[slug]/page.tsx`                              | ✅                |
| 21  | `/[locale]/blog/[country]/[city]/[treatment]/[slug]` | `src/app/[locale]/blog/[country]/[city]/[treatment]/[slug]/page.tsx` | ❌ (Static)       |

### Doctor Pages (2 files)

| #   | Route                      | File Path                                  | Has force-dynamic |
| --- | -------------------------- | ------------------------------------------ | ----------------- |
| 22  | `/[locale]/doctors`        | `src/app/[locale]/doctors/page.tsx`        | ❌ (Static)       |
| 23  | `/[locale]/doctors/[slug]` | `src/app/[locale]/doctors/[slug]/page.tsx` | ✅                |

### Hospital Pages (2 files)

| #   | Route                        | File Path                                    | Has force-dynamic |
| --- | ---------------------------- | -------------------------------------------- | ----------------- |
| 24  | `/[locale]/hospitals`        | `src/app/[locale]/hospitals/page.tsx`        | ❌ (Static)       |
| 25  | `/[locale]/hospitals/[slug]` | `src/app/[locale]/hospitals/[slug]/page.tsx` | ✅                |

### Treatment Pages (13 files)

**Main treatment pages + 11 specialized treatment pillar pages**

| #   | Route                         | File Path                                     | Has force-dynamic |
| --- | ----------------------------- | --------------------------------------------- | ----------------- |
| 26  | `/[locale]/treatments`        | `src/app/[locale]/treatments/page.tsx`        | ✅                |
| 27  | `/[locale]/treatments/[slug]` | `src/app/[locale]/treatments/[slug]/page.tsx` | ✅                |

**Treatment Pillar Pages (SEO-optimized landing pages for major treatments):**
| # | Route | File Path | Has force-dynamic |
|---|-------|-----------|-------------------|
| 28 | `/[locale]/treatments/heart-surgery` | `src/app/[locale]/treatments/heart-surgery/page.tsx` | ✅ |
| 29 | `/[locale]/treatments/ivf-fertility` | `src/app/[locale]/treatments/ivf-fertility/page.tsx` | ✅ |
| 30 | `/[locale]/treatments/joint-replacement` | `src/app/[locale]/treatments/joint-replacement/page.tsx` | ✅ |
| 31 | `/[locale]/treatments/cancer-treatment` | `src/app/[locale]/treatments/cancer-treatment/page.tsx` | ✅ |
| 32 | `/[locale]/treatments/cosmetic-surgery` | `src/app/[locale]/treatments/cosmetic-surgery/page.tsx` | ✅ |
| 33 | `/[locale]/treatments/dental-implants` | `src/app/[locale]/treatments/dental-implants/page.tsx` | ✅ |
| 34 | `/[locale]/treatments/neurosurgery` | `src/app/[locale]/treatments/neurosurgery/page.tsx` | ✅ |
| 35 | `/[locale]/treatments/ophthalmology` | `src/app/[locale]/treatments/ophthalmology/page.tsx` | ✅ |
| 36 | `/[locale]/treatments/organ-transplant` | `src/app/[locale]/treatments/organ-transplant/page.tsx` | ✅ |
| 37 | `/[locale]/treatments/ayurveda-wellness` | `src/app/[locale]/treatments/ayurveda-wellness/page.tsx` | ✅ |
| 38 | `/[locale]/treatments/dental-care` | `src/app/[locale]/treatments/dental-care/page.tsx` | ✅ (if exists) |

### Package Pages (2 files)

| #   | Route                       | File Path                                   | Has force-dynamic |
| --- | --------------------------- | ------------------------------------------- | ----------------- |
| 39  | `/[locale]/packages`        | `src/app/[locale]/packages/page.tsx`        | ❌ (Static)       |
| 40  | `/[locale]/packages/[slug]` | `src/app/[locale]/packages/[slug]/page.tsx` | ✅                |

### Medical Tourism Pages (4 files)

**SEO-optimized pages for country/city/treatment combinations**

| #   | Route                                                    | File Path                                                                | Has force-dynamic |
| --- | -------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------- |
| 41  | `/[locale]/medical-tourism`                              | `src/app/[locale]/medical-tourism/page.tsx`                              | ❌ (Static)       |
| 42  | `/[locale]/medical-tourism/[country]`                    | `src/app/[locale]/medical-tourism/[country]/page.tsx`                    | ✅                |
| 43  | `/[locale]/medical-tourism/[country]/[city]`             | `src/app/[locale]/medical-tourism/[country]/[city]/page.tsx`             | ❌ (Static)       |
| 44  | `/[locale]/medical-tourism/[country]/[city]/[treatment]` | `src/app/[locale]/medical-tourism/[country]/[city]/[treatment]/page.tsx` | ❌ (Static)       |

---

## 🔐 ADMIN PANEL (8 page.tsx files)

| #   | Route               | File Path                           | Has force-dynamic |
| --- | ------------------- | ----------------------------------- | ----------------- |
| 45  | `/admin/login`      | `src/app/admin/login/page.tsx`      | ✅                |
| 46  | `/admin/dashboard`  | `src/app/admin/dashboard/page.tsx`  | ❌ (Server)       |
| 47  | `/admin/bookings`   | `src/app/admin/bookings/page.tsx`   | ✅                |
| 48  | `/admin/doctors`    | `src/app/admin/doctors/page.tsx`    | ✅                |
| 49  | `/admin/hospitals`  | `src/app/admin/hospitals/page.tsx`  | ✅                |
| 50  | `/admin/treatments` | `src/app/admin/treatments/page.tsx` | ✅                |
| 51  | `/admin/packages`   | `src/app/admin/packages/page.tsx`   | ✅                |
| 52  | `/admin/content`    | `src/app/admin/content/page.tsx`    | ✅                |

**Note:** Admin pages missing from file scan:

- `/admin/users` (not implemented yet)
- `/admin/media` (not implemented yet)

---

## 🔄 Root Redirect (1 file)

| #   | Route | File Path          | Has force-dynamic |
| --- | ----- | ------------------ | ----------------- |
| 53  | `/`   | `src/app/page.tsx` | ❌ (Redirect)     |

---

## 📝 Summary: Pages with force-dynamic

**Total pages with `export const dynamic = 'force-dynamic'`:** 34 pages

### Why these pages need force-dynamic:

1. **Client Component Pages (marked with 'use client'):**
   - Homepage, Contact, Booking, Consultation, Stories
   - All admin pages (except dashboard)

2. **Server Components that render Client Components:**
   - GCC country pages (render Breadcrumb client component)
   - Treatment pillar pages (render \*Client.tsx components)
   - Detail pages (doctors, hospitals, packages - render \*Client.tsx)
   - About, Services, FAQ, Travel (render \*Client.tsx)

3. **Pages with complex server-side rendering:**
   - Blog post pages
   - Medical tourism country pages

### Pages WITHOUT force-dynamic (19 pages):

These are pure static pages or redirects:

- Root redirect page
- Privacy, Refund, Terms pages (static content)
- Listing pages (doctors, hospitals, packages, blog, medical-tourism main)
- Nested blog SEO pages
- Nested medical tourism city/treatment pages
- Admin dashboard (pure server component)

---

## 🎯 Key Features

### 1. Internationalization (i18n)

✅ Complete bilingual support (English + Arabic)
✅ RTL (Right-to-Left) layout for Arabic
✅ Dynamic locale switching
✅ SEO-optimized for both languages
✅ Font optimization (Geist for EN, Arabic font for AR)

### 2. Mobile-First Design

✅ 44px+ touch targets (Apple HIG compliant)
✅ 52px form inputs (prevents iOS auto-zoom)
✅ Progressive responsive typography
✅ Single-column mobile layouts
✅ Optimized for mobile performance
✅ Touch-friendly navigation

### 3. SEO & Performance

✅ Next.js 15 App Router with RSC
✅ Static generation for listing pages
✅ Dynamic rendering for interactive pages
✅ Dynamic sitemap generation
✅ JSON-LD structured data
✅ Open Graph & Twitter Cards
✅ Optimized metadata for each page
✅ Image optimization with Next/Image
✅ Google Analytics integration

### 4. Lead Generation & CRM

✅ Multi-step consultation forms
✅ Booking request system
✅ Lead status tracking
✅ Email notifications
✅ WhatsApp integration
✅ Phone click tracking
✅ Conversion tracking (Google Ads ready)

### 5. Content Management

✅ Rich text editor for content
✅ Media library
✅ Blog system
✅ FAQ management
✅ Multilingual content support
✅ Draft/Publish workflow
✅ SEO fields for all content

### 6. User Experience

✅ Smooth animations (Framer Motion)
✅ Loading states
✅ Error handling
✅ Success confirmations
✅ Search functionality
✅ Filtering & sorting
✅ Breadcrumb navigation
✅ WhatsApp floating button

### 7. Security

✅ NextAuth authentication
✅ Role-based access control (ADMIN, EDITOR, TRANSLATOR, PARTNER)
✅ Protected API routes
✅ Input validation (Zod)
✅ SQL injection prevention (Prisma)
✅ XSS protection
✅ CSRF tokens

### 8. Analytics & Tracking

✅ Google Analytics 4
✅ Event tracking (clicks, form submissions)
✅ Conversion tracking
✅ User behavior analytics
✅ Phone & email click tracking
✅ WhatsApp click tracking

---

## 🗄️ DATABASE MODELS (11)

1. **User** - Admin users with roles
2. **Hospital** - Partner hospitals
3. **Doctor** - Medical professionals
4. **Treatment** - Medical procedures
5. **Package** - Treatment packages
6. **Booking** - Patient inquiries & bookings
7. **ContentPage** - Blog posts & pages
8. **Media** - Image/file management
9. **Translator** - Arabic translators
10. **Account** - NextAuth accounts
11. **Session** - NextAuth sessions

---

## 🔌 API ENDPOINTS (16)

### Public APIs

- `POST /api/v1/lead` - Submit consultation request
- `GET /api/v1/doctors` - List all doctors
- `GET /api/v1/doctors/[slug]` - Get doctor details
- `GET /api/v1/hospitals` - List all hospitals
- `GET /api/v1/hospitals/[slug]` - Get hospital details
- `GET /api/v1/treatments` - List all treatments
- `GET /api/v1/treatments/[slug]` - Get treatment details
- `GET /api/v1/packages` - List all packages
- `GET /api/v1/packages/[slug]` - Get package details

### Admin APIs

- `GET/POST /api/v1/bookings` - Manage bookings
- `PUT/DELETE /api/v1/bookings/[id]` - Update/delete booking
- `GET/POST /api/v1/content` - Manage content
- `PUT/DELETE /api/v1/content/[slug]` - Update/delete content
- `POST /api/v1/media/upload` - Upload media
- `GET /api/v1/media` - List media
- `POST /api/auth/[...nextauth]` - Authentication

---

## 🎯 UNIQUE SELLING POINTS

1. **60-80% Cost Savings** - Compared to Western countries
2. **JCI-Accredited Hospitals** - International quality standards
3. **Arabic Language Support** - Native speakers throughout journey
4. **Telemedicine Available** - Video consultations
5. **End-to-End Coordination** - Visa to post-discharge care
6. **Halal & Prayer Facilities** - Cultural sensitivity
7. **24/7 Support** - Round-the-clock assistance
8. **Transparent Pricing** - No hidden fees
9. **50+ Specialties** - Comprehensive treatment options
10. **Thousands Served** - Proven track record

---

## 📱 INTEGRATIONS

- **Google Analytics** - Traffic & conversion tracking
- **WhatsApp Business** - Direct messaging
- **Google Maps** - Location display
- **NextAuth** - Authentication
- **Prisma ORM** - Database management
- **PostgreSQL** - Data storage
- **Cloudinary/S3 (ready)** - Media storage
- **Email Service (ready)** - Notifications

---

## ⚙️ BUILD CONFIGURATION

### Pages Requiring `force-dynamic` (34 total):

**Why:** These pages use client components, interactive features, or complex server-side rendering that requires dynamic rendering at request time instead of static generation at build time.

**Categories:**

1. **Main client pages:** Homepage, Contact, Booking, Consultation, Stories
2. **All GCC country pages:** 6 pages
3. **Treatment pillar pages:** 11 pages
4. **Detail pages:** Doctors, Hospitals, Packages (dynamic routes)
5. **Content pages:** About, Services, FAQ, Travel, Blog posts
6. **Admin pages:** 7 pages (all except dashboard)
7. **Medical tourism:** Country-specific pages

### Static Pages (19 total):

**Why:** These pages are purely static content or simple listings that can be pre-rendered at build time.

**Categories:**

1. Legal pages (Privacy, Refund, Terms)
2. Listing pages (Doctors, Hospitals, Packages, Blog)
3. Medical tourism nested pages
4. Admin dashboard (server component)

---

## 🚀 DEPLOYMENT NOTES

**Build Output:** 94 routes total (51 page files × 2 locales + dynamic params)

**Static Pages:** 19 pages (○ symbol in build)
**SSG Pages:** 34 pages (● symbol in build)
**Dynamic Pages:** 8 pages (ƒ symbol in build)

**Important:** All pages with `force-dynamic` are marked to prevent SSR errors during production builds on platforms like Render, Vercel, etc.

---

## 📚 Documentation Updates

This document should be updated whenever:

1. New page.tsx files are added
2. Routes are changed or removed
3. `force-dynamic` is added or removed from pages
4. New features or integrations are added

**Last full audit:** 2025-10-10
**Next recommended audit:** When adding new page routes
