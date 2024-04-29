export type JSONResponse<T = NonNullable<unknown>> = {
  success: boolean;
  error?: string;
  data?: T;
};
