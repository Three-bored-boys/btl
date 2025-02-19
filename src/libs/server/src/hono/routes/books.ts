import { Context, Hono } from "hono";
import { genres as genresList } from "@/root/src/libs/shared/src/data/genres";
import { GoogleBooksService } from "@/server/services/google.service";
import { NYTimesService } from "@/server/services/ny-times.service";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { type BadResponse, type GoodResponse, type Genres, type BestSeller, type Book } from "@/shared/types";
import { fullSearchObjectSchema } from "@/shared/validators";
import { Environment } from "@/root/bindings";
import { cache } from "hono/cache";
import { filterKeysArray } from "@/libs/shared/src/utils";

export const books = new Hono<Environment>();

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
      const responseData: BadResponse = { success: false, errors: ["Trouble getting NYT Best Sellers List"] };
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
      genre: z.string().min(1),
    }),
    (result, c) => {
      if (!result.success) {
        const responseData: BadResponse = { success: false, errors: ["Invalid Input"] };
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
    const returnedValue = await googleBooksService.getBooksByAllParameters({
      searchInput: { genre },
      paginationFilter: { maxResults: (6).toString() },
    });

    const responseData: GoodResponse<Book[]> = {
      success: true,
      data: returnedValue.books.filter((book) => book.isbn10 !== "" && book.isbn13 !== ""),
    };

    return c.json(responseData);
  },
);

books.get(
  "/isbn/:isbn",
  zValidator(
    "param",
    z.object({
      isbn: z.union([
        z
          .string()
          .length(10)
          .refine((val) => Number.isFinite(+val)),
        z
          .string()
          .length(13)
          .refine((val) => Number.isFinite(+val)),
      ]),
    }),
    (result, c) => {
      if (!result.success) {
        const responseData: BadResponse = {
          success: false,
          errors: ["Invalid ISBN. Please enter a valid ISBN and try again"],
        };
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
    console.log(isbn);
    if (!isbn) {
      const responseData: BadResponse = {
        success: false,
        errors: ["A valid ISBN is required. Please enter one and try again."],
      };
      return c.json(responseData, 400);
    }

    let book: Book[];

    const googleBooksService = new GoogleBooksService(c.env.GOOGLE_BOOKS_API_KEY);
    book = await googleBooksService.getBookByISBN(isbn);

    if (book.length === 0) {
      const bookSearchResult = (
        await googleBooksService.getBooksByAllParameters({ searchInput: { isbn }, paginationFilter: {} })
      ).books.find((book) => book.isbn10 === isbn || book.isbn13 === isbn);

      if (!bookSearchResult) {
        book = [];
      } else {
        book = [bookSearchResult];
      }
    }

    if (book.length === 0) {
      const bookSearchResult = (
        await googleBooksService.getBooksByAllParameters({ searchInput: { search: isbn }, paginationFilter: {} })
      ).books.find((book) => book.isbn10 === isbn || book.isbn13 === isbn);

      if (!bookSearchResult) {
        book = [];
      } else {
        book = [bookSearchResult];
      }
    }

    if (book.length === 0) {
      const responseData: BadResponse = {
        success: false,
        errors: ["The book you are currently looking for could not be found."],
      };
      return c.json(responseData, 404);
    }

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
      const responseData: BadResponse = { success: false, errors: ["Trouble getting books"] };
      return c.json(responseData, 400);
    }

    const responseData: GoodResponse<Book[]> = { success: true, data: books };
    return c.json(responseData);
  },
);

books.get("/quick-search/:search", async (c) => {
  const search = c.req.param("search");
  const googleBooksService = new GoogleBooksService(c.env.GOOGLE_BOOKS_API_KEY);

  const allBooksResults = await googleBooksService.getBooksByAllParameters({
    searchInput: { search },
    paginationFilter: { maxResults: (8).toString() },
  });

  console.log(allBooksResults);

  const responseData: GoodResponse<Book[]> = { success: true, data: allBooksResults.books };
  return c.json(responseData);
});

books.get(
  "/full-search",
  zValidator("query", fullSearchObjectSchema, (result, c) => {
    if (!result.success) {
      console.log(result.error);
      const responseData: BadResponse = { success: false, errors: ["Invalid entry"] };
      return c.json(responseData, 400);
    }
  }),
  cache({
    cacheName: (
      c: Context<
        Environment,
        "/full-search",
        {
          in: {
            query: {
              isbn?: string | string[] | undefined;
              search?: string | string[] | undefined;
              title?: string | string[] | undefined;
              author?: string | string[] | undefined;
              genre?: string | string[] | undefined;
              publisher?: string | string[] | undefined;
              maxResults?: string | string[] | undefined;
              page?: string | string[] | undefined;
            };
          };
          out: {
            query: {
              isbn?: string | string[] | undefined;
              search?: string | string[] | undefined;
              title?: string | string[] | undefined;
              author?: string | string[] | undefined;
              genre?: string | string[] | undefined;
              publisher?: string | string[] | undefined;
              maxResults?: string | string[] | undefined;
              page?: string | string[] | undefined;
            };
          };
        }
      >,
    ) => {
      const query = c.req.valid("query");

      const getKeyForCache = (param: string | string[] | undefined) => {
        if (param === undefined) return "";

        if (Array.isArray(param)) return param.join("");

        return param;
      };

      const searchQueryKey = getKeyForCache(query.search);
      const filtersQueryKeyArray = filterKeysArray.map((key) => {
        return getKeyForCache(query[key]);
      });
      const maxResultsQueryKey = getKeyForCache(query.maxResults);
      const pageQueryKey = getKeyForCache(query.page);

      return `full-search-results ${searchQueryKey} ${filtersQueryKeyArray.join(" ")} ${maxResultsQueryKey} ${pageQueryKey}`;
    },
    cacheControl: "max-age=172800, must-revalidate, public",
  }),
  async (c) => {
    const { page, maxResults, ...search } = c.req.valid("query");
    const googleBooksService = new GoogleBooksService(c.env.GOOGLE_BOOKS_API_KEY);

    const allBooksResults = await googleBooksService.getBooksByAllParameters({
      searchInput: search,
      paginationFilter: { maxResults, page },
    });

    const responseData: GoodResponse<{ books: Book[]; totalItems: number }> = { success: true, data: allBooksResults };

    return c.json(responseData);
  },
);
