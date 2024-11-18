import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { cva, VariantProps } from "class-variance-authority";
import type { GoodResponse, BadResponse } from "@/libs/server/src/types";
import type { SearchObjectType } from "@/libs/server/src/schemas";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const containerStyleClasses = cn("mx-auto max-w-screen-2xl px-2 xs:px-2.5 sm:px-3 md:px-4 lg:px-5 xl:px-6");

export const button = cva(["h-auto", "rounded-3xl", "border-2", "border-transparent", "px-6", "py-1", "font-normal"], {
  variants: {
    background: {
      dark: ["bg-primary", "text-primary-50", "border-0", "hover:bg-primary-600"],
      light: ["border-primary", "bg-secondary-300", "text-primary", "border-0", "hover:bg-secondary-400"],
    },
    textSize: {
      big: ["text-base", "lg:text-xl"],
      small: ["text-xs", "lg:text-base"],
    },
  },
});

export type ButtonVariants = VariantProps<typeof button>;

export const fetchData = async function <T>(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorObj = (await res.json()) as BadResponse;
    throw new Error(errorObj.error);
  }

  const { data } = (await res.json()) as GoodResponse<T>;
  return data;
};

const BTL_LOCAL_STORAGE_SEARCH_OBJECT = "btlSearchObject";

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

export const filterKeysArray: (keyof SearchObjectType)[] = ["title", "author", "genre", "publisher"];

export const DEFAULT_MAX_RESULTS = 8;
export const DEFAULT_START_INDEX = 0;

export const handleNumberSearchParam = function (param: string | null, defaultValue: number, minNumber?: number) {
  if (param === null) {
    return defaultValue.toString();
  }

  const parsedNumber = parseInt(param, 10);

  if (Number.isNaN(parsedNumber)) return defaultValue.toString();

  if (minNumber !== undefined) {
    if (parsedNumber <= minNumber) return minNumber.toString();
  }

  return defaultValue.toString();
};
