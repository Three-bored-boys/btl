"use server";

import {
  signupSchema,
  SignupFormState,
  SignupInput,
  loginSchema,
  LoginFormState,
  LoginInput,
} from "@/root/src/libs/shared/src/validators";
import { BadResponse, FieldError, GoodResponse, ServerResult } from "@/shared/types";
import { db } from "@/server/db/db";
import { eq, or } from "drizzle-orm";
import { users } from "@/server/db/schema";
import { hashPassword, verifyHashedPassword } from "@/server/auth/password";
import { generateSessionToken, createSession, invalidateSession } from "@/server/auth/sessions";
import { deleteSessionCookie, getSessionCookieToken, setSessionCookie } from "@/server/auth/cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { encryptAuthSessionToken } from "@/server/auth/utils";
import { cacheValidateSessionToken } from "./cache";

export const getUserSession = async function () {
  const sessionToken = await getSessionCookieToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }

  const { session, user } = await cacheValidateSessionToken(sessionToken);

  return { session, user };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const signUp = async function (_: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const signupObjRaw = Object.fromEntries(formData);
  const redirectUrl = formData.get("redirect") as string | null;

  const validation = signupSchema.safeParse(signupObjRaw);

  if (!validation.success) {
    const fieldErrorObj: FieldError<SignupInput> = {
      fieldError: {
        userName: validation.error.issues.filter((issue) => issue.path[0] === "userName").map((issue) => issue.message),
        emailAddress: validation.error.issues
          .filter((issue) => issue.path[0] === "emailAddress")
          .map((issue) => issue.message),
        password: validation.error.issues.filter((issue) => issue.path[0] === "password").map((issue) => issue.message),
      },
    };
    return fieldErrorObj;
  }

  const { userName, emailAddress, password } = validation.data;

  let message = "";

  try {
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
      return responseData;
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
      return responseData;
    }

    const newUser = resultNewUser[0];

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, newUser.id);
    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (e) {
    return { success: false, errors: ["Something went wrong. Please try again."], status: 500 };
  }
  revalidatePath("/", "layout");
  if (redirectUrl) {
    redirect(decodeURIComponent(redirectUrl));
  }
  redirect("/");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const login = async function (_: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const loginObjRaw = Object.fromEntries(formData);
  const redirectUrl = formData.get("redirect") as string | null;

  const validation = loginSchema.safeParse(loginObjRaw);

  if (!validation.success) {
    const fieldErrorObj: FieldError<LoginInput> = {
      fieldError: {
        userName: validation.error.issues.filter((issue) => issue.path[0] === "userName").map((issue) => issue.message),
        password: validation.error.issues.filter((issue) => issue.path[0] === "password").map((issue) => issue.message),
      },
    };
    return fieldErrorObj;
  }

  const { userName, password } = validation.data;

  let message = "";

  try {
    const resultExistingUser = await db.select().from(users).where(eq(users.userName, userName)).limit(1);

    if (!resultExistingUser) {
      message = "Incorrect Username or Password";
      const responseData: BadResponse = {
        success: false,
        errors: [message],
        status: 404,
      };

      return responseData;
    }

    if (resultExistingUser.length < 1) {
      message = "Incorrect Username or Password";
      const responseData: BadResponse = {
        success: false,
        errors: [message],
        status: 404,
      };

      return responseData;
    }

    const [existingUser] = resultExistingUser;

    if (existingUser && !existingUser.hashedPassword) {
      message = "Incorrect Username or Password";
      const responseData: BadResponse = {
        success: false,
        errors: [message],
        status: 404,
      };

      return responseData;
    }

    const validPassword = await verifyHashedPassword(password, existingUser.hashedPassword);

    if (!validPassword) {
      message = "Incorrect Username or Password";
      const responseData: BadResponse = {
        success: false,
        errors: [message],
        status: 404,
      };

      return responseData;
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (e) {
    return { success: false, errors: ["Something went wrong. Please try again."], status: 500 };
  }
  revalidatePath("/", "layout");
  if (redirectUrl) {
    redirect(decodeURIComponent(redirectUrl));
  }
  redirect("/");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logout = async function (): Promise<ServerResult<string>> {
  try {
    const token = await getSessionCookieToken();
    if (!token) {
      const responseData: BadResponse = { success: false, errors: ["No session token found"], status: 401 };
      return responseData;
    }

    const sessionId = await encryptAuthSessionToken(token, process.env.SESSION_SECRET_KEY!);

    await invalidateSession(sessionId);
    await deleteSessionCookie(token);
    const responseData: GoodResponse<string> = { success: true, data: "Successfully logged out!" };
    return responseData;
  } catch (e) {
    return { success: false, errors: ["Something went wrong. Please try again."], status: 500 };
  }
};
