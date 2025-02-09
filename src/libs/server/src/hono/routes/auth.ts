import { Context, Hono } from "hono";
import type { GoodResponse, BadResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import { signupSchema } from "@/shared/validators";
import { Environment } from "@/root/bindings";
import { getCookie, setCookie } from "hono/cookie";
import { db } from "@/server/db/db";
import { SanitizedUser, users } from "@/server/db/schema";
import { eq, or } from "drizzle-orm";
import { hashPassword } from "@/server/auth/password";
import { generateSessionToken, createSession, validateSessionToken, invalidateSession } from "@/server/auth/sessions";
import { setSessionCookie, deleteSessionCookie, getSessionCookieToken } from "@/server/auth/cookies";
import { encryptAuthSessionToken } from "@/server/auth/utils";
import { cache } from "hono/cache";
import { sanitizedUser } from "@/server/utils";
import { SignupResult } from "@/shared/validators/auth";

export const auth = new Hono<Environment>();

auth.post(
  "/signup",
  zValidator("json", signupSchema, (result, c) => {
    if (!result.success) {
      const responseData: BadResponse = { success: false, errors: result.error.issues.map((issue) => issue.message) };
      return c.json(responseData, 400);
    }
  }),
  async (c) => {
    let message = "";
    const { userName, emailAddress, password } = c.req.valid("json");
    const resultExistingUser = await db(c)
      .select()
      .from(users)
      .where(or(eq(users.emailAddress, emailAddress), eq(users.userName, userName)))
      .limit(1);

    if (resultExistingUser.length > 0) {
      const existingUser = resultExistingUser[0];
      message =
        existingUser.emailAddress === emailAddress
          ? "An account with this email already exists"
          : "This user name is taken";
      const responseData: BadResponse = { success: false, errors: [message] };
      return c.json(responseData, 404);
    }
    const hashedPassword = await hashPassword(password);
    const resultNewUser = await db(c).insert(users).values([{ emailAddress, hashedPassword, userName }]).returning();

    if (!resultNewUser) {
      message = "Something went wrong while trying to create account";
      const responseData: BadResponse = {
        success: false,
        errors: [message],
      };
      return c.json(responseData, 404);
    }

    const newUser = resultNewUser[0];

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, newUser.id, c);
    setSessionCookie(c, sessionToken, session.expiresAt);

    message = "Account successfully created!";

    const responseData: SignupResult = { user: sanitizedUser(newUser), message };

    const data: GoodResponse<SignupResult> = {
      success: true,
      data: responseData,
    };
    return c.json(data);
  },
);

auth.get("/login", (c) => {
  const dateNow = new Date();
  const authCookie = getCookie(c, "session_id");
  console.log(authCookie);

  if (authCookie) {
    const responseData: GoodResponse<string> = { success: true, data: "Cookie already exists!" };
    return c.json(responseData);
  }

  setCookie(c, "session_id", "jxfhnfjdjfjnxn", {
    expires: new Date(
      dateNow.getFullYear() + 1,
      dateNow.getMonth(),
      dateNow.getDate(),
      dateNow.getHours(),
      dateNow.getMinutes(),
      dateNow.getSeconds(),
    ),
  });
  const responseData: GoodResponse<string> = { success: true, data: "New cookie set!" };
  return c.json(responseData);
});

auth.get("/logout", async (c) => {
  const token = getSessionCookieToken(c);
  if (!token) {
    deleteSessionCookie(c);
    const responseData: BadResponse = { success: false, errors: ["No session token found"] };
    return c.json(responseData, 401);
  }

  const sessionId = await encryptAuthSessionToken(token, c.env.SESSION_SECRET_KEY);

  await invalidateSession(sessionId, c);
  deleteSessionCookie(c);

  const responseData: GoodResponse<string> = { success: true, data: "Successfully logged out!" };
  return c.json(responseData);
});

auth.get(
  "/validate-session",
  cache({
    cacheName: (c: Context<Environment>) => {
      const sessionToken = getSessionCookieToken(c);
      return sessionToken ?? "no-token";
    },
    cacheControl: "no-cache, private",
  }),
  async (c) => {
    const sessionToken = getSessionCookieToken(c);
    if (!sessionToken) {
      deleteSessionCookie(c);
      const responseData: BadResponse = { success: false, errors: ["No session token found"] };
      return c.json(responseData, 401);
    }

    const { session, user } = await validateSessionToken(sessionToken, c);

    if (!session || !user) {
      deleteSessionCookie(c);
      const responseData: BadResponse = { success: false, errors: ["Invalid session token"] };
      return c.json(responseData, 401);
    }

    const responseData: GoodResponse<SanitizedUser> = { success: true, data: user };
    return c.json(responseData);
  },
);
