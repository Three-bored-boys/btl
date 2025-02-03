import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const db = drizzle(postgres(process.env.DATABASE_URL!));
