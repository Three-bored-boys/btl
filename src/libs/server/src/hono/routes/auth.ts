import { Hono } from "hono";
import type { GoodResponse, BadResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import { signupSchema, loginSchema } from "@/shared/validators";
import { Environment } from "@/root/bindings";
import { db } from "@/server/db/db";
import { SanitizedUser, users } from "@/server/db/schema";
import { eq, or } from "drizzle-orm";
import { hashPassword, verifyHashedPassword } from "@/server/auth/password";
import { generateSessionToken, createSession, invalidateSession } from "@/server/auth/sessions";
import { setSessionCookie, deleteSessionCookie, getSessionCookieToken } from "@/server/auth/cookies";
import { encryptAuthSessionToken } from "@/server/auth/utils";
import { sanitizedUser } from "@/server/utils";
import { SignupResult, LoginResult } from "@/shared/validators/auth";
import { authMiddleware } from "../middleware";

export const auth = new Hono<Environment>()
  .post(
    "/signup",
    zValidator("json", signupSchema, (result, c) => {
      if (!result.success) {
        const responseData: BadResponse = {
          success: false,
          errors: result.error.issues.map((issue) => issue.message),
          status: 400,
        };
        return c.json(responseData, 400);
      }
    }),
    async (c) => {
      let message = "";
      const { userName, emailAddress, password } = c.req.valid("json");
      const resultExistingUser = await db
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
        const responseData: BadResponse = { success: false, errors: [message], status: 404 };
        return c.json(responseData, 404);
      }
      const hashedPassword = await hashPassword(password);
      const resultNewUser = await db.insert(users).values([{ emailAddress, hashedPassword, userName }]).returning();

      if (!resultNewUser) {
        message = "Something went wrong while trying to create account";
        const responseData: BadResponse = {
          success: false,
          errors: [message],
          status: 404,
        };
        return c.json(responseData, 404);
      }

      const newUser = resultNewUser[0];

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, newUser.id);
      await setSessionCookie(sessionToken, session.expiresAt);

      message = "Account successfully created!";

      const responseData: SignupResult = { user: sanitizedUser(newUser), message };

      const data: GoodResponse<SignupResult> = {
        success: true,
        data: responseData,
      };
      return c.json(data);
    },
  )
  .post(
    "/login",
    zValidator("json", loginSchema, (result, c) => {
      if (!result.success) {
        const responseData: BadResponse = {
          success: false,
          errors: result.error.issues.map((issue) => issue.message),
          status: 400,
        };
        return c.json(responseData, 400);
      }
    }),
    async (c) => {
      let message = "";
      const { userName, password } = c.req.valid("json");
      const resultExistingUser = await db.select().from(users).where(eq(users.userName, userName)).limit(1);

      if (!resultExistingUser) {
        message = "Incorrect Username or Password";
        const responseData: BadResponse = {
          success: false,
          errors: [message],
          status: 404,
        };

        return c.json(responseData, 404);
      }

      if (resultExistingUser.length < 1) {
        message = "Incorrect Username or Password";
        const responseData: BadResponse = {
          success: false,
          errors: [message],
          status: 404,
        };

        return c.json(responseData, 404);
      }

      const [existingUser] = resultExistingUser;

      if (existingUser && !existingUser.hashedPassword) {
        message = "Incorrect Username or Password";
        const responseData: BadResponse = {
          success: false,
          errors: [message],
          status: 404,
        };

        return c.json(responseData, 404);
      }

      const validPassword = await verifyHashedPassword(password, existingUser.hashedPassword);

      if (!validPassword) {
        message = "Incorrect Username or Password";
        const responseData: BadResponse = {
          success: false,
          errors: [message],
          status: 404,
        };

        return c.json(responseData, 404);
      }

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, existingUser.id);
      await setSessionCookie(sessionToken, session.expiresAt);

      message = "Successfully logged in!";

      const responseData: LoginResult = { user: sanitizedUser(existingUser), message };

      const data: GoodResponse<LoginResult> = {
        success: true,
        data: responseData,
      };

      return c.json(data);
    },
  )
  .get("/logout", async (c) => {
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
  })
  .get("/validate-session", authMiddleware, (c) => {
    const user = c.get("user");
    const responseData: GoodResponse<SanitizedUser> = { success: true, data: user };
    return c.json(responseData);
  });
