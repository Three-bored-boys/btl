import { z } from "zod";

export const searchObjectSchema = z
  .object({
    search: z.string().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publisher: z.string().optional(),
    isbn: z.string().optional(),
  })
  .strict();

export type SearchObjectType = z.infer<typeof searchObjectSchema>;
