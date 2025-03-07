import { Hono } from "hono";
import { Environment } from "@/root/bindings";
import { db } from "@/server/db/db";
import { userBooks, UserBook } from "@/server/db/schema";
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

  try {
    const book = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.isbn, isbn)));

    const responseData: GoodResponse<{ book: UserBook[] }> = {
      success: true,
      data: { book },
    };

    return c.json(responseData);
  } catch (e) {
    console.log(e);
    const responseData: BadResponse = { success: false, errors: ["There was an issue getting the required book"] };
    return c.json(responseData, 500);
  }
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

    try {
      const existingUserBookWithISBN = await db
        .select()
        .from(userBooks)
        .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));

      if (existingUserBookWithISBN.length === 0) {
        await db.insert(userBooks).values({ isbn, libraryValue: library, userId: user.id });
        const responseData: GoodResponse<string> = {
          success: true,
          data: `Added to ${bookLibraries.find((obj) => obj.value === library)?.name ?? "collection"}!`,
        };
        return c.json(responseData);
      }

      await db
        .update(userBooks)
        .set({ libraryValue: library })
        .where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));

      const responseData: GoodResponse<string> = {
        success: true,
        data: `Added to ${bookLibraries.find((obj) => obj.value === library)?.name ?? "collection"}!`,
      };

      return c.json(responseData);
    } catch (e) {
      console.log(e);
      const responseData: BadResponse = { success: false, errors: ["There was an issue adding book"] };
      return c.json(responseData, 500);
    }
  },
);

userBooksApp.delete("/:isbn", authMiddleware, async (c) => {
  const user = c.get("user");
  const { isbn } = c.req.param();

  try {
    await db.delete(userBooks).where(and(eq(userBooks.userId, user.id), eq(userBooks.isbn, isbn)));

    const responseData: GoodResponse<string> = {
      success: true,
      data: "Removed from collection!",
    };

    return c.json(responseData);
  } catch (e) {
    console.log(e);
    const responseData: BadResponse = {
      success: false,
      errors: ["There was an issue deleting the book from your collection"],
    };
    return c.json(responseData, 500);
  }
});
