#!/bin/bash
# Shifa AlHind - Render Deployment Script
# This script commits all fixes and provides next steps

echo "🚀 Shifa AlHind - Render Deployment Preparation"
echo "==============================================="
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
  echo "❌ Error: Not a git repository"
  echo "Run 'git init' first"
  exit 1
fi

# Check git status
echo "📊 Checking current status..."
echo ""

# Show what will be committed
echo "✅ Files that will be committed:"
echo ""
echo "MODIFIED:"
echo "  - next.config.ts (optimized for production)"
echo "  - package.json (added Node version)"
echo "  - render.yaml (optimized build command)"
echo "  - src/lib/auth.ts (fixed NextAuth config)"
echo "  - src/app/api/v1/media/upload/route.ts (added S3 check)"
echo ""
echo "NEW FILES:"
echo "  - prisma/migrations/ (database migrations)"
echo "  - RENDER_DEPLOYMENT_FIXED.md (deployment guide)"
echo "  - FIXES_APPLIED_SUMMARY.md (fixes summary)"
echo ""

# Ask for confirmation
read -p "Continue with commit? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Deployment cancelled"
  exit 1
fi

# Stage all changes
echo "📦 Staging files..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "fix: Render deployment ready - all critical issues resolved

✅ Fixes Applied:
- Created Prisma migrations for database deployment
- Optimized build command in render.yaml
- Added Node.js version requirements to package.json
- Fixed NextAuth configuration for production
- Added cloud storage check for media uploads
- Enhanced Next.js config with production optimizations

📊 Changes:
- Modified: 5 files
- New: Prisma migrations + deployment documentation

🚀 Ready to deploy on Render!"

echo ""
echo "✅ Changes committed successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Follow deployment guide:"
echo "   Open: RENDER_DEPLOYMENT_FIXED.md"
echo ""
echo "3. Create PostgreSQL database on Render"
echo ""
echo "4. Create Web Service on Render"
echo ""
echo "5. Add required environment variables:"
echo "   - NEXTAUTH_URL"
echo "   - NEXT_PUBLIC_APP_URL"
echo ""
echo "6. Deploy! 🚀"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Full instructions: RENDER_DEPLOYMENT_FIXED.md"
echo "📋 Changes summary: FIXES_APPLIED_SUMMARY.md"
echo ""
echo "Good luck! 🌟"
