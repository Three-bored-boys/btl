import { users } from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL;

const db = drizzle(postgres(connectionString));

const main = async function () {
  try {
    await db.insert(users).values([{ emailAddress: "goat@goat.com", userName: "goat", hashedPassword: "goat" }]);
    console.log("Seed complete");
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
};

void main();
