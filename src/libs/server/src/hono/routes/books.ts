import { Hono } from "hono";
import { cache } from "hono/cache";
import genresList from "../../data/genres.json";
import { GoogleBooksService } from "../../services/google.service";
import { NYTimesService } from "../../services/ny-times.service";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

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
    return c.json({ genres: genresList, count: genresList.length });
  })
  .get(
    "/genres/:genre",
    zValidator(
      "param",
      z.object({
        genre: z.string().optional(),
      }),
    ),
    async (c) => {
      console.log("Start of function");
      const { genre } = c.req.valid("param");
      console.log({ genre });

      if (Boolean(genre) && genre !== undefined) {
        console.log("We are here");
        const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
        const books = await googleBooksService.getBooksByGenre(genre);

        /*  if (books.length === 0) {
      throw new HTTPException(400, { message: "Trouble getting requested books" });
    } */

        return c.json({ books });
      }

      console.log("We are in error part");
      throw new HTTPException(400, { message: "Genre is required" });
      return;
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
