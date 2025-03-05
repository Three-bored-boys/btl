import { Hono } from "hono";
import { Environment } from "@/root/bindings";
import { db } from "@/server/db/db";
import { SanitizedUser, userBooks, UserBook } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "@/server/hono/middleware";
import { BadResponse, GoodResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { bookLibraryValues, bookLibraries } from "@/libs/shared/src/utils";

export const userBooksApp = new Hono<Environment>();

userBooksApp.get("/:isbn", authMiddleware, async (c) => {
  const user = c.get("user");
  const { isbn } = c.req.param();
  const userId = user.id;

  const book = await db(c)
    .select()
    .from(userBooks)
    .where(and(eq(userBooks.userId, userId), eq(userBooks.isbn, isbn)));

  const responseData: GoodResponse<{ user: SanitizedUser; book: UserBook[] }> = { success: true, data: { user, book } };

  return c.json(responseData);
});

userBooksApp.post(
  "/:isbn/:library",
  authMiddleware,
  zValidator("param", z.object({ isbn: z.string(), library: z.enum(bookLibraryValues) }), (result, c) => {
    if (!result.success) {
      console.log(result.error);
      const responseData: BadResponse = { success: false, errors: ["Invalid entries"] };
      return c.json(responseData, 400);
    }
  }),
  async (c) => {
    const user = c.get("user");
    const { isbn, library } = c.req.valid("param");

    const existingUserBook = await db(c)
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn), eq(userBooks.libraryValue, library)));

    if (existingUserBook.length === 0) {
      await db(c).insert(userBooks).values({ isbn, libraryValue: library, userId: user.id });
    }

    await db(c)
      .update(userBooks)
      .set({ libraryValue: library })
      .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));

    const responseData: GoodResponse<string> = {
      success: true,
      data: `Added to ${bookLibraries.find((obj) => obj.value === library)?.name ?? "collection"}!`,
    };

    return c.json(responseData);
  },
);
