import { z } from "zod";

export const bookSchema = z.object({
  author: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  publisher: z.string().nullable(),
  image: z.string().nullable(),
  isbn10: z.string().nullable(),
  isn13: z.string().nullable(),
  categories: z.string().array(),
});

export type BookSchemaValidationType = z.infer<typeof bookSchema>;
