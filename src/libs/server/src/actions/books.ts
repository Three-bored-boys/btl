"use server";

import { unstable_cache } from "next/cache";
import { NYTimesService } from "@/server/services/ny-times.service";
import { GoogleBooksService } from "@/server/services/google.service";
import { BadResponse, BestSeller, Book, GoodResponse } from "@/shared/types";
import { z } from "zod";

const getNYTBestSellers = async function () {
  const nytService = new NYTimesService(process.env.NY_TIMES_BOOKS_API_KEY!);
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
  const googleBooksService = new GoogleBooksService(process.env.GOOGLE_BOOKS_API_KEY!);
  const returnedValue = await googleBooksService.getBooksByAllParameters({
    searchInput: { genre: validGenre },
    paginationFilter: { maxResults: (6).toString() },
  });

  const responseData: GoodResponse<Book[]> = {
    success: true,
    data: returnedValue.books.filter((book) => book.isbn10 !== "" && book.isbn13 !== ""),
  };

  return responseData;
};

export const getCachedBooksByGenre = unstable_cache(getBooksByGenre, ["genres"], { revalidate: 259200 });
