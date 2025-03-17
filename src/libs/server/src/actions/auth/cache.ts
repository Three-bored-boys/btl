import { cache } from "react";
import { validateSessionToken } from "@/server/auth/sessions";

export const cacheValidateSessionToken = cache(validateSessionToken);
