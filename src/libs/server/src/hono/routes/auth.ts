import { Hono } from "hono";
import type { GoodResponse } from "@/libs/shared/src/types";
import type { BadResponse } from "@/libs/shared/src/types";
import { zValidator } from "@hono/zod-validator";
import { signupSchema } from "@/libs/shared/src/schemas";
import { Environment } from "@/root/bindings";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

export const auth = new Hono<Environment>();

auth.post(
  "/signup",
  zValidator("json", signupSchema, (result, c) => {
    if (!result.success) {
      console.log(result.error);
      const responseData: BadResponse = { success: false, errors: ["Invalid entry", "Please try again"] };
      return c.json(responseData, 400);
    }
  }),
  (c) => {
    const data: GoodResponse<string> = { success: true, data: "Success!" };
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
