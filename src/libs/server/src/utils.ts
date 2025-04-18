import { type User } from "@/server/db/schema";
import { SanitizedUser } from "@/shared/db/schema";

export const sanitizedUser = function (user: User): SanitizedUser {
  const { hashedPassword, ...rest } = user;
  return rest;
};

export const fetchServiceData = async function <T>(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  console.log(res.ok, res.status, res.statusText);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = (await res.json()) as T;
  return data;
};
