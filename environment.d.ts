declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProcessEnv {
    readonly URL: string;
    readonly NEXT_PUBLIC_URL: string;
    readonly API_URL: string;
    readonly NEXT_PUBLIC_API_URL: string;
    readonly DATABASE_URL: string;
    readonly GOOGLE_BOOKS_API_KEY: string;
    readonly NY_TIMES_BOOKS_API_KEY: string;
    readonly SESSION_SECRET_KEY: string;
  }
}
