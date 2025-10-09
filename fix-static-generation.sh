#!/bin/bash

echo "🔧 Fixing static generation database errors..."

# Create a helper file for safe database queries
cat > src/lib/safe-db.ts << 'EOF'
import { prisma } from './prisma';

/**
 * Safe database query for static generation
 * Returns empty array if database is not available (build time)
 */
export async function safeQuery<T>(
  query: () => Promise<T[]>,
  fallback: T[] = []
): Promise<T[]> {
  try {
    return await query();
  } catch (error) {
    if (process.env.NODE_ENV === 'production' || process.env.CI) {
      // During build on Render/CI, return empty array
      console.warn('Database not available during build, using fallback');
      return fallback;
    }
    // In development, throw the error
    throw error;
  }
}

export { prisma };
EOF

echo "✅ Created safe-db helper"
echo "📝 Manual fix required: Update generateStaticParams to use safeQuery"
echo ""
echo "Example:"
echo "  import { safeQuery } from '@/lib/safe-db';"
echo "  const doctors = await safeQuery(() => prisma.doctor.findMany({ select: { slug: true } }));"
