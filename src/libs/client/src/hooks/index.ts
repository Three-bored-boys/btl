import type { GoodResponse, BadResponse } from "@/libs/server/src/types";

export const fetchData = async function <T>(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorObj = (await res.json()) as BadResponse;
    console.log(errorObj);
    throw new Error(errorObj.error);
  }

  const { data } = (await res.json()) as GoodResponse<T>;
  console.log(data);
  return data;
};
