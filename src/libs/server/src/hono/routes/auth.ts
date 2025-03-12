import { Hono } from "hono";
import type { GoodResponse, BadResponse } from "@/shared/types";
import { Environment } from "@/root/bindings";
import { invalidateSession } from "@/server/auth/sessions";
import { deleteSessionCookie, getSessionCookieToken } from "@/server/auth/cookies";
import { encryptAuthSessionToken } from "@/server/auth/utils";

export const auth = new Hono<Environment>();

auth.get("/logout", async (c) => {
  const token = await getSessionCookieToken();
  if (!token) {
    await deleteSessionCookie();
    const responseData: BadResponse = { success: false, errors: ["No session token found"], status: 401 };
    return c.json(responseData, 401);
  }

  const sessionId = await encryptAuthSessionToken(token, process.env.SESSION_SECRET_KEY!);

  await invalidateSession(sessionId);
  await deleteSessionCookie();

  const responseData: GoodResponse<string> = { success: true, data: "Successfully logged out!" };
  return c.json(responseData);
});
