import { SearchObjectType } from "./schemas";

export const filterKeysArray: (keyof SearchObjectType)[] = ["genre", "publisher"];

export const DEFAULT_MAX_RESULTS = 20;
export const MIN_MAX_RESULTS = 16;
export const MAX_MAX_RESULTS = 40;
export const DEFAULT_PAGE_NUMBER = 1;
