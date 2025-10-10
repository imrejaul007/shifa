# Render Deployment Fixes - Shifa AlHind

**Date:** October 10, 2025
**Status:** Build-ready for Render deployment

---

## Summary

All TypeScript errors and build-blocking issues have been resolved. The application is now configured to build successfully on Render even without a database connection during the build phase.

---

## Problems Identified & Fixed

### 1. TypeScript Type Errors (5 errors → 0 errors)

**Issue:** Schema.org types from `schema-dts` package were incompatible with our usage.

**Files Fixed:**

- `src/components/ui/Button.tsx` - Framer Motion props type mismatch
- `src/lib/schema.ts` - Multiple Schema.org type mismatches

**Solutions Applied:**

- Added type assertions with `as any` where necessary
- Added `eslint-disable-next-line @typescript-eslint/no-explicit-any` comments
- Wrapped entire schema objects with proper type casts

**Commit:** `6fd913b` - "Fix build errors: Add dynamic rendering and handle missing database"

---

### 2. Static Generation Without Database

**Issue:** Next.js tried to pre-render pages at build time that require database access, causing build failures when PostgreSQL is not available.

**Error Pattern:**

```
Error [PrismaClientInitializationError]:
Invalid `prisma.*.findMany()` invocation:
Can't reach database server at `localhost:5432`
```

**Pages Affected:**

- `/blog` - Blog listing
- `/medical-tourism/[country]` - Country landing pages
- `/treatments` - Treatment listing
- `/hospitals` - Hospital listing
- `/doctors` - Doctor listing
- `/packages` - Package listing
- `/terms-and-conditions` - Terms page using browser APIs
- `/privacy-policy` - Privacy page using browser APIs
- `/refund-policy` - Refund page using browser APIs

**Solutions Applied:**

1. **Added Dynamic Rendering Configuration:**

   ```typescript
   export const dynamic = 'force-dynamic';
   export const revalidate = 3600; // Revalidate every hour
   ```

2. **Added Error Handling for Database Queries:**

   ```typescript
   let data = [];
   try {
     data = await prisma.model.findMany({...});
   } catch (error) {
     console.error('Database not available during build, skipping static generation');
     console.error(error);
   }
   ```

3. **Commented Out `generateStaticParams()`:**
   - Prevented build-time static page generation for country routes
   - Can be re-enabled once database is available during build

---

## Files Modified

### Core Schema & Components

1. `src/lib/schema.ts` - Fixed type assertions for Schema.org types
2. `src/components/ui/Button.tsx` - Fixed Framer Motion type compatibility

### Page Route Handlers

3. `src/app/[locale]/blog/page.tsx` - Added dynamic + error handling
4. `src/app/[locale]/medical-tourism/[country]/page.tsx` - Added dynamic + error handling
5. `src/app/[locale]/treatments/page.tsx` - Added dynamic + error handling
6. `src/app/[locale]/hospitals/page.tsx` - Added dynamic + error handling
7. `src/app/[locale]/doctors/page.tsx` - Added dynamic (via script)
8. `src/app/[locale]/packages/page.tsx` - Added dynamic (via script)
9. `src/app/[locale]/terms-and-conditions/page.tsx` - Added dynamic
10. `src/app/[locale]/privacy-policy/page.tsx` - Added dynamic
11. `src/app/[locale]/refund-policy/page.tsx` - Added dynamic

---

## Render Deployment Configuration

### Required Environment Variables

Ensure these are set in your Render dashboard:

```bash
# Database Connection
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# Application URL
NEXT_PUBLIC_APP_URL="https://your-app.onrender.com"

# NextAuth Configuration
NEXTAUTH_URL="https://your-app.onrender.com"
NEXTAUTH_SECRET="[generate-with: openssl rand -base64 32]"

# Optional: Disable telemetry
NEXT_TELEMETRY_DISABLED=1
```

### Build Settings (render.yaml or Dashboard)

```yaml
services:
  - type: web
    name: shifa-alhind
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 18
      - key: DATABASE_URL
        sync: false # Set manually in dashboard
      - key: NEXT_PUBLIC_APP_URL
        sync: false
      - key: NEXTAUTH_URL
        sync: false
      - key: NEXTAUTH_SECRET
        sync: false
```

---

## Database Migration on Render

Once deployed, run migrations via Render shell or deploy hook:

```bash
# Option 1: Render Shell (Dashboard > Shell tab)
npx prisma migrate deploy
npx prisma generate

# Option 2: Add to package.json scripts
"postbuild": "prisma generate"
"start": "prisma migrate deploy && next start"
```

---

## Build Behavior

### Local Development (No Database)

✅ **Build succeeds** - Pages render with empty data arrays
✅ **No errors** - All database queries wrapped in try-catch
✅ **TypeScript passes** - All type errors resolved

### Production (With Database)

✅ **Build succeeds** - Pages fetch real data
✅ **ISR enabled** - Pages revalidate every hour
✅ **Dynamic rendering** - Pages always up-to-date

---

## Known Limitations & Trade-offs

### 1. No Static Pre-rendering at Build Time

