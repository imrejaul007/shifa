#!/bin/bash
cd "/Users/rejaulkarim/Documents/Shifa Al Hind/shifa-alhind"

echo "🔧 Pushing render.yaml fix..."
git add render.yaml
git commit -m "fix: Remove rootDir from render.yaml - code is at repo root"
git push origin main

echo ""
echo "✅ Fix pushed to GitHub!"
echo ""
echo "🔄 Render will now automatically:"
echo "   1. Detect the push"
echo "   2. Start a new deployment"
echo "   3. Find the code at root level (no subdirectory)"
echo "   4. Build and deploy successfully! 🚀"
echo ""
echo "📺 Monitor at: https://dashboard.render.com/"
