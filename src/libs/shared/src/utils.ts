import { SearchObjectType } from "./validators";
import type { IKImageProps } from "@imagekit/next";

export const BTL_LOCAL_STORAGE_SEARCH_OBJECT = "btlSearchObject";
export const BTL_LOCAL_STORAGE_COLLECTION_SIDEBAR = "btlCollectionSidebar";

export const filterKeysArray: (keyof SearchObjectType)[] = ["genre", "publisher"];

export const DEFAULT_MAX_RESULTS = 20;
export const MIN_MAX_RESULTS = 16;
export const MAX_MAX_RESULTS = 40;
export const DEFAULT_PAGE_NUMBER = 1;

export const bookLibraries = [
  { name: "Currently Reading", value: "currently-reading" },
  { name: "Want To Read", value: "want-to-read" },
  { name: "Finished", value: "finished" },
  { name: "Did Not Finish", value: "did-not-finish" },
];

export const bookLibraryValues = ["currently-reading", "want-to-read", "finished", "did-not-finish"] as const;

export const BTL_AUTH_SESSION_COOKIE_NAME = "btl_auth_session";

export const NOT_FOUND_IMAGE_ALT = "Cartoon image of man sitting on floor and reading a book";
export const HERO_SECTION_IMAGE_ALT =
  "Cartoon image of various people sitting and standing on and around a stack of books, each reading a book";
export const GENERIC_BOOK_IMAGE_ALT = "Generic Book Cover";

export const imageWH = {
  width: 500,
  height: 500,
};

export const imageKitProps: Pick<IKImageProps, "transformation" | "unoptimized" | "urlEndpoint"> = {
  transformation: [{ quality: 10, format: "orig" }],
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
};