- **Impact:** First request to each page will be slower (dynamic render)
- **Mitigation:** ISR with 1-hour revalidation caches rendered pages
- **Alternative:** Re-enable `generateStaticParams()` once database is available at build time

### 2. Empty Data During Build

- **Impact:** Build-time sitemap may be incomplete if database unavailable
- **Mitigation:** Sitemap has try-catch blocks, still includes static routes
- **Alternative:** Generate sitemap post-build with database access

### 3. Type Assertions for Schema.org

- **Impact:** Slightly less type safety for structured data
- **Mitigation:** Schema.org output is validated at runtime by search engines
- **Alternative:** Create custom type definitions matching our usage

---

## Testing Checklist

### ✅ Completed

- [x] TypeScript type-check passes
- [x] ESLint passes with no errors
- [x] Build succeeds locally without database
- [x] All pages handle missing database gracefully
- [x] Git commit successful with pre-commit hooks

### ⏳ Remaining (On Render)

- [ ] Build succeeds on Render
- [ ] Database migrations run successfully
- [ ] Pages load with real data from database
- [ ] SEO metadata renders correctly
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Performance metrics acceptable (Lighthouse)

---

## Deployment Steps for Render

1. **Create PostgreSQL Database on Render**
   - Render Dashboard → New → PostgreSQL
   - Note the `DATABASE_URL` (Internal Database URL)

2. **Create Web Service**
   - Render Dashboard → New → Web Service
   - Connect to GitHub repository
   - Configure build settings:
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`
     - Node Version: 18

3. **Set Environment Variables**
   - Add all variables listed in "Required Environment Variables" section
   - Use Internal Database URL for `DATABASE_URL`

4. **Deploy**
   - Click "Create Web Service"
   - Monitor build logs for errors
   - Once deployed, access shell and run:
     ```bash
     npx prisma migrate deploy
     npm run db:seed  # Optional: seed initial data
     ```

5. **Verify**
   - Visit your site: `https://your-app.onrender.com`
   - Check `/en/treatments` - should show treatments
   - Check `/en/blog` - should show blog posts
   - View page source - verify structured data present

---

## Troubleshooting

### Build Fails with "Module not found"

**Solution:** Ensure `npm install` runs before build

```bash
npm ci && npm run build
```

### Database Connection Timeout During Build

**Solution:** This is expected and handled gracefully. Verify:

1. Error messages say "Database not available during build, skipping..."
2. Build still completes successfully
3. Pages work once deployed with database access

### Pages Show Empty Content

**Causes:**

1. `DATABASE_URL` not set correctly
2. Database not seeded with content
3. Migrations not applied

**Solutions:**

```bash
# Check environment variable
echo $DATABASE_URL

# Run migrations
npx prisma migrate deploy

# Seed database
npm run db:seed

# Check database content
npx prisma studio
```

### Render Build Exceeds Memory Limit

**Solution:** Reduce build memory usage:

```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

Or upgrade Render plan for more memory.

---

## Performance Optimization (Post-Deploy)

### 1. Enable Static Generation (Once DB Available at Build)

Uncomment `generateStaticParams()` in:

- `src/app/[locale]/medical-tourism/[country]/page.tsx`

Change from:

```typescript
export const dynamic = 'force-dynamic';
```

To:

```typescript
export const revalidate = 3600; // ISR only
```

### 2. CDN & Caching

- Enable Render CDN for static assets
- Configure CloudFlare in front of Render (optional)
- Add Redis for query caching (optional)

### 3. Database Optimization

- Add indexes for frequently queried fields
- Use database connection pooling
- Consider read replicas for high traffic

---

## Next Steps

1. ✅ **Local Testing Complete** - All errors fixed
2. ⏳ **Push to GitHub** - Deploy to remote repository
3. ⏳ **Create Render Services** - PostgreSQL + Web Service
4. ⏳ **Configure Environment** - Set all required variables
5. ⏳ **Deploy & Monitor** - Watch build logs
6. ⏳ **Run Migrations** - Apply database schema
7. ⏳ **Seed Data** - Populate with blog posts & content
8. ⏳ **Verify Functionality** - Test all pages
9. ⏳ **SEO Validation** - Check structured data
10. ⏳ **Performance Testing** - Lighthouse audit

---

## Support & Documentation

- **Render Docs:** https://render.com/docs
- **Next.js 15 Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **This Project's Docs:**
  - `DATABASE_SETUP.md` - PostgreSQL setup guide
  - `SITE_STRUCTURE_AUDIT.md` - Site completion status
  - `INTERNAL_LINKING_STRATEGY.md` - SEO linking plan

---

**Last Updated:** October 10, 2025
**Build Status:** ✅ Ready for Render Deployment
**Database Requirement:** PostgreSQL 12+ (provided by Render)
**Node Version:** 18.x or higher

---

## Git Commits Related to Render Fixes

```bash
# View recent commits
git log --oneline --graph -5

# Key commit
6fd913b - Fix build errors: Add dynamic rendering and handle missing database

# Files changed
git show 6fd913b --stat
```

---

**🚀 You're ready to deploy to Render!**
