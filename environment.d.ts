declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
    readonly API_URL: string;
    readonly URL: string;
    readonly NEXT_PUBLIC_URL: string;
  }
}
