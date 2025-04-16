import { prisma } from "../config/dbConfig";

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    // Prisma doesn't require an explicit "initialize" like TypeORM,
    // but we can test the connection by running a simple query
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};