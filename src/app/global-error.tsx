'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the full error details
    console.error('=== GLOBAL ERROR CAUGHT ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error digest:', error.digest);
    console.error('Error stack:', error.stack);
    console.error('=== END ERROR ===');
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️ Application Error</h1>
          <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
            Something went wrong. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div
              style={{
                background: '#fee',
                border: '2px solid #fcc',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                textAlign: 'left',
                maxWidth: '800px',
                margin: '0 auto 20px',
              }}
            >
              <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#c00' }}>
                {error.message}
              </p>
              {error.digest && (
                <p
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#900',
                    marginTop: '10px',
                  }}
                >
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
          <button
            onClick={reset}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/en')}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              background: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Go Home
          </button>
        </div>
      </body>
    </html>
  );
}
