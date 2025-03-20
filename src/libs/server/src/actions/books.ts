"use server";

import { unstable_cache } from "next/cache";
import { NYTimesService } from "@/server/services/ny-times.service";
import { GoogleBooksService } from "@/server/services/google.service";
import { BadResponse, BestSeller, Book, GoodResponse } from "@/shared/types";
import { z } from "zod";
import { fullSearchObjectSchema } from "@/shared/validators";

const getNYTBestSellers = async function () {
  const nytBooksAPIKey = process.env.NY_TIMES_BOOKS_API_KEY;
  if (!nytBooksAPIKey) {
    const message = "NY Times Books API key not provided";
    console.log(message);
    throw Error(message);
  }
  const nytService = new NYTimesService(nytBooksAPIKey);
  const bestSellers = await nytService.getBestSellers();

  if (bestSellers.length === 0) {
    const responseData: BadResponse = {
      success: false,
      errors: ["Trouble getting NYT Best Sellers List"],
      status: 400,
    };
    return responseData;
  }

  const responseData: GoodResponse<BestSeller[]> = { success: true, data: bestSellers };
  return responseData;
};

export const getCachedNYTBestSellers = unstable_cache(getNYTBestSellers, ["best-sellers"], { revalidate: 259200 });

/////////////////////////////////////////////////////////////////////////////////////////////////////

const getBooksByGenre = async function (genre: unknown) {
  const validationResult = z.string().min(1).safeParse(genre);
  if (!validationResult.success) {
    const responseData: BadResponse = { success: false, errors: ["Invalid Input"], status: 404 };
    return responseData;
  }
  const validGenre = validationResult.data;
  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!googleBooksAPIKey) {
    const message = "Google Books API key not provided";
    console.log(message);
    throw Error(message);
  }
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);
  const returnedValue = await googleBooksService.getBooksByAllParameters({
    searchObject: { genre: validGenre },
    paginationObject: { maxResults: (6).toString() },
  });

  const responseData: GoodResponse<Book[]> = {
    success: true,
    data: returnedValue.books.filter((book) => book.isbn10 !== "" && book.isbn13 !== ""),
  };

  return responseData;
};

export const getCachedBooksByGenre = unstable_cache(getBooksByGenre, ["genres"], { revalidate: 259200 });

/////////////////////////////////////////////////////////////////////////////////////////////////////

const getBooksByISBN = async function (isbn: unknown) {
  const validationResult = z
    .string()
    .min(1)
    .refine((val) => Number.isFinite(+val))
    .safeParse(isbn);
  if (!validationResult.success) {
    const responseData: BadResponse = {
      success: false,
      errors: ["Invalid ISBN. Please enter a valid ISBN and try again"],
      status: 400,
    };
    return responseData;
  }

  const validISBN = validationResult.data;

  let book: Book[];

  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!googleBooksAPIKey) {
    const message = "Google Books API key not provided";
    console.log(message);
    throw Error(message);
  }
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);
  book = await googleBooksService.getBookByISBN(validISBN);

  if (book.length === 0) {
    const bookSearchResult = (
      await googleBooksService.getBooksByAllParameters({ searchObject: { isbn: validISBN }, paginationObject: {} })
    ).books.find((book) => book.isbn10 === isbn || book.isbn13 === isbn);

    if (!bookSearchResult) {
      book = [];
    } else {
      book = [bookSearchResult];
    }
  }

  if (book.length === 0) {
    const bookSearchResult = (
      await googleBooksService.getBooksByAllParameters({ searchObject: { search: validISBN }, paginationObject: {} })
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
    return responseData;
  }

  const responseData: GoodResponse<Book[]> = { success: true, data: book };
  return responseData;
};

export const getCachedBooksByISBN = unstable_cache(getBooksByISBN, ["isbn"], { revalidate: 172800 });

/////////////////////////////////////////////////////////////////////////////////////////////////////

const getQuickSearchResults = async function (search: unknown) {
  const validationResult = z.string().min(1).safeParse(search);
  if (!validationResult.success) {
    const responseData: BadResponse = {
      success: false,
      errors: ["Invalid ISBN. Please enter a valid ISBN and try again"],
      status: 400,
    };
    return responseData;
  }
  const validSearch = validationResult.data;
  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!googleBooksAPIKey) {
    const message = "Google Books API key not provided";
    console.log(message);
    throw Error(message);
  }
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);

  const allBooksResults = await googleBooksService.getBooksByAllParameters({
    searchObject: { search: validSearch },
    paginationObject: { maxResults: (8).toString() },
  });

  const responseData: GoodResponse<Book[]> = { success: true, data: allBooksResults.books };
  return responseData;
};

export const getCachedQuickSearchResults = unstable_cache(getQuickSearchResults, ["quick-search"], {
  revalidate: 86400,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

const getFullSearchResults = async function (fullSearchObject: unknown) {
  const validation = fullSearchObjectSchema.safeParse(fullSearchObject);
  if (!validation.success) {
    const responseData: BadResponse = { success: false, errors: ["Invalid entry"], status: 400 };
    return responseData;
  }

  const { page, maxResults, ...search } = validation.data;

  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!googleBooksAPIKey) {
    const message = "Google Books API key not provided";
    console.log(message);
    throw Error(message);
  }
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);

  const allBooksResults = await googleBooksService.getBooksByAllParameters({
    searchObject: search,
    paginationObject: { maxResults, page },
  });

  const responseData: GoodResponse<{ books: Book[]; totalItems: number }> = {
    success: true,
    data: allBooksResults,
  };

  return responseData;
};

export const getCachedFullSearchResults = unstable_cache(getFullSearchResults, ["full-search"], {
  revalidate: 86400,
});
