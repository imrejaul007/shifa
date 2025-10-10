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

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // HSTS - Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // XSS Protection
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@tiptap/react'],
  },

  // Output configuration for serverless platforms
  output: 'standalone',
};

export default nextConfig;
