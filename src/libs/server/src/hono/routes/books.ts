import { Hono } from "hono";
// import { genres as genresList } from "@/root/src/libs/shared/src/data/genres";
import { GoogleBooksService } from "@/server/services/google.service";
// import { NYTimesService } from "@/server/services/ny-times.service";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { type BadResponse, type GoodResponse, /*  type Genres, type BestSeller, */ type Book } from "@/shared/types";
import { fullSearchObjectSchema } from "@/shared/validators";
import { Environment } from "@/root/bindings";

export const books = new Hono<Environment>()
  .get(
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
            status: 400,
          };
          return c.json(responseData, 400);
        }
      },
    ),
    async (c) => {
      const { isbn } = c.req.valid("param");
      console.log(isbn);
      if (!isbn) {
        const responseData: BadResponse = {
          success: false,
          errors: ["A valid ISBN is required. Please enter one and try again."],
          status: 400,
        };
        return c.json(responseData, 400);
      }

      let book: Book[];

      const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY!);
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
          status: 404,
        };
        return c.json(responseData, 404);
      }

      const responseData: GoodResponse<Book[]> = { success: true, data: book };
      return c.json(responseData);
    },
  )
  .get("/latest-books", async (c) => {
    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY!);
    const books = await googleBooksService.getLatestBooks();

    if (books.length === 0) {
      const responseData: BadResponse = { success: false, errors: ["Trouble getting books"], status: 400 };
      return c.json(responseData, 400);
    }

    const responseData: GoodResponse<Book[]> = { success: true, data: books };
    return c.json(responseData);
  })
  .get("/quick-search/:search", async (c) => {
    const search = c.req.param("search");
    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY!);

    const allBooksResults = await googleBooksService.getBooksByAllParameters({
      searchInput: { search },
      paginationFilter: { maxResults: (8).toString() },
    });

    console.log(allBooksResults);

    const responseData: GoodResponse<Book[]> = { success: true, data: allBooksResults.books };
    return c.json(responseData);
  })
  .get(
    "/full-search",
    zValidator("query", fullSearchObjectSchema, (result, c) => {
      if (!result.success) {
        console.log(result.error);
        const responseData: BadResponse = { success: false, errors: ["Invalid entry"], status: 400 };
        return c.json(responseData, 400);
      }
    }),
    async (c) => {
      const { page, maxResults, ...search } = c.req.valid("query");
      const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY!);

      const allBooksResults = await googleBooksService.getBooksByAllParameters({
        searchInput: search,
        paginationFilter: { maxResults, page },
      });

      const responseData: GoodResponse<{ books: Book[]; totalItems: number }> = {
        success: true,
        data: allBooksResults,
      };

      return c.json(responseData);
    },
  );
