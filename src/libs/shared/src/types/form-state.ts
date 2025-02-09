import { BadResponse, GoodResponse } from "./response";

export type FormState<T, P = unknown> = FieldError<T> | HandlerResult<P>;

export type FieldError<T> = {
  fieldError: { [key in keyof T]: string[] };
};

export type HandlerResult<P> = { formResult: BadResponse | GoodResponse<P> }; // For the route handler specifically
