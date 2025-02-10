export type GoodResponse<T = NonNullable<unknown>> = {
  success: true;
  data: T;
};

export type BadResponse = { success: false; errors: string[] };

export type HandlerResult<P> = { handlerResult: BadResponse | GoodResponse<P> }; // For the fetch route handler custom functon in app api utils
export type FetchDataResult<P> = { fetchDataResult: BadResponse | GoodResponse<P> }; // For the fetch data custom function in client utils
