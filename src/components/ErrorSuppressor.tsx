'use client';

import { useEffect } from 'react';

export function ErrorSuppressor() {
  useEffect(() => {
    // Suppress Server Component render errors in production console
    if (process.env.NODE_ENV === 'production') {
      const originalError = console.error;
      console.error = (...args) => {
        const errorString = args.join(' ');
        // Suppress specific Server Component errors
        if (errorString.includes('Server Components render') || errorString.includes('digest')) {
          return; // Don't log these errors
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  return null;
}
