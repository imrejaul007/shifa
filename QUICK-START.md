# ⚡ Shifa AlHind - Quick Start Guide

**Get your medical tourism platform running in 5 minutes!**

---

## 📋 Prerequisites

Make sure you have:

- ✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))
- ✅ **PostgreSQL** database (local or cloud)
- ✅ Code editor (VS Code recommended)

---

## 🚀 5-Minute Setup

### Step 1: Install Dependencies

```bash
cd shifa-alhind
npm install
```

### Step 2: Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and set these **required** variables:

```env
# Use one of these database options:

# Option A: Local PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/shifa_alhind?schema=public"

# Option B: Supabase (Free) - Get from supabase.com
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"

# Generate secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret-here"

NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# Seed with sample data
npm run db:seed
```

### Step 4: Start Development Server

```bash
npm run dev
```

**🎉 Your site is now running at:** `http://localhost:3000`

---

## 🔐 Login to Admin Panel

After seeding, you can access the admin panel:

**URL:** `http://localhost:3000/en/admin/login`

**Default Credentials:**

- **Email:** `admin@shifaalhind.com`
- **Password:** `admin123`

⚠️ **Important:** Change these credentials before going to production!

---

## 📱 What's Available

### Public Pages (Fully Functional)

- ✅ **Home:** `/en` or `/ar`
- ✅ **Treatments:** `/en/treatments/ivf-treatment` (example)
- ✅ **Doctors:** `/en/doctors/dr-rajesh-sharma` (example)
- ✅ **Hospitals:** `/en/hospitals/apollo-hospital` (example)
- ✅ **Packages:** `/en/packages/fertility-package` (example)
- ✅ **Blog:** `/en/blog/medical-tourism-guide` (example)
- ✅ **GCC Countries:** `/en/medical-tourism/from-uae` (6 countries)

### Features Working Out of the Box

- ✅ Bilingual (English/Arabic with RTL)
- ✅ SEO optimized (sitemap, robots, meta tags, JSON-LD)
- ✅ Booking form with lead capture
- ✅ Responsive design (mobile-first)
- ✅ Database-driven content
- ✅ Authentication system

---

## 🎨 Customize Your Site

### View Database with Prisma Studio

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:

- View all data
- Edit content
- Add hospitals, doctors, treatments
- Manage bookings

### Add Your Content

1. Open Prisma Studio (`npx prisma studio`)
2. Navigate to the model you want to edit (Hospital, Doctor, Treatment, etc.)
3. Click "Add record" or edit existing ones
4. Fill in both English (`_en`) and Arabic (`_ar`) fields
5. Set `published: true` to make it visible
6. Refresh your website to see changes

---

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended - Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Then:

1. Add environment variables in Vercel dashboard
2. Connect your custom domain
3. Done! ✨

### Option 2: Manual Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed guides on:

- Vercel deployment
- Netlify deployment
- AWS deployment
- DigitalOcean deployment

---

## 📚 Need More Help?

- **Detailed Setup:** [SETUP.md](./SETUP.md)
- **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Project Status:** [PROJECT-STATUS.md](./PROJECT-STATUS.md)
- **Full README:** [README.md](./README.md)

---

## 🐛 Common Issues

### "Can't reach database server"

**Fix:** Check your `DATABASE_URL` in `.env` is correct.

```bash
# Test connection
npx prisma db pull
```

### "Module not found: @prisma/client"

**Fix:** Generate Prisma Client:

```bash
npx prisma generate
```

### Port 3000 already in use

**Fix:** Change port in `package.json`:

```json
"dev": "next dev -p 3001"
```

---

## ✅ Pre-Launch Checklist

Before deploying to production:

- [ ] Changed admin password (default is `admin123`)
- [ ] Added real hospital, doctor, and treatment data
- [ ] Updated About, Services, FAQ pages with your content
- [ ] Configured production `DATABASE_URL` (Supabase/Railway/Neon)
- [ ] Generated new `NEXTAUTH_SECRET` (`openssl rand -base64 32`)
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Tested booking form submission
- [ ] Verified all pages load correctly
- [ ] Submitted sitemap to Google Search Console
- [ ] Set up Google Analytics (optional)

---

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma studio        # Open database GUI
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema to database
npm run db:seed          # Seed sample data

# Code Quality
npm run lint             # Check for errors
npm run type-check       # TypeScript check

# Deployment
vercel --prod            # Deploy to Vercel
```

---

## 🌟 Sample Data Included

After running `npm run db:seed`, you get:

**Hospitals:**

- Apollo Hospital Bangalore
- Manipal Hospital
- Fortis Hospital

**Doctors:**

- Dr. Rajesh Sharma (Cardiologist)
- Dr. Priya Menon (Fertility Specialist)
- Dr. Ahmed Patel (Orthopedic Surgeon)

**Treatments:**

- IVF Treatment
- Heart Surgery
- Knee Replacement
- Dental Implants

**Packages:**

- Fertility Package
- Cardiac Care Package

**Blog Posts:**

- Medical Tourism Guide
- Choosing the Right Hospital
- Post-Treatment Care

---

## 📞 Support

- Check the documentation files mentioned above
- Review inline code comments
- Use Prisma Studio to inspect database
- Check Next.js build output for errors

---

## 🎉 You're All Set!

Your Shifa AlHind medical tourism platform is ready to go. Start customizing the content and deploy when ready!

**Happy coding! 🚀**

---

**Last Updated:** October 2025
**Platform:** Next.js 15 | TypeScript | PostgreSQL | Prisma
**Documentation:** SETUP.md, DEPLOYMENT.md, README.md
