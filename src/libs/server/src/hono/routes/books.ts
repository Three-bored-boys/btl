import { Hono } from "hono";
import { cache } from "hono/cache";
import { genres } from "../../data/genres.json";
import { GoogleBooksService } from "../../services/google.service";
import { NYTimesService } from "../../services/ny-times.service";

const books = new Hono()
  .get(
    "/best-sellers",
    cache({
      cacheName: "best-sellers",
      cacheControl: "public, max-age=172800, s-maxage=17280", // Cache for 2 days
    }),
    async (c) => {
      const nytService = new NYTimesService(process.env.NY_TIMES_BOOKS_API_KEY);
      const bestSellers = await nytService.getBestSellers();

      return c.json({ bestSellers });
    },
  )
  .get("/genres", (c) => {
    return c.json({ genres, count: genres.length });
  })
  .get("/genres/:genre", async (c) => {
    const genre = c.req.param("genre");

    if (!genre) {
      return c.json({ error: "Genre is required" }, { status: 400 });
    }

    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
    const books = await googleBooksService.getBooksByGenre(genre);

    return c.json({ books });
  })
  .get("/:isbn", async (c) => {
    const isbn = c.req.param("isbn");
    if (!isbn) {
      return c.json({ error: "ISBN is required" }, { status: 400 });
    }

    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
    const book = await googleBooksService.getBookByISBN(isbn);

    if (!book) {
      return c.json({ error: "Book not found" }, { status: 404 });
    }

    return c.json({ book });
  })
  .get("/latest-books", async (c) => {
    const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY);
    const books = await googleBooksService.getLatestBooks();

    return c.json({ books });
  });

export default books;
