import { db } from "./index";
import { libraries } from "./schema";
import { bookLibraries } from "@/libs/shared/src/utils";

const main = async function () {
  try {
    const librariesTableEntry = bookLibraries.map((lib) => ({ libraryName: lib.name, libraryValue: lib.value }));
    await db.insert(libraries).values(librariesTableEntry);
    console.log("Seed complete");
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
  // const librariesTableEntry = bookLibraries.map((lib) => ({ libraryName: lib.name, libraryValue: lib.value }));
};

void main();
