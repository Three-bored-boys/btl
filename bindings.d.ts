import { SanitizedUser } from "./src/libs/shared/src/db/schema";
export type Environment = {
  Bindings: {
    DATABASE_URL: string;
    GOOGLE_BOOKS_API_KEY: string;
    NY_TIMES_BOOKS_API_KEY: string;
    SESSION_SECRET_KEY: string;
    ENVIRONMENT: "development" | "production";
  };

  Variables: {
    user: SanitizedUser;
  };
};
