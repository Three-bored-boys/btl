import { SearchObjectType } from "./schemas";

export const filterKeysArray: (keyof SearchObjectType)[] = ["title", "author", "genre", "publisher"];

export const DEFAULT_MAX_RESULTS = 8;
export const DEFAULT_START_INDEX = 0;
