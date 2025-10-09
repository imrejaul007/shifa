import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;

// Force Node.js runtime (bcryptjs requires Node.js APIs)
export const runtime = 'nodejs';
