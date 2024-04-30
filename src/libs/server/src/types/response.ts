export type GoodResponse<T = NonNullable<unknown>> = {
  success: true;
  data: T;
};

export type BadResponse = { success: false; error: string };
