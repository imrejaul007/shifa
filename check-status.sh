#!/bin/bash
cd "/Users/rejaulkarim/Documents/Shifa Al Hind/shifa-alhind"

echo "🔍 Checking Git Status..."
echo ""

# Check if there are uncommitted changes
if git diff --quiet && git diff --staged --quiet; then
  echo "✅ No uncommitted changes - looks good!"
else
  echo "⚠️  You have uncommitted changes:"
  git status --short
fi

echo ""
echo "📊 Checking if pushed to GitHub..."
echo ""

# Check if local is ahead of remote
git fetch origin main 2>/dev/null

LOCAL=$(git rev-parse @ 2>/dev/null)
REMOTE=$(git rev-parse @{u} 2>/dev/null)
BASE=$(git merge-base @ @{u} 2>/dev/null)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "✅ Everything is pushed to GitHub!"
    echo "   Local and remote are in sync"
elif [ "$LOCAL" = "$BASE" ]; then
    echo "⚠️  Remote has changes you don't have locally"
    echo "   Run: git pull origin main"
elif [ "$REMOTE" = "$BASE" ]; then
    echo "❌ NOT PUSHED YET!"
    echo "   You have local commits that aren't on GitHub"
    echo ""
    echo "   Commits waiting to be pushed:"
    git log origin/main..HEAD --oneline
    echo ""
    echo "   To push now, run:"
    echo "   bash push-now.sh"
else
    echo "⚠️  Branches have diverged"
    echo "   You may need to resolve conflicts"
fi

echo ""
echo "📝 Last 3 commits on this branch:"
git log --oneline -3

echo ""
echo "🌐 Check on GitHub:"
echo "   https://github.com/imrejaul007/shifa"
