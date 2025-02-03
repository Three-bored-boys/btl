import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { type Context } from "hono";
import { Environment } from "@/root/bindings";

const createClient = function (c: Context<Environment>) {
  const connectionString = c.env.DATABASE_URL;
  const client = new Client({ connectionString });
  return client;
};

export const useDB = async function <T>(
  c: Context<Environment>,
  callback: (db: ReturnType<typeof drizzle>) => Promise<T>,
) {
  const client = createClient(c);
  await client.connect();

  const dbInstance = drizzle(client);
  try {
    const result = await callback(dbInstance);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
};
