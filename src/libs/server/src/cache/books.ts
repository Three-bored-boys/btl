import { unstable_cache } from "next/cache";
import { NYTimesService } from "@/server/services/ny-times.service";
import { BestSeller, GoodResponse, Book } from "@/shared/types";
import { db } from "@/server/db/db";
import { eq, or } from "drizzle-orm";
import { books } from "@/shared/db/schema";
import { GoogleBooksService } from "@/server/services/google.service";
import { OpenLibraryService } from "@/server/services/open-library.service";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const nytBestSellers = async function () {
  const nytBooksAPIKey = process.env.NY_TIMES_BOOKS_API_KEY;
  const nytService = new NYTimesService(nytBooksAPIKey);
  const bestSellers = await nytService.getBestSellers();

  if (bestSellers.length === 0) {
    throw new Error("Trouble getting NYT Best Sellers List");
  }

  const responseData: GoodResponse<BestSeller[]> = { success: true, data: bestSellers };
  return responseData;
};

export const cacheNYTBestSellers = unstable_cache(nytBestSellers, ["nyt-best-sellers"], { revalidate: 604800 });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const booksByGenre = async function (genre: string) {
  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);
  const returnedValue = await googleBooksService.getBooksByAllParameters({
    searchObject: { genre },
    paginationObject: { maxResults: (6).toString() },
  });

  const validBooksWithIsbn = returnedValue.books.filter((book) => book.isbn10 !== null && book.isbn13 !== null);

  if (validBooksWithIsbn.length === 0) {
    throw new Error(`Trouble getting valid books of genre: ${genre}`);
  }

  const responseData: GoodResponse<Book[]> = {
    success: true,
    data: validBooksWithIsbn,
  };

  return responseData;
};

export const cacheBooksByGenre = unstable_cache(booksByGenre, ["books-genre"], { revalidate: 259200 });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bookByISBN = async function (isbn: string) {
  let book: Book[];

  const arrBookWithIsbn = await db
    .select()
    .from(books)
    .where(or(eq(books.isbn10, isbn), eq(books.isbn13, isbn)));

  if (arrBookWithIsbn.length !== 0) {
    const [bookWithIsbn] = arrBookWithIsbn;
    const { id, ...book } = bookWithIsbn;
    const responseData: GoodResponse<Book> = { success: true, data: book };
    return responseData;
  }

  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);
  book = await googleBooksService.getBookByISBN(isbn);

  if (book.length === 0) {
    const openLibraryService = new OpenLibraryService();
    book = await openLibraryService.getBookByISBN(isbn);
  }

  if (book.length === 0) {
    throw new Error("The book you are currently looking for could not be found.");
  }

  const [bookObj] = book;

  const responseData: GoodResponse<Book> = { success: true, data: bookObj };
  return responseData;
};

export const cacheBookByISBN = unstable_cache(bookByISBN, ["book-isbn"], { revalidate: 604800 });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
