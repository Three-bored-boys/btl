import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationClient } from "./index";

const main = async () => {
  try {
    await migrate(migrationClient, { migrationsFolder: "drizzle" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
