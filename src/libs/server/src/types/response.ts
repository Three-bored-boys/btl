export type JSONResponse<T = NonNullable<unknown>> =
  | {
      success: true;
      data: T;
    }
  | { success: false; error: string };
