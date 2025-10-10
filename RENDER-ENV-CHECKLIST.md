# Render Environment Variables Checklist

## 🎯 Quick Reference: What You MUST Have Set on Render

Go to: **Render Dashboard → Your Service → Environment**

---

## ✅ REQUIRED (App Won't Start Without These)

### 1. Database Connection

```bash
DATABASE_URL
```

**Value**: Your Render PostgreSQL connection string
**Example**: `postgresql://user:pass@hostname.render.com:5432/dbname?sslmode=require`
**Where to get it**: Render Dashboard → PostgreSQL → Connection String (Internal)
**⚠️ MUST include**: `?sslmode=require` at the end

---

### 2. Authentication Secret

```bash
NEXTAUTH_SECRET
```

**Value**: Random 32+ character string
**Generate it**:

```bash
openssl rand -base64 32
```

**Example output**: `Bx5JKl9mZ3Vp2QwR8TnY4uI1oP6vC7dE8fA9bG0hH3jK5lM`
**⚠️ DON'T use**: "change-me" or any default value

---

### 3. App URLs

```bash
NEXTAUTH_URL
NEXT_PUBLIC_APP_URL
```

**Values**:

```bash
NEXTAUTH_URL=https://shifaalhind.com
NEXT_PUBLIC_APP_URL=https://shifaalhind.com
```

**⚠️ IMPORTANT**:

- Use HTTPS (not HTTP)
- Use your actual Render domain
- NO trailing slash

---

### 4. App Configuration

```bash
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_DEFAULT_LOCALE
```

**Values**:

```bash
NEXT_PUBLIC_APP_NAME="Shifa AlHind"
NEXT_PUBLIC_DEFAULT_LOCALE="en"
```

---

## 📧 RECOMMENDED (For Full Functionality)

### 5. Email Service (Contact Forms)

```bash
RESEND_API_KEY
RESEND_FROM_EMAIL
ADMIN_NOTIFICATION_EMAIL
```

**Get Resend API Key**: https://resend.com
**Values**:

```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="Shifa AlHind <noreply@shifaalhind.com>"
ADMIN_NOTIFICATION_EMAIL="admin@shifaalhind.com"
```

**If not set**: Contact forms won't send emails (but will still work)

---

### 6. Analytics (Track Visitors)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_GTM_ID
```

**Google Analytics**: https://analytics.google.com
**Google Tag Manager**: https://tagmanager.google.com
**Values**:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

**If not set**: No visitor tracking

---

## 🔧 OPTIONAL (Nice to Have)

### 7. Social Media Links

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_FACEBOOK_URL
NEXT_PUBLIC_INSTAGRAM_URL
```

**Values**:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER="+918012345678"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/shifaalhind"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/shifaalhind"
```

---

### 8. Error Tracking

```bash
NEXT_PUBLIC_SENTRY_DSN
```

**Get from**: https://sentry.io
**If not set**: No error tracking in production

---

## 📋 How to Add Variables on Render

1. **Go to Render Dashboard**
2. **Click on your service** (shifa-alhind)
3. **Click "Environment"** in left sidebar
4. **Click "Add Environment Variable"**
5. **Enter Key** (e.g., `DATABASE_URL`)
6. **Enter Value** (the actual value)
7. **Click "Save Changes"**
8. **Redeploy** your service

---

## ✅ Verification Checklist

After adding variables:

- [ ] DATABASE_URL is set and includes `?sslmode=require`
- [ ] NEXTAUTH_SECRET is set (32+ characters, NOT "change-me")
- [ ] NEXTAUTH_URL is `https://shifaalhind.com` (or your custom domain)
- [ ] NEXT_PUBLIC_APP_URL matches NEXTAUTH_URL
- [ ] NEXT_PUBLIC_APP_NAME is set
- [ ] NEXT_PUBLIC_DEFAULT_LOCALE is "en"
- [ ] (Optional) RESEND_API_KEY is set for emails
- [ ] (Optional) Google Analytics IDs are set
- [ ] Service is redeployed after adding variables

---

## 🚨 Common Mistakes

### ❌ DON'T DO THIS:

```bash
# Wrong - using localhost in production
NEXTAUTH_URL="http://localhost:3000"

# Wrong - missing SSL mode
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Wrong - using default secret
NEXTAUTH_SECRET="change-me"

# Wrong - trailing slash
NEXT_PUBLIC_APP_URL="https://shifaalhind.com/"

# Wrong - HTTP instead of HTTPS
NEXTAUTH_URL="http://shifaalhind.com"
```

### ✅ DO THIS:

```bash
# Correct - using production domain
NEXTAUTH_URL="https://shifaalhind.com"

# Correct - includes SSL mode
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# Correct - strong random secret
NEXTAUTH_SECRET="Bx5JKl9mZ3Vp2QwR8TnY4uI1oP6vC7dE8fA9bG0hH3jK5lM"

# Correct - no trailing slash
NEXT_PUBLIC_APP_URL="https://shifaalhind.com"

# Correct - HTTPS
NEXTAUTH_URL="https://shifaalhind.com"
```

---

## 🔍 How to Check if Variables are Set

**Method 1: Render Dashboard**

- Go to Environment tab
- You should see all variables listed
- Click "reveal" to see values

**Method 2: Check Logs**
If a variable is missing, you'll see errors like:

```bash
# Missing DATABASE_URL
❌ Can't reach database server

# Missing NEXTAUTH_SECRET
❌ NEXTAUTH_SECRET environment variable is not set

# Wrong NEXTAUTH_URL
❌ OAuth redirect failed
```

**Method 3: Test the Site**

- Homepage loads → URLs are correct
- Admin login works → NEXTAUTH_SECRET is correct
- Contact form sends email → RESEND_API_KEY is correct
- Database queries work → DATABASE_URL is correct

---

## 📞 Quick Reference Card

**Copy this and keep handy:**

```bash
# REQUIRED - Must Have
DATABASE_URL="<from Render PostgreSQL dashboard>?sslmode=require"
NEXTAUTH_SECRET="<run: openssl rand -base64 32>"
NEXTAUTH_URL="https://shifaalhind.com"
NEXT_PUBLIC_APP_URL="https://shifaalhind.com"
NEXT_PUBLIC_APP_NAME="Shifa AlHind"
NEXT_PUBLIC_DEFAULT_LOCALE="en"

# RECOMMENDED - Should Have
RESEND_API_KEY="<from resend.com>"
RESEND_FROM_EMAIL="Shifa AlHind <noreply@shifaalhind.com>"
ADMIN_NOTIFICATION_EMAIL="admin@shifaalhind.com"
NEXT_PUBLIC_GA_MEASUREMENT_ID="<from analytics.google.com>"

# OPTIONAL - Nice to Have
NEXT_PUBLIC_WHATSAPP_NUMBER="+918012345678"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/shifaalhind"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/shifaalhind"
```

---

**Last Updated**: 2025-10-10
**Status**: Use this checklist BEFORE deploying to production
