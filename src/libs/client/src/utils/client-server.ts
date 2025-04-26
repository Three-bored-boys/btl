import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { cva, VariantProps } from "class-variance-authority";
import type { GoodResponse, BadResponse } from "@/root/src/libs/shared/src/types";
import type { SearchObjectType } from "@/root/src/libs/shared/src/validators";
import { FetchDataResult } from "@/shared/types/response";
import { BTL_LOCAL_STORAGE_SEARCH_OBJECT } from "@/shared/utils";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const containerStyleClasses = cn(
  "mx-auto h-full max-w-screen-2xl px-2 xs:px-2.5 sm:px-3 md:px-4 lg:px-5 xl:px-6",
);

export const button = cva(["h-auto", "rounded-3xl", "border-2", "border-transparent", "px-6", "py-1", "font-normal"], {
  variants: {
    background: {
      dark: ["bg-primary", "text-secondary-50", "border-0", "hover:bg-primary-600"],
      light: ["border-primary", "bg-secondary-300", "text-primary", "border-0", "hover:bg-secondary-400"],
    },
    textSize: {
      big: ["text-base", "lg:text-xl"],
      small: ["text-xs", "lg:text-base"],
    },
  },
});

export type ButtonVariants = VariantProps<typeof button>;

export const fetchData = async function <T>(url: string, options?: RequestInit): Promise<FetchDataResult<T>> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const data = (await res.json()) as BadResponse;
    return { fetchDataResult: data, res };
  }

  const data = (await res.json()) as GoodResponse<T>;
  return { fetchDataResult: data, res };
};

export const getSearchObjectFromLocalStorage = function () {
  if (window) {
    return JSON.parse(window.localStorage.getItem(BTL_LOCAL_STORAGE_SEARCH_OBJECT) ?? "{}") as SearchObjectType;
  }
  return {} as SearchObjectType;
};

export const setSearchObjectToLocalStorage = function (param: SearchObjectType) {
  if (window) {
    window.localStorage.setItem(BTL_LOCAL_STORAGE_SEARCH_OBJECT, JSON.stringify(param));
  }
};

export const editSearchObjectInLocalStorage = function (
  key: keyof SearchObjectType,
  trimmedTargetValue: string,
  previousSearchObject = getSearchObjectFromLocalStorage(),
) {
  let searchObject: SearchObjectType;
  if (trimmedTargetValue !== "") {
    searchObject = { ...previousSearchObject, [key]: trimmedTargetValue };
    setSearchObjectToLocalStorage(searchObject);
    return searchObject;
  }

  searchObject = previousSearchObject;
  /* eslint-disable-next-line */
  delete searchObject[key];
  setSearchObjectToLocalStorage(searchObject);
  return searchObject;
};

export const handleNumberSearchParam = function (
  param: string | null,
  defaultValue: number,
  minNumber?: number,
  maxNumber?: number,
) {
  if (param === null) {
    return defaultValue.toString();
  }

  const parsedNumber = parseInt(param, 10);

  if (Number.isNaN(parsedNumber)) return defaultValue.toString();

  if (minNumber !== undefined && maxNumber !== undefined) {
    if (parsedNumber <= minNumber) return minNumber.toString();
    if (parsedNumber >= maxNumber) return maxNumber.toString();
    return defaultValue.toString();
  }

  if (minNumber !== undefined && maxNumber === undefined) {
    if (parsedNumber <= minNumber) return minNumber.toString();
    return param;
  }

  return defaultValue.toString();
};

export const getRootPathname = (path: string): string => {
  return "/" + path.split("/")[1];
};

export const getRedirectFromSearchParams = function (searchParams: Record<string, string | string[] | undefined>) {
  let redirect = searchParams.redirect;

  if (redirect === undefined || typeof redirect !== "string") {
    redirect = "";
  }
  return redirect;
};
