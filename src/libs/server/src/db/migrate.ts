import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";

config({ path: ".env" });

const main = async () => {
  try {
    const connectionString = process.env.DATABASE_URL;
    console.log(connectionString);
    const migrationClient = drizzle(postgres(connectionString, { max: 1 }));
    await migrate(migrationClient, { migrationsFolder: "drizzle" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

void main();
