export type GoodResponse<T = NonNullable<unknown>> = {
  success: true;
  data: T;
};

export type BadResponse = { success: false; errors: string[] };

export type HandlerResult<P> = { handlerResult: BadResponse | GoodResponse<P> }; // For the route handler specifically
