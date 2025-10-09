#!/bin/bash

# Fix NextAuth v5 imports in all API routes
# Replace getServerSession with auth
# Remove authOptions imports

cd "$(dirname "$0")"

# Find all route.ts files in api/v1
find src/app/api/v1 -name "route.ts" -type f | while read file; do
  echo "Processing: $file"

  # Replace getServerSession with auth
  perl -pi -e 's/getServerSession/auth/g' "$file"

  # Replace import from next-auth to @/lib/auth
  perl -pi -e "s/import { auth } from 'next-auth';/import { auth } from '\@\/lib\/auth';/g" "$file"

  # Remove authOptions import line
  perl -pi -e 's/^import { authOptions } from .*;\n//g' "$file"

  # Replace await auth(authOptions) with await auth() if any remain
  perl -pi -e 's/await auth\(authOptions\)/await auth()/g' "$file"
done

echo "Done! All API routes updated for NextAuth v5"
