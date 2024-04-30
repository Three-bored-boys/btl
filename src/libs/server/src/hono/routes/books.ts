import { Hono } from "hono";
// import { cache } from "hono/cache";
import genres from "../../data/genres.json";
import { GoogleBooksService } from "../../services/google.service";
import { NYTimesService } from "../../services/ny-times.service";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { BadResponse, GoodResponse } from "../../types";

const books = new Hono()
  .get(
    "/best-sellers",
    /*  cache({
      cacheName: "best-sellers",
      cacheControl: "public, max-age=172800, s-maxage=17280", // Cache for 2 days
    }), */
    async (c) => {
      const nytService = new NYTimesService(process.env.NY_TIMES_BOOKS_API_KEY);
      const bestSellers = await nytService.getBestSellers();

      if (bestSellers.length === 0) {
        throw new HTTPException(400, { message: "Trouble getting NYT Best Sellers List" });
      }

      return c.json({ bestSellers });
    },
  )
  .get("/genres", (c) => {
    return c.json({ genres, count: genres.length });
  })
  .get(
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
          const responseData: BadResponse = { success: false, error: "Invalid In" };
          return c.json(responseData, 404);
        }
      },
    ),
    async (c) => {
      const { genre } = c.req.valid("param");

      /*  if (genre === "null" || genre === "undefined") {
        const responseData: JSONResponse = { success: false, error: "Invalid Input" };
        return c.json(responseData, 400);
      } */

      const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
      const books = await googleBooksService.getBooksByGenre(genre);

      const responseData: GoodResponse<typeof books> = { success: true, data: books };

      return c.json(responseData);
    },
  )
  .get("/:isbn", async (c) => {
    const isbn = c.req.param("isbn");
    if (!isbn) {
      return c.json({ error: "ISBN is required" }, { status: 400 });
    }

    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
    const book = await googleBooksService.getBookByISBN(isbn);

    if (!book) {
      throw new HTTPException(404, { message: "Book not found" });
    }

    return c.json({ book });
  })
  .get("/latest-books", async (c) => {
    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
    const books = await googleBooksService.getLatestBooks();

    if (books.length === 0) {
      throw new HTTPException(400, { message: "Trouble getting books" });
    }

    return c.json({ books });
  });

export default books;
