/* import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const createClient = function () {
  const connectionString = process.env.DATABASE_URL;

  const client = neon(connectionString, { fetchOptions: { timeout: 30000 } });
  return client;
};

export const db = drizzle(createClient());
 */

/* import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const createClient = function () {
  const connectionString = process.env.DATABASE_URL;

  const client = postgres(connectionString);
  return client;
};

export const db = drizzle(createClient()); */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Fix for "sorry, too many clients already"
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase | undefined;
}

let db: PostgresJsDatabase;

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DATABASE_URL));
} else {
  if (!global.db) global.db = drizzle(postgres(process.env.DATABASE_URL));

  db = global.db;
}

export { db };
