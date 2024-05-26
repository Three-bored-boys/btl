declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProcessEnv {
    readonly API_URL_PROD: string;
    readonly NEXT_PUBLIC_API_URL_PROD: string;
    readonly API_URL_DEV: string;
    readonly NEXT_PUBLIC_API_URL_DEV: string;
  }
}
