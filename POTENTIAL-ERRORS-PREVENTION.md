# Potential Errors & Prevention Guide

## ✅ Current Status

All critical errors are fixed. Your site is deploying successfully.

However, here are **potential issues** that could occur in the future and how to prevent/fix them:

---

## 🚨 HIGH PRIORITY - Must Have

### 1. Missing Environment Variables ⚠️

**Problem**: Render deployment will fail if these are not set.

**Required Environment Variables on Render:**

```bash
# CRITICAL - Required for app to start
DATABASE_URL=postgresql://...           # Your Render PostgreSQL connection string
NEXTAUTH_SECRET=...                     # Generate with: openssl rand -base64 32
NEXTAUTH_URL=https://shifaalhind.com   # Your production URL

# CRITICAL - Public URLs
NEXT_PUBLIC_APP_URL=https://shifaalhind.com
NEXT_PUBLIC_APP_NAME="Shifa AlHind"
NEXT_PUBLIC_DEFAULT_LOCALE="en"
```

**How to Fix:**

1. Go to Render Dashboard → Your Service → Environment
2. Add each variable above
3. Redeploy

**Symptoms if Missing:**

- `DATABASE_URL` → Build succeeds but app crashes: "Can't reach database server"
- `NEXTAUTH_SECRET` → Auth doesn't work, admin login fails
- `NEXTAUTH_URL` → OAuth redirects fail

---

### 2. Database Connection Issues 🗄️

**Problem**: Prisma can't connect to PostgreSQL database.

**Common Causes:**

```bash
# Wrong DATABASE_URL format
❌ postgresql://user:pass@localhost:5432/db
✅ postgresql://user:pass@hostname.render.com:5432/db?sslmode=require

# Missing SSL mode for production
❌ postgresql://user:pass@host:5432/db
✅ postgresql://user:pass@host:5432/db?sslmode=require

# Database not accessible from Render
❌ localhost, 127.0.0.1, private IPs
✅ Public hostname provided by Render/Supabase/Neon
```

**How to Fix:**

1. Get correct connection string from Render PostgreSQL dashboard
2. Ensure it includes `?sslmode=require` for production
3. Update `DATABASE_URL` environment variable
4. Redeploy

**Symptoms:**

- Build succeeds but runtime error: "Can't reach database server"
- Health checks fail after server starts
- `/api/*` routes return 500 errors

---

### 3. Prisma Client Not Generated 🔧

**Problem**: Prisma client not available at runtime.

**Cause:**

```json
// package.json missing postinstall script
❌ No postinstall script
✅ "postinstall": "prisma generate"
```

**How to Fix:**
Already fixed in your `package.json`:

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

**Symptoms:**

- Build error: "Cannot find module '@prisma/client'"
- TypeScript errors about Prisma types

---

## ⚠️ MEDIUM PRIORITY - May Cause Issues

### 4. Image Optimization Errors 🖼️

**Problem**: Next.js can't optimize external images.

**Current Config** (from next.config.ts):

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',  // ⚠️ Allows ALL domains (not secure!)
    },
  ],
}
```

**Potential Issue:**

- **Security risk**: Anyone can use your image optimizer for any external image
- **Performance risk**: No caching, slow image loads

**Better Config:**

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'cdn.shifaalhind.com' },
    { protocol: 'https', hostname: 's3.amazonaws.com' },
    // Add only domains you actually use
  ],
  formats: ['image/avif', 'image/webp'],
}
```

**Symptoms:**

- Slow image loading
- High bandwidth usage
- External images fail to load

---

### 5. Memory Limits on Render Free Tier 💾

**Problem**: App crashes with out-of-memory errors.

**Render Free Tier Limits:**

- RAM: 512 MB
- If exceeded: App crashes, restarts

**Your App's Memory Usage:**

- Next.js server: ~150-200 MB
- Prisma Client: ~50-100 MB
- **Total**: ~200-300 MB (should be OK)

**Warning Signs:**

- Random crashes with no error
- "JavaScript heap out of memory"
- Slow response times

**Solutions:**

1. **Upgrade Render Plan** ($7/month gets 512MB → 2GB)
2. **Optimize imports**:

   ```typescript
   // ❌ Bad - imports entire library
   import { Button, Card, Input } from 'huge-ui-lib';

   // ✅ Good - tree-shakeable imports
   import Button from 'huge-ui-lib/Button';
   import Card from 'huge-ui-lib/Card';
   ```

3. **Use dynamic imports** for large components:
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

---

### 6. NextAuth Session/Cookie Issues 🍪

**Problem**: Users can't stay logged in, sessions expire immediately.

**Common Causes:**

```typescript
// Missing or wrong NEXTAUTH_SECRET
❌ NEXTAUTH_SECRET="" (empty)
❌ NEXTAUTH_SECRET="change-me" (default)
✅ NEXTAUTH_SECRET="<64-character random string>"

// Wrong NEXTAUTH_URL
❌ NEXTAUTH_URL="http://localhost:3000" (in production)
✅ NEXTAUTH_URL="https://shifaalhind.com"

// Wrong domain for cookies
❌ Cookie domain mismatch
✅ Cookies work on exact domain
```

**How to Fix:**

1. Generate strong secret:
   ```bash
   openssl rand -base64 32
   ```
2. Set in Render environment variables
3. Ensure NEXTAUTH_URL matches your actual domain
4. Redeploy

**Symptoms:**

- Admin login succeeds but immediately logs out
- "Session expired" errors
- Admin pages redirect to login constantly

---

### 7. API Rate Limiting 🚦

**Problem**: Too many API requests cause crashes or blocks.

**Your API Routes:**

