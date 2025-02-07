import { users } from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";

config({ path: ".dev.vars" });

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const db = drizzle(postgres(process.env.DATABASE_URL!));

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
