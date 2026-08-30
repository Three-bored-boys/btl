"use server";

import { BadResponse } from "@/shared/types";
import { z } from "zod";
import { fullSearchObjectSchema } from "@/shared/validators";
import {
  cacheNYTBestSellers,
  cacheBookByISBN,
  cacheBooksByGenre,
  cacheQuickSearchResults,
  cacheFullSearchResults,
} from "@/server/cache";

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const getNYTBestSellers = async function () {
  try {
    const bestSellers = await cacheNYTBestSellers();
    return bestSellers;
  } catch (er) {
    const e = er as Error;
    const responseData: BadResponse = {
      success: false,
      errors: [e.message],
      status: 404,
    };
    return responseData;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const getBooksByGenre = async function (genre: unknown) {
  const validationResult = z.string().min(1).safeParse(genre);
  if (!validationResult.success) {
    const responseData: BadResponse = { success: false, errors: ["Invalid Input"], status: 404 };
    return responseData;
  }
  const validGenre = validationResult.data;

  try {
    const cachedBooksByGenre = await cacheBooksByGenre(validGenre);

    return cachedBooksByGenre;
  } catch (er) {
    const e = er as Error;
    const responseData: BadResponse = {
      success: false,
      errors: [e.message],
      status: 404,
    };
    return responseData;
  }
};

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
  try {
    const cachedBookByISBN = await cacheBookByISBN(validISBN);

    return cachedBookByISBN;
  } catch (er) {
    const e = er as Error;
    const responseData: BadResponse = {
      success: false,
      errors: [e.message],
      status: 404,
    };
    return responseData;
  }
};

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

  try {
    const cachedQuickSearchResults = await cacheQuickSearchResults(validSearch);

    return cachedQuickSearchResults;
  } catch (er) {
    const e = er as Error;
    const responseData: BadResponse = {
      success: false,
      errors: [e.message],
      status: 404,
    };
    return responseData;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const getFullSearchResults = async function (fullSearchObject: unknown) {
  const validation = fullSearchObjectSchema.safeParse(fullSearchObject);
  if (!validation.success) {
    const responseData: BadResponse = { success: false, errors: ["Invalid entry"], status: 400 };
    return responseData;
  }

  const validFullSearchObject = validation.data;

  try {
    const cachedFullSearchResults = await cacheFullSearchResults(validFullSearchObject);

    return cachedFullSearchResults;
  } catch (er) {
    const e = er as Error;
    const responseData: BadResponse = {
      success: false,
      errors: [e.message],
      status: 404,
    };
    return responseData;
  }
};
