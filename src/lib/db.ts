import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Always create a fresh client in dev so newly-added models are picked up
// after `prisma generate`. In production, reuse the cached instance.
export const db =
  process.env.NODE_ENV === 'production'
    ? (globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] }))
    : new PrismaClient({ log: ['error'] })

if (process.env.NODE_ENV === 'production') globalForPrisma.prisma = db