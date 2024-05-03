import { PrismaClient } from "@prisma/client";
import "dotenv/config";

import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

// "postgresql://docker:docker123@localhost:5432/apisolid?schema=public"
const prisma = new PrismaClient();
function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("shecma", schema);

  return url.toString();
}

export default <Environment>(<unknown>{
  name: "prsima",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const dataBaseURL = generateDataBaseURL(schema);

    process.env.DATABASE_URL = dataBaseURL;
    // deploy : jump into executation of migrations
    execSync("npx prisma migrate deploy");
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );
        await prisma.$disconnect();
      },
    };
  },
});
