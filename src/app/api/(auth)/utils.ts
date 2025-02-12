import { cookies } from "next/headers";

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
