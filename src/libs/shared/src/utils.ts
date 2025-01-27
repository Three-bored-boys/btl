import { SearchObjectType } from "./validators";

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
