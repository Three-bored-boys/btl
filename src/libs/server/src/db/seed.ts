import { userBooks, books } from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import { GoogleBooksService } from "@/server/services/google.service";

const connectionString = process.env.DATABASE_URL;

const db = drizzle(postgres(connectionString));

const main = async function () {
  try {
    console.log(connectionString);
    const allUserBooks = await db.select({ isbn: userBooks.isbn }).from(userBooks);
    const allUserBooksIsbn = allUserBooks.map((obj) => obj.isbn);
    console.log("all the isbn's: ", allUserBooksIsbn);

    const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
    const googleBooksService = new GoogleBooksService(googleBooksAPIKey);

    const settledInsertPromises = await Promise.allSettled(
      allUserBooksIsbn.map(async (isbn, i) => {
        const bookArray = await googleBooksService.getBookByISBN(isbn);

        if (bookArray.length === 0) {
          console.log(`Book with ISBN ${isbn} cannot be found`);
          throw new Error(`Book with ISBN ${isbn} cannot be found`);
        }

        const [book] = bookArray;

        await db
          .insert(books)
          .values(book)
          .onConflictDoUpdate({ target: [books.isbn13, books.isbn10], set: book });
        console.log("Book now inserted! ", book);

        console.log(`Seed for ${book.title ?? book.isbn13 ?? book.isbn10 ?? i.toString()} now complete`);

        return 0;
      }),
    );

    console.log(settledInsertPromises);
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
};

void main();
