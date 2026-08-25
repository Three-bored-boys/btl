import { userBooks, books } from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

const db = drizzle(postgres(connectionString));

const main = async function () {
  try {
    console.log(connectionString);
    const allBooks = await db
      .select({ bookId: books.id, bookIsbn13: books.isbn13, bookIsbn10: books.isbn10 })
      .from(books);
    const allUserBooks = await db.select({ userBookId: userBooks.id, userBookIsbn: userBooks.isbn }).from(userBooks);

    const settledUpdatePromises = await Promise.allSettled(
      allUserBooks.map(async (userBookObj) => {
        const bookObjWithIsbn = allBooks.find(
          (booksObj) =>
            booksObj.bookIsbn10 === userBookObj.userBookIsbn || booksObj.bookIsbn13 === userBookObj.userBookIsbn,
        );

        if (!bookObjWithIsbn) {
          console.log(`No book with ISBN ${userBookObj.userBookIsbn} is in the books table`);
          throw new Error(`No book with ISBN ${userBookObj.userBookIsbn} is in the books table`);
        }

        const { bookId } = bookObjWithIsbn;

        await db.update(userBooks).set({ bookId }).where(eq(userBooks.id, userBookObj.userBookId));

        return userBookObj.userBookId;
      }),
    );

    console.log(settledUpdatePromises);
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
};

void main();
