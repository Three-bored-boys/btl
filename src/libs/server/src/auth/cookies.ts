import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { Context } from "hono";
import { BTL_AUTH_SESSION } from "@/server/utils";
import { Environment } from "@/root/bindings";

export const setSessionCookie = function (c: Context<Environment>, token: string, expiresAt: Date) {
  setCookie(c, BTL_AUTH_SESSION, token, {
    expires: expiresAt,
    secure: true,
    httpOnly: true,
    sameSite: "none",
    path: "/",
  });
};

export const getSessionCookieToken = function (c: Context<Environment>) {
  const token = getCookie(c, BTL_AUTH_SESSION);
  if (!token) return null;
  return token;
};

export const deleteSessionCookie = function (c: Context<Environment>) {
  deleteCookie(c, BTL_AUTH_SESSION);
};
