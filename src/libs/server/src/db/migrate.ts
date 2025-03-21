import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const main = async () => {
  try {
    const connectionString = process.env.DATABASE_URL;
    const migrationClient = drizzle(postgres(connectionString, { max: 1 }));
    await migrate(migrationClient, { migrationsFolder: "drizzle" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

void main();
