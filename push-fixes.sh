#!/bin/bash

# Smart Push Script - Only pushes the fixes made by Claude
# For existing git repository

set -e

echo "🔍 Checking git status..."
cd "/Users/rejaulkarim/Documents/Shifa Al Hind/shifa-alhind"

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "❌ Git not initialized. Initializing now..."
  git init
  git remote add origin git@github.com:imrejaul007/shifa.git
  git branch -M main
fi

echo ""
echo "📊 Current changes:"
git status --short

echo ""
echo "📝 Files I modified (NextAuth fixes + config updates):"
echo "   ✅ src/app/api/v1/bookings/route.ts"
echo "   ✅ src/app/api/v1/bookings/[id]/route.ts"
echo "   ✅ src/app/api/v1/content/route.ts"
echo "   ✅ src/app/api/v1/content/[slug]/route.ts"
echo "   ✅ src/app/api/v1/doctors/route.ts"
echo "   ✅ src/app/api/v1/doctors/[slug]/route.ts"
echo "   ✅ src/app/api/v1/hospitals/route.ts"
echo "   ✅ src/app/api/v1/hospitals/[slug]/route.ts"
echo "   ✅ src/app/api/v1/packages/route.ts"
echo "   ✅ src/app/api/v1/packages/[slug]/route.ts"
echo "   ✅ src/app/api/v1/media/route.ts"
echo "   ✅ src/app/api/v1/media/upload/route.ts"
echo "   ✅ render.yaml"
echo "   ✅ next.config.ts"
echo ""

echo "⚙️  Staging only the modified files..."
# Stage only the files I actually changed
git add src/app/api/v1/bookings/route.ts
git add src/app/api/v1/bookings/\[id\]/route.ts
git add src/app/api/v1/content/route.ts
git add src/app/api/v1/content/\[slug\]/route.ts
git add src/app/api/v1/doctors/route.ts
git add src/app/api/v1/doctors/\[slug\]/route.ts
git add src/app/api/v1/hospitals/route.ts
git add src/app/api/v1/hospitals/\[slug\]/route.ts
git add src/app/api/v1/packages/route.ts
git add src/app/api/v1/packages/\[slug\]/route.ts
git add src/app/api/v1/media/route.ts
git add src/app/api/v1/media/upload/route.ts
git add render.yaml
git add next.config.ts

# Also add the documentation files I created
git add BUILD_FIXES_APPLIED.md 2>/dev/null || true
git add RENDER_DEPLOYMENT_GUIDE.md 2>/dev/null || true
git add PUSH_TO_GITHUB.md 2>/dev/null || true
git add deploy.sh 2>/dev/null || true
git add push-fixes.sh 2>/dev/null || true

echo ""
echo "💾 Committing changes..."
git commit -m "fix: Update NextAuth v5 imports in all API routes

🐛 Bug Fixes:
- Fixed 12 API route files using old NextAuth v4 syntax
- Changed from 'import { auth } from next-auth' to 'import { auth } from @/lib/auth'
- Changed from 'auth(authOptions)' to 'auth()'

⚙️ Configuration Updates:
- render.yaml: Added rootDir and Prisma migration commands
- next.config.ts: Enhanced production settings (image optimization, security)

📚 Documentation:
- Added comprehensive deployment guides
- Added troubleshooting documentation

This fixes the Render build error:
'Attempted import error: getServerSession is not exported from next-auth'
"

echo ""
echo "🔄 Pulling latest changes from GitHub..."
git pull origin main --rebase || echo "⚠️  No remote changes to pull"

echo ""
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ SUCCESS! Fixes pushed to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎯 Next: Creating Prisma migrations..."
echo ""

# Check if migrations already exist
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "✅ Prisma migrations already exist"
  echo "   Location: prisma/migrations/"
  ls -la prisma/migrations/
else
  echo "⚠️  No migrations found. Creating now..."
  echo ""
  npx prisma migrate dev --name init

  echo ""
  echo "💾 Committing migrations..."
  git add prisma/migrations
  git commit -m "feat: Add initial Prisma migration

- Created migration files for production deployment
- Required for 'prisma migrate deploy' on Render
"

  echo ""
  echo "⬆️  Pushing migrations..."
  git push origin main

  echo ""
  echo "✅ Migrations pushed!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 DEPLOYMENT READY!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 What was pushed:"
echo "   ✅ 12 API routes (NextAuth v5 fixes)"
echo "   ✅ render.yaml (deployment config)"
echo "   ✅ next.config.ts (production settings)"
echo "   ✅ Prisma migrations (database schema)"
echo "   ✅ Documentation files"
echo ""
echo "🔄 Render will now automatically:"
echo "   1. Detect the push"
echo "   2. Pull latest code"
echo "   3. Run npm install"
echo "   4. Run prisma migrate deploy"
echo "   5. Run npm run build (should succeed now! ✅)"
echo "   6. Deploy your app"
echo ""
echo "📺 Monitor deployment at: https://dashboard.render.com/"
echo ""
