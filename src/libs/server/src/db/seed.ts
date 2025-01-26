import { db } from "./index";
import { libraries } from "./schema";

const main = async function () {
  try {
    await db.delete(libraries);
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
  // const librariesTableEntry = bookLibraries.map((lib) => ({ libraryName: lib.name, libraryValue: lib.value }));
};

void main();
