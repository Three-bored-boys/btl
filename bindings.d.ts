import { Environment } from "@/root/bindings";
export type Environment = {
  Bindings: {
    DATABASE_URL: string;
    GOOGLE_BOOKS_API_KEY: string;
    NY_TIMES_BOOKS_API_KEY: string;
    ENVIRONMENT: string;
    DATABASE_URL_DEV: string;
  };
};
