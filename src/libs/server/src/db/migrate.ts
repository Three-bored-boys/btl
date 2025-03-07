import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env" });

const main = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const migrationClient = drizzle(postgres(process.env.DATABASE_URL!, { max: 1 }));
    await migrate(migrationClient, { migrationsFolder: "drizzle" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

void main();
