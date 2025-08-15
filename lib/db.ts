import { PrismaClient } from '@prisma/client';

// This is a special global variable that ensures we don't create a new PrismaClient
// instance every time the code changes during development with Next.js HMR.
// In a production environment, this variable will not be set.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Check if there is an existing global PrismaClient instance.
// If there is, use it. If not, create a new one.
export const prisma = global.prisma || new PrismaClient({
  // Log all database queries in development to help with debugging.
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// In development, we store the new PrismaClient instance on the global object.
// This prevents multiple connections to the database.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
