export type GoodResponse<T = NonNullable<unknown>> = {
  success: true;
  data: T;
};

export type BadResponse = { success: false; errors: string[]; status?: number };

export type ServerResult<P> = { serverResult: BadResponse | GoodResponse<P> }; // For the fetch route handler custom functon in app api utils

export type FetchDataResult<T> = { fetchDataResult: BadResponse | GoodResponse<T>; res: Response }; // For the fetch data custom function in client utils
