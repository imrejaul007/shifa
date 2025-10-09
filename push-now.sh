#!/bin/bash
cd "/Users/rejaulkarim/Documents/Shifa Al Hind/shifa-alhind"
git add .
git commit -m "fix: Resolve NextAuth v5 imports and ESLint errors

- Updated 12 API routes from NextAuth v4 to v5 syntax
- Fixed TypeScript 'any' type errors (proper type definitions)
- Fixed unused variable warnings in media upload
- Updated render.yaml with rootDir and Prisma migrations
- Enhanced next.config.ts for production deployment"
git push origin main
echo ""
echo "✅ Successfully pushed to GitHub!"
