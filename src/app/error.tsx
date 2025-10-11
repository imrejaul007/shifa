'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error details for debugging
    console.error('Global error caught:', error);
    console.error('Error digest:', error.digest);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 rounded-full mb-6"
        >
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </motion.div>

        {/* Message */}
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Please try refreshing the page.
        </p>

        {/* Error Details (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-left max-w-lg mx-auto">
            <p className="text-sm font-mono text-red-600 break-all mb-2">{error.message}</p>
            {error.digest && (
              <p className="text-xs font-mono text-red-500">Error Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-full hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
