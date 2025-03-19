import { users } from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";

config({ path: ".dev.vars" });

const db = function () {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw Error("Database URL not provided");
  }
  return drizzle(postgres(connectionString));
};

const main = async function () {
  try {
    await db()
      .insert(users)
      .values([{ emailAddress: "goat@goat.com", userName: "goat", hashedPassword: "goat" }]);
    console.log("Seed complete");
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
};

void main();
