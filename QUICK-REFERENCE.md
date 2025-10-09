# Quick Reference Guide

**Shifa AlHind - Common Tasks & Commands**

---

## 🏃 Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Database
npm run db:generate    # Generate Prisma client after schema changes
npm run db:push        # Push schema to database (development)
npm run db:seed        # Seed sample data
npm run db:studio      # Open Prisma Studio (database GUI)

# Code quality
npm run lint           # Check for linting errors
npm run lint:fix       # Auto-fix linting errors
npm run format         # Format code with Prettier
npm run type-check     # Check TypeScript types

# Testing
npm run test           # Run Playwright tests
npm run test:ui        # Run tests with UI
```

---

## 🔗 Important URLs

| URL                                   | Description                               |
| ------------------------------------- | ----------------------------------------- |
| http://localhost:3000/en              | English homepage                          |
| http://localhost:3000/ar              | Arabic homepage                           |
| http://localhost:3000/admin/login     | Admin login                               |
| http://localhost:3000/admin/dashboard | Admin dashboard                           |
| http://localhost:5555                 | Prisma Studio (after `npm run db:studio`) |

---

## 🔐 Demo Login Credentials

Use these at `/admin/login`:

| Role       | Email                      | Password      |
| ---------- | -------------------------- | ------------- |
| Admin      | admin@shifaalhind.com      | admin123      |
| Editor     | editor@shifaalhind.com     | editor123     |
| Translator | translator@shifaalhind.com | translator123 |

---

## 📁 Project Structure Quick Reference

```
src/
├── app/
│   ├── [locale]/              # Public pages (EN/AR)
│   │   ├── page.tsx           # Homepage
│   │   ├── treatments/        # Treatment pages (future)
│   │   ├── hospitals/         # Hospital pages (future)
│   │   └── doctors/           # Doctor pages (future)
│   ├── admin/                 # Admin area
│   │   ├── login/             # Login page
│   │   ├── dashboard/         # Dashboard
│   │   ├── hospitals/         # Hospital CRUD (future)
│   │   ├── doctors/           # Doctor CRUD (future)
│   │   └── treatments/        # Treatment CRUD (future)
│   └── api/                   # API routes
│       ├── auth/              # NextAuth endpoints
│       └── v1/                # Public API (future)
├── components/
│   ├── public/                # Public-facing components
│   ├── admin/                 # Admin components
│   └── ui/                    # Shared UI components
├── lib/
│   ├── auth.ts                # NextAuth config
│   ├── prisma.ts              # Prisma client singleton
│   └── utils.ts               # Utility functions
└── types/                     # TypeScript types
```

---

## 🗄️ Database Schema Overview

### Main Models

**User**

- Stores admin users
- Fields: email, role, passwordHash, locale
- Roles: ADMIN, EDITOR, TRANSLATOR, PARTNER

**Hospital**

- Bilingual hospital listings
- Fields: name_en, name_ar, description_en, description_ar, images, accreditations
- SEO fields included

**Doctor**

- Bilingual doctor profiles
- Fields: name, bio, specialties, languages, consultationFee
- Belongs to Hospital

**Treatment**

- Bilingual treatment pages
- Fields: title, summary, contentBlocks, costMin, costMax, faq
- Can link to multiple hospitals

**Booking**

- Patient leads and bookings
- Fields: patientName, email, phone, status, assignedTranslator
- Status: LEAD → CONFIRMED → IN_TREATMENT → DISCHARGED

---

## 🎨 Styling Reference

### Tailwind Classes for RTL

```tsx
// Use logical properties that auto-flip for RTL
<div className="ltr:ml-4 rtl:mr-4">  // Margin
<div className="ltr:text-left rtl:text-right">  // Text align
<div className="ltr:rounded-l rtl:rounded-r">  // Border radius
```

### Color Palette

```css
Primary: sky-600 (#0ea5e9)
Secondary: sky-50 (#f0f9ff)
Accent: cyan-600 (#06b6d4)
Muted: gray-100 (#f1f5f9)
```

### Arabic Font Classes

```tsx
<div className="font-arabic">  // For body text
<h1 className="font-arabic-display">  // For headings
```

---

## 🔧 Common Tasks

### Adding a New Model to Prisma

1. Edit `prisma/schema.prisma`
2. Run `npm run db:generate`
3. Run `npm run db:push` (development) or create migration (production)
4. Update seed script if needed

### Creating a New Admin Page

1. Create file in `src/app/admin/[feature]/page.tsx`
2. Use `auth()` to check session
3. Redirect if not authenticated
4. Return page JSX

Example:

```tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function MyAdminPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  return <div>My Admin Page</div>;
}
```

### Adding a New API Route

1. Create file in `src/app/api/[endpoint]/route.ts`
2. Export GET, POST, PUT, DELETE handlers
3. Use Zod for validation
4. Return JSON responses

Example:

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ data: 'success' });
}
```

### Adding a New Public Page

1. Create file in `src/app/[locale]/[feature]/page.tsx`
2. Access locale from params: `const { locale } = await params;`
3. Provide bilingual content

Example:

```tsx
const content = {
  en: { title: 'Treatments' },
  ar: { title: 'العلاجات' },
};

export default async function TreatmentsPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'ar' }>;
}) {
  const { locale } = await params;
  return <h1>{content[locale].title}</h1>;
}
```

---

## 🔍 Debugging Tips

### Database Issues

```bash
# View logs
npm run db:studio

# Reset database (CAUTION: deletes all data)
npx prisma migrate reset

# Check connection
npx prisma db pull
```

### NextAuth Issues

```bash
# Check .env has NEXTAUTH_SECRET
cat .env | grep NEXTAUTH_SECRET

# Verify auth config
cat src/lib/auth.ts
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

---

## 📚 Useful Prisma Commands

```bash
# Format schema
npx prisma format

# Validate schema
npx prisma validate

# View database
npx prisma studio

# Generate types
npx prisma generate

# Create migration (production)
npx prisma migrate dev --name migration_name

# Deploy migrations (production)
npx prisma migrate deploy
```

---

## 🌐 Internationalization

### Supported Locales

- `en` - English (default)
- `ar` - Arabic (RTL)

### Adding a New Locale

1. Update `src/middleware.ts` - add locale to array
2. Update `src/app/[locale]/layout.tsx` - add locale to generateStaticParams
3. Add translations to all pages
4. Test RTL if needed

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Set strong `NEXTAUTH_SECRET` in production env
- [ ] Configure production database URL
- [ ] Add AWS S3 credentials
- [ ] Add SendGrid API key
- [ ] Add Twilio credentials
- [ ] Add Algolia keys
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Run `npm run build` to check for errors
- [ ] Test all authentication flows
- [ ] Verify bilingual content
- [ ] Check mobile responsiveness

---

## 💾 Backup & Restore

### Backup Database

```bash
# PostgreSQL backup
pg_dump -U postgres shifaalhind > backup.sql
```

### Restore Database

```bash
# PostgreSQL restore
psql -U postgres shifaalhind < backup.sql
```

---

## 🆘 Emergency Commands

```bash
# Stop all node processes
killall node

# Reset Git (if needed)
git reset --hard HEAD

# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules package-lock.json .next
npm install
```

---

**Last Updated**: October 5, 2025
**Version**: Milestone 1
