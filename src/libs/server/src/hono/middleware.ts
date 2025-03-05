import { createMiddleware } from "hono/factory";
import { Environment } from "@/root/bindings";
import { getUserSession } from "@/server/auth/utils";

export const authMiddleware = createMiddleware<Environment>(async (c, next) => {
  const userSessionRes = await getUserSession(c);
  if (!userSessionRes.success) {
    return c.json(userSessionRes, 401);
  }
  c.set("user", userSessionRes.data);
  await next();
});
