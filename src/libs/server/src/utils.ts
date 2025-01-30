import { type User } from "@/server/db/schema";
import { SanitizedUser } from "./auth/sessions";

export const sanitizedUser = function (user: User): SanitizedUser {
  const { hashedPassword, ...rest } = user;
  return rest;
};
