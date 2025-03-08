"use server";

import { unstable_cache } from "next/cache";
import { NYTimesService } from "@/server/services/ny-times.service";
import { BadResponse, BestSeller, GoodResponse } from "@/shared/types";

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

export const getCachedNYTBestSellers = unstable_cache(getNYTBestSellers, [], { revalidate: 259200 });
