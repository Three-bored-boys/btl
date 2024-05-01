declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProcessEnv {
    readonly GOOGLE_BOOKS_API_KEY: string;
    readonly NY_TIMES_BOOKS_API_KEY: string;
    readonly NEXT_PUBLIC_URL: string;
  }
}
