import { type User } from "@/server/db/schema";
import { SanitizedUser } from "./auth/sessions";

export const sanitizedUser = function (user: User): SanitizedUser {
  const { hashedPassword, ...rest } = user;
  return rest;
};

export const BTL_AUTH_SESSION = "btl_auth_session";
