# Shifa AlHind - Deployment Guide

**Production Deployment Guide for Medical Tourism Platform**

This guide covers deploying the Shifa AlHind platform to production on various hosting platforms.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Setup](#database-setup)
3. [Deploy to Vercel (Recommended)](#deploy-to-vercel-recommended)
4. [Deploy to Netlify](#deploy-to-netlify)
5. [Deploy to AWS](#deploy-to-aws)
6. [Deploy to DigitalOcean](#deploy-to-digitalocean)
7. [Post-Deployment](#post-deployment)
8. [CI/CD Setup](#cicd-setup)
9. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Pre-Deployment Checklist

Before deploying to production, ensure you have:

### Code Preparation

- [ ] All code committed to Git repository (GitHub, GitLab, or Bitbucket)
- [ ] `.env` file NOT committed (listed in `.gitignore`)
- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] All linting errors resolved (`npm run lint`)
- [ ] Production build succeeds locally (`npm run build`)
- [ ] Database schema finalized (`prisma/schema.prisma`)

### Content & Data

- [ ] Database seeded with initial production data (`npm run db:seed`)
- [ ] Real hospital, doctor, and treatment data added
- [ ] Blog posts created
- [ ] About, Services, Contact pages completed
- [ ] All images optimized (WebP format, compressed)
- [ ] Default admin user created with secure password

### Configuration

- [ ] Production `DATABASE_URL` ready (Supabase/Railway/Neon)
- [ ] Strong `NEXTAUTH_SECRET` generated (`openssl rand -base64 32`)
- [ ] All environment variables documented in `.env.example`
- [ ] Production domain name purchased and DNS configured
- [ ] SSL certificate ready (usually auto-provided by hosting platform)

### Security

- [ ] All default passwords changed
- [ ] Admin credentials secure and documented
- [ ] CORS configured for production domain
- [ ] Rate limiting configured (if applicable)
- [ ] Security headers enabled
- [ ] File upload restrictions in place

### SEO & Analytics

- [ ] Google Search Console account created
- [ ] Google Analytics 4 property created
- [ ] Sitemap verified (`/sitemap.xml` accessible)
- [ ] Robots.txt verified (`/robots.txt` accessible)
- [ ] Meta tags reviewed for all pages
- [ ] Social media OpenGraph images added

---

## Database Setup

### Option 1: Supabase (Recommended - Free Tier Available)

**Why Supabase:**

- Free tier: 500MB database, 2GB bandwidth
- PostgreSQL with Prisma compatibility
- Built-in backups
- Dashboard for database management
- Good for startups

**Steps:**

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub

2. **Create Project**
   - Click "New Project"
   - Name: `shifa-alhind-prod`
   - Database Password: Generate strong password (save it!)
   - Region: Choose closest to your users (e.g., Singapore for GCC/India traffic)

3. **Get Connection String**
   - Go to Project Settings > Database
   - Copy "Connection string" (URI format)
   - Replace `[YOUR-PASSWORD]` with your database password
   - Example: `postgresql://postgres:YOUR_PASSWORD@db.abcdefghijk.supabase.co:5432/postgres`

4. **Configure Environment Variable**

   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.abcdefghijk.supabase.co:5432/postgres?pgbouncer=true"
   ```

5. **Initialize Database**

   ```bash
   # Set DATABASE_URL temporarily
   export DATABASE_URL="your-supabase-connection-string"

   # Push schema
   npx prisma db push

   # Generate Prisma Client
   npx prisma generate

   # Seed data
   npm run db:seed
   ```

### Option 2: Railway

**Why Railway:**

- Simple deployment
- Free $5/month credit
- PostgreSQL plugin with one click
- Good for small to medium projects

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL database
4. Copy `DATABASE_URL` from Variables tab
5. Use connection string in your deployment

### Option 3: Neon

**Why Neon:**

- Serverless PostgreSQL
- Free tier with 3GB storage
- Auto-scaling
- Great for modern apps

**Steps:**

1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Use in production deployment

### Option 4: AWS RDS

**For Enterprise/High-Traffic:**

- Most control and scalability
- Higher cost
- Requires AWS knowledge
- Best for >10,000 daily visitors

---

## Deploy to Vercel (Recommended)

**Best for Next.js applications. Zero-config deployment with excellent performance.**

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial production commit"

# Push to GitHub
gh repo create shifa-alhind --private --source=. --push
# or manually push to your GitHub/GitLab
```

### Step 2: Deploy to Vercel

#### Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Follow the prompts:

- Link to existing project? **No**
- Project name? **shifa-alhind**
- Directory? **./ (root)**
- Build settings? **Auto-detected (Next.js)**

#### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: **./ (leave as is)**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

### Step 3: Environment Variables

In Vercel Dashboard > Project > Settings > Environment Variables, add:

**Required:**

```env
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
NEXTAUTH_URL=https://shifaalhind.com
NEXTAUTH_SECRET=your-generated-secret-key
NEXT_PUBLIC_APP_URL=https://shifaalhind.com
NEXT_PUBLIC_APP_NAME=Shifa AlHind
```

**Optional (add as needed):**

```env
SENDGRID_API_KEY=SG.xxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
# ... other variables from .env.example
```

**Important:** Set environment for **Production**, **Preview**, and **Development**

### Step 4: Custom Domain

1. In Vercel Dashboard > Project > Settings > Domains
2. Add your domain: `shifaalhind.com` and `www.shifaalhind.com`
3. Configure DNS:
   - Type: **CNAME**
   - Name: **www**
   - Value: **cname.vercel-dns.com**

   - Type: **A**
   - Name: **@**
   - Value: **76.76.21.21**

4. Wait for DNS propagation (5-60 minutes)
5. SSL certificate auto-generated by Vercel

### Step 5: Build & Deploy

Vercel will automatically:

- Build your project
- Generate static pages
- Deploy to global CDN
- Provide deployment URL

### Step 6: Verify Deployment

- [ ] Visit `https://shifaalhind.com`
- [ ] Test English and Arabic pages
- [ ] Check `/sitemap.xml` loads
- [ ] Check `/robots.txt` loads
- [ ] Test booking form submission
- [ ] Login to admin dashboard
- [ ] Verify database connectivity

---

## Deploy to Netlify

**Alternative to Vercel with similar features.**

### Step 1: Build Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `20`

### Step 3: Environment Variables

In Netlify Dashboard > Site Settings > Environment Variables:

- Add all variables from `.env.example`
- Set `NEXTAUTH_URL` to your Netlify domain or custom domain

### Step 4: Custom Domain

1. Site Settings > Domain management
2. Add custom domain
3. Configure DNS (similar to Vercel)

---

## Deploy to AWS

**For enterprise applications with full control.**

### Architecture

- **Compute:** AWS Elastic Beanstalk or ECS (Docker)
- **Database:** AWS RDS (PostgreSQL)
- **Storage:** AWS S3 (media files)
- **CDN:** CloudFront
- **Domain:** Route 53

### Step 1: Create RDS Database

```bash
# Using AWS CLI
aws rds create-db-instance \
  --db-instance-identifier shifa-alhind-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password YOUR_SECURE_PASSWORD \
  --allocated-storage 20
```

### Step 2: Dockerize Application

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Create `docker-compose.yml` for local testing:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: shifa_alhind
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Step 3: Deploy to Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p docker shifa-alhind

# Create environment
eb create shifa-alhind-prod

# Set environment variables
eb setenv DATABASE_URL="postgresql://..." \
  NEXTAUTH_URL="https://shifaalhind.com" \
  NEXTAUTH_SECRET="your-secret"

# Deploy
eb deploy
```

### Step 4: Configure CloudFront CDN

1. Create CloudFront distribution
2. Origin: Your Elastic Beanstalk URL
3. Behavior: Cache static assets (`/_next/*`, `/images/*`)
4. Custom domain: shifaalhind.com
5. SSL certificate: AWS Certificate Manager

---

## Deploy to DigitalOcean

**Simple, cost-effective for small to medium projects.**

### Step 1: Create Droplet

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create > Droplets
3. Choose:
   - Image: **Ubuntu 22.04 LTS**
   - Plan: **Basic $12/month (2GB RAM)**
   - Datacenter: **Closest to target audience**

### Step 2: Initial Server Setup

```bash
# SSH into droplet
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2 (process manager)
npm install -g pm2
```

### Step 3: Setup Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE shifa_alhind;
CREATE USER shifa_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE shifa_alhind TO shifa_user;
\q
```

### Step 4: Deploy Application

```bash
# Clone repository
cd /var/www
git clone https://github.com/yourusername/shifa-alhind.git
cd shifa-alhind

# Install dependencies
npm install

# Create .env file
nano .env
# Paste your environment variables

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database
npm run db:seed

# Build application
npm run build

# Start with PM2
pm2 start npm --name "shifa-alhind" -- start
pm2 save
pm2 startup
```

### Step 5: Configure Nginx

```bash
nano /etc/nginx/sites-available/shifaalhind.com
```

Paste:

```nginx
server {
    listen 80;
    server_name shifaalhind.com www.shifaalhind.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
ln -s /etc/nginx/sites-available/shifaalhind.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 6: SSL Certificate

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d shifaalhind.com -d www.shifaalhind.com
```

---

## Post-Deployment

### 1. Submit Sitemap to Google

```bash
# Visit Google Search Console
https://search.google.com/search-console

# Add property: shifaalhind.com
# Verify ownership (DNS or HTML file)
# Submit sitemap: https://shifaalhind.com/sitemap.xml
```

### 2. Test All Features

- [ ] Homepage loads in English and Arabic
- [ ] Treatment pages load
- [ ] Doctor pages load
- [ ] Hospital pages load
- [ ] Package pages load
- [ ] Blog pages load
- [ ] GCC country pages load (all 6)
- [ ] Booking form submits successfully
- [ ] Admin login works
- [ ] Admin dashboard loads
- [ ] Images upload successfully
- [ ] Email notifications send (if configured)

### 3. Performance Testing

```bash
# Lighthouse audit
npx lighthouse https://shifaalhind.com --view

# Load testing with Artillery
npm install -g artillery
artillery quick --count 100 --num 10 https://shifaalhind.com
```

### 4. Security Scan

```bash
# OWASP ZAP or online tools
https://observatory.mozilla.org/
# Enter your domain and scan
```

### 5. Monitor Errors

If using Sentry:

```bash
# Errors will appear at:
https://sentry.io/organizations/YOUR_ORG/issues/
```

---

## CI/CD Setup

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

Add secrets in GitHub repository settings:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `VERCEL_TOKEN`
- `ORG_ID`
- `PROJECT_ID`

---

## Monitoring & Maintenance

### 1. Uptime Monitoring

**Options:**

- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

**Setup:**

- Monitor: `https://shifaalhind.com`
- Check interval: 5 minutes
- Alert via: Email, SMS, Slack

### 2. Error Tracking

**Sentry Setup:**

```bash
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

### 3. Analytics

**Google Analytics 4:**

- Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to environment variables
- Dashboard: https://analytics.google.com

### 4. Database Backups

**Supabase:**

- Automatic backups daily
- Manual backups: Project Settings > Database > Backups

**Self-hosted:**

```bash
# Daily backup cron job
0 2 * * * pg_dump shifa_alhind > /backups/db_$(date +\%Y\%m\%d).sql
```

### 5. Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update (carefully, test after)
npm update

# Security vulnerabilities
npm audit
npm audit fix
```

---

## Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Manual Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force  # Use with caution!
```

---

## Support & Troubleshooting

### Common Production Issues

1. **Database connection timeout**
   - Check DATABASE_URL is correct
   - Verify database is running
   - Check connection pool settings

2. **Build fails on deployment**
   - Run `npm run build` locally first
   - Check environment variables are set
   - Review build logs

3. **Images not loading**
   - Check S3/media configuration
   - Verify CORS settings
   - Check file permissions

4. **Slow performance**
   - Enable CDN caching
   - Optimize images
   - Add database indexes
   - Use ISR for dynamic pages

### Getting Help

- **Vercel Support:** support@vercel.com
- **Supabase Support:** https://supabase.com/dashboard/support
- **GitHub Issues:** Your repository issues page

---

## Cost Estimation

### Starter (< 1,000 visitors/month)

- **Vercel:** Free (Hobby plan)
- **Supabase:** Free (500MB database)
- **Domain:** $12/year
- **Total:** ~$1/month

### Small Business (1,000-10,000 visitors/month)

- **Vercel:** $20/month (Pro plan)
- **Supabase:** $25/month (Pro plan, 8GB database)
- **SendGrid:** Free (100 emails/day)
- **Domain:** $12/year
- **Total:** ~$46/month

### Medium Business (10,000-100,000 visitors/month)

- **Vercel:** $20/month
- **Supabase:** $25-100/month (based on usage)
- **CloudFront CDN:** $10/month
- **SendGrid:** $15/month (40k emails)
- **Total:** ~$70-145/month

### Enterprise (> 100,000 visitors/month)

- **AWS/DigitalOcean:** $200-500/month
- **RDS Database:** $50-200/month
- **CloudFront:** $50-100/month
- **Email/SMS:** $50-200/month
- **Total:** ~$350-1000/month

---

**Last Updated:** October 2025
**Next Review:** Before production launch

For detailed setup instructions, see [SETUP.md](./SETUP.md)
