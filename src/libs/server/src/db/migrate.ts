import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
// import path from "path";

config({ path: ".dev.vars" });

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const databaseUrl = drizzle(postgres(`${process.env.DATABASE_URL}`, { max: 1 }));

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: "drizzle" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
