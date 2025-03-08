import { Hono } from "hono";
import { GoogleBooksService } from "@/server/services/google.service";
import { zValidator } from "@hono/zod-validator";
import { type BadResponse, type GoodResponse, /*  type Genres, type BestSeller, */ type Book } from "@/shared/types";
import { fullSearchObjectSchema } from "@/shared/validators";
import { Environment } from "@/root/bindings";

export const books = new Hono<Environment>()
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
