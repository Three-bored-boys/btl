import type { Config } from "drizzle-kit";

export default {
  schema: "./src/libs/server/src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
} satisfies Config;
