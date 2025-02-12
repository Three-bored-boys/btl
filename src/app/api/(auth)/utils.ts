import { SanitizedUser } from "@/root/src/libs/shared/src/db/schema";
import { HandlerResult } from "@/root/src/libs/shared/src/types";
import { cookies } from "next/headers";
import { URL } from "@/client/utils";

export const validateUser = async function () {
  const res = await fetch(`${URL}/api/validate-session`, {
    credentials: "include",
    headers: {},
  });

  const { handlerResult } = (await res.json()) as HandlerResult<SanitizedUser>;

  if (!handlerResult.success) {
    return null;
  }

  const { data } = handlerResult;
  console.log(data);
  return data;
};

const getSetCookeOptionsEntry = function (key: string, val: string) {
  if (key.includes("Expires")) return { expires: Date.parse(val) };
  if (key.includes("Max-Age")) return { maxAge: Number(val) };
  if (key.includes("Domain")) return { domain: val };
  if (key.includes("Path")) return { path: val };
  if (key.includes("SameSite")) return { sameSite: val };
  if (key.includes("HttpOnly")) return { httpOnly: true };
  if (key.includes("Secure")) return { secure: true };
  return {};
};

export const setCookieForBrowser = function (externalResponse: Response) {
  const setCookie = externalResponse.headers.get("Set-Cookie");
  if (setCookie === null) return;

  const [cookieNameAndValue, ...rest] = setCookie.split(";");
  const [name, value] = cookieNameAndValue.split("=");

  let options = {};

  const otherCookieParams = rest
    .map((val) => val.split("="))
    .map(([key, val]) => {
      return getSetCookeOptionsEntry(key, val);
    });

  for (const entry of otherCookieParams) {
    options = { ...options, ...entry };
  }

  cookies().set({ name, value, ...options });
};
