import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  // ⚠️ WARNING: These should be set to false in production after fixing all errors
  eslint: {
    // TODO: Fix all ESLint errors and set this to false before final production deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TODO: Fix all TypeScript errors and set this to false before final production deployment
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Production optimizations
  poweredByHeader: false,
  compress: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@tiptap/react'],
  },

  // Output configuration for serverless platforms
  output: 'standalone',
};

export default nextConfig;
