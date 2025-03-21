import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const createClient = function () {
  const connectionString = process.env.DATABASE_URL;

  const client = postgres(connectionString);
  return client;
};

export const db = drizzle(createClient());
