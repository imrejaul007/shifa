'use client';

import { Component, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log in development to avoid console spam in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    // You can log to error reporting service here (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

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
              We encountered an unexpected error. Don&apos;t worry, our team has been notified and
              we&apos;re working on it.
            </p>

            {/* Error Details (dev only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-left max-w-lg mx-auto">
                <p className="text-sm font-mono text-red-600 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-full hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                Reload Page
              </button>

              <Link
                href="/en"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
              </Link>
            </div>

            {/* Support */}
            <p className="text-sm text-muted-foreground mt-8">
              Need immediate help?{' '}
              <Link href="/en/contact" className="text-accent hover:underline font-semibold">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  const handleError = (error: Error) => {
    console.error('Error handled:', error);
    // Log to error reporting service
  };

  return { handleError };
}
