import { ServerResult } from "./response";

export type FormState<T, P = unknown> = FieldError<T> | ServerResult<P>;

export type FieldError<T> = {
  fieldError: { [key in keyof T]: string[] };
};
