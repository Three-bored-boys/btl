import { drizzle } from "drizzle-orm/neon-serverless";
import { Client as neonClient, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { type Context } from "hono";
import { type Environment } from "@/root/bindings";

const createClient = function (c: Context<Environment>) {
  let connectionString = c.env.DATABASE_URL;

  if (c.env.ENVIRONMENT === "development") {
    connectionString = c.env.DATABASE_URL_DEV;
    neonConfig.fetchEndpoint = (host) => {
      const [protocol, port] = host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
      return `${protocol}://${host}:${port.toString()}/sql`;
    };
    const connectionStringUrl = new URL(connectionString);
    neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== "db.localtest.me";
    neonConfig.wsProxy = (host) => (host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`);
  }
  neonConfig.webSocketConstructor = ws;

  const client = new neonClient({ connectionString });
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
