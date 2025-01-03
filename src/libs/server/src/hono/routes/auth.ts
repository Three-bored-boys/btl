import { Hono } from "hono";
import type { GoodResponse } from "../../../../shared/src/types";
import { Environment } from "@/root/bindings";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

export const auth = new Hono<Environment>();

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

auth.get("/logout", (c) => {
  const authCookie = getCookie(c, "session_id");
  console.log(authCookie);

  deleteCookie(c, "session_id");

  const responseData: GoodResponse<string> = { success: true, data: "Cookie deleted!" };
  return c.json(responseData);
});

auth.get("/check-cookie", (c) => {
  const responseData: GoodResponse<string> = { success: true, data: "Just checking if cookie still exists!" };
  return c.json(responseData);
});
