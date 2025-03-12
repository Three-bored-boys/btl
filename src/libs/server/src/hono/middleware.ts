import { createMiddleware } from "hono/factory";
import { Environment } from "@/root/bindings";
import { getUserSession } from "@/server/actions";

export const authMiddleware = createMiddleware<Environment>(async (c, next) => {
  const userSessionRes = await getUserSession();
  if (!userSessionRes.user) {
    return c.json(userSessionRes, 401);
  }
  c.set("user", userSessionRes.user);
  await next();
});
