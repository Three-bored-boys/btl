import { Hono } from "hono";
import genresList from "../../data/genres.json";
import { GoogleBooksService } from "../../services/google.service";
import { NYTimesService } from "../../services/ny-times.service";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { BadResponse, GoodResponse, Genres, BestSeller, Book } from "../../types";

const books = new Hono();

books.get("/best-sellers", async (c) => {
  const nytService = new NYTimesService(process.env.NY_TIMES_BOOKS_API_KEY);
  const bestSellers = await nytService.getBestSellers();

  if (bestSellers.length === 0) {
    const responseData: BadResponse = { success: false, error: "Trouble getting NYT Best Sellers List" };
    return c.json(responseData, 400);
  }

  const responseData: GoodResponse<BestSeller[]> = { success: true, data: bestSellers };
  c.header("Cache-Control", "max-age=259200, must-revalidate");
  return c.json(responseData);
});

books.get("/genres", (c) => {
  const genres = genresList.filter((genObj) => genObj.name !== "Non-fiction");
  const responseData: GoodResponse<Genres> = { success: true, data: { genres, count: genres.length } };
  return c.json(responseData);
});

books.get(
  "/genres/:genre",
  zValidator(
    "param",
    z.object({
      genre: z
        .string()
        .min(1)
        .refine((val) => val !== "null" && val !== "undefined"),
    }),
    (result, c) => {
      if (!result.success) {
        const responseData: BadResponse = { success: false, error: "Invalid Input" };
        return c.json(responseData, 404);
      }
    },
  ),
  async (c) => {
    const { genre } = c.req.valid("param");

    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
    const books = await googleBooksService.getBooksByGenre(genre);

    const responseData: GoodResponse<Book[]> = {
      success: true,
      data: books.filter((book) => book.isbn10 !== "" && book.isbn13 !== ""),
    };

    return c.json(responseData);
  },
);

books.get(
  "/:isbn",
  zValidator(
    "param",
    z.object({
      isbn: z
        .string()
        .min(10)
        .max(13)
        .refine((val) => Number.isFinite(+val)),
    }),
    (result, c) => {
      if (!result.success) {
        const responseData: BadResponse = { success: false, error: "Invalid ISBN entry" };
        return c.json(responseData, 400);
      }
    },
  ),
  async (c) => {
    const isbn = c.req.param("isbn");
    if (!isbn) {
      const responseData: BadResponse = { success: false, error: "ISBN is required" };
      return c.json(responseData, 400);
    }

    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
    const book = await googleBooksService.getBookByISBN(isbn);

    if (!book) {
      const responseData: BadResponse = { success: false, error: "Book not found" };
      return c.json(responseData, 400);
    }

    const responseData: GoodResponse<Book> = { success: true, data: book };
    return c.json(responseData);
  },
);

books.get("/latest-books", async (c) => {
  const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
  const books = await googleBooksService.getLatestBooks();

  if (books.length === 0) {
    const responseData: BadResponse = { success: false, error: "Trouble getting books" };
    return c.json(responseData, 400);
  }

  const responseData: GoodResponse<Book[]> = { success: true, data: books };
  return c.json(responseData);
});

export default books;
