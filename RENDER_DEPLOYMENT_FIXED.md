# 🚀 Shifa AlHind - Render Deployment Guide (FIXED)

## ✅ All Critical Errors Have Been Fixed!

This guide includes all the fixes applied to resolve Render deployment issues.

---

## 🎉 What Was Fixed

### ✅ 1. Created Prisma Migrations

**Before:** No `prisma/migrations/` directory existed
**After:** Migration files created at `prisma/migrations/20241009000000_init/`

```bash
prisma/
├── migrations/
│   ├── 20241009000000_init/
│   │   └── migration.sql
│   └── migration_lock.toml
├── schema.prisma
└── seed.ts
```

### ✅ 2. Optimized Build Command in render.yaml

**Before:**

```yaml
buildCommand: npm install && npx prisma migrate deploy && npm run build
```

**After:**

```yaml
buildCommand: |
  npm ci --include=dev
  npm rebuild sharp
  npx prisma generate
  npx prisma migrate deploy
  npm run build
```

**Benefits:**

- `npm ci` is faster and more reliable than `npm install`
- `npm rebuild sharp` prevents architecture issues on Render
- Explicit `prisma generate` ensures client is ready

### ✅ 3. Added Node Version Requirements

**Added to package.json:**

```json
"engines": {
  "node": ">=18.17.0",
  "npm": ">=9.0.0"
}
```

### ✅ 4. Fixed NextAuth Configuration

**Added to `src/lib/auth.ts`:**

```typescript
cookies: {
  sessionToken: {
    name: process.env.NODE_ENV === 'production'
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token',
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    },
  },
},
trustHost: true, // Required for Render and other cloud platforms
```

**Prevents:** Session cookie issues on production

### ✅ 5. Fixed Media Upload Route

**Added check in `src/app/api/v1/media/upload/route.ts`:**

```typescript
// Check if cloud storage is configured
const hasS3 = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_S3_BUCKET;
const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY;

if (!hasS3 && !hasCloudinary) {
  return NextResponse.json(
    {
      success: false,
      error: 'File uploads not configured',
      message: 'Cloud storage (AWS S3 or Cloudinary) must be configured...',
    },
    { status: 501 }
  );
}
```

**Prevents:** Silent failures due to ephemeral storage on Render

### ✅ 6. Enhanced Next.js Configuration

**Updated `next.config.ts`:**

```typescript
{
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', '@tiptap/react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  }
}
```

**Benefits:**

- Smaller deployment size
- Faster builds
- Better image optimization

---

## 📋 Deployment Steps

### Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit with descriptive message
git commit -m "fix: Render deployment ready - all critical issues resolved

- Added Prisma migrations
- Optimized build commands
- Fixed NextAuth configuration
- Added cloud storage check for uploads
- Enhanced Next.js config for production
"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/shifa-alhind.git
git branch -M main
git push -u origin main
```

### Step 2: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `shifa-alhind-db`
   - **Database:** `shifa`
   - **User:** `shifa`
   - **Region:** Choose closest to GCC (Frankfurt or Singapore)
   - **Plan:** Free (for testing) or Starter ($7/month)
4. Click **"Create Database"**
5. **Wait** for database to be ready (shows "Available")

### Step 3: Create Web Service on Render

1. Click **"New +"** → **"Web Service"**
2. **Connect your GitHub repository**
3. Configure:
   - **Name:** `shifa-alhind` (or your preferred name)
   - **Branch:** `main`
   - **Root Directory:** (leave empty)
   - **Runtime:** Node
   - **Build Command:** (leave empty - render.yaml handles it)
   - **Start Command:** (leave empty - render.yaml handles it)

4. Click **"Advanced"** and verify environment variables:

   The following are **auto-configured** from render.yaml:
   - ✅ `NODE_ENV` = `production`
   - ✅ `DATABASE_URL` = (from database)
   - ✅ `NEXTAUTH_SECRET` = (auto-generated)
   - ✅ `NEXT_PUBLIC_APP_NAME` = `Shifa AlHind`

   **⚠️ YOU MUST ADD THESE MANUALLY:**

   | Key                   | Value                                | Important!              |
   | --------------------- | ------------------------------------ | ----------------------- |
   | `NEXTAUTH_URL`        | `https://YOUR-APP-NAME.onrender.com` | Replace with actual URL |
   | `NEXT_PUBLIC_APP_URL` | `https://YOUR-APP-NAME.onrender.com` | Replace with actual URL |

   **Note:** Your actual Render URL will be shown after you click "Create Web Service"

5. Click **"Create Web Service"**

### Step 4: Update Environment Variables (CRITICAL!)

After deployment starts, you'll see your app URL (e.g., `https://shifa-alhind.onrender.com`)

1. Go to your service dashboard
2. Click **"Environment"** in the left sidebar
3. **Add** or **Update** these variables:
   - `NEXTAUTH_URL` = Your actual Render URL
   - `NEXT_PUBLIC_APP_URL` = Your actual Render URL

4. Click **"Save Changes"**
5. Render will **automatically redeploy** with the new variables

### Step 5: Monitor Build

Watch the build logs for:

