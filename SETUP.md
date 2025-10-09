# Shifa AlHind - Complete Setup Guide

**Premium Medical Tourism Platform | GCC to India**

This guide will help you set up, develop, and deploy the Shifa AlHind medical tourism platform.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Development](#development)
6. [Admin Access](#admin-access)
7. [Deployment](#deployment)
8. [API Documentation](#api-documentation)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** (recommended: 20.x LTS)
- **npm** or **pnpm** package manager
- **PostgreSQL database** (local or cloud)
- **Git** for version control
- A code editor (VS Code recommended)

---

## Initial Setup

### 1. Clone and Install

```bash
cd shifa-alhind
npm install
# or
pnpm install
```

### 2. Install Dependencies

The project uses the following key dependencies:

- **Next.js 15** - React framework
- **Prisma** - Database ORM
- **NextAuth.js** - Authentication
- **Tailwind CSS 4** - Styling
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **next-intl** - Internationalization (English/Arabic)

All dependencies are already defined in `package.json`.

---

## Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### Required Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/shifa_alhind?schema=public"

# NextAuth.js Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-generate-with-openssl"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Shifa AlHind"

# Email (Optional - for contact forms)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@shifaalhind.com"

# Media Upload (Optional - defaults to local filesystem)
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE="5242880"  # 5MB in bytes

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Social Media (Optional)
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/shifaalhind"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/shifaalhind"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/shifaalhind"
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## Database Setup

### Option 1: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Create Database**:

```bash
psql -U postgres
CREATE DATABASE shifa_alhind;
\q
```

3. **Update DATABASE_URL** in `.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/shifa_alhind?schema=public"
```

### Option 2: Cloud PostgreSQL (Recommended for Production)

Choose one of these providers:

**Supabase** (Free tier available):

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings > Database
4. Update `.env` with the connection string

**Railway** (Free tier available):

1. Go to [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Copy connection string
4. Update `.env`

**Neon** (Free tier available):

1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update `.env`

### Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Seed database with sample data
npm run db:seed
```

### Verify Database Setup

```bash
# Open Prisma Studio to view data
npx prisma studio
```

This will open `http://localhost:5555` where you can view and edit database records.

---

## Development

### Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
npm run db:migrate   # Create and apply migrations (for production)

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

### Project Structure

```
shifa-alhind/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── treatments/    # Treatment pages
│   │   │   ├── doctors/       # Doctor pages
│   │   │   ├── hospitals/     # Hospital pages
│   │   │   ├── packages/      # Package pages
│   │   │   ├── blog/          # Blog pages
│   │   │   └── medical-tourism/ # GCC country pages
│   │   ├── api/               # API routes
│   │   │   └── v1/            # API version 1
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── robots.ts          # Robots.txt
│   ├── components/
│   │   ├── admin/             # Admin dashboard components
│   │   ├── public/            # Public website components
│   │   └── ui/                # Shared UI components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # NextAuth config
│   │   ├── metadata.ts        # SEO metadata helpers
│   │   └── seo-data.ts        # SEO content data
│   └── styles/
│       └── globals.css        # Global styles
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── public/
│   └── uploads/               # Media uploads
└── messages/                   # i18n translation files
    ├── en.json                # English translations
    └── ar.json                # Arabic translations
```

---

## Admin Access

### Default Admin Credentials

After running `npm run db:seed`, you can log in with:

**Admin User:**

- Email: `admin@shifaalhind.com`
- Password: `admin123`

**Editor User:**

- Email: `editor@shifaalhind.com`
- Password: `editor123`

**Translator User:**

- Email: `translator@shifaalhind.com`
- Password: `translator123`

### Accessing Admin Dashboard

1. Visit `http://localhost:3000/en/admin/login` or `http://localhost:3000/ar/admin/login`
2. Enter credentials
3. You'll be redirected to the admin dashboard

### User Roles

- **ADMIN**: Full access to all features, user management
- **EDITOR**: Can create/edit content (treatments, doctors, hospitals, packages, blog)
- **TRANSLATOR**: Can edit Arabic translations only

### Creating New Admin Users

Use Prisma Studio or create via API:

```bash
npx prisma studio
```

Navigate to User table and create a new user with:

- Email
- Hashed password (use bcrypt)
- Role: ADMIN, EDITOR, or TRANSLATOR

---

## Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Login to Vercel**:

```bash
vercel login
```

3. **Deploy**:

```bash
vercel --prod
```

4. **Configure Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add all environment variables from `.env`
   - Important: Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain

5. **Connect Database**:
   - Use Supabase, Railway, or Neon for PostgreSQL
   - Add DATABASE_URL to Vercel environment variables

6. **Run Database Migrations**:

```bash
# After deploying, run this locally with production DATABASE_URL
DATABASE_URL="your-production-db-url" npx prisma db push
DATABASE_URL="your-production-db-url" npm run db:seed
```

### Deploy to Other Platforms

**Netlify:**

- Build command: `npm run build`
- Publish directory: `.next`
- Add environment variables in Netlify dashboard

**AWS/DigitalOcean:**

- Use Docker container
- Set up PostgreSQL instance
- Configure environment variables
- Run `npm run build && npm run start`

### Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Database seeded with initial data (`npm run db:seed`)
- [ ] Admin user can log in
- [ ] All pages load correctly (check sitemap.xml)
- [ ] Forms submit successfully
- [ ] Images upload correctly
- [ ] SEO metadata appears correctly
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Arabic RTL layout works correctly
- [ ] Mobile responsive design verified

---

## API Documentation

### Authentication

All admin API routes require authentication. Include session cookie or use NextAuth.js session.

### Public Endpoints

#### Submit Lead/Inquiry

```http
POST /api/v1/lead
Content-Type: application/json

{
  "patientName": "John Doe",
  "email": "john@example.com",
  "phone": "+971501234567",
  "countryOfOrigin": "United Arab Emirates",
  "treatmentId": "ivf-treatment",
  "packageId": "fertility-package",
  "preferredDate": "2025-11-15",
  "message": "Looking for IVF treatment options",
  "languagePreference": "en",
  "needsTranslator": false
}
```

Response:

```json
{
  "success": true,
  "message": "Your inquiry has been received. We'll contact you shortly.",
  "bookingId": "clx..."
}
```

#### Get Treatments

```http
GET /api/v1/treatments?locale=en&published=true&limit=10&offset=0
```

Response:

```json
{
  "data": [
    {
      "slug": "ivf-treatment",
      "title_en": "IVF Treatment",
      "title_ar": "علاج التلقيح الصناعي",
      "summary_en": "In Vitro Fertilization...",
      "costMin": 2500,
      "costMax": 4000
    }
  ],
  "total": 50,
  "limit": 10,
  "offset": 0
}
```

#### Get Doctors

```http
GET /api/v1/doctors?locale=en&published=true
```

#### Get Hospitals

```http
GET /api/v1/hospitals?locale=en&published=true
```

#### Get Packages

```http
GET /api/v1/packages?locale=en&published=true
```

#### Get Blog Posts

```http
GET /api/v1/content?type=blog&locale=en&published=true
```

### Admin Endpoints (Authentication Required)

All admin endpoints require authentication via NextAuth.js session.

#### Create Treatment

```http
POST /api/v1/treatments
Authorization: Session Cookie
Content-Type: application/json

{
  "slug": "cardiac-surgery",
  "title_en": "Cardiac Surgery",
  "title_ar": "جراحة القلب",
  "summary_en": "Advanced cardiac procedures...",
  "summary_ar": "إجراءات القلب المتقدمة...",
  "costMin": 5000,
  "costMax": 15000,
  "published": true
}
```

#### Update Treatment

```http
PATCH /api/v1/treatments/[slug]
Authorization: Session Cookie
Content-Type: application/json

{
  "title_en": "Updated Title",
  "costMin": 6000
}
```

#### Delete Treatment (Soft Delete)

```http
DELETE /api/v1/treatments/[slug]
Authorization: Session Cookie
```

Similar CRUD patterns exist for:

- `/api/v1/doctors`
- `/api/v1/hospitals`
- `/api/v1/packages`
- `/api/v1/content`
- `/api/v1/bookings`

#### Media Upload

```http
POST /api/v1/media/upload
Authorization: Session Cookie
Content-Type: multipart/form-data

FormData:
  - file: [image file]
  - alt: "Image description"
  - tags: ["hospital", "facility"]
```

Response:

```json
{
  "success": true,
  "url": "/uploads/2025/10/hospital-image-1234.jpg",
  "media": {
    "id": "clx...",
    "url": "/uploads/2025/10/hospital-image-1234.jpg",
    "alt": "Image description",
    "mimeType": "image/jpeg",
    "size": 245678
  }
}
```

### Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:

- `next-rate-limit` package
- Cloudflare rate limiting
- API Gateway rate limiting

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `Can't reach database server`

**Solution**:

- Verify DATABASE_URL in `.env`
- Check database is running: `pg_isready` (PostgreSQL)
- Check firewall/network settings
- For cloud databases, verify IP allowlist

#### 2. Prisma Client Not Found

**Error**: `Cannot find module '@prisma/client'`

**Solution**:

```bash
npx prisma generate
```

#### 3. Build Errors

**Error**: Type errors during build

**Solution**:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

#### 4. Arabic Text Not Displaying Correctly

**Issue**: Arabic text appears as boxes or question marks

**Solution**:

- Ensure Arabic fonts are loaded in `src/app/layout.tsx`
- Check `dir="rtl"` is set for Arabic pages
- Verify `lang="ar"` in HTML tag

#### 5. Images Not Uploading

**Issue**: Image upload fails

**Solution**:

- Check `UPLOAD_DIR` exists and is writable
- Verify `MAX_FILE_SIZE` in `.env`
- Check file permissions: `chmod 755 public/uploads`
- For production, consider using S3/Cloudflare R2

#### 6. Authentication Not Working

**Issue**: Can't log in to admin

**Solution**:

- Verify `NEXTAUTH_SECRET` is set in `.env`
- Check `NEXTAUTH_URL` matches your domain
- Clear cookies and try again
- Verify user exists in database with correct password hash

#### 7. Sitemap Not Generating

**Issue**: `/sitemap.xml` returns 404

**Solution**:

- Ensure database has published content
- Check `src/app/sitemap.ts` exports correctly
- Rebuild: `npm run build`

#### 8. Dynamic Routes 404

**Issue**: Treatment/doctor/hospital pages return 404

**Solution**:

- Run `npm run build` to generate static params
- Verify content exists in database with `published: true`
- Check slug matches URL exactly

### Development Tips

1. **Use Prisma Studio** for database inspection:

   ```bash
   npx prisma studio
   ```

2. **Check Logs** in development:
   - Console logs appear in terminal
   - Client-side logs in browser console

3. **Type Safety**:

   ```bash
   npm run type-check
   ```

4. **Database Schema Changes**:

   ```bash
   # After editing schema.prisma
   npx prisma db push
   npx prisma generate
   ```

5. **Reset Database** (WARNING: Deletes all data):
   ```bash
   npx prisma db push --force-reset
   npm run db:seed
   ```

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - Serve WebP format
   - Use Sharp for server-side processing

2. **Caching**:
   - Enable Next.js static generation
   - Use ISR (Incremental Static Regeneration) for dynamic content
   - Configure CDN caching headers

3. **Bundle Size**:

   ```bash
   # Analyze bundle
   npm run build
   # Check .next/analyze/
   ```

4. **Database Query Optimization**:
   - Use Prisma's `select` to fetch only needed fields
   - Add database indexes for frequently queried fields
   - Use pagination for large datasets

---

## Production Checklist

Before going live:

### Security

- [ ] Change all default passwords
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Enable security headers
- [ ] Sanitize user inputs
- [ ] Add CAPTCHA to forms

### Performance

- [ ] Enable static generation where possible
- [ ] Configure CDN (Cloudflare/Vercel)
- [ ] Optimize images
- [ ] Enable compression
- [ ] Minimize bundle size
- [ ] Add monitoring (Sentry/LogRocket)

### SEO

- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt
- [ ] Add Google Analytics
- [ ] Configure social media meta tags
- [ ] Test structured data with Google Rich Results

### Content

- [ ] Add real hospital data
- [ ] Add real doctor profiles
- [ ] Add real treatment information
- [ ] Create blog content
- [ ] Add FAQs
- [ ] Review all translations

### Legal

- [ ] Add Privacy Policy
- [ ] Add Terms of Service
- [ ] Add Cookie Policy
- [ ] Add medical disclaimer
- [ ] GDPR compliance (for EU visitors)
- [ ] Add contact information

### Testing

- [ ] Test all forms
- [ ] Test booking flow
- [ ] Test admin dashboard
- [ ] Test on mobile devices
- [ ] Test in different browsers
- [ ] Test Arabic/English switching
- [ ] Test all dynamic routes
- [ ] Load testing

---

## Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)

### Project-Specific Files

- `PROJECT-STATUS.md` - Current implementation status
- `prisma/schema.prisma` - Database schema documentation
- `src/lib/seo-data.ts` - SEO content and keywords

### Getting Help

- Check existing issues in project repository
- Review error logs in Vercel/deployment platform
- Use Prisma Studio to inspect database
- Check Next.js build output for warnings

---

## License

Copyright © 2025 Shifa AlHind. All rights reserved.

---

**Last Updated**: October 2025
**Version**: 1.0.0
**Next.js Version**: 15.x
**Node.js Version**: 20.x LTS
