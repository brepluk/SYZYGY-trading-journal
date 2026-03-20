// Centralized Prisma client instance (shared across the app).
import "dotenv/config";
import prismaClientPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaClientPkg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment (.env)");
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });

