import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const createClient = function () {
  const connectionString = process.env.DATABASE_URL!;

  const client = neon(connectionString, { fetchOptions: { timeout: 30000 } });
  return client;
};

export const db = drizzle(createClient());
