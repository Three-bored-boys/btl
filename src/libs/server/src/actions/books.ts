"use server";

import { unstable_cache } from "next/cache";
import { NYTimesService } from "@/server/services/ny-times.service";
import { GoogleBooksService } from "@/server/services/google.service";
import { OpenLibraryService } from "@/server/services/open-library.service";
import { BadResponse, BestSeller, Book, GoodResponse } from "@/shared/types";
import { z } from "zod";
import { PaginationObjectType, SearchObjectType, fullSearchObjectSchema } from "@/shared/validators";

const getNYTBestSellers = async function () {
  const nytBooksAPIKey = process.env.NY_TIMES_BOOKS_API_KEY;
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

export const getCachedNYTBestSellers = unstable_cache(getNYTBestSellers, [], { revalidate: 259200 });

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const getBooksByGenre = async function (genre: unknown) {
  const validationResult = z.string().min(1).safeParse(genre);
  if (!validationResult.success) {
    const responseData: BadResponse = { success: false, errors: ["Invalid Input"], status: 404 };
    return responseData;
  }
  const validGenre = validationResult.data;

  const cachedBooksByGenre = await cacheBooksByGenre(validGenre);

  return cachedBooksByGenre;
};

const booksByGenre = async function (genre: string) {
  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);
  const returnedValue = await googleBooksService.getBooksByAllParameters({
    searchObject: { genre },
    paginationObject: { maxResults: (6).toString() },
  });

  const responseData: GoodResponse<Book[]> = {
    success: true,
    data: returnedValue.books.filter((book) => book.isbn10 !== "" && book.isbn13 !== ""),
  };

  return responseData;
};

const cacheBooksByGenre = unstable_cache(booksByGenre, [], { revalidate: 259200 });

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const getBookByISBN = async function (isbn: unknown) {
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

  const cachedBookByISBN = await cacheBookByISBN(validISBN);

  return cachedBookByISBN;
};

export const bookByISBN = async function (isbn: string) {
  let book: Book[];

  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);
  book = await googleBooksService.getBookByISBN(isbn);

  if (book.length === 0) {
    const openLibraryService = new OpenLibraryService();
    book = await openLibraryService.getBookByISBN(isbn);
  }

  if (book.length === 0) {
    const responseData: BadResponse = {
      success: false,
      errors: ["The book you are currently looking for could not be found."],
      status: 404,
    };
    return responseData;
  }

  const [bookObj] = book;

  const responseData: GoodResponse<Book> = { success: true, data: bookObj };
  return responseData;
};

const cacheBookByISBN = unstable_cache(bookByISBN, [], { revalidate: 172800 });

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const getQuickSearchResults = async function (search: unknown) {
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

  const cachedQuickSearchResults = await cacheQuickSearchResults(validSearch);
  return cachedQuickSearchResults;
};

const quickSearchResults = async function (search: string) {
  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);

  const allBooksResults = await googleBooksService.getBooksByAllParameters({
    searchObject: { search },
    paginationObject: { maxResults: (8).toString() },
  });

  const responseData: GoodResponse<Book[]> = { success: true, data: allBooksResults.books };
  return responseData;
};

const cacheQuickSearchResults = unstable_cache(quickSearchResults, [], {
  revalidate: 86400,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const getFullSearchResults = async function (fullSearchObject: unknown) {
  const validation = fullSearchObjectSchema.safeParse(fullSearchObject);
  if (!validation.success) {
    const responseData: BadResponse = { success: false, errors: ["Invalid entry"], status: 400 };
    return responseData;
  }

  const validFullSearchObject = validation.data;

  const cachedFullSearchResults = await cacheFullSearchResults(validFullSearchObject);

  return cachedFullSearchResults;
};

const fullSearchResults = async function (fullSearchObject: SearchObjectType & PaginationObjectType) {
  const { maxResults, page, ...searchObject } = fullSearchObject;
  const googleBooksAPIKey = process.env.GOOGLE_BOOKS_API_KEY;
  const googleBooksService = new GoogleBooksService(googleBooksAPIKey);

  const allBooksResults = await googleBooksService.getBooksByAllParameters({
    searchObject: searchObject,
    paginationObject: { maxResults, page },
  });

  const responseData: GoodResponse<{ books: Book[]; totalItems: number }> = {
    success: true,
    data: allBooksResults,
  };

  return responseData;
};

const cacheFullSearchResults = unstable_cache(fullSearchResults, [], {
  revalidate: 86400,
});
