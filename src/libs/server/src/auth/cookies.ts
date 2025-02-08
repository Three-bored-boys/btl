import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { Context } from "hono";
import { BTL_AUTH_SESSION } from "@/server/utils";

export const setSessionCookie = function (c: Context, token: string, expiresAt: Date) {
  setCookie(c, BTL_AUTH_SESSION, token, {
    expires: expiresAt,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
};

export const getSessionCookieToken = function (c: Context) {
  const token = getCookie(c, BTL_AUTH_SESSION);
  if (!token) return null;
  return token;
};

export const deleteSessionCookie = function (c: Context) {
  deleteCookie(c, BTL_AUTH_SESSION);
};
