/* eslint-disable @typescript-eslint/require-await */
"use server";

import { BTL_AUTH_SESSION_COOKIE_NAME } from "@/shared/utils";
import { cookies } from "next/headers";

export const setSessionCookie = async function (token: string, expiresAt: Date) {
  const cookieStore = cookies();
  cookieStore.set(BTL_AUTH_SESSION_COOKIE_NAME, token, {
    expires: expiresAt,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
};

export const getSessionCookieToken = async function () {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(BTL_AUTH_SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;
  return sessionCookie.value;
};

export const deleteSessionCookie = async function () {
  const cookieStore = cookies();
  cookieStore.delete(BTL_AUTH_SESSION_COOKIE_NAME);
};
