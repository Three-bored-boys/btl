import { userBooks } from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

const db = drizzle(postgres(connectionString));

const main = async function () {
  try {
    console.log(connectionString);
    const allUserBooks = await db.select({ isbn: userBooks.isbn }).from(userBooks);
    console.log(allUserBooks.map((obj) => obj.isbn));
    console.log("Seed complete");
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
};

void main();
