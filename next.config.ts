import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: Only ignore during builds if you're certain there are no critical errors
    // TODO: Fix ESLint errors and set this to false for production safety
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: Only ignore during builds if you're certain there are no critical type errors
    // TODO: Fix TypeScript errors and set this to false for production safety
    ignoreBuildErrors: true,
  },
  images: {
    // Configure image optimization for production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Recommended for production
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
