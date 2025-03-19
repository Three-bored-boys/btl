"use server";

import { BTL_AUTH_SESSION_COOKIE_NAME } from "@/shared/utils";
import { cookies } from "next/headers";

export const setSessionCookie = async function (token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set(BTL_AUTH_SESSION_COOKIE_NAME, token, {
    expires: expiresAt,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
};

export const getSessionCookieToken = async function () {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(BTL_AUTH_SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;
  return sessionCookie.value;
};

export const deleteSessionCookie = async function (token: string) {
  const cookieStore = await cookies();
  cookieStore.set(BTL_AUTH_SESSION_COOKIE_NAME, token, { maxAge: 0 });
};
