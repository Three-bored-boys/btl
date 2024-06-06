import { config } from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

config({ path: ".dev.vars" });

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const db = drizzle(postgres(process.env.DATABASE_URL!));

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const migrationClient = drizzle(postgres(process.env.DATABASE_URL!, { max: 1 }));