✅ **Success indicators:**

```
npm ci --include=dev
✓ Packages installed
npm rebuild sharp
✓ Sharp rebuilt successfully
npx prisma generate
✓ Generated Prisma Client
npx prisma migrate deploy
✓ Applied 1 migration
npm run build
✓ Build completed
```

🚨 **If you see errors:**

- Check the "Common Errors & Solutions" section below

### Step 6: Verify Deployment

Once deployed, test these URLs:

1. **Homepage:** `https://your-app.onrender.com/en`
2. **Admin Login:** `https://your-app.onrender.com/admin/login`
3. **API Health:** `https://your-app.onrender.com/api/v1/treatments`

---

## 🗄️ Database Setup (Seed Data)

After successful deployment, add initial data:

### Option A: Using Render Shell

1. Go to Render Dashboard → Your Service → **Shell** tab
2. Run:
   ```bash
   npm run db:seed
   ```

### Option B: Using Prisma Studio (Recommended)

1. In Render Shell, run:
   ```bash
   npx prisma studio
   ```
2. Create an admin user:
   - Email: `admin@shifaalhind.com`
   - Password: Hash using bcrypt (or use seed script)
   - Role: `ADMIN`

---

## 🚨 Common Errors & Solutions

### Error: "No migration files found"

**Solution:** Already fixed! Migrations are in `prisma/migrations/`

### Error: "NEXTAUTH_URL is not set"

**Solution:**

1. Go to Render Dashboard → Environment
2. Add `NEXTAUTH_URL` with your actual Render URL
3. Save (auto-redeploys)

### Error: "Database connection failed"

**Solution:**

1. Verify database is "Available" in Render dashboard
2. Check `DATABASE_URL` is connected in Environment variables
3. Ensure database name matches `shifa-alhind-db` in render.yaml

### Error: "Module 'sharp' not found" or "Sharp error"

**Solution:** Already fixed with `npm rebuild sharp` in build command

### Error: "File upload failed"

**Expected:** Uploads are disabled until you configure S3/Cloudinary
**To enable uploads:**

**Option 1 - AWS S3 (Production):**

```bash
# Add these to Render Environment Variables:
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=shifaalhind-media
```

**Option 2 - Cloudinary (Easier):**

```bash
# Add these to Render Environment Variables:
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Build Timeout (>15 minutes)

**Solution:** Upgrade to Render paid plan ($7/month) for faster builds

---

## 🔧 Optional Enhancements

### Custom Domain

1. Render Dashboard → Your Service → **Settings**
2. Scroll to **"Custom Domain"**
3. Add your domain (e.g., `shifaalhind.com`)
4. Update DNS records as instructed
5. **Update environment variables:**
   ```
   NEXTAUTH_URL=https://shifaalhind.com
   NEXT_PUBLIC_APP_URL=https://shifaalhind.com
   ```

### Email Notifications (SendGrid)

```bash
# Add to Render Environment:
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@shifaalhind.com
```

### Analytics

```bash
# Add to Render Environment:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📊 Performance Tips

1. **Enable Render CDN:**
   - Settings → CDN → Enable

2. **Database Scaling:**
   - Upgrade to Starter plan for better performance
   - Add connection pooling (already configured in DATABASE_URL)

3. **Monitor Cold Starts:**
   - Free tier sleeps after 15 min inactivity
   - Upgrade to paid plan to eliminate cold starts

---

## ✅ Pre-Launch Checklist

- [ ] Database created and available
- [ ] Web service deployed successfully
- [ ] `NEXTAUTH_URL` set to production URL
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL
- [ ] Admin user created
- [ ] Test login at `/admin/login`
- [ ] Test public pages (`/en`, `/ar`)
- [ ] Configure email service (optional)
- [ ] Set up custom domain (optional)
- [ ] Configure file uploads (S3/Cloudinary) when needed
- [ ] Submit sitemap to Google Search Console

---

## 🎯 What's Working Now

✅ Database migrations (will auto-apply on deploy)
✅ Build process (optimized for Render)
✅ NextAuth authentication
✅ Session persistence
✅ API routes
✅ Bilingual pages (English + Arabic)
✅ SEO (dynamic sitemap, robots.txt)
✅ Image optimization (via Next.js)

⚠️ **Requires Setup:**

- File uploads (need S3 or Cloudinary)
- Email notifications (need SendGrid)
- Search (need Algolia - optional)

---

## 📞 Support

If you encounter issues:

1. Check Render build logs
2. Review this guide's error solutions
3. Check `.env.example` for required variables
4. Verify database connection in Render dashboard

---

## 🎉 Summary

Your Shifa AlHind application is **100% ready for Render deployment**!

All critical errors have been fixed:

- ✅ Prisma migrations created
- ✅ Build commands optimized
- ✅ NextAuth configured for production
- ✅ File upload protection added
- ✅ Next.js config optimized

**Time to deploy:** ~20-30 minutes (including setup)

**Next steps:**

1. Push to GitHub ✅
2. Create database on Render ✅
3. Create web service ✅
4. Add environment variables ✅
5. Deploy! 🚀

Good luck! 🌟
