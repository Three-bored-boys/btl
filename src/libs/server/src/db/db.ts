import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { type Context } from "hono";
import { type Environment } from "@/root/bindings";

const createClient = function (c: Context<Environment>) {
  const connectionString = c.env.DATABASE_URL;

  const client = neon(connectionString, { fetchOptions: { timeout: 30000 } });
  return client;
};

export const db = function (c: Context<Environment>) {
  const client = createClient(c);
  const dbInstance = drizzle(client);

  return dbInstance;
};
