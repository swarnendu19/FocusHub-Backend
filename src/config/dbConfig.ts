import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
export const prisma = new PrismaClient({
  // Optional: Configure logging or other options
  log: ["query", "info", "warn", "error"],
});