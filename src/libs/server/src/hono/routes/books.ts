import { Context, Hono } from "hono";
import genresList from "../../data/genres.json";
import { GoogleBooksService } from "../../services/google.service";
import { NYTimesService } from "../../services/ny-times.service";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { BadResponse, GoodResponse, Genres, BestSeller, Book } from "../../types";
import { Environment } from "@/root/bindings";
import { cache } from "hono/cache";

const books = new Hono<Environment>();

books.get(
  "/best-sellers",
  cache({
    cacheName: "best-sellers",
    cacheControl: "max-age=259200, must-revalidate, public",
  }),
  async (c) => {
    const nytService = new NYTimesService(c.env.NY_TIMES_BOOKS_API_KEY);
    const bestSellers = await nytService.getBestSellers();

    if (bestSellers.length === 0) {
      const responseData: BadResponse = { success: false, error: "Trouble getting NYT Best Sellers List" };
      return c.json(responseData, 400);
    }

    const responseData: GoodResponse<BestSeller[]> = { success: true, data: bestSellers };
    return c.json(responseData);
  },
);

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
  cache({
    cacheName: (
      c: Context<
        Environment,
        "/genres/:genre",
        {
          in: {
            param: {
              genre: string | undefined;
            };
          };
          out: {
            param: {
              genre: string;
            };
          };
        }
      >,
    ) => {
      const { genre } = c.req.param();
      return `genres ${genre}`;
    },
    cacheControl: "max-age=172800, must-revalidate, public",
  }),
  async (c) => {
    const { genre } = c.req.valid("param");

    const googleBooksService = new GoogleBooksService(c.env.GOOGLE_BOOKS_API_KEY);
    const books = await googleBooksService.getBooksByGenre(genre, 6);

    const responseData: GoodResponse<Book[]> = {
      success: true,
      data: books.filter((book) => book.isbn10 !== "" && book.isbn13 !== ""),
    };

    return c.json(responseData);
  },
);

books.get(
  "/isbn/:isbn",
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
  cache({
    cacheName: (
      c: Context<
        Environment,
        "/isbn/:isbn",
        {
          in: {
            param: {
              isbn: string | undefined;
            };
          };
          out: {
            param: {
              isbn: string;
            };
          };
        }
      >,
    ) => {
      const { isbn } = c.req.param();
      return isbn;
    },
    cacheControl: "max-age=172800, must-revalidate, public",
  }),
  async (c) => {
    const { isbn } = c.req.valid("param");
    if (!isbn) {
      const responseData: BadResponse = { success: false, error: "ISBN is required" };
      return c.json(responseData, 400);
    }

    const googleBooksService = new GoogleBooksService(c.env.GOOGLE_BOOKS_API_KEY);
    const book = await googleBooksService.getBookByISBN(isbn);

    const responseData: GoodResponse<Book[]> = { success: true, data: book };
    return c.json(responseData);
  },
);

books.get(
  "/latest-books",
  cache({
    cacheName: "latest-books",
    cacheControl: "max-age=172800, must-revalidate, public",
  }),
  async (c) => {
    const googleBooksService = new GoogleBooksService(c.env.GOOGLE_BOOKS_API_KEY);
    const books = await googleBooksService.getLatestBooks();

    if (books.length === 0) {
      const responseData: BadResponse = { success: false, error: "Trouble getting books" };
      return c.json(responseData, 400);
    }

    const responseData: GoodResponse<Book[]> = { success: true, data: books };
    return c.json(responseData);
  },
);

books.get("/search/:input", async (c) => {
  const input = c.req.param("input");
  const googleBooksService = new GoogleBooksService(c.env.GOOGLE_BOOKS_API_KEY);

  const settledBooksPromises = await Promise.allSettled([
    googleBooksService.getBooksByTitle(input, 3),
    googleBooksService.getBooksByAuthor(input, 3),
    googleBooksService.getBooksByPublisher(input, 3),
    googleBooksService.getBooksByGenre(input, 3),
    googleBooksService.getBookByISBN(input),
  ]);

  const isFulfilled = <T>(p: PromiseSettledResult<T>): p is PromiseFulfilledResult<T> => p.status === "fulfilled";

  const allBooksResults = settledBooksPromises
    .filter(isFulfilled)
    .map((res) => res.value)
    .flat();

  console.log(allBooksResults);

  const responseData: GoodResponse<Book[]> = { success: true, data: allBooksResults };
  return c.json(responseData);
});

export default books;
