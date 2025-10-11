export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side error handling
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Log full error details in production
      if (args[0] && typeof args[0] === 'object' && args[0].digest) {
        console.log('=== DETAILED ERROR ===');
        console.log('Error object:', JSON.stringify(args[0], null, 2));
        console.log('Error type:', args[0].constructor.name);
        console.log('Error message:', args[0].message);
        console.log('Error digest:', args[0].digest);
        if (args[0].stack) {
          console.log('Error stack:', args[0].stack);
        }
        console.log('=== END ERROR ===');
      }
      originalConsoleError.apply(console, args);
    };
  }
}
