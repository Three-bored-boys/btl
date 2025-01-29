import { db } from "./index";
import { users } from "./schema";

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
