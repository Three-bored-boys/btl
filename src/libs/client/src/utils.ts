import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { cva, VariantProps } from "class-variance-authority";
import type { GoodResponse, BadResponse, SearchObjectType } from "@/libs/server/src/types";

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
  return JSON.parse(window.localStorage.getItem(BTL_LOCAL_STORAGE_SEARCH_OBJECT) ?? "{}") as SearchObjectType;
};

export const setSearchObjectToLocalStorage = function (param: SearchObjectType) {
  window.localStorage.setItem(BTL_LOCAL_STORAGE_SEARCH_OBJECT, JSON.stringify(param));
};

export const onInputChange = function (e: React.ChangeEvent<HTMLInputElement>, key: keyof SearchObjectType) {
  const trimmedValue = e.target.value.trim();
  let searchObject: SearchObjectType;
  if (trimmedValue !== "") {
    setSearchObjectToLocalStorage({ ...getSearchObjectFromLocalStorage(), [key]: trimmedValue });
    searchObject = getSearchObjectFromLocalStorage();
    return searchObject;
  }

  searchObject = getSearchObjectFromLocalStorage();
  /* eslint-disable-next-line */
  delete searchObject[key];
  setSearchObjectToLocalStorage(searchObject);
  return searchObject;
};
