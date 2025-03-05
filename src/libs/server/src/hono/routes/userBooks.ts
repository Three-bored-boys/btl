import { Hono } from "hono";
import { Environment } from "@/root/bindings";
import { db } from "src/db/db";
import { SanitizedUser, userBooks, UserBook } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "@/server/hono/middleware";
import { GoodResponse } from "@/shared/types";

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