- `/api/v1/treatments` - Unlimited calls
- `/api/v1/doctors` - Unlimited calls
- `/api/v1/hospitals` - Unlimited calls
- `/api/v1/lead` - Contact form submission

**Potential Issue:**

- Bot spam on contact forms
- DDoS attacks
- Accidental infinite loops

**Prevention:**
Add rate limiting middleware (future enhancement):

```typescript
// lib/rate-limit.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
});
```

**Symptoms:**

- Server slows down
- Database connection pool exhausted
- "Too many connections" errors

---

## 📊 LOW PRIORITY - Nice to Have

### 8. Missing Analytics Environment Variables 📈

**Problem**: Analytics don't work, no visitor tracking.

**Optional but Recommended:**

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Google Tag Manager (better than GA alone)
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"

# Microsoft Clarity (free heatmaps)
NEXT_PUBLIC_CLARITY_ID="XXXXXXXXXX"
```

**Impact if Missing:**

- No visitor tracking
- No conversion data
- Can't measure performance

**How to Add:**

1. Create accounts on analytics platforms
2. Get tracking IDs
3. Add to Render environment variables
4. Redeploy

---

### 9. Email Service Not Configured 📧

**Problem**: Contact forms don't send emails.

**Current Code Checks:**

```typescript
// lib/email.ts
if (!process.env.RESEND_API_KEY) {
  console.warn('Email service not configured');
  return; // Silently fails
}
```

**To Enable Emails:**

```bash
# Option 1: Resend (Recommended)
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM_EMAIL="Shifa AlHind <noreply@shifaalhind.com>"
ADMIN_NOTIFICATION_EMAIL="admin@shifaalhind.com"

# Option 2: SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="app-password"
```

**Impact:**

- ✅ Site works, contact form submits
- ❌ But emails aren't sent
- ❌ No notification to admin

---

### 10. WhatsApp/Social Links Broken 🔗

**Problem**: Social media links are placeholders.

**Current State:**
Hardcoded in components, may not be updated.

**To Fix:**
Set environment variables:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER="+918012345678"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/shifaalhind"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/shifaalhind"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/shifaalhind"
```

---

## 🔍 Monitoring & Detection

### How to Detect Issues Early

**1. Check Render Logs:**

```bash
# Go to: Render Dashboard → Your Service → Logs
# Look for:
ERROR: ...
⨯ ...
Warning: ...
```

**2. Test Critical Paths:**

- Homepage loads
- Contact form submits
- Admin login works
- Blog posts load
- Search works

**3. Monitor Performance:**

- Page load time < 2 seconds
- API response time < 500ms
- No 500 errors
- Memory usage < 400MB

**4. Set Up Alerts:**
Use Render's built-in alerts:

- Service down
- High error rate
- Memory usage > 80%

---

## ✅ Prevention Checklist

Before every deployment:

- [ ] All required environment variables set on Render
- [ ] DATABASE_URL correct and includes `?sslmode=require`
- [ ] NEXTAUTH_SECRET is strong (32+ characters)
- [ ] NEXTAUTH_URL matches production domain
- [ ] Local build succeeds: `npm run build`
- [ ] TypeScript check passes: `npm run type-check`
- [ ] No console errors in local testing
- [ ] Test admin login locally
- [ ] Test contact form submission

After deployment:

- [ ] Site loads at https://shifaalhind.com
- [ ] No errors in Render logs
- [ ] Health checks passing
- [ ] Admin login works
- [ ] Database queries work
- [ ] All pages load correctly

---

## 🚨 Emergency Fixes

### If Site Goes Down:

**1. Check Render Status:**

- Dashboard shows service status
- Look for build errors
- Check deployment logs

**2. Quick Fixes:**

```bash
# Restart service
Render Dashboard → Manual Deploy → Deploy

# Rollback to working version
Render Dashboard → Deploys → Previous Deploy → Redeploy
```

**3. Common Quick Fixes:**

```bash
# Missing environment variable
→ Add it in Environment tab, redeploy

# Database connection failed
→ Check DATABASE_URL, ensure SSL mode enabled

# Out of memory
→ Upgrade Render plan or optimize code

# Build failed
→ Check recent git commits, revert if needed
```

---

## 📝 Summary of Risks

| Issue                   | Probability | Impact   | Fix Difficulty |
| ----------------------- | ----------- | -------- | -------------- |
| Missing DATABASE_URL    | Low         | Critical | Easy           |
| Missing NEXTAUTH_SECRET | Low         | High     | Easy           |
| Database connection     | Low         | Critical | Medium         |
| Memory limits           | Medium      | Medium   | Medium         |
| Image optimization      | Low         | Low      | Easy           |
| Email not configured    | High        | Low      | Easy           |
| Analytics missing       | High        | Low      | Easy           |
| Session issues          | Low         | Medium   | Easy           |
| Rate limiting           | Low         | Medium   | Hard           |

**Current Risk Level**: 🟢 **LOW**

All critical issues are already handled. The remaining items are nice-to-haves or edge cases.

---

## 🎯 Recommended Next Steps

**Immediate (Before Going Live):**

1. ✅ Verify all environment variables set on Render
2. ✅ Test admin login after deployment
3. ✅ Test contact form submission
4. ✅ Check all critical pages load

**Short Term (This Week):**

1. Configure email service (Resend recommended)
2. Add Google Analytics/GTM
3. Test thoroughly on mobile
4. Check all images load correctly

**Long Term (This Month):**

1. Set up monitoring/alerts
2. Add rate limiting to API routes
3. Optimize images (specific domains only)
4. Consider upgrading Render plan if needed

---

**Status**: 🟢 Your site is solid. These are just potential future issues to be aware of.

**Last Updated**: 2025-10-10
**Next Review**: Check after first week of production traffic
