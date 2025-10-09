#!/bin/bash

# Shifa AlHind - Git Setup and Deployment Script
# Run this script to push all fixes to GitHub and prepare for Render deployment

set -e  # Exit on any error

echo "🚀 Starting Shifa AlHind deployment setup..."
echo ""

# Navigate to project directory
cd "/Users/rejaulkarim/Documents/Shifa Al Hind/shifa-alhind"

# Check if .git exists
if [ -d ".git" ]; then
  echo "✅ Git repository already initialized"
else
  echo "📦 Initializing git repository..."
  git init
  echo "✅ Git initialized"
fi

echo ""
echo "📝 Staging all files..."
git add .

echo ""
echo "💾 Creating commit with all fixes..."
git commit -m "fix: Resolve NextAuth v5 import errors and update Render config

- Fixed 12 API routes to use NextAuth v5 syntax (auth() instead of getServerSession)
- Updated render.yaml with rootDir and Prisma migration commands
- Enhanced next.config.ts for production deployment
- Added comprehensive deployment documentation

Changes:
✅ src/app/api/v1/bookings/route.ts
✅ src/app/api/v1/bookings/[id]/route.ts
✅ src/app/api/v1/content/route.ts
✅ src/app/api/v1/content/[slug]/route.ts
✅ src/app/api/v1/doctors/route.ts
✅ src/app/api/v1/doctors/[slug]/route.ts
✅ src/app/api/v1/hospitals/route.ts
✅ src/app/api/v1/hospitals/[slug]/route.ts
✅ src/app/api/v1/packages/route.ts
✅ src/app/api/v1/packages/[slug]/route.ts
✅ src/app/api/v1/media/route.ts
✅ src/app/api/v1/media/upload/route.ts
✅ render.yaml
✅ next.config.ts
"

echo ""
echo "🔗 Connecting to GitHub remote..."
# Remove existing remote if any
git remote remove origin 2>/dev/null || true
# Add your GitHub remote
git remote add origin git@github.com:imrejaul007/shifa.git

echo ""
echo "⬆️  Pushing to GitHub (main branch)..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 IMPORTANT: Creating Prisma Migrations..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  This step is CRITICAL for Render deployment!"
echo ""

# Check if migrations already exist
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
  echo "✅ Prisma migrations already exist"
  echo "   Skipping migration creation..."
else
  echo "🔄 Creating initial Prisma migration..."
  npx prisma migrate dev --name init

  echo ""
  echo "💾 Committing migrations..."
  git add prisma/migrations
  git commit -m "feat: Add initial Prisma migration for production

- Created migration files for PostgreSQL schema
- Required for Render deployment (prisma migrate deploy)
"

  echo ""
  echo "⬆️  Pushing migrations to GitHub..."
  git push origin main

  echo ""
  echo "✅ Migrations pushed to GitHub!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 SUCCESS! Deployment Ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. ✅ All fixes committed and pushed to GitHub"
echo "2. ✅ Prisma migrations created and pushed"
echo ""
echo "3. 🔄 Render will now automatically:"
echo "   - Detect the push to main branch"
echo "   - Pull the latest code"
echo "   - Run: npm install"
echo "   - Run: npx prisma migrate deploy"
echo "   - Run: npm run build"
echo "   - Start your app"
echo ""
echo "4. ⚙️  Make sure these environment variables are set in Render:"
echo "   - NEXTAUTH_URL (your production URL)"
echo "   - NEXT_PUBLIC_APP_URL (your production URL)"
echo "   - DATABASE_URL (auto-configured ✓)"
echo "   - NEXTAUTH_SECRET (auto-generated ✓)"
echo ""
echo "5. 📊 Monitor your deployment at:"
echo "   https://dashboard.render.com/"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Your Shifa AlHind app should deploy successfully now!"
echo ""
