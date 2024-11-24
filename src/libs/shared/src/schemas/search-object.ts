import { z } from "zod";

export const searchObjectSchema = z
  .object({
    search: z.string().optional(),
    genre: z.string().optional(),
    publisher: z.string().optional(),
    isbn: z.string().optional(),
  })
  .strict();

export const paginationObjectSchema = z
  .object({
    maxResults: z.string().optional(),
    startIndex: z.string().optional(),
  })
  .strict();

export const fullSearchObjectSchema = searchObjectSchema.merge(paginationObjectSchema);

export type SearchObjectType = z.infer<typeof searchObjectSchema>;
export type PaginationObjectType = z.infer<typeof paginationObjectSchema>;
